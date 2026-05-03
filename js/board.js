// Custom chessboard widget — vanilla JS, no external deps.
// Supports tap-to-move (primary on mobile), drag-to-move (pointer events; works
// for mouse and touch), programmatic position-set, last-move highlights,
// check indicators, square flash feedback, programmatic move animation, and
// arrow overlays.

const PIECE_GLYPHS = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

export class Board {
  /**
   * @param {HTMLElement} container - element with class "board"
   * @param {object} opts
   *   - orientation: 'white' | 'black'
   *   - draggable: boolean (default true)
   *   - showCoords: boolean (default true)
   *   - onMove(from, to, promotion) -> bool|Promise<bool>; return false to cancel
   *   - getLegalMoves(square) -> [{to, flags, promotion?}] (used for move-dot hints)
   *   - getTurn() -> 'w'|'b' (filters which pieces can be picked up)
   */
  constructor(container, opts = {}) {
    this.container = container;
    this.orientation = opts.orientation || 'white';
    this.draggable = opts.draggable !== false;
    this.showCoords = opts.showCoords !== false;
    this.onMove = opts.onMove || (() => true);
    this.getLegalMoves = opts.getLegalMoves || (() => []);
    this.getTurn = opts.getTurn || (() => null);
    this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.selected = null;
    this.highlights = { from: null, to: null, check: null };
    this.flashes = new Map();        // square → 'good' | 'bad' (transient)
    this.movesForSelected = [];
    this._dragState = null;
    this._render();
    this._attach();
  }

  _attach() {
    // Click-to-select-then-tap-destination
    this.container.addEventListener('click', this._onClick.bind(this));
    // Pointer-based drag (covers mouse + touch on modern browsers)
    this.container.addEventListener('pointerdown', this._onPointerDown.bind(this));
    // Prevent context menu / long-press selection on mobile
    this.container.addEventListener('contextmenu', e => e.preventDefault());
  }

  setFen(fen) {
    if (this.fen === fen) return;
    this.fen = fen;
    this.selected = null;
    this.movesForSelected = [];
    this._render();
  }

  setOrientation(o) { this.orientation = o; this._render(); }
  flip() { this.orientation = this.orientation === 'white' ? 'black' : 'white'; this._render(); }

  setHighlights({ from, to, check } = {}) {
    if (from !== undefined) this.highlights.from = from;
    if (to !== undefined) this.highlights.to = to;
    if (check !== undefined) this.highlights.check = check;
    this._render();
  }
  clearHighlights() { this.highlights = { from: null, to: null, check: null }; this._render(); }

  /**
   * Visually flash a square green or red for ~600ms — used for
   * "Correct!" / "Try again" feedback in lesson checkpoints and puzzles.
   */
  flash(square, kind = 'good') {
    this.flashes.set(square, kind);
    this._render();
    setTimeout(() => {
      this.flashes.delete(square);
      this._render();
    }, 600);
  }

  _squares() {
    const files = ['a','b','c','d','e','f','g','h'];
    const ranks = ['8','7','6','5','4','3','2','1'];
    const out = [];
    const fileOrder = this.orientation === 'white' ? files : [...files].reverse();
    const rankOrder = this.orientation === 'white' ? ranks : [...ranks].reverse();
    for (const r of rankOrder) for (const f of fileOrder) out.push(f + r);
    return out;
  }

  _parseFen() {
    const placement = this.fen.split(' ')[0];
    const rows = placement.split('/');
    const pos = {};
    rows.forEach((row, ri) => {
      let file = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) { file += parseInt(ch, 10); continue; }
        const color = ch === ch.toUpperCase() ? 'w' : 'b';
        const piece = ch.toUpperCase();
        const square = 'abcdefgh'[file] + (8 - ri);
        pos[square] = color + piece;
        file++;
      }
    });
    return pos;
  }

  _render() {
    const pos = this._parseFen();
    const squares = this._squares();
    this.container.innerHTML = '';
    const movesTo = new Set(this.movesForSelected.map(m => m.to));

    for (const sq of squares) {
      const div = document.createElement('div');
      const isDark = ((sq.charCodeAt(0) - 97) + parseInt(sq[1], 10)) % 2 === 0;
      div.className = 'sq ' + (isDark ? 'dark' : 'light');
      div.dataset.square = sq;

      if (this.highlights.from === sq) div.classList.add('from');
      if (this.highlights.to === sq) div.classList.add('to');
      if (this.highlights.check === sq) div.classList.add('check');
      if (this.selected === sq) div.classList.add('selected');
      if (this.flashes.has(sq)) div.classList.add('flash-' + this.flashes.get(sq));

      const piece = pos[sq];
      if (piece) {
        div.classList.add('has-piece');
        const span = document.createElement('span');
        span.className = 'piece ' + piece[0];
        span.textContent = PIECE_GLYPHS[piece];
        div.appendChild(span);
      }
      if (movesTo.has(sq)) {
        const dot = document.createElement('div');
        dot.className = 'move-dot';
        div.appendChild(dot);
      }
      if (this.showCoords) this._renderCoord(div, sq);
      this.container.appendChild(div);
    }
  }

  _renderCoord(div, sq) {
    const file = sq[0], rank = sq[1];
    const lastRank = this.orientation === 'white' ? '1' : '8';
    const firstFile = this.orientation === 'white' ? 'a' : 'h';
    if (rank === lastRank) {
      const c = document.createElement('span');
      c.className = 'coord file';
      c.textContent = file;
      div.appendChild(c);
    }
    if (file === firstFile) {
      const c = document.createElement('span');
      c.className = 'coord rank';
      c.textContent = rank;
      div.appendChild(c);
    }
  }

  // ── Tap-to-move flow ─────────────────────────────────────────────────────
  _onClick(e) {
    if (this._dragState && this._dragState.dragged) return; // drag handled it
    const sqEl = e.target.closest('.sq');
    if (!sqEl) return;
    const sq = sqEl.dataset.square;

    if (this.selected && this.movesForSelected.some(m => m.to === sq)) {
      const move = this.movesForSelected.find(m => m.to === sq);
      this._tryMove(this.selected, sq, move.promotion);
      return;
    }

    const pos = this._parseFen();
    const piece = pos[sq];
    if (piece) {
      const turn = this.getTurn();
      if (turn && piece[0] !== turn) {
        this.selected = null;
        this.movesForSelected = [];
        this._render();
        return;
      }
      this.selected = sq;
      this.movesForSelected = (this.getLegalMoves(sq) || []);
      this._render();
    } else {
      this.selected = null;
      this.movesForSelected = [];
      this._render();
    }
  }

  // ── Drag-to-move ─────────────────────────────────────────────────────────
  _onPointerDown(e) {
    if (!this.draggable) return;
    if (e.button !== undefined && e.button !== 0) return;   // left-button or touch only
    const sqEl = e.target.closest('.sq');
    if (!sqEl) return;
    const sq = sqEl.dataset.square;
    const pos = this._parseFen();
    const piece = pos[sq];
    if (!piece) return;
    const turn = this.getTurn();
    if (turn && piece[0] !== turn) return;

    // Show legal moves while dragging
    this.selected = sq;
    this.movesForSelected = (this.getLegalMoves(sq) || []);
    this._render();

    this._dragState = {
      from: sq,
      pieceCode: piece,
      dragged: false,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      ghost: null,
    };

    // Capture pointer so we get move/up events even off the board
    try { sqEl.setPointerCapture(e.pointerId); } catch (_) {}

    const onMove = (ev) => this._onPointerMove(ev);
    const onUp = (ev) => {
      this._onPointerUp(ev);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  _onPointerMove(e) {
    const s = this._dragState;
    if (!s) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (!s.dragged && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      s.dragged = true;
      // Build a ghost piece that follows the pointer
      const sqSize = this.container.getBoundingClientRect().width / 8;
      const ghost = document.createElement('div');
      ghost.className = 'piece ' + s.pieceCode[0] + ' dragging';
      ghost.textContent = PIECE_GLYPHS[s.pieceCode];
      ghost.style.fontSize = (sqSize * 0.78) + 'px';
      ghost.style.position = 'fixed';
      ghost.style.pointerEvents = 'none';
      ghost.style.zIndex = '40';
      ghost.style.left = (e.clientX - sqSize / 2) + 'px';
      ghost.style.top = (e.clientY - sqSize / 2) + 'px';
      ghost.style.width = sqSize + 'px';
      ghost.style.height = sqSize + 'px';
      ghost.style.display = 'flex';
      ghost.style.alignItems = 'center';
      ghost.style.justifyContent = 'center';
      document.body.appendChild(ghost);
      s.ghost = ghost;
      // Hide the original piece on the source square
      const srcEl = this.container.querySelector(`.sq[data-square="${s.from}"] .piece`);
      if (srcEl) srcEl.style.opacity = '0';
    }
    if (s.ghost) {
      const sqSize = this.container.getBoundingClientRect().width / 8;
      s.ghost.style.left = (e.clientX - sqSize / 2) + 'px';
      s.ghost.style.top = (e.clientY - sqSize / 2) + 'px';
    }
  }

  _onPointerUp(e) {
    const s = this._dragState;
    if (!s) return;
    if (s.ghost) { s.ghost.remove(); s.ghost = null; }
    // Restore source piece visibility
    const srcEl = this.container.querySelector(`.sq[data-square="${s.from}"] .piece`);
    if (srcEl) srcEl.style.opacity = '';

    if (s.dragged) {
      // Find which square the pointer is over
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const sqEl = target && target.closest && target.closest('.sq');
      if (sqEl && sqEl.parentElement === this.container) {
        const to = sqEl.dataset.square;
        const move = this.movesForSelected.find(m => m.to === to);
        if (move) {
          this._tryMove(s.from, to, move.promotion);
        } else {
          // not a legal target — keep selection visible briefly then clear
          this.selected = null;
          this.movesForSelected = [];
          this._render();
        }
      } else {
        this.selected = null;
        this.movesForSelected = [];
        this._render();
      }
      // Suppress the trailing click
      setTimeout(() => { this._dragState = null; }, 50);
    } else {
      // No drag — let click handler do its thing
      this._dragState = null;
    }
  }

  async _tryMove(from, to, promotion) {
    const pos = this._parseFen();
    const piece = pos[from];
    const needsPromo = piece && piece[1] === 'P' && (to[1] === '8' || to[1] === '1');
    if (needsPromo && !promotion) {
      promotion = await this._promptPromotion(piece[0]);
      if (!promotion) {
        this.selected = null;
        this.movesForSelected = [];
        this._render();
        return;
      }
    }
    const result = await this.onMove(from, to, promotion);
    if (result !== false) {
      this.highlights.from = from;
      this.highlights.to = to;
    }
    this.selected = null;
    this.movesForSelected = [];
    this._render();
  }

  _promptPromotion(color) {
    return new Promise(resolve => {
      const modal = document.createElement('div');
      modal.className = 'promotion-modal';
      const pieces = ['q', 'r', 'b', 'n'];
      for (const p of pieces) {
        const btn = document.createElement('button');
        btn.textContent = PIECE_GLYPHS[color + p.toUpperCase()];
        btn.style.color = color === 'w' ? '#fff' : '#000';
        btn.addEventListener('click', () => { document.body.removeChild(modal); resolve(p); });
        modal.appendChild(btn);
      }
      const rect = this.container.getBoundingClientRect();
      modal.style.left = Math.max(8, rect.left + rect.width / 2 - 124) + 'px';
      modal.style.top = (rect.top + rect.height / 2 - 36) + 'px';
      document.body.appendChild(modal);
    });
  }
}
