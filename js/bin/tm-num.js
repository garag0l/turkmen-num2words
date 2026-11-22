#!/usr/bin/env node
// CLI for @garag0l/turkmen-num2words. Mirrors the Python tm-num command.
//
//   tm-num 1234            -> müň iki ýüz otuz dört
//   tm-num 7 42 100        -> one line per number
//   echo "99 100" | tm-num -> read integers from stdin

import { numberToTurkmen } from "../src/index.js";

const USAGE = `tm-num — spell out integers in Turkmen (modern Latin)

Usage:
  tm-num 1234              convert one integer
  tm-num 7 42 100          convert several (one line each)
  echo "99 100" | tm-num   read integers from stdin
  tm-num --help | --version
`;

function emit(token) {
  if (!/^[+-]?\d+$/.test(token)) {
    return { line: `error: not an integer: ${JSON.stringify(token)}`, error: true };
  }
  try {
    return { line: numberToTurkmen(Number(token)), error: false };
  } catch (err) {
    return { line: `error: ${err.message}`, error: true };
  }
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function main(argv) {
  const tokens = [];
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(USAGE);
      return 0;
    }
    if (arg === "--version" || arg === "-V") {
      const { readFileSync } = await import("node:fs");
      const pkg = JSON.parse(
        readFileSync(new URL("../package.json", import.meta.url), "utf8"),
      );
      process.stdout.write(`turkmen-num2words ${pkg.version}\n`);
      return 0;
    }
    tokens.push(arg);
  }

  const words = tokens.length ? tokens : (await readStdin()).split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;

  let hadError = false;
  for (const token of words) {
    const { line, error } = emit(token);
    if (error) hadError = true;
    process.stdout.write(line + "\n");
  }
  return hadError ? 1 : 0;
}

main(process.argv.slice(2)).then((code) => process.exit(code));
