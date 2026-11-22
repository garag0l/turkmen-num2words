import assert from "node:assert/strict";
import { test } from "node:test";

import { numberToTurkmen as tn, MAX } from "../src/index.js";

// Verified against Wiktionary Appendix:Turkmen numerals and Gray's grammar.
const KNOWN = {
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
};

test("known values match primary sources", () => {
  for (const [n, expected] of Object.entries(KNOWN)) {
    assert.equal(tn(Number(n)), expected, `n=${n}`);
  }
});

test("Gray worked example (the authoritative compound)", () => {
  assert.equal(tn(1352647), "bir million üç ýüz elli iki müň alty ýüz kyrk ýedi");
});

test("ýüz/müň drop bir, million/milliard keep it", () => {
  assert.equal(tn(100), "ýüz"); // not "bir ýüz"
  assert.equal(tn(1000), "müň"); // not "bir müň"
  assert.equal(tn(1000000), "bir million");
  assert.equal(tn(1000000000), "bir milliard");
});

test("negatives", () => {
  assert.equal(tn(-1), "minus bir");
  assert.equal(tn(-100), "minus ýüz");
  assert.equal(tn(-1352647), "minus bir million üç ýüz elli iki müň alty ýüz kyrk ýedi");
});

test("maximum supported value", () => {
  assert.equal(
    tn(999999999999),
    "dokuz ýüz togsan dokuz milliard " +
      "dokuz ýüz togsan dokuz million " +
      "dokuz ýüz togsan dokuz müň " +
      "dokuz ýüz togsan dokuz",
  );
});

test("out-of-range throws RangeError", () => {
  assert.throws(() => tn(MAX), RangeError);
  assert.throws(() => tn(1000000000000), RangeError);
  assert.throws(() => tn(-MAX), RangeError);
});

test("non-integers throw TypeError", () => {
  for (const bad of [1.5, NaN, Infinity, "5", null, undefined, true, 10n]) {
    assert.throws(() => tn(bad), TypeError, `input=${String(bad)}`);
  }
});

test("output never has double spaces or edge whitespace", () => {
  for (let n = 0; n <= 2000; n += 1) {
    const out = tn(n);
    assert.doesNotMatch(out, /\s{2,}/, `n=${n}`);
    assert.equal(out, out.trim(), `n=${n}`);
  }
});
