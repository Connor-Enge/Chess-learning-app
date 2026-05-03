// Custom chessboard widget — vanilla JS, no dependencies on a board library.
// Uses chess.js (already loaded as global Chess) for legality checks if a Chess instance is wired in.

const PIECE_GLYPHS = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

export class Board {
  /**
   * @param {HTMLElement} container - element with class "board"
   * @param {object} opts
   *   - orientation: 'white' | 'black'
   *   - draggable: boolean
   *   - showCoords: boolean
   *   - onMove(from, to, promotion) -> bool|Promise<bool> ; return false to cancel
   *   - getLegalMoves(square) -> array of {to, flags, promotion?}  (optional; if omitted, no highlights)
   *   - getTurn() -> 'w'|'b'  (used to filter draggable pieces)
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
    this.movesForSelected = [];
    this._render();
    this._attach();
  }

  _attach() {
    this.container.addEventListener('click', this._onClick.bind(this));
  }

  setFen(fen) {
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
    const turnColor = this.getTurn();
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

      if (this.showCoords) {
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

      this.container.appendChild(div);
    }
  }

  _onClick(e) {
    const sqEl = e.target.closest('.sq');
    if (!sqEl) return;
    const sq = sqEl.dataset.square;

    // If we have a selected square and this is a destination, attempt move
    if (this.selected && this.movesForSelected.some(m => m.to === sq)) {
      const move = this.movesForSelected.find(m => m.to === sq);
      this._tryMove(this.selected, sq, move.promotion);
      return;
    }

    // Otherwise: maybe select
    const pos = this._parseFen();
    const piece = pos[sq];
    if (piece) {
      const turn = this.getTurn();
      if (turn && piece[0] !== turn) {
        // not our turn for this piece
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

  async _tryMove(from, to, promotion) {
    // If pawn promotion is needed and not specified, prompt
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
      modal.style.left = (rect.left + rect.width / 2 - 100) + 'px';
      modal.style.top = (rect.top + rect.height / 2 - 30) + 'px';
      document.body.appendChild(modal);
    });
  }
}
