#!/usr/bin/env node
// Run the perft suite. Usage:
//   node scripts/run-perft.mjs                # default: depth 4
//   node scripts/run-perft.mjs 5              # up to depth 5
//   node scripts/run-perft.mjs divide 3 fen…  # divide-perft for debug

import { Board } from '../js/engine/core/board.js';
import { generateLegal } from '../js/engine/core/movegen.js';
import { perft, perftDivide, runPerftSuite } from '../js/engine/core/perft.js';
import { moveFrom, moveTo, movePromo, moveIsCap, moveIsEp, moveIsCast } from '../js/engine/core/board.js';
import { squareName, PIECE_CHARS } from '../js/engine/core/squares.js';

function moveStr(m) {
  const f = squareName(moveFrom(m));
  const t = squareName(moveTo(m));
  const p = movePromo(m);
  return f + t + (p ? PIECE_CHARS[p].toLowerCase() : '');
}

const args = process.argv.slice(2);
if (args[0] === 'divide') {
  const depth = parseInt(args[1], 10);
  const fen = args.slice(2).join(' ');
  const b = Board.fromFen(fen);
  const breakdown = perftDivide(b, depth);
  let total = 0;
  breakdown.sort((a, b) => moveStr(a.move).localeCompare(moveStr(b.move)));
  for (const { move, nodes } of breakdown) {
    console.log(`${moveStr(move)}: ${nodes}`);
    total += nodes;
  }
  console.log(`\ntotal: ${total}`);
} else {
  const depth = parseInt(args[0] || '4', 10);
  const ok = runPerftSuite(depth);
  process.exit(ok ? 0 : 1);
}
