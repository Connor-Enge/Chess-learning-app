# Mobile interaction audit (post-deploy)

iPhone 14 viewport (390×844), Chromium with iOS Safari UA, isMobile=true,
hasTouch=true, deviceScaleFactor=2. Live URL: https://connor-enge.github.io/Chess-learning-app/

Each screen scrolled through 0/400/800/1200/end with screenshots saved
under `docs/design-screenshots/interaction/`. Layout maps + contrast
samples in `findings.json` at the same path.

---

## Verdict

**Scrolling itself works** on every screen (audit confirmed: scroll-1200
reaches Y=1200, scroll-end reaches actual end-of-page). The bottom nav
respects safe-area, no fullscreen overlay blocks scrolls, no element has
`position: fixed; inset: 0; pointer-events: auto`.

**What's broken** is what the user *sees while scrolling*:

1. **Lesson text is barely visible** — the lesson-player applies
   `.lp-text-card { opacity: 0.45; filter: grayscale(0.3) }` to ALL text
   cards by default. They only become opaque when "revealed" by the
   auto-play loop. If you don't press Play (and Connor won't — he scrolls
   to read), every paragraph appears washed out and gray.
2. **Board appears to hover** — the sticky `.lp-board-panel` is INSIDE
   `#lessonContent`, which itself is a rounded card with a 1px border.
   The card stays in normal flow and scrolls; the board sticks at top.
   The visual effect: the card's border + dark background scroll up
   *behind* the board, while the board stays put — which reads as
   "board hovering disconnected from layout".
3. **Text strip above the board** — when scrolled, a horizontal slice of
   text is briefly visible BETWEEN the bottom of the app bar (h=41 in
   audit) and the top of the sticky board panel (top=56). Gap = 15px.
   Feels like "text bleeding around the board".
4. **The lessons-list route auto-mounts a lesson player** — `#lessons`
   without a param shows the first lesson's chessground player rather
   than a list of lessons. Confusing for first-time users; could be
   what Connor meant by "I scroll and nothing shows" — he scrolls
   expecting a list and instead gets the same large board pinned at
   top regardless of scroll.
5. **Contrast** is fine (everything passes WCAG AA, body text and
   headlines pass AAA). The "barely visible" complaint is the lp-text-card
   opacity, not contrast per se.
6. **Z-index** is clean. App bar 20, bottom nav 20, lesson-board-panel 6,
   chessground internals 2-9, callouts 10-12. No conflicts.

---

## Per-screen findings

### Dashboard
- Total page height: 1243px. Viewport 844. Max scrollY = 399. **Scrolls fine.**
- Shows hero card → 6 track cards → "Recent activity" section with
  empty-state. All visible, all icons render, all contrast AAA on body.
- No sticky/fixed elements except app bar (sticky 0) + bottom nav (fixed 780).
- **Verdict: clean.** No fixes needed.

### Lessons list (`#lessons`)
- Total page height: 4326px. Scrolls fine to end=3482.
- The route AUTO-RENDERS the first lesson's player (legacy view dispatcher
  picks up `loadLesson(undefined)` → first lesson). So this is
  effectively the lesson-player view in disguise.
- Inherits all the lesson-player issues below.

### Lesson player (`#lessons/tac-ref-knight-fork`) — **the problem screen**
- Total page height: 4413px. Scrolls fine to end=3569.
- Layout (rect at scroll-0):
  - `appbar` y=0, h=**41** ← actual rendered, NOT the 56px declared as `--appbar-h`
  - `lp-board-panel` sticky, top: 56, y=130, h=465
  - `cg-board` y=138, w=368, h=368
  - `bottom-nav` fixed, y=780, h=64
- Sticky offset (56) > app bar height (41) → 15px text-strip leaks above
  the board on scroll.
- `.lp-text-card` opacity 0.45 + grayscale 0.3 = visually faded
  paragraph text. **This is "text barely visible".**
- `#lessonContent` card has 1px border + padding around the lp-board-panel.
  When sticky, the card border continues to scroll while the board
  stays put. **This is "board hovering".**

### Openings list / Opening detail / Tactics / Endgames / Master Games / Play
- All scroll correctly to their natural end.
- All have appropriate sticky/fixed layers (just app bar + bottom nav).
- Tactics + Endgames + Play render the chessground board cleanly inside
  the existing `*-board-wrap` cards (which have `border-radius: --radius-xl`
  and contain the board with proper padding — so no breakout/disconnect
  there).
- Contrast is AAA on body, AA on muted/captions and inactive bottom-nav
  labels (5.55–5.98).

---

## Root causes

### "Text is barely visible"

`css/lesson-player.css` lines 174–183:
```css
.lp-text-card {
  opacity: 0.45;
  filter: grayscale(0.3);
  transition: opacity 0.25s ease, filter 0.25s ease, border-color 0.25s ease;
}
.lp-text-card.lp-revealed {
  opacity: 1;
  filter: none;
  border-color: var(--accent);
}
```

Intent: progressive narration — cards fade in as the play loop reveals
them. Reality: if user reads before pressing Play, everything is faded.

### "Board keeps hovering"

`css/lesson-player.css` lines 13–25:
```css
.lp-board-panel {
  position: sticky;
  top: calc(var(--appbar-h) + var(--safe-top));
  z-index: 6;
  background: var(--bg);
  margin: 0 -12px;          /* breakout */
  padding: 8px 12px 10px;
  border-bottom: 1px solid var(--border);
  ...
}
```

`#lessonContent` (in `css/main.css`):
```css
.lesson-content { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-4); ... }
```

The sticky board panel breaks out -12px of its parent's 16px padding, so
the chessground extends past the card's `border-radius` corners. As the
parent card scrolls, the corner border crosses the board's edge.

### 15px text-strip above board on scroll

App bar's RENDERED height is 41px (icons + 12px padding L/R, no extra
vertical padding makes it shrink to icon height). The board's sticky
`top: 56` was sized to `--appbar-h` (which is 56px). So board sticks
15px below the bottom of the app bar.

### Lessons-list route auto-mounts lesson player

`js/views/lessons.js` calls `loadLesson(undefined || firstLesson)` when
no param. Has been the behavior since the original commit. Confusing
when scrolling — the user expects a list.

---

## Fixes (in order of impact)

### 1. Default `.lp-text-card` to opacity 1 (remove the grayscale gate)

The auto-play reveal effect can keep working — JUST flip the default so
text is readable on first load. When the play loop runs it can apply a
SUBTLE highlight (e.g. a brief border-color flash) instead of unfading
the text from 0.45.

### 2. Move sticky board OUT of the lesson-content card

When `.lp-root` mounts inside `#lessonContent`, neutralize the card's
border + padding so the board panel sits directly on the page background.
The breakout `margin: 0 -12px` becomes unnecessary; the board fits
flush.

### 3. Match sticky offset to actual app bar height

Either pin the app bar to a guaranteed 56px min-height, OR use the
`--appbar-h` token throughout consistently and ensure a tall icon row
inside it. Cleanest: tighten `--appbar-h` to 44px (matches actual
content) and use `top: 44px` for the sticky board.

### 4. (Optional, lower-priority)

Move auto-mounting first-lesson off bare `#lessons` and instead show
the lessons list with a hero "Continue" card. That requires runtime work;
defer.

---

## Re-audit checklist after fix

- [ ] Lesson text readable on first paint (no opacity fade)
- [ ] Board sticky cleanly to top of viewport (no thin card-border above)
- [ ] No text strip visible between app bar and board on scroll
- [ ] Z-index audit unchanged (no new conflicts)
- [ ] Contrast still AA+ on every text sample
- [ ] Scroll sequences verified: 0 → 400 → 800 → 1200 → end on each screen
- [ ] Send Connor a screenshot at scroll-800 of the lesson player
