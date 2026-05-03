// Public API for the custom Chess Academy engine.
//
// At M1 the engine can: parse FEN, generate legal moves, run perft, play a
// random legal move. Search (`go`), evaluation (`evaluate`), per-move
// coaching (`analyzeMove`), and the opening book (`book`) come online in
// later milestones (M2+). Stub methods throw with a clear message so
// callers don't silently get wrong answers.
//
// API stays stable across milestones — only the implementations grow.

import { Board } from './core/board.js';
import { generateLegal } from './core/movegen.js';
import { perft } from './core/perft.js';
import { moveFrom, moveTo, movePromo, moveIsCap, moveIsEp, moveIsCast } from './core/board.js';
import { squareName, PIECE_CHARS } from './core/squares.js';

// ── Move serialization (UCI long-algebraic, e.g. "e2e4", "e7e8q") ─────────
export function moveToUci(m) {
  const f = squareName(moveFrom(m));
  const t = squareName(moveTo(m));
  const p = movePromo(m);
  return f + t + (p ? PIECE_CHARS[p].toLowerCase() : '');
}

export function moveFromUci(board, uci) {
  if (!uci || uci.length < 4) return null;
  const fromSq = uci.charCodeAt(0) - 97 + (uci.charCodeAt(1) - 49) * 8;
  const toSq   = uci.charCodeAt(2) - 97 + (uci.charCodeAt(3) - 49) * 8;
  const promoCh = uci[4];
  const moves = generateLegal(board);
  for (const m of moves) {
    if (moveFrom(m) === fromSq && moveTo(m) === toSq) {
      const p = movePromo(m);
      if (promoCh) {
        const wantP = { q: 4, r: 3, b: 2, n: 1 }[promoCh.toLowerCase()];
        if (p !== wantP) continue;
      } else if (p !== 0) {
        continue;
      }
      return m;
    }
  }
  return null;
}

// ── Public engine API ─────────────────────────────────────────────────────
export const engine = {
  /** Parse a FEN and return a fresh Board. Convenience for the caller. */
  boardFromFen(fen) { return Board.fromFen(fen); },

  /** Legal moves from a FEN, returned as UCI strings. */
  legalMoves(fen) {
    const b = Board.fromFen(fen);
    return generateLegal(b).map(moveToUci);
  },

  /** Apply a UCI move to a FEN and return the resulting FEN. */
  makeMove(fen, uci) {
    const b = Board.fromFen(fen);
    const m = moveFromUci(b, uci);
    if (m === null) throw new Error('illegal move: ' + uci + ' in ' + fen);
    b.makeMove(m);
    return b.toFen();
  },

  /**
   * Perft from a FEN. Used as the M1 correctness gate.
   * @returns {number} leaf-node count at depth N
   */
  perft(fen, depth) {
    const b = Board.fromFen(fen);
    return perft(b, depth);
  },

  /**
   * M1 placeholder for `go`: returns a random legal move (so the engine can
   * already "play" — terribly — before search lands in M2).
   */
  go({ fen }) {
    const b = Board.fromFen(fen);
    const moves = generateLegal(b);
    if (moves.length === 0) {
      return Promise.resolve({ bestMove: null, score: null, pv: [], depth: 0, nodes: 0, time: 0, terminal: true });
    }
    const m = moves[Math.floor(Math.random() * moves.length)];
    return Promise.resolve({
      bestMove: moveToUci(m), score: 0, pv: [moveToUci(m)],
      depth: 0, nodes: moves.length, time: 0,
      note: 'M1 random-move placeholder — search arrives in M2',
    });
  },

  // ── Future API (stubbed) ─────────────────────────────────────────────────
  evaluate(/* { fen, personality } */) {
    throw new Error('engine.evaluate is not implemented yet (arrives in M3)');
  },
  analyzeMove(/* { fenBefore, move, personality } */) {
    throw new Error('engine.analyzeMove is not implemented yet (arrives in M6)');
  },
  book(/* { fen, personality } */) { return null; },   // Always out-of-book pre-M5
  stop() { /* no-op until search runs in a worker (M2+) */ },
  setOption(/* name, value */) { /* no-op */ },
};
