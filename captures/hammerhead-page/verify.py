"""Check the Hammerhead page's terminal animation against its captures.

Every output line in HH_STEPS (static/index.html) must be a line of the
captured output of the command above it, character for character. Lines
may be an excerpt: contiguous runs of the capture, in order, with a
"  …" line wherever lines were left out (the films' convention), including
before the first run or after the last when the excerpt doesn't start or
end with the capture. Exits 1 and names the line on any mismatch.
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
    block = re.search(r"const HH_STEPS=\[(.*?)\n  \];", src, re.S)
    if not block:
        sys.exit("HH_STEPS not found in static/index.html")
    return re.findall(r"\{t:'(cmd|out)',x:'((?:[^'\\]|\\.)*)'", block.group(1))


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
    for kind, x in steps() + [("cmd", None)]:
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
