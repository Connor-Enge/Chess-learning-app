// Perft — count leaf nodes at depth N. The standard correctness gate for a
// chess move generator. Any deviation from the canonical numbers means the
// move generator has a bug.

import { Board } from './board.js';
import { generateLegal } from './movegen.js';

export function perft(board, depth) {
  if (depth === 0) return 1;
  const moves = generateLegal(board);
  if (depth === 1) return moves.length;
  let nodes = 0;
  for (const m of moves) {
    board.makeMove(m);
    nodes += perft(board, depth - 1);
    board.unmakeMove();
  }
  return nodes;
}

// Per-move breakdown — useful for narrowing down which sub-tree disagrees
// with the reference. Returns [{move, nodes}].
export function perftDivide(board, depth) {
  const moves = generateLegal(board);
  const out = [];
  for (const m of moves) {
    board.makeMove(m);
    const n = perft(board, depth - 1);
    board.unmakeMove();
    out.push({ move: m, nodes: n });
  }
  return out;
}

// Canonical perft suite (chessprogramming.org/Perft_Results)
export const PERFT_SUITE = [
  {
    name: 'Start position',
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    expected: { 1: 20, 2: 400, 3: 8902, 4: 197281, 5: 4865609, 6: 119060324 },
  },
  {
    name: 'Kiwipete',
    fen: 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1',
    expected: { 1: 48, 2: 2039, 3: 97862, 4: 4085603, 5: 193690690 },
  },
  {
    name: 'Position 3 (endgame)',
    fen: '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1',
    expected: { 1: 14, 2: 191, 3: 2812, 4: 43238, 5: 674624, 6: 11030083 },
  },
  {
    name: 'Position 4',
    fen: 'r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1',
    expected: { 1: 6, 2: 264, 3: 9467, 4: 422333, 5: 15833292 },
  },
  {
    name: 'Position 5',
    fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8',
    expected: { 1: 44, 2: 1486, 3: 62379, 4: 2103487, 5: 89941194 },
  },
  {
    name: 'Position 6',
    fen: 'r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10',
    expected: { 1: 46, 2: 2079, 3: 89890, 4: 3894594, 5: 164075551 },
  },
];

/**
 * Run the perft suite up to maxDepth (capped per-position by the smallest
 * depth available in `expected` for that position).
 */
export function runPerftSuite(maxDepth = 4, log = console.log) {
  let allOk = true;
  for (const { name, fen, expected } of PERFT_SUITE) {
    log(`\n=== ${name} ===`);
    log(`  fen: ${fen}`);
    const board = Board.fromFen(fen);
    for (let d = 1; d <= maxDepth; d++) {
      if (!(d in expected)) break;
      const t0 = Date.now();
      const got = perft(board, d);
      const dt = Date.now() - t0;
      const want = expected[d];
      const ok = got === want;
      if (!ok) allOk = false;
      log(`  depth ${d}: got ${got.toString().padStart(12)}  want ${want.toString().padStart(12)}  [${ok ? 'OK ' : 'BAD'}]  ${dt}ms`);
      if (!ok) break;
    }
  }
  return allOk;
}
