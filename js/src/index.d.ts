// Type declarations for @garag0l/turkmen-num2words.

/** The word for zero ("nol"). */
export declare const ZERO: string;

/** The prefix used for negative numbers ("minus"). */
export declare const NEGATIVE_PREFIX: string;

/** Exclusive upper bound of the supported range (10 ** 12). */
export declare const MAX: number;

/**
 * Return the Turkmen (modern Latin) cardinal words for the integer `n`.
 *
 * Supports `-(10 ** 12) < n < 10 ** 12`.
 *
 * @throws {TypeError} if `n` is not a safe integer.
 * @throws {RangeError} if `n` is outside the supported range.
 *
 * @example
 * numberToTurkmen(1234); // "müň iki ýüz otuz dört"
 * numberToTurkmen(-5);   // "minus bäş"
 */
export declare function numberToTurkmen(n: number): string;
