// Reference lesson — TACTICS modality.
// Synchronized text + board + arrows + callouts + your-move checkpoints.
// Every script beat is FEN/SAN-validated by scripts/validate-lessons.mjs.

export const LESSONS_REF_KNIGHT_FORK = [{
  id: 'tac-ref-knight-fork',
  title: 'Knight forks: the L-jump that wins games',
  track: 'tactics',
  order: 99,
  estimatedMinutes: 12,
  objective: "Recognize knight-fork patterns at sight — the royal fork, the family fork, and the geometric scan.",
  tags: ['fork', 'knight', 'tactics', 'reference'],
  next: 'tac-deep-002-pawn-fork',

  startFen: '4k3/8/8/3N4/8/8/2K5/8 w - - 0 1',

  script: [
    // ─── Concept: the L-jump and what makes it special ──────────────────────
    { kind: 'text', md: "## Why knights fork\n\nThe knight is the only piece that *jumps over* other pieces, and it attacks **8 squares** in a perfect L-shape. The 8 targets are *non-adjacent to each other* — and that's the whole secret of the fork.\n\nNo other piece can attack two unrelated squares from one position. Bishops attack along one diagonal. Rooks along one rank or file. Queens combine those two — but always along straight lines. A knight on d5 attacks c7 and e3 simultaneously, and they share no obvious relationship. That's where the magic happens." },

    { kind: 'highlight', squares: ['c7','b6','b4','c3','e3','f4','f6','e7'], color: 'green' },
    { kind: 'callout', square: 'd5', text: "From d5 the knight attacks 8 squares (the green markers). None of them are next to each other — which is why two distant enemy pieces can be hit at once.", color: 'yellow', durationMs: 5000 },
    { kind: 'pause', ms: 1500 },
    { kind: 'clear-shapes' },

    // ─── The royal fork — Nf6+! ─────────────────────────────────────────────
    { kind: 'text', md: "## The royal fork — Nf6+!\n\nWhen the enemy king and queen sit two-knight-jumps apart, you plant the knight between them with check. Black has to move the king; you take the queen on the next move.\n\nHere's the canonical position:" },

    { kind: 'set-position', fen: '4k3/8/8/3N3q/8/8/2K5/8 w - - 0 1', orientation: 'white' },
    { kind: 'callout', square: 'e8', text: "Black king on e8 — undefended.", color: 'yellow', durationMs: 2500 },
    { kind: 'callout', square: 'h5', text: "Black queen on h5 — also undefended.", color: 'yellow', durationMs: 2800 },
    { kind: 'pause', ms: 1200 },
    { kind: 'arrow', from: 'd5', to: 'f6', color: 'green' },
    { kind: 'callout', square: 'f6', text: "Watch f6. The d5 knight can hop there in one move. From f6 the knight attacks e8 (check on the king) AND attacks h5 (the queen).", color: 'yellow', durationMs: 5000 },
    { kind: 'pause', ms: 1500 },
    { kind: 'clear-shapes' },

    // First your-move checkpoint — find Nf6+
    { kind: 'your-move',
      san: 'Nf6+',
      hint: "The knight is on d5. Find the square that gives check to the king on e8 AND attacks the queen on h5.",
      wrongHint: "Look at the d5 → f6 jump. From f6 the knight gives check on e8 AND simultaneously attacks the queen on h5.",
      rightExplain: "Nf6+! Check on the king from f6, AND the knight attacks the queen on h5 from the same square. Black has to move the king out of check; then white plays Nxh5 and wins the queen." },

    { kind: 'callout', square: 'f6', text: "The knight attacks BOTH e8 (check) and h5 (queen) from one square. The king must move, then white takes the queen.", color: 'green', durationMs: 4500 },
    { kind: 'pause', ms: 2000 },
    { kind: 'play-move', san: 'Kd8', explain: "Black moves the king out of check. The queen on h5 has no defender." },
    { kind: 'pause', ms: 1200 },
    { kind: 'play-move', san: 'Nxh5', explain: "And the queen falls. White is up a queen for a knight — overwhelming material advantage." },
    { kind: 'pause', ms: 2200 },

    // ─── The geometric pattern in words ─────────────────────────────────────
    { kind: 'text', md: "## The pattern to spot\n\nWhenever you see an enemy king and queen, mentally draw a knight's L-jump between them. If a square exists where your knight can land and attack one with check while threatening the other — and the knight will *survive* on that square — you've found a winning fork.\n\nThe most common forking squares vs an uncastled king on e8 are **f6, d6, c7, and f7**. Memorize these — they come up dozens of times in real games. If your knight can reach any of those squares and there's an enemy piece you can hit from there, look for the fork." },

    // ─── The family fork — K + R simultaneously ─────────────────────────────
    { kind: 'text', md: "## The family fork — winning a rook\n\nA \"family\" fork hits king + queen + rook all at once. Even hitting just king + rook from one square is enough to win the rook (since the king must move first). Look:" },

    { kind: 'set-position', fen: 'r3k3/8/8/8/3N4/8/8/4K3 w - - 0 1', orientation: 'white' },
    { kind: 'callout', square: 'e8', text: "King on e8.", color: 'yellow', durationMs: 2200 },
    { kind: 'callout', square: 'a8', text: "Rook on a8 — undefended.", color: 'yellow', durationMs: 2500 },
    { kind: 'pause', ms: 1000 },
    { kind: 'arrow', from: 'd4', to: 'c6', color: 'green' },
    { kind: 'callout', square: 'c6', text: "From d4 the knight hops to c6. From c6 it attacks both e8 (king, with check) AND a8 (rook).", color: 'green', durationMs: 4500 },
    { kind: 'pause', ms: 1800 },
    { kind: 'clear-shapes' },

    // Your-move checkpoint #2
    { kind: 'your-move',
      san: 'Nc6+',
      hint: "Find the knight square that attacks the king on e8 AND the rook on a8 in one jump. Knight is on d4.",
      wrongHint: "From d4 the knight can reach b3, b5, c2, c6, e2, e6, f3, f5. Which of those attacks both e8 (king) and a8 (rook)?",
      rightExplain: "Nc6+! Check from c6 attacks the king on e8 AND the rook on a8. Black has to move the king; then Nxa8 wins the rook." },

    { kind: 'callout', square: 'c6', text: "Black must move the king. After any king move, Nxa8 wins the rook. Net gain: a whole rook for nothing.", color: 'green', durationMs: 4500 },
    { kind: 'pause', ms: 2200 },

    // ─── How to scan for forks during a real game ───────────────────────────
    { kind: 'text', md: "## How to scan for knight forks during a game\n\nEvery turn, while it's your move, run this 10-second mental check:\n\n1. **List the enemy's undefended pieces.** The king is always \"exposed\" for fork purposes — moving him just lets you grab the other piece.\n2. **For each pair of those pieces, mentally draw a knight's L between them.** Is there a square that attacks both?\n3. **Can my knight reach that square in one move?** And critically, **will my knight survive on that square?**\n\nThis takes practice. The puzzles below will sharpen the pattern. Play a few rapid games while consciously running this scan and you'll start spotting forks instantly." },

    { kind: 'text', md: "## Wrap-up\n\n**Knight forks come from one geometric idea: the L-jump attacks 8 non-adjacent squares.** Whenever an enemy king is exposed and any other piece sits within knight reach, check whether you have a forking move.\n\nThe puzzles below drill the pattern. Solve at least 3 to mark this lesson complete." },

    // ─── End-of-lesson puzzles (verified by validate-lessons.mjs) ───────────
    {
      kind: 'puzzle',
      fen: '4k3/8/8/3N3q/8/8/2K5/8 w - - 0 1',
      solution: ['Nf6+','Kd8','Nxh5'],
      themes: ['fork'],
      prompt: "**Puzzle 1.** White to move. The textbook royal fork.",
      explain: "Nf6+ — same pattern from earlier in the lesson. Check from f6 attacks the king on e8; the queen on h5 is taken next move."
    },
    {
      kind: 'puzzle',
      fen: 'r3k3/8/8/8/3N4/8/8/4K3 w - - 0 1',
      solution: ['Nc6+'],
      themes: ['fork'],
      prompt: "**Puzzle 2.** White to move. Win the rook with a knight check.",
      explain: "Nc6+ forks the king on e8 and the rook on a8. After any king move, Nxa8 picks up the rook."
    },
    {
      kind: 'puzzle',
      fen: '7k/6pp/8/6N1/8/8/8/6K1 w - - 0 1',
      solution: ['Nf7+','Kg8','Nh6+','Kh8','Nf7+'],
      themes: ['fork','perpetual'],
      prompt: "**Puzzle 3.** White's knight bouncing near the cornered king. Find the perpetual.",
      explain: "Nf7+ Kg8 Nh6+ Kh8 Nf7+ — perpetual check. The knight bounces between f7 and h6, both giving check; the king is forced to oscillate between g8 and h8. This is the same geometric pattern as Philidor's smothered mate, without the queen sacrifice. Useful as a *drawing* resource when you're worse but have a knight near the enemy king."
    },
    {
      kind: 'puzzle',
      fen: '6rk/5ppp/8/4N3/8/8/8/6K1 w - - 0 1',
      solution: ['Nf7#'],
      themes: ['smothered-mate','fork'],
      prompt: "**Puzzle 4.** White to play and mate in 1.",
      explain: "Nf7# — smothered mate. The Black king on h8 is hemmed in by its own rook on g8 and its own pawns on g7/h7. The knight on f7 gives check; the king has nowhere to run. Whenever you see a king cornered with its own pieces blocking the escape squares, look for a knight check that delivers mate."
    },
    {
      kind: 'puzzle',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
      solution: ['Bxf7+','Kxf7','Ng5+'],
      themes: ['fork','sacrifice','exposed-king'],
      prompt: "**Puzzle 5.** Greco's pattern. White to move — find the sacrifice + fork.",
      explain: "Bxf7+ Kxf7 Ng5+ — the bishop sacrifice rips open the king, then Ng5+ forks the king and creates threats against h7. Whenever the f7 pawn is defended only by the king and your bishop on c4 stares at it, look for this combination."
    },
  ],
}];
