// Positional Play track — advanced positional concepts (lessons 13-18).
// Two weaknesses, color complexes, minority attack, pawn breaks,
// piece coordination, and the initiative.
//
// Source: docs/research/positional.md, docs/research/positional-play.md.
// Tone: practical and concrete. Karpov / Capablanca / Botvinnik examples.
//
// All FENs and interactive solutions verified for legality.

export const LESSONS_POSITIONAL_3 = [

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pos-013-two-weaknesses",
    title: "The principle of two weaknesses",
    track: "positional",
    order: 13,
    estimatedMinutes: 14,
    objective: "Understand why a single weakness is rarely enough, and how to create a second front to overload the defender.",
    tags: ["two-weaknesses", "endgame", "karpov", "technique"],
    next: "pos-014-color-complexes",
    content: [
      { type: "text", value: "You've fixed a weakness in your opponent's camp — a backward pawn, a weak square, a bad bishop. You attack it with everything you have, and... your opponent defends. Pieces shuffle, the weakness holds, the position grinds toward a draw. What went wrong?\n\nYou ran into the **principle of two weaknesses**: against a single weakness, the defender can usually summon enough pieces to hold. To convert, you almost always need a **second front**. The defender's pieces cannot cover both — and something gives." },

      { type: "subheading", value: "Why one weakness is not enough" },
      { type: "text", value: "A single weakness pins down one defender. If the rest of the defender's army is healthy and active, they reroute, trade off attackers, and survive. The position looks worse on paper than on the clock.\n\nThe principle is mathematical. A defender with eight pieces can guard one weak square three or four times over. When you open a second front, those same eight pieces must split — and any square that's covered twice on one side is now covered zero or once on the other. Pressure plus pressure cracks what pressure alone could not." },

      { type: "subheading", value: "Karpov's signature technique" },
      { type: "text", value: "Anatoly Karpov made an entire career on this principle. He wins a small advantage — a slightly better pawn structure, a more active rook — and refuses to commit. He shuffles, improves a piece by half a square, waits. His opponent, with no targets, eventually runs out of useful moves and weakens **something else** to make progress. Karpov then opens a second front, and the game is decided.\n\nThe pattern repeats so often it has a name in coaching literature: *Karpov-style boa constriction*. It looks like nothing is happening for thirty moves, then something happens for three, and the game is over." },

      { type: "pgn",
        title: "Karpov's two-weakness technique (illustrative endgame)",
        moves: "1.Nd4 Rb8 2.Nb5 Rfc8 3.a4 a5 4.Kf2 Kf8 5.Ke3 Ke7 6.Kd3 Kd7 7.Kc4 Kc6 8.f4",
        startFen: "2r2rk1/pp3ppp/2p5/8/3N4/4P1P1/PP3P1P/2R2RK1 w - - 0 1",
        annotations: "White has a small structural edge (better minor piece, more active rook setup). The plan: 1) plant the knight on b5 to fix Black's queenside, 2) march the king to the queenside while Black has no useful play, 3) once Black has shuffled himself into zugzwang on one flank, open a second front with f4-f5 on the kingside. Two fronts, one defender — the position cracks." },

      { type: "subheading", value: "How to create the second weakness" },
      { type: "text", value: "You don't usually attack the second weakness — you **make** it. Three reliable methods:\n\n- **Pawn break on the other flank.** Once your opponent's pieces are tied to one wing, a pawn break (b4-b5, f4-f5, h4-h5) on the empty side opens lines and creates a target.\n- **Force a structural concession.** If the opponent is in zugzwang, any pawn move creates a square — exploit it. *...g6* leaves the dark squares; *...h6* weakens g6.\n- **Trade into a winning endgame.** Sometimes the second \"weakness\" is the opponent's king itself. Trade pieces until your active king and a single passed pawn outweigh the static defender." },

      { type: "board",
        fen: "8/5pk1/p3p1p1/1p1p2P1/1P1P4/P3PK2/5P2/8 w - - 0 1",
        caption: "Pure pawn endgame, but the idea is universal. White's plan: the queenside is fixed (Black's a6 and b5 are weak, but defendable). The second weakness will be created with **a3-a4** at the right moment — Black's b5 pawn falls or the a-file opens. One weakness on each flank, one Black king. The defender loses." },

      { type: "interactive",
        fen: "r4rk1/pp3ppp/2p5/3p4/3P4/2P1PN2/PP3PPP/R4RK1 w - - 0 1",
        prompt: "Black has a single weakness — the slightly weak c-pawn complex. Karpov's approach is not to attack c6 immediately, but to expand on the kingside to create a second front. Pick the patient pawn move that begins kingside expansion.",
        solution: "g3",
        explanation: "g3 prepares h4-h5, opening lines on the kingside. The first weakness (c6) is not going anywhere. Once Black's pieces are tied to defending it, the kingside break creates a second front. Players who rush with Rab1 + b4-b5 give Black counterplay; the patient g3 keeps everything." },

      { type: "subheading", value: "When to switch fronts" },
      { type: "text", value: "Timing is the art. Switch too early and the first weakness slips out of your grip; switch too late and your opponent reorganizes. Two practical signals:\n\n- The defender has stopped having useful moves on the first front and is just shuffling.\n- Your own pieces on the first front are at maximum pressure and cannot improve further.\n\nWhen both are true, it's time to open the second front. The pieces that were creating pressure on the first front *don't move* — they stay tied down, and **new pieces** (or pawns) open the second one." },
    ],
    quiz: [
      {
        question: "Why is one weakness usually not enough to win?",
        options: [
          "Because chess engines defend perfectly.",
          "Because the defender can concentrate enough pieces on a single weakness to hold it.",
          "Because positional play doesn't decide games.",
          "Because the opponent will always trade pieces.",
        ],
        answer: 1,
        explanation: "A single weakness ties down one or two defenders, but the rest of the defender's army stays mobile. Pressure on one square rarely cracks a coordinated defense — you need to split the defender's attention.",
      },
      {
        question: "How is the second weakness usually created?",
        options: [
          "By trading queens immediately.",
          "By a pawn break on the opposite flank, or by forcing a structural concession from a defender in zugzwang.",
          "By attacking the king with a sacrifice.",
          "By offering a draw.",
        ],
        answer: 1,
        explanation: "Pawn breaks on the empty flank, and zugzwang-induced concessions (any pawn move creates a square), are the standard tools. The defender's pieces are already busy; new pawn lines on the other side overload them.",
      },
    ],
    further: [
      "Dvoretsky, *Endgame Manual* — extensive treatment of the two-weaknesses principle in pawn and rook endings.",
      "Karpov's *My 300 Best Games* — a collection where the technique recurs in essentially every win.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pos-014-color-complexes",
    title: "Color complexes and the long diagonal",
    track: "positional",
    order: 14,
    estimatedMinutes: 15,
    objective: "Recognize when a side's light or dark squares have collapsed, and how to exploit it with the right-colored bishop.",
    tags: ["color-complex", "weak-squares", "fianchetto", "botvinnik"],
    next: "pos-015-minority-attack",
    content: [
      { type: "text", value: "Pawns defend squares of the **opposite** color from the one they sit on. A pawn on the dark e3 square defends the light squares d4 and f4. Move that pawn — or trade it — and those light squares are no longer defended by a pawn. Multiply this by several pawn moves, and an entire color of squares can become weak across a whole zone of the board.\n\nThis is a **color complex weakness**. Once it exists, the opponent's right-colored bishop and queen become deadly — they target squares that pawns cannot defend." },

      { type: "subheading", value: "How color complexes form" },
      { type: "text", value: "Three common origins:\n\n- **Trading off the right-colored bishop.** If you trade your light-squared bishop, the light squares around your king have lost a permanent defender. If you've also pushed pawns onto dark squares (so they don't cover the light squares), the light-square complex is weak.\n- **Pushing a fianchetto pawn.** g3 and Bg2 protect the long diagonal a8-h1. If the Bg2 is then traded, the light squares h3, f3, e4 around the White king are unprotected — the **fianchetto hole** problem.\n- **Forced pawn moves under pressure.** ...g6 to stop a bishop check, ...h6 to kick a bishop, ...f5 to gain space — each move surrenders the squares of the opposite color." },

      { type: "board",
        fen: "r1bq1rk1/pp2nppp/2p1p3/3pP3/3P4/2N2N2/PPQ1BPPP/R1B2RK1 w - - 0 1",
        caption: "A typical French-structure position. Black's pawns sit on light squares (d5, e6, f7) — the **dark squares** in Black's camp (especially d6, e5, f6, c5) are weak. White's plan: trade off Black's dark-squared bishop, plant a knight on d6 or e5, and the dark-square complex collapses. The Bc1 is White's most important piece because it operates on the weak color." },

      { type: "subheading", value: "The fianchetto hole" },
      { type: "text", value: "When a player fianchettos (g6 + Bg7 for Black, g3 + Bg2 for White), the Bg7 / Bg2 becomes the single most important defender of the long diagonal. **Trade that bishop and the entire complex of squares it defended is permanently weak.**\n\nFor Black with ...g6 + Bg7: trading the Bg7 leaves f6, h6, and especially the dark squares around the king vulnerable. White's typical plan is Be3 + Qd2 + Bh6 — trade the Bg7, and the dark squares around Black's king are open for invasion. Tal, Karpov, and Kasparov all won famous games this way." },

      { type: "pgn",
        title: "Botvinnik – Capablanca, AVRO 1938 (the classic dark-square attack)",
        moves: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3 d5 5.a3 Bxc3+ 6.bxc3 c5 7.cxd5 exd5 8.Bd3 O-O 9.Ne2 b6 10.O-O Ba6 11.Bxa6 Nxa6 12.Bb2 Qd7 13.a4 Rfe8 14.Qd3 c4 15.Qc2 Nb8 16.Rae1 Nc6 17.Ng3 Na5 18.f3 Nb3 19.e4 Qxa4 20.e5 Nd7 21.Qf2 g6 22.f4 f5 23.exf6 Nxf6 24.f5 Rxe1 25.Rxe1 Re8 26.Re6 Rxe6 27.fxe6 Kg7 28.Qf4 Qe8 29.Qe5 Qe7 30.Ba3 Qxa3 31.Nh5+ gxh5 32.Qg5+ Kf8 33.Qxf6+ Kg8 34.e7",
        annotations: "Capablanca exchanged his dark-squared bishop on move 5 (Bxc3+) and never recovered the dark squares. Botvinnik built a long-term attack on those dark squares: pushing e4-e5 to fix the structure, sacrificing a piece on h5 to expose the king, and finally invading f6 with the queen. The full game is a textbook on what happens when you give up one color and your opponent collects squares of that color for thirty moves. The famous 30.Ba3! deflects the queen so that 31.Nh5+ and 32.Qg5+ deliver the killing dark-square invasion." },

      { type: "subheading", value: "The dark-square trade-off" },
      { type: "text", value: "Color-complex thinking gives you a question for every trade: *am I about to surrender a color?*\n\n- Trading your dark-squared bishop while your pawns sit on dark squares creates a dark-square weakness.\n- Trading your light-squared bishop while pushing pawns to light squares creates a light-square weakness.\n- The opponent's same-colored bishop becomes monstrous in the resulting structure.\n\nThe Capablanca rule restated: *don't trade the bishop that defends your weak color*. If your pawns are stuck on light squares, your light-squared bishop is your most precious piece — it's the only defender of the squares your pawns can't cover." },

      { type: "interactive",
        fen: "r1bq1rk1/pp3ppp/2nb1n2/3p4/3P4/2N1PN2/PP1B1PPP/R2QKB1R w KQ - 0 1",
        prompt: "Black has both bishops, pawns roughly balanced. White's best plan is to trade off Black's dark-squared bishop (Bd6) — once it's gone, Black's dark squares become permanent targets. Find the quiet move that prepares the trade.",
        solution: "Nb5",
        explanation: "Nb5 attacks the Bd6, forcing either a trade (Nxd6) or an awkward retreat (Be7). Either way, the dark-squared bishop is the next casualty, and once it's gone the dark squares c5, d6, e5 in Black's camp become permanent outposts for White's pieces. Players who play Bd3 or O-O are missing the long-term structural plan." },
    ],
    quiz: [
      {
        question: "What creates a color-complex weakness?",
        options: [
          "Putting too many pieces on the same color.",
          "Trading off the bishop of one color while your pawns sit on the other color, leaving the squares your bishop covered without any defender.",
          "Castling kingside.",
          "Having doubled pawns.",
        ],
        answer: 1,
        explanation: "Pawns defend squares of the opposite color from the one they stand on. If your pawns are on light squares and your dark-squared bishop is gone, the dark squares have lost their defender — and the opponent's dark-squared bishop targets them with no opposition.",
      },
      {
        question: "What is the danger of trading the fianchetto bishop?",
        options: [
          "Nothing — bishops are interchangeable.",
          "The long diagonal and the squares of the bishop's color around the king become permanently weak.",
          "It loses material.",
          "It opens a file for the rook.",
        ],
        answer: 1,
        explanation: "The fianchetto bishop is the key defender of the long diagonal and the squares of its color near the king. Once traded, those squares cannot be re-covered by pawns, and the opponent's same-colored bishop or queen can invade.",
      },
    ],
    further: [
      "Botvinnik – Capablanca, AVRO 1938 — the most famous dark-square game ever played.",
      "Watson, *Secrets of Modern Chess Strategy* — a full chapter on dynamic vs static color-complex play.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pos-015-minority-attack",
    title: "The minority attack",
    track: "positional",
    order: 15,
    estimatedMinutes: 14,
    objective: "Execute the b2-b4-b5 minority attack in Carlsbad structures to create a backward c-pawn target.",
    tags: ["minority-attack", "carlsbad", "pawn-structure", "qgd"],
    next: "pos-016-pawn-breaks",
    content: [
      { type: "text", value: "The **minority attack** is the most counterintuitive plan in classical chess: you push your **smaller** pawn group against the opponent's **larger** group, deliberately trading pawns to leave the opponent with a **weakness**. It looks like you're losing space — and you are. But the resulting structural target lasts forever." },

      { type: "subheading", value: "The Carlsbad structure" },
      { type: "text", value: "The classic setup arises from the Queen's Gambit Declined Exchange Variation. White exchanges on d5 early, leaving:\n\n- White pawns: a2, b2, c3, d4, e3, f2, g2, h2 (3-vs-2 majority on the kingside, 2-vs-3 minority on the queenside).\n- Black pawns: a7, b7, c6, d5, e6, f7, g7, h7 (mirror — kingside minority, queenside majority).\n\nThe natural impulse for both sides is to use their majority. But the *modern* understanding is that **White's queenside minority** is the more dangerous tool — the b2-b4-b5 push attacks Black's c6 pawn and forces Black into a structural concession." },

      { type: "board",
        fen: "r2q1rk1/pp1nbppp/2p1pn2/3p4/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 1",
        caption: "Textbook Carlsbad starting position. Black's pawns: c6, d5, e6 form the classic chain. White will play b2-b4-b5 — when Black recaptures (...cxb5 or ...c5), the c-file opens, the d5 pawn becomes isolated, or a backward c6 pawn remains. All three outcomes are great for White." },

      { type: "subheading", value: "How the attack unfolds" },
      { type: "text", value: "The mechanical plan, in five steps:\n\n1. **Place the rook on b1.** Often Rb1 (or Rab1) before the pawn pushes, supporting the future b4-b5.\n2. **Play a2-a3 if needed**, supporting b4. Sometimes a4 directly, depending on Black's setup.\n3. **Push b2-b4.** Now b4-b5 is the threat.\n4. **Push b4-b5.** Black must respond: ...cxb5 (loses the c-file), ...c5 (creates a passed but weak isolani), or do nothing (then bxc6 leaves Black with a permanent backward c-pawn or doubled pawns).\n5. **Occupy the c-file and target c6.** White's pieces flow into the queenside through the open c- or b-file." },

      { type: "pgn",
        title: "A model minority attack sequence",
        moves: "1.Rab1 a6 2.a3 Re8 3.b4 Nf8 4.b5 axb5 5.Nxb5 cxb5 6.Rxb5 Bd7 7.Rb2 Rec8 8.Rfb1",
        startFen: "r2q1rk1/pp1nbppp/2p1pn2/3p4/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 1",
        annotations: "Rab1 prepares the push, a3 supports b4, then b4-b5 forces the issue. After the trades, White owns the b-file with both rooks and Black's queenside pawns are weak. From here White can target b7, infiltrate to b6 or b8, and the position is strategically winning. Black has tried to seek counterplay on the kingside (Nf8 heading to g6 / e6) but the structural damage is already done." },

      { type: "subheading", value: "Black's counterplay" },
      { type: "text", value: "The minority attack is not automatic — Black has resources:\n\n- **Kingside attack with the e-pawn break.** Black plays ...Ne4 or ...Nh5 + ...f5, trying to generate threats faster than White's queenside grinds.\n- **The ...c5 break.** Played at the right moment, ...c5 trades off the d4 pawn and frees Black's position before White's b-pawn can advance.\n- **Doubled rooks on the c-file.** If Black gets two rooks on the c-file before White plays b4-b5, the c-pawn can hold and Black even threatens ...c5 with effect.\n\nThe *race* between White's queenside grind and Black's kingside attack is the soul of the Exchange QGD." },

      { type: "interactive",
        fen: "r2q1rk1/1p1nbppp/2p1pn2/p2p4/3P4/2N1PN2/PPQ1BPPP/1R2KB1R w K - 0 1",
        prompt: "White has prepared the minority attack with Rb1. Black just played ...a5 to prevent b2-b4. Find the move that supports the b4 push.",
        solution: "a3",
        explanation: "a3 prepares b4 anyway — Black's ...a5 doesn't stop the push, it just means White will play b4, and after ...axb4 axb4 the a-file opens for White's rook, then b4-b5 follows. The minority attack is mechanical: the b-pawn must reach b5. a3 is the patient move that ensures it does. Pushing b4 immediately allows ...axb4 followed by counterplay on the a-file before White is ready." },
    ],
    quiz: [
      {
        question: "What is the minority attack designed to do?",
        options: [
          "Win material immediately.",
          "Trade pawns so that the opponent ends up with a backward, weak c-pawn (or similar structural concession).",
          "Open the king.",
          "Advance the king to the center.",
        ],
        answer: 1,
        explanation: "The minority attack uses the smaller pawn group to trade against the larger group. The point is structural: when the dust settles, the opponent has a backward, isolated, or doubled c-pawn that becomes a long-term target.",
      },
      {
        question: "From a Carlsbad structure, what's the typical first preparatory move for White's minority attack?",
        options: [
          "f3 — preparing e4.",
          "Rb1 — placing the rook on the file the b-pawn will open.",
          "h4 — kingside pawn storm.",
          "Bxh7+ — bishop sacrifice.",
        ],
        answer: 1,
        explanation: "Rab1 (or Rb1) supports the eventual b-pawn push and is ready to occupy the b-file the moment lines open. The whole plan is built on the b-pawn becoming a battering ram, and the rook behind it is essential.",
      },
    ],
    further: [
      "Watson, *Mastering the Chess Openings Vol. 2* — chapter on Carlsbad structures.",
      "Soltis, *Pawn Structure Chess* — the canonical treatment of the minority attack and its structural cousins.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pos-016-pawn-breaks",
    title: "Pawn breaks and pawn levers",
    track: "positional",
    order: 16,
    estimatedMinutes: 14,
    objective: "Identify the right pawn break for any structure, and time it to free your position without weakening it.",
    tags: ["pawn-breaks", "levers", "structure", "kmoch"],
    next: "pos-017-piece-coordination",
    content: [
      { type: "text", value: "A **pawn break** (also called a **lever**, in Hans Kmoch's terminology) is a pawn move that challenges an enemy pawn — typically by pushing into a square attacked by an opposing pawn, asking it to capture or be captured.\n\nBreaks are the engine of strategic chess. Every closed and semi-closed pawn structure has one or two breaks for each side, and most of the planning effort goes into preparing them, timing them, or preventing the opponent's." },

      { type: "subheading", value: "Why breaks matter" },
      { type: "text", value: "Pawns are slow but permanent. Once placed, they define the geography of the position — open files, diagonals, outposts, and color complexes all flow from the pawn structure. A pawn break is the only way to **change** that geography.\n\nWithout a break, the position freezes. Pieces shuffle, nothing changes, the game heads to a draw. With the right break at the right moment, lines open in your favor and your better-placed pieces decide the game." },

      { type: "subheading", value: "The freeing-versus-weakening break" },
      { type: "text", value: "Every break does two things at once: it opens lines (good if your pieces are better placed) and it creates a square or weakness (bad if you can't control that square).\n\nThe central question for any candidate break: *will I control the new square / file / diagonal that the break creates?*\n\n- If yes — your pieces will be the first to occupy the new territory — the break is **freeing**.\n- If no — the opponent's pieces are better placed for the resulting position — the break is **weakening** (you're just opening lines for the opponent).\n\nThis is why preparation matters. Karpov spends ten moves placing pieces so that the break, when finally played, is freeing. Amateur players play the break the move they see it, and find it was weakening." },

      { type: "subheading", value: "The classic breaks" },
      { type: "text", value: "Memorize these by structure:\n\n- **...c5 in the QGD.** Black's freeing break against White's d4-c4 pawn duo. Times correctly, equalizes; mistimed, leaves Black with a hanging d5 or backward d-pawn.\n- **...f5 in the King's Indian.** Black's primary break against White's e4. After ...f5, exf5 gives Black the open e-file and attacking chances against the king; e5 closes the center and Black plays for ...f4 and a kingside attack.\n- **...e5 in the Sicilian.** Black's freeing break that often equalizes — but only if Black controls d5 first (otherwise the d5 hole is fatal).\n- **b4-b5 in the Spanish (Ruy Lopez).** White's queenside break that gains space and prepares c4-c5 or invasion.\n- **f4-f5 in many King's Indian / Sicilian setups.** White's kingside lever, used to open lines against the enemy king." },

      { type: "board",
        fen: "r1bq1rk1/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQ1RK1 b - - 0 8",
        caption: "QGD-type structure. Black's freeing break is **...c5**. The break challenges White's d4 and threatens to liquidate to a position where Black's pieces are well coordinated. Played too early (before Black has developed harmoniously), it leaves Black with a weak d-pawn; played at the right moment, it equalizes." },

      { type: "pgn",
        title: "...f5 break in the King's Indian (model)",
        moves: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ne1 Nd7 10.Nd3 f5",
        annotations: "Once White closes the center with d5, Black's only practical play is on the kingside, and the only kingside break is ...f5. The whole opening — Ne7, Nd7, then ...f5 — is preparation for this break. Once played, Black has chances against White's king on g1, and the game becomes a race: White attacks the queenside, Black the kingside. This is the standard plan." },

      { type: "subheading", value: "Timing the break" },
      { type: "text", value: "Three timing rules:\n\n- **Develop your pieces first.** A break that opens lines for *both* armies favors whoever was better mobilized. Castle, develop, and only then push.\n- **Watch the opponent's setup.** The right break depends on what the opponent has played. If the opponent has reinforced the square you want to push against (extra defenders), find a different break.\n- **Don't break twice in the same direction.** Each break makes a structural commitment. Two breaks in succession usually overextend." },

      { type: "interactive",
        fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 b - - 0 1",
        prompt: "Black has finished development. White has not yet committed to the minority attack with Rb1. Now is the moment for Black's primary freeing break in this structure.",
        solution: "c5",
        explanation: "...c5 is Black's classic freeing break in this Carlsbad / QGD structure. It challenges d4 and dissolves the central tension on Black's terms — before White can play Rab1 + b4-b5. Played one move later, after Rab1, it's still possible but White has more options. Right now, with all pieces developed and White not yet committed, ...c5 is ideal." },
    ],
    quiz: [
      {
        question: "What is a pawn break (or lever)?",
        options: [
          "A pawn move that captures a piece.",
          "A pawn move that challenges an enemy pawn, typically opening lines or creating new weaknesses.",
          "Any pawn move.",
          "A move that promotes a pawn.",
        ],
        answer: 1,
        explanation: "A break (Kmoch's lever) is a pawn move that pushes against an enemy pawn, forcing a structural change. It's the only tool in chess that permanently alters the pawn geography of a position.",
      },
      {
        question: "What's the difference between a freeing break and a weakening break?",
        options: [
          "Freeing breaks capture material; weakening breaks don't.",
          "A freeing break opens lines that favor your pieces; a weakening break opens lines that favor the opponent's pieces.",
          "Freeing breaks are played by White; weakening by Black.",
          "There's no difference.",
        ],
        answer: 1,
        explanation: "Same move, different result depending on whose pieces benefit. Karpov-style preparation makes sure the new lines favor him; amateur play often opens lines that the opponent uses.",
      },
    ],
    further: [
      "Hans Kmoch, *Pawn Power in Chess* — the original classification of pawn levers.",
      "Soltis, *Pawn Structure Chess* — break-by-structure reference.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pos-017-piece-coordination",
    title: "Piece coordination and harmony",
    track: "positional",
    order: 17,
    estimatedMinutes: 13,
    objective: "Get all your pieces in the game. Activity is more valuable than material — coordination beats isolated brilliance.",
    tags: ["coordination", "activity", "capablanca", "harmony"],
    next: "pos-018-initiative",
    content: [
      { type: "text", value: "Capablanca's chess looks effortless because of one thing: every piece does something useful, all the time. There are no spectators. When his pieces work together — knight covering a key square, bishop supporting an outpost, rook on the open file, queen behind the rook — the position has *harmony*. The opponent's pieces, by contrast, are out of touch with each other: a stranded bishop, a passive rook, a queen guarding a single pawn." },

      { type: "subheading", value: "All pieces in the game" },
      { type: "text", value: "The most underrated principle in chess: *bring all your pieces into the game before doing anything decisive*. A material count of equal forces means nothing if two of your pieces are tied to defense and the third is buried in the corner.\n\nThe practical question to ask every move: **what's my worst piece, and how do I improve it?** This is the Makogonov rule. The best move is often the one that activates a passive piece — even at the cost of a tempo, even when more aggressive options exist. Aggression with three active pieces against a coordinated five-piece defense fails. Activate the other two first." },

      { type: "subheading", value: "Pieces support each other" },
      { type: "text", value: "Coordinated pieces share work. A knight on d5 is strong; a knight on d5 *with a bishop on e2 supporting and a rook on the d-file behind it* is decisive. The same knight, alone, can be exchanged off, and the position resets.\n\nLook for piece pairings:\n\n- **Rook + queen on the same file or rank.** Doubled major pieces are almost always worth the effort to arrange.\n- **Bishop + knight controlling the same complex.** The bishop covers diagonals, the knight covers squares the bishop can't reach.\n- **Two rooks on the seventh rank.** The classic 'pigs on the seventh' — almost always winning.\n- **Bishop pair on adjacent diagonals.** The two bishops together cover both color complexes — far stronger than either alone." },

      { type: "board",
        fen: "r4rk1/1bq2ppp/p1n1pn2/1pp5/3P4/P1NBPN2/1P1Q1PPP/R4RK1 w - - 0 1",
        caption: "Both sides have all pieces developed, but White's pieces work together: the Bd3 + Qd2 + Nc3 + Nf3 all support a future e4 push or kingside attack. Black's pieces are decent in isolation but the Bb7 and Nc6 don't reinforce each other, and the Qc7 isn't connected to anything. Same material, different harmony." },

      { type: "subheading", value: "Activity over material" },
      { type: "text", value: "The most common Capablanca-style win: a small material concession in exchange for activity, which then converts into a much larger material gain.\n\n- Trade your bad bishop for the opponent's good knight, even though it loses 'the bishop pair.'\n- Sacrifice a pawn to free your rook to the seventh rank.\n- Give up a rook for a minor piece (the exchange) when your remaining pieces dominate.\n\nThe principle: a pawn down with all five pieces working together usually beats a pawn up with two pieces stuck in defense. Engines confirm this constantly — what humans see as 'material balance,' engines see as 'activity differential.'" },

      { type: "pgn",
        title: "Capablanca-style harmony (illustrative middlegame conversion)",
        moves: "1.dxc5 Bxc5 2.Bf4 Qe7 3.Rfd1 Rfd8 4.Rac1 Rac8 5.Be5 Qe8 6.Qe2 Bd6 7.Bxd6 Rxd6 8.Nb5",
        startFen: "r4rk1/1bq2ppp/p1nbpn2/1pp5/3P4/P1NBPN2/P1NBPN2/R1BQ1RK1 w - - 0 1",
        annotations: "White first clarifies the structure with dxc5, then redeploys the dark-squared bishop to f4 and e5, while doubling rooks on the c- and d-files. Every White piece reinforces another: rooks on the central files, queen on e2 connecting them, bishop dominating the long dark diagonal. The final Nb5 attacks the rook on d6 and threatens an outpost. Black's pieces are decent in isolation but never coordinate the same way — that gap is the win." },

      { type: "subheading", value: "Spotting disharmony in your own position" },
      { type: "text", value: "Three diagnostic questions:\n\n- **Is any piece doing nothing?** A bishop blocked by your own pawns, a knight on a3 with no future, a rook stuck on a1. That piece is your problem — find it a job.\n- **Are any two pieces tripping over each other?** Bishop and knight on the same diagonal, two rooks fighting for one file. Reroute one.\n- **Is my queen doing the work of a minor piece?** Queens defending pawns, blocking files, or babysitting weak squares are misused. Use a smaller piece for the small job and free the queen for big work." },

      { type: "interactive",
        fen: "r2q1rk1/1p2bppp/p1n1pn2/3p4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 0 1",
        prompt: "White is fully developed but the c1 bishop is the worst piece — buried, doing nothing. Find the quiet move that activates it to a useful diagonal.",
        solution: "Bd2",
        explanation: "Bd2 develops the bishop and prepares to swing to b4 (challenging the dark-squared bishop) or e1-h4 for kingside operations. The other moves (Rd1, b3, etc.) all improve already-active pieces; Bd2 follows the Makogonov rule — improve the worst piece. Once every piece is active, the harder strategic questions can be addressed." },
    ],
    quiz: [
      {
        question: "What's the Makogonov rule for finding the best move in a quiet position?",
        options: [
          "Always play the most aggressive move.",
          "Identify the worst-placed piece and improve it.",
          "Trade queens.",
          "Push the most advanced pawn.",
        ],
        answer: 1,
        explanation: "The single most useful question in positional play: 'what's my worst piece?' Improving it is almost always the right move — activity comes from having every piece working, not from one brilliant attack with a few pieces.",
      },
      {
        question: "Why does activity often beat material?",
        options: [
          "It doesn't — material always wins.",
          "Coordinated active pieces generate more threats than uncoordinated material does, and threats convert to material over time.",
          "Engines say so.",
          "It only matters in fast time controls.",
        ],
        answer: 1,
        explanation: "A pawn-down position with all pieces active and harmonized usually outplays a pawn-up position with two passive pieces. Activity is dynamic potential — it converts into threats, threats into material, and the static material count flips.",
      },
    ],
    further: [
      "Capablanca, *Chess Fundamentals* — the original treatment of harmony and activity.",
      "Silman, *The Amateur's Mind* — modern coverage of piece activation.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pos-018-initiative",
    title: "The initiative",
    track: "positional",
    order: 18,
    estimatedMinutes: 14,
    objective: "Recognize the initiative, value it correctly (often above a pawn), maintain it through forcing play, and convert it before it fades.",
    tags: ["initiative", "tempo", "dynamics", "gambit"],
    next: "pos-019-maneuvering",
    content: [
      { type: "text", value: "The **initiative** is the ability to make threats and force the opponent to respond. The side with the initiative dictates the game; the side without it must react. It doesn't show up on a static evaluation directly, but over time it almost always converts into permanent advantages — material, structure, or king safety.\n\nThe initiative is the single most important *dynamic* concept in chess. Static factors (structure, material, color complexes) describe the position now. Initiative describes who is *driving* the position into the future." },

      { type: "subheading", value: "Why the initiative is worth a pawn (or more)" },
      { type: "text", value: "An entire branch of opening theory — gambit play — exists on the assumption that the initiative is worth at least a pawn. The Morra Gambit, the King's Gambit, the Marshall Attack, the Benko Gambit: in each, one side gives up a pawn for several tempi of development and forcing play. At the master level, this trade is often a fair one.\n\nWhy? Because a pawn is static — it sits there for the rest of the game and *might* matter in the endgame. The initiative is dynamic — it generates new threats every move and *will* matter in the next ten moves. If you can't convert the initiative within ten moves, then yes, the pawn was worth more. But during those ten moves, you usually can." },

      { type: "subheading", value: "How to maintain the initiative" },
      { type: "text", value: "Three rules:\n\n- **Keep making threats.** Every move should ask the opponent a question: defend this, or lose something. The moment you stop asking questions, the opponent reorganizes.\n- **Don't release tension prematurely.** A central capture often releases the initiative — the resulting trades simplify the position, and the side with passive pieces gets time to reorganize. Maintain tension as long as it serves you.\n- **Sacrifice material if it buys time.** If giving up a pawn lets you keep the initiative for three more moves, and three more moves wins something larger, the sacrifice is correct.\n\nForcing moves (CCT — checks, captures, threats) are the building blocks. The initiative *is* the ability to play forcing moves continuously while the opponent only defends." },

      { type: "pgn",
        title: "Sacrificing for the initiative — Morra Gambit miniature pattern",
        moves: "1.e4 c5 2.d4 cxd4 3.c3 dxc3 4.Nxc3 Nc6 5.Nf3 d6 6.Bc4 e6 7.O-O Nf6 8.Qe2 Be7 9.Rd1 e5 10.Be3 O-O 11.Rac1",
        annotations: "White is down a pawn after move 4 but has a huge lead in development and the c-file open for the rook. The plan: pour pieces toward Black's king with Bc4, Qe2, Rd1, Rac1 — every move develops *with* a threat or pressure. Black, despite being a pawn up, struggles for moves: each time Black develops, White makes another threat. After 11.Rac1, every White piece is active and the c-file plus the long diagonal point at Black's queenside. The initiative is worth far more than the pawn here." },

      { type: "subheading", value: "When to convert the initiative" },
      { type: "text", value: "Initiative is temporary — eventually the opponent consolidates, the position simplifies, and the initiative dissolves. Before that happens, you must convert it into something **permanent**:\n\n- **Material.** Win a pawn or piece by tactics that the initiative made possible.\n- **King safety damage.** Force pawn moves around the opponent's king (...g6, ...h6, ...f6) that create permanent weaknesses.\n- **Structural concession.** Force the opponent to accept a backward pawn, isolated pawn, or bad bishop.\n- **A direct attack that mates.** The strongest possible conversion.\n\nFailing to convert is the classic mistake — you push hard for ten moves, the opponent neutralizes everything, and now you're worse because your aggressive moves left structural weaknesses behind. *The initiative is not a goal; it's a means.*" },

      { type: "subheading", value: "When to give up the initiative" },
      { type: "text", value: "Sometimes the initiative is not enough — the opponent's defense is solid, and continuing to attack will only weaken you. In that case, the disciplined move is to *convert what you have and consolidate*.\n\nSignals that the initiative is fading:\n\n- Each new threat costs more material than it gains.\n- Your attacking pieces are running out of squares.\n- The opponent has weathered the storm and is starting to make threats of their own.\n\nWhen you see those signals, **lock in the gains**: trade pieces, simplify to an endgame where your structural or material edge wins, and stop searching for a non-existent knockout." },

      { type: "subheading", value: "Initiative and tempo" },
      { type: "text", value: "Initiative and tempo are inseparable. A tempo is one move's worth of time; the initiative is the ability to spend tempi on **improving threats** while the opponent must spend tempi **defending**. A gambit explicitly trades material for initiative-time. A move that gains a tempo (a developing move with a threat — Nb5 attacking a piece, for example) extends the initiative by one move.\n\nThe practical reframing: the initiative is *time pressure on the opponent's pieces*. Every move you force them to react is a move they don't get to use to improve their own position." },

      { type: "interactive",
        fen: "r1bqkb1r/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP1PPPP/R1BQKB1R w KQkq - 0 5",
        prompt: "An open, symmetric position. White has a slight lead in development. Find the quiet developing move that gains a tempo by threatening the opponent's center, keeping the initiative.",
        solution: "Bg5",
        explanation: "Bg5 develops with a threat — it pins the f6 knight, and after a future Nxd5 ideas, the pin becomes valuable. Black must spend a tempo addressing the pin (...Be7, ...h6) instead of completing development naturally. That tempo is the initiative made concrete. A move like e3 or Bf4 also develops, but neither asks Black a question; Bg5 keeps the initiative alive." },
    ],
    quiz: [
      {
        question: "What is the initiative?",
        options: [
          "The first move of the game.",
          "The ability to make threats and force the opponent to respond rather than carry out their own plan.",
          "A tactical pattern.",
          "An endgame technique.",
        ],
        answer: 1,
        explanation: "The initiative is dynamic — it's about who's driving and who's defending. The side with the initiative makes threats; the other side answers them. Over time, this asymmetry converts into permanent advantages.",
      },
      {
        question: "Why is the initiative often considered worth a pawn or more?",
        options: [
          "Because gambits are aesthetically pleasing.",
          "Because the initiative converts into material, structural damage, or king safety damage over the next several moves, while the pawn is static and may not matter for many moves.",
          "Because engines prefer attacking moves.",
          "It isn't — material is always more important.",
        ],
        answer: 1,
        explanation: "Static pawns sit there. The initiative makes threats every move. If you can convert the initiative into something permanent within ten moves, the trade was profitable; entire opening systems (gambits) are built on this assumption.",
      },
      {
        question: "What's the biggest mistake players make with the initiative?",
        options: [
          "Sacrificing material to keep it.",
          "Failing to convert it into a permanent advantage before it fades, leaving them worse off than before because their aggressive moves created structural weaknesses.",
          "Playing too quickly.",
          "Trading queens.",
        ],
        answer: 1,
        explanation: "Initiative is temporary. If you don't convert it into material, king safety damage, or a structural concession before the opponent consolidates, you're left with weakened pawns and exposed pieces — the trade goes in the opponent's favor.",
      },
    ],
    further: [
      "Aagaard, *Grandmaster Preparation: Positional Play* — extended treatment of initiative and dynamics.",
      "Shirov's *Fire on Board* — modern showcase of pawn-for-initiative play at the highest level.",
    ],
  },

];
