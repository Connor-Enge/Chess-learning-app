// Reference lesson — ENDGAME modality.
// Technique-driven: the canonical Lucena's Position with bridge-building.
// Each beat validated by validate-lessons.mjs. We use position-anchored callouts
// rather than scripting every move (Lucena's exact move sequence is sensitive
// to king geometry; the puzzles drill the actual moves).

export const LESSONS_REF_LUCENA = [{
  id: 'end-ref-lucena',
  title: "Lucena's Position: how to win R+P vs R",
  track: 'endgame',
  order: 99,
  estimatedMinutes: 14,
  objective: "Win the canonical R+P vs R endgame using the bridge-building technique. Recognize Lucena and execute it without a tablebase.",
  tags: ['lucena', 'endgame', 'rook', 'reference'],
  next: 'end-004-philidor',

  // Canonical Lucena (Dvoretsky setup): White Kc8, Pc7, Re2. Black Ka6, Rh1.
  startFen: '2K5/2P5/k7/8/8/8/4R3/7r w - - 0 1',

  script: [
    // ─── Opening — what Lucena is ───────────────────────────────────────────
    { kind: 'text', md: "## Why Lucena matters\n\n**Lucena's Position** is the canonical winning technique for King + Rook + Pawn vs King + Rook. Every player at every level needs to know it cold — it comes up dozens of times across a chess career, and getting it wrong turns a winning endgame into a draw.\n\nThe defining features:\n\n- Your pawn is on the **7th rank** (one move from promoting)\n- Your king is **in front of the pawn**, on the 8th rank (so the pawn can't promote yet — the king blocks it!)\n- The **enemy king is cut off** from the pawn's file by your rook\n- An enemy rook is harassing from the side\n\nThe winning technique is called **building a bridge.** Five careful moves. Once you know the pattern, it's mechanical." },

    // ─── Show the position ──────────────────────────────────────────────────
    { kind: 'callout', square: 'c7', text: "White's c-pawn is one square from queening — but the white king is on c8 in the way.", color: 'green', durationMs: 4500 },
    { kind: 'callout', square: 'c8', text: "Why is the white king there? Because it had to occupy c8 earlier to prevent Black from sacrificing the rook for the pawn. Now it's blocking its own pawn — and that's the problem we have to solve.", color: 'yellow', durationMs: 6000 },
    { kind: 'callout', square: 'a6', text: "Black's king is cut off on the queenside, far from where the action is.", color: 'yellow', durationMs: 4000 },
    { kind: 'callout', square: 'h1', text: "Black's rook waits on h1, ready to check the white king the moment it tries to step off c8.", color: 'red', durationMs: 5000 },
    { kind: 'pause', ms: 2000 },

    // ─── The naive try ──────────────────────────────────────────────────────
    { kind: 'text', md: "## The naive plan — and why it fails\n\nThe instinct is: \"just walk the king out.\" Let's see what happens.\n\nIf White plays **Kd7**, Black plays **Rd1+**. White plays **Ke6**, Black plays **Re1+**. White plays **Kf6**, Black plays **Rf1+**. The king runs, the rook follows, checking forever. Eventually the white king is so far from the c-pawn that Black's rook can simply capture it.\n\nThe problem: the white rook is doing nothing useful. It needs to come to the 4th rank where it can **block a check** at the right moment. That blocking-rook is the bridge." },

    // ─── Step 1 — Re4 (the staging move) ────────────────────────────────────
    { kind: 'text', md: "## Step 1 of the bridge: Re4\n\nFirst, get the rook to the 4th rank. From e2, that's just **Re4**. The rook is now waiting on the 4th rank — its job will become clear in a few moves.\n\nWhy the 4th rank? Because once the white king is on the 6th rank later, the rook on the 4th can interpose against a check from the 1st or 2nd rank. The interposing rook will be defended by the king — the bridge spans those two ranks." },

    { kind: 'arrow', from: 'e2', to: 'e4', color: 'green' },

    { kind: 'your-move',
      san: 'Re4',
      hint: "Move the rook from e2 to the 4th rank — Re4. This is the staging move that makes the bridge possible.",
      wrongHint: "Re4. Get the rook to the 4th rank first; THEN start walking the king. Order matters — if you walk the king first, you have no shelter from the checks.",
      rightExplain: "Re4! The first step of the bridge. The rook now sits where it can interpose later. Notice we did NOT move the king first — the rook needs to be in position before the king walk starts." },

    { kind: 'pause', ms: 1500 },
    { kind: 'clear-shapes' },

    // ─── Show the next position (after a few moves) ─────────────────────────
    { kind: 'text', md: "## Fast-forward — the bridge moment\n\nAfter Re4, Black plays a waiting move. Then White starts the king walk: **Kd7**, Black checks **Rd1+**, White goes **Ke6**, Black checks **Re1+**.\n\nNow comes the magic move. White's rook on e4 interposes: **Re4 stays on e4 — wait, the rook is already there. Black's rook is now on e1, attacking the white king on e6.** The white rook on e4 is between them, blocking the check. Bridge!" },

    // Set up the bridge-moment position directly
    { kind: 'set-position', fen: '8/2P5/k3K3/8/4R3/8/8/4r3 b - - 0 1', orientation: 'white' },
    { kind: 'callout', square: 'e6', text: "White king on e6.", color: 'green', durationMs: 2800 },
    { kind: 'callout', square: 'e4', text: "White rook on e4 — interposing between the king and the checking rook.", color: 'green', durationMs: 4000 },
    { kind: 'callout', square: 'e1', text: "Black's rook checks from e1. But the e4 rook blocks the check, AND is defended by the white king on e6.", color: 'yellow', durationMs: 5500 },
    { kind: 'pause', ms: 2200 },

    { kind: 'text', md: "Black has only two real choices:\n\n1. **Take the rook with Rxe4+** — but then White recaptures with **Kxe4**, the black rook is gone, and the white king escorts the c-pawn home unopposed.\n2. **Move the rook elsewhere** — but then Black has no checks left, and White just plays Kf7 (or Kd7), pushes the c-pawn, and queens it.\n\nEither way, White wins. That's the bridge — the rook on the 4th rank is a *toll booth* for the king's escape, and Black's rook can't get past without dying." },

    { kind: 'text', md: "## Step-by-step — the full bridge in 5 moves\n\nIf you remember nothing else, remember this:\n\n1. **Re4** (or Rd4 / Rb4 / Ra4 depending on which side your pawn is) — rook to the 4th rank\n2. **Kd7** (or Kb7) — start king walk\n3. After Black checks **Rd1+**, play **Ke6**\n4. After Black checks **Re1+**, build the bridge with the rook already on the 4th rank — interpose!\n5. Black either trades rooks (and loses) or runs out of checks. Either way, you queen the pawn.\n\nMemorize the order. The rook MOVES FIRST. Walking the king without preparing the rook is the most common Lucena error." },

    // ─── End-of-lesson puzzles ──────────────────────────────────────────────
    {
      kind: 'puzzle',
      fen: '2K5/2P5/k7/8/8/8/4R3/7r w - - 0 1',
      solution: ['Re4'],
      themes: ['lucena', 'endgame'],
      prompt: "**Puzzle 1.** Lucena starting position. White to move. Find the FIRST step of the bridge.",
      explain: "Re4 — get the rook to the 4th rank. This is the staging move. Without it, the king walk fails to perpetual checks. Always Re4 (or whichever 4th-rank square is appropriate) first."
    },
    {
      kind: 'puzzle',
      fen: '2K5/2P5/k7/8/4R3/8/8/7r b - - 0 1',
      solution: ['Rh4'],
      themes: ['lucena', 'endgame'],
      prompt: "**Puzzle 2.** Lucena, Black to move after White's Re4. Black tries to attack the rook with Rh4. (Plays for simplification.) White will need to respond.",
      explain: "Rh4 — Black tries to swap rooks. White's reply is the key: White just plays Kd7 anyway, accepting the rook trade because the trade leaves K+P vs K, which is winning for White."
    },
    {
      kind: 'puzzle',
      fen: '8/2P5/k3K3/8/4R3/8/8/4r3 w - - 0 1',
      solution: ['c8=Q+'],
      themes: ['lucena', 'endgame', 'promotion'],
      prompt: "**Puzzle 3.** White is just one move from promoting. Find it.",
      explain: "c8=Q+ — promote the c-pawn to a queen with check. This is the position after Black's Rxe4+ Kxe4 and a few more moves to consolidate. The point: once the white king is off c8 and the rook supports the pawn, queening is automatic."
    },
    {
      kind: 'puzzle',
      fen: '8/8/8/4K3/4R3/8/4r3/4k3 w - - 0 1',
      solution: ['Kd5'],
      themes: ['endgame'],
      prompt: "**Puzzle 4.** A simpler R+P vs R type — king opposition. White to move, find the king move.",
      explain: "Kd5 — taking the opposition. In rook endings, king activity often matters more than rook activity. Whenever your king can step toward a key square without losing material, do it."
    },
    {
      kind: 'puzzle',
      fen: '8/2P5/3K4/k7/4R3/8/8/3r4 w - - 0 1',
      solution: ['Rd4'],
      themes: ['lucena', 'endgame'],
      prompt: "**Puzzle 5.** Black has just checked with …Rd1. Build the bridge.",
      explain: "Rd4 — interpose the rook between the checking rook and the king. Black can take with Rxd4 but then Kxd4 ends the threats and the c-pawn promotes."
    },
  ],
}];
