# Chess Academy — Feature List

A **mobile-first**, no-build vanilla-JS web app for learning chess strategy. Designed primarily for a phone-sized viewport (~360–430 px) with tablet+ widening at 768 px and above. Open `index.html` directly in a modern browser; no server required (the engine is loaded via CDN web worker).

## Mobile-first design

The app is built phone-first:

- **Viewport**: `width=device-width, initial-scale=1, viewport-fit=cover`. CSS uses `dvh`/`svh` so the iOS dynamic address bar doesn't crop content. Safe-area insets (`env(safe-area-inset-bottom)`) keep the bottom nav clear of the iPhone home indicator.
- **Bottom tab bar** as primary navigation (thumb-reach), 5 tabs: Lessons, Openings, Tactics, Endgames, More. The "More" tab opens a sheet for Dashboard / Positional / Exchanges / Master Games / Play.
- **Tap targets** ≥ 44 × 44 px (Apple HIG / Material 48 dp) — buttons, list items, nav tabs all sized accordingly.
- **Board sizing** uses `min(95vw, 95vmin, 480px)` so the chessboard fills a phone screen edge-to-edge, then caps at 480 px on tablet+.
- **Typography** ≥ 16 px body text and on every input (prevents iOS focus-zoom). Generous spacing and line-height for one-handed reading.
- **Engine pane** is a collapsible bottom sheet on mobile (default collapsed; tap the handle to expand), and a persistent side panel on tablet+ (≥ 768 px).
- **Single-column layout** on mobile; widens to two-column on tablet+. Sidebars (lesson list, opening tree, drill list, games list) collapse to a togglable panel on mobile, and become a sticky sidebar on tablet+.
- **No drag-only affordances** — the chessboard is tap-to-select then tap-destination. Promotion picker is a 56 px tap-friendly button row.
- **Stockfish defaults to depth 12 on mobile** (vs 14 on desktop) to conserve battery. The user can disable Stockfish entirely from the engine sheet on weak phones.
- **Inputs**: every text input uses 16 px font-size + appropriate `inputmode`/`autocomplete` to play nicely with iOS/Android keyboards.

## Top-level navigation

The top bar offers eight sections:

- **Dashboard** — progress overview across every track + recent activity feed.
- **All Lessons** — the full lesson library across all tracks (filterable by track).
- **Openings** — opening explorer with a tree of 51 openings: model lines, plans, structures, traps.
- **Tactics** — randomized puzzle trainer with theme filters and accuracy stats.
- **Positional** — filtered lessons view of the Positional Play track (quiet, judgment-based concepts).
- **Endgames** — drillable theoretical positions vs Stockfish + the conceptual lessons.
- **Exchanges** — filtered lessons view of the Exchanges & Piece Values track.
- **Master Games** — annotated PGN player for instructive classics (27 games shipped).
- **Play / Analyze** — free board with engine analysis pane and FEN/PGN import-export.

Plus a **global search box** that scans lessons, openings, endgames, and games.

The lesson library itself is organized into **seven tracks**: Calculation, Openings, Tactics, Positional Play, Exchanges & Piece Values, Endgame, plus Master Games as a viewer. See `CURRICULUM.md` for the full lesson plan.

## Interactive chessboard

Custom vanilla-JS board widget (`js/board.js`):

- 8×8 CSS-grid board with light/dark squares
- Click-to-select then click-to-move (no drag-and-drop dependency)
- Legal move highlighting (dots on empty squares, rings on captures)
- Selected-square highlight
- Last-move highlight (from/to)
- Check indicator (red glow on the king in check)
- Promotion modal (pick Q/R/B/N when a pawn reaches the back rank)
- Flip board (one-click reorientation)
- Board sizes: small / default / large via CSS class
- Coordinates rendered in the board edge squares

## Lesson viewer

Each lesson is a list of typed content blocks the renderer knows about:

- `text` — markdown paragraph (bold, italic, code, links, bullet lists)
- `heading` / `subheading` — section structure
- `quote` — pull-out blockquote
- `board` — static position with caption + optional from/to highlight
- `pgn` — steppable PGN player (prev / next / first / last / flip / arrow keys, click any move in the move list to jump there). Annotations attach to specific plies and surface in the side pane as you step.
- `interactive` — "your move" prompt: you must play the right move from a position. Hint and reveal buttons. Engine-free; the solution is hardcoded SAN.

Every lesson can include:

- Estimated time, learning objective, track tag
- Multiple-choice quizzes (immediate feedback + explanation)
- Further-reading list
- "Mark complete" → saved to localStorage
- Optional `next` link to suggested follow-up lesson

## Opening explorer

- Tree view in the sidebar grouped by family (Open / Semi-Open / Closed / Indian / Flank)
- Each opening page: ECO code, style tag, full main line in SAN, steppable mini-board, plans for white and black, typical pawn structure, key variations (collapsible), common traps, model game references.
- Marks an opening as "explored" on view → counted on the dashboard.

## Tactics trainer

- 60+ puzzles across pin, fork, skewer, discovered attack, deflection, decoy, removing the defender, zwischenzug, overloading, smothered mate, back-rank, windmill, perpetual, mating attack, sacrifice, etc.
- Theme chips filter the puzzle pool.
- Hint button (reveals first letter of solution).
- Show solution button.
- "Next puzzle" pulls a fresh unsolved puzzle (falls back to solved pool when exhausted).
- Auto-plays the opponent's reply in multi-move solutions.
- Tracks attempts and solved per puzzle in localStorage; surfaces accuracy and totals.

## Endgame trainer

- Library of theoretical positions: Lucena, Philidor, Vančura, K+P vs K (opposition / wrong-color rook pawn), trébuchet, breakthrough, R+B vs R, opposite bishops, Q vs P drills, basic mates (K+Q, K+R, K+2B, B+N).
- You play one side; Stockfish (via web worker) plays the other at adjustable depth.
- Each drill has a goal, an explanation written in markdown, and optional engine-hint button.
- Reset / flip / hint controls.
- Marks the drill complete on game end (or via the "Mark drill complete" button).

## Engine analysis (Stockfish)

Loaded from CDN as a web worker. Available in two places:

1. **Play / Analyze view** — toggleable analysis with depth control (6–22). Shows eval (from White's POV), principal variation, and current depth.
2. **Endgame trainer** — plays the opponent and powers the hint button.

UCI-only; no Stockfish UI besides what we render.

## Play / Analyze workspace

- Free chessboard you can play moves on against yourself.
- Undo, flip, reset.
- Live engine analysis (toggle).
- Move list (SAN).
- FEN field — copy current position or load any FEN.
- PGN textarea — load a PGN game or export the current move list.

## Progress tracking (localStorage)

`chess-academy:v1` stores:

- Completed lessons (id → timestamp)
- Solved puzzles (id → attempts, solved-at)
- Attempted puzzles (for accuracy)
- Completed endgames
- Studied games
- Explored openings
- Recent activity feed (last 12)
- Theme preference

No server. Everything is local. Clearing browser storage resets progress.

## Search

Global search box in the top bar. Indexes:

- Lesson titles, objectives, tags
- Opening names, aliases, ECO codes, main-line moves
- Endgame titles + explanations
- Master game players, events, openings, lesson tags

Live results dropdown; click to navigate.

## Theme

Dark by default (chess-board friendly). Light mode toggle in the top bar; preference is persisted.

## Keyboard shortcuts

- Arrow Left / Arrow Right — step backward / forward through the active PGN player or master game.

## Responsive layout

Stacks columns on screens narrower than 900px. The board stays usable on phones.

## What is NOT included (deliberately)

- Account system, cloud sync, multiplayer
- Spaced-repetition scheduling for puzzles (puzzles repeat once you've solved everything in the active filter)
- Variation branching in PGN player (linear playback only — variations belong in lesson explanations)
- Premoves (clicking ahead-of-turn doesn't queue moves)
- Engine-vs-engine playback in Play view
