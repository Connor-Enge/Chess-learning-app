import { Board } from '../board.js';
import { newChess, legalMovesFrom, isInCheck, kingSquare, gameOverReason, tryMove } from '../chess-utils.js';
import { engine } from '../engine.js';

// Avoid circular import with app.js — inline the mobile-default depth helper.
function defaultEngineDepth() {
  return (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) ? 12 : 14;
}

export async function renderPlay(view) {
  const tpl = document.getElementById('tpl-play');
  view.appendChild(tpl.content.cloneNode(true));

  const boardEl = view.querySelector('#playBoard');
  boardEl.classList.add('large');
  const movesEl = view.querySelector('#playMoves');
  const evalEl = view.querySelector('#engineEval');
  const evalQuickEl = view.querySelector('#engineEvalQuick');
  const lineEl = view.querySelector('#engineLine');
  const depthDispEl = view.querySelector('#engineDepthDisplay');
  const fenInput = view.querySelector('#fenInput');
  const pgnInput = view.querySelector('#pgnInput');
  const engineToggle = view.querySelector('#engineToggle');
  const engineDepthEl = view.querySelector('#engineDepth');
  const engineSheet = view.querySelector('#engineSheet');
  const engineHandle = view.querySelector('#engineSheetHandle');

  // Default engine depth based on viewport (12 on mobile, 14 on desktop)
  if (engineDepthEl) engineDepthEl.value = defaultEngineDepth();

  // Engine sheet expand/collapse on mobile (the handle is hidden on tablet+ via CSS)
  if (engineHandle && engineSheet) {
    engineHandle.addEventListener('click', () => {
      engineSheet.classList.toggle('open');
    });
  }

  let chess = newChess();
  let stopMessageHook = null;

  const board = new Board(boardEl, {
    draggable: true,
    getLegalMoves: (sq) => legalMovesFrom(chess, sq),
    getTurn: () => chess.turn(),
    onMove: (from, to, promo) => {
      const move = tryMove(chess, from, to, promo);
      if (!move) return false;
      board.setFen(chess.fen());
      board.setHighlights({ from: move.from, to: move.to });
      if (isInCheck(chess)) board.setHighlights({ check: kingSquare(chess, chess.turn()) });
      updateMoves();
      maybeAnalyze();
      return true;
    },
  });
  board.setFen(chess.fen());

  function updateMoves() {
    const hist = chess.history({ verbose: false });
    let html = '';
    for (let i = 0; i < hist.length; i++) {
      if (i % 2 === 0) html += `<span class="muted">${(i / 2) + 1}.</span> `;
      html += `<span class="ply">${hist[i]}</span> `;
    }
    movesEl.innerHTML = html;
    fenInput.value = chess.fen();
  }

  function resetBoard(fen) {
    chess = fen ? newChess(fen) : newChess();
    board.setFen(chess.fen());
    board.clearHighlights();
    if (isInCheck(chess)) board.setHighlights({ check: kingSquare(chess, chess.turn()) });
    updateMoves();
    maybeAnalyze();
  }

  view.querySelector('#playReset').addEventListener('click', () => resetBoard());
  view.querySelector('#playFlip').addEventListener('click', () => board.flip());
  view.querySelector('#playUndo').addEventListener('click', () => {
    chess.undo();
    board.setFen(chess.fen());
    board.clearHighlights();
    updateMoves();
    maybeAnalyze();
  });
  view.querySelector('#loadFenBtn').addEventListener('click', () => {
    try {
      const fen = fenInput.value.trim();
      if (fen) resetBoard(fen);
    } catch (e) { alert('Invalid FEN'); }
  });
  view.querySelector('#copyFenBtn').addEventListener('click', () => {
    fenInput.value = chess.fen();
    fenInput.select();
    document.execCommand('copy');
  });
  view.querySelector('#loadPgnBtn').addEventListener('click', () => {
    try {
      const c = newChess();
      c.loadPgn(pgnInput.value);
      chess = c;
      board.setFen(chess.fen());
      board.clearHighlights();
      updateMoves();
      maybeAnalyze();
    } catch (e) { alert('Failed to load PGN: ' + e.message); }
  });
  view.querySelector('#exportPgnBtn').addEventListener('click', () => {
    pgnInput.value = chess.pgn();
  });

  engineToggle.addEventListener('change', () => maybeAnalyze());
  engineDepthEl.addEventListener('change', () => maybeAnalyze());

  let analyzing = false;
  async function maybeAnalyze() {
    if (!engineToggle.checked) {
      evalEl.textContent = '+0.00';
      if (evalQuickEl) evalQuickEl.textContent = 'off';
      lineEl.textContent = '—';
      depthDispEl.textContent = 'depth: —';
      if (analyzing) { engine.stop(); analyzing = false; }
      return;
    }
    if (analyzing) { engine.stop(); }
    analyzing = true;
    try {
      await engine.start();
      const off = engine.onMessage((line) => {
        if (line.startsWith('info ')) {
          const dMatch = line.match(/\bdepth (\d+)/);
          const cpMatch = line.match(/\bscore cp (-?\d+)/);
          const mateMatch = line.match(/\bscore mate (-?\d+)/);
          const pvMatch = line.match(/\bpv (.+?)(?: |$)/);
          if (dMatch) depthDispEl.textContent = 'depth: ' + dMatch[1];
          if (cpMatch) {
            const cp = parseInt(cpMatch[1], 10) / 100;
            // sign convention: positive = side to move is better. Show from White's POV.
            const fromWhite = chess.turn() === 'w' ? cp : -cp;
            const txt = (fromWhite >= 0 ? '+' : '') + fromWhite.toFixed(2);
            evalEl.textContent = txt;
            if (evalQuickEl) evalQuickEl.textContent = txt;
          }
          if (mateMatch) {
            const m = parseInt(mateMatch[1], 10);
            const sign = chess.turn() === 'w' ? (m > 0 ? '' : '-') : (m > 0 ? '-' : '');
            const txt = `M${Math.abs(m)}${sign === '-' ? ' (lost)' : ''}`;
            evalEl.textContent = txt;
            if (evalQuickEl) evalQuickEl.textContent = txt;
          }
          if (pvMatch) lineEl.textContent = pvMatch[1].trim();
        }
        if (line.startsWith('bestmove')) {
          off();
          analyzing = false;
        }
      });
      engine.send('ucinewgame');
      engine.send('position fen ' + chess.fen());
      engine.send('go depth ' + (parseInt(engineDepthEl.value, 10) || 14));
    } catch (e) {
      evalEl.textContent = '!';
      lineEl.textContent = 'Engine unavailable: ' + e.message;
      analyzing = false;
    }
  }

  updateMoves();
}
