import { storage } from '../storage.js';
import { loadAllLessons } from '../content-loader.js';
import { OPENINGS } from '../data/openings.js';
import { PUZZLES } from '../data/puzzles.js';
import { ENDGAMES } from '../data/endgames.js';
import { GAMES } from '../data/games.js';

export async function renderDashboard(view) {
  const tpl = document.getElementById('tpl-dashboard');
  view.appendChild(tpl.content.cloneNode(true));

  const lessons = await loadAllLessons();
  const lessonDone = lessons.filter(l => storage.isLessonComplete(l.id)).length;
  const puzzleStats = storage.puzzleStats();
  const endgameDone = ENDGAMES.filter(e => storage.isEndgameComplete(e.id)).length;
  const gamesDone = GAMES.filter(g => storage.isGameStudied(g.id)).length;
  const openingsDone = OPENINGS.filter(o => storage.isOpeningExplored(o.id)).length;

  view.querySelector('.lesson-progress').textContent = `${lessonDone}/${lessons.length}`;
  view.querySelector('.opening-progress').textContent = openingsDone;
  view.querySelector('.puzzle-progress').textContent = `${puzzleStats.solved}/${PUZZLES.length}`;
  view.querySelector('.puzzle-accuracy').textContent = puzzleStats.accuracy === null ? '—' : (puzzleStats.accuracy + '%');
  view.querySelector('.endgame-progress').textContent = `${endgameDone}/${ENDGAMES.length}`;
  view.querySelector('.game-progress').textContent = `${gamesDone}/${GAMES.length}`;

  view.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('click', () => { location.hash = card.dataset.route; });
  });

  // Hero card — populate from most recent activity, or invite the user to start
  const recent = storage.state.recent || [];
  const heroTitle = view.querySelector('#heroTitle');
  const heroMeta = view.querySelector('#heroMeta');
  const heroCta = view.querySelector('#heroCta');
  if (recent.length > 0 && heroTitle && heroCta) {
    const last = recent[0];
    const route = routeForType(last.type);
    heroTitle.textContent = last.title || last.id;
    heroMeta.textContent = `Continue ${last.type} · ${timeAgo(last.ts)}`;
    heroCta.querySelector('span').textContent = 'Continue';
    heroCta.addEventListener('click', () => { location.hash = `${route}/${last.id}`; });
  } else if (heroCta) {
    heroCta.addEventListener('click', () => { location.hash = 'lessons'; });
  }

  // Recent activity list
  const list = view.querySelector('#recentActivity');
  if (recent.length > 0 && list) {
    list.innerHTML = recent.map(r => {
      const ts = new Date(r.ts).toLocaleString();
      const route = routeForType(r.type);
      return `<div class="recent-item"><a href="#${route}/${r.id}">${escapeHtml(r.title || r.id)}</a> <span class="muted">· ${r.type} · ${ts}</span></div>`;
    }).join('');
  }
}

function routeForType(t) {
  return t === 'lesson' ? 'lessons'
    : t === 'endgame' ? 'endgames'
    : t === 'game' ? 'games'
    : t === 'opening' ? 'openings'
    : 'dashboard';
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
