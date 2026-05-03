// Helpers around chess.js — imported from CDN as ESM (named export `Chess`).
import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.6/dist/esm/chess.js';

export { Chess };

export function newChess(fen) {
  return fen ? new Chess(fen) : new Chess();
}

export function legalMovesFrom(chess, square) {
  // chess.js v1 returns objects with { from, to, promotion, flags, san, ... }
  const moves = chess.moves({ square, verbose: true });
  // collapse duplicate destinations (promotion variants share the same `to`)
  const seen = new Set();
  const out = [];
  for (const m of moves) {
    if (seen.has(m.to)) continue;
    seen.add(m.to);
    out.push({ to: m.to, flags: m.flags, promotion: m.promotion });
  }
  return out;
}

export function isInCheck(chess) {
  if (typeof chess.inCheck === 'function') return chess.inCheck();
  if (typeof chess.in_check === 'function') return chess.in_check();
  return false;
}

export function kingSquare(chess, color) {
  const board = chess.board();
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const cell = board[r][f];
      if (cell && cell.type === 'k' && cell.color === color) {
        return 'abcdefgh'[f] + (8 - r);
      }
    }
  }
  return null;
}

export function tryMove(chess, from, to, promotion) {
  try {
    return chess.move({ from, to, promotion: promotion || 'q' });
  } catch (e) {
    return null;
  }
}

export function turnColor(chess) { return chess.turn(); }

export function gameOverReason(chess) {
  if (typeof chess.isCheckmate === 'function') {
    if (chess.isCheckmate()) return 'checkmate';
    if (chess.isStalemate()) return 'stalemate';
    if (chess.isThreefoldRepetition()) return 'threefold';
    if (chess.isInsufficientMaterial()) return 'insufficient material';
    if (chess.isDraw()) return 'draw (50-move)';
  } else if (typeof chess.in_checkmate === 'function') {
    if (chess.in_checkmate()) return 'checkmate';
    if (chess.in_stalemate()) return 'stalemate';
    if (chess.in_threefold_repetition()) return 'threefold';
    if (chess.insufficient_material()) return 'insufficient material';
    if (chess.in_draw()) return 'draw';
  }
  return null;
}

// Parse a SAN move list ("1. e4 e5 2. Nf3 ...") into ply array
export function sanListToPlies(sanList) {
  if (!sanList) return [];
  return String(sanList)
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\$\d+/g, ' ')
    .replace(/\d+\.(\.\.)?/g, ' ')
    .replace(/(1-0|0-1|1\/2-1\/2|\*)/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Walk a SAN move list and return array of FENs after each move (length = plies+1, includes start)
export function fensForSanList(startFen, sanList) {
  const plies = sanListToPlies(sanList);
  const c = newChess(startFen);
  const fens = [c.fen()];
  const playedPlies = [];
  for (const san of plies) {
    try {
      const mv = c.move(san);
      if (!mv) break;
      playedPlies.push(san);
      fens.push(c.fen());
    } catch (e) {
      // illegal — stop here, return what we have
      break;
    }
  }
  return { fens, plies: playedPlies };
}
