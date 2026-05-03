import { storage } from '../storage.js';
import { GAMES } from '../data/games.js';
import { Board } from '../board.js';
import { newChess, fensForSanList } from '../chess-utils.js';
import { mdToHtml } from './lessons.js';

export async function renderGames(view, params) {
  const tpl = document.getElementById('tpl-games');
  view.appendChild(tpl.content.cloneNode(true));

  const indexEl = view.querySelector('#gameIndex');
  const titleEl = view.querySelector('#gameTitle');
  const metaEl = view.querySelector('#gameMeta');
  const annEl = view.querySelector('#gameAnnotation');
  const lessonsEl = view.querySelector('#gameLessons');
  const movesEl = view.querySelector('#gameMoves');
  const boardEl = view.querySelector('#gameBoard');
  boardEl.classList.add('large');

  // Mobile: collapsible games list
  const listPanel = view.querySelector('#gameListPanel');
  const listToggle = view.querySelector('#gameListToggle');
  function setListVisible(visible) { if (listPanel) listPanel.style.display = visible ? '' : 'none'; }
  if (listToggle) listToggle.addEventListener('click', () => {
    setListVisible(listPanel.style.display === 'none');
  });

  for (const g of GAMES) {
    const li = document.createElement('li');
    li.dataset.id = g.id;
    li.textContent = `${g.white} vs ${g.black} (${g.year})`;
    if (storage.isGameStudied(g.id)) li.classList.add('done');
    li.addEventListener('click', () => { location.hash = `games/${g.id}`; });
    indexEl.appendChild(li);
  }

  let board = null;
  let fens = [];
  let plies = [];
  let annotations = {};
  let idx = 0;
  let autoplayTimer = null;
  let currentGame = null;

  function load(id) {
    const g = GAMES.find(x => x.id === id) || GAMES[0];
    currentGame = g;
    indexEl.querySelectorAll('li').forEach(l => l.classList.toggle('active', l.dataset.id === g.id));
    storage.markGameStudied(g.id, `${g.white} vs ${g.black}`);

    titleEl.textContent = `${g.white} vs ${g.black}`;
    metaEl.textContent = `${g.event || ''} · ${g.year || ''} · ${g.opening || ''} ${g.eco ? '(' + g.eco + ')' : ''}`;
    lessonsEl.innerHTML = (g.lessons || []).map(l => `<li>${escapeHtml(l)}</li>`).join('');

    const startFen = g.startFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const parsed = fensForSanList(startFen, g.pgn);
    fens = parsed.fens;
    plies = parsed.plies;
    annotations = g.annotations || {};
    idx = 0;
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; view.querySelector('#gameAutoplay').textContent = '▶ Autoplay'; }

    if (!board) {
      board = new Board(boardEl, { draggable: false });
    }
    update();
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) setListVisible(false);
  }

  function update() {
    board.setFen(fens[idx]);
    if (idx > 0) {
      const c = newChess(fens[idx - 1]);
      try {
        const mv = c.move(plies[idx - 1]);
        if (mv) board.setHighlights({ from: mv.from, to: mv.to });
      } catch (e) {}
    } else { board.clearHighlights(); }

    annEl.innerHTML = annotations[idx] ? mdToHtml(annotations[idx]) : (idx === 0 ? '<span class="muted">Initial position. Step through the game with the controls or arrow keys.</span>' : '<span class="muted">—</span>');

    movesEl.innerHTML = '';
    for (let i = 0; i < plies.length; i++) {
      if (i % 2 === 0) movesEl.innerHTML += `<span class="muted">${(i / 2) + 1}.</span> `;
      const cls = ['ply'];
      if (i === idx - 1) cls.push('current');
      if (annotations[i + 1]) cls.push('has-comment');
      movesEl.innerHTML += `<span class="${cls.join(' ')}" data-i="${i}">${plies[i]}</span> `;
    }
    movesEl.querySelectorAll('.ply').forEach(el => el.addEventListener('click', () => { idx = parseInt(el.dataset.i, 10) + 1; update(); }));
    const cur = movesEl.querySelector('.ply.current');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }

  view.querySelector('#gamePrev').addEventListener('click', () => { if (idx > 0) { idx--; update(); } });
  view.querySelector('#gameNext').addEventListener('click', () => { if (idx < fens.length - 1) { idx++; update(); } });
  view.querySelector('#gameFlip').addEventListener('click', () => board && board.flip());
  view.querySelector('#gameAutoplay').addEventListener('click', (e) => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer); autoplayTimer = null;
      e.target.textContent = '▶ Autoplay';
    } else {
      e.target.textContent = '⏸ Pause';
      autoplayTimer = setInterval(() => {
        if (idx < fens.length - 1) { idx++; update(); }
        else { clearInterval(autoplayTimer); autoplayTimer = null; e.target.textContent = '▶ Autoplay'; }
      }, 900);
    }
  });

  document.addEventListener('keydown', e => {
    if (!view.querySelector('#gameBoard')) return;
    if (e.key === 'ArrowLeft' && idx > 0) { idx--; update(); }
    if (e.key === 'ArrowRight' && idx < fens.length - 1) { idx++; update(); }
  });

  if (params && params[0]) load(params[0]);
  else if (GAMES[0]) load(GAMES[0].id);

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace(/^#/, '').split('/');
    if (h[0] === 'games' && h[1]) load(h[1]);
  }, { once: true });
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
