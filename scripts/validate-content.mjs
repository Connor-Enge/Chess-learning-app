#!/usr/bin/env node
// Static validator for the chess-academy content files.
// Usage: node scripts/validate-content.mjs
//
// Checks:
//  - every FEN string has 8 ranks, each summing to 8 squares (digits + letters)
//  - every FEN has exactly one white king and one black king
//  - every FEN has a valid side-to-move character (w or b)

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const FILES = [
  'js/data/puzzles.js',
  'js/data/endgames.js',
  'js/data/games.js',
  'js/data/openings.js',
  'js/data/lessons-calculation.js',
  'js/data/lessons-openings.js',
  'js/data/lessons-endgame.js',
  'js/data/lessons-exchanges.js',
  'js/data/lessons-tactics-deep-a.js',
  'js/data/lessons-tactics-deep-b.js',
  'js/data/lessons-tactics-deep-c.js',
  'js/data/lessons-tactics-advanced.js',
  'js/data/lessons-positional-1.js',
  'js/data/lessons-positional-2.js',
  'js/data/lessons-positional-3.js',
  'js/data/lessons-positional-4.js',
];

const FEN_RE = /["'`](([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8})\s+([wb])\s+([KQkq-]{1,4})\s+([a-h1-8\-]+)(?:\s+\d+\s+\d+)?["'`]/g;

function validateFen(fen) {
  const parts = fen.trim().split(/\s+/);
  if (parts.length < 2) return 'too few fields';
  const ranks = parts[0].split('/');
  if (ranks.length !== 8) return `rank count: ${ranks.length}`;
  for (let i = 0; i < 8; i++) {
    let count = 0;
    for (const ch of ranks[i]) {
      if (/\d/.test(ch)) count += parseInt(ch, 10);
      else if (/[rnbqkpRNBQKP]/.test(ch)) count += 1;
      else return `rank ${i+1} bad char: ${ch}`;
    }
    if (count !== 8) return `rank ${i+1} sum: ${count}`;
  }
  const placement = parts[0];
  const wk = (placement.match(/K/g) || []).length;
  const bk = (placement.match(/k/g) || []).length;
  if (wk !== 1) return `${wk} white kings`;
  if (bk !== 1) return `${bk} black kings`;
  if (!['w','b'].includes(parts[1])) return `bad side-to-move: ${parts[1]}`;
  return null;
}

let totalFens = 0;
let bad = 0;
const flagged = [];

for (const relPath of FILES) {
  const abs = resolve(root, relPath);
  let src;
  try { src = await readFile(abs, 'utf-8'); }
  catch (e) { console.log(`SKIP ${relPath} (${e.code})`); continue; }
  let m;
  let fileFens = 0, fileBad = 0;
  FEN_RE.lastIndex = 0;
  while ((m = FEN_RE.exec(src)) !== null) {
    const fen = m[1] + ' ' + m[3] + ' ' + m[4] + ' ' + m[5];
    fileFens++; totalFens++;
    const err = validateFen(fen);
    if (err) {
      fileBad++; bad++;
      const ctxLine = src.substring(0, m.index).split('\n').length;
      flagged.push({ file: relPath, line: ctxLine, fen: m[0].slice(0, 80), err });
    }
  }
  console.log(`${relPath.padEnd(48)} ${fileFens.toString().padStart(4)} FENs · ${fileBad} bad`);
}

console.log('\n--- Summary ---');
console.log(`Total FENs scanned: ${totalFens}`);
console.log(`Bad FENs:           ${bad}`);
if (flagged.length) {
  console.log('\nFlagged:');
  for (const f of flagged.slice(0, 30)) console.log(`  ${f.file}:${f.line} — ${f.err}\n    ${f.fen}`);
  if (flagged.length > 30) console.log(`  ... and ${flagged.length - 30} more`);
}
process.exit(bad ? 1 : 0);
