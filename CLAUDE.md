# CLAUDE.md — for future Claude sessions

## What this project is

`chess-academy/` is a vanilla HTML/CSS/JS single-page web app that teaches Connor (the user — SEO professional, not a developer, prefers no-terminal workflows) chess strategy. He already knows how the pieces move; the curriculum starts at strategic concepts.

**Open `index.html` to run it.** No build step, no server required (though some browsers may need `python -m http.server` or similar to allow the Stockfish web worker on `file://`).

## Codebase shape (read before editing)

```
chess-academy/
├── index.html              ← single SPA entry; contains <template>s for each view
├── css/main.css            ← global theme + layout
├── css/board.css           ← chessboard styling
├── js/
│   ├── app.js              ← hash router; dispatches to js/views/*
│   ├── board.js            ← custom chessboard widget (no library)
│   ├── chess-utils.js      ← thin wrapper around the global Chess from chess.js (CDN)
│   ├── engine.js           ← Stockfish web-worker UCI wrapper
│   ├── storage.js          ← localStorage progress tracking
│   ├── content-loader.js   ← lesson loader (sorts by track + order)
│   ├── search.js           ← global search index
│   ├── views/{dashboard,lessons,openings,tactics,endgames,games,play}.js
│   └── data/               ← all content lives here:
│       ├── lessons-index.js              (stub — kept for module-resolution)
│       ├── lessons-tactics-deep.js       (deep basic-tactics)
│       ├── lessons-tactics-advanced.js   (windmill / x-ray / clearance / desperado / interference / mating nets)
│       ├── lessons-positional.js         (Positional Play deep track, ~20 lessons)
│       ├── lessons-openings.js           (Openings meta-lessons, 5)
│       ├── lessons-endgame.js            (Endgame track conceptual lessons, 7)
│       ├── lessons-exchanges.js          (Exchanges & Piece Values, 12)
│       ├── lessons-calculation.js        (Calculation + thinking-process, 8)
│       ├── openings.js                   (51 openings + OPENING_TREE)
│       ├── puzzles.js                    (60+ puzzles)
│       ├── endgames.js                   (18 drills vs Stockfish)
│       └── games.js                      (27 annotated games)
├── docs/CURRICULUM.md      ← the lesson plan
├── docs/FEATURES.md        ← feature inventory
├── docs/research/          ← 7 long-form research markdown files (reference, not loaded at runtime)
└── README.md               ← user-facing docs
```

## Key conventions

- **Mobile-first.** The app is primarily designed for phones (~360–430 px). All views default to single-column with collapsible list panels; tablet+ widening is gated by `@media (min-width: 768px)`. The board uses `min(95vw, 95vmin, 480px)`. Body text and inputs are 16 px (avoids iOS focus-zoom). Tap targets ≥ 44 × 44 px. Bottom tab bar (5 tabs: Lessons / Openings / Tactics / Endgames / More) — never restore a top nav. Engine pane is a collapsible bottom sheet on mobile; persistent side panel on tablet+. Safe-area insets via `env(safe-area-inset-bottom)`.
- **Vanilla JS only.** No bundler, no transpiler, no JSX, no TypeScript. ES modules with `import`/`export`. Loaded as `<script type="module">`.
- **Chess.js loaded via CDN as a global** (`Chess`). `js/chess-utils.js` defends against both `Chess()` and `new Chess.Chess()` shapes for safety.
- **Stockfish loaded as a Web Worker via CDN**, lazily. Don't import it in modules that don't need it.
- **All content is data, not code.** Lessons, openings, puzzles, endgames, games are exported arrays in `js/data/*.js`. To add content, edit those files — never hardcode in views.
- **Routing is hash-based.** `#openings/sicilian-najdorf` → `views/openings.js render() with params=['sicilian-najdorf']`. Linking between sections = setting `location.hash`.
- **Board widget is library-agnostic.** It takes callbacks (`onMove`, `getLegalMoves`, `getTurn`) and knows nothing about chess rules. Always wire it to a fresh `Chess` instance.
- **localStorage key is `chess-academy:v1`** — bump if you change the schema.
- **Dark mode by default.** Light mode via the toggle, persisted.

## Where to make common changes

- **Add a lesson** → pick the appropriate `js/data/lessons-<track>.js` file and append to its exported array. `content-loader.js` merges them all. See README.md "Add a lesson" section.
- **Add a puzzle** → `js/data/puzzles.js`, append to `PUZZLES`.
- **Add an opening** → `js/data/openings.js`, append to `OPENINGS` AND to `OPENING_TREE`.
- **Add an endgame drill** → `js/data/endgames.js`.
- **Add a master game** → `js/data/games.js`.
- **Change the navigation** → top of `index.html` (`<nav class="nav-tracks">`) AND `js/app.js` `ROUTES` map.
- **Restyle the board** → `css/board.css` (CSS variables: `--board-light`, `--board-dark`, `--board-light-active`, etc.).
- **Add a new view/route** → add a template `<template id="tpl-x">` in `index.html`, create `js/views/x.js` exporting `renderX`, register in `js/app.js` `ROUTES`.

## Testing

There's no automated test suite — test by opening `index.html` and clicking. Specifically:

1. Dashboard renders → counts non-zero only after using other views
2. Lessons list filters by track; clicking a lesson renders its content; PGN player steps via prev/next AND arrow keys; interactive prompts validate the right move
3. Openings tree expands; selecting an opening renders the page; the mini-board steps through moves
4. Tactics: a puzzle loads, attempting the wrong move shows feedback + reverts; the correct move advances; multi-move puzzles auto-play opponent reply
5. Endgames: pick a drill; if engine's turn first, it plays a move within ~2s; user moves work; checkmate triggers the "mark complete" button
6. Master Games: arrow keys step through the game; clicking a move jumps to it; autoplay works
7. Play: drag/click moves work; engine toggle starts/stops analysis; FEN/PGN load and export work

## Known gaps & traps for the next session

- **Some puzzles are "composed" / pattern-illustration rather than tournament-verified** (~12 of the 66 starter puzzles). The puzzle data file flags or doesn't — see the original extraction notes. If a user reports "the solution didn't work," check that puzzle's FEN matches the solution.
- **Stockfish loads from jsdelivr**. If the CDN is down or the URL changes, edit `js/engine.js`. To go fully offline, download the worker file and host it locally.
- **No variation branching in the PGN player.** If a future lesson needs branches, you'll need to extend `js/views/lessons.js` `renderPgnBlock()`. Currently variations belong in the `annotations` text.
- **chess.js v1 throws on illegal moves.** Code that calls `chess.move()` should `try/catch`. `chess-utils.js` `tryMove()` does this safely.
- **The board widget doesn't drag.** Click-to-select then click-to-move only. Many users expect drag — if Connor asks for it, that's a board.js change (mousedown → track → mouseup → resolve to dropped square).
- **Search index is built once on page load** from the data modules. Adding content requires reload to be searchable.

## What NOT to do

- **Don't add a build step.** No webpack, no vite, no npm install. The whole point is double-click `index.html`.
- **Don't add a backend.** Progress is local-only by design.
- **Don't hardcode lesson/opening/puzzle content in JS view modules.** Edit data files.
- **Don't introduce jQuery / chessboard.js / chessground.** The custom `Board` widget already covers needs and avoids dependency creep.
- **Don't suggest CLI commands to Connor.** He explicitly wants no-terminal workflows. Wrap any dev tasks in launchers or describe how to do them via the browser/file explorer.
