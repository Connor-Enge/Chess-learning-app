# Design audit — pre-redesign baseline

Date: 2026-05-03 · Author: redesign session · Live URL: https://connor-enge.github.io/Chess-learning-app/

This is the snapshot of issues observed in the existing design before the redesign pass. Each finding is paired with the redesign target.

## High-level diagnosis

The app is *functional* but visually feels like an unstyled MVP rather than a polished mobile product. Specifically:

- **No real design system.** Tokens exist (`--bg-elev`, `--accent`) but are ad-hoc, not semantic. Type sizes are scattered across many `font-size: 14px / 13px / 12.5px` declarations. No spacing scale — magic numbers everywhere (`padding: 10px 14px`, `margin: 14px 0`). Radius values jump from 4 → 6 → 8 → 12 → 16 without rhythm.
- **iOS-native feel is absent.** No backdrop blur on app bar / bottom nav, no large-title pattern, no spring physics on the engine sheet, no haptic-style press feedback. Tab bar is a flat 60 px box with emoji icons.
- **Emoji-as-icon throughout.** The bottom tab bar uses 📚 ♙ ⚡ ♚ ⋯; the More sheet uses 🏠 🧠 ⚖️ 🏆 🧩. Renders inconsistently across iOS/Android, breaks weight/size harmony with text. No coherent icon set.
- **Buttons are a single visual.** Primary, secondary, destructive, icon-only — all share the `background: var(--bg-elev-2)` look. The "Mark complete" CTA gets `--accent`, but otherwise there's no hierarchy. No press scale / ripple, no focus ring.
- **Cards lack depth or grouping.** Track cards on the dashboard are 6 identical rectangles in a `1fr` grid on mobile — no progress visualization, no "continue learning" pinned card, no recent activity hierarchy.
- **List items are toolbar rows.** `#lessonIndex li` is a 12-px-padded row with a left-border accent for active state. Real iOS lists are grouped (rounded section background, internal hairline separators, 56–72 px row height, disclosure chevron, system metadata on right).
- **Bottom navigation feels desktop-port.** No glass blur, no animated indicator, no rest/active icon weights, mobile tab-label overlaps tap target on small phones. Active state is just a color change of the icon.
- **App bar is plain.** A flat 52-px bar with text title and 22 px ‹ ⌕ ◐ unicode glyphs. No collapsing large title, no scroll-blur, no animated back transition.
- **Sheets are abrupt.** The "More" sheet slide-up is 0.18s linear; no scrim ease, no drag handle physics, no snap points. Engine sheet is a CSS `transform: translateY(calc(100% - 48px))` toggle — works but feels mechanical.
- **No skeletons or empty states.** Lessons list shows raw `<ol>` until JS fills it. Tactics says "Loading puzzle…" plain text. Empty state for "no progress yet" is `<p class="muted">No activity yet…</p>` — no illustration, no CTA.
- **No toast / non-blocking feedback.** Saving a lesson, solving a puzzle, copying FEN — all silent or use `alert()` historically.
- **Form inputs are tolerable but generic.** 16 px font (correct), but no floating label, no clear button, no error helper, no focus ring beyond browser default.
- **Pills / chips are plain.** Tactics theme chips are 32-px-tall pills with 1-px border, no group separator, no scrolling-row affordance.
- **Color contrast.** `--muted: #6c7282` on `--bg-elev: #21242b` measures ≈ 4.2:1 — borderline AA for normal text, fails for body. `--text-dim: #98a0b0` is ≈ 6.0:1, OK. Light mode uses `--muted: #8a8f99` on `--bg-elev: #ffffff` ≈ 3.0:1 — fails AA for normal text.
- **No motion vocabulary.** A few animations exist (`fade-in 0.15s`, `slide-up 0.18s`, `sq-flash 0.5s`) but no shared easing/duration tokens. Reduced-motion is collapsed to `0.01s` for everything which is correct but blunt.
- **Board theming is hardcoded.** `--board-light: #ebd9b3 / --board-dark: #a07851` with no alternate themes, single set of unicode-glyph pieces (🨠 etc. via system font), no piece-set swap. Legibility on mobile is poor on dark backgrounds.
- **Typography hierarchy is shallow.** `h1: 22 / h2: 18 / h3: 16 / h4: 15 / body: 16` — only 6 px between h1 and h3. Display titles are missing entirely. Line-height is 1.55 globally including headers (too loose for 22-px h1).
- **No safe-area handling on the engine sheet body.** `padding: 16px` doesn't add `env(safe-area-inset-bottom)`. On iPhone, the home-indicator covers the bottom of the engine controls.
- **Tactics, Endgames, Games, Play views all have a bespoke layout** instead of sharing a "board + side panel" component. Fragments duplicate `flex-direction: column / gap: 14px / align-items: center`.

## Per-screen findings

### Dashboard
- Hero: missing "Continue learning" pinned card.
- Cards: 6 same-sized cards in a column on mobile. Should be 2 hero cards + 4 grid cards, with progress rings.
- Recent activity: literally a `<p class="muted">` empty state. Needs a real empty state component with illustration + CTA.
- Track icons are emoji.

### Lessons (list view)
- Toolbar at top: `<select>` for track + "☰ Lessons" toggle. Looks like a 2010 app.
- List panel is a `border + radius` box of `<li>` rows with check ticks via `:before { content: "✓ " }`. No grouped sections, no disclosure chevrons, no completion progress per section.
- Track tag pill is 10-px tiny — unreadable.

### Lesson view (detail)
- Sticky board panel works but the breakout `margin: 0 -12px` looks like a hack on small phones.
- Transport bar buttons are 38 px tall (below the 44 px tap target).
- Lesson cards (set-position, play-pgn, etc.) all share a left-border accent system but the colors are confusing (warn, accent, accent-2, text-dim).
- Quiz options are styled like buttons; should be radio-style cards.
- "Mark complete" CTA is correct shape but the criteria dots above are weak — needs a real progress indicator.

### Openings
- Tree uses native `<details>` + `<summary>` with custom `▸ ▾` glyphs. No piece icons, no opening preview, no plan tabs.
- Selected leaf gets a left border like the lesson list.
- Opening detail content (board + plans + variations) is stacked column-style with no visual hierarchy.

### Tactics
- Board fills width, status text below, controls below. Not bad, but the controls look like generic gray buttons.
- Stats row is functional but stat numbers in `--accent` blue clash with the puzzle's status feedback.
- Theme chips are inside a `<details>` collapsible — adds unnecessary friction.

### Endgames
- Same pattern as Tactics: board + buttons + explainer textbox.
- Drill list is identical to lessons list — fine, but underutilizes the side area.

### Games (Master Games)
- Move list as monospace text inline. Should be tabular `1. e4 e5 / 2. Nf3 Nc6` with hover/tap.
- Game metadata is a `<p class="muted">`; should be tag chips (year, players, opening, ECO).
- No thumbnail mini-board on the index list.

### Play / Analyze
- Board + buttons + engine bottom sheet. The engine handle is a single horizontal bar — works, but the FEN/PGN inputs inside are tight.
- No quick "set up start position" / "load PGN from clipboard" affordance.

### Search
- Full-screen overlay, plain `<input>` and a results list with `border-bottom` rows. No recent searches, no suggested searches, no result type icons.

### More sheet
- Vertical stack of buttons with emoji-prefixed labels. Not a real iOS sheet — no handle physics, no snap height.

## Accessibility gaps
- Light-mode body text on muted color fails WCAG AA.
- No visible focus ring on buttons (browser default, often invisible against `--bg-elev-2`).
- Many icon-only buttons have `aria-label` (good) but no surrounding state announcement when toggled.
- `prefers-color-scheme` is not honored — user must manually toggle.
- Dynamic Type / Font scaling: most font sizes are `px` not `rem`, so a user setting larger system text sizes gets no benefit.

## Redesign success criteria

- [ ] WCAG AA contrast across all foreground/background pairings, dark + light.
- [ ] Real iOS HIG-style components: grouped lists, large-title app bar, blurred bottom nav, snap-point bottom sheets.
- [ ] Single icon set (Phosphor) replacing every emoji.
- [ ] Coherent type scale (`--text-caption…--text-display`) and 4-pt spacing scale (`--space-1…--space-9`).
- [ ] Press states with subtle scale (0.97), reduced-motion-aware.
- [ ] All board themes + piece sets switchable from settings.
- [ ] Skeleton loaders for every list, empty states for every "nothing here" surface.
- [ ] Toast pattern for non-blocking feedback.
- [ ] Live, browseable style guide at `/docs/design-system.html`.

## Boundary respected

This pass does not touch `js/lesson/`, `js/engine/`, `js/practice/`, `content/`, `js/data/`, lesson runtime code. New CSS class names that the runtime needs to apply are documented in `docs/DESIGN_HOOKS.md`.
