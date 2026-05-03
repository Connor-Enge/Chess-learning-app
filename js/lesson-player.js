// Synchronized text+board lesson player, built on chessground.
//
// A lesson is a script: an ordered list of `beats`, each one of these kinds:
//   { kind: 'text',          md: '## Markdown' }
//   { kind: 'set-position',  fen: '...', orientation: 'white'|'black' }
//   { kind: 'play-move',     san: 'Nc7+', explain: '...', delayMs?: 400 }
//   { kind: 'callout',       square: 'd5', text: '...', color?: 'yellow', durationMs?: null }
//   { kind: 'arrow',         from: 'e5', to: 'e8', color?: 'red', dashed?: false }
//   { kind: 'highlight',     squares: ['d5','e5'], color?: 'green' }
//   { kind: 'clear-shapes' }
//   { kind: 'pause',         ms: 800 }
//   { kind: 'your-move',     san: 'Kxc7', wrongHint?: '...', rightExplain?: '...', hint?: '...' }
//   { kind: 'puzzle',        fen: '...', solution: ['Nf6+','Kh8','Qg8+'], explain: '...', themes?: [...] }
//
// The runtime has a cursor, walks beats in order, plays a loop:
//   1. Render the next beat's effect on the board / overlay
//   2. If beat needs to wait (play-move, your-move, pause, puzzle) — wait
//   3. Advance the cursor
//   4. Repeat until end OR user pauses
// Manual transport: Play, Pause, Step Back, Step Forward, Restart.

import { Chessground } from 'https://cdn.jsdelivr.net/npm/chessground@9/dist/chessground.min.js';
import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.6/dist/esm/chess.js';
import { storage } from './storage.js';

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Map our color names → chessground brush colors. Chessground supports
// 'green' | 'red' | 'blue' | 'yellow' as built-in brushes; we add CSS overrides
// in lesson-player.css for visual distinction.
const COLOR_MAP = { green: 'green', red: 'red', blue: 'blue', yellow: 'yellow' };

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

// Tiny markdown → HTML (paragraphs, bold, italic, code, links, lists)
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
    } else if (/^##\s+/.test(ln)) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push('<h3>' + ln.replace(/^##\s+/, '') + '</h3>');
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      if (ln.trim() === '') out.push('');
      else out.push('<p>' + ln + '</p>');
    }
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function sanEquals(a, b) {
  const norm = s => String(s || '').replace(/[+#!?]/g, '').trim().toLowerCase();
  return norm(a) === norm(b);
}

// ────────────────────────────────────────────────────────────────────────────
// LessonPlayer — owns the chessground, the chess.js model, the beat cursor,
// the callout overlay, and lesson completion tracking.
// ────────────────────────────────────────────────────────────────────────────
export class LessonPlayer {
  /**
   * @param {object} opts
   *  - host: HTMLElement to render into
   *  - lesson: {id, title, track, startFen?, script: [...beats...], next?, ...}
   *  - onComplete?: () => void  (fired when user marks the lesson complete)
   */
  constructor({ host, lesson, onComplete }) {
    this.host = host;
    this.lesson = lesson;
    this.onComplete = onComplete || (() => {});
    this.script = (lesson.script || []).slice();

    this.cursor = 0;             // next beat index to execute
    this.maxReached = 0;         // furthest beat we've ever reached (for stepBack bounds)
    this.playing = false;
    this.autoTimer = null;
    this.activeShapes = [];      // accumulated chessground shapes
    this.activeCallouts = [];    // [{el, square, expiresAt}]
    this.executedTextIndices = new Set(); // text beats already shown
    this.your_move_total = 0;
    this.your_move_solved = 0;
    this.puzzle_total = 0;
    this.puzzle_solved = 0;
    this.lastMoveExplain = new Map();   // ply N → explain text (for "Why?" tap)
    this.activeChallenge = null; // { kind: 'your-move'|'puzzle', expectedSan, ... }
    this.endedLesson = false;

    // chess model that mirrors the board state for legality + SAN parsing
    this.chess = new Chess();
    this.startFen = lesson.startFen || STARTING_FEN;
    this.chess.load(this.startFen);

    this._build();
    this._mountChessground();
    this._renderTextStream();
    this._scheduleNextRender(0);
  }

  // ── DOM scaffold ──────────────────────────────────────────────────────────
  _build() {
    this.host.innerHTML = '';
    const root = document.createElement('div');
    root.className = 'lp-root';
    this.host.appendChild(root);
    this.root = root;

    // Board panel (sticky on mobile, side-pinned on tablet+)
    const boardPanel = document.createElement('div');
    boardPanel.className = 'lp-board-panel';
    root.appendChild(boardPanel);
    this.boardPanel = boardPanel;

    // Wrapper required by chessground sizing (.cg-wrap)
    const cgWrap = document.createElement('div');
    cgWrap.className = 'lp-board cg-wrap';
    boardPanel.appendChild(cgWrap);
    this.cgWrap = cgWrap;

    // Callout overlay — absolutely positioned children, board-relative
    const overlay = document.createElement('div');
    overlay.className = 'lp-callout-overlay';
    boardPanel.appendChild(overlay);
    this.overlay = overlay;

    // Move-explain tooltip (shown after each played move)
    const moveTip = document.createElement('div');
    moveTip.className = 'lp-move-tip';
    moveTip.hidden = true;
    boardPanel.appendChild(moveTip);
    this.moveTip = moveTip;

    // Transport bar — Phosphor icons (added by the design-system session;
    // safe-fallback to Unicode glyphs if Phosphor doesn't load).
    const transport = document.createElement('div');
    transport.className = 'lp-transport transport';
    transport.innerHTML = `
      <button class="lp-restart transport__btn" aria-label="Restart"><i class="ph ph-skip-back icon" aria-hidden="true"></i><span class="visually-hidden">⏮</span></button>
      <button class="lp-back transport__btn" aria-label="Step back"><i class="ph ph-caret-left icon" aria-hidden="true"></i><span class="visually-hidden">◀</span></button>
      <button class="lp-play transport__btn transport__btn--primary btn btn--primary" aria-label="Play"><i class="ph ph-play icon" aria-hidden="true"></i><span class="visually-hidden">▶</span></button>
      <button class="lp-fwd transport__btn" aria-label="Step forward"><i class="ph ph-caret-right icon" aria-hidden="true"></i><span class="visually-hidden">▶▶</span></button>
      <button class="lp-flip transport__btn" aria-label="Flip board"><i class="ph ph-arrows-down-up icon" aria-hidden="true"></i><span class="visually-hidden">⇅</span></button>
    `;
    boardPanel.appendChild(transport);
    this.transport = transport;
    transport.querySelector('.lp-restart').addEventListener('click', () => this.restart());
    transport.querySelector('.lp-back').addEventListener('click', () => this.stepBack());
    transport.querySelector('.lp-play').addEventListener('click', () => this.toggle());
    transport.querySelector('.lp-fwd').addEventListener('click', () => this.stepForward());
    transport.querySelector('.lp-flip').addEventListener('click', () => this.flip());

    // Progress bar above transport
    const progress = document.createElement('div');
    progress.className = 'lp-progress';
    progress.innerHTML = '<div class="lp-progress-bar"></div><span class="lp-progress-label">0 / 0</span>';
    boardPanel.insertBefore(progress, transport);
    this.progress = progress;

    // Text panel (lesson body)
    const text = document.createElement('div');
    text.className = 'lp-text';
    text.innerHTML = `
      <h1 class="lp-title">${escapeHtml(this.lesson.title)}</h1>
      <p class="lp-meta">Track: <strong>${escapeHtml(this.lesson.track || '—')}</strong>
        ${this.lesson.estimatedMinutes ? ' · ' + this.lesson.estimatedMinutes + ' min' : ''}
        ${this.lesson.objective ? '<br><em>' + escapeHtml(this.lesson.objective) + '</em>' : ''}
      </p>
      <p class="lp-hint muted">Tap <strong>▶ Play</strong> to start the narrated walkthrough — the board will animate while the explanations appear. You can step or scrub at any time.</p>
      <div class="lp-stream"></div>
    `;
    root.appendChild(text);
    this.textRoot = text;
    this.stream = text.querySelector('.lp-stream');

    // Completion section
    const completion = document.createElement('div');
    completion.className = 'lp-completion';
    text.appendChild(completion);
    this.completionEl = completion;
    this._renderCompletion();
  }

  _mountChessground() {
    // Initial chessground config; we update later via this.cg.set(...)
    this.cg = Chessground(this.cgWrap, {
      fen: this.chess.fen(),
      orientation: this.lesson.orientation || 'white',
      coordinates: true,
      animation: { enabled: true, duration: 350 },
      movable: {
        free: false,
        color: 'both',
        showDests: true,
        events: { after: (orig, dest, meta) => this._onBoardMove(orig, dest, meta) },
      },
      drawable: { enabled: false, eraseOnClick: false },
      events: {
        select: (square) => this._onSquareClick(square),
      },
      premovable: { enabled: false },
      highlight: { lastMove: true, check: true },
    });
    this._refreshDests();
  }

  // ── Beat execution ────────────────────────────────────────────────────────
  _scheduleNextRender(delay) {
    if (this.cursor >= this.script.length) {
      this._onScriptEnd();
      return;
    }
    if (!this.playing) return;
    clearTimeout(this.autoTimer);
    this.autoTimer = setTimeout(() => this._executeNextBeat(), delay);
  }

  async _executeNextBeat() {
    if (!this.playing) return;
    if (this.cursor >= this.script.length) { this._onScriptEnd(); return; }
    const beat = this.script[this.cursor];
    this.cursor++;
    this.maxReached = Math.max(this.maxReached, this.cursor);
    this._updateProgress();

    const next = await this._renderBeat(beat);

    // Some beats hand control back (your-move, puzzle) — they call this.continue()
    // when ready. Others have a delay before the next beat.
    if (!this.activeChallenge) {
      this._scheduleNextRender(next ?? this._defaultBeatGap(beat));
    }
  }

  _defaultBeatGap(beat) {
    if (beat.kind === 'play-move') return 700;     // breathing room after a move
    if (beat.kind === 'callout') return 600;
    if (beat.kind === 'text') return 400;
    if (beat.kind === 'arrow' || beat.kind === 'highlight') return 350;
    if (beat.kind === 'pause') return 0;            // already paused via beat.ms
    return 200;
  }

  /**
   * Render one beat. Returns optional `delayMsBeforeNext` (number) or void.
   */
  async _renderBeat(beat) {
    switch (beat.kind) {
      case 'text': {
        // Reveal the text card matching this beat
        const card = this.stream.querySelector(`[data-beat-index="${this.cursor - 1}"]`);
        if (card) {
          card.classList.add('lp-revealed');
          // Scroll the new text card into view but keep board pinned
          this._scrollTextIntoView(card);
        }
        return null;
      }
      case 'set-position': {
        this.chess.load(beat.fen);
        this.cg.set({
          fen: beat.fen,
          orientation: beat.orientation || this.cg.state.orientation,
          turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
          lastMove: undefined,
          check: undefined,
        });
        this._refreshDests();
        this._clearShapes();
        this._clearCallouts();
        return null;
      }
      case 'play-move': {
        const move = this.chess.move(beat.san);
        if (!move) {
          console.warn('Illegal scripted move:', beat.san, 'in', this.chess.fen());
          return null;
        }
        this.cg.set({
          fen: this.chess.fen(),
          turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
          lastMove: [move.from, move.to],
          check: this.chess.inCheck() ? (this.chess.turn() === 'w' ? 'white' : 'black') : undefined,
        });
        this._refreshDests();
        // Show explain tooltip
        if (beat.explain) {
          this._showMoveTip(beat.explain, [move.from, move.to]);
          this.lastMoveExplain.set(this.chess.history().length, { explain: beat.explain, square: move.to });
        }
        return beat.delayMs ?? 700;
      }
      case 'callout': {
        this._addCallout(beat.square, beat.text, beat.color || 'yellow', beat.durationMs ?? null);
        return null;
      }
      case 'arrow': {
        this._addShape({
          orig: beat.from, dest: beat.to,
          brush: COLOR_MAP[beat.color] || 'green',
          modifiers: beat.dashed ? { lineWidth: 8 } : {},
        });
        return null;
      }
      case 'highlight': {
        const color = COLOR_MAP[beat.color] || 'green';
        for (const sq of (beat.squares || [])) {
          this._addShape({ orig: sq, brush: color });
        }
        return null;
      }
      case 'clear-shapes': {
        this._clearShapes();
        return null;
      }
      case 'pause': {
        return beat.ms || 600;
      }
      case 'your-move': {
        this.your_move_total++;
        this.activeChallenge = {
          kind: 'your-move',
          expected: beat.san,
          beat,
          attempts: 0,
          card: null,
        };
        this._showMoveTip(beat.prompt || `Your move — ${this.chess.turn() === 'w' ? 'White' : 'Black'} to play. Find the right move.`, null, 'lp-prompt');
        // Pause auto-advance until they solve
        this.pause();
        return null;
      }
      case 'puzzle': {
        // Puzzle beats are rendered in the end-of-lesson section, NOT in the inline stream.
        // We pre-collect them in _renderTextStream so they show up there.
        return null;
      }
      default:
        console.warn('Unknown beat kind:', beat.kind);
        return null;
    }
  }

  _onScriptEnd() {
    this.endedLesson = true;
    this.pause();
    // Scroll to puzzles section if present
    const pz = this.stream.querySelector('.lp-puzzles');
    if (pz) this._scrollTextIntoView(pz);
    this._renderCompletion();
  }

  _updateProgress() {
    const total = this.script.length;
    const bar = this.progress.querySelector('.lp-progress-bar');
    const lbl = this.progress.querySelector('.lp-progress-label');
    bar.style.width = total ? Math.round((this.cursor / total) * 100) + '%' : '0%';
    lbl.textContent = `${this.cursor} / ${total}`;
  }

  // ── Text panel rendering ──────────────────────────────────────────────────
  _renderTextStream() {
    let html = '';
    let puzzleIdx = 0;
    const puzzles = [];

    for (let i = 0; i < this.script.length; i++) {
      const b = this.script[i];
      if (b.kind === 'text') {
        html += `<div class="lp-card lp-text-card" data-beat-index="${i}">${mdToHtml(b.md)}</div>`;
      } else if (b.kind === 'puzzle') {
        puzzles.push({ ...b, _i: i, _idx: puzzleIdx++ });
      }
      // Other beats show no text (they only affect the board / overlay).
    }
    this.stream.innerHTML = html;

    // Render puzzles section
    if (puzzles.length > 0) {
      const pzSection = document.createElement('section');
      pzSection.className = 'lp-puzzles';
      pzSection.innerHTML = `<h2>Practice puzzles</h2><p class="muted">Solve at least 3 of these on the board to mark the lesson complete.</p>`;
      for (const p of puzzles) {
        this.puzzle_total++;
        const card = document.createElement('div');
        card.className = 'lp-card lp-puzzle-card';
        card.dataset.puzzleId = String(p._idx);
        card.innerHTML = `
          <div class="lp-card-header">
            <span class="lp-badge">Puzzle ${p._idx + 1}</span>
            <span class="lp-puzzle-status muted">${escapeHtml((p.themes || []).join(', ') || '')}</span>
          </div>
          <div class="lp-card-body">${p.prompt ? mdToHtml(p.prompt) : '<p>Solve on the board.</p>'}</div>
          <div class="lp-card-actions">
            <button class="lp-btn lp-pz-load btn btn--primary"><i class="ph ph-play icon" aria-hidden="true"></i> Load this puzzle</button>
            <button class="lp-btn lp-pz-hint btn btn--secondary" hidden><i class="ph ph-lightbulb icon" aria-hidden="true"></i> Hint</button>
            <button class="lp-btn lp-pz-reveal btn btn--secondary" hidden><i class="ph ph-eye icon" aria-hidden="true"></i> Reveal</button>
          </div>
          <div class="lp-card-explain" hidden></div>
        `;
        pzSection.appendChild(card);
        const loadBtn = card.querySelector('.lp-pz-load');
        const hintBtn = card.querySelector('.lp-pz-hint');
        const revealBtn = card.querySelector('.lp-pz-reveal');
        const statusEl = card.querySelector('.lp-puzzle-status');
        const explainEl = card.querySelector('.lp-card-explain');
        loadBtn.addEventListener('click', () => this._loadPuzzle(p, { card, statusEl, explainEl, hintBtn, revealBtn }));
        hintBtn.addEventListener('click', () => {
          const next = this.activeChallenge?.remaining?.[0];
          if (!next) return;
          statusEl.innerHTML = `<span class="muted">Hint: starts with "<strong>${escapeHtml(next[0])}</strong>"…</span>`;
        });
        revealBtn.addEventListener('click', () => {
          statusEl.innerHTML = `<span class="muted">Solution: <strong>${escapeHtml((p.solution || []).join(' '))}</strong></span>`;
          explainEl.innerHTML = p.explain ? mdToHtml(p.explain) : '';
          explainEl.hidden = false;
        });
      }
      this.stream.appendChild(pzSection);
    }
  }

  _loadPuzzle(p, ui) {
    // Stop auto-play and load the puzzle position
    this.pause();
    this.chess.load(p.fen);
    this.cg.set({
      fen: p.fen,
      orientation: this.chess.turn() === 'w' ? 'white' : 'black',
      turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
      lastMove: undefined,
      check: this.chess.inCheck() ? (this.chess.turn() === 'w' ? 'white' : 'black') : undefined,
    });
    this._refreshDests();
    this._clearShapes();
    this._clearCallouts();

    const sol = Array.isArray(p.solution) ? p.solution.slice() : String(p.solution || '').split(/\s+/).filter(Boolean);
    this.activeChallenge = {
      kind: 'puzzle',
      remaining: sol,
      beat: p,
      ui,
      attempts: 0,
    };
    ui.hintBtn.hidden = false;
    ui.revealBtn.hidden = false;
    ui.statusEl.innerHTML = `<span class="lp-active">${this.chess.turn() === 'w' ? 'White' : 'Black'} to move — find the win.</span>`;
    this._showMoveTip(`Puzzle ${p._idx + 1}: ${this.chess.turn() === 'w' ? 'White' : 'Black'} to move.`, null, 'lp-prompt');
    this._scrollBoardIntoView();
  }

  _scrollTextIntoView(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  _scrollBoardIntoView() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.boardPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ── User move handler (drag/tap on board) ─────────────────────────────────
  _onBoardMove(orig, dest, meta) {
    const ch = this.activeChallenge;
    if (!ch) {
      // Free exploration — just play the move on chess.js to mirror state
      try { this.chess.move({ from: orig, to: dest, promotion: 'q' }); }
      catch (e) {
        // Illegal — restore
        this.cg.set({ fen: this.chess.fen(), turnColor: this.chess.turn() === 'w' ? 'white' : 'black' });
      }
      this._refreshDests();
      return;
    }
    // Active challenge: validate the move
    let move;
    try { move = this.chess.move({ from: orig, to: dest, promotion: 'q' }); } catch (e) { move = null; }
    if (!move) {
      // Restore board
      this.cg.set({ fen: this.chess.fen(), turnColor: this.chess.turn() === 'w' ? 'white' : 'black' });
      this._refreshDests();
      return;
    }
    const expected = ch.kind === 'your-move' ? ch.expected : ch.remaining[0];
    if (sanEquals(move.san, expected)) {
      // Right
      this.cg.set({
        fen: this.chess.fen(),
        turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
        lastMove: [move.from, move.to],
        check: this.chess.inCheck() ? (this.chess.turn() === 'w' ? 'white' : 'black') : undefined,
      });
      this._refreshDests();
      this._flashSquare(move.to, 'good');
      if (ch.kind === 'your-move') {
        const explain = ch.beat.rightExplain || `Correct — ${move.san}.`;
        this._showMoveTip(`✓ ${explain}`, [move.from, move.to], 'lp-good');
        this.your_move_solved++;
        this.activeChallenge = null;
        this._renderCompletion();
        // Resume auto-play after a beat
        setTimeout(() => { this.play(); }, 900);
      } else {
        // Puzzle: multi-move
        ch.remaining.shift();
        if (ch.remaining.length === 0) {
          ch.ui.statusEl.innerHTML = `<span class="lp-good">✓ Solved!</span>`;
          ch.ui.explainEl.innerHTML = ch.beat.explain ? mdToHtml(ch.beat.explain) : 'Well played.';
          ch.ui.explainEl.hidden = false;
          ch.ui.card.classList.add('solved');
          this.puzzle_solved++;
          storage.recordPuzzleAttempt('lp-' + this.lesson.id + '-' + ch.beat._idx, true);
          this._showMoveTip(`✓ Puzzle solved.`, [move.from, move.to], 'lp-good');
          this.activeChallenge = null;
          this._renderCompletion();
        } else {
          // Auto-play opponent's reply
          ch.ui.statusEl.innerHTML = `<span class="lp-good">✓ Correct — keep going.</span>`;
          this._showMoveTip(`✓ ${move.san} — keep going.`, [move.from, move.to], 'lp-good');
          setTimeout(() => {
            const opp = ch.remaining[0];
            let oppMove;
            try { oppMove = this.chess.move(opp); } catch (e) { oppMove = null; }
            if (oppMove) {
              ch.remaining.shift();
              this.cg.set({
                fen: this.chess.fen(),
                turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
                lastMove: [oppMove.from, oppMove.to],
                check: this.chess.inCheck() ? (this.chess.turn() === 'w' ? 'white' : 'black') : undefined,
              });
              this._refreshDests();
              ch.ui.statusEl.innerHTML = `<span class="muted">Opponent: ${escapeHtml(oppMove.san)} — your move.</span>`;
            }
          }, 600);
        }
      }
    } else {
      // Wrong
      ch.attempts++;
      this.chess.undo();
      this.cg.set({ fen: this.chess.fen(), turnColor: this.chess.turn() === 'w' ? 'white' : 'black' });
      this._refreshDests();
      this._flashSquare(dest, 'bad');
      const hint = ch.kind === 'your-move' ? (ch.beat.wrongHint || 'Not quite. Try again.') : 'Not quite. Try again.';
      this._showMoveTip(`✗ ${hint}`, [orig, dest], 'lp-bad');
      if (ch.kind === 'your-move' && ch.ui?.statusEl) {
        ch.ui.statusEl.innerHTML = `<span class="lp-bad">${escapeHtml(move.san)} isn't right. Try again.</span>`;
      } else if (ch.kind === 'puzzle' && ch.ui?.statusEl) {
        ch.ui.statusEl.innerHTML = `<span class="lp-bad">${escapeHtml(move.san)} isn't right. Try again.</span>`;
      }
    }
  }

  _onSquareClick(square) {
    // "Why?" tap — if a previously-played move's destination matches this square,
    // re-show that move's explanation as a callout.
    const ply = Array.from(this.lastMoveExplain.entries()).reverse()
      .find(([, v]) => v.square === square);
    if (ply) {
      this._addCallout(square, ply[1].explain, 'blue', 4000);
    }
  }

  // ── Chessground destination map ───────────────────────────────────────────
  _refreshDests() {
    const dests = new Map();
    for (const sq of this._allSquares()) {
      const moves = this.chess.moves({ square: sq, verbose: true });
      if (moves.length) dests.set(sq, moves.map(m => m.to));
    }
    this.cg.set({
      movable: { dests, color: this.chess.turn() === 'w' ? 'white' : 'black' },
      turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
    });
  }
  _allSquares() {
    const arr = [];
    for (const f of 'abcdefgh') for (let r = 1; r <= 8; r++) arr.push(f + r);
    return arr;
  }

  // ── Shapes (arrows + highlights via chessground) ──────────────────────────
  _addShape(shape) {
    this.activeShapes.push(shape);
    this.cg.setShapes(this.activeShapes);
  }
  _clearShapes() {
    this.activeShapes = [];
    this.cg.setShapes([]);
  }

  // ── Callouts ──────────────────────────────────────────────────────────────
  _addCallout(square, text, color = 'yellow', durationMs = null) {
    const rect = this._squareRect(square);
    if (!rect) return;
    const callout = document.createElement('div');
    callout.className = `lp-callout lp-callout-${color}`;
    callout.innerHTML = `<div class="lp-callout-arrow"></div><div class="lp-callout-body">${escapeHtml(text)}</div>`;
    this.overlay.appendChild(callout);
    // Position above the square if the square is in the bottom half, else below.
    const overlayRect = this.overlay.getBoundingClientRect();
    const sqCenterY = rect.top + rect.height / 2;
    const sqCenterX = rect.left + rect.width / 2;
    const above = sqCenterY > overlayRect.top + overlayRect.height / 2;
    callout.classList.add(above ? 'lp-callout-above' : 'lp-callout-below');
    callout.style.left = (sqCenterX - overlayRect.left) + 'px';
    callout.style.top = ((above ? rect.top - overlayRect.top - 8 : rect.bottom - overlayRect.top + 8)) + 'px';
    const entry = { el: callout, square };
    this.activeCallouts.push(entry);
    if (durationMs && durationMs > 0) {
      setTimeout(() => this._removeCallout(entry), durationMs);
    }
  }
  _removeCallout(entry) {
    if (entry.el.parentElement) entry.el.remove();
    const i = this.activeCallouts.indexOf(entry);
    if (i >= 0) this.activeCallouts.splice(i, 1);
  }
  _clearCallouts() {
    for (const c of this.activeCallouts) {
      if (c.el.parentElement) c.el.remove();
    }
    this.activeCallouts = [];
  }
  _squareRect(square) {
    // chessground exposes the board element via cg.state.dom.elements.board OR
    // we can walk the DOM. The .cg-wrap > cg-container > cg-board hierarchy.
    const boardEl = this.cgWrap.querySelector('cg-board');
    if (!boardEl) return null;
    const rect = boardEl.getBoundingClientRect();
    const sz = rect.width / 8;
    const file = square.charCodeAt(0) - 97;
    const rank = parseInt(square[1], 10) - 1;
    const orient = this.cg.state.orientation;
    const x = (orient === 'white' ? file : 7 - file) * sz;
    const y = (orient === 'white' ? 7 - rank : rank) * sz;
    return { left: rect.left + x, top: rect.top + y, width: sz, height: sz, right: rect.left + x + sz, bottom: rect.top + y + sz };
  }

  _showMoveTip(text, _highlightSquares, cls = 'lp-info') {
    this.moveTip.className = `lp-move-tip ${cls}`;
    this.moveTip.textContent = text;
    this.moveTip.hidden = false;
  }

  _flashSquare(square, kind) {
    // Use chessground's auto-shapes for a quick green/red ring
    const brush = kind === 'good' ? 'green' : 'red';
    const flash = { orig: square, brush };
    this.cg.setAutoShapes([flash]);
    setTimeout(() => this.cg.setAutoShapes([]), 600);
  }

  // ── Transport controls ────────────────────────────────────────────────────
  _setPlayIcon(kind) {
    const btn = this.transport.querySelector('.lp-play');
    if (!btn) return;
    // Swap the Phosphor icon class. Fallback span stays so the button has
    // *something* visible if Phosphor hasn't loaded yet.
    const icon = btn.querySelector('i.ph');
    if (icon) {
      icon.classList.remove('ph-play', 'ph-pause');
      icon.classList.add(kind === 'pause' ? 'ph-pause' : 'ph-play');
    }
    const fallback = btn.querySelector('.visually-hidden');
    if (fallback) fallback.textContent = kind === 'pause' ? '⏸' : '▶';
    btn.setAttribute('aria-label', kind === 'pause' ? 'Pause' : 'Play');
  }
  play() {
    if (this.activeChallenge) return;          // can't auto-play during a challenge
    this.playing = true;
    this._setPlayIcon('pause');
    this._scheduleNextRender(0);
  }
  pause() {
    this.playing = false;
    clearTimeout(this.autoTimer);
    this._setPlayIcon('play');
  }
  toggle() { this.playing ? this.pause() : this.play(); }

  stepForward() {
    if (this.activeChallenge) return;
    this.pause();
    if (this.cursor < this.script.length) {
      this._executeNextBeat();
    }
  }

  stepBack() {
    if (this.activeChallenge) return;
    this.pause();
    // Rewind by replaying the script from the start to (cursor - 1).
    // Cheap and correct — script is the source of truth.
    const target = Math.max(0, this.cursor - 1);
    this._rewindTo(target);
  }

  restart() {
    this.pause();
    this._rewindTo(0);
  }

  flip() {
    this.cg.toggleOrientation();
  }

  _rewindTo(target) {
    this.cursor = 0;
    this.activeShapes = [];
    this.activeChallenge = null;
    this.cg.setShapes([]);
    this._clearCallouts();
    this.moveTip.hidden = true;
    this.chess.load(this.startFen);
    this.cg.set({
      fen: this.chess.fen(),
      orientation: this.lesson.orientation || 'white',
      lastMove: undefined,
      check: undefined,
    });
    this._refreshDests();
    // Hide all text cards
    this.stream.querySelectorAll('.lp-text-card').forEach(c => c.classList.remove('lp-revealed'));
    // Re-execute beats up to `target`
    for (let i = 0; i < target; i++) {
      const beat = this.script[i];
      this._executeBeatSync(beat);
      this.cursor++;
    }
    this._updateProgress();
  }

  _executeBeatSync(beat) {
    // Synchronous version used during rewind (no async waits)
    switch (beat.kind) {
      case 'text': {
        const card = this.stream.querySelector(`[data-beat-index="${this.cursor}"]`);
        if (card) card.classList.add('lp-revealed');
        return;
      }
      case 'set-position':
        this.chess.load(beat.fen);
        this.cg.set({ fen: beat.fen, orientation: beat.orientation || this.cg.state.orientation });
        this._refreshDests();
        this.activeShapes = [];
        this.cg.setShapes([]);
        return;
      case 'play-move': {
        const move = this.chess.move(beat.san);
        if (move) {
          this.cg.set({
            fen: this.chess.fen(),
            turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
            lastMove: [move.from, move.to],
          });
          this._refreshDests();
        }
        return;
      }
      case 'arrow':
        this._addShape({
          orig: beat.from, dest: beat.to,
          brush: COLOR_MAP[beat.color] || 'green',
        });
        return;
      case 'highlight':
        for (const sq of (beat.squares || [])) {
          this._addShape({ orig: sq, brush: COLOR_MAP[beat.color] || 'green' });
        }
        return;
      case 'clear-shapes':
        this.activeShapes = [];
        this.cg.setShapes([]);
        return;
      case 'callout':
      case 'pause':
      case 'your-move':
      case 'puzzle':
      default:
        return;
    }
  }

  // ── Completion section ────────────────────────────────────────────────────
  _renderCompletion() {
    const cpsNeeded = this.your_move_total;
    const pzsNeeded = Math.min(3, this.puzzle_total);
    const cpsMet = this.your_move_solved >= cpsNeeded;
    const pzsMet = this.puzzle_solved >= pzsNeeded;
    const ready = cpsMet && pzsMet;
    const isDone = storage.isLessonComplete(this.lesson.id);
    this.completionEl.innerHTML = `
      <h2>Mark complete</h2>
      <div class="lp-criteria">
        <div class="lp-criterion ${cpsMet ? 'met' : ''}"><span class="dot"></span> Your-move checkpoints solved: ${this.your_move_solved} / ${cpsNeeded}</div>
        <div class="lp-criterion ${pzsMet ? 'met' : ''}"><span class="dot"></span> Puzzles solved: ${this.puzzle_solved} / ${pzsNeeded} (of ${this.puzzle_total})</div>
      </div>
      <button class="lp-mark-btn lesson-mark-complete btn btn--primary" ${ready ? '' : 'disabled'}>
        ${isDone ? '✓ Already complete — mark again' : (ready ? 'Mark complete ✓' : 'Solve the requirements above to unlock')}
      </button>
      ${this.lesson.next ? `<button class="lp-next-btn btn btn--secondary">Next lesson →</button>` : ''}
    `;
    const markBtn = this.completionEl.querySelector('.lp-mark-btn');
    if (markBtn) markBtn.addEventListener('click', () => {
      storage.markLessonComplete(this.lesson.id, this.lesson.title);
      markBtn.textContent = '✓ Saved';
      this.onComplete();
    });
    if (this.lesson.next) {
      this.completionEl.querySelector('.lp-next-btn').addEventListener('click', () => {
        location.hash = 'lessons/' + this.lesson.next;
      });
    }
  }
}
