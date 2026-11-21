"""Convert integers to their Turkmen (modern Latin) cardinal-number words.

Grounded in:
- Wiktionary, Appendix:Turkmen numerals (0 nol; units; tens; ýüz; müň).
- A Short Descriptive Grammar of Turkmen (R. Gray, SIL), whose worked example
  1,352,647 = "bir million üç ýüz elli iki müň alty ýüz kyrk ýedi" this module
  reproduces exactly (see tests).

Composition rule (same family as Turkish): a multiplier precedes its scale word
(iki ýüz, üç müň). The scale words ýüz (100) and müň (1000) DROP the multiplier
"bir" when it is 1 (so 100 = "ýüz", 1000 = "müň"), while the borrowed scale words
million (1e6) and milliard (1e9) KEEP it (1,000,000 = "bir million"). See
docs/numbers.md for every decision and the spelling variants.
"""

from __future__ import annotations

ZERO = "nol"
NEGATIVE_PREFIX = "minus"

# Units 1-9.
_UNITS = ["", "bir", "iki", "üç", "dört", "bäş", "alty", "ýedi", "sekiz", "dokuz"]

# Tens 10-90 indexed by the tens digit (index 1 -> 10, ... 9 -> 90).
_TENS = ["", "on", "ýigrimi", "otuz", "kyrk", "elli", "altmyş", "ýetmiş", "segsen", "togsan"]

_HUNDRED = "ýüz"

# Scale words for each 1000-group, from the least significant.
# (word, keep_bir): ýüz/müň drop "bir" at 1; million/milliard keep it.
_SCALES = [
    ("", False),  # 1e0  group: the final 0-999
    ("müň", False),  # 1e3
    ("million", True),  # 1e6
    ("milliard", True),  # 1e9
]

_MAX = 1000 ** len(_SCALES)  # 1e12; trillion term is unverified, so we stop here.


def _below_thousand(n: int) -> str:
    """Words for 1..999 (n must be in that range)."""
    parts: list[str] = []
    hundreds, rest = divmod(n, 100)
    if hundreds:
        # 100 -> "ýüz"; 200 -> "iki ýüz".
        if hundreds > 1:
            parts.append(_UNITS[hundreds])
        parts.append(_HUNDRED)
    if rest:
        tens, units = divmod(rest, 10)
        if tens:
            parts.append(_TENS[tens])
        if units:
            parts.append(_UNITS[units])
    return " ".join(parts)


def number_to_turkmen(n: int) -> str:
    """Return the Turkmen cardinal words for the integer ``n``.

    Supports -(10**12) < n < 10**12. Raises ValueError outside that range
    (the Turkmen term for 10**12 is not reliably attested).

    >>> number_to_turkmen(0)
    'nol'
    >>> number_to_turkmen(1234)
    'müň iki ýüz otuz dört'
    >>> number_to_turkmen(-5)
    'minus bäş'
    """
    if not isinstance(n, int) or isinstance(n, bool):
        raise TypeError(f"expected int, got {type(n).__name__}")
    if n == 0:
        return ZERO
    if n < 0:
        return f"{NEGATIVE_PREFIX} {number_to_turkmen(-n)}"
    if n >= _MAX:
        raise ValueError(
            f"{n} is out of range; supported range is 0 .. {_MAX - 1} "
            "(the Turkmen word for 10**12 is not reliably attested)"
        )

    # Split into 1000-groups, least significant first.
    groups: list[int] = []
    rem = n
    while rem:
        rem, g = divmod(rem, 1000)
        groups.append(g)

    chunks: list[str] = []  # most significant first
    for idx in range(len(groups) - 1, -1, -1):
        value = groups[idx]
        if value == 0:
            continue
        scale_word, keep_bir = _SCALES[idx]
        if scale_word == "":
            chunks.append(_below_thousand(value))
        elif value == 1 and not keep_bir:
            # müň (and ýüz, handled above): drop "bir".
            chunks.append(scale_word)
        else:
            chunks.append(f"{_below_thousand(value)} {scale_word}")
    return " ".join(chunks)
