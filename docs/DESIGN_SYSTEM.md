# Chess Academy — Design System

This is the reference. The **live**, browseable version is `docs/design-system.html` — open it in a browser. This file is the prose companion: when to use what, why we chose what we did, how to extend.

## Contents

1. [Foundations](#foundations)
2. [Color](#color)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Radius](#radius)
6. [Elevation](#elevation)
7. [Motion](#motion)
8. [Iconography](#iconography)
9. [Components](#components)
10. [Layout primitives](#layout-primitives)
11. [Theming](#theming)
12. [Accessibility](#accessibility)
13. [Adding a component](#adding-a-component)

---

## Foundations

### File map

```
css/
├── design-system.css        ← tokens, base reset, utilities
├── main.css                 ← imports + legacy shims
├── board.css                ← chessboard widget
├── components/
│   ├── button.css
│   ├── input.css
│   ├── card.css
│   ├── list.css
│   ├── nav.css
│   ├── sheet.css
│   ├── chip.css
│   ├── progress.css
│   ├── feedback.css
│   ├── transport.css
│   └── layout.css
└── screens/
    ├── dashboard.css
    ├── lessons.css
    ├── tactics.css
    ├── openings.css
    └── board-screens.css
```

`main.css` `@import`s everything. Index.html only links `main.css` + `board.css`. Vanilla CSS, no build step.

### Design principles

1. **Mobile-first.** Default styles target ≤480px. Tablet+ widens via `@media (min-width: 768px)` and `(min-width: 1024px)`.
2. **iOS HIG and Material 3 hybrid.** Use iOS easing (`--ease-ios`) for sheets and presses; Material easing (`--ease-material`) for content area transitions.
3. **Semantic over presentational.** Reach for `--text-primary`, not `--neutral-100`. Theme overrides flow.
4. **Reduce motion respected.** Every animation collapses under `prefers-reduced-motion`.
5. **WCAG AA contrast** verified on every text/background pairing.
6. **44 px minimum tap target** everywhere. Most rows are 56 px.
7. **Body font 17 px** to prevent iOS focus-zoom; 16 px for inputs.

---

## Color

### Surfaces — layered backgrounds

| Token | Use |
|---|---|
| `--bg` | Page background (under everything) |
| `--bg-elevated` | App bar / nav glass-blur fallback |
| `--surface` | Cards, list sections, sheets |
| `--surface-elevated` | Nested cards, hover states |
| `--surface-overlay` | Modals, dock-sheets |
| `--surface-sunken` | Inset surfaces (move-list backgrounds) |
| `--surface-blur` / `--surface-blur-strong` | Translucent for `backdrop-filter` |

Each level steps up by ~3% lightness. Pick the lowest level that gives the surface enough contrast.

### Text

| Token | Use |
|---|---|
| `--text-primary` | Headlines, body |
| `--text-secondary` | Subtitles, supporting copy |
| `--text-muted` | Timestamps, captions, hints |
| `--text-disabled` | Disabled controls |
| `--text-inverse` | Text on light surfaces in dark mode |
| `--text-on-primary` | Text on filled `--primary` |

### Brand & semantic

| Token | When |
|---|---|
| `--primary` | The most important action: "Start lesson", "Mark complete", "Next puzzle" |
| `--accent` | Decorative emphasis, comments, special UI moments |
| `--success` | Solved, correct, complete |
| `--warning` | Caution, "engine off", "battery saver" |
| `--error` | Wrong move, parse failure |
| `--info` | Banners, callouts, neutral notices |

Each has a `-soft` companion: a 14% transparent background variant for chip / banner / callout fills.

---

## Typography

System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI Variable", "SF Pro Text", "Inter", system-ui, sans-serif`. Display font (titles) prefers `"SF Pro Display"` where available. Mono is `ui-monospace, "SF Mono", "JetBrains Mono", "Menlo", "Cascadia Mono", monospace`.

### Scale

| Token | Size | Use |
|---|---|---|
| `--text-display` | 40 | Hero greeting, settings page title |
| `--text-title-1` | 30 | Screen title, lesson H1 |
| `--text-title-2` | 24 | Section title, hero card |
| `--text-title-3` | 20 | Card title, callout heading |
| `--text-headline` | 17 (semibold) | Important text inline (same size as body) |
| `--text-body` | 17 | Body, list row title |
| `--text-callout` | 16 | Helper text, lesson card body |
| `--text-subhead` | 15 | Card subtitles, button labels |
| `--text-footnote` | 13 | List metadata, captions |
| `--text-caption` | 11 (uppercase) | Eyebrow labels, list section headers |

Body 17 px is the iOS standard — avoids focus zoom on form fields. Inputs explicitly use 16 px in their CSS.

Utility classes (`.t-display`, `.t-title-1`, `.t-body`, `.t-secondary`, `.t-muted`, `.t-tabular`, `.t-mono`) wrap font + line-height + weight + letter-spacing.

---

## Spacing

4-point grid:

```
--space-0  0     --space-5  20
--space-1  4     --space-6  24
--space-2  8     --space-7  32
--space-3  12    --space-8  40
--space-4  16    --space-9  56
                 --space-10 72
                 --space-11 96
```

Defaults:
- Card padding: `--space-4`
- Sheet panel padding: `--space-3` x / `--space-4` y
- List row padding: `--space-3` y / `--space-4` x
- Stack gap inside cards: `--space-3`
- Major section gap: `--space-5` to `--space-7`

---

## Radius

| Token | Px | Use |
|---|---|---|
| `--radius-xs` | 4 | Code, small chips |
| `--radius-sm` | 6 | Inline tags, badges, small cards |
| `--radius-md` | 10 | Buttons, inputs |
| `--radius-lg` | 14 | Cards |
| `--radius-xl` | 20 | Sheets, board container, hero cards |
| `--radius-2xl` | 28 | Bottom sheets at large heights |
| `--radius-pill` | 999 | Pills, chips, transport, switches |
| `--radius-full` | 50% | Avatars, circular buttons |

---

## Elevation

5 levels, dark-mode-aware (dark uses heavier ambient + tighter key; light uses lighter, more diffused).

- `--shadow-1` — almost flat, hairline-style separation. Pressed buttons.
- `--shadow-2` — cards, toasts, dropdowns.
- `--shadow-3` — bottom sheets in motion, dock-sheet at rest.
- `--shadow-4` — modals, the most-elevated layer at rest.
- `--shadow-5` — emergency-only (drag-out picker, overlay focus modes).

Avoid `--shadow-4`+ except for genuinely floating elements. Most surfaces use `--shadow-1` or `--shadow-2`. `--shadow-inset` is used for input pills (search bar) to give them a subtle sunken look.

---

## Motion

Durations:
- `--motion-fast` 150ms — hover, tap, color flash
- `--motion-base` 220ms — toast in/out, scrim fade
- `--motion-slow` 320ms — sheet slide, page transition
- `--motion-slower` 480ms — decorative entrance only

Easings:
- `--ease-ios` `cubic-bezier(0.32, 0.72, 0, 1)` — sheets, scale presses, bottom-nav active state
- `--ease-material` `cubic-bezier(0.2, 0, 0, 1)` — content area transitions
- `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` — hover state recovery
- `--ease-in-out` — symmetric two-way states

`@media (prefers-reduced-motion: reduce)` collapses every animation to 0.001 ms. Press scale (`transform: scale(0.97)`) is the only motion we let through unchanged because it's instant tactile feedback, not a journey.

---

## Iconography

We use **Phosphor Icons (regular weight)** as our single set. Loaded once via CDN in `index.html`:

```html
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/index.js" defer></script>
```

Markup:

```html
<i class="ph ph-book-open-text icon" aria-hidden="true"></i>
```

`.icon` is a 20×20 box; `.btn--sm .icon` becomes 16, `.btn--lg .icon` becomes 24. Everything Phosphor renders is currentColor, so it inherits from text styling.

Never use emoji as icons. Emoji renders inconsistently across platforms and can't take a stroke or fill weight.

Icon picks (canonical for the app):

| Concept | Icon |
|---|---|
| Lessons | `book-open-text` |
| Openings / tree | `tree-structure` |
| Tactics | `lightning` |
| Endgames | `flag-checkered` |
| Master games | `trophy` |
| Play / analyze | `play-circle` |
| Engine / CPU | `cpu` |
| Hint | `lightbulb` |
| Solution / reveal | `eye` |
| Settings | `gear` |
| Search | `magnifying-glass` |
| Theme | `circle-half` |
| Back | `caret-left` |
| Disclosure | `caret-right` |
| Close / clear | `x` |
| Done / correct | `check` |

---

## Components

The full living catalog is `docs/design-system.html`. Below is the WHY for each.

### Buttons (`.btn`)

Variants: `--primary` / `--secondary` / `--tertiary` / `--ghost` / `--destructive`. Sizes: `--sm` 32 / default 44 / `--lg` 56. Modifiers: `--icon`, `--block`, `--fab`, `--round`. Loading state: `data-loading="true"`. All have a 0.97 scale press for tactile feedback, reduced-motion-aware. Focus-visible shows the ring.

Use `--primary` for the single most important action on the screen. Not for "Show solution" — that's `--secondary`. The "next puzzle" button at the bottom of the puzzle is `--primary`. A "destructive" button is for "Reset progress" — confirm in a dialog.

### Inputs (`.input`, `.select`, `.textarea`, `.search-field`, `.switch`, `.stepper`)

Inputs default to 16 px to prevent iOS focus zoom. `.field` wraps input + `__label` + `__hint` + `__error`. The `data-error="true"` flag flips border + ring to error tones. Search field is a pill with a leading icon and trailing clear button. Switch is a 51×31 iOS toggle with thumb scale.

### Cards (`.card`, `.track-card`, `.callout`)

`.card` has `--elevated` / `--outlined` / `--ghost` / `--hero` / `--interactive` modifiers. `.track-card` is the dashboard pattern: leading icon, title, meta, chevron. Per-track accent colors come from `data-track="…"`. `.callout` is the in-content tip: icon + title + body, with `--success/--warning/--error/--accent` variants.

### Lists (`.list-section`, `.list-row`)

iOS-style grouped list. Each `.list-row` has slots: `__leading`, `__main` (with `__title` + `__subtitle`), `__trailing`, `__chevron`. Status pills (`__status`) come in `--done` / `--current` / `--locked` / default. Hairline separators between rows are absolutely positioned to indent under the leading icon.

### Navigation (`.appbar`, `.bottom-nav`, `.tabs`, `.tabbar`)

App bar: translucent backdrop blur, scroll-aware (`is-scrolled` class adds a hairline + stronger blur when content scrolls under). Bottom nav: 4–5 tabs, glass-blurred, active state shifts color + tiny icon scale-up. `.tabs` is a horizontal pill scroller. `.tabbar` is the underline pattern (used inside content panels for tabs like Plans / Variations / Traps).

### Sheets (`.sheet`, `.dock-sheet`, `.modal`)

`.sheet` is the standard scrim+panel bottom sheet. `--snap-30/60/95` controls max-height. `.dock-sheet` is the always-mounted dockable variant (used for the engine pane in Play). `.modal` is full-screen.

### Chips, badges, tags, avatars

`.chip` is the interactive filter chip. `.badge` is a small pill for inline state. `.tag` is the quiet metadata pill (year, ECO code). `.avatar` is the initials chip for personality picker, with `--ring` for the selected state.

### Progress

`.progress` (linear) and `.ring` (circular) take `--progress-value` / `--ring-value` 0–1. The ring requires you to set `--ring-circumference` (matches `2π·r` of the circle in your SVG) — the style guide page shows the values for the 56/80 sizes.

`.criterion` is a single completion item. Adding `is-met` switches to a green check.

### Feedback

`.skeleton` for loaders (text, avatar, row, card, board variants). `.toast` for non-blocking feedback — mounted to `#toastHost` in index.html. `.empty` for no-content states. `.banner` for in-page notices.

### Transport (`.transport`, `.move-list`, `.eval-display`, `.eval-bar`)

`.transport` is the primary playback control bar. `.move-list` is the chess-move presentation primitive. The runtime should apply `.move-list__pair` / `__num` / `__move`, with `.is-current` and `.has-comment` modifiers. `.eval-display` for evaluation readout; `.eval-bar` for the vertical eval bar.

### Layout primitives (`.stack`, `.row`, `.dash-grid`, `.screen-split`, `.board-screen`)

`.stack-N` for vertical rhythm with N being the gap token. `.row` for inline+gap horizontal. `.dash-grid` for the 1/2/3-column dashboard layout. `.screen-split` for list+detail screens. `.board-screen` for board+side-panel screens (board fills width on mobile, splits at 1024).

---

## Theming

### Light/dark

`<html data-theme="dark">` (default) or `<html data-theme="light">`. The token override block in `design-system.css` flips surfaces and ramps. `prefers-color-scheme` is honored when `data-theme` isn't set.

The theme toggle in the app bar persists choice via `storage.setTheme()`.

### Board theme

`<html data-board-theme="ocean">` (or `"tournament"`, `"midnight"`, default). The `--board-light` / `--board-dark` / `--board-light-active` / `--board-dark-active` / `--board-coord-*` tokens get overridden. The board widget reads them — no rebuild needed.

To add a new board theme, add a block in `design-system.css`:

```css
[data-board-theme="myname"] {
  --board-light: …;
  --board-dark: …;
  --board-light-active: …;
  --board-dark-active: …;
}
```

Then add a row to the settings sheet (template `tpl-settings`) and persist the choice in `storage`.

---

## Accessibility

- **Contrast.** All text foreground/background pairings hit WCAG AA at body size. Verified manually + via the contrast in the style guide (the swatch labels render in either `--text-primary` with shadow or the soft variant's "on" color).
- **Focus.** `:focus-visible` shows a 2 px `--focus-ring` outline at offset 2 px on every interactive element. Buttons, list rows, chips, tabs, sheet links — all wired.
- **ARIA.** Icon-only buttons have `aria-label`. Toggleable buttons use `aria-pressed`. Active list rows use `aria-current="page"` (or `="true"` for non-pages).
- **Reduced motion.** `@media (prefers-reduced-motion: reduce)` collapses every animation/transition to ~0 ms. The board flash + scale-press are the only "instant" motions allowed through.
- **Reduced data / battery.** The engine pane has a clear "battery saver" warning inline, and Stockfish is only loaded when the user enables it.
- **System color scheme.** `prefers-color-scheme` honored when no manual override is set.
- **Tap targets.** 44 px minimum on every actionable element. Most rows are 56–72 px (iOS standard).
- **Dynamic Type.** Token sizes are in `px`; we don't need full Dynamic Type yet, but the type scale uses ratios so a future move to `rem` is one search-and-replace.
- **Visually hidden.** `.sr-only` for screen-reader-only labels.
- **Form labels.** Every input has either a visible `<label>` or an `aria-label`.

---

## Adding a component

1. Decide if it really needs a new component. Often it's a composition — `.card > .row > .stack` will do.
2. If new: add a file under `css/components/<name>.css`. One BEM-ish block per file.
3. Reference design-system tokens for every value. No magic numbers.
4. Add an `@import` to `css/main.css`.
5. Add a section to `docs/design-system.html` showing every variant + state.
6. Add a one-line entry under "Components" above describing the WHY.
7. If the runtime will render the component, document the class names in `docs/DESIGN_HOOKS.md` so the other session can apply them.

### Naming

Block-scoped: `.btn`, `.list-row`, `.card`. Element: double-underscore (`.list-row__title`). Modifier: double-dash (`.btn--primary`). State: a separate boolean class (`.is-active`) or `aria-*` selector (`[aria-pressed="true"]`). Never inline state in the variant ("`.btn--primary-pressed`" is wrong).

### Don'ts

- Don't add a component just because something on a screen looks wrong. Fix the screen first.
- Don't add new color ramps. Pick from the existing semantic tokens — if none fit, the design system is missing a semantic, not a color.
- Don't add new font sizes. Use the type scale.
- Don't write magic spacing. Use the 4-pt scale.
- Don't add a `:hover` without an `:active` and `:focus-visible` to match.
