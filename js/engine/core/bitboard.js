// Bitboard primitives. 64-bit unsigned values via BigInt.
// Bit `n` represents square `n` (a1=0, h8=63).
//
// Choice of BigInt: M1 prioritises correctness. BigInt is ~10–50× slower than
// 32-bit Number ops but completely correct. If perft proves too slow on large
// positions we'll switch hot paths to a packed Uint32Array {lo,hi} pair in a
// follow-up pass — but only after perft is GREEN.

export const ZERO = 0n;
export const ONE  = 1n;
export const FULL = 0xFFFFFFFFFFFFFFFFn;

export function bit(sq) { return 1n << BigInt(sq); }

export function popcount(bb) {
  let n = 0n; let v = bb;
  while (v) { v &= v - 1n; n++; }
  return Number(n);
}

// Index of LSB (0..63). Caller must ensure bb !== 0.
export function lsb(bb) {
  let i = 0;
  // Faster than a naive loop — chunk by 32 bits, then 16, then 8, etc.
  if ((bb & 0xFFFFFFFFn) === 0n) { i += 32; bb >>= 32n; }
  if ((bb & 0xFFFFn) === 0n)     { i += 16; bb >>= 16n; }
  if ((bb & 0xFFn) === 0n)       { i += 8;  bb >>= 8n;  }
  if ((bb & 0xFn) === 0n)        { i += 4;  bb >>= 4n;  }
  if ((bb & 0x3n) === 0n)        { i += 2;  bb >>= 2n;  }
  if ((bb & 0x1n) === 0n)        { i += 1; }
  return i;
}

// Pop the LSB and return [square, newBB].
export function popLsb(bb) {
  const sq = lsb(bb);
  return [sq, bb & (bb - 1n)];
}

// File and rank masks
export const FILE_A = 0x0101010101010101n;
export const FILE_B = FILE_A << 1n;
export const FILE_C = FILE_A << 2n;
export const FILE_D = FILE_A << 3n;
export const FILE_E = FILE_A << 4n;
export const FILE_F = FILE_A << 5n;
export const FILE_G = FILE_A << 6n;
export const FILE_H = FILE_A << 7n;
export const FILES_BB = [FILE_A, FILE_B, FILE_C, FILE_D, FILE_E, FILE_F, FILE_G, FILE_H];

export const RANK_1 = 0xFFn;
export const RANK_2 = RANK_1 << 8n;
export const RANK_3 = RANK_1 << 16n;
export const RANK_4 = RANK_1 << 24n;
export const RANK_5 = RANK_1 << 32n;
export const RANK_6 = RANK_1 << 40n;
export const RANK_7 = RANK_1 << 48n;
export const RANK_8 = RANK_1 << 56n;
export const RANKS_BB = [RANK_1, RANK_2, RANK_3, RANK_4, RANK_5, RANK_6, RANK_7, RANK_8];

export const NOT_FILE_A = FULL ^ FILE_A;
export const NOT_FILE_H = FULL ^ FILE_H;
export const NOT_FILE_AB = FULL ^ FILE_A ^ FILE_B;
export const NOT_FILE_GH = FULL ^ FILE_G ^ FILE_H;

// Shift operations (south = -8, north = +8, east = +1, west = -1).
// Mask off the wrapping file before/after the shift.
export function north(bb)     { return (bb << 8n) & FULL; }
export function south(bb)     { return (bb >> 8n) & FULL; }
export function east(bb)      { return ((bb & NOT_FILE_H) << 1n) & FULL; }
export function west(bb)      { return ((bb & NOT_FILE_A) >> 1n) & FULL; }
export function northEast(bb) { return ((bb & NOT_FILE_H) << 9n) & FULL; }
export function northWest(bb) { return ((bb & NOT_FILE_A) << 7n) & FULL; }
export function southEast(bb) { return ((bb & NOT_FILE_H) >> 7n) & FULL; }
export function southWest(bb) { return ((bb & NOT_FILE_A) >> 9n) & FULL; }

// Pretty-print a bitboard for debugging.
export function bbString(bb) {
  let s = '';
  for (let r = 7; r >= 0; r--) {
    s += (r + 1) + ' ';
    for (let f = 0; f < 8; f++) {
      const sq = r * 8 + f;
      s += ((bb >> BigInt(sq)) & 1n) ? '1 ' : '. ';
    }
    s += '\n';
  }
  s += '  a b c d e f g h\n';
  return s;
}

// Iterate the set bits of a bitboard. Yields square indices.
export function* squares(bb) {
  let v = bb;
  while (v) {
    const sq = lsb(v);
    yield sq;
    v &= v - 1n;
  }
}
