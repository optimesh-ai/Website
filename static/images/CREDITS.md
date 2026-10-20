# Imagery

The site's images are generated, not photographed or licensed. They depict
no real equipment, facility or customer installation.

`soft-*.webp` are the images in use: patterns that grow on their own (a river
delta, a starling murmuration, ripples, aurora curtains) drawn as
out-of-focus blue light on a light ground by `scripts/make_nature.py` (numpy
and Pillow, deterministic). The home hero's horizon is drawn in CSS.

| Files | Used for |
| --- | --- |
| `soft-delta.webp`, `soft-delta-900.webp` | Hammerhead panel on home |
| `soft-flock.webp`, `soft-flock-900.webp` | Config Studio panel on home |
| `soft-ripple.webp`, `soft-ripple-900.webp` | Real-outages card on home |
| `soft-aurora.webp`, `soft-aurora-900.webp` | Closing call to action |

`glass-*.webp` (soft-focus renders from `scripts/make_glass.py`) are not
currently used.

The photographs used before October 2026 (Unsplash and Pexels) were removed
with the redesign; they are in git history.

# Fonts

`static/fonts/inter-latin.woff2` is Inter (variable, weights 300–800, Latin
subset) by Rasmus Andersson, from Google Fonts, licensed under the SIL Open
Font License 1.1 (https://openfontlicense.org). It is self-hosted because the
Content-Security-Policy allows fonts from this origin only.
