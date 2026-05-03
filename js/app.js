// Main app router and bootstrap — mobile-first navigation.
import { storage } from './storage.js';
import { renderDashboard } from './views/dashboard.js';
import { renderLessons } from './views/lessons.js';
import { renderOpenings } from './views/openings.js';
import { renderTactics } from './views/tactics.js';
import { renderEndgames } from './views/endgames.js';
import { renderGames } from './views/games.js';
import { renderPlay } from './views/play.js';
import { initSearch, openSearch, closeSearch } from './search.js';

// Filtered lesson views — wrap renderLessons with a track filter
function renderExchanges(view, params) { return renderLessons(view, params, { trackFilter: 'exchanges' }); }
function renderPositional(view, params) { return renderLessons(view, params, { trackFilter: 'positional' }); }

const ROUTES = {
  dashboard: renderDashboard,
  lessons: renderLessons,
  openings: renderOpenings,
  tactics: renderTactics,
  positional: renderPositional,
  endgames: renderEndgames,
  exchanges: renderExchanges,
  games: renderGames,
  play: renderPlay,
};

const ROUTE_TITLES = {
  dashboard: 'Chess Academy',
  lessons: 'Lessons',
  openings: 'Openings',
  tactics: 'Tactics Trainer',
  positional: 'Positional Play',
  endgames: 'Endgames',
  exchanges: 'Exchanges',
  games: 'Master Games',
  play: 'Play / Analyze',
};

// Which tab in the bottom nav corresponds to each route.
// "more" routes (positional, exchanges, dashboard, games, play) all light up the More tab.
const TAB_FOR_ROUTE = {
  lessons: 'lessons',
  openings: 'openings',
  tactics: 'tactics',
  endgames: 'endgames',
  positional: 'more',
  exchanges: 'more',
  games: 'more',
  play: 'more',
  dashboard: 'more',
};

function parseHash() {
  const h = location.hash.replace(/^#/, '') || 'lessons';
  const [route, ...params] = h.split('/');
  return { route: ROUTES[route] ? route : 'lessons', params };
}

const navHistory = [];

async function navigate() {
  const { route, params } = parseHash();
  const view = document.getElementById('view');
  view.innerHTML = '';

  // Track navigation history for the back button
  const last = navHistory[navHistory.length - 1];
  if (last !== location.hash) navHistory.push(location.hash);
  if (navHistory.length > 30) navHistory.shift();

  // Update bottom nav active state
  const activeTab = TAB_FOR_ROUTE[route] || 'more';
  document.querySelectorAll('.bottom-nav .tab').forEach(b => {
    b.classList.toggle('active', b.dataset.route === activeTab);
  });

  // Update appbar title and back button
  const appbarTitle = document.getElementById('appbarTitle');
  const appbarBack = document.getElementById('appbarBack');
  if (appbarTitle) appbarTitle.textContent = ROUTE_TITLES[route] || 'Chess Academy';
  if (appbarBack) {
    // Show back button when navigating "deeper" (a route with params, or non-primary tab)
    const showBack = params.length > 0 || (route !== 'lessons' && route !== 'tactics' && route !== 'openings' && route !== 'endgames' && route !== 'dashboard');
    appbarBack.hidden = !showBack;
  }

  // Close any open sheets/overlays
  closeMoreSheet();
  closeSearch();

  try {
    await ROUTES[route](view, params);
  } catch (e) {
    console.error('Render failed', e);
    view.innerHTML = '<p style="color:var(--bad); padding:14px;">Failed to render view: ' + e.message + '</p>';
  }
  // Scroll to top after navigation
  window.scrollTo(0, 0);
}

function applyTheme() {
  const t = storage.state.theme || 'dark';
  document.documentElement.setAttribute('data-theme', t);

  // Board theme — drives [data-board-theme] tokens in design-system.css
  const bt = storage.state.boardTheme || 'walnut';
  if (bt === 'walnut') {
    document.documentElement.removeAttribute('data-board-theme');
  } else {
    document.documentElement.setAttribute('data-board-theme', bt);
  }
}

// Add a subtle scroll-aware shadow under the app bar (iOS pattern)
function bindAppBarScroll() {
  const appbar = document.querySelector('.appbar');
  if (!appbar) return;
  let scrolled = false;
  const onScroll = () => {
    const next = window.scrollY > 4;
    if (next !== scrolled) {
      scrolled = next;
      appbar.classList.toggle('is-scrolled', scrolled);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function bindShell() {
  // Bottom tabs
  document.querySelectorAll('.bottom-nav .tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = btn.dataset.route;
      if (r === 'more') openMoreSheet();
      else location.hash = r;
    });
  });

  // More sheet links
  document.querySelectorAll('.sheet-link[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = btn.dataset.route;
      closeMoreSheet();
    });
  });
  document.querySelectorAll('[data-close-sheet]').forEach(el => {
    el.addEventListener('click', closeMoreSheet);
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const next = (storage.state.theme || 'dark') === 'dark' ? 'light' : 'dark';
    storage.setTheme(next);
    applyTheme();
  });

  // Search button
  const searchBtn = document.getElementById('appbarSearch');
  if (searchBtn) searchBtn.addEventListener('click', openSearch);

  // Back button
  const backBtn = document.getElementById('appbarBack');
  if (backBtn) backBtn.addEventListener('click', () => {
    // Pop history; fall back to bottom-nav root for the current tab
    if (navHistory.length > 1) {
      navHistory.pop(); // remove current
      const prev = navHistory.pop(); // get previous
      if (prev) { location.hash = prev; return; }
    }
    location.hash = 'lessons';
  });
}

function openMoreSheet() {
  const sheet = document.getElementById('moreSheet');
  if (sheet) sheet.hidden = false;
}
function closeMoreSheet() {
  const sheet = document.getElementById('moreSheet');
  if (sheet) sheet.hidden = true;
}

// Detect if we're on a small/mobile viewport so views can pick sensible defaults
export function isMobileViewport() {
  return window.matchMedia('(max-width: 767px)').matches;
}

// Default Stockfish depth for the current device
export function defaultEngineDepth() {
  return isMobileViewport() ? 12 : 14;
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  bindShell();
  bindAppBarScroll();
  initSearch();
  navigate();
});
