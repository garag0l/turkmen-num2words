"""turkmen-num2words: integers to Turkmen (Latin) cardinal words.

>>> from turkmen_num2words import number_to_turkmen
>>> number_to_turkmen(1352647)
'bir million üç ýüz elli iki müň alty ýüz kyrk ýedi'
"""

from __future__ import annotations

from .numbers import number_to_turkmen

__all__ = ["__version__", "number_to_turkmen"]
__version__ = "0.1.1"
