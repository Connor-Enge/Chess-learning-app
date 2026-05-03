# Chess Academy

A **mobile-first**, self-paced, browser-only chess strategy school. Open `index.html` on your phone (or desktop) and learn from interactive lessons, opening trees, tactics puzzles, endgame drills against Stockfish, and annotated master games.

No build step. No server required. No account. Your progress is stored in your browser via `localStorage`.

The app is designed primarily for phone-sized viewports (360–430 px) with tablet+ widening at 768 px. Bottom tab bar for navigation, tap-friendly chessboard, collapsible engine sheet, 16 px body text to avoid iOS zoom, safe-area insets for the iPhone home indicator. See `docs/FEATURES.md` for the full mobile-first checklist.

## Quick start

**Easiest way:** double-click `index.html`. It opens in your default browser and works.

> If your browser blocks the page from loading the JS modules from a `file://` URL (some browsers do, particularly the Stockfish web worker), serve the folder over HTTP instead. Pick whichever you have:
>
> - `python -m http.server 8000` then visit `http://localhost:8000`
> - `npx serve` then visit the URL it prints
> - VS Code "Live Server" extension → right-click `index.html` → Open with Live Server

That's it — there is no `npm install`, no compile step, no build pipeline.

## What's inside

- **Dashboard** — at-a-glance progress across every track.
- **Lessons** — 75+ structured lessons across seven tracks: Calculation, Openings, Tactics (deep + advanced), Positional Play, Exchanges & Piece Values, Endgame, plus Master Games as a viewer.
- **Openings explorer** — 51 openings with main lines, plans, structures, traps, and model games.
- **Tactics Trainer** — 60+ puzzles across pin, fork, skewer, discovered attack, deflection, removing the defender, smothered mate, windmill, x-ray, and more. Filter by theme.
- **Endgame Trainer** — drill 18 theoretical positions: K+P vs K, Lucena, Philidor, Vančura, opposite bishops, basic mates, B+N vs K, and more. Stockfish plays the other side at adjustable depth.
- **Master Games** — 27 annotated classics with move-by-move commentary. Step through with arrow keys.
- **Play / Analyze** — free board with engine analysis, FEN/PGN import-export.

See `docs/CURRICULUM.md` and `docs/FEATURES.md` for the full inventory.

## Architecture

```
chess-academy/
├── index.html              # entry point — single page, all routes
├── css/
│   ├── main.css            # layout, theme, components
│   └── board.css           # board grid + piece glyphs
├── js/
│   ├── app.js              # router (hash-based)
│   ├── board.js            # custom chessboard widget
│   ├── chess-utils.js      # helpers around chess.js
│   ├── engine.js           # Stockfish web-worker wrapper (UCI)
│   ├── storage.js          # localStorage progress tracking
│   ├── content-loader.js   # lesson loader
│   ├── search.js           # global search index + dropdown
│   ├── views/              # one module per route
│   │   ├── dashboard.js
│   │   ├── lessons.js      # lesson viewer (PGN player + interactive prompts)
│   │   ├── openings.js     # opening explorer
│   │   ├── tactics.js      # puzzle trainer
│   │   ├── endgames.js     # endgame trainer (vs Stockfish)
│   │   ├── games.js        # annotated game viewer
│   │   └── play.js         # free board + engine analysis pane
│   └── data/               # all content lives here as ES modules
│       ├── lessons-index.js              # core (currently a stub)
│       ├── lessons-tactics-deep.js       # deep basic-tactics lessons
│       ├── lessons-tactics-advanced.js   # advanced tactics lessons
│       ├── lessons-positional.js         # Positional Play track
│       ├── lessons-openings.js           # Openings track meta-lessons
│       ├── lessons-endgame.js            # Endgame track conceptual lessons
│       ├── lessons-exchanges.js          # Exchanges & Piece Values track
│       ├── lessons-calculation.js        # Calculation + thinking-process lessons
│       ├── openings.js                   # 51 openings + tree
│       ├── puzzles.js                    # 60+ tactics puzzles
│       ├── endgames.js                   # 18 endgame drills
│       └── games.js                      # 27 annotated master games
├── docs/                   # research notes + curriculum + features
└── content/                # (reserved for future markdown content if you'd rather author there)
```

### Why vanilla JS, no build?

So Connor (the user) can clone, double-click `index.html`, and have it work. No Node, no `npm`, no transpiler, no bundle. The cost is no JSX/TypeScript, but it's a static-content app — that's a fine trade.

### External dependencies (loaded via CDN at runtime)

- **chess.js** — move generation and validation. Loaded as a global `Chess` from jsdelivr.
- **Stockfish.js** — UCI engine in a web worker. Loaded on first use of the analysis or endgame trainer.

There is no other library. The chessboard, the lesson renderer, the PGN player, the markdown converter, the search index, and the storage layer are all hand-written.

### Data files = content

All lessons, opening lines, puzzles, endgame positions, and master games live in `js/data/*.js` as plain ES module exports. To add a new lesson, edit `js/data/lessons-index.js` and add an entry to the `LESSONS` array. To add a puzzle, edit `js/data/puzzles.js`. The corresponding view picks it up on next page load.

## Adding content

### Add a lesson

Open `js/data/lessons-index.js`, add an entry to `LESSONS`:

```js
{
  id: "mid-008-rook-lifts",          // unique kebab-case
  title: "Rook lifts in attacking middlegames",
  track: "middlegame",                // fundamentals|positional|middlegame|tactics|endgame|opening|calculation
  order: 8,
  estimatedMinutes: 12,
  objective: "Spot when to lift a rook to the third rank for a kingside attack.",
  tags: ["attack", "rook"],
  next: null,
  content: [
    { type: "text", value: "Markdown paragraph." },
    { type: "heading", value: "Section" },
    { type: "board", fen: "...", caption: "..." },
    { type: "pgn", pgn: "1. e4 e5 2. Nf3 Nc6", annotations: { 4: "Important comment on move 4." } },
    { type: "interactive", fen: "...", prompt: "Find the rook lift!", solution: "Re3", explanation: "..." }
  ],
  quiz: [
    { question: "...", options: ["A", "B", "C"], answer: 0, explanation: "..." }
  ],
  further: ["Soltis, Pawn Structure Chess"]
}
```

Save and refresh the browser. The lesson appears in the lessons list, in the global search, and on the dashboard count.

### Add a puzzle

In `js/data/puzzles.js`, add to `PUZZLES`:

```js
{
  id: "p067",
  fen: "valid-fen-string",
  sideToMove: "w",
  solution: "Qxf7+ Kxf7 Bc4+",        // SAN moves separated by spaces
  themes: ["sacrifice", "mating-attack"],
  difficulty: "medium",
  explanation: "Sentence(s) explaining the idea.",
  title: "Greek Gift variation"
}
```

### Add an opening

In `js/data/openings.js`, add to `OPENINGS` and add a leaf to `OPENING_TREE`:

```js
// In OPENINGS:
{
  id: "english-symmetrical",
  name: "English — Symmetrical Variation",
  eco: "A30–A39",
  style: "Flank",
  firstPlayer: "white",
  mainLine: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7",
  whitePlans: "- Build the long diagonal\n- Push d4 at the right moment",
  blackPlans: "- Mirror white's setup\n- Aim for ...e6 and ...d5 break",
  variations: [{ name: "...", line: "...", note: "..." }],
  modelGames: ["Botvinnik vs Portisch, 1968"]
}

// In OPENING_TREE under Flank Openings:
{ id: "english-symmetrical", name: "English — Symmetrical" }
```

### Add an endgame drill

In `js/data/endgames.js`:

```js
{
  id: "rook-knight-vs-rook",
  title: "Rook + Knight vs Rook (mostly drawn)",
  category: "complex",
  fen: "...",
  userColor: "w",
  goal: "Try to win — most positions hold; learn the fortresses.",
  engineDepth: 16,
  explanation: "..."
}
```

### Add a master game

In `js/data/games.js`:

```js
{
  id: "carlsen-anand-2014-g6",
  white: "Magnus Carlsen",
  black: "Viswanathan Anand",
  event: "World Championship",
  year: 2014,
  eco: "B40",
  opening: "Sicilian — Kan",
  pgn: "1. e4 c5 2. Nf3 e6 3. g3 ...",
  annotations: {
    5: "Carlsen's pet anti-Sicilian — flexible, low-theory.",
    20: "Now the position resembles a hedgehog…"
  },
  lessons: ["Choose openings that fit your style.", "Patience is an attacking weapon."]
}
```

## How the views fit together

- The router in `js/app.js` reads `location.hash` (e.g. `#openings/sicilian-najdorf`) and dispatches to one of the view modules in `js/views/`.
- Each view module exports `render<Name>(viewElement, params)` and is responsible for rendering everything inside that container — including its own template clone from the `<template>` blocks in `index.html`.
- Views use the shared `Board` widget from `js/board.js`, which is independent and reusable. Pass it `onMove`, `getLegalMoves`, `getTurn` callbacks; it doesn't know about chess rules itself.
- Stockfish is started lazily — only when the user opens an endgame drill, an analysis pane, or a hint button.

## Limitations / known gaps

- **Composed puzzles in the puzzle pool** — about a dozen of the 66 starter puzzles are pattern illustrations rather than tournament-verified forcing combinations. Solutions are best-effort. If you spot a puzzle whose solution doesn't validate against the FEN, edit `js/data/puzzles.js` (each puzzle is independent — no risk of breaking others).
- **PGN player** — linear playback only; no variation branching. Variations live in lesson explanations.
- **No premoves** — clicking a piece before your turn does nothing.
- **No spaced repetition** — the puzzle trainer randomly picks unsolved puzzles, then random from all once exhausted. No interval scheduling.
- **Stockfish CDN dependency** — the engine loads from jsdelivr. If you need fully offline play, download the worker file and adjust the URL in `js/engine.js`.
- **Single-threaded Stockfish** — depth ~14 is comfortable, ~18 is slow on older machines. Adjust the depth control in the Play view if needed.

## License

Personal-use educational project. The dependencies (chess.js, Stockfish) are GPL/MIT and used per their terms.
