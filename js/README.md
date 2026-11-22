# @garag0l/turkmen-num2words

Spell out integers in **Turkmen** (modern Latin) cardinal words. Zero
dependencies, ESM, with TypeScript types. The JavaScript port of the Python
package [`turkmen-num2words`](https://github.com/garag0l/turkmen-num2words);
both share the same rules and test values.

```js
import { numberToTurkmen } from "@garag0l/turkmen-num2words";

numberToTurkmen(1234); // "müň iki ýüz otuz dört"
numberToTurkmen(1352647); // "bir million üç ýüz elli iki müň alty ýüz kyrk ýedi"
numberToTurkmen(-5); // "minus bäş"
```

## Install

```sh
npm install @garag0l/turkmen-num2words
```

## CLI

```sh
npx tm-num 1234            # müň iki ýüz otuz dört
npx tm-num 7 42 100        # one line per number
echo "99 100" | npx tm-num # read integers from stdin
```

## API

### `numberToTurkmen(n)`

Returns the Turkmen cardinal words for the integer `n`. Supports
`-(10 ** 12) < n < 10 ** 12`.

- Throws `TypeError` if `n` is not a safe integer.
- Throws `RangeError` if `n` is outside the supported range. The Turkmen term
  for 10¹² is not reliably attested, so the library refuses it rather than
  guess.

## How the words are built

A multiplier precedes its scale word (`iki ýüz`, `üç müň`). The scale words
`ýüz` (100) and `müň` (1000) **drop** the multiplier `bir` when it is 1, while
the borrowed `million` (10⁶) and `milliard` (10⁹) **keep** it — so `100` is
`ýüz` but `1 000 000` is `bir million`. Every decision and the spelling variants
are documented in [`docs/numbers.md`](../docs/numbers.md). The composition is
grounded in Wiktionary's Appendix:Turkmen numerals and reproduces the worked
example from R. Gray's *A Short Descriptive Grammar of Turkmen* exactly.

## License

MIT © Murat Bekgi. For authorized testing and defense only.
