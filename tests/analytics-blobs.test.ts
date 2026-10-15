// blobsStore() in netlify/functions/event.ts against the real @netlify/blobs
// client: its local server for conditional writes, and a server that only
// answers 500 for the failure the client would otherwise report as success.
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";

process.env.NODE_ENV = "test"; // the client's retry delay drops from 5 s to 1 ms
const { BlobsServer } = await import("@netlify/blobs/server");
const { blobsStore } = await import("../netlify/functions/event.ts");

function useEdge(url: string) {
  const ctx = {
    siteID: "site",
    token: "tok",
    edgeURL: url,
    uncachedEdgeURL: url,
  };
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from(JSON.stringify(ctx)).toString(
    "base64",
  );
}

const dir = await mkdtemp(join(tmpdir(), "blobs-"));
const server = new BlobsServer({ directory: dir, token: "tok" });
const { port } = await server.start();
const broken = createServer((_, res) => res.writeHead(500).end());
await new Promise<void>((r) => broken.listen(0, "127.0.0.1", r));
// Netlify answers 409 when conditional writes to one key race.
const racing = createServer((_, res) => res.writeHead(409).end());
await new Promise<void>((r) => racing.listen(0, "127.0.0.1", r));
after(async () => {
  await server.stop();
  broken.close();
  racing.close();
  await rm(dir, { recursive: true, force: true });
});

test("conditional writes report ok and conflict as the server answers them", async () => {
  useEdge(`http://localhost:${port}`);
  const store = blobsStore();
  assert.equal(
    await store.write("day/x/0", { counts: { a: 1 } }, { onlyIfNew: true }),
    "ok",
  );
  assert.equal(
    await store.write("day/x/0", { counts: { a: 9 } }, { onlyIfNew: true }),
    "conflict",
  );
  assert.deepEqual((await store.read("day/x/0"))?.data, { counts: { a: 1 } });
  // The local server sends no ETag on reads (Netlify's does; the deploy check
  // exercises that), so take one from a write made with the client directly.
  const { getStore } = await import("@netlify/blobs");
  const { etag } = await getStore({
    name: "events",
    consistency: "strong",
  }).setJSON("day/x/0", { counts: { a: 1 } });
  assert.ok(etag);
  assert.equal(
    await store.write("day/x/0", { counts: { a: 2 } }, { onlyIfMatch: etag! }),
    "ok",
  );
  assert.equal(
    await store.write("day/x/0", { counts: { a: 3 } }, { onlyIfMatch: etag! }),
    "conflict",
  );
  assert.deepEqual((await store.read("day/x/0"))?.data, { counts: { a: 2 } });
  assert.equal(await store.read("day/none/0"), null);
});

test("a write the server refuses with 500 throws instead of reporting success", async () => {
  const addr = broken.address();
  assert.ok(addr && typeof addr === "object");
  useEdge(`http://127.0.0.1:${addr.port}`);
  const store = blobsStore();
  await assert.rejects(
    store.write("day/x/0", { counts: {} }, { onlyIfNew: true }),
    /answered 500/,
  );
  await assert.rejects(store.read("day/x/0"));
});

test("a 409 from a write race is a conflict to re-check, not an error", async () => {
  const addr = racing.address();
  assert.ok(addr && typeof addr === "object");
  useEdge(`http://127.0.0.1:${addr.port}`);
  const store = blobsStore();
  assert.equal(
    await store.write("day/x/0", { counts: {} }, { onlyIfMatch: '"1"' }),
    "conflict",
  );
});
