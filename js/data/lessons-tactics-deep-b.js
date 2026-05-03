export const LESSONS_TACTICS_DEEP_B = [
  {
    id: "tac-deep-004-pin",
    title: "Pins — absolute, relative, cross-pins, and the pin-and-unpin trick",
    track: "tactics",
    order: 103,
    estimatedMinutes: 18,
    objective: "Spot pins, attack pinned pieces with piling-on, break pins, and exploit the pin-and-unpin trick.",
    tags: ["pin", "tactics"],
    next: "tac-deep-005-discovered-attack",
    content: [
      {
        type: "text",
        value:
          "A **pin** happens when a long-range piece (bishop, rook, or queen) attacks an enemy unit that is shielding a more valuable piece behind it on the same line. The pinned piece is paralyzed: moving it would expose the piece behind. Pins are one of the three or four most common tactical motifs in the game — they are the reason why moves like Bg5 or Bb5 in the opening have been played for five hundred years."
      },
      {
        type: "text",
        value:
          "There are two flavors. An **absolute pin** is one where the shielded piece is the king. The pinned piece literally cannot move along that line — it would be an illegal move. A **relative pin** is one where the shielded piece is just more valuable (typically a queen). The pinned piece can legally move, but moving it usually loses the bigger piece. Both kinds give you the same tactical opportunity: the pinned piece is a target that can't run."
      },
      {
        type: "board",
        fen: "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 3",
        caption:
          "Classic Bg5 pin. The Nf6 is pinned to the Qd8 along the d8-h4 diagonal. Black can in theory move the knight, but it loses the queen — so it's stuck."
      },
      {
        type: "text",
        value:
          "Once a piece is pinned, you can do something you can't normally do: **pile on**. Because the pinned piece can't run, every additional attacker you bring to it adds material pressure. A knight or pawn that wouldn't normally threaten a defended piece becomes a winning threat. The first Bg5 isn't usually winning material on its own — it's a setup. The follow-up (Nd5, e5 pushing, doubling rooks) is what wins the piece."
      },
      {
        type: "text",
        value:
          "**Breaking a pin.** The defender has three resources: (1) move the back piece off the line — for an absolute pin, simply walk the king out; for a relative pin, move the queen; (2) interpose a piece between the pinner and the pinned piece, breaking the line; or (3) capture the pinning piece. Strong players notice when their opponent has only one of these resources and make the others impossible."
      },
      {
        type: "board",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 0 4",
        caption:
          "After castling, white's king is off the e-file. If black ever tries Bg4 to pin the Nf3, white can interpose with Be2, breaking the pin instantly."
      },
      {
        type: "text",
        value:
          "**The pin-and-unpin trick.** This is one of the most beautiful resources in tactics. When a piece appears pinned, you ask: what happens if I capture the piece *behind* the pinned piece first? If you can capture (or trade) the back piece — usually with check or with a bigger threat — then the front piece is suddenly free, no longer pinned, and can move with full power. Légal's Mate is the most famous example: a knight that was 'pinned' to the queen ignores the pin, captures a pawn, and when the queen is taken, three minor pieces deliver mate."
      },
      {
        type: "text",
        value:
          "**Cross-pin.** A piece pinned along two lines at once — typically pinned by a rook on one rank and a bishop on a diagonal that intersects at the same square. Cross-pins are extremely hard to break because the back pieces sit on different lines and can't be moved with one tempo. They show up in king-and-queen geometry near the corners."
      },
      {
        type: "text",
        value:
          "**Patterns to recognize.** (1) Bg5/Bb5 in the opening pinning a knight to the queen or king. (2) Rook on an open file with the enemy king or queen at the end and one piece in between. (3) The 'reverse-pin' setup where you move *your* king off a line so your own piece is unpinned and free to capture. (4) Bishop on c4 with a rook on e1 ganging up on f7 once the e-file opens. (5) Two pinning pieces creating a cross-pin near the corner."
      },
      {
        type: "text",
        value:
          "**What to look for when scanning a position.** First, identify every long-range piece on both sides and trace its lines through to the end of the board. Any time a line passes through one enemy piece and ends at a more valuable enemy piece (with no other obstruction), you have a pin. Second, count how many of your pieces can reach the pinned piece — if you can pile on more attackers than the opponent can pile on defenders, you win material. Third, check whether the back piece can move easily; if it can, the pin is weak. Fourth, ask whether the back piece is itself a target: if you can capture it with check or a tempo move, you've executed the pin-and-unpin."
      },
      {
        type: "interactive",
        fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
        prompt: "White to move. Find the most natural opening pin.",
        solution: "Bg5",
        explanation:
          "Bg5 pins the Nf6 to the Qd8 — a textbook relative pin. The knight is now a target white can pile on with moves like Nd5 or by trading bishops to inflict doubled f-pawns."
      },
      {
        type: "interactive",
        fen: "4k3/4r3/8/8/8/8/4R3/4K3 w - - 0 1",
        prompt: "White to move. The black rook is pinned against its king — capture it.",
        solution: "Rxe7+",
        explanation:
          "The Re7 is absolutely pinned by the white rook against the king on e8. Rxe7+ wins the rook outright. Whenever a piece is absolutely pinned and you have a piece of equal or lesser value attacking it, capture immediately."
      },
      {
        type: "interactive",
        fen: "4k3/4n3/8/8/8/8/4R3/4K3 w - - 0 1",
        prompt: "White to move. Win the pinned knight.",
        solution: "Rxe7+",
        explanation:
          "The Ne7 is absolutely pinned against its king by the rook on e2. Rxe7+ wins the knight cleanly. The knight cannot move (would expose the king), so it's free material."
      },
      {
        type: "interactive",
        fen: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        prompt: "Black to move. Set up a relative pin on white's most active piece.",
        solution: "Bg4",
        explanation:
          "Bg4 pins the Nf3 to the Qd1 — a relative pin. White must address it (h3 to chase, or castling so the king moves). The knight cannot easily move without losing the queen."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/8/8/4b3/4R3/4K3 w - - 0 1",
        prompt: "White to move. The black bishop is pinned to its king by your rook. Capture it.",
        solution: "Rxe3+",
        explanation:
          "The bishop on e3 is absolutely pinned against the king on e8. White captures with check, winning the bishop for nothing. When a minor piece is pinned to the king on an open file, the rook just takes."
      },
      {
        type: "interactive",
        fen: "4k3/4q3/8/8/8/8/4R3/4K3 w - - 0 1",
        prompt: "White to move. The black queen is absolutely pinned. Take her.",
        solution: "Rxe7+",
        explanation:
          "The queen on e7 is pinned to the king on e8 by the rook on e2. Rxe7+ wins the queen for a rook — a huge material gain. When a queen is pinned to the king, take her with whatever you have on the line."
      }
    ],
    quiz: [
      {
        question: "Which of these is the defining feature of an absolute pin?",
        options: [
          "The pinned piece is more valuable than the pinner.",
          "The shielded piece behind the pinned piece is the king.",
          "The pin is along a diagonal, not a file or rank."
        ],
        answer: 1,
        explanation:
          "An absolute pin shields the king. That makes moving the pinned piece illegal, not just bad — which is why absolute pins are so much more powerful than relative ones."
      },
      {
        question: "What is the 'pin-and-unpin' trick?",
        options: [
          "Moving the pinning piece away so the pin no longer exists.",
          "Capturing the back (shielded) piece first so the front piece becomes free to move.",
          "Trading the pinned piece for any piece of equal value."
        ],
        answer: 1,
        explanation:
          "If you can capture the back piece with check or a bigger threat, the front piece is no longer pinned and can do anything. Légal's Mate is the most famous example."
      },
      {
        question: "When a piece is absolutely pinned, what is the best general strategy?",
        options: [
          "Trade it off as fast as possible.",
          "Pile on additional attackers — it can't move, so every extra attacker tilts the count.",
          "Ignore it; pinned pieces aren't really targets."
        ],
        answer: 1,
        explanation:
          "Because an absolutely pinned piece cannot move, any new attacker you bring is essentially uncontested. Pile-on is the standard technique."
      }
    ]
  },
  {
    id: "tac-deep-005-discovered-attack",
    title: "Discovered attacks and discovered checks — the two-for-one move",
    track: "tactics",
    order: 104,
    estimatedMinutes: 18,
    objective: "Recognize batteries, find discovered attacks where the moving piece also threatens, and exploit discovered checks and the windmill.",
    tags: ["discovered-attack", "discovered-check", "windmill", "tactics"],
    next: "tac-deep-006-double-attack",
    content: [
      {
        type: "text",
        value:
          "A **discovered attack** happens when one of your pieces moves out of the way of another, unmasking an attack from the piece behind. You're effectively making two moves at once: the piece in front moves (and can attack something itself), and the piece behind suddenly attacks too. This is why discovered attacks are statistically the highest-yield tactic per move in the database — they win material constantly because the opponent can only address one of the two threats."
      },
      {
        type: "text",
        value:
          "The setup is called a **battery**: a long-range piece (rook, bishop, or queen) and a piece directly in front of it on the same line, both belonging to you. The blocker is the discovery piece. Wherever the blocker can legally go, it unmasks the line. The trick is choosing a destination square where the blocker also creates its own threat — capturing something, attacking the queen, or forking. Now the opponent has to deal with two pieces' worth of threats in one move."
      },
      {
        type: "board",
        fen: "4k3/8/8/8/4N3/4R3/8/4K3 w - - 0 1",
        caption:
          "A rook-knight battery on the e-file. The knight blocks the rook's line toward the king on e8. Any knight move unmasks the rook (delivering check). Pick a square where the knight also threatens something."
      },
      {
        type: "text",
        value:
          "**Discovered check** is a discovered attack where the unmasked piece gives check. It's much more powerful than an ordinary discovered attack because the opponent *must* respond to the check — they can't sidestep, can't trade, can't make a counter-threat. They have to address the king. That gives the moving (discovery) piece complete freedom: it can capture a hanging queen, fork two pieces, retreat to safety, anything. The discovery piece behaves as if it's invisible."
      },
      {
        type: "text",
        value:
          "**Double check** is the apex form: both the moving piece and the unmasked piece check the king at the same time. You cannot block two checks with one piece. You cannot capture two checking pieces with one piece. The only legal response is for the king to move. This is why double check is the most forcing move in chess and why it's the engine behind smothered mate, Boden's mate, and many of the most famous combinations in history."
      },
      {
        type: "board",
        fen: "4k3/8/8/2q5/4N3/4R3/8/4K3 w - - 0 1",
        caption:
          "The Ne4 sits between the Re3 and the king on e8. Nxc5+ captures the queen AND discovers check from the rook. Black can only respond to the check — the queen is just gone."
      },
      {
        type: "text",
        value:
          "**The windmill** is the most spectacular form of discovered check. A bishop-and-rook battery aimed at the enemy king cycles like a turbine: the rook gives check from one square, the king is forced to move, the rook returns to its original square — discovering check from the bishop again — and on the way back grabs an enemy piece. The cycle repeats: rook check, king move, rook retreat with discovered check eating another piece. Torre's 1925 win against Lasker is the canonical example, where white ground through queen and several pawns before the windmill ended."
      },
      {
        type: "text",
        value:
          "**Patterns to recognize.** (1) Bishop or rook lined up with the enemy king with one of your own pieces in between (most common in opening positions where a bishop is on c1 or f1 and a knight blocks the line). (2) Knight in the center supported by a bishop on the long diagonal aimed at the corner. (3) Rook on an open file with one of your pawns or pieces blocking — a pawn push or piece move discovers the rook. (4) Queen behind a knight, where the knight's leap unmasks the queen onto a major diagonal. (5) The windmill pattern: rook on the 7th rank adjacent to the king, bishop on a long diagonal raking the back rank."
      },
      {
        type: "text",
        value:
          "**What to look for when scanning a position.** First, identify every battery on the board — your line-pieces with one of your own units in front of them. Second, for each battery, ask where the blocker can go, and what threats it creates from each square. Third, prefer destinations that are checks, captures, or forks (because these are the highest-yield discoveries). Fourth, if you can find a discovered check, calculate further — discovered checks often allow the moving piece to grab a queen or fork two pieces. Fifth, look for double check potential: if the discovery piece itself can give check from its destination square, you've found the most forcing move available."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/2q5/4N3/4R3/8/4K3 w - - 0 1",
        prompt: "White to move. Capture the queen with discovered check.",
        solution: "Nxc5+",
        explanation:
          "Nxc5+ takes the queen on c5 (a legal knight move from e4) and simultaneously discovers check from the rook on e3 along the e-file. Black must respond to the check — and white has won the queen for free. This is the cleanest possible discovered-attack pattern."
      },
      {
        type: "interactive",
        fen: "4k3/8/3q4/8/4N3/4R3/8/4K3 w - - 0 1",
        prompt: "White to move. Discover check from the rook while attacking the queen.",
        solution: "Nxd6+",
        explanation:
          "Nxd6+ captures the queen on d6 (a legal knight move from e4) and discovers check from the rook on e3. Black must address the check — the queen is just gone. Same pattern as before, different destination square. Memorize the d6/c5/f6/g5/g3/f2/d2/c3 ring around e4."
      },
      {
        type: "interactive",
        fen: "4k3/8/5q2/8/4N3/4R3/8/4K3 w - - 0 1",
        prompt: "White to move. Use the discovered-check geometry to win the queen.",
        solution: "Nxf6+",
        explanation:
          "Nxf6+ captures the queen on f6 (legal e4-to-f6 knight move) and discovers check from the rook on e3 toward the king on e8. Three different queen squares (c5, d6, f6), three identical wins. The lesson: when you have a knight-rook battery on a file, scan all 8 knight-destination squares for enemy queens or rooks."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/4q3/4N3/4R3/8/4K3 w - - 0 1",
        prompt: "White to move. Move the knight off the e-file with check, then win the queen.",
        solution: "Nf6+",
        explanation:
          "Nf6+ moves the knight off the e-file (giving check to the king on e8 from f6) AND unmasks the rook on e3, which now attacks the queen on e5. Black must respond to the check; on the next move white plays Rxe5 winning the queen. Classic discovered-attack-with-check: the moving piece forces the king while the back piece grabs material."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/8/4N3/4R3/8/4K3 w - - 0 1",
        prompt: "White to move. With no enemy targets in range, demonstrate the discovered check by moving the knight to an active central square.",
        solution: "Nf6+",
        explanation:
          "Nf6+ leaves the e-file and discovers check from the rook on e3 toward the king on e8. Even with no immediate material to grab, the discovered check forces the king to move and gives white initiative. Always identify your batteries — they're free moves that come with a check attached."
      }
    ],
    quiz: [
      {
        question: "Why is double check the most forcing move in chess?",
        options: [
          "It always delivers checkmate.",
          "Two checking pieces cannot both be blocked or captured in one move, so the king must move.",
          "It threatens to promote a pawn next."
        ],
        answer: 1,
        explanation:
          "You can block one check or capture one checker, but not two with a single response. The king has no choice but to move."
      },
      {
        question: "What is a 'battery' in the context of discovered attacks?",
        options: [
          "Any pair of pieces of the same color.",
          "A long-range piece (B/R/Q) with one of your own pieces directly in front on its line.",
          "Two rooks doubled on a file."
        ],
        answer: 1,
        explanation:
          "A battery is the setup that enables a discovered attack: a line-piece behind a blocker. When the blocker moves, the line opens."
      },
      {
        question: "What makes a windmill so devastating?",
        options: [
          "It always ends in checkmate within two moves.",
          "A repeating discovered-check cycle lets you grab piece after piece, since each check is forcing.",
          "It uses three knights at once."
        ],
        answer: 1,
        explanation:
          "Because each rook return is a discovered check, the opponent must move the king every turn — the bishop can keep snapping pieces on the way back and forth."
      }
    ]
  },
  {
    id: "tac-deep-006-double-attack",
    title: "Double attacks — one move, two threats",
    track: "tactics",
    order: 105,
    estimatedMinutes: 18,
    objective: "Recognize and create double attacks with the queen, knight, and bishop, and distinguish them from forks.",
    tags: ["double-attack", "fork", "tactics"],
    next: "tac-deep-007-attacking-defenders",
    content: [
      {
        type: "text",
        value:
          "A **double attack** is the umbrella concept that covers most of chess tactics. Any single move that creates two threats the opponent cannot meet with one reply is a double attack. Forks are double attacks (one piece attacking two enemy pieces). Discovered attacks are double attacks (one move generating two threats from two different pieces). Pins create double attacks when the pinned piece is attacked. Skewers, deflections, decoys, and overloading all reduce to double-attack arithmetic at the critical moment."
      },
      {
        type: "text",
        value:
          "The geometric distinction matters. A **fork** is a single piece attacking two or more enemy pieces simultaneously — the threats radiate from one source. A **double attack** in the broader sense can also mean one move that creates two *separate* threats, possibly from two different pieces. The simplest case: a queen move to a central square that attacks an enemy piece on one corner and threatens mate on another. The opponent can defend the piece or the mate but not both."
      },
      {
        type: "board",
        fen: "4k3/8/8/3N4/8/8/8/4K3 w - - 0 1",
        caption:
          "A knight on d5 attacks 8 squares: b4, b6, c3, c7, e3, e7, f4, f6. Any enemy piece on two of those squares at once is forked. Memorize the d5 knight's reach — it's the most common forking outpost in the game."
      },
      {
        type: "text",
        value:
          "**Queen double attacks.** The queen's range makes her the universal double-attacker. A queen on d4 attacks 27 squares — every queen move should be checked for two simultaneous threats. The most common pattern: queen comes to a central square attacking one piece while threatening mate on a second square. A queen check that also attacks a hanging piece is a queen fork. A queen move that threatens both back-rank mate and a piece is a queen double attack (even though only one piece is being directly attacked, two threats exist)."
      },
      {
        type: "text",
        value:
          "**Knight double attacks.** Knights are most famous for forks because of their L-shape: from a centralized square a knight attacks 8 squares in a starburst pattern, often hitting pieces on opposite-colored squares simultaneously. The 'family fork' (Nxc7+ attacking K on e8 and R on a8) is the prototypical pattern every player must memorize. But knights also create discovered double attacks — a knight that moves out of a battery is two threats in one. And knights can create 'short-range double attacks' where the L hits two pieces that aren't on a single line."
      },
      {
        type: "board",
        fen: "r3k3/8/8/3N4/8/8/8/4K3 w - - 0 1",
        caption:
          "The classic family-fork setup. The Nd5 leaps to c7, attacking the king on e8 (check) AND the rook on a8. After the king moves, white plays Nxa8 winning the rook. Memorize this geometry — it's the single most common knight tactic in the game."
      },
      {
        type: "text",
        value:
          "**Bishop double attacks.** Bishops create double attacks along diagonals — typically one diagonal attacks one piece while the other diagonal attacks something else. A bishop on c4 attacks both f7 and a6 simultaneously. A bishop on b2 attacks both a1-h8 and (via h8) potentially the king. Bishop double attacks often show up as discovered attacks (bishop sits behind a knight) or as 'double-bishop' attacks where two bishops on adjacent diagonals coordinate. Boden's Mate is two bishops on intersecting diagonals — a double-bishop double attack."
      },
      {
        type: "text",
        value:
          "**The geometric heuristic.** Think of every attacking piece as broadcasting threats on lines (queens, bishops, rooks) or on starburst squares (knights). A double attack happens when one move creates a second broadcast: either the same piece reaches a square where it now broadcasts to two targets, or a piece moves out of the way letting a second piece broadcast. To find double attacks fast, mentally play the move and ask: 'What does this attack? And what does it threaten *next*?' If both answers contain a winning material gain, it's a double attack."
      },
      {
        type: "text",
        value:
          "**Patterns to recognize.** (1) Queen check + hanging piece — the most common queen fork. (2) Centralized knight on c5/d5/e5/f5/c4/d4/e4/f4 attacking pieces in opposite directions. (3) Bishop on c4 attacking f7 (king) and a6 (a piece) simultaneously. (4) Pawn push attacking two minor pieces — the cheap pawn fork. (5) Quiet centralizing moves like Re1 that pin a piece *and* threaten a tactic on the next move (a delayed double attack). (6) Discovered double attacks: knight moves to attack one piece while the bishop behind unmasks attack on another."
      },
      {
        type: "text",
        value:
          "**What to look for when scanning a position.** First, identify every piece in your army that can move to a central square. For each candidate move, ask: what does it attack? What does it threaten next move? If two distinct material gains are on the menu and the opponent can stop only one, you've found a double attack. Second, after every check you might give, ask: 'In addition to the check, what else does this piece attack?' This is how you find every queen fork and knight fork in 30 seconds. Third, look for batteries that can be activated — discovered double attacks are easy to miss but devastating. Fourth, count enemy pieces that are undefended ('hanging'); two undefended pieces on the same color or on knight-fork distance are an invitation."
      },
      {
        type: "interactive",
        fen: "r3k3/8/8/3N4/8/8/8/4K3 w - - 0 1",
        prompt: "White to move. Find the family fork.",
        solution: "Nc7+",
        explanation:
          "Nc7+ from d5 reaches c7. From c7 the knight attacks e8 (king, check) AND a8 (rook). After the king moves, white plays Nxa8 winning the rook. THE pattern to memorize — the family fork. Whenever you see an enemy king on e8 and rook on a8 with a knight that can reach c7, the rook is gone."
      },
      {
        type: "interactive",
        fen: "r3k3/8/8/8/8/2N5/8/4K3 w - - 0 1",
        prompt: "White to move. Reroute the knight one square to set up the family fork next move.",
        solution: "Nd5",
        explanation:
          "Nd5 reroutes the knight. From d5 next move white plays Nc7+ forking the king on e8 and the rook on a8 — the family fork. The lesson: many knight forks need one preparatory move to reach the launching square; learn to recognize the launching square (here, d5) as well as the forking square (c7)."
      },
      {
        type: "interactive",
        fen: "r3k3/8/8/8/8/2N5/8/4K3 w - - 0 1",
        prompt: "White to move. From c3, find the move that puts the knight on the launching square for the family fork.",
        solution: "Nd5",
        explanation:
          "Nd5 reroutes the knight to d5, the launching square. From d5 next move white plays Nc7+ — attacking the king on e8 (check) AND the rook on a8 (the family fork). The lesson: many knight forks need one preparatory move. Learn both the launching square (d5) and the forking square (c7)."
      },
      {
        type: "interactive",
        fen: "4k3/4q3/8/3N4/8/8/8/4K3 w - - 0 1",
        prompt: "White to move. Win the queen with a knight capture.",
        solution: "Nxe7",
        explanation:
          "Nxe7 captures the queen. The king must recapture (Kxe7), so net white wins queen for knight — a gain of about 6 points of material. Even when there's no immediate fork, a knight sitting on the launching square (d5) often finds a direct capture on the queen. The lesson: any centralized knight should scan the 8 squares it attacks for hanging enemy pieces."
      },
      {
        type: "interactive",
        fen: "r3k3/8/8/3N4/8/8/8/4K3 w - - 0 1",
        prompt: "White to move. Win the rook with a fork.",
        solution: "Nc7+",
        explanation:
          "Nc7+ is the family fork — checks the king on e8 and attacks the rook on a8. The king must move (only Kd7, Kf7, or Ke7), then white plays Nxa8 capturing the rook. This duplicate puzzle is here to drill the pattern; if you internalize Nc7+ from d5 with king on e8 and rook on a8, you'll spot it instantly in real games."
      },
      {
        type: "interactive",
        fen: "4k3/8/8/3q4/3Q4/8/8/4K3 w - - 0 1",
        prompt: "White to move. Trade queens favorably with a centralized capture.",
        solution: "Qxd5+",
        explanation:
          "Qxd5+ captures the queen with check. Black has no recapture — the king must move. White wins the queen for nothing. The geometric point: when two queens face off on a file with the kings behind, the side to move just takes. Always check whether your queen can capture an enemy queen with check (the king-and-queen alignment is a recurring tactical theme)."
      }
    ],
    quiz: [
      {
        question: "What is the difference between a fork and a double attack in the broader sense?",
        options: [
          "A fork uses pawns; a double attack uses pieces.",
          "A fork is one piece attacking two enemy pieces; a double attack can also mean one move creating two separate threats from different pieces.",
          "A fork happens in the opening; a double attack happens in the endgame."
        ],
        answer: 1,
        explanation:
          "A fork is the special case of a double attack where a single piece is the source of both threats. The umbrella term 'double attack' covers any move that creates two threats."
      },
      {
        question: "Why is the queen the most prolific double-attacker in chess?",
        options: [
          "She has the highest material value.",
          "She can move along ranks, files, and diagonals — her range covers the most squares of any piece.",
          "She starts on a central square."
        ],
        answer: 1,
        explanation:
          "Because the queen attacks lines in all eight directions, almost every queen move generates threats in multiple directions. Always check what a queen move attacks AND what it threatens next."
      },
      {
        question: "What's the best mental habit for spotting double attacks?",
        options: [
          "Memorize famous game positions.",
          "After every candidate move, ask 'what does this attack, and what does it threaten next?'",
          "Only consider checks and captures."
        ],
        answer: 1,
        explanation:
          "The two-question habit is the engine of double-attack detection. Quiet moves that attack one piece and threaten another are the hardest to spot but the most common."
      }
    ]
  }
];
