// Audit each lesson for # interactive blocks (will become checkpoints) and
// # puzzle blocks (top-level puzzles array OR `puzzle` content blocks).
// Reports lessons that are short of the new contract (≥3 of each).

import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const FILES = [
  ['js/data/lessons-calculation.js', 'LESSONS_CALCULATION'],
  ['js/data/lessons-openings.js', 'LESSONS_OPENINGS'],
  ['js/data/lessons-tactics-deep-a.js', 'LESSONS_TACTICS_DEEP_A'],
  ['js/data/lessons-tactics-deep-b.js', 'LESSONS_TACTICS_DEEP_B'],
  ['js/data/lessons-tactics-deep-c.js', 'LESSONS_TACTICS_DEEP_C'],
  ['js/data/lessons-tactics-advanced.js', 'LESSONS_TACTICS_ADVANCED'],
  ['js/data/lessons-positional-1.js', 'LESSONS_POSITIONAL_1'],
  ['js/data/lessons-positional-2.js', 'LESSONS_POSITIONAL_2'],
  ['js/data/lessons-positional-3.js', 'LESSONS_POSITIONAL_3'],
  ['js/data/lessons-positional-4.js', 'LESSONS_POSITIONAL_4'],
  ['js/data/lessons-exchanges.js', 'LESSONS_EXCHANGES'],
  ['js/data/lessons-endgame.js', 'LESSONS_ENDGAME'],
];

let totals = { lessons: 0, lacking_cps: 0, lacking_puzzles: 0, total_cps: 0, total_puzzles: 0 };
const summary = [];

for (const [rel, exportName] of FILES) {
  const url = pathToFileURL(resolve(root, rel)).href;
  const mod = await import(url);
  const lessons = mod[exportName] || [];
  for (const l of lessons) {
    const cps = (l.content || []).filter(b => b && (b.type === 'interactive' || b.type === 'your-move')).length;
    const inlinePz = (l.content || []).filter(b => b && b.type === 'puzzle').length;
    const topPz = Array.isArray(l.puzzles) ? l.puzzles.length : 0;
    const totalPz = inlinePz + topPz;
    totals.lessons++;
    totals.total_cps += cps;
    totals.total_puzzles += totalPz;
    if (cps < 3) totals.lacking_cps++;
    if (totalPz < 3) totals.lacking_puzzles++;
    summary.push({ id: l.id, track: l.track, cps, puzzles: totalPz });
  }
}

console.log('=== Per-lesson audit ===');
for (const s of summary) {
  const flag = (s.cps < 3 || s.puzzles < 3) ? '⚠️ ' : '   ';
  console.log(`${flag}${(s.cps + '').padStart(2)} cps · ${(s.puzzles + '').padStart(2)} pz · ${s.track.padEnd(12)} · ${s.id}`);
}
console.log('\n=== Totals ===');
console.log(`Lessons: ${totals.lessons}`);
console.log(`Total checkpoints (interactive blocks): ${totals.total_cps}`);
console.log(`Total puzzles: ${totals.total_puzzles}`);
console.log(`Lessons with < 3 checkpoints: ${totals.lacking_cps}`);
console.log(`Lessons with < 3 puzzles:     ${totals.lacking_puzzles}`);
