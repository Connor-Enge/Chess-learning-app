import { Chess } from 'chess.js';
import { LESSONS_POSITIONAL_4 } from './js/data/lessons-positional-4.js';

let errors = 0;

function validateFen(fen, ctx) {
  try {
    const c = new Chess(fen);
    return c;
  } catch (e) {
    console.log('FEN ERROR', ctx, fen, '->', e.message);
    errors++;
    return null;
  }
}

function validatePgn(pgnText, ctx) {
  // PGN is a sequence of moves like "1. e4 e5 2. Nf3 ..."
  // Strip move numbers and dots
  const tokens = pgnText.replace(/\d+\./g, '').split(/\s+/).filter(t => t && !t.startsWith('{') && !t.startsWith('('));
  const c = new Chess();
  for (const tok of tokens) {
    try {
      const m = c.move(tok, { strict: false });
      if (!m) {
        console.log('PGN MOVE ERROR', ctx, 'failed at', tok, 'after FEN:', c.fen());
        errors++;
        return;
      }
    } catch (e) {
      console.log('PGN MOVE ERROR', ctx, 'failed at', tok, '->', e.message, 'FEN:', c.fen());
      errors++;
      return;
    }
  }
}

function validateInteractive(fen, solution, ctx) {
  const c = validateFen(fen, ctx + ' fen');
  if (!c) return;
  try {
    const m = c.move(solution, { strict: false });
    if (!m) {
      console.log('INTER SOL ERROR', ctx, 'illegal move:', solution, 'from FEN:', fen);
      errors++;
    }
  } catch (e) {
    console.log('INTER SOL ERROR', ctx, 'illegal move:', solution, '->', e.message);
    errors++;
  }
}

for (const lesson of LESSONS_POSITIONAL_4) {
  for (const [i, block] of lesson.content.entries()) {
    const ctx = `${lesson.id}[${i}/${block.type}]`;
    if (block.type === 'board') {
      validateFen(block.fen, ctx);
    } else if (block.type === 'pgn') {
      validatePgn(block.pgn, ctx);
    } else if (block.type === 'interactive') {
      validateInteractive(block.fen, block.solution, ctx);
    }
  }
}

console.log('\nDONE. Total errors:', errors);
