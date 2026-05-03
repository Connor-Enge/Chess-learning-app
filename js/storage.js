// localStorage progress tracking.
const KEY = 'chess-academy:v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    return Object.assign(defaults(), parsed);
  } catch (e) {
    console.warn('storage load failed', e);
    return defaults();
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('storage save failed', e);
  }
}

function defaults() {
  return {
    completedLessons: {},   // lessonId -> timestamp
    solvedPuzzles: {},      // puzzleId -> { solved: true, attempts: n, ts }
    attemptedPuzzles: {},   // puzzleId -> attempts
    completedEndgames: {},  // endgameId -> timestamp
    studiedGames: {},       // gameId -> timestamp
    exploredOpenings: {},   // openingId -> timestamp
    theme: 'dark',
    recent: [],             // [{type, id, title, ts}]
  };
}

let state = load();

function pushRecent(entry) {
  state.recent = [entry, ...state.recent.filter(r => !(r.type === entry.type && r.id === entry.id))].slice(0, 12);
}

export const storage = {
  get state() { return state; },

  markLessonComplete(id, title) {
    state.completedLessons[id] = Date.now();
    pushRecent({ type: 'lesson', id, title, ts: Date.now() });
    save(state);
  },
  isLessonComplete(id) { return !!state.completedLessons[id]; },

  recordPuzzleAttempt(id, solved) {
    state.attemptedPuzzles[id] = (state.attemptedPuzzles[id] || 0) + 1;
    if (solved) {
      state.solvedPuzzles[id] = { solved: true, attempts: state.attemptedPuzzles[id], ts: Date.now() };
    }
    save(state);
  },
  isPuzzleSolved(id) { return !!state.solvedPuzzles[id]; },
  puzzleStats() {
    const solved = Object.keys(state.solvedPuzzles).length;
    const attempted = Object.keys(state.attemptedPuzzles).length;
    const totalAttempts = Object.values(state.attemptedPuzzles).reduce((a,b)=>a+b,0);
    const accuracy = totalAttempts > 0 ? Math.round((solved / totalAttempts) * 100) : null;
    return { solved, attempted, accuracy };
  },

  markEndgameComplete(id, title) {
    state.completedEndgames[id] = Date.now();
    pushRecent({ type: 'endgame', id, title, ts: Date.now() });
    save(state);
  },
  isEndgameComplete(id) { return !!state.completedEndgames[id]; },

  markGameStudied(id, title) {
    state.studiedGames[id] = Date.now();
    pushRecent({ type: 'game', id, title, ts: Date.now() });
    save(state);
  },
  isGameStudied(id) { return !!state.studiedGames[id]; },

  markOpeningExplored(id, title) {
    state.exploredOpenings[id] = Date.now();
    pushRecent({ type: 'opening', id, title, ts: Date.now() });
    save(state);
  },
  isOpeningExplored(id) { return !!state.exploredOpenings[id]; },

  setTheme(t) { state.theme = t; save(state); },

  reset() {
    state = defaults();
    save(state);
  }
};
