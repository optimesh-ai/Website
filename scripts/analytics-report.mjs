#!/usr/bin/env node
// Print the site's event counts (netlify/functions/event.ts) for the last N days.
//
//   node scripts/analytics-report.mjs            # last 30 days, totals, then by day
//   node scripts/analytics-report.mjs --days 7
//   node scripts/analytics-report.mjs --json     # {day: {"<event> <key>": n}}
//   node scripts/analytics-report.mjs --all      # include the deploy check's "nav selftest"
//
// Reads the Netlify Blobs store "events" through the Netlify API. The token is
// NETLIFY_AUTH_TOKEN, or else the one `netlify login` saved; the site is
// NETLIFY_SITE_ID, or else optimesh.ai's. Read-only.

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { getStore } from "@netlify/blobs";

const SITE_ID =
  process.env.NETLIFY_SITE_ID || "7bf6a599-9c86-42c4-8989-68fcb420389c"; // optmiesh-network
const SELFTEST = "nav selftest";

function cliToken() {
  const dirs = [
    join(homedir(), "Library", "Preferences", "netlify"),
    join(process.env.XDG_CONFIG_HOME || join(homedir(), ".config"), "netlify"),
  ];
  for (const dir of dirs) {
    try {
      const cfg = JSON.parse(readFileSync(join(dir, "config.json"), "utf8"));
      const user = cfg.users?.[cfg.userId] ?? Object.values(cfg.users ?? {})[0];
      if (user?.auth?.token) return user.auth.token;
    } catch {}
  }
  return null;
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const daysAt = args.indexOf("--days");
const days = daysAt >= 0 ? Number(args[daysAt + 1]) : 30;
if (!Number.isInteger(days) || days < 1) {
  console.error("--days needs a whole number of days");
  process.exit(2);
}
const token = process.env.NETLIFY_AUTH_TOKEN || cliToken();
if (!token) {
  console.error(
    "No Netlify token: set NETLIFY_AUTH_TOKEN or run `netlify login`.",
  );
  process.exit(2);
}

const store = getStore({ name: "events", siteID: SITE_ID, token });
const byDay = {};
for (let i = days - 1; i >= 0; i--) {
  const day = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
  const counts = {
    ...((await store.get(`day/${day}`, { type: "json" })) ?? {}),
  };
  // Events written on their own because the day's totals were contended.
  const { blobs } = await store.list({ prefix: `extra/${day}/` });
  for (const { key } of blobs) {
    const [, , e, k] = key.split("/"); // extra/<day>/<e>/<k>/<random>
    const field = `${e} ${k}`;
    counts[field] = (counts[field] ?? 0) + 1;
  }
  if (!flag("--all")) delete counts[SELFTEST];
  if (Object.keys(counts).length) byDay[day] = counts;
}

if (flag("--json")) {
  console.log(JSON.stringify(byDay, null, 2));
  process.exit(0);
}

const totals = {};
for (const counts of Object.values(byDay)) {
  for (const [field, n] of Object.entries(counts))
    totals[field] = (totals[field] ?? 0) + n;
}
const rows = (o) =>
  Object.entries(o)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([f, n]) => `  ${String(n).padStart(6)}  ${f}`)
    .join("\n");
console.log(`Event counts, last ${days} day(s) (UTC), optimesh.ai`);
if (!Object.keys(totals).length) {
  console.log("  none");
  process.exit(0);
}
console.log(`\nTotals\n${rows(totals)}`);
for (const [day, counts] of Object.entries(byDay))
  console.log(`\n${day}\n${rows(counts)}`);
