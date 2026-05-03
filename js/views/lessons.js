// Board-first lesson player.
//
// Every lesson runs on ONE persistent board pinned at the top. The text panel
// scrolls underneath. Lesson `content` is a stream of typed blocks; each one
// either renders text or drives the main board (set-position, play-pgn,
// your-move). End-of-lesson puzzles must be solved on the main board to mark
// the lesson complete.
//
// Block types:
//   text         — markdown paragraph
//   heading      — H2-style section header
//   subheading   — H3
//   quote        — blockquote
//   set-position — button: "View this position" → loads FEN onto main board
//   play-pgn     — button: "Step through" → loads start FEN + PGN, transport
//                  bar steps through it
//   your-move    — gating checkpoint inline; user must play the right move on
//                  the main board to advance
//   puzzle       — end-of-lesson puzzle (rendered together at the bottom)
//
// Completion rule: every your-move checkpoint must be solved AND ≥3 puzzles
// must be solved.

import { storage } from '../storage.js';
import { loadAllLessons, loadLesson } from '../content-loader.js';
import { Board } from '../board.js';
import { newChess, legalMovesFrom, isInCheck, kingSquare, fensForSanList, tryMove, gameOverReason } from '../chess-utils.js';
import { engine } from '../engine.js';
import { PUZZLES } from '../data/puzzles.js';

// Lesson → puzzle theme mapping. Each lesson gets up to 5 themed puzzles auto-
// selected from the global puzzle pool. Themes mirror the lesson's content; if
// a lesson has no theme match we fall back to the track's default themes.
const TRACK_DEFAULT_THEMES = {
  tactics: ['fork', 'pin', 'skewer', 'discovered-attack', 'double-attack', 'removing-the-defender', 'deflection', 'decoy', 'overloading', 'zwischenzug', 'back-rank', 'smothered-mate', 'mating-attack', 'sacrifice'],
  positional: ['removing-the-defender', 'deflection', 'fork', 'pin', 'mating-attack'],
  endgame: ['promotion', 'underpromotion', 'mating-net', 'mating-attack'],
  calculation: ['fork', 'pin', 'discovered-attack', 'double-attack', 'mating-attack', 'sacrifice'],
  opening: ['fork', 'pin', 'sacrifice', 'mating-attack', 'greek-gift'],
  exchanges: ['removing-the-defender', 'overloading', 'sacrifice', 'fork'],
};

// Map specific lesson IDs to specific themes for tighter puzzle relevance
const LESSON_THEME_OVERRIDES = {
  'tac-deep-001-knight-fork': ['fork'],
  'tac-deep-002-pawn-fork': ['fork'],
  'tac-deep-003-skewer': ['skewer'],
  'tac-deep-004-pin': ['pin'],
  'tac-deep-005-discovered-attack': ['discovered-attack', 'discovered-check', 'double-check'],
  'tac-deep-006-double-attack': ['double-attack', 'fork'],
  'tac-deep-007-attacking-defenders': ['removing-the-defender', 'deflection', 'decoy', 'overloading'],
  'tac-deep-008-zwischenzug': ['zwischenzug'],
  'tac-deep-009-back-rank-smother': ['back-rank', 'smothered-mate'],
  'tac-adv-201-windmill': ['windmill'],
  'tac-adv-202-x-ray': ['x-ray'],
  'tac-adv-203-clearance': ['clearance'],
  'tac-adv-204-desperado': ['desperado'],
  'tac-adv-205-interference': ['interference'],
  'tac-adv-206-mating-nets': ['mating-net', 'mating-attack'],
  'tac-adv-207-perpetual': ['perpetual'],
};

function selectPuzzlesForLesson(lesson, count = 5) {
  const overrides = LESSON_THEME_OVERRIDES[lesson.id];
  const themes = overrides
    || (lesson.tags || []).filter(t => /-/.test(t) || ['pin','fork','skewer'].includes(t))
    || [];
  const fallback = TRACK_DEFAULT_THEMES[lesson.track] || ['fork', 'pin'];
  const wanted = themes.length ? themes : fallback;

  // Score each puzzle by theme overlap; pick top N with deterministic ordering
  const scored = PUZZLES.map(p => {
    const overlap = (p.themes || []).filter(t => wanted.includes(t)).length;
    return { p, score: overlap };
  }).filter(x => x.score > 0);

  // Stable sort by score desc, then by id for determinism
  scored.sort((a, b) => (b.score - a.score) || a.p.id.localeCompare(b.p.id));

  const picked = scored.slice(0, count).map(x => x.p);
  if (picked.length >= 3) return picked;

  // Fall back: pad with track defaults
  const fallbackScored = PUZZLES.map(p => {
    const overlap = (p.themes || []).filter(t => fallback.includes(t)).length;
    return { p, score: overlap };
  }).filter(x => x.score > 0)
    .sort((a, b) => (b.score - a.score) || a.p.id.localeCompare(b.p.id))
    .map(x => x.p);

  const seen = new Set(picked.map(p => p.id));
  for (const p of fallbackScored) {
    if (picked.length >= count) break;
    if (!seen.has(p.id)) { picked.push(p); seen.add(p.id); }
  }
  // Final fallback: any puzzles
  for (const p of PUZZLES) {
    if (picked.length >= count) break;
    if (!seen.has(p.id)) { picked.push(p); seen.add(p.id); }
  }
  return picked;
}

// ────────────────────────────────────────────────────────────────────────────
// Tiny markdown → HTML converter (paragraphs, bold, italic, code, lists, links)
// ────────────────────────────────────────────────────────────────────────────
export function mdToHtml(md) {
  if (!md) return '';
  let s = md.replace(/[&<>]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[c]));
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const lines = s.split(/\n/);
  const out = [];
  let inList = false;
  for (const ln of lines) {
    if (/^\s*[-*]\s+/.test(ln)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push('<li>' + ln.replace(/^\s*[-*]\s+/, '') + '</li>');
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      if (ln.trim() === '') out.push('');
      else out.push('<p>' + ln + '</p>');
    }
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

// SAN equality after stripping check/mate markers and trivial annotations
function sanEquals(a, b) {
  const norm = s => String(s).replace(/[+#!?]/g, '').trim().toLowerCase();
  return norm(a) === norm(b);
}

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// ────────────────────────────────────────────────────────────────────────────
// Main view
// ────────────────────────────────────────────────────────────────────────────
export async function renderLessons(view, params, opts = {}) {
  const tpl = document.getElementById('tpl-lessons');
  view.appendChild(tpl.content.cloneNode(true));

  const lessons = await loadAllLessons();

  // Wire the toolbar (lesson list toggle + track filter)
  const filterEl = view.querySelector('#lessonTrackFilter');
  const indexEl = view.querySelector('#lessonIndex');
  const listPanel = view.querySelector('#lessonListPanel');
  const listToggle = view.querySelector('#lessonListToggle');
  const contentEl = view.querySelector('#lessonContent');

  if (filterEl && ![...filterEl.options].some(o => o.value === 'exchanges')) {
    const opt = document.createElement('option');
    opt.value = 'exchanges';
    opt.textContent = 'Exchanges & Piece Values';
    filterEl.appendChild(opt);
  }
  if (opts.trackFilter && filterEl) filterEl.value = opts.trackFilter;

  // Mobile: list collapses by default (board needs the screen)
  let listOpen = !window.matchMedia('(max-width: 767px)').matches;
  function applyListVisibility() {
    if (listPanel) listPanel.style.display = listOpen ? '' : 'none';
  }
  applyListVisibility();
  if (listToggle) listToggle.addEventListener('click', () => {
    listOpen = !listOpen;
    applyListVisibility();
  });

  function buildIndex() {
    const filter = filterEl.value;
    indexEl.innerHTML = '';
    for (const l of lessons) {
      if (filter !== 'all' && l.track !== filter) continue;
      const li = document.createElement('li');
      li.dataset.id = l.id;
      if (storage.isLessonComplete(l.id)) li.classList.add('done');
      li.innerHTML = `<span>${escapeHtml(l.title)}</span><span class="lesson-track-tag">${l.track}</span>`;
      li.addEventListener('click', () => { location.hash = `lessons/${l.id}`; });
      indexEl.appendChild(li);
    }
  }
  filterEl.addEventListener('change', buildIndex);
  buildIndex();

  function showLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) {
      contentEl.innerHTML = `<p class="muted">Lesson "${escapeHtml(id)}" not found.</p>`;
      return;
    }
    indexEl.querySelectorAll('li').forEach(li => li.classList.toggle('active', li.dataset.id === id));
    contentEl.innerHTML = '';
    renderBoardFirstLesson(contentEl, lesson);
    if (window.matchMedia('(max-width: 767px)').matches) {
      listOpen = false;
      applyListVisibility();
    }
  }

  if (params && params[0]) showLesson(params[0]);
  else if (lessons[0]) showLesson(lessons[0].id);

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace(/^#/, '').split('/');
    if (h[0] === 'lessons' && h[1]) showLesson(h[1]);
  }, { once: true });
}

// ────────────────────────────────────────────────────────────────────────────
// Board-first lesson rendering
// ────────────────────────────────────────────────────────────────────────────
function renderBoardFirstLesson(container, lesson) {
  // Create board widget + transport + toolbar + lesson content panel + puzzles + completion section.
  // The board is the only board on this page; everything drives its state.

  const root = document.createElement('div');
  root.className = 'lesson-page';
  container.appendChild(root);

  // Board panel (sticky top on mobile)
  const boardPanel = document.createElement('div');
  boardPanel.className = 'lesson-board-panel';
  root.appendChild(boardPanel);

  const boardEl = document.createElement('div');
  boardEl.className = 'board';
  boardPanel.appendChild(boardEl);

  const statusEl = document.createElement('div');
  statusEl.className = 'lesson-board-status';
  statusEl.innerHTML = `<span class="muted">${escapeHtml(lesson.title)}</span>`;
  boardPanel.appendChild(statusEl);

  // Transport bar (for play-pgn playback)
  const transport = document.createElement('div');
  transport.className = 'lesson-transport';
  transport.innerHTML = `
    <button class="t-first" aria-label="First">⏮</button>
    <button class="t-prev" aria-label="Prev">‹</button>
    <button class="t-play" aria-label="Autoplay">▶</button>
    <button class="t-next" aria-label="Next">›</button>
    <button class="t-last" aria-label="Last">⏭</button>
    <span class="t-info muted"></span>
  `;
  boardPanel.appendChild(transport);

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'lesson-toolbar-row';
  toolbar.innerHTML = `
    <button class="tool-engine" aria-label="Toggle engine">🧠 Engine</button>
    <button class="tool-hint" aria-label="Hint">💡 Hint</button>
    <button class="tool-flip" aria-label="Flip">⇅</button>
    <button class="tool-undo" aria-label="Undo">↶</button>
    <button class="tool-reset" aria-label="Reset">⟲</button>
    <button class="tool-freeplay" aria-label="Free play">▶▶ Free play</button>
    <button class="tool-fen" aria-label="Copy FEN">📋 FEN</button>
  `;
  boardPanel.appendChild(toolbar);

  // Engine eval line (compact)
  const engineLine = document.createElement('div');
  engineLine.className = 'lesson-engine-line';
  engineLine.hidden = true;
  engineLine.innerHTML = `<span class="eval">+0.00</span> <span class="line muted">—</span> <span class="depth muted">d—</span>`;
  boardPanel.appendChild(engineLine);

  // Lesson body
  const body = document.createElement('div');
  body.className = 'lesson-body';
  root.appendChild(body);

  body.innerHTML = `
    <h1 class="lesson-h1">${escapeHtml(lesson.title)}</h1>
    <p class="muted lesson-meta">
      Track: <strong>${lesson.track}</strong> · Estimated: ${lesson.estimatedMinutes || '—'} min
      ${lesson.objective ? '· ' + escapeHtml(lesson.objective) : ''}
    </p>
  `;

  // Lesson player state
  const player = new LessonPlayer({
    boardEl,
    statusEl,
    transport,
    toolbar,
    engineLine,
    lesson,
    body,
  });

  player.start();

  // Render the script blocks
  const blocks = (lesson.content || []).slice();
  // Separate puzzles from non-puzzles — puzzles always render in the puzzles section
  const inlineBlocks = blocks.filter(b => b && b.type !== 'puzzle');
  const puzzleBlocks = blocks.filter(b => b && b.type === 'puzzle');
  // Also: lesson.puzzles (top-level array) is supported as another way to add puzzles
  const extraPuzzles = Array.isArray(lesson.puzzles) ? lesson.puzzles : [];
  const allPuzzles = [...puzzleBlocks, ...extraPuzzles];

  // Render the script
  for (const block of inlineBlocks) {
    body.appendChild(player.renderBlock(block));
  }

  // Puzzles section
  if (allPuzzles.length > 0) {
    const sec = document.createElement('section');
    sec.className = 'lesson-puzzles';
    sec.innerHTML = `<h2>Practice puzzles</h2><p class="muted">Solve at least 3 of these on the board to mark the lesson complete.</p>`;
    body.appendChild(sec);
    for (let i = 0; i < allPuzzles.length; i++) {
      sec.appendChild(player.renderPuzzle(allPuzzles[i], i));
    }
  }

  // Completion section
  const completion = document.createElement('section');
  completion.className = 'lesson-completion';
  body.appendChild(completion);
  player.attachCompletion(completion);

  // Further reading
  if (lesson.further && lesson.further.length) {
    const fr = document.createElement('div');
    fr.innerHTML = `<h3>Further reading</h3><ul>${lesson.further.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`;
    body.appendChild(fr);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// LessonPlayer — owns the board state, transport, completion tracking
// ────────────────────────────────────────────────────────────────────────────
class LessonPlayer {
  constructor({ boardEl, statusEl, transport, toolbar, engineLine, lesson, body }) {
    this.boardEl = boardEl;
    this.statusEl = statusEl;
    this.transport = transport;
    this.toolbar = toolbar;
    this.engineLine = engineLine;
    this.lesson = lesson;
    this.body = body;

    // Board state model
    this.chess = newChess();
    this.startFen = lesson.startFen || STARTING_FEN;
    // Mode: 'static' (single position), 'pgn' (steppable plies), 'puzzle' (your-move active),
    // 'freeplay' (user plays both sides; engine optional)
    this.mode = 'static';
    this.pgnFens = null;     // [fens]
    this.pgnPlies = null;    // [SAN]
    this.pgnIndex = 0;
    this.autoplayTimer = null;
    this.engineEnabled = false;
    this.activeChallenge = null;  // current your-move or puzzle the user must solve
    this.history = [];            // freeplay undo stack of FENs

    // Completion tracking
    this.checkpointTotal = 0;
    this.checkpointSolved = 0;
    this.puzzleTotal = 0;
    this.puzzleSolved = 0;
    this.completionEl = null;

    // The shared board widget
    this.board = new Board(boardEl, {
      orientation: 'white',
      draggable: true,
      getLegalMoves: (sq) => legalMovesFrom(this.chess, sq),
      getTurn: () => this.chess.turn(),
      onMove: (from, to, promo) => this._onUserMove(from, to, promo),
    });
    this.board.setFen(this.startFen);
    this._wireToolbar();
    this._wireTransport();
  }

  // Lifecycle
  start() {
    this.chess.load(this.startFen);
    this.board.setFen(this.chess.fen());
    this._setStatus(`Use the buttons below to load positions, play through games, and solve checkpoints.`);
    this._renderTransportInfo();
  }

  // ── Toolbar wiring ────────────────────────────────────────────────────────
  _wireToolbar() {
    this.toolbar.querySelector('.tool-flip').addEventListener('click', () => this.board.flip());
    this.toolbar.querySelector('.tool-reset').addEventListener('click', () => this._resetCurrent());
    this.toolbar.querySelector('.tool-undo').addEventListener('click', () => this._undo());
    this.toolbar.querySelector('.tool-fen').addEventListener('click', () => {
      navigator.clipboard?.writeText(this.chess.fen()).catch(() => {});
      this._setStatus(`Copied: ${this.chess.fen()}`);
    });
    this.toolbar.querySelector('.tool-hint').addEventListener('click', () => this._hint());
    this.toolbar.querySelector('.tool-freeplay').addEventListener('click', () => this._enterFreeplay());

    const engineBtn = this.toolbar.querySelector('.tool-engine');
    engineBtn.addEventListener('click', async () => {
      this.engineEnabled = !this.engineEnabled;
      engineBtn.classList.toggle('on', this.engineEnabled);
      this.engineLine.hidden = !this.engineEnabled;
      if (this.engineEnabled) await this._runEngine();
    });
  }

  // ── Transport wiring ──────────────────────────────────────────────────────
  _wireTransport() {
    this.transport.querySelector('.t-first').addEventListener('click', () => this._stepTo(0));
    this.transport.querySelector('.t-prev').addEventListener('click', () => this._stepTo(this.pgnIndex - 1));
    this.transport.querySelector('.t-next').addEventListener('click', () => this._stepTo(this.pgnIndex + 1));
    this.transport.querySelector('.t-last').addEventListener('click', () => this._stepTo((this.pgnFens?.length || 1) - 1));
    this.transport.querySelector('.t-play').addEventListener('click', () => this._toggleAutoplay());
    this._renderTransportInfo();
  }

  _stepTo(idx) {
    if (this.mode !== 'pgn' || !this.pgnFens) return;
    if (idx < 0 || idx >= this.pgnFens.length) return;
    this.pgnIndex = idx;
    this.chess.load(this.pgnFens[idx]);
    this.board.setFen(this.chess.fen());
    if (idx > 0) {
      const c = newChess(this.pgnFens[idx - 1]);
      try {
        const mv = c.move(this.pgnPlies[idx - 1]);
        if (mv) this.board.setHighlights({ from: mv.from, to: mv.to });
      } catch (e) {}
    } else {
      this.board.clearHighlights();
    }
    this._renderTransportInfo();
    if (this.engineEnabled) this._runEngine();
  }

  _toggleAutoplay() {
    const playBtn = this.transport.querySelector('.t-play');
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer); this.autoplayTimer = null;
      playBtn.textContent = '▶';
    } else {
      playBtn.textContent = '⏸';
      this.autoplayTimer = setInterval(() => {
        if (this.pgnFens && this.pgnIndex < this.pgnFens.length - 1) this._stepTo(this.pgnIndex + 1);
        else { clearInterval(this.autoplayTimer); this.autoplayTimer = null; playBtn.textContent = '▶'; }
      }, 900);
    }
  }

  _renderTransportInfo() {
    const info = this.transport.querySelector('.t-info');
    if (this.mode === 'pgn' && this.pgnFens) {
      info.textContent = `move ${this.pgnIndex} / ${this.pgnFens.length - 1}`;
      this.transport.querySelectorAll('button').forEach(b => b.disabled = false);
    } else {
      info.textContent = '';
      this.transport.querySelectorAll('button').forEach(b => b.disabled = true);
    }
  }

  // ── Block rendering ───────────────────────────────────────────────────────
  renderBlock(block) {
    if (!block) {
      const empty = document.createElement('div');
      return empty;
    }
    switch (block.type) {
      case 'text':
        const t = document.createElement('div');
        t.className = 'lesson-text';
        t.innerHTML = mdToHtml(block.value);
        return t;
      case 'heading':
        const h2 = document.createElement('h2');
        h2.textContent = block.value;
        return h2;
      case 'subheading':
        const h3 = document.createElement('h3');
        h3.textContent = block.value;
        return h3;
      case 'quote':
        const q = document.createElement('blockquote');
        q.innerHTML = mdToHtml(block.value);
        return q;
      case 'set-position':
      case 'board':                              // legacy alias
        return this._renderSetPosition(block);
      case 'play-pgn':
      case 'pgn':                                // legacy alias
        return this._renderPlayPgn(block);
      case 'your-move':
      case 'interactive':                        // legacy alias
        return this._renderYourMove(block);
      case 'freeplay':
        return this._renderFreeplay(block);
      default:
        const fb = document.createElement('div');
        fb.className = 'lesson-text';
        fb.textContent = JSON.stringify(block);
        return fb;
    }
  }

  _renderSetPosition(block) {
    const card = document.createElement('div');
    card.className = 'lesson-card lesson-position-card';
    card.innerHTML = `
      <div class="card-row">
        <button class="card-btn">📋 Load this position</button>
      </div>
      <div class="card-caption">${block.caption ? mdToHtml(block.caption) : ''}</div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      this.mode = 'static';
      this.pgnFens = null; this.pgnPlies = null; this.pgnIndex = 0;
      this.chess.load(block.fen);
      this.board.setOrientation(block.orientation || (this.chess.turn() === 'w' ? 'white' : 'black'));
      this.board.setFen(this.chess.fen());
      if (block.from && block.to) this.board.setHighlights({ from: block.from, to: block.to });
      else this.board.clearHighlights();
      this._renderTransportInfo();
      this._setStatus(`Position loaded. Use the toolbar to explore — try the engine, or hit Free play.`);
      this._scrollBoardIntoView();
      if (this.engineEnabled) this._runEngine();
    });
    return card;
  }

  _renderPlayPgn(block) {
    const card = document.createElement('div');
    card.className = 'lesson-card lesson-pgn-card';
    card.innerHTML = `
      <div class="card-row">
        <button class="card-btn">▶ Step through this game</button>
      </div>
      <div class="card-caption">${block.caption ? mdToHtml(block.caption) : ''}</div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      const startFen = block.startFen || STARTING_FEN;
      const { fens, plies } = fensForSanList(startFen, block.pgn);
      if (fens.length < 2) {
        this._setStatus(`Failed to load PGN.`);
        return;
      }
      this.mode = 'pgn';
      this.pgnFens = fens; this.pgnPlies = plies; this.pgnIndex = 0;
      this.chess.load(startFen);
      this.board.setOrientation(block.orientation || 'white');
      this.board.setFen(this.chess.fen());
      this.board.clearHighlights();
      this._renderTransportInfo();
      this._setStatus(`Use the transport bar (◀ ▶) to step through the game.`);
      this._scrollBoardIntoView();
      // Display PGN as text below the card
      const moves = plies.map((p, i) => (i % 2 === 0 ? `${(i / 2) + 1}. ` : '') + p).join(' ');
      const movesEl = card.querySelector('.card-caption');
      movesEl.innerHTML += `<div class="pgn-moves">${escapeHtml(moves)}</div>`;
    }, { once: true });
    return card;
  }

  _renderYourMove(block) {
    const card = document.createElement('div');
    card.className = 'lesson-card lesson-checkpoint-card';
    card.dataset.cpIndex = String(this.checkpointTotal);
    this.checkpointTotal++;

    card.innerHTML = `
      <div class="cp-header">
        <span class="cp-badge">Your move ${card.dataset.cpIndex == 0 ? '①' : '·'}</span>
        <span class="cp-status muted">— solve on the board</span>
      </div>
      <div class="cp-prompt">${block.prompt ? mdToHtml(block.prompt) : 'Find the right move.'}</div>
      <div class="card-row">
        <button class="card-btn cp-load">▶ Load on the board</button>
        <button class="cp-hint" hidden>💡 Hint</button>
        <button class="cp-reveal" hidden>👁 Reveal</button>
      </div>
      <div class="cp-explain" hidden></div>
    `;

    const loadBtn = card.querySelector('.cp-load');
    const hintBtn = card.querySelector('.cp-hint');
    const revealBtn = card.querySelector('.cp-reveal');
    const statusEl = card.querySelector('.cp-status');
    const explainEl = card.querySelector('.cp-explain');

    const activate = () => {
      this.mode = 'puzzle';
      this.pgnFens = null; this.pgnPlies = null;
      this.chess.load(block.fen);
      this.board.setOrientation(block.orientation || (this.chess.turn() === 'w' ? 'white' : 'black'));
      this.board.setFen(this.chess.fen());
      this.board.clearHighlights();
      if (isInCheck(this.chess)) this.board.setHighlights({ check: kingSquare(this.chess, this.chess.turn()) });
      this._renderTransportInfo();
      this.activeChallenge = {
        kind: 'checkpoint',
        card,
        block,
        statusEl,
        explainEl,
        attempts: 0,
        solved: false,
      };
      hintBtn.hidden = false;
      revealBtn.hidden = false;
      statusEl.innerHTML = `<span class="cp-active">${this.chess.turn() === 'w' ? 'White' : 'Black'} to move — make your move on the board ↑</span>`;
      this._setStatus(`Your move — find the right move and play it on the board.`);
      this._scrollBoardIntoView();
    };
    loadBtn.addEventListener('click', activate);

    hintBtn.addEventListener('click', () => {
      const sol = String(block.solution || '');
      if (!sol) return;
      const piece = sol[0];
      statusEl.innerHTML = `<span class="muted">Hint: the move starts with "<strong>${escapeHtml(piece)}</strong>"…</span>`;
    });
    revealBtn.addEventListener('click', () => {
      const sol = String(block.solution || '');
      statusEl.innerHTML = `<span class="muted">Solution: <strong>${escapeHtml(sol)}</strong></span>`;
      explainEl.innerHTML = block.explanation ? mdToHtml(block.explanation) : '';
      explainEl.hidden = false;
    });

    return card;
  }

  _renderFreeplay(block) {
    const card = document.createElement('div');
    card.className = 'lesson-card lesson-freeplay-card';
    card.innerHTML = `
      <div class="card-row">
        <button class="card-btn">▶▶ Play this position freely</button>
      </div>
      <div class="card-caption">${block.caption ? mdToHtml(block.caption) : 'Set up the position and play both sides — or enable the engine to play against you.'}</div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      const fen = block.fen || this.chess.fen();
      this.chess.load(fen);
      this.mode = 'freeplay';
      this.pgnFens = null; this.pgnPlies = null;
      this.history = [fen];
      this.board.setFen(this.chess.fen());
      this.board.clearHighlights();
      this._renderTransportInfo();
      this._setStatus(`Free play — make any legal move. Use ↶ to undo, ⟲ to reset.`);
      this._scrollBoardIntoView();
    });
    return card;
  }

  renderPuzzle(block, index) {
    const card = document.createElement('div');
    card.className = 'lesson-card lesson-puzzle-card';
    card.dataset.pzIndex = String(this.puzzleTotal);
    this.puzzleTotal++;

    card.innerHTML = `
      <div class="cp-header">
        <span class="cp-badge">Puzzle ${index + 1}</span>
        <span class="cp-status muted">${escapeHtml(block.theme || (block.themes||[]).join(', ') || '')}</span>
      </div>
      <div class="cp-prompt">${block.prompt ? mdToHtml(block.prompt) : 'Solve on the board.'}</div>
      <div class="card-row">
        <button class="card-btn pz-load">▶ Load puzzle</button>
        <button class="pz-hint" hidden>💡 Hint</button>
        <button class="pz-reveal" hidden>👁 Reveal</button>
      </div>
      <div class="cp-explain" hidden></div>
    `;

    const loadBtn = card.querySelector('.pz-load');
    const hintBtn = card.querySelector('.pz-hint');
    const revealBtn = card.querySelector('.pz-reveal');
    const statusEl = card.querySelector('.cp-status');
    const explainEl = card.querySelector('.cp-explain');

    loadBtn.addEventListener('click', () => {
      this.mode = 'puzzle';
      this.pgnFens = null; this.pgnPlies = null;
      this.chess.load(block.fen);
      this.board.setOrientation(this.chess.turn() === 'w' ? 'white' : 'black');
      this.board.setFen(this.chess.fen());
      this.board.clearHighlights();
      if (isInCheck(this.chess)) this.board.setHighlights({ check: kingSquare(this.chess, this.chess.turn()) });
      this._renderTransportInfo();

      // Multi-move solutions: split, the user plays the first, opponent replies auto, etc.
      const sol = String(block.solution || '').split(/\s+/).filter(Boolean);
      this.activeChallenge = {
        kind: 'puzzle',
        card,
        block,
        remaining: sol,
        statusEl,
        explainEl,
        attempts: 0,
        solved: false,
      };
      hintBtn.hidden = false;
      revealBtn.hidden = false;
      statusEl.innerHTML = `<span class="cp-active">${this.chess.turn() === 'w' ? 'White' : 'Black'} to move — find the win.</span>`;
      this._setStatus(`Puzzle ${index + 1} loaded — find the right move.`);
      this._scrollBoardIntoView();
    });
    hintBtn.addEventListener('click', () => {
      const next = this.activeChallenge?.remaining?.[0];
      if (!next) return;
      const piece = next[0];
      statusEl.innerHTML = `<span class="muted">Hint: starts with "<strong>${escapeHtml(piece)}</strong>"…</span>`;
    });
    revealBtn.addEventListener('click', () => {
      statusEl.innerHTML = `<span class="muted">Solution: <strong>${escapeHtml(block.solution)}</strong></span>`;
      explainEl.innerHTML = block.explanation ? mdToHtml(block.explanation) : '';
      explainEl.hidden = false;
    });
    return card;
  }

  // ── Move handler ──────────────────────────────────────────────────────────
  async _onUserMove(from, to, promo) {
    if (this.mode === 'static' || this.mode === 'pgn') {
      // Allow free exploration even without an active challenge — drop into freeplay implicitly
      this.mode = 'freeplay';
      this.history = [this.chess.fen()];
    }
    if (this.mode === 'puzzle' && this.activeChallenge) {
      return this._handleChallengeMove(from, to, promo);
    }
    if (this.mode === 'freeplay') {
      const move = tryMove(this.chess, from, to, promo);
      if (!move) return false;
      this.history.push(this.chess.fen());
      this.board.setFen(this.chess.fen());
      this.board.setHighlights({ from: move.from, to: move.to });
      const reason = gameOverReason(this.chess);
      if (reason) this._setStatus(`${reason}.`);
      if (this.engineEnabled) this._runEngine();
      return true;
    }
    return false;
  }

  async _handleChallengeMove(from, to, promo) {
    const ch = this.activeChallenge;
    if (!ch) return false;
    let move;
    try { move = this.chess.move({ from, to, promotion: promo || 'q' }); } catch (e) { return false; }
    if (!move) return false;
    const expected = ch.kind === 'checkpoint' ? ch.block.solution : ch.remaining[0];
    if (sanEquals(move.san, expected)) {
      // Right move
      this.board.setFen(this.chess.fen());
      this.board.setHighlights({ from: move.from, to: move.to });
      this.board.flash(move.to, 'good');
      if (ch.kind === 'checkpoint') {
        ch.solved = true;
        ch.statusEl.innerHTML = `<span class="cp-correct">✓ Correct — ${escapeHtml(move.san)}</span>`;
        ch.explainEl.innerHTML = ch.block.explanation ? mdToHtml(ch.block.explanation) : 'Nice move.';
        ch.explainEl.hidden = false;
        ch.card.classList.add('solved');
        this.checkpointSolved++;
        this._renderCompletion();
        this.activeChallenge = null;
      } else {
        // Multi-move puzzle
        ch.remaining.shift();
        if (ch.remaining.length === 0) {
          ch.solved = true;
          ch.statusEl.innerHTML = `<span class="cp-correct">✓ Solved!</span>`;
          ch.explainEl.innerHTML = ch.block.explanation ? mdToHtml(ch.block.explanation) : 'Well played.';
          ch.explainEl.hidden = false;
          ch.card.classList.add('solved');
          this.puzzleSolved++;
          storage.recordPuzzleAttempt('inline-' + this.lesson.id + '-' + ch.card.dataset.pzIndex, true);
          this._renderCompletion();
          this.activeChallenge = null;
        } else {
          // Auto-play opponent's reply
          ch.statusEl.innerHTML = `<span class="cp-correct">✓ Correct — keep going.</span>`;
          setTimeout(() => {
            const oppExpected = ch.remaining[0];
            let oppMove;
            try { oppMove = this.chess.move(oppExpected); } catch (e) { oppMove = null; }
            if (oppMove) {
              ch.remaining.shift();
              this.board.setFen(this.chess.fen());
              this.board.setHighlights({ from: oppMove.from, to: oppMove.to });
              ch.statusEl.innerHTML = `<span class="muted">Opponent: ${escapeHtml(oppMove.san)} — your move.</span>`;
            }
          }, 350);
        }
      }
      return true;
    } else {
      // Wrong move
      ch.attempts++;
      this.chess.undo();
      this.board.setFen(this.chess.fen());
      this.board.flash(to, 'bad');
      ch.statusEl.innerHTML = `<span class="cp-wrong">${escapeHtml(move.san)} isn't quite right. Try again.</span>`;
      return false;
    }
  }

  _resetCurrent() {
    if (this.mode === 'pgn' && this.pgnFens) {
      this._stepTo(0);
    } else if (this.activeChallenge) {
      this.chess.load(this.activeChallenge.block.fen);
      this.board.setFen(this.chess.fen());
      this.board.clearHighlights();
      if (this.activeChallenge.kind === 'puzzle') {
        const sol = String(this.activeChallenge.block.solution || '').split(/\s+/).filter(Boolean);
        this.activeChallenge.remaining = sol;
      }
    } else {
      this.chess.load(this.startFen);
      this.board.setFen(this.chess.fen());
      this.board.clearHighlights();
    }
  }
  _undo() {
    if (this.mode === 'freeplay' && this.history.length > 1) {
      this.history.pop();
      const fen = this.history[this.history.length - 1];
      this.chess.load(fen);
      this.board.setFen(fen);
      this.board.clearHighlights();
    } else if (this.mode === 'pgn') {
      this._stepTo(this.pgnIndex - 1);
    } else {
      try {
        this.chess.undo();
        this.board.setFen(this.chess.fen());
      } catch (e) {}
    }
  }
  _hint() {
    if (this.activeChallenge) {
      const sol = this.activeChallenge.kind === 'checkpoint'
        ? this.activeChallenge.block.solution
        : this.activeChallenge.remaining[0];
      if (sol) this._setStatus(`Hint: starts with "${sol[0]}"…`);
    } else {
      this._setStatus(`No active challenge — load a checkpoint or puzzle to get hints.`);
    }
  }
  async _enterFreeplay() {
    this.mode = 'freeplay';
    this.history = [this.chess.fen()];
    this._setStatus(`Free play from this position. Make any legal move; use ↶ to undo.`);
  }

  // ── Engine ────────────────────────────────────────────────────────────────
  async _runEngine() {
    if (!this.engineEnabled) return;
    try {
      await engine.start();
      const depth = window.matchMedia('(max-width: 767px)').matches ? 12 : 14;
      const off = engine.onMessage((line) => {
        if (line.startsWith('info ')) {
          const dM = line.match(/\bdepth (\d+)/);
          const cpM = line.match(/\bscore cp (-?\d+)/);
          const mM = line.match(/\bscore mate (-?\d+)/);
          const pvM = line.match(/\bpv (.+?)(?: bmc | string |$)/);
          if (dM) this.engineLine.querySelector('.depth').textContent = 'd' + dM[1];
          if (cpM) {
            const cp = parseInt(cpM[1], 10) / 100;
            const fromWhite = this.chess.turn() === 'w' ? cp : -cp;
            this.engineLine.querySelector('.eval').textContent = (fromWhite >= 0 ? '+' : '') + fromWhite.toFixed(2);
          }
          if (mM) this.engineLine.querySelector('.eval').textContent = `M${Math.abs(parseInt(mM[1],10))}`;
          if (pvM) this.engineLine.querySelector('.line').textContent = pvM[1].trim().slice(0, 80);
        }
        if (line.startsWith('bestmove')) off();
      });
      engine.send('ucinewgame');
      engine.send('position fen ' + this.chess.fen());
      engine.send('go depth ' + depth);
    } catch (e) {
      this.engineLine.querySelector('.eval').textContent = '!';
      this.engineLine.querySelector('.line').textContent = 'Engine unavailable';
    }
  }

  // ── Completion section ────────────────────────────────────────────────────
  attachCompletion(el) {
    this.completionEl = el;
    this._renderCompletion();
  }

  _renderCompletion() {
    if (!this.completionEl) return;
    const cpsNeeded = this.checkpointTotal;
    const pzsNeeded = Math.min(3, this.puzzleTotal);
    const allCps = this.checkpointSolved >= cpsNeeded;
    const enoughPz = this.puzzleSolved >= pzsNeeded;
    const ready = allCps && enoughPz;
    const isDone = storage.isLessonComplete(this.lesson.id);

    this.completionEl.innerHTML = `
      <h2>Mark complete</h2>
      <div class="completion-criteria">
        <div class="criterion ${allCps ? 'met' : ''}">
          <span class="dot"></span> Checkpoints solved: ${this.checkpointSolved} / ${cpsNeeded}
        </div>
        <div class="criterion ${enoughPz ? 'met' : ''}">
          <span class="dot"></span> Puzzles solved: ${this.puzzleSolved} / ${pzsNeeded} (of ${this.puzzleTotal})
        </div>
      </div>
      <button class="mark-complete-btn" ${ready ? '' : 'disabled'}>
        ${isDone ? '✓ Already marked complete — mark again' : (ready ? 'Mark complete ✓' : 'Solve the requirements above to unlock')}
      </button>
      ${this.lesson.next ? `<button class="next-lesson-btn">Next lesson →</button>` : ''}
    `;
    const markBtn = this.completionEl.querySelector('.mark-complete-btn');
    if (markBtn) markBtn.addEventListener('click', () => {
      storage.markLessonComplete(this.lesson.id, this.lesson.title);
      markBtn.textContent = '✓ Saved';
    });
    if (this.lesson.next) {
      const nextBtn = this.completionEl.querySelector('.next-lesson-btn');
      nextBtn.addEventListener('click', () => { location.hash = `lessons/${this.lesson.next}`; });
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  _setStatus(text) {
    if (this.statusEl) this.statusEl.innerHTML = mdToHtml ? `<span>${escapeHtml(text)}</span>` : text;
  }
  _scrollBoardIntoView() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.boardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
