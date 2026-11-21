import pytest

from turkmen_num2words import number_to_turkmen as tn

# Verified against Wiktionary Appendix:Turkmen numerals and Gray's grammar.
KNOWN = {
    0: "nol",
    1: "bir",
    2: "iki",
    3: "üç",
    4: "dört",
    5: "bäş",
    6: "alty",
    7: "ýedi",
    8: "sekiz",
    9: "dokuz",
    10: "on",
    11: "on bir",
    15: "on bäş",
    19: "on dokuz",
    20: "ýigrimi",
    21: "ýigrimi bir",
    32: "otuz iki",
    40: "kyrk",
    55: "elli bäş",
    60: "altmyş",
    70: "ýetmiş",
    80: "segsen",
    90: "togsan",
    99: "togsan dokuz",
    100: "ýüz",
    101: "ýüz bir",
    150: "ýüz elli",
    200: "iki ýüz",
    555: "bäş ýüz elli bäş",
    999: "dokuz ýüz togsan dokuz",
    1000: "müň",
    1001: "müň bir",
    1234: "müň iki ýüz otuz dört",
    2000: "iki müň",
    352000: "üç ýüz elli iki müň",
    1000000: "bir million",
    2000000: "iki million",
    1000000000: "bir milliard",
}


@pytest.mark.parametrize("n,expected", KNOWN.items())
def test_known_values(n, expected):
    assert tn(n) == expected


def test_gray_worked_example():
    # The authoritative compound example this library is validated against.
    assert tn(1352647) == "bir million üç ýüz elli iki müň alty ýüz kyrk ýedi"


def test_hundred_and_thousand_drop_bir_but_million_keeps_it():
    assert tn(100) == "ýüz"  # not "bir ýüz"
    assert tn(1000) == "müň"  # not "bir müň"
    assert tn(1000000) == "bir million"  # keeps "bir"
    assert tn(1000000000) == "bir milliard"  # keeps "bir"


def test_negatives():
    assert tn(-1) == "minus bir"
    assert tn(-100) == "minus ýüz"
    assert tn(-1352647) == "minus bir million üç ýüz elli iki müň alty ýüz kyrk ýedi"


def test_max_supported():
    assert tn(999999999999) == (
        "dokuz ýüz togsan dokuz milliard "
        "dokuz ýüz togsan dokuz million "
        "dokuz ýüz togsan dokuz müň "
        "dokuz ýüz togsan dokuz"
    )


def test_out_of_range_raises():
    with pytest.raises(ValueError):
        tn(10**12)
    with pytest.raises(ValueError):
        tn(-(10**12))


def test_type_errors():
    with pytest.raises(TypeError):
        tn(1.5)
    with pytest.raises(TypeError):
        tn(True)  # bool is not accepted as an int here


def test_no_double_spaces_and_trimmed():
    for n in [0, 7, 100, 1000, 1000000, 1001001, 1352647, 999999999999]:
        s = tn(n)
        assert "  " not in s
        assert s == s.strip()
