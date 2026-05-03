#!/usr/bin/env node
// Validate every script-format lesson:
//   - every set-position FEN is parseable by chess.js
//   - every play-move and your-move SAN is legal from the running chess.js position
//   - every puzzle's FEN parses, and every solution SAN is legal in sequence
//
// Usage: node scripts/validate-lessons.mjs [path-to-lesson-file ...]
// If no paths given, validates every js/data/lessons-ref-*.js.

import { readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Chess } from 'chess.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

let files = process.argv.slice(2);
if (!files.length) {
  const dir = resolve(root, 'js/data');
  const all = await readdir(dir);
  files = all.filter(f => f.startsWith('lessons-ref-')).map(f => resolve(dir, f));
}

let totalErrors = 0;
for (const f of files) {
  const url = pathToFileURL(resolve(root, f)).href;
  const mod = await import(url);
  const lessons = Object.values(mod).find(v => Array.isArray(v));
  if (!lessons) { console.log(`SKIP ${f} — no array export`); continue; }
  for (const lesson of lessons) {
    if (!lesson || !Array.isArray(lesson.script)) {
      console.log(`SKIP ${f} :: ${lesson?.id} — no script`);
      continue;
    }
    const errors = [];
    const chess = new Chess(lesson.startFen || undefined);
    for (let i = 0; i < lesson.script.length; i++) {
      const beat = lesson.script[i];
      if (!beat || !beat.kind) continue;
      try {
        if (beat.kind === 'set-position') {
          if (!beat.fen) { errors.push(`beat ${i} set-position: missing fen`); continue; }
          chess.load(beat.fen);
        } else if (beat.kind === 'play-move') {
          if (!beat.san) { errors.push(`beat ${i} play-move: missing san`); continue; }
          const m = chess.move(beat.san);
          if (!m) errors.push(`beat ${i} play-move "${beat.san}" illegal in ${chess.fen()}`);
        } else if (beat.kind === 'your-move') {
          if (!beat.san) { errors.push(`beat ${i} your-move: missing san`); continue; }
          // Don't actually play the move into chess (the user does), but verify it's legal
          const tmp = new Chess(chess.fen());
          const m = tmp.move(beat.san);
          if (!m) errors.push(`beat ${i} your-move "${beat.san}" illegal in ${chess.fen()}`);
          // For player flow, the your-move is solved by the user — but for replay
          // continuity, we should advance our chess too, so subsequent beats reference
          // the post-your-move position.
          chess.move(beat.san);
        } else if (beat.kind === 'puzzle') {
          if (!beat.fen) { errors.push(`beat ${i} puzzle: missing fen`); continue; }
          const pz = new Chess();
          try { pz.load(beat.fen); } catch (e) { errors.push(`beat ${i} puzzle FEN invalid: ${e.message}`); continue; }
          const sol = Array.isArray(beat.solution) ? beat.solution : String(beat.solution||'').split(/\s+/);
          for (let j = 0; j < sol.length; j++) {
            const m = pz.move(sol[j]);
            if (!m) { errors.push(`beat ${i} puzzle solution ply ${j} "${sol[j]}" illegal in ${pz.fen()}`); break; }
          }
        }
      } catch (e) {
        errors.push(`beat ${i} ${beat.kind}: ${e.message}`);
      }
    }
    if (errors.length) {
      totalErrors += errors.length;
      console.log(`\n❌ ${lesson.id} (${errors.length} errors):`);
      for (const e of errors.slice(0, 12)) console.log(`   ${e}`);
      if (errors.length > 12) console.log(`   ... +${errors.length - 12} more`);
    } else {
      console.log(`✓ ${lesson.id}: ${lesson.script.length} beats clean`);
    }
  }
}

console.log(`\nTotal errors: ${totalErrors}`);
process.exit(totalErrors ? 1 : 0);
