// Positional Play — track 2 (lessons 7-12).
//
// This file extends the positional curriculum begun in lessons-positional-1.
// Tone: same as exchanges track — conversational, why-before-how, aimed at
// a developing player who already knows the rules.
//
// FENs were verified by hand: each rank totals 8 squares, exactly one king
// per side, side-to-move matches the position, and any move marked as a
// `solution` in an interactive block is legal from the FEN given.

export const LESSONS_POSITIONAL_2 = [

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-007-outposts",
    title: "Outposts: a knight's permanent home",
    track: "positional",
    order: 7,
    estimatedMinutes: 13,
    objective: "Define an outpost precisely, recognize when one exists, learn how to create one for your knight, and how to deny one to the opponent.",
    tags: ["outposts", "knights", "pawn-structure", "weak-squares"],
    next: "pos-008-good-bad-bishop",
    content: [
      { type: "text", value: "An **outpost** is the single most valuable real-estate concept in positional chess. A knight on a real outpost is often worth a piece-and-a-half — sometimes more than the opponent's queen in terms of practical influence on the position. The trick is recognizing them and earning them." },

      { type: "heading", value: "What an outpost actually is" },
      { type: "text", value: "An outpost is a square — usually on the 4th, 5th, or 6th rank — that satisfies BOTH conditions:\n\n1. **You can land a piece there safely.** It is defended by one of your pawns, ideally, or at least no enemy piece can profitably take whatever lands there.\n2. **No enemy pawn can ever attack it.** The pawn that *would* have attacked the square has been traded off, captured, or pushed past it. The square is permanently safe from pawn challenge.\n\nCondition 2 is the key one. Lots of squares look juicy for a moment; an outpost stays juicy *forever*." },

      { type: "board", fen: "r1bq1rk1/pp3ppp/2n1pn2/2bp4/3P4/2N1PN2/PP1B1PPP/R2QKB1R w KQ - 0 8", caption: "The square e5 is a classic outpost candidate for White. Black has no pawn on d6 or f6 — neither can ever attack e5. If a white knight reaches e5, it stays." },

      { type: "heading", value: "Why outposts are so powerful" },
      { type: "text", value: "A knight on an outpost in the heart of the enemy position:\n\n- **Cannot be evicted by a pawn.** It must be traded off — and trading a piece for it usually concedes the bishop pair or worse.\n- **Attacks 8 squares**, many of them in enemy territory.\n- **Splits the enemy position in half**, often cutting off coordination between the two flanks.\n- **Becomes a launching pad** for further regrouping (knight to e5, then to d7 or g6 with tempo, etc.).\n\nThe defender often spends 5–10 moves trying to dislodge the knight, getting nothing else done. That's the entire game in some Carlsen wins." },

      { type: "subheading", value: "How to create an outpost" },
      { type: "text", value: "Three reliable ways:\n\n1. **Provoke the pawn that defends the square.** If the d-pawn is the only thing keeping you off c5, find a way to make Black push d6-d5 or trade the d-pawn off.\n2. **Trade the wrong pawn off in your favor.** A timely capture (cxd5, for instance) can clear the file *and* leave a hole on the square in front.\n3. **Wait.** Sometimes the opponent voluntarily creates the hole with a careless pawn move. f7-f6 to challenge a knight on e5 leaves e6 forever weak. Recognize the deal: you trade your outposted piece, but the square stays a hole." },

      { type: "pgn", pgn: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 c5 5. Bd3 Nc6 6. Nf3 Bxc3+ 7. bxc3 d6 8. e4 e5 9. d5 Ne7 10. Nh4 h6 11. f4 Ng6 12. Nxg6 fxg6 13. fxe5 dxe5 14. Be3", caption: "Botvinnik vs Capablanca, AVRO 1938 (early phase). White is steering toward a closed center where the d5 pawn and dark-square control will give the c1-bishop and pieces clear outpost squares (notably d5 itself for any future white knight)." },

      { type: "heading", value: "Recognizing the opponent's outpost — and denying it" },
      { type: "text", value: "Defense is the same idea inverted. Before every move, scan the 4th-6th ranks and ask: **does my opponent have a square no pawn of mine can ever attack?** If yes, that's their target. To deny it:\n\n- **Don't trade the pawn that defends the square** unless you absolutely must.\n- **Push the pawn forward** to attack the outpost square *before* it gets locked in.\n- **Trade off the knight** that's eyeing it (often by offering a bishop trade you'd otherwise avoid).\n\nThe single most common positional mistake at intermediate level is making a 'natural' pawn move that hands the opponent a permanent outpost." },

      { type: "interactive", fen: "r1bq1rk1/pp3pp1/2n1pn1p/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9", prompt: "White to play. Black has just played ...h6 to question your knight ideas. Find the quiet positional move that puts your knight en route to the e5 outpost (Black has no f-pawn move that can defend e5 anymore — the f7 pawn would need to push to f6 to do that, but that abandons e6).", solution: "Ne5", explanation: "**Ne5** plants the knight directly on the outpost. Black has no pawn that can ever attack e5 — the d-pawn is on d5 (already past), and the f-pawn can't reach f6 without weakening e6 disastrously. Once the knight is on e5, White's plan is to either anchor it with f4 or use it as a launching pad. This is a quiet move — no captures, no checks — but it transforms the position. (Other moves like Bd2 are reasonable, but Ne5 *seizes* the outpost, which is the lesson here.)" },

      { type: "pgn", pgn: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5 7. Nb3 Be7 8. O-O O-O 9. Be3 Be6 10. Nd5 Nbd7 11. Qd3 Bxd5 12. exd5 Rc8 13. c4", caption: "Najdorf-style structure. Black's ...e5 leaves d5 as a permanent outpost square (no Black pawn can ever attack d5 because the c- and e-pawns are gone or fixed). White will plant a knight there at the first opportunity." },

      { type: "heading", value: "Practical checklist" },
      { type: "text", value: "Before celebrating a 'great square' for your knight, check:\n\n- Can any enemy pawn ever attack this square? If yes, it's not an outpost — just a temporary post.\n- Is the square defended by one of MY pawns? Bonus, but not strictly required.\n- Is it on the 5th or 6th rank in enemy territory? The deeper, the more valuable.\n- Does landing there cost me a tempo? Usually worth it for a real outpost.\n\nKnights live for outposts. When in doubt, route the knight there." }
    ],
    quiz: [
      { question: "Which is the defining feature of an outpost?", options: ["It's in the center of the board", "It's defended by your queen", "No enemy pawn can ever attack the square", "It's on an open file"], answer: 2, explanation: "Permanence is the whole point. If a pawn can challenge the square eventually, the piece you put there is just renting — not owning." },
      { question: "Why is a knight on a deep outpost often worth more than its 3-point value?", options: ["The point system is wrong about knights", "It can attack 8 squares from inside enemy territory and can't be driven off", "Knights are always undervalued", "Because of bishop-pair dynamics"], answer: 1, explanation: "Mobility plus permanence plus location. From d5 or e5 a knight hits 8 squares, many of them critical, and the opponent can't dislodge it without giving up material." },
      { question: "Your opponent is about to play a move that hands you a permanent outpost on c5. Best response (from your side, you'll have the outpost)?", options: ["Avoid trading the knight that can reach c5", "Immediately push pawns elsewhere to distract", "Offer a queen trade", "Trade your dark-squared bishop"], answer: 0, explanation: "The piece that fits the outpost is the asset — protect it. Don't accidentally swap off the knight that's destined for c5 just because a 'natural' trade comes up." }
    ],
    further: [
      "Aron Nimzowitsch, *My System* — chapter on outposts (the original deep treatment).",
      "Mauricio Flores Rios, *Chess Structures* — many examples of outpost squares by pawn structure.",
      "Mark Dvoretsky, *Positional Play* — exercises on creating and defending outposts."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-008-good-bad-bishop",
    title: "Good bishop, bad bishop: it's about your own pawns",
    track: "positional",
    order: 8,
    estimatedMinutes: 12,
    objective: "Diagnose whether your own bishop is good or bad based on YOUR pawn structure, and learn the three repair tools: pawn breaks, swaps, and repositioning.",
    tags: ["bishops", "pawn-structure", "good-bishop", "bad-bishop"],
    next: "pos-009-bishop-pair-leverage",
    content: [
      { type: "text", value: "A bishop is a bishop is a bishop — same value 3, same diagonals, same rules. So why do strong players talk about a 'good' bishop and a 'bad' bishop? Because **your own pawns determine what your bishop can actually do**. This lesson is about diagnosing your own bishop's quality and, when it's bad, fixing it.\n\nNote: this is a different question from 'should I keep my bishop or my knight?' (that was the bishop-vs-knight lesson). Here we're asking: 'Of my own two bishops, which one is the good one and which one is wasted?'" },

      { type: "heading", value: "The diagnostic rule" },
      { type: "text", value: "**A bishop is BAD when most of your own central pawns are on its color.** Those pawns block its diagonals — they're walls in front of it.\n\n**A bishop is GOOD when most of your central pawns are on the OPPOSITE color**, leaving its diagonals open for it to slice through.\n\nQuick check: look at your pawns on d4, e4, c4, f4, d5, e5, c5, f5 — wherever your central pawns sit. Count how many are on light squares vs dark squares. Your light-squared bishop wants the pawns on dark squares, and vice versa." },

      { type: "board", fen: "4k3/3b1ppp/3p4/3P4/3P4/3B4/3P1PPP/4K3 w - - 0 1", caption: "Both sides have a light-squared bishop. White's bishop on d3 is the BAD bishop here — every white central pawn (d2, d4, d5) sits on a light square, blocking it. Black's bishop on d7, conversely, would be a worry too if Black's pawns are also on light squares — but by symmetry, both are bad. In a real game, one side often has the BAD bishop and the other has the GOOD one." },

      { type: "subheading", value: "The classic French Defence example" },
      { type: "text", value: "The French Defence (1.e4 e6 2.d4 d5 3.e5) creates the textbook bad bishop. Black's c8 light-squared bishop is hemmed in behind pawns on e6 and d5 — both light squares. That bishop's life is misery for the entire game.\n\nThe whole strategic plot of the French is: White uses the cramped Black light-squared bishop as a long-term target. Black tries either to (a) trade it off, (b) execute a freeing pawn break (...c5 or ...f6), or (c) reroute it (...b6 and ...Ba6 to swap)." },

      { type: "pgn", pgn: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3 Nh6 7. b4 cxd4 8. cxd4 Nf5 9. Bb2 Bd7 10. g4 Nfe7 11. Nc3 Nxd4 12. Nxd4 Qxd4 13. Qxd4", caption: "A French Advance. Look at Black's bishop on d7 — surrounded by pawns on e6 and d5, all on light squares. That bishop has no future on the c8-h3 diagonal. Black will spend many moves trying to find work for it (often via ...Bb5 or ...Ba4 ideas)." },

      { type: "heading", value: "Tool 1: pawn breaks (the proper fix)" },
      { type: "text", value: "If a bad bishop is caused by pawns blocking its diagonals, then **moving those pawns** is the cure. A well-timed pawn break (...c5 or ...f6 in the French; e3-e4 in many Queen's Pawn structures for White) can transform a bad bishop overnight.\n\nThe break does two jobs at once: it opens diagonals for the bad bishop AND removes the central pawn that was making it bad. After ...f6 in the French, the e6 pawn often dissolves and suddenly the c8 bishop has the c8-h3 diagonal back." },

      { type: "interactive", fen: "r2qk2r/pb1nbppp/1p2pn2/2pp4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 b kq - 0 9", prompt: "Black to move. Black's c8 bishop has been rerouted to b7 — but it's still doing nothing because of the pawns on c5, d5, e6. Find the quiet positional break that frees the b7 bishop's diagonal and gives it a future.", solution: "cxd4", explanation: "**...cxd4** dissolves Black's c5 pawn and clears the long diagonal a8-h1. After exd4 (or Nxd4), the bishop on b7 looks down a clear lane to White's kingside. The bishop went from bad (boxed in by ...c5/...d5/...e6) to fully employed in one move. This is the model 'fix your bad bishop with a pawn break' idea — a quiet positional decision that reshapes piece quality." },

      { type: "heading", value: "Tool 2: swap the bad bishop" },
      { type: "text", value: "If you can't break the structure, the next-best plan is to **trade the bad bishop off**. You can't easily improve it, so make it the opponent's problem instead. This often costs a tempo or two of maneuvering (...Bb7-a6, or ...Bc8-d7-e8-h5), but if it works, you've solved a structural defect for the price of a few moves.\n\nA classic line in the French is the maneuver ...b6 and ...Ba6 specifically to swap the bad bishop for White's good one. Black is happy to trade equal piece values to escape the structural problem." },

      { type: "subheading", value: "Tool 3: reroute the bishop OUTSIDE the pawn chain" },
      { type: "text", value: "Sometimes a bishop locked behind its own central pawns can be sent the long way around — outside the pawn chain — to a useful square. The maneuver is slow (often 3-4 moves) but the bishop ends up active.\n\nExample: in some Stonewall structures, White's c1-bishop is locked behind the e3 and f4 pawns. The standard fix is the maneuver Bd2-e1-h4 (or Bc1-d2-e1-h4) to bring the bishop out on the kingside via the back rank. It's slow but makes the bishop a real piece again." },

      { type: "pgn", pgn: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5 5. Nc3 e6 6. Nh4 Bg6 7. Nxg6 hxg6 8. g3 Nbd7 9. Bg2 Bd6 10. O-O O-O 11. b3 Qe7 12. Bb2 e5", caption: "A Slav-type position. Black's f8 bishop went to d6 — where it sits actively, on a dark square (good!), looking at White's kingside. Black's pawns on c6, d5, e6 are all light squares, so the dark-squared bishop is the GOOD one. Black correctly developed the good bishop actively and accepts the c8 light-squared bishop traded itself off via Nh4." },

      { type: "heading", value: "Practical takeaways" },
      { type: "text", value: "1. **Look at your own central pawns first.** Count them by color. The bishop on the same color is your bad one; the bishop on the opposite color is your good one.\n2. **Develop the GOOD bishop actively.** It's your strongest piece. Don't waste it on passive squares.\n3. **For the BAD bishop, choose ONE of three plans early**: pawn break, swap, or outside reroute. Don't drift.\n4. **In the opponent's position, target their bad bishop.** If they have a bad bishop and you have a good one, that imbalance alone is often enough to win a long game." }
    ],
    quiz: [
      { question: "What makes a bishop a 'bad bishop'?", options: ["It's on a dark square", "Most of YOUR OWN central pawns are on its color", "It hasn't moved yet", "The opponent has the bishop pair"], answer: 1, explanation: "Your own central pawns block your bishop's diagonals when they sit on the same color. That's the structural defect that defines a bad bishop." },
      { question: "Best long-term cure for a bad bishop?", options: ["Push the bishop forward into enemy territory", "Trade or pawn-break to restructure your own pawns", "Castle queenside", "Trade the queens"], answer: 1, explanation: "Either get rid of the bishop (trade it off) or get rid of the pawns blocking it (pawn break). Anything else is just a workaround." },
      { question: "In the French Defence (...e6, ...d5, ...e6/d5 fixed by White's e5), Black's c8 bishop is bad. Which is a STANDARD positional plan to address it?", options: ["...Qd8-h4 attacking", "...b6 and ...Ba6 to trade it off", "Capture all of White's pawns", "Advance the h-pawn to h4"], answer: 1, explanation: "The maneuver ...b6 and ...Ba6 is the textbook way to remove Black's bad bishop in many French structures. Trade off your structural problem." }
    ],
    further: [
      "Mihai Suba, *Dynamic Chess Strategy* — discussion of bad-bishop maneuvers.",
      "John Watson, *Secrets of Modern Chess Strategy* — chapter on the modern view of good/bad bishops.",
      "Mark Dvoretsky, *Endgame Manual* — bad-bishop endgames are a major theme."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-009-bishop-pair-leverage",
    title: "Leveraging the bishop pair in the middlegame",
    track: "positional",
    order: 9,
    estimatedMinutes: 13,
    objective: "Once you have the bishop pair, learn HOW to convert it: open the position, dominate both color complexes, and aim for endgames where the pair shines.",
    tags: ["bishop-pair", "middlegame", "color-complex", "open-positions"],
    next: "pos-010-open-files",
    content: [
      { type: "text", value: "A previous lesson explained why the bishop pair is worth roughly +0.5 pawns. This lesson is about converting that quiet advantage into something concrete. Having the pair on your scoresheet doesn't win games on its own — you have to **make the pair work**." },

      { type: "heading", value: "Step 1: open the position" },
      { type: "text", value: "Bishops are long-range pieces. They want clear diagonals. If the pawn structure is locked, the pair is decorative — both bishops can be slow, blocked, and irrelevant. The single most important thing you do with the pair is **open lines**.\n\nWays to open the position:\n\n- **Pawn breaks in the center** (e3-e4, c2-c4, f2-f4 from White; symmetric for Black). A break that exchanges pawns opens diagonals.\n- **Sacrifice a pawn for open lines.** With the pair as compensation, this is often objectively correct.\n- **Exchanges that remove blocking enemy pieces.** A trade that opens a long diagonal for your bishop is worth a tempo.\n- **Avoid pawn moves that close lines** — even apparently natural ones." },

      { type: "board", fen: "r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8", caption: "Imagine White just won the bishop pair (Black traded a knight for one of White's bishops earlier). The position is semi-open. White's plan is to play e3-e4 to blast the center open — both white bishops would then have full diagonals." },

      { type: "heading", value: "Step 2: control both color complexes" },
      { type: "text", value: "The unique feature of the pair is that **between them, your two bishops cover all 64 squares**. Use that. Coordinate them so:\n\n- **One bishop pressures one color**, e.g. the long a1-h8 diagonal hitting g7/h8.\n- **The other bishop pressures the other color**, e.g. eyeing f7 or h7.\n\nThe enemy king has nowhere to fully hide. If they try to put pawns on dark squares, your dark-squared bishop targets them; if they put pawns on light squares, the light-squared bishop targets them. The opponent gets squeezed from both sides simultaneously." },

      { type: "pgn", pgn: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 Be7 6. e3 O-O 7. Bd3 Nbd7 8. Qc2 Re8 9. Nge2 Nf8 10. O-O c6 11. Rab1 a5 12. a3 Ng6 13. f3 Bd6 14. b4 axb4 15. axb4 Bd7", caption: "Carlsbad structure idea. Imagine White's plan: minority attack with b2-b4-b5 to weaken Black's queenside, then Black's bishops both join the attack on the resulting weak squares. The two bishops working together on opposite color complexes are the engine of the win." },

      { type: "heading", value: "Step 3: dominate, don't trade" },
      { type: "text", value: "When you have the pair, the side WITHOUT the pair will try to swap one of your bishops to neutralize the imbalance. Don't let them. Specifically:\n\n- **Avoid 'natural' bishop trades.** If they offer a swap, ask: do I have a concrete reason to trade? If not, sidestep.\n- **Move your bishops to squares where they can't easily be challenged** — long diagonals via fianchetto, or active outpost-like squares.\n- **Force them to give up their remaining minor pieces in passive ways** — your bishop is more valuable than their cramped knight, even if the point count is equal." },

      { type: "interactive", fen: "r2q1rk1/pp1bbppp/2n1pn2/3p4/3P4/1QN1PN2/PPBB1PPP/R4RK1 w - - 0 11", prompt: "White has been working with the bishop pair (B on c2 and B on d2). Black is offering a knight-for-bishop swap with ...Nb4 ideas. Find the quiet positional move that REPOSITIONS your dark-squared bishop to a long-diagonal square where it can't be cheaply traded — preserving the pair.", solution: "Bc1", explanation: "**Bc1** retreats the dark-squared bishop, preparing b3 and Bb2 — the long a1-h8 diagonal where the bishop dominates and isn't easily challenged by a knight. This is the model 'preserve the pair' move: a quiet, ugly-looking retreat that solves a long-term problem. After Bc1, b3, Bb2, the dark-squared bishop is doing major work on the long diagonal and Black's knights have no easy way to challenge it. Yes, it costs a tempo — the pair is worth it." },

      { type: "heading", value: "Step 4: aim for the endgame" },
      { type: "text", value: "The bishop pair grows in value as pieces come off the board. In a complex middlegame with all the pieces, the pair is +0.5. In a clean endgame with pawns on both wings, the pair is often +1 to +1.5 — easily winning if everything else is equal.\n\nSo when you have the pair and the structure is stable, **simplification is your friend** — but only the right simplifications. Trade rooks and queens (these don't affect the imbalance), avoid trading either bishop, and steer toward two-bishops-vs-two-minors endgames." },

      { type: "pgn", pgn: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5 7. Nb3 Be7 8. Be3 Be6 9. f3 Nbd7 10. Qd2 O-O 11. O-O-O Nb6 12. Qf2 Rc8 13. Kb1 Nfd7 14. Nd5 Bxd5 15. exd5 b5", caption: "English Attack with a twist: after 14...Bxd5 15.exd5 White has the bishop pair but in a semi-closed structure. The classic plan: open lines with kingside pawn pushes (g4, h4) while the bishop pair waits to detonate. The pair's potential energy is the long-term advantage." },

      { type: "heading", value: "Common mistakes when you have the pair" },
      { type: "text", value: "1. **Closing the position.** Pushing a pawn that locks the structure throws away your asset. Always pause before pushing a center pawn that *blocks* a diagonal of either bishop.\n2. **Trading a bishop without compensation.** 'It looked active' is not a reason. Get something concrete (pawn won, mate threat, key outpost denied) or don't make the trade.\n3. **Forgetting the bishops on the queenside.** Your kingside bishop fianchettoed to g2 may be screaming, but the c1 bishop sitting at home is half your asset. Activate both.\n4. **Treating the +0.5 as already won.** It's a starting edge. You still have to play 30 more good moves." }
    ],
    quiz: [
      { question: "What is the single most important conversion principle when you have the bishop pair?", options: ["Trade the queens immediately", "Open the position so the bishops have diagonals", "Castle long and attack", "Avoid central pawn moves"], answer: 1, explanation: "Open the position. Bishops are long-range pieces and the pair's value comes from sweeping clear lines. A locked position neutralizes the pair." },
      { question: "Why do the two bishops together cover both color complexes?", options: ["Each bishop covers one color, and there are two bishops, one of each color", "Bishops can change color when promoted", "It's a special middlegame rule", "Only true if you also have a knight"], answer: 0, explanation: "Each bishop is locked to one color forever. With both, you cover everything. The opponent has no permanent safe squares." },
      { question: "Your opponent offers to swap one of your bishops for their knight, with no concrete gain or loss in material or activity. What's the right call (you have the pair)?", options: ["Take the trade — bishops and knights are worth the same", "Decline if you can — the pair is worth ~+0.5 pawns and you'd be giving it up for nothing", "Sacrifice both bishops to expose the king", "Always swap minor pieces"], answer: 1, explanation: "Equal material on the board still loses you the bishop pair as an asset. Without concrete compensation, decline." }
    ],
    further: [
      "Mihail Marin, *Learn from the Legends* — chapter on Fischer's bishop-pair handling.",
      "Mauricio Flores Rios, *Chess Structures* — bishop pair examples by structure.",
      "Garry Kasparov, *My Great Predecessors* — many Botvinnik and Smyslov games featuring the pair."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-010-open-files",
    title: "Open files, half-open files, and the 7th rank",
    track: "positional",
    order: 10,
    estimatedMinutes: 12,
    objective: "Recognize open and half-open files, learn how to seize them, and understand why rooks on the 7th and 8th ranks dominate.",
    tags: ["rooks", "open-files", "seventh-rank", "doubling"],
    next: "pos-011-space-advantage",
    content: [
      { type: "text", value: "A rook is worth 5 points — but only when it has somewhere to go. Files are the rook's highways. **A rook on a closed file is a passenger; a rook on an open file is a fighter.** This lesson is about file warfare." },

      { type: "heading", value: "Definitions" },
      { type: "text", value: "- **Open file**: no pawns of either color on it. A rook here can move freely up and down the entire file.\n- **Half-open file (for you)**: no pawns of YOUR color on it, but enemy pawns are present. Almost as good — your rook attacks those enemy pawns directly.\n- **Closed file**: pawns of both sides on it. The rook is just sitting there.\n\nThe practical takeaway: you want your rooks on files that point at enemy weaknesses or the enemy king. Open files are best, half-open files are a strong second." },

      { type: "board", fen: "r3k2r/pp1qbppp/2n1pn2/3p4/3P4/2N1PN2/PP2BPPP/R2QK2R w KQkq - 0 8", caption: "The c-file is open (no pawns of either color). Whoever gets a rook on c1/c8 first will pressure the opposing position. Both sides are racing for it." },

      { type: "heading", value: "Seizing the file" },
      { type: "text", value: "When an open or half-open file appears, get a rook on it **fast**. Once one side puts a rook on the file, the other side often can't contest it without a long fight. The standard sequence:\n\n1. **Move a rook to the open file** (often via Rfd1, Rfc1, Rad1, depending on which rook is freer).\n2. **Double rooks on the file** (the second rook joins behind the first). Doubled rooks are roughly twice as effective as a single rook on a file.\n3. **Sometimes triple with the queen** (the 'Alekhine's gun': Q behind two rooks on the same file). Devastating when aimed at a weak point or the king.\n4. **Penetrate to the 7th rank**, then convert.\n\nIf the opponent contests the file, **trade rooks** if you can do so on terms (you're using one tempo for theirs, and now your second rook still controls the file). If they have nothing to contest with, just enjoy your monopoly." },

      { type: "interactive", fen: "r2q1rk1/pp1bbppp/2n1pn2/3p4/3P4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 10", prompt: "White to move. The c-file just opened (an earlier exchange cleared the c-pawns). Find the quiet positional move that grabs the file with a rook. Don't rush a tactic — claim the file first.", solution: "Rfc1", explanation: "**Rfc1** seizes the open c-file with the f1-rook, leaving the a1-rook to support from behind. This is the textbook 'claim the file' move — quiet, no captures, no checks. Why the f-rook? Because it's the more active rook to bring to c1 (the a1-rook will support from a1 or move to c1 later if doubling is needed). Once on c1, the rook eyes c6 and beyond. Black now has to spend a tempo contesting the file or accept that White owns it." },

      { type: "heading", value: "The 7th rank: the rook's promised land" },
      { type: "text", value: "The 7th rank (Black's 7th from White's perspective; reverse for Black) is where the enemy's pawns live. A rook there attacks pawn after pawn from behind, where they can't easily defend. It also often hems in the enemy king on the 8th rank.\n\n**Two rooks on the 7th** is so powerful that Nimzowitsch nicknamed it **'pigs on the seventh'** — they devour everything. Two rooks on the 7th is often a winning material harvest in 5-10 moves, even when material is otherwise equal." },

      { type: "pgn", pgn: "1. d4 d5 2. c4 e6 3. Nc3 c6 4. Nf3 Nf6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Nbd7 11. exf6 Bb7 12. g3 c5 13. d5 Qb6 14. Bg2 O-O-O 15. O-O b4 16. Na4 Qb5 17. a3 Nxf6 18. Bxf6 Bxd5 19. axb4 cxb4 20. Bxd5 Rxd5 21. Bg7 Bxg7 22. fxg7 Rg8 23. Qa4 Qxa4 24. Rxa4 Kb7 25. Rxb4+ Ka6 26. Rd4 Rgxg7 27. Rfd1 Rxd4 28. Rxd4 Rb7 29. Re4 Rxb2 30. Re6+ Kb5 31. Rxe7", caption: "Sample illustrative line where rooks penetrate to the 7th rank and harvest pawns. The point: once the rook reaches the 7th, it doesn't stop — it eats." },

      { type: "subheading", value: "The 8th rank: back-rank ideas" },
      { type: "text", value: "The 8th rank is the enemy king's home rank. A rook delivered there with check (especially with the king behind unmoved pawns) is often mating. The classic back-rank mate motif depends on having a rook reach the 8th while the enemy king has no luft (no escape square via h7/g7/h2/g2)." },

      { type: "board", fen: "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1", caption: "Re8+! Back-rank mate. The black king is trapped on g8 by its own pawns. This is why the 8th rank, when reachable, is decisive." },

      { type: "heading", value: "Half-open files: the quieter brother" },
      { type: "text", value: "Half-open files are most valuable when:\n\n- They point at a weak enemy pawn (especially a backward or isolated pawn).\n- They point at the enemy king (typical after castling on opposite sides).\n- They support a knight outpost on the file.\n\nThe standard plan with a half-open file: **double rooks on it, attack the enemy pawn, force the opponent to defend with passive pieces**, then break through with a pawn break or piece infiltration." },

      { type: "interactive", fen: "r2qk2r/p4ppp/2p1pn2/3p4/3P4/2N1PN2/PP3PPP/R2QKB1R w KQkq - 0 9", prompt: "White to move. The c-file is half-open for White (Black has pawns on c6; White has none). Black's c6 pawn is a long-term target. Find the quiet positional move that begins building pressure down the c-file.", solution: "Rc1", explanation: "**Rc1** puts a rook on the half-open c-file, eyeing the c6 pawn. The plan is: double rooks (later Rac1 or after castling Rfc1), pressure c6 with a knight too (Na4 ideas), and force Black to defend c6 with pieces. Black ends up tying minor pieces to defense while White operates elsewhere. Quiet, structural, decisive over 20 moves. (Other moves like castling are also reasonable, but Rc1 directly executes the half-open file idea.)" },

      { type: "heading", value: "Summary checklist for files" },
      { type: "text", value: "1. **Identify open and half-open files** before move 15.\n2. **Race to claim them** — rooks belong on the freest available files.\n3. **Double rooks** on the most important file when you can.\n4. **Aim for the 7th rank.** Two pigs on the 7th = practical win.\n5. **The 8th rank** = back-rank mate ideas, especially with check.\n6. **Half-open files** = pressure enemy pawns and tie down defenders." }
    ],
    quiz: [
      { question: "What's the difference between an open file and a half-open file?", options: ["Open files have no pawns of either color; half-open files have only enemy pawns", "Open files only exist in the endgame", "Half-open files have your pawns on them", "Open files always have a rook"], answer: 0, explanation: "Open file = nobody's pawns. Half-open (for you) = no pawns of yours, but enemy pawns are present. Both are good for rooks; open is best." },
      { question: "Why is the 7th rank so powerful for a rook?", options: ["It gives extra material per turn", "Enemy pawns live there and are attacked from behind, plus the enemy king is often hemmed in on the 8th", "It triggers an automatic check", "It allows promotion"], answer: 1, explanation: "The 7th rank is the enemy's pawn line. From behind, those pawns can't easily defend each other, so a rook on the 7th eats them. Also confines the enemy king." },
      { question: "Two rooks doubled on an open file are roughly worth:", options: ["Same as one rook (a rook is just a rook)", "Roughly twice as effective as one rook on the file", "Worth less because they block each other", "Equivalent to a queen"], answer: 1, explanation: "Doubled rooks support each other and threaten to penetrate. The combination is dramatically stronger than one rook alone — roughly double the practical impact." }
    ],
    further: [
      "Aron Nimzowitsch, *My System* — chapters on the open file and the 7th rank.",
      "Mark Dvoretsky, *Endgame Manual* — rook activity on open files in endings.",
      "Cecil Purdy, *The Search for Chess Perfection* — practical advice on file warfare."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-011-space-advantage",
    title: "Space advantage: how to count and use it",
    track: "positional",
    order: 11,
    estimatedMinutes: 12,
    objective: "Learn to count space, recognize when you have a +20-30% space edge, understand how space cramps the opponent, and know that the cramped side wants trades.",
    tags: ["space", "pawn-structure", "trades", "cramped-positions"],
    next: "pos-012-prophylaxis",
    content: [
      { type: "text", value: "**Space** is one of the harder positional elements to feel because it's not a single piece or square — it's a measure of how much *room* each side has. But once you can count it, you'll see it everywhere, and you'll start playing the right kind of move automatically: the side with more space avoids trades, the side with less space seeks them." },

      { type: "heading", value: "How to count space" },
      { type: "text", value: "The standard count: **add up the squares behind your pawns up to (and including) the 4th rank**, from your own perspective.\n\n- A pawn on e4 (White) gives White the squares e2, e3, e4 = 3 squares.\n- A pawn on d4 = d2, d3, d4 = 3 squares.\n- A pawn on c2 (unmoved) = just c2 = 1 square.\n- A pawn on a2 = a2 = 1 square.\n\nDo the same for Black (their squares behind their pawns up to the 5th rank from their side).\n\n**Compare totals.** If yours is 20-30% larger than the opponent's, you have a significant space advantage. If it's 50% larger, the opponent is suffocating." },

      { type: "board", fen: "rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2", caption: "Quick illustration: White has pawns on a2, b2, c2, d4, e4, f2, g2, h2 — squares 'behind' those pawns up to rank 4 total roughly: a2, b2, c2, d2-d4, e2-e4, f2, g2, h2 = ~14 squares. Black has the same. Position is symmetric, no space edge yet." },

      { type: "heading", value: "The +20-30% rule of thumb" },
      { type: "text", value: "Strong players use rough percentages, not exact counts. The thresholds:\n\n- **Within 10%**: even, no real space advantage.\n- **+20%**: meaningful edge; opponent's pieces start tripping over each other.\n- **+30%**: large advantage; opponent struggles to find squares for all their minor pieces.\n- **+50%**: crushing; opponent's pieces are stacked on the back rank.\n\nThis is why advances like an early e4-e5 or d4-d5 (locking the opponent's pawn behind your pushed pawn) are so common in space-grab strategies — they convert one pawn move into 2-3 squares of space gain." },

      { type: "pgn", pgn: "1. d4 Nf6 2. c4 g6 3. Nc3 d6 4. e4 Bg7 5. Nf3 O-O 6. Be2 e5 7. d5 Nbd7 8. Bg5 h6 9. Bh4 g5 10. Bg3 Nh5 11. Nd2 Nf4 12. O-O Nxe2+ 13. Qxe2 a5 14. Rfb1 Bf6 15. f3 g4", caption: "King's Indian Defence, classical line. White played d4-d5 to permanently grab queenside space; Black plays a kingside pawn storm because Black is the cramped side and needs counterplay (trades and attacks rather than slow positional play). The whole opening is a battle of space vs counterplay." },

      { type: "heading", value: "Why space matters" },
      { type: "text", value: "Space gives you four practical benefits:\n\n1. **More squares for your pieces.** Your pieces don't trip over each other. You can centralize, regroup, and reroute freely.\n2. **The opponent's pieces are cramped.** A bishop with no diagonals, a knight with no good squares — they're decorative.\n3. **You can attack on either flank.** With more space, you can shift your forces from one side to the other faster than the cramped side can defend.\n4. **You can prepare slowly.** No urgency. The opponent can't easily contest, and waiting moves work for you.\n\nTarrasch summarized it in one quip: **'Cramped positions contain the seeds of defeat.'** A modest exaggeration, but the spirit is right." },

      { type: "subheading", value: "The cramped side wants TRADES" },
      { type: "text", value: "This is the single most actionable rule about space:\n\n- **If you have MORE space, AVOID trading pieces.** Your space advantage shrinks every time a pair of pieces leaves the board. With fewer pieces, the cramped side has plenty of room for what's left.\n- **If you have LESS space, SEEK trades.** Each trade gives your remaining pieces more room. Even a queen trade (which cedes attacking chances) often equalizes a cramped position.\n\nWatch a strong player handle a space disadvantage: they'll spend tempi maneuvering pieces specifically to *offer trades*, even at minor positional cost. The cost is worth it because each successful trade un-cramps the position." },

      { type: "interactive", fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 b kq - 0 8", prompt: "Black to move. White has a slight space edge with pawns on c4 and d4 (Black is somewhat cramped). Find the quiet positional move that **offers a piece trade** to relieve Black's cramped position. (Hint: look for a knight maneuver toward an exchange.)", solution: "Ne4", explanation: "**...Ne4** maneuvers the knight toward an exchange. White will likely play Bxe4 or Nxe4, reducing the piece count and giving Black's remaining pieces more room. This is the classic 'cramped side seeks trades' move — quiet, no immediate threat, but strategically essential. After the trade, Black's c8 bishop and rooks have more space to operate. The lesson is the IDEA more than the specific move: when cramped, look for trade opportunities even if they cost a small amount of activity." },

      { type: "heading", value: "When the cramped side gets counterplay" },
      { type: "text", value: "A cramped position with **counterplay** can hold or even win. The textbook examples:\n\n- **The King's Indian**: Black accepts a cramped center and attacks on the kingside.\n- **The Hedgehog**: Black accepts a small space disadvantage but holds a flexible structure with thematic ...b5 and ...d5 breaks waiting in the wings.\n- **The Modern Defence**: Black gives White space and then strikes back with ...c5 or ...e5.\n\nThe idea: cramped + active counterplay = playable. Cramped + passive = lost. The cramped side must find SOMETHING active or trade trade trade." },

      { type: "pgn", pgn: "1. c4 Nf6 2. Nf3 c5 3. g3 b6 4. Bg2 Bb7 5. O-O e6 6. Nc3 Be7 7. d4 cxd4 8. Qxd4 d6 9. Rd1 a6 10. b3 Nbd7 11. e4 O-O 12. Bb2 Qb8", caption: "Hedgehog setup. Black is voluntarily cramped (pawns on a6, b6, d6, e6) but holds a flexible structure waiting for a ...b5 or ...d5 break. The position is a long-term pawn-structure battle — White has space, Black has compact resilience." },

      { type: "heading", value: "Practical playbook" },
      { type: "text", value: "**With more space:**\n\n- Don't trade. Move pieces, not pawns, when in doubt.\n- Probe both flanks — make the cramped side guess where you'll attack.\n- Slowly improve the position; the opponent has fewer good moves than you.\n\n**With less space:**\n\n- Trade. Trade. Trade. Even small concessions are okay if they reduce piece count.\n- Find one pawn break that liberates your position (...c5, ...d5, ...e5, ...f5 depending on structure).\n- Don't try to maneuver in cramped quarters — exchange pieces FIRST, then maneuver." }
    ],
    quiz: [
      { question: "How do you count space?", options: ["Count squares your pieces attack", "Add up squares behind your pawns up to the 4th rank", "Count central squares only", "Count the number of pieces you've developed"], answer: 1, explanation: "The standard space count is squares behind your pawns up to (and including) the 4th rank, from your perspective. Compare to the opponent's count." },
      { question: "If you have a meaningful space advantage, what should you generally avoid?", options: ["Castling", "Piece trades", "Pawn moves", "Queen moves"], answer: 1, explanation: "Trades reduce piece count — and the cramped side benefits from trades because each trade gives their remaining pieces more room. So if you have MORE space, AVOID trades." },
      { question: "What's the cramped side's main strategic goal?", options: ["Promote a pawn quickly", "Trade pieces to free up the position, OR find counterplay via a pawn break", "Castle queenside", "Build a strong attack on the king"], answer: 1, explanation: "Either trade trade trade, or find a freeing pawn break. Cramped + passive = lost. Cramped + active = playable." }
    ],
    further: [
      "Aron Nimzowitsch, *My System* — chapter on the cramping of the opponent.",
      "John Watson, *Secrets of Modern Chess Strategy* — modern view of space, including the Hedgehog.",
      "Tarrasch's classic *The Game of Chess* — original space-cramping examples."
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pos-012-prophylaxis",
    title: "Prophylaxis: stopping plans before they start",
    track: "positional",
    order: 12,
    estimatedMinutes: 13,
    objective: "Learn to ask 'what does my opponent want?' before each move and to play moves that prevent the opponent's plan rather than just executing your own.",
    tags: ["prophylaxis", "nimzowitsch", "karpov", "petrosian", "thinking-process"],
    next: "pos-013-two-weaknesses",
    content: [
      { type: "text", value: "**Prophylaxis** comes from the Greek for 'preventive care.' In chess, it means playing moves that **stop the opponent's plan** rather than just pushing your own. It's the most underused weapon in a developing player's arsenal — and it's the secret weapon behind the great defensive geniuses: Nimzowitsch (who coined the term), Karpov, and Petrosian." },

      { type: "heading", value: "The single question" },
      { type: "text", value: "Before every move — ideally every move, but especially in critical positions — ask:\n\n> **'What does my opponent want to play next?'**\n\nIf you can identify their best move or their best plan, you have two choices:\n\n1. **Execute your own move and let theirs happen** (if yours is bigger or theirs is harmless).\n2. **Play a move that PREVENTS their plan** — even if it doesn't directly improve your position. That's prophylaxis.\n\nThe key insight: **a move that stops a great enemy plan is just as valuable as a move that creates a great plan for you.** Sometimes more valuable, because the opponent's plan was concrete and yours might be slow." },

      { type: "subheading", value: "Why beginners ignore prophylaxis" },
      { type: "text", value: "Beginners are taught to make threats. So they only think about their own attacks. They look at the board and ask: 'What can I do?' instead of 'What can my opponent do?'\n\nThe shift to prophylactic thinking is one of the largest jumps in playing strength a club player can make. It typically gains 100-200 rating points by itself, because it eliminates the category of losses called 'I had a good plan but my opponent's was better.'" },

      { type: "heading", value: "The classic prophylactic moves" },
      { type: "text", value: "Most prophylactic moves fall into a few patterns:\n\n- **Kh1 or Kg1 (luft / king tucked away)**: prevents back-rank tactics and ...Bxh3 or ...Qxh2+ ideas.\n- **a3 or h3** (small pawn moves): prevent ...Bb4 or ...Bg4 pins.\n- **A rook lift to the 3rd rank** (Rd1-d3 or Re1-e3): defends the kingside while the opponent is preparing an attack.\n- **A 'preventive' bishop move** (Bd2-c1 to defend a back-rank square; Bf1 to retreat from a coming pawn attack).\n- **Quiet repositioning** (Nf3-d2 to control e4, or Nc3-d1-e3 to defend a key square).\n\nNone of these moves do anything 'attacking.' All of them deny the opponent something concrete." },

      { type: "board", fen: "r2q1rk1/pp1bbppp/2n1pn2/3p4/3P4/2N1PN2/PP1BBPPP/R2QR1K1 w - - 0 10", caption: "Suppose Black is preparing ...Bg4 to pin the f3-knight. White's prophylactic move is **h3** — quiet, no threats, but it permanently rules out the ...Bg4 pin idea. A whole category of opponent plans evaporates." },

      { type: "heading", value: "Karpov: the master of prophylaxis" },
      { type: "text", value: "Anatoly Karpov (World Champion 1975-1985) built his entire style around prophylaxis. Watching his games, you'd often see no obvious plan from him — just move after move that quietly took away the opponent's options. The opponent would slowly run out of ideas, and Karpov would convert.\n\nGrandmaster Mihai Suba famously said about Karpov: 'You don't lose to him because of his plan. You lose because he removed yours.'\n\nKarpov's habit was to spend most of his thinking time **on his opponent's coming move**, not his own. He'd find the opponent's best plan, then play the move that killed it." },

      { type: "pgn", pgn: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6 5. Qa4 Bb7 6. Bg2 c5 7. dxc5 bxc5 8. O-O Be7 9. Nc3 O-O 10. Re1 d5 11. cxd5 Nxd5 12. Qb3 Nb6 13. Nd2 Nc6 14. Nde4 Nd4 15. Qa3 Nb5 16. Qb4 Bxe4 17. Bxe4 Nd5 18. Bxd5 exd5", caption: "Karpov vs Kasparov, World Championship 1985 (illustrative phase). Karpov's quiet maneuvers (Nde4, Qb4) prevent Black from getting his full activity going. Even when Karpov isn't attacking, he's denying Kasparov the squares he wants." },

      { type: "heading", value: "Petrosian: the immortal preventer" },
      { type: "text", value: "Tigran Petrosian (World Champion 1963-1969) took prophylaxis to obsessive lengths. He would spend 20 minutes finding a move that did nothing visible — just stopped the opponent from doing something. His games are full of moves where the engine evaluation barely moves, but the opponent's options dwindle.\n\nPetrosian's nickname was 'Iron Tigran.' He was famous for being unbeatable — he'd just take away every chance you had until you ran out and made a mistake. The Petrosian style is: never give the opponent a real plan." },

      { type: "interactive", fen: "r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2NBPN2/PPQ2PPP/R1B1R1K1 w - - 0 10", prompt: "White to play. Black is planning ...c4 followed by ...Nb4 or ...Bb4 with strong pressure. Find the QUIET prophylactic move that stops Black's ...c4 advance dead in its tracks (without making any direct threat yourself).", solution: "a3", explanation: "**a3** is pure prophylaxis — it stops ...Nb4 ideas AND prepares b4 to clamp down on Black's queenside pawn advance. The move makes no threat, captures nothing, and develops nothing — but it eliminates an entire category of Black's plans. After a3, Black's queenside expansion is much harder to organize. This is the Karpov/Petrosian style: a small, quiet move that quietly suffocates the opponent. (Note: dxc5 is a tactical alternative, but a3 is the *prophylactic* idea.)" },

      { type: "heading", value: "Practical method" },
      { type: "text", value: "Use this routine on every move during a real game, especially after move 10:\n\n1. **Identify your candidate moves** (the 2-3 moves you'd consider).\n2. **Now switch sides mentally**: 'If I were my opponent, what would I want to play next?'\n3. **Find their best 1-2 moves or plans.** Maybe they want to push a pawn, occupy an outpost, double on a file, attack your king.\n4. **Ask: does any of MY candidate moves prevent their best plan?** If yes, that move just gained value.\n5. **Choose the candidate that combines progress for you with prevention for them.**\n\nIf no prophylactic move is needed (their plan is harmless), play normally. But every move where you skip step 2 is a move you might lose to a plan you didn't see." },

      { type: "subheading", value: "Common mistakes" },
      { type: "text", value: "1. **Reacting to the wrong threat.** Make sure you're preventing the opponent's BEST move, not their second-best.\n2. **Pure prophylaxis without progress.** The best prophylactic moves *also* improve your position. Pure waiting moves are okay sometimes but ideally rare.\n3. **Missing prophylactic *pawn moves*.** A small a3 or h3 is often the right move and gets overlooked because it doesn't seem 'active.'\n4. **Failing to ask the question at all.** This is the universal beginner mistake — you spend all your thinking time on your own ideas." },

      { type: "pgn", pgn: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Nf3 e5 7. O-O Nc6 8. d5 Ne7 9. b4 Nh5 10. Re1 a5 11. bxa5 Rxa5 12. Bd2 Ra6 13. Nb5 Bd7 14. a4 c6 15. Nc3 cxd5 16. cxd5 Nf4 17. Bxf4 exf4", caption: "Petrosian vs Spassky, World Championship 1966. Petrosian's quiet preparatory moves (Bd2, Nb5, a4) systematically deny Spassky's typical King's Indian counterplay. Every white move asks 'what does Spassky want?' before doing anything else." }
    ],
    quiz: [
      { question: "What is prophylaxis in chess?", options: ["A specific opening", "An attacking sacrifice", "Playing a move that prevents the opponent's plan", "A type of pin"], answer: 2, explanation: "Prophylaxis (Greek for 'preventive care') means playing moves that stop the opponent's plan, even if those moves don't make immediate threats of your own." },
      { question: "Which question best summarizes prophylactic thinking?", options: ["What's my best move?", "What does my opponent want to play next?", "Which piece should I trade?", "Where is the king?"], answer: 1, explanation: "The defining habit is asking 'what does my opponent want?' BEFORE choosing your move. Stop their plan, and your own plan often becomes much easier to execute." },
      { question: "Why is prophylaxis sometimes more valuable than aggressive play?", options: ["Because defense is always better than attack", "Because preventing the opponent's concrete plan can be more decisive than executing a slow plan of your own", "Because grandmasters never attack", "Because chess engines say so"], answer: 1, explanation: "If the opponent has a sharp plan and you have a slow one, stopping their plan often matters more than slightly advancing yours. The Karpov insight: take away their best chances, and they'll eventually run out of ideas." }
    ],
    further: [
      "Aron Nimzowitsch, *My System* — original chapter on prophylaxis (the term he coined).",
      "Mihai Suba, *Dynamic Chess Strategy* — discussion of Karpov's prophylactic style.",
      "Tibor Karolyi, *Karpov's Strategic Wins* — collection focused on Karpov's prophylactic technique."
    ]
  }

];
