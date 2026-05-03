// Square / file / rank constants and helpers.
// Squares are numbered 0..63: a1=0, b1=1, ..., h1=7, a2=8, ..., h8=63.
// File: 0..7 = a..h. Rank: 0..7 = 1..8.

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

export function fileOf(sq) { return sq & 7; }
export function rankOf(sq) { return sq >> 3; }
export function makeSquare(file, rank) { return rank * 8 + file; }

/** "e4" → 28. Returns -1 for "-" (used in en-passant fields). */
export function squareFromName(name) {
  if (!name || name === '-') return -1;
  const f = name.charCodeAt(0) - 97;
  const r = name.charCodeAt(1) - 49;
  return r * 8 + f;
}

export function squareName(sq) {
  if (sq < 0 || sq > 63) return '-';
  return FILES[fileOf(sq)] + RANKS[rankOf(sq)];
}

// Color constants
export const WHITE = 0;
export const BLACK = 1;
export const NONE  = 2;

// Piece-type indices (used in arrays of size 6).
export const PAWN   = 0;
export const KNIGHT = 1;
export const BISHOP = 2;
export const ROOK   = 3;
export const QUEEN  = 4;
export const KING   = 5;

export const PIECE_CHARS = ['P', 'N', 'B', 'R', 'Q', 'K'];
export const PIECE_FROM_CHAR = {
  P: PAWN, N: KNIGHT, B: BISHOP, R: ROOK, Q: QUEEN, K: KING,
  p: PAWN, n: KNIGHT, b: BISHOP, r: ROOK, q: QUEEN, k: KING,
};

// Castling rights bitmask (used in CastlingRights field of board state)
export const CR_WK = 1;        // White kingside
export const CR_WQ = 2;        // White queenside
export const CR_BK = 4;        // Black kingside
export const CR_BQ = 8;        // Black queenside
export const CR_ALL = 15;
