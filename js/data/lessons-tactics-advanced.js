// Advanced tactics lessons — companion to lessons-tactics-deep.js.
// Covers the less-common but important motifs: windmill, x-ray, clearance,
// desperado, interference, named mating nets, perpetual check.
//
// Each lesson exports the same shape used elsewhere:
//   { id, title, track, order, estimatedMinutes, objective,
//     content: [ { type: 'text'|'heading'|'subheading'|'quote'|'board'|'pgn'|'interactive', ... } ],
//     quiz: [ { question, options:[], answer:0|1|2|3, explanation } ],
//     further: [ "..." ],
//     next: "lesson-id"
//   }
//
// Source material: docs/research/tactics.md.
// FENs were verified by counting squares per rank (must total 8) and confirming
// exactly one king per side. Interactive `solution` strings are legal SAN moves
// from the given FEN (verified with chess.js during authoring).

export const LESSONS_TACTICS_ADVANCED = [

  // ───────────────────────────────────────────────────────────────────────────
  // 201 — The Windmill (See-Saw)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-201-windmill",
    title: "The Windmill (See-Saw)",
    track: "tactics",
    order: 201,
    estimatedMinutes: 18,
    objective: "Recognise the windmill geometry — a rook on the 7th + a long-diagonal bishop — and use a discovered-check loop to grind through enemy material.",
    content: [
      { type: 'text', value: "A **windmill** (also called a *see-saw*) is a repeating discovered-check sequence that grinds through enemy material. One piece — usually a rook on the 7th rank — bounces back and forth giving check, while a second piece — usually a bishop on a long diagonal — picks off enemy pieces on every cycle. The defender is helpless: they must always answer the check, and the king has nowhere to break the rhythm." },

      { type: 'heading', value: "The mechanics" },
      { type: 'text', value: "A windmill needs three ingredients:\n\n- **A discovery battery aimed at the enemy king.** Most often a rook on the 7th rank with a bishop behind it on the long diagonal.\n- **A king that cannot escape the cycle.** It usually shuffles between two squares (e.g. h8 and g8), each of which the rook can attack with a discovered check.\n- **Targets to harvest on each cycle.** With every back-and-forth, the bishop's discovery snaps off another piece — a queen, a rook, pawns, anything sitting on the long diagonal." },
      { type: 'text', value: "The unique cruelty of the windmill is that the *checking* piece (the rook) and the *capturing* piece (the bishop) are different. The rook moves in and out delivering check; the bishop, sitting still on the long diagonal, receives the credit on every silent unmask." },

      { type: 'heading', value: "Torre vs Lasker, Moscow 1925 — the canonical example" },
      { type: 'text', value: "The most famous windmill in chess history. Carlos Torre played the white pieces against Emanuel Lasker, the former World Champion. After a complex middlegame Torre uncorked **25.Bf6!!**, sacrificing the queen — but on the next move the windmill began. Black's queen on h5 was lost not by a tactic on her, but by the rook's see-saw on g7 / f7 / e7 etc., with the bishop on f6 raking the back rank on every retreat." },
      {
        type: 'board',
        fen: 'r4r1k/pp4pp/3pBp1q/2pNp3/4P3/1P5Q/P1P2PPP/3R1RK1 w - - 0 25',
        caption: "Torre–Lasker, position before **25.Bf6!!** The queens are about to be exchanged at h5, but watch the geometry: white's bishop is heading to **f6**, where it will rake the long a1-h8 diagonal *and* the back-rank file once the rook reaches the 7th. The black king on h8 has only g8 as a flight square, exactly the second square the windmill needs."
      },
      { type: 'text', value: "The combination ran roughly: **25.Bf6!! Qxh5 26.Rxg7+ Kh8 27.Rxf7+ Kg8 28.Rg7+ Kh8 29.Rxb7+ Kg8 30.Rg7+ Kh8 31.Rg5+** uncovering the bishop's attack on the queen — and Lasker resigned a few moves later, having lost piece after piece while powerless to interrupt the cycle." },

      { type: 'subheading', value: "The geometric pattern to memorise" },
      { type: 'text', value: "Most windmills have this skeleton: **king on h8, your rook on g7, your bishop on the a1-h8 diagonal, opponent rook/queen on the 7th rank or back rank.** Each rook move alternates between giving check on g8/h7 (with the bishop's discovery uncovered) and retreating on the 7th rank to grab the next target." },
      {
        type: 'board',
        fen: '5rk1/6R1/5B2/8/8/8/8/6K1 w - - 0 1',
        caption: "A stripped-down windmill skeleton. White rook on g7, bishop on f6, black king on g8. The black rook on f8 is doomed: **1.Rxh7+ Kg8 2.Rg7+ Kh8 3.Rg5+** (a discovered attack from the bishop, no longer mate but raking the file) — and any heavier piece down the diagonal is collected. In a real windmill, the captures happen *during* the check shuffle, not after it."
      },

      { type: 'heading', value: "How to spot one" },
      { type: 'text', value: "When you see your bishop and rook lined up at the enemy king with a long diagonal pointing into enemy territory, *test* the windmill:\n\n1. Is there a forced capture by my rook on the 7th that gives check?\n2. After the king moves to its only square, can the rook return to the original square *also with check* (a discovered check from the bishop)?\n3. On each leg of the loop, is the bishop attacking something valuable I can grab next time the rook clears the line?\n\nIf yes to all three, you have a windmill — and likely a winning game." },

      { type: 'text', value: "Practical training tip: every time the *opponent's* king ends up on h8 with a pawn on h7 and rook on g8 (or any equivalent corner), check whether your bishop on the a1-h8 diagonal plus a rook on the g/h-files can build a windmill. The geometry is rare but unforgettable when it happens." },

      // INTERACTIVE 1 — windmill rook capture (clean)
      {
        type: 'interactive',
        fen: '7k/6Rp/8/8/8/2B3K1/8/q7 w - - 0 1',
        prompt: "White to move. Bishop on c3 rakes the long diagonal, rook on g7 ready to swing. Find the discovered-check rook capture that opens the see-saw.",
        solution: "Rxh7+",
        explanation: "**1.Rxh7+** is the see-saw move: the rook takes the h-pawn delivering double check (rook on h7 + bishop on c3 along a1-h8 with g7 vacated). The only legal reply is **1...Kg8** (the king cannot capture the rook because the bishop still checks). Now **2.Rg7+** swings the rook back as a discovered check, revealing the bishop's attack on the queen on a1. Every cycle, the bishop sweeps the long diagonal — the windmill is in motion."
      },

      // INTERACTIVE 2 — discovered check that begins the windmill cycle (Torre style)
      {
        type: 'interactive',
        fen: '6k1/5pp1/5B2/8/8/8/q4P1P/6RK w - - 0 1',
        prompt: "White to move. Bishop on f6, rook on g1, black king on g8 with f7-g7-h7 pawn cover broken. Find the windmill move (the rook lift to begin the see-saw).",
        solution: "Rxg7+",
        explanation: "**1.Rxg7+!** lifts the rook *into* the windmill battery. After **1...Kh8** (forced; the king cannot take because Rg7 is supported by Bf6) the rook can swing **2.Rxf7+** uncovering the bishop, **2...Kg8 3.Rg7+ Kh8 4.Rxa7+** etc. — the bishop on f6 keeps raking the back rank while the rook collects pieces on the 7th. The sacrifice on g7 is the price of admission to the see-saw."
      },

      // INTERACTIVE 3 — classic windmill geometry recognition
      {
        type: 'interactive',
        fen: '7k/r5Rp/8/8/8/8/8/B5K1 w - - 0 1',
        prompt: "White to move. Black king on h8, white bishop on a1, white rook on g7. Find the rook capture that delivers a discovered check while harvesting material.",
        solution: "Rxa7+",
        explanation: "**1.Rxa7+** rakes the 7th rank with a discovered check from the bishop on a1 — every rook move along the 7th uncovers the bishop's attack along a1-h8 to the king on h8. The defender must address the check (Kg8 is forced, since h7 is a pawn and Kxa7 is impossible). The rook just won a free rook *and* the discovered-check cycle continues. This is the bare skeleton of the windmill: any windmill position you'll ever see has this shape underneath."
      },
    ],
    quiz: [
      {
        question: "What two pieces typically combine to form a windmill?",
        options: [
          "Two rooks doubled on a file",
          "A rook on the 7th rank plus a bishop on the long diagonal behind it",
          "A queen and a knight",
          "Two bishops on adjacent diagonals"
        ],
        answer: 1,
        explanation: "The rook delivers the checks (and harvests material on the 7th); the bishop sits still on the long diagonal, giving a discovered check every time the rook clears the line."
      },
      {
        question: "Why can the defender almost never break a windmill cycle?",
        options: [
          "Each cycle is a check, and the king has only one legal square — so the defender cannot spend a move addressing the bishop",
          "Because the rook is always defended",
          "Because the bishop cannot be captured",
          "Because the windmill is technically a fortress"
        ],
        answer: 0,
        explanation: "Every move in the cycle is forced — the king has only one flight square — so the defender can never spend a tempo on anything other than answering the check."
      },
      {
        question: "Which game is the most famous example of the windmill motif?",
        options: [
          "Morphy vs Duke of Brunswick, 1858",
          "Torre vs Lasker, Moscow 1925",
          "Kasparov vs Topalov, Wijk aan Zee 1999",
          "Capablanca vs Tartakower, New York 1924"
        ],
        answer: 1,
        explanation: "Torre's 25.Bf6!! against Lasker is the textbook windmill. Every chess player should know it by sight."
      }
    ],
    further: [
      "Torre vs Lasker, Moscow 1925 — full game with annotations is in the Master Games section",
      "Look at Alekhine's miniature combinations — he built several windmill-style sequences in his early tournament games"
    ],
    next: "tac-adv-202-x-ray"
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 202 — X-ray Attack and Defence
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-202-x-ray",
    title: "X-ray Attack and X-ray Defence",
    track: "tactics",
    order: 202,
    estimatedMinutes: 16,
    objective: "Understand the x-ray geometry — a long-range piece attacking or defending *through* another piece — and use it both offensively (to win material on a line) and defensively (to hold pieces that look hanging).",
    content: [
      { type: 'text', value: "An **x-ray** is when a piece attacks (or defends) a square or piece *through* another piece. The defining feature is the **line** — the rook, bishop, or queen exerts power along its rank, file or diagonal even when something is sitting in the way. Capture the intervening piece, and the x-ray is suddenly *active* in a different way." },
      { type: 'text', value: "X-rays come in two flavours: **offensive** (attacking through a piece) and **defensive** (defending through a piece). The defensive form is the one that catches most players off guard — \"my piece is hanging!\" except that an enemy queen sits between the loose piece and your distant rook, which silently holds everything together." },

      { type: 'heading', value: "Offensive x-ray (the skewer's older cousin)" },
      { type: 'text', value: "The simplest offensive x-ray is identical to a skewer: a rook attacks an enemy queen with the enemy king behind. When the queen moves, the king is in check; when the king moves, the queen falls. (Some authors call the same idea a *skewer* when the front piece is more valuable, and an *x-ray* when the value relationship is reversed or when the geometry is more abstract.)" },
      { type: 'text', value: "The deeper offensive x-ray happens when **doubled rooks** combine: capturing through one wins the next. If white doubles rooks on the e-file and black puts a rook on e6, **Rxe6 Rxe6 Rxe6+** wins the rook because the *back* white rook x-ray-attacks through the front one." },

      {
        type: 'board',
        fen: '4k3/8/4r3/8/8/4R3/4R3/4K3 w - - 0 1',
        caption: "A textbook offensive x-ray. White's rooks are doubled on the e-file; the black rook on e6 is the only thing standing between them and the king. **1.Rxe6+ Rxe6 2.Rxe6+** and white emerges up a rook — the back rook x-rayed through the front one all along."
      },

      { type: 'heading', value: "Defensive x-ray" },
      { type: 'text', value: "The mirror image. Suppose your rook on a1 protects a knight on a4 — but a black rook sits between them on a3. Is the knight defended? Most beginners say no (\"the rook can't see through\"). In fact: **yes**, the knight is x-ray-defended. If black plays Rxa4, you reply Rxa4 — the black rook captured the knight but in doing so cleared the line, and your rook recaptures \"through\" the spot where the black rook was." },
      { type: 'text', value: "The defence works because **capturing on the defended square automatically removes the obstruction.** Whoever takes last loses material if your defender is more valuable; whoever takes last *wins* material if their attacker is more valuable. It's the same arithmetic as any defended-piece exchange — but the geometry feels invisible." },

      {
        type: 'board',
        fen: 'r3k3/8/8/8/8/4R3/4R3/4K3 w - - 0 1',
        caption: "Defensive x-ray. White's two rooks defend each other along the e-file. If anything were to capture on e3 first, the back rook on e2 recaptures *through* the line. Doubled rooks are mutually x-ray-defended — a critical resource in heavy-piece endings."
      },

      { type: 'heading', value: "The geometry to internalise" },
      { type: 'text', value: "X-rays only work along **straight lines** — the natural geometry of rooks (ranks/files), bishops (diagonals) and queens (both). They do *not* work for knights (no lines) or kings (no range). Three things to scan for:\n\n- **Doubled rooks on a file or rank.** Both x-ray-defend each other; both x-ray-attack the same line.\n- **Bishop pairs on parallel diagonals.** Less common but happens — one bishop can x-ray-defend the other through enemy pieces.\n- **Queen + rook batteries.** The queen and a rook lined up on a file or rank x-ray each other through any obstruction." },

      { type: 'subheading', value: "Famous x-ray endings" },
      { type: 'text', value: "Queen endings often hinge on x-rays. With queens on the same file separated by a pawn, the queen behind the pawn x-ray-attacks through it; promoting the pawn or trading queens is governed by which queen sees what *through* the obstruction. Many practical \"queen + pawn vs queen\" wins are decided by the better-placed queen having an x-ray attack on the enemy king through her own pawn." },

      // INTERACTIVE 1 — offensive x-ray with doubled rooks
      {
        type: 'interactive',
        fen: '4k3/8/4r3/8/8/4R3/4R3/4K3 w - - 0 1',
        prompt: "White to move. Doubled rooks on the e-file, a single black rook on e6. Win material with the x-ray.",
        solution: "Rxe6+",
        explanation: "**1.Rxe6+** is the x-ray winner. The front rook captures black's rook with check; whatever black does next (Kd7, Kf7, Kd8, Kf8), the back rook on e2 has been x-ray-defending the front rook all along — black can never take the e6 rook because the back rook recaptures on e6 and white emerges up a rook. The doubled rooks proved that the back rook was always defending the front through the e-file."
      },

      // INTERACTIVE 2 — offensive x-ray: rook attacks queen with king behind (skewer-style)
      {
        type: 'interactive',
        fen: '4k3/4q3/8/8/8/8/4R3/4K3 w - - 0 1',
        prompt: "White to move. White rook on e2, black queen on e7, black king on e8 — all on the e-file. Find the x-ray winning move.",
        solution: "Rxe7+",
        explanation: "**1.Rxe7+!** is the offensive x-ray (or, equivalently, a skewer of the queen onto the king). The rook captures the queen with check; black must recapture with **1...Kxe7**, but white has won queen for rook — a clean +4 in material. The x-ray geometry was that the rook attacked the queen *and* the king was behind, so the queen could never be moved without exposing the king — and the queen could never be defended without the same rook taking *through* her."
      },

      // INTERACTIVE 3 — clearance + x-ray on a long diagonal
      {
        type: 'interactive',
        fen: '7k/6p1/6P1/8/8/8/B7/7K w - - 0 1',
        prompt: "White to move. Bishop on a2 stares down the a2-g8 diagonal toward the corner. Find the bishop sacrifice that wins by opening the x-ray.",
        solution: "Bg8",
        explanation: "**1.Bg8!** is a brutal x-ray-style infiltration. The bishop lands beside the king on h8 — the king is forced to capture **1...Kxg8**, but then **2.gxh7+ Kxh7** (or Kh8) reaches a winning king-and-pawn endgame because white's king can shepherd the h6/g7-area pawns up the board with the now-distant black king cut off. The point: the bishop's *latent* x-ray on g8/h8 was the entire reason for the sacrifice — once the obstruction (the king) is lured to a worse square, the geometry collapses in white's favour."
      },
    ],
    quiz: [
      {
        question: "Which piece(s) can deliver an x-ray attack?",
        options: [
          "Knights and kings",
          "Pawns only",
          "Long-range pieces: rooks, bishops, queens",
          "Only the queen"
        ],
        answer: 2,
        explanation: "X-rays act along straight lines — exactly the geometry of rooks (ranks/files), bishops (diagonals) and queens (both). Knights jump and have no lines; kings have no range."
      },
      {
        question: "Two of your rooks are doubled on the e-file. The opponent puts a rook on e6 attacking your front rook. Are your rooks safe?",
        options: [
          "No — the front rook is hanging",
          "Yes — they x-ray-defend each other; if Rxe3 then Rxe3 recaptures through the line",
          "Only if the back rook moves first",
          "Only if there's a third defender"
        ],
        answer: 1,
        explanation: "Doubled rooks mutually x-ray-defend. The capture by black removes the obstruction, opening the file for the back rook to recapture."
      }
    ],
    further: [
      "Soltis, *Pawn Structure Chess* — chapters on heavy-piece endings cover x-ray geometry exhaustively",
      "Endgame studies by Réti and Kubbel feature defensive x-rays as their core idea"
    ],
    next: "tac-adv-203-clearance"
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 203 — Clearance Sacrifice
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-203-clearance",
    title: "Clearance Sacrifice",
    track: "tactics",
    order: 203,
    estimatedMinutes: 16,
    objective: "Sacrifice a piece not to win material, but to vacate a square or open a line so that another piece can deliver the decisive blow.",
    content: [
      { type: 'text', value: "A **clearance sacrifice** gives up material *not* to win material in return — but to clear a square or a line for a different piece. The cleared square is usually a critical mating square, an attacking outpost, or the only path to a winning combination. The sacrificed piece is the one that stands in the way of *your own* attack." },
      { type: 'text', value: "The trigger thought: \"If only my [piece] weren't on [square], my [other piece] would mate / fork / win the queen.\" Once you catch yourself thinking that, the clearance is right there." },

      { type: 'heading', value: "Two flavours of clearance" },
      { type: 'text', value: "**Square clearance.** Your knight sits on g5; you wish your queen could land on g5 with mate. Sacrificing the knight on h7+ vacates g5 *and* drags the king closer.\n\n**Line clearance.** Your bishop sits on f6, blocking your own rook on the f-file; you wish the rook had a clear shot at f7. Sacrificing the bishop on g7+ clears the file and forces a king response in one motion." },

      { type: 'heading', value: "The classic mating-attack pattern" },
      { type: 'text', value: "Clearance sacrifices recur in attacks on the castled king. The most common shape: white has a rook on the f-file or h-file, plus a queen and a knight. The knight has wandered onto a square the queen needs. Sacrificing the knight (typically with check, on f7 or h7) clears the square *and* damages the king's pawn cover." },
      {
        type: 'board',
        fen: 'r4rk1/ppp2ppp/3b4/3qN3/8/2P3Q1/PP3PPP/R4RK1 w - - 0 1',
        caption: "White to move. The knight on e5 is in the way: white wants the queen to come to g7, but the knight currently blocks key approaches. **1.Nxf7!** is a clearance sacrifice — the knight clears the e-file, attacks the queen on d5 *and* forces a defensive recapture on f7, after which the queen swings into the attack with decisive effect."
      },

      { type: 'heading', value: "The thought process" },
      { type: 'text', value: "Clearance sacrifices are hard to spot because you have to look past the material loss to see the *next* move. Train yourself to ask:\n\n1. **What is my dream square?** What square would my best piece love to occupy?\n2. **What's stopping me?** Is one of my own pieces in the way?\n3. **Can I sacrifice that piece for tempo?** A check or huge threat that *also* removes the obstruction is ideal.\n4. **Does the follow-up justify the material?** A piece sacrifice for a winning attack is fine; for a positional improvement, usually not." },

      { type: 'subheading', value: "Famous illustrations" },
      { type: 'text', value: "Many of Morphy's combinations begin with a clearance sacrifice. The Opera Game finish (covered in the Deflection lesson) is technically a deflection, but Morphy also used pure clearance — a piece sacrifice purely to clear a file for his rook to mate. Tal's combinations almost always involve clearance sacrifices: he gave up pieces to vacate squares so that his queen, rooks, or remaining pieces could deliver the final blow." },

      // INTERACTIVE 1 — line clearance for the rook
      {
        type: 'interactive',
        fen: '6k1/5pp1/5B1p/8/8/8/5PPP/3R2K1 w - - 0 1',
        prompt: "White to move. The bishop on f6 is on the long a1-h8 diagonal but also blocks key approaches; meanwhile the rook on d1 wants the back rank. Find the bishop sacrifice that clears g7 / opens lines.",
        solution: "Bxg7",
        explanation: "**1.Bxg7!** is a clearance + king-cover destruction move. The bishop sacrifices itself to rip away the g7 pawn — after **1...Kxg7** the king is exposed and the rook can swing to attack with Rd8 or maneuver to the h-file with crushing effect. The point is that the bishop *had* to disappear from f6 (and the g7 pawn had to go too) — without removing both, the rook had nothing to do. Clearance sacrifices often look like wasteful trades until you see the move after."
      },

      // INTERACTIVE 2 — square clearance for the queen
      {
        type: 'interactive',
        fen: '6k1/5ppp/8/4N1Q1/8/8/5PPP/6K1 w - - 0 1',
        prompt: "White to move. The queen wants to land on g7 mating, but the knight on e5 isn't quite in the right place — find a clearance/forcing move that opens the king up.",
        solution: "Nxf7",
        explanation: "**1.Nxf7!** is a clearance + destruction sacrifice: the knight rips the f7 pawn off the king's cover. After **1...Kxf7** the queen has a path through h7 / g6 lines that didn't exist before; even **1...Rxf7** loses to **2.Qxg7#** because the rook is no longer guarding g7. The knight cleared the f7 square *and* the file in one stroke."
      },

      // INTERACTIVE 3 — pure square clearance (no capture)
      {
        type: 'interactive',
        fen: '6k1/5ppp/8/8/8/4Q3/3N1PPP/6K1 w - - 0 1',
        prompt: "White to move. The queen wants to deliver mate on e8 backed by the knight, but the knight on d2 is too far away. Find the move that brings the knight toward f7 / g8 control.",
        solution: "Nf3",
        explanation: "Not every clearance is a sacrifice — sometimes the clearance move is just *getting your piece out of the way* by a quiet move. **1.Nf3** repositions the knight toward h4 / g5 / e5 squares while clearing the d-file for a future rook lift, and prepares Ng5 hitting f7 / h7. This is the *quiet* form of clearance — improving your own piece while opening lines for others."
      },
    ],
    quiz: [
      {
        question: "What is the defining purpose of a clearance sacrifice?",
        options: [
          "To win the exchange",
          "To open a file for a passed pawn",
          "To vacate a square or open a line so a *different* piece can deliver the decisive blow",
          "To force a draw by repetition"
        ],
        answer: 2,
        explanation: "Unlike most sacrifices, a clearance sac doesn't aim to win material directly — it removes one of *your* pieces from the path of a winning combination."
      },
      {
        question: "What's the trigger thought that helps spot a clearance sacrifice?",
        options: [
          "\"If only I had an extra tempo…\"",
          "\"If only my [piece] weren't on [square], my [other piece] would win.\"",
          "\"If only the opponent's queen were off the board…\"",
          "\"If only it were my move…\""
        ],
        answer: 1,
        explanation: "Once you notice your own piece is the obstacle, you've already half-found the clearance sacrifice."
      }
    ],
    further: [
      "Tal's *The Life and Games of Mikhail Tal* — sacrifice after sacrifice, many of them clearance",
      "Morphy's miniatures often clear files for the rook to mate"
    ],
    next: "tac-adv-204-desperado"
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 204 — Desperado
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-204-desperado",
    title: "Desperado",
    track: "tactics",
    order: 204,
    estimatedMinutes: 14,
    objective: "When your piece is going to be lost anyway, use it to maximise damage on the way out — capture the most valuable target available, deliver a damaging check, or insert a zwischenzug that resets the trade.",
    content: [
      { type: 'text', value: "A **desperado** is a doomed piece that sells its life for maximum damage. The piece is going to be captured next move regardless; you give it a final mission — usually grabbing the most valuable enemy piece available, but sometimes delivering a damaging check or check that distracts the opponent." },
      { type: 'text', value: "The principle: **never just lose a hanging piece.** Even when retreat is impossible and the piece is dead, it can still take something on its way down. The cost of the piece is sunk; only the question of \"what does it eat first?\" remains." },

      { type: 'heading', value: "The classic capture-sequence desperado" },
      { type: 'text', value: "The most common desperado situation: a series of captures has unfolded, and at some point both sides have a hanging piece. The player to move uses their hanging piece to take the *opponent's* hanging piece — even though both will be lost, the trade now favours whoever moved first." },
      { type: 'text', value: "Concrete example: in a queen exchange where both queens are en prise, whoever's move it is captures *first*. They lose their queen on the next move, but they captured the enemy queen on this one — net zero. If instead they had \"saved\" their queen by moving it elsewhere, they'd have lost the trade because the enemy queen would still be sitting there protected by the moves that followed." },

      { type: 'heading', value: "Mutual desperados in the opening" },
      { type: 'text', value: "Many opening lines feature mutual desperado moments. After 1.Nxe5 in some Italian games, the recapture isn't always automatic — the moving knight can sometimes desperado-capture another piece (or check) before the obvious recapture, changing the material count." },
      {
        type: 'board',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 4',
        caption: "After hypothetical **1.Nxe5** (white knight has just captured the e5 pawn). The knight on e5 is hanging to ...Nxe5, but before recapturing, black should ask: *is there a desperado for white that I'm missing?* A knight on e5 with no support is doomed — but it can still play **Nxc6** desperado, taking the knight, and after **dxc6 (or bxc6)** material has been traded knight for knight, not knight for pawn. The desperado preserved material parity."
      },

      { type: 'heading', value: "Recognition cue" },
      { type: 'text', value: "Whenever you find one of your pieces is hanging and there's no escape, **don't sigh and recapture** — first scan:\n\n- Is there an enemy piece my doomed piece can take, equal or higher in value?\n- Is there a check my doomed piece can give that creates an extra threat?\n- Is there a forcing sequence (zwischenzug) where my piece falls *next* move but I take something *now*?\n\nThe same logic applies in reverse: when your opponent has a hanging piece, *they* might desperado before they let you take it. Always look for their best try, not just the obvious recapture." },

      { type: 'subheading', value: "Endgame desperados" },
      { type: 'text', value: "In endings, desperado pieces often grab pawns. A knight stranded on the queenside that's about to be trapped grabs the a-pawn or b-pawn before it's caught. A doomed bishop sweeps a pawn or two off the board on its way down. In king-and-pawn endings these few extra pawns can be the difference between a win and a draw." },

      // INTERACTIVE 1 — desperado knight grabs the queen before being captured
      {
        type: 'interactive',
        fen: 'r1bqk2r/pppp1ppp/8/2bNp3/4P3/8/PPPP1PPP/R1BQK2R w KQkq - 0 1',
        prompt: "White to move. The knight on d5 is attacked by the bishop on c5. Before recapturing or retreating, find the desperado capture that makes the best of the lost knight.",
        solution: "Nxc7+",
        explanation: "**1.Nxc7+!** is a desperado fork. The knight is doomed, but on its way out it grabs the c7 pawn *with check* and *forks* the king and the rook on a8. After **1...Kd8** (forced; the king cannot capture because of the queen on d1's defense, and ...Kf8 also works) **2.Nxa8** the knight has taken a pawn AND a rook before being captured by ...Kxa8 (or whatever) — net: white traded a knight for a rook + pawn. Without the desperado, white would have lost a clean knight."
      },

      // INTERACTIVE 2 — desperado in a queen exchange
      {
        type: 'interactive',
        fen: '4k3/8/8/3qQ3/8/8/8/4K3 w - - 0 1',
        prompt: "White to move. The white queen on e5 attacks the black queen on d5. But Black's queen also attacks White's queen. Whoever moves first captures the other. Find the desperado move.",
        solution: "Qxd5",
        explanation: "**1.Qxd5!** is the simplest possible desperado idea — both queens are en prise, so whoever moves first captures. After **1.Qxd5** the white queen is gone next move (or in this case, simply trades), but white captured a queen along the way. Had white instead retreated **1.Qe2?** thinking to save the queen, **1...Qxe2** wins the queen for nothing because the white queen on e2 is still attacked by anything looking at e2 (and white loses the tempo race). When pieces of equal value attack each other, capturing first is automatic."
      },

      // INTERACTIVE 3 — doomed bishop delivers a desperado check
      {
        type: 'interactive',
        fen: '6k1/p4p1p/6p1/8/8/2b5/P5PP/2R3K1 b - - 0 1',
        prompt: "Black to move. The black bishop on c3 is attacked by the rook on c1 — it's lost next move regardless. Find the desperado check that gains a tempo before going down.",
        solution: "Bd4+",
        explanation: "**1...Bd4+!** is the desperado check. The bishop is doomed — Rxc3 was coming — but on its way down it interposes a check on the white king on g1 along the d4-g1 diagonal. White must respond to the check (Kf1, Kh1, or Kxd4 isn't possible) before recapturing the bishop. Black has gained a tempo, possibly enough to bring another piece into play, defend a weak pawn, or create a counter-threat. **Lesson:** never just resign yourself to losing a piece — a check or damaging move on the way out is *always* worth playing first."
      },
    ],
    quiz: [
      {
        question: "Your knight is attacked and has no safe square — every retreat loses it. What's the desperado question to ask?",
        options: [
          "\"What's the cheapest way to lose it?\"",
          "\"What's the most expensive thing this knight can take or what damaging check can it deliver before going down?\"",
          "\"Should I offer a draw?\"",
          "\"Should I trade queens?\""
        ],
        answer: 1,
        explanation: "If the piece is dead anyway, the only thing left to optimise is the *return* on the loss. Maximum capture or maximum damage, every time."
      },
      {
        question: "Both queens are mutually attacked. Whose move is it, and what should they do?",
        options: [
          "It doesn't matter — it's a guaranteed trade",
          "Whoever moves first captures, because the queen will be lost anyway and capturing recoups the material",
          "Both should retreat",
          "Black is always favoured"
        ],
        answer: 1,
        explanation: "When pieces of equal value mutually attack, the side to move captures first. Retreating loses the queen for nothing."
      }
    ],
    further: [
      "Nunn's *Understanding Chess Tactics* — desperado is covered alongside in-between moves",
      "Practical games where desperado decisions occur in the opening: Italian Game, Petroff Defense, Scotch Game"
    ],
    next: "tac-adv-205-interference"
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 205 — Interference (Novotny / Plachutta)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-205-interference",
    title: "Interference (Novotny and Plachutta Themes)",
    track: "tactics",
    order: 205,
    estimatedMinutes: 16,
    objective: "Place a piece *between* two enemy pieces that are defending each other, severing their connection — a sacrifice if necessary, since the interfering piece is en prise to either defender.",
    content: [
      { type: 'text', value: "**Interference** is one of the most beautiful and least-played tactics in over-the-board chess (it appears more often in composed problems). The idea: drop a piece *between* two enemy pieces that are defending each other or operating along the same line, breaking their cooperation. The interfering piece is usually en prise to *both* enemy pieces — but whichever one captures, it is no longer defending the other duty, and your follow-up wins material." },

      { type: 'heading', value: "The Novotny theme" },
      { type: 'text', value: "Named after Anton Novotny (1827–71), this is the purest form: a single sacrifice on a square attacked by *two* enemy pieces along *different* lines (one rank/file, one diagonal). Whichever piece captures, the other line is severed. Most often the interferer is dropped on the intersection of an enemy rook's file and an enemy bishop's diagonal." },
      { type: 'text', value: "**The Plachutta theme** is the same idea but with two like-pieces (e.g. two rooks defending each other along intersecting lines). The interferer is sacrificed on the intersection square; one rook must take, then the other can no longer perform its previous defensive job." },

      {
        type: 'board',
        fen: '2r4k/8/8/r7/8/8/R7/2R3K1 w - - 0 1',
        caption: "An interference setup. Black's rooks defend each other (the rook on a5 defends c5 along the rank; the rook on c8 defends c5 along the file). White plays **1.Rc5!** — the interfering rook lands on the intersection. Whichever black rook captures, the other can no longer help: **1...Rxc5 2.Rxa5** wins a rook; **1...Raxc5 2.Rxc8+** wins a rook. The interference broke the mutual defence."
      },

      { type: 'heading', value: "When does interference arise?" },
      { type: 'text', value: "Interference is rare in practical play because two enemy pieces have to be **lined up cooperating** along orthogonal directions, with a critical empty square at their intersection — and you have to have a piece you can spare to drop there. But when these conditions are met, the move is decisive.\n\nLook for it in:\n\n- Heavy-piece endings where rooks defend each other.\n- Mating attacks where an enemy bishop and rook both eye the same critical square in your kingside.\n- Composed studies — interference is the favourite weapon of problemists." },

      { type: 'heading', value: "How to spot it" },
      { type: 'text', value: "Three-step scan:\n\n1. **Find a square that two enemy pieces both control along different lines.** That intersection is your candidate.\n2. **Check whether dropping a piece there severs anything important** — a defended piece, a defended mating square, a back-rank guard.\n3. **Verify that whichever capture they make, your follow-up wins material** — usually by recapturing the now-undefended piece on one end of the original cooperation." },

      { type: 'subheading', value: "Practical interference vs composed interference" },
      { type: 'text', value: "In composed problems (Novotny, Plachutta studies), interference is the entire point of the position — the geometry is constructed for it. In practical games it usually shows up in disguise: a piece sacrifice on a key square that *happens* to break two defenders. Train yourself to ask, when you see two enemy pieces cooperating, \"is there a square at their intersection where I could drop a piece?\"" },

      // INTERACTIVE 1 — Plachutta-style interference between two rooks
      {
        type: 'interactive',
        fen: '2r4k/8/8/r7/8/8/R7/2R3K1 w - - 0 1',
        prompt: "White to move. Black's rooks defend each other on the c-file and the 5th rank. Find the interference move that drops a rook on the intersection.",
        solution: "Rc5",
        explanation: "**1.Rc5!** is the Plachutta interference. Whichever black rook captures, the other loses cooperation. **1...Rxc5 (or Raxc5)** is forced; whichever rook captures, white plays **2.Rxa5** or **2.Rxc8+** depending on which one took, winning a rook in either line. The interfering rook is sacrificed, but the *other* white rook collects more than it spent."
      },

      // INTERACTIVE 2 — interference with a bishop
      {
        type: 'interactive',
        fen: '7k/6pp/8/r7/8/8/3B3R/6K1 w - - 0 1',
        prompt: "White to move. The black rook defends along the 5th rank and the bishop wants to interfere. Find the move that breaks black's defence.",
        solution: "Bg5",
        explanation: "**1.Bg5!** is an interference attempt — the bishop drops between attackers. Even if **1...Rxg5 2.Rxh7+ Kg8** white has won the rook for a bishop. The interference broke the rook's coordination with its other duties (defending h7 from afar, controlling the rank). In the absence of interference, white had no clear win; the bishop sac forced material gain. Note: composed positions like this rarely appear in casual play but the *thinking pattern* — \"can I sacrifice on the intersection to break enemy coordination?\" — is universal."
      },

      // INTERACTIVE 3 — simple interference: rook between two defenders
      {
        type: 'interactive',
        fen: '6k1/5ppp/8/r7/8/8/R7/2R3K1 w - - 0 1',
        prompt: "White to move. The black rook on a5 defends along the 5th rank only. White wants to invade with the rook on a2 to a8. Find the move.",
        solution: "Rxa5",
        explanation: "**1.Rxa5!** removes the only defender along the rank. With black's rook gone, the c1 rook can swing to c8 next move with mating ideas (back rank weakness — black has no luft). The lesson here is more about *removing the defender* than pure interference, but it shows the family resemblance: any move that breaks enemy coordination on a critical line is a member of the same tactical family."
      },
    ],
    quiz: [
      {
        question: "What is the Novotny theme?",
        options: [
          "A pawn-storm attack on the king",
          "A sacrifice on a square attacked by two enemy pieces along different lines (rank/file + diagonal)",
          "A queen sacrifice for stalemate",
          "An endgame fortress"
        ],
        answer: 1,
        explanation: "Novotny's signature: drop a piece on an intersection of file and diagonal. Whichever line captures, the other is broken."
      },
      {
        question: "Why is interference often a sacrifice?",
        options: [
          "Because the interfering piece is usually attacked by both defenders it's stepping between",
          "Because it always involves a queen",
          "Because the king must move out of the way",
          "Because chess rules require it"
        ],
        answer: 0,
        explanation: "The interfering piece sits between two enemy attackers, so it's en prise to both. The point is that whichever captures, the other can no longer perform its defensive job."
      }
    ],
    further: [
      "Composed problems by Anton Novotny and Josef Plachutta — the namesake studies are short and beautiful",
      "Tim Krabbé's *Chess Curiosities* features many interference examples"
    ],
    next: "tac-adv-206-mating-nets"
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 206 — Mating Nets and Named Mates
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-206-mating-nets",
    title: "Mating Nets and Named Mates (Anastasia, Boden, Greco, Légal, Pillsbury, Blackburne, Damiano, Smothered)",
    track: "tactics",
    order: 206,
    estimatedMinutes: 22,
    objective: "Recognise the most famous named mating patterns — Anastasia's, Boden's, Greco's, Légal's, Pillsbury's, Blackburne's, Damiano's, Philidor's smothered — and the geometry that produces each.",
    content: [
      { type: 'text', value: "A **mating net** is the cumulative restriction of the enemy king — each move removes flight squares and adds attackers — until mate is unavoidable. Many famous attackers gave their names to recurring mating *patterns*: identifiable geometries that, once seen, can be re-applied for the rest of your chess life. Memorise these the way openings are memorised: the one second of recognition saves you ten minutes of calculation." },

      { type: 'heading', value: "Anastasia's mate" },
      { type: 'text', value: "**The pattern: knight on e7 (or g6) covers escape squares, rook arrives on the h-file giving mate.** The king sits on h8/h7, the knight covers g8 and the rook delivers along the h-file with no escape." },
      {
        type: 'board',
        fen: '5rk1/pp4pp/8/4N3/8/8/PP4PP/4R2K w - - 0 1',
        caption: "Anastasia setup. The white knight on e5 hops to f7 or g6 controlling escape squares; with a rook lift to h-file (e.g. Re1-e4-h4), the king on g8 has no flight — Anastasia's mate. **Recognition cue: enemy king on the h-file or g8, your knight on e7/g6, your rook ready for the h-file.**"
      },

      { type: 'heading', value: "Boden's mate" },
      { type: 'text', value: "**The pattern: two bishops on intersecting diagonals mate a king behind blocked pawns.** Most often: queenside-castled king (Kc8), bishops on b5 and a3 (or comparable), each covering the king's escape squares and the king's box-in by its own pawns." },
      {
        type: 'board',
        fen: '2kr3r/pppq1ppp/2n2n2/8/3P4/B7/PP3PPP/R2Q1RK1 w - - 0 1',
        caption: "A Boden geometry. The white bishop on a3 covers c1-h6 diagonal; with a second bishop arriving on b5 or a6 along with a check, the c8-king is mated by *crossing diagonals*. **Recognition cue: enemy king behind its own pawns, your two bishops aimed at intersecting diagonals near the king.**"
      },

      { type: 'heading', value: "Greco's mate" },
      { type: 'text', value: "**The pattern: bishop sacrifice on h7+ followed by a knight or queen check, mating the king on h7 or g8.** Named for Gioachino Greco (1600–1634), the godfather of opening tactics. The setup: castled king on g8, h7 pawn defended only by the king, your bishop on c4 (or d3) and a knight that can leap to g5 + queen that can swing to h5." },
      { type: 'text', value: "The classic sequence: **Bxh7+ Kxh7 Ng5+ Kg8 Qh5 Re8 Qxh7#** (or variations). It works whenever the f6 knight (the natural h7 defender) is missing." },

      { type: 'heading', value: "Légal's mate" },
      { type: 'text', value: "**The pattern: queen sacrifice followed by mate with three minor pieces.** Named after Sire de Légal (1702–1792), Philidor's teacher. Occurs in the Italian Game when black plays a poorly-supported pin (typically ...Bg4 against white's Nf3 with the white queen on d1). White plays Nxe5! ignoring the pin; if Bxd1 then Bxf7+ and Nd5#." },
      {
        type: 'board',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P1b1/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
        caption: "Légal's trap setup. Black has played 3...Bg4 pinning the f3 knight to the queen. White plays **4.Nxe5!** ignoring the pin: if **4...Bxd1?? 5.Bxf7+ Ke7 6.Nd5#** is checkmate — three minor pieces deliver mate. **Recognition cue: the pin can be broken if the pinned piece's move leads to a forced mate or huge material win.**"
      },

      { type: 'heading', value: "Pillsbury's mate" },
      { type: 'text', value: "**The pattern: rook + bishop combine on the long diagonal and h-file (or g-file) to mate a fianchetto-weakened king.** Named for Harry Nelson Pillsbury (1872–1906), brilliant American tactician. The bishop sits on the long diagonal aimed at the corner; the rook lifts to the h-file. **Bxg7 Kxg7 Rh3-h7+ followed by mate** is one common motif." },

      { type: 'heading', value: "Blackburne's mate" },
      { type: 'text', value: "**The pattern: two bishops + knight on g5, mate via Bxh7 sacrifice + bishop on b2 long-diagonal cover + knight finish.** Named for Joseph Blackburne (1841–1924). Setup: white has bishop pair, knight on g5, queen out of play; the Bxh7+ sacrifice followed by the long-diagonal bishop covering escape squares and the knight delivering mate is the classic finish." },

      { type: 'heading', value: "Damiano's mate" },
      { type: 'text', value: "**The pattern: pawn on g6 (or g3) traps the king while a queen mates on the h-file.** Named for Pedro Damiano (1480–1544), one of the earliest published authors. The classical version: White queen + advanced pawn vs. exposed king, mate delivered along the h-file with the pawn cutting off the king's escape." },

      { type: 'heading', value: "Smothered mate (Philidor's legacy)" },
      { type: 'text', value: "**The pattern: a knight delivers mate to a king *completely surrounded by its own pieces*.** The knight's check cannot be blocked (knights jump) or captured (the knight is supported or out of reach). Classic recipe: queen sacrifice on g8 (or c8) to lure the rook adjacent to the king, then Nf7# (or similar)." },
      {
        type: 'board',
        fen: '6rk/6pp/8/6N1/8/8/6PP/4Q1K1 w - - 0 1',
        caption: "The classic smothered mate setup. **1.Nf7+ Kg8 2.Nh6+ Kh8 3.Qg8+! Rxg8 4.Nf7#** — the rook is forced onto g8 by the queen sacrifice, leaving the king *smothered* by its own pieces (rook on g8, pawns on g7/h7), and the knight on f7 mates."
      },

      { type: 'heading', value: "How to use these patterns" },
      { type: 'text', value: "Don't memorise the exact move-orders; memorise the **geometric shapes**. When you see your pieces *arrange* themselves into one of these shapes, the win is right there. Specifically, scan after every move:\n\n- Is the enemy king in a corner with your knight + queen lurking? → smothered mate template\n- Is the enemy king on the h-file with my knight on e7/g6? → Anastasia\n- Has my opponent traded their fianchetto bishop and left g7 weak? → Pillsbury / Blackburne / long-diagonal templates\n- Is the f6 knight gone or pinned? → Greco's Bxh7+ sacrifice" },

      // INTERACTIVE 1 — smothered mate execution
      {
        type: 'interactive',
        fen: '6rk/6pp/8/6N1/8/8/6PP/4Q1K1 w - - 0 1',
        prompt: "White to move. Smothered-mate setup. Find the first move (Philidor's legacy).",
        solution: "Nf7+",
        explanation: "**1.Nf7+** initiates the famous Philidor sequence. Black's only legal reply is **1...Kg8** (the king cannot capture the supported knight). Now **2.Nh6+ Kh8** (forced — Kf8 loses to Qe8#) **3.Qg8+! Rxg8 4.Nf7#** smothered mate. The rook had to capture the queen (only legal move), and now the king is hemmed in by its own rook and pawns — the knight delivers mate that nothing can answer."
      },

      // INTERACTIVE 2 — Anastasia mate setup
      {
        type: 'interactive',
        fen: '5rk1/pp4pp/2N5/8/8/7R/PP3PPP/6K1 w - - 0 1',
        prompt: "White to move. Knight on c6 one hop from e7, rook on h3 ready for the h-file. Find the knight move that begins Anastasia's mate.",
        solution: "Ne7+",
        explanation: "**1.Ne7+** lands the knight on the Anastasia square, attacking the king on g8 *and* covering g8's neighbour squares (g6, c8, etc.). After **1...Kh8** (forced — the king cannot capture the unsupported knight; wait, it can: Kxh8? no king is on g8, and knight is on e7, not adjacent — so Kxe7 is impossible. Kh8 is forced because Kf7 walks into Nxf5 ideas), white follows with **2.Rxh7+ Kxh7 3.Rh1#** in the full setup. **Recognition cue: knight on e7 + rook on the h-file = Anastasia's net. The knight's job is to cut off g6/g8 escape squares while the rook delivers along the h-file.**"
      },

      // INTERACTIVE 3 — back rank from a famous-mate template
      {
        type: 'interactive',
        fen: '6k1/5p1p/6p1/8/8/8/5PPP/4R1K1 w - - 0 1',
        prompt: "White to move. The king on g8 has only one back-rank flight square. Find the rook check / mate.",
        solution: "Re8+",
        explanation: "**1.Re8+** exploits the back rank. After **1...Kg7** (only legal — the f7-g6-h7 pawn cluster blocks the king elsewhere) white follows with **2.Re7** pinning ideas or just collecting material. In a fuller setup with a bishop on g6, this becomes Damiano-style mate. **Lesson:** even simple-looking back-rank attacks become *named* mates when more pieces join the geometry."
      },
    ],
    quiz: [
      {
        question: "In Anastasia's mate, what is the role of the knight?",
        options: [
          "Delivers the mating check itself",
          "Covers the king's escape squares (e.g., g8) while a rook arrives on the h-file to mate",
          "Sacrifices itself for clearance",
          "Pins the defending queen"
        ],
        answer: 1,
        explanation: "The knight (typically on e7 or g6) controls the squares the king would run to; the rook delivers mate on the h-file with no flight."
      },
      {
        question: "What's the defining feature of a smothered mate?",
        options: [
          "The king is mated by a pawn",
          "The king is checkmated while completely surrounded by its own pieces — a knight check that cannot be blocked or captured",
          "Two bishops mate from opposite corners",
          "The queen mates on h7"
        ],
        answer: 1,
        explanation: "Philidor's legacy: a knight gives mate to a king blocked in by its own rooks/pawns, with no escape and no possible block (knights jump)."
      },
      {
        question: "What setup does Boden's mate require?",
        options: [
          "Queen + knight against an exposed king",
          "Two bishops on intersecting diagonals against a king (often queenside-castled) hemmed in by its own pawns",
          "A pawn + king vs. a lone king",
          "A rook and a knight"
        ],
        answer: 1,
        explanation: "Boden's signature: two bishops, intersecting diagonals, king blocked by its own pieces. Most common against opposite-side castled positions."
      }
    ],
    further: [
      "*Bobby Fischer Teaches Chess* — has clean diagrams of every named mate pattern",
      "Reinfeld, *1001 Brilliant Ways to Checkmate* — drill book of named-mate patterns"
    ],
    next: "tac-adv-207-perpetual"
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 207 — Perpetual Check
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "tac-adv-207-perpetual",
    title: "Perpetual Check (the Saving Resource)",
    track: "tactics",
    order: 207,
    estimatedMinutes: 14,
    objective: "When you cannot win, look for a sequence of checks the enemy king cannot escape — perpetual check forces a draw by repetition and is one of the most important resources in the worse position.",
    content: [
      { type: 'text', value: "A **perpetual check** is a sequence of checks that the enemy king cannot escape, repeated forever. Eventually the position repeats three times and the game is drawn. For the *worse* side, perpetual is a salvation — a way to escape a lost position when no defence works. For the *better* side, it's a winning resource when no mate is available." },
      { type: 'text', value: "The geometry is almost always: **an exposed enemy king + a queen + open lines.** Other pieces can do it too (rook on the 7th, knight + queen) but the queen is the perpetual-check workhorse because of her range and check-delivery flexibility." },

      { type: 'heading', value: "When to look for it" },
      { type: 'text', value: "**Always look for perpetual when you're losing.** It's the difference between resignation and survival. The trigger thoughts:\n\n- Is the enemy king exposed (no pawn cover, on the open file)?\n- Can my queen reach two checking squares from which the king has no escape?\n- After my opponent meets each check, can I check again from a different angle?" },

      { type: 'text', value: "**Also look for perpetual when you're winning but no mate is in sight.** A draw is better than an unforced loss. If you've sacrificed material and the attack hasn't quite worked, perpetual check turns the gamble into at least a half-point." },

      { type: 'heading', value: "The classic queen shuttle" },
      { type: 'text', value: "The simplest perpetual: queen alternates between two checking squares while the enemy king bounces between two flight squares. The shuttle continues until the position repeats." },
      {
        type: 'board',
        fen: '6k1/5p1p/8/8/8/8/5PPP/q5K1 w - - 0 1',
        caption: "Black's queen on a1 controls perpetual ideas. With white to move, white loses material — but in the mirror image (with white queen attacking the black king), shuttling between e8 / h5 / d8 with checks the king can never escape gives a draw. **Recognition cue: queen shuttle between two squares, king has only two flight squares.**"
      },

      { type: 'heading', value: "Recognition: count the king's escape squares" },
      { type: 'text', value: "Before launching a perpetual, count exactly how many squares the king can move to. The fewer, the more likely your sequence works. If the king has three or more flight squares, you'll need a stronger geometry (more attackers, or king on the edge)." },

      { type: 'subheading', value: "Examples in famous games" },
      { type: 'text', value: "Many world championship games have ended in perpetual check. Notably: *Tal vs Botvinnik 1960*, several games where the worse side held the draw via queen shuttle. Modern computer-influenced play also features deliberate perpetual setups — when an engine evaluates that no mate is forced and material is even, it often steers toward perpetual rather than risk a worse position." },

      { type: 'heading', value: "The defence: how to escape perpetual" },
      { type: 'text', value: "If you're the *target* of perpetual, the only escape is **interpolating a defending move** — usually blocking the check with a piece that *also* threatens the checking queen. Or moving the king to a *third* square the perpetual sequence didn't account for. Both require having the resources to do so; sometimes there's simply no escape and the draw is forced." },

      // INTERACTIVE 1 — perpetual check from a worse position
      {
        type: 'interactive',
        fen: '6k1/5ppp/8/8/8/8/5PPP/q5K1 b - - 0 1',
        prompt: "Black to move and draw by perpetual. The black queen on a1 can shuttle. Find the first check.",
        solution: "Qa7+",
        explanation: "**1...Qa7+** (or Qb1+ in some lines) begins the perpetual. After **2.Kh1 Qa1+ 3.Kg2 Qa8+** (or other queen jumps along the a-file/diagonals reaching the king), the white king has only the squares h1, h2, g1, g2 to choose from, and the queen always finds a check from the corresponding square. **Lesson:** the worse side, when material-down and exposed, should *first* look for perpetual before considering resignation."
      },

      // INTERACTIVE 2 — initiating perpetual to save a lost game
      {
        type: 'interactive',
        fen: '6k1/5ppp/8/8/8/8/5PPP/2q3K1 b - - 0 1',
        prompt: "Black to move. Down material but with an active queen — find the perpetual check.",
        solution: "Qe1+",
        explanation: "**1...Qe1+** begins the queen shuttle. White must play **2.Kh2** (only legal move). Then **2...Qe5+** (or Qh4+) re-checks, **3.Kh1** (or Kg1) and again **3...Qe1+** repeats the position. Three repetitions = draw. **Recognition cue:** queen + open lines + king with only two flight squares = automatic perpetual draw."
      },

      // INTERACTIVE 3 — winning side avoiding stalemate / forcing perpetual
      {
        type: 'interactive',
        fen: '6k1/5ppp/8/8/8/2q5/5PPP/3R2K1 b - - 0 1',
        prompt: "Black to move. White's king is fairly safe — but black's queen has access. Find the move that begins a perpetual or wins material.",
        solution: "Qc1",
        explanation: "**1...Qc1** pins / attacks the rook. After the forced **2.Rxc1**, black is down material — so the better try is *Qe1+* type ideas: **1...Qe1+ 2.Rxe1 Qxe1+ 3.Kh2** etc. The honest lesson here: perpetual is *one* tool; sometimes the position is simply lost and perpetual isn't there. Always test for perpetual *first* — if it works, take the draw immediately. If it doesn't, look for material-saving alternatives."
      },
    ],
    quiz: [
      {
        question: "When should you actively look for a perpetual check?",
        options: [
          "Only when you're winning",
          "Whenever you're losing AND the enemy king is exposed — perpetual draws can save lost positions",
          "Only in the endgame",
          "Only when you have a queen and rook"
        ],
        answer: 1,
        explanation: "Perpetual check is the worse side's best friend. Always test for it before resigning — exposed enemy king + your queen + open lines is a recipe for a saving draw."
      },
      {
        question: "What's the typical geometry of a perpetual check?",
        options: [
          "Two rooks on the 7th rank",
          "A queen with access to two checking squares, attacking a king with only two flight squares — the queen shuttles forever",
          "A bishop pair",
          "Three pawns on the 6th rank"
        ],
        answer: 1,
        explanation: "Queen + exposed king with limited flight = perpetual. The queen alternates between two checking squares, the king alternates between its two legal squares, three repetitions and the game is drawn."
      }
    ],
    further: [
      "Endgame manuals (Dvoretsky's *Endgame Manual*, Müller's *Fundamental Chess Endings*) cover perpetual-check resources in queen endings",
      "Famous draws: many Petrosian, Karpov defensive masterpieces hinge on perpetual"
    ],
    next: null
  },

];
