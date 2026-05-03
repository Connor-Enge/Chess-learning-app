// Move generation. Produces *legal* moves: pseudo-legal moves filtered through
// an in-check test (make move, check whether our own king is attacked, unmake).
//
// This is the simple-and-correct path; M3+ may switch to a true legal-move
// generator (pin-aware) for speed. Perft correctness is identical.

import { ZERO, ONE, FULL, bit, lsb, squares as bbSquares } from './bitboard.js';
import {
  KNIGHT_ATTACKS, KING_ATTACKS, PAWN_ATTACKS,
  bishopAttacks, rookAttacks, queenAttacks,
} from './attacks.js';
import {
  WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING,
  fileOf, rankOf, makeSquare,
  CR_WK, CR_WQ, CR_BK, CR_BQ,
} from './squares.js';
import {
  encodeMove, MV_CAP_FLAG, MV_DPP_FLAG, MV_EP_FLAG, MV_CAST_FLAG,
} from './board.js';

// ── Square-attacked test ───────────────────────────────────────────────────
// Returns true if `sq` is attacked by side `byColor` given current `board.allOcc`.
export function isSquareAttacked(board, sq, byColor) {
  const themPawns   = board.bb[byColor][PAWN];
  const themKnights = board.bb[byColor][KNIGHT];
  const themBishops = board.bb[byColor][BISHOP];
  const themRooks   = board.bb[byColor][ROOK];
  const themQueens  = board.bb[byColor][QUEEN];
  const themKing    = board.bb[byColor][KING];

  // Pawn attacks: invert the perspective — PAWN_ATTACKS[us][sq] is the set of
  // squares from which an enemy pawn (of color byColor) attacks `sq`.
  // PAWN_ATTACKS[byColor^1][sq] gives the squares from which a `byColor` pawn
  // attacks `sq`.
  if (PAWN_ATTACKS[byColor ^ 1][sq] & themPawns) return true;
  if (KNIGHT_ATTACKS[sq] & themKnights) return true;
  if (KING_ATTACKS[sq] & themKing) return true;

  const occ = board.allOcc;
  if (bishopAttacks(sq, occ) & (themBishops | themQueens)) return true;
  if (rookAttacks(sq, occ)   & (themRooks   | themQueens)) return true;
  return false;
}

export function inCheck(board, color = board.stm) {
  const ksq = board.kingSquare(color);
  return isSquareAttacked(board, ksq, color ^ 1);
}

// ── Pseudo-legal move generation ───────────────────────────────────────────
// Generates all moves; legality (not leaving own king in check) is filtered
// at the end via the make/unmake test.

function pushMove(out, m) { out.push(m); }

// Pawn moves — single push, double push, captures, en-passant, promotions
function genPawnMoves(board, out, us) {
  const them = us ^ 1;
  const pawns = board.bb[us][PAWN];
  const empty = ~board.allOcc & FULL;
  const enemy = board.occ[them];
  const promoRank = us === WHITE ? 6 : 1;       // rank 7 (index 6) for white pawns about to promote
  const startRank = us === WHITE ? 1 : 6;
  const dir = us === WHITE ? 8 : -8;

  for (const from of bbSquares(pawns)) {
    const fromRank = rankOf(from);
    // Single push
    const one = from + dir;
    if (one >= 0 && one < 64 && (empty & bit(one))) {
      if (fromRank === promoRank) {
        for (const p of [QUEEN, ROOK, BISHOP, KNIGHT]) pushMove(out, encodeMove(from, one, p, 0));
      } else {
        pushMove(out, encodeMove(from, one, 0, 0));
        // Double push from start rank
        if (fromRank === startRank) {
          const two = one + dir;
          if (empty & bit(two)) pushMove(out, encodeMove(from, two, 0, MV_DPP_FLAG));
        }
      }
    }
    // Captures (diagonal)
    let attacks = PAWN_ATTACKS[us][from];
    let caps = attacks & enemy;
    for (const to of bbSquares(caps)) {
      if (fromRank === promoRank) {
        for (const p of [QUEEN, ROOK, BISHOP, KNIGHT]) pushMove(out, encodeMove(from, to, p, MV_CAP_FLAG));
      } else {
        pushMove(out, encodeMove(from, to, 0, MV_CAP_FLAG));
      }
    }
    // En-passant
    if (board.epSquare !== -1 && (attacks & bit(board.epSquare))) {
      pushMove(out, encodeMove(from, board.epSquare, 0, MV_CAP_FLAG | MV_EP_FLAG));
    }
  }
}

function genKnightMoves(board, out, us) {
  const knights = board.bb[us][KNIGHT];
  const friendly = board.occ[us];
  const enemy = board.occ[us ^ 1];
  for (const from of bbSquares(knights)) {
    let moves = KNIGHT_ATTACKS[from] & ~friendly;
    for (const to of bbSquares(moves)) {
      const isCap = (enemy & bit(to)) !== ZERO;
      pushMove(out, encodeMove(from, to, 0, isCap ? MV_CAP_FLAG : 0));
    }
  }
}

function genSliderMoves(board, out, us, pieceType, attackFn) {
  const pieces = board.bb[us][pieceType];
  const friendly = board.occ[us];
  const enemy = board.occ[us ^ 1];
  const occ = board.allOcc;
  for (const from of bbSquares(pieces)) {
    let moves = attackFn(from, occ) & ~friendly;
    for (const to of bbSquares(moves)) {
      const isCap = (enemy & bit(to)) !== ZERO;
      pushMove(out, encodeMove(from, to, 0, isCap ? MV_CAP_FLAG : 0));
    }
  }
}

function genKingMoves(board, out, us) {
  const ksq = board.kingSquare(us);
  const friendly = board.occ[us];
  const enemy = board.occ[us ^ 1];
  let moves = KING_ATTACKS[ksq] & ~friendly;
  for (const to of bbSquares(moves)) {
    const isCap = (enemy & bit(to)) !== ZERO;
    pushMove(out, encodeMove(ksq, to, 0, isCap ? MV_CAP_FLAG : 0));
  }
  // Castling: only legal if king and rook haven't moved (encoded in
  // board.castling), the squares between are empty, and the king doesn't
  // pass through or land on a square attacked by the enemy.
  // We check the empty + attack conditions here; the rights bits ensure
  // the king/rook are on their original squares.
  const them = us ^ 1;
  if (us === WHITE) {
    if (board.castling & CR_WK) {
      if (!(board.allOcc & (bit(5) | bit(6))) &&
          !isSquareAttacked(board, 4, them) &&
          !isSquareAttacked(board, 5, them) &&
          !isSquareAttacked(board, 6, them)) {
        pushMove(out, encodeMove(4, 6, 0, MV_CAST_FLAG));
      }
    }
    if (board.castling & CR_WQ) {
      if (!(board.allOcc & (bit(1) | bit(2) | bit(3))) &&
          !isSquareAttacked(board, 4, them) &&
          !isSquareAttacked(board, 3, them) &&
          !isSquareAttacked(board, 2, them)) {
        pushMove(out, encodeMove(4, 2, 0, MV_CAST_FLAG));
      }
    }
  } else {
    if (board.castling & CR_BK) {
      if (!(board.allOcc & (bit(61) | bit(62))) &&
          !isSquareAttacked(board, 60, them) &&
          !isSquareAttacked(board, 61, them) &&
          !isSquareAttacked(board, 62, them)) {
        pushMove(out, encodeMove(60, 62, 0, MV_CAST_FLAG));
      }
    }
    if (board.castling & CR_BQ) {
      if (!(board.allOcc & (bit(57) | bit(58) | bit(59))) &&
          !isSquareAttacked(board, 60, them) &&
          !isSquareAttacked(board, 59, them) &&
          !isSquareAttacked(board, 58, them)) {
        pushMove(out, encodeMove(60, 58, 0, MV_CAST_FLAG));
      }
    }
  }
}

export function generatePseudoLegal(board) {
  const out = [];
  const us = board.stm;
  genPawnMoves(board, out, us);
  genKnightMoves(board, out, us);
  genSliderMoves(board, out, us, BISHOP, bishopAttacks);
  genSliderMoves(board, out, us, ROOK,   rookAttacks);
  genSliderMoves(board, out, us, QUEEN,  queenAttacks);
  genKingMoves(board, out, us);
  return out;
}

/**
 * Legal move generation: filter pseudo-legal moves by playing them and
 * checking whether the moving side's king ends up in check.
 */
export function generateLegal(board) {
  const pseudo = generatePseudoLegal(board);
  const out = [];
  const us = board.stm;
  for (const m of pseudo) {
    board.makeMove(m);
    // After makeMove, stm flipped to them. Check whether our king (us) is attacked.
    if (!isSquareAttacked(board, board.kingSquare(us), us ^ 1)) {
      out.push(m);
    }
    board.unmakeMove();
  }
  return out;
}
