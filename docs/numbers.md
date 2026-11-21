# Turkmen number-word decisions

Every spelling and composition choice this library makes, with its source.

## Sources

- **Wiktionary, Appendix:Turkmen numerals** — 0 = `nol`; units; tens; `ýüz`
  (100, listed alone, not `bir ýüz`); `müň` (1000).
- **R. Gray, *A Short Descriptive Grammar of Turkmen* (SIL)** — the worked
  compound `1,352,647 = "bir million üç ýüz elli iki müň alty ýüz kyrk ýedi"`,
  which this library reproduces exactly (pinned in the tests).
- **Wiktionary translation table** — `milliard` for 10⁹ (long-scale, as in many
  European languages and via Russian).

## Letters

| Value | Word | | Value | Word |
|---|---|---|---|---|
| 0 | nol | | 10 | on |
| 1 | bir | | 20 | ýigrimi |
| 2 | iki | | 30 | otuz |
| 3 | üç | | 40 | kyrk |
| 4 | dört | | 50 | elli |
| 5 | bäş | | 60 | altmyş |
| 6 | alty | | 70 | ýetmiş |
| 7 | ýedi | | 80 | segsen |
| 8 | sekiz | | 90 | togsan |
| 9 | dokuz | | 100 | ýüz |
| | | | 1000 | müň |
| | | | 10⁶ | million |
| | | | 10⁹ | milliard |

## Composition

- A multiplier comes **before** its scale word: `iki ýüz` (200), `üç müň` (3000).
- `ýüz` (100) and `müň` (1000) **drop** the multiplier when it is 1:
  `100 → ýüz`, `1000 → müň` (not `bir ýüz`, not `bir müň`).
- The borrowed scale words `million` and `milliard` **keep** the multiplier:
  `1 000 000 → bir million`, `1 000 000 000 → bir milliard`. This matches Gray's
  example and the wider Turkic pattern (cf. Turkish *yüz / bin* vs *bir milyon*).
- Tens and units are separate words: `otuz iki` (32), `togsan dokuz` (99).
- Negative numbers are prefixed with `minus` (a loan; the common spoken form).

## Range

Supported: `-(10¹²) < n < 10¹²`. The Turkmen term for 10¹² (trillion) is not
reliably attested in the sources above, so values at or beyond 10¹² raise
`ValueError` rather than guess.

## Spelling variants (not used, recorded for transparency)

- **0:** some learner materials show `nul` (Russian влияние); the standard
  literary form is `nol`.
- **10⁶:** `milýon` appears in some sources; this library uses `million`
  (Gray's grammar).
- **90:** `dogsan` appears dialectally; the standard form is `togsan`.

If you need a different convention for your domain, open an issue — these are
easy to make configurable.

## Not yet covered

- Ordinals (`birinji`, `ikinji`, …), which add a vowel-harmonic suffix.
- Fractions and decimals.

These are deliberately out of scope for 0.1.0 so the cardinal output stays
fully verified.
