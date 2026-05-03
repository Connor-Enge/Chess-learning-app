// Endgame TRACK — conceptual / teaching lessons about endgames.
// These are distinct from the interactive Endgame Trainer (which has drill positions
// vs Stockfish). The trainer covers WHAT to do; these lessons cover WHY.
//
// Each lesson follows the canonical lesson shape (see js/views/lessons.js for the
// renderer). Content blocks: text, heading, board, pgn, interactive. Plus quiz[].
//
// Source material: docs/research/endgames.md.

export const LESSONS_ENDGAME = [

  // ----------------------------------------------------------------
  // 1. K + P vs K — opposition and key squares
  // ----------------------------------------------------------------
  {
    id: "end-001-kpk-opposition",
    title: "King and pawn vs king: opposition and key squares",
    track: "endgame",
    order: 1,
    estimatedMinutes: 14,
    objective: "Win K+P vs K (non-rook-pawn) and recognise the rook-pawn draw.",
    tags: ["endgame", "pawn-endings", "fundamentals"],
    next: "end-002-rule-of-square",
    content: [
      {
        type: "text",
        value: "K+P vs K is the simplest endgame that still requires real technique. Strong players know it cold; everyone else loses half-points to it for years. Two ideas decide every position: **opposition** and **key squares**."
      },
      {
        type: "heading",
        value: "Opposition — the rule"
      },
      {
        type: "text",
        value: "Two kings on the same file, rank, or diagonal with one square between them. The player **NOT to move** holds the opposition: the kings cannot stand next to each other, so the side on move must give way. Opposition is how you push the enemy king out of the squares your pawn needs."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/8/8/8/8/4K3 w - - 0 1",
        prompt: "It is White to move. Which king move seizes the distant opposition?",
        solution: "Ke2",
        explanation: "**1.Ke2!** With kings on e8 and e2 (five squares between them, an odd number), it is now Black to move and Black holds no opposition. Whichever way the Black king steps, White answers by mirroring up the board until direct opposition is reached and the Black king is forced to give way."
      },
      {
        type: "heading",
        value: "Key squares"
      },
      {
        type: "text",
        value: "For a pawn on the 2nd–5th rank, the **key squares** are the three squares two ranks ahead (e.g. for a pawn on e4: d6, e6, f6). For a pawn on the 6th rank, the key squares are the three squares directly in front of and beside it on ranks 6 and 7. **If your king reaches a key square, you win** — regardless of opposition.\n\nHere is the textbook winning structure: White's king two ranks ahead of the pawn."
      },
      {
        type: "board",
        fen: "4k3/8/4K3/4P3/8/8/8/8 b - - 0 1",
        caption: "White's king on e6 already occupies a key square of the e5-pawn. Black to move can only step aside; White then walks the king around to escort the pawn home."
      },
      {
        type: "pgn",
        startFen: "4k3/8/4K3/4P3/8/8/8/8 b - - 0 1",
        pgn: "1... Kd8 2. Kf7 Kd7 3. e6+ Kd8 4. e7+ Kd7 5. e8=Q+",
        annotations: {
          1: "Black gives way (1...Kf8 is mirrored by 2.Kd7 with the same idea).",
          2: "**2.Kf7!** White grabs the key square. The pawn now rolls in supported by the king.",
          3: "Black tries to come back, but it is too late.",
          4: "**3.e6+** — the pawn pushes with check; Black has no time to harass.",
          6: "**5.e8=Q+** White promotes. Notice the king did all the work; the pawn just walked behind it."
        }
      },
      {
        type: "heading",
        value: "The rook-pawn exception"
      },
      {
        type: "text",
        value: "Rook pawns (a- and h-pawns) draw if the defending king reaches the queening corner. The attacker has no way to step out of the pawn's path without either losing the pawn or stalemating. **This is the most important defensive resource in king-and-pawn endings.**"
      },
      {
        type: "pgn",
        startFen: "k7/8/PK6/8/8/8/8/8 b - - 0 1",
        pgn: "1... Kb8 2. a7+ Ka8 3. Ka6",
        annotations: {
          1: "Black king sits in the corner and shuffles.",
          2: "White pushes with check, but...",
          3: "**3.Ka6 — stalemate.** Black has no legal move: Ka7 is occupied, Kb8 is attacked by the pawn. Half a point saved."
        }
      },
      {
        type: "interactive",
        fen: "k7/P7/8/1K6/8/8/8/8 b - - 0 1",
        prompt: "Black to move. The white pawn is one square from queening. Find the only move that holds the draw.",
        solution: "Kxa7",
        explanation: "**1...Kxa7!** Black grabs the pawn. With the white king on b5 (not yet on a6 or b6), nothing supports the pawn — and a lone king cannot mate. **Draw by insufficient material.** The lesson: against a rook pawn, look first for a way to capture it; the corner-stalemate idea is the backup."
      }
    ],
    quiz: [
      {
        question: "Your king is on e6, your pawn on e5, the enemy king on e8 with Black to move. What is the result?",
        options: ["White wins easily", "Drawn — Black holds the opposition", "Drawn only if White is careless"],
        answer: 0,
        explanation: "White's king is already on a key square (e6). Black has no good move: Kd8 is met by Kf7, and Kf8 by Kd7 — either way White escorts the pawn to promotion."
      },
      {
        question: "Why is K + a-pawn vs K often drawn?",
        options: [
          "Rook pawns promote to a weaker queen",
          "The defending king in the corner cannot be dislodged without stalemate or losing the pawn",
          "The 50-move rule kicks in faster on the edge"
        ],
        answer: 1,
        explanation: "With the defending king on a8 (or h8), the attacking king has no square to use that doesn't either lose the pawn outright or stalemate the defender. The rook-pawn corner is the great equaliser."
      },
      {
        question: "The side that holds the opposition is...",
        options: ["The side TO move", "The side NOT to move", "Whoever has the pawn"],
        answer: 1,
        explanation: "Opposition is leverage: the side on move is forced to give way because kings cannot stand adjacent. The side **not** to move dictates."
      }
    ],
    further: ["Dvoretsky's Endgame Manual — chapter on K+P vs K", "Silman's Complete Endgame Course — Class E chapter"]
  },

  // ----------------------------------------------------------------
  // 2. Rule of the Square
  // ----------------------------------------------------------------
  {
    id: "end-002-rule-of-square",
    title: "The Rule of the Square: pawn races on sight",
    track: "endgame",
    order: 2,
    estimatedMinutes: 10,
    objective: "Calculate whether a king can catch a passed pawn at a glance.",
    tags: ["endgame", "pawn-endings", "calculation"],
    next: "end-003-lucena",
    content: [
      {
        type: "text",
        value: "The Rule of the Square is the fastest legal calculation in chess. You will use it dozens of times per tournament — rarely conscious, always correct."
      },
      {
        type: "heading",
        value: "The rule"
      },
      {
        type: "text",
        value: "Imagine a square whose side equals the number of squares the pawn must travel to reach the promotion rank. If the defending king is **inside** that square (or can step into it on its move), the king catches the pawn. Otherwise, the pawn promotes."
      },
      {
        type: "board",
        fen: "8/8/8/5k2/8/8/3P4/3K4 w - - 0 1",
        caption: "White pawn on d2 wants to promote on d8. Imagine the 6×6 square d3–i3–i8–d8 (the pawn's first step is from d2 but it can move two squares, so count from d3). The black king on f5 is inside the square. Black catches it."
      },
      {
        type: "pgn",
        startFen: "8/8/8/5k2/8/8/3P4/3K4 w - - 0 1",
        pgn: "1. d4 Ke6 2. d5+ Kd6",
        annotations: {
          1: "**1.d4** — the pawn uses its two-square first move; the new square is now d5–h5–h8–d8.",
          2: "**1...Ke6** Black steps into the smaller square.",
          3: "**2.d5+** Pushed with check.",
          4: "**2...Kd6** Black blockades. The king is now in front of the pawn; it will simply scoop it up next move. **Drawn.**"
        }
      },
      {
        type: "heading",
        value: "Watch out for the starting square"
      },
      {
        type: "text",
        value: "A pawn on its 2nd rank can move two squares on its first move. **Count the square as if the pawn were already on the 3rd rank.** A common blunder is drawing the square one rank too small and assuming you have caught a pawn that actually queens with tempo."
      },
      {
        type: "heading",
        value: "When the rule lies"
      },
      {
        type: "text",
        value: "The rule assumes a clear path for the defending king. If a friendly pawn or any piece blocks the route, you may not actually be able to step into the square. **Always verify with concrete moves when the position is even slightly cluttered.**"
      },
      {
        type: "interactive",
        fen: "8/8/8/8/4k3/8/3P4/3K4 b - - 0 1",
        prompt: "Black to move. The white pawn on d2 wants to promote (count from d3 — two-square first move). Find the move that steps inside the pawn's square and catches it.",
        solution: "Kd4",
        explanation: "**1...Kd4!** Black walks straight at the pawn, into the 6×6 square that runs from d3 to h3 to h8 to d8. The pawn cannot promote: after **2.d3 Kxd3** (or 2.Kc2 Kc4 then Kxd2) Black collects it. The general principle: when in doubt, march **toward** the pawn — every step toward it shrinks the square."
      },
      {
        type: "heading",
        value: "Multi-pawn corollary: 'Passed pawns must be pushed'"
      },
      {
        type: "text",
        value: "Aron Nimzowitsch's maxim. A passed pawn is a dynamic asset that loses value when stationary — give the defender time and they organise a blockade. Push the candidate first; let the rule of the square do the calculating for you. The threat of promotion ties down enemy pieces while your other pieces clean up elsewhere."
      },
      {
        type: "board",
        fen: "8/p4k2/8/5K2/3P1P1P/8/8/8 w - - 0 1",
        caption: "The classic outside-passer scenario. White's h-pawn is the candidate; once it runs, the black king must abandon the queenside, and White's king devours a7 and b7."
      }
    ],
    quiz: [
      {
        question: "A white pawn is on c2; the black king is on g4. Black to move. Does Black catch the pawn?",
        options: ["Yes — easily", "No — the pawn promotes", "Only if Black plays the right move"],
        answer: 1,
        explanation: "The pawn travels c2→c8 (count from c3 because of the two-square first move): six squares. Square is c3–h3–h8–c8. The black king on g4 is OUTSIDE that square. The pawn promotes."
      },
      {
        question: "What does 'passed pawns must be pushed' mean in practice?",
        options: [
          "Push with the pawn closest to its promotion rank only",
          "Advance the candidate immediately — a stationary passer loses value as the defender organises",
          "Only push a passed pawn when the king can support it"
        ],
        answer: 1,
        explanation: "Nimzowitsch's principle: time is on the defender's side once the position is static. A passed pawn that moves creates threats; a passed pawn that sits is just a hostage."
      }
    ],
    further: ["Dvoretsky's Endgame Manual — pawn races", "Nimzowitsch, *My System* — passed-pawn chapter"]
  },

  // ----------------------------------------------------------------
  // 3. Lucena Position
  // ----------------------------------------------------------------
  {
    id: "end-003-lucena",
    title: "The Lucena Position: building the bridge",
    track: "endgame",
    order: 3,
    estimatedMinutes: 16,
    objective: "Convert R+P vs R when the king is in front of the pawn on the 7th rank.",
    tags: ["endgame", "rook-endings", "fundamentals"],
    next: "end-004-philidor",
    content: [
      {
        type: "text",
        value: "The Lucena Position is the foundational winning technique in rook endings. If you can reach this set-up — your king in front of your pawn on the 7th rank, the enemy king cut off — you win. The technique is called **building the bridge**."
      },
      {
        type: "heading",
        value: "The position"
      },
      {
        type: "board",
        fen: "1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1",
        caption: "White: Kb8, Pb7, Rc1. Black: Kd7, Ra2. The pawn is one move from queening; the only obstacle is that the white king is locked in front of its own pawn and cannot escape the side checks the black rook will deliver."
      },
      {
        type: "heading",
        value: "The four-step plan"
      },
      {
        type: "text",
        value: "1. **Place your rook on the 4th rank** (counting from the pawn). This is the bridge — it will eventually block a side check.\n2. **Drive the enemy king further away** with a check from the 4th-rank rook.\n3. **Walk your king out** along the file beside the pawn.\n4. **When the enemy rook checks from the side, interpose your own rook** on the 4th rank. The bridge closes; the pawn promotes."
      },
      {
        type: "pgn",
        startFen: "1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1",
        pgn: "1. Rc4 Rb2 2. Rd4+ Ke6 3. Kc7 Rc2+ 4. Kb6 Rb2+ 5. Ka5 Ra2+ 6. Ra4",
        annotations: {
          1: "**1.Rc4!** The bridge-builder. The rook will sit on the 4th rank waiting to interpose.",
          2: "Black tries to attack the pawn; it is defended by the king.",
          3: "**2.Rd4+** Now the rook chases the black king from its bridge square. Black's king must give ground.",
          5: "**3.Kc7!** The white king finally steps out of the way of its pawn.",
          6: "Side checks begin.",
          7: "**4.Kb6** White walks down the file. The pawn behind the king blocks nothing — it's beyond the king on the file.",
          9: "**5.Ka5!** White heads for the wing, not retreating but preparing the bridge.",
          11: "**6.Ra4!** The bridge closes. The white rook interposes, defended by its king. Black cannot capture; nor can Black continue checking. The pawn promotes next move. **White wins.**"
        }
      },
      {
        type: "interactive",
        fen: "2K5/1P6/2k5/8/3R4/8/r7/8 w - - 0 1",
        prompt: "White to move. Black has just played Ra2 hoping for ...Rc2+. Find the move that completes the bridge and seals the win.",
        solution: "Rc4+",
        explanation: "**1.Rc4+!** The bridge interposes with check. Black must move the king (no Black piece can capture Rc4: it is defended by the would-be queen on b8 after promotion, but more concretely: Black king on c6 must move out of check). After Black's king move, **2.b8=Q** promotes, and the queen plus rook overwhelm the lone black rook. **The fourth-rank rook is the entire idea of Lucena.**"
      },
      {
        type: "heading",
        value: "Why it works"
      },
      {
        type: "text",
        value: "The white king cannot escape the rook checks on its own — there is no shelter, and the pawn is *beside* the king, not protecting it from sideways attack. The bridge gives the king a permanent shield that travels with it. Once the rook is on the 4th rank, no number of side checks can prevent promotion."
      }
    ],
    quiz: [
      {
        question: "Why is the rook placed specifically on the 4th rank when building the bridge?",
        options: [
          "It is the rank where the rook is least exposed to capture",
          "It puts the rook three ranks from the king, the exact distance needed to block a side check while staying defended",
          "Tradition — the rule is named after Lucena's 1497 manuscript"
        ],
        answer: 1,
        explanation: "The bridge interposes on the 4th rank between the king (now on the 5th rank, e.g. a5) and the checking rook on the same file. Three squares away is exactly the right distance: close enough to be defended by the king, far enough that the king has room to escape the file."
      },
      {
        question: "What goes wrong if you try to win Lucena WITHOUT building the bridge?",
        options: [
          "The pawn promotes but the resulting Q+R vs R is drawn",
          "The black rook delivers endless side checks and the white king never escapes its own pawn — drawn",
          "It takes more than 50 moves and the 50-move rule applies"
        ],
        answer: 1,
        explanation: "Without the rook waiting on the 4th rank, every step the white king takes onto an open file invites another check from the black rook. The king cannot hide behind the pawn (the pawn is in the wrong place to shield it). The bridge IS the win."
      }
    ],
    further: ["Dvoretsky's Endgame Manual — Lucena chapter", "Capablanca's *Chess Fundamentals* — rook endings"]
  },

  // ----------------------------------------------------------------
  // 4. Philidor Position
  // ----------------------------------------------------------------
  {
    id: "end-004-philidor",
    title: "Philidor's Defence: drawing rook and pawn vs rook",
    track: "endgame",
    order: 4,
    estimatedMinutes: 16,
    objective: "Hold R+P vs R when your king is in front of the enemy pawn.",
    tags: ["endgame", "rook-endings", "fundamentals", "defence"],
    next: "end-005-rook-activity",
    content: [
      {
        type: "text",
        value: "If Lucena is the most important winning technique in rook endings, Philidor's Defence is the most important drawing technique. Master it and you save half a point in dozens of practical games. Get it wrong and you walk straight into Lucena."
      },
      {
        type: "heading",
        value: "The conditions"
      },
      {
        type: "text",
        value: "Philidor applies when:\n- Your king is in front of the enemy pawn.\n- The enemy king has not yet reached the 6th rank (counting from your side, the 3rd rank).\n- You have a rook.\n\nMeet those conditions and the position is a fortress."
      },
      {
        type: "board",
        fen: "8/3k4/r7/3K4/3P4/8/8/4R3 b - - 0 1",
        caption: "White: Kd5, Pd4, Re1. Black: Kd7, Ra6 — already on the 6th rank. Black to move. The black rook on the 6th rank is the entire defence."
      },
      {
        type: "heading",
        value: "The technique in one sentence"
      },
      {
        type: "text",
        value: "**Rook on the 6th rank until the pawn advances; then check from behind.** That is Philidor's whole idea. The rook on the 6th rank stops the white king from coming forward to support the pawn. Once the pawn itself advances to the 5th rank (abandoning the 6th rank from White's side), the white king has nowhere to hide — Black switches the rook to the 1st rank and gives perpetual check."
      },
      {
        type: "pgn",
        startFen: "8/3k4/r7/3K4/3P4/8/8/4R3 b - - 0 1",
        pgn: "1... Rb6 2. Re3 Rc6 3. Ke4 Ra6 4. d5 Ra1 5. Kf5 Rf1+ 6. Kg5 Rg1+",
        annotations: {
          1: "**1...Rb6** Black just shuffles along the 6th rank. The white king cannot advance past the 5th rank — every key square (d6, e6, f6) is covered.",
          2: "White looks for a way to make progress. Without one, it tries waiting moves.",
          3: "**2...Rc6** Still on the 6th. Black is in no hurry.",
          5: "**3.Ke4** White finally steps off the d-file so the pawn can push.",
          6: "**3...Ra6** Black continues waiting on the 6th rank. The pawn must commit before Black changes plans.",
          7: "**4.d5!** The pawn advances. Now there is no longer a 6th-rank defensive job — the pawn has left it.",
          8: "**4...Ra1!** Black switches the rook to the 1st rank. Now every white king move toward the pawn invites a check from behind.",
          9: "**5.Kf5** White tries to escort the pawn. But...",
          10: "**5...Rf1+** Check on the f-file.",
          11: "**6.Kg5 Rg1+** The white king has no shelter — it has moved past its own pawn and the pawn no longer screens against the rook. Perpetual check follows. **Drawn.**"
        }
      },
      {
        type: "interactive",
        fen: "8/3k4/8/3K4/r2P4/8/8/4R3 b - - 0 1",
        prompt: "Same position, but Black's rook is no longer on the 6th rank — it has drifted to a4. Black to move. Find the move that gets the defence back on track.",
        solution: "Ra6",
        explanation: "**1...Ra6!** Get the rook back to the 6th rank immediately. Without that, the white king will simply walk to e6 or d6, support the pawn's advance, and reach Lucena. The 6th-rank rook is non-negotiable; if you lose track of it, restore it the moment you notice."
      },
      {
        type: "heading",
        value: "Why two ranks?"
      },
      {
        type: "text",
        value: "The 6th rank prevents the white king from advancing to the 6th rank to support the pawn. The 1st rank gives the rook maximum **distance** for checks from behind once the pawn has moved — White can never close that distance because it's three full ranks away from any king square. Far-away rooks cannot be shouldered aside."
      }
    ],
    quiz: [
      {
        question: "When does Black switch from the 6th rank to the 1st rank?",
        options: [
          "Immediately — the 1st rank is more active",
          "Only when the white pawn advances from the 4th to the 5th rank",
          "Only when the white king crosses the centre line"
        ],
        answer: 1,
        explanation: "The 6th-rank rook keeps the white king out. The moment the pawn advances and abandons the 6th rank, the rook drops to the 1st rank to deliver perpetual checks the white king cannot escape."
      },
      {
        question: "Why can't the white king escape the side checks once the pawn has advanced?",
        options: [
          "The pawn cannot defend the king from sideways attacks",
          "The black king blocks all escape squares",
          "Three or more ranks of separation make the rook un-chaseable"
        ],
        answer: 2,
        explanation: "All three answers contain truth, but the deciding factor is distance: with the rook on the 1st rank and the white king on the 5th or 6th, the white king cannot approach the rook fast enough to drive it away. Each step toward the rook is met with a fresh check on a new file."
      },
      {
        question: "What is the most common Philidor mistake at club level?",
        options: [
          "Forgetting to put the rook on the 6th rank early — it ends up trapped on the 8th",
          "Switching to checks too early, before the pawn has advanced",
          "Both of the above"
        ],
        answer: 2,
        explanation: "Both errors lose: rook stuck on the back rank lets the enemy king march in; rook checking too early lets the enemy king hide behind its own pawn. The technique is precise: 6th rank → wait → pawn advances → 1st rank."
      }
    ],
    further: ["Dvoretsky's Endgame Manual — Philidor chapter", "de la Villa's *100 Endgames You Must Know*"]
  },

  // ----------------------------------------------------------------
  // 5. Rook activity (Tarrasch's rule)
  // ----------------------------------------------------------------
  {
    id: "end-005-rook-activity",
    title: "Rook activity: Tarrasch's rule and the 7th rank",
    track: "endgame",
    order: 5,
    estimatedMinutes: 12,
    objective: "Place rooks where they exert maximum pressure — behind passers, on the 7th, never passively.",
    tags: ["endgame", "rook-endings", "strategy"],
    next: "end-006-opposite-color-bishops",
    content: [
      {
        type: "text",
        value: "Rook endings reward activity above almost any other factor. Strong players will give back a pawn — sometimes two — to keep the rook active. The reasons trace back to one of chess's oldest practical maxims."
      },
      {
        type: "heading",
        value: "Tarrasch's rule"
      },
      {
        type: "text",
        value: "**\"Rooks belong BEHIND passed pawns — your own and your opponent's.\"** — Siegbert Tarrasch.\n\nBehind your own passer, your rook gains scope as the pawn advances; the enemy rook (in front) loses squares with every push. Behind the enemy passer, you tie the enemy rook to passive defence — it must sit in front of the pawn to stop it — while your king roams freely."
      },
      {
        type: "board",
        fen: "r5k1/8/8/P7/8/8/R5K1/8 w - - 0 1",
        caption: "A diagram of the principle: the white rook is BEHIND the a-pawn (active, gaining squares as the pawn advances); the black rook is IN FRONT of the same pawn (passive, doing nothing but blockading). White wins through king activity while Black's rook is glued to a8."
      },
      {
        type: "pgn",
        startFen: "r5k1/8/8/P7/8/8/R5K1/8 w - - 0 1",
        pgn: "1. Kf3 Kf7 2. Ke4 Ke7 3. Kd5 Kd7 4. a6 Kc7 5. a7",
        annotations: {
          1: "**1.Kf3** Capablanca's first endgame principle: bring out the king.",
          3: "**2.Ke4** Centralise.",
          5: "**3.Kd5** White's king walks across the board unopposed; Black's king must shuffle defensively.",
          6: "**3...Kd7** Best try — Black opposes.",
          7: "**4.a6** The pawn pushes. The black rook is stuck on a8, watching its own square shrink.",
          8: "**4...Kc7** Black tries to defend the a-pawn front line.",
          9: "**5.a7** Pawn on the 7th. The black rook on a8 cannot move (Ra8 is the only square preventing promotion). White's king will now walk to b6 or c6 with decisive threats. **The passive rook lost the game.**"
        }
      },
      {
        type: "heading",
        value: "The rook on the 7th"
      },
      {
        type: "text",
        value: "A rook on the 7th rank (counting from your side) is worth roughly an extra pawn. It attacks the pawn base, restricts the enemy king to the 8th rank, and creates back-rank threats. **Two rooks on the 7th** ('pigs on the 7th') are usually decisive — they hunt down pawns while the enemy king has nowhere to hide."
      },
      {
        type: "interactive",
        fen: "6k1/5ppp/8/8/8/8/r7/4R1K1 w - - 0 1",
        prompt: "White to move. The black rook is sitting on the 7th rank (rank 2 from White's view) cutting White's king to the back. Find the move that activates White's rook to the same critical rank.",
        solution: "Re7",
        explanation: "**1.Re7!** White's rook seizes the 7th rank, attacking f7 and the pawn chain. Now both sides have an active rook, but White's also targets pawns; this neutralises Black's activity advantage. The principle: when the opponent gets a rook on the 7th, **answer with the same**, don't try to passively dislodge it."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/8/r7/4P3/4K3/3R4 w - - 0 1",
        prompt: "White to move. White wants to push the e-pawn into a passed pawn. Where should White's rook go FIRST to apply Tarrasch's rule?",
        solution: "Re1",
        explanation: "**1.Re1** repositions the rook **behind** its own pawn on the e-file. As the pawn pushes (e3-e4-e5-...), the rook gains scope along the e-file with every push. Compare with leaving the rook on d1 (it watches the pawn diagonally, not behind) or moving it to e3 (in front of the pawn — passive). Tarrasch's rule: rook behind your own passer. Set this up **before** the pawn commits forward."
      },
      {
        type: "heading",
        value: "Active rook beats passive rook — even down a pawn"
      },
      {
        type: "text",
        value: "The single most-quoted rook-ending principle: **an active rook is worth more than a pawn.** Given a choice between losing a pawn and putting your rook in jail, lose the pawn. A rook tied to passive defence is barely a piece; an active rook is a weapon."
      }
    ],
    quiz: [
      {
        question: "Tarrasch's rule says rooks belong...",
        options: [
          "In front of passed pawns — to escort them home",
          "Behind passed pawns — both yours and your opponent's",
          "On the 7th rank, always"
        ],
        answer: 1,
        explanation: "Behind your own passer the rook gains scope as the pawn advances. Behind the enemy passer, the enemy rook is forced to sit in front passively. The same rule covers both cases."
      },
      {
        question: "If your opponent achieves a rook on the 7th rank against you, the best response is generally to...",
        options: [
          "Trade rooks immediately to defuse it",
          "Get your own rook to the 7th — counter-attack with equal activity",
          "Bring the king back to defend the 8th rank"
        ],
        answer: 1,
        explanation: "Equal activity neutralises the threat. Trying to trade rooks usually requires playing passively, which makes things worse. Bringing the king back violates the endgame imperative of king activity."
      }
    ],
    further: ["Tarrasch, *The Game of Chess*", "Smyslov & Levenfish, *Rook Endings*"]
  },

  // ----------------------------------------------------------------
  // 6. Opposite-color bishops
  // ----------------------------------------------------------------
  {
    id: "end-006-opposite-color-bishops",
    title: "Opposite-coloured bishops: drawn endings, sharp middlegames",
    track: "endgame",
    order: 6,
    estimatedMinutes: 12,
    objective: "Recognise when opposite-coloured bishops draw (endings) and when they attack (middlegames).",
    tags: ["endgame", "bishop-endings", "strategy"],
    next: "end-007-basic-mates",
    content: [
      {
        type: "text",
        value: "Opposite-coloured bishops have a split personality. In **endings** they are famously drawish — even two extra pawns often fail to win. In **middlegames** with queens still on the board, they are one of the most dangerous attacking weapons in chess. Understanding which mode you are in is the difference between a half-point and a full point."
      },
      {
        type: "heading",
        value: "Why endings draw"
      },
      {
        type: "text",
        value: "Each bishop covers exactly half the board (one colour complex). The defender's bishop watches the queening square or a key blockade square that lies on **its own** colour; the attacker's bishop has no way to dislodge a piece sitting on the opposite colour. **Two extra connected passed pawns** is often still a draw if the defending bishop can blockade either of them."
      },
      {
        type: "board",
        fen: "8/5k2/5b2/4PP2/5K2/3B4/8/8 w - - 0 1",
        caption: "White is two pawns up with bishop and pawns vs bishop. But the dark-squared bishop on f6 blockades the f-pawn and eyes the e-pawn. The white light-squared bishop can never dislodge it. **Drawn.**"
      },
      {
        type: "pgn",
        startFen: "8/5k2/5b2/4PP2/5K2/3B4/8/8 w - - 0 1",
        pgn: "1. Bc4+ Ke7 2. e6 Bd4 3. Kf3 Bf6",
        annotations: {
          1: "**1.Bc4+** White tries to disturb the king with a check.",
          2: "**1...Ke7** The king sidesteps. The bishop on f6 still controls the blockade.",
          3: "**2.e6** White pushes one of the pawns to break the blockade.",
          4: "**2...Bd4** Black re-routes the bishop to a different dark square; from d4 it eyes the long diagonal and still patrols the colour complex around the white pawns.",
          5: "**3.Kf3 Bf6** Black returns to the optimal blockading square. The position has not changed in essence; White cannot make progress. **Drawn.** This is the textbook OCB fortress: a dark-squared bishop endlessly relocating to the right diagonal while the white light-squared bishop watches helplessly."
        }
      },
      {
        type: "interactive",
        fen: "8/3k4/8/3p4/3P4/2K5/4B3/2b5 w - - 0 1",
        prompt: "White to move. Material is equal, bishops on opposite colours, pawns blockading each other. Find a waiting move that keeps the bishop on its best diagonal.",
        solution: "Bd3",
        explanation: "**1.Bd3** A waiting move on the long diagonal, eyeing both wings. The position is **drawn**: with one pawn each on opposite colours and OCBs, neither side can break through. The black bishop (dark-squared) controls the colour squares White's pawn would need to advance over; the white bishop (light-squared) controls the corresponding squares for Black's pawn. **Structural stalemate** — the essence of opposite-coloured bishop endings."
      },
      {
        type: "heading",
        value: "Why middlegames attack"
      },
      {
        type: "text",
        value: "When queens are on the board, opposite-coloured bishops become **attacking weapons**. The attacker's bishop dominates one colour complex (often around the enemy king), and the defender's bishop **cannot challenge it** because it operates on the other colour. Every weakness on the attacker's colour is permanent.\n\nThis is why grandmasters often welcome opposite-coloured bishops in **complicated** positions and avoid them in **simplified** ones. Same pieces, opposite verdicts."
      },
      {
        type: "heading",
        value: "When OCB endings DO win"
      },
      {
        type: "text",
        value: "The attacker can win opposite-coloured bishop endings when:\n- They have **three or more connected passed pawns** (the defending bishop can't blockade them all).\n- Their pawns are on **both wings, far apart** (the defender's pieces overstretch).\n- The attacker's king is far more **active** than the defender's.\n\nIn all these cases the defender lacks a stable blockade square. Otherwise: trade pieces only if you are WORSE, never if you are BETTER."
      }
    ],
    quiz: [
      {
        question: "You are up two pawns in an endgame. Your opponent offers a queen trade that would leave bishops of opposite colours on the board. What should you do?",
        options: [
          "Trade — two pawns is a clear win",
          "Decline — opposite-coloured bishop endings often draw even two pawns up",
          "Trade only if your king is more active"
        ],
        answer: 1,
        explanation: "Opposite-coloured bishop endings are famously drawish. Two extra pawns is no guarantee of a win if the defender can establish a blockade on its bishop's colour. Keep the queens on; the OCB is more dangerous WITH queens, where they amplify attacks rather than freeze positions."
      },
      {
        question: "What is the defender's main resource in opposite-coloured bishop endings?",
        options: [
          "Trade the bishops at the first opportunity",
          "Establish a fortress: blockade the passed pawns on the colour of your bishop",
          "Trade the rook pawns to leave only the centre"
        ],
        answer: 1,
        explanation: "The blockade is the entire defence. Pin the attacker's pawns to squares of your bishop's colour; the attacking bishop cannot dislodge you. With the right blockade square, even two-pawn deficits hold."
      }
    ],
    further: ["Mednis, *Practical Endgame Lessons*", "Müller & Lamprecht, *Fundamental Chess Endings*"]
  },

  // ----------------------------------------------------------------
  // 7. Basic mates
  // ----------------------------------------------------------------
  {
    id: "end-007-basic-mates",
    title: "Basic mates: K+Q, K+R, K+2B (and a note on K+B+N)",
    track: "endgame",
    order: 7,
    estimatedMinutes: 14,
    objective: "Mate a lone king with each basic material configuration without stalemate accidents.",
    tags: ["endgame", "checkmating", "fundamentals"],
    next: null,
    content: [
      {
        type: "text",
        value: "Every player must be able to deliver these mates blindfolded. The 50-move rule resets every time a pawn moves or a piece is captured — but in basic mates there are neither pawns nor captures, so the clock starts ticking. **You must mate within 50 moves**, and in some cases (B+N) much faster than that."
      },
      {
        type: "heading",
        value: "K+Q vs K — the easiest mate"
      },
      {
        type: "text",
        value: "Technique:\n1. Restrict the enemy king to a smaller and smaller box using the queen.\n2. Keep the queen a **knight's move** away from the lone king at all times. This stops you from accidentally stalemating.\n3. Once the king is on the edge, walk your own king up to support.\n4. Mate on the edge."
      },
      {
        type: "pgn",
        startFen: "4k3/8/8/8/8/8/8/3QK3 w - - 0 1",
        pgn: "1. Qd5 Kf8 2. Kf2 Ke7 3. Qd6+ Kf7 4. Kf3 Kg7 5. Qe6",
        annotations: {
          1: "**1.Qd5** Restrict the king. The queen sits a knight's move away (Qd5 vs Ke8 is not quite that, but the next moves will fix it).",
          3: "**2.Kf2** Bring the white king up — this is essential; the queen alone cannot mate.",
          5: "**3.Qd6+** Force the king toward the edge. Note the queen stays a king's-move away from the lone king — never a square adjacent that would risk stalemate.",
          7: "**4.Kf3** The king keeps walking up to support.",
          9: "**5.Qe6** Squeezing the box — the lone king is now confined to g7, g8, h7, h8. From here a few more accurate moves with the white king reaches mate. Always keep the queen at least a knight's move away from the lone king to avoid stalemate."
        }
      },
      {
        type: "interactive",
        fen: "7k/8/5KQ1/8/8/8/8/8 w - - 0 1",
        prompt: "White to move. Black king on h8, white king on f6, white queen on g6. Find the mate in one.",
        solution: "Qg7#",
        explanation: "**1.Qg7#** The queen delivers mate, defended by the white king on f6. Black's king on h8 has no escape: g8 is attacked by the queen, h7 is attacked by the queen too. **The general danger to watch for:** when delivering mate on the edge, always confirm the queen is *defended* by the king. An undefended queen check on an edge square is just a blunder — the lone king captures."
      },
      {
        type: "heading",
        value: "K+R vs K — the box method"
      },
      {
        type: "text",
        value: "Slightly harder because the rook alone covers fewer squares than the queen. Technique:\n1. Use the rook to cut the enemy king off along a rank or file (the **box**).\n2. Walk your own king toward the enemy king until they face each other in **opposition** (one square apart on the same rank/file).\n3. The rook delivers a check; the enemy king must give way to a smaller box.\n4. Repeat until the king is on the edge.\n5. Mate when king-rook-king are aligned on the edge.\n\nShould always mate within 16 moves."
      },
      {
        type: "interactive",
        fen: "k7/8/1K6/8/8/8/8/7R w - - 0 1",
        prompt: "White to move. Black king on a8, white king on b6, white rook on h1. Find the mate in one.",
        solution: "Ra1#",
        explanation: "**1.Ra1#** The rook swings to the a-file and delivers check along the file. Black's king on a8 has no legal escape: a7, b7 and b8 are all covered by the white king on b6. Notice the canonical K+R mate pattern — kings two squares apart with the rook checking on the lone king's edge. (Rh8# also mates by the symmetrical idea.)"
      },
      {
        type: "heading",
        value: "K+2B vs K — drive to any corner"
      },
      {
        type: "text",
        value: "The two bishops cover both diagonals; the king herds. Unlike B+N mate, **any corner works**. Technique:\n1. Use the two bishops to form a 'wall' that cuts off ranks one at a time.\n2. Drive the enemy king toward the edge, then to a corner.\n3. Mate with one bishop checking and the other covering escape squares.\n\nMate within ~20 moves with correct play. The key trap: do not allow the enemy king to escape past your wall — keep the bishops on adjacent diagonals."
      },
      {
        type: "board",
        fen: "k7/2K5/3B4/8/2B5/8/8/8 w - - 0 1",
        caption: "The two-bishop wall: light-squared Bc4 covers light squares around the corner; dark-squared Bd6 covers dark squares. Combined with the white king on c7, the black king is corralled — it has only one legal escape (a7) and the wall is closing. Drive the king into any corner; both bishops cooperate to cover the final escape squares."
      },
      {
        type: "heading",
        value: "K+B+N vs K — advanced (the W-manoeuvre)"
      },
      {
        type: "text",
        value: "**Flag this as advanced.** K+B+N is the only basic mate that requires real technique, and many strong players have lost it by the 50-move rule. The lone king must be driven to **a corner of the bishop's colour** — wrong corner gives only stalemate threats. The technique uses the **W-manoeuvre**: a knight tour shaped like a W (e.g. Nf6-e8-d6-b7-c5) that drives the king along the edge from the wrong corner to the right one. **Worth studying separately**; the technique can take up to 33 moves with optimal play.\n\nFor now, recognise the position when it arises and either: (a) study it before your next tournament, or (b) be willing to take a draw rather than play 50 moves of guesswork."
      }
    ],
    quiz: [
      {
        question: "When mating with K+Q vs K, what is the most common blunder?",
        options: [
          "Taking too long — the 50-move rule",
          "Stalemate — putting the queen too close and leaving the lone king with no legal move",
          "Three-fold repetition"
        ],
        answer: 1,
        explanation: "Stalemate is the great risk. Keep the queen a knight's move from the lone king at all times — this guarantees the king has at least one square to move to. Bring your own king up to support; the queen cannot mate alone."
      },
      {
        question: "K+B+N vs K: which corner do you drive the lone king to?",
        options: [
          "Any corner — they are all equivalent",
          "A corner of the SAME colour as your bishop",
          "A corner of the OPPOSITE colour to your bishop"
        ],
        answer: 1,
        explanation: "The lone king must be mated in a corner of the bishop's colour. A dark-squared bishop drives the king to a1 or h8 (dark corners). Any other corner is stalemate territory and cannot be mated. The W-manoeuvre exists specifically to drive the king from the wrong corner to the right one."
      },
      {
        question: "K+R vs K should mate within how many moves with correct play?",
        options: ["10", "16", "30"],
        answer: 1,
        explanation: "Up to 16 moves from any starting position. K+Q is faster (≤10). K+2B takes around 20. K+B+N can take up to 33."
      }
    ],
    further: ["Silman's Complete Endgame Course — basic mates", "Averbakh, *Comprehensive Chess Endings* — vol. 1"]
  }

];
