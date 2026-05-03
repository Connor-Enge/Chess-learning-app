#!/usr/bin/env node
// Self-play demo: the engine plays a complete legal game against itself.
// M2 acceptance test — proves the search loop produces legal moves end-to-end.
//
// Usage:
//   node scripts/self-play.mjs                    # default: 100 ms per move
//   node scripts/self-play.mjs --time 500         # 500 ms per move
//   node scripts/self-play.mjs --depth 4          # fixed depth instead

import { engine } from '../js/engine/engine-client.js';
import { Board } from '../js/engine/core/board.js';
import { generateLegal, isSquareAttacked } from '../js/engine/core/movegen.js';
import { moveFrom, moveTo, movePromo } from '../js/engine/core/board.js';
import { squareName, PIECE_CHARS, WHITE } from '../js/engine/core/squares.js';

const args = process.argv.slice(2);
let timeMs = 100;
let depth = 64;
let maxPlies = 300;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--time') timeMs = parseInt(args[++i], 10);
  else if (args[i] === '--depth') depth = parseInt(args[++i], 10);
  else if (args[i] === '--maxplies') maxPlies = parseInt(args[++i], 10);
}

function fmtScore(cp) {
  if (cp == null) return '   ?';
  const sign = cp >= 0 ? '+' : '';
  return `${sign}${(cp / 100).toFixed(2).padStart(6)}`;
}

let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const moveStrs = [];
const t0 = Date.now();
let ply = 0;
let totalNodes = 0;

console.log(`Self-play, ${timeMs}ms/move, depth cap ${depth}, max ${maxPlies} plies`);
console.log('────────────────────────────────────────────────────────────────');

while (ply < maxPlies) {
  const b = Board.fromFen(fen);
  const legal = generateLegal(b);
  if (legal.length === 0) {
    const inCheck = isSquareAttacked(b, b.kingSquare(b.stm), b.stm ^ 1);
    if (inCheck) {
      const winner = b.stm === WHITE ? 'BLACK' : 'WHITE';
      console.log(`\n# Checkmate. ${winner} wins. (after ${ply} plies)`);
    } else {
      console.log(`\n# Stalemate. Draw. (after ${ply} plies)`);
    }
    break;
  }
  // Detect 50-move rule
  if (b.halfmoveClock >= 100) {
    console.log(`\n# Draw by 50-move rule. (after ${ply} plies)`);
    break;
  }

  const result = await engine.go({ fen, timeMs, depth });
  if (!result.bestMove) {
    console.log(`\n# Engine returned no move. Aborting.`);
    break;
  }
  totalNodes += result.nodes;

  // Pretty-print: turn number + move + score + nodes + depth
  const turnNum = b.stm === WHITE ? `${b.fullmoveNumber}.` : `${b.fullmoveNumber}…`;
  const sideTag = b.stm === WHITE ? 'W' : 'B';
  console.log(`${(ply + 1).toString().padStart(3)}  ${sideTag} ${turnNum.padEnd(5)} ${result.bestMove.padEnd(7)} score=${fmtScore(result.score)}  d=${String(result.depth).padStart(2)}  nodes=${String(result.nodes).padStart(7)}  ${result.time}ms`);

  fen = engine.makeMove(fen, result.bestMove);
  moveStrs.push(result.bestMove);
  ply++;
}

if (ply >= maxPlies) {
  console.log(`\n# Hit max plies (${maxPlies}) — game truncated.`);
}

const dt = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\nFinal FEN: ${fen}`);
console.log(`Total: ${ply} plies, ${totalNodes.toLocaleString()} nodes, ${dt}s`);
console.log(`Moves (UCI): ${moveStrs.join(' ')}`);
