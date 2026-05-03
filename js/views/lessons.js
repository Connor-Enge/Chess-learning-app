import { storage } from '../storage.js';
import { loadAllLessons, loadLesson } from '../content-loader.js';
import { Board } from '../board.js';
import { newChess, legalMovesFrom, isInCheck, kingSquare, fensForSanList } from '../chess-utils.js';

export async function renderLessons(view, params, opts = {}) {
  const tpl = document.getElementById('tpl-lessons');
  view.appendChild(tpl.content.cloneNode(true));

  const lessons = await loadAllLessons();
  const indexEl = view.querySelector('#lessonIndex');
  const filterEl = view.querySelector('#lessonTrackFilter');
  const contentEl = view.querySelector('#lessonContent');

  // Ensure the dropdown has all tracks (including the addendum "exchanges" track)
  if (filterEl && ![...filterEl.options].some(o => o.value === 'exchanges')) {
    const opt = document.createElement('option');
    opt.value = 'exchanges';
    opt.textContent = 'Exchanges & Piece Values';
    filterEl.appendChild(opt);
  }
  if (opts.trackFilter && filterEl) filterEl.value = opts.trackFilter;

  // Mobile: collapsible lesson list. Show/hide on toggle. Default open (visible).
  const listPanel = view.querySelector('#lessonListPanel');
  const listToggle = view.querySelector('#lessonListToggle');
  function updateListVisibility(forceShow) {
    if (!listPanel) return;
    if (forceShow !== undefined) listPanel.dataset.collapsed = forceShow ? 'false' : 'true';
    listPanel.style.display = listPanel.dataset.collapsed === 'true' ? 'none' : '';
  }
  if (listToggle) listToggle.addEventListener('click', () => {
    listPanel.dataset.collapsed = listPanel.dataset.collapsed === 'true' ? 'false' : 'true';
    updateListVisibility();
  });

  function renderIndex() {
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

  filterEl.addEventListener('change', renderIndex);
  renderIndex();

  async function showLesson(id) {
    const lesson = await loadLesson(id);
    if (!lesson) {
      contentEl.innerHTML = `<p class="muted">Lesson "${escapeHtml(id)}" not found.</p>`;
      return;
    }
    indexEl.querySelectorAll('li').forEach(li => li.classList.toggle('active', li.dataset.id === id));
    contentEl.innerHTML = '';
    renderLessonContent(contentEl, lesson);
    // On mobile, collapse the list when a lesson opens — content needs the screen
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) updateListVisibility(false);
  }

  if (params && params[0]) {
    showLesson(params[0]);
  } else if (lessons[0]) {
    showLesson(lessons[0].id);
  }

  // Re-route on internal hash changes within lesson view
  window.addEventListener('hashchange', () => {
    const h = location.hash.replace(/^#/, '').split('/');
    if (h[0] === 'lessons' && h[1]) showLesson(h[1]);
  }, { once: true });
}

function renderLessonContent(container, lesson) {
  const head = document.createElement('div');
  head.innerHTML = `
    <h1>${escapeHtml(lesson.title)}</h1>
    <p class="muted">Track: ${lesson.track} · Estimated: ${lesson.estimatedMinutes || '—'} min · Objective: ${escapeHtml(lesson.objective || '')}</p>
  `;
  container.appendChild(head);

  for (const block of lesson.content) {
    container.appendChild(renderBlock(block));
  }

  // Quizzes
  if (lesson.quiz && lesson.quiz.length) {
    const quizSection = document.createElement('div');
    quizSection.innerHTML = '<h2>Check your understanding</h2>';
    for (const q of lesson.quiz) quizSection.appendChild(renderQuiz(q));
    container.appendChild(quizSection);
  }

  // Further reading
  if (lesson.further && lesson.further.length) {
    const fr = document.createElement('div');
    fr.innerHTML = `<h3>Further reading</h3><ul>${lesson.further.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`;
    container.appendChild(fr);
  }

  // Mark complete button
  const actions = document.createElement('div');
  actions.className = 'lesson-actions';
  const isDone = storage.isLessonComplete(lesson.id);
  actions.innerHTML = `
    <button id="markCompleteBtn">${isDone ? '✓ Completed — mark again' : 'Mark complete'}</button>
    ${lesson.next ? `<button id="nextLessonBtn">Next lesson →</button>` : ''}
  `;
  actions.querySelector('#markCompleteBtn').addEventListener('click', () => {
    storage.markLessonComplete(lesson.id, lesson.title);
    actions.querySelector('#markCompleteBtn').textContent = '✓ Saved';
    setTimeout(() => location.reload(), 600);
  });
  if (lesson.next) {
    actions.querySelector('#nextLessonBtn').addEventListener('click', () => {
      location.hash = `lessons/${lesson.next}`;
    });
  }
  container.appendChild(actions);
}

function renderBlock(block) {
  if (block.type === 'text') {
    const div = document.createElement('div');
    div.innerHTML = mdToHtml(block.value);
    return div;
  }
  if (block.type === 'heading') {
    const h = document.createElement('h2');
    h.textContent = block.value;
    return h;
  }
  if (block.type === 'subheading') {
    const h = document.createElement('h3');
    h.textContent = block.value;
    return h;
  }
  if (block.type === 'quote') {
    const q = document.createElement('blockquote');
    q.innerHTML = mdToHtml(block.value);
    return q;
  }
  if (block.type === 'board') {
    return renderBoardBlock(block);
  }
  if (block.type === 'pgn') {
    return renderPgnBlock(block);
  }
  if (block.type === 'interactive') {
    return renderInteractiveBlock(block);
  }
  const fallback = document.createElement('div');
  fallback.textContent = JSON.stringify(block);
  return fallback;
}

function renderBoardBlock(block) {
  // Static position with optional caption
  const wrap = document.createElement('div');
  wrap.className = 'lesson-board-block';
  const boardSide = document.createElement('div');
  boardSide.className = 'board-side';
  const boardEl = document.createElement('div');
  boardEl.className = 'board';
  boardSide.appendChild(boardEl);
  wrap.appendChild(boardSide);

  const note = document.createElement('div');
  if (block.caption) note.innerHTML = mdToHtml(block.caption);
  wrap.appendChild(note);

  const board = new Board(boardEl, {
    orientation: block.orientation || 'white',
    draggable: false,
    getLegalMoves: () => [],
  });
  board.setFen(block.fen);
  if (block.from && block.to) board.setHighlights({ from: block.from, to: block.to });
  return wrap;
}

function renderPgnBlock(block) {
  // PGN player with prev/next
  const wrap = document.createElement('div');
  wrap.className = 'lesson-board-block';
  const boardSide = document.createElement('div');
  boardSide.className = 'board-side';
  const boardEl = document.createElement('div');
  boardEl.className = 'board';
  boardSide.appendChild(boardEl);

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = `
    <button class="prev">‹</button>
    <button class="next">›</button>
    <button class="flip">Flip</button>
    <button class="restart">⏮</button>
    <button class="end">⏭</button>
  `;
  boardSide.appendChild(controls);

  const annotation = document.createElement('div');
  annotation.className = 'annotation';
  boardSide.appendChild(annotation);

  wrap.appendChild(boardSide);

  const moveList = document.createElement('div');
  moveList.className = 'move-list';
  wrap.appendChild(moveList);

  const startFen = block.startFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const { fens, plies } = fensForSanList(startFen, block.pgn);
  const annotations = block.annotations || {}; // { plyIndex: "comment" }
  let idx = 0;

  const board = new Board(boardEl, {
    orientation: block.orientation || 'white',
    draggable: false,
  });

  function update() {
    board.setFen(fens[idx]);
    if (idx > 0) {
      // try to highlight last move
      const c = newChess(fens[idx - 1]);
      try {
        const mv = c.move(plies[idx - 1]);
        if (mv) board.setHighlights({ from: mv.from, to: mv.to });
      } catch (e) {}
    } else {
      board.clearHighlights();
    }
    annotation.innerHTML = annotations[idx] ? mdToHtml(annotations[idx]) : '<span class="muted">—</span>';
    moveList.innerHTML = renderMoveList(plies, idx, annotations);
    moveList.querySelectorAll('.ply').forEach(el => {
      el.addEventListener('click', () => { idx = parseInt(el.dataset.idx, 10) + 1; update(); });
    });
  }

  controls.querySelector('.prev').addEventListener('click', () => { if (idx > 0) { idx--; update(); } });
  controls.querySelector('.next').addEventListener('click', () => { if (idx < fens.length - 1) { idx++; update(); } });
  controls.querySelector('.flip').addEventListener('click', () => board.flip());
  controls.querySelector('.restart').addEventListener('click', () => { idx = 0; update(); });
  controls.querySelector('.end').addEventListener('click', () => { idx = fens.length - 1; update(); });

  // keyboard shortcuts
  wrap.tabIndex = 0;
  wrap.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && idx > 0) { idx--; update(); }
    if (e.key === 'ArrowRight' && idx < fens.length - 1) { idx++; update(); }
  });

  update();
  return wrap;
}

function renderMoveList(plies, currentIdx, annotations = {}) {
  let html = '';
  for (let i = 0; i < plies.length; i++) {
    if (i % 2 === 0) html += `<span class="move-num">${(i / 2) + 1}.</span> `;
    const cls = ['ply'];
    if (i === currentIdx - 1) cls.push('current');
    if (annotations[i + 1]) cls.push('has-comment');
    html += `<span class="${cls.join(' ')}" data-idx="${i}">${plies[i]}</span> `;
    if (i % 2 === 1) html += '<br/>';
  }
  return html;
}

function renderInteractiveBlock(block) {
  // "Your move" — student must find the right move from a position
  const wrap = document.createElement('div');
  wrap.className = 'lesson-board-block';
  const boardSide = document.createElement('div');
  boardSide.className = 'board-side';
  const boardEl = document.createElement('div');
  boardEl.className = 'board';
  boardSide.appendChild(boardEl);

  const status = document.createElement('div');
  status.className = 'annotation';
  status.innerHTML = `<strong>Your move.</strong> ${escapeHtml(block.prompt || 'Find the best move.')}`;
  boardSide.appendChild(status);

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = `<button class="hint">Hint</button><button class="reveal">Show solution</button><button class="reset">Reset</button>`;
  boardSide.appendChild(controls);

  wrap.appendChild(boardSide);

  const explanation = document.createElement('div');
  explanation.innerHTML = block.explanation ? mdToHtml(block.explanation) : '';
  explanation.style.display = 'none';
  wrap.appendChild(explanation);

  const chess = newChess(block.fen);
  const expectedSan = block.solution; // single SAN move expected

  const board = new Board(boardEl, {
    orientation: block.orientation || (chess.turn() === 'w' ? 'white' : 'black'),
    draggable: true,
    getLegalMoves: (sq) => legalMovesFrom(chess, sq),
    getTurn: () => chess.turn(),
    onMove: (from, to, promo) => {
      let move;
      try { move = chess.move({ from, to, promotion: promo || 'q' }); } catch (e) { return false; }
      if (!move) return false;
      if (move.san === expectedSan) {
        status.innerHTML = `<span style="color:var(--good)">✓ Correct! ${escapeHtml(move.san)}</span>`;
        explanation.style.display = '';
      } else {
        status.innerHTML = `<span style="color:var(--bad)">${escapeHtml(move.san)} isn't the move. Try again.</span>`;
        // undo
        chess.undo();
        board.setFen(chess.fen());
        return false;
      }
      board.setFen(chess.fen());
      board.setHighlights({ from: move.from, to: move.to });
      return true;
    },
  });
  board.setFen(chess.fen());
  if (isInCheck(chess)) board.setHighlights({ check: kingSquare(chess, chess.turn()) });

  controls.querySelector('.hint').addEventListener('click', () => {
    if (!expectedSan) return;
    // show first letter / piece type hint
    const piece = expectedSan[0];
    status.innerHTML = `<em class="muted">Hint: the move starts with "${escapeHtml(piece)}"…</em>`;
  });
  controls.querySelector('.reveal').addEventListener('click', () => {
    status.innerHTML = `<strong>Solution: ${escapeHtml(expectedSan)}</strong>`;
    explanation.style.display = '';
  });
  controls.querySelector('.reset').addEventListener('click', () => {
    chess.load(block.fen);
    board.setFen(chess.fen());
    board.clearHighlights();
    status.innerHTML = `<strong>Your move.</strong> ${escapeHtml(block.prompt || '')}`;
    explanation.style.display = 'none';
  });

  return wrap;
}

function renderQuiz(q) {
  const wrap = document.createElement('div');
  wrap.className = 'lesson-quiz';
  wrap.innerHTML = `<div class="quiz-q">${escapeHtml(q.question)}</div>`;
  const opts = document.createElement('div');
  opts.className = 'quiz-options';
  for (let i = 0; i < q.options.length; i++) {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = q.options[i];
    btn.addEventListener('click', () => {
      opts.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
      if (i === q.answer) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
        opts.querySelectorAll('.quiz-option')[q.answer].classList.add('correct');
      }
      const fb = document.createElement('div');
      fb.className = 'quiz-feedback';
      fb.textContent = q.explanation || '';
      wrap.appendChild(fb);
    });
    opts.appendChild(btn);
  }
  wrap.appendChild(opts);
  return wrap;
}

// Tiny markdown→HTML converter (paragraphs, **bold**, *em*, `code`, bullet lists, links)
export function mdToHtml(md) {
  if (!md) return '';
  // escape HTML
  let s = md.replace(/[&<>]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[c]));
  // code spans
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // bold + em
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  // links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // bullet lists (lines starting with - )
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

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
