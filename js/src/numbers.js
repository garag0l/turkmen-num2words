// Convert integers to their Turkmen (modern Latin) cardinal-number words.
// Zero dependencies, ESM. Mirrors the Python package turkmen_num2words; see
// ../../docs/numbers.md for every decision and the spelling variants.
//
// Grounded in Wiktionary's Appendix:Turkmen numerals and R. Gray's "A Short
// Descriptive Grammar of Turkmen" (SIL), whose worked example
// 1,352,647 = "bir million üç ýüz elli iki müň alty ýüz kyrk ýedi" this module
// reproduces exactly (see test/numbers.test.js).
//
// Composition rule (same family as Turkish): a multiplier precedes its scale
// word (iki ýüz, üç müň). The scale words ýüz (100) and müň (1000) DROP the
// multiplier "bir" when it is 1, while the borrowed scale words million (1e6)
// and milliard (1e9) KEEP it (1,000,000 = "bir million").

export const ZERO = "nol";
export const NEGATIVE_PREFIX = "minus";

// Units 1-9 (index 0 unused).
const UNITS = ["", "bir", "iki", "üç", "dört", "bäş", "alty", "ýedi", "sekiz", "dokuz"];

// Tens 10-90 indexed by the tens digit (1 -> 10, ... 9 -> 90).
const TENS = ["", "on", "ýigrimi", "otuz", "kyrk", "elli", "altmyş", "ýetmiş", "segsen", "togsan"];

const HUNDRED = "ýüz";

// Scale words for each 1000-group, from the least significant.
// [word, keepBir]: ýüz/müň drop "bir" at 1; million/milliard keep it.
const SCALES = [
  ["", false], // 1e0  group: the final 0-999
  ["müň", false], // 1e3
  ["million", true], // 1e6
  ["milliard", true], // 1e9
];

// 1e12; the Turkmen term for 10**12 is not reliably attested, so we stop here.
export const MAX = 1000 ** SCALES.length;

function belowThousand(n) {
  // Words for 1..999 (n must be in that range).
  const parts = [];
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (hundreds) {
    if (hundreds > 1) parts.push(UNITS[hundreds]); // 100 -> "ýüz"; 200 -> "iki ýüz"
    parts.push(HUNDRED);
  }
  if (rest) {
    const tens = Math.floor(rest / 10);
    const units = rest % 10;
    if (tens) parts.push(TENS[tens]);
    if (units) parts.push(UNITS[units]);
  }
  return parts.join(" ");
}

/**
 * Return the Turkmen cardinal words for the integer `n`.
 *
 * Supports -(10**12) < n < 10**12. Throws RangeError outside that range
 * (the Turkmen term for 10**12 is not reliably attested) and TypeError for
 * anything that is not a safe integer.
 */
export function numberToTurkmen(n) {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new TypeError(`expected an integer, got ${describe(n)}`);
  }
  if (n === 0) return ZERO;
  if (n < 0) return `${NEGATIVE_PREFIX} ${numberToTurkmen(-n)}`;
  if (n >= MAX) {
    throw new RangeError(
      `${n} is out of range; supported range is 0 .. ${MAX - 1} ` +
        "(the Turkmen word for 10**12 is not reliably attested)",
    );
  }

  // Split into 1000-groups, least significant first.
  const groups = [];
  let rem = n;
  while (rem) {
    groups.push(rem % 1000);
    rem = Math.floor(rem / 1000);
  }

  const chunks = []; // most significant first
  for (let idx = groups.length - 1; idx >= 0; idx -= 1) {
    const value = groups[idx];
    if (value === 0) continue;
    const [scaleWord, keepBir] = SCALES[idx];
    if (scaleWord === "") {
      chunks.push(belowThousand(value));
    } else if (value === 1 && !keepBir) {
      chunks.push(scaleWord); // müň / ýüz: drop "bir"
    } else {
      chunks.push(`${belowThousand(value)} ${scaleWord}`);
    }
  }
  return chunks.join(" ");
}

function describe(value) {
  if (typeof value === "number") return `the non-integer number ${value}`;
  return typeof value;
}
