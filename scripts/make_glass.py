#!/usr/bin/env python3
"""Render the site's soft-focus glass imagery (static/images/glass-*.webp).

Each image is generated, not photographed: a few warped diagonal ribbons of
light, mapped through a cool navy -> electric blue -> silver ramp, with
specular streaks, then heavily blurred so it reads like refracted glass or
liquid metal seen out of focus. Deterministic per seed, so re-running gives
the same files. Needs numpy and Pillow; writes PNG then converts with cwebp.

    python3 scripts/make_glass.py                  # every image
    python3 scripts/make_glass.py frontier-hero    # just the named ones
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "static" / "images"

# navy-black -> deep blue -> electric blue -> steel -> silver -> near white
RAMP = [
    (0.00, (3, 7, 20)),
    (0.20, (8, 20, 56)),
    (0.38, (20, 52, 150)),
    (0.52, (38, 92, 210)),
    (0.66, (112, 148, 200)),
    (0.82, (196, 211, 230)),
    (1.00, (246, 249, 253)),
]


def ramp(t: np.ndarray) -> np.ndarray:
    t = np.clip(t, 0, 1)
    xs = np.array([p for p, _ in RAMP])
    out = np.zeros(t.shape + (3,))
    for c in range(3):
        out[..., c] = np.interp(t, xs, np.array([col[c] for _, col in RAMP]))
    return out


def smooth_noise(rng, h, w, cells):
    small = rng.random((cells, int(cells * w / h) + 1))
    img = Image.fromarray((small * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(img, dtype=float) / 255.0


def render(seed, w, h, angle, bands, base, highlights, blur, tint=0.0, light=(0.0, 0.0), orbs=()):
    rng = np.random.default_rng(seed)
    y, x = np.mgrid[0:h, 0:w].astype(float)
    u, v = x / w, y / h * (h / w)
    a = np.deg2rad(angle)
    s = u * np.cos(a) + v * np.sin(a)
    warp = smooth_noise(rng, h, w, 3) - 0.5
    s = s + 0.07 * warp + 0.05 * (v - 0.3) ** 2
    # broad lighting falloff, so the surface reads as one curved sheet
    field = base + light[0] * (u - 0.5) + light[1] * (v - 0.3)
    for center, width, strength in bands:
        # a glass slab: a crisp leading edge, then a long soft falloff
        d = (s - center) / width
        prof = np.where(d < 0, np.exp(-(d * 2.4) ** 2), np.exp(-d * 1.1))
        field += strength * prof
        # the shadowed rim just ahead of the edge
        field -= 0.28 * abs(strength) * np.exp(-((d + 0.75) / 0.35) ** 2)
    rgb = ramp(field)
    # specular streaks: elongated bright gaussians along the band direction
    for cx, cy, rx, ry, k in highlights:
        dx, dy = u - cx, v - cy * (h / w)
        along = dx * np.cos(a) + dy * np.sin(a)
        across = -dx * np.sin(a) + dy * np.cos(a)
        g = np.exp(-(along / rx) ** 2 - (across / ry) ** 2)[..., None]
        # screen blend toward icy blue, so light on dark glass glows instead of greying
        rgb = 255 - (255 - rgb) * (1 - k * g * np.array([0.78, 0.86, 1.0]))
    if tint:
        rgb = rgb * (1 - tint) + tint * np.array([60, 110, 255])
    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
    img = img.filter(ImageFilter.GaussianBlur(blur))
    if orbs:
        # out-of-focus points of light, like nodes of a network seen through
        # glass: drawn after the main blur, with a lighter one, so they stay round
        mask = np.zeros((h, w))
        for cx, cy, r, k in orbs:
            d = np.sqrt((u - cx) ** 2 + (v - cy * (h / w)) ** 2)
            mask = np.maximum(mask, k * np.clip((r - d) / (r * 0.18), 0, 1))
        m = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur * 0.28))
        m = (np.asarray(m, dtype=float) / 255.0)[..., None]
        base_rgb = np.asarray(img, dtype=float)
        img = Image.fromarray(np.clip(base_rgb + m * (np.array([206, 222, 255]) - base_rgb), 0, 255).astype(np.uint8))
    # fine grain keeps the blur from banding on large screens
    arr = np.asarray(img, dtype=float) + rng.normal(0, 2.2, (h, w, 1))
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


IMAGES = {
    # wide hero: diagonal liquid-metal sweep, silver breaking through on the right
    "glass-hero": dict(seed=7, w=2400, h=1120, angle=-36, base=0.14, light=(0.34, -0.10),
        bands=[(0.10, 0.12, 0.20), (0.36, 0.09, 0.36), (0.58, 0.05, 0.58), (0.76, 0.22, 0.62)],
        highlights=[(0.60, 0.42, 0.05, 0.20, 0.80), (0.88, 0.20, 0.03, 0.30, 0.55)],
        blur=30),
    # Hammerhead: cold and deep, one bright refraction
    "glass-verify": dict(seed=21, w=1600, h=1200, angle=58, base=0.08, light=(-0.12, 0.10),
        bands=[(0.30, 0.12, 0.30), (0.62, 0.06, 0.58), (0.92, 0.18, 0.30)],
        highlights=[(0.58, 0.46, 0.03, 0.22, 0.70), (0.28, 0.22, 0.04, 0.08, 0.25)],
        orbs=[(0.30, 0.70, 0.022, 0.40), (0.46, 0.56, 0.012, 0.55), (0.71, 0.36, 0.018, 0.45), (0.84, 0.62, 0.010, 0.35)],
        blur=34),
    # Config Studio: brighter, silvery, more air
    "glass-draft": dict(seed=33, w=1600, h=1200, angle=-24, base=0.56, light=(0.22, -0.18),
        bands=[(0.18, 0.14, 0.20), (0.46, 0.08, 0.34), (0.82, 0.14, 0.26)],
        highlights=[(0.44, 0.52, 0.035, 0.22, 0.65), (0.80, 0.26, 0.02, 0.10, 0.4)],
        blur=38),
    # closing band: dark, an electric-blue seam
    "glass-close": dict(seed=48, w=1600, h=1100, angle=28, base=0.06, light=(0.14, 0.0),
        bands=[(0.30, 0.16, 0.26), (0.60, 0.05, 0.50), (0.92, 0.20, 0.24)],
        highlights=[(0.62, 0.50, 0.025, 0.16, 0.55)],
        orbs=[(0.22, 0.30, 0.016, 0.30), (0.52, 0.62, 0.024, 0.45), (0.78, 0.40, 0.013, 0.40)],
        blur=40),
}


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    only = set(sys.argv[1:])
    for name, spec in IMAGES.items():
        if only and name not in only:
            continue
        img = render(**spec)
        for suffix, width in (("", img.width), ("-900", 900)):
            out = img if width == img.width else img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
            png = OUT / f"{name}{suffix}.png"
            out.save(png)
            subprocess.run(["cwebp", "-quiet", "-q", "82", str(png), "-o", str(png.with_suffix(".webp"))], check=True)
            png.unlink()
            print(png.with_suffix(".webp").relative_to(OUT.parent.parent), out.size)
    return 0


if __name__ == "__main__":
    sys.exit(main())
