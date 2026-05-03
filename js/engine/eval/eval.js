// Minimal evaluation function for M2.
// - Material balance (centipawns)
// - Compact, hand-crafted PSQT for each piece (centralization + king-safety
//   posture for early/middlegame).
// - Returns score from the SIDE-TO-MOVE's perspective (negamax convention).
//
// M3 will replace this with a tapered HCE (mg/eg blending, structure,
// mobility, king safety, etc.). M2's job is just to play legal,
// non-random chess so end-to-end games happen.

import { ZERO, ONE, popcount } from '../core/bitboard.js';
import { WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from '../core/squares.js';

// Material values (centipawns).
export const PIECE_VALUE = [100, 320, 330, 500, 900, 0];   // index by piece type; KING=0 (mate is separate)

// Piece-square tables (white perspective, a1..h8 indexed 0..63).
// Values are in centipawns; meant as nudges toward sensible squares.
//
// Source: hand-tuned from common public-domain PSQT baselines (Sunfish
// initial values, simplified). Will be replaced in M3 by PeSTO-derived
// MG/EG tables with phase tapering.

const PAWN_PSQT = [
   0,   0,   0,   0,   0,   0,   0,   0,
   5,  10,  10, -20, -20,  10,  10,   5,
   5,  -5, -10,   0,   0, -10,  -5,   5,
   0,   0,   0,  20,  20,   0,   0,   0,
   5,   5,  10,  25,  25,  10,   5,   5,
  10,  10,  20,  30,  30,  20,  10,  10,
  50,  50,  50,  50,  50,  50,  50,  50,
   0,   0,   0,   0,   0,   0,   0,   0,
];
const KNIGHT_PSQT = [
 -50, -40, -30, -30, -30, -30, -40, -50,
 -40, -20,   0,   5,   5,   0, -20, -40,
 -30,   5,  10,  15,  15,  10,   5, -30,
 -30,   0,  15,  20,  20,  15,   0, -30,
 -30,   5,  15,  20,  20,  15,   5, -30,
 -30,   0,  10,  15,  15,  10,   0, -30,
 -40, -20,   0,   0,   0,   0, -20, -40,
 -50, -40, -30, -30, -30, -30, -40, -50,
];
const BISHOP_PSQT = [
 -20, -10, -10, -10, -10, -10, -10, -20,
 -10,   5,   0,   0,   0,   0,   5, -10,
 -10,  10,  10,  10,  10,  10,  10, -10,
 -10,   0,  10,  10,  10,  10,   0, -10,
 -10,   5,   5,  10,  10,   5,   5, -10,
 -10,   0,   5,  10,  10,   5,   0, -10,
 -10,   0,   0,   0,   0,   0,   0, -10,
 -20, -10, -10, -10, -10, -10, -10, -20,
];
const ROOK_PSQT = [
   0,   0,   0,   5,   5,   0,   0,   0,
  -5,   0,   0,   0,   0,   0,   0,  -5,
  -5,   0,   0,   0,   0,   0,   0,  -5,
  -5,   0,   0,   0,   0,   0,   0,  -5,
  -5,   0,   0,   0,   0,   0,   0,  -5,
  -5,   0,   0,   0,   0,   0,   0,  -5,
   5,  10,  10,  10,  10,  10,  10,   5,
   0,   0,   0,   0,   0,   0,   0,   0,
];
const QUEEN_PSQT = [
 -20, -10, -10,  -5,  -5, -10, -10, -20,
 -10,   0,   5,   0,   0,   0,   0, -10,
 -10,   5,   5,   5,   5,   5,   0, -10,
   0,   0,   5,   5,   5,   5,   0,  -5,
  -5,   0,   5,   5,   5,   5,   0,  -5,
 -10,   0,   5,   5,   5,   5,   0, -10,
 -10,   0,   0,   0,   0,   0,   0, -10,
 -20, -10, -10,  -5,  -5, -10, -10, -20,
];
// Middle-game king PSQT (incentive to castle, stay tucked behind pawns).
// In M3 this gets a separate endgame PSQT and tapers between them.
const KING_PSQT = [
  20,  30,  10,   0,   0,  10,  30,  20,
  20,  20,   0,   0,   0,   0,  20,  20,
 -10, -20, -20, -20, -20, -20, -20, -10,
 -20, -30, -30, -40, -40, -30, -30, -20,
 -30, -40, -40, -50, -50, -40, -40, -30,
 -30, -40, -40, -50, -50, -40, -40, -30,
 -30, -40, -40, -50, -50, -40, -40, -30,
 -30, -40, -40, -50, -50, -40, -40, -30,
];

const PSQT = [PAWN_PSQT, KNIGHT_PSQT, BISHOP_PSQT, ROOK_PSQT, QUEEN_PSQT, KING_PSQT];

/**
 * Static evaluation in centipawns, from the side-to-move's perspective.
 * Higher = better for the side to move.
 */
export function evaluate(board) {
  let scoreW = 0, scoreB = 0;
  for (let p = 0; p < 6; p++) {
    let bb = board.bb[WHITE][p];
    while (bb) {
      const sq = lsb(bb);
      scoreW += PIECE_VALUE[p] + PSQT[p][sq];
      bb &= bb - 1n;
    }
    bb = board.bb[BLACK][p];
    while (bb) {
      const sq = lsb(bb);
      // Mirror the square vertically for Black (rank-flip).
      scoreB += PIECE_VALUE[p] + PSQT[p][sq ^ 56];
      bb &= bb - 1n;
    }
  }
  const diff = scoreW - scoreB;
  return board.stm === WHITE ? diff : -diff;
}

// Local lsb to avoid extra import-cost in the hot path
function lsb(bb) {
  let i = 0;
  if ((bb & 0xFFFFFFFFn) === 0n) { i += 32; bb >>= 32n; }
  if ((bb & 0xFFFFn) === 0n)     { i += 16; bb >>= 16n; }
  if ((bb & 0xFFn) === 0n)       { i += 8;  bb >>= 8n;  }
  if ((bb & 0xFn) === 0n)        { i += 4;  bb >>= 4n;  }
  if ((bb & 0x3n) === 0n)        { i += 2;  bb >>= 2n;  }
  if ((bb & 0x1n) === 0n)        { i += 1; }
  return i;
}
