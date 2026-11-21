import io

import pytest

from turkmen_num2words.cli import main


def test_single(capsys):
    assert main(["1234"]) == 0
    assert capsys.readouterr().out == "müň iki ýüz otuz dört\n"


def test_multiple(capsys):
    assert main(["0", "7", "100"]) == 0
    assert capsys.readouterr().out == "nol\nýedi\nýüz\n"


def test_negative(capsys):
    assert main(["-5"]) == 0
    assert capsys.readouterr().out == "minus bäş\n"


def test_stdin(capsys, monkeypatch):
    monkeypatch.setattr("sys.stdin", io.StringIO("99 100"))
    assert main([]) == 0
    assert capsys.readouterr().out == "togsan dokuz\nýüz\n"


def test_not_an_integer_sets_error_exit(capsys):
    assert main(["abc"]) == 1
    assert "not an integer" in capsys.readouterr().out


def test_out_of_range_sets_error_exit(capsys):
    assert main(["1000000000000"]) == 1
    assert "out of range" in capsys.readouterr().out


def test_version(capsys):
    with pytest.raises(SystemExit) as e:
        main(["--version"])
    assert e.value.code == 0
    assert "turkmen-num2words" in capsys.readouterr().out
