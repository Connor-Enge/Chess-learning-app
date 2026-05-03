// Auto-extracted from docs/research/openings.md
// Each entry summarizes a major opening or variation. Plans are paraphrased
// from the research document for an intermediate audience. Main lines are
// written as standard SAN; verified to be legal in sequence.

export const OPENINGS = [
  // ============================================================
  // PART I: OPEN GAMES (1.e4 e5)
  // ============================================================
  {
    id: "italian-game",
    name: "Italian Game",
    eco: "C50-C54",
    aliases: ["Giuoco Piano", "Italian Opening"],
    style: "Open game",
    firstPlayer: "white",
    mainLine: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3 d6 6. O-O a6 7. Nbd2 Ba7 8. Bb3 O-O 9. h3",
    whitePlans:
      "- Slow build-up with Nbd2-f1-g3, Bb3, h3, Re1\n- Prepare the d3-d4 break at the right moment\n- Sometimes a4 to gain queenside space and prevent ...b5\n- Aim the c4 bishop at f7, the weakest square in Black's camp",
    blackPlans:
      "- Mirror setup with ...a6, ...Ba7 or ...Bb6, ...h6, ...Re8\n- Reroute the knight ...Nbd7-f8-g6\n- Look for the central counter ...d5 when circumstances allow\n- Trade pieces to ease the cramped position",
    structure:
      "Symmetric c3/d3 vs ...c6/...d6 small-center, often becoming a maneuvering battle that resembles a Closed Spanish.",
    variations: [
      {
        name: "Giuoco Pianissimo",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3",
        note: "Modern slow main line — the dominant choice at top level.",
      },
      {
        name: "Greco / Moller Attack (5.d4)",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. d5",
        note: "Classical sharp main line; 9.d5 is the famous Moller Attack.",
      },
      {
        name: "Evans Gambit",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4",
        note: "Romantic pawn sacrifice for tempo and a strong center; Anderssen's and Morphy's favorite.",
      },
      {
        name: "Two Knights Defence",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2",
        note: "Sharp Knorre/Ulvestad complex; Black accepts an early initiative.",
      },
    ],
    traps: [
      {
        name: "Fried Liver Attack",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3",
        note: "After 5...Nxd5? White sacrifices a knight for a brutal attack on the exposed king.",
      },
    ],
    modelGames: [
      "Anderssen vs Dufresne, Berlin 1852 (Evans Gambit, the 'Evergreen')",
      "Karjakin vs Anand, Wijk aan Zee 2006 (modern Italian Pianissimo)",
    ],
  },

  {
    id: "ruy-lopez",
    name: "Ruy Lopez (Spanish Opening)",
    eco: "C60-C99",
    aliases: ["Spanish Opening", "Spanish Game"],
    style: "Open game",
    firstPlayer: "white",
    mainLine: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3",
    whitePlans:
      "- Apply central pressure with d4 at the right moment\n- Use the Spanish knight maneuver Nb1-d2-f1-g3\n- Eventual kingside attack against a slightly cramped Black\n- Maintain the central tension with c3+d4+e4 vs ...c6+d6+e5",
    blackPlans:
      "- Counterattack with ...c5 and the timely ...d5\n- Reroute knights ...Nc6-a5-c4 to a strong outpost\n- Queenside expansion or a central break\n- Solid setups (Berlin, Marshall) for equality at the highest levels",
    structure:
      "The Spanish small-center: White pawns on c3, d4, e4 vs Black pawns on c7, d6, e5. White wants to maintain tension; Black wants to release it favorably with ...exd4.",
    variations: [
      {
        name: "Berlin Defence",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. Bxc6 dxc6 7. dxe5 Nf5 8. Qxd8+ Kxd8",
        note: "The Berlin Wall queenless middlegame — Kramnik used it to dethrone Kasparov in 2000.",
      },
      {
        name: "Closed Spanish — Chigorin / Breyer / Zaitsev",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3",
        note: "After 9.h3 Black chooses 9...Na5 (Chigorin), 9...Nb8 (Breyer), or 9...Bb7 (Zaitsev).",
      },
      {
        name: "Marshall Attack",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 c6",
        note: "Pawn sacrifice for crushing piece activity and a long-term initiative against White's king.",
      },
      {
        name: "Open Spanish",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6",
        note: "Black grabs a central pawn and seeks dynamic piece play with the e6/d5/c6 chain.",
      },
      {
        name: "Exchange Variation",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O f6 6. d4 exd4 7. Nxd4 c5 8. Nb3 Qxd1 9. Rxd1",
        note: "White damages Black's structure and grinds the kingside majority — Lasker, Fischer and Carlsen favorite.",
      },
    ],
    traps: [
      {
        name: "Noah's Ark Trap",
        line: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. d4 b5 6. Bb3 Nxd4 7. Nxd4 exd4 8. Qxd4 c5 9. Qd5 Be6 10. Qc6+ Bd7 11. Qd5 c4",
        note: "Black's queenside pawns trap the b3 bishop.",
      },
    ],
    modelGames: [
      "Kramnik vs Kasparov, London 2000 game 1 (Berlin endgame)",
      "Capablanca vs Marshall, New York 1918 (debut of the Marshall Attack)",
    ],
  },

  {
    id: "scotch",
    name: "Scotch Game",
    eco: "C44-C45",
    aliases: ["Scotch Opening"],
    style: "Open game",
    firstPlayer: "white",
    mainLine: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. e5 Qe7 7. Qe2 Nd5 8. c4 Ba6",
    whitePlans:
      "- Resolve central tension immediately for free piece play\n- Target the d6 and e6 squares\n- Use the central space advantage\n- Aim for piece activity over a long maneuvering game",
    blackPlans:
      "- Open lines for the bishops\n- Active piece play with ...Qf6 or ...Qh4 putting early pressure\n- Use the bishop pair as compensation for doubled c-pawns\n- Quick development with ...Bc5 or ...Bb4+",
    structure:
      "Black often ends up with doubled c-pawns vs White's e- and c-pawns; Black gets the bishop pair as compensation.",
    variations: [
      {
        name: "Mieses Variation",
        line: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. e5 Qe7 7. Qe2 Nd5 8. c4 Ba6",
        note: "Sharp main line with imbalanced structures.",
      },
      {
        name: "Classical (4...Bc5)",
        line: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nxc6 Qf6",
        note: "Black challenges the d4 knight; complications arise.",
      },
      {
        name: "Scotch Gambit",
        line: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4",
        note: "Often transposes into Italian/Two Knights structures.",
      },
    ],
    traps: [],
    modelGames: ["Kasparov vs Karpov, Linares 1993 (classic Mieses Scotch)"],
  },

  {
    id: "vienna",
    name: "Vienna Game",
    eco: "C25-C29",
    aliases: [],
    style: "Open game",
    firstPlayer: "white",
    mainLine: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Nf3 Be7 6. d3 Nxc3 7. bxc3 O-O",
    whitePlans:
      "- Keep options open for early f4 (Vienna Gambit) or quiet positional setup\n- Open the f-file for kingside attack after fxe5\n- Use Bc4 with attacking ideas against f7\n- Transition to King's Gambit-like attacks while keeping flexibility",
    blackPlans:
      "- Meet 3.f4 with the equalizing 3...d5\n- Avoid 3...exf4 which loses to 4.e5\n- Solid development with ...Nf6, ...Be7, ...O-O\n- Counterattack the weakened white king position",
    variations: [
      {
        name: "Vienna Gambit",
        line: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Nf3 Be7",
        note: "After 3...d5! Black equalizes; 3...exf4? loses to 4.e5.",
      },
      {
        name: "Frankenstein-Dracula Variation",
        line: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Nc6 6. Nb5 g6 7. Qf3 f5 8. Qd5 Qe7 9. Nxc7+ Kd8 10. Nxa8",
        note: "Wild material imbalances after Black grabs the e4 pawn.",
      },
      {
        name: "Quiet Variation (3.g3)",
        line: "1. e4 e5 2. Nc3 Nc6 3. g3",
        note: "Quiet positional treatment with kingside fianchetto.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "kings-gambit",
    name: "King's Gambit",
    eco: "C30-C39",
    aliases: ["KG", "KGA", "KGD"],
    style: "Open game",
    firstPlayer: "white",
    mainLine: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Bc4 d5 7. exd5 Bd6",
    whitePlans:
      "- Open f-file for a kingside attack\n- Build a central duo e4+d4\n- Develop with Bc4 + Qe2/Qf3 against f7\n- Use the central majority gained by deflecting Black's e-pawn",
    blackPlans:
      "- Hold the f4 pawn in the Accepted lines\n- Develop quickly to exploit the weakened white king\n- Classical Decline with 2...Bc5 keeps tactical balance\n- Falkbeer 2...d5!? counter-grabs initiative",
    variations: [
      {
        name: "King's Gambit Accepted — Kieseritzky",
        line: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5",
        note: "Classical sharp KGA main line.",
      },
      {
        name: "Fischer Defence",
        line: "1. e4 e5 2. f4 exf4 3. Nf3 d6",
        note: "Fischer's solid defense designed to neutralize White's attack.",
      },
      {
        name: "Muzio Gambit",
        line: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O gxf3 6. Qxf3",
        note: "Sacrifices a piece for a furious attack.",
      },
      {
        name: "Falkbeer Counter-Gambit",
        line: "1. e4 e5 2. f4 d5 3. exd5 e4",
        note: "Black returns the gambit and grabs initiative.",
      },
      {
        name: "Classical Declined",
        line: "1. e4 e5 2. f4 Bc5",
        note: "Black declines and discourages White's Bc4-Bxf7+ tricks.",
      },
    ],
    traps: [],
    modelGames: [
      "Anderssen vs Kieseritzky, London 1851 (the 'Immortal Game')",
      "Spassky vs Bronstein, Leningrad 1960 (gem of attacking technique)",
    ],
  },

  {
    id: "petroff",
    name: "Petroff Defence",
    eco: "C42-C43",
    aliases: ["Petrov", "Russian Defence"],
    style: "Open game",
    firstPlayer: "black",
    mainLine: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Nc6 7. O-O Be7 8. c4",
    whitePlans:
      "- Try to extract a small initiative from the symmetry\n- Look for piece play in the center with c4 break\n- Aim for slightly better structures in the IQP middlegame\n- 3.d4 lines for sharper imbalances",
    blackPlans:
      "- Symmetry-breaking ...Nxe4 followed by precise piece coordination\n- Aim for endgame equality\n- Always remember 3...d6 first before recapturing — never 3...Nxe4? 4.Qe2!\n- Solid piece play with ...d5 and ...Nc6",
    structure:
      "Isolated d-pawn structures often arise after central exchanges.",
    variations: [
      {
        name: "Classical Main Line",
        line: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3",
        note: "Black has equalized at top level for decades.",
      },
      {
        name: "Modern Attack (3.d4)",
        line: "1. e4 e5 2. Nf3 Nf6 3. d4 exd4 4. e5 Ne4 5. Qxd4",
        note: "Imbalanced positions with bishop pair vs central pawns.",
      },
    ],
    traps: [
      {
        name: "Petroff Symmetry Trap",
        line: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nxe4 4. Qe2 Nf6 5. Nc6+",
        note: "Black must play 3...d6 first! Recapturing immediately loses material to the discovered check.",
      },
    ],
    modelGames: [
      "Karpov vs Yusupov, Bugojno 1986",
      "Caruana vs Carlsen, World Championship 2018 (Carlsen's drawing weapon)",
    ],
  },

  {
    id: "philidor",
    name: "Philidor Defence",
    eco: "C41",
    aliases: [],
    style: "Open game",
    firstPlayer: "black",
    mainLine: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Nc3 Nbd7 5. Bc4 Be7 6. O-O O-O 7. Re1 c6",
    whitePlans:
      "- Use central space and comfortable development\n- Target the slight passivity of Black's setup\n- Solid 3.d4 just gets a comfortable game\n- Consider 3.Bc4 for Larsen-style attacks",
    blackPlans:
      "- Patience: restrain White's center\n- Hanham setup with solid Indian-style ...e5/...d6/...Be7/...c6\n- Look for ...c6 + ...d5 or ...exd4 + ...d5 break\n- Keep the structure compact",
    variations: [
      {
        name: "Hanham Variation",
        line: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Nc3 Nbd7",
        note: "Modern solid Indian-style treatment.",
      },
      {
        name: "Exchange (3...exd4)",
        line: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4",
        note: "White just gets a comfortable game.",
      },
    ],
    traps: [
      {
        name: "Legal's Mate",
        line: "1. e4 e5 2. Nf3 d6 3. Bc4 Bg4 4. Nc3 g6 5. Nxe5 Bxd1 6. Bxf7+ Ke7 7. Nd5#",
        note: "The classic queen sacrifice for mate.",
      },
    ],
    modelGames: ["Morphy vs Duke of Brunswick & Count Isouard, Paris Opera 1858 (the most famous miniature in chess)"],
  },

  // ============================================================
  // PART II: SEMI-OPEN GAMES (1.e4)
  // ============================================================
  {
    id: "sicilian-najdorf",
    name: "Sicilian — Najdorf",
    eco: "B90-B99",
    aliases: ["Najdorf Variation"],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Be7",
    whitePlans:
      "- English Attack: Be3, f3, Qd2, O-O-O, g4-g5 pawn storm\n- Use the Nd5 outpost after exchanges\n- Attack the d6/e6 weaknesses\n- 6.Bg5 with mutual king attacks; 6.Bc4 (Sozin) aiming at f7",
    blackPlans:
      "- Central control with ...e5 (Najdorf-Boleslavsky) or ...e6 (Scheveningen-style)\n- Queenside counterattack with ...b5, ...Bb7, ...Nbd7-b6\n- If White castles long, race for the king\n- Flexible 5...a6 prevents Nb5 and prepares ...e5 or ...e6",
    variations: [
      {
        name: "English Attack",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3",
        note: "Razor-sharp opposite-side castling fight.",
      },
      {
        name: "Main Line (6.Bg5)",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Qb6",
        note: "Najdorf Poisoned Pawn — mutual king attacks, deep theory.",
      },
      {
        name: "Fischer-Sozin Attack",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4",
        note: "Bishop on b3 aiming at f7; aggressive.",
      },
    ],
    traps: [],
    modelGames: [
      "Anand vs Kasparov, World Championship 1995 game 11 (Anand's Rxh7! sacrifice)",
      "Fischer vs Larsen, Portoroz 1958 (Sozin Attack, instructive piece sacrifice)",
    ],
  },

  {
    id: "sicilian-dragon",
    name: "Sicilian — Dragon",
    eco: "B70-B79",
    aliases: ["Dragon Variation"],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6",
    whitePlans:
      "- Yugoslav Attack: castle long and pawn-storm with h4-h5\n- Open the h-file for a mating attack\n- Nd5 sacrifice to break Black's defenses\n- Use Bc4 + Bb3 to control the a2-g8 diagonal",
    blackPlans:
      "- Fianchetto the king's bishop for the long diagonal\n- Counterattack with ...Rc8, ...Ne5/Nc4\n- Sacrificial breakthroughs ...Rxc3! to destroy the queenside\n- Race the white king attack on the queenside",
    structure:
      "Mutual king attacks. Both sides race; the side that opens lines first usually wins.",
    variations: [
      {
        name: "Yugoslav Attack",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4",
        note: "The critical try; opposite-side castling races.",
      },
      {
        name: "Yugoslav 9.O-O-O",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. O-O-O",
        note: "White commits to opposite-side castling immediately.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-sveshnikov",
    name: "Sicilian — Sveshnikov",
    eco: "B33",
    aliases: ["Cheliabinsk Variation"],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5",
    whitePlans:
      "- Occupy the d5 outpost after Bxf6\n- Exchange Black's good defenders\n- Slowly outplay Black on the kingside\n- Use the structural superiority over time",
    blackPlans:
      "- Dynamic piece play with the bishop pair\n- ...f5 break for activity\n- Bishop pair pressure on White's king\n- Accept the d5 hole and backward d-pawn for active piece play",
    variations: [
      {
        name: "Main Line",
        line: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Bxf6 gxf6 10. Nd5",
        note: "Carlsen used the Sveshnikov in his 2018 World Championship match.",
      },
    ],
    traps: [],
    modelGames: ["Carlsen vs Caruana, World Championship 2018 game 12 (championship preparation showcase)"],
  },

  {
    id: "sicilian-taimanov",
    name: "Sicilian — Taimanov",
    eco: "B40-B49",
    aliases: ["Paulsen Variation"],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 Qc7 6. Be3 a6 7. Qd2 Nf6 8. O-O-O",
    whitePlans:
      "- English Attack setup with Be3, Qd2, O-O-O\n- Pressure on the d6 square\n- Pawn storm with f3, g4-g5\n- Maroczy bind with c4 for restrictive play",
    blackPlans:
      "- Flexible setup keeping ...Nf6 and ...d6 options open\n- Build slowly with ...b5, ...Bb7, ...Be7\n- ...Qc7 preparing queenside expansion\n- Sometimes ...Bb4 pinning the c3 knight",
    variations: [
      {
        name: "Classical Taimanov",
        line: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 Qc7",
        note: "Most flexible Taimanov setup.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-scheveningen",
    name: "Sicilian — Scheveningen",
    eco: "B80-B89",
    aliases: [],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 Be7 7. O-O O-O 8. f4 Nc6",
    whitePlans:
      "- English Attack with Be3, Qd2, O-O-O\n- Classical setup with Be2, O-O, f4\n- Keres Attack 6.g4! against direct ...e6 move orders\n- Use central space and kingside pawn expansion",
    blackPlans:
      "- 'Small center' setup with pawns on d6 and e6\n- Develop with ...Nc6, ...Be7, ...O-O, ...a6, ...Qc7, ...b5\n- Often reached via Najdorf 5...a6 6.Be2 e6 to avoid Keres\n- Slow queenside expansion",
    structure:
      "The 'small center' Sicilian: pawns on d6 and e6, often reached via Najdorf move-order to avoid the Keres Attack.",
    variations: [
      {
        name: "Classical (6.Be2)",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2",
        note: "Solid main line with kingside castling.",
      },
      {
        name: "Keres Attack",
        line: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. g4",
        note: "Sharp pawn storm against the direct Scheveningen move order.",
      },
    ],
    traps: [],
    modelGames: ["Karpov vs Kasparov, World Championship 1985 game 16 (Kasparov's revolutionary attack)"],
  },

  {
    id: "sicilian-kan",
    name: "Sicilian — Kan",
    eco: "B41-B43",
    aliases: ["Paulsen", "Kan Variation"],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3 Bc5 6. Nb3 Be7 7. Qg4",
    whitePlans:
      "- Flexible setups: 5.Bd3 with kingside attack ideas\n- Maroczy bind with 5.c4 to clamp the center\n- Qg4 attack on g7\n- Develop pieces actively before committing",
    blackPlans:
      "- Like a Najdorf without ...Nf6 yet — extreme flexibility\n- Avoid sharp main lines\n- Develop with ...Qc7, ...Nf6, ...Bb4, ...Nc6 or ...d6 as needed\n- Queenside expansion with ...b5",
    variations: [
      {
        name: "Main Line (5.Bd3)",
        line: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3 Bc5 6. Nb3",
        note: "Most common modern handling.",
      },
      {
        name: "Maroczy Bind",
        line: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. c4",
        note: "White clamps the center with c4+e4.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-accelerated-dragon",
    name: "Sicilian — Accelerated Dragon",
    eco: "B34-B39",
    aliases: ["Hyper-Accelerated Dragon"],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Nf6 6. Nc3 d6 7. Be2 Nxd4 8. Qxd4 Bg7",
    whitePlans:
      "- Maroczy Bind: 5.c4 establishing c4+e4 clamp\n- Restrict Black's central breaks\n- Slow positional squeeze\n- Use space advantage to maneuver",
    blackPlans:
      "- Play the Dragon a tempo earlier\n- Hope to skip ...d6 going ...d5 in one move\n- Avoid the Yugoslav Attack altogether\n- Plan ...a6, ...Bd7, ...Nxd4, ...Bc6 against the Maroczy",
    variations: [
      {
        name: "Maroczy Bind",
        line: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4",
        note: "The critical reply restricting Black's options.",
      },
      {
        name: "Hyper-Accelerated Dragon",
        line: "1. e4 c5 2. Nf3 g6",
        note: "Avoiding the Maroczy by delaying ...Nc6.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-classical",
    name: "Sicilian — Classical",
    eco: "B56-B59",
    aliases: [],
    style: "Sicilian",
    firstPlayer: "black",
    mainLine: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 a6 8. O-O-O Bd7 9. f4",
    whitePlans:
      "- Richter-Rauzer with 6.Bg5: Qd2 + O-O-O + f4\n- Sozin 6.Bc4 aiming at f7\n- Classical Boleslavsky structures with 6.Be2\n- Opposite-side castling fight",
    blackPlans:
      "- Natural development with ...Nc6 plus ...d6\n- Often transposes into other variations\n- Counterattack with ...a6, ...Bd7, ...Be7, ...O-O\n- Queenside play in opposite-castling races",
    variations: [
      {
        name: "Richter-Rauzer",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 a6 8. O-O-O",
        note: "White's most common setup against the Classical.",
      },
      {
        name: "Sozin",
        line: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bc4",
        note: "Bishop on b3 aiming at f7.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-alapin",
    name: "Sicilian — Alapin (c3)",
    eco: "B22",
    aliases: ["c3 Sicilian"],
    style: "Sicilian",
    firstPlayer: "white",
    mainLine: "1. e4 c5 2. c3 d5 3. exd5 Qxd5 4. d4 Nf6 5. Nf3 e6 6. Bd3 Nc6 7. O-O cxd4 8. cxd4",
    whitePlans:
      "- Prepare d4 with c3 support, transposing to a Queen's-pawn-style center\n- Avoid Sicilian sharpness — one of the most reliable anti-Sicilians\n- Aim for IQP positions with active piece play\n- Solid one-system approach",
    blackPlans:
      "- Solid 2...d5 entering French/Tarrasch-like structures\n- Or 2...Nf6 entering Alekhine-style positions\n- Avoid passive play, develop the bishops actively\n- Aim for piece exchanges and equality",
    variations: [
      {
        name: "Main Line (2...d5)",
        line: "1. e4 c5 2. c3 d5 3. exd5 Qxd5 4. d4 Nf6 5. Nf3 e6 6. Bd3",
        note: "Structures resemble French/Tarrasch.",
      },
      {
        name: "2...Nf6",
        line: "1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. Nf3 Nc6 5. Bc4",
        note: "Alekhine-style positions.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-smith-morra",
    name: "Sicilian — Smith-Morra Gambit",
    eco: "B21",
    aliases: ["Morra Gambit"],
    style: "Sicilian",
    firstPlayer: "white",
    mainLine: "1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4 e6 7. O-O Nf6 8. Qe2",
    whitePlans:
      "- Sacrifice a pawn for fast development and open lines\n- Free-flowing piece play with Bc4, Nf3, Qe2\n- Open c- and d-files for the rooks\n- Pet weapon at club level",
    blackPlans:
      "- Accept and play solidly with Siberian Defence ideas\n- Decline with 3...Nf6 (transposing to Alapin) at master level\n- 3...d3 returning the pawn keeps things calm\n- Develop with ...Nc6, ...d6, ...e6, ...Nge7 (Siberian)",
    variations: [
      {
        name: "Accepted",
        line: "1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4",
        note: "White has free-flowing piece play.",
      },
      {
        name: "Siberian Defence",
        line: "1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 e6 6. Bc4 a6 7. O-O Nge7",
        note: "Recommended modern setup; less scary at master level.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "sicilian-closed",
    name: "Sicilian — Closed",
    eco: "B23-B26",
    aliases: [],
    style: "Sicilian",
    firstPlayer: "white",
    mainLine: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. Be3 e6 7. Qd2 Nge7 8. f4",
    whitePlans:
      "- Avoid opening the position; keep the d-pawn back\n- Kingside expansion with f4, Nf3, O-O, Be3, Qd2\n- Eventual f5 break\n- Spassky's favorite system",
    blackPlans:
      "- Queenside expansion with ...Rb8, ...b5, ...Nd4\n- Maneuver knights to good squares\n- Match White's setup with ...g6, ...Bg7, ...d6\n- Patient strategic play",
    variations: [
      {
        name: "Main Line",
        line: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3",
        note: "Classical Closed Sicilian setup.",
      },
      {
        name: "Grand Prix Attack",
        line: "1. e4 c5 2. Nc3 Nc6 3. f4 g6 4. Nf3 Bg7 5. Bb5",
        note: "Direct attacking system aiming for f5 against Black's kingside.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "french-winawer",
    name: "French — Winawer",
    eco: "C15-C19",
    aliases: ["Winawer Variation"],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4 O-O 8. Bd3",
    whitePlans:
      "- Kingside attack with Qg4, Bd3, Nf3, h4-h5\n- Exploit dark-square weaknesses around Black's king\n- Use the bishop pair after ...Bxc3+\n- Maintain central pawn duo e5+d4",
    blackPlans:
      "- Pin the c3 knight and threaten ...dxe4\n- Undermine d4 with ...c5, ...Nc6, ...Qa5+/...Qc7\n- Counterplay on the queenside\n- Accept doubled c-pawns and damaged kingside for bishop pair and central counterplay",
    variations: [
      {
        name: "Main Line (7.Qg4)",
        line: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4",
        note: "The most ambitious Black system.",
      },
      {
        name: "Poisoned Pawn",
        line: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4 Qc7 8. Qxg7 Rg8 9. Qxh7",
        note: "Black sacrifices the kingside pawns for queenside initiative.",
      },
    ],
    traps: [],
    modelGames: [
      "Botvinnik vs Capablanca, AVRO 1938 (the 'Botvinnik Combination')",
      "Korchnoi vs Karpov, Baguio 1978 game 21 (Karpov's grinding technique)",
    ],
  },

  {
    id: "french-tarrasch",
    name: "French — Tarrasch",
    eco: "C03-C09",
    aliases: ["Tarrasch Variation"],
    style: "Semi-open",
    firstPlayer: "white",
    mainLine: "1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 Nc6 7. Ne2 Qb6 8. Nf3",
    whitePlans:
      "- Avoid the Winawer pin\n- Closed Tarrasch with 4.e5 Nfd7 5.Bd3 setup\n- Open lines with 4.exd5 in some variations\n- Knight on e2 supports d4 and prepares f-pawn play",
    blackPlans:
      "- 3...Nf6 entering Closed Tarrasch French structures\n- 3...c5 opening the position with IQP play\n- 3...Be7 for maximum flexibility\n- Counterattack with ...c5 and ...f6 against the chain",
    variations: [
      {
        name: "Closed Tarrasch (3...Nf6)",
        line: "1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 Nc6 7. Ne2",
        note: "French structures with White's knight on e2 blocking the bishop.",
      },
      {
        name: "Open Tarrasch (3...c5)",
        line: "1. e4 e6 2. d4 d5 3. Nd2 c5 4. exd5 exd5",
        note: "Symmetrical IQP positions.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "french-advance",
    name: "French — Advance",
    eco: "C02",
    aliases: [],
    style: "Semi-open",
    firstPlayer: "white",
    mainLine: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3 Nh6 7. b4 cxd4 8. cxd4",
    whitePlans:
      "- Maintain the e5/d4 pawn chain\n- Kingside attack with Bd3, h4, Nf3-g5\n- Use a3+b4 for queenside expansion\n- Cramp Black's pieces, especially the c8 bishop",
    blackPlans:
      "- Undermine the chain with ...c5 and ...f6\n- Develop pieces actively: ...Nge7 to f5, ...Bd7-b5\n- Pressure d4 with ...Nc6, ...Qb6\n- Open the position with timely pawn breaks",
    structure:
      "Classic French chain: White e5+d4 vs Black e6+d5. Both sides attack the base of the opposing chain.",
    variations: [
      {
        name: "Main Line",
        line: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3",
        note: "White prepares b4 for queenside expansion.",
      },
      {
        name: "Milner-Barry Gambit",
        line: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. Bd3 cxd4 7. cxd4 Bd7 8. O-O",
        note: "White sacrifices the d4 pawn for development.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "french-classical",
    name: "French — Classical",
    eco: "C11-C14",
    aliases: ["Classical French"],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. f4 O-O 8. Nf3",
    whitePlans:
      "- Steinitz with 4.e5 building a big center plus f4\n- 4.Bg5 pinning the f6 knight\n- Kingside attack with f4, Nf3, Bd3\n- Use the central space advantage",
    blackPlans:
      "- Solid development with ...Nf6 and ...Be7\n- Burn variation 4...dxe4 simplifies\n- MacCutcheon 4...Bb4 for combative play\n- Counterstrike against the e5 pawn with ...c5 and ...f6",
    variations: [
      {
        name: "Steinitz Variation",
        line: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4",
        note: "White builds a big central front.",
      },
      {
        name: "Classical Main",
        line: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7",
        note: "Solid main line.",
      },
      {
        name: "Burn Variation",
        line: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 dxe4",
        note: "Black simplifies the position.",
      },
      {
        name: "MacCutcheon",
        line: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Bxc3 7. bxc3 Ne4",
        note: "Combative pin-and-counterpin variation.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "french-exchange",
    name: "French — Exchange",
    eco: "C01",
    aliases: [],
    style: "Semi-open",
    firstPlayer: "white",
    mainLine: "1. e4 e6 2. d4 d5 3. exd5 exd5 4. Bd3 Nf6 5. Nf3 Bd6 6. O-O O-O 7. Bg5 Bg4",
    whitePlans:
      "- Release tension and seek a quiet game\n- Use the slight initiative from the first move\n- Symmetrical play with one tempo advantage\n- Look for the c4 break\n",
    blackPlans:
      "- Develop carefully with ...Bd6, ...Nf6, ...O-O, ...Re8, ...c6\n- Mirror White's setup\n- Equalize through accurate play\n- Reach a balanced middlegame",
    variations: [
      {
        name: "Main Symmetrical",
        line: "1. e4 e6 2. d4 d5 3. exd5 exd5 4. Bd3 Nf6 5. Nf3 Bd6 6. O-O O-O",
        note: "Symmetrical but White has the initiative.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "caro-kann-classical",
    name: "Caro-Kann — Classical",
    eco: "B18-B19",
    aliases: ["Capablanca Variation"],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3 Nd7 8. h5 Bh7 9. Bd3",
    whitePlans:
      "- Develop the bishop pair with Bd3, Bd2\n- Play Qe2 and prepare O-O-O\n- Pawn storm on the h-file\n- Eventually trade light-squared bishops\n- Look for c4 break",
    blackPlans:
      "- Develop the 'French bishop' actively before ...e6\n- Solid healthy structure\n- Active piece play with ...Nd7, ...Ngf6, ...e6\n- Castle short and play in the center\n- Carefully retreat the h7 bishop",
    variations: [
      {
        name: "Main Line",
        line: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3",
        note: "Karpov's main weapon for decades.",
      },
      {
        name: "Karpov / Smyslov 4...Nd7",
        line: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Ng5 Ngf6 6. Bd3 e6 7. N1f3",
        note: "Flexible setup; the knight goes to f6 to challenge Ne4.",
      },
    ],
    traps: [],
    modelGames: ["Karpov vs Pomar, Las Palmas 1977 (Classical Caro-Kann model handling)"],
  },

  {
    id: "caro-kann-advance",
    name: "Caro-Kann — Advance",
    eco: "B12",
    aliases: [],
    style: "Semi-open",
    firstPlayer: "white",
    mainLine: "1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nf3 e6 5. Be2 c5 6. Be3 Nd7 7. O-O Ne7 8. Nbd2",
    whitePlans:
      "- Like the French Advance but the c8 bishop escapes early\n- Short Variation with quiet positional approach\n- Bayonet 4.h4!? for sharp pawn-storm attempts\n- Maintain the central wedge",
    blackPlans:
      "- Get the bishop out before ...e6 (Caro-Kann's advantage over the French)\n- Aim for ...Nge7-f5 outpost\n- ...c5 break attacking the center\n- Solid development behind the pawn chain",
    variations: [
      {
        name: "Main Line (3...Bf5)",
        line: "1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nf3 e6 5. Be2",
        note: "Classical setup with the bishop active outside the chain.",
      },
      {
        name: "Short Variation",
        line: "1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nf3 e6 5. Be2",
        note: "Quiet positional approach popularized by Nigel Short.",
      },
      {
        name: "Tal/Bayonet",
        line: "1. e4 c6 2. d4 d5 3. e5 Bf5 4. h4",
        note: "Sharp pawn-storm attempt.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "caro-kann-exchange",
    name: "Caro-Kann — Exchange",
    eco: "B13",
    aliases: [],
    style: "Semi-open",
    firstPlayer: "white",
    mainLine: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nc6 5. c3 Nf6 6. Bf4 Bg4 7. Qb3 Qd7 8. Nd2",
    whitePlans:
      "- Quiet symmetrical structure\n- Slow buildup with c3 and Nbd2\n- Aim to squeeze a small edge from the IQP-free position\n- Bd3+Bf4 development",
    blackPlans:
      "- Active piece play with ...Nc6, ...Bg4 or ...Bf5\n- Counter the slight initiative with development\n- Aim for piece exchanges and equality\n- Reach a balanced middlegame structure",
    variations: [
      {
        name: "Main Line",
        line: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nc6 5. c3 Nf6 6. Bf4",
        note: "White's classical setup.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "caro-kann-panov",
    name: "Caro-Kann — Panov-Botvinnik Attack",
    eco: "B13-B14",
    aliases: ["Panov Attack"],
    style: "Semi-open",
    firstPlayer: "white",
    mainLine: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 e6 6. Nf3 Be7 7. cxd5 Nxd5 8. Bd3",
    whitePlans:
      "- Play QGD-style positions with IQP\n- Active piece play around the IQP\n- Threats of d4-d5 break and kingside attack\n- Use Bd3 + Qd3 attacking battery",
    blackPlans:
      "- Blockade d5 with the knight\n- Exchange pieces to reach a favorable endgame\n- 5...g6 for a Grunfeld-like setup\n- Solid development with ...Nc6, ...Be7, ...O-O",
    structure:
      "Isolated queen pawn (IQP) for White on d4 — leads to dynamic positions with mutual chances.",
    variations: [
      {
        name: "Main Line",
        line: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 e6 6. Nf3 Be7 7. cxd5 Nxd5",
        note: "Classical IQP middlegame.",
      },
      {
        name: "Grunfeld-like (5...g6)",
        line: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 g6",
        note: "Setting up a Grunfeld-style fianchetto.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "scandinavian",
    name: "Scandinavian Defence",
    eco: "B01",
    aliases: ["Center Counter"],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 c6 6. Bc4 Bf5 7. Bd2 e6 8. Nd5",
    whitePlans:
      "- Use development tempo from harassing the queen\n- Get a small but persistent edge\n- Solid central setup with d4\n- Develop normally with Nc3, Nf3, Bd3",
    blackPlans:
      "- Trade off the e-pawn early\n- Develop pieces to natural squares\n- Adopt Caro-Kann-style structures with ...c6, ...Bf5\n- Modern 3...Qd6 for queen flexibility\n- Or 2...Nf6 (Modern Scandinavian) avoiding queen exposure",
    structure:
      "Caro-Kann-like: White pawn on d4, Black pawn on c6.",
    variations: [
      {
        name: "Main Line (3...Qa5)",
        line: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 c6 6. Bc4 Bf5",
        note: "Classical Mieses Scandinavian.",
      },
      {
        name: "Modern (3...Qd6)",
        line: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qd6",
        note: "Bronstein/Tiviakov modern flexible queen retreat.",
      },
      {
        name: "Marshall (2...Nf6)",
        line: "1. e4 d5 2. exd5 Nf6 3. d4 Nxd5",
        note: "Modern Scandinavian — accepts a tempo loss to avoid queen exposure.",
      },
    ],
    traps: [],
    modelGames: ["Anand vs Lautier, Biel 1997"],
  },

  {
    id: "pirc",
    name: "Pirc Defence",
    eco: "B07-B09",
    aliases: [],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be2 O-O 6. O-O c6 7. a4 Nbd7",
    whitePlans:
      "- Convert the space advantage with attacks\n- Austrian Attack with f4 + e4 + d4 huge pawn front\n- 150 Attack with Be3, Qd2, O-O-O, h4-h5\n- Punish over-passive play",
    blackPlans:
      "- Hypermodern: let White build a big center then attack it\n- Counter the center with ...c5, ...e5, or ...Nc6 + ...Bg4\n- Wait and strike at the right moment\n- Solid king safety with kingside fianchetto",
    variations: [
      {
        name: "Classical",
        line: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be2 O-O 6. O-O",
        note: "Quiet strategic main line.",
      },
      {
        name: "Austrian Attack",
        line: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. Bd3",
        note: "Aggressive with the e4+d4+f4 pawn front.",
      },
      {
        name: "150 Attack",
        line: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3",
        note: "Bayonet attack with O-O-O and h4-h5.",
      },
    ],
    traps: [],
    modelGames: ["Karpov vs Timman, Skelleftea 1989 (Classical Pirc model White play)"],
  },

  {
    id: "modern",
    name: "Modern Defence",
    eco: "B06",
    aliases: ["Robatsch"],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. f4 a6 5. Nf3 b5 6. Bd3 Bb7 7. O-O Nd7 8. Be3",
    whitePlans:
      "- Build a big center and attack\n- 4.f4 Austrian-style pawn advance\n- Develop normally with Nc3, Nf3, Bd3\n- Punish the slow Black setup",
    blackPlans:
      "- Like the Pirc but delays ...Nf6, retaining flexibility\n- Often transposes to Pirc lines\n- Hippopotamus setup with pawns on the third rank\n- Counter-attack after White overextends",
    variations: [
      {
        name: "Modern Main Line",
        line: "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. f4",
        note: "Often transposes to Pirc Austrian Attack.",
      },
      {
        name: "Hippopotamus",
        line: "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. f4 a6 5. Nf3 b5 6. Bd3 Bb7 7. O-O Nd7 8. Be3",
        note: "Black sets up pawns on the third rank and waits.",
      },
    ],
    traps: [],
    modelGames: ["Tony Miles vs Karpov, Skara 1980 (the famous 1...a6 game)"],
  },

  {
    id: "alekhine",
    name: "Alekhine's Defence",
    eco: "B02-B05",
    aliases: [],
    style: "Semi-open",
    firstPlayer: "black",
    mainLine: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 e6 6. O-O Be7 7. c4 Nb6 8. Nc3",
    whitePlans:
      "- Maintain the e5/d4/c4 pawn chain\n- Complete development\n- Exploit Black's slight passivity\n- Four Pawns Attack 5.f4 for aggressive central control",
    blackPlans:
      "- Provoke White into overextending the center\n- Harass the e5/d4/c4 chain with ...d6, ...Bg4, ...g6, ...Bg7, ...Nc6\n- Aim for ...e6/...c5 breaks\n- Counter-attack the pawn chain",
    variations: [
      {
        name: "Modern Variation",
        line: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4",
        note: "Flexible piece development.",
      },
      {
        name: "Four Pawns Attack",
        line: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4",
        note: "Aggressive try; Black plays 5...dxe5 6.fxe5 Nc6.",
      },
      {
        name: "Exchange",
        line: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6",
        note: "Quiet structures with a slight White edge.",
      },
    ],
    traps: [],
    modelGames: ["Fischer vs Spassky, World Championship 1972 game 13"],
  },

  // ============================================================
  // PART III: CLOSED GAMES (1.d4 d5)
  // ============================================================
  {
    id: "queens-gambit-accepted",
    name: "Queen's Gambit Accepted",
    eco: "D20-D29",
    aliases: ["QGA"],
    style: "Closed",
    firstPlayer: "black",
    mainLine: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Bb3 Nc6 8. Nc3",
    whitePlans:
      "- Recover the pawn easily after ...c5 exchange\n- Central majority with d4 and e-pawn\n- Active pieces with bishop pair\n- IQP middlegame for dynamic chances",
    blackPlans:
      "- Take the pawn but typically return it for development\n- Queenside expansion with ...a6, ...b5, ...Bb7\n- Simplification toward the endgame\n- Target the d4 pawn",
    structure:
      "Often IQP for White on d4, leading to dynamic positions with mutual chances.",
    variations: [
      {
        name: "Main Line",
        line: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Bb3",
        note: "Black aims for ...Nc6, ...b5, ...Bb7.",
      },
      {
        name: "Central Variation (3.e4)",
        line: "1. d4 d5 2. c4 dxc4 3. e4 e5 4. Nf3 exd4 5. Bxc4",
        note: "White grabs a big center.",
      },
    ],
    traps: [
      {
        name: "Holding the Pawn Trap",
        line: "1. d4 d5 2. c4 dxc4 3. Nf3 b5 4. a4 c6 5. axb5 cxb5 6. Qf3",
        note: "Trying to hold the c4 pawn loses material.",
      },
    ],
    modelGames: ["Karpov vs Kasparov, World Championship 1986 game 14"],
  },

  {
    id: "queens-gambit-declined",
    name: "Queen's Gambit Declined",
    eco: "D30-D69",
    aliases: ["QGD", "Orthodox Defence"],
    style: "Closed",
    firstPlayer: "black",
    mainLine: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4",
    whitePlans:
      "- Carlsbad minority attack with b4-b5\n- Orthodox setup with Bg5, e3, Nf3, Bd3\n- Press the better pawn structure\n- Sometimes kingside attack with f3+e4",
    blackPlans:
      "- Solid classical setup with ...Nf6, ...Be7, ...O-O\n- Capablanca freeing maneuver ...Nd5\n- Central break with ...c5 or ...Ne4\n- Tartakower 7...b6 for great long-term prospects",
    structure:
      "Carlsbad: White pawns on a2/b2/d4/e3/f2/g2/h2 vs Black pawns on a7/b7/c6/d5/f7/g7/h7 — defines a whole strategic universe.",
    variations: [
      {
        name: "Orthodox",
        line: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5",
        note: "Capablanca freeing maneuver.",
      },
      {
        name: "Tartakower",
        line: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6",
        note: "Black fianchettoes the queen's bishop.",
      },
      {
        name: "Lasker Defence",
        line: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4",
        note: "Black exchanges pieces to relieve the cramp.",
      },
      {
        name: "Cambridge Springs",
        line: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5",
        note: "Queen on a5 pins the c3 knight.",
      },
      {
        name: "Exchange (Carlsbad)",
        line: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 c6 6. e3 Be7 7. Bd3 O-O 8. Qc2",
        note: "Sets up the famous minority attack.",
      },
    ],
    traps: [
      {
        name: "Elephant Trap",
        line: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. cxd5 exd5 6. Nxd5 Nxd5 7. Bxd8 Bb4+ 8. Qd2 Bxd2+ 9. Kxd2 Kxd8",
        note: "Black wins a piece via the discovered tactics.",
      },
    ],
    modelGames: [
      "Capablanca vs Alekhine, World Championship 1927 (multiple QGD games)",
      "Karpov vs Kasparov, World Championship 1984/85 (Carlsbad examples)",
    ],
  },

  {
    id: "slav",
    name: "Slav Defence",
    eco: "D10-D19",
    aliases: [],
    style: "Closed",
    firstPlayer: "black",
    mainLine: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O",
    whitePlans:
      "- a2-a4 to prevent ...b5\n- Recover the c4 pawn with the bishop\n- Central pressure and slight initiative\n- Use the development advantage",
    blackPlans:
      "- 'Slav Triangle' with ...c6 supporting d5\n- Develop the c8 bishop actively to f5 or g4 (the Slav's main advantage)\n- Solid structure that doesn't lock in any pieces\n- Counter with ...e6, ...Bb4, ...O-O",
    variations: [
      {
        name: "Main Line",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4",
        note: "Classical line with comfortable Black development.",
      },
      {
        name: "Chebanenko Slav",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 a6",
        note: "Modern flexible setup; Black prepares ...b5, ...Bb7.",
      },
      {
        name: "Exchange Slav",
        line: "1. d4 d5 2. c4 c6 3. cxd5 cxd5 4. Nc3 Nf6 5. Nf3 Nc6",
        note: "Symmetric, quiet but rich in subtle nuances.",
      },
      {
        name: "Slow Slav",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5",
        note: "Black gets the bishop out before Nc3.",
      },
    ],
    traps: [],
    modelGames: ["Karpov vs Kasparov, World Championship 1985 game 24"],
  },

  {
    id: "semi-slav",
    name: "Semi-Slav",
    eco: "D43-D49",
    aliases: [],
    style: "Closed",
    firstPlayer: "black",
    mainLine: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 h6 6. Bh4 dxc4 7. e4 g5 8. Bg3 b5",
    whitePlans:
      "- Anti-Meran 5.Bg5 to discourage ...dxc4 + ...b5\n- Botvinnik System with deep theoretical lines\n- Moscow Variation 5.Bg5 h6 6.Bh4\n- Central break and kingside attack",
    blackPlans:
      "- Combine Slav (...c6) and QGD (...e6) ideas\n- Meran with queenside expansion ...b5\n- Botvinnik's piece sacrifice theory\n- Rich strategic content with many systems",
    variations: [
      {
        name: "Meran",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5",
        note: "Direct attempt at queenside expansion.",
      },
      {
        name: "Botvinnik System",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Nbd7",
        note: "Piece sacrifice for massive central wedge; theory 30+ moves deep.",
      },
      {
        name: "Moscow Variation",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 h6 6. Bxf6 Qxf6",
        note: "Less sharp than Botvinnik; bishop pair vs space.",
      },
      {
        name: "Anti-Moscow Gambit",
        line: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 h6 6. Bh4 dxc4",
        note: "Sharp gambit lines.",
      },
    ],
    traps: [],
    modelGames: ["Topalov vs Kramnik, World Championship 2006 game 2 (Anti-Moscow Gambit)"],
  },

  {
    id: "chigorin",
    name: "Chigorin Defence",
    eco: "D07",
    aliases: [],
    style: "Closed",
    firstPlayer: "black",
    mainLine: "1. d4 d5 2. c4 Nc6 3. Nc3 dxc4 4. Nf3 Nf6 5. e4 Bg4 6. Be3 e6 7. Bxc4",
    whitePlans:
      "- Convert structural and central advantages\n- Grab the center with e4\n- Develop with normal QGD-like plans\n- Use the c-file pressure",
    blackPlans:
      "- Block the c-pawn but gain rapid piece development\n- Bishop pair after typical exchanges\n- Exchange knight for bishop, harass the white center\n- Active piece play over solid structure",
    variations: [
      {
        name: "Main Line",
        line: "1. d4 d5 2. c4 Nc6 3. Nc3 dxc4 4. Nf3 Nf6 5. e4",
        note: "White grabs the center; Black plays for piece pressure.",
      },
      {
        name: "Exchange (3.cxd5)",
        line: "1. d4 d5 2. c4 Nc6 3. cxd5 Qxd5 4. Nf3 e5",
        note: "Sharp lines.",
      },
    ],
    traps: [],
    modelGames: ["Lasker vs Chigorin, Hastings 1895"],
  },

  {
    id: "albin",
    name: "Albin Counter-Gambit",
    eco: "D08-D09",
    aliases: [],
    style: "Closed",
    firstPlayer: "black",
    mainLine: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3 Bg4 6. Bg2 Qd7 7. O-O O-O-O",
    whitePlans:
      "- Consolidate the extra pawn\n- Undermine the d4 pawn with Nbd2 + e3\n- Fianchetto setup with g3, Bg2 to neutralize the d-pawn\n- Slowly convert the extra pawn",
    blackPlans:
      "- Sacrifice a pawn for active piece play\n- Pressure with the d4 wedge\n- Fast development\n- Kingside attack chances\n- Aim for the Lasker Trap pattern with under-promotion to a knight",
    variations: [
      {
        name: "Main Line",
        line: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3",
        note: "Modern handling with kingside fianchetto.",
      },
    ],
    traps: [
      {
        name: "Lasker Trap",
        line: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. e3 Bb4+ 5. Bd2 dxe3 6. Bxb4 exf2+ 7. Ke2 fxg1=N+",
        note: "The famous under-promotion to a knight!",
      },
    ],
    modelGames: ["Morozevich vs Bareev, Astana 2001 (modern Albin handling)"],
  },

  // ============================================================
  // PART IV: INDIAN DEFENCES (1.d4 Nf6)
  // ============================================================
  {
    id: "kings-indian",
    name: "King's Indian Defence",
    eco: "E60-E99",
    aliases: ["KID"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7",
    whitePlans:
      "- Mar del Plata: c4-c5 break and queenside attack\n- Bayonet Attack 9.b4 to accelerate queenside play\n- Samisch with Be3, Qd2, O-O-O, g4-h4-h5 attack\n- Four Pawns Attack with massive central front",
    blackPlans:
      "- Accept the cramped position for a kingside pawn storm\n- Mar del Plata: ...Nh5/Ne8, ...f5, ...f4, ...g5\n- 'Race' character — attack faster than White on the opposite wing\n- Common tactics: ...Nf4 sacrifice, ...g4-g3 breakthrough, ...Rxf3",
    structure:
      "'Race' character — White attacks queenside, Black attacks kingside. The first to break through wins; positional understanding matters less than calculation and pattern recognition.",
    variations: [
      {
        name: "Classical (Mar del Plata)",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7",
        note: "Classical race-style main line.",
      },
      {
        name: "Bayonet Attack",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4",
        note: "White accelerates the queenside attack.",
      },
      {
        name: "Samisch",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5",
        note: "Solidifies e4 and prepares kingside or queenside expansion.",
      },
      {
        name: "Fianchetto",
        line: "1. d4 Nf6 2. c4 g6 3. Nf3 Bg7 4. g3 O-O 5. Bg2 d6 6. O-O Nc6 7. Nc3 a6",
        note: "Quieter Catalan-style setup; the Panno variation.",
      },
      {
        name: "Four Pawns Attack",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Nf3 c5 7. d5 e6",
        note: "Aggressive but committal central front.",
      },
      {
        name: "Averbakh",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Bg5",
        note: "Bg5 prevents standard ...e5; Black plays ...c5 or ...Na6.",
      },
    ],
    traps: [],
    modelGames: [
      "Piket vs Kasparov, Tilburg 1989 (Mar del Plata, Kasparov's Rxf3 sacrifice)",
      "Korchnoi vs Kasparov, Yerevan Olympiad 1996 (Bayonet Attack)",
    ],
  },

  {
    id: "nimzo-indian",
    name: "Nimzo-Indian Defence",
    eco: "E20-E59",
    aliases: ["Nimzo", "Nimzowitsch"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5 6. Nf3 c5 7. O-O Nc6 8. a3",
    whitePlans:
      "- Rubinstein 4.e3 quiet positional buildup\n- Classical 4.Qc2 avoiding doubled c-pawns\n- Samisch 4.a3 accepting doubled c-pawns for the bishop pair\n- Use the bishop pair effectively before Black blockades",
    blackPlans:
      "- Pin the c3 knight and willing to give up the bishop pair for structural damage\n- Knight outposts on c4 and e4\n- Dark-square play\n- Central breaks with ...c5 and ...d5\n- Structural targets: doubled c-pawns",
    structure:
      "Doubled c-pawns (after ...Bxc3+/bxc3), isolated d-pawn, hanging pawns (c4+d4) — the Nimzo is a textbook in pawn-structure handling.",
    variations: [
      {
        name: "Rubinstein",
        line: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5 6. Nf3 c5 7. O-O",
        note: "Most popular White system for decades.",
      },
      {
        name: "Classical (Capablanca)",
        line: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 O-O 5. a3 Bxc3+ 6. Qxc3",
        note: "White avoids doubled c-pawns by recapturing with the queen.",
      },
      {
        name: "Samisch",
        line: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. e3 Nc6 7. Bd3",
        note: "The classic Nimzo bargain — bishop pair vs doubled pawns.",
      },
      {
        name: "Leningrad",
        line: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bg5 h6 5. Bh4 c5 6. d5 d6",
        note: "Pin the knight for active piece play.",
      },
    ],
    traps: [],
    modelGames: [
      "Capablanca vs Nimzowitsch, New York 1927",
      "Karpov vs Kasparov, World Championship 1985 game 16 (the 'octopus knight')",
    ],
  },

  {
    id: "queens-indian",
    name: "Queen's Indian Defence",
    eco: "E12-E19",
    aliases: ["QID"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3 Ne4 8. Qc2",
    whitePlans:
      "- Central control, eventual e2-e4 break\n- Kingside expansion\n- Petrosian Variation with 4.a3 preparing Nc3 without the pin\n- Fianchetto with Bg2 for long-diagonal control",
    blackPlans:
      "- Avoid the Nimzo when 3.Nf3 is played\n- Firm light-square control with ...Bb7\n- Knight on f6 hits e4\n- Eventual ...d5 or ...c5 breaks\n- 4...Ba6 attacking the c4 pawn",
    structure:
      "'Small center' with c4/d4 vs c7/d7-e6, often becomes hanging pawns (c4+d4) or isolated d-pawn.",
    variations: [
      {
        name: "Main Line",
        line: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O",
        note: "Both sides fianchetto for long-diagonal control.",
      },
      {
        name: "4...Ba6",
        line: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6",
        note: "Modern main line attacking the c4 pawn.",
      },
      {
        name: "Petrosian Variation",
        line: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. a3",
        note: "Karpov favorite; prepares Nc3 without ...Bb4 pin.",
      },
    ],
    traps: [],
    modelGames: ["Karpov vs Korchnoi, Baguio 1978 (Petrosian system)"],
  },

  {
    id: "grunfeld",
    name: "Grünfeld Defence",
    eco: "D80-D99",
    aliases: ["Grunfeld"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Rb1",
    whitePlans:
      "- Strong c3+d4+e4 pawn center\n- Kingside attack chances\n- Russian Variation with 5.Qb3 pressuring d5\n- Fianchetto with 5.g3 quieter Catalan-style setup",
    blackPlans:
      "- Hypermodern: let White build a center, then attack it\n- Undermine with ...c5 and ...Nc6 + ...Bg4\n- Pressure the c3+d4 pawns\n- Long-diagonal pressure with the g7-bishop",
    variations: [
      {
        name: "Exchange Variation",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5",
        note: "Classical Exchange Grunfeld main line.",
      },
      {
        name: "Russian Variation",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4",
        note: "Queen pressures d5; White builds a big center.",
      },
      {
        name: "Fianchetto",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. g3 c6 6. Bg2 O-O 7. O-O",
        note: "Catalan-style setup; quieter positional play.",
      },
      {
        name: "Bf4 Variation",
        line: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4",
        note: "Active development of the dark-squared bishop.",
      },
    ],
    traps: [],
    modelGames: [
      "Karpov vs Kasparov, World Championship 1990 (multiple Exchange Grunfelds)",
      "Shirov vs Kasparov, Linares 1997 (Russian Variation, sharp tactics)",
    ],
  },

  {
    id: "catalan",
    name: "Catalan Opening",
    eco: "E00-E09",
    aliases: [],
    style: "Indian",
    firstPlayer: "white",
    mainLine: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O dxc4 7. Qc2 a6 8. Qxc4",
    whitePlans:
      "- Long-diagonal pressure with Bg2 (the 'Catalan bishop')\n- e2-e4 break for central expansion\n- Queenside expansion with b3+Bb2 or a4-a5\n- Combine Queen's Gambit with kingside fianchetto",
    blackPlans:
      "- Equalize via simplifications\n- ...c5 break\n- ...b5+Bb7 setup to neutralize the Catalan bishop\n- Solid development with ...Be7, ...O-O\n- In Open Catalan, hold onto the c4 pawn temporarily",
    variations: [
      {
        name: "Open Catalan",
        line: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 a6 6. O-O Nc6 7. e3 Bd7 8. Nbd2",
        note: "White recovers the pawn slowly; Black aims for ...Rb8, ...b5.",
      },
      {
        name: "Closed Catalan",
        line: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6",
        note: "Slow buildup with maintained tension.",
      },
    ],
    traps: [],
    modelGames: ["Kramnik vs Topalov, World Championship 2006 game 1 (Closed Catalan, Kramnik's positional grind)"],
  },

  {
    id: "bogo-indian",
    name: "Bogo-Indian Defence",
    eco: "E11",
    aliases: ["Bogo"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+ 4. Bd2 Qe7 5. g3 O-O 6. Bg2 Bxd2+ 7. Qxd2 d6",
    whitePlans:
      "- Quiet positional struggle\n- Complete development\n- Slowly improve positioning\n- 4.Bd2 or 4.Nbd2 to block the check",
    blackPlans:
      "- Avoid the Catalan/QID with the early bishop check\n- Simplify and equalize\n- Aim for solid structures\n- A 'no-frills' defense for solidity over winning chances",
    variations: [
      {
        name: "Main Line (4.Bd2)",
        line: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+ 4. Bd2 Qe7",
        note: "Quiet positional struggle.",
      },
      {
        name: "4.Nbd2",
        line: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+ 4. Nbd2 O-O 5. a3 Be7",
        note: "Solid blocking with the knight.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "modern-benoni",
    name: "Modern Benoni",
    eco: "A60-A79",
    aliases: ["Benoni"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O",
    whitePlans:
      "- Central majority advance with e4-e5 break\n- Kingside attack with f4, Bd3, h3, g4\n- Classical setup with 8.Be2, 9.O-O\n- Modern Main Line with 8.h3 preparing Bd3 without ...Bg4 worries\n- Taimanov Attack 8.Bb5+",
    blackPlans:
      "- Queenside expansion with ...a6, ...b5, ...Nbd7-Ne5\n- Active piece play and fight for e5/e4 squares\n- Sometimes ...Re8 and ...Nh5/...Nb6 maneuvers\n- Accept the cramped position for dynamic chances",
    variations: [
      {
        name: "Classical (8.Be2)",
        line: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2",
        note: "Solid main setup.",
      },
      {
        name: "Modern Main Line (8.h3)",
        line: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. h3",
        note: "Preparing Bd3 without ...Bg4 worries.",
      },
      {
        name: "Taimanov Attack",
        line: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Bb5+",
        note: "Sharp, popular at top level.",
      },
      {
        name: "Czech Benoni",
        line: "1. d4 Nf6 2. c4 c5 3. d5 e5",
        note: "Locks the center for slow maneuvering.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "benko-gambit",
    name: "Benko Gambit",
    eco: "A57-A59",
    aliases: ["Volga Gambit"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. Nf3 d6 8. g3 Bg7",
    whitePlans:
      "- Complete development\n- Exchange Black's active pieces\n- Convert the extra pawn in the endgame\n- 4.Nf3 quiet decline; 4.a4 restraining; 4.Qc2 central retention",
    blackPlans:
      "- Sacrifice a pawn for long-term queenside pressure\n- Open a- and b-files for the rooks\n- Active piece play with ...Bg7 on the long diagonal\n- ...Qa5/...Qb6, ...Rfb8/Rfa8, ...Nbd7-e5 maneuvers",
    variations: [
      {
        name: "Accepted",
        line: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 g6 6. Nc3 Bxa6 7. Nf3",
        note: "Black has full positional compensation.",
      },
      {
        name: "Declined (4.Nf3)",
        line: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. Nf3",
        note: "Quiet decline.",
      },
      {
        name: "5.b6 (Returning the Pawn)",
        line: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. b6",
        note: "Returning the pawn to keep the position closed.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "dutch",
    name: "Dutch Defence",
    eco: "A80-A99",
    aliases: ["Dutch"],
    style: "Indian",
    firstPlayer: "black",
    mainLine: "1. d4 f5 2. g3 Nf6 3. Bg2 g6 4. Nf3 Bg7 5. O-O O-O 6. c4 d6 7. Nc3 Nc6",
    whitePlans:
      "- Fianchetto with g3, Bg2 for long-diagonal control\n- Anti-Dutch options: Staunton Gambit 2.e4!?\n- Korchnoi Attack 2.Bg5\n- Use the slight weaknesses in Black's structure",
    blackPlans:
      "- Grab kingside space and aim for an attack on the white king\n- Leningrad fianchetto setup with KID-style pawn structure\n- Stonewall with c6+d5+e6+f5 strong central control\n- Classical Dutch keeps options open",
    variations: [
      {
        name: "Leningrad Dutch",
        line: "1. d4 f5 2. g3 Nf6 3. Bg2 g6 4. Nf3 Bg7 5. O-O O-O 6. c4 d6 7. Nc3",
        note: "Combines Dutch ideas with King's Indian-style fianchetto.",
      },
      {
        name: "Stonewall Dutch",
        line: "1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nf3 d5 5. O-O Bd6 6. c4 c6",
        note: "Strong central pawn 'wall' with c6+d5+e6+f5.",
      },
      {
        name: "Classical Dutch",
        line: "1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nf3 Be7 5. O-O O-O",
        note: "Most flexible Dutch setup.",
      },
      {
        name: "Staunton Gambit",
        line: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5",
        note: "Sharp anti-Dutch gambit.",
      },
    ],
    traps: [],
    modelGames: ["Botvinnik vs Bronstein, World Championship 1951 (Stonewall)"],
  },

  // ============================================================
  // PART V: FLANK OPENINGS
  // ============================================================
  {
    id: "english",
    name: "English Opening",
    eco: "A10-A39",
    aliases: [],
    style: "Flank",
    firstPlayer: "white",
    mainLine: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6 6. O-O O-O 7. d3 d6 8. a3",
    whitePlans:
      "- Grab queenside space and prepare a flexible game\n- Can transpose into many openings (QGD, Catalan, Nimzo)\n- Reversed Sicilian with extra tempo\n- Botvinnik System with c4+d3+e4+Bg2\n- Mikenas Attack 1.c4 Nf6 2.Nc3 e6 3.e4",
    blackPlans:
      "- Symmetrical setup with ...c5\n- Reversed Sicilian with 1...e5\n- Solid Indian-style setups with ...Nf6\n- 1...e6 transposing to Catalan/QGD\n- Counter the first-move advantage with accurate development",
    variations: [
      {
        name: "Symmetrical English",
        line: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6 6. O-O O-O",
        note: "Both sides build identical structures.",
      },
      {
        name: "Reversed Sicilian (1...e5)",
        line: "1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3",
        note: "White plays a Sicilian with an extra tempo.",
      },
      {
        name: "Mikenas Attack",
        line: "1. c4 Nf6 2. Nc3 e6 3. e4 d5 4. e5 d4",
        note: "Aggressive central thrust against the Indian setup.",
      },
      {
        name: "Anti-Benoni",
        line: "1. c4 Nf6 2. Nc3 c5 3. Nf3 d5",
        note: "English versus Benoni-style positions.",
      },
    ],
    traps: [],
    modelGames: [
      "Karpov vs Spassky, Candidates 1974 (model English handling)",
      "Carlsen vs Anand, World Championship 2014 game 11 (modern English grind)",
    ],
  },

  {
    id: "reti",
    name: "Réti Opening",
    eco: "A04-A09",
    aliases: ["Reti"],
    style: "Flank",
    firstPlayer: "white",
    mainLine: "1. Nf3 d5 2. c4 e6 3. g3 Nf6 4. Bg2 Be7 5. O-O O-O 6. b3 c5 7. Bb2",
    whitePlans:
      "- Hypermodern: invite Black to occupy the center, then attack it with c4 + fianchetto\n- Flexible setup transposing into many openings\n- Test Black's opening knowledge across multiple structures\n- Long-diagonal pressure with Bg2 and Bb2",
    blackPlans:
      "- 2...d4 grabs space; White plays 3.b4 or 3.g3\n- 2...e6 transposes to Catalan/QGD-style positions\n- 2...c6 quiet Slav-like setup\n- 2...dxc4 with Réti accepted\n- Solid central play",
    variations: [
      {
        name: "Main Line",
        line: "1. Nf3 d5 2. c4 e6 3. g3 Nf6 4. Bg2 Be7",
        note: "Classical Reti setup.",
      },
      {
        name: "2...d4",
        line: "1. Nf3 d5 2. c4 d4 3. b4 f6",
        note: "Black grabs space; White attacks with b4.",
      },
      {
        name: "Réti Accepted",
        line: "1. Nf3 d5 2. c4 dxc4 3. e3",
        note: "White recovers the pawn.",
      },
    ],
    traps: [],
    modelGames: ["Réti vs Capablanca, New York 1924 (first Capablanca defeat in 8 years)"],
  },

  {
    id: "birds",
    name: "Bird's Opening",
    eco: "A02-A03",
    aliases: ["Bird"],
    style: "Flank",
    firstPlayer: "white",
    mainLine: "1. f4 d5 2. Nf3 Nf6 3. g3 g6 4. Bg2 Bg7 5. O-O O-O 6. d3 c5 7. c3 Nc6 8. Na3",
    whitePlans:
      "- Reversed Dutch — kingside space and Stonewall/Leningrad-style attack\n- Leningrad Bird with kingside fianchetto\n- Modern Bird with 3.b3\n- Useful surprise weapon at lower levels",
    blackPlans:
      "- 1...d5 entering symmetric reversed Dutch positions\n- From's Gambit 1...e5!? sharp counterattack\n- Solid development against the slightly weakening 1.f4\n- Pressure the e4 hole",
    variations: [
      {
        name: "Leningrad Bird",
        line: "1. f4 d5 2. Nf3 Nf6 3. g3 g6 4. Bg2 Bg7 5. O-O O-O 6. d3 c5 7. c3",
        note: "Reversed Leningrad Dutch.",
      },
      {
        name: "From's Gambit",
        line: "1. f4 e5 2. fxe5 d6 3. exd6 Bxd6 4. Nf3 g5",
        note: "Sharp counterattack against the Bird.",
      },
    ],
    traps: [],
    modelGames: [],
  },

  {
    id: "london",
    name: "London System",
    eco: "D02",
    aliases: [],
    style: "Flank",
    firstPlayer: "white",
    mainLine: "1. d4 d5 2. Nf3 Nf6 3. Bf4 c5 4. e3 Nc6 5. Nbd2 e6 6. c3 Bd6 7. Bg3 O-O",
    whitePlans:
      "- Super-solid system: develop the dark-squared bishop outside the pawn chain\n- Same setup against virtually any Black response: e3, c3, Bd3, Nbd2, h3, O-O\n- Ne5 outpost\n- Eventual Bd3+Qf3+Ng4 kingside attack\n- Sometimes minority attack with b4-b5",
    blackPlans:
      "- Avoid passive play\n- ...Qb6 hitting b2 to force commitment\n- ...c5 break\n- ...Nh5 trying to exchange the Bf4\n- Aim for active piece play",
    variations: [
      {
        name: "Main Line",
        line: "1. d4 d5 2. Nf3 Nf6 3. Bf4 c5 4. e3 Nc6 5. Nbd2 e6 6. c3 Bd6 7. Bg3",
        note: "Quiet maneuvering with kingside attack chances.",
      },
      {
        name: "Anti-London",
        line: "1. d4 d5 2. Nf3 Nf6 3. Bf4 c5 4. e3 Qb6",
        note: "Pressure on b2 forces White to commit.",
      },
    ],
    traps: [],
    modelGames: ["Carlsen vs Karjakin, World Championship 2016 (multiple London System wins)"],
  },

  {
    id: "kings-indian-attack",
    name: "King's Indian Attack",
    eco: "A07-A08",
    aliases: ["KIA"],
    style: "Flank",
    firstPlayer: "white",
    mainLine: "1. Nf3 d5 2. g3 c5 3. Bg2 Nc6 4. O-O e6 5. d3 Nf6 6. Nbd2 Be7 7. e4",
    whitePlans:
      "- King's Indian Defence with reversed colors\n- Kingside attack with Nh4-f5, e4-e5, f4-f5\n- Flexible 'system' play — one setup against many Black openings\n- Powerful vs French (1.e4 e6 2.d3) and Sicilian (1.e4 c5 2.Nf3 + 3.g3)",
    blackPlans:
      "- Queenside counterplay with ...b5, ...Bb7, ...Nc6/Nbd7\n- Solid central setup with ...d5\n- Counter the e4-e5 push\n- Use the slight extra tempo from White's restraint",
    variations: [
      {
        name: "vs French Setup",
        line: "1. e4 e6 2. d3 d5 3. Nd2 Nf6 4. Ngf3 c5 5. g3 Nc6 6. Bg2 Be7 7. O-O O-O",
        note: "Quiet KIA buildup, eventual e4-e5 + f-pawn attack.",
      },
      {
        name: "vs Sicilian Setup",
        line: "1. e4 c5 2. Nf3 e6 3. d3 Nc6 4. g3 d5 5. Nbd2 Bd6 6. Bg2 Nge7 7. O-O O-O",
        note: "Standard KIA with Nbd2, e4, Re1, e5 break.",
      },
    ],
    traps: [],
    modelGames: ["Fischer vs Myagmarsuren, Sousse Interzonal 1967 (classic KIA attack with queen sacrifice idea)"],
  },
];

// ============================================================
// OPENING TREE — sidebar navigation grouping
// ============================================================
export const OPENING_TREE = [
  {
    name: "Open Games (1.e4 e5)",
    children: [
      { id: "italian-game", name: "Italian Game" },
      { id: "ruy-lopez", name: "Ruy López (Spanish)" },
      { id: "scotch", name: "Scotch Game" },
      { id: "vienna", name: "Vienna Game" },
      { id: "kings-gambit", name: "King's Gambit" },
      { id: "petroff", name: "Petroff Defence" },
      { id: "philidor", name: "Philidor Defence" },
    ],
  },
  {
    name: "Sicilian Defence (1.e4 c5)",
    children: [
      { id: "sicilian-najdorf", name: "Najdorf" },
      { id: "sicilian-dragon", name: "Dragon" },
      { id: "sicilian-sveshnikov", name: "Sveshnikov" },
      { id: "sicilian-taimanov", name: "Taimanov" },
      { id: "sicilian-scheveningen", name: "Scheveningen" },
      { id: "sicilian-kan", name: "Kan" },
      { id: "sicilian-accelerated-dragon", name: "Accelerated Dragon" },
      { id: "sicilian-classical", name: "Classical" },
      { id: "sicilian-alapin", name: "Alapin (c3)" },
      { id: "sicilian-smith-morra", name: "Smith-Morra Gambit" },
      { id: "sicilian-closed", name: "Closed Sicilian" },
    ],
  },
  {
    name: "Other Semi-Open Games (1.e4)",
    children: [
      { id: "french-winawer", name: "French — Winawer" },
      { id: "french-tarrasch", name: "French — Tarrasch" },
      { id: "french-advance", name: "French — Advance" },
      { id: "french-classical", name: "French — Classical" },
      { id: "french-exchange", name: "French — Exchange" },
      { id: "caro-kann-classical", name: "Caro-Kann — Classical" },
      { id: "caro-kann-advance", name: "Caro-Kann — Advance" },
      { id: "caro-kann-exchange", name: "Caro-Kann — Exchange" },
      { id: "caro-kann-panov", name: "Caro-Kann — Panov" },
      { id: "scandinavian", name: "Scandinavian" },
      { id: "pirc", name: "Pirc" },
      { id: "modern", name: "Modern" },
      { id: "alekhine", name: "Alekhine" },
    ],
  },
  {
    name: "Closed Games (1.d4 d5)",
    children: [
      { id: "queens-gambit-accepted", name: "Queen's Gambit Accepted" },
      { id: "queens-gambit-declined", name: "Queen's Gambit Declined" },
      { id: "slav", name: "Slav Defence" },
      { id: "semi-slav", name: "Semi-Slav" },
      { id: "chigorin", name: "Chigorin" },
      { id: "albin", name: "Albin Counter-Gambit" },
    ],
  },
  {
    name: "Indian Defences (1.d4 Nf6)",
    children: [
      { id: "kings-indian", name: "King's Indian Defence" },
      { id: "nimzo-indian", name: "Nimzo-Indian" },
      { id: "queens-indian", name: "Queen's Indian" },
      { id: "grunfeld", name: "Grünfeld" },
      { id: "catalan", name: "Catalan" },
      { id: "bogo-indian", name: "Bogo-Indian" },
      { id: "modern-benoni", name: "Modern Benoni" },
      { id: "benko-gambit", name: "Benko Gambit" },
      { id: "dutch", name: "Dutch Defence" },
    ],
  },
  {
    name: "Flank Openings",
    children: [
      { id: "english", name: "English Opening" },
      { id: "reti", name: "Réti Opening" },
      { id: "birds", name: "Bird's Opening" },
      { id: "london", name: "London System" },
      { id: "kings-indian-attack", name: "King's Indian Attack" },
    ],
  },
];
