#!/usr/bin/env python3
"""Check the static site Netlify publishes (static/) before it ships.

Fails, naming each problem, when:
  * static/index.html does not parse into balanced tags (void elements aside);
  * a local file the page references (src, href, poster, srcset) is missing;
  * a file under static/ is larger than Netlify serves comfortably (MAX_BYTES);
  * netlify.toml does not parse, or publishes a directory other than static/.

Standard library only, so CI needs nothing installed. Run from the repo root.
"""

from __future__ import annotations

import sys
import tomllib
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"
MAX_BYTES = 20 * 1024 * 1024
VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
    "param", "source", "track", "wbr",
}
REF_ATTRS = {"src", "href", "poster", "srcset"}


class Page(HTMLParser):
    """Collects unbalanced tags and local references while parsing."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, int]] = []
        self.errors: list[str] = []
        self.refs: set[str] = set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in REF_ATTRS and value:
                for part in value.split(",") if name == "srcset" else [value]:
                    self.refs.add(part.strip().split(" ")[0])
        if tag not in VOID:
            self.stack.append((tag, self.getpos()[0]))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self.stack and self.stack[-1][0] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if self.stack and self.stack[-1][0] == tag:
            self.stack.pop()
            return
        open_tags = [t for t, _ in self.stack]
        if tag in open_tags:
            while self.stack and self.stack[-1][0] != tag:
                t, line = self.stack.pop()
                self.errors.append(f"<{t}> opened at line {line} is never closed")
            self.stack.pop()
        else:
            self.errors.append(f"</{tag}> at line {self.getpos()[0]} closes nothing")


def local_path(ref: str) -> Path | None:
    """The file under static/ a reference points at, or None if it is not local."""
    parts = urlsplit(ref)
    if parts.scheme or parts.netloc or ref.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    path = parts.path
    if not path or path == "/":
        return None
    return STATIC / path.lstrip("/")


def main() -> int:
    problems: list[str] = []

    config = tomllib.loads((ROOT / "netlify.toml").read_text())
    publish = config.get("build", {}).get("publish")
    if publish != "static":
        problems.append(f"netlify.toml publishes {publish!r}, expected 'static'")

    page = Page()
    page.feed((STATIC / "index.html").read_text())
    page.close()
    problems += page.errors
    problems += [f"<{t}> opened at line {line} is never closed" for t, line in page.stack]

    for ref in sorted(page.refs):
        target = local_path(ref)
        if target is not None and not target.is_file():
            problems.append(f"index.html references {ref!r}, which is not in static/")

    for f in sorted(STATIC.rglob("*")):
        if f.is_file() and f.stat().st_size > MAX_BYTES:
            size = f.stat().st_size / 1024 / 1024
            problems.append(f"{f.relative_to(ROOT)} is {size:.1f} MB (limit {MAX_BYTES // 1024 // 1024} MB)")

    for p in problems:
        print(f"::error::{p}")
    checked = sum(1 for r in page.refs if local_path(r) is not None)
    print(f"checked index.html, {checked} local references, {sum(1 for f in STATIC.rglob('*') if f.is_file())} files")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
