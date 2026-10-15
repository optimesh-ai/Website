# Hammerhead page terminal: captured output

The terminal animation on the Hammerhead page (`HH_STEPS` in
`static/index.html`) shows only lines from these captures, character for
character. Where output is left out, the animation shows a `  …` line, the
films' convention. `python3 captures/hammerhead-page/verify.py` checks this,
and CI runs it.

These files are not published; Netlify serves `static/` only.

| File | What it is |
|---|---|
| `simulate.typescript` | Raw terminal capture of `hammerhead simulate ./configs` (`script -q`), with ANSI colour and CRLF line ends |
| `simulate.txt` | The same with colour codes removed, CRLF changed to LF, and `script`'s `^D` echo dropped |
| `traceroute.typescript` | Raw terminal capture of `hammerhead traceroute tests/configs/triangle --from R1 --src 1.1.1.1 --dst 3.3.3.3` |
| `traceroute.txt` | The same, cleaned the same way |

`simulate` prints its progress block (version, phase timings and the `done`
line) to stderr only when stderr is a terminal, so it was captured under a
pseudo-terminal. Piped, the per-device output on stdout is byte-identical to
lines 12 onward of `simulate.txt`. The traceroute output is the same piped
or on a terminal, apart from colour.

## How it was captured (2026-10-14)

- **hammerhead:** main at `f3339400a9eb94275eecaa01917c577908e5f347`.
  - Build: `cargo build --release -p hammerhead-cli` with rustc 1.99.0. It prints `hammerhead 0.2.0`; binary sha256 `ff155f791608b461c41d78effe1fd467b22dc116625cf8bd543f0b28efbd3b22`.
  - A licensed run; the licence doesn't appear in the output.
- **Machine:** Apple M5 Pro, 48 GB, macOS 27.0.1. Other agents were compiling on it, so the 1-minute load average was 13.2 to 13.7 on 18 cores.
- **Corpus:** `python3 tools/benchmarks/enterprise_1000.py --out <dir>/configs`, from the same commit: 976 files. Concatenated in path order, the files hash to sha256 `3ae3a0ffef9eec4d7cccd6fb3abcdb5539223b1a6c9d433ae66c7a3a3f189c50`.
- **simulate:** run from `<dir>` as `hammerhead simulate ./configs`, 5 times. The `done` lines read 787, 726, 725, 717 and 715 ms. The median run (725 ms) is the one committed and shown. All five runs printed the same per-device output.
- **traceroute:** run from the root of the hammerhead checkout, where `tests/configs/triangle` is the bundled three-router lab.

The timing in the animation is whatever that run printed. The published
benchmark in hammerhead `README.md` measures `simulate` wall time with
`/usr/bin/time`: 0.71 s on 2026-09-22 and 0.60 s on 2026-09-23 (median of 5).

## Excerpt shown

- **simulate:** lines 1–10 of `simulate.txt`, up to and including the `done` line, then `  …`. The other 4,882 lines are left out: a blank line, then the per-device RIB/FIB/OSPF summaries for all 976 devices, ending with `Topology warnings: 1780`.
- **traceroute:** all 3 lines.
