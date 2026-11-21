# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-11-21

Initial release.

### Added
- `number_to_turkmen(n)` in the `turkmen_num2words` package (zero dependencies):
  converts integers to Turkmen Latin cardinal words for `-(10**12) < n < 10**12`.
- `tm-num` command-line tool (args, stdin, multiple numbers, error exit codes).
- Composition grounded in Wiktionary's Turkmen numerals and reproducing Gray's
  worked example `1 352 647` exactly; `ýüz`/`müň` drop "bir", `million`/
  `milliard` keep it. Every decision and spelling variant is in
  `docs/numbers.md`.
- CI across Linux/macOS/Windows on Python 3.9–3.13.
