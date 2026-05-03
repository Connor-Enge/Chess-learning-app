# Design Hooks — runtime ↔ CSS contract

> Coordination doc between the **runtime/content session** (owns JS, content, engine) and the **mobile UI/UX redesign session** (owns CSS, visual structure of `index.html`, assets).
>
> The runtime renders DOM with the class names listed below. The design system styles them. Don't rename runtime classes without updating both sides.

This file is split into two halves:

- **Part A — runtime classes** (`.lp-*`, `.cg-*`, top-level shell). Owned by the runtime session; the design system styles them.
- **Part B — design-system classes** (`.btn`, `.card`, `.list-row`, `.move-list`, `.empty`, `.toast`, etc.). Owned by the design session; the runtime should reach for these names when rendering generic UI.

---

# Part A — Runtime → CSS contract

## Class-name conventions

- `lp-*`  — lesson player (chessground-based, in `js/lesson-player.js`)
- `cg-*`  — chessground built-in classes (do not override blindly; see chessground's own CSS)
- `appbar`, `bottom-nav`, `tab`, `sheet` — top-level shell (in `index.html` + `js/app.js`)
- Other view modules (`js/views/*.js`) use feature-prefixed classes already documented in the existing `css/main.css`.

---

## Lesson player (`js/lesson-player.js`) — runtime hooks

The player builds this DOM tree per lesson, with these stable class names:

```
.lp-root
├── .lp-board-panel              # sticky/fixed top container for the board + controls
│   ├── .lp-board.cg-wrap        # chessground mount point (size set by host CSS via min(95vw,95vmin))
│   ├── .lp-callout-overlay      # absolutely-positioned overlay for callouts
│   │   └── .lp-callout.lp-callout-{above|below}.lp-callout-{green|red|yellow|blue}
│   │       ├── .lp-callout-arrow
│   │       └── .lp-callout-body
│   ├── .lp-move-tip[.lp-good|.lp-bad|.lp-prompt|.lp-info]
│   ├── .lp-progress
│   │   ├── .lp-progress-bar
│   │   └── .lp-progress-label
│   └── .lp-transport
│       ├── .lp-restart
│       ├── .lp-back
│       ├── .lp-play              # pulsed/accented "primary" tap target
│       ├── .lp-fwd
│       └── .lp-flip
└── .lp-text                      # scrollable lesson-body panel
    ├── .lp-title (h1)
    ├── .lp-meta
    ├── .lp-hint.muted
    ├── .lp-stream
    │   └── .lp-card.lp-text-card[.lp-revealed]   # text beat reveals on play
    ├── .lp-puzzles                # end-of-lesson puzzles section
    │   └── .lp-card.lp-puzzle-card[.solved]
    │       ├── .lp-card-header (.lp-badge + .lp-puzzle-status)
    │       ├── .lp-card-body
    │       ├── .lp-card-actions (.lp-btn .lp-pz-load / .lp-pz-hint / .lp-pz-reveal)
    │       └── .lp-card-explain
    └── .lp-completion
        ├── .lp-criteria > .lp-criterion[.met] > .dot
        ├── .lp-mark-btn[disabled]
        └── .lp-next-btn
```

### Status modifier classes

- `.lp-good` — green, "correct" feedback
- `.lp-bad` — red, "wrong move" feedback
- `.lp-prompt` — accent/info, "your turn" prompt
- `.lp-info` — neutral status text
- `.lp-active` — currently-active puzzle/checkpoint highlight
- `.solved` — applied to a card after the user solves it
- `.met` — applied to a `.lp-criterion` when its requirement is satisfied
- `.lp-revealed` — applied to a `.lp-text-card` when its beat has played

### Callouts

- `.lp-callout` is positioned via inline `style.left` / `style.top` (computed from chessground square coords). The redesign should not override `position`, `left`, `top`. Visual styling (background, border, font, shadow) is yours.
- Color modifiers: `.lp-callout-green | -red | -yellow | -blue` (mapped from script `color: 'green'|'red'|'yellow'|'blue'`).
- Direction modifiers: `.lp-callout-above | .lp-callout-below` — controls whether the tail (`.lp-callout-arrow`) points down or up, and whether the callout itself is offset above/below the anchor square.

### Chessground arrows + circles

The runtime calls `cg.setShapes([...])` with shape objects keyed to chessground's brushes (`green | red | blue | yellow`). To restyle these, override the chessground brush colors via the standard `--cg-*` CSS custom properties on `.cg-wrap` (chessground respects them).

---

## Top-level shell (`index.html` + `js/app.js`)

The runtime-mounted hooks are:

- `.appbar` (header)
  - `.appbar-back` (button, `[hidden]` until inside a deeper view)
  - `.appbar-title` (h1)
  - `.appbar-action` (icon buttons; right side)
- `.bottom-nav` (nav)
  - `.tab[data-route]` (button, `.active` when the route matches)
  - `.tab-icon`, `.tab-label`
- `.sheet[hidden]` — full-screen modal
  - `.sheet-backdrop` (closable area)
  - `.sheet-content`
  - `.sheet-handle`
  - `.sheet-link[data-route]`
- `.search-overlay[hidden]`

**Important:** `[hidden] { display: none !important }` MUST stay in the global stylesheet — without it, our `display: flex` rules on `.search-overlay` and `.sheet` override `[hidden]` and the page renders with the search overlay covering everything. (See commit `34bbbad` for the bug + fix.)

---

## Inline styles I rely on

The runtime sets inline styles ONLY for layout-derived values that change at runtime (callout positioning from board-square coords, ghost-piece tracking during drag). Specifically, inline `style.left`, `style.top`, `style.width`, `style.height`, `style.fontSize`, `style.opacity`, `style.transform` may appear on:

- `.lp-callout` — board-anchored positioning
- Chessground's internal piece elements during drag (chessground manages these)
- Ghost piece elements during the custom-board drag (legacy `js/board.js` only — being phased out)

**Never** does the runtime set inline `color`, `background`, `font-family`, `border` on user-visible elements. Those are all yours.

---

## CSS variable contract (what the runtime expects to exist)

Used by `js/lesson-player.css` and the existing `css/main.css`. The redesign system has renamed many tokens semantically but **keeps the legacy aliases below** so the runtime keeps rendering. New runtime code should prefer the new tokens (see `css/design-system.css`); old code continues to work via shims in `css/main.css`.

Legacy tokens (still working — runtime can keep using):
- `--bg`, `--bg-elev`, `--bg-elev-2`, `--bg-elev-3`
- `--border`
- `--text`, `--text-dim`, `--muted`
- `--accent`, `--accent-2`
- `--good`, `--bad`, `--warn`
- `--appbar-h`, `--bottom-nav-h`, `--safe-bottom`, `--safe-top`
- `--tap` (minimum tap-target size)
- `--radius`

Preferred (new) semantic tokens:
- `--bg-elevated`, `--surface`, `--surface-elevated`, `--surface-overlay`, `--surface-sunken`
- `--border-strong`, `--divider`, `--focus-ring`
- `--text-primary`, `--text-secondary`, `--text-muted`, `--text-disabled`, `--on-primary`
- `--primary`, `--primary-hover`, `--primary-active`, `--primary-soft`
- `--accent`, `--success`, `--warning`, `--error`, `--info` (each has a `-soft` variant)
- `--space-1…--space-11` (4-pt grid)
- `--radius-xs/sm/md/lg/xl/2xl/pill/full`
- `--shadow-1…--shadow-5`, `--shadow-inset`
- `--motion-fast/base/slow/slower`, `--ease-ios/material/out/in-out`

Board / chessground:
- `--board-light`, `--board-dark`, `--board-light-active`, `--board-dark-active`
- `--cg-coord-color-light`, `--cg-coord-color-dark` (chessground respects these)

---

## What the runtime needs from the redesign (status)

- A consistent button styling for `.lp-btn`, `.lp-mark-btn`, `.lp-next-btn`, `.lp-pz-load|hint|reveal`. Tap targets ≥ 44 × 44 px. → **Done.** The new design system styles bare `<button>` and `.btn` styling cascades to `.lp-btn`. For new code, prefer `class="btn btn--primary"` / `btn--secondary`.
- A visual treatment for revealed vs unrevealed lesson text cards. → **Picked up;** see `css/screens/lessons.css` (`data-status`) plus legacy class wiring in `css/main.css`.
- A clear visual distinction between `.lp-puzzle-card.solved` and unsolved. → **Done.**
- A "primary" treatment for `.lp-play` and `.lp-mark-btn`. → **Done.**
- The chessground board theme — alternates needed for ocean / tournament / midnight. → The redesign added `[data-board-theme]` overrides for `walnut` (default), `ocean`, `tournament`, `midnight`. Chessground's brown.css hard-codes brown colors for `.cg-board square.light/.dark`; the redesign should ship a small overlay CSS that overrides those rules to use the `--board-light`/`--board-dark` tokens. **Open follow-up.**

---

## Future: Practice Mode

When Practice Mode lands, it'll add:

- `.pm-root`
- `.pm-personality-pills` (top of view; selected personality is `.active`)
- `.pm-strength-slider`
- `.pm-coach-sheet` (bottom sheet, `.open` when expanded)
- `.pm-coach-verdict` (`!! ! = ?! ? ??` icon + label)
- `.pm-coach-explanation` (NL text)
- `.pm-coach-actions` (Show me / Got it / Hint)

Spec lives in `FEATURES.md`. The redesign session is preparing a Practice mode shell stylesheet that reads these classes.

---

## Future: Custom engine

Engine spec is `docs/ENGINE_SPEC.md` — design hooks aren't relevant until the engine UI lands.

---

# Part B — Design system → runtime contract

These are class names the runtime should apply when rendering generic UI surfaces (lists, cards, transport, toasts, empty states). The CSS for every class is already shipped — you don't need to touch any styling.

Class naming follows BEM-ish: block (`.move-list`), element (`.move-list__move`), modifier (`.move-list--compact`), state (`.is-current` or `aria-*`).

## Lesson player — design hooks (alternative names)

If the runtime migrates from `.lp-*` to design-system primitives, here are the equivalents. **Both sets are styled** — keep using `.lp-*` for now; reach for these when convenient.

| Runtime (legacy) | Design system primitive |
|---|---|
| `.lp-board-panel` | `.lesson-board-panel` (sticky board container) |
| `.lp-text` | `.lesson-body` |
| `.lp-title` | `<h1 class="lesson-h1">` or just `<h1>` inside `.lesson-body` |
| `.lp-meta` | `.lesson-meta` |
| `.lp-card.lp-text-card` | `.lesson-card[data-variant="position"\|"pgn"\|"freeplay"]` |
| `.lp-card.lp-puzzle-card` | `.lesson-card[data-variant="puzzle"]` |
| `.lp-puzzle-card.solved` | `.lesson-card[data-status="solved"]` |
| `.lp-card-header` | `.lesson-card__header` |
| `.lp-badge` | `.lesson-card__badge` |
| `.lp-card-body` | `.lesson-card__body` |
| `.lp-card-actions` | `.lesson-card__row` |
| `.lp-card-explain` | `.lesson-card__explain` |
| `.lp-criterion .dot` | `.criterion > .criterion__dot` |
| `.lp-mark-btn` | `.lesson-mark-complete` |
| `.lp-transport` | `.transport` |
| `.lp-play` | `.transport__btn--primary` |
| `.lp-restart / -back / -fwd / -flip` | `.transport__btn` |

## Move list

```html
<div class="move-list" id="gameMoves">
  <span class="move-list__pair">
    <span class="move-list__num">1.</span>
    <span class="move-list__move" data-ply="0">e4</span>
    <span class="move-list__move" data-ply="1">e5</span>
  </span>
</div>
```

State: `.is-current` (selected ply, primary background), `.has-comment` (accent underline).

> Legacy alias: `<div class="game-moves">` with `<span class="ply">` inside. Both styled.

## Engine pane

```html
<div class="dock-sheet" id="engineSheet">
  <div class="dock-sheet__handle">
    <i class="ph ph-cpu icon"></i>
    <span class="dock-sheet__title">Engine</span>
    <span class="dock-sheet__subtitle">+0.32</span>
    <i class="ph ph-caret-up icon"></i>
  </div>
  <div class="dock-sheet__body">
    <!-- engine controls + eval display -->
  </div>
</div>
```

Toggle open with `dock-sheet.classList.add('is-open')`. On tablet+ (≥1024 px), it becomes a static side panel. Eval readout: `.eval-display` with `__value`/`__line`/`__depth`. Modifier on the value: `--positive` (green) or `--negative` (neutral).

> Legacy: `<div class="engine-sheet">` with `.engine-sheet-handle` / `.engine-sheet-body` is still styled.

## Lists

```html
<div class="list-section">
  <button class="list-row">
    <span class="list-row__leading list-row__leading--filled">
      <span class="list-row__status list-row__status--done">
        <i class="ph ph-check icon" style="width:14px;height:14px"></i>
      </span>
    </span>
    <span class="list-row__main">
      <span class="list-row__title">The opposition</span>
      <span class="list-row__subtitle">King &amp; pawn endings · 8 min</span>
    </span>
    <i class="ph ph-caret-right icon list-row__chevron"></i>
  </button>
</div>
```

Status pill modifiers: `--done` (green check), `--current` (primary blue), `--locked` (lock icon, dim). Active row: `aria-current="true"` or `.is-active`.

> Legacy: `<ol id="lessonIndex">` etc. styled to look like grouped lists; new code should use `.list-section`/`.list-row`.

## Toasts

Mount nodes into `#toastHost`:

```html
<div class="toast toast--success">
  <i class="ph ph-check icon"></i>
  <span>Puzzle solved · 18s</span>
  <button class="toast__action">Next</button>
</div>
```

Variants: `toast--success` / `--warning` / `--error`. Dismiss: set `data-state="closing"` for 220 ms, then remove.

## Empty states

```html
<div class="empty">
  <span class="empty__art" aria-hidden="true">
    <i class="ph ph-clock-counter-clockwise icon"></i>
  </span>
  <p class="empty__title">No activity yet</p>
  <p class="empty__body">Start a lesson, drill, or puzzle and your progress will show up here.</p>
  <button class="btn btn--primary empty__cta">
    <i class="ph ph-play icon"></i><span>Start a lesson</span>
  </button>
</div>
```

## Skeletons

```html
<div class="skeleton skeleton--row"></div>
<div class="skeleton skeleton--card"></div>
<div class="skeleton skeleton--board"></div>
```

Variants: `--text` / `--text-lg` / `--text-sm` / `--avatar` / `--row` / `--card` / `--board`.

## Theme + board switching

Theme on `<html>`:

- `data-theme="dark"` (default)
- `data-theme="light"`
- omit attribute → follows system preference

Board theme also on `<html>`:

- (no attribute) → walnut default
- `data-board-theme="ocean"`
- `data-board-theme="tournament"`
- `data-board-theme="midnight"`

Persist via `storage.setTheme(name)` / `storage.setBoardTheme(name)`. Apply on app start in `applyTheme()` (in `js/app.js`).

---

## Existing legacy IDs the runtime can keep using

These IDs still exist in `index.html` and the CSS recognises them:

- `#tacticsBoard`, `#endgameBoard`, `#gameBoard`, `#playBoard`
- `#lessonContent`, `#lessonIndex`, `#lessonListPanel`, `#lessonListToggle`, `#lessonTrackFilter`
- `#openingTree`, `#openingContent`, `#openingTreeToggle`
- `#tacticsPrompt`, `#tacticsFeedback`, `#tacticsHint`, `#tacticsSolution`, `#tacticsNext`, `#tacticsThemes`, `#tacticsSolved`, `#tacticsAttempted`, `#tacticsAccuracy`, `#tacticsExplanation`
- `#endgameIndex`, `#endgameTitle`, `#endgamePrompt`, `#endgameReset`, `#endgameFlip`, `#endgameHint`, `#endgameExplainer`, `#endgameListPanel`, `#endgameListToggle`
- `#gameIndex`, `#gameTitle`, `#gameMeta`, `#gameAnnotation`, `#gameLessons`, `#gameMoves`, `#gamePrev`, `#gameNext`, `#gameAutoplay`, `#gameFlip`, `#gameListPanel`, `#gameListToggle`
- `#playReset`, `#playFlip`, `#playUndo`, `#playMoves`
- `#engineSheet`, `#engineSheetHandle`, `#engineToggle`, `#engineDepth`, `#engineEval`, `#engineLine`, `#engineDepthDisplay`, `#engineEvalQuick`
- `#fenInput`, `#loadFenBtn`, `#copyFenBtn`, `#pgnInput`, `#loadPgnBtn`, `#exportPgnBtn`
- `#searchOverlay`, `#globalSearch`, `#searchClose`, `#searchResults`
- `#appbarBack`, `#appbarTitle`, `#appbarSearch`, `#themeToggle`
- `#moreSheet`, `#moreTab`
- `#recentActivity`, `#heroTitle`, `#heroMeta`, `#heroCta` (hero card on dashboard)
- `#toastHost` (toast mount point)
- `#settingThemeToggle`, `#settingBoardTheme`, `#settingBoardThemeValue`, `#settingPieceSet`, `#settingPieceSetValue`, `#settingDepth`, `#settingDepthUp`, `#settingDepthDown`, `#settingReducedMotion` (settings template)

---

## What's owned by which session

| Path | Owner |
|---|---|
| `css/**` | Redesign |
| `index.html` (structure, classes) | Redesign |
| `assets/icons/`, `assets/pieces/`, `assets/board-themes/` | Redesign |
| `docs/DESIGN_*` | Redesign |
| `docs/design-system.html` | Redesign |
| `docs/ENGINE_SPEC.md`, `docs/FEATURES.md` | Runtime |
| `js/lesson-player.js`, `js/lesson-player.css` | Runtime |
| `js/data/**`, `content/**` | Runtime |
| `js/views/**` | Both, by mutual convention. Migrate to use design hooks; don't change layout structure casually |
| `js/app.js`, `js/storage.js`, `js/board.js`, `js/chess-utils.js`, `js/engine.js`, `js/content-loader.js`, `js/search.js` | Both, by mutual convention. Routing additions need coordination |
