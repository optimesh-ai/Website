// Tests for netlify/functions/event.ts. Run: pnpm test (node --test, Node 22.6+).
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  bump,
  createHandler,
  SHARDS,
  type CountStore,
} from "../netlify/functions/event.ts";

const tick = () => new Promise((r) => setImmediate(r));

/* An in-memory store with Netlify Blobs' conditional-write rules (ETag match,
   create-only), plus switches that reproduce the failures the real client hides. */
class MemoryStore implements CountStore {
  blobs = new Map<string, { data: string; etag: string }>();
  version = 0;
  /* Commit the next N writes but report a conflict, as when the client retries
     a PUT that landed but whose response was lost. */
  loseResponses = 0;
  /* Fail the next N writes outright, as a persistent 5xx would. */
  failWrites = 0;
  async read(key: string) {
    await tick();
    const b = this.blobs.get(key);
    return b ? { data: JSON.parse(b.data), etag: b.etag } : null;
  }
  async write(
    key: string,
    data: unknown,
    condition: { onlyIfMatch: string } | { onlyIfNew: true },
  ) {
    await tick();
    if (this.failWrites > 0) {
      this.failWrites--;
      throw new Error("event: Blobs PUT answered 500");
    }
    const cur = this.blobs.get(key);
    if ("onlyIfNew" in condition && cur) return "conflict" as const;
    if ("onlyIfMatch" in condition && cur?.etag !== condition.onlyIfMatch)
      return "conflict" as const;
    this.blobs.set(key, {
      data: JSON.stringify(data),
      etag: `"${++this.version}"`,
    });
    if (this.loseResponses > 0) {
      this.loseResponses--;
      return "conflict" as const;
    }
    return "ok" as const;
  }
  /* Totals the way scripts/analytics-report.mjs adds them up: every shard of a day. */
  totals(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const [key, b] of this.blobs) {
      assert.match(key, /^day\/\d{4}-\d{2}-\d{2}\/\d+$/);
      const { counts } = JSON.parse(b.data) as {
        counts: Record<string, number>;
      };
      for (const [f, n] of Object.entries(counts)) out[f] = (out[f] ?? 0) + n;
    }
    return out;
  }
  /* Everything stored, as text: used to check nothing but counts is written. */
  dump(): string {
    return [...this.blobs].map(([k, b]) => `${k}=${b.data}`).join("\n");
  }
}

const URL_ = "https://optimesh.ai/api/event";
function post(body: unknown, headers: Record<string, string> = {}) {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  return new Request(URL_, {
    method: "POST",
    body: text,
    headers: { host: "optimesh.ai", ...headers },
  });
}

test("counts an allowed event and stores nothing about the request", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  const res = await handle(
    post(
      { e: "cta_click", k: "home.request_hammerhead", extra: "ignored" },
      {
        origin: "https://optimesh.ai",
        "sec-fetch-site": "same-origin",
        "user-agent": "UA-MARKER",
        "x-nf-client-connection-ip": "203.0.113.7",
        referer: "https://optimesh.ai/#pricing",
      },
    ),
  );
  assert.equal(res.status, 204);
  assert.deepEqual(store.totals(), { "cta_click home.request_hammerhead": 1 });
  const dump = store.dump();
  for (const leak of ["UA-MARKER", "203.0.113.7", "pricing", "ignored"])
    assert.ok(!dump.includes(leak), leak);
});

test("accepts every shape the page sends", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  for (const body of [
    { e: "nav", k: "header.pricing" },
    { e: "nav", k: "selftest" },
    { e: "film_play", k: "home.approved" },
    { e: "film_complete", k: "hammerhead.thirteen_commands" },
    { e: "form_start", k: "request" },
    { e: "form_send", k: "message" },
    { e: "cta_click", k: "footer.request_any" },
    { e: "cta_click", k: "rulehawk.rulehawk_source" },
  ]) {
    assert.equal((await handle(post(body))).status, 204, JSON.stringify(body));
  }
  assert.equal(Object.keys(store.totals()).length, 8);
});

test("refuses what is not on the allowlist", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  const bad: unknown[] = [
    { e: "pageview", k: "home" },
    { e: "cta_click", k: "home.buy_now" },
    { e: "cta_click", k: "evil.request_any" },
    { e: "cta_click", k: "home.request_any.extra" },
    { e: "cta_click" },
    { e: "nav", k: "home.terms" },
    { e: "form_send", k: "home.request" },
    { e: "film_play", k: "home.someone@example.com" },
    { e: "constructor", k: "__proto__" },
    [{ e: "nav", k: "selftest" }],
    "null",
    "not json",
  ];
  for (const body of bad)
    assert.equal((await handle(post(body))).status, 400, JSON.stringify(body));
  assert.equal(store.blobs.size, 0);
});

test("refuses other methods, other sites and oversized bodies", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  assert.equal(
    (await handle(new Request(URL_, { method: "GET" }))).status,
    405,
  );
  const ok = { e: "nav", k: "header.docs" };
  assert.equal(
    (await handle(post(ok, { origin: "https://evil.example" }))).status,
    403,
  );
  assert.equal(
    (await handle(post(ok, { "sec-fetch-site": "cross-site" }))).status,
    403,
  );
  const big = JSON.stringify({ ...ok, pad: "x".repeat(600) });
  assert.equal((await handle(post(big))).status, 413);
  assert.equal(store.blobs.size, 0);
});

test("answers but does not count Global Privacy Control or Do Not Track", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  assert.equal(
    (await handle(post({ e: "nav", k: "header.docs" }, { "sec-gpc": "1" })))
      .status,
    204,
  );
  assert.equal(
    (await handle(post({ e: "nav", k: "header.docs" }, { dnt: "1" }))).status,
    204,
  );
  assert.equal(store.blobs.size, 0);
});

test("concurrent increments are neither lost nor refused", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  const n = 200;
  const res = await Promise.all(
    Array.from({ length: n }, (_, i) =>
      handle(post({ e: "nav", k: i % 2 ? "header.docs" : "home.pricing" })),
    ),
  );
  assert.deepEqual([...new Set(res.map((r) => r.status))], [204]);
  const t = store.totals();
  assert.equal(t["nav header.docs"] + t["nav home.pricing"], n);
  assert.ok(store.blobs.size <= SHARDS);
});

test("a write that landed but reported a conflict is counted once", async () => {
  const store = new MemoryStore();
  store.loseResponses = 1;
  await bump(store, "2026-10-14", "form_send request", "aaaaaaaaaaaa", 0);
  assert.deepEqual(store.totals(), { "form_send request": 1 });
  // and again with another writer landing in between
  store.loseResponses = 1;
  const p = bump(store, "2026-10-14", "form_send request", "bbbbbbbbbbbb", 0);
  await bump(store, "2026-10-14", "form_send request", "cccccccccccc", 0);
  await p;
  assert.deepEqual(store.totals(), { "form_send request": 3 });
});

test("only the last 64 write tokens are kept", async () => {
  const store = new MemoryStore();
  for (let i = 0; i < 100; i++)
    await bump(store, "2026-10-14", "nav header.docs", `t${i}`, 0);
  const doc = JSON.parse(store.blobs.get("day/2026-10-14/0")!.data);
  assert.equal(doc.counts["nav header.docs"], 100);
  assert.equal(doc.recent.length, 64);
  assert.equal(doc.recent.at(-1), "t99");
});

test("a failed write is a 503, never a silent success", async () => {
  const store = new MemoryStore();
  store.failWrites = 1;
  const handle = createHandler(() => store);
  const err = console.error;
  console.error = () => {};
  try {
    assert.equal(
      (await handle(post({ e: "nav", k: "header.docs" }))).status,
      503,
    );
    assert.equal(store.blobs.size, 0);
    const broken = createHandler(() => {
      throw new Error("blobs unavailable");
    });
    assert.equal(
      (await broken(post({ e: "nav", k: "header.docs" }))).status,
      503,
    );
  } finally {
    console.error = err;
  }
});
