import { getStore } from "@netlify/blobs";

import ALLOW from "../../shared/analytics-events.json" with { type: "json" };

/*
 * POST /api/event: first-party event counts for optimesh.ai (the privacy
 * notice, "What this website collects", describes them to visitors).
 *
 * The page sends {e, k}, such as {"e":"cta_click","k":"home.request_hammerhead"}.
 * This adds one to that day's total for that event and key. Nothing about the
 * request is stored or logged: no IP address, user agent, referrer, cookie or
 * identifier. The only thing written is the count. Requests that carry Global
 * Privacy Control or Do Not Track are answered with 204 and not counted.
 *
 * Totals for a UTC day live in one JSON blob, "day/YYYY-MM-DD", in the site
 * store "events", as {"<e> <k>": n}. Concurrent increments go through a
 * compare-and-swap: read with strong consistency, then write only if the
 * ETag still matches, retrying on conflict. If a key stays contended after
 * every retry, the event is written as its own blob under "extra/<day>/" so
 * it is never dropped. scripts/analytics-report.mjs adds those in when it
 * reads the totals.
 */

export const STORE = "events";
export const MAX_BODY = 512;
const ATTEMPTS = 8;

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

type Counts = Record<string, number>;
type WriteResult = { modified: boolean };
/* The part of a Netlify Blobs store this function uses, so tests can supply one. */
export interface CountStore {
  getWithMetadata(
    key: string,
    options: { type: "json" },
  ): Promise<{ data: unknown; etag?: string } | null>;
  setJSON(
    key: string,
    data: unknown,
    options: { onlyIfMatch: string } | { onlyIfNew: boolean },
  ): Promise<WriteResult>;
  set(
    key: string,
    data: string,
    options: { onlyIfNew: boolean },
  ): Promise<WriteResult>;
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* Adds one to `field` in the day's totals. Throws only if the store fails. */
export async function bump(
  store: CountStore,
  day: string,
  field: string,
): Promise<void> {
  const key = `day/${day}`;
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const cur = await store.getWithMetadata(key, { type: "json" });
    const counts: Counts = { ...((cur?.data as Counts) ?? {}) };
    counts[field] = (counts[field] ?? 0) + 1;
    if (cur && !cur.etag) break; // no ETag to compare against: take the fallback
    const res = cur
      ? await store.setJSON(key, counts, { onlyIfMatch: cur.etag })
      : await store.setJSON(key, counts, { onlyIfNew: true });
    if (res.modified) return;
    await pause(5 + Math.random() * 20 * (attempt + 1));
  }
  // "extra/<day>/<e>/<k>/<random>": the random part only keeps writes apart.
  const res = await store.set(
    `extra/${day}/${field.replace(" ", "/")}/${crypto.randomUUID()}`,
    "1",
    {
      onlyIfNew: true,
    },
  );
  if (!res.modified) throw new Error("event: fallback write was not stored");
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
        err instanceof Error ? err.name : "error",
      );
      return reply(503);
    }
    return reply(204);
  };
}

export default createHandler(
  () =>
    getStore({ name: STORE, consistency: "strong" }) as unknown as CountStore,
);
