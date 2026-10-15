#!/usr/bin/env python3
"""Check the static site Netlify publishes (static/) before it ships.

Fails, naming each problem, when:
  * static/index.html does not parse into balanced tags (void elements aside);
  * a local file the page references (src, href, poster, data-poster, srcset) is missing;
  * an in-site link is dead: a data-nav="page#anchor" or href="#..." names a page
    (data-page) or element id that does not exist, or an <a> has nothing behind
    it (no href, data-nav, data-request, data-article or role, and not hidden);
  * a file under static/ is larger than Netlify serves comfortably (MAX_BYTES);
  * netlify.toml does not parse, or publishes a directory other than static/;
  * the page can send an event count (/api/event) that the function's allowlist,
    shared/analytics-events.json, would refuse: a data-page, data-request value or
    film that is not listed, or a nav destination list that differs from it.

Standard library only, so CI needs nothing installed. Run from the repo root.
"""

from __future__ import annotations

import json
import re
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
REF_ATTRS = {"src", "href", "poster", "data-poster", "srcset"}
# attributes that make an <a> without href do something (the page script routes them),
# or keep it out of sight until the script gives it a destination (hidden)
ACTION_ATTRS = {"href", "data-nav", "data-request", "data-article", "data-news-article", "role", "hidden"}


class Page(HTMLParser):
    """Collects unbalanced tags and local references while parsing."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, int]] = []
        self.errors: list[str] = []
        self.refs: set[str] = set()
        self.ids: set[str] = set()
        self.pages: set[str] = {"home"}
        self.navs: list[tuple[str, int]] = []
        self.hashes: list[tuple[str, int]] = []
        self.inert: list[int] = []
        self.requests: set[str] = set()
        self.films: set[str] = set()
        self.source = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        line = self.getpos()[0]
        if a.get("id"):
            self.ids.add(a["id"])
        if a.get("data-page"):
            self.pages.add(a["data-page"])
        if a.get("data-request"):
            self.requests.add(a["data-request"].lower())
        if tag == "video" and "filmvid" in (a.get("class") or "").split():
            parts = (a.get("data-poster") or "").split("/")  # films/<id>/poster.webp
            self.films.add(parts[1].replace("-", "_") if len(parts) > 2 else "")
        if a.get("data-nav"):
            self.navs.append((a["data-nav"], line))
        if (a.get("href") or "").startswith("#"):
            self.hashes.append((a["href"], line))
        if tag == "a" and not ACTION_ATTRS & set(a):
            self.inert.append(line)
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
    page.source = (STATIC / "index.html").read_text()
    page.feed(page.source)
    page.close()
    problems += page.errors
    problems += [f"<{t}> opened at line {line} is never closed" for t, line in page.stack]

    def target_ok(pg: str, anchor: str | None) -> bool:
        return pg in page.pages and (not anchor or anchor in page.ids)

    for nav, line in page.navs:
        pg, _, anchor = nav.partition("#")
        if not target_ok(pg, anchor or None):
            problems.append(f"data-nav={nav!r} at line {line} names a page or anchor that does not exist")
    for href, line in page.hashes:
        frag = href[1:]
        pg, _, anchor = frag.partition("/")
        if frag and not (target_ok(pg, anchor or None) or frag in page.ids):
            problems.append(f"href={href!r} at line {line} names a page or anchor that does not exist")
    for line in page.inert:
        problems.append(f"<a> at line {line} has no href, data-nav, data-request, data-article or role: it does nothing")

    allow = json.loads((ROOT / "shared" / "analytics-events.json").read_text())
    for pg in sorted(page.pages - set(allow["places"])):
        problems.append(f"data-page={pg!r} is not in shared/analytics-events.json places: its event counts would be refused")
    for req in sorted(page.requests):
        if f"request_{req}" not in allow["cta"]:
            problems.append(f"data-request={req!r} has no request_{req} in shared/analytics-events.json cta")
    for film in sorted(page.films - set(allow["films"])):
        problems.append(f"film {film!r} (from a video.filmvid data-poster) is not in shared/analytics-events.json films")
    nav = re.search(r"const EV_NAV=new Set\(\[([^\]]*)\]\)", page.source)
    if not nav or sorted(re.findall(r"'([a-z0-9_]+)'", nav.group(1))) != sorted(allow["nav"]):
        problems.append("EV_NAV in index.html does not list the same pages as shared/analytics-events.json nav")

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
    print(f"checked index.html, {checked} local references, {len(page.navs) + len(page.hashes)} in-site links, "
          f"{sum(1 for f in STATIC.rglob('*') if f.is_file())} files")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
