# turkmen-num2words

**Spell out integers in Turkmen: `1234` → `"müň iki ýüz otuz dört"`.**

[![CI](https://github.com/garag0l/turkmen-num2words/actions/workflows/ci.yml/badge.svg)](https://github.com/garag0l/turkmen-num2words/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Python 3.9+](https://img.shields.io/badge/python-3.9%2B-blue)
![Node 18+](https://img.shields.io/badge/node-18%2B-blue)
![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
[![Web UI](https://img.shields.io/badge/Web_UI-try_in_browser-1f8a5b)](https://garag0l.github.io/turkmen-num2words/)

> 🌐 **No install needed** — [use it in your browser](https://garag0l.github.io/turkmen-num2words/): type a number, see it spelled out in Turkmen, copy the words.

A zero-dependency library and CLI that converts integers into Turkmen
cardinal-number words, in the modern Latin alphabet. Useful for text-to-speech,
language learning, receipts and invoices, and spelling out amounts. Available
for both **Python** and **JavaScript/TypeScript**.

```console
$ tm-num 1352647
bir million üç ýüz elli iki müň alty ýüz kyrk ýedi
$ tm-num 0 100 1000 -5
nol
ýüz
müň
minus bäş
```

## Why trust the output

The numbers come straight from primary sources, and the library reproduces the
one authoritative worked example exactly:

> **1 352 647** → `bir million üç ýüz elli iki müň alty ýüz kyrk ýedi`
> — *A Short Descriptive Grammar of Turkmen*, R. Gray (SIL).

Every spelling and composition decision — why `100` is `ýüz` (not `bir ýüz`) but
`1 000 000` is `bir million`, which spelling of 90 and zero are standard, where
the range stops — is documented in [docs/numbers.md](docs/numbers.md), with the
alternatives listed for transparency.

## Install

```bash
pipx install turkmen-num2words     # for the tm-num command
# or
pip install turkmen-num2words      # for the library
```

Python 3.9+, no third-party dependencies.

## Use

```python
from turkmen_num2words import number_to_turkmen

number_to_turkmen(21)  # 'ýigrimi bir'
number_to_turkmen(100)  # 'ýüz'
number_to_turkmen(2000)  # 'iki müň'
number_to_turkmen(1000000)  # 'bir million'
number_to_turkmen(-5)  # 'minus bäş'
```

```bash
tm-num 42                    # one number
tm-num 7 42 100              # several (one line each)
echo "99 100" | tm-num       # from stdin
```

### JavaScript / TypeScript

The npm package [`@garag0l/turkmen-num2words`](https://www.npmjs.com/package/@garag0l/turkmen-num2words)
(in [`js/`](js/)) shares the same rules and test values.

```bash
npm install @garag0l/turkmen-num2words
```

```js
import { numberToTurkmen } from "@garag0l/turkmen-num2words";

numberToTurkmen(1234); // "müň iki ýüz otuz dört"
numberToTurkmen(-5); // "minus bäş"
```

```bash
npx tm-num 1234              # müň iki ýüz otuz dört
```

## Range

Supports `-(10¹²) < n < 10¹²`. Values at or beyond 10¹² raise `ValueError`,
because the Turkmen word for a trillion isn't reliably attested — the library
refuses to guess rather than print something wrong.

## Tested

- A table of known values from `0` through `999 999 999 999`, the Gray compound
  example, the `ýüz/müň` drop-"bir" rule vs `million/milliard` keep-"bir",
  negatives, range limits, and type errors.
- The CLI (args, stdin, multiple numbers, error exit codes).
- CI on Linux/macOS/Windows across Python 3.9–3.13.

## Roadmap

- Ordinals (`birinji`, `ikinji`, …) with correct vowel harmony.
- Pairs well with [turkmen-translit](https://github.com/garag0l/turkmen-translit)
  for full Turkmen text handling.

## Contributing

Issues and PRs welcome — especially sourced corrections to spellings or the
trillion-and-up scale words.

```bash
python -m venv .venv && . .venv/bin/activate
pip install -e ".[dev]"
pytest && ruff check .
```

## License

[MIT](LICENSE). Built by [Murat Bekgi](https://muratbekgi.com).
