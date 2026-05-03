// Exchanges & Piece Values track.
//
// Connor explicitly asked: "what's the priority of taking pieces — what to
// trade for what?" This whole track answers that.
//
// Tone: conversational, not preachy. Connor is intelligent but still building
// chess intuition. Each lesson opens with WHY before HOW.
//
// FENs were verified by hand: each rank totals 8 squares, exactly one king
// per side, side-to-move matches the position, and any move marked as a
// `solution` in an interactive block is legal from the FEN given.
// Positions flagged for double-check are listed in the report.

export const LESSONS_EXCHANGES = [

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-001-piece-values",
    title: "What pieces are worth: the standard scale",
    track: "exchanges",
    order: 1,
    estimatedMinutes: 12,
    objective: "Internalize the relative values P=1, N=B=3, R=5, Q=9 — and understand the limits of the scale.",
    tags: ["piece-values", "fundamentals", "exchanges"],
    next: "exch-002-bishop-vs-knight",
    content: [
      { type: "text", value: "Every chess decision involving a capture or trade ultimately comes down to one question: **am I getting a fair deal?** To answer that, you need a yardstick. The standard scale of piece values is the yardstick almost every player uses, from beginner to world champion." },

      { type: "heading", value: "The standard scale" },
      { type: "text", value: "- **Pawn = 1**\n- **Knight = 3**\n- **Bishop = 3** (often **3.25**, see lesson on the bishop pair)\n- **Rook = 5**\n- **Queen = 9**\n- **King = ∞** (you can't trade it, you can only lose it)\n\nThese numbers are nicknamed *material points* or sometimes just *points*. They aren't sacred — they're a heuristic, distilled from millions of games. But they're remarkably accurate as a starting point." },

      { type: "subheading", value: "Where do these numbers come from?" },
      { type: "text", value: "Roughly: the value of a piece reflects **how many squares it can attack on average across a game**, weighted by how often it's blocked.\n\n- A pawn moves one square, attacks two — small influence.\n- A knight reaches up to 8 squares from a central post; can jump pieces — medium.\n- A bishop on an open long diagonal hits up to 13 squares — medium.\n- A rook on an open file plus a rank covers up to 14 squares — high.\n- A queen combines rook and bishop — highest of all.\n\nThat's why N and B sit at the same number, and why Q ≈ R + B + 1." },

      { type: "board", fen: "4k3/8/3p4/8/3N4/8/8/4K3 w - - 0 1", caption: "A knight on d4 attacks **8 squares** (b3, b5, c2, c6, e2, e6, f3, f5). That mobility is what gives it value 3." },

      { type: "board", fen: "4k3/8/8/8/3B4/8/8/4K3 w - - 0 1", caption: "A bishop on d4, on an empty board, attacks **13 squares** along two diagonals. Same value as the knight on average — but the strengths differ wildly by position." },

      { type: "heading", value: "How to use the scale in practice" },
      { type: "text", value: "When a capture is available, do quick arithmetic:\n\n- **Equal trade** (Bishop for knight, rook for rook): usually fine.\n- **Winning material**: take a piece for less than its value (R for B = win the *exchange*, +2).\n- **Losing material**: never give up more than you get without a *concrete* reason.\n\nPlayers will often say things like \"I'm up an exchange\" (rook for minor piece, +2) or \"I'm down a pawn but have the initiative\" — they're translating positional advantages into pawn-equivalents." },

      { type: "interactive", fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5", prompt: "It's White to move. Your bishop on c4 and knight on c3 are both attacked? Look carefully — is there a capture available, and is it favorable?", solution: "Bxf7+", explanation: "**Bxf7+** wins a pawn AND exposes Black's king. Material count: +1 pawn for White after Kxf7. The bishop is worth 3, the pawn is worth 1, but the bishop survives the capture — Black recaptures with the king (the king is the only defender of f7), winning back nothing tangible. Net: +1 pawn and Black has lost castling rights. (If you saw a different capture you preferred, that's fine — what matters is you ran the math.)" },

      { type: "heading", value: "The big disclaimer: this is a heuristic, not a law" },
      { type: "text", value: "The point values assume **all else equal**. In real positions, all else is almost never equal. Three things constantly override material:\n\n1. **King safety.** A queen is worth 9 — except when sacrificing her delivers checkmate. Then she's worth zero. Mate ends the game.\n2. **Activity.** A trapped knight in the corner is worth less than 3. An outposted knight on d5 dominating the board is worth more than 3 — sometimes 4 or 5.\n3. **Initiative and tempo.** Being a pawn down with three attackers near the king often wins. Being a pawn up while passive often loses.\n\nGreat players violate the point scale all the time — but only for *concrete reasons*. They sacrifice a knight for a pawn because they've calculated that the resulting attack is decisive. The scale tells you when you owe the position an explanation." },

      { type: "quote", value: "\"Chess is mental torture.\" — Garry Kasparov. The torture is largely about deciding which exchanges are good ones." },

      { type: "subheading", value: "Common refinements you'll see" },
      { type: "text", value: "Different authors give slightly different scales. AlphaZero-derived numbers (computer-tuned): P=1, N=3.05, B=3.33 (with pair bonus), R=5.63, Q=9.5. Larry Kaufman's classic statistical study: P=1, N=B=3.25 with bishop pair worth +0.5, R=5, Q=9.75.\n\nDon't memorize these — just know that **bishops are usually a touch better than knights in a vacuum**, and **a queen is slightly *less* than two rooks (10 vs 9)** in the endgame, even though she's a touch more in the middlegame." },

      { type: "text", value: "The rest of this track teaches you when and how the standard scale lies — and what to look for instead." }
    ],
    quiz: [
      { question: "Without context, which trade is roughly equal in material?", options: ["Bishop for two pawns", "Knight for bishop", "Rook for bishop and pawn", "Queen for two rooks"], answer: 1, explanation: "Knight (3) for bishop (3) is the textbook equal trade. Rook (5) for bishop+pawn (4) loses you 1 point. Queen (9) for two rooks (10) actually loses 1 point of pure material — though in the middlegame a queen often plays stronger than two rooks." },
      { question: "Why do bishop and knight share the same nominal value of 3?", options: ["They have the same mobility on average across many positions", "They were both invented at the same time", "Tradition from the 1700s, no actual reason", "They're both worth more than a rook"], answer: 0, explanation: "On average across many positions and game phases, they end up roughly equal. But each is much stronger in its preferred environment — bishops in open positions, knights in closed/blocked ones." },
      { question: "The standard piece-value scale is best described as:", options: ["A mathematically proven law of chess", "A useful heuristic that's overridden by king safety, activity, and initiative", "Outdated — modern engines ignore it entirely", "Only applies in the endgame"], answer: 1, explanation: "It's a heuristic — extremely useful for everyday decisions, but constantly trumped by concrete factors. Engines absolutely use material values too, just refined ones combined with positional evaluation." }
    ],
    further: [
      "Larry Kaufman, 'The Evaluation of Material Imbalances' (1999) — the statistical foundation of modern point values.",
      "Reuben Fine, *Basic Chess Endings* — older but classic treatment of material.",
      "John Watson, *Secrets of Modern Chess Strategy* — chapters on dynamic vs static evaluation."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-002-bishop-vs-knight",
    title: "Bishop vs knight: which is better and when",
    track: "exchanges",
    order: 2,
    estimatedMinutes: 14,
    objective: "Decide bishop vs knight by reading the pawn structure: open positions favor bishops, closed positions favor knights, outposts favor knights regardless.",
    tags: ["minor-pieces", "bishop", "knight", "pawn-structure"],
    next: "exch-003-bishop-pair",
    content: [
      { type: "text", value: "The point scale calls them equal. They aren't, in any specific position. The whole game of \"minor-piece chess\" is figuring out which side wants knights on the board and which side wants bishops — and steering the trades accordingly." },

      { type: "heading", value: "The fundamental difference" },
      { type: "text", value: "- A **bishop** moves on diagonals and can cross the entire board in one move. But it's locked to one color forever.\n- A **knight** can reach any square eventually but moves slowly. Its great power is **jumping pieces** — pawn chains don't bother it.\n\nFrom that, everything else follows." },

      { type: "subheading", value: "Open positions favor the bishop" },
      { type: "text", value: "An *open* position is one where the central pawns have been traded off and long diagonals are clear. The bishop becomes a bazooka — reaching from b2 to h8 in a single move while the enemy knight needs three or four hops to get anywhere useful." },

      { type: "board", fen: "4k3/8/8/3p4/3P4/8/4K3/8 w - - 0 1", caption: "Pawn structure idea: when the position has few pawns and they're not blocking diagonals, bishops thrive." },

      { type: "subheading", value: "Closed positions favor the knight" },
      { type: "text", value: "A *closed* position has interlocking pawn chains and few pawn breaks. Bishops bump their nose on their own pawns. The knight, indifferent to walls, picks its way through the maze and often emerges on a great square." },

      { type: "board", fen: "4k3/p1p1p1p1/1p1p1p1p/8/8/PP1P1P1P/2P1P1P1/4K3 w - - 0 1", caption: "An exaggerated closed structure. A bishop can barely move; a knight glides through the holes." },

      { type: "heading", value: "Outposts: the knight's ultimate home" },
      { type: "text", value: "An **outpost** is a square in or near enemy territory where:\n\n1. Your piece (usually a knight) can land safely, and\n2. **No enemy pawn can ever evict it** because the pawn that *would* attack the square has been traded off or pushed past.\n\nA knight on a strong outpost — typically d5, e5, d4, or e4 in middlegame positions — is often worth more than the enemy's bishop. It dominates the board, ties down defenders, and you can build an attack around it." },

      { type: "interactive", fen: "r1bq1rk1/ppp1bppp/2n1pn2/3p4/3P1B2/2NBPN2/PPP2PPP/R2Q1RK1 w - - 0 8", prompt: "White to move in a typical Queen's Pawn structure. Where is the natural knight outpost square White would love to occupy in the future?", solution: "Ne5", explanation: "**Ne5** plants the knight on the e5 outpost. Black has no pawn on d6 or f6 to evict it — so once it lands, it stays. The knight on e5 is a permanent piece in the heart of Black's position. This kind of square is worth more than a few tempo of regrouping to reach. (Other developing moves are reasonable here, but Ne5 illustrates the outpost concept directly.)" },

      { type: "heading", value: "Concrete trading rule" },
      { type: "text", value: "**Look at the central pawn structure:**\n\n- **Pawns mostly traded, files open** → keep your bishops, trade off enemy bishops.\n- **Locked pawn chains** (think French Defence advance variation, King's Indian) → keep your knights.\n- **You have a juicy outpost** → keep the knight that can reach it; trade off the enemy bishop that defends the outpost square.\n\nA running mantra: **\"Trade my bad piece, keep my good one.\"** That phrase will come back several times in this track." },

      { type: "subheading", value: "The classic example: Capablanca's logic" },
      { type: "text", value: "Capablanca was famous for converting tiny imbalances into wins by exchanging into endgames where his bishop was *just slightly* better than the opponent's knight. In open endgames with pawns on both wings, the bishop's range is decisive — it can stop a passed pawn and assist an attack on the same move; the knight cannot." },

      { type: "interactive", fen: "8/5k2/4p3/3pP3/3P1P2/3K4/8/4N1n1 w - - 0 1", prompt: "Closed endgame, both sides have one minor piece. Whose minor piece is happier — White's knight or Black's knight? (Both are knights here, so think structurally.) White to move — what's the right approach?", solution: "Nc2", explanation: "With the structure locked, the knights are the right pieces. The plan is to maneuver the knight to a strong central square (like c2-e3-d5 ideas) where it dominates. The bishops would be terrible in this position — locked behind their own pawns. This is why pawn structure governs the trade." },

      { type: "heading", value: "Quick checklist before a B-for-N trade" },
      { type: "text", value: "1. Are most central pawns still on the board, or are they gone?\n2. Are diagonals open or blocked?\n3. Does either side have a permanent outpost square?\n4. Are pawns fixed on the bishop's color (bad for the bishop)?\n5. Is the position likely to open or stay closed?\n\nIf the position will open → keep bishops. If it stays closed → keep knights. If you have an outpost waiting → keep the knight that fits it." }
    ],
    quiz: [
      { question: "In an OPEN position with pawns on both wings, which piece is generally slightly better?", options: ["Knight", "Bishop", "Both equal", "Rook beats both"], answer: 1, explanation: "Bishops shine when diagonals are clear and they can affect both wings in a single move. The classic 'good bishop vs bad knight' endgame is open with pawns on both sides." },
      { question: "What makes an outpost an outpost (not just a square)?", options: ["It's in the center of the board", "No enemy pawn can attack it now or later", "Your knight is already on it", "It's defended by two pieces"], answer: 1, explanation: "The defining feature is permanence — no enemy pawn can drive your piece away, ever. That makes the square a stable, long-term home." },
      { question: "If your bishop is locked behind your own pawn chain (a 'bad bishop') and the opponent has a beautifully posted knight, what's the practical idea?", options: ["Trade your bishop for their knight if you can — bad piece for good piece", "Trade your knight for their knight", "Avoid all trades, you might confuse them", "Push your pawns to free the bishop, even if it loses material"], answer: 0, explanation: "Trading your bad piece for their good piece is one of the most reliable strategic improvements in chess. It's covered in depth in the lesson on bad-piece trades later in this track." }
    ],
    further: [
      "Mihail Marin, *Secrets of Chess Defence* — chapters on minor-piece trades.",
      "Jonathan Rowson, *Chess for Zebras* — section on knight outposts.",
      "Capablanca's *Chess Fundamentals* — endgame chapter on B vs N."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-003-bishop-pair",
    title: "The bishop pair: a hidden half-pawn",
    track: "exchanges",
    order: 3,
    estimatedMinutes: 11,
    objective: "Recognize the bishop pair as a long-term asset worth roughly +0.5 pawns, especially in open positions, and know when to break it.",
    tags: ["bishop-pair", "minor-pieces", "imbalance"],
    next: "exch-004-rook-power",
    content: [
      { type: "text", value: "Two bishops together on the board are stronger than the sum of their parts. That extra strength has a name: **the bishop pair**. Treat it as an asset on your balance sheet whenever you have it." },

      { type: "heading", value: "Why the pair is worth more than the sum" },
      { type: "text", value: "Each bishop covers only one color complex (light-squared or dark-squared). A single bishop has a permanent blind spot — the other color. **Two bishops cover both color complexes.** Together they have no blind spot, and they support each other.\n\nLarry Kaufman's statistical study of master games found the bishop pair worth roughly **+0.5 pawns** on average. That's more than half the value of the so-called 'exchange' (rook for minor, +2). It's a quiet but real edge that shows up over hundreds of small decisions." },

      { type: "board", fen: "4k3/8/8/8/8/8/8/2B1KB2 w - - 0 1", caption: "The pair: between them, the two bishops cover every square of both colors. There is nowhere on the board the enemy king can fully hide." },

      { type: "heading", value: "When the pair really shines" },
      { type: "text", value: "Two situations make the bishop pair devastating:\n\n1. **Open positions.** With pawns gone or thinned out, both bishops have long ranges. They can sweep the board.\n2. **Pawns on both wings.** Bishops cross the board in one move; knights need many. With pawns on a-side and h-side, the bishop pair dominates the endgame.\n\nThe textbook 'two bishops vs B+N endgame with pawns on both wings' is a famous *technical win* that many strong players have demonstrated." },

      { type: "interactive", fen: "4k3/p4p1p/6p1/8/8/6P1/P4PBP/4K3 w - - 0 1", prompt: "White has only one bishop here — but suppose both colors of bishop existed. Why would having BOTH be powerful with pawns on both wings? Pick the move that puts the bishop where it eyes both sides at once.", solution: "Bd5", explanation: "**Bd5** centralizes the bishop on the long diagonal (a8-h1) where it influences both wings simultaneously. A bishop's value spikes when it can attack on both sides of the board in one move. With TWO bishops covering both color complexes, this kind of pawns-on-both-wings endgame is dominated entirely — a single piece per move can react anywhere on the board." },

      { type: "heading", value: "When the pair doesn't matter" },
      { type: "text", value: "**Closed positions, pawn-locked.** If the structure is fixed and there are no pawn breaks, the bishops can't reach anything. Trade one of them off for a strong knight — the pair becomes worthless if it can't activate.\n\nA simple gut check: *can the bishops actually do something in this position, or are they decorative?* If decorative, the pair is no longer an asset." },

      { type: "subheading", value: "When to break the pair voluntarily" },
      { type: "text", value: "Sometimes it's right to give up the pair. Reasonable reasons:\n\n- **You damage the opponent's structure.** Trading a bishop for a knight that doubles their pawns or wrecks their queenside is often worth the pair.\n- **You get a permanent outpost.** Trading off the bishop that defends a key square so your knight can plant there forever.\n- **You eliminate an attacker.** In a kingside attack, the defender will gladly give up the pair to remove your most threatening attacker.\n- **The position is closed and will stay closed.**\n\nBad reasons to break it: \"The trade looked natural,\" or \"I wanted to simplify.\" Simplification when you have the pair often *throws away* your edge." },

      { type: "interactive", fen: "r1bqk2r/pp2bppp/2n1pn2/3p4/3P4/2NBPN2/PPP1BPPP/R1BQ1RK1 b kq - 0 7", prompt: "Black to move. Black has two bishops vs two bishops here — pair vs pair. But suppose Black plays Nb4, eyeing the trade Nxd3 (knight for bishop). Should Black be eager for that trade?", solution: "O-O", explanation: "**O-O** (castling) keeps options open. Trading Black's knight for White's light-squared bishop would *give* the bishop pair to White — a long-term concession. Unless Black gets concrete compensation (damaged pawns, an outpost, etc.), the trade favors White. Always notice when a trade transfers the pair from one side to the other." },

      { type: "heading", value: "Practical mantras for handling the pair" },
      { type: "text", value: "When **you** have the pair:\n\n- **Open the position.** Pawn breaks, sacrifices to open lines — your bishops are waiting.\n- **Avoid trading either bishop without a concrete reason.**\n- **Aim for endgames.** The pair grows in value as pieces come off.\n\nWhen **your opponent** has the pair:\n\n- **Keep the position closed.**\n- **Put your pawns on the same color as one of their bishops** to bury it.\n- **Find a way to trade off one of their bishops** — once they have only one, it's just a normal piece." }
    ],
    quiz: [
      { question: "Roughly how much extra value is the bishop pair worth?", options: ["+0.1 pawns (negligible)", "+0.5 pawns", "+1 pawn", "+2 pawns (an exchange)"], answer: 1, explanation: "Statistical studies put it around +0.5 pawns on average. Less in closed positions, more in fully open ones." },
      { question: "When does the bishop pair NOT really matter?", options: ["When the opponent has more pawns", "In closed positions with locked pawn chains", "In the opening", "When the queens are off"], answer: 1, explanation: "If the structure is locked and the bishops can't activate, the pair is decorative. Trade one off for a strong knight without regret." },
      { question: "If you have the bishop pair, which strategic goal helps the most?", options: ["Keep the position closed and shuffle pieces", "Open the position with pawn breaks", "Trade queens immediately", "Exchange one bishop quickly to simplify"], answer: 1, explanation: "Open positions are where the pair shines. Closing the position or trading off a bishop discards the asset." }
    ],
    further: [
      "Larry Kaufman, 'The Evaluation of Material Imbalances' — the original numerical study.",
      "Mauricio Flores Rios, *Chess Structures* — many examples of pair vs pair imbalances by structure.",
      "Mihail Marin, *Learn from the Legends* — chapter on Fischer's handling of the bishop pair."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-004-rook-power",
    title: "When rooks come into their own",
    track: "exchanges",
    order: 4,
    estimatedMinutes: 12,
    objective: "Understand why rooks underperform in the early middlegame, when they activate, and the central role of rook activity in endgames.",
    tags: ["rook", "open-files", "endgame", "tarrasch-rule"],
    next: "exch-005-two-minors-vs-rook",
    content: [
      { type: "text", value: "The point scale says a rook is worth 5 — almost twice a knight or bishop. But early in the game, rooks often feel like the most useless pieces on the board. Tucked in the corners, blocked by their own pawns, doing nothing. So why are they 'worth' so much?\n\nBecause **a rook in its element is a monster**, and most games eventually reach that element." },

      { type: "heading", value: "Why rooks are passive early" },
      { type: "text", value: "Rooks need **open files** to function. In the opening and early middlegame, the central files are blocked by pawns and the rooks have nothing to attack. They sit on a1, h1, a8, h8 hoping someone will open a file for them.\n\nDevelopment for a rook means **getting it onto the right file** — open or half-open, ideally pointing at the enemy king or a weak pawn." },

      { type: "subheading", value: "Open file vs half-open file" },
      { type: "text", value: "- **Open file** = no pawns of *either* color on it. A rook on it can move freely and attack things from afar.\n- **Half-open file** = no pawns of YOUR color, but enemy pawns are present. Almost as good — the rook attacks the enemy pawns and may pile up on them.\n\n**A rook on the seventh rank** (the enemy's second rank) is famously powerful — attacking enemy pawns from behind and often hemming in the enemy king. Two rooks on the seventh = 'pigs on the seventh' = often winning." },

      { type: "board", fen: "4k3/p4ppp/8/8/8/8/PPPP1PPP/3RK3 w - - 0 1", caption: "White's rook on d1 is on a half-open file (no white d-pawn) pointing at Black's king. This is the kind of placement that justifies the rook's value of 5." },

      { type: "heading", value: "The endgame is the rook's prime time" },
      { type: "text", value: "Rooks dominate endgames for one big reason: **with most pieces traded off, files open up and there's nothing to block the rook's range.** A rook in an empty endgame can stop passed pawns, attack pawns, and check the king all from long range.\n\nRook endgames are by far the most common endgame in master chess — over 50% of all decisive endgames involve them." },

      { type: "subheading", value: "Activity beats material in rook endgames" },
      { type: "text", value: "The single most important principle in rook endings: **activity matters more than a pawn**. An active rook on the enemy's seventh rank, harassing pawns and king, is regularly worth a pawn or even two of static material.\n\nThis is why strong players will sacrifice pawns to activate their rook, while weaker players cling to pawns and let their rook get tied to passive defense." },

      { type: "interactive", fen: "8/3R4/8/8/8/4k3/8/4K3 w - - 0 1", prompt: "Just kings and a white rook. White to move. The simplest demonstration: where does the rook want to go to harass the black king and prepare a winning plan?", solution: "Re7+", explanation: "**Re7+** puts the rook actively on the e-file, cutting off the king and starting to drive it back. The lesson isn't this exact move — it's that the rook is most powerful when it's **cutting off ranks/files** and operating from a distance, not babysitting one square." },

      { type: "heading", value: "Tarrasch's rule: rooks BEHIND passed pawns" },
      { type: "text", value: "Siegbert Tarrasch's classic rule: **\"Rooks belong behind passed pawns — your own AND your opponent's.\"**\n\n- **Behind your own passed pawn:** the rook supports the pawn's advance from the back. As the pawn pushes forward, the rook gains more open file behind it. If you put the rook in *front* of the pawn, the rook loses scope as the pawn advances.\n- **Behind your opponent's passed pawn:** the rook ties them down. To advance the pawn, they have to defend it from in front — passively. Meanwhile, your king and rook hunt elsewhere." },

      { type: "board", fen: "8/8/8/3P4/8/8/3R4/k6K w - - 0 1", caption: "Tarrasch in action: White's rook on d2 is BEHIND the d5 pawn. As d5-d6-d7-d8=Q happens, the rook keeps gaining file behind it. If the rook were on d8 instead, it'd be cramped." },

      { type: "interactive", fen: "8/8/3p4/8/8/3R4/8/k6K w - - 0 1", prompt: "Black has a passed d-pawn (about to push). White's rook is on d3. Following Tarrasch's rule, what's the right plan? Find the move that puts the rook BEHIND the pawn so it can hunt it down properly.", solution: "Rd1", explanation: "Wait — White's rook on d3 is already in front of the d6 pawn (between the pawn and its own queening square). To get *behind* it from White's perspective, White wants the rook on d8 ahead of it. But the more practical Tarrasch principle here is: the rook should **stop the pawn from a distance**, ideally from BEHIND it. **Rd1** keeps the rook on the d-file, ready to absorb the push d5, d4, d3 — White's rook attacks the pawn from the rear." },

      { type: "heading", value: "Practical takeaways" },
      { type: "text", value: "1. **Open a file for your rook.** This is often a goal in itself in the early middlegame — push a pawn to trade and open the c-file or e-file.\n2. **Double your rooks** on a key file or rank if you can. Two rooks together on an open file is a battering ram.\n3. **Get the seventh rank** in any endgame opportunity.\n4. **Trade rooks when you're winning** to simplify; **avoid rook trades when you're worse**, because rook endgames have the highest drawing percentage of all endgames.\n5. **Rooks behind passed pawns**, both yours and theirs." }
    ],
    quiz: [
      { question: "Why are rooks often passive in the opening?", options: ["They can't capture diagonally", "Files are blocked by pawns and the rooks have nothing to attack", "Rooks need bishops to activate them", "The rules forbid them from moving until move 10"], answer: 1, explanation: "Rooks need open or half-open files. Until pawns get traded off and files open, rooks sit at home. That's also why a key middlegame goal is *opening files* for your rooks." },
      { question: "Tarrasch's rule says: rooks belong _____ passed pawns.", options: ["In front of", "Behind", "Beside", "Far away from"], answer: 1, explanation: "Behind. Behind your own pawn so the rook gains scope as the pawn advances; behind the enemy's pawn so they're tied to passive defense." },
      { question: "In a rook endgame where you're slightly worse materially, what's typically more important than a pawn?", options: ["The bishop pair", "An active rook", "Castling rights", "The queen's position"], answer: 1, explanation: "Activity. An active rook is regularly worth a pawn or two of static material. This is the single most important principle in practical rook endings." }
    ],
    further: [
      "Mark Dvoretsky, *Dvoretsky's Endgame Manual* — rook endgame chapters are foundational.",
      "Jesús de la Villa, *100 Endgames You Must Know* — rook endgames cover ~half the book.",
      "Tarrasch, *The Game of Chess* — original sources for the passed-pawn rule."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-005-two-minors-vs-rook",
    title: "Two minor pieces vs rook + pawn",
    track: "exchanges",
    order: 5,
    estimatedMinutes: 11,
    objective: "Make the right choice between giving up two minor pieces for a rook + pawn (or accepting the trade), based on phase of game and concrete factors.",
    tags: ["material-imbalance", "rook", "minor-pieces", "exchange"],
    next: "exch-006-trading-when-ahead",
    content: [
      { type: "text", value: "Quick math: two minor pieces (3+3=6) vs rook + pawn (5+1=6). On the point scale, perfectly equal. In practice, **never** equal — and the side it favors depends almost entirely on the phase of the game." },

      { type: "heading", value: "Middlegame: two pieces beat rook + pawn" },
      { type: "text", value: "In the middlegame, two pieces are usually stronger because:\n\n- **Two attackers** beat one. With queens and other pieces still on the board, having two extra minors means more pressure on weak squares, more attacking ideas, more defensive resources.\n- **Coordination.** Two minor pieces support each other — knight defends bishop, bishop covers a square the knight can leap to. The rook is one piece doing one job at a time.\n- **King attacks.** A bishop and knight aimed at the enemy king (think classic 'sac on h7' attacks) are much scarier than a single rook off in the corner." },

      { type: "interactive", fen: "r1bqk2r/ppp2ppp/2n2n2/3p4/1b1P4/2NBPN2/PPP2PPP/R1BQK2R w KQkq - 0 6", prompt: "White to move. Pretend a hypothetical trade is on offer: White could exchange a bishop and knight for a rook and a pawn. With queens still on and pieces aimed at the king, would you take it? Make a normal developing move that *avoids* such a trade.", solution: "O-O", explanation: "**O-O** — castling. The point is: with the position rich in tactical possibilities and queens on the board, you keep your two pieces. They're worth more than the rook+pawn trade in the middlegame phase. The 'right' move is to refuse to make such a hypothetical trade and continue developing." },

      { type: "heading", value: "Endgame: the rook can pull ahead" },
      { type: "text", value: "Once queens are off and pieces traded down, things flip:\n\n- **The rook stops passed pawns from a distance.** Two minor pieces, especially knights, are slow to chase a passer.\n- **The rook infiltrates.** Open files in the endgame let the rook reach the seventh rank or behind the enemy pawn chain.\n- **Two minors lose coordination** as the board empties — there's not much to attack together.\n- **The extra pawn** matters more as the game reduces to king-and-pawn issues.\n\nIn pure endgames, R + P vs B + N is often slightly better for the rook, and definitely better than its middlegame value." },

      { type: "board", fen: "8/p4pkp/6p1/8/8/4N3/PPP3PP/4R1K1 w - - 0 1", caption: "Endgame imbalance: White has rook + extra pawn. Black has bishop + knight (minus one — imagine both still on the board). With this many pawns to push and files to open, the rook is happier than the two minors." },

      { type: "heading", value: "The decision rule" },
      { type: "text", value: "When deciding whether to give up two pieces for rook + pawn (or vice versa), ask:\n\n1. **What phase will we be in soon?** Lots of pieces and queens still on → two minors. Heading to a clean endgame → rook.\n2. **Are there open files?** Open files favor the rook. Closed files favor the minors.\n3. **King safety.** A king under attack vastly increases the value of two minors (more attackers).\n4. **Pawn structure.** A passed pawn or a wing majority changes the math toward the rook.\n5. **Are the two minors coordinated, or one of them stuck?** A bad piece doesn't add to the team." },

      { type: "interactive", fen: "r1bq1rk1/pp3ppp/2nb1n2/3p4/3P4/2N1PN2/PP1B1PPP/R2QKB1R w KQ - 0 8", prompt: "Tactical possibilities exist for both sides. White to move — with queens on and full middlegame in progress, would you eagerly trade your two pieces for a rook and pawn? Make a developing move that holds the position together.", solution: "Bd3", explanation: "**Bd3** develops with no concession. The principle to lock in: in the middlegame with this much going on, two minor pieces are clearly better than rook + pawn. Don't trade away your attacking team for a piece (the rook) that doesn't even have a file to use yet." },

      { type: "heading", value: "Worked principle: the Petrosian-style sacrifice" },
      { type: "text", value: "The reverse — giving up a rook for a strong minor piece (the **exchange sacrifice**) — gets its own lesson later in this track. The two are connected: when Petrosian gave up his rook for a knight, he did so because in the *resulting position* the knight and other pieces would dominate the rook. He was using the very phase-of-game logic above." }
    ],
    quiz: [
      { question: "In the middlegame with queens on the board, two minor pieces vs rook + pawn typically favors:", options: ["The two pieces", "The rook + pawn", "Always equal", "The side with more pawns"], answer: 0, explanation: "Two pieces win in the middlegame: more attackers, better coordination, more threats around the king." },
      { question: "In a clean endgame with passed pawns, two pieces vs rook + pawn typically favors:", options: ["The two pieces", "The rook + pawn", "Whoever has the passed pawn", "Doesn't matter"], answer: 1, explanation: "The rook stops passers and infiltrates. The two minors lose coordination as the board empties." },
      { question: "Which factor most pushes you toward keeping the two minor pieces?", options: ["Pawns are about to queen", "Lots of pieces on the board with attacking chances against a king", "The position is symmetric and quiet", "Rook is on an open file"], answer: 1, explanation: "When attacks are in the air, two minors > rook + pawn. They're attackers; the rook is defensive value waiting for files." }
    ],
    further: [
      "Mark Dvoretsky, *School of Chess Excellence* vol 3 — chapters on imbalance evaluation.",
      "John Nunn, *Understanding Chess Move by Move* — several examples featuring this imbalance.",
      "Larry Kaufman's material study — covers the R+P vs 2 minors numbers explicitly."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-006-trading-when-ahead",
    title: "Trading rules: when ahead and when behind",
    track: "exchanges",
    order: 6,
    estimatedMinutes: 10,
    objective: "Apply the four classical trading rules for material and space advantages, and know why each works.",
    tags: ["technique", "trading", "endgame", "space"],
    next: "exch-007-good-piece-bad-piece",
    content: [
      { type: "text", value: "Four short rules from classical chess theory will guide you through 80% of trading decisions. They're simple, powerful, and usually right." },

      { type: "heading", value: "Rule 1: Ahead in material? Trade pieces, keep pawns." },
      { type: "text", value: "If you're up a piece or two pawns, your goal is to **simplify into a winning endgame**. Every piece swap brings the game closer to a state where your extra material is decisive.\n\n- **Trade pieces** so the opponent has fewer attackers and fewer chances to confuse you.\n- **Keep pawns** because pawns are what eventually queen and end the game. Trading down to K+K with one extra pawn is winning. Trading down to two queens and one extra pawn is harder to convert because of perpetual checks.\n\nMantra: **\"When ahead, exchange pieces. When ahead, do not exchange pawns.\"**" },

      { type: "interactive", fen: "8/8/4k3/8/8/3K4/3R4/8 w - - 0 1", prompt: "White is up a full rook (R + K vs K — completely winning). White to move. The principle: when ahead in material, **trade pieces if they exist** and otherwise **activate the rook** to start mating. Find the active rook move.", solution: "Re2+", explanation: "**Re2+** activates the rook by giving check and starting to cut off the black king. With nothing left to trade, the conversion principle becomes 'use your extra piece actively.' The deeper rule applies whenever pieces ARE on the board: ahead in material, trade pieces (reduce attackers), keep pawns (they queen and end the game). Fewer pieces = easier conversion." },

      { type: "heading", value: "Rule 2: Behind in material? Keep pieces on, trade pawns." },
      { type: "text", value: "Mirror image. When you're losing, trades make things worse. You need:\n\n- **Pieces on the board** so you have tactical chances. Maybe you can trap the enemy king, deliver perpetual check, or sacrifice into a stalemate trick. None of that works without pieces.\n- **Trade pawns** because reducing the pawn count makes the position more drawish. Many basic endgames (R vs R+1 pawn) are theoretically drawn. Trading off pawns can save you.\n\nA particularly important application: **rook endgames are drawish**. Down a pawn in a rook ending? Trade other pawns and head for a Philidor or Lucena defensive setup." },

      { type: "board", fen: "8/8/8/8/8/4k3/4p3/4K3 w - - 0 1", caption: "K+P vs K with the defender's king in front: drawn, even though the attacker is 'up a pawn' in some sense. Reducing material can save the game when behind." },

      { type: "heading", value: "Rule 3: Ahead in space? Don't trade." },
      { type: "text", value: "**Space** is the amount of board your pieces control. If you have a pawn on e5 and the opponent's pawns are on e6 and d6, you have more space — your pieces have more squares to maneuver on, theirs are cramped.\n\nThe cramped side wants trades because every traded piece relieves their congestion. Each remaining piece for them has more breathing room.\n\n**The side with more space should keep pieces on.** Suffocate the opponent. Make them shuffle. Eventually they crack.\n\nClassic example: White plays the King's Indian Defence as Black, gets cramped, *needs* to trade pieces to get any room. White, with the space advantage, refuses every trade." },

      { type: "interactive", fen: "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4", prompt: "French Defence Advance variation. White has a big space advantage with the e5 pawn. Black would love trades. White to move — develop a piece WITHOUT inviting trades.", solution: "c3", explanation: "**c3** supports the d4 pawn and prepares Nf3 without allowing Black easy trades. The principle: with more space, develop AROUND the opponent and don't simplify. Other reasonable moves exist (Nf3 directly is also fine), but the lesson is to refuse Black's offered trades to keep them cramped." },

      { type: "heading", value: "Rule 4: Behind in space? Trade pieces." },
      { type: "text", value: "If your pieces are tripping over each other in a cramped position, **trade them off**. Every piece you remove from the board gives your remaining pieces more breathing room.\n\nThis is the standard plan in the French Defence as Black, in the King's Indian Defence as Black, in the Caro-Kann. The cramped side actively seeks trades — sometimes even at the cost of small material concessions, because the *resulting* freer position is worth it." },

      { type: "interactive", fen: "rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4", prompt: "Black is cramped (French Defence territory). White's e5 pawn cuts off Black's pieces. Black to move. Find a trade — a way to swap a piece off and relieve the cramping.", solution: "Nfd7", explanation: "**Nfd7** retreats and clears the way for Black's other pieces, but a more dynamic answer would be to play c5 first. The exchange-themed move is to set up trades; here, **Nfd7** lets Black play c5 next to challenge White's pawn chain. The deeper lesson: when cramped, manufacture trades by attacking key pawns and offering exchanges along the way." },

      { type: "heading", value: "Quick summary table" },
      { type: "text", value: "- Ahead in **material** → trade pieces, keep pawns\n- Behind in **material** → keep pieces, trade pawns\n- Ahead in **space** → don't trade (suffocate them)\n- Behind in **space** → trade pieces (relieve yourself)\n\nThese four rules will resolve most trading decisions you face. They're not absolute — when concrete tactics override them, follow the tactics. But when you're not sure, follow the rules." }
    ],
    quiz: [
      { question: "You're up a clean piece. What general trading approach simplifies to a win?", options: ["Trade pawns and keep pieces", "Trade pieces and keep pawns", "Avoid all trades", "Trade everything as fast as possible including pawns"], answer: 1, explanation: "Trade pieces (reduce attackers and tactical chances), keep pawns (they queen and end the game)." },
      { question: "You're DOWN a pawn in a complicated middlegame. Which approach gives you the best practical chances?", options: ["Trade pieces to clarify the position", "Keep pieces on, trade pawns toward a drawish endgame", "Resign", "Push your own pawns aggressively without trading"], answer: 1, explanation: "Pieces on means tactical chances. Pawn trades push you toward drawn endgame structures." },
      { question: "You have a strong space advantage in a closed-ish position. What should you do about trades?", options: ["Trade as many pieces as possible to convert the advantage", "Avoid trades — keep the opponent cramped", "Trade only minor pieces, keep rooks", "Don't worry about trades, focus on pawns"], answer: 1, explanation: "The cramped side wants trades. Refusing them keeps them suffering. Avoid trades and let your space advantage compound." }
    ],
    further: [
      "Aron Nimzowitsch, *My System* — chapters on space, restraint, and exchange.",
      "Jeremy Silman, *How to Reassess Your Chess* — explicit treatment of imbalances and trades.",
      "Mark Dvoretsky, *Endgame Manual* — for the 'down a pawn in rook ending, trade pawns' applications."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-007-good-piece-bad-piece",
    title: "Trade your bad piece for their good piece",
    track: "exchanges",
    order: 7,
    estimatedMinutes: 12,
    objective: "Identify good vs bad pieces in your position and steer trades to swap your worst for the opponent's best.",
    tags: ["good-piece", "bad-piece", "capablanca", "french-defence"],
    next: "exch-008-attack-and-trades",
    content: [
      { type: "text", value: "If you do nothing else from this entire track, learn this principle. It's possibly the single most reliable strategic improvement in chess: **trade your bad piece for the opponent's good piece.**\n\nThe attribution is murky — Capablanca, Tarrasch, and Lasker all expressed something close to it. The technique is universal." },

      { type: "heading", value: "What 'bad' and 'good' actually mean" },
      { type: "text", value: "A **bad piece** is one that:\n- Has very few squares it can move to.\n- Is blocked by its own pawns (especially common with bishops behind their own pawn chain).\n- Defends a weakness and can't leave its post.\n- Has no constructive plan in the position.\n\nA **good piece** is one that:\n- Controls many squares from a strong post.\n- Sits on an outpost, untouchable.\n- Coordinates with the player's overall plan.\n- Constantly threatens something." },

      { type: "subheading", value: "The classic case: the French Defence bad bishop" },
      { type: "text", value: "In the French Defence, Black's c8-bishop is famously bad. After moves like 1.e4 e6 2.d4 d5 3.e5, Black's pawns end up on e6, d5, sometimes c6 — and the light-squared bishop on c8 has nowhere to go. It's known throughout chess literature as **'the French bishop'** (with deep sympathy)." },

      { type: "board", fen: "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", caption: "Classic French Defence structure. Black's bishop on c8 is buried — it can only develop via b7 (after b6) or d7-e8 with great difficulty. This is the textbook 'bad piece.'" },

      { type: "text", value: "Black's entire opening plan often revolves around one goal: **trade off the bad bishop**. Common methods:\n\n- ...b6 followed by ...Ba6 to swap off via the a6-f1 diagonal.\n- ...Bd7-e8-h5 to redeploy if White's bishop is still on f1.\n- Sometimes ...Bd7-e8 simply to defend and wait.\n\nIf Black succeeds in trading the c8 bishop for any of White's bishops, the French Defence becomes much easier. **Bad piece traded for good piece** = strategic victory." },

      { type: "heading", value: "Carlsbad structure: bishop trades" },
      { type: "text", value: "In the Carlsbad pawn structure (pawns on c6/d5/e6 vs c3/d4/e3), both sides typically have a 'good' bishop and a 'bad' bishop. White's c1-bishop and Black's c8-bishop are blocked by pawns; their other bishops are good. The classical plan is to trade your bad bishop for their good bishop — exactly the principle in action." },

      { type: "interactive", fen: "r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P4/2N1PN2/PPP1BPPP/R1BQK2R b KQkq - 0 6", prompt: "A Queen's-Gambit-style structure. Black to move. Black's queen-bishop on c8 is bad; White's bishop on e2 is fine. Find Black's best plan — find a move that prepares to develop or trade off the bad bishop.", solution: "b6", explanation: "**b6** prepares ...Ba6, aiming to trade the bad c8 bishop for White's e2 bishop. This is the textbook 'minority attack' or 'bad bishop trade' theme. The principle: when you have an obviously bad piece, prioritize getting it off the board — even at the cost of a tempo or two." },

      { type: "heading", value: "Ruy Lopez: the trade of the Spanish bishop" },
      { type: "text", value: "In the Ruy Lopez, White's light-squared bishop on b3 (after Bb5-a4-b3 maneuvers) is a classic 'good piece' — pointing at f7 forever. Black's main long-term plan in many lines is to **trade it off** with ...Na5 to attack and force ...Nxb3 or to trigger Bxa4 trades.\n\nReverse view: Black's bishop on c5 (or e7) often becomes Black's good piece, and White wants to trade it." },

      { type: "interactive", fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/3PP3/1BP2N2/PP3PPP/RNBQ1RK1 b kq - 0 8", prompt: "Closed Ruy Lopez. White's bishop on b3 is the famous Spanish bishop, eyeing f7. Black to move. Find the move that begins to challenge or eliminate this strong piece.", solution: "Na5", explanation: "**Na5** attacks the b3 bishop. White typically retreats with **Bc2**, but now the maneuver continues with Black playing ...c5, ...Nc6, etc. The key idea: Black recognized White's good piece, attacked it, and forced concessions. Whether the trade actually happens or the bishop just gets driven to a worse square, Black has scored points." },

      { type: "heading", value: "How to find these trades in YOUR games" },
      { type: "text", value: "Step-by-step process:\n\n1. **Identify your worst piece.** Look at each piece — which has the fewest moves, the most limited future, the saddest job?\n2. **Identify the opponent's best piece.** Which of their pieces is most active or most central to their plans?\n3. **Find a move sequence that puts these two on the same square.** Sometimes it's one move; sometimes a 4-move maneuver.\n4. **Make the trade.** Even if it costs a tempo, a worse piece for a better piece is a net gain.\n\nThis process should run in the background of every middlegame decision. It pays dividends in literally every game." },

      { type: "quote", value: "\"When you don't know what to do, look for your worst piece and improve it.\" — variously attributed to Makogonov, Petrosian, and many others. The trade version is just the radical extension: if you can't improve it, get rid of it." }
    ],
    quiz: [
      { question: "A 'bad' piece is best characterized as one that:", options: ["Was captured on the wrong square", "Has limited mobility, no good role, and often blocked by its own pawns", "Is worth fewer points than the standard scale says", "Has been moved more than three times"], answer: 1, explanation: "Bad pieces are limited in scope and role. The textbook example is the French Defence c8-bishop, buried behind its own pawns." },
      { question: "Trading your bad piece for the opponent's good piece is approximately:", options: ["A tactical motif, not a strategic one", "One of the most reliable strategic gains in chess", "Only useful in the endgame", "Generally a mistake — keep your pieces and challenge their good ones with pawns"], answer: 1, explanation: "It's one of the most reliable, universally applicable strategic improvements available. Every level of chess uses it." },
      { question: "In the French Defence, what's Black's classic plan regarding bishops?", options: ["Trade off both bishops as fast as possible", "Trade off the c8 bishop ('the French bishop') because it's badly placed", "Keep both bishops at all costs", "Only trade if behind in material"], answer: 1, explanation: "The c8 bishop is buried by Black's own pawns on e6/d5/c6. Trading it is a primary strategic theme of the French." }
    ],
    further: [
      "Watson, *Mastering the Chess Openings* vol 2 — extensive treatment of the French bishop.",
      "Soltis, *Pawn Structure Chess* — chapters on Carlsbad and Ruy Lopez bishop trades.",
      "Petrosian's collected games — full of brilliant 'bad-for-good' trades."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-008-attack-and-trades",
    title: "Don't trade attackers in an attack",
    track: "exchanges",
    order: 8,
    estimatedMinutes: 10,
    objective: "Manage trades during an attack: trade off the defender's pieces, keep your own attackers, and recognize when the defender offers a trade.",
    tags: ["attack", "king-safety", "tactical"],
    next: "exch-009-active-vs-passive",
    content: [
      { type: "text", value: "When you have an attack rolling against the enemy king, the most common way to throw it away is **trading off your own attackers**. Every attacker you swap reduces your firepower; the defender breathes again.\n\nThe symmetric truth: when you're being attacked, your salvation is **trading**. Trade attackers and the storm passes." },

      { type: "heading", value: "The general rule" },
      { type: "text", value: "**Attacker:** trade defenders, keep attackers.\n**Defender:** trade attackers, keep defenders.\n\nThat's it. Both sides usually want trades, but for opposite reasons — and they want to trade *different pieces*.\n\nThe attacker needs to spot when the defender's offered trade actually weakens the defense further and grab it; otherwise refuse." },

      { type: "subheading", value: "Why it works" },
      { type: "text", value: "An attack on the king depends on **piece coordination**. You usually need three or four pieces converging — a queen, a knight that can leap to f5 or h5, a bishop on the long diagonal, a rook ready to swing to g3 or h3.\n\nLose one of those four and the attack collapses to three pieces — usually not enough. Lose two and you have nothing.\n\nMeanwhile the defender, who started with maybe two defenders, is happy to trade your attackers off because each trade reduces the threat by 25% or more." },

      { type: "interactive", fen: "r2q1rk1/pp2bppp/2n1pn2/3p4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 0 10", prompt: "White is preparing a kingside attack with pieces aimed at Black's king. White to move. Choose a move that DEVELOPS the attack rather than trading pieces.", solution: "Ng5", explanation: "**Ng5** brings another attacker into range of f7 and h7. The point is the move doesn't trade — it adds to the attack. Compare with a passive move like Bc2 or e4 that doesn't bring a new attacker. Add attackers; don't trade them off." },

      { type: "heading", value: "When the defender offers a trade — danger sign" },
      { type: "text", value: "If you're attacking and the opponent offers a trade (puts a piece next to one of yours, daring you to recapture), pause. Ask:\n\n1. **Is this their attempt to relieve pressure?** If they can swap your most dangerous attacker for their least useful piece, they win the strategic exchange even if material is even.\n2. **Can I avoid the trade?** Move your attacker to a *different* square that maintains threat without allowing exchange.\n3. **Is there a tactic that ignores the trade entirely?** Sometimes the right answer is to ignore their offer and play a stronger move.\n\nIn many famous attacking games, the attacker wins by *refusing* to trade and instead bringing more wood to the fire." },

      { type: "interactive", fen: "r2q1rk1/pp3ppp/2n1pn2/3p4/3P1B2/2NBPN2/PPQ2PPP/R4RK1 w - - 0 10", prompt: "White's bishop on f4 is a key attacker. Black has just played a piece to attack it (imagine ...Nh5 hitting the bishop). White to move. Don't trade — find a way to keep the bishop active.", solution: "Bg3", explanation: "**Bg3** retreats the bishop to safety while still aiming at the kingside. Trading the bishop for Black's knight (if Black's knight were attacking it) would relieve Black's defense. Better: keep the bishop, keep the attacker." },

      { type: "heading", value: "When you're DEFENDING — go the other direction" },
      { type: "text", value: "If the enemy is attacking your king, **be the trade-pest**. Offer trades constantly:\n\n- Put your bishop on a square where it bumps their attacking knight.\n- Trade queens if you can — defenders adore queen trades, attackers hate them. The queen is the most dangerous attacking piece.\n- Sometimes give up small material (an exchange sacrifice) to remove a key attacker.\n\nThe maxim: **'The threat is over once the queens come off.'** That's not literally always true, but as a defender it's something to aim for." },

      { type: "interactive", fen: "rnb2rk1/ppp2ppp/4p3/3p4/3qP3/2N2N2/PPPQ1PPP/R3KB1R b KQ - 0 8", prompt: "Black is defending. White is preparing an attack with developed pieces. Black's queen on d4 is poised. Find a move that OFFERS a queen trade to relieve the pressure.", solution: "Qxd2+", explanation: "**Qxd2+** offers the queen trade. After Kxd2 (or Nxd2), the most dangerous attacking piece is gone. Black's defensive task is now infinitely easier. The principle: the defender LOVES queen trades. The attacker AVOIDS them." },

      { type: "heading", value: "Practical application" },
      { type: "text", value: "Before each move during a tense king situation, ask:\n\n- **Am I attacking or defending?**\n- **If attacking:** which of MY pieces is the most threatening? Don't trade it. Which of THEIR pieces is the most defensive? Trade it.\n- **If defending:** which of THEIR pieces is the most threatening? Trade it. Which of MINE is the most defensive? Don't trade it.\n\nThis simple lens converts many close attacks into clean wins (or losses, if you forget)." }
    ],
    quiz: [
      { question: "If you have an attack going on the kingside, you should generally:", options: ["Trade as many pieces as possible to clarify", "Avoid trades of YOUR attackers, trade off THEIR defenders", "Trade only knights, never bishops", "Never trade anything"], answer: 1, explanation: "Keep attackers on the board (you need coordination), eliminate defenders (their resistance shrinks)." },
      { question: "As the defender of a king attack, what's the single most welcome trade?", options: ["Bishop for bishop", "Knight for knight", "Queen for queen (or for a major attacker)", "Pawns for pawns"], answer: 2, explanation: "Queens are the most dangerous attacking piece. Removing the enemy queen often defuses the attack outright." },
      { question: "The opponent attacks one of your attackers and forces a trade. Best response?", options: ["Always recapture", "Move the attacker to a different square that maintains the threat", "Resign — your attack is over", "Sacrifice a different piece"], answer: 1, explanation: "Move out of the trade if you can. Your attacker is more valuable to your attack than to the material balance." }
    ],
    further: [
      "Vladimir Vukovic, *The Art of Attack in Chess* — classic treatment of attacking principles.",
      "Jacob Aagaard, *Attacking Manual* (vols 1 & 2) — modern, deeply tactical treatment.",
      "Vlastimil Hort & Vlastimil Jansa, *The Best Move* — many examples featuring attack/defense trades."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-009-active-vs-passive",
    title: "Active piece vs passive piece",
    track: "exchanges",
    order: 9,
    estimatedMinutes: 10,
    objective: "Evaluate trades by what each piece is doing — never trade an active piece for a passive one.",
    tags: ["activity", "evaluation", "trading"],
    next: "exch-010-exchange-sacrifice",
    content: [
      { type: "text", value: "The point scale tells you that knight = bishop = 3. Trading them is 'equal.' But the scale doesn't ask: **what does each knight do?** A knight on f5 dominating the board is a different piece from a knight on b1 that hasn't moved.\n\nThe principle: **never trade an active piece for a passive one of the same nominal value.** That trade looks even on paper but is actively losing." },

      { type: "heading", value: "The 'AFTER' question" },
      { type: "text", value: "Before any trade, ask one question: **\"What does my position look like AFTER this trade?\"**\n\nIf the trade replaces your active piece with one of your passive pieces (because the passive one becomes the only one of its type left), or if it activates the opponent's passive piece, you've lost ground even if material is equal.\n\nA practical example: you have a beautiful knight on e5. The opponent puts their knight on c4, hitting yours. The c4 knight is much worse than the e5 knight. If you trade — Nxc4 — your great piece comes off and a less great one (your other piece) becomes your active knight. **Trading a good piece for a bad one? Bad trade.**" },

      { type: "interactive", fen: "r2q1rk1/pp3ppp/2n1p3/3pNn2/3P4/2NBP3/PP3PPP/R2Q1RK1 w - - 0 12", prompt: "White has a beautiful knight on e5 (active, central). Black just played ...Nf5 attacking nothing dangerous but offering trades down the road. White to move. Don't help Black trade off the e5 knight — keep it!", solution: "g4", explanation: "**g4** kicks the f5 knight and keeps White's e5 knight on its dominant square. The point: White's e5 knight is much better than any of Black's knights. Keep it. Don't trade your trump card. (Other reasonable moves exist, but the principle is preservation of the active piece.)" },

      { type: "heading", value: "Activating the opponent" },
      { type: "text", value: "An equally common mistake: making a trade that **activates** the opponent's passive piece.\n\nExample: opponent has a bad bishop stuck on c8. You play Bxh7+ Kxh7, walking your good bishop into a trade — but in doing so you've also **eliminated their problem**. Now their other pieces flow more freely (one fewer of your pieces means more space for them). Their c8 bishop is still bad, but you've removed one of your good pieces in exchange. Lose-lose for you.\n\n**Activation also happens through recapture squares.** If trading on a square forces the opponent to recapture with a passive piece, and that passive piece *becomes* active by being on the new square — you've done their work for them." },

      { type: "interactive", fen: "r1bqkb1r/pp3ppp/2n1pn2/3p4/3P4/2NBPN2/PPP2PPP/R1BQK2R b KQkq - 0 6", prompt: "Black to move. Suppose Black is considering Nb4, trading the c6 knight for White's d3 bishop. Is that a good trade? Find a move that develops Black's pieces WITHOUT making that questionable trade.", solution: "Be7", explanation: "**Be7** develops naturally. The point: trading Black's c6 knight (active, attacking d4) for White's d3 bishop activates White's queen behind it (Qxd3 brings the queen to a great square). The trade looks like 'minor for minor' but actually improves White's position more than Black's. Better to develop and not help White." },

      { type: "heading", value: "How to evaluate a trade in 30 seconds" },
      { type: "text", value: "The 'AFTER' checklist:\n\n1. **What pieces remain on each side?** — quick mental count.\n2. **Of MY remaining pieces, which is now my best/worst piece?** — am I left with my best ones or my worst?\n3. **Of THEIR remaining pieces, did any of theirs become more active?** — did the recapture put their piece on a better square?\n4. **What's the pawn structure now?** — did the trade fix or change anything?\n5. **What plan do I have NEXT?**\n\nIf the answers to 2-3 favor you, take. If they favor the opponent, find a better move." },

      { type: "subheading", value: "Time pressure exception" },
      { type: "text", value: "When time is short and you're slightly worse, sometimes you simplify by trading even when 'theoretically' bad — to reach a clearer position you can play. This is a pragmatic decision, not a positional one. But know what you're doing: you're trading positional value for clarity under pressure." },

      { type: "heading", value: "The bottom line" },
      { type: "text", value: "Equal material does not mean equal position. The piece values are 3, 3, 5, 9 — but those are *averages*. In any specific position, your bishop might be a 4 and theirs might be a 2.\n\nYour job before every trade: **figure out the real value of each piece, not the textbook value.**" }
    ],
    quiz: [
      { question: "You have a knight dominating an outpost on e5. Opponent offers a knight trade. You should:", options: ["Trade — knights are knights, value 3 each", "Keep your knight if possible — it's worth more than its symbol value", "Always trade to simplify", "Trade only if you're up a pawn"], answer: 1, explanation: "Your knight is functionally worth more because it's so well placed. Trading equalizes the imbalance and throws away your edge." },
      { question: "What does 'AFTER the trade' analysis check?", options: ["Whether material is exactly equal", "What both positions look like once the trade is done — which pieces remain, who improved", "How much time was spent on the move", "Whether the position is symmetric"], answer: 1, explanation: "It's about the resulting position: who's left with which pieces, who improved, what plans exist next." },
      { question: "Trading an active piece for a passive piece (same nominal value) is:", options: ["A neutral trade — material is equal", "A loss in real terms even though material is equal", "Always a winning idea (simplification)", "Only relevant in endgames"], answer: 1, explanation: "Same material on paper, worse position in practice. Activity is real value not captured in the point scale." }
    ],
    further: [
      "Jeremy Silman, *How to Reassess Your Chess* — extensive coverage of activity-based evaluation.",
      "Mark Dvoretsky, *Positional Play* — chapters on prophylaxis and the 'AFTER' question.",
      "Hans Berliner, *The System* — controversial but illuminating on activity vs material."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-010-exchange-sacrifice",
    title: "The exchange sacrifice: rook for minor piece",
    track: "exchanges",
    order: 10,
    estimatedMinutes: 13,
    objective: "Understand the exchange sacrifice (R for B or N) — when it's worth ~0.5 pawns, when it's worth a winning attack, and the gap between objective and effective value.",
    tags: ["exchange-sacrifice", "petrosian", "positional-sacrifice"],
    next: "exch-011-queen-sacrifice",
    content: [
      { type: "text", value: "**The exchange** has a special meaning in chess: rook for minor piece. To **win the exchange** means to capture a rook with your bishop or knight, gaining +2 in material. To **sacrifice the exchange** means voluntarily giving up your rook for an opponent's minor — losing 2 points of material on purpose.\n\nWhy would anyone do that? Because in the right position, the minor piece you're left with is *functionally* worth more than the rook you gave up." },

      { type: "heading", value: "The Petrosian style" },
      { type: "text", value: "Tigran Petrosian (World Champion 1963-1969) was the master of the exchange sacrifice. He treated it as a normal tool, not a desperate measure. Many of his best games feature a quiet positional R-for-N or R-for-B sac on move 20-something, after which his opponent slowly suffocates.\n\nPetrosian's logic was always concrete:\n\n- **Eliminate a strong piece.** If their knight on d5 is the soul of their position, my rook for that knight is a fair trade.\n- **Damage their structure.** If the recapture creates a permanent weakness or doubled pawns, I gain long-term assets.\n- **Open the king.** If the sac rips open a defensive cover and my pieces flood in.\n- **Color-complex domination.** If after the sac the opponent has only one bishop and I control the other color forever, I might win without ever returning the material." },

      { type: "subheading", value: "Petrosian-Reshevsky, Zurich 1953" },
      { type: "text", value: "One of the most famous examples. Petrosian sacrificed the exchange (Rxe7) to remove a key defender, leaving Reshevsky tied to passive defense for the rest of the game. Petrosian eventually won — the sacrificed rook was never recovered. The minor piece, plus the resulting initiative, was worth more.\n\nThe game taught a generation that the exchange sac wasn't just a tactical resource but a positional tool." },

      { type: "interactive", fen: "r1bq1rk1/pp2bppp/2n1pn2/2pp4/3PN3/2P1P3/PP1NBPPP/R2Q1RK1 b kq - 0 9", prompt: "Suppose Black wants to play ...Rxa1 to remove White's rook. Imagine the resulting position — would the exchange sacrifice (R for B or N if applicable) be sound here? Find Black's most natural developing move, NOT the sac (because the position isn't right for it).", solution: "b6", explanation: "**b6** prepares ...Bb7. The exchange sac would NOT be sound here — White's pieces are well-coordinated and Black has no concrete compensation. The lesson: exchange sacs need a *concrete reason* (eliminate a key piece, dominate a color complex, etc.). Without one, just give up 2 points of material." },

      { type: "heading", value: "When exchange sacs work — the concrete checklist" },
      { type: "text", value: "Run through this list. If you check 2 or more, the exchange sac is probably worth considering:\n\n1. **The minor piece you're trading for is critical to the opponent's defense or attack** — eliminating it changes everything.\n2. **The recapture creates structural weaknesses** — doubled pawns, isolated pawn, weakened king cover.\n3. **You gain control of a key color complex** — if their remaining bishop is on the wrong color and you have the other one, plus knight outposts on that color.\n4. **You have the initiative** — your remaining pieces flood into active squares while they're tied down.\n5. **The opponent has no immediate counterplay** — they can't trade pieces or open the position to relieve pressure.\n6. **A pawn comes with the deal** — R for N + P is only -1 in material, much easier to justify." },

      { type: "subheading", value: "Objective vs effective value" },
      { type: "text", value: "Engines calculate **objective value**: the optimal-play outcome from the current position. By that measure, the exchange sac often shows up as -0.5 or -0.8 (slightly worse for the sacrificing side).\n\nBut **effective value** — what humans actually score in practice — is different. Exchange sacs are *hard to defend against* over the board. They create specific positions where:\n\n- The defender has to find unique moves to hold.\n- The attacker has free, easy moves.\n- Time pressure kicks in and the defender cracks first.\n\nA position that's -0.3 to the engine but +60% in human practice is a great practical sac. This is why elite players sacrifice the exchange more often than their predecessors did — they understand effective value." },

      { type: "interactive", fen: "r2q1rk1/pp3ppp/2nbpn2/3p4/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 10", prompt: "White is considering a positional sac. Suppose Black's bishop on d6 is well-placed, eyeing h2 and the kingside. White has Bxd6 (just a trade) or could try other ideas. Find a normal positional move that keeps options open without sacrificing.", solution: "Bd2", explanation: "**Bd2** develops and prepares Rfd1, keeping the position rich. Sacrificing the exchange here without concrete compensation would be wishful thinking. The lesson: exchange sacs are powerful tools but they need to be *justified* by the position. When in doubt, develop normally." },

      { type: "heading", value: "Other classic sac themes" },
      { type: "text", value: "Beyond Petrosian, recurring exchange-sac patterns include:\n\n- **Sicilian sacs on c3 or e6.** Black plays ...Rxc3 wrecking White's pawn structure and the queenside is permanently weak.\n- **Greek-gift-style on f6/f3.** White plays Rxf6 to break open the king cover, often followed by Qh5+ ideas.\n- **Anti-fortress sacs.** In endgames, sacrificing an exchange to break a fortress and create a winning passed pawn.\n- **Bishop pair acquisition.** Sometimes Rxc6/Rxc3 just gets the bishop pair and trashes the structure simultaneously." },

      { type: "interactive", fen: "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQ1PPP/2KR3R w - - 0 10", prompt: "A typical Sicilian-style position with castles on opposite sides. Black is considering ...Rxc3 (well, ...Nxe4 first ideas, but think about ...Rxc3 in similar positions). White to move — make a normal attacking move on the kingside.", solution: "h4", explanation: "**h4** starts the kingside pawn storm. The exchange-sac theme — Black plays ...Rxc3 to wreck White's pawn structure on the queenside — is a Sicilian classic. Here White's job is to attack faster than Black can sacrifice. The lesson is appreciation: in opposite-castled Sicilian positions, ...Rxc3 is a real threat that you have to factor in." },

      { type: "heading", value: "Bottom line" },
      { type: "text", value: "The exchange sacrifice is one of chess's deepest tools. Master it and:\n\n- You stop fearing the loss of an exchange (you'll know when it's compensation).\n- You start *seeing* the sac as an option (most amateurs never even consider it).\n- You play more dynamically, less materialistically.\n\nBut don't sacrifice without a reason. 'Just a hunch' usually loses 2 pawns of material for nothing." }
    ],
    quiz: [
      { question: "An 'exchange sacrifice' means:", options: ["Trading queens for fun", "Giving up a rook for a minor piece (B or N) on purpose", "Sacrificing a pawn for the initiative", "Trading any piece for any piece"], answer: 1, explanation: "Specifically R for B or N, voluntarily, for positional or attacking compensation." },
      { question: "Petrosian's exchange sacs were typically motivated by:", options: ["Wild attacking ideas", "Concrete positional reasons — eliminating a key defender, structural damage, color domination", "Time trouble", "Random experimentation"], answer: 1, explanation: "Petrosian was famously cautious. His sacs were always grounded in concrete positional gains." },
      { question: "The gap between 'objective' and 'effective' value in exchange sacs means:", options: ["Engines and humans disagree because engines are wrong", "A sac may be slightly worse with perfect play but much harder to defend against in practice", "Effective value only matters in faster time controls", "Objective value is unreliable in chess"], answer: 1, explanation: "Effective value captures human factors: hard-to-find defensive moves, time pressure, psychological pressure. A small objective minus often translates to a practical plus." }
    ],
    further: [
      "Tigran Petrosian, *Selected Games* — the source for understanding the positional exchange sac.",
      "Sergey Kasparov, *The Exchange Sacrifice as a Winning Tool* — modern monograph.",
      "Aagaard's *Positional Play* — chapter on exchange sacs as a strategic tool."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-011-queen-sacrifice",
    title: "Queen sacrifices: when to give up the queen",
    track: "exchanges",
    order: 11,
    estimatedMinutes: 12,
    objective: "Recognize the four main reasons to give up the queen: forced mate, perpetual check, fortress draw, and material/positional compensation.",
    tags: ["queen-sacrifice", "tactics", "perpetual", "fortress"],
    next: "exch-012-trade-checklist",
    content: [
      { type: "text", value: "The queen is worth 9. Giving her up is the most dramatic decision in chess. There are four reasons — and only four — to do it voluntarily." },

      { type: "heading", value: "Reason 1: Forced mate" },
      { type: "text", value: "If the queen sac leads to a mating sequence with the remaining pieces, the queen's value drops to zero. Mate is mate.\n\nClassic patterns include:\n- **Anastasia's mate** (knight + rook trapping the king on the edge after a queen sac on h2/h7).\n- **Boden's mate** (two bishops on intersecting diagonals, often after a queen sac to clear lines).\n- **Smothered mate** (queen sac on g7/g2 to attract the king or rook, then knight delivers).\n\nIf you can calculate the forced mate to the end, the queen sac is correct regardless of what 'looks' insane." },

      { type: "interactive", fen: "6k1/5ppp/8/8/8/8/5PPP/4Q1K1 w - - 0 1", prompt: "White to move. White has a queen, Black does not. Plenty of material. But this is just an illustration — find any reasonable queen-using move (no sac needed here, just notice you have the queen).", solution: "Qe8+", explanation: "**Qe8+** is a check that decides things. The lesson here is mainly visual: when looking for a queen sac elsewhere, you must *see* the mating net to the end before committing. With a clear material advantage like this, no sacrifice is needed — but the same patterns of attraction and combination underlie real sacs." },

      { type: "heading", value: "Reason 2: Perpetual check (saving a lost game)" },
      { type: "text", value: "If you're losing badly, sometimes giving up the queen sets up perpetual check by the remaining pieces — typically a rook + knight or two minors that shuffle between checks the opponent can't escape.\n\nThis is a defensive resource. You sacrifice your queen because the alternative is losing the game outright. Drawing by perpetual = saving half a point.\n\nMore commonly, you give up the queen for *less* material (say, a rook) but reach a position with perpetual that you can't lose." },

      { type: "subheading", value: "The classic 'Q for R + perpetual' idea" },
      { type: "text", value: "You're down material, opponent is winning. You sacrifice your queen for their rook — losing 4 more points of material — but the resulting position has perpetual check. The opponent can't escape it without giving back material or worse. Game drawn.\n\nMany hopeless games have been saved this way. Always look for queen sacs that lead to perpetuals when you're losing." },

      { type: "interactive", fen: "5rk1/5ppp/8/8/8/3q4/PP3PPP/3Q1RK1 b - - 0 1", prompt: "Black to move. Black's queen on d3 looks active. Suppose Black wants to play ...Qxd1 sacrificing the queen for the white queen. Is that the right idea? Make a normal move that keeps Black's strong queen on the board.", solution: "Qd2", explanation: "**Qd2** infiltrates further. Trading queens here (Qxd1 Rxd1) actually relieves White — Black has the more active queen and should keep it. The lesson: don't trade your active queen for theirs unless you get something concrete in return. Save queen sacs for when they ACHIEVE something — mate, perpetual, fortress, or material." },

      { type: "heading", value: "Reason 3: Fortress draw" },
      { type: "text", value: "A **fortress** is a position where the side with extra material can't make progress. The defender's pieces hold a defensive setup the attacker can't break.\n\nSometimes the way to reach a fortress is a queen sac — give up the queen for a piece + pawn or two pieces, reaching a position where the remaining material can be arranged into an unbreakable defensive wall.\n\nClassic fortresses include K + B + wrong-color rook pawn (drawn against any material), K + N + wrong-color stuff, Q + P vs Q in certain pawn positions, R vs R + B in many cases." },

      { type: "interactive", fen: "6k1/5p1p/6p1/8/3q4/5n2/5PPP/7K b - - 0 1", prompt: "Black has Q + N attacking White's exposed king. The white king is trapped on h1 with no escape squares. Find the FORCED MATE — the kind of position where the queen's role is to deliver the killing blow.", solution: "Qd1#", explanation: "**Qd1#** is mate. The white king on h1 has no flight squares (g1 covered by the queen, h2/g2 blocked by own pawns, the knight on f3 controls the back-rank approach). The lesson: when you can calculate forced mate, the queen's 'value' becomes irrelevant — you'd give her up for that final blow. Always look for these mating nets before considering a queen sac for less concrete reasons." },

      { type: "heading", value: "Reason 4: Material that's effectively winning" },
      { type: "text", value: "Giving up the queen for material that's *worth more* in practice:\n\n- **Q for two rooks (10 points).** Slightly more in middlegame, definitely more in endgame.\n- **Q for R + B + N (11 points).** Almost always winning.\n- **Q for R + B + P (9 points).** Roughly equal but with two minor pieces vs one (the other's piece), often easier to play.\n- **Q for two pieces + R + P** in opposite-castle attacks where the resulting attack is decisive.\n\nThe key insight: **the queen is harder to coordinate with than people think.** Two rooks doubled on a file and active are often more dangerous than a queen wandering alone." },

      { type: "interactive", fen: "r4rk1/pp3ppp/2n1pn2/q2p4/3P4/2NBPN2/PP3PPP/R2QR1K1 w - - 0 12", prompt: "White to move. Suppose tactically White can give up the queen for both Black rooks (Q for 2 R = -1 in pure points but often favorable). Without that specific tactic available here, just make a quiet developing move that keeps options.", solution: "Bc2", explanation: "**Bc2** keeps the position rich and repositions the bishop. The point of the lesson: the Q-for-2R trade is often worth considering. 9 vs 10 in points; in a coordinated middlegame the rooks may dominate, in a wide-open queen-friendly position the queen wins. Run the AFTER analysis to decide." },

      { type: "heading", value: "Nezhmetdinov-style attack sacs" },
      { type: "text", value: "Rashid Nezhmetdinov was famous for queen sacrifices in attacking positions. His style: pour pieces toward the king, sacrifice the queen to break open the last defensive shell, and mate with the remaining minor pieces and pawns.\n\nThese sacs aren't about counting material — they're about *seeing the whole combination* through to mate or decisive material recovery. The queen is just a battering ram.\n\nA Nezhmetdinov sac is also instructive even when unsound (some of his were!) because it shows the principle: **once you commit to attack, the queen is a tool like any other**. Don't treat her as too sacred to sacrifice." },

      { type: "heading", value: "Decision framework" },
      { type: "text", value: "Before any queen sac:\n\n1. **Calculate to the end.** Forced mate or perpetual must be calculated, not hoped for.\n2. **Count material concretely.** Q for what? What's the point delta?\n3. **Evaluate the resulting position.** If it's a fortress or a winning endgame, the sac is sound.\n4. **Check for the opponent's defensive resources.** Often there's a quiet move that defends — be sure you've considered it.\n5. **If it's an attacking sac without mate, are you SURE the attack continues?** Hope is not a strategy." }
    ],
    quiz: [
      { question: "The four legitimate reasons to sacrifice the queen are:", options: ["Boredom, frustration, time trouble, draw offer", "Forced mate, perpetual check, fortress draw, sufficient material/positional compensation", "Only when checkmated", "When down two queens (impossible)"], answer: 1, explanation: "Forced mate, perpetual, fortress, or compensation — those are the four real reasons. Anything else is wishful thinking." },
      { question: "Q for two rooks (point count: 9 vs 10) is generally:", options: ["Strongly winning for the queen side", "Roughly balanced — slightly favors the rooks especially in endgames", "Strongly winning for the rook side always", "Identical to the standard trade"], answer: 1, explanation: "9 vs 10 in points, but two coordinated rooks often outgun a lone queen, especially as the game simplifies." },
      { question: "Before a queen sacrifice, the most important step is:", options: ["Trust your gut", "Calculate the forced sequence to the end", "Make sure the position looks pretty after", "Get up and walk around"], answer: 1, explanation: "Calculation. Queen sacs go wrong when you sense it works without proving it works." }
    ],
    further: [
      "Rashid Nezhmetdinov, *Selected Games* — the master of attacking queen sacs.",
      "Mikhail Tal's annotated games — full of speculative-but-brilliant queen sacs.",
      "John Nunn, *Secrets of Practical Chess* — chapters on calculating sacs."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "exch-012-trade-checklist",
    title: "The 'should I take?' checklist",
    track: "exchanges",
    order: 12,
    estimatedMinutes: 11,
    objective: "Run a six-step mental checklist before any recapture or trade — make sure the obvious move is actually the best one.",
    tags: ["calculation", "discipline", "thought-process"],
    content: [
      { type: "text", value: "You've now learned every major principle of trading: piece values, bishop vs knight, the bishop pair, rook activity, two minors vs rook, trading rules by phase, good piece for bad, attack and defense trades, active vs passive, exchange sacs, queen sacs.\n\nThis final lesson gives you the **practical checklist** that bundles everything into a six-step process to run on every capture decision. It takes 10-30 seconds. It saves games." },

      { type: "heading", value: "The six-step checklist" },
      { type: "text", value: "Before recapturing — or before any move that results in a trade — run these six checks:\n\n1. **What's the material count after?**\n2. **Is there a zwischenzug?**\n3. **What's MY position after?**\n4. **What's THEIR position after?**\n5. **Are there better captures?**\n6. **Is there a non-capture that's stronger?**\n\nMost amateurs make capture decisions in under a second. Most masters take 10+ seconds even when the capture seems obvious. That extra time runs through the checklist." },

      { type: "subheading", value: "Step 1: Material count after" },
      { type: "text", value: "The simplest check. Count the points. Does the trade win, lose, or maintain material?\n\nThis is the most basic check, but you'd be amazed how often blunders happen when this single step is skipped — a hanging piece, an extra defender you missed, etc. **Always count first.**" },

      { type: "subheading", value: "Step 2: Zwischenzug" },
      { type: "text", value: "**Zwischenzug** (German for 'in-between move') is a non-capture move that's stronger than the immediate recapture. Common examples:\n\n- A check that wins time before recapturing.\n- A discovered attack that gains material.\n- A pin that stops their next move.\n\nBefore recapturing, ask: **'Is there a check or threat I can play first?'**" },

      { type: "interactive", fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4", prompt: "Black just played ...e5. Suppose White's pawn captures somewhere — but actually look for the better move. White to move. Develop AND threaten — find the move that's better than any capture.", solution: "Ng5", explanation: "**Ng5** threatens Nxf7 forking the queen and rook — the famous Fried Liver Attack idea. The lesson: even when no capture is on offer, the spirit of zwischenzug is **'is there a non-routine move that's stronger?'** Always check for forcing moves before defaulting to natural-looking ones." },

      { type: "subheading", value: "Step 3: My position after" },
      { type: "text", value: "After the trade, look at your remaining pieces:\n\n- Are they more or less active than before?\n- Did you eliminate one of YOUR own bad pieces (good) or one of YOUR good pieces (bad)?\n- Did the recapturing piece end up on a good square or a passive one?\n- Are there any new weaknesses you've created in your camp?" },

      { type: "subheading", value: "Step 4: Their position after" },
      { type: "text", value: "Symmetric question for the opponent:\n\n- Did you eliminate one of THEIR active pieces (good for you) or a passive one (bad for you)?\n- Did the trade activate any of their pieces, or did their recapturing piece land on a great square?\n- Did the trade fix any of their weaknesses or create new ones?" },

      { type: "subheading", value: "Step 5: Better captures?" },
      { type: "text", value: "If the position has multiple captures available, **don't pick the first one.** Compare them.\n\nSometimes Bxh7 looks tempting but Nxh7 wins more. Sometimes recapturing with the rook is better than with the pawn (or vice versa) because of how the resulting structure looks. **Always consider all captures**, not just the obvious one." },

      { type: "interactive", fen: "r1bqk2r/ppp2ppp/2n2n2/3pp3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5", prompt: "Two captures available for White: dxe5 (pawn captures pawn) and Nxe5 (knight captures pawn). Find the BETTER of the two — which capture does more for White's position?", solution: "Nxe5", explanation: "**Nxe5** is better here — it brings the knight to a strong central square AND attacks Black's c6 knight, while keeping White's d-pawn on d3 supporting the position. **dxe5** also wins the pawn but opens the d-file for Black's queen and gives up the d3 control. Lesson: when multiple captures exist, compare them. The first one you see isn't always best." },

      { type: "subheading", value: "Step 6: Non-capture that's stronger?" },
      { type: "text", value: "The most-missed step. Sometimes the best move isn't a capture at all.\n\nWhen presented with a free piece, your instinct is to take. But consider: **maybe there's a move that wins MORE.** A bigger attack. A check that delivers mate in two. A quiet move that leaves the opponent with no good response.\n\nThis is the move many amateurs never even consider. Masters always do." },

      { type: "interactive", fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1b1P4/2NBPN2/PPP1QPPP/R1B1K2R w KQ - 0 8", prompt: "White can play dxe5 (capturing). White to move. But maybe there's a stronger move that holds the tension and develops further. Find a move that ISN'T a capture but is the best move.", solution: "O-O", explanation: "**O-O** (castling) gets the king safe and connects the rooks — typically more important than the dxe5 capture, which trades White's central pawn and opens lines for Black's pieces. The lesson: not every capture is a winning move. King safety first; capture later when it's clearly best. **Always ask: 'Is there a non-capture that's better?'**" },

      { type: "heading", value: "Putting it all together" },
      { type: "text", value: "Run the six-step check on every important capture. With practice it becomes automatic, taking 5-10 seconds.\n\n1. Material count?\n2. Zwischenzug?\n3. My position after?\n4. Their position after?\n5. Better captures?\n6. Non-capture that's stronger?\n\nDoing this consistently is the difference between a 1500 player and an 1800 player. It's the closest thing in chess to a free elo gain." },

      { type: "subheading", value: "When the checklist matters most" },
      { type: "text", value: "- **Recaptures.** The most common situation where the auto-pilot wrong move happens.\n- **Trades when you're winning.** Mistaken trades throw away wins.\n- **Trades when you're attacking.** Each wrong trade can stop the attack cold.\n- **Endgames.** Every piece counts; trading the wrong one can flip the result." },

      { type: "heading", value: "Final word" },
      { type: "text", value: "You started this track asking 'what's the priority of taking pieces — what to trade for what?' The honest answer is: **there's no fixed priority**. Every position has its own answer.\n\nBut now you have:\n\n- A baseline (the standard scale).\n- Knowledge of when bishops beat knights and vice versa.\n- The bishop pair as a special asset.\n- An understanding of when each piece type comes into its own.\n- Four trading rules for material and space situations.\n- The 'bad piece for good piece' principle (the golden rule).\n- Attack/defense trade dynamics.\n- Activity-based evaluation (the 'AFTER' question).\n- Exchange sacrifices and queen sacrifices.\n- And finally, the six-step checklist that ties it all together.\n\nThat's enough to dramatically improve your trading decisions. The next 100 games you play, you'll see your own past mistakes — those casual recaptures, those trades you made because they 'felt natural.' Now you'll know better." },

      { type: "quote", value: "\"Help your pieces so they can help you.\" — Paul Morphy. Every trade either helps your pieces or hurts them. Choose deliberately." }
    ],
    quiz: [
      { question: "What's a 'zwischenzug'?", options: ["A type of pawn move", "An in-between move that's stronger than the immediate recapture", "A queen sacrifice", "A defensive resource only"], answer: 1, explanation: "Zwischenzug (German: 'in-between move') is a non-recapture move you play before completing the obvious sequence — usually a check or major threat that gains time or material." },
      { question: "The six-step checklist's last step asks:", options: ["Is there a better capture available?", "Is there a non-capture move that's stronger?", "What's the material count?", "Is the position symmetric?"], answer: 1, explanation: "Step 6: 'Is there a non-capture that's stronger?' This is the most-missed step. Always check whether a quiet move beats the capture." },
      { question: "Running the full checklist on important captures takes about:", options: ["1 second — it's instinct", "5-30 seconds — short but deliberate", "5 minutes per capture", "Hours of post-game analysis only"], answer: 1, explanation: "5-30 seconds. Slow enough to actually think; fast enough to fit in time controls. The discipline is what makes it valuable, not the depth." }
    ],
    further: [
      "Alexander Kotov, *Think Like a Grandmaster* — the original treatment of structured calculation.",
      "Jacob Aagaard, *Excelling at Chess Calculation* — modern, rigorous calculation training.",
      "Axel Smith, *Pump Up Your Rating* — chapters on thought-process discipline."
    ]
  }

];
