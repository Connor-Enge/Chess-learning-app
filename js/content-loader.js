// Loads and merges all lesson modules.
// The lesson library is split across several files so it can grow without any single file
// becoming unwieldy, and so partial failures (one missing file) don't break the app.
//
// Sources:
//   - lessons-index.js              — core (currently a stub)
//   - lessons-tactics-deep.js       — deep basic-tactics (forks, pins, etc.)
//   - lessons-tactics-advanced.js   — advanced tactics (windmill, x-ray, etc.)
//   - lessons-positional.js         — deep positional play
//   - lessons-openings.js           — opening meta-lessons
//   - lessons-endgame.js            — endgame conceptual lessons
//   - lessons-exchanges.js          — Exchanges & Piece Values track
//   - lessons-calculation.js        — calculation + thinking-process

import { LESSONS as CORE_LESSONS } from './data/lessons-index.js';

let cache = null;

async function loadOptional(specifier, exportName) {
  try {
    const mod = await import(specifier);
    const arr = mod[exportName];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.warn('Optional lesson module failed to load:', specifier, e.message);
    return [];
  }
}

export async function loadAllLessons() {
  if (cache) return cache;

  const [
    tacticsDeepA, tacticsDeepB, tacticsDeepC,
    tacticsAdvanced,
    positional1, positional2, positional3, positional4,
    openings,
    endgame,
    exchanges,
    calculation,
  ] = await Promise.all([
    loadOptional('./data/lessons-tactics-deep-a.js', 'LESSONS_TACTICS_DEEP_A'),
    loadOptional('./data/lessons-tactics-deep-b.js', 'LESSONS_TACTICS_DEEP_B'),
    loadOptional('./data/lessons-tactics-deep-c.js', 'LESSONS_TACTICS_DEEP_C'),
    loadOptional('./data/lessons-tactics-advanced.js', 'LESSONS_TACTICS_ADVANCED'),
    loadOptional('./data/lessons-positional-1.js', 'LESSONS_POSITIONAL_1'),
    loadOptional('./data/lessons-positional-2.js', 'LESSONS_POSITIONAL_2'),
    loadOptional('./data/lessons-positional-3.js', 'LESSONS_POSITIONAL_3'),
    loadOptional('./data/lessons-positional-4.js', 'LESSONS_POSITIONAL_4'),
    loadOptional('./data/lessons-openings.js', 'LESSONS_OPENINGS'),
    loadOptional('./data/lessons-endgame.js', 'LESSONS_ENDGAME'),
    loadOptional('./data/lessons-exchanges.js', 'LESSONS_EXCHANGES'),
    loadOptional('./data/lessons-calculation.js', 'LESSONS_CALCULATION'),
  ]);

  const merged = [
    ...(Array.isArray(CORE_LESSONS) ? CORE_LESSONS : []),
    ...calculation,
    ...openings,
    ...tacticsDeepA,
    ...tacticsDeepB,
    ...tacticsDeepC,
    ...tacticsAdvanced,
    ...positional1, ...positional2, ...positional3, ...positional4,
    ...exchanges,
    ...endgame,
  ];

  // De-duplicate by id (later wins)
  const byId = new Map();
  for (const l of merged) {
    if (!l || !l.id) continue;
    byId.set(l.id, l);
  }

  // Sort: by track in canonical order, then by `order` field
  const trackOrder = ['calculation', 'opening', 'tactics', 'positional', 'exchanges', 'endgame', 'fundamentals', 'middlegame'];
  cache = Array.from(byId.values()).sort((a, b) => {
    const ta = trackOrder.indexOf(a.track), tb = trackOrder.indexOf(b.track);
    if (ta !== tb) return (ta === -1 ? 99 : ta) - (tb === -1 ? 99 : tb);
    return (a.order || 0) - (b.order || 0);
  });
  return cache;
}

export async function loadLesson(id) {
  const all = await loadAllLessons();
  return all.find(l => l.id === id);
}

export function clearCache() { cache = null; }
