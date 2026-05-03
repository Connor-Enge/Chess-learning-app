// Global search — backed by an in-memory index built from data files.
// The UI is a full-screen overlay (mobile-friendly).
import { LESSONS as CORE_LESSONS } from './data/lessons-index.js';
import { OPENINGS } from './data/openings.js';
import { ENDGAMES } from './data/endgames.js';
import { GAMES } from './data/games.js';
import { loadAllLessons } from './content-loader.js';

let cached = null;

async function buildIndex() {
  const items = [];
  // Use the merged lesson library so the addendum tracks are searchable too
  let allLessons = CORE_LESSONS;
  try { allLessons = await loadAllLessons(); } catch (e) { /* fall back */ }

  for (const l of allLessons) {
    items.push({
      kind: 'Lesson',
      title: l.title,
      route: `lessons/${l.id}`,
      hay: (l.title + ' ' + (l.objective || '') + ' ' + (l.tags || []).join(' ') + ' ' + (l.track || '')).toLowerCase(),
    });
  }
  for (const o of OPENINGS) {
    items.push({
      kind: 'Opening',
      title: o.name,
      route: `openings/${o.id}`,
      hay: (o.name + ' ' + (o.eco || '') + ' ' + (o.aliases || []).join(' ') + ' ' + (o.mainLine || '')).toLowerCase(),
    });
  }
  for (const e of ENDGAMES) {
    items.push({
      kind: 'Endgame',
      title: e.title,
      route: `endgames/${e.id}`,
      hay: (e.title + ' ' + (e.goal || '') + ' ' + (e.explanation || '')).toLowerCase(),
    });
  }
  for (const g of GAMES) {
    items.push({
      kind: 'Game',
      title: `${g.white} vs ${g.black} (${g.year})`,
      route: `games/${g.id}`,
      hay: (g.white + ' ' + g.black + ' ' + (g.event || '') + ' ' + (g.opening || '') + ' ' + (g.lessons || []).join(' ')).toLowerCase(),
    });
  }
  return items;
}

async function index() {
  if (!cached) cached = await buildIndex();
  return cached;
}

export function initSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('globalSearch');
  const closeBtn = document.getElementById('searchClose');
  const results = document.getElementById('searchResults');
  if (!overlay || !input || !results) return;

  let debounce = null;
  input.addEventListener('input', e => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(async () => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }
      const matches = (await index()).filter(it => it.hay.includes(q)).slice(0, 30);
      results.innerHTML = matches.length
        ? matches.map(m => `<div class="result" data-route="${m.route}"><strong>${escapeHtml(m.title)}</strong><div class="result-meta">${m.kind}</div></div>`).join('')
        : '<div class="result"><span class="muted">No matches</span></div>';
      results.querySelectorAll('.result[data-route]').forEach(el => {
        el.addEventListener('click', () => {
          location.hash = el.dataset.route;
          input.value = '';
          results.innerHTML = '';
          closeSearch();
        });
      });
    }, 80);
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
}

export function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('globalSearch');
  if (!overlay) return;
  overlay.hidden = false;
  setTimeout(() => input && input.focus(), 50);
}

export function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (overlay) overlay.hidden = true;
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
