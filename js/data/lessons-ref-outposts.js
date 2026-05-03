// Reference lesson — POSITIONAL modality.
// Quiet, judgment-based: identifying outposts, planting knights on them, and
// preventing the opponent from doing the same. Validated by validate-lessons.mjs.

export const LESSONS_REF_OUTPOSTS = [{
  id: 'pos-ref-outposts',
  title: 'Outposts: where knights become monsters',
  track: 'positional',
  order: 99,
  estimatedMinutes: 14,
  objective: "Identify outpost squares for your knights, work to occupy them, and prevent the opponent from getting one.",
  tags: ['outpost', 'positional', 'knight', 'reference'],
  next: 'pos-008-good-bad-bishop',

  startFen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 0 1',

  script: [
    // ─── Concept: what an outpost actually is ───────────────────────────────
    { kind: 'text', md: "## What is an outpost?\n\nAn **outpost** is a square in your opponent's half of the board where:\n\n1. You can put a piece — usually a knight — and\n2. **No enemy pawn can ever attack it.**\n\nThe second condition is what makes the outpost special. A knight on a regular square can be challenged, traded off, or pushed back. A knight on an outpost is *permanent*. It just sits there, controlling key squares, choking the position, until something dramatic changes the structure.\n\nThe canonical outpost squares are **d5, e5, c5, f5** for White and **d4, e4, c4, f4** for Black — the central squares one rank into enemy territory. But any square in enemy territory that pawns can't challenge counts." },

    { kind: 'text', md: "## How to identify an outpost\n\nLook at any square in the opponent's half. Ask:\n\n- **Can the c-, e- (or whichever flanking) pawn ever push to attack it?** If both flanking pawns have already advanced past, or are blocked / committed elsewhere, the square is an outpost.\n- **Is there a friendly pawn defending the square?** Bonus — that makes the knight on the outpost truly untouchable.\n\nA classic example: the d5 square in the Carlsbad Exchange QGD. Black's c-pawn is on c6 and the e-pawn is on e6. After …c6 commits, only …e6-e5 can ever challenge a d5 knight, and that push usually weakens too much else for Black to play it. So d5 becomes a permanent outpost for White." },

    // ─── Spot the outposts in a real position ───────────────────────────────
    { kind: 'set-position', fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 0 1', orientation: 'white' },
    { kind: 'callout', square: 'd5', text: "Look at d5. Black has pawns on c6 and e6. Neither can ever challenge a White knight on d5 — c6 can only push to c5, e6 can only push to e5. Neither would be a pawn that *attacks* d5. So d5 is an outpost.", color: 'green', durationMs: 6000 },
    { kind: 'highlight', squares: ['d5'], color: 'green' },
    { kind: 'pause', ms: 2000 },
    { kind: 'callout', square: 'd4', text: "And d4 is a *Black* outpost in the same way. White's c-pawn is on c2 (could push to c3 or c4 — c3 doesn't attack d4) and the e-pawn is on e3 (could push to e4 — also doesn't attack d4 from that square). So d4 is permanent for Black… well, a Black piece would be safe there.", color: 'yellow', durationMs: 6500 },
    { kind: 'pause', ms: 2200 },
    { kind: 'clear-shapes' },

    // ─── Plant a knight on the outpost ──────────────────────────────────────
    { kind: 'text', md: "## How to occupy an outpost\n\nOnce you've identified an outpost square, ask: **how do I get my knight to it?** Often it takes 2–3 moves of repositioning. That's fine — outposts pay rent for the rest of the game.\n\nFrom this position, White's c3 knight wants to go to d5. The path: Nc3 → e2 → … hmm, e2 isn't on the way. The cleanest route is **Nc3-e2-g3-f5**? No, the goal is d5. Actually the most direct route: **Nc3-d1-e3-d5** or **Nc3-b1-d2-… **. \n\nSometimes the simplest move is the best: **Nb1-d2** then **Nf3-e1-d3-?** is too slow. Let me show you the actual cleanest path." },

    { kind: 'arrow', from: 'c3', to: 'd5', color: 'green' },
    { kind: 'callout', square: 'd5', text: "Goal: knight to d5. The c3 knight can hop directly: from c3 it CAN reach d5 via the L-jump (c3 → d5: file +1, rank +2 — yes, legal knight move).", color: 'green', durationMs: 5000 },
    { kind: 'pause', ms: 1500 },
    { kind: 'clear-shapes' },

    // First your-move checkpoint — play the outpost-occupying move
    { kind: 'your-move',
      san: 'Nxd5',
      hint: "What's the cleanest way to put a knight on d5? The c3 knight can reach d5 directly. But there's a Black pawn on d5 — does it matter?",
      wrongHint: "The c3 knight jumps to d5 with a capture: Nxd5. That removes Black's central pawn AND parks the knight on the outpost. Bonus: it forces a recapture, after which White still has the second knight to send to d5.",
      rightExplain: "Nxd5! White takes Black's d-pawn and lands on the outpost square. After Black recaptures (cxd5 or Nxd5), White can push pieces toward d5 again — this position is structurally winning the d5-square battle." },

    { kind: 'pause', ms: 1500 },
    { kind: 'play-move', san: 'Nxd5', explain: "Black recaptures, but the d5 square is now the focus of the game." },
    { kind: 'pause', ms: 1500 },

    // ─── Prevent the opponent's outpost ─────────────────────────────────────
    { kind: 'text', md: "## Preventing outposts: the prophylactic side\n\nKnowing what an outpost is also tells you how to **prevent your opponent from getting one**. The trick is to keep one of the flanking pawns mobile so it can challenge any enemy piece that lands on the would-be outpost.\n\nIn the original Carlsbad: Black's main defensive idea against the d5 outpost is to keep the option of …c5 alive. If Black plays …c5 at the right moment, it threatens to take on d4, opens the c-file, and crucially attacks the d4-d5 area — making it harder for White to plant a knight on d5 permanently.\n\n**Rule of thumb:** when you see your opponent eyeing a square as an outpost, look for the pawn move that would *attack* that square, and ask whether you can make that push happen — even if the push is otherwise positionally undesirable, denying the outpost may be worth it." },

    { kind: 'text', md: "## A second example: the d4 outpost for Black\n\nLet's flip perspective. Black's c-knight wants to land on d4. From the original position, after some piece play, the structure becomes:" },

    { kind: 'set-position', fen: '2rq1rk1/pp1bbppp/2nppn2/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R b KQ - 0 1', orientation: 'black' },
    { kind: 'callout', square: 'd4', text: "White has a knight on d4 — a strong central post. But can Black's c6 knight come to e4 in retaliation?", color: 'yellow', durationMs: 4500 },
    { kind: 'arrow', from: 'f6', to: 'e4', color: 'green' },
    { kind: 'callout', square: 'e4', text: "Yes! Black's f6 knight can hop to e4. But notice: White's c-pawn is on c2 (could push to c3 to defend d4 from below, but doesn't attack e4) and White's f-pawn is on f2 (could push to f3 — that would attack e4!). So e4 is a *temporary* outpost for Black.", color: 'yellow', durationMs: 6500 },
    { kind: 'pause', ms: 2500 },

    { kind: 'your-move',
      san: 'Nxe4',
      hint: "Black to move. Get the f6 knight to the central square e4 — it grabs White's e-pawn AND occupies a strong central post.",
      wrongHint: "Nxe4! From f6 the knight captures the e-pawn AND parks on a strong central square.",
      rightExplain: "Nxe4! Black's knight goes to e4 with a free pawn AND control of a critical square. White will probably try to challenge with f3 — and at that moment Black has to decide whether to retreat or trade. The fact that f3 is *available* makes e4 a less-permanent outpost than d5 was." },

    { kind: 'pause', ms: 2000 },
    { kind: 'clear-shapes' },

    // ─── Wrap-up + scanning routine ─────────────────────────────────────────
    { kind: 'text', md: "## Your scanning routine\n\nEvery middlegame, run this scan:\n\n1. **Walk through the squares in your opponent's half (3rd, 4th, 5th, 6th rank from your perspective).** For each one, ask: can any enemy pawn ever attack this square? If no — it's an outpost candidate.\n2. **For each outpost candidate, ask: which of my knights can get there in 1–3 moves?** Plan the route.\n3. **Mirror the analysis for your opponent.** What outposts do they have, and which of THEIR knights are headed there? Your defensive job is to either block the outpost square or keep a pawn flexible enough to challenge it.\n\nKnights on outposts are the single most concrete positional advantage a club player can engineer. Most strategic chess at the intermediate level is about who gets the better outposts." },

    // ─── End-of-lesson puzzles (verified positions) ─────────────────────────
    {
      kind: 'puzzle',
      fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 0 1',
      solution: ['Nxd5'],
      themes: ['outpost'],
      prompt: "**Puzzle 1.** Carlsbad-style structure. White to move. Make the move that wins the d5 outpost.",
      explain: "Nxd5 — the c3 knight jumps to the outpost square, taking a pawn along the way. After …Nxd5 (or …cxd5), white still has the f3 knight to redeploy to d5 over a few moves, OR white has just won a clean pawn. Either way, the d5 square is now the focus of the game in white's favor."
    },
    {
      kind: 'puzzle',
      fen: 'r1bq1rk1/pp1nbppp/2n1p3/2pp4/3PN3/4PN2/PPP1BPPP/R1BQK2R w KQ - 0 1',
      solution: ['Ng3'],
      themes: ['outpost'],
      prompt: "**Puzzle 2.** White to move. Find the simple move that *prepares* an outpost on f5.",
      explain: "Ng3 — the e4 knight reroutes via g3 toward f5, the natural outpost square once Black's f-pawn is committed. Sometimes the right move is preparation, not occupation. The knight wants to land on f5; first you have to get it pointed there."
    },
    {
      kind: 'puzzle',
      fen: '2rq1rk1/pp1bbppp/2nppn2/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R b KQ - 0 1',
      solution: ['Nxe4'],
      themes: ['outpost'],
      prompt: "**Puzzle 3.** Black to move. Take the central square AND the central pawn.",
      explain: "Nxe4! Black's knight grabs both the e4 pawn AND a strong central square. The fact that White can challenge with f3 makes e4 a temporary outpost rather than permanent — but the immediate gain (a pawn + activity) is worth it."
    },
    {
      kind: 'puzzle',
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1',
      solution: ['Nd5'],
      themes: ['outpost', 'fork'],
      prompt: "**Puzzle 4.** Italian-style position. White to move. Plant the knight on the outpost.",
      explain: "Nd5! The c3 knight goes to d5, an outpost square that Black can't easily challenge. From d5 the knight attacks Nf6 and Bc7 indirectly. After …Nxd5 White recaptures with the bishop or pawn and dominates the center."
    },
    {
      kind: 'puzzle',
      fen: 'r2q1rk1/pp1bppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 1',
      solution: ['Nd5'],
      themes: ['outpost'],
      prompt: "**Puzzle 5.** White to move. Find the outpost move.",
      explain: "Nd5! The c3 knight (or the d4 knight depending on configuration) lands on d5. Both Black's c-pawn (on c6) and e-pawn (on e7) are blocked from challenging — d5 is a permanent post. From d5 the knight controls 8 squares deep in Black's position; this is the kind of move that wins games slowly."
    },
  ],
}];
