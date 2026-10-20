#!/usr/bin/env python3
"""Render the site's soft-focus nature abstracts (static/images/soft-*.webp).

Networks and patterns that grow on their own, seen out of focus on a light
ground: a river delta fanning out, a starling murmuration, ripples spreading
from one point, aurora curtains. Each is drawn as fine lines or points, bloomed
with several Gaussian blurs, and mapped from paper white through pale sky to
the site's electric blue and deep navy. Deterministic per seed. Needs numpy
and Pillow; writes PNG then converts with cwebp.

    python3 scripts/make_nature.py              # every image
    python3 scripts/make_nature.py soft-delta   # just the named ones
"""

from __future__ import annotations

import math
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_glass import OUT, smooth_noise  # noqa: E402

SS = 2  # supersampling for the line work

# paper -> ice -> pale sky -> electric blue -> deep navy
LIGHT_RAMP = [
    (0.00, (247, 248, 251)),
    (0.18, (226, 234, 250)),
    (0.40, (170, 194, 246)),
    (0.62, (88, 124, 250)),
    (0.80, (36, 80, 255)),
    (1.00, (12, 26, 92)),
]


def ramp(t: np.ndarray) -> np.ndarray:
    t = np.clip(t, 0, 1)
    xs = np.array([p for p, _ in LIGHT_RAMP])
    out = np.zeros(t.shape + (3,))
    for c in range(3):
        out[..., c] = np.interp(t, xs, np.array([col[c] for _, col in LIGHT_RAMP]))
    return out


def bloom(layer: Image.Image, radii_weights) -> np.ndarray:
    out = 0.0
    for r, k in radii_weights:
        img = layer if r == 0 else layer.filter(ImageFilter.GaussianBlur(r))
        out = out + k * np.asarray(img, dtype=float) / 255.0
    return out


def finish(field, rng, w, h, soften, base=0.0, grain=1.6):
    rgb = ramp(field + base)
    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
    if soften:
        img = img.filter(ImageFilter.GaussianBlur(soften))
    arr = np.asarray(img, dtype=float) + rng.normal(0, grain, (h, w, 1))
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def wash(rng, w, h, level, at=(0.5, 0.5), spread=0.5):
    """A soft blue wash behind the subject, so the frame is never flat white."""
    y, x = np.mgrid[0:h, 0:w].astype(float)
    u, v = x / w, y / h
    d = ((u - at[0]) ** 2 + ((v - at[1]) * h / w) ** 2) / spread ** 2
    return level * np.exp(-d) + 0.03 * (smooth_noise(rng, h, w, 3) - 0.5)


def branch(draw, rng, x, y, ang, length, width, depth, p):
    while length > p["min_len"] and depth < p["max_depth"]:
        ang += rng.normal(0, p["wobble"])
        ang += p["pull"] * math.sin(p["pull_dir"] - ang)
        nx, ny = x + math.cos(ang) * p["step"], y + math.sin(ang) * p["step"]
        draw.line([(x, y), (nx, ny)], fill=int(255 * min(1.0, 0.35 + width / 10)), width=max(1, int(round(width))))
        x, y = nx, ny
        length -= p["step"]
        if rng.random() < p["split"]:
            side = rng.choice([-1, 1])
            branch(draw, rng, x, y, ang + side * rng.uniform(*p["fork"]), length * p["child_len"],
                   width * p["child_w"], depth + 1, p)
            width *= p["keep_w"]


def render_delta(seed, w, h, root, p, halos, soften, wash_level):
    rng = np.random.default_rng(seed)
    W, H = w * SS, h * SS
    layer = Image.new("L", (W, H), 0)
    params = dict(p, step=p["step"] * SS, min_len=p["min_len"] * SS)
    rx, ry, ang, length, width = root
    branch(ImageDraw.Draw(layer), rng, rx * W, ry * H, math.radians(ang), length * W, width * SS, 0, params)
    field = bloom(layer.resize((w, h), Image.LANCZOS), halos)
    return finish(field, rng, w, h, soften, base=wash(rng, w, h, wash_level, (0.5, 0.2)))


def render_flock(seed, w, h, n, path, halos, soften, wash_level):
    rng = np.random.default_rng(seed)
    W, H = w * SS, h * SS
    t = rng.random(n)
    cx, cy, ax, ay, fx, fy, twist = path
    x = cx + ax * np.sin(2 * np.pi * fx * t) + 0.04 * np.sin(2 * np.pi * 5 * t)
    y = cy + ay * np.sin(2 * np.pi * fy * t + twist)
    thick = 0.012 + 0.05 * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t + 1.3)) ** 2
    x = x + rng.normal(0, 1, n) * thick
    y = y + rng.normal(0, 1, n) * thick * 0.8
    arr = np.zeros((H, W))
    np.add.at(arr, (np.clip((y * H).astype(int), 0, H - 1), np.clip((x * W).astype(int), 0, W - 1)), 1.0)
    layer = Image.fromarray(np.clip(arr * 120, 0, 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    field = bloom(layer.resize((w, h), Image.LANCZOS), halos)
    return finish(field, rng, w, h, soften, base=wash(rng, w, h, wash_level, (0.6, 0.4)))


def render_ripples(seed, w, h, cx, cy, wavelength, decay, strength, soften, wash_level):
    """Rings spreading from one point, like a single change moving through a network."""
    rng = np.random.default_rng(seed)
    y, x = np.mgrid[0:h, 0:w].astype(float)
    u, v = x / w, y / w
    warp = 0.012 * (smooth_noise(rng, h, w, 4) - 0.5)
    d = np.sqrt((u - cx) ** 2 + (v - cy * h / w) ** 2) + warp
    rings = (0.5 + 0.5 * np.cos(2 * np.pi * d / wavelength)) ** 3
    field = strength * rings * np.exp(-d / decay) + 0.5 * np.exp(-(d / 0.03) ** 2)
    img = finish(field, rng, w, h, soften, base=wash(rng, w, h, wash_level, (cx, cy), 0.6))
    return img


def render_aurora(seed, w, h, curtains, soften, wash_level):
    rng = np.random.default_rng(seed)
    y, x = np.mgrid[0:h, 0:w].astype(float)
    u, v = x / w, y / h
    warp = smooth_noise(rng, h, w, 3) - 0.5
    field = np.zeros((h, w))
    for cx, width, k, lean in curtains:
        xx = u - cx - lean * (v - 0.5) - 0.06 * warp
        field = field + k * np.exp(-(xx / width) ** 2) * np.exp(-((v - 0.45) / 0.38) ** 2)
    return finish(field, rng, w, h, soften, base=wash(rng, w, h, wash_level, (0.5, 0.5), 0.8))


DELTA = dict(step=6, min_len=8, max_depth=11, wobble=0.07, pull=0.015, pull_dir=math.radians(90),
             split=0.028, fork=(0.30, 0.55), child_len=0.86, child_w=0.72, keep_w=0.84)

IMAGES = {
    # Hammerhead: a delta fanning out, every channel accounted for
    "soft-delta": (render_delta, dict(seed=3, w=1600, h=1200, root=(0.5, -0.04, 90, 1.30, 10), p=DELTA,
        halos=[(0, 0.30), (3, 0.40), (14, 0.45), (48, 0.45)], soften=7.0, wash_level=0.16)),
    # Config Studio: a murmuration, many small moves forming one shape
    "soft-flock": (render_flock, dict(seed=8, w=1600, h=1200, n=90000, path=(0.50, 0.52, 0.33, 0.22, 1, 2, 0.6),
        halos=[(0, 0.22), (2, 0.36), (10, 0.40), (40, 0.36)], soften=5.0, wash_level=0.18)),
    # real outages: one change, rippling outward
    "soft-ripple": (render_ripples, dict(seed=12, w=2200, h=1000, cx=0.5, cy=1.05, wavelength=0.055, decay=0.45,
        strength=0.75, soften=24, wash_level=0.14)),
    # closing: aurora curtains in daylight
    "soft-aurora": (render_aurora, dict(seed=12, w=2400, h=1100, curtains=[
        (0.16, 0.06, 0.36, 0.10), (0.33, 0.03, 0.50, -0.06), (0.50, 0.08, 0.42, 0.12),
        (0.66, 0.022, 0.62, -0.04), (0.71, 0.05, 0.30, 0.02), (0.86, 0.06, 0.34, 0.08)], soften=40, wash_level=0.10)),
}


def main() -> int:
    only = set(sys.argv[1:])
    for name, (fn, spec) in IMAGES.items():
        if only and name not in only:
            continue
        img = fn(**spec)
        for suffix, width in (("", img.width), ("-900", 900)):
            out = img if width == img.width else img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
            png = OUT / f"{name}{suffix}.png"
            out.save(png)
            subprocess.run(["cwebp", "-quiet", "-q", "84", str(png), "-o", str(png.with_suffix(".webp"))], check=True)
            png.unlink()
            print(png.with_suffix(".webp").relative_to(OUT.parent.parent), out.size)
    return 0


if __name__ == "__main__":
    sys.exit(main())
