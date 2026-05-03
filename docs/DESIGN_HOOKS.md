# Design Hooks — runtime → CSS contract

> Coordination doc between the **runtime/content session** (`main` branch — owns JS, content, engine) and the **mobile UI/UX redesign session** (`redesign` branch — owns CSS, visual structure of `index.html`, assets).
>
> The runtime renders DOM with the class names listed below. The design system styles them. Don't rename runtime classes without updating both sides.

---

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

Mostly already styled. The runtime-mounted hooks are:

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

The runtime sets inline styles ONLY for layout-derived values that change at runtime (callout positioning from board-square coords, ghost-piece tracking during drag). These are safe to leave alone. Visual properties are NOT set inline.

Specifically, inline `style.left`, `style.top`, `style.width`, `style.height`, `style.fontSize`, `style.opacity`, `style.transform` may appear on:

- `.lp-callout` — board-anchored positioning
- Chessground's internal piece elements during drag (chessground manages these)
- Ghost piece elements during the custom-board drag (legacy `js/board.js` only — being phased out)

**Never** does the runtime set inline `color`, `background`, `font-family`, `border` on user-visible elements. Those are all yours.

---

## CSS variable contract (what the runtime expects to exist)

Used by `js/lesson-player.css` and the existing `css/main.css`. The runtime treats these as the design tokens; if the redesign renames them, also update the references in JS where they're echoed to inline styles (currently none — but the lesson-player `flash` and callout fallback colors should continue to read from these variables).

Required:
- `--bg`, `--bg-elev`, `--bg-elev-2`, `--bg-elev-3`
- `--border`
- `--text`, `--text-dim`, `--muted`
- `--accent`, `--accent-2`
- `--good`, `--bad`, `--warn`
- `--appbar-h`, `--bottom-nav-h`, `--safe-bottom`, `--safe-top`
- `--tap` (minimum tap-target size)
- `--radius`

Board / chessground:
- `--board-light`, `--board-dark` (used by my legacy custom board only — phased out)
- `--cg-coord-color-light`, `--cg-coord-color-dark` (chessground respects these)

---

## What the runtime needs from the redesign (FYI)

- A consistent button styling for `.lp-btn`, `.lp-mark-btn`, `.lp-next-btn`, `.lp-pz-load|hint|reveal`. Tap targets ≥ 44 × 44 px.
- A visual treatment for revealed vs unrevealed lesson text cards (`.lp-text-card.lp-revealed` vs not-revealed). Currently we use opacity + border-color shift.
- A clear visual distinction between `.lp-puzzle-card.solved` and unsolved (we use a green left border + tinted background).
- A "primary" treatment for `.lp-play` and `.lp-mark-btn` (these are the "do the thing" buttons in their respective contexts).
- The chessground board theme: brown is bundled now (Cburnett pieces); a darker board theme as an option would be nice, but the brown is fine on phones in dim light.

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

Spec lives in `FEATURES.md`. Will update this doc when the runtime lands.

---

## Future: Custom engine

The custom chess engine (see `ENGINE_SPEC.md`) ships in `js/engine/` — it has no UI surface of its own. It exposes API to Practice Mode and the lesson player. No CSS implications.
