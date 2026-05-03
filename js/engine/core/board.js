// Board state + make/unmake move.
// Pieces stored as 12 bitboards (6 piece types × 2 colors), plus an occupancy
// cache. A separate `mailbox` array maps each square to {color, piece} for
// O(1) lookup during move generation.

import { ZERO, ONE, FULL, bit, lsb, popLsb } from './bitboard.js';
import {
  WHITE, BLACK, NONE, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING,
  PIECE_FROM_CHAR, PIECE_CHARS, fileOf, rankOf, makeSquare,
  squareFromName, squareName,
  CR_WK, CR_WQ, CR_BK, CR_BQ, CR_ALL,
} from './squares.js';

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Move encoding (32-bit int):
//   bits  0..5  : from
//   bits  6..11 : to
//   bits 12..14 : promotion piece type (PAWN..QUEEN; PAWN=0 means none)
//   bit  15     : capture flag
//   bit  16     : double-pawn-push flag
//   bit  17     : en-passant capture flag
//   bit  18     : castling flag
export const MV_FROM_MASK = 0x3F;
export const MV_TO_MASK   = 0xFC0;
export const MV_PROMO_MASK = 0x7000;
export const MV_CAP_FLAG  = 0x8000;
export const MV_DPP_FLAG  = 0x10000;
export const MV_EP_FLAG   = 0x20000;
export const MV_CAST_FLAG = 0x40000;

export function encodeMove(from, to, promo = 0, flags = 0) {
  return (from & 0x3F) | ((to & 0x3F) << 6) | ((promo & 0x7) << 12) | flags;
}
export function moveFrom(m)  { return m & MV_FROM_MASK; }
export function moveTo(m)    { return (m & MV_TO_MASK) >> 6; }
export function movePromo(m) { return (m & MV_PROMO_MASK) >> 12; }
export function moveIsCap(m)     { return (m & MV_CAP_FLAG)  !== 0; }
export function moveIsDpp(m)     { return (m & MV_DPP_FLAG)  !== 0; }
export function moveIsEp(m)      { return (m & MV_EP_FLAG)   !== 0; }
export function moveIsCast(m)    { return (m & MV_CAST_FLAG) !== 0; }

export class Board {
  constructor() {
    // bb[color][piece] = bitboard
    this.bb = [
      [ZERO, ZERO, ZERO, ZERO, ZERO, ZERO],
      [ZERO, ZERO, ZERO, ZERO, ZERO, ZERO],
    ];
    this.occ = [ZERO, ZERO];     // per-color occupancy
    this.allOcc = ZERO;          // both colors
    this.mailbox = new Array(64).fill(null);  // {color, piece} or null
    this.stm = WHITE;            // side to move
    this.castling = 0;           // bitmask of CR_*
    this.epSquare = -1;          // en-passant target square, or -1
    this.halfmoveClock = 0;
    this.fullmoveNumber = 1;
    // Undo stack — we push state needed to unmake on each move
    this.history = [];
  }

  static fromFen(fen = STARTING_FEN) {
    const b = new Board();
    b.loadFen(fen);
    return b;
  }

  loadFen(fen) {
    const parts = fen.trim().split(/\s+/);
    if (parts.length < 4) throw new Error('Invalid FEN: too few fields');
    const [placement, stm, castling, ep, halfmove = '0', fullmove = '1'] = parts;
    this.bb = [[ZERO, ZERO, ZERO, ZERO, ZERO, ZERO], [ZERO, ZERO, ZERO, ZERO, ZERO, ZERO]];
    this.occ = [ZERO, ZERO];
    this.allOcc = ZERO;
    this.mailbox = new Array(64).fill(null);
    const ranks = placement.split('/');
    if (ranks.length !== 8) throw new Error('Invalid FEN: rank count');
    for (let r = 0; r < 8; r++) {
      const row = ranks[7 - r];
      let f = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) { f += parseInt(ch, 10); continue; }
        const color = (ch === ch.toUpperCase()) ? WHITE : BLACK;
        const piece = PIECE_FROM_CHAR[ch];
        if (piece === undefined) throw new Error('Invalid FEN: unknown piece ' + ch);
        const sq = makeSquare(f, r);
        this.bb[color][piece] |= bit(sq);
        this.mailbox[sq] = { color, piece };
        f++;
      }
      if (f !== 8) throw new Error('Invalid FEN: rank ' + r + ' bad width');
    }
    this._refreshOcc();
    this.stm = stm === 'w' ? WHITE : BLACK;
    this.castling = 0;
    if (castling.includes('K')) this.castling |= CR_WK;
    if (castling.includes('Q')) this.castling |= CR_WQ;
    if (castling.includes('k')) this.castling |= CR_BK;
    if (castling.includes('q')) this.castling |= CR_BQ;
    this.epSquare = squareFromName(ep);
    this.halfmoveClock = parseInt(halfmove, 10) || 0;
    this.fullmoveNumber = parseInt(fullmove, 10) || 1;
    this.history = [];
  }

  _refreshOcc() {
    let w = ZERO, b = ZERO;
    for (let p = 0; p < 6; p++) { w |= this.bb[WHITE][p]; b |= this.bb[BLACK][p]; }
    this.occ[WHITE] = w; this.occ[BLACK] = b; this.allOcc = w | b;
  }

  toFen() {
    let placement = '';
    for (let r = 7; r >= 0; r--) {
      let empty = 0;
      for (let f = 0; f < 8; f++) {
        const sq = r * 8 + f;
        const m = this.mailbox[sq];
        if (!m) { empty++; continue; }
        if (empty) { placement += empty; empty = 0; }
        const ch = PIECE_CHARS[m.piece];
        placement += m.color === WHITE ? ch : ch.toLowerCase();
      }
      if (empty) placement += empty;
      if (r > 0) placement += '/';
    }
    let cr = '';
    if (this.castling & CR_WK) cr += 'K';
    if (this.castling & CR_WQ) cr += 'Q';
    if (this.castling & CR_BK) cr += 'k';
    if (this.castling & CR_BQ) cr += 'q';
    if (!cr) cr = '-';
    return [
      placement,
      this.stm === WHITE ? 'w' : 'b',
      cr,
      this.epSquare === -1 ? '-' : squareName(this.epSquare),
      this.halfmoveClock,
      this.fullmoveNumber,
    ].join(' ');
  }

  pieceAt(sq) { return this.mailbox[sq]; }

  // Add/remove helpers used by make/unmake
  _putPiece(sq, color, piece) {
    this.bb[color][piece] |= bit(sq);
    this.occ[color] |= bit(sq);
    this.allOcc |= bit(sq);
    this.mailbox[sq] = { color, piece };
  }
  _removePiece(sq, color, piece) {
    const mask = ~bit(sq) & FULL;
    this.bb[color][piece] &= mask;
    this.occ[color] &= mask;
    this.allOcc &= mask;
    this.mailbox[sq] = null;
  }
  _movePiece(from, to, color, piece) {
    const m = (~bit(from) | bit(to)) & FULL;
    this.bb[color][piece] = (this.bb[color][piece] & ~bit(from) & FULL) | bit(to);
    this.occ[color] = (this.occ[color] & ~bit(from) & FULL) | bit(to);
    this.allOcc = (this.allOcc & ~bit(from) & FULL) | bit(to);
    this.mailbox[from] = null;
    this.mailbox[to] = { color, piece };
  }

  // Castling rook moves (castling flag set on the move)
  // White: e1->g1 short uses rook h1->f1; e1->c1 long uses rook a1->d1
  // Black: e8->g8 short uses rook h8->f8; e8->c8 long uses rook a8->d8
  static CASTLE_ROOK = {
    [makeSquare(6, 0)]: { from: makeSquare(7, 0), to: makeSquare(5, 0) },   // wK->g1
    [makeSquare(2, 0)]: { from: makeSquare(0, 0), to: makeSquare(3, 0) },   // wK->c1
    [makeSquare(6, 7)]: { from: makeSquare(7, 7), to: makeSquare(5, 7) },   // bK->g8
    [makeSquare(2, 7)]: { from: makeSquare(0, 7), to: makeSquare(3, 7) },   // bK->c8
  };

  // Pre-computed: how each move's from/to squares affect castling rights.
  // Any move from or to one of these squares clears the corresponding right.
  static CASTLING_RIGHTS_MASK = (() => {
    const m = new Array(64).fill(CR_ALL);
    m[makeSquare(4, 0)] = CR_ALL & ~(CR_WK | CR_WQ);   // e1
    m[makeSquare(0, 0)] = CR_ALL & ~CR_WQ;             // a1
    m[makeSquare(7, 0)] = CR_ALL & ~CR_WK;             // h1
    m[makeSquare(4, 7)] = CR_ALL & ~(CR_BK | CR_BQ);   // e8
    m[makeSquare(0, 7)] = CR_ALL & ~CR_BQ;             // a8
    m[makeSquare(7, 7)] = CR_ALL & ~CR_BK;             // h8
    return m;
  })();

  /**
   * Apply a move (encoded). Pushes undo info onto history.
   */
  makeMove(move) {
    const from = moveFrom(move);
    const to = moveTo(move);
    const promo = movePromo(move);
    const isCap = moveIsCap(move);
    const isEp = moveIsEp(move);
    const isCast = moveIsCast(move);
    const isDpp = moveIsDpp(move);

    const us = this.stm;
    const them = us ^ 1;
    const fromPc = this.mailbox[from];
    if (!fromPc) throw new Error('makeMove: no piece on ' + squareName(from) + ' fen=' + this.toFen());

    // Remember undo data
    const undo = {
      move,
      capturedPiece: null,         // {color, piece}
      capturedSquare: -1,
      prevCastling: this.castling,
      prevEpSquare: this.epSquare,
      prevHalfmove: this.halfmoveClock,
      prevFullmove: this.fullmoveNumber,
    };

    // Determine the captured square (for ep, it's the pawn behind `to`)
    if (isEp) {
      const capSq = us === WHITE ? to - 8 : to + 8;
      undo.capturedPiece = this.mailbox[capSq];
      undo.capturedSquare = capSq;
      this._removePiece(capSq, them, PAWN);
    } else if (isCap) {
      undo.capturedPiece = this.mailbox[to];
      undo.capturedSquare = to;
      if (!undo.capturedPiece) throw new Error('makeMove: capture flag but no target piece, ' + squareName(from) + '->' + squareName(to) + ' fen=' + this.toFen());
      this._removePiece(to, undo.capturedPiece.color, undo.capturedPiece.piece);
    }

    // Move the piece itself (or promote)
    if (promo) {
      this._removePiece(from, us, PAWN);
      this._putPiece(to, us, promo);
    } else {
      this._movePiece(from, to, us, fromPc.piece);
    }

    // Castling: also move the rook
    if (isCast) {
      const r = Board.CASTLE_ROOK[to];
      this._movePiece(r.from, r.to, us, ROOK);
    }

    // En-passant target (set if this was a double pawn push, else clear)
    if (isDpp) {
      this.epSquare = us === WHITE ? from + 8 : from - 8;
    } else {
      this.epSquare = -1;
    }

    // Castling rights
    this.castling &= Board.CASTLING_RIGHTS_MASK[from];
    this.castling &= Board.CASTLING_RIGHTS_MASK[to];

    // Halfmove clock: reset on captures/pawn moves, otherwise increment
    if (isCap || isEp || fromPc.piece === PAWN) {
      this.halfmoveClock = 0;
    } else {
      this.halfmoveClock++;
    }

    // Fullmove number: increment after Black moves
    if (us === BLACK) this.fullmoveNumber++;

    this.stm = them;
    this.history.push(undo);
  }

  /**
   * Reverse the most recent makeMove.
   */
  unmakeMove() {
    const undo = this.history.pop();
    if (!undo) throw new Error('unmakeMove: history empty');
    const move = undo.move;
    const from = moveFrom(move);
    const to = moveTo(move);
    const promo = movePromo(move);
    const isCap = moveIsCap(move);
    const isEp = moveIsEp(move);
    const isCast = moveIsCast(move);

    const them = this.stm;
    const us = them ^ 1;

    // Reverse castle rook move
    if (isCast) {
      const r = Board.CASTLE_ROOK[to];
      this._movePiece(r.to, r.from, us, ROOK);
    }

    // Reverse main move (handle promotion)
    if (promo) {
      this._removePiece(to, us, promo);
      this._putPiece(from, us, PAWN);
    } else {
      const movedPc = this.mailbox[to];
      if (!movedPc) throw new Error('unmakeMove: no piece on ' + squareName(to));
      this._movePiece(to, from, us, movedPc.piece);
    }

    // Restore captured piece
    if (undo.capturedPiece) {
      this._putPiece(undo.capturedSquare, undo.capturedPiece.color, undo.capturedPiece.piece);
    }

    // Restore prior state
    this.castling = undo.prevCastling;
    this.epSquare = undo.prevEpSquare;
    this.halfmoveClock = undo.prevHalfmove;
    this.fullmoveNumber = undo.prevFullmove;
    this.stm = us;
  }

  // King squares
  whiteKingSq() { return lsb(this.bb[WHITE][KING]); }
  blackKingSq() { return lsb(this.bb[BLACK][KING]); }
  kingSquare(color) { return lsb(this.bb[color][KING]); }
}

export { STARTING_FEN };
