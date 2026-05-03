import { storage } from '../storage.js';
import { OPENINGS, OPENING_TREE } from '../data/openings.js';
import { Board } from '../board.js';
import { fensForSanList, newChess } from '../chess-utils.js';
import { mdToHtml } from './lessons.js';

export async function renderOpenings(view, params) {
  const tpl = document.getElementById('tpl-openings');
  view.appendChild(tpl.content.cloneNode(true));

  const treeEl = view.querySelector('#openingTree');
  const contentEl = view.querySelector('#openingContent');

  // Build tree
  treeEl.innerHTML = renderTree(OPENING_TREE);
  treeEl.querySelectorAll('.opening-leaf').forEach(el => {
    el.addEventListener('click', () => { location.hash = `openings/${el.dataset.id}`; });
  });

  // Mobile: collapsible tree
  const toggle = view.querySelector('#openingTreeToggle');
  function setTreeVisible(visible) {
    treeEl.style.display = visible ? '' : 'none';
  }
  if (toggle) toggle.addEventListener('click', () => {
    const isHidden = treeEl.style.display === 'none';
    setTreeVisible(isHidden);
  });

  function show(id) {
    const op = OPENINGS.find(o => o.id === id);
    if (!op) {
      contentEl.innerHTML = `<p class="muted">Opening "${id}" not found.</p>`;
      return;
    }
    treeEl.querySelectorAll('.opening-leaf').forEach(el => el.classList.toggle('active', el.dataset.id === id));
    storage.markOpeningExplored(op.id, op.name);
    contentEl.innerHTML = '';
    contentEl.appendChild(renderOpening(op));
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) setTreeVisible(false);
  }

  if (params && params[0]) show(params[0]);
  else show(OPENINGS[0].id);

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace(/^#/, '').split('/');
    if (h[0] === 'openings' && h[1]) show(h[1]);
  }, { once: true });
}

function renderTree(tree, depth = 0) {
  // tree: { groupName: [ ...items ] }   item: { id, name, sub?: tree }
  let html = '';
  for (const group of tree) {
    if (group.children) {
      html += `<details ${depth === 0 ? 'open' : ''}><summary>${escapeHtml(group.name)}</summary>${renderTree(group.children, depth + 1)}</details>`;
    } else {
      html += `<div class="opening-leaf" data-id="${escapeHtml(group.id)}">${escapeHtml(group.name)}</div>`;
    }
  }
  return html;
}

function renderOpening(op) {
  const wrap = document.createElement('div');

  const header = document.createElement('div');
  header.innerHTML = `
    <h1>${escapeHtml(op.name)}</h1>
    <div class="opening-meta">
      ${op.eco ? `<span>ECO: ${escapeHtml(op.eco)}</span>` : ''}
      ${op.firstPlayer ? `<span>Played by: ${escapeHtml(op.firstPlayer)}</span>` : ''}
      ${op.style ? `<span>Style: ${escapeHtml(op.style)}</span>` : ''}
    </div>
    <div class="moves">${escapeHtml(op.mainLine)}</div>
  `;
  wrap.appendChild(header);

  // Board with move stepper for the main line
  const board = renderOpeningBoard(op);
  wrap.appendChild(board);

  // Plans
  const plans = document.createElement('div');
  plans.className = 'plans';
  plans.innerHTML = `
    <div class="plan-card"><h4>Plans for White</h4>${mdToHtml(op.whitePlans || '—')}</div>
    <div class="plan-card"><h4>Plans for Black</h4>${mdToHtml(op.blackPlans || '—')}</div>
  `;
  wrap.appendChild(plans);

  // Pawn structure
  if (op.structure) {
    const struct = document.createElement('div');
    struct.innerHTML = `<h3>Typical pawn structure</h3>${mdToHtml(op.structure)}`;
    wrap.appendChild(struct);
  }

  // Variations
  if (op.variations && op.variations.length) {
    const v = document.createElement('div');
    v.className = 'opening-variations';
    v.innerHTML = `<h3>Key variations</h3>`;
    for (const sub of op.variations) {
      const det = document.createElement('details');
      det.innerHTML = `<summary>${escapeHtml(sub.name)}</summary><div class="moves">${escapeHtml(sub.line)}</div>${sub.note ? mdToHtml(sub.note) : ''}`;
      v.appendChild(det);
    }
    wrap.appendChild(v);
  }

  // Traps
  if (op.traps && op.traps.length) {
    const t = document.createElement('div');
    t.innerHTML = `<h3>Common traps</h3><ul>${op.traps.map(tr => `<li><strong>${escapeHtml(tr.name)}:</strong> <code>${escapeHtml(tr.line)}</code> — ${escapeHtml(tr.note || '')}</li>`).join('')}</ul>`;
    wrap.appendChild(t);
  }

  // Model games
  if (op.modelGames && op.modelGames.length) {
    const g = document.createElement('div');
    g.innerHTML = `<h3>Model games</h3><ul>${op.modelGames.map(mg => `<li>${escapeHtml(mg)}</li>`).join('')}</ul>`;
    wrap.appendChild(g);
  }

  return wrap;
}

function renderOpeningBoard(op) {
  const wrap = document.createElement('div');
  wrap.className = 'opening-board-wrap';
  const left = document.createElement('div');
  const boardEl = document.createElement('div');
  boardEl.className = 'board';
  left.appendChild(boardEl);

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.style.marginTop = '8px';
  controls.style.display = 'flex';
  controls.style.gap = '6px';
  controls.innerHTML = `<button class="prev">‹ Prev</button><button class="next">Next ›</button><button class="flip">Flip</button><button class="reset">⏮</button>`;
  left.appendChild(controls);
  wrap.appendChild(left);

  const right = document.createElement('div');
  right.style.fontSize = '13px';
  right.innerHTML = `<h4>Main line</h4>`;
  const moveListEl = document.createElement('div');
  moveListEl.style.fontFamily = 'ui-monospace, monospace';
  right.appendChild(moveListEl);
  wrap.appendChild(right);

  const { fens, plies } = fensForSanList(undefined, op.mainLine);
  let idx = 0;
  const board = new Board(boardEl, { draggable: false });

  function update() {
    board.setFen(fens[idx]);
    if (idx > 0) {
      const c = newChess(fens[idx - 1]);
      try {
        const mv = c.move(plies[idx - 1]);
        if (mv) board.setHighlights({ from: mv.from, to: mv.to });
      } catch (e) {}
    } else { board.clearHighlights(); }
    moveListEl.innerHTML = '';
    for (let i = 0; i < plies.length; i++) {
      if (i % 2 === 0) moveListEl.innerHTML += `<span class="muted">${(i / 2) + 1}.</span> `;
      const cls = ['ply'];
      if (i === idx - 1) cls.push('current');
      moveListEl.innerHTML += `<span class="${cls.join(' ')}" style="cursor:pointer; padding:1px 3px; ${i === idx - 1 ? 'background:var(--accent); color:white;' : ''}" data-i="${i}">${plies[i]}</span> `;
    }
    moveListEl.querySelectorAll('.ply').forEach(el => el.addEventListener('click', () => { idx = parseInt(el.dataset.i, 10) + 1; update(); }));
  }

  controls.querySelector('.prev').addEventListener('click', () => { if (idx > 0) { idx--; update(); } });
  controls.querySelector('.next').addEventListener('click', () => { if (idx < fens.length - 1) { idx++; update(); } });
  controls.querySelector('.flip').addEventListener('click', () => board.flip());
  controls.querySelector('.reset').addEventListener('click', () => { idx = 0; update(); });
  update();

  return wrap;
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
