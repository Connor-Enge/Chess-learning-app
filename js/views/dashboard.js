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

  // Recent activity
  const recent = storage.state.recent || [];
  const list = view.querySelector('#recentActivity');
  if (recent.length > 0) {
    list.innerHTML = recent.map(r => {
      const ts = new Date(r.ts).toLocaleString();
      const route = r.type === 'lesson' ? 'lessons' : r.type === 'endgame' ? 'endgames' : r.type === 'game' ? 'games' : r.type === 'opening' ? 'openings' : 'dashboard';
      return `<div class="recent-item"><a href="#${route}/${r.id}">${escapeHtml(r.title || r.id)}</a> <span class="muted">· ${r.type} · ${ts}</span></div>`;
    }).join('');
  }
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
