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

The React/Vite prototype that used to live in `client/` was never deployed
and was removed (2026-10-11); it is in git history if anything is wanted
from it.
