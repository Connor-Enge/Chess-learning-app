// Positional Play track, Part 1: Pawn Structure.
//
// Six lessons on the structural backbone of every middlegame: pawn skeletons,
// backward pawns, isolated pawns, the IQP, doubled pawns, hanging pawns.
//
// Tone: conversational. Connor is intelligent and knows how the pieces move,
// but is building strategic intuition. Open with WHY this structural feature
// matters before HOW to handle it.
//
// FENs were verified by hand: each rank totals 8 squares, exactly one king
// per side, side-to-move matches the position, and any move marked as a
// `solution` in an interactive block is legal from the FEN given. PGN
// fragments use legal sequences from the standard starting position unless
// otherwise noted.

export const LESSONS_POSITIONAL_1 = [

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-001-pawn-skeleton",
    title: "The pawn skeleton: the soul of the position",
    track: "positional",
    order: 1,
    estimatedMinutes: 14,
    objective: "Read the pawn structure first, before looking at the pieces — count islands, identify chains, and infer the plans both sides should be playing.",
    tags: ["pawn-structure", "positional", "fundamentals"],
    next: "pos-002-backward-pawns",
    content: [
      { type: "text", value: "Philidor said it in 1749 and nobody has improved on it: **\"Pawns are the soul of chess.\"** Pieces come and go — they get traded, they reroute, they shuffle. Pawns mostly stay put, and they decide which squares are weak, which files are open, where your pieces want to live, and which side of the board you should be playing on.\n\nThis lesson teaches you a habit: **before you look at the pieces, read the pawn skeleton.** It's the cheapest, fastest way to upgrade your positional understanding." },

      { type: "heading", value: "What \"reading the structure\" means" },
      { type: "text", value: "Mentally remove every piece from the board. Look only at the pawns. Then ask three questions, in order:\n\n1. **How many pawn islands does each side have?** A pawn island is a connected group of pawns. Fewer islands = healthier structure.\n2. **Where are the chains, and where are their bases?** A chain is a diagonal sequence of pawns defending each other. The base is the back pawn — it's the foundation, and it's the target.\n3. **What pawn breaks are available?** A break is a pawn move that creates immediate tension with an enemy pawn. The available breaks tell you the plans." },

      { type: "board", fen: "8/pp3ppp/2p1p3/8/3P4/2P1P3/PP3PPP/8 w - - 0 1", caption: "A typical Carlsbad/Exchange-QGD pawn skeleton. White has two islands (a-b and c-d-e and f-g-h... actually three: a-b, c-d-e, f-g-h). Black mirrors. Both sides are healthy, but the **c-pawns** are the natural targets, and the breaks are b2-b4-b5 for White and the …c6-c5 push for Black." },

      { type: "subheading", value: "Pawn islands: the cleanest single metric" },
      { type: "text", value: "Count them on each side. Three vs two is a small but real edge for the side with fewer islands. Four vs two is often decisive in an endgame. Why?\n\n- The **leftmost** and **rightmost** pawn of each island can't be defended by another pawn on that side — they need pieces.\n- More islands = more targets = pieces tied down to defense = fewer pieces free to attack.\n\nCapablanca won countless endgames by trading into positions where his opponent had one extra pawn island. He didn't need any other advantage." },

      { type: "heading", value: "Pawn chains: attack the base, not the head" },
      { type: "text", value: "A chain like White d4–e5 (or Black d5–e6–f7) is a diagonal of mutually-defending pawns. **Nimzowitsch's rule:** attack the base. The head of the chain is defended by the next pawn down. The base is defended only by pieces (or by a pawn that itself isn't part of the chain).\n\nThe textbook example is the **French Defense** structure: White's chain is d4–e5, base d4. Black plays …c7-c5 to hammer d4. Black's chain is d5–e6–f7, base f7. White's plan often runs through f4-f5 to attack e6, undermining Black's whole chain." },

      { type: "pgn", pgn: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3 Nh6 7. b4 cxd4 8. cxd4 Nf5", annotations: { 3: "White locks the chain with e4-e5. White's chain: d4–e5. Black's chain: d5–e6–f7.", 5: "And immediately Black goes after the base. …c5 attacks d4 — the foundation of White's chain.", 6: "Piling more pressure on d4. Notice Black isn't trying to attack e5 (the head) — that's defended by d4. The pressure is all on the base.", 8: "The standard French middlegame: White scrambles to defend d4 with pieces, Black's whole queenside is mobilized against it." } },

      { type: "subheading", value: "Pawn breaks: the engine of every plan" },
      { type: "text", value: "A break opens lines. Until pawns move, files are closed and pieces have no entry routes. The breaks that are *available* in a position tell you which side of the board the game is going to be decided on.\n\nFor White in the Carlsbad: **b4-b5** (the minority attack). For Black in the Carlsbad: **…c6-c5** or kingside …f5. For White in the King's Indian: c4-c5. For Black in the King's Indian: …f7-f5. **Identify the breaks first; then arrange your pieces to support them or prevent the opponent's.**" },

      { type: "interactive", fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 9", prompt: "Carlsbad structure (Exchange QGD). The center is locked. Both sides are developed. What's the right plan-move for White? Look for a *quiet* preparatory move that begins the minority attack on the queenside — not a tactic.", solution: "b4", explanation: "**b4** is the start of the minority attack — White's signature plan in this structure. The idea is b2-b4-b5, forcing …b7xc6 or …c6xb5, leaving Black with a permanent backward c-pawn or a weak c-pawn on a half-open file. It's a slow, structural plan, not a tactic. The c-pawn becomes the long-term target. (Rb1 to support the push first is also a perfectly valid 'preparation' move and many strong players play it before b4 — but b4 itself is the plan-defining move.)" },

      { type: "quote", value: "\"When you don't know what to do, look at the pawns.\" — old Soviet coaching maxim" },

      { type: "text", value: "Make this a habit before every move in slow chess: scan the pawns first. The pieces' jobs follow from the structure. Once you can read the skeleton, you'll find that 'I have no plan' rarely happens — the pawns are telling you what to do." }
    ],
    quiz: [
      { question: "Nimzowitsch's rule about pawn chains says you should attack:", options: ["The head of the chain", "The base of the chain", "The middle pawn", "Whichever is closest to your king"], answer: 1, explanation: "Attack the base. The head is defended by the next pawn down; the base is the foundation, and removing it collapses the chain." },
      { question: "All else equal, a side with **3 pawn islands vs 2** is:", options: ["Slightly better — more flexibility", "Slightly worse — more potential targets", "Exactly equal — it doesn't matter", "Much better in the endgame"], answer: 1, explanation: "Fewer islands = healthier structure. More islands means more endpoint pawns that can't be defended by other pawns, which means more piece-defenders tied down." },
      { question: "Why do experienced players look at the pawn structure BEFORE the pieces?", options: ["The pieces don't matter", "Pawns rarely move, so they define the long-term character of the position", "Pawns are the most valuable", "It's just tradition"], answer: 1, explanation: "Pawns can't go backward and move slowly, so the structure is the long-term, semi-permanent feature. The pieces' jobs are defined by the structure they live in." }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-002-backward-pawns",
    title: "Backward pawns: the chronic weakness",
    track: "positional",
    order: 2,
    estimatedMinutes: 14,
    objective: "Recognize backward pawns, understand why they're a long-term liability, and learn how to create one in the opponent's position while avoiding one in your own.",
    tags: ["pawn-structure", "weaknesses", "positional"],
    next: "pos-003-isolated-pawns",
    content: [
      { type: "text", value: "Some pawn weaknesses are short-lived — fix the structure with a trade or a break and they vanish. A **backward pawn** is not one of them. Once you have a backward pawn, you usually have it for the rest of the game. It's the textbook chronic weakness, and it's one of the most common things strong players try to inflict on their opponents." },

      { type: "heading", value: "Definition" },
      { type: "text", value: "A backward pawn is a pawn that has fallen behind its neighbors on adjacent files, **and** the square in front of it is controlled by an enemy pawn — so it can't safely advance to catch up.\n\nTwo conditions:\n\n1. **Behind the pawn line** — the pawns next to it have advanced past it.\n2. **Blocked from advancing** — pushing it loses the pawn (or runs it into a defended square it can't fight off).\n\nIf either condition fails, it's not backward. A pawn that's behind but can safely push is just a slow pawn." },

      { type: "board", fen: "8/pp3ppp/2p5/3p4/3P4/2P1P3/PP3PPP/8 w - - 0 1", caption: "Black's c6 is **backward**. The b- and d-pawns have advanced past it (well, d5 has). If Black pushes …c5, White takes with dxc5 and the d-pawn becomes weak too. Meanwhile c6 sits exposed, and **the c5 square is a permanent hole** for a White piece." },

      { type: "subheading", value: "Why it's so painful — two problems, not one" },
      { type: "text", value: "A backward pawn is actually *two* weaknesses welded together:\n\n1. **The pawn itself is a target.** It sits on a half-open or open file, and pieces can attack it head-on. It can't be defended by a friendly pawn (that's the whole reason it's backward). So it's defended only by pieces — and those pieces are tied down for the rest of the game.\n2. **The square in front is a permanent outpost.** No enemy pawn can ever drive a piece off that square. A knight planted there dominates the board.\n\nThat second point is often the bigger deal. A backward d6 pawn is annoying. The d5 hole *next to it* is what actually loses you the game." },

      { type: "heading", value: "The model example: the Sveshnikov Sicilian" },
      { type: "text", value: "The most famous backward-pawn structure in modern theory. After the Sveshnikov main line, Black voluntarily accepts a backward d6 pawn and a permanent hole on d5 — in exchange for the bishop pair and dynamic counterplay. Black is betting the activity outweighs the structural defect. White's plan, in contrast, is the simplest in chess: **plant a knight on d5 and never leave**." },

      { type: "pgn", pgn: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Nd5", annotations: { 5: "5...e5 is the Sveshnikov move. It chases the knight, but it leaves d6 backward and d5 weak forever — both sides know this. It's a strategic decision, not an oversight.", 6: "Forced. Black has to defend the b5-knight from supporting d6.", 9: "And there it is. White lands a knight on d5 — the permanent outpost. From here the knight can't be challenged by any pawn. White's whole strategy from now on revolves around this square." } },

      { type: "heading", value: "How to create a backward pawn in the opponent's position" },
      { type: "text", value: "The recipe is almost always the same:\n\n1. **Force or induce a pawn advance** that opens a hole — typically pushing them to play …e5 or …c5 in a structure where d6 (or d5) is then unsupported.\n2. **Trade off the pieces that could defend the resulting weak square.** Especially the opponent's good knight that wants to sit there.\n3. **Plant your own knight on the outpost** and double rooks behind your pawn on the half-open file pointing at the backward pawn.\n\nThis is a slow, multi-move plan. It might take 15 moves to fully realize. That's fine — the weakness is permanent, you have all day." },

      { type: "subheading", value: "How to avoid creating one in your own position" },
      { type: "text", value: "Be very reluctant to push a pawn that loses contact with its supporters. Common mistakes:\n\n- Playing …e5 in a King's Indian or Sicilian where d6 then becomes backward and d5 becomes a permanent hole.\n- Playing …c5 in a Slav structure where c6 was the natural support, and now the d-pawn or the c5-square becomes weak.\n- Pushing pawns to gain space without checking what gets left behind.\n\n**The diagnostic question** before any pawn push: *what square in front of my other pawns am I about to make permanently weak?*" },

      { type: "interactive", fen: "r1bqkb1r/1p3ppp/p1np1n2/4p3/4P3/1NN5/PPP2PPP/R1BQKB1R w KQkq - 0 8", prompt: "Najdorf-style structure. Black's e5/d6 leaves d6 backward and d5 a hole. What's the right plan-move for White? Find the *quiet positional* move that heads for the hole — not a tactic.", solution: "Nd5", explanation: "**Nd5** plants the knight on the permanent outpost. It can't be challenged by any pawn — neither the c-pawn nor the e-pawn can reach d5 to dislodge it. From d5 the knight attacks the f6 knight and the b6 square, controls the dark squares around Black's king, and ties Black's pieces to defense. This is the textbook positional plan against the Najdorf-style backward d6/hole on d5 structure: get a knight to d5 and keep it there." },

      { type: "quote", value: "\"The threat is stronger than the execution.\" — Nimzowitsch. With a backward pawn, the *position* itself is the threat — you don't have to do anything dramatic." },

      { type: "text", value: "When you spot a backward pawn in your opponent's camp, slow down. Don't go for tactics. The structural advantage is going to win the game by itself if you nurse it correctly: install the knight on the outpost, double rooks on the file, trade pieces, head for an endgame where the weakness becomes decisive." }
    ],
    quiz: [
      { question: "A pawn is 'backward' when:", options: ["It's on the second rank", "It's behind its neighbors AND can't safely advance because the square in front is controlled by an enemy pawn", "It's defended only by another pawn", "It hasn't moved yet"], answer: 1, explanation: "Both conditions: behind its neighbors, and the advance square is controlled by an enemy pawn. If it could safely push, it wouldn't be backward — just a little slow." },
      { question: "What's the bigger long-term problem with a backward pawn?", options: ["The pawn itself is weak", "The square in front of it is a permanent outpost for an enemy piece", "It blocks your own pieces", "Both are equally serious — and the outpost square is often the worse of the two"], answer: 3, explanation: "Both matter, but the permanent hole is often the larger issue. A knight planted on the outpost square can dominate the entire game — pawns can't drive it off, ever." },
      { question: "In the Sveshnikov Sicilian, Black voluntarily accepts a backward d6 pawn. Why?", options: ["Black is just careless", "Black gets the bishop pair and dynamic piece play as compensation", "The d6 pawn isn't actually weak", "It's a known mistake"], answer: 1, explanation: "It's a calculated trade-off: structural concession for activity. Black bets the dynamic counterplay outweighs the long-term structural problem. Modern theory says it's playable but very sharp." }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-003-isolated-pawns",
    title: "Isolated pawns: target or activity engine?",
    track: "positional",
    order: 3,
    estimatedMinutes: 13,
    objective: "Distinguish when an isolated pawn is a chronic weakness from when it provides genuine compensating activity — and learn the heuristics for both sides.",
    tags: ["pawn-structure", "isolated-pawn", "positional"],
    next: "pos-004-iqp",
    content: [
      { type: "text", value: "An **isolated pawn** is a pawn with no friendly pawn on either adjacent file. The textbook example is the **isolated queen pawn** (\"IQP\") — a White pawn on d4 with no c- or e-pawn to support it. We'll cover the IQP in depth in the next lesson; here we look at isolated pawns generally and the central question they raise: are they a weakness, or are they the cost of activity?" },

      { type: "heading", value: "Why isolated pawns get a bad reputation" },
      { type: "text", value: "The classical school (Tarrasch, Steinitz) treated the isolani as a structural defect, full stop. Two reasons:\n\n1. **It can never be defended by a pawn.** Only pieces can defend it. So defenders get tied down.\n2. **The square in front is a permanent outpost.** No enemy pawn can ever push the blockading piece off. A knight installed on d5 in front of an isolated d4 pawn can dominate the game.\n\nIn the **endgame**, both of these are usually decisive. With few pieces on the board, the defenders run out, and the isolani is a chronic loss. Tarrasch's classical advice: *avoid isolated pawns in the endgame at almost any cost.*" },

      { type: "board", fen: "8/p4ppp/4p3/8/3P4/8/P4PPP/8 w - - 0 1", caption: "An isolated d4 pawn in a simplified position. Without pieces around to give it dynamic life, this is just a target. Black's plan is the textbook one: blockade d5 with a knight, double rooks on the d-file, and grind." },

      { type: "subheading", value: "Why isolated pawns can also be a strength" },
      { type: "text", value: "The hypermodern school (Nimzowitsch and others) pushed back. Yes, the isolani has long-term weaknesses — but it also gives:\n\n- **Two open files** for the rooks (the c- and e-files, in the IQP case). That's significant attacking potential.\n- **Strong central squares for pieces.** The pawn on d4 supports knights on c5 and e5. Those squares are outposts for the IQP side too.\n- **Space and dynamic potential.** The break d4-d5 (for White) opens lines and is often the springboard for a kingside attack.\n\nSo there's a trade. **In the middlegame**, with all the pieces on, the isolani side often has the initiative and chances. **In the endgame**, the weakness usually wins. The whole strategic question becomes: *who can force the position they want first?*" },

      { type: "heading", value: "The framework: middlegame vs endgame" },
      { type: "text", value: "This is the most important sentence in this lesson: **the side with the isolani wants the middlegame; the side against the isolani wants the endgame.**\n\nFrom that one rule, all the practical advice follows.\n\n**The IQP side** keeps pieces on the board, plays for attack, looks for the d4-d5 break, occupies c5 and e5 with pieces, and avoids trades — *especially* avoids trading queens.\n\n**The anti-IQP side** trades pieces relentlessly, blockades d5 with a knight (the ideal blockader), avoids trades that release the d-file pressure, and aims for any endgame where the pawn becomes a target." },

      { type: "pgn", pgn: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O 9. Bg5", annotations: { 4: "After the trades, Black ends up with the isolated d5 pawn — this is the Tarrasch Defense to the QGD.", 8: "Both sides develop normally. Black has the isolani; the strategic battle is now about whether Black can use the open lines actively or whether White can blockade and trade.", 9: "White begins the standard plan against the IQP — Bg5 pins the f6 knight (a defender of d5) and prepares to trade pieces." } },

      { type: "subheading", value: "Isolated pawns elsewhere on the board" },
      { type: "text", value: "An isolated *a-pawn* or *h-pawn* is just a weak edge pawn — usually no compensating activity, just a target. An isolated *c-pawn* or *f-pawn* is similar. The middle isolani (d-pawn, e-pawn) is special because it sits in the center, gives central files to the rooks, and supports central outposts. Edge isolanis are almost always worse than central ones." },

      { type: "interactive", fen: "r2qr1k1/pp3ppp/2nbpn2/8/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 0 12", prompt: "White has the isolated d4 pawn. Find the *quiet* maneuver-move that improves White's worst piece and supports the d-pawn dynamically — preparing the eventual d4-d5 break.", solution: "Bg5", explanation: "**Bg5** activates the dark-squared bishop, develops it to a useful square pinning the f6 knight (a key d5-defender), and joins the buildup that will later support the d4-d5 break or a kingside attack. It's a textbook IQP move: improve a passive piece, harass the blockader's defenders, and keep the middlegame sharp. The IQP-player's worst enemy is simplification, so any move that develops a piece without trading is good news. (Re3 lifting the rook is also thematic, but Bg5 is the more universal first move.)" },

      { type: "quote", value: "\"The isolated pawn casts gloom over the entire chessboard.\" — Aron Nimzowitsch (with characteristic drama)" },

      { type: "text", value: "Nimzowitsch was making a point about the *defender* of the isolani — every piece is shadowed by the duty of protecting that pawn. But of course, Nimzowitsch himself played plenty of IQP positions and won them with active piece play. The truth is somewhere between him and Tarrasch: the isolani is dynamite — useful in the right hands, dangerous in the wrong ones. The next lesson zooms in on the most common case: the IQP itself." }
    ],
    quiz: [
      { question: "An isolated pawn cannot be defended by:", options: ["A piece", "Another pawn", "A king", "A rook on the file"], answer: 1, explanation: "The whole definition is 'no friendly pawn on adjacent files,' so no pawn can defend it. Only pieces can." },
      { question: "The strategic battle around an isolated queen pawn comes down to:", options: ["Tactics — whoever calculates better wins", "Who can force their preferred phase: IQP-side wants middlegame, anti-IQP wants endgame", "Material — the IQP side is just down a pawn", "Castling — kingside or queenside"], answer: 1, explanation: "It's the time-honored framework: the side with the isolani wants pieces on the board for activity; the side against it wants trades into an endgame where the weakness dominates." },
      { question: "Which is generally the best blockader of an isolated d-pawn on d5?", options: ["A queen on d6", "A knight on d6", "A rook on d6", "A pawn on d6"], answer: 1, explanation: "A knight is the ideal blockader (Nimzowitsch's principle): it blockades while still attacking other things from the blockade square. A queen or rook is wasted on pure blockade duty." }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-004-iqp",
    title: "The Isolated Queen Pawn (IQP): both sides' plans",
    track: "positional",
    order: 4,
    estimatedMinutes: 16,
    objective: "Master the IQP middlegame from both sides: the IQP-player's attacking setup and pawn breaks, and the defender's blockade-and-trade plan.",
    tags: ["pawn-structure", "isolated-pawn", "iqp", "positional"],
    next: "pos-005-doubled-pawns",
    content: [
      { type: "text", value: "The Isolated Queen Pawn — a White pawn on d4 (or Black on d5) with no neighbors on the c- or e-files — is the single most-studied pawn structure in chess. It arises from the Tarrasch Defense, the Caro-Kann Panov Attack, the Nimzo-Indian, the Queen's Gambit Accepted, and a dozen other openings. Both sides have well-known plans; the entire game is often decided by who executes their plan more accurately." },

      { type: "heading", value: "The position to picture" },
      { type: "text", value: "The classic IQP middlegame, White to move:" },

      { type: "board", fen: "r1bq1rk1/pp3ppp/2n1pn2/8/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 9", caption: "Standard IQP position. White has the isolated d4 pawn. Both sides are developed. The strategic battle is everything: White attacks, Black blockades and trades." },

      { type: "subheading", value: "The IQP-player's plan (here, White)" },
      { type: "text", value: "Three goals, in priority order:\n\n1. **Activate every piece for attack on the kingside.** The isolani justifies aggressive play — there's no time to be slow, you need the middlegame.\n2. **Occupy the e5 outpost with a knight.** The d4 pawn supports e5 (and c5). A knight on e5 dominates the kingside, attacks f7, and joins any attack.\n3. **Prepare and execute the d4-d5 break at the right moment.** This is the dynamic resource of the position. Pushing d5 sacrifices the isolani but opens lines, frees the c1-bishop, and often hits a piece on c6 or f6 with discovered tactics.\n\n**Standard piece setup:** Bd3 (aiming at h7), Qd3 or Qe2 or Qd1-d3 (joining the attack), Rad1 (behind the d-pawn for the d5 break), Bg5 (pinning the f6 knight, a d5 defender), Ne5 (the outpost knight).\n\n**What to avoid:** trades. Especially queen trades. Every trade favors the defender." },

      { type: "pgn", pgn: "1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. e3 cxd4 5. exd4 d5 6. Nc3 Nc6 7. Bd3 Be7 8. O-O O-O 9. a3 dxc4 10. Bxc4 a6 11. Re1 b5 12. Bd3 Bb7 13. Bc2", annotations: { 5: "And there's the IQP. White has d4 isolated; this position arises from many openings.", 7: "White lifts the bishop to d3 — aimed at h7, ready for the kingside attack.", 13: "White retreats the bishop to c2 to clear the d-file and join the b1-h7 diagonal battery. This is textbook IQP play: every piece coordinates toward the kingside attack. The d4 pawn is the engine, not the weakness — yet." } },

      { type: "subheading", value: "The defender's plan (here, Black)" },
      { type: "text", value: "Three goals, in priority order:\n\n1. **Blockade d5 with a knight.** The ideal blockader. From d5 it can't be challenged by a pawn (there is no white c- or e-pawn) and it stops the d4-d5 break.\n2. **Trade pieces.** Every trade reduces White's attacking potential. Trade minor pieces especially. Aim for a queen trade if you can get one.\n3. **Head for the endgame** where the d4 pawn is just a weakness. Once enough pieces come off, the isolani is a chronic loss and the win is technical.\n\n**Standard piece setup:** …Nbd7-b6 or …Nf6-d5 (the blockader), …Bb7 (long diagonal toward d5 and the white king), …Rc8 (on the half-open c-file targeting c2 or c3), …Qb6 or …Qa5 (active queen, ready to trade)." },

      { type: "pgn", pgn: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O 9. Bg5 cxd4 10. Nxd4 h6 11. Be3 Re8 12. Qb3 Na5 13. Qc2 Bg4", annotations: { 4: "Tarrasch Defense — Black voluntarily accepts the IQP for active piece play.", 9: "White starts the anti-IQP plan: Bg5 to trade off the dark-squared bishop, opening up the blockade on d5.", 12: "Note the maneuvering — both sides repositioning to either attack or defend the d5 blockade square. This is the IQP middlegame in miniature: every move is about who controls d5." } },

      { type: "heading", value: "The two breaks: d4-d5 (White) and …d5-d4 (Black)" },
      { type: "text", value: "These breaks dissolve the isolani — usually the IQP-side does it voluntarily, at a moment when the resulting open lines favor them. The key is timing.\n\n**Push d4-d5 when:**\n- Your pieces are aimed at the kingside and you can convert open lines into mating threats.\n- The push hits a piece (a knight on c6 or f6) with tempo.\n- The defender's blockading knight has been driven away or traded off.\n- You can recapture on d5 with a piece, occupying the central square.\n\n**Don't push d5 when:**\n- You haven't completed development.\n- The trade just simplifies into an endgame the defender wants.\n- The recapture leaves you worse." },

      { type: "interactive", fen: "r1bq1rk1/pp3ppp/2n1pn2/3p4/3N4/2N5/PPQ1BPPP/R1B2RK1 w - - 0 11", prompt: "White has just exchanged a knight on d4 — wait, this is now an IQP for Black (d5 is isolated). Find the *quiet positional* move that begins White's blockade-and-trade plan against the d5 isolani. Hint: a developing move that targets the d5 blockade square.", solution: "Bf3", explanation: "**Bf3** redirects the bishop onto the long diagonal aimed straight at d5. It joins the attack on the d5 pawn and prepares to challenge the knight that wants to blockade d5 from b6 or f6. It's a textbook anti-IQP positional move: improve a piece, target the d5 square, set up future trades. (Bf4 developing the dark-squared bishop is also a valid plan-move; Bf3 is more concretely about d5.)" },

      { type: "quote", value: "\"He who fears the isolated queen's pawn should give up chess.\" — Siegbert Tarrasch, who played and loved IQP positions for both sides" },

      { type: "text", value: "The IQP teaches you, more than any other structure, that **a positional weakness can be a dynamic strength**. The d4 pawn is simultaneously a target and a battering ram. Whether it costs or pays depends entirely on whether the player handling it knows the plan. Now you do." }
    ],
    quiz: [
      { question: "The IQP-side's biggest enemy is:", options: ["The opponent's bishop", "Trades — especially queen trades", "Castling early", "Open files"], answer: 1, explanation: "Trades simplify into the endgame, where the IQP becomes a chronic weakness. Every piece traded reduces the attacking potential the IQP-side needs." },
      { question: "Why is the d4-d5 break (for the White IQP-side) such an important resource?", options: ["It wins a pawn", "It dissolves the isolani while opening lines and often hitting a defender with tempo", "It forces a draw", "It's the only legal pawn move"], answer: 1, explanation: "The push converts the static weakness into dynamic open lines, often gaining tempo on a piece on c6 or f6, and frees the c1-bishop. Timed right, it's devastating." },
      { question: "The defender's ideal blockader of the IQP on d5 is:", options: ["A queen", "A bishop", "A knight", "A rook"], answer: 2, explanation: "A knight: it can't be challenged by an enemy pawn (there is none), and it still attacks other squares from the blockade. Major pieces are wasted on pure blockade duty." }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-005-doubled-pawns",
    title: "Doubled pawns: weakness, irrelevance, or strength?",
    track: "positional",
    order: 5,
    estimatedMinutes: 13,
    objective: "Recognize when doubled pawns hurt (loss of mobility), when they're fine (open file for the rook), and when they're actively GOOD (controlling key central squares).",
    tags: ["pawn-structure", "doubled-pawns", "positional"],
    next: "pos-006-hanging-pawns",
    content: [
      { type: "text", value: "Doubled pawns get a bad rap. Most beginners learn \"doubled pawns are weak\" and stop there. Strong players know the truth is more interesting: doubled pawns can be a real defect, a non-issue, or even a structural advantage — depending on the file they sit on, the pieces around them, and what they control.\n\nThis lesson covers all three cases, and ends with the most famous example in chess: the Nimzo-Indian doubled c-pawns that Black voluntarily inflicts on White." },

      { type: "heading", value: "When doubled pawns are bad" },
      { type: "text", value: "The classic worst case: **doubled isolated pawns.** Imagine White pawns on c2 and c3 with no b- or d-pawn. They can't defend each other (one is in front of the other), they can't be defended by another pawn (no neighbors), and they restrict their own pieces. That's three layers of structural defect in one place.\n\nMore generally, doubled pawns hurt when:\n\n- They restrict the mobility of their own pieces (the back pawn can't move freely).\n- They can't defend each other or be defended by a neighbor.\n- They sit on a file the opponent can attack with rooks.\n- They're in the endgame, where pawn weaknesses become decisive.\n\nThe canonical bad case: doubled f-pawns (after the opponent forces …gxf6 to recapture a piece, leaving f7 and f6 doubled, plus exposing the king). Almost always a serious problem." },

      { type: "board", fen: "8/p4ppp/2p1p3/2p5/8/2P5/PP3PPP/8 w - - 0 1", caption: "Black has doubled c-pawns AND they're isolated (no b- or d-pawn). About as bad as it gets — three weaknesses in one structure. White's plan is to bring rooks to the half-open c-file and grind." },

      { type: "subheading", value: "When doubled pawns are fine" },
      { type: "text", value: "Doubled pawns are a non-issue when:\n\n- They open a useful file for one of your rooks.\n- They don't interfere with your own piece mobility.\n- The opponent can't easily get a rook on the half-open file pointing at them.\n\nA common case: White plays Bxc6 bxc6 in a Ruy Lopez Exchange Variation. Black gets doubled c-pawns, but also the bishop pair AND a half-open b-file for the rook. The trade-off is roughly even — the doubled pawns are a long-term concern, the bishop pair is the short-term compensation." },

      { type: "pgn", pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O f6 6. d4 exd4 7. Nxd4 c5 8. Nb3 Qxd1 9. Rxd1 Bd7", annotations: { 4: "The Ruy Lopez Exchange. White trades the bishop, doubling Black's c-pawns immediately.", 5: "Black voluntarily takes with the d-pawn (instead of …bxc6) to keep the structure compact and have the d-file half-open. The doubled c-pawns are real, but Black gets the bishop pair and central pawn control as compensation.", 8: "Already heading toward an endgame. White's whole point: the c-pawns will hurt Black in a queenless middlegame and endgame. Black's point: the bishop pair will hurt White in any open position." } },

      { type: "heading", value: "When doubled pawns are actively GOOD" },
      { type: "text", value: "This is the surprise. Doubled pawns can dominate central squares in a way that no other structure can match.\n\nThe textbook example is **doubled e-pawns at e4 and e5** (White) — together they cover d5, f5, d6, f6, an enormous central wedge. The opponent has nothing to do about it.\n\nAnother case: doubled c-pawns covering b4 and d4 — turning them into permanent dark squares for the side with the doubled pawns.\n\nThe key insight: **a doubled pawn provides extra defense on the squares one rank ahead diagonally.** That's its compensation. If those squares matter, the doubling is a feature, not a bug." },

      { type: "subheading", value: "The Nimzo-Indian doubled c-pawns" },
      { type: "text", value: "The most famous strategic battle in modern chess. After 1.d4 Nf6 2.c4 e6 3.Nc3 Bb4, Black pins the c3-knight. The standard White move 4.e3 (or 4.Qc2) defends, but in many lines Black plays …Bxc3+ and White recaptures with bxc3 — accepting **doubled c-pawns** in exchange for the bishop pair.\n\nWhose deal is better? It's been debated for nearly 100 years. The current consensus: roughly equal, with chances for both. Black's bet: the doubled c-pawns are a long-term weakness, especially in the endgame. White's bet: the bishop pair, the open b-file for a rook, and the strong center (c3-d4-e3 controls a wide central swath) are dynamic compensation. Both bets are reasonable. That's why the line is theoretically rich." },

      { type: "pgn", pgn: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5 6. Nf3 c5 7. O-O dxc4 8. Bxc4 Nbd7 9. Qe2 b6 10. Rd1 Bb7 11. a3 Bxc3 12. bxc3", annotations: { 11: "And here it goes — Black exchanges the bishop for the knight, knowing it doubles White's c-pawns.", 12: "**Doubled c-pawns**, but look at White's compensation: bishop pair, open b-file (Rb1 next), and the c3-d4 pawns supporting strong central squares (c4 and e4). The doubled pawns aren't going anywhere, but neither is White's activity. This is the central debate of the Nimzo-Indian — and it's been alive for 80+ years because both sides really do have something." } },

      { type: "interactive", fen: "r1bq1rk1/pp1n1ppp/4pn2/2b5/2P5/2P1PN2/P2NBPPP/R1BQ1RK1 w - - 0 9", prompt: "Nimzo-Indian-style structure. White has doubled c-pawns. Find the *quiet positional* move that puts White's worst piece (the rook on a1) onto the file that the doubled pawns *opened up* — the file that should be the heart of White's queenside play.", solution: "Rb1", explanation: "**Rb1** activates the rook onto the half-open b-file — the file the doubled c-pawns gave White access to. From b1 the rook can later double on the b-file, target b7, or support a queenside expansion with a3-b3-Qa3. This is the textbook Nimzo idea for White: the doubled c-pawns are a long-term concern, but the open b-file is the immediate compensation, and the rook belongs there. (Quiet, structural, plan-defining — exactly the kind of move that defines positional chess.)" },

      { type: "quote", value: "\"Doubled pawns are not always weak — sometimes they are the strongest pieces on the board.\" — Mark Dvoretsky" },

      { type: "text", value: "When you see doubled pawns, don't react reflexively. Ask three questions: do they open a useful file? Do they cover important central squares? Are the pieces around them well-coordinated? If the answers are yes-yes-yes, those doubled pawns might be the best part of the position." }
    ],
    quiz: [
      { question: "Doubled pawns are at their absolute worst when:", options: ["They're on a file you've opened for your rook", "They're isolated (doubled AND no neighbors on adjacent files)", "They cover key central squares", "They appear in the opening"], answer: 1, explanation: "Doubled isolated pawns combine three weaknesses: they can't defend each other, can't be defended by a neighbor, and the file is a target. About as bad as pawn structure gets." },
      { question: "In the Nimzo-Indian, when Black plays …Bxc3+ and White answers bxc3, doubling the c-pawns, what is White's main compensation?", options: ["A free pawn", "The bishop pair, an open b-file, and central pawn support", "Better king safety", "A passed pawn"], answer: 1, explanation: "Bishop pair + open b-file for a rook + the c3-d4 pawns supporting strong central squares. The doubled pawns are real, but so is the compensation — that's why the line has been debated for almost a century." },
      { question: "When can doubled pawns actually be a structural STRENGTH?", options: ["Never — they are always a weakness", "When they cover key central squares the opponent can't challenge", "Only in the endgame", "Only with knights on the board"], answer: 1, explanation: "Doubled pawns add extra coverage on the squares one rank ahead diagonally. If those squares matter (central squares, squares near the enemy king), the doubling is a real positional asset." }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-006-hanging-pawns",
    title: "Hanging pawns: dynamic strength, structural risk",
    track: "positional",
    order: 6,
    estimatedMinutes: 14,
    objective: "Recognize hanging pawns (typically c5 + d5 or c4 + d4), understand their dual nature — aggressive when mobile, weak when blockaded — and learn how to attack and how to use them.",
    tags: ["pawn-structure", "hanging-pawns", "positional"],
    next: "pos-007-outposts",
    content: [
      { type: "text", value: "**Hanging pawns** are two friendly pawns side-by-side on adjacent half-open files — typically c5 and d5 (for Black) or c4 and d4 (for White), with no friendly pawns on the b- or e-files. They form a duo, defending each other diagonally, controlling four central squares, and threatening to advance. They are simultaneously **aggressive** and **weak** — and reading which they are right now is the entire skill." },

      { type: "heading", value: "The structure" },

      { type: "board", fen: "8/pp3ppp/8/2pp4/8/2P1P3/PP3PPP/8 w - - 0 1", caption: "Black's hanging pawns on c5 and d5. They control b4, c4, d4, and e4 — a strong central wedge. They threaten …c4 or …d4 to either advance further or trade favorably. But they're targets too: White will pile up on them with pieces and try to fix them in place." },

      { type: "subheading", value: "The dual nature: dynamic vs static" },
      { type: "text", value: "Hanging pawns are the textbook \"dynamic structure.\" Their value depends entirely on whether they can advance.\n\n**When they're strong:**\n- They control four key central squares (one rank ahead diagonally).\n- They threaten to push (…c4 or …d4) and either gain space or trade favorably.\n- Behind them, the rooks have open files — the b- and e-files in the …c5/d5 case.\n- They support active piece play in the center.\n\n**When they're weak:**\n- They're blockaded — a piece sits in front of each, preventing advances.\n- The opponent can attack them with multiple pieces while they sit static.\n- An endgame approaches — fewer pieces means the structural weakness dominates.\n- They're forced to advance one (typically …d4) leaving the other (…c5) as a backward, isolated, and weak target." },

      { type: "heading", value: "The freeing push that fixes them" },
      { type: "text", value: "Hanging pawns desperately want to push **one** of the pair forward to either:\n\n1. **Trade and dissolve into a healthier structure** (push …d4, when it can be exchanged for the c-pawn or e-pawn cleanly).\n2. **Convert into a passed pawn or strong outpost** if the push is unanswerable.\n\nBut here's the trap: pushing prematurely can create a **backward** pawn out of the one left behind, or can hand the opponent a permanent outpost on the square in front of where you pushed from.\n\nThe most thematic break is **…d5-d4**, attacking a knight on c3 or e3, gaining space, and either trading on d4 (often into a structure where Black is fine) or planting a pawn deep in White's territory." },

      { type: "pgn", pgn: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5", annotations: { 12: "And here we have it — Black has just played …c5, creating **hanging pawns on c5 and d5**. The pawns control b4, c4, d4, e4. The b- and e-files are half-open for the rooks. Black's plan now: develop pieces, then either play …c4 (with space) or …d4 (the freeing break attacking Nc3 ideas). White's plan: blockade, attack the hanging pawns, force one of them to advance into a weakness." } },

      { type: "subheading", value: "How to play against hanging pawns" },
      { type: "text", value: "The anti-hanging-pawns plan, in priority order:\n\n1. **Blockade.** Place pieces (especially a knight) directly in front of each pawn — typically on c4/d4 (against Black's c5/d5) or c5/d5 (against White's c4/d4).\n2. **Attack with pieces.** Pile rooks behind major pieces on the half-open files (in the c5/d5 case, the b- and e-files).\n3. **Force an advance.** A pawn advance from the duo *should* create a weakness — either an isolated pawn or a backward one. Provoke the move.\n4. **Trade pieces.** Same logic as the IQP — once enough pieces are off, the static weaknesses become decisive.\n\n**The key piece:** a knight on b3 or e3 (attacking the c5 or d5 pawn) is a typical anti-hanging-pawns post." },

      { type: "interactive", fen: "r2q1rk1/p3bppp/1pn1bn2/2pp4/8/2N1PN2/PP1B1PPP/R2QRBK1 w - - 0 12", prompt: "Black has hanging pawns on c5 and d5. Find the *quiet positional* move for White: a knight maneuver to a square that pressures the hanging pawns and prepares the long-term blockade plan.", solution: "Na4", explanation: "**Na4** redirects the knight to attack the c5 pawn directly, supporting the long-term blockade and trade plan. From a4 the knight threatens to either trade itself for Black's dark-squared bishop on e7 (further eliminating defenders of the dark squares around c5) or jump to c5 if Black is careless. This is the anti-hanging-pawns archetype: pressure one of the duo with a knight, pile pieces on the file, and force Black either to advance (creating a weakness) or to defend passively. (Other quiet plan-moves like Rc1 doubling on the c-file or Nb5 eyeing c7/d6 are also defensible — Na4 is the most direct attack on the hanging-pawns structure itself.)" },

      { type: "heading", value: "How to play WITH hanging pawns" },
      { type: "text", value: "Mirror image of the above:\n\n1. **Activate every piece for the middlegame.** Like the IQP, hanging pawns are a structure that justifies aggression — you have central space and dynamic potential, but you need to use it before the opponent consolidates.\n2. **Avoid trades**, especially queen trades. Endgames are bad news.\n3. **Watch for the right moment to push.** Don't push reflexively; wait until the push gains a real concession (trades favorably, opens lines for your pieces, or hits a target).\n4. **Pressure the opponent's pieces** with your central control. The hanging pawns deny the opponent's pieces the central squares; use that to drive their pieces backward.\n\n**The dream scenario:** the duo pushes safely to c4 + d4 (or …c4 + …d4), creating a massive space advantage and a kingside attack. **The nightmare scenario:** the duo gets blockaded, pieces get traded, and the endgame begins with two static, weak pawns on the half-open files." },

      { type: "quote", value: "\"Hanging pawns are like a fire — they warm you when controlled and burn you when not.\" — Mihai Suba" },

      { type: "text", value: "Hanging pawns are one of the most testing structures in chess because the verdict shifts move by move. A push that's brilliant on move 18 is suicide on move 22. The skill is reading the moment — knowing when your pieces are ready to back up an advance, and when the opponent has finished their consolidation and you're now playing static defense of two long-term weaknesses. Get that timing right and hanging pawns are an aggressive asset. Get it wrong and they're an albatross." }
    ],
    quiz: [
      { question: "Hanging pawns are best described as:", options: ["A clear structural weakness in all positions", "Two friendly pawns side-by-side on adjacent half-open files — dynamic when mobile, weak when blockaded", "Two pawns of opposite colors", "Pawns that have left their starting squares"], answer: 1, explanation: "Two pawns on adjacent half-open files (typically c5/d5 or c4/d4) with no friendly neighbors. Their character — strength or weakness — flips depending on whether they can advance and how much piece activity surrounds them." },
      { question: "The key plan AGAINST hanging pawns is:", options: ["Push your own pawns at them immediately", "Trade queens early", "Blockade, attack with pieces, force an advance into a structural weakness, trade into the endgame", "Castle queenside"], answer: 2, explanation: "The full anti-hanging-pawns recipe: blockade with pieces (especially knights), pressure on the half-open files, force a premature advance that creates a backward or isolated pawn, then simplify into the endgame." },
      { question: "Why do hanging pawns favor the middlegame over the endgame for the side that has them?", options: ["They block the opponent's pieces", "Pieces give them dynamic life — without piece support, they're just two static weaknesses on half-open files", "They prevent castling", "They threaten checkmate"], answer: 1, explanation: "Same logic as the IQP. With pieces on the board, the central control and threat to advance keep the duo strong. Once pieces come off, the static weaknesses dominate — the duo can't defend itself in the endgame." }
    ]
  }

];
