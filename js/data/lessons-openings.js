// LESSONS_OPENINGS — META lessons about openings (the "Openings" lesson track).
// Migrated to the chessground-script schema (see lessons-ref-knight-fork.js).
// Each lesson teaches HOW to think about openings; encyclopedic theory lives in
// the Opening Explorer (js/data/openings.js).

export const LESSONS_OPENINGS = [
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "op-001-principles",
    title: "The three opening principles",
    track: "opening",
    order: 1,
    estimatedMinutes: 12,
    objective: "Apply control-the-centre, develop, king-safety — and know when each rule deserves to be broken.",
    tags: ["opening", "fundamentals"],
    next: "op-002-repertoire",

    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

    script: [
      // ─── Concept ────────────────────────────────────────────────────────
      { kind: 'text', md: "## The three rules\n\nAlmost all opening theory is a footnote on three ideas. Ignore them and you get a bad position before move ten. Obey them mechanically and you miss every gambit. The point of this lesson is to *internalise* them so you can break them on purpose.\n\n1. **Control the centre** — pawns or pieces that influence d4, e4, d5, e5.\n2. **Develop your pieces** — knights before bishops, generally.\n3. **Castle early** — king safety first." },

      // Highlight the four central squares on the starting position.
      { kind: 'highlight', squares: ['d4','e4','d5','e5'], color: 'green' },
      { kind: 'callout', square: 'e4', text: "These four squares are the centre. Whoever influences them controls where the pieces go for the next 20 moves.", color: 'green', durationMs: 4500 },
      { kind: 'pause', ms: 1500 },
      { kind: 'clear-shapes' },

      // ─── Walk through the Italian Pianissimo move-by-move ───────────────
      { kind: 'text', md: "## Watch the Italian Pianissimo\n\nThe Italian is a textbook execution of all three principles. Both sides claim a central pawn, develop minor pieces in a sensible order, and castle by move four. We'll play through it; pay attention to *why* each move is principled." },

      { kind: 'play-move', san: 'e4', explain: "1.e4 — White plants a pawn in the centre and frees the queen and the f1-bishop in one move. Maximum opening efficiency." },
      { kind: 'pause', ms: 800 },
      { kind: 'play-move', san: 'e5', explain: "1...e5 — Black mirrors. Symmetric central claim; both sides know the rules." },
      { kind: 'highlight', squares: ['e4','e5'], color: 'green' },
      { kind: 'callout', square: 'e4', text: "Both central pawns staring at each other. Whoever supports their pawn better gets the better game.", color: 'green', durationMs: 3500 },
      { kind: 'pause', ms: 1500 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'Nf3', explain: "2.Nf3 — develops a piece, attacks Black's e5 pawn, and prepares to castle. *Knights before bishops* in action." },
      { kind: 'arrow', from: 'f3', to: 'e5', color: 'red' },
      { kind: 'callout', square: 'e5', text: "The knight attacks e5. Black has to defend it — and the natural defender is also a developing move.", color: 'yellow', durationMs: 4000 },
      { kind: 'pause', ms: 1500 },
      { kind: 'clear-shapes' },

      // First your-move checkpoint — Nc6
      { kind: 'your-move',
        san: 'Nc6',
        hint: "Black to move. White's knight attacks e5. Defend the pawn with a developing move that follows the principles (knights before bishops).",
        wrongHint: "There's a move that defends e5 AND develops a piece toward the centre AND prepares ...d5. It's the *knight* — knights before bishops.",
        rightExplain: "Nc6! Three principled jobs at once: defends e5, develops a piece, and supports a future ...d5 break. The bishop will come out next, *after* the knight." },

      { kind: 'play-move', san: 'Bc4', explain: "3.Bc4 — White's bishop comes to the most active square it has, eyeing the f7 pawn (the weakest square in Black's camp) and preparing to castle." },
      { kind: 'arrow', from: 'c4', to: 'f7', color: 'red' },
      { kind: 'callout', square: 'f7', text: "Always notice when a bishop targets f7 (or f2 vs White). It's the most fragile square because only the king defends it.", color: 'yellow', durationMs: 4500 },
      { kind: 'pause', ms: 1500 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'Bc5', explain: "3...Bc5 — Black mirrors with the same idea, eyeing f2." },
      { kind: 'play-move', san: 'O-O', explain: "4.O-O — White castles on move four. Exemplary king safety. The king is now tucked into the corner; the rook joins the action on f1." },
      { kind: 'highlight', squares: ['g1','f1'], color: 'green' },
      { kind: 'callout', square: 'g1', text: "King safe in the corner, rook activated. This is what 'castle early' looks like.", color: 'green', durationMs: 3500 },
      { kind: 'pause', ms: 1500 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'Nf6', explain: "4...Nf6 — Black develops the second knight, attacking e4." },
      { kind: 'play-move', san: 'd3', explain: "5.d3 — Quiet support for the e4 pawn, opens the c1-bishop's diagonal. The 'piano' (quiet) approach." },
      { kind: 'play-move', san: 'd6', explain: "5...d6 — Symmetric and solid." },
      { kind: 'play-move', san: 'c3', explain: "6.c3 — A useful little move: prepares a future d3-d4 push and gives the bishop on c4 a retreat square at b3." },

      // Second your-move checkpoint — castle Black's king
      { kind: 'your-move',
        san: 'O-O',
        hint: "Black to move. Both knights are out, both bishops are developed, the centre is settled. There's exactly ONE more principled move to complete the opening.",
        wrongHint: "The king is still on e8. The third opening principle says...",
        rightExplain: "O-O! Both sides have completed the opening by move six. King is safe, all four minor pieces are out, the rook joins the game. From here it's a real middlegame — and neither side has lost a tempo." },

      { kind: 'callout', square: 'g8', text: "Both kings castled, both armies developed. This position is theoretically equal — but you got here by *understanding*, not memorising.", color: 'green', durationMs: 4500 },
      { kind: 'pause', ms: 2000 },
      { kind: 'clear-shapes' },

      // ─── When to break the rules ────────────────────────────────────────
      { kind: 'text', md: "## When to break the rules\n\n- **You CAN delay castling** when the centre is closed and the king is safer in the middle than committed to a side. A common King's Indian theme.\n- **You CAN move a piece twice** when it's attacked, or when a forcing tactic exists.\n- **You CAN ignore development for a tempo** when sacrificing for initiative — that's what gambits do.\n- **You CANNOT** chase a single pawn with the queen on move four while the minors stand at home. That's the *Scholar's Mate* family of self-destruction. The rule of thumb: bring the queen out late, *after* the minor pieces." },

      { kind: 'text', md: "## Wrap-up\n\nCentre, develop, castle. Three rules, two dozen famous openings, every game you'll ever play. Internalise the principles and you'll out-play opponents who memorised theory but never understood why.\n\nThe puzzles below test the principles in action. Solve at least 3 to mark this lesson complete." },

      // ─── End-of-lesson puzzles ──────────────────────────────────────────
      {
        kind: 'puzzle',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        solution: ['Nc6'],
        themes: ['opening','development'],
        prompt: "**Puzzle 1.** Black to move. White's knight attacks e5. Find the principled defence.",
        explain: "Nc6 — defends e5 AND develops AND supports a future ...d5. Knights before bishops, every time."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        solution: ['O-O'],
        themes: ['opening','king-safety'],
        prompt: "**Puzzle 2.** White to move. Three minors developed, the centre is fluid. Apply the third principle.",
        explain: "O-O — castle early. Both rooks unblocked next, king safe in the corner, ready for the middlegame. This is the textbook Italian move-order."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 2 3',
        solution: ['Bc4'],
        themes: ['opening','development'],
        prompt: "**Puzzle 3.** White to move. Knight is out, Black has defended e5 with Nc6. Develop the bishop.",
        explain: "Bc4 — the Italian Game. Bishop takes its most active diagonal, targets f7, prepares to castle. Bb5 (Spanish) is also excellent — both are principled. The point: develop the bishop *after* the knight, to its best square."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3',
        solution: ['Nf3'],
        themes: ['opening','development'],
        prompt: "**Puzzle 4.** Vienna Game position. White to move. Develop the second knight to its best square.",
        explain: "Nf3 — attacks e5, develops, prepares castling. Even when you've started with a less common move (2.Nc3 instead of 2.Nf3), the principles still rule: get the second knight out toward the centre."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        solution: ['O-O'],
        themes: ['opening','king-safety'],
        prompt: "**Puzzle 5.** Spanish (Ruy López) position, White to move. Both knights out, the bishop is on b5. Finish the opening properly.",
        explain: "O-O — exactly the same idea as the Italian. Castle on move four whenever it's available; the rook on f1 joins the game and the king is out of the centre before any files open."
      }
    ]
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    id: "op-002-repertoire",
    title: "Choosing your repertoire",
    track: "opening",
    order: 2,
    estimatedMinutes: 14,
    objective: "Pick openings that match your style; understand width vs depth; cover both colours sensibly.",
    tags: ["opening", "strategy"],
    next: "op-003-how-to-study",

    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

    script: [
      // ─── Concept ────────────────────────────────────────────────────────
      { kind: 'text', md: "## A repertoire is a *small* toolkit\n\nA repertoire is a small set of openings you actually know — not a library you've heard of, a toolkit you've used. The most common amateur mistake is **breadth without depth**: 20 openings, 5 moves deep each, every game out of book by move 6 with no plan.\n\nTwo openings deep beats twenty openings shallow. Pick one White system and one defence to each of 1.e4 / 1.d4, learn them properly, and you're set." },

      { kind: 'text', md: "## Classical vs hypermodern, 1.e4 vs 1.d4\n\n- **1.e4 — open games.** Sharp, tactical, lots of forcing lines. Italian, Spanish, Scotch as White; Sicilian, French, Caro-Kann, Petroff as Black. Suits players who like calculation.\n- **1.d4 — closed/semi-closed games.** Slower manoeuvring, structural play. QGD, Slav, Nimzo-Indian, King's Indian, Grünfeld. Suits players who like strategy.\n- **Hypermodern (Réti, English, KIA).** Let Black occupy the centre, then strike at it from the flanks. Suits patient players.\n- **Flank openings (1.b3, 1.g3).** Surprise weapons; light on theory, heavy on understanding.\n\nMatch the opening to *yourself*, not to the latest super-GM." },

      // ─── Walk through Caro-Kann Classical — model 1.e4 defence ─────────
      { kind: 'text', md: "## Watch a model Black repertoire move: the Caro-Kann\n\nThe Caro-Kann is a representative \"as Black vs 1.e4\" choice for solid players. We'll walk through the Classical Variation — and the *idea* of the opening is more important than the exact moves. Pay attention to where the bishop on c8 ends up." },

      { kind: 'play-move', san: 'e4', explain: "1.e4 — White claims the centre." },
      { kind: 'play-move', san: 'c6', explain: "1...c6 — the Caro-Kann. Black prepares ...d5 with pawn support, avoiding the heavy theory of the Sicilian and the bad bishop of the French." },
      { kind: 'play-move', san: 'd4', explain: "2.d4 — White takes the full centre." },
      { kind: 'play-move', san: 'd5', explain: "2...d5 — challenging the centre with full pawn support." },
      { kind: 'play-move', san: 'Nc3', explain: "3.Nc3 — develops, attacks d5." },
      { kind: 'play-move', san: 'dxe4', explain: "3...dxe4 — Black accepts the exchange." },
      { kind: 'play-move', san: 'Nxe4', explain: "4.Nxe4 — and now the critical Caro moment for Black." },

      { kind: 'highlight', squares: ['c8'], color: 'yellow' },
      { kind: 'arrow', from: 'c8', to: 'f5', color: 'green' },
      { kind: 'callout', square: 'f5', text: "The whole point of the Caro-Kann: the c8-bishop gets out BEFORE Black plays ...e6. In the French, this bishop is locked behind its own pawns. Here it goes to f5, active and free.", color: 'green', durationMs: 6000 },
      { kind: 'pause', ms: 2000 },
      { kind: 'clear-shapes' },

      // First your-move — Bf5
      { kind: 'your-move',
        san: 'Bf5',
        hint: "Black to move. The whole point of the Caro is to develop the c8-bishop OUTSIDE the pawn chain before playing ...e6. Where does it go?",
        wrongHint: "The bishop wants to come to f5 — its most active diagonal. From there it eyes the white kingside and supports Black's structure. The French Defence's main weakness is having this bishop locked in behind ...e6; the Caro fixes it.",
        rightExplain: "Bf5! Knowing this *plan* — \"get the bishop out before ...e6\" — is more valuable than memorising 15 moves of the Najdorf. This is what \"depth\" means: you understand the opening's purpose." },

      { kind: 'play-move', san: 'Ng3', explain: "5.Ng3 — kicks the bishop and gains a tempo. Standard." },
      { kind: 'play-move', san: 'Bg6', explain: "5...Bg6 — bishop retreats but stays active on the b1-h7 diagonal." },
      { kind: 'play-move', san: 'h4', explain: "6.h4 — White probes, threatening h5 to chase the bishop further." },
      { kind: 'play-move', san: 'h6', explain: "6...h6 — necessary preparation; Black makes a luft for the bishop on h7." },
      { kind: 'play-move', san: 'Nf3', explain: "7.Nf3 — natural development." },
      { kind: 'play-move', san: 'Nd7', explain: "7...Nd7 — Black develops the queenside knight, supporting a future ...Ngf6 and ...c5." },
      { kind: 'play-move', san: 'h5', explain: "8.h5 — kicking the bishop one more time." },
      { kind: 'play-move', san: 'Bh7', explain: "8...Bh7 — the bishop's final home. It looks passive but it's a real piece behind the pawn wall." },

      { kind: 'callout', square: 'h7', text: "Black has no weaknesses, no exposed pieces, a clear plan: ...e6, ...Ngf6, ...Bd6 or ...Be7, ...O-O, then ...c5. *That* is depth — you know what you're doing for 20 more moves.", color: 'green', durationMs: 5500 },
      { kind: 'pause', ms: 2000 },

      // Second your-move — develop a piece (Ngf6) — chooses the natural Caro plan
      { kind: 'play-move', san: 'Bd3', explain: "9.Bd3 — White develops, offers the bishop trade." },
      { kind: 'play-move', san: 'Bxd3', explain: "9...Bxd3 — Black happily trades; the h7-bishop's job was to come out before ...e6, not to win the game." },
      { kind: 'play-move', san: 'Qxd3', explain: "10.Qxd3 — recapture." },
      { kind: 'play-move', san: 'e6', explain: "10...e6 — only NOW does the e-pawn move, after the c8-bishop has already escaped. Compare this to the French." },
      { kind: 'play-move', san: 'Bd2', explain: "11.Bd2 — White prepares O-O-O." },

      { kind: 'your-move',
        san: 'Ngf6',
        hint: "Black to move. Develop the kingside knight to its best square.",
        wrongHint: "The kingside knight wants to come to f6 — natural development, eyes e4, prepares ...Be7 + ...O-O. (The 'g' disambiguation is needed because the Nd7 knight could also go to f6.)",
        rightExplain: "Ngf6! Knight to its best square; ...Be7 and ...O-O follow. Black has finished the opening with no weaknesses, an active bishop trade behind them, and a clear middlegame plan. This is what a complete opening understanding feels like." },

      { kind: 'pause', ms: 1500 },

      // ─── Cover both colours ─────────────────────────────────────────────
      { kind: 'text', md: "## Cover both colours\n\nA complete repertoire needs four pieces:\n\n- One opening as **White** (e.g. 1.e4 → Italian + an anti-Sicilian + lines vs Caro/French).\n- One reply to **1.e4 as Black** (Caro-Kann, French, Sicilian, e4 e5, Petroff).\n- One reply to **1.d4 as Black** (QGD, Slav, KID, Nimzo+QID, Grünfeld).\n- One reply to **everything else** (vs 1.Nf3, 1.c4, 1.b3 — usually transposes to one of the above).\n\nThat's it. Four openings, learned deeply. Most flank openings transpose into one of the four; you don't need a separate system for every White first move." },

      { kind: 'text', md: "## Style cheat sheet\n\n- **Tactical / aggressive:** 1.e4; Sicilian, King's Indian, Grünfeld.\n- **Positional / strategic:** 1.d4 or 1.c4; Caro-Kann, French, QGD, Slav, Catalan.\n- **Solid / drawish:** 1.d4 London System; Petroff, Berlin Wall, QGD Lasker.\n- **Surprise / dynamic:** Scotch, Vienna; Albin, Benko, Sveshnikov.\n\nIf you hate calculating long forced lines, do not play the Najdorf because Magnus does. If you fall asleep in slow positions, do not pick the London. Match the opening to the player." },

      // ─── End-of-lesson puzzles ──────────────────────────────────────────
      {
        kind: 'puzzle',
        fen: 'rnbqkbnr/pp2pppp/2p5/8/4N3/8/PPPP1PPP/R1BQKBNR b KQkq - 0 4',
        solution: ['Bf5'],
        themes: ['opening','repertoire'],
        prompt: "**Puzzle 1.** Caro-Kann, after 4.Nxe4. Find the move that defines the opening.",
        explain: "Bf5 — get the c8-bishop out BEFORE ...e6. This is the entire point of the Caro: solving the French Defence's bad-bishop problem."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqkb1r/pp2pppp/3p1n2/2pP4/2P5/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
        solution: ['e4'],
        themes: ['opening','repertoire'],
        prompt: "**Puzzle 2.** Benoni-style. White to move — claim the full centre.",
        explain: "e4 — White builds a big pawn centre with d5 + e4 + c4. This is the principled response to ...c5: don't get pushed around, claim the most space possible."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
        solution: ['Nxe5'],
        themes: ['opening','petroff'],
        prompt: "**Puzzle 3.** Petroff Defence. White to move — there's a tactical try here.",
        explain: "Nxe5 — White grabs the pawn. This is the main line of the Petroff. Black recaptures with ...d6 (not ...Nxe4??, which loses to the famous Marshall trap Qe2)."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
        solution: ['Nc3'],
        themes: ['opening','french'],
        prompt: "**Puzzle 4.** French Defence. White to move — develop with central tension.",
        explain: "Nc3 — the main-line French. White develops AND defends e4. Other tries (3.Nd2 Tarrasch, 3.e5 Advance) are also playable; Nc3 is the principled developing move that keeps all of White's options open."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
        solution: ['Nf3'],
        themes: ['opening','sicilian'],
        prompt: "**Puzzle 5.** Sicilian Defence. White to move — start the Open Sicilian setup.",
        explain: "Nf3 — preparing 3.d4. This is the gateway to the Open Sicilian (the heaviest theory in chess). If you'd rather avoid that, 2.c3 (Alapin) or 2.Nc3 (Closed Sicilian) are completely respectable anti-Sicilian choices for the repertoire-minded player."
      }
    ]
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    id: "op-003-how-to-study",
    title: "How to study an opening",
    track: "opening",
    order: 3,
    estimatedMinutes: 13,
    objective: "Study openings IDEAS-FIRST; use your own games as the curriculum; care more about resulting structure than move-12 theory.",
    tags: ["opening", "study-method"],
    next: "op-004-traps",

    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

    script: [
      // ─── Concept ────────────────────────────────────────────────────────
      { kind: 'text', md: "## Ideas before moves\n\nMost opening study is wasted because it's *move memorisation* divorced from understanding. You memorise 14 moves; your opponent plays the 4th-best move on move 6; you have no idea what to do because you never learned the *plans*.\n\nFor every opening you adopt, write down on one page:\n\n- The **pawn structure** it usually produces (IQP? Carlsbad? Maróczy? Closed centre?).\n- The **typical pawn breaks** for both sides (e.g. ...c5, ...e5, ...f5, ...b5).\n- **Where each minor piece belongs** (knights, bishops — what's their best square?).\n- **The middlegame plan** (minority attack? king-side storm? blockade the IQP?).\n- **The endgame implications** (who's better if queens come off on move 14?)." },

      // ─── Walk through QGD Exchange — Carlsbad structure ────────────────
      { kind: 'text', md: "## Watch a structure being born: the Carlsbad\n\nThe QGD Exchange Variation produces the *Carlsbad* pawn structure — and the entire game from move 7 onwards is about that structure. We'll play through it; the moves matter less than the resulting pawn formation." },

      { kind: 'play-move', san: 'd4', explain: "1.d4 — Queen's pawn opening." },
      { kind: 'play-move', san: 'd5', explain: "1...d5 — the classical reply." },
      { kind: 'play-move', san: 'c4', explain: "2.c4 — the Queen's Gambit." },
      { kind: 'play-move', san: 'e6', explain: "2...e6 — the Queen's Gambit Declined. Black supports d5 with the e-pawn." },
      { kind: 'play-move', san: 'Nc3', explain: "3.Nc3 — adds pressure on d5." },
      { kind: 'play-move', san: 'Nf6', explain: "3...Nf6 — natural development, defends d5 a third time." },

      { kind: 'play-move', san: 'cxd5', explain: "4.cxd5 — White voluntarily resolves the central tension. This is the Exchange Variation, and the whole point is the structure that arises." },
      { kind: 'play-move', san: 'exd5', explain: "4...exd5 — Black recaptures with the e-pawn (forced, basically)." },

      { kind: 'highlight', squares: ['c6','d5','d4','e3'], color: 'yellow' },
      { kind: 'callout', square: 'd5', text: "The Carlsbad is born. White will play e3 and have pawns on d4/e3; Black will play c6 and have pawns on c6/d5. *This* is what you study — not the move order.", color: 'yellow', durationMs: 6000 },
      { kind: 'pause', ms: 2000 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'Bg5', explain: "5.Bg5 — pin the f6 knight, eye potential trades on d5." },
      { kind: 'play-move', san: 'c6', explain: "5...c6 — Black completes the Carlsbad pawn structure." },

      { kind: 'highlight', squares: ['a2','b2','c6','d5'], color: 'green' },
      { kind: 'arrow', from: 'b2', to: 'b4', color: 'green' },
      { kind: 'arrow', from: 'b4', to: 'b5', color: 'green' },
      { kind: 'callout', square: 'b5', text: "White's plan now: the *minority attack*. Two pawns (a, b) march to attack three (a, b, c) — eventually b5xc6, leaving Black with a weak isolated c-pawn. This is THE entire strategic point of 4.cxd5.", color: 'green', durationMs: 7000 },
      { kind: 'pause', ms: 2500 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'e3', explain: "6.e3 — solid support for d4." },
      { kind: 'play-move', san: 'Be7', explain: "6...Be7 — develop." },
      { kind: 'play-move', san: 'Bd3', explain: "7.Bd3 — bishop takes its best diagonal." },
      { kind: 'play-move', san: 'Nbd7', explain: "7...Nbd7 — quiet development; the knight is heading to f8 then g6 (the famous Black manoeuvre in this structure)." },

      // First your-move — castle
      { kind: 'your-move',
        san: 'Qc2',
        hint: "White to move. Connect the rooks, prepare to castle either side, and indirectly support a future b2-b4 push (the minority attack).",
        wrongHint: "Qc2 is the textbook move: lifts the queen off d1 onto a useful square, prepares O-O-O or O-O, and looks at h7 in case Black drops the guard. This is preparation for the minority attack.",
        rightExplain: "Qc2! Multipurpose queen lift. Now O-O is one move away, the minority attack (b2-b4-b5) is on the horizon, and the queen is off the back rank. *Knowing this whole plan* matters more than the exact move." },

      { kind: 'play-move', san: 'O-O', explain: "8...O-O — Black castles." },
      { kind: 'play-move', san: 'Nf3', explain: "9.Nf3 — natural." },
      { kind: 'play-move', san: 'Re8', explain: "9...Re8 — rook to the open file? Not yet, but it's a developing move." },
      { kind: 'play-move', san: 'O-O', explain: "10.O-O — White castles kingside (sometimes O-O-O is preferred to support the b-pawn push, but kingside is the main line)." },
      { kind: 'play-move', san: 'Nf8', explain: "10...Nf8 — the *minor piece dance* begins. Black's plan: Nf8-Ng6, Bd6, ...h6/g5 for kingside counterplay (or ...Ne4 for central play)." },

      // Second your-move — Black's principled move
      { kind: 'your-move',
        san: 'Rab1',
        hint: "White to move. Where does the queen-side rook belong if you're planning the minority attack b2-b4-b5?",
        wrongHint: "Rab1 — the rook supports the future b-pawn push. White's whole queenside is now coordinated for the minority attack: Qc2, Rab1, b2-b4-b5xc6.",
        rightExplain: "Rab1! Now b2-b4-b5xc6 is fully prepared. White is following a clear, well-known plan; Black has their own plan (kingside attack). Both sides are 'in book' even though no one is memorising specific moves — they're following structural plans." },

      { kind: 'pause', ms: 2000 },

      // ─── Use your own games ─────────────────────────────────────────────
      { kind: 'text', md: "## Use your own games\n\n**The single most useful opening study you can do:** annotate your own losses and find the move you went out of book. *That* move tells you what to study next. The encyclopaedic line you don't need is the one your opponents never play. Spend your study budget on positions *you actually reach*.\n\nA player who annotates one of their own losses per week, identifies the move where they ran out of plan, and studies that single position will improve faster than a player who watches 10 hours of opening videos." },

      { kind: 'text', md: "## Memorise structure, not novelties\n\nIf you forget the move-12 novelty you can reconstruct it from the plan. If you forget the plan, no amount of memorised novelties will save you.\n\n**Plan > moves.** Always." },

      // ─── End-of-lesson puzzles ──────────────────────────────────────────
      {
        kind: 'puzzle',
        fen: 'r1bq1rk1/pp1nbppp/2p2n2/3p2B1/3P4/2NBP3/PPQ2PPP/R3K1NR w KQ - 0 9',
        solution: ['Nf3'],
        themes: ['opening','structure'],
        prompt: "**Puzzle 1.** Carlsbad structure. White to move — develop the last minor piece toward its natural square.",
        explain: "Nf3 — the kingside knight's natural home, supporting d4 and preparing to castle. Once both knights and both bishops are on natural squares, you can start the minority attack with Rab1 and b2-b4."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqk2r/pp1n1ppp/2pbpn2/8/3P4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 0 8',
        solution: ['O-O'],
        themes: ['opening','development'],
        prompt: "**Puzzle 3.** Carlsbad-style position. White to move — finish the opening.",
        explain: "O-O — same answer, same reason. In structural openings the moves are obvious *because* the structure tells you what to do. You're not memorising; you're applying principles."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR b KQkq - 0 4',
        solution: ['O-O'],
        themes: ['opening','nimzo'],
        prompt: "**Puzzle 4.** Nimzo-Indian after 4.e3. Black to move — keep the most flexibility.",
        explain: "O-O — castle and stay flexible. Black hasn't committed to ...c5, ...d5, ...b6 or ...Bxc3 yet. Castling first preserves *all* the typical Nimzo plans (Hübner, Classical, Queen's-Indian-ish). Move-order matters as much as moves."
      },
      {
        kind: 'puzzle',
        fen: 'rn1qk2r/pp2bppp/2p1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 b kq - 0 7',
        solution: ['O-O'],
        themes: ['opening','king-safety'],
        prompt: "**Puzzle 5.** Carlsbad, Black to move. Finish development the principled way.",
        explain: "O-O — castle. From here Black can play ...Re8, ...Nf8-g6, ...Bd6 — the standard Black plan in the Carlsbad. The pattern: in any structural opening, complete king safety before starting plans."
      }
    ]
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    id: "op-004-traps",
    title: "Opening traps to know — and avoid",
    track: "opening",
    order: 4,
    estimatedMinutes: 15,
    objective: "Recognise classic opening traps from both sides so you neither fall in nor miss them.",
    tags: ["opening", "tactics", "traps"],
    next: "op-005-transitions",

    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

    script: [
      // ─── Concept ────────────────────────────────────────────────────────
      { kind: 'text', md: "## Why traps matter\n\nTraps aren't a serious way to win — strong players defuse them in seconds. But two facts make them worth a lesson: (1) club opponents fall into them constantly, and (2) *you* will too if you don't know them.\n\nEach trap has a clear *signal* — once you spot it, you avoid it forever. We'll walk through Légal's Mate move by move, then survey the others." },

      // ─── Walk through Légal's Mate ──────────────────────────────────────
      { kind: 'text', md: "## Légal's Mate — the granddaddy\n\nWhite sacrifices the queen to mate with three minor pieces. The signal: **a pinned knight is not actually pinned if breaking the pin gives mate**. Watch:" },

      { kind: 'play-move', san: 'e4', explain: "1.e4 — standard." },
      { kind: 'play-move', san: 'e5', explain: "1...e5 — standard." },
      { kind: 'play-move', san: 'Nf3', explain: "2.Nf3 — develop." },
      { kind: 'play-move', san: 'd6', explain: "2...d6 — Philidor Defence; solid but a bit passive." },
      { kind: 'play-move', san: 'Bc4', explain: "3.Bc4 — bishop on its best diagonal." },
      { kind: 'play-move', san: 'Bg4', explain: "3...Bg4?! — Black 'pins' the f3 knight against the queen. Looks safe — moving the knight would lose the queen, right?" },

      { kind: 'arrow', from: 'g4', to: 'd1', color: 'red' },
      { kind: 'callout', square: 'f3', text: "The knight on f3 looks pinned: if it moves, ...Bxd1 wins the queen.", color: 'red', durationMs: 4500 },
      { kind: 'pause', ms: 2000 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'Nc3', explain: "4.Nc3 — develop and prepare the trap." },
      { kind: 'play-move', san: 'g6', explain: "4...g6?? — too slow. Black should defuse the threat, e.g. with ...Nf6 first. This move walks straight into the trap." },

      { kind: 'highlight', squares: ['f7','d5'], color: 'red' },
      { kind: 'callout', square: 'f7', text: "Watch carefully: White is about to play Nxe5! breaking the 'pin', because if ...Bxd1 then Bxf7+ Ke7 Nd5# is checkmate.", color: 'red', durationMs: 6500 },
      { kind: 'pause', ms: 3000 },
      { kind: 'clear-shapes' },

      // Your-move — find Nxe5 (the queen sac)
      { kind: 'your-move',
        san: 'Nxe5',
        hint: "White to move. Black's bishop on g4 is 'pinning' your knight — but the pin is FALSE because moving the knight enables a forced mate. Find the move that grabs the e5-pawn and ignores the 'pin'.",
        wrongHint: "Nxe5! The knight grabs e5, breaking the pin. If Black greedily takes the queen with ...Bxd1, White plays Bxf7+ Ke7 Nd5#. The 'pin' was an illusion all along.",
        rightExplain: "Nxe5! The setup. Black's best is now ...Nxe5 (giving back the pawn but losing the bishop), but they almost always grab the queen with ...Bxd1?? — and then the mate flows." },

      { kind: 'play-move', san: 'Bxd1', explain: "5...Bxd1?? — greedy. Black takes the queen, expecting to be up material. Now the trap closes." },
      { kind: 'play-move', san: 'Bxf7+', explain: "6.Bxf7+ — check! The king has no good square. Kd7 walks into Nd5+/Ne6+, ...Ke7 is forced." },
      { kind: 'play-move', san: 'Ke7', explain: "6...Ke7 — only legal-ish move." },
      { kind: 'play-move', san: 'Nd5#', explain: "7.Nd5# — Légal's Mate. Three minor pieces deliver checkmate while Black's queen never moved. The 'pin' that wasn't a pin." },

      { kind: 'callout', square: 'e7', text: "Mate. The lesson: a piece is only *truly* pinned if breaking the pin doesn't give immediate mate or win material. Always check the consequences before relying on a pin.", color: 'green', durationMs: 6000 },
      { kind: 'pause', ms: 2500 },

      // ─── Fried Liver Attack — survey + your-move for the safe side ─────
      { kind: 'text', md: "## Fried Liver Attack — Italian Two Knights\n\nThe trap White wants: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 **Nxd5?** 6.Nxf7! Kxf7 7.Qf3+ — Black's king is dragged to e6 and the position is brutally lost.\n\nThe signal: any time White's knight on g5 hits f7 with extra support, recapturing on d5 with the knight is asking for trouble. The safe move is **5...Na5** (Polerio Defence), giving back the pawn cleanly." },

      { kind: 'set-position', fen: 'r1bqkb1r/ppp2ppp/2n2n2/3Pp1N1/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 5', orientation: 'black' },

      { kind: 'highlight', squares: ['f7'], color: 'red' },
      { kind: 'arrow', from: 'g5', to: 'f7', color: 'red' },
      { kind: 'arrow', from: 'c4', to: 'f7', color: 'red' },
      { kind: 'callout', square: 'f7', text: "TWO white pieces target f7. If Black plays the natural Nxd5, then 6.Nxf7 sacrifices the knight to drag the king to f7 and the attack wins. Avoid this with 5...Na5 instead.", color: 'red', durationMs: 6500 },
      { kind: 'pause', ms: 2500 },
      { kind: 'clear-shapes' },

      { kind: 'your-move',
        san: 'Na5',
        hint: "Black to move. DON'T fall into the Fried Liver. Recapturing with 5...Nxd5 loses to 6.Nxf7! What's the safe move?",
        wrongHint: "5...Na5 — the Polerio Defence. Black attacks the c4 bishop and is happy to give back the pawn after 6.Bb5+ c6 7.dxc6 bxc6 8.Be2. Theory has worked out 5...Na5 in great depth and Black is fine.",
        rightExplain: "Na5! Hits the c4 bishop and sidesteps the Fried Liver entirely. Black accepts giving the pawn back; in return, Black's king stays safe. This is the key Two Knights survival move." },

      { kind: 'pause', ms: 1500 },

      // ─── Survey the rest of the traps ───────────────────────────────────
      { kind: 'text', md: "## Englund Gambit trap\n\nThe trap *Black* wants vs unprepared 1.d4 players: **1.d4 e5 2.dxe5 Nc6 3.Nf3 Qe7 4.Bf4?? Qb4+** wins the b2-pawn and the rook on a1 (5.Bd2 Qxb2 6.Bc3 Bb4!).\n\nWhite's safe response: **4.Nc3** or **4.a3** instead. Sound gambit? No. Surprising at club level? Constantly." },

      { kind: 'text', md: "## Noah's Ark trap (Ruy López)\n\n**1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 d6 5.d4 b5 6.Bb3 Nxd4 7.Nxd4 exd4 8.Qxd4? c5! 9.Qd5 Be6 10.Qc6+ Bd7 11.Qd5 c4** — and the b3-bishop is **trapped** behind Black's pawn wall.\n\nThe signal: any time the Spanish bishop is on b3 and Black has the c4-square available with ...c5 + ...c4, watch out." },

      { kind: 'text', md: "## Lasker trap (Albin Counter-Gambit)\n\nThe most famous *underpromotion* in the opening:\n\n**1.d4 d5 2.c4 e5 3.dxe5 d4 4.e3? Bb4+ 5.Bd2 dxe3 6.Bxb4?? exf2+ 7.Ke2 fxg1=N+!** — promoting to a knight (not a queen) wins the game with a discovered check picking up White's queen.\n\nUnderpromotion is so unusual that even strong club players miss it. Worth knowing as Black; worth avoiding 4.e3 entirely as White (play 4.Nf3)." },

      { kind: 'text', md: "## The general trap-defence rule\n\n**If your opponent's last move makes no sense by ordinary developing logic, *stop and look for the tactic*.** They aren't being random; they are setting something up. The 5 seconds you spend checking will save you the hour you'd spend resigning." },

      // ─── End-of-lesson puzzles ──────────────────────────────────────────
      {
        kind: 'puzzle',
        fen: 'rnb1kb1r/ppp1qppp/3p1n2/3P4/2B5/2N2N2/PPPPQPPP/R1B2RK1 b kq - 0 6',
        solution: ['Nxd5'],
        themes: ['opening','development'],
        prompt: "**Puzzle 2.** Black to move — recapture the central pawn.",
        explain: "Nxd5 — Black grabs the d5 pawn back. In open positions where you've safely developed, the natural recapture is the right one."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqkb1r/ppp2ppp/2n2n2/3Pp1N1/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 5',
        solution: ['Na5'],
        themes: ['trap','fried-liver'],
        prompt: "**Puzzle 3.** Two Knights Defence. Black to move — DON'T fall into the Fried Liver.",
        explain: "Na5 — the Polerio Defence. Attacks the c4 bishop and sidesteps Nxf7. The greedy 5...Nxd5? is a textbook losing move; remember the signal: when two white pieces target f7, don't recapture on d5 with the knight."
      },
      {
        kind: 'puzzle',
        fen: 'rnb1kbnr/pppp1ppp/8/4P3/8/8/PPP1PPPP/RN1QKBNR w KQkq - 0 4',
        solution: ['Nc3'],
        themes: ['trap','englund'],
        prompt: "**Puzzle 4.** Englund Gambit setup (Black has played ...Qe7 hitting e5). White to move — defuse the trap.",
        explain: "Nc3 — the safe developing move. Defends the e5 pawn indirectly via tactics on Qb4+ (after Qxb2 the rook on a1 is defended after Nxb5). 4.Bf4?? walks straight into the Englund trap; the principled developing move is the right one."
      },
      {
        kind: 'puzzle',
        fen: 'rnbqkbnr/ppp2ppp/8/3pp3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
        solution: ['dxe5'],
        themes: ['opening','albin'],
        prompt: "**Puzzle 5.** Albin Counter-Gambit (...e5 played). White to move — accept the gambit.",
        explain: "dxe5 — White takes the pawn. The follow-up matters: after 3...d4 White must NOT play 4.e3? (Lasker trap), but instead 4.Nf3 keeps the extra pawn cleanly. Knowing the wrong move is the first step to playing the right one."
      }
    ]
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    id: "op-005-transitions",
    title: "From opening to middlegame",
    track: "opening",
    order: 5,
    estimatedMinutes: 14,
    objective: "Recognise the structure your opening produces and pick a middlegame plan based on the structure, not on memorised moves.",
    tags: ["opening", "middlegame", "structure"],
    next: null,

    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

    script: [
      // ─── Concept ────────────────────────────────────────────────────────
      { kind: 'text', md: "## The secret of the strongest players\n\n**The opening is a tool to reach a middlegame structure they understand.** They aren't memorising 25 moves to blitz a novelty — they are choosing an opening that produces a position type they know how to play.\n\nIf you learn to recognise the structure, the plans choose themselves." },

      { kind: 'text', md: "## The four structures every player should recognise\n\n**1. Isolated Queen's Pawn (IQP)** — pawn on d4 (or d5) with no c- or e-pawn next to it. Comes from many openings (QGD Tarrasch, Caro-Kann Panov, Nimzo with ...c5/...d5, several Sicilians).\n  - *IQP side:* attack on the kingside, push the d-break, use the half-open files.\n  - *Vs IQP:* blockade on d5 (or d4) with a knight, trade pieces, win the endgame.\n\n**2. Carlsbad** — White d4/e3, Black c6/d5, from QGD Exchange. Minority attack b2-b4-b5xc6 vs kingside counter.\n\n**3. Maróczy Bind** — White c4 + e4 vs Black d6/e6. Squeeze vs ...b5/...d5 breaks.\n\n**4. Hedgehog** — Black a6/b6/d6/e6 vs White c4/e4. Patient manoeuvring vs eventual ...b5/...d5." },

      // ─── Walk through Caro-Kann Panov-Botvinnik → IQP for White ────────
      { kind: 'text', md: "## Watch a structure transition: Caro-Kann Panov (IQP arises)\n\nWe'll play through the Panov-Botvinnik attack. The opening 'delivers' an Isolated Queen's Pawn position for White; from move 9 onwards the entire game is about that pawn." },

      { kind: 'play-move', san: 'e4', explain: "1.e4." },
      { kind: 'play-move', san: 'c6', explain: "1...c6 — Caro-Kann." },
      { kind: 'play-move', san: 'd4', explain: "2.d4." },
      { kind: 'play-move', san: 'd5', explain: "2...d5." },
      { kind: 'play-move', san: 'exd5', explain: "3.exd5 — White exchanges centrally; this leads to the Panov." },
      { kind: 'play-move', san: 'cxd5', explain: "3...cxd5 — Black recaptures with the c-pawn." },
      { kind: 'play-move', san: 'c4', explain: "4.c4 — the Panov-Botvinnik move. White plays an attacking sub-system." },

      { kind: 'highlight', squares: ['c4','d4','d5'], color: 'yellow' },
      { kind: 'callout', square: 'd4', text: "White is preparing to deliver an IQP. After ...Nf6, Nc3, e6, Nf3, Be7, cxd5 Nxd5 — Black ends up with an isolated d-pawn. (Or sometimes White gets the IQP. Both happen in this line.)", color: 'yellow', durationMs: 6500 },
      { kind: 'pause', ms: 2500 },
      { kind: 'clear-shapes' },

      { kind: 'play-move', san: 'Nf6', explain: "4...Nf6 — natural development, attacks c4." },
      { kind: 'play-move', san: 'Nc3', explain: "5.Nc3 — defends c4." },
      { kind: 'play-move', san: 'e6', explain: "5...e6 — Black supports d5." },
      { kind: 'play-move', san: 'Nf3', explain: "6.Nf3 — develop." },
      { kind: 'play-move', san: 'Be7', explain: "6...Be7 — Black develops; structure is about to crystallise." },

      // First your-move — White creates the IQP
      { kind: 'your-move',
        san: 'cxd5',
        hint: "White to move. The whole point of the Panov is to give Black an isolated d-pawn — make the structural exchange now.",
        wrongHint: "cxd5 — White exchanges to leave Black with an IQP after ...Nxd5. The pawn on d5 will become isolated (no c- or e-pawn neighbours), giving White the classical 'play vs the IQP' position.",
        rightExplain: "cxd5! After ...Nxd5 the d5 pawn IS Black's IQP-to-be (it's defended now, but White's plan is to trade pieces and isolate it permanently)." },

      { kind: 'play-move', san: 'Nxd5', explain: "7...Nxd5 — Black recaptures." },
      { kind: 'play-move', san: 'Bd3', explain: "8.Bd3 — develops, eyes h7." },
      { kind: 'play-move', san: 'Nc6', explain: "8...Nc6 — develops, defends e5 indirectly." },
      { kind: 'play-move', san: 'O-O', explain: "9.O-O — finish king safety." },
      { kind: 'play-move', san: 'O-O', explain: "9...O-O — Black does the same." },

      { kind: 'highlight', squares: ['d5'], color: 'red' },
      { kind: 'arrow', from: 'c3', to: 'd5', color: 'green' },
      { kind: 'callout', square: 'd5', text: "THIS is the structural moment. Black's d5-pawn is isolated (no c- or e-pawn neighbours). White's plan: trade pieces, blockade d5 with a knight, win the endgame. Black's plan: piece activity, keep pieces on, attack the kingside.", color: 'red', durationMs: 7000 },
      { kind: 'pause', ms: 3000 },
      { kind: 'clear-shapes' },

      // ─── Maróczy Bind walkthrough ──────────────────────────────────────
      { kind: 'text', md: "## A second structure: the Maróczy Bind\n\nFrom the Sicilian Accelerated Dragon, White can clamp down on the position with c4 + e4 — the Maróczy Bind. Black has to live with this for 30+ moves. The plans are long-term." },

      { kind: 'set-position', fen: 'r1bqkbnr/pp1ppp1p/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R b KQkq - 0 5', orientation: 'black' },

      { kind: 'highlight', squares: ['c4','e4'], color: 'yellow' },
      { kind: 'callout', square: 'd5', text: "White's c4 + e4 'bind' Black: the d5 break is hard, the b5 break is hard. Black has to manoeuvre patiently and find the right moment to strike.", color: 'yellow', durationMs: 5500 },
      { kind: 'pause', ms: 2500 },
      { kind: 'clear-shapes' },

      // Second your-move — Nf6 (just develop and live with the structure)
      { kind: 'your-move',
        san: 'Nf6',
        hint: "Black to move. You're going to live with the Maróczy structure for 30 moves — first develop the kingside knight to its natural square.",
        wrongHint: "Nf6 — develop, prepare ...Bg7 + ...O-O. The Maróczy Bind isn't refuted by any single move; Black plays patiently, completes development, and looks for ...b5 or ...d5 in the future.",
        rightExplain: "Nf6! The opening served its purpose: it deposited you in a structure (Maróczy) you understand. Now play the structure: develop, fianchetto with ...Bg7, castle, and wait for the right moment to break." },

      { kind: 'pause', ms: 1500 },

      // ─── Wrap-up ────────────────────────────────────────────────────────
      { kind: 'text', md: "## How to use this practically\n\nWhen you choose an opening, ask: **what structure does this produce?** Then study that structure separately, in model games. After that, you can almost forget the opening moves — once you reach the structure, you'll know what to do.\n\n**Memorising moves works until your opponent leaves theory** (move 7 against a club player). **Structure-based thinking works forever** because every game ends in one of a few dozen recognisable structures.\n\nSpend an hour learning the IQP, and you'll know what to do in 15% of all your games for the rest of your chess life." },

      // ─── End-of-lesson puzzles ──────────────────────────────────────────
      {
        kind: 'puzzle',
        fen: 'rnbqk2r/pp2bppp/4pn2/3p4/2PP4/2N2N2/PP3PPP/R1BQKB1R w KQkq - 2 7',
        solution: ['cxd5'],
        themes: ['structure','iqp'],
        prompt: "**Puzzle 1.** Caro-Kann Panov. White to move — make the structural choice.",
        explain: "cxd5 — gives Black an IQP after ...Nxd5. White's whole plan now is 'play against the d5 pawn': trade pieces, blockade with Nc3-a4-c5 or Nb1-d2-f1-e3, win the endgame. The opening was a delivery vehicle for the structure."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqkbnr/pp1ppp1p/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R b KQkq - 0 5',
        solution: ['Nf6'],
        themes: ['structure','maroczy'],
        prompt: "**Puzzle 2.** Maróczy Bind. Black to move — develop and prepare to live with the structure.",
        explain: "Nf6 — the Maróczy isn't refuted; Black just plays patiently. Develop, fianchetto, castle, wait for the right break. Knowing the structural plan is more valuable than memorising 12 moves of theory."
      },
      {
        kind: 'puzzle',
        fen: 'r1bq1rk1/pp2bppp/2n1p3/3n4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 4 10',
        solution: ['Re1'],
        themes: ['structure','iqp'],
        prompt: "**Puzzle 3.** IQP for White. White to move — find a typical IQP-side developing move.",
        explain: "Re1 — typical IQP side play: rook to the half-open e-file, supports the knight on e5 if it lands there later, prepares Nb1-d2-f1 manoeuvres. The IQP-side wants pieces active; the rook on e1 is one of the standard placements."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqk2r/pp1nbppp/2p2n2/3p2B1/3P4/2NBP3/PPQ2PPP/R3K1NR w KQkq - 4 8',
        solution: ['Nf3'],
        themes: ['structure','carlsbad'],
        prompt: "**Puzzle 4.** Carlsbad structure. White to move — finish minor-piece development.",
        explain: "Nf3 — the last minor piece comes out. In structural openings, complete development first, then start the structural plan (here: O-O, Rab1, b2-b4-b5xc6, the minority attack)."
      },
      {
        kind: 'puzzle',
        fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3P4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
        solution: ['Bg5'],
        themes: ['structure','development'],
        prompt: "**Puzzle 5.** White to move — develop the bishop with pressure on a key piece.",
        explain: "Bg5 — pins the f6 knight, applies pressure on d5 indirectly (f6 is the key defender). This is a typical IQP-flavoured developing move: get pieces active, create pressure, then think about which structure you're heading toward."
      }
    ]
  }
];
