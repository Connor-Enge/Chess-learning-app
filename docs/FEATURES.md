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

## Practice Mode — Coached Play vs Bot (PLANNED — not yet shipped)

A separate top-level view, distinct from Lessons / Trainer / Play. The user plays a full game vs a Stockfish-powered bot with a chosen *personality*; after **every** user move, a coach panel evaluates that move, explains *why* it was good/bad, and suggests what would have been better in this bot's style.

### Bot personalities (each biases Stockfish's move selection)

- **Aggressor** — sacrifices for attack, plays gambits, prioritizes king-side pawn storms; gives up material for initiative. Re-scores candidates by adding +20cp for moves attacking the king and +30cp for sound sacrifices that maintain initiative.
- **Positional Squeezer** — slow strategic chess: improves worst piece, restricts opponent, accumulates small advantages, prefers exchanges into superior endings. Re-scores moves that improve activity / pawn structure higher; deprioritizes tactical mess.
- **Tactician** — looks for combinations and sacrifices, plays sharp lines, will spike eval if there's a tactic available even if positionally questionable.
- **Defender / Counterpuncher** — solid setups (Hedgehog, Berlin), waits for opponent overextension, then strikes back.
- **Beginner Buddy** — simple developing moves, occasional blunders, doesn't punish all inaccuracies. Good for early ramp-up.
- **Equal Match** — adaptive Elo targeting Connor's solve-rate so games feel close.

**Implementation pattern:** run Stockfish at depth N to get the top-K candidate moves with their evals; re-score each with a personality-specific weighting; pick the highest-rescored move with some randomness; at weaker strengths, occasionally pick the 2nd/3rd best. **Strength slider 800–2200 Elo**, mapped to depth + intentional blunder rate.

### The coach panel — runs after every user move

- Compare the user's move to Stockfish's best move, compute eval delta.
- Categorize: `!!` brilliant · `!` best · `=` good/best of equals · `?!` inaccuracy (-30 to -90cp) · `?` mistake (-90 to -200cp) · `??` blunder (>-200cp).
- Render a 2–4 sentence natural-language explanation:
  - **Good move:** *what* it accomplishes (tactic / plan / piece improvement) + *why it works*. e.g. "Nxd4! — exchanges your worst-placed knight for an active opponent piece and opens the c-file for your rook. Exactly the multi-purpose move the Squeezer respects."
  - **Inaccuracy/mistake/blunder:** what went wrong + the better move + why the better move is better. e.g. "After 12.h3, your kingside structure is loosened and you've spent a tempo. The Squeezer would have played 12.Rfc1 instead — preparing the minority attack with b4 next, putting pressure on c6 without weakening anything. Pattern: don't make defensive pawn moves on the side you want to attack."
- The coaching voice **mirrors the bot's personality** (Aggressor coach is fiery and praises sharp moves; Squeezer coach is calm and patient; Tactician coach hunts combinations; Defender coach preaches patience).

### Board annotations after each move

- **Red arrow** on the user's move if it was a mistake.
- **Green arrow** showing the better move ("You should have played…").
- **Yellow arrow** for any tactical motif the user missed.
- **Square highlights** for relevant features the coach references (outpost, weak king-side, pinned piece).

### Interactive coach features

- **"Show me" button** on each tip: tap → board temporarily plays out the suggested move + the bot's likely response with callouts; "Restore my game" puts it back to the actual position.
- **Pre-move hints** (toggle): a "Hint" button lights up if the user asks. Hint reveals only the *plan* or *piece to consider*, not the move itself. ("Look for piece activity on the queenside" — not the move.)
- **Threat indicator** (toggle): a small red dot on any square attacked by an enemy piece that isn't sufficiently defended (one-move tactical alert). Off by default for harder modes.

### Post-game review screen

- Result, accuracy %, count of `!! ! = ?! ? ??` moves, "biggest blunder" highlight, one or two "lessons from this game" linking back to relevant curriculum lessons (e.g. lots of pawn-structure mistakes → link to the Positional / Pawn Structure track).

### Mobile-first UX

- Board on top (as everywhere).
- Coach panel as a bottom sheet that slides up after each move; user dismisses with a swipe down or "Got it" button.
- Bot's move plays after the coach panel is dismissed, OR user can choose "Auto-continue" (1.5s after the panel appears).
- Bot personality + strength selector at top of the view as pills.
- "End game" / "Resign" button always reachable.

### Implementation phasing

1. **Phase 1** — basic loop: user plays → Stockfish evals best move → eval delta computed → generic message shown → bot responds. No personalities yet, no coaching style differentiation.
2. **Phase 2** — add personalities (move re-scoring + coaching voice templates).
3. **Phase 3** — "Show me" button, pre-move hints, threat indicator, post-game review.

### Engineering notes

- **Two Stockfish analyses per user move**: (a) best move from the pre-move position (used as the comparator), (b) eval of position after user's move. At depth 18–20 on mobile this is 1–2s; show a spinner during analysis.
- **Cache analyses keyed by FEN** to avoid recomputing on takebacks.
- **Explanation library is offline + deterministic** — a few hundred handwritten templates keyed on `(eval-category, board-feature, personality)`. Board features detected via simple heuristics: piece-square-table deltas (which piece improved/worsened?), king safety (pawn shield, attackers near king), structure (created weak square? doubled pawn? outpost?), tactical (Stockfish PV reveals a fork/pin/skewer pattern). **Don't try to LLM-generate at runtime** — keep it in-package.

### Nav placement

A new bottom-tab "Practice" alongside Lessons / Openings / Tactics / Endgames / More. Or replace one of the existing trainers — TBD when we build it.

---

## What is NOT included (deliberately)

- Account system, cloud sync, multiplayer
- Spaced-repetition scheduling for puzzles (puzzles repeat once you've solved everything in the active filter)
- Variation branching in PGN player (linear playback only — variations belong in lesson explanations)
- Premoves (clicking ahead-of-turn doesn't queue moves)
- Engine-vs-engine playback in Play view
