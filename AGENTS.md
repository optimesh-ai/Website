# Optimesh website

The live site is one hand-written file: `static/index.html`, with its images,
films and captions under `static/`. Netlify publishes `static/` as-is
(`netlify.toml`); the only build step writes `static/version.txt`, which the
`Site` workflow polls after each deploy to confirm optimesh.ai serves the
commit that was pushed.

- Check before every push: `python3 scripts/check_site.py` (balanced tags,
  local references, in-site links and anchors, sizes, `netlify.toml`).
- Forms post to Netlify Forms with `fetch('/')`. A send that does not come
  back `ok` must say it failed and offer email instead; never show success
  for a request that was not delivered.
- `netlify/functions/` (`early-access`, `api` over `server/`) are deployed
  by Netlify from that default directory. `shared/` holds their types.
- Run the site and the API locally: `pnpm install && pnpm serve:local`
  (serves `static/` plus `server/` on port 8080). `pnpm typecheck` checks
  `server/`, `shared/` and `netlify/`.

## Event counts (first-party, no cookies)

The page counts a few actions as anonymous daily totals: request-access,
email, RuleHawk and PacketDojo clicks, links to pricing/docs/methodology/white
paper/security/why, film plays and finishes, and form starts and sends, each
with where on the site it happened. The Privacy and Security pages say exactly
this; change them in the same commit as anything that changes what is counted.

- Client: the "event counts" block near the end of the script in
  `static/index.html`. It derives each key from existing markup
  (`data-request`, `data-nav`, the RuleHawk/PacketDojo links, film posters),
  so new CTAs are counted without extra attributes. It sends nothing when the
  browser sends Global Privacy Control or Do Not Track.
- Server: `netlify/functions/event.ts`, which declares the path
  `/api/event` itself (functions with a path run before `netlify.toml`'s
  `/api/*` rewrite) and a Netlify rate limit of 60 a minute per IP. It accepts
  only what `shared/analytics-events.json` allows (400 otherwise, 413 over 512
  bytes, 403 from other sites), stores no IP, user agent, referrer or
  identifier, and adds one to a random shard of `day/YYYY-MM-DD/<0-7>` in the
  Netlify Blobs store `events` with a compare-and-swap. A random write token
  (the last 64 per shard) and a write counter (`rev`) keep a retried write from
  counting twice; if it cannot tell, it answers 503 rather than guess. A write
  that fails is a 503, never a silent success. `pnpm test` covers it, including
  concurrent increments, lost responses and the real Blobs client. Under
  `netlify dev` the local Blobs server sends no ETags, so after the first
  count in each shard the function answers 503 locally; deployed, it counts
  exactly (40 concurrent posts to a draft deploy: 40 counted).
- Adding a page, a `data-request` product or a film: add it to
  `shared/analytics-events.json`; `scripts/check_site.py` fails until you do.
- Read the counts: `pnpm analytics` (last 30 days; `--days N`, `--json`,
  `--all` to include the deploy check's `nav selftest`). It needs a Netlify
  token: `NETLIFY_AUTH_TOKEN`, or the one `netlify login` saved.
- Page views come from Netlify Analytics (server-side, in the Netlify UI),
  not from the page.

The React/Vite prototype that used to live in `client/` was never deployed
and was removed (2026-10-11); it is in git history if anything is wanted
from it.
