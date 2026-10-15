"""Check the Hammerhead page's terminal animation against its captures.

Every output line in HH_STEPS (static/index.html) must be a line of the
captured output of the command above it, character for character. Lines
may be an excerpt: contiguous runs of the capture, in order, with a
"  …" line wherever lines were left out (the films' convention), including
before the first run or after the last when the excerpt doesn't start or
end with the capture. HH_STEPS must be one literal, one entry per line,
and only read after it is declared. Exits 1 and names the problem.
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PAGE = HERE.parent.parent / "static" / "index.html"
CUT = "  …"
CAPTURES = {
    "hammerhead simulate ./configs": "simulate.txt",
    "hammerhead traceroute tests/configs/triangle --from R1 --src 1.1.1.1 --dst 3.3.3.3": "traceroute.txt",
}


def steps():
    src = PAGE.read_text(encoding="utf-8")
    # HH_STEPS may only be declared once and read: no push, splice, index
    # assignment or second declaration that could add lines this check skips
    uses = [m.group(0) for m in re.finditer(r".{0,8}HH_STEPS.{0,8}", src)]
    allowed = ("const HH_STEPS=[", "HH_STEPS.map(s=>", "of HH_STEPS){")
    stray = [u for u in uses if not any(a in u for a in allowed)]
    if stray or sum("const HH_STEPS=[" in u for u in uses) != 1:
        sys.exit(f"FAIL HH_STEPS is used in a way verify.py doesn't allow: {stray or uses!r}")
    block = re.search(r"const HH_STEPS=\[(.*?)\n  \];", src, re.S)
    if not block:
        sys.exit("HH_STEPS not found in static/index.html")
    entries = []
    for line in block.group(1).split("\n"):
        if not line.strip():
            continue
        # one entry per line, in exactly this form, so nothing the animation
        # renders can slip past the check (no other quoting, no escapes)
        m = re.fullmatch(r"\s*\{t:'(cmd|out)',x:'([^'\\]*)'(?:,ok:true)?\},?\s*", line)
        if not m:
            sys.exit(f"FAIL HH_STEPS entry not in the form verify.py reads: {line.strip()!r}")
        entries.append((m.group(1), m.group(2)))
    return entries


def check(cmd, shown):
    if cmd not in CAPTURES:
        return [f"no capture for command {cmd!r}"]
    name = CAPTURES[cmd]
    lines = (HERE / name).read_text(encoding="utf-8").split("\n")
    if lines and lines[-1] == "":
        lines.pop()
    runs, run = [], []
    for x in shown:
        if x == CUT:
            runs.append(run)
            run = []
        else:
            run.append(x)
    runs.append(run)
    lead, trail = len(runs) > 1 and not runs[0], len(runs) > 1 and not runs[-1]
    body = runs[1 if lead else 0:len(runs) - 1 if trail else len(runs)]
    if not body or any(not r for r in body):
        return [f"{cmd}: empty excerpt or two cut marks in a row"]
    at = 0
    for n, run in enumerate(body):
        # the first run starts the capture unless a cut mark comes before it;
        # every later run follows a cut mark, so at least one line was left out
        first = 0 if (n == 0 and not lead) else at + 1
        last = first if (n == 0 and not lead) else len(lines) - len(run)
        found = next((i for i in range(first, last + 1) if lines[i:i + len(run)] == run), None)
        if found is None:
            return [f"{cmd}: excerpt run {n + 1} is not a run of {name} at the place it is shown: {run!r}"]
        at = found + len(run)
    if trail and at == len(lines):
        return [f"{cmd}: trailing cut mark, but the excerpt reaches the end of {name}"]
    if not trail and at != len(lines):
        return [f"{cmd}: excerpt stops at line {at} of {len(lines)} in {name} without a trailing cut mark"]
    return []


def main():
    problems, cmd, shown, count = [], None, [], 0
    entries = steps()
    if not entries or entries[0][0] != "cmd":
        sys.exit("FAIL HH_STEPS must start with a command")
    for kind, x in entries + [("cmd", None)]:
        if kind == "cmd":
            if cmd is not None:
                problems += check(cmd, shown)
                count += len(shown)
            cmd, shown = x, []
        else:
            shown.append(x)
    for p in problems:
        print("FAIL", p)
    if problems:
        sys.exit(1)
    print(f"HH_STEPS: {count} output lines match their captures")


if __name__ == "__main__":
    main()
