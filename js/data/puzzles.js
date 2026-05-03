// Auto-extracted from docs/research/tactics.md — chess tactics puzzles.
export const PUZZLES = [
  {
    id: "p001",
    fen: "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Re8#",
    themes: ["back-rank"],
    difficulty: "easy",
    explanation: "The black king is hemmed in by its own f7-g7-h7 pawns. The rook simply slides to the back rank delivering mate. Any king with no escape squares (no luft) is one rook move from death — always make luft when it's safe.",
    title: "Back-rank mate (basic)"
  },
  {
    id: "p002",
    fen: "6k1/5ppp/8/8/8/8/r4PPP/3R2K1 b - - 0 1",
    sideToMove: "b",
    solution: "Ra1 Rxa1",
    themes: ["back-rank", "deflection"],
    difficulty: "easy",
    explanation: "Black trades rooks via the back rank, eliminating white's only defender of d1/e1/f1. The pattern: when only one defender holds the back rank, attacking that defender with another rook trades it off, leaving the rank vulnerable.",
    title: "Back-rank mate with deflection"
  },
  {
    id: "p003",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Bxf7+ Kxf7 Ng5+",
    themes: ["exposed-king", "fork", "sacrifice"],
    difficulty: "easy",
    explanation: "A classic Italian-game motif. Bxf7+ rips open the king; Ng5+ forks king and queen ideas via Nxh7 or further checks. Whenever the f7 pawn is defended only by the king and your bishop on c4 stares at it, calculate the sacrifice.",
    title: "Greco's mate (h7 sacrifice)"
  },
  {
    id: "p004",
    fen: "r3k2r/ppp2ppp/2n5/3qp3/3P4/2P2N2/PP3PPP/R1BQ1RK1 w kq - 0 1",
    sideToMove: "w",
    solution: "dxe5 Nxe5 Nxe5 Qxe5",
    themes: ["pin", "fork"],
    difficulty: "easy",
    explanation: "After the trades, the queen on e5 is pinned by the rook on e1. When an enemy queen sits opposite your rook on the e-file with one piece between, every capture on that piece may unmask a winning pin.",
    title: "Knight family fork"
  },
  {
    id: "p005",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    sideToMove: "b",
    solution: "Bg4",
    themes: ["pin"],
    difficulty: "easy",
    explanation: "Black creates a relative pin on the f3 knight. White must address it (h3 or castling) or risk doubled pawns and a weakened king. Pins on knights against queens are powerful even if the knight can technically move.",
    title: "Pin and win"
  },
  {
    id: "p006",
    fen: "4k3/8/8/8/q7/8/8/4K2R w K - 0 1",
    sideToMove: "w",
    solution: "Rh4",
    themes: ["skewer"],
    difficulty: "easy",
    explanation: "With the rook on h1, sliding to h4 attacks the queen on a4 along the 4th rank — a horizontal skewer-style attack. Rooks become deadly when both kings sit on open ranks/files with valuable pieces behind.",
    title: "Skewer the king to the queen"
  },
  {
    id: "p007",
    fen: "4k3/8/8/3N4/8/8/8/4K2q w - - 0 1",
    sideToMove: "w",
    solution: "Nf6+",
    themes: ["fork"],
    difficulty: "easy",
    explanation: "The knight on d5 leaps to f6 with check, and from f6 it also attacks the queen on h1. The king must move; white captures the queen. Memorize the knight-fork radius — from any square, a knight attacks 8 squares in a starburst pattern.",
    title: "Royal fork"
  },
  {
    id: "p008",
    fen: "r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5",
    sideToMove: "w",
    solution: "d4 exd4 Nxd4",
    themes: ["fork"],
    difficulty: "easy",
    explanation: "The d4 break threatens both the e5 pawn and opens lines. Central pawn pushes often create simultaneous threats — always evaluate d4/e4/d5/e5 for double-attack potential.",
    title: "Pawn fork"
  },
  {
    id: "p009",
    fen: "4k3/8/8/4B3/4N3/8/8/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nf6+",
    themes: ["discovered-check"],
    difficulty: "easy",
    explanation: "The knight moves and unmasks the bishop's check along the e-file. Any battery of B+N or B+R aimed at the enemy king lets the front piece roam and grab material with check.",
    title: "Discovered check basic"
  },
  {
    id: "p010",
    fen: "r3k2r/ppp2ppp/8/3qN3/3P4/8/PPP2PPP/R3K2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Nxf7",
    themes: ["double-check"],
    difficulty: "easy",
    explanation: "When two pieces check at once, the king must move — no blocks, no captures save the day. Double check is the most forcing move in chess.",
    title: "Double check mate"
  },
  {
    id: "p011",
    fen: "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5",
    sideToMove: "w",
    solution: "dxe4",
    themes: ["removing-the-defender"],
    difficulty: "easy",
    explanation: "The capture on e4 removes a centralized defender. Look for which enemy piece holds your target square together — eliminate it, and the position collapses.",
    title: "Removing the defender"
  },
  {
    id: "p012",
    fen: "2r3k1/5ppp/8/8/8/8/1Q3PPP/3R2K1 w - - 0 1",
    sideToMove: "w",
    solution: "Qb8+ Rxb8 Rd8+ Rxd8",
    themes: ["deflection"],
    difficulty: "easy",
    explanation: "The black rook on c8 defends the back rank. Any forcing attack on it pulls it off duty. Identify the defender, then attack it with the maximum-tempo move.",
    title: "Deflection wins material"
  },
  {
    id: "p013",
    fen: "4k3/8/8/8/8/8/4R3/4K2q w - - 0 1",
    sideToMove: "w",
    solution: "Re8+ Kxe8",
    themes: ["decoy"],
    difficulty: "easy",
    explanation: "The rook decoys the king to e8 where another piece can attack it. Sacrifices that drag a king onto a vulnerable square are decoys; always ask 'where do I want the enemy king?'",
    title: "Decoy with check"
  },
  {
    id: "p014",
    fen: "r1bqkbnr/pppppppp/8/8/7n/8/PPPPPPPP/RNBQKBNR w KQkq - 1 2",
    sideToMove: "w",
    solution: "g3",
    themes: ["trapped-piece"],
    difficulty: "easy",
    explanation: "A knight on h4 with no support has only g6, f5, f3 to escape; g3 cuts off f4-squares. 'Knight on the rim is dim' — venturing to a4/h4/a5/h5 without support invites a pawn that traps it.",
    title: "Trapped knight on the rim"
  },
  {
    id: "p015",
    fen: "6rk/6pp/8/6N1/8/8/6PP/4Q1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Nf7+ Kg8 Nh6+ Kh8 Qg8+ Rxg8 Nf7#",
    themes: ["smothered-mate", "double-check"],
    difficulty: "medium",
    explanation: "Philidor's legacy. The knight checks with Nf7+, the king shuffles, then the queen sacrifices on g8 to drag the rook there, leaving the king truly smothered for Nf7 mate. This exact pattern recurs — corner king + rook adjacent + your N+Q = smothered mate.",
    title: "Smothered mate setup"
  },
  {
    id: "p016",
    fen: "4r1k1/ppp2ppp/8/8/4N3/8/PPP2PPP/4R1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Ne7+ Kh8",
    themes: ["mating-net"],
    difficulty: "medium",
    explanation: "Anastasia's mate: a knight on e7 (or g6) covers escape squares while a rook delivers mate on the h-file. Knight on e7/g6 + rook on h-file = Anastasia's net.",
    title: "Anastasia's mate"
  },
  {
    id: "p017",
    fen: "r1bqkbnr/pppp1Bpp/2n5/4p3/4P1b1/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 4",
    sideToMove: "b",
    solution: "Nxe5 Bxd1 Bxf7+ Ke7 Nd5#",
    themes: ["mating-net", "sacrifice"],
    difficulty: "medium",
    explanation: "The famous Légal trap. White ignores the pin, sacrifices the queen, and mates with three minor pieces. Pins are not absolute — if the pinned piece can deliver mate or win huge material, the pin is broken.",
    title: "Légal's mate"
  },
  {
    id: "p018",
    fen: "2kr3r/pppq1ppp/2n2n2/8/3P4/2P5/PP3PPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Ba6+",
    themes: ["mating-net"],
    difficulty: "medium",
    explanation: "Boden's mate: two bishops on intersecting diagonals mate a king behind blocked pawns. Against opposite-side castling, bishops on b5/a6 and the c1-h6 diagonal often combine for mate.",
    title: "Boden's mate"
  },
  {
    id: "p019",
    fen: "r4rk1/pp3ppp/3qpn2/2pn4/8/2N1PN2/PP3PPP/R2Q1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Bf6",
    themes: ["windmill", "discovered-check"],
    difficulty: "hard",
    explanation: "The windmill is a discovered-check loop where a rook on the 7th rank gives check, the king moves, a bishop on the long diagonal grabs material as the rook retreats with another discovered check. Any time you have R on 7th + B on long diagonal aimed at the king, look for windmill geometry.",
    title: "Windmill (Torre vs Lasker)"
  },
  {
    id: "p020",
    fen: "7K/8/k1P5/7p/8/8/8/8 w - - 0 1",
    sideToMove: "w",
    solution: "Kg7 h4 Kf6 h3 Ke5",
    themes: ["promotion"],
    difficulty: "hard",
    explanation: "Réti's classic. The white king walks diagonally, threatening both to catch the h-pawn AND to support the c-pawn's promotion. A king can chase two distant goals simultaneously by walking the diagonal — the geometry is counterintuitive.",
    title: "Réti's endgame study"
  },
  {
    id: "p021",
    fen: "8/8/1KP5/3r4/8/8/8/k7 w - - 0 1",
    sideToMove: "w",
    solution: "c7 Rd6+ Kb5 Rd5+ Kb4 Rd4+ Kb3 Rd3+ Kc2 Rd4 c8=R Ra4 Kb3",
    themes: ["underpromotion", "promotion"],
    difficulty: "hard",
    explanation: "Promoting to a queen would be stalemate after Rc4+. The rook under-promotion threatens mate on c1 and refuses the stalemate, forcing the rook to move and then winning by skewer. When queening creates stalemate, consider rook under-promotion.",
    title: "Saavedra position"
  },
  {
    id: "p022",
    fen: "8/4Pk2/8/8/8/8/8/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "e8=N+",
    themes: ["underpromotion", "fork"],
    difficulty: "medium",
    explanation: "When promoting to a queen doesn't check or fork but a knight does, under-promote. Always check what each promotion piece does immediately, not just its long-term value.",
    title: "Knight under-promotion fork"
  },
  {
    id: "p023",
    fen: "7k/5KQ1/8/8/8/8/8/8 b - - 0 1",
    sideToMove: "b",
    solution: "(none)",
    themes: ["stalemate"],
    difficulty: "easy",
    explanation: "When winning, never put the queen on a square that takes away the enemy king's last legal move without delivering check. Stalemate ruins many won positions.",
    title: "Stalemate trick"
  },
  {
    id: "p024",
    fen: "6k1/5ppp/8/8/8/8/5PPP/2q3K1 b - - 0 1",
    sideToMove: "b",
    solution: "Qe1+ Kh2 Qe5+",
    themes: ["perpetual"],
    difficulty: "medium",
    explanation: "Black is down material but the queen shuttles giving checks the king cannot escape. With an exposed enemy king and a queen, always test for perpetual before resigning.",
    title: "Perpetual check resource"
  },
  {
    id: "p025",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b kq - 0 5",
    sideToMove: "b",
    solution: "Nxe4 Nxe4 d5",
    themes: ["zwischenzug"],
    difficulty: "medium",
    explanation: "Instead of the automatic recapture, the d5 push forks the bishop and the knight, winning a piece. In any forced sequence, check for an in-between move with greater force than the 'expected' reply.",
    title: "Zwischenzug"
  },
  {
    id: "p026",
    fen: "2r3k1/5ppp/8/3q4/8/8/2Q2PPP/3R2K1 w - - 0 1",
    sideToMove: "w",
    solution: "Rxd5",
    themes: ["overloading"],
    difficulty: "medium",
    explanation: "When a single piece is doing two jobs, you can attack one to break the other. Catalog defensive duties; the busiest piece is the most vulnerable.",
    title: "Overloaded queen"
  },
  {
    id: "p027",
    fen: "r4rk1/ppp2ppp/3b4/3qN3/8/2P3Q1/PP3PPP/R4RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Nxf7 Rxf7 Qxg7+",
    themes: ["clearance"],
    difficulty: "hard",
    explanation: "The knight clears the e5-square (or distracts a defender) so the queen can deliver mate. When one of your pieces blocks your own attacking line, consider sacrificing it to clear the way.",
    title: "Clearance sacrifice"
  },
  {
    id: "p028",
    fen: "2r3k1/8/8/r7/8/8/R7/2R3K1 w - - 0 1",
    sideToMove: "w",
    solution: "Rc5",
    themes: ["interference"],
    difficulty: "medium",
    explanation: "Sacrificing a rook between two defending pieces breaks their connection. When enemy pieces defend each other along a line, dropping a piece between them — even a sacrifice — collapses the defense.",
    title: "Interference"
  },
  {
    id: "p029",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    sideToMove: "w",
    solution: "Nxe5",
    themes: ["desperado"],
    difficulty: "medium",
    explanation: "A piece about to be lost should sell itself for the highest-value capture or biggest threat. Never just lose a hanging piece — always look for a damaging final move.",
    title: "Desperado piece"
  },
  {
    id: "p030",
    fen: "r1bq1rk1/pppp1ppp/2n2n2/2b5/2BNP3/3P4/PPP2PPP/RNBQ1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Bxh7+ Kxh7 Ng5+ Kg8 Qh5",
    themes: ["greek-gift", "exposed-king", "sacrifice", "mating-net"],
    difficulty: "medium",
    explanation: "The classic Greek gift. Sacrifice the bishop to rip open the king, follow with Ng5+ and Qh5, and mate or win the queen via Qxh7. When the f6-knight is gone (or pinned), Bxh7+ becomes deadly serious.",
    title: "Greek gift (Bxh7+)"
  },
  {
    id: "p031",
    fen: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1",
    sideToMove: "w",
    solution: "Qb8+ Nxb8 Rd8#",
    themes: ["deflection", "back-rank", "sacrifice"],
    difficulty: "medium",
    explanation: "Morphy's immortal finish vs. Duke of Brunswick and Count Isouard. The queen sacrifices to deflect the knight defender of d8, then the rook mates. Every defender has a price — even the queen is worth sacrificing for a forced mate.",
    title: "Morphy's Opera Game finish"
  },
  {
    id: "p032",
    fen: "6k1/5ppp/6B1/8/8/8/8/4R1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Re8+ Kh7 Re7",
    themes: ["mating-net"],
    difficulty: "medium",
    explanation: "The bishop on g6 dominates the king's escape, and the rook delivers along the back rank. B+R mates a king on g8/h8 when the bishop covers the long diagonal escape squares.",
    title: "Damiano's bishop"
  },
  {
    id: "p033",
    fen: "r1bq1rk1/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP1QPPP/R1B1K2R w KQ - 0 1",
    sideToMove: "w",
    solution: "Nxd5 Nxd5 Qxe5+",
    themes: ["fork", "removing-the-defender"],
    difficulty: "medium",
    explanation: "A queen check on the long diagonal forks king and a piece. Trades that open central diagonals while your queen lurks on e2 often unleash forks via e5 or d5.",
    title: "Lolli's mate"
  },
  {
    id: "p034",
    fen: "r2qk2r/ppp2ppp/2n1bN2/3p4/8/8/PPP2PPP/R2Q1RK1 b kq - 0 1",
    sideToMove: "b",
    solution: "gxf6",
    themes: ["mating-attack"],
    difficulty: "easy",
    explanation: "A knight on f6 next to the castled king is so dangerous that capturing it (even with g7) is often forced. Knights on the 6th rank near the king must be addressed immediately.",
    title: "Knight on the 6th"
  },
  {
    id: "p035",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b5/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Bg5",
    themes: ["pin"],
    difficulty: "easy",
    explanation: "The bishop on g5 pins the knight on f6 to the queen on d8. In many openings, Bg5 creating this pin is the first tactical operation.",
    title: "Pin to win the queen"
  },
  {
    id: "p036",
    fen: "8/8/8/8/q7/8/4K3/4R2k w - - 0 1",
    sideToMove: "w",
    solution: "Re4+",
    themes: ["skewer"],
    difficulty: "easy",
    explanation: "A check that lines up two enemy pieces is a skewer. Every check should be evaluated for skewer potential — what's behind the king on this line?",
    title: "Skewer with check"
  },
  {
    id: "p037",
    fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Nd5",
    themes: ["discovered-attack"],
    difficulty: "medium",
    explanation: "The knight jumping creates a discovered threat from another piece. Any time your knight sits between your bishop and an enemy queen, the knight's leap may unmask a winning attack.",
    title: "Discovered attack winning queen"
  },
  {
    id: "p038",
    fen: "r4rk1/ppp2ppp/8/3q4/8/8/PPP2PPP/2R3K1 w - - 0 1",
    sideToMove: "w",
    solution: "Qd1",
    themes: ["double-attack"],
    difficulty: "easy",
    explanation: "A single queen move creates two threats. The queen's range makes her the universal double-attacker — every queen move should be evaluated for two simultaneous threats.",
    title: "Double attack with the queen"
  },
  {
    id: "p039",
    fen: "4k3/8/4r3/8/8/4R3/4R3/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Rxe6 Rxe6 Rxe6+",
    themes: ["x-ray"],
    difficulty: "easy",
    explanation: "The doubled rooks X-ray each other; capturing through one wins the next. Doubled rooks on a file are an X-ray battery — the back rook supports the front rook through enemy pieces.",
    title: "X-ray attack"
  },
  {
    id: "p040",
    fen: "r1bqk2r/pppp1ppp/2n5/2b5/2B1P3/3P1N2/PP3PPP/RNBQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Bxh7+ Kxh7 Bb2 Ng5+",
    themes: ["mating-net"],
    difficulty: "hard",
    explanation: "Two bishops and a knight combine: one bishop sacrifices on h7+, the king moves, the other bishop on b2 cuts off the diagonal, and the knight on g5 delivers mate. In attacks with B+B+N, look for the bishop sacrifice on h7 followed by the long-diagonal cover.",
    title: "Blackburne's mate"
  },
  {
    id: "p041",
    fen: "r4rk1/ppp2ppp/8/8/2B5/8/PPP2PPP/4R1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Re3 Re3-h3",
    themes: ["mating-net"],
    difficulty: "hard",
    explanation: "When the long diagonal is open and a rook reaches the h-file, mate often follows on h7 or h8. Open long diagonals plus rook lift equals mating attack.",
    title: "Pillsbury's mate"
  },
  {
    id: "p042",
    fen: "rnb1kbnr/pppp1ppp/8/4p3/4P1q1/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    sideToMove: "w",
    solution: "Be2",
    themes: ["trapped-piece"],
    difficulty: "easy",
    explanation: "The queen on g4 is on a flag pole; a knight or pawn push can chase her with tempo and trap her. Queens advanced too early in the opening get harassed and trapped.",
    title: "Trapped queen in opening"
  },
  {
    id: "p043",
    fen: "8/2P5/8/8/4k3/8/8/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "c8=Q+",
    themes: ["promotion"],
    difficulty: "easy",
    explanation: "Promoting with check buys the tempo to win. Always check whether a promotion gives check — checking promotions are usually safe; quiet promotions can be answered.",
    title: "Pawn promotion fork"
  },
  {
    id: "p044",
    fen: "r3r1k1/pp3ppp/8/8/8/2N5/PP3PPP/3RR1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Nd5",
    themes: ["double-attack", "fork"],
    difficulty: "medium",
    explanation: "A centralized knight forks two rooks. The c3/d5/e5/f5 squares are knight-fork goldmines for the d8/e8/f8 enemy back rank.",
    title: "Two-rook sacrifice (Nezhmetdinov style)"
  },
  {
    id: "p045",
    fen: "6k1/5p1p/6p1/8/8/8/q6P/3R2K1 b - - 0 1",
    sideToMove: "b",
    solution: "Qg2+ Kxg2",
    themes: ["deflection", "decoy"],
    difficulty: "medium",
    explanation: "A check that the king must take (because nothing blocks) drags the king onto a square where it can be exploited. Queen sacrifices on g2/g7 often decoy the king for a knight or rook follow-up.",
    title: "Deflection of the king"
  },
  {
    id: "p046",
    fen: "r1bq1rk1/pp1n1ppp/2pbpn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Bxh7+ Kxh7 Ng5+",
    themes: ["greek-gift", "exposed-king", "removing-the-defender"],
    difficulty: "medium",
    explanation: "The Bxh7+ sacrifice rips the king's pawn cover. When the f6-knight has been removed or distracted, Bxh7+ is automatically worth calculating.",
    title: "Removing the king's defender (h7 sac)"
  },
  {
    id: "p047",
    fen: "2rr2k1/5ppp/8/8/8/8/Q4PPP/3R2K1 w - - 0 1",
    sideToMove: "w",
    solution: "Qxc8 Rxc8 Rxd8+",
    themes: ["overloading"],
    difficulty: "easy",
    explanation: "The rook on d8 was overloaded — defending both c8 and the back rank. Trading the queen for one rook lets the second rook crash through. Identify pieces with two duties; sacrifice to overwhelm them.",
    title: "Overloaded rook"
  },
  {
    id: "p048",
    fen: "r1bq1rk1/ppp2ppp/2n5/3pP3/3P4/3B1N2/PP3PPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Nh4",
    themes: ["mating-net"],
    difficulty: "hard",
    explanation: "Quiet moves that improve the worst-placed attacker are the hardest to find but the strongest in mating attacks. When forcing moves don't quite work, look for a quiet improver.",
    title: "Quiet move in a mating attack"
  },
  {
    id: "p049",
    fen: "5rk1/pp4pp/8/4N3/8/8/PP4PP/4R2K w - - 0 1",
    sideToMove: "w",
    solution: "Re1-h1",
    themes: ["mating-net"],
    difficulty: "medium",
    explanation: "The knight covers g8/h7 escape squares while a rook on h-file mates. Memorize Anastasia's net — it appears constantly in attacks on the kingside.",
    title: "Anastasia's mate (clean pattern)"
  },
  {
    id: "p050",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Bxf7+ Kxf7 Ng5+",
    themes: ["mating-net", "sacrifice"],
    difficulty: "medium",
    explanation: "Reti's many published miniatures feature double-check sacrifices and quiet maneuvers. Study Reti's games for double-check geometry.",
    title: "Reti's classic mate"
  },
  {
    id: "p051",
    fen: "r1bqkbnr/ppp1pppp/2n5/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 2 3",
    sideToMove: "w",
    solution: "e3 c4",
    themes: ["double-attack"],
    difficulty: "easy",
    explanation: "Central pawn pushes attack pieces and gain space. Every pawn push that attacks two pieces (one directly, one through opening a file) is a hidden double attack.",
    title: "Pawn push wins piece"
  },
  {
    id: "p052",
    fen: "r2q1rk1/pp1bppbp/2np1np1/8/2P1P3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Nd5",
    themes: ["fork"],
    difficulty: "medium",
    explanation: "A knight on d5 attacks the queen and pressures e7/c7. Outposts on d5/e5/d4/e4 protected by pawns are the strongest squares on the board.",
    title: "Knight outpost wins exchange"
  },
  {
    id: "p053",
    fen: "r1bq1rk1/pp3ppp/2n5/3pp3/8/2P2N2/PP1B1PPP/R2Q1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Bb2",
    themes: ["mating-attack"],
    difficulty: "medium",
    explanation: "When the long diagonal is open and the king sits on g7/g8/h8, a bishop on b2 stares at the king forever. Keep the long diagonal in your scope — fianchetto trades create permanent weaknesses.",
    title: "Long diagonal mate"
  },
  {
    id: "p054",
    fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PbP/RNBQR1K1 w kq - 0 1",
    sideToMove: "w",
    solution: "Kxh2",
    themes: ["trapped-piece"],
    difficulty: "easy",
    explanation: "A bishop that grabs the h2 pawn is often trapped after Kxh2 followed by minor-piece coverage. Don't grab the h2 pawn unless you have a follow-up — the bishop has one diagonal to escape.",
    title: "Trapped bishop on h2"
  },
  {
    id: "p055",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b5/2BNP3/8/PPP2PPP/RNBQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Nxc6",
    themes: ["discovered-attack", "double-attack"],
    difficulty: "medium",
    explanation: "The knight capture exposes a line and makes a threat of its own. Discovered attacks are at their best when the moving piece also attacks something.",
    title: "Discovered double attack"
  },
  {
    id: "p056",
    fen: "2r3k1/5ppp/8/8/8/8/4R1PP/4R1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Re8+ Rxe8 Rxe8#",
    themes: ["back-rank"],
    difficulty: "easy",
    explanation: "Doubled rooks on the e-file battering through the c8 rook to mate. Doubled rooks behind a single defender always crash through.",
    title: "Back-rank tactic with rook lift"
  },
  {
    id: "p057",
    fen: "r2q1rk1/ppp2ppp/2n5/3pp3/3P4/2N2N2/PPP2PPP/R2QR1K1 w - - 0 1",
    sideToMove: "w",
    solution: "dxe5 Nxe5 Nxe5 Qxe5 Nd5",
    themes: ["fork", "deflection"],
    difficulty: "medium",
    explanation: "Trades simplify until a knight forks queen and a piece. Trade sequences often end with a knight reaching d5 or e5 with a fork.",
    title: "Knight fork after deflection"
  },
  {
    id: "p058",
    fen: "7k/6pp/8/6N1/8/8/8/4R2K w - - 0 1",
    sideToMove: "w",
    solution: "Nf7+ Kg8 Re8#",
    themes: ["mating-net"],
    difficulty: "easy",
    explanation: "Knight check forces the king to g8, then the rook delivers mate on e8. In mate-in-two studies, the first move usually restricts the king before the killer blow.",
    title: "Mate in 2 (composed)"
  },
  {
    id: "p059",
    fen: "8/8/8/8/8/3k4/3p4/3K4 w - - 0 1",
    sideToMove: "w",
    solution: "Kc1",
    themes: ["stalemate"],
    difficulty: "medium",
    explanation: "The classic K+P vs K with the king in front leads to drawn or won positions depending on opposition. In K+P endings, the side without the pawn aims for stalemate via opposition.",
    title: "Stalemate save"
  },
  {
    id: "p060",
    fen: "6k1/pp3ppp/8/8/8/8/PP3PPP/6K1 w - - 0 1",
    sideToMove: "w",
    solution: "Qe8+ Kh7 Qh5+ Kg8 Qe8+",
    themes: ["perpetual"],
    difficulty: "medium",
    explanation: "The queen shuttles between e8 and h5, checking forever. When the enemy king has only two squares (g8 and h7) and your queen reaches both with check, it's perpetual.",
    title: "Perpetual via queen shuttle"
  },
  {
    id: "p061",
    fen: "2r3k1/5ppp/8/8/r7/8/R7/2R3K1 w - - 0 1",
    sideToMove: "w",
    solution: "Rxa4 Rxa4 Rc8+",
    themes: ["interference", "back-rank"],
    difficulty: "medium",
    explanation: "Removing one defender lets the other rook crash to c8. When two enemy rooks defend each other, sacrificing one of yours often breaks the connection.",
    title: "Interference sacrifice"
  },
  {
    id: "p062",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Nxe5 Nxe5 d4",
    themes: ["desperado", "zwischenzug"],
    difficulty: "medium",
    explanation: "A doomed knight grabs the e5 pawn before being recaptured; the d4 push then forks. In capture sequences, don't recapture automatically — look for desperado captures and zwischenzug pushes.",
    title: "Desperado knight"
  },
  {
    id: "p063",
    fen: "8/4P3/8/8/8/4k3/4r3/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "e8=Q+",
    themes: ["promotion", "discovered-check"],
    difficulty: "medium",
    explanation: "The pawn promotes with discovered check from a rook behind. Pawns that promote on a file with a rook behind often deliver discovered check at the moment of promotion.",
    title: "Promotion with discovered check"
  },
  {
    id: "p064",
    fen: "r1bq1rk1/pp3ppp/2n5/2bpp3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Nh4",
    themes: ["mating-net"],
    difficulty: "hard",
    explanation: "The quiet Nh4 prepares Nf5 with a devastating outpost near the king. Quiet improvers are the hardest moves but often the strongest in attacking positions.",
    title: "Mating net with quiet move"
  },
  {
    id: "p065",
    fen: "r3k3/8/8/8/8/8/4R3/4R2K w - - 0 1",
    sideToMove: "w",
    solution: "Re8+",
    themes: ["x-ray"],
    difficulty: "easy",
    explanation: "When you double rooks, the back rook X-ray defends the front rook even if the enemy captures and a piece intervenes. Doubled rooks are mutually X-ray-defended — a critical defensive resource.",
    title: "X-ray defense"
  },
  {
    id: "p066",
    fen: "r1bq1rk1/pp3ppp/2n2n2/2bpp3/4P3/2N2N2/PPB2PPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    solution: "Bb2",
    themes: ["mating-attack"],
    difficulty: "medium",
    explanation: "A bishop on b2 stares down the long diagonal at the king. After any g7-pawn move or trade, the diagonal becomes a mating highway. Treat the long diagonal as a permanent attacking lane once the fianchetto bishop is gone.",
    title: "Weak diagonal collapse"
  },
  {
    id: "p067",
    fen: "4k3/8/4q3/8/8/8/4R3/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Rxe6",
    themes: ["pin"],
    difficulty: "easy",
    explanation: "The black queen on e6 is pinned to the king on e8 by the white rook on e2. Pinned pieces are paralyzed — capture them at leisure. Whenever an enemy queen sits on the same file or rank as her king, scan for a long-range attacker that creates an absolute pin.",
    title: "Absolute pin wins the queen"
  },
  {
    id: "p068",
    fen: "4q1k1/5ppp/4n3/3P4/8/4R3/8/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "dxe6 Qxe6 Rxe6",
    themes: ["pin", "removing-the-defender"],
    difficulty: "medium",
    explanation: "The knight on e6 is pinned to the queen by the rook on e3. Capture with the d5 pawn — the pinned knight cannot recapture. After Qxe6, the queen herself stands on the pin line, and Rxe6 collects her. Pins enable lopsided exchanges because the pinned piece can't fight back.",
    title: "Pinning a knight to win the queen"
  },
  {
    id: "p069",
    fen: "1k5q/8/8/8/8/8/8/4R2K w - - 0 1",
    sideToMove: "w",
    solution: "Re8+ Kb7 Rxh8",
    themes: ["skewer"],
    difficulty: "easy",
    explanation: "The white rook checks along the 8th rank, lining up the black king with the queen behind. The king must step off the rank, and the rook captures the queen. Skewers thrive when both pieces of value sit on the same line and the more valuable one is in front.",
    title: "Rank skewer wins the queen"
  },
  {
    id: "p070",
    fen: "4r3/8/8/4k3/8/8/3Q4/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Qe2+ Kd5 Qxe8",
    themes: ["skewer"],
    difficulty: "easy",
    explanation: "Qe2+ checks the king down the e-file with the rook lined up behind. The king must step off the file, and the queen sweeps through to collect the rook. Whenever your queen can deliver check on a line that runs through an enemy piece, you've found a skewer.",
    title: "Queen skewer along the file"
  },
  {
    id: "p071",
    fen: "8/8/8/8/5k2/B7/7q/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Bd6+ Ke4 Bxh2",
    themes: ["skewer"],
    difficulty: "medium",
    explanation: "Bd6+ checks the king along the d6-h2 diagonal — and the queen sits at the diagonal's far end. After the king steps aside, the bishop slides through and captures the queen. Bishop skewers depend on geometry: scan every diagonal for king + valuable piece on the same color squares.",
    title: "Bishop skewer on the long diagonal"
  },
  {
    id: "p072",
    fen: "7k/8/8/4r3/4n3/8/Q7/4K3 b - - 0 1",
    sideToMove: "b",
    solution: "Nc3+ Kf1 Nxa2",
    themes: ["discovered-attack", "discovered-check"],
    difficulty: "easy",
    explanation: "The knight on e4 blocks the rook's check on the white king. Moving the knight uncovers the check — and Nc3+ also attacks the white queen. White must address the check; black's knight then collects the queen. Discovered attacks where the moving piece grabs material are doubly devastating.",
    title: "Discovered check wins the queen"
  },
  {
    id: "p073",
    fen: "q3k3/8/8/3N4/8/8/8/4K2B w - - 0 1",
    sideToMove: "w",
    solution: "Nf6+ Kd8 Bxa8",
    themes: ["discovered-attack"],
    difficulty: "medium",
    explanation: "Nf6+ checks the king AND clears the long diagonal so the bishop on h1 attacks the queen on a8. The black queen can't reach f6 to capture the knight, and the king must move. The bishop then collects the queen along the freshly opened diagonal. Knight + bishop batteries on the long diagonal are a constant tactical theme.",
    title: "Knight discovers bishop attack on queen"
  },
  {
    id: "p074",
    fen: "1r5k/8/8/4N3/8/8/8/B3K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nc6+ Kg8 Nxb8",
    themes: ["discovered-attack", "fork"],
    difficulty: "medium",
    explanation: "Nc6 unmasks the bishop on the long diagonal, delivering discovered check on the king on h8. The same knight also attacks the rook on b8. The king must move; the knight then collects the rook. The moving piece in a discovered attack should always look for a second target.",
    title: "Discovered check + knight forks rook"
  },
  {
    id: "p075",
    fen: "6rk/5ppp/8/4N3/8/8/8/6K1 w - - 0 1",
    sideToMove: "w",
    solution: "Nf7#",
    themes: ["smothered-mate"],
    difficulty: "easy",
    explanation: "The black king on h8 is smothered by its own rook on g8 and pawns on g7 and h7. The knight leaps to f7 attacking h8, and the king has no square to flee — pure smothered mate. Memorize this corner pattern: a knight on f7 against a king on h8 walled in by its own pieces is mate.",
    title: "Smothered mate (Nf7#)"
  },
  {
    id: "p076",
    fen: "kr6/pp6/8/3N4/8/8/8/6K1 w - - 0 1",
    sideToMove: "w",
    solution: "Nc7#",
    themes: ["smothered-mate"],
    difficulty: "easy",
    explanation: "Mirror of the corner smothered mate, this time on a8. Nc7# attacks the king while the king's own rook and pawns box it in. Smothered-mate patterns work in all four corners — train your eye to spot the formation regardless of which corner it appears in.",
    title: "Smothered mate (Nc7#)"
  },
  {
    id: "p077",
    fen: "3r3k/8/8/4N3/8/8/8/B3K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nf7+ Kg8 Nxd8",
    themes: ["double-check", "discovered-attack"],
    difficulty: "medium",
    explanation: "Nf7+ is a double check: the knight attacks h8, and the bishop on a1 fires down the long diagonal also attacking h8. Against double check, only the king can move — no capture, no block can address two attackers at once. After Kg8, the knight grabs the rook on d8.",
    title: "Double check wins material"
  },
  {
    id: "p078",
    fen: "k7/1p6/8/3q4/N7/8/8/R3K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nb6+ Kb8 Nxd5",
    themes: ["double-check", "fork"],
    difficulty: "medium",
    explanation: "Nb6+ delivers double check: the knight attacks a8, and the rook on a1 unmasks along the a-file. The king has only Kb8 — and once it moves, the knight gallops to d5 and collects the queen. Always check whether your discovered attack is also a double check.",
    title: "Double check sets up knight fork"
  },
  {
    id: "p079",
    fen: "4k3/3p4/4b3/4N3/4R3/8/8/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nxd7 Kxd7 Rxe6",
    themes: ["removing-the-defender"],
    difficulty: "medium",
    explanation: "The bishop on e6 is defended only by the d7 pawn. Nxd7 eliminates the defender; after the king recaptures, Rxe6 collects the bishop. Net white wins bishop + pawn for knight — a small material gain. Always identify the single defender of a target before forcing trades.",
    title: "Remove the defender wins a piece"
  },
  {
    id: "p080",
    fen: "4k3/4q3/8/8/8/8/4R3/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Rxe7+ Kxe7",
    themes: ["removing-the-defender", "decoy"],
    difficulty: "easy",
    explanation: "The queen on e7 is defended only by the king. Rxe7+ trades rook for queen — a clean +4 material gain. Whenever a queen is defended only by her king and your rook can reach her, calculate the exchange: rook-for-queen is almost always profitable.",
    title: "Rook for queen exchange"
  },
  {
    id: "p081",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    sideToMove: "w",
    solution: "Ng5",
    themes: ["double-attack"],
    difficulty: "easy",
    explanation: "The knight hop to g5 attacks f7 — the classic Italian-Game pressure point — and prepares Nxf7 sacrifices. When your bishop is on c4 and f7 is defended only by the enemy king, Ng5 is the prelude to fireworks.",
    title: "Italian Game knight to g5"
  },
  {
    id: "p082",
    fen: "8/8/8/2k5/8/8/2K5/R7 w - - 0 1",
    sideToMove: "w",
    solution: "Ra5+",
    themes: ["skewer"],
    difficulty: "easy",
    explanation: "Basic K+R vs K technique: rook checks the lone king, driving it toward the edge. Repeating this maneuver while the king supports drives the enemy king to the back rank where mate becomes possible. Foundational endgame skill.",
    title: "K+R vs K basic check"
  },
  {
    id: "p083",
    fen: "6K1/8/8/8/4N3/8/5ppp/6rk w - - 0 1",
    sideToMove: "w",
    solution: "Nxf2#",
    themes: ["smothered-mate"],
    difficulty: "easy",
    explanation: "Mirror smothered mate on h1. The black king is locked in by its own rook on g1 and pawns on f2, g2, h2. The white knight captures on f2 and delivers mate — the king has no flight square. Same pattern as Nf7# but in the opposite corner.",
    title: "Smothered mate Nxf2#"
  },
  {
    id: "p084",
    fen: "k7/pp6/8/2N5/8/8/8/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nxb7",
    themes: ["double-attack"],
    difficulty: "easy",
    explanation: "Nxb7 captures a pawn and lands on a square attacking d6 and d8 — pressing the cornered king's pieces. Knight outposts behind enemy lines are a major source of practical tactics.",
    title: "Knight infiltrates near cornered king"
  },
  {
    id: "p085",
    fen: "8/8/3k4/8/8/8/3K4/R7 w - - 0 1",
    sideToMove: "w",
    solution: "Ra6+",
    themes: ["skewer", "back-rank"],
    difficulty: "easy",
    explanation: "Rook check from the side drives the king back. K+R vs K endgame technique: with your king providing the cut-off, the rook gives check on the rank to push the enemy king toward the edge.",
    title: "K+R vs K side check"
  },
  {
    id: "p086",
    fen: "4k3/8/8/8/8/4q3/8/4RK2 w - - 0 1",
    sideToMove: "w",
    solution: "Rxe3+",
    themes: ["double-attack"],
    difficulty: "easy",
    explanation: "The black queen on e3 is undefended on the e-file. Rxe3+ captures the queen with check — the rook even gains tempo by checking the king on e8 along the same file. Always scan whether your captures come with check.",
    title: "Capture queen with check"
  },
  {
    id: "p087",
    fen: "4k3/4r3/4n3/8/8/8/8/4K3 b - - 0 1",
    sideToMove: "b",
    solution: "Nc5+",
    themes: ["discovered-check"],
    difficulty: "easy",
    explanation: "The black knight on e6 blocks its own rook's check on the white king. Any knight move uncovers the check — Nc5+ is one good option, harassing white squares while exposing the king. Discovered checks let the moving piece roam to attack other targets simultaneously.",
    title: "Discovered check by knight move"
  },
  {
    id: "p088",
    fen: "k7/p7/8/N7/8/8/8/R3K3 w - - 0 1",
    sideToMove: "w",
    solution: "Nb7",
    themes: ["discovered-attack"],
    difficulty: "easy",
    explanation: "Nb7 unmasks the rook's attack down the a-file on the pawn — and the knight even lands on a square covering c5/d6/d8. Discovered attacks let one piece move while another threatens — both sides gain.",
    title: "Knight discovers rook on the a-file"
  },
  {
    id: "p089",
    fen: "6k1/5ppp/8/8/q7/8/5PPP/3R2K1 b - - 0 1",
    sideToMove: "b",
    solution: "Qxd1+",
    themes: ["overloading", "back-rank"],
    difficulty: "easy",
    explanation: "The white rook on d1 is overloaded — it's the only piece defending the back rank from intrusion. Black plays Qxd1+ along the a4-d1 diagonal, capturing the rook with check; whichever recapture white finds, the back rank cracks open. A textbook 'remove the defender' shot.",
    title: "Overloaded white rook"
  },
  {
    id: "p090",
    fen: "8/8/8/8/3k4/8/3p4/3K4 w - - 0 1",
    sideToMove: "w",
    solution: "Kxd2",
    themes: ["zwischenzug"],
    difficulty: "easy",
    explanation: "(Composed K+P endgame illustration — king grabs the advanced pawn before it promotes.)",
    title: "King captures pawn"
  },
  {
    id: "p091",
    fen: "8/8/8/3k4/8/3K4/8/8 w - - 0 1",
    sideToMove: "w",
    solution: "Ke3",
    themes: ["zwischenzug"],
    difficulty: "easy",
    explanation: "(Composed K vs K position — kings cannot stand adjacent. Use as a king-movement warm-up; Ke3 is one of several legal moves.)",
    title: "King movement basics"
  },
  {
    id: "p092",
    fen: "k7/8/3K4/8/8/8/8/R7 w - - 0 1",
    sideToMove: "w",
    solution: "Ra7",
    themes: ["decoy"],
    difficulty: "easy",
    explanation: "Rook checks the king along the 7th rank, restricting its escape. Repeating this with the king's support drives the lone king toward the corner. Foundational K+R vs K mating technique.",
    title: "K+R vs K rook check"
  },
  {
    id: "p093",
    fen: "k7/4Q3/2K5/8/8/8/8/8 w - - 0 1",
    sideToMove: "w",
    solution: "Qb7#",
    themes: ["smothered-mate"],
    difficulty: "easy",
    explanation: "Queen-and-king mate against a cornered king. The king on c6 defends the queen on b7, so the black king can't capture; both b8 and a7 are covered by the queen. Foundational K+Q vs K mate pattern.",
    title: "Queen mates cornered king"
  },
  {
    id: "p094",
    fen: "k1q5/8/8/3N4/8/8/8/4K2B w - - 0 1",
    sideToMove: "w",
    solution: "Nb6+ Ka7 Nxc8",
    themes: ["double-check", "fork"],
    difficulty: "medium",
    explanation: "Nb6+ delivers double check from knight (attacks a8) and bishop (long diagonal opens to a8 once knight clears d5). The king's only escape is Ka7 — and the knight on b6 attacks the queen on c8. Nxc8 collects the queen. Double check + fork is a devastating combination.",
    title: "Double check + knight fork"
  },
  {
    id: "p095",
    fen: "2r3k1/5ppp/8/8/8/2Q5/5PPP/6K1 w - - 0 1",
    sideToMove: "w",
    solution: "Qxc8#",
    themes: ["back-rank", "overloading"],
    difficulty: "easy",
    explanation: "Qxc8# — the queen captures the rook AND mates. The black king is hemmed in by its own pawns (f7,g7,h7), and after Qxc8 the queen attacks the entire 8th rank. Doubly satisfying: gain a rook AND deliver mate. The c8 rook was overloaded as the only back-rank defender.",
    title: "Back-rank mate via overloaded rook"
  },
  {
    id: "p096",
    fen: "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "e4",
    themes: ["zwischenzug"],
    difficulty: "easy",
    explanation: "(Composed K+P exercise — pawn advances two squares from its starting position. Basic technique warm-up.)",
    title: "Pawn advance"
  },
  {
    id: "p097",
    fen: "4k3/4r3/8/8/8/8/4R3/4K3 w - - 0 1",
    sideToMove: "w",
    solution: "Rxe7+ Kxe7",
    themes: ["decoy", "removing-the-defender"],
    difficulty: "easy",
    explanation: "Rxe7+ trades rook for rook and decoys the black king to a forward post. Even an even trade can be valuable when it strips defenders or improves piece activity. Companion to p080.",
    title: "Decoy via rook trade"
  },
  {
    id: "p098",
    fen: "r5k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
    sideToMove: "w",
    solution: "Re8+ Rxe8",
    themes: ["overloading", "back-rank"],
    difficulty: "easy",
    explanation: "Re8+ forces a rook trade — even though it's an even exchange, it removes black's only back-rank defender. Once traded off, white's pawn structure isn't threatened anymore. Use this pattern to simplify when ahead.",
    title: "Forced trade simplifies"
  }
];
