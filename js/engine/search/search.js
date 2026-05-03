// M2 search: negamax + alpha-beta + iterative deepening + a small
// quiescence search. No transposition table, no killer/history, no LMR/NMP
// yet — those land in M4 with the rest of the search-tuning suite.
//
// Time/depth limits supported. Returns best move + score + PV + nodes.

import { generateLegal } from '../core/movegen.js';
import { evaluate } from '../eval/eval.js';
import { isSquareAttacked } from '../core/movegen.js';
import { moveIsCap, moveIsEp, movePromo, moveTo, moveFrom } from '../core/board.js';

const MATE = 30000;
const INF = 100000;

/** Side-to-move POV mate-in-N score. */
function mateScore(plyFromRoot) { return -MATE + plyFromRoot; }

/**
 * Quiescence search — extend along captures only to avoid the horizon
 * effect (e.g. the engine "wins" a queen at the leaf only because it's
 * about to lose its own queen on the next move).
 */
function qsearch(board, alpha, beta, ply, ctrl) {
  ctrl.nodes++;
  if (ctrl.aborted) return 0;
  if (ply > ctrl.maxPly) ctrl.maxPly = ply;

  const standPat = evaluate(board);
  if (standPat >= beta) return beta;
  if (standPat > alpha) alpha = standPat;

  const moves = generateLegal(board);
  // Order captures first by simple MVV/LVA-ish: rely on movegen order for
  // now; M4 adds proper ordering.
  for (const m of moves) {
    // Only consider tactical moves in qsearch (captures + promotions).
    if (!moveIsCap(m) && !movePromo(m)) continue;
    board.makeMove(m);
    const s = -qsearch(board, -beta, -alpha, ply + 1, ctrl);
    board.unmakeMove();
    if (ctrl.aborted) return 0;
    if (s >= beta) return beta;
    if (s > alpha) alpha = s;
  }
  return alpha;
}

function alphaBeta(board, depth, alpha, beta, ply, ctrl, pvLine) {
  ctrl.nodes++;
  if (ctrl.aborted) return 0;
  // Time check every 4096 nodes
  if ((ctrl.nodes & 0xFFF) === 0 && Date.now() >= ctrl.deadline) {
    ctrl.aborted = true;
    return 0;
  }

  if (depth === 0) {
    pvLine.length = 0;
    return qsearch(board, alpha, beta, ply, ctrl);
  }

  const moves = generateLegal(board);
  if (moves.length === 0) {
    pvLine.length = 0;
    // Checkmate or stalemate
    const inCheck = isSquareAttacked(board, board.kingSquare(board.stm), board.stm ^ 1);
    return inCheck ? mateScore(ply) : 0;
  }

  let bestScore = -INF;
  const childPv = [];

  for (const m of moves) {
    board.makeMove(m);
    const s = -alphaBeta(board, depth - 1, -beta, -alpha, ply + 1, ctrl, childPv);
    board.unmakeMove();
    if (ctrl.aborted) return 0;

    if (s > bestScore) {
      bestScore = s;
      pvLine.length = 0;
      pvLine.push(m, ...childPv);
    }
    if (s > alpha) alpha = s;
    if (alpha >= beta) break;     // beta cutoff
  }

  return bestScore;
}

/**
 * Iterative deepening from depth 1 up to maxDepth (or until time runs out).
 * Returns the best result reached at the highest fully-completed depth.
 *
 * @param {Board} board
 * @param {object} opts  { maxDepth, timeMs }
 * @returns {{bestMove, score, pv, depth, nodes, time, completed}}
 */
export function searchIterative(board, { maxDepth = 4, timeMs = 1000 } = {}) {
  const t0 = Date.now();
  const deadline = t0 + Math.max(50, timeMs);

  // Seed best with the first legal move (in movegen order). This guarantees
  // we never return null even if the very first iteration aborts.
  const rootMoves = generateLegal(board);
  let best = {
    bestMove: rootMoves[0] ?? null,
    score: 0,
    pv: rootMoves[0] ? [rootMoves[0]] : [],
    depth: 0,
    nodes: 0,
    time: 0,
    completed: 0,
  };
  if (rootMoves.length === 0) return best;

  // Depth 1 is so cheap (≤ a few hundred positions) that we run it without
  // the time-abort hot-path. After that, iterative deepening with the
  // deadline kicks in.
  {
    const ctrl = { nodes: 0, maxPly: 0, deadline: Infinity, aborted: false };
    const pv = [];
    const score = alphaBeta(board, 1, -INF, INF, 0, ctrl, pv);
    best = {
      bestMove: pv[0] ?? best.bestMove,
      score,
      pv: pv.slice(),
      depth: 1,
      nodes: ctrl.nodes,
      time: Date.now() - t0,
      completed: 1,
    };
    if (Math.abs(score) > MATE - 1000) return best;
  }

  // Continue from depth 2 with time control.
  const ctrl = { nodes: best.nodes, maxPly: 0, deadline, aborted: false };
  for (let d = 2; d <= maxDepth; d++) {
    if (Date.now() >= deadline) break;
    const pv = [];
    const score = alphaBeta(board, d, -INF, INF, 0, ctrl, pv);
    if (ctrl.aborted) break;
    best = {
      bestMove: pv[0] ?? best.bestMove,
      score,
      pv: pv.slice(),
      depth: d,
      nodes: ctrl.nodes,
      time: Date.now() - t0,
      completed: d,
    };
    if (Math.abs(score) > MATE - 1000) break;
  }
  best.nodes = ctrl.nodes;
  best.time = Date.now() - t0;
  return best;
}

/** Single fixed-depth search (no time cap). Mostly for tests. */
export function searchFixed(board, depth) {
  const ctrl = { nodes: 0, maxPly: 0, deadline: Infinity, aborted: false };
  const pv = [];
  const score = alphaBeta(board, depth, -INF, INF, 0, ctrl, pv);
  return {
    bestMove: pv[0] ?? null,
    score, pv, depth, nodes: ctrl.nodes,
    time: 0, completed: depth,
  };
}
