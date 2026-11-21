"""CLI for turkmen-num2words.

tm-num 1234                 -> müň iki ýüz otuz dört
tm-num 7 42 100             -> one line per number
echo "99\n100" | tm-num     -> read integers from stdin (one per line)
"""

from __future__ import annotations

import argparse
import sys

from . import __version__
from .numbers import number_to_turkmen


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="tm-num",
        description="Convert integers to Turkmen cardinal-number words.",
    )
    p.add_argument("numbers", nargs="*", help="integers to convert (or read stdin)")
    p.add_argument("--version", action="version", version=f"turkmen-num2words {__version__}")
    return p


def _emit(value: str) -> str:
    try:
        n = int(value)
    except ValueError:
        return f"error: not an integer: {value!r}"
    try:
        return number_to_turkmen(n)
    except (ValueError, TypeError) as exc:
        return f"error: {exc}"


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    tokens: list[str] = []
    if args.numbers:
        tokens = args.numbers
    else:
        tokens = sys.stdin.read().split()
    if not tokens:
        return 0

    reconfigure = getattr(sys.stdout, "reconfigure", None)
    if callable(reconfigure):
        try:
            reconfigure(encoding="utf-8")
        except (ValueError, OSError):
            pass

    had_error = False
    for tok in tokens:
        line = _emit(tok)
        if line.startswith("error:"):
            had_error = True
        sys.stdout.write(line + "\n")
    return 1 if had_error else 0


if __name__ == "__main__":
    raise SystemExit(main())
