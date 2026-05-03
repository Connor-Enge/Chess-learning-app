# Chess Opening Theory: A Repertoire Reference

This document covers the major chess openings at a depth suitable for an intermediate learner who knows piece movement and tactics but wants strategic understanding. For each opening you will find the move order, the tabiya (key reference position) with FEN, the strategic ideas for both sides, typical pawn structures, main lines and key sidelines, common traps, and model games to study.

A note on FEN: the tabiya FENs below are written from the position *after* the moves shown. A FEN like `r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3` means it's Black to move, both sides retain full castling rights, no en-passant target, halfmove clock 3, and we're about to start move 3 for Black.

---

# Part I: 1.e4 e5 — The Open Games

## Italian Game

**Starting moves:** 1.e4 e5 2.Nf3 Nc6 3.Bc4

**Tabiya FEN (after 3.Bc4):** `r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3`

White posts the bishop on the a2-g8 diagonal aiming at f7, the weakest square in Black's camp before castling. The Italian is the oldest open game and has surged back into top-level practice in the 2010s and 2020s as a quieter alternative to the Ruy López.

### Giuoco Piano

**Moves:** 3...Bc5 4.c3 Nf6 5.d3 (the modern "Giuoco Pianissimo") or 5.d4 (older main line).

**Tabiya FEN (5.d3 a6 6.O-O d6 — Italian Pianissimo):** roughly `r1bqk2r/1pp2ppp/p1np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 b kq - 0 6`

**Strategic ideas:**
- **White:** slow build-up with Nbd2-f1-g3, Bb3, h3, Re1; eventual d3-d4 break; sometimes a4 to gain queenside space and prevent ...b5.
- **Black:** mirror setup with ...a6, ...Ba7 (or ...Bb6), ...h6, ...Re8, ...Nbd7-f8-g6; central counter with ...d5 if circumstances permit.

**Pawn structures:** Symmetric c3/d3 vs ...c6/...d6 small-center, often becoming a maneuvering battle that resembles a Closed Spanish.

**Key lines:**
- **Main line Pianissimo:** 5.d3 d6 6.c3 a6 7.Nbd2 Ba7 8.Bb3 0-0 9.h3 with a long maneuvering game.
- **Main line 5.d4:** 5...exd4 6.cxd4 Bb4+ 7.Nc3 (Greco) or 7.Bd2 (Möller). After 7.Nc3 Nxe4 8.O-O Bxc3 9.d5! is the famous Møller Attack.

### Evans Gambit

**Moves:** 3...Bc5 4.b4!?

**Tabiya FEN (after 4.b4):** `r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq - 0 4`

**Idea:** White sacrifices a pawn to gain a tempo (4...Bxb4 5.c3) and build a powerful center with d4. Adolf Anderssen's and Paul Morphy's favorite.

**Main line:** 4...Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O (or 7.cxd4) — White has a huge initiative; if Black ever gets uncoordinated, attacks against f7 and the king come fast.

**Declined:** 4...Bb6 is solid; 5.a4 a6 6.Nc3 is the modern try.

### Two Knights Defence

**Moves:** 3...Nf6

**Tabiya FEN:** `r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4`

Black ignores the threat to f7 and prepares to fight for the initiative.

**Main lines:**
- **4.Ng5 (the "Italian Knight Attack"):** the critical try. After 4...d5 5.exd5 Black has several options:
  - 5...Na5 6.Bb5+ c6 7.dxc6 bxc6 8.Be2 h6 9.Nf3 e4 — the **Knorre Variation**, a long-known pawn sacrifice giving Black a lasting initiative.
  - 5...Nd4 (Fritz/Ulvestad complex), and 5...b5!? (Ulvestad).
  - **5...Nxd5?!** is the **Fried Liver** invitation.
- **4.d4 exd4 5.O-O** (Max Lange) or **5.e5** (Modern Variation/Moeller Attack).
- **4.d3** transposes to Italian Pianissimo lines.

### Fried Liver Attack

**Moves:** 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5? 6.Nxf7! Kxf7 7.Qf3+ Ke6 8.Nc3

**Tabiya FEN (after 8.Nc3):** `r1bq1b1r/ppp2kpp/2n1k3/3np3/2B5/2N2Q2/PPPP1PPP/R1B1K2R b KQ - 3 8` (approx — Black king on e6, White knight on c3)

White sacrifices a knight for a brutal attack against the exposed king. With accurate defense Black can survive (Lolli's analysis), but at club level it's terrifying. Black's correct fifth move is **5...Na5** entering the Knorre, not **5...Nxd5**.

**Trap to know:** After 8.Nc3 Black must play 8...Ncb4 (covering c2 and d5). 8...Nce7? loses to 9.d4! and the attack crashes through.

**Model games:**
- **Anderssen vs Dufresne, Berlin 1852** — the "Evergreen Game" — Evans Gambit, illustrates White's attacking themes.
- **Karjakin vs Anand, Wijk aan Zee 2006** — modern Italian Pianissimo handling.

---

## Ruy López (Spanish Opening)

**Starting moves:** 1.e4 e5 2.Nf3 Nc6 3.Bb5

**Tabiya FEN (after 3.Bb5):** `r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3`

White attacks the knight that defends e5, indirectly pressuring the e-pawn. Despite the threat being only theoretical (after 3...a6 4.Bxc6 dxc6 5.Nxe5 Qd4 regains the pawn), the Spanish remains the deepest, richest opening in chess.

### Berlin Defence

**Moves:** 3...Nf6

**Tabiya FEN:** `r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4`

**The Berlin Wall (4.O-O Nxe4 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8):**
**FEN:** `r1b1kb1r/ppp2ppp/2p5/4Pn2/8/5N2/PPP2PPP/RNB2RK1 w - - 0 9`

A queenless middlegame where Black has the bishop pair but a damaged structure and a king stuck in the center; White has space and a kingside majority. Kramnik used it to dethrone Kasparov in their 2000 world championship match — exposing the difficulty of breaking through at the highest level.

**Strategic ideas:**
- **White:** advance the kingside majority (f4-f5, g4); use the e5 pawn as a wedge; try to trade pieces to convert the structural advantage.
- **Black:** activate the bishops, contest the d-file, push ...c5 to free the queenside, and use the king as a fighting piece (often ...Kc8-b7-c7).

### Closed Spanish (Main Line / Chigorin / Breyer / Zaitsev)

**Moves:** 3...a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3

**Tabiya FEN (after 9.h3):** `r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 b - - 0 9`

White prevents ...Bg4 and prepares d4. Black chooses among:
- **9...Na5 10.Bc2 c5 11.d4** — the **Chigorin** (classical) lines.
- **9...Nb8** — the **Breyer**: regroups via ...Nbd7, ...Bb7, ...c5; one of the most solid and respected systems.
- **9...Bb7** — the **Zaitsev**: pressures e4, prepares ...Re8 and ...Bf8.

**Strategic ideas:**
- **White:** central pressure with d4, knight maneuver Nb1-d2-f1-g3 (Spanish knight trip), eventual kingside attack.
- **Black:** counterattack with ...c5, ...d5 timing, ...Nc6-a5-c4 outpost, queenside expansion or central counter.

**Pawn structure:** the **Spanish small-center** — White pawns on c3, d4, e4 vs Black pawns on c7, d6, e5 — White wants to maintain tension; Black wants to release it favorably with ...exd4.

### Marshall Attack

**Moves:** 8...d5!? (instead of 8...d6)

**Tabiya FEN (after 8...d5):** `r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 9`

Black sacrifices a pawn for crushing piece activity and a long-term initiative against White's king.

**Main line:** 9.exd5 Nxd5 10.Nxe5 Nxe5 11.Rxe5 c6 12.d4 Bd6 13.Re1 Qh4 14.g3 Qh3 — Black's queen and bishops swarm the kingside.

Reduced to near-forced equality at the top level, leading many White players to choose **anti-Marshalls** like 8.a4 or 8.h3 (a3) instead of 8.c3.

### Open Spanish

**Moves:** 5...Nxe4 (instead of 5...Be7)

**Tabiya FEN:** `r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 6`

Black grabs a central pawn and seeks dynamic piece play.

**Main line:** 6.d4 b5 7.Bb3 d5 8.dxe5 Be6 9.Nbd2 (or 9.c3). Black has the e6/d5/c6 chain, queenside space, and active pieces; White has the bishop pair and central pawns.

### Exchange Variation

**Moves:** 4.Bxc6 dxc6 5.O-O

**Tabiya FEN:** `r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 5`

White damages Black's structure and aims for the endgame: 4-vs-3 kingside majority that can produce a passed pawn; Black's queenside 4-vs-3 majority is crippled by doubled c-pawns.

**Main line:** 5...f6 6.d4 exd4 7.Nxd4 c5 8.Nb3 Qxd1 9.Rxd1 — White presses the better pawn structure for many moves.

Lasker, Fischer, and Carlsen have all used the Exchange to grind wins.

**Common Spanish traps:**
- **Noah's Ark Trap:** 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 d6 5.d4 b5 6.Bb3 Nxd4 7.Nxd4 exd4 8.Qxd4? c5 9.Qd5 Be6 10.Qc6+ Bd7 11.Qd5 c4 — the bishop is trapped on b3.
- **Fishing Pole:** ...Ng4 with ...h5 lure motif against careless h3 setups.

**Model games:**
- **Kramnik vs Kasparov, London 2000 (game 1)** — showcase Berlin endgame technique.
- **Capablanca vs Marshall, New York 1918** — debut of the Marshall Attack; Capa defended successfully.

---

## Scotch Game

**Starting moves:** 1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4

**Tabiya FEN (after 4.Nxd4):** `r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4`

White immediately resolves central tension and gets free piece play. Less topical than the Spanish but a Kasparov favorite, revived in his match preparations.

**Main lines:**
- **4...Nf6 5.Nxc6 bxc6 6.e5 Qe7 7.Qe2 Nd5 8.c4 Ba6** — the **Mieses Variation**. Sharp, with imbalanced structures.
- **4...Bc5** (Classical): 5.Nxc6 (or 5.Be3) Qf6 — Black challenges the d4 knight; complications arise.
- **4...Bb4+ 5.c3 Bc5** — the **Schmidt** with quick development.

**Strategic ideas:**
- **White:** central space, easy development, target the d6/e6 squares.
- **Black:** open lines, piece activity, sometimes ...Qf6 or ...Qh4 putting pressure early.

**Pawn structure:** typically Black ends up with doubled c-pawns vs White's e- and c-pawns; Black gets the bishop pair as compensation.

**Scotch Gambit** (4.Bc4 instead of 4.Nxd4) leads to many of the Italian/Two Knights structures.

**Model game:** Kasparov vs Karpov, Linares 1993 — classic Mieses Scotch, Kasparov's piece play overwhelms Black's queenside.

---

## Vienna Game

**Starting moves:** 1.e4 e5 2.Nc3

**Tabiya FEN:** `rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2`

Less common at top level but tricky and full of ideas. White keeps options for an early f4 (Vienna Gambit) or a quiet positional setup.

**Main lines:**
- **2...Nf6 3.f4** — the **Vienna Gambit**. After 3...d5! 4.fxe5 Nxe4 5.Nf3 Be7 (or 5...Bb4) Black equalizes; 3...exf4? 4.e5 wins the knight tactics.
- **2...Nf6 3.Bc4 Nxe4!?** — the **Frankenstein-Dracula Variation**: 4.Qh5 Nd6 5.Bb3 Nc6 6.Nb5 g6 7.Qf3 f5 8.Qd5 Qe7 9.Nxc7+ Kd8 10.Nxa8 — wild material imbalances.
- **2...Nc6 3.g3** — quiet positional treatment.

**Idea:** transition to the King's Gambit-like attacks while keeping more flexibility.

---

## King's Gambit

**Starting moves:** 1.e4 e5 2.f4

**Tabiya FEN:** `rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2`

The romantic gambit par excellence. White offers a pawn to deflect Black's e-pawn, gain a central majority, and open the f-file for a kingside attack.

### Accepted (KGA)

**2...exf4** — and the main lines:

- **3.Nf3 g5** — the **Classical KGA**. White's typical responses: 4.h4 g4 5.Ne5 (Kieseritzky Gambit), or 4.Bc4 (Muzio territory after 4...Bg7 5.O-O gxf3).
- **3.Nf3 d6** — the modern **Fischer Defence**, designed to neutralize White's attack with a solid setup.
- **3.Bc4** — the **Bishop's Gambit**.

**Muzio Gambit:** 1.e4 e5 2.f4 exf4 3.Nf3 g5 4.Bc4 g4 5.O-O!? — sacrifices a piece for a furious attack.

### Declined (KGD)

- **2...Bc5** — the **Classical Declined**. Black retains the option of ...d6, and discourages White's Bc4-Bxf7+ tricks.
- **2...d5** — the **Falkbeer Counter-Gambit**: 3.exd5 e4!? grabbing initiative back.

**Strategic ideas:**
- **White:** open f-file, central duo e4+d4, kingside attack with Bc4 + Qe2/Qf3.
- **Black:** hold the f4 pawn, develop quickly, exploit the weakened white king position (often punish with ...Qh4+).

**Trap:** 1.e4 e5 2.f4 exf4 3.Bc4 Qh4+? 4.Kf1 — the queen is misplaced and White gets free tempi.

**Model games:**
- **Anderssen vs Kieseritzky, London 1851** — the "Immortal Game".
- **Spassky vs Bronstein, Leningrad 1960** — gem of attacking technique.
- **Fischer's "A Bust to the King's Gambit" (1961)** — proposed 3...d6 as a refutation; not actually a refutation but slowed the opening's popularity.

---

## Petroff Defence (Russian Defence)

**Starting moves:** 1.e4 e5 2.Nf3 Nf6

**Tabiya FEN:** `rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3`

A symmetric counter that aims for solidity and equality. Black ignores the threat to e5 and creates one of his own.

**Main lines:**
- **3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5 6.Bd3** — the classical main line; Black has equalized at the top level for decades.
- **3.d4 exd4 4.e5 Ne4 5.Qxd4** — leads to imbalanced positions with bishop pair vs central pawns.
- **3.Nc3 Nc6** transposes to the Four Knights.

**Strategic ideas:**
- **White:** small initiative from the first move, look for piece play in the center.
- **Black:** symmetry-breaking ...Nxe4 followed by precise piece coordination; aim for endgame equality.

**Pawn structure:** isolated d-pawn structures often arise after central exchanges.

**Trap:** 1.e4 e5 2.Nf3 Nf6 3.Nxe5 Nxe4? 4.Qe2 (or 4.Qe2 Nf6 5.Nc6+! winning the queen). Black should always play 3...d6 first!

**Model games:**
- **Karpov vs Yusupov, Bugojno 1986** — White tries to squeeze; Black holds.
- **Caruana vs Carlsen, World Championship 2018 (multiple games)** — Carlsen used the Petroff to neutralize Caruana's white preparation.

---

## Philidor Defence

**Starting moves:** 1.e4 e5 2.Nf3 d6

**Tabiya FEN:** `rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3`

Philidor's old recommendation: pawns are the soul of chess; defend e5 with the d-pawn rather than a piece. Modern handling treats it as a solid but slightly passive system.

**Main lines:**
- **3.d4 Nf6 4.Nc3 Nbd7** — the **Hanham Variation** (modern treatment): solid Indian-style setup with ...e5/...d6/...Be7/...c6.
- **3.d4 exd4 4.Nxd4** — White just gets a comfortable game.
- **3.Bc4 Be7 4.d4** — Larsen's recommendation.

**Strategic ideas:**
- **White:** central space, comfortable development, target the slight passivity of Black's setup.
- **Black:** patience, restrain White's center, look for ...c6 + ...d5 or ...exd4 + ...d5 break.

**Trap (Légal's Mate):** 1.e4 e5 2.Nf3 d6 3.Bc4 Bg4? 4.Nc3 g6? 5.Nxe5! Bxd1?? 6.Bxf7+ Ke7 7.Nd5#.

**Model game:** Morphy vs Duke of Brunswick & Count Isouard, Paris Opera 1858 — the most famous miniature in chess; Philidor mishandled by Black, brilliant attacking by Morphy.

---

# Part II: 1.e4 — Semi-Open Games

## Sicilian Defence

**Starting moves:** 1.e4 c5

**Tabiya FEN:** `rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`

The most popular and combative response to 1.e4. Black accepts an asymmetric structure, fighting for the d4 square and the c-file. Statistically Black scores better with the Sicilian than with any other reply to 1.e4.

### Open Sicilians (2.Nf3 followed by 3.d4)

After **1.e4 c5 2.Nf3 d6 (or 2...Nc6 / 2...e6) 3.d4 cxd4 4.Nxd4**:
**FEN (after 4.Nxd4 from 2...d6 3.d4 cxd4):** `rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4`

This is the gateway to the major Sicilian variations.

#### Najdorf

**Moves:** 4...Nf6 5.Nc3 a6

**Tabiya FEN (after 5...a6):** `rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6`

Black's flexible 5...a6 prevents Nb5 and prepares ...e5 or ...e6. The Najdorf is the deepest, most theory-heavy Sicilian variation. Bobby Fischer and Garry Kasparov used it as their main weapon.

**Main White tries:**
- **6.Be3** (English Attack): Be3, f3, Qd2, O-O-O, g4-g5 attack. Razor-sharp.
- **6.Bg5** (Main Line / Najdorf Poisoned Pawn after 6...e6 7.f4 Qb6!?): mutual king attacks, deep theory.
- **6.Be2** (Classical): solid, restrained.
- **6.Bc4** (Fischer-Sozin Attack): bishop on b3 aiming at f7; aggressive.
- **6.f3** (English Attack hybrid).
- **6.h3** (Adams Attack).

**Strategic ideas:**
- **Black:** central control with ...e5 (Najdorf-Boleslavsky) or ...e6 (Scheveningen-style); queenside counterattack with ...b5, ...Bb7, ...Nbd7-b6; if White castles long, race for the king.
- **White:** kingside pawn storm, central piece play (Nd5 outpost), attack the d6/e6 weaknesses.

#### Dragon

**Moves:** 4...Nf6 5.Nc3 g6

**Tabiya FEN:** `rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPPP1PPP/R1BQKB1R w KQkq - 0 6`

Black fianchettoes the king's bishop (the "dragon" pawn formation) for active piece play.

**Main line — Yugoslav Attack:** 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.Bc4 (or 9.O-O-O) — White castles long and pawn-storms with h4-h5; Black counterattacks with ...Rc8, ...Ne5/Nc4, sacrificial breakthroughs (...Rxc3!).

**Strategic ideas:** mutual king attacks. Both sides race; the side that opens lines first usually wins.

**Famous trap:** in some Yugoslav lines White's Nd5 sac followed by sacrificing the queen for two pieces and an attack.

#### Sveshnikov

**Moves:** 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5

**Tabiya FEN:** `r1bqkb1r/pp1p1ppp/2n2n2/4p3/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6`

Black voluntarily creates a backward d-pawn and a hole on d5 in exchange for active piece play and the bishop pair. Magnus Carlsen used the Sveshnikov in his 2018 World Championship match.

**Main line:** 6.Ndb5 d6 7.Bg5 a6 8.Na3 b5 9.Bxf6 gxf6 (or 9...Qxf6) 10.Nd5.

**Strategic ideas:**
- **White:** occupy d5, exchange Black's good defenders, slowly outplay Black on the kingside.
- **Black:** dynamic piece play, ...f5 break for activity, bishop pair pressure on White's king.

#### Taimanov

**Moves:** 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 Nc6

**Tabiya FEN:** `r1bqkbnr/pp1p1ppp/2n1p3/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5`

A flexible setup keeping all options open. Black hasn't committed to ...Nf6 or ...d6.

**Main line:** 5.Nc3 Qc7 6.Be3 a6 7.Qd2 Nf6 — Black builds up slowly with ...b5, ...Bb7.

#### Scheveningen

**Moves:** 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6

**Tabiya FEN:** `rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6`

The "small center" Sicilian: pawns on d6 and e6. Most often reached via Najdorf move-order (5...a6 6.Be2 e6) to avoid the Keres Attack (6.g4!).

**Strategic ideas:** Black aims for ...Nc6, ...Be7, ...O-O, ...a6, ...Qc7, ...b5. White can play the English Attack, Classical setup, or Keres Attack.

#### Kan (Paulsen)

**Moves:** 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6

**Tabiya FEN:** `rnbqkbnr/1p1p1ppp/p3p4/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5`

Like a Najdorf without ...Nf6 yet. Flexible and avoids many sharp main lines. Black often plays ...Qc7, ...Nf6, ...Bb4, ...Nc6 or ...d6.

**Main line:** 5.Bd3 Bc5 6.Nb3 Be7 7.Qg4 — Maroczy bind setups also possible after 5.c4.

#### Accelerated Dragon

**Moves:** 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6

**Tabiya FEN:** `r1bqkbnr/pp1ppp1p/2n3p1/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5`

Black plays the Dragon a tempo earlier, hoping to either skip ...d6 (going ...d5 in one move) or avoid the Yugoslav Attack.

**Critical reply — Maróczy Bind:** 5.c4! Nf6 6.Nc3 d6 7.Be2 — White establishes c4+e4 pawns clamping the position. Black aims for ...a6, ...Bd7, ...Nxd4, ...Bc6.

**Hyper-Accelerated Dragon:** 1.e4 c5 2.Nf3 g6.

#### Classical Sicilian

**Moves:** 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 Nc6

**Tabiya FEN:** `r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6`

The "natural" development. Today often transposed from other lines.

**Main responses:** 6.Bg5 (Richter-Rauzer — White's most common setup, plans Qd2/O-O-O), 6.Bc4 (Sozin), 6.Be2 (Classical Boleslavsky structures arise).

**Richter-Rauzer main line:** 6.Bg5 e6 7.Qd2 a6 8.O-O-O Bd7 9.f4 — opposite-side castling fight.

### Anti-Sicilians

#### Alapin (c3 Sicilian)

**Moves:** 1.e4 c5 2.c3

**Tabiya FEN:** `rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2`

White prepares d4 with c3 support, transposing to a Queen's-pawn-style center. Considered one of the most reliable anti-Sicilians.

**Main lines:**
- **2...d5 3.exd5 Qxd5 4.d4 Nf6 5.Nf3 e6 6.Bd3** — Black avoids Sicilian sharpness; structures resemble French/Tarrasch.
- **2...Nf6 3.e5 Nd5 4.Nf3 Nc6 5.Bc4** — Alekhine-style positions.

#### Smith-Morra Gambit

**Moves:** 1.e4 c5 2.d4 cxd4 3.c3

**Tabiya FEN:** `rnbqkbnr/pp1ppppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3`

White sacrifices a pawn for fast development and open lines. Pet weapon at club level; less scary at master level after the **Siberian Defence** lines (3...dxc3 4.Nxc3 Nc6 5.Nf3 e6 6.Bc4 a6 7.O-O Nge7).

**Main accepted line:** 3...dxc3 4.Nxc3 Nc6 5.Nf3 d6 6.Bc4 — White has free-flowing piece play.

**Declining:** 3...Nf6 (transposing to Alapin) or 3...d3 (returning the pawn) is recommended at master level.

#### Closed Sicilian

**Moves:** 1.e4 c5 2.Nc3 Nc6 3.g3 g6 4.Bg2 Bg7 5.d3

**Tabiya FEN:** `r1bqk1nr/pp1pppbp/2n3p1/2p5/4P3/2NP2P1/PPP2P1P/R1BQK1NR w KQkq - 1 6` (approx)

White avoids opening the position, keeps the d-pawn back, and plans f4-f5 kingside attack. Spassky's favorite.

**Strategic ideas:**
- **White:** kingside expansion (f4, Nf3, O-O, Be3, Qd2), eventual f5.
- **Black:** queenside expansion (...Rb8, ...b5, ...Nd4), maneuver knights to good squares.

#### Grand Prix Attack

**Moves:** 1.e4 c5 2.Nc3 Nc6 3.f4 (or 2.f4 or 2.Nc3+3.f4)

A direct attacking system. White plays Nf3, Bb5 (or Bc4), O-O, and aims for f5 against Black's kingside. Most effective at club level; Black counters with ...g6 setups (...Bg7) or ...e6 setups (...d5 break).

### Sicilian model games

- **Fischer vs Larsen, Portoroz 1958** — Najdorf Sozin Attack, instructive piece sacrifice.
- **Karpov vs Kasparov, World Championship 1985 (game 16)** — Sicilian Scheveningen, Kasparov's revolutionary attack.
- **Anand vs Kasparov, World Championship 1995 (game 11)** — Najdorf English Attack, Anand's Rxh7! sacrifice.
- **Carlsen vs Caruana, World Championship 2018 (game 12)** — Sveshnikov, Carlsen's championship preparation showcase.

---

## French Defence

**Starting moves:** 1.e4 e6

**Tabiya FEN:** `rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`

A solid system that prepares ...d5. Black accepts a passive light-squared bishop ("the French bishop") in exchange for a solid pawn structure and a clear strategic plan.

After **2.d4 d5** the structures branch.

### Winawer

**Moves:** 3.Nc3 Bb4

**Tabiya FEN:** `rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4`

Black pins the c3 knight and threatens ...dxe4. The most ambitious Black system.

**Main line:** 4.e5 c5 5.a3 Bxc3+ 6.bxc3 Ne7 7.Qg4 — Black accepts doubled c-pawns and a damaged kingside in exchange for the bishop pair and central counterplay.

**Tabiya after 7.Qg4:** `rnbqk2r/ppp1nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR b KQkq - 1 7` (approx)

**Strategic ideas:**
- **Black:** undermine d4 with ...c5, ...Nc6, ...Qa5+/Qc7; counterplay on the queenside.
- **White:** kingside attack with Qg4, Bd3, Nf3, h4-h5; exploit the dark-square weaknesses around Black's king.

### Tarrasch

**Moves:** 3.Nd2

**Tabiya FEN:** `rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3`

White avoids the Winawer pin. Black's main replies:
- **3...Nf6** (Closed Tarrasch): 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 — French structures with White's knight on e2 blocking the bishop.
- **3...c5** (Open Tarrasch): 4.exd5 exd5 (symmetrical IQP) or 4.exd5 Qxd5 (sharper).
- **3...Be7** — flexible setup.

### Advance Variation

**Moves:** 3.e5

**Tabiya FEN:** `rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3`

White grabs space immediately. Black challenges the chain with ...c5.

**Main line:** 3...c5 4.c3 Nc6 5.Nf3 Qb6 6.a3 (preparing b4) or 6.Be2.

**Strategic ideas:**
- **White:** maintain the e5/d4 pawn chain, kingside attack with Bd3, h4, Nf3-g5.
- **Black:** undermine the chain with ...c5 and ...f6, develop pieces actively (...Nge7 to f5, ...Bd7-b5).

### Classical French

**Moves:** 3.Nc3 Nf6

**Tabiya FEN:** `rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4`

Black develops naturally. White's choices:
- **4.e5 Nfd7 5.f4** (Steinitz Variation) — White builds a big center.
- **4.Bg5 Be7 5.e5 Nfd7 6.Bxe7 Qxe7** — solid main line.
- **4.Bg5 dxe4** (Burn Variation) — Black simplifies.

### MacCutcheon

**Moves:** 3.Nc3 Nf6 4.Bg5 Bb4

**Tabiya FEN:** `rnbqk2r/ppp2ppp/4pn2/3p2B1/1b1PP3/2N5/PPP2PPP/R2QKBNR w KQkq - 4 5`

A combative pin-and-counterpin variation. Main line: 5.e5 h6 6.Bd2 Bxc3 7.bxc3 Ne4 — sharp positions with mutual chances.

### Exchange Variation

**Moves:** 3.exd5 exd5

**Tabiya FEN:** `rnbqkbnr/ppp2ppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4`

White releases tension and seeks a quiet game. Symmetrical, but White has the initiative; Black must develop carefully. Black's setup: ...Bd6, ...Nf6, ...O-O, ...Re8, ...c6.

**Common French traps:**
- **Milner-Barry Gambit (Advance):** 3.e5 c5 4.c3 Nc6 5.Nf3 Qb6 6.Bd3 cxd4 7.cxd4 Bd7 8.O-O Nxd4? 9.Nxd4 Qxd4 10.Nc3 — White's lead in development can become decisive.

**Model games:**
- **Botvinnik vs Capablanca, AVRO 1938** — Winawer, the "Botvinnik Combination"; one of the most beautiful positional + tactical wins ever.
- **Korchnoi vs Karpov, Baguio 1978 (game 21)** — Winawer, Karpov's grinding technique.

---

## Caro-Kann Defence

**Starting moves:** 1.e4 c6

**Tabiya FEN:** `rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`

Black prepares ...d5 without locking in the light-squared bishop (unlike the French). Reputation: solid, drawish, but with great winning chances against impatient White players. Karpov's main weapon for decades.

After **2.d4 d5** the main systems branch.

### Classical (Capablanca)

**Moves:** 3.Nc3 (or 3.Nd2) dxe4 4.Nxe4 Bf5

**Tabiya FEN:** `rn1qkbnr/pp2pppp/2p5/5b2/4N3/8/PPPP1PPP/R1BQKBNR w KQkq - 1 5`

Black develops the "French bishop" actively before playing ...e6. The Classical's greatest strength: a healthy structure with active piece play.

**Main line:** 5.Ng3 Bg6 6.h4 h6 7.Nf3 Nd7 8.h5 Bh7 9.Bd3 Bxd3 10.Qxd3 — opposite-side castling often follows; technical middlegames.

### Karpov / Smyslov 4...Nd7

**Moves:** 3.Nc3 dxe4 4.Nxe4 Nd7

**Tabiya FEN:** `r1bqkbnr/pp1npppp/2p5/8/4N3/8/PPPP1PPP/R1BQKBNR w KQkq - 2 5`

A more flexible setup; the knight goes to f6 to challenge the Ne4. Karpov used this his entire career.

**Main line:** 5.Ng5 (sharp) Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.Qe2 — White tries to attack; Black holds with precise defense.

### Advance Variation

**Moves:** 3.e5

**Tabiya FEN:** `rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3`

Like the French Advance, but Black's bishop gets out before ...e6.

**Main line:** 3...Bf5 4.Nf3 e6 5.Be2 c5 (or 5...Nd7) — Black aims for ...Nge7-f5 or ...c5 break.

**Short Variation:** 4.Nf3 e6 5.Be2 — quiet positional approach popularized by Nigel Short.

**Tal/Bayonet:** 3.e5 Bf5 4.h4!? — sharp pawn-storm attempt.

### Exchange

**Moves:** 3.exd5 cxd5 4.Bd3

**Tabiya FEN:** `rnbqkbnr/pp2pppp/8/3p4/3P4/3B4/PPP2PPP/RNBQK1NR b KQkq - 1 4`

Quiet symmetrical structure. White hopes to play c2-c3, slow buildup, and squeeze.

### Panov-Botvinnik Attack

**Moves:** 3.exd5 cxd5 4.c4

**Tabiya FEN:** `rnbqkbnr/pp2pppp/8/3p4/2PP4/8/PP3PPP/RNBQKBNR b KQkq - 0 4`

A Queen's Gambit-style position with isolated queen pawn structures. Black plays 4...Nf6 5.Nc3 e6 (or 5...g6 — Grünfeld-like) 6.Nf3 Be7 7.cxd5 Nxd5 — IQP arises.

**Strategic ideas:**
- **White:** active piece play around the IQP; threats of d4-d5 break, kingside attack.
- **Black:** blockade d5, exchange pieces to reach a favorable endgame.

### Two Knights

**Moves:** 2.Nc3 d5 3.Nf3 (or 2.Nf3 d5 3.Nc3)

**Tabiya FEN (after 3.Nf3):** `rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 1 3`

Avoids main-line theory. Black usually plays 3...Bg4 4.h3 Bxf3 5.Qxf3 e6 (Mieses Variation) — White has the bishop pair, Black is solid.

### Caro-Kann traps

- **Tal Variation trap:** 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nf6 5.Nxf6+ exf6 6.Bc4 Bd6 7.Qe2+ Be7 8.Nf3 O-O 9.O-O — careful with development.
- **Fantasy Variation tactics (3.f3):** sharp tactical play; a Bronstein favorite.

**Model games:**
- **Karpov vs Pomar, Las Palmas 1977** — Classical Caro-Kann, model handling.
- **Topalov vs Karpov, Dos Hermanas 1994** — exemplifies the Karpov 4...Nd7 setup.

---

## Scandinavian Defence (Center Counter)

**Starting moves:** 1.e4 d5

**Tabiya FEN:** `rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`

The most direct challenge to e4: trade pawns immediately.

After **2.exd5**:

**Main lines:**
- **2...Qxd5 3.Nc3 Qa5** (Mieses) — main line: 4.d4 Nf6 5.Nf3 c6 6.Bc4 Bf5 (or 6...Bg4) — Black gets a solid French/Caro-like structure with the queen's bishop developed actively.
- **2...Qxd5 3.Nc3 Qd6** (Bronstein/Tiviakov) — modern flexible queen retreat.
- **2...Qxd5 3.Nc3 Qd8** — solid retreat.
- **2...Nf6** (Modern Scandinavian / Marshall): 3.d4 Nxd5 4.c4 Nb6 (Black accepts a tempo loss but avoids exposing the queen) or 3.c4 c6 (gambit for development).

**Strategic ideas:**
- **Black:** trade off the e-pawn early, develop pieces to natural squares, adopt Caro-Kann-style structures.
- **White:** use development tempo from harassing the queen, get a small but persistent edge.

**Pawn structure:** Caro-Kann-like: White pawn on d4, Black pawn on c6.

**Key trap:** 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 Nf6 5.Bd2 c6? 6.Nd5! — pin tactics on the queen.

**Model game:** Anand vs Lautier, Biel 1997 — White converts the small opening edge; useful for understanding both sides.

---

## Pirc Defence and Modern Defence

### Pirc

**Starting moves:** 1.e4 d6 2.d4 Nf6 3.Nc3 g6

**Tabiya FEN (after 3...g6):** `rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4`

A hypermodern reply: Black lets White build a big center, then attacks it.

**Main lines:**
- **4.Nf3 Bg7 5.Be2 O-O 6.O-O** — the **Classical Pirc**. Quiet, strategic.
- **4.f4 Bg7 5.Nf3 O-O 6.Bd3 (or 6.Be2)** — the **Austrian Attack**. White sets up a huge pawn front (e4, d4, f4) and aims for kingside attack with f5.
- **4.Be3 Bg7 5.Qd2 c6 6.f3** — the **150 Attack** (named after a 150 ECF rating threshold; ironic given how strong the system is). Bayonet attack with O-O-O and h4-h5.
- **4.Bg5** — pin to provoke ...c6/...h6 weaknesses.

**Strategic ideas:**
- **Black:** counter the center with ...c5, ...e5, or ...Nc6+...Bg4; wait and strike.
- **White:** convert the space advantage with attacks; punish over-passive play.

### Modern Defence

**Starting moves:** 1.e4 g6 2.d4 Bg7

**Tabiya FEN (after 2...Bg7):** `rnbqk1nr/ppppppbp/6p1/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 2 3`

Like the Pirc but Black delays ...Nf6, retaining flexibility. Often transposes to Pirc lines.

**Hippopotamus Setup:** 1.e4 g6 2.d4 Bg7 3.Nc3 d6 4.f4 a6 5.Nf3 b5 6.Bd3 Bb7 7.O-O Nd7 8.Be3 Ne7 — Black sets up pawns on the third rank and waits.

**Trap:** 1.e4 g6 2.d4 Bg7 3.Nc3 c6?! 4.Bc4 d6 5.Qf3 e6 6.Nge2 Ne7? 7.Bg5 — pressure on f7 + e6.

**Model games:**
- **Karpov vs Timman, Skelleftea 1989** — Classical Pirc, model White play.
- **Tony Miles vs Karpov, Skara 1980** — the famous **1...a6** game (a Modern-related provocation); illustrates the ideas of provocative defense.

---

## Alekhine Defence

**Starting moves:** 1.e4 Nf6

**Tabiya FEN:** `rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2`

Black provokes White into overextending the center, then attacks the pawn chain.

**Main lines:**
- **2.e5 Nd5 3.d4 d6 4.Nf3 (or 4.c4 Nb6 5.f4 — Four Pawns Attack)** — main lines:
  - **Modern Variation:** 3.d4 d6 4.Nf3 Bg4 (or 4...g6 5.Bc4) — flexible piece development.
  - **Four Pawns Attack:** 4.c4 Nb6 5.f4 — an aggressive try; Black plays 5...dxe5 6.fxe5 Nc6 with active counterplay.
  - **Exchange:** 4.c4 Nb6 5.exd6 cxd6 (or 5...exd6) — quiet structures, slight White edge.
- **2.Nc3** — declining the challenge; can transpose to Vienna or other openings.

**Strategic ideas:**
- **Black:** harass the e5/d4/c4 chain with ...d6, ...Bg4, ...g6, ...Bg7, ...Nc6; aim for ...e6/...c5 breaks.
- **White:** maintain the pawn chain, complete development, exploit Black's slight passivity.

**Trap:** 1.e4 Nf6 2.e5 Nd5 3.c4 Nb6 4.c5 Nd5 5.Bc4 e6? 6.Nc3 — knight pressure.

**Model game:** Fischer vs Spassky, World Championship 1972 (game 13) — an Alekhine's defense played by Spassky; interesting modern Alekhine handling.

---

# Part III: 1.d4 d5 — Closed Games

## Queen's Gambit Accepted (QGA)

**Starting moves:** 1.d4 d5 2.c4 dxc4

**Tabiya FEN:** `rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3`

Black takes the pawn but typically returns it for a comfortable game with rapid development.

**Main lines:**
- **3.Nf3 Nf6 4.e3 e6 5.Bxc4 c5 6.O-O a6 7.Bb3 (or 7.dxc5)** — the main line. Black aims for ...Nc6, ...b5, ...Bb7.
- **3.e4** — the **Central Variation**: White grabs a big center; Black plays 3...e5 (or 3...Nc6, 3...c5) for active piece play.
- **3.Nc3** — flexible.

**Strategic ideas:**
- **White:** central majority, isolated d-pawn arises after ...c5 exchange; uses bishop pair and active pieces.
- **Black:** queenside expansion, simplification, target the d-pawn.

**Pawn structure:** often **isolated queen pawn (IQP)** for White on d4, leading to dynamic positions with mutual chances.

**Trap:** 1.d4 d5 2.c4 dxc4 3.Nf3 b5? 4.a4 c6 5.axb5 cxb5 6.Qf3! — winning material.

**Model game:** Karpov vs Kasparov, World Championship 1986 (game 14) — Karpov's positional handling of QGA.

---

## Queen's Gambit Declined (QGD)

**Starting moves:** 1.d4 d5 2.c4 e6

**Tabiya FEN:** `rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3`

The classical Black defense. After 3.Nc3 Nf6 4.Bg5 (or 4.Nf3) we get the main lines.

### Orthodox

**Moves:** 4.Bg5 Be7 5.e3 O-O 6.Nf3 Nbd7 7.Rc1 c6 8.Bd3 dxc4 9.Bxc4 Nd5

**Tabiya FEN (after 9...Nd5):** ~`r1bq1rk1/pp1nbppp/2p1p3/3n2B1/2BP4/2N1PN2/PP3PPP/2RQK2R w K - 1 10`

The classical "Capablanca freeing maneuver": ...Nd5 to exchange pieces and ease the cramp. Solid but sometimes leads to passive endgames.

### Tartakower

**Moves:** 4.Bg5 Be7 5.e3 O-O 6.Nf3 h6 7.Bh4 b6

**Tabiya FEN (after 7...b6):** `rnbq1rk1/p1p1bpp1/1p2pn1p/3p4/2PP3B/4PN2/PP3PPP/RN1QKB1R w KQ - 0 8` (approx)

Black fianchettoes the queen's bishop, aiming for a flexible setup with great long-term prospects. Used by Spassky, Kasparov, and many others.

**Main line:** 8.cxd5 Nxd5 9.Bxe7 Qxe7 10.Nxd5 exd5 11.Rc1 Be6 12.Qa4 — minority attack or piece play possibilities.

### Lasker Defence

**Moves:** 4.Bg5 Be7 5.e3 O-O 6.Nf3 h6 7.Bh4 Ne4

**Tabiya FEN (after 7...Ne4):** `rnbq1rk1/ppp1bpp1/4p2p/3p4/2PPn2B/4PN2/PP3PPP/RN1QKB1R w KQ - 1 8`

Black exchanges pieces to relieve the cramp.

**Main line:** 8.Bxe7 Qxe7 9.cxd5 Nxc3 10.bxc3 exd5 — Black equalizes with simple play.

### Cambridge Springs

**Moves:** 4.Bg5 Nbd7 5.e3 c6 6.Nf3 Qa5

**Tabiya FEN (after 6...Qa5):** `r1b1kb1r/pp1n1ppp/2p1pn2/q2p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQkq - 5 7`

The queen on a5 pins the c3 knight and creates threats of ...Ne4 and ...Bb4. White must be careful: 7.Nd2 (preparing Bxf6) or 7.cxd5 are main responses.

**Trap:** 4.Bg5 Nbd7 5.cxd5 exd5 6.Nxd5?? Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8 — Black is up a piece (the **Elephant Trap**).

### Exchange Variation (Carlsbad Structure)

**Moves:** 3.Nc3 Nf6 4.cxd5 exd5

**Tabiya FEN:** `rnbqkb1r/ppp2ppp/5n2/3p4/3P4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5`

White voluntarily resolves the central tension to play the **minority attack**: pushing b4-b5 to create a weakness on c6.

**Main line:** 5.Bg5 c6 6.e3 Be7 7.Bd3 O-O 8.Qc2 Nbd7 9.Nf3 Re8 10.O-O — White prepares b4-b5; Black counters with kingside play (...Nf8-g6, ...Ne4) or central break (...c5).

**Strategic ideas:**
- **White:** minority attack on the queenside (b2-b4-b5), creating a backward c-pawn for Black; alternatively, kingside attack with f3+e4.
- **Black:** kingside piece activity, central break with ...c5 or ...Ne4, sometimes the famous Botvinnik formation with ...Nf8-Ng6.

**Pawn structure (Carlsbad):** White pawns on a2/b2/d4/e3/f2/g2/h2 vs Black pawns on a7/b7/c6/d5/f7/g7/h7 — defines a whole strategic universe.

**Model games:**
- **Capablanca vs Alekhine, World Championship 1927** — multiple QGD games shape modern theory.
- **Karpov vs Kasparov, World Championship 1984/85** — many Carlsbad/QGD examples.

---

## Slav Defence

**Starting moves:** 1.d4 d5 2.c4 c6

**Tabiya FEN:** `rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3`

The "Slav Triangle": Black supports the d5 pawn with the c-pawn, retaining the option to develop the c8-bishop outside the pawn chain (unlike the QGD).

### Main Line Slav

**Moves:** 3.Nf3 Nf6 4.Nc3 dxc4

**Tabiya FEN (after 4...dxc4):** `rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5`

**Main line:** 5.a4 Bf5 6.e3 e6 7.Bxc4 Bb4 — the classical line; Black has comfortable development and solid structure.

**Strategic ideas:**
- **Black:** develop the c8-bishop to f5 or g4 actively (the bishop's freedom is the Slav's main advantage).
- **White:** central pressure and slight initiative; the a2-a4 to prevent ...b5 is the standard plan.

### Chebanenko Slav

**Moves:** 3.Nf3 Nf6 4.Nc3 a6

**Tabiya FEN:** `rnbqkb1r/1p2pppp/p1p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5`

A flexible modern setup: Black prepares ...b5, ...Bb7, ...Nbd7, retaining all options. Very popular in modern correspondence and engine practice.

**Main line:** 5.c5 (or 5.e3) — White grabs queenside space; Black plays 5...Nbd7, ...e5 break.

### Other Slavs

- **Exchange Slav:** 3.cxd5 cxd5 — symmetric; quiet but rich in subtle nuances. White can try to exploit minimal initiative.
- **Slow Slav:** 3.Nf3 Nf6 4.e3 Bf5 — Black gets the bishop out before White plays Nc3.

**Slav trap:** 1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5 6.Ne5 Nbd7 7.Nxc4 Qc7 8.g3 e5! — central counterstrike.

**Model game:** Karpov vs Kasparov, World Championship 1985 (game 24) — championship-deciding Slav.

---

## Semi-Slav

**Starting moves:** 1.d4 d5 2.c4 e6 3.Nc3 c6 (or 3.Nf3 Nf6 4.Nc3 c6 / 3.Nc3 Nf6 4.Nf3 c6)

**Tabiya FEN (after 3.Nc3 c6 — but typically reached via 1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6):**
~`rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5`

Black combines Slav (...c6) and QGD (...e6) ideas. Extremely rich strategically.

After **5.Bg5** (Anti-Meran) or **5.e3** (Meran setup) we get the main branches.

### Meran

**Moves:** 5.e3 Nbd7 6.Bd3 dxc4 7.Bxc4 b5

**Tabiya FEN (after 7...b5):** `r1bqkb1r/p2n1ppp/2p1pn2/1p6/2BP4/2N1PN2/PP3PPP/R1BQK2R w KQ - 0 8`

Black's direct attempt at queenside expansion. After 8.Bd3 a6 9.e4 c5 10.e5 cxd4 11.Nxb5 axb5 12.exf6 — sharp combinations.

**Strategic ideas:** dynamic, double-edged play; both sides have clear plans (White: central break and kingside attack; Black: queenside expansion and pressure).

### Anti-Meran (Bg5)

**Moves:** 5.Bg5 (or 5.Bf4) — pinning the knight to discourage ...dxc4 + ...b5 plans.

**Main lines:**
- **5...h6 6.Bxf6 Qxf6 7.e3** — the **Moscow Variation**.
- **5...Nbd7 6.e3 Qa5 (Cambridge Springs)** — classical.

### Botvinnik System

**Moves:** 5.Bg5 dxc4 6.e4 b5 7.e5 h6 8.Bh4 g5 9.Nxg5 hxg5 10.Bxg5 Nbd7

**Tabiya FEN (after 10...Nbd7):** ~`r1bqkb1r/p2n1p2/2p1pn2/1p2P1B1/2pP4/2N5/PP3PPP/R2QKB1R w KQkq - 1 11`

The Botvinnik is a piece sacrifice for a massive central wedge and long-term initiative. Theory has been calculated 30+ moves deep. Reserved for combative players willing to memorize.

### Moscow Variation

**Moves:** 5.Bg5 h6 6.Bh4 (or 6.Bxf6)

**Tabiya FEN (6.Bxf6 Qxf6):** `rnb1kb1r/pp3ppp/2p1pq2/3p4/2PP4/2N2N2/PP2PPPP/R2QKB1R w KQkq - 0 7`

Less sharp than Botvinnik. Black has the bishop pair; White has space and a slight structural pull.

**Anti-Moscow Gambit:** 5.Bg5 h6 6.Bh4 dxc4 — sharp gambit lines arise.

**Model game:** Topalov vs Kramnik, World Championship 2006 (game 2) — Anti-Moscow Gambit; modern handling of the material imbalance.

---

## Chigorin Defence

**Starting moves:** 1.d4 d5 2.c4 Nc6

**Tabiya FEN:** `r1bqkbnr/ppp1pppp/2n5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3`

Black blocks his c-pawn but gains rapid piece development and the bishop pair after typical exchanges. Used by Chigorin himself and revived by Morozevich.

**Main lines:**
- **3.Nc3 Nf6** transposes to similar QGD-like positions, often with 4.cxd5 Nxd5.
- **3.Nc3 dxc4 4.Nf3 Nf6 5.e4** — White grabs the center; Black plays for piece pressure.
- **3.cxd5 Qxd5 4.Nf3 e5** — sharp lines.
- **3.Nf3 Bg4 4.cxd5 Bxf3 5.gxf3 (or exf3) Qxd5** — Black gives up bishop pair for structural damage.

**Strategic ideas:**
- **Black:** exchange knight for bishop, get the bishop pair, harass the white center.
- **White:** convert structural and central advantages.

**Model game:** Lasker vs Chigorin, Hastings 1895 — classical handling.

---

## Albin Counter-Gambit

**Starting moves:** 1.d4 d5 2.c4 e5

**Tabiya FEN:** `rnbqkbnr/ppp2ppp/8/3pp3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3`

Black sacrifices a pawn for active piece play and a thorn pawn on d4 (after ...exd4 ...d4 maneuvers — actually it's ...e5xd4 leaving Black pawn on d4? Let me clarify):

After **3.dxe5 d4 4.Nf3 Nc6** — the **Lasker Trap** brews: 5.g3 Bg4 6.Bg2 Qd7 7.O-O O-O-O — Black has a thorn d-pawn and active pieces; White has an extra pawn but suffers cramp.

**Lasker Trap:** 5.e3? Bb4+ 6.Bd2 dxe3 7.Bxb4?? exf2+ 8.Ke2 fxg1=N+! — under-promotion to a knight!

**Strategic ideas:**
- **Black:** pressure with the d4 wedge, fast development, kingside attack chances.
- **White:** consolidate the extra pawn, undermine the d4 pawn with Nbd2 + e3.

**Model game:** Morozevich vs Bareev, Astana 2001 — modern Albin handling.

---

# Part IV: 1.d4 Nf6 — Indian Defences

## King's Indian Defence (KID)

**Starting moves:** 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7

**Tabiya FEN (after 3...Bg7):** `rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 4 4`

Black accepts a cramped position to launch a kingside pawn storm. The KID is one of the most aggressive systems against 1.d4 — Bobby Fischer's and Garry Kasparov's main weapon.

### Classical KID

**Moves:** 4.e4 d6 5.Nf3 O-O 6.Be2 e5

**Tabiya FEN (after 6...e5):** `rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQK2R w KQ - 0 7`

Then **7.O-O Nc6 8.d5 Ne7** — the **Mar del Plata** main line. Black plans ...Nh5/Ne8, ...f5, ...f4, ...g5, kingside pawn storm. White plans c4-c5 break and queenside attack.

**Bayonet Attack:** 7.O-O Nc6 8.d5 Ne7 9.b4 — White accelerates the queenside attack.

### Sämisch Variation

**Moves:** 4.e4 d6 5.f3

**Tabiya FEN:** `rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR b KQkq - 0 5`

White solidifies the e4 pawn, prepares a kingside attack with Be3+Qd2+O-O-O+g4-h4-h5, OR a quieter Be3+Nge2+O-O.

**Main response:** 5...O-O 6.Be3 e5 7.d5 c6 (or 7...Nh5).

### Fianchetto Variation

**Moves:** 4.Nf3 (avoiding sharper lines) followed by g3.

**Main line:** 1.d4 Nf6 2.c4 g6 3.Nf3 Bg7 4.g3 O-O 5.Bg2 d6 6.O-O Nc6 7.Nc3 a6 — the **Panno** variation.

White has a quieter Catalan-style setup; Black plays ...Rb8, ...b5 queenside expansion.

### Four Pawns Attack

**Moves:** 4.e4 d6 5.f4

**Tabiya FEN:** `rnbqk2r/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP4PP/R1BQKBNR b KQkq - 0 5`

White builds a huge central front (c4, d4, e4, f4). Aggressive but committal.

**Main line:** 5...c5 (Modern Benoni-style counter) or 5...O-O 6.Nf3 c5 7.d5 e6.

### Averbakh Variation

**Moves:** 4.e4 d6 5.Be2 O-O 6.Bg5

**Tabiya FEN:** `rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR b KQ - 4 6`

White's bishop on g5 prevents Black's standard ...e5 (since 6...e5? 7.dxe5 dxe5 8.Qxd8 Rxd8 9.Nd5 wins material). Black plays 6...c5 or 6...Na6 instead.

**KID strategic themes:** "race" character — White attacks queenside, Black attacks kingside. The first to break through wins; positional understanding is less important than calculation skills and pattern recognition.

**Common KID tactics:** ...Nf4 sacrifice, ...g4-g3 breakthrough, ...Rxf3 exchange sacrifice, dark-square domination after ...Nh5-f4.

**Model games:**
- **Larsen vs Olafsson, Las Palmas 1974** — Sämisch attack.
- **Piket vs Kasparov, Tilburg 1989** — Mar del Plata, Kasparov's Rxf3 sacrifice.
- **Korchnoi vs Kasparov, Yerevan Olympiad 1996** — Bayonet Attack.

---

## Nimzo-Indian Defence

**Starting moves:** 1.d4 Nf6 2.c4 e6 3.Nc3 Bb4

**Tabiya FEN:** `rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 4 4`

Black pins the c3 knight and is willing to give up the bishop pair for structural damage. Aron Nimzowitsch's classic creation. Considered one of Black's most reliable openings — many top players treat it as their main weapon.

### Rubinstein

**Moves:** 4.e3

**Tabiya FEN:** `rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR b KQkq - 0 4`

Quiet, flexible. The most popular White system for decades.

**Main lines:**
- **4...O-O 5.Bd3 d5 6.Nf3 c5 7.O-O** — leading to Karpov-style positions with isolated d-pawns or hanging pawns.
- **4...c5 5.Nge2** — Hübner-style structures.
- **4...b6 5.Ne2 (or 5.Bd3)** — solid setup with Bb7.

### Classical (Capablanca)

**Moves:** 4.Qc2

**Tabiya FEN:** `rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR b KQkq - 4 4`

White avoids doubled c-pawns by recapturing on c3 with the queen.

**Main lines:**
- **4...O-O 5.a3 Bxc3+ 6.Qxc3** — White retains the bishop pair without structural damage; Black plays for piece play.
- **4...d5 5.cxd5 Qxd5 (or 5...exd5)** — sharper.
- **4...c5 5.dxc5 O-O** — Romanishin variation.

### Sämisch

**Moves:** 4.a3

**Tabiya FEN:** `rnbqk2r/pppp1ppp/4pn2/8/1bPP4/P1N5/1P2PPPP/R1BQKBNR b KQkq - 0 4`

White invites the bishop trade to get the bishop pair, accepting doubled c-pawns. The **classic Nimzo bargain**.

**Main line:** 4...Bxc3+ 5.bxc3 c5 6.e3 Nc6 7.Bd3 — White has the center and bishop pair; Black plays against the doubled c-pawns and seeks ...d6/...e5 or ...b6/...Ba6 breaks.

### Leningrad Variation

**Moves:** 4.Bg5

**Tabiya FEN:** `rnbqk2r/pppp1ppp/4pn2/6B1/1bPP4/2N5/PP2PPPP/R2QKBNR b KQkq - 4 4`

White pins the f6 knight and seeks active piece play.

**Main line:** 4...h6 5.Bh4 c5 6.d5 d6 — closed positions; Black plays for ...Bxc3+, ...Ne7-g6-f4.

**Strategic themes:** the central idea of every Nimzo line is whether White can use the bishop pair effectively before Black blockades the position; Black's resources include ...c5 break, ...d5 break, knight outposts on c4 and e4, dark-square play.

**Pawn structures:** doubled c-pawns (after ...Bxc3+/bxc3), isolated d-pawn, hanging pawns (c4+d4) — the Nimzo is a textbook in pawn-structure handling.

**Model games:**
- **Capablanca vs Nimzowitsch, New York 1927** — early Nimzo handling.
- **Karpov vs Kasparov, World Championship 1985 (game 16)** — Nimzo Rubinstein, the famous "octopus knight" game.

---

## Queen's Indian Defence (QID)

**Starting moves:** 1.d4 Nf6 2.c4 e6 3.Nf3 b6

**Tabiya FEN:** `rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4`

Black avoids the Nimzo (since 3.Nf3 prevents 3...Bb4 from being as strong) and fianchettoes the queen's bishop.

**Main lines:**
- **4.g3 Bb7 (or 4...Ba6)** — main line. Both sides fianchetto.
  - **Petrosian Variation:** 4.a3 (preparing Nc3 without ...Bb4 pin) — Karpov favorite.
  - **4.Nc3** transposes to QID-Nimzo hybrids.
- **4.g3 Ba6** — modern main line, attacking the c4 pawn.

**Strategic ideas:**
- **Black:** firm light-square control with ...Bb7, knight on f6 hits e4, eventual ...d5 or ...c5 breaks.
- **White:** central control, eventual e2-e4 break, kingside expansion.

**Pawn structure:** "small center" with c4/d4 vs c7/d7-e6, often becomes hanging pawns (c4+d4) or isolated d-pawn.

**Model game:** Karpov vs Korchnoi, Baguio 1978 — Petrosian system, model White play.

---

## Grünfeld Defence

**Starting moves:** 1.d4 Nf6 2.c4 g6 3.Nc3 d5

**Tabiya FEN:** `rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4`

Black challenges the center directly. After exchanges, Black plays a hypermodern game: let White build a center, then attack it. Garry Kasparov's main weapon for decades.

### Exchange Variation

**Moves:** 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7

**Tabiya FEN (after 6...Bg7):** `rnbqk2r/ppp1ppbp/6p1/8/3PP3/2P5/P4PPP/R1BQKBNR w KQkq - 1 7`

Then **7.Nf3 c5** (or 7.Bc4 c5 8.Ne2) — the main starting position of the Exchange Grünfeld.

**Strategic ideas:**
- **White:** strong c3+d4+e4 pawn center, kingside attack chances.
- **Black:** undermine the center with ...c5 and ...Nc6 + ...Bg4, pressure the c3+d4 pawns; bishop pair (sometimes); long diagonal pressure with g7-bishop.

**Bd2 / Nf3 / Be3 / Bg5 setups** — many sub-variations exist.

### Russian Variation

**Moves:** 4.Nf3 Bg7 5.Qb3

**Tabiya FEN (after 5.Qb3):** `rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/1QN2N2/PP2PPPP/R1B1KB1R b kq - 4 5`

The queen pressures d5. Main line: 5...dxc4 6.Qxc4 O-O 7.e4 — White builds a center; Black plays the standard ...Bg4, ...Nfd7, ...Nb6, ...c5 plan.

**Hungarian Variation:** 5...c6 — solid alternative.

### Fianchetto Variation

**Moves:** 4.Nf3 Bg7 5.g3

**Tabiya FEN:** `rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/5NP1/PP2PP1P/RNBQKB1R b KQkq - 0 5`

White meets the Grünfeld with a Catalan-style fianchetto.

**Main line:** 5...c6 6.Bg2 O-O 7.O-O — quieter positional play; Black has comfortable equality.

**Other Grünfeld systems:** **Bf4 Variation** (4.Bf4), **Anti-Grünfeld** (3.f3 — preparing e4), **Nf3 lines** without the Russian.

**Model games:**
- **Karpov vs Kasparov, World Championship 1990 (multiple games)** — Exchange Grünfeld; Karpov tested every White system.
- **Shirov vs Kasparov, Linares 1997** — Russian Variation, sharp tactical play.

---

## Catalan Opening

**Starting moves:** 1.d4 Nf6 2.c4 e6 3.g3 (or 3.Nf3 d5 4.g3)

**Tabiya FEN (after 3.g3 d5 4.Bg2):** `rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR b KQkq - 1 4` (approx)

White combines a Queen's Gambit with kingside fianchetto, putting long-diagonal pressure on Black's queenside.

### Open Catalan

**Moves:** 4...dxc4 (after 4.Bg2)

**Main line:** 5.Nf3 a6 6.O-O Nc6 7.e3 Bd7 8.Nbd2 — White recovers the pawn slowly; Black aims for ...Rb8, ...b5.

**Alternative:** 5.Qa4+ (recovers the c-pawn directly).

### Closed Catalan

**Moves:** 4...Be7 5.Nf3 O-O 6.O-O dxc4 7.Qc2 (or 7...c6 maintaining the closed structure).

**Main closed line:** 4...Be7 5.Nf3 O-O 6.O-O Nbd7 7.Qc2 c6 8.Nbd2 — slow buildup.

**Strategic ideas:**
- **White:** long-diagonal pressure with Bg2 (the "Catalan bishop"), e2-e4 break, queenside expansion with b3+Bb2 / a4-a5.
- **Black:** equalize via simplifications, ...c5 break, ...b5+Bb7 setup.

The Catalan was Vladimir Kramnik's main weapon in his 2006 World Championship match.

**Model game:** Kramnik vs Topalov, World Championship 2006 (game 1) — Closed Catalan, Kramnik's positional grind.

---

## Bogo-Indian Defence

**Starting moves:** 1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+

**Tabiya FEN:** `rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 3 4`

Black avoids the Catalan/QID and pins prematurely (since the c3 knight isn't on c3 yet — White must block with the bishop or knight).

**Main lines:**
- **4.Bd2 Qe7 (or 4...Bxd2+ / 4...a5)** — quiet positional struggle.
- **4.Nbd2** — solid blocking; Black plays ...O-O, ...b6, ...Bb7.

**Strategic ideas:**
- **Black:** simplify, equalize, aim for solid structures.
- **White:** complete development, slowly improve positioning.

A "no-frills" defense for players seeking solidity over winning chances.

---

## Benoni

### Modern Benoni

**Starting moves:** 1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.cxd5 d6 6.e4 g6 7.Nf3 Bg7

**Tabiya FEN (after 7...Bg7):** `rnbqk2r/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 1 8`

Black accepts a queenside pawn majority and a cramped position in exchange for active piece play and the fight for the e5/e4 squares.

**Main lines:**
- **8.Be2 O-O 9.O-O** — Classical setup.
- **8.h3 (Modern Main Line)** — preparing Bd3, O-O without ...Bg4 worries.
- **8.Bb5+ (Taimanov Attack)** — sharp, popular at top level.

**Strategic ideas:**
- **Black:** queenside expansion with ...a6, ...b5, ...Nbd7-Ne5; sometimes ...Re8 and ...Nh5/...Nb6 maneuvers.
- **White:** central majority advance with e4-e5 break, kingside attack with f4, Bd3, h3, g4.

### Czech Benoni

**Starting moves:** 1.d4 Nf6 2.c4 c5 3.d5 e5

**Tabiya FEN (after 3...e5):** `rnbqkb1r/pp1p1ppp/5n2/2pPp3/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4`

Black locks the center and aims for a slow maneuvering game with ...Be7, ...d6, ...O-O, eventual ...Nbd7-f8-g6 and ...Bf6, with kingside pawn breaks (...g6-...Ng7-...f5).

**Strategic ideas:** Classic "good knight vs bad bishop" struggles; both sides maneuver patiently. White's space advantage is offset by Black's solid structure.

---

## Benko Gambit (Volga Gambit)

**Starting moves:** 1.d4 Nf6 2.c4 c5 3.d5 b5

**Tabiya FEN:** `rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4`

Black sacrifices a pawn for long-term queenside pressure: open a- and b-files, active piece play, and the bishop on the long h8-a1 diagonal.

**Accepted main line:** 4.cxb5 a6 5.bxa6 g6 (or 5...Bxa6) 6.Nc3 Bxa6 7.Nf3 d6 8.g3 Bg7 9.Bg2 O-O — Black has full positional compensation; statistical results are excellent for Black.

**Declined options:**
- **4.Nf3** — quiet decline.
- **4.a4** — restraining option.
- **4.Qc2** — central retention.
- **5.b6 (instead of 5.bxa6)** — returning the pawn to keep the position closed.

**Strategic ideas:**
- **Black:** queenside pressure, ...Qa5/...Qb6, ...Rfb8/Rfa8, ...Nbd7-e5 maneuvers.
- **White:** complete development, exchange Black's active pieces, convert the extra pawn in the endgame.

**Model game:** Polugaevsky vs Carlsen-style examples; older: Browne vs many opponents in the 1970s-80s — Browne was the Benko's chief promoter.

---

## Dutch Defence

**Starting moves:** 1.d4 f5

**Tabiya FEN:** `rnbqkbnr/ppppp1pp/8/5p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2`

Black grabs kingside space and aims for an attack on the white king. Risky structure (weakens e6, the a2-g8 diagonal) but creates immediate imbalance.

### Leningrad Dutch

**Moves:** 1.d4 f5 2.g3 Nf6 3.Bg2 g6 4.Nf3 Bg7 5.O-O O-O 6.c4 d6 7.Nc3

**Tabiya FEN (after 7.Nc3):** `rnbq1rk1/ppp1p1bp/3p1np1/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 1 7`

Combines Dutch ideas with King's Indian-style fianchetto. Black plans ...Nc6 (or ...c6+...Qe8-h5), ...e5 break.

### Stonewall Dutch

**Moves:** 1.d4 f5 2.g3 Nf6 3.Bg2 e6 4.Nf3 d5 5.O-O Bd6 6.c4 c6

**Tabiya FEN (after 6...c6):** `rnbqk2r/pp4pp/2pbpn2/3p1p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w kq - 0 7`

Black builds a "stonewall" pawn structure: pawns on c6, d5, e6, f5. Solid central control; the f5/e6 pawns control e4. Plans: ...Bd7-e8-h5, ...Nbd7-f8-g6, kingside attack.

**Strategic ideas:** Black's bad light-squared bishop is the structural weakness; reroute via ...Bd7-e8-h5 or ...b6-Ba6.

### Classical Dutch

**Moves:** 1.d4 f5 2.g3 Nf6 3.Bg2 e6 4.Nf3 Be7 5.O-O O-O

**Tabiya FEN (after 5...O-O):** `rnbq1rk1/ppppb1pp/4pn2/5p2/3P4/5NP1/PPP1PPBP/RNBQ1RK1 w - - 6 6`

Most flexible. Black retains options: Stonewall (...d5+...c6), Ilyin-Genevsky (...d6+...Qe8+...Qh5), or Leningrad-style (...Nc6+...d6+...e5).

### Anti-Dutch

- **Staunton Gambit:** 1.d4 f5 2.e4!? fxe4 3.Nc3 — sharp gambit.
- **Korchnoi Attack:** 1.d4 f5 2.Bg5 — pin to discourage Dutch development.
- **2.Nc3** — preparing e4.

**Trap (Staunton):** 2.e4 fxe4 3.Nc3 Nf6 4.Bg5 c6 5.f3 exf3 6.Nxf3 — White has lead in development.

**Model game:** Botvinnik vs Capablanca, AVRO 1938 — actually a French game; better Dutch model: **Botvinnik vs Bronstein, World Championship 1951** — Stonewall.

---

# Part V: Flank Openings

## English Opening

**Starting moves:** 1.c4

**Tabiya FEN:** `rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1`

White grabs queenside space and prepares a flexible game. Can transpose into many openings (QGD, Catalan, Nimzo-Indian) or stay independent. Botvinnik, Karpov, Kasparov, and Carlsen have all used it.

### Symmetrical English

**Moves:** 1.c4 c5

**Main lines:**
- **2.Nc3 Nc6 3.g3 g6 4.Bg2 Bg7 5.Nf3 Nf6 6.O-O O-O** — Symmetrical Fianchetto. Both sides build identical structures; White's first move advantage matters at the highest level.
- **2.Nf3 Nc6 3.d4 cxd4 4.Nxd4** — transposes to a reversed Sicilian Maroczy.

### Reversed Sicilian (1...e5)

**Moves:** 1.c4 e5 2.Nc3 Nf6 (or 2...Nc6)

**Tabiya FEN (after 2.Nc3 Nf6):** `rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3`

White plays a Sicilian with an extra tempo. Main lines:
- **3.Nf3 Nc6 4.g3** — main line.
- **3.g3 Bb4 (or 3...c6 / 3...d5)** — Black's various attempts.

**Strategic ideas:** White uses the extra tempo to seize central control or queenside initiative.

### Botvinnik System

**Moves:** 1.c4 (anything) 2.g3, 3.Bg2, 4.Nc3, 5.e4, 6.Nge2, 7.O-O — White builds a fortress with pawns on c4+d3+e4, knight on c3, bishop on g2.

**Tabiya FEN (after typical buildup):** complex; the structure resembles a closed Sicilian reversed.

**Idea:** maximize king safety and structural soundness; play for f2-f4 break or queenside expansion.

### Other Englishes

- **1.c4 e5 2.Nc3 Nc6 3.g3 g6 4.Bg2 Bg7** — **Closed English** with double fianchetto.
- **1.c4 Nf6 2.Nc3 e6 3.e4** — **Mikenas Attack**.
- **1.c4 Nf6 2.Nc3 c5 3.Nf3 d5** — **Anti-Benoni** structures.

**Model games:**
- **Karpov vs Spassky, Candidates 1974 (multiple games)** — model English handling.
- **Carlsen vs Anand, World Championship 2014 (game 11)** — modern English, Carlsen's positional grind.

---

## Réti Opening

**Starting moves:** 1.Nf3 d5 2.c4

**Tabiya FEN:** `rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 0 2`

Hypermodern: White invites Black to occupy the center, then attacks it with c4 and a fianchetto.

**Main lines:**
- **2...d4** — Black grabs space; White plays 3.b4 (or 3.g3).
- **2...e6** — transposes to Catalan / QGD-style positions after 3.g3 or 3.Nc3.
- **2...c6** — quiet Slav-like; 3.b3 or 3.g3 setups arise.
- **2...dxc4 3.e3** — Réti accepted; White recovers the pawn.

**Strategic ideas:** flexible setup that can transpose into many openings; tests Black's opening knowledge across multiple structures.

**Reti's classic:** Réti vs Capablanca, New York 1924 — first defeat of Capablanca in 8 years; demonstrated the hypermodern revolution.

---

## Bird's Opening

**Starting moves:** 1.f4

**Tabiya FEN:** `rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1`

A reversed Dutch. White grabs kingside space and aims for a Stonewall or Leningrad-style attack.

**Main lines:**
- **1...d5 2.Nf3 Nf6 3.g3 g6 4.Bg2 Bg7 5.O-O O-O 6.d3 c5 7.c3 Nc6 8.Na3** — Leningrad Bird.
- **1...d5 2.Nf3 g6 3.b3** — modern Bird.
- **1...e5!?** — the **From's Gambit**: 2.fxe5 d6 3.exd6 Bxd6 4.Nf3 g5 — sharp counterattack.

**Idea:** play similar plans to the Dutch with an extra tempo. Comparatively rare at top level but a useful surprise weapon.

---

## London System

**Starting moves:** 1.d4 Nf6 2.Nf3 (or 2.Bf4) ... 3.Bf4

**Tabiya FEN (after 1.d4 d5 2.Nf3 Nf6 3.Bf4):** `rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 2 3`

A super-solid system: White develops the dark-squared bishop outside the pawn chain, then plays e3, c3, Bd3, Nbd2, h3, O-O — same setup against virtually any Black response. Carlsen popularized it at the top level in the late 2010s.

**Typical move sequence:** 1.d4 d5 2.Nf3 Nf6 3.Bf4 c5 4.e3 Nc6 5.Nbd2 (or 5.c3) e6 6.c3 Bd6 7.Bg3 — quiet maneuvering with kingside attack chances.

**Strategic ideas:**
- **White:** safe king, Ne5 outpost, eventual Bd3+Qf3+Ng4 kingside attack; sometimes minority attack with b4-b5.
- **Black:** must avoid passive play; ...Qb6 hitting b2, ...c5 break, ...Nh5 trying to exchange Bf4.

**Anti-London:** 3...c5 4.e3 Qb6 — pressure on b2 forces White to commit.

**Model game:** Carlsen vs Karjakin, World Championship 2016 — multiple London System games; Carlsen squeezed wins from "drawish" positions.

---

## King's Indian Attack (KIA)

**Starting moves:** 1.Nf3 (or 1.e4 / 1.g3) ... 2.g3, 3.Bg2, 4.O-O, 5.d3, 6.Nbd2, 7.e4

**Tabiya FEN (typical KIA setup vs ...e6):** `rn1qkb1r/pbpp1ppp/1p2pn2/8/8/3P1NP1/PPPNPPBP/R1BQ1RK1 b kq - 4 5` (approx)

A King's Indian Defence with reversed colors. White plays a flexible setup that can be played against virtually any Black system.

**Main lines:**
- **vs French setup (1.e4 e6 2.d3):** quiet KIA buildup, eventual e4-e5 + f-pawn attack.
- **vs Sicilian setup (1.e4 c5 2.Nf3 + 3.g3):** standard KIA with Nbd2, e4, Re1, e5 break.
- **vs Caro-Kann (1.e4 c6 2.d3):** KIA structures.

**Strategic ideas:**
- **White:** kingside attack with Nh4-f5, e4-e5, f4-f5; flexible "system" play; one setup against many Black openings.
- **Black:** queenside counterplay with ...b5, ...Bb7, ...Nc6/Nbd7.

Bobby Fischer used the KIA in many of his early games as a flexible system against the French and Sicilian.

**Model game:** Fischer vs Myagmarsuren, Sousse Interzonal 1967 — classic KIA attack; ends with a beautiful queen sacrifice idea.

---

# Appendix: Practical Repertoire Notes

## Choosing a Repertoire

For a learning chess player, opening choice should match playing style:

- **Aggressive / tactical players:** Italian + Evans Gambit, King's Gambit, Sicilian Najdorf or Dragon, King's Indian Defence, Modern Benoni.
- **Positional / strategic players:** Ruy López Closed, Caro-Kann, French, Queen's Gambit Declined, Slav, Catalan, English.
- **Solid / drawish players:** Petroff, Berlin, QGD Tartakower, Slav, Bogo-Indian, London System.
- **Surprise / dynamic players:** Scotch, Vienna, Sveshnikov, Grünfeld, Benko Gambit, Albin Counter-Gambit.

## Universal Opening Principles

Regardless of choice:

1. **Control the center** — directly with pawns or indirectly with pieces (hypermodern style).
2. **Develop pieces quickly** — knights before bishops; minor pieces before major pieces.
3. **Castle early** — king safety enables active play.
4. **Don't move the same piece twice** in the opening unless there's a concrete reason.
5. **Connect rooks** by clearing the back rank and centralizing them.
6. **Don't bring out the queen too early** — it becomes a target.
7. **Understand the pawn structure** — every opening creates characteristic structures with their own plans (Carlsbad, Maroczy, IQP, Stonewall, etc.).

## Key Pawn Structures Cheat Sheet

- **Spanish small center:** White c3+d4+e4 vs Black c7+d6+e5 — slow maneuvering.
- **IQP (Isolated Queen Pawn):** dynamic piece play vs blockade.
- **Hanging pawns (c4+d4):** mobile pawn duo vs structural target.
- **Carlsbad:** symmetric except for one minority — minority attack theme.
- **Maroczy bind (c4+e4 vs ...d6+...e6):** White's central clamp; Black needs piece play and ...b5 break.
- **Stonewall (d5+e6+f5+c6):** strong center but bad bishop on c8.
- **Closed Sicilian / KID race:** opposite-wing pawn storms.
- **French chain (e5+d4 vs e6+d5):** chain attack on the base.

## Notation Reminder

- Algebraic notation (used throughout): pieces by initial (K, Q, R, B, N), captures with "x", checks with "+", checkmate with "#", castling kingside O-O / queenside O-O-O, pawn promotion with "=" (e.g., e8=Q).
- FEN (Forsyth-Edwards Notation): board state in one line — useful for setting up positions in any chess engine or learning tool.

## Further Study Suggestions

- **For Open Games:** Bobby Fischer's *My 60 Memorable Games*; Anand's collected games.
- **For Sicilian:** *Mastering the Najdorf* (Arizmendi & Moreno); Kasparov's *Najdorf* DVD series.
- **For Closed Games:** *Mastering the Endgame* (Shereshevsky); Carlsbad-structure books by Karpov.
- **For Indian Defenses:** Kasparov's *King's Indian* series; Fischer's KID games.
- **For Flank Openings:** Watson's *Mastering the Chess Openings*, vol. 3.

---

*This document is intended as a study reference. Actual playing strength comes from practice, analysis of your own games, and pattern recognition built up through reviewing master games in your chosen openings. Theory beyond move 10-15 is rarely as important at the club level as understanding typical plans, pawn structures, and tactical patterns.*
