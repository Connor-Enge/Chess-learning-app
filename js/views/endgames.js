import { storage } from '../storage.js';
import { ENDGAMES } from '../data/endgames.js';
import { Board } from '../board.js';
import { newChess, legalMovesFrom, isInCheck, kingSquare, gameOverReason, tryMove } from '../chess-utils.js';
import { engine } from '../engine.js';
import { mdToHtml } from './lessons.js';

export async function renderEndgames(view, params) {
  const tpl = document.getElementById('tpl-endgames');
  view.appendChild(tpl.content.cloneNode(true));

  const indexEl = view.querySelector('#endgameIndex');
  const titleEl = view.querySelector('#endgameTitle');
  const promptEl = view.querySelector('#endgamePrompt');
  const explEl = view.querySelector('#endgameExplainer');
  const boardEl = view.querySelector('#endgameBoard');
  boardEl.classList.add('large');

  // Mobile: collapsible drill list
  const listPanel = view.querySelector('#endgameListPanel');
  const listToggle = view.querySelector('#endgameListToggle');
  function setListVisible(visible) { if (listPanel) listPanel.style.display = visible ? '' : 'none'; }
  if (listToggle) listToggle.addEventListener('click', () => {
    setListVisible(listPanel.style.display === 'none');
  });

  // Group endgames by category
  for (const eg of ENDGAMES) {
    const li = document.createElement('li');
    li.dataset.id = eg.id;
    li.textContent = eg.title;
    if (storage.isEndgameComplete(eg.id)) li.classList.add('done');
    li.addEventListener('click', () => { location.hash = `endgames/${eg.id}`; });
    indexEl.appendChild(li);
  }

  let chess = null;
  let board = null;
  let currentEg = null;
  let userColor = 'w';

  function load(id) {
    const eg = ENDGAMES.find(e => e.id === id) || ENDGAMES[0];
    currentEg = eg;
    indexEl.querySelectorAll('li').forEach(l => l.classList.toggle('active', l.dataset.id === eg.id));
    chess = newChess(eg.fen);
    userColor = eg.userColor || chess.turn();
    titleEl.textContent = eg.title;
    promptEl.innerHTML = `<span class="muted">Goal:</span> ${eg.goal || 'Play out the position.'}`;
    explEl.innerHTML = eg.explanation ? mdToHtml(eg.explanation) : '';

    if (board) {
      board.setFen(chess.fen());
      board.setOrientation(userColor === 'w' ? 'white' : 'black');
      board.clearHighlights();
    } else {
      board = new Board(boardEl, {
        orientation: userColor === 'w' ? 'white' : 'black',
        draggable: true,
        getLegalMoves: (sq) => legalMovesFrom(chess, sq),
        getTurn: () => chess.turn(),
        onMove: (from, to, promo) => onUserMove(from, to, promo),
      });
      board.setFen(chess.fen());
    }
    if (isInCheck(chess)) board.setHighlights({ check: kingSquare(chess, chess.turn()) });

    // On mobile, collapse the drill list when one is opened
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) setListVisible(false);

    // If it's the engine's turn first
    if (chess.turn() !== userColor) setTimeout(playEngineMove, 200);
  }

  async function onUserMove(from, to, promo) {
    if (chess.turn() !== userColor) return false;
    const move = tryMove(chess, from, to, promo);
    if (!move) return false;
    board.setFen(chess.fen());
    board.setHighlights({ from: move.from, to: move.to });

    const reason = gameOverReason(chess);
    if (reason) {
      announce(reason);
      return true;
    }
    setTimeout(playEngineMove, 250);
    return true;
  }

  async function playEngineMove() {
    if (!currentEg) return;
    promptEl.innerHTML = `<span class="muted">Engine thinking…</span>`;
    try {
      await engine.start();
      const res = await engine.analyze(chess.fen(), currentEg.engineDepth || 14);
      if (!res.bestmove || res.bestmove === '(none)') return;
      const from = res.bestmove.substring(0, 2);
      const to = res.bestmove.substring(2, 4);
      const promo = res.bestmove.length > 4 ? res.bestmove[4] : undefined;
      const move = tryMove(chess, from, to, promo);
      if (move) {
        board.setFen(chess.fen());
        board.setHighlights({ from: move.from, to: move.to });
      }
      promptEl.innerHTML = `<span class="muted">Engine played ${move ? move.san : res.bestmove}. Your move.</span>`;
      const reason = gameOverReason(chess);
      if (reason) announce(reason);
    } catch (e) {
      promptEl.innerHTML = `<span style="color:var(--bad)">Engine unavailable.</span>`;
      console.warn(e);
    }
  }

  function announce(reason) {
    const winSide = chess.turn() === 'w' ? 'Black' : 'White';
    let outcome = reason;
    if (reason === 'checkmate') outcome = `${winSide} wins by checkmate.`;
    promptEl.innerHTML = `<strong>${outcome}</strong> · <button id="markDoneBtn" style="margin-left:6px;">Mark drill complete</button>`;
    const btn = promptEl.querySelector('#markDoneBtn');
    if (btn) btn.addEventListener('click', () => {
      storage.markEndgameComplete(currentEg.id, currentEg.title);
      btn.textContent = '✓ Saved';
    });
  }

  view.querySelector('#endgameReset').addEventListener('click', () => { if (currentEg) load(currentEg.id); });
  view.querySelector('#endgameFlip').addEventListener('click', () => { if (board) board.flip(); });
  view.querySelector('#endgameHint').addEventListener('click', async () => {
    if (!currentEg) return;
    promptEl.innerHTML = `<span class="muted">Hint: thinking…</span>`;
    try {
      await engine.start();
      const res = await engine.analyze(chess.fen(), 12);
      if (res.bestmove) {
        const from = res.bestmove.substring(0, 2);
        const to = res.bestmove.substring(2, 4);
        promptEl.innerHTML = `<span class="muted">Hint: try ${from}—${to}.</span>`;
      }
    } catch (e) { promptEl.innerHTML = `<span class="muted">Hint unavailable.</span>`; }
  });

  if (params && params[0]) load(params[0]);
  else if (ENDGAMES[0]) load(ENDGAMES[0].id);

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace(/^#/, '').split('/');
    if (h[0] === 'endgames' && h[1]) load(h[1]);
  }, { once: true });
}
