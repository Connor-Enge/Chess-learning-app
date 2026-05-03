import { storage } from '../storage.js';
import { PUZZLES } from '../data/puzzles.js';
import { Board } from '../board.js';
import { newChess, legalMovesFrom, isInCheck, kingSquare } from '../chess-utils.js';

export async function renderTactics(view) {
  const tpl = document.getElementById('tpl-tactics');
  view.appendChild(tpl.content.cloneNode(true));

  const boardEl = view.querySelector('#tacticsBoard');
  const promptEl = view.querySelector('#tacticsPrompt');
  const fbEl = view.querySelector('#tacticsFeedback');
  const explEl = view.querySelector('#tacticsExplanation');
  const solvedEl = view.querySelector('#tacticsSolved');
  const attemptedEl = view.querySelector('#tacticsAttempted');
  const accEl = view.querySelector('#tacticsAccuracy');
  const themesEl = view.querySelector('#tacticsThemes');

  // Themes filter
  const allThemes = new Set();
  PUZZLES.forEach(p => (p.themes || []).forEach(t => allThemes.add(t)));
  const themeOrder = ['all', ...Array.from(allThemes).sort()];
  let activeTheme = 'all';
  themesEl.innerHTML = themeOrder.map(t => `<span class="chip${t===activeTheme?' active':''}" data-t="${t}">${t}</span>`).join('');
  themesEl.querySelectorAll('.chip').forEach(el => {
    el.addEventListener('click', () => {
      activeTheme = el.dataset.t;
      themesEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.t === activeTheme));
      pickPuzzle();
    });
  });

  let currentPuzzle = null;
  let chess = null;
  let solutionPlies = [];   // remaining solution plies (SAN)
  let board = null;
  let attempts = 0;

  function updateStats() {
    const stats = storage.puzzleStats();
    solvedEl.textContent = stats.solved;
    attemptedEl.textContent = stats.attempted;
    accEl.textContent = stats.accuracy === null ? '—' : (stats.accuracy + '%');
  }

  function filteredPuzzles() {
    if (activeTheme === 'all') return PUZZLES;
    return PUZZLES.filter(p => (p.themes || []).includes(activeTheme));
  }

  function pickPuzzle() {
    const pool = filteredPuzzles().filter(p => !storage.isPuzzleSolved(p.id));
    const candidates = pool.length > 0 ? pool : filteredPuzzles();
    currentPuzzle = candidates[Math.floor(Math.random() * candidates.length)];
    if (!currentPuzzle) {
      promptEl.textContent = 'No puzzles available.';
      return;
    }
    chess = newChess(currentPuzzle.fen);
    solutionPlies = String(currentPuzzle.solution || '').split(/\s+/).filter(Boolean);
    attempts = 0;
    fbEl.textContent = '';
    fbEl.className = 'feedback';
    explEl.textContent = 'Solve or reveal the puzzle to see the explanation.';
    promptEl.innerHTML = `<strong>${chess.turn() === 'w' ? 'White' : 'Black'} to move.</strong> Theme: ${(currentPuzzle.themes || []).join(', ')} · ${currentPuzzle.difficulty || ''}`;
    if (board) {
      board.setFen(chess.fen());
      board.setOrientation(chess.turn() === 'w' ? 'white' : 'black');
      board.clearHighlights();
      if (isInCheck(chess)) board.setHighlights({ check: kingSquare(chess, chess.turn()) });
    } else {
      board = new Board(boardEl, {
        orientation: chess.turn() === 'w' ? 'white' : 'black',
        draggable: true,
        getLegalMoves: (sq) => legalMovesFrom(chess, sq),
        getTurn: () => chess.turn(),
        onMove: (from, to, promo) => attemptMove(from, to, promo),
      });
      board.setFen(chess.fen());
      if (isInCheck(chess)) board.setHighlights({ check: kingSquare(chess, chess.turn()) });
    }
  }

  async function attemptMove(from, to, promo) {
    if (!solutionPlies.length) return false;
    let move;
    try { move = chess.move({ from, to, promotion: promo || 'q' }); } catch (e) { return false; }
    if (!move) return false;
    const expected = solutionPlies[0];
    if (sanEquals(move.san, expected)) {
      solutionPlies.shift();
      board.setFen(chess.fen());
      board.setHighlights({ from: move.from, to: move.to });
      if (solutionPlies.length === 0) {
        // solved
        attempts++;
        const solved = attempts === 1; // counts as solved if first attempt was correct (or recovered without resetting; simplified)
        storage.recordPuzzleAttempt(currentPuzzle.id, true);
        fbEl.textContent = '✓ Solved!';
        fbEl.className = 'feedback correct';
        explEl.innerHTML = currentPuzzle.explanation ? currentPuzzle.explanation : 'Nice find.';
        updateStats();
      } else {
        // play opponent's reply automatically
        setTimeout(() => {
          const oppExpected = solutionPlies[0];
          let oppMove;
          try { oppMove = chess.move(oppExpected); } catch (e) { oppMove = null; }
          if (oppMove) {
            solutionPlies.shift();
            board.setFen(chess.fen());
            board.setHighlights({ from: oppMove.from, to: oppMove.to });
            fbEl.textContent = `Opponent: ${oppMove.san}. Continue…`;
            fbEl.className = 'feedback';
          }
        }, 350);
        fbEl.textContent = '✓ Correct — keep going.';
        fbEl.className = 'feedback correct';
      }
      return true;
    } else {
      attempts++;
      // wrong move — undo and prompt
      chess.undo();
      board.setFen(chess.fen());
      fbEl.textContent = `${move.san} isn't quite right. Try again.`;
      fbEl.className = 'feedback wrong';
      storage.recordPuzzleAttempt(currentPuzzle.id, false);
      updateStats();
      return false;
    }
  }

  function sanEquals(a, b) {
    // Normalize: strip check (+) and mate (#) markers, also remove "x", "?" "!", optional disambiguation. Compare raw.
    const norm = s => String(s).replace(/[+#!?]/g, '').replace(/=/g, '').toLowerCase();
    return norm(a) === norm(b);
  }

  view.querySelector('#tacticsHint').addEventListener('click', () => {
    if (!solutionPlies.length) return;
    const next = solutionPlies[0];
    const piece = next[0];
    fbEl.textContent = `Hint: the move starts with "${piece}"…`;
    fbEl.className = 'feedback';
  });
  view.querySelector('#tacticsSolution').addEventListener('click', () => {
    if (!currentPuzzle) return;
    fbEl.textContent = 'Solution: ' + currentPuzzle.solution;
    fbEl.className = 'feedback';
    explEl.innerHTML = currentPuzzle.explanation || '';
    storage.recordPuzzleAttempt(currentPuzzle.id, false);
    updateStats();
  });
  view.querySelector('#tacticsNext').addEventListener('click', pickPuzzle);

  updateStats();
  pickPuzzle();
}
