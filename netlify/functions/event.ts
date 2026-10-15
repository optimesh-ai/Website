import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

import ALLOW from "../../shared/analytics-events.json" with { type: "json" };

/*
 * POST /api/event: first-party event counts for optimesh.ai (the privacy
 * notice, "What this website collects", describes them to visitors).
 *
 * The page sends {e, k}, such as {"e":"cta_click","k":"home.request_hammerhead"}.
 * This adds one to that day's total for that event and key. Nothing about the
 * request is stored or logged: no IP address, user agent, referrer, cookie or
 * identifier. Requests that carry Global Privacy Control or Do Not Track are
 * answered with 204 and not counted.
 *
 * Storage (Netlify Blobs, site store "events"): a UTC day's totals are split
 * across SHARDS blobs, "day/YYYY-MM-DD/<shard>", each
 * {"counts": {"<e> <k>": n}, "rev": <writes so far>, "recent": [<token>, ...]}. An increment
 * picks a shard at random, reads it with strong consistency and writes it back
 * only if its ETag still matches (compare-and-swap), retrying on conflict, so
 * concurrent increments are never lost. Storage is bounded: SHARDS blobs a day,
 * each with at most one entry per allowlisted key.
 *
 * "recent" holds the random tokens of the last RECENT writes to that shard. They
 * say nothing about who sent anything; they exist because the Blobs client
 * retries a PUT whose response was lost, and the retry then fails its ETag
 * check even though the first try landed. Finding our token on re-read means
 * the write already counted, so it is not counted twice. A token not found is
 * proof the write did not land only while fewer than RECENT writes have
 * followed it ("rev" says how many); past that the function gives up with a
 * 503 rather than risk counting twice.
 */

export const STORE = "events";
export const SHARDS = 8;
export const MAX_BODY = 512;
const RECENT = 64;
const ATTEMPTS = 10;

/* Routed here directly: functions with a path run before netlify.toml's
   /api/* rewrite. Netlify enforces the per-IP limit at its edge; the
   function never sees or keeps the address. */
export const config: Config = {
  path: "/api/event",
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ["ip", "domain"] },
};

type Allow = {
  places: string[];
  cta: string[];
  nav: string[];
  films: string[];
  forms: string[];
};
const allow = ALLOW as Allow;
const PLACES = new Set(allow.places);
const CTA = new Set(allow.cta);
const NAV = new Set(allow.nav);
const FILMS = new Set(allow.films);
const FORMS = new Set(allow.forms);

/* "<e> <k>" if the event and key are on the allowlist, otherwise null. */
export function fieldFor(body: unknown): string | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { e, k } = body as Record<string, unknown>;
  if (typeof e !== "string" || typeof k !== "string") return null;
  const parts = k.split(".");
  const placed = (what: Set<string>) =>
    parts.length === 2 && PLACES.has(parts[0]) && what.has(parts[1]);
  let ok = false;
  switch (e) {
    case "cta_click":
      ok = placed(CTA);
      break;
    case "nav":
      // "selftest" is posted by the deploy check; the report leaves it out unless asked
      ok = k === "selftest" || placed(NAV);
      break;
    case "film_play":
    case "film_complete":
      ok = placed(FILMS);
      break;
    case "form_start":
    case "form_send":
      ok = FORMS.has(k);
      break;
  }
  return ok ? `${e} ${k}` : null;
}

export function utcDay(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/* What the function needs from storage, so tests can supply their own. */
export interface CountStore {
  read(key: string): Promise<{ data: unknown; etag?: string } | null>;
  /* "ok" if written, "conflict" if the condition failed; throws otherwise. */
  write(
    key: string,
    data: unknown,
    condition: { onlyIfMatch: string } | { onlyIfNew: true },
  ): Promise<"ok" | "conflict">;
}

type Doc = { counts: Record<string, number>; rev: number; recent: string[] };
function asDoc(data: unknown): Doc {
  const d = (data ?? {}) as Partial<Doc>;
  const counts =
    d.counts && typeof d.counts === "object" && !Array.isArray(d.counts)
      ? { ...d.counts }
      : {};
  const rev = Number.isInteger(d.rev) ? (d.rev as number) : 0;
  const recent = Array.isArray(d.recent) ? [...d.recent] : [];
  return { counts, rev, recent };
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const token = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");

/* Adds one to `field` in the day's totals, exactly once. Throws if it cannot. */
export async function bump(
  store: CountStore,
  day: string,
  field: string,
  op = token(),
  shard = Math.floor(Math.random() * SHARDS),
): Promise<void> {
  const key = `day/${day}/${shard}`;
  let firstMiss: number | null = null; // rev our first unconfirmed try was based on
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const cur = await store.read(key);
    const doc = asDoc(cur?.data);
    if (doc.recent.includes(op)) return; // an earlier try landed; its response was lost
    // An earlier try that landed would have rev firstMiss + 1; its token stays
    // in "recent" until RECENT more writes follow. Past that, a missing token
    // proves nothing, so stop rather than risk counting twice.
    if (firstMiss !== null && doc.rev > firstMiss + RECENT)
      throw new Error("event: cannot tell whether an earlier try landed");
    if (cur && !cur.etag) throw new Error("event: stored totals have no ETag");
    const base = doc.rev;
    doc.counts[field] = (doc.counts[field] ?? 0) + 1;
    doc.rev = base + 1;
    doc.recent = [...doc.recent, op].slice(-RECENT);
    const res = await store.write(
      key,
      doc,
      cur ? { onlyIfMatch: cur.etag } : { onlyIfNew: true },
    );
    if (res === "ok") return;
    firstMiss ??= base;
    await pause(5 + Math.random() * 20 * (attempt + 1));
  }
  throw new Error("event: totals still contended after every retry");
}

/* The Netlify Blobs store. The client reports `modified: true` for a
   conditional write that ended in any status but 412, including errors, so
   the status of the final PUT is read from the fetch it makes. */
export function blobsStore(): CountStore {
  let lastPut = 0;
  const spy: typeof fetch = async (input, init) => {
    const res = await fetch(input, init);
    if ((init?.method ?? "GET").toUpperCase() === "PUT") lastPut = res.status;
    return res;
  };
  const store = getStore({ name: STORE, consistency: "strong", fetch: spy });
  return {
    async read(key) {
      const cur = await store.getWithMetadata(key, { type: "json" });
      return cur ? { data: cur.data, etag: cur.etag } : null;
    },
    async write(key, data, condition) {
      lastPut = 0;
      await store.setJSON(key, data, condition);
      if (lastPut >= 200 && lastPut < 300) return "ok";
      // 412: the ETag no longer matches. 409: Netlify's answer when conditional
      // writes to one key race. Either way bump() re-reads; its write token
      // tells it whether this write landed after all.
      if (lastPut === 412 || lastPut === 409) return "conflict";
      throw new Error(`event: Blobs PUT answered ${lastPut || "nothing"}`);
    },
  };
}

/* Browsers say where a request came from; refuse ones sent by other sites. */
function sameSite(req: Request): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("host") ?? new URL(req.url).host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const reply = (status: number, extra: Record<string, string> = {}) =>
  new Response(null, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });

export function createHandler(openStore: () => CountStore) {
  return async (req: Request): Promise<Response> => {
    if (req.method !== "POST") return reply(405, { Allow: "POST" });
    if (!sameSite(req)) return reply(403);
    if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY)
      return reply(413);
    const text = await req.text();
    if (new TextEncoder().encode(text).length > MAX_BODY) return reply(413);
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return reply(400);
    }
    const field = fieldFor(body);
    if (!field) return reply(400);
    if (req.headers.get("sec-gpc") === "1" || req.headers.get("dnt") === "1")
      return reply(204);
    try {
      await bump(openStore(), utcDay(), field);
    } catch (err) {
      console.error(
        "event: count not stored:",
        err instanceof Error ? err.message : "error",
      );
      return reply(503);
    }
    return reply(204);
  };
}

export default createHandler(blobsStore);
