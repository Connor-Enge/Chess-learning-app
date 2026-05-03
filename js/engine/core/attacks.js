// Pre-computed attack tables for non-sliding pieces (knight, king, pawn).
// Sliding-piece attacks (rook, bishop, queen) use the classical "shoot a ray
// until you hit a piece" approach in this M1 cut. M2/M3 may upgrade to magic
// bitboards for speed; correctness is identical.

import { ZERO, ONE, FULL, bit, north, south, east, west, northEast, northWest, southEast, southWest, FILE_A, FILE_H, NOT_FILE_A, NOT_FILE_H, NOT_FILE_AB, NOT_FILE_GH } from './bitboard.js';
import { fileOf, rankOf, makeSquare, WHITE, BLACK } from './squares.js';

// ── Knight attacks ─────────────────────────────────────────────────────────
export const KNIGHT_ATTACKS = new Array(64);
for (let sq = 0; sq < 64; sq++) {
  const b = bit(sq);
  let a = ZERO;
  // 8 knight L-jumps with file-wrap masks
  a |= ((b & NOT_FILE_H) << 17n) & FULL;   // NNE
  a |= ((b & NOT_FILE_A) << 15n) & FULL;   // NNW
  a |= ((b & NOT_FILE_GH) << 10n) & FULL;  // ENE
  a |= ((b & NOT_FILE_AB) << 6n) & FULL;   // WNW
  a |= ((b & NOT_FILE_GH) >> 6n);          // ESE
  a |= ((b & NOT_FILE_AB) >> 10n);         // WSW
  a |= ((b & NOT_FILE_H) >> 15n);          // SSE
  a |= ((b & NOT_FILE_A) >> 17n);          // SSW
  KNIGHT_ATTACKS[sq] = a;
}

// ── King attacks ───────────────────────────────────────────────────────────
export const KING_ATTACKS = new Array(64);
for (let sq = 0; sq < 64; sq++) {
  const b = bit(sq);
  let a = ZERO;
  a |= north(b);
  a |= south(b);
  a |= east(b);
  a |= west(b);
  a |= northEast(b);
  a |= northWest(b);
  a |= southEast(b);
  a |= southWest(b);
  KING_ATTACKS[sq] = a;
}

// ── Pawn attacks ───────────────────────────────────────────────────────────
// PAWN_ATTACKS[color][square] = bitboard of squares this pawn ATTACKS
// (not including pushes — pushes are handled separately in movegen).
export const PAWN_ATTACKS = [new Array(64), new Array(64)];
for (let sq = 0; sq < 64; sq++) {
  const b = bit(sq);
  // White pawn attacks NW + NE
  PAWN_ATTACKS[WHITE][sq] = northWest(b) | northEast(b);
  // Black pawn attacks SW + SE
  PAWN_ATTACKS[BLACK][sq] = southWest(b) | southEast(b);
}

// ── Sliding attacks via ray-cast (classical) ──────────────────────────────
// Direction offsets: +N, +S, +E, +W and the four diagonals.
// We loop, OR'ing in each step's bit, stopping when we hit a piece or the edge.

function rayAttack(sq, occ, deltaFile, deltaRank) {
  let a = ZERO;
  let f = fileOf(sq) + deltaFile;
  let r = rankOf(sq) + deltaRank;
  while (f >= 0 && f < 8 && r >= 0 && r < 8) {
    const t = makeSquare(f, r);
    a |= bit(t);
    if (occ & bit(t)) break;       // hit a piece — stop ray
    f += deltaFile; r += deltaRank;
  }
  return a;
}

export function bishopAttacks(sq, occ) {
  return rayAttack(sq, occ, +1, +1) |
         rayAttack(sq, occ, +1, -1) |
         rayAttack(sq, occ, -1, +1) |
         rayAttack(sq, occ, -1, -1);
}

export function rookAttacks(sq, occ) {
  return rayAttack(sq, occ, +1,  0) |
         rayAttack(sq, occ, -1,  0) |
         rayAttack(sq, occ,  0, +1) |
         rayAttack(sq, occ,  0, -1);
}

export function queenAttacks(sq, occ) {
  return bishopAttacks(sq, occ) | rookAttacks(sq, occ);
}
