// Tests for netlify/functions/event.ts. Run: pnpm test (node --test, Node 22.6+).
import assert from "node:assert/strict";
import { test } from "node:test";

import { createHandler, type CountStore } from "../netlify/functions/event.ts";

/* An in-memory store with the same conditional-write rules as Netlify Blobs. */
class MemoryStore implements CountStore {
  blobs = new Map<string, { data: string; etag: string }>();
  version = 0;
  /* Writes to "day/" keys that fail on purpose, to exercise the fallback. */
  failDayWrites = 0;
  async getWithMetadata(key: string) {
    await new Promise((r) => setImmediate(r));
    const b = this.blobs.get(key);
    return b ? { data: JSON.parse(b.data), etag: b.etag } : null;
  }
  async setJSON(
    key: string,
    data: unknown,
    options: { onlyIfMatch?: string; onlyIfNew?: boolean },
  ) {
    await new Promise((r) => setImmediate(r));
    return this.write(key, JSON.stringify(data), options);
  }
  async set(key: string, data: string, options: { onlyIfNew?: boolean }) {
    return this.write(key, data, options);
  }
  write(
    key: string,
    data: string,
    options: { onlyIfMatch?: string; onlyIfNew?: boolean },
  ) {
    if (key.startsWith("day/") && this.failDayWrites > 0) {
      this.failDayWrites--;
      return { modified: false };
    }
    const cur = this.blobs.get(key);
    if (options.onlyIfNew && cur) return { modified: false };
    if (options.onlyIfMatch !== undefined && cur?.etag !== options.onlyIfMatch)
      return { modified: false };
    this.blobs.set(key, { data, etag: `"${++this.version}"` });
    return { modified: true };
  }
  /* Totals the way scripts/analytics-report.mjs adds them up. */
  totals(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const [key, b] of this.blobs) {
      if (key.startsWith("day/")) {
        for (const [f, n] of Object.entries(
          JSON.parse(b.data) as Record<string, number>,
        ))
          out[f] = (out[f] ?? 0) + n;
      } else if (key.startsWith("extra/")) {
        const [, , e, k] = key.split("/");
        out[`${e} ${k}`] = (out[`${e} ${k}`] ?? 0) + 1;
      }
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

test("counts an allowed event and stores nothing else", async () => {
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

test("concurrent increments are not lost", async () => {
  const store = new MemoryStore();
  const handle = createHandler(() => store);
  const n = 60;
  const res = await Promise.all(
    Array.from({ length: n }, (_, i) =>
      handle(post({ e: "nav", k: i % 2 ? "header.docs" : "home.pricing" })),
    ),
  );
  assert.ok(res.every((r) => r.status === 204));
  const t = store.totals();
  assert.equal(t["nav header.docs"] + t["nav home.pricing"], n);
});

test("a key that stays contended falls back to its own blob", async () => {
  const store = new MemoryStore();
  store.failDayWrites = 1000;
  const handle = createHandler(() => store);
  assert.equal(
    (await handle(post({ e: "form_send", k: "request" }))).status,
    204,
  );
  assert.deepEqual(store.totals(), { "form_send request": 1 });
  assert.ok([...store.blobs.keys()].every((k) => k.startsWith("extra/")));
});

test("a store failure is a 503, not a silent success", async () => {
  const handle = createHandler(() => {
    throw new Error("blobs unavailable");
  });
  const err = console.error;
  console.error = () => {};
  try {
    assert.equal(
      (await handle(post({ e: "nav", k: "header.docs" }))).status,
      503,
    );
  } finally {
    console.error = err;
  }
});
