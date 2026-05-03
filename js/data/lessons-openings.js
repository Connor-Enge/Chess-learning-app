// LESSONS_OPENINGS — META lessons about openings (the "Openings" lesson track).
// These teach HOW to think about openings; encyclopedic theory lives in the
// Opening Explorer (js/data/openings.js). To wire these into the lesson view,
// import LESSONS_OPENINGS in js/content-loader.js the same way the other
// addendum modules are imported.

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
    content: [
      {
        type: "text",
        value:
          "Most opening theory is a footnote on three ideas. If you ignore them you get a bad position before move ten. If you obey them mechanically you miss every gambit. The point of this lesson is to *internalise* them so you can break them on purpose."
      },
      {
        type: "heading",
        value: "The three rules"
      },
      {
        type: "text",
        value:
          "**1. Control the centre.** Pawns or pieces that influence d4, e4, d5, e5. Central pawns shut down the opponent's pieces and open lanes for your own.\n\n**2. Develop your pieces** (knights before bishops, *generally*). A piece on its starting square does nothing. Move each minor piece exactly once in the opening unless there is a tactical reason to move it again.\n\n**3. Castle early — king safety first.** Most miniatures are punishments for an uncastled king sitting in the centre with files about to open."
      },
      {
        type: "pgn",
        pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. O-O Nf6 5. d3 d6 6. c3 O-O",
        annotations: {
          1: "**Centre.** Both sides claim a central pawn.",
          3: "**Develop.** Knight before bishop, attacking e5.",
          4: "Black mirrors. Two pieces out, central tension established.",
          5: "**King safety.** White castles on move four — exemplary.",
          7: "A reserve square for the bishop and a future d4 break.",
          9: "Both sides have completed the opening by move six. From here it is a real game; no one has weak squares, no one has lost time."
        },
        caption: "The Italian Pianissimo — a textbook execution of all three principles."
      },
      {
        type: "heading",
        value: "When to break the rules"
      },
      {
        type: "text",
        value:
          "- **You CAN delay castling** when the centre is closed and your king is safer in the middle than after committing to a side. A common King's Indian theme.\n- **You CAN move a piece twice** when the opponent attacks it, or when there is a forcing tactic.\n- **You CAN ignore development for a tempo** when sacrificing for initiative — that is what gambits do.\n- **You CANNOT** chase a single pawn with your queen on move four while your minors stand at home. That is the *Scholar's Mate* family of self-destruction. The rule of thumb: bring the queen out late, after the minor pieces."
      },
      {
        type: "interactive",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        prompt: "White just played 2.Nf3, attacking e5 and developing. Black to move — apply the principles.",
        solution: "Nc6",
        explanation:
          "**Nc6** does three principled jobs at once: it develops a piece, defends the attacked e5 pawn, and supports a future ...d5 break. Notice it is the *knight*, not the bishop. Knights before bishops, because the knight has fewer good squares so its choice is more obvious."
      }
    ],
    quiz: [
      {
        question: "Why is 'knights before bishops' a useful default?",
        options: [
          "Knights are more valuable than bishops.",
          "Knights have fewer reasonable squares, so the choice is easier and bishops can be developed once you see the resulting pawn structure.",
          "It is a FIDE rule."
        ],
        answer: 1,
        explanation:
          "Knights belong on f3/c3 (or f6/c6) in most openings. Bishops have several plausible diagonals; commit them after the pawn structure tells you which diagonal is best."
      },
      {
        question: "Which is the WORST violation of opening principles?",
        options: [
          "Delaying castling because the centre is closed.",
          "Moving a knight twice to win a tempo on the queen.",
          "Bringing the queen out on move 3 to chase a pawn while the minor pieces stay home."
        ],
        answer: 2,
        explanation:
          "Early queen forays lose tempo to natural developing moves and put the queen at risk. The other two are legitimate, situational decisions."
      }
    ],
    further: [
      "Italian Game and Spanish (Ruy López) are the canonical principle-respecting openings — see the Opening Explorer.",
      "Famous demonstration: Morphy vs Duke of Brunswick & Count Isouard, Paris Opera 1858."
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
    content: [
      {
        type: "text",
        value:
          "A repertoire is a *small* set of openings you actually know. Not a library you've heard of — a toolkit you've used. The most common amateur mistake is breadth without depth: 20 openings, 5 moves deep each, every game out of book by move 6 with no plan."
      },
      {
        type: "heading",
        value: "Classical vs hypermodern, 1.e4 vs 1.d4"
      },
      {
        type: "text",
        value:
          "- **1.e4 — open games.** Sharp, tactical, lots of forcing lines. Italian, Spanish, Scotch as White; the Sicilian, French, Caro-Kann, Petroff as Black. Suits players who like calculation.\n- **1.d4 — closed/semi-closed games.** Slower manoeuvring, structural play, long-term plans. QGD, Slav, Nimzo-Indian, King's Indian, Grünfeld. Suits players who like strategy.\n- **Hypermodern (Réti 1.Nf3, English 1.c4, KIA).** Let Black occupy the centre, then strike at it from the flanks. Suits patient players who like piece play over pawn play.\n- **Flank openings (1.b3, 1.g3, 1.b4).** Surprise weapons; light on theory, heavy on understanding."
      },
      {
        type: "text",
        value:
          "Match the opening to *yourself*, not to the latest super-GM. If you hate calculating long forced lines, do not play the Najdorf because Magnus does. If you go to sleep in slow positions, do not pick the London."
      },
      {
        type: "heading",
        value: "Cover both colours"
      },
      {
        type: "text",
        value:
          "A complete repertoire needs four pieces:\n- One opening as **White** (e.g. you play 1.e4 → know Italian + an anti-Sicilian + lines vs Caro/French).\n- One reply to **1.e4 as Black** (Caro-Kann, French, Sicilian, e4 e5, Petroff).\n- One reply to **1.d4 as Black** (QGD, Slav, KID, Nimzo+QID, Grünfeld).\n- One reply to **everything else** (vs 1.Nf3, 1.c4, 1.b3 — usually you can transpose to one of the above)."
      },
      {
        type: "pgn",
        pgn: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3 Nd7 8. h5 Bh7 9. Bd3 Bxd3 10. Qxd3 e6 11. Bd2 Ngf6",
        annotations: {
          1: "Caro-Kann — a solid, strategic answer to 1.e4 that I'll use to demonstrate 'depth'.",
          7: "Classical Variation. Black gives up the c8-bishop early but in return gets a rock-solid pawn structure and easy development.",
          12: "**Black has no weaknesses, no exposed pieces, a clear plan** (...c5 or ...Qc7 + ...O-O-O). The opening achieved its job: a playable middlegame the Black side knows well. Two GMs both knowing this line through move 20 is normal — *that* is depth."
        },
        caption: "Caro-Kann Classical — a representative 'as Black vs 1.e4' choice for solid players."
      },
      {
        type: "heading",
        value: "Style cheat sheet"
      },
      {
        type: "text",
        value:
          "- **Tactical / aggressive:** 1.e4; Sicilian, King's Indian, Grünfeld.\n- **Positional / strategic:** 1.d4 or 1.c4; Caro-Kann, French, QGD, Slav, Catalan.\n- **Solid / drawish:** 1.d4 London System; Petroff, Berlin Wall, QGD Lasker.\n- **Surprise / dynamic:** Scotch, Vienna; Albin Counter-Gambit, Benko, Sveshnikov."
      },
      {
        type: "interactive",
        fen: "rnbqkbnr/pp2pppp/2p5/8/4N3/8/PPPP1PPP/R1BQKBNR b KQkq - 0 4",
        prompt: "You're playing the Caro-Kann Classical as Black. White has captured on e4 with the knight. What's the main-line developing move?",
        solution: "Bf5",
        explanation:
          "**Bf5** — the whole point of the Caro-Kann. Black solves the perennial French-Defence problem (a bad light-squared bishop) by developing it *outside* the pawn chain before playing ...e6. Knowing this *plan* is more valuable than memorising 15 moves of the Najdorf."
      }
    ],
    quiz: [
      {
        question: "An amateur knows 18 openings, 4-5 moves deep each. What's the biggest issue?",
        options: [
          "They don't know enough openings.",
          "They are out of theory and out of plans by move 6 in every game.",
          "They should pick more aggressive lines."
        ],
        answer: 1,
        explanation: "Width without depth means you're improvising from move 6 onwards in every game. Two openings deep beats twenty shallow."
      },
      {
        question: "You enjoy long manoeuvring games and dislike sharp tactics. Which White first move suits you better?",
        options: ["1.e4", "1.d4", "It does not matter, style is a myth."],
        answer: 1,
        explanation: "1.d4 leads to slower, more structural games on average. 1.e4 tends to open the position and reward calculation."
      },
      {
        question: "Which is NOT part of a complete repertoire?",
        options: [
          "A reply to 1.e4 as Black.",
          "A reply to 1.d4 as Black.",
          "A different system for every possible opening you might face."
        ],
        answer: 2,
        explanation: "You only need one solid answer to each White first move. Most odd openings transpose to lines you already know."
      }
    ],
    further: [
      "Pick ONE of: Italian / Spanish / Scotch / London as your White system and play 50 games with it before adding another.",
      "Most flank and irregular openings can be met by reaching a structure you already know."
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
    content: [
      {
        type: "text",
        value:
          "Most opening study is wasted because it's *move memorisation* divorced from understanding. You memorise 14 moves, your opponent plays the 4th-best move on move 6, and you have no idea what to do because you never learned the *plans*."
      },
      {
        type: "heading",
        value: "Ideas before moves"
      },
      {
        type: "text",
        value:
          "For every opening you adopt, write down on one page:\n- **The pawn structure** it usually produces (IQP? Carlsbad? Maróczy bind? Closed centre?).\n- **Typical pawn breaks** for both sides (e.g. ...c5, ...e5, ...f5, ...b5).\n- **Where each minor piece belongs** (e.g. Nimzo: knight on c3 will eventually be doubled-pawned — accept it for the bishop pair).\n- **The middlegame plan** (minority attack? king-side pawn storm? blockade the IQP?).\n- **The endgame implications** (who has the better structure if queens come off on move 14?)."
      },
      {
        type: "pgn",
        pgn: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 c6 6. e3 Be7 7. Bd3 Nbd7 8. Qc2 O-O 9. Nf3 Re8 10. O-O Nf8 11. Rab1 a5 12. a3",
        annotations: {
          7: "**Carlsbad pawn structure** — White has pawns on d4/e3, Black on c6/d5. *This* is what you study, not the move order.",
          14: "Black's plan: the 'minor piece dance' — Nf8, Ng6, Bd6 — preparing a kingside attack with ...h6/g5 or central play with ...Ne4.",
          22: "**White's plan: the minority attack** — b2-b4-b5xc6, leaving Black with a weak c-pawn. *This* is the entire point of 4.cxd5. If you don't know this you don't know the QGD Exchange — even if you know 25 moves of theory."
        },
        caption: "QGD Exchange Variation — Carlsbad structure. Studying THIS structure equips you for hundreds of games."
      },
      {
        type: "heading",
        value: "Use your own games"
      },
      {
        type: "text",
        value:
          "**The single most useful opening study you can do:** annotate your own losses and find the move you went out of book. That move tells you what to study next. The encyclopaedic line you don't need is the one your opponents never play. Spend your study budget on positions *you actually reach*."
      },
      {
        type: "heading",
        value: "Memorise structure, not novelties"
      },
      {
        type: "text",
        value:
          "If you forget the move-12 novelty you can reconstruct it from the plan. If you forget the plan, no amount of memorised novelties will save you. **Plan > moves.**"
      },
      {
        type: "interactive",
        fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR b KQkq - 0 4",
        prompt: "Nimzo-Indian: 1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3. Black has a clear plan (control e4, double White's c-pawns, accept slight cramp for the bishop pair). What's the most flexible developing move?",
        solution: "O-O",
        explanation:
          "**O-O** — castle and stay flexible. Black hasn't yet committed to ...c5, ...d5, ...b6 or ...Bxc3. Castling first preserves *all* the typical Nimzo plans (Hübner with ...c5+...d6, classical with ...d5+...c5, or queen's-indian-ish ...b6+...Bb7). Bringing the king to safety while the bishop sits on b4 keeping the c3 knight pinned is the textbook flexible move-order."
      }
    ],
    quiz: [
      {
        question: "Your opponent played the 'wrong' move on move 5 and you don't know the resulting line. Best approach?",
        options: [
          "Reconstruct the right plan from the pawn structure and piece placement.",
          "Try to remember a similar move from a book you read three years ago.",
          "Resign — you're out of book."
        ],
        answer: 0,
        explanation: "Plans transfer; memorised lines don't. Knowing why moves are played is what lets you find the right move when your opponent goes off-script."
      },
      {
        question: "Which study method gives the highest return per hour?",
        options: [
          "Memorising the first 18 moves of every Najdorf sub-variation.",
          "Annotating your own recent games to find where you (or the opponent) left book, and studying that.",
          "Watching opening videos at 2x speed without taking notes."
        ],
        answer: 1,
        explanation: "Your own games are a perfectly tailored curriculum: every position is one you actually reach."
      }
    ],
    further: [
      "Soltis, *Pawn Structure Chess* — the canonical 'study structures, not moves' book.",
      "Annotate one of your own losses per week. Find the move where you stopped knowing what to do."
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
    content: [
      {
        type: "text",
        value:
          "Traps are not a serious way to win — strong players defuse them in seconds. But two facts make them worth a lesson: (1) club opponents fall into them constantly, and (2) *you* will too if you don't know them. Each of these traps has a clear *signal* — once you spot it, you avoid it forever."
      },
      {
        type: "heading",
        value: "Légal's Mate (Philidor)"
      },
      {
        type: "text",
        value:
          "The granddaddy. White sacrifices the queen to mate with three minor pieces. The signal: **a pinned knight is not actually pinned if breaking the pin gives mate**."
      },
      {
        type: "pgn",
        pgn: "1. e4 e5 2. Nf3 d6 3. Bc4 Bg4 4. Nc3 g6 5. Nxe5 Bxd1 6. Bxf7+ Ke7 7. Nd5#",
        annotations: {
          5: "Black 'pins' the f3 knight. Looks safe.",
          6: "**The 'pin' is broken!** White grabs the e5 pawn because ...Bxd1 walks into mate.",
          7: "Greedy — Black should play Ke7 hoping to hold. ...Bxd1?? is the natural-looking blunder.",
          10: "**Légal's Mate.** Three minor pieces deliver checkmate while the Black queen never moved. Avoid as Black: do not play 3...Bg4 + 4...g6. Spot as White: any time your knight is 'pinned' to the queen but moving it gives mate."
        },
        caption: "Légal's Mate — the original queen sacrifice in the opening."
      },
      {
        type: "heading",
        value: "Fried Liver Attack (Italian Two Knights)"
      },
      {
        type: "text",
        value:
          "The trap White wants: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 **Nxd5?** 6.Nxf7! Kxf7 7.Qf3+ — Black's king is dragged to e6 and the position is brutally lost. The signal: any time White's knight on g5 hits f7 with extra support, recapturing on d5 with the knight is asking for trouble. The safe move is **5...Na5** (Polerio Defence), giving back the pawn cleanly."
      },
      {
        type: "interactive",
        fen: "r1bqkb1r/ppp2ppp/2n2n2/3Pp1N1/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 5",
        prompt: "Two Knights Defence: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5. Black to move — DON'T fall into the Fried Liver. What's the safe move?",
        solution: "Na5",
        explanation:
          "**5...Na5** — the Polerio (or 'main-line') defence. Black attacks the c4 bishop and is happy to give back the pawn after 6.Bb5+ c6 7.dxc6 bxc6 8.Be2. The greedy 5...Nxd5? loses to 6.Nxf7! and the king is hunted from f7 to e6. Theory has worked out 5...Na5 in great depth and Black is fine."
      },
      {
        type: "heading",
        value: "Englund Gambit trap"
      },
      {
        type: "text",
        value:
          "The trap *Black* wants vs unprepared 1.d4 players: **1.d4 e5 2.dxe5 Nc6 3.Nf3 Qe7 4.Bf4?? Qb4+** wins the b2-pawn and the rook on a1 (5.Bd2 Qxb2 6.Bc3 Bb4!). Most White players know to defend with **4.Nc3** or **4.a3** instead. Sound? No. Surprising at club level? Constantly."
      },
      {
        type: "heading",
        value: "Noah's Ark trap (Ruy López)"
      },
      {
        type: "text",
        value:
          "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 d6 5.d4 b5 6.Bb3 Nxd4 7.Nxd4 exd4 8.Qxd4? c5! 9.Qd5 Be6 10.Qc6+ Bd7 11.Qd5 c4 — and the b3-bishop is **trapped** behind Black's pawn wall. The signal: any time the Spanish bishop is on b3 and Black has the c4-square available with ...c5 + ...c4, watch out."
      },
      {
        type: "heading",
        value: "Trompowsky bishop trap"
      },
      {
        type: "text",
        value:
          "Two-edged. After **1.d4 Nf6 2.Bg5 c5 3.d5 Qb6** the Black queen attacks both b2 and the g5 bishop. White's standard defence is 4.Nc3 (defending b2 and protecting the bishop indirectly via tactics). Greedy 4.Bxf6?? exf6 leaves the b2 pawn dropping with tempo. The signal for Trompowsky players: **don't leave the b2 pawn AND the g5 bishop both hanging on the same move**."
      },
      {
        type: "heading",
        value: "Lasker trap (Albin Counter-Gambit)"
      },
      {
        type: "text",
        value:
          "The most famous *underpromotion* in the opening. **1.d4 d5 2.c4 e5 3.dxe5 d4 4.e3? Bb4+ 5.Bd2 dxe3 6.Bxb4?? exf2+ 7.Ke2 fxg1=N+!** — promoting to a knight (not a queen) wins the game with a discovered check picking up White's queen. Underpromotion is so unusual that even strong club players miss it. Worth knowing as Black; worth avoiding 4.e3 entirely as White (play 4.Nf3)."
      },
      {
        type: "text",
        value:
          "**General trap-defence rule:** if your opponent's last move makes no sense by ordinary developing logic, *stop and look for the tactic.* They are not being random; they are setting something up."
      }
    ],
    quiz: [
      {
        question: "In Légal's Mate, what's the conceptual lesson?",
        options: [
          "Never pin a knight.",
          "A piece is only pinned if breaking the pin doesn't give mate or win material immediately.",
          "Always trade queens early."
        ],
        answer: 1,
        explanation: "Pins relax when the pinned piece can move with sufficient threat. Always check the consequences of breaking the pin before relying on it."
      },
      {
        question: "Black plays the Englund Gambit (1.d4 e5). What's the safe White response?",
        options: ["4.Bf4 (or any natural developing move)", "4.Nc3 / 4.a3 — defend b2 calmly and develop", "Decline the pawn with 2.d5"],
        answer: 1,
        explanation: "4.Nc3 (defending b2 indirectly via tactics) or 4.a3 (preventing ...Qb4+) keeps the extra pawn cleanly. 2.d5 isn't necessary — Black's gambit is unsound and White just defends."
      },
      {
        question: "The Lasker trap in the Albin Counter-Gambit ends with what unusual move?",
        options: [
          "A queen sacrifice.",
          "An underpromotion to a knight.",
          "Castling queenside with check."
        ],
        answer: 1,
        explanation: "...fxg1=N+ — promoting to a knight (not a queen) is the only move that delivers check and wins material. Easy to miss because we promote to queens by reflex."
      }
    ],
    further: [
      "Lessons in basic-tactics for the underlying patterns: pins, deflections, discovered checks.",
      "Know one trap from each opening you play — both as bait and as something to avoid."
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
    content: [
      {
        type: "text",
        value:
          "Here is the secret of the strongest players: **the opening is a tool to reach a middlegame structure they understand**. They aren't memorising 25 moves so they can blitz a novelty — they are choosing an opening that produces a position type they know how to play. If you learn to recognise the structure, the plans choose themselves."
      },
      {
        type: "heading",
        value: "The four structures every player should recognise"
      },
      {
        type: "text",
        value:
          "**1. Isolated Queen's Pawn (IQP)** — White has a pawn on d4, no c- or e-pawn next to it. Comes from many openings (QGD Tarrasch, Caro-Kann Panov, Nimzo with ...c5/...d5, several Sicilians). *Plan for the IQP side:* attack on the kingside, push d5 break, use the half-open files. *Plan vs IQP:* blockade d5 with a knight, trade pieces, win the endgame.\n\n**2. Carlsbad** — White pawns d4/e3, Black pawns c6/d5. Comes from the QGD Exchange. *Plan for White:* the minority attack — b2-b4-b5xc6 to leave Black with a weak c6 pawn. *Plan for Black:* counter-attack on the kingside (...Nf8-g6, ...f5).\n\n**3. Maróczy Bind** — White pawns on c4 + e4 against Black's d6/e6. Comes from Sicilian Accelerated Dragon and some English systems. *Plan for White:* squeeze, prevent ...d5, slowly improve. *Plan for Black:* the freeing breaks ...b5 or ...d5, and the dark-squared bishop on g7 is a huge piece.\n\n**4. Hedgehog** — Black has pawns on a6/b6/d6/e6 against White's c4/e4. From English / Symmetrical setups. *Plan for Black:* sit, manoeuvre, wait for the right moment to strike with ...b5 or ...d5. *Plan for White:* prevent the breaks, advance on the kingside."
      },
      {
        type: "heading",
        value: "Why structure beats memorisation"
      },
      {
        type: "text",
        value:
          "Memorising moves works *until your opponent leaves theory*, which is on move 7 against a club player. Structure-based thinking works **forever** because every game ends up in one of a few dozen recognisable structures. Spend an hour learning the IQP, and you'll know what to do in 15% of all your games for the rest of your life."
      },
      {
        type: "pgn",
        pgn: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d5 6. exd5 Nxd5 7. Nxd5 exd5 8. Be2 Nc6 9. O-O Be7 10. c4 d4",
        annotations: {
          12: "**Structural moment.** Black's d5-pawn becomes an IQP after a future ...d4 push or trade. The whole game now is about that pawn.",
          16: "**This is the deal.** Black accepts an isolated d-pawn in exchange for piece activity, half-open e- and c-files, and a queen-side outpost. *White's job:* trade pieces, blockade d5 with a knight, win the endgame. *Black's job:* attack the kingside before pieces come off.",
          20: "Both players now know their plans without 'memorising' anything past this point. The structure dictates the strategy."
        },
        caption: "An IQP arises from a Sicilian. The opening was a delivery vehicle for the structure."
      },
      {
        type: "heading",
        value: "How to use this practically"
      },
      {
        type: "text",
        value:
          "When you choose an opening, ask: **what structure does this produce?** Then study that structure separately, in model games. After that, you can almost forget the opening moves — once you reach the structure, you'll know what to do."
      },
      {
        type: "interactive",
        fen: "r1bqkbnr/pp1ppp1p/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R b KQkq - 0 5",
        prompt: "Sicilian Accelerated Dragon: 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.c4. White has set up the Maróczy Bind. As Black, you're going to live with this structure for 30 moves — first develop the kingside knight.",
        solution: "Nf6",
        explanation:
          "**Nf6** — develop, prepare ...Bg7 + ...O-O. The Maróczy Bind isn't refuted by any single move; Black's plan is long-term: complete development, double-fianchetto sometimes, find the right moment for ...b5 or ...d5. **Knowing this** matters more than memorising 12 moves of any Maróczy line. The opening served its purpose by depositing you in a structure you understand — now play the structure."
      }
    ],
    quiz: [
      {
        question: "What's the typical White plan in the Carlsbad structure (QGD Exchange)?",
        options: [
          "Sacrifice the exchange on c3.",
          "The minority attack: b2-b4-b5xc6 to weaken Black's c-pawn.",
          "King-side pawn storm with g4-g5."
        ],
        answer: 1,
        explanation: "The minority attack is the textbook Carlsbad plan. Two pawns (a, b) attack three (a, b, c) to create a weak c6 pawn for Black."
      },
      {
        question: "Why is structure-based opening study more powerful than line-memorisation for an improving player?",
        options: [
          "Because memorisation is impossible.",
          "Because you reach a recognisable structure in nearly every game, while specific theoretical lines only occur when both sides cooperate.",
          "Because GMs say so."
        ],
          answer: 1,
          explanation: "Structures generalise across openings; memorised novelties only fire when the opponent plays the exact line. Structure knowledge compounds; line-memorisation depreciates."
      },
      {
        question: "If you adopt a new opening, the FIRST thing to learn is...",
        options: [
          "The first 15 moves of the main line.",
          "The pawn structure it tends to produce, and the resulting plans for both sides.",
          "All the gambits Black might try."
        ],
        answer: 1,
        explanation: "Structure first; lines fall out of structure. The middlegame your opening leads to is the actual game you'll be playing."
      }
    ],
    further: [
      "Soltis, *Pawn Structure Chess* — covers IQP, Carlsbad, Maróczy, Hedgehog, French chains, Stonewall, Closed Sicilian.",
      "Find one model master game per structure — see the Master Games section."
    ]
  }
];
