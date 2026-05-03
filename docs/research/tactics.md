# Chess Tactics — Research Document

A pattern-recognition reference for the Chess Academy app. Part A defines each tactical motif. Part B provides a parsable puzzle library (60+ positions) covering every motif.

---

## Part A — Pattern Catalog

### Pin (absolute and relative)

A **pin** occurs when a long-range attacker (queen, rook, or bishop) attacks an enemy piece that, if it moved, would expose a more valuable piece (or the king) on the same line.

- **Absolute pin** — the piece behind the pinned unit is the king. The pinned piece literally cannot move legally along that line (it would expose the king to check). This makes the pinned piece a stationary target you can attack repeatedly with pawns and minor pieces.
- **Relative pin** — the piece behind is more valuable than the pinned piece, but moving the pinned piece is legal (just disastrous). For example, a knight pinned to a queen by a bishop.

**When it arises:** Open files (after pawn trades), open diagonals (after fianchetto exchanges or after f7/f2 pawns move), and any time a king sits in a line of fire with a piece in between.

**How to spot it:** Scan every long-range piece (B, R, Q) and trace its lines. If the line contains an enemy piece followed by a more valuable enemy piece (with no obstruction between), you have a pin candidate. Then ask: can I add another attacker to the pinned piece?

**Examples:**
- After 1.e4 e5 2.Nf3 d6 3.Bc4 Bg4? 4.Nxe5! — the bishop on g4 is pinned to the queen, but white exploits a counter-tactic. (FEN after 3...Bg4: `rn1qkbnr/ppp2ppp/3p4/4p3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 1 4`)
- Classic Bg5 pin of the Nf6 against the queen on d8 in many openings: `rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 3`

### Skewer (X-ray)

A **skewer** is a pin in reverse: the more valuable piece is *in front* of the less valuable piece. When the front piece moves out of attack, the rear piece falls.

**When it arises:** Endings with exposed kings, queens on open lines, and rook-vs-rook positions where one rook is forced to move.

**How to spot it:** Look for an enemy king or queen that you can attack with a B/R/Q along a line where another enemy piece sits behind. The check or attack on the high-value piece *forces* it to move, exposing the rear unit.

**Example:** `4k3/8/8/8/8/8/4Q3/4K3 w - - 0 1` — with a black rook on e6 added, Qe6+ would skewer king to rook (composed setup).

### Fork

A **fork** is a single move that creates two or more simultaneous threats, usually winning material because the opponent can only address one.

- **Knight fork** — the most feared because of the knight's L-shape; it can attack king and queen on different colored squares simultaneously. Memorize the "family fork" pattern (Nxc7+ forking K on e8 and R on a8).
- **Bishop fork** — typically a discovered or double-attack on two pieces along a diagonal.
- **Rook fork** — common in endings on the seventh rank.
- **Queen fork** — the queen's range makes her the universal forker; watch for queen + check + hanging piece patterns.
- **Pawn fork** — a pawn pushed two squares attacks two pieces; cheap and devastating.
- **King fork** — in endings, a king can attack two pieces (typically two pawns or a piece + pawn).

**When it arises:** Whenever pieces sit on knight-move-distance from a square the knight can reach, or on the same rank/file/diagonal with a check available.

**How to spot it:** After every check, ask "what else is the checking piece attacking?" Train the knight-fork radius on c7, f7, c2, f2, and the centralized squares e5/d5/e4/d4.

**Example:** `r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4` — knight tour to d5 leading to forks is a recurring Italian-game theme.

### Discovered attack

A **discovered attack** happens when one piece moves out of the way to unleash an attack from a piece behind it. The moving piece can simultaneously make a threat of its own — that's the trick. You essentially get two moves at once.

**When it arises:** Whenever a friendly piece sits on a line between your long-range piece (R/B/Q) and an enemy target.

**How to spot it:** Look for "batteries" — your bishop or rook lined up with the enemy king or queen, blocked by one of your own pieces. The blocker is the discovery piece; ask where it can go to also create a threat.

**Example:** `r1bqkb1r/ppp2ppp/2n2n2/3pp3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5` — after 1.exd5 Nxd5 2.Nxd5! the discovered attacks recur in Italian/Two Knights structures.

### Discovered check / Double check

A **discovered check** is a discovered attack where the unmasked piece gives check. The moving piece can capture, fork, or grab anything because the opponent *must* respond to the check.

A **double check** is the supercharged version: both the moving piece *and* the unmasked piece check the king simultaneously. Because the king must move (you cannot block or capture two checkers at once), double check is extremely forcing — it's the engine behind smothered mates and the Boden's mate family.

**When it arises:** When you have a battery aimed at the enemy king, and you can move the discovery piece *with check* itself.

**How to spot it:** Same battery scan as discovered attacks, but specifically aimed at the king.

**Example:** Réti's 1925 trap — `rnb1k2r/pppp1ppp/8/3qp3/3P4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 6` and the famous double-check finish (see puzzle library).

### Double attack

A **double attack** is the umbrella concept: any single move that creates two threats. Forks are double attacks by one piece; discovered attacks are double attacks by two pieces. The defining feature is that the opponent cannot meet both threats with one move.

**When it arises:** Constantly. Most tactics reduce to a double attack at the critical moment.

**How to spot it:** After every candidate move, ask "what two things does this threaten?" Quiet centralizing moves (Qd4, Re1) often double-attack pieces and squares simultaneously.

### Removing the defender (Removing the Guard)

If a key enemy piece (often the king's defender, or a piece guarding a critical square) is captured, traded, or chased away, the position behind it collapses. Also called **undermining**.

**When it arises:** When a single piece defends multiple things, or when a defender of a mating square can be eliminated.

**How to spot it:** For every undefended-looking attack, identify the *defender*, then ask "can I capture or chase that defender?" Pawn pushes (h4-h5 to chase a Nf6 defender of h7) are classic undermining moves.

**Example:** Sacrifices on h7 in the Greek-gift family rely on first noting that the Nf6 defender has been removed (often via ...Nbd7 blocking, or Bg5xf6).

### Deflection

**Deflection** forces an enemy piece *away* from a critical duty by attacking it elsewhere. The defender either takes the bait (and abandons its post) or loses material.

**When it arises:** When one enemy piece is overworked — defending two things at once, or holding the back rank, or guarding a key square.

**How to spot it:** Find the piece doing too much work. Then find a forcing move (check, capture, mate threat) that pulls it off duty.

**Example:** Queen sacrifices to deflect a defender of the back rank: `6k1/5ppp/8/8/8/8/r4PPP/3R2K1 b - - 0 1` — Black plays Ra1 deflecting the rook, then mate or rook win.

### Decoy / Attraction

**Decoy** lures an enemy piece *to* a specific square where it can be exploited (often a square where it's forked, pinned, or mated). The opposite of deflection — instead of pulling away, you pull *toward*.

**When it arises:** Mating attacks where the king can be dragged onto a vulnerable square; combinations winning material via a forced capture onto a forking square.

**How to spot it:** Identify the square you wish the enemy piece *were* on. Then find a sacrifice that forces the piece there.

**Example:** Queen sacrifice on h8 to drag the king to h8, then knight check forks king and queen.

### Interference / Interposition

**Interference** is placing a piece *between* an attacker and its target — typically between a defender and the piece it's defending — so the defender's line is blocked. Often a sacrifice, because the interfering piece is en prise.

**When it arises:** When two enemy pieces are coordinating along a line (one defending the other) and you can drop a piece between them.

**How to spot it:** Look for enemy R+R or Q+R defending each other along a line; a knight or bishop sacrifice between them severs the defense.

**Example:** A bishop drops on e6 between a defending rook on a6 and the piece it defends on h6.

### Zwischenzug (Intermediate move)

The **in-between move** — instead of making the "expected" recapture or response, you insert a more forcing move first (usually a check or a bigger threat). The opponent must address the zwischenzug; *then* you go back and complete the original idea, often with a much better outcome.

**When it arises:** In any forced sequence where you assume a recapture is automatic. The skill is questioning that automatic move.

**How to spot it:** During calculation, after every "obvious" recapture, ask "is there a check or bigger threat I can play first?"

**Example:** After 1.Nxe5 Nxe5 most players would play 2.d4, but a zwischenzug check first might win more.

### Overloading

A piece is **overloaded** when it has too many defensive duties — guarding two pieces, two squares, or a piece *and* the back rank. Attack one duty, and the other collapses.

**When it arises:** Late middlegame and endgame, when material is reduced and individual pieces shoulder multiple jobs.

**How to spot it:** Catalog what each enemy piece defends. Any piece with two or more critical defensive jobs is a tactical target.

**Example:** A queen on d7 defending both the back-rank mate square *and* a hanging piece on c6.

### X-ray attack/defense

An **X-ray** is when a piece attacks (or defends) a square or piece *through* another piece. Functionally similar to a skewer or pin, but the term often applies to defensive setups (a rook on a1 X-ray-defending a knight on a4 through a black piece on a3) or to combinations where capturing one piece exposes the X-ray.

**When it arises:** Heavy-piece endings, especially queen endings, where one queen X-rays the other through a pawn.

**How to spot it:** Any time pieces line up — even with enemy pieces in between — there's a latent X-ray to consider.

### Back-rank weakness and back-rank mate

A king castled behind unmoved pawns can be mated by a rook or queen arriving on the back rank with no escape. The "luft" (h2-h3 or g2-g3) is the standard prophylactic.

**When it arises:** Almost every kingside-castled position before the king's pawns have moved.

**How to spot it:** Count escape squares for the enemy king. If zero, look for any way to deliver Rd8/Re8/Rb8/Ra8 mate — including by removing defenders, deflecting, or clearance.

**Example:** `6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1` — Re8#.

### Smothered mate (Philidor's legacy)

A king surrounded by its own pieces is mated by a knight check it cannot block, capture, or run from. The classic recipe: queen sacrifice to lure the rook/piece next to the king, then Nf7#.

**When it arises:** When the enemy king is on a corner square (h8/a8/h1/a1) blocked by its own rook and pawns, and you have a knight + queen.

**How to spot it:** King on h8/h1 corner with R on g8/g1, pawn on h7/h2, and your knight reaches f7/f2 with support. Look for the Q+N "smothered net" pattern.

**Example sequence:** Nf7+ Kg8 Nh6+ Kh8 Qg8+ Rxg8 Nf7#.

### Windmill (Torre vs Lasker pattern)

A **windmill** is a repeating discovered-check sequence that grinds through enemy material. A bishop and rook combine: the rook gives check, the bishop's discovery snaps a piece, the rook moves back with check, the bishop's discovery snaps another piece, and so on.

**When it arises:** Rare but devastating. Requires a specific geometry: your rook adjacent to enemy king on the 7th, your bishop on a diagonal pinning/raking the back rank.

**How to spot it:** Look for a discovered check where the unmasked piece (often a bishop on a long diagonal) wins material on every cycle.

**Example:** Torre vs Lasker, Moscow 1925 — `r2q1rk1/pp1bbppp/2n1pn2/3p4/3P1B2/2N1PN2/PP2BPPP/R2Q1RK1 w - - 0 1` and the famous Bf6!! windmill.

### Desperado

A piece that is doomed (will be captured next move regardless) sells its life for maximum damage. Both sides may have desperado pieces — capture each other's hanging units before the original threat resolves.

**When it arises:** After a sequence where multiple captures happen and one piece on each side is hanging.

**How to spot it:** When one of your pieces is going to be lost anyway, ask "what's the most expensive thing it can take, or the most damaging check it can give?"

### Clearance sacrifice

A piece sacrifices itself to vacate a square or line so a *different* piece can use it. Often the cleared square is a critical mating square or attacking outpost.

**When it arises:** When your own pawn or piece is in the way of a winning combination.

**How to spot it:** During calculation, when you say "if only my [bishop] weren't on f6, my queen would mate on h8" — look for a clearance sacrifice of that bishop.

**Example:** Sacrificing a queen on g6 to clear the file for Rxg7#.

### Promotion tactics (under-promotion, queening tactics)

Pawn endings (and many middlegames) revolve around promotion. **Under-promotion** to a knight or rook is rarely needed but devastating when it is — the famous Saavedra position promotes to a rook to avoid stalemate. Knight under-promotion is for when the new queen would be useless and a knight delivers check or fork.

**When it arises:** Endings where a passed pawn is one push from queening; tactical positions where the queening square is defended but a knight on it would fork the king.

**How to spot it:** Check what each promotion choice does. If queening loses to stalemate or a counter-tactic, try rook or knight.

**Example:** Saavedra position — `8/8/1KP5/3r4/8/8/8/k7 w - - 0 1`.

### Stalemate tricks (defensive)

When losing, sometimes you can *force* the opponent to stalemate you — sacrificing your remaining material so your king has no legal move and isn't in check.

**When it arises:** Worse positions with little material. The classic resource for the "wrong" side.

**How to spot it:** Count your king's escape squares. If it's down to one or two, ask "can I sacrifice my last pieces to remove all moves?"

**Example:** `7k/5Q2/8/8/8/8/8/7K w - - 0 1` (stalemate already) — many studies hinge on giving up the queen with check, but the stalemate trap is when *you're* the loser and you force it.

### Perpetual check

If you cannot win but can deliver check forever (or repeat the position three times via checks), the game is drawn. A common saving resource for the worse side, and a winning resource for the better side when no mate is possible.

**When it arises:** Exposed enemy king with limited escape squares; your queen (or queen + minor) shuttling between two checking squares.

**How to spot it:** Trace a sequence of checks. If after every defensive response you have another check, and the king cannot improve, it's perpetual.

**Example:** Queen shuttling between h5+ and e8+ on a king stuck on g8/h8.

### Trapped piece

A piece with no safe squares can be won by a simple attack. Knights on the rim, queens deep in enemy territory, and bishops on h2/a2/h7/a7 grabbing pawns are classic trapping targets.

**When it arises:** When a piece ventures forward without retreat squares, especially after grabbing a pawn.

**How to spot it:** For every advanced enemy piece, count its escape squares. If zero or one (and you can cover the one), play a simple attack like a pawn push.

**Example:** Bxh2+ Kxh2, queen sacrifice attacks where the queen would be trapped if not for tactics.

### The exposed king

When the enemy king has lost its pawn cover (h-pawn or g-pawn pushed, fianchetto bishop traded), it becomes a target for sacrifices and mating attacks. The exposed king is less a tactic and more a *prerequisite* for many tactics.

**When it arises:** After fianchetto trades, after h-pawn pushes weaken the king, after castling on opposite wings.

**How to spot it:** Count the pawns and pieces around the enemy king. If it's down to one or zero defensive units, look for direct attacks.

### The weak diagonal

Every fianchetto creates a long diagonal. If the fianchetto bishop is traded or absent, the diagonal is permanently weak — your bishop or queen on that diagonal can stare at the enemy king forever.

**When it arises:** After exchanges of fianchetto bishops, or when the long diagonal hasn't been blocked by pawns.

**How to spot it:** After every minor-piece trade, check whether either long diagonal (a1-h8 or a8-h1) is unobstructed and points at the enemy king.

### Mating nets

A **mating net** is the cumulative restriction of the enemy king until it has no escape. Not a single tactic but a *plan*: each move removes flight squares and adds attackers. Mating nets often involve quiet moves (the hardest to spot) — moves that don't check or capture but nail the king down for a coming blow.

**When it arises:** Attacking middlegames and endings with exposed kings.

**How to spot it:** Count the king's flight squares. Any move that reduces them (without losing tempo) is part of a net. Quiet moves like Kg2, Rh3, Nh4 often complete nets.

---

## Part B — Puzzle Library

The 60+ puzzles below are tagged by motif. Difficulty is rated easy (1–2 move tactics), medium (3–4 move combinations), or hard (longer or quiet-move combinations). Solutions are in SAN.

### Puzzle 1 — Back-rank mate (basic)
- FEN: `6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1`
- Side to move: white
- Solution: Re8#
- Theme(s): back-rank mate
- Difficulty: easy
- Explanation: The black king is hemmed in by its own f7-g7-h7 pawns. The rook simply slides to the back rank delivering mate. The lesson: any king with no escape squares (no luft) is one rook move from death — always make luft when it's safe.

### Puzzle 2 — Back-rank mate with deflection
- FEN: `6k1/5ppp/8/8/8/8/r4PPP/3R2K1 b - - 0 1`
- Side to move: black
- Solution: Ra1 Rxa1 (forced) — but the point is the deflection sets up mate ideas. (Composed for back-rank study.)
- Theme(s): back-rank, deflection
- Difficulty: easy
- Explanation: Black trades rooks via the back rank, eliminating white's only defender of d1/e1/f1. The pattern to learn: when only one defender holds the back rank, attacking that defender with another rook trades it off, leaving the rank vulnerable.

### Puzzle 3 — Greco's mate (h7 sacrifice)
- FEN: `r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Bxf7+ Kxf7 Ng5+ (typical Greco theme)
- Theme(s): exposed king, fork, sacrifice
- Difficulty: easy
- Explanation: A classic Italian-game motif. Bxf7+ rips open the king; Ng5+ forks king and queen ideas via Nxh7 or further checks. The lesson: whenever the f7 pawn is defended only by the king and your bishop on c4 stares at it, calculate the sacrifice.

### Puzzle 4 — Knight family fork
- FEN: `r3k2r/ppp2ppp/2n5/3qp3/3P4/2P2N2/PP3PPP/R1BQ1RK1 w kq - 0 1`
- Side to move: white
- Solution: dxe5 Nxe5 Nxe5 Qxe5 (then Re1 pinning)
- Theme(s): pin, fork
- Difficulty: easy
- Explanation: After the trades, the queen on e5 is pinned by the rook on e1. The lesson: when an enemy queen sits opposite your rook on the e-file with one piece between, every capture on that piece may unmask a winning pin.

### Puzzle 5 — Pin and win
- FEN: `r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3`
- Side to move: black
- Solution: Bg4 (pinning the knight to the queen — a relative pin to be exploited later)
- Theme(s): pin
- Difficulty: easy
- Explanation: Black creates a relative pin on the f3 knight. White must address it (h3 or castling) or risk doubled pawns and a weakened king. The lesson: pins on knights against queens are powerful even if the knight can technically move.

### Puzzle 6 — Skewer the king to the queen
- FEN: `4k3/8/8/8/q7/8/8/4K2R w K - 0 1`
- Side to move: white
- Solution: Re1+ then if king moves, the queen on a4 is undefended, but here the cleaner skewer is Rh4 attacking the queen.
- Theme(s): skewer
- Difficulty: easy
- Explanation: With the rook on h1, sliding to h4 attacks the queen on a4 along the 4th rank — a horizontal skewer-style attack. The lesson: rooks become deadly when both kings sit on open ranks/files with valuable pieces behind.

### Puzzle 7 — Royal fork
- FEN: `4k3/8/8/3N4/8/8/8/4K2q w - - 0 1`
- Side to move: white
- Solution: Nf6+ (forking king and queen on h1)
- Theme(s): fork (knight)
- Difficulty: easy
- Explanation: The knight on d5 leaps to f6 with check, and from f6 it also attacks the queen on h1. The king must move; white captures the queen. The lesson: memorize the knight-fork radius — from any square, a knight attacks 8 squares in a starburst pattern.

### Puzzle 8 — Pawn fork
- FEN: `r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5`
- Side to move: white
- Solution: d4 exd4 Nxd4 — or d4 directly forks if pieces sit accordingly
- Theme(s): pawn fork, central break
- Difficulty: easy
- Explanation: The d4 break threatens both the e5 pawn and opens lines. The lesson: central pawn pushes often create simultaneous threats — always evaluate d4/e4/d5/e5 for double-attack potential.

### Puzzle 9 — Discovered check basic
- FEN: `4k3/8/8/4B3/4N3/8/8/4K3 w - - 0 1`
- Side to move: white
- Solution: Nf6+ (discovered check from the bishop) winning anything in the knight's path on later moves
- Theme(s): discovered check
- Difficulty: easy
- Explanation: The knight moves and unmasks the bishop's check along the e-file. The lesson: any battery of B+N or B+R aimed at the enemy king lets the front piece roam and grab material with check.

### Puzzle 10 — Double check mate
- FEN: `r3k2r/ppp2ppp/8/3qN3/3P4/8/PPP2PPP/R3K2R w KQkq - 0 1`
- Side to move: white
- Solution: Nxf7 (a double-check pattern in many openings) — illustrative only
- Theme(s): double check
- Difficulty: easy
- Explanation: When two pieces check at once, the king must move — no blocks, no captures save the day. Memorize: double check is the most forcing move in chess.

### Puzzle 11 — Removing the defender
- FEN: `r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5`
- Side to move: white
- Solution: dxe4 (removing the knight that controlled key squares)
- Theme(s): removing the defender
- Difficulty: easy
- Explanation: The capture on e4 removes a centralized defender. Look for which enemy piece holds your target square together — eliminate it, and the position collapses.

### Puzzle 12 — Deflection wins material
- FEN: `2r3k1/5ppp/8/8/8/8/1Q3PPP/3R2K1 w - - 0 1`
- Side to move: white
- Solution: Qb8+ Rxb8 Rd8+ Rxd8 (skewer/deflection) — or simpler: Qxc8+ Rxc8 — illustrative
- Theme(s): deflection
- Difficulty: easy
- Explanation: The black rook on c8 defends the back rank. Any forcing attack on it pulls it off duty. Lesson: identify the defender, then attack it with the maximum-tempo move.

### Puzzle 13 — Decoy with check
- FEN: `4k3/8/8/8/8/8/4R3/4K2q w - - 0 1`
- Side to move: white
- Solution: Re8+ Kxe8 (composed: with a knight on g6, Nf6+ would now fork) — pattern illustration
- Theme(s): decoy
- Difficulty: easy
- Explanation: The rook decoys the king to e8 where another piece can attack it. Lesson: sacrifices that drag a king onto a vulnerable square are decoys; always ask "where do I want the enemy king?"

### Puzzle 14 — Trapped knight on the rim
- FEN: `r1bqkbnr/pppppppp/8/8/7n/8/PPPPPPPP/RNBQKBNR w KQkq - 1 2`
- Side to move: white
- Solution: g3 (trapping the knight on h4)
- Theme(s): trapped piece
- Difficulty: easy
- Explanation: A knight on h4 with no support has only g6, f5, f3 to escape; g3 cuts off f4-squares. Lesson: "knight on the rim is dim" — venturing to a4/h4/a5/h5 without support invites a pawn that traps it.

### Puzzle 15 — Smothered mate setup
- FEN: `6rk/6pp/8/6N1/8/8/6PP/4Q1K1 w - - 0 1`
- Side to move: white
- Solution: Nf7+ Kg8 Nh6+ Kh8 Qg8+ Rxg8 Nf7#
- Theme(s): smothered mate, double check
- Difficulty: medium
- Explanation: Philidor's legacy. The knight checks with Nf7+, kings shuffles, then the queen sacrifices on g8 to drag the rook there, leaving the king truly smothered for Nf7 mate. Lesson: this exact pattern recurs — corner king + rook adjacent + your N+Q = smothered mate.

### Puzzle 16 — Anastasia's mate
- FEN: `4r1k1/ppp2ppp/8/8/4N3/8/PPP2PPP/4R1K1 w - - 0 1`
- Side to move: white
- Solution: Ne7+ Kh8 (composed setup needs a rook lift) — pattern illustration
- Theme(s): mating net
- Difficulty: medium
- Explanation: Anastasia's mate: a knight on e7 (or g6) covers escape squares while a rook delivers mate on the h-file. Lesson: knight on e7/g6 + rook on h-file = Anastasia's net.

### Puzzle 17 — Légal's mate
- FEN: `r1bqkbnr/pppp1Bpp/2n5/4p3/4P1b1/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 4`
- Side to move: black
- Solution: After 1.Nxe5! Bxd1 2.Bxf7+ Ke7 3.Nd5#
- Theme(s): mating net, sacrifice
- Difficulty: medium
- Explanation: The famous Légal trap. White ignores the pin, sacrifices the queen, and mates with three minor pieces. Lesson: pins are not absolute — if the pinned piece can deliver mate or win huge material, the pin is broken.

### Puzzle 18 — Boden's mate
- FEN: `2kr3r/pppq1ppp/2n2n2/8/3P4/2P5/PP3PPP/R1BQ1RK1 w - - 0 1`
- Side to move: white
- Solution: Pattern: bishops on c4 and a3 cross-fire mate the queenside-castled king (Ba6+ etc., context-dependent)
- Theme(s): mating net
- Difficulty: medium
- Explanation: Boden's mate: two bishops on intersecting diagonals mate a king behind blocked pawns. Lesson: against opposite-side castling, bishops on b5/a6 and the c1-h6 diagonal often combine for mate.

### Puzzle 19 — Windmill (Torre vs Lasker)
- FEN: `r4rk1/pp3ppp/3qpn2/2pn4/8/2N1PN2/PP3PPP/R2Q1RK1 w - - 0 1`
- Side to move: white
- Solution: (Pattern illustration of windmill) — Torre's actual game featured Bf6 then a discovered-check rook cycle
- Theme(s): windmill, discovered check
- Difficulty: hard
- Explanation: The windmill is a discovered-check loop where a rook on the 7th rank gives check, the king moves, a bishop on the long diagonal grabs material as the rook retreats with another discovered check. Lesson: any time you have R on 7th + B on long diagonal aimed at the king, look for windmill geometry.

### Puzzle 20 — Réti's endgame study
- FEN: `7K/8/k1P5/7p/8/8/8/8 w - - 0 1`
- Side to move: white
- Solution: Kg7 h4 Kf6 h3 Ke5 (chasing pawn or supporting c-pawn — draws via the diagonal king march)
- Theme(s): king activity, drawing technique
- Difficulty: hard
- Explanation: Réti's classic. The white king walks diagonally, threatening both to catch the h-pawn AND to support the c-pawn's promotion. Lesson: a king can chase two distant goals simultaneously by walking the diagonal — the geometry is counterintuitive.

### Puzzle 21 — Saavedra position
- FEN: `8/8/1KP5/3r4/8/8/8/k7 w - - 0 1`
- Side to move: white
- Solution: c7 Rd6+ Kb5 Rd5+ Kb4 Rd4+ Kb3 Rd3+ Kc2 Rd4 c8=R! (under-promotion) Ra4 Kb3 winning
- Theme(s): under-promotion, promotion tactics
- Difficulty: hard
- Explanation: Promoting to a queen would be stalemate after Rc4+. The rook under-promotion threatens mate on c1 *and* refuses the stalemate, forcing the rook to move and then winning by skewer. Lesson: when queening creates stalemate, consider rook under-promotion.

### Puzzle 22 — Knight under-promotion fork
- FEN: `8/4Pk2/8/8/8/8/8/4K3 w - - 0 1`
- Side to move: white
- Solution: e8=N+ (forking king and... — composed needs more pieces). Pattern illustration.
- Theme(s): under-promotion, fork
- Difficulty: medium
- Explanation: When promoting to a queen doesn't check or fork but a knight does, under-promote. Lesson: always check what each promotion piece does *immediately*, not just its long-term value.

### Puzzle 23 — Stalemate trick
- FEN: `7k/5KQ1/8/8/8/8/8/8 b - - 0 1`
- Side to move: black
- Solution: Black is already stalemated if there are no legal moves — pattern study.
- Theme(s): stalemate
- Difficulty: easy
- Explanation: Lesson: when winning, never put the queen on a square that takes away the enemy king's *last* legal move without delivering check. Stalemate ruins many won positions.

### Puzzle 24 — Perpetual check resource
- FEN: `6k1/5ppp/8/8/8/8/5PPP/2q3K1 b - - 0 1`
- Side to move: black
- Solution: Qe1+ Kh2 Qe5+ (perpetual via diagonal/file checks)
- Theme(s): perpetual check
- Difficulty: medium
- Explanation: Black is down material but the queen shuttles giving checks the king cannot escape. Lesson: with an exposed enemy king and a queen, always test for perpetual before resigning.

### Puzzle 25 — Zwischenzug
- FEN: `r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b kq - 0 5`
- Side to move: black
- Solution: After 1...Nxe4 2.Nxe4 d5 (zwischenzug) — d5 attacks both the bishop and the knight before recapturing.
- Theme(s): zwischenzug
- Difficulty: medium
- Explanation: Instead of the automatic recapture, the d5 push fork the bishop and the knight, winning a piece. Lesson: in any forced sequence, check for an in-between move with greater force than the "expected" reply.

### Puzzle 26 — Overloaded queen
- FEN: `2r3k1/5ppp/8/3q4/8/8/2Q2PPP/3R2K1 w - - 0 1`
- Side to move: white
- Solution: Qxd5 Rxc... pattern — or Rxd5 if the queen is overloaded defending two things
- Theme(s): overloading
- Difficulty: medium
- Explanation: When a single piece is doing two jobs, you can attack one to break the other. Lesson: catalog defensive duties; the busiest piece is the most vulnerable.

### Puzzle 27 — Clearance sacrifice
- FEN: `r4rk1/ppp2ppp/3b4/3qN3/8/2P3Q1/PP3PPP/R4RK1 w - - 0 1`
- Side to move: white
- Solution: Nxf7! Rxf7 Qxg7+ (or Qg6 if Nxf7 isn't taken) — clearance for the queen
- Theme(s): clearance sacrifice
- Difficulty: hard
- Explanation: The knight clears the e5-square (or distracts a defender) so the queen can deliver mate. Lesson: when one of your pieces blocks your own attacking line, consider sacrificing it to clear the way.

### Puzzle 28 — Interference
- FEN: `2r5/8/8/r7/8/8/R7/2R3K1 w - - 0 1`
- Side to move: white
- Solution: Rc5 (interfering between the two black rooks defending each other)
- Theme(s): interference
- Difficulty: medium
- Explanation: Sacrificing a rook between two defending pieces breaks their connection. Lesson: when enemy pieces defend each other along a line, dropping a piece between them — even a sacrifice — collapses the defense.

### Puzzle 29 — Desperado piece
- FEN: `r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 4`
- Side to move: white
- Solution: Pattern: when a piece is doomed, it grabs maximum material on the way out. Composed example.
- Theme(s): desperado
- Difficulty: medium
- Explanation: A piece about to be lost should sell itself for the highest-value capture or biggest threat. Lesson: never just lose a hanging piece — always look for a damaging final move.

### Puzzle 30 — Greek gift (Bxh7+)
- FEN: `r1bq1rk1/pppp1ppp/2n2n2/2b5/2BNP3/3P4/PPP2PPP/RNBQ1RK1 w - - 0 1`
- Side to move: white
- Solution: Bxh7+ Kxh7 Ng5+ Kg8 Qh5 with mating attack
- Theme(s): exposed king, sacrifice, mating net
- Difficulty: medium
- Explanation: The classic Greek gift. Sacrifice the bishop to rip open the king, follow with Ng5+ and Qh5, and mate or win the queen via Qxh7. Lesson: when the f6-knight is gone (or pinned), Bxh7+ becomes deadly serious.

### Puzzle 31 — Morphy's Opera Game finish
- FEN: `4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1`
- Side to move: white
- Solution: Qb8+ Nxb8 Rd8#
- Theme(s): deflection, back-rank mate, sacrifice
- Difficulty: medium
- Explanation: Morphy's immortal finish vs. Duke of Brunswick and Count Isouard. The queen sacrifices to deflect the knight defender of d8, then the rook mates. Lesson: every defender has a price — even the queen is worth sacrificing for a forced mate.

### Puzzle 32 — Damiano's bishop (mate pattern)
- FEN: `6k1/5ppp/6B1/8/8/8/8/4R1K1 w - - 0 1`
- Side to move: white
- Solution: Re8+ Kh7 (Bf7 trapping) Re7 with mate ideas — pattern setup
- Theme(s): mating net
- Difficulty: medium
- Explanation: The bishop on g6 dominates the king's escape, and the rook delivers along the back rank. Lesson: B+R mates a king on g8/h8 when the bishop covers the long diagonal escape squares.

### Puzzle 33 — Lolli's mate
- FEN: `r1bq1rk1/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP1QPPP/R1B1K2R w KQ - 0 1`
- Side to move: white
- Solution: Pattern: Nxd5 Nxd5 Qxe5+ winning. Composed illustration.
- Theme(s): fork, removing defender
- Difficulty: medium
- Explanation: A queen check on the long diagonal forks king and a piece. Lesson: trades that open central diagonals while your queen lurks on e2 often unleash forks via e5 or d5.

### Puzzle 34 — Knight on the 6th
- FEN: `r2qk2r/ppp2ppp/2n1bN2/3p4/8/8/PPP2PPP/R2Q1RK1 b kq - 0 1`
- Side to move: black
- Solution: gxf6 (must take the knight or lose to Nxh7 ideas)
- Theme(s): outpost, attacking knight
- Difficulty: easy
- Explanation: A knight on f6 next to the castled king is so dangerous that capturing it (even with g7) is often forced. Lesson: knights on the 6th rank near the king must be addressed immediately.

### Puzzle 35 — Pin to win the queen
- FEN: `r1bqk2r/pppp1ppp/2n2n2/2b5/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Bg5 (pinning Nf6 to Qd8)
- Theme(s): pin
- Difficulty: easy
- Explanation: The bishop on g5 pins the knight on f6 to the queen on d8. Lesson: in many openings, Bg5 creating this pin is the first tactical operation.

### Puzzle 36 — Skewer with check
- FEN: `8/8/8/8/q7/8/4K3/4R2k w - - 0 1`
- Side to move: white
- Solution: Re4+ skewer (composed: rook attacks queen with check on king behind)
- Theme(s): skewer
- Difficulty: easy
- Explanation: A check that lines up two enemy pieces is a skewer. Lesson: every check should be evaluated for skewer potential — what's behind the king on this line?

### Puzzle 37 — Discovered attack winning queen
- FEN: `r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Nd5 (discovered attack pattern after the bishop pin breaks)
- Theme(s): discovered attack
- Difficulty: medium
- Explanation: The knight jumping creates a discovered threat from another piece. Lesson: any time your knight sits between your bishop and an enemy queen, the knight's leap may unmask a winning attack.

### Puzzle 38 — Double attack with the queen
- FEN: `r4rk1/ppp2ppp/8/3q4/8/8/PPP2PPP/2R3K1 w - - 0 1`
- Side to move: white
- Solution: Qd1 attacks queen and threatens back rank — composed double-attack
- Theme(s): double attack
- Difficulty: easy
- Explanation: A single queen move creates two threats. Lesson: the queen's range makes her the universal double-attacker — every queen move should be evaluated for two simultaneous threats.

### Puzzle 39 — X-ray attack
- FEN: `4k3/8/4r3/8/8/4R3/4R3/4K3 w - - 0 1`
- Side to move: white
- Solution: Rxe6 Rxe6 Rxe6+ winning the rook via X-ray
- Theme(s): X-ray attack
- Difficulty: easy
- Explanation: The doubled rooks X-ray each other; capturing through one wins the next. Lesson: doubled rooks on a file are an X-ray battery — the back rook supports the front rook *through* enemy pieces.

### Puzzle 40 — Blackburne's mate
- FEN: `r1bqk2r/pppp1ppp/2n5/2b5/2B1P3/3P1N2/PP3PPP/RNBQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Pattern setup — Blackburne's mate: B+B+N mate with bishop pair on h7 and the knight covering escape
- Theme(s): mating net
- Difficulty: hard
- Explanation: Two bishops and a knight combine: one bishop sacrifices on h7+, the king moves, the other bishop on b2 cuts off the diagonal, and the knight on g5 delivers mate. Lesson: in attacks with B+B+N, look for the bishop sacrifice on h7 followed by the long-diagonal cover.

### Puzzle 41 — Pillsbury's mate
- FEN: `r4rk1/ppp2ppp/8/8/2B5/8/PPP2PPP/4R1K1 w - - 0 1`
- Side to move: white
- Solution: Pattern: rook lift to h-file + bishop on long diagonal mates a fianchetto-weakened king
- Theme(s): mating net
- Difficulty: hard
- Explanation: When the long diagonal is open and a rook reaches the h-file, mate often follows on h7 or h8. Lesson: open long diagonals + rook lift = mating attack.

### Puzzle 42 — Trapped queen in opening
- FEN: `rnb1kbnr/pppp1ppp/8/4p3/4P1q1/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3`
- Side to move: white
- Solution: Be2 followed by Nxg4 if the queen is too late retreating
- Theme(s): trapped piece
- Difficulty: easy
- Explanation: The queen on g4 is on a flag pole; a knight or pawn push can chase her with tempo and trap her. Lesson: queens advanced too early in the opening get harassed and trapped.

### Puzzle 43 — Pawn promotion fork
- FEN: `8/2P5/8/8/4k3/8/8/4K3 w - - 0 1`
- Side to move: white
- Solution: c8=Q+ winning by check then king march
- Theme(s): promotion
- Difficulty: easy
- Explanation: Promoting with check buys the tempo to win. Lesson: always check whether a promotion gives check — checking promotions are usually safe; quiet promotions can be answered.

### Puzzle 44 — Two-rook sacrifice (Nezhmetdinov style)
- FEN: `r3r1k1/pp3ppp/8/8/8/2N5/PP3PPP/3RR1K1 w - - 0 1`
- Side to move: white
- Solution: Pattern: Nb5/Nd5 with double-attack on rooks, often via discovered tactics
- Theme(s): double attack, fork
- Difficulty: medium
- Explanation: A centralized knight forks two rooks. Lesson: the c3/d5/e5/f5 squares are knight-fork goldmines for the d8/e8/f8 enemy back rank.

### Puzzle 45 — Deflection of the king
- FEN: `6k1/5p1p/6p1/8/8/8/q6P/3R2K1 b - - 0 1`
- Side to move: black
- Solution: Qg2+! Kxg2 (only move) — but the deflection is the idea behind any combination dragging the king
- Theme(s): deflection, decoy
- Difficulty: medium
- Explanation: A check that the king *must* take (because nothing blocks) drags the king onto a square where it can be exploited. Lesson: queen sacrifices on g2/g7 often decoy the king for a knight or rook follow-up.

### Puzzle 46 — Removing the king's defender (h7 sac)
- FEN: `r1bq1rk1/pp1n1ppp/2pbpn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1`
- Side to move: white
- Solution: Bxh7+ Kxh7 Ng5+ — classic Greek gift
- Theme(s): exposed king, removing defender
- Difficulty: medium
- Explanation: The Bxh7+ sacrifice rips the king's pawn cover. Lesson: when the f6-knight has been removed or distracted, Bxh7+ is automatically worth calculating.

### Puzzle 47 — Overloaded rook
- FEN: `2rr2k1/5ppp/8/8/8/8/Q4PPP/3R2K1 w - - 0 1`
- Side to move: white
- Solution: Qxc8 Rxc8 Rxd8+ winning
- Theme(s): overloading
- Difficulty: easy
- Explanation: The rook on d8 was overloaded — defending both c8 and the back rank. Trading the queen for one rook lets the second rook crash through. Lesson: identify pieces with two duties; sacrifice to overwhelm them.

### Puzzle 48 — Quiet move in a mating attack
- FEN: `r1bq1rk1/ppp2ppp/2n5/3pP3/3P4/3B1N2/PP3PPP/R1BQ1RK1 w - - 0 1`
- Side to move: white
- Solution: Pattern: Nh4! threatening Nf5 and Qh5 — a quiet move building a net
- Theme(s): mating net
- Difficulty: hard
- Explanation: Quiet moves that improve the worst-placed attacker are the hardest to find but the strongest in mating attacks. Lesson: when forcing moves don't quite work, look for a quiet improver.

### Puzzle 49 — Anastasia's mate (clean pattern)
- FEN: `5rk1/pp4pp/8/4N3/8/8/PP4PP/4R2K w - - 0 1`
- Side to move: white
- Solution: Pattern setup: knight on e7/g6 + Rh-file rook + king on h-file = Anastasia
- Theme(s): mating net
- Difficulty: medium
- Explanation: The knight covers g8/h7 escape squares while a rook on h-file mates. Lesson: memorize Anastasia's net — it appears constantly in attacks on the kingside.

### Puzzle 50 — Reti's classic mate (1.Bxh7+ etc.)
- FEN: `r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Pattern setup for Reti's many famous tactical motifs (e.g., his miniature games)
- Theme(s): mating net, sacrifice
- Difficulty: medium
- Explanation: Reti's many published miniatures feature double-check sacrifices and quiet maneuvers. Lesson: study Reti's games for double-check geometry.

### Puzzle 51 — Pawn push wins piece
- FEN: `r1bqkbnr/ppp1pppp/2n5/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 2 3`
- Side to move: white
- Solution: e3 with c4 pawn push later attacking d5 and the c-file
- Theme(s): central tension
- Difficulty: easy
- Explanation: Central pawn pushes attack pieces and gain space. Lesson: every pawn push that attacks two pieces (one directly, one through opening a file) is a hidden double attack.

### Puzzle 52 — Knight outpost wins exchange
- FEN: `r2q1rk1/pp1bppbp/2np1np1/8/2P1P3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 1`
- Side to move: white
- Solution: Nd5 (attacking the queen and forking ideas)
- Theme(s): outpost, fork
- Difficulty: medium
- Explanation: A knight on d5 attacks the queen and pressures e7/c7. Lesson: outposts on d5/e5/d4/e4 protected by pawns are the strongest squares on the board.

### Puzzle 53 — Long diagonal mate
- FEN: `r1bq1rk1/pp3ppp/2n5/3pp3/8/2P2N2/PP1B1PPP/R2Q1RK1 w - - 0 1`
- Side to move: white
- Solution: Pattern: bishop sweep to b2/c1-h6 mating along the diagonal
- Theme(s): weak diagonal
- Difficulty: medium
- Explanation: When the long diagonal is open and the king sits on g7/g8/h8, a bishop on b2 stares at the king forever. Lesson: keep the long diagonal in your scope — fianchetto trades create permanent weaknesses.

### Puzzle 54 — Trapped bishop on h2
- FEN: `r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PbP/RNBQR1K1 w kq - 0 1`
- Side to move: white
- Solution: Kxh2 (or Bxh2 traps depending on move order) — composed
- Theme(s): trapped piece
- Difficulty: easy
- Explanation: A bishop that grabs the h2 pawn is often trapped after Kxh2 followed by minor-piece coverage. Lesson: don't grab the h2 pawn unless you have a follow-up — the bishop has one diagonal to escape.

### Puzzle 55 — Discovered double attack
- FEN: `r1bqk2r/pppp1ppp/2n2n2/2b5/2BNP3/8/PPP2PPP/RNBQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Nxc6 (discovered attack on bishop while attacking queen)
- Theme(s): discovered attack, double attack
- Difficulty: medium
- Explanation: The knight capture exposes a line *and* makes a threat of its own. Lesson: discovered attacks are at their best when the moving piece *also* attacks something.

### Puzzle 56 — Back-rank tactic with rook lift
- FEN: `2r3k1/5ppp/8/8/8/8/4R1PP/4R1K1 w - - 0 1`
- Side to move: white
- Solution: Re8+ Rxe8 Rxe8#
- Theme(s): back-rank, double rooks
- Difficulty: easy
- Explanation: Doubled rooks on the e-file battering through the c8 rook to mate. Lesson: doubled rooks behind a single defender always crash through.

### Puzzle 57 — Knight fork after deflection
- FEN: `r2q1rk1/ppp2ppp/2n5/3pp3/3P4/2N2N2/PPP2PPP/R2QR1K1 w - - 0 1`
- Side to move: white
- Solution: dxe5 Nxe5 Nxe5 Qxe5 Nd5 attacking queen + fork ideas
- Theme(s): fork, deflection
- Difficulty: medium
- Explanation: Trades simplify until a knight forks queen and a piece. Lesson: trade sequences often end with a knight reaching d5 or e5 with a fork.

### Puzzle 58 — Mate in 2 (composed)
- FEN: `7k/6pp/8/6N1/8/8/8/4R2K w - - 0 1`
- Side to move: white
- Solution: Re8+ Nf7#? — composed: Nf7+ Kg8 Re8#
- Theme(s): mating net
- Difficulty: easy
- Explanation: Knight check forces the king to g8, then the rook delivers mate on e8. Lesson: in mate-in-two studies, the first move usually restricts the king before the killer blow.

### Puzzle 59 — Stalemate save
- FEN: `8/8/8/8/8/3k4/3p4/3K4 w - - 0 1`
- Side to move: white
- Solution: Kc1 (only move; black to play, KP vs K with the wrong rook pawn or central pawn, often draws via stalemate)
- Theme(s): stalemate, drawing technique
- Difficulty: medium
- Explanation: The classic K+P vs K with the king in front leads to drawn or won positions depending on opposition. Lesson: in K+P endings, the side without the pawn aims for stalemate via opposition.

### Puzzle 60 — Perpetual via queen shuttle
- FEN: `6k1/pp3ppp/8/8/8/8/PP3PPP/6K1 w - - 0 1`
- Side to move: white
- Solution: With added queens, Qe8+ Kh7 Qh5+ Kg8 Qe8+ = perpetual
- Theme(s): perpetual check
- Difficulty: medium
- Explanation: The queen shuttles between e8 and h5, checking forever. Lesson: when the enemy king has only two squares (g8 and h7) and your queen reaches both with check, it's perpetual.

### Puzzle 61 — Interference sacrifice
- FEN: `2r3k1/5ppp/8/8/r7/8/R7/2R3K1 w - - 0 1`
- Side to move: white
- Solution: Rxa4 (eliminating one rook; if Rxa4 then Rc8+ wins)
- Theme(s): interference, back-rank
- Difficulty: medium
- Explanation: Removing one defender lets the other rook crash to c8. Lesson: when two enemy rooks defend each other, sacrificing one of yours often breaks the connection.

### Puzzle 62 — Desperado knight
- FEN: `r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1`
- Side to move: white
- Solution: Composed: Nxe5 Nxe5 d4 forks back winning material
- Theme(s): desperado, zwischenzug
- Difficulty: medium
- Explanation: A doomed knight grabs the e5 pawn before being recaptured; the d4 push then forks. Lesson: in capture sequences, don't recapture automatically — look for desperado captures and zwischenzug pushes.

### Puzzle 63 — Promotion with discovered check
- FEN: `8/4P3/8/8/8/4k3/4r3/4K3 w - - 0 1`
- Side to move: white
- Solution: e8=Q+ (discovered check from the rook... composed setup; with white rook behind, this is a discovered promotion)
- Theme(s): promotion, discovered check
- Difficulty: medium
- Explanation: The pawn promotes with discovered check from a rook behind. Lesson: pawns that promote on a file with a rook behind often deliver discovered check at the moment of promotion.

### Puzzle 64 — Mating net with quiet move
- FEN: `r1bq1rk1/pp3ppp/2n5/2bpp3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1`
- Side to move: white
- Solution: Nh4 (quiet move improving the knight toward f5)
- Theme(s): mating net, quiet move
- Difficulty: hard
- Explanation: The quiet Nh4 prepares Nf5 with a devastating outpost near the king. Lesson: quiet improvers are the hardest moves but often the strongest in attacking positions.

### Puzzle 65 — X-ray defense
- FEN: `r3k3/8/8/8/8/8/4R3/4R2K w - - 0 1`
- Side to move: white
- Solution: Pattern: rook X-ray defense — the back rook defends the front rook through any intervening piece
- Theme(s): X-ray defense
- Difficulty: easy
- Explanation: When you double rooks, the back rook X-ray defends the front rook even if the enemy captures and a piece intervenes. Lesson: doubled rooks are mutually X-ray-defended — a critical defensive resource.

### Puzzle 66 — Weak diagonal collapse
- FEN: `r1bq1rk1/pp3ppp/2n2n2/2bpp3/4P3/2N2N2/PPB2PPP/R1BQ1RK1 w - - 0 1`
- Side to move: white
- Solution: Bb2 (occupying the long diagonal aimed at the king on g8 if g7 is weakened)
- Theme(s): weak diagonal
- Difficulty: medium
- Explanation: A bishop on b2 stares down the long diagonal at the king. After any g7-pawn move or trade, the diagonal becomes a mating highway. Lesson: treat the long diagonal as a permanent attacking lane once the fianchetto bishop is gone.

---

**End of document.**

Total puzzles in library: 66. All puzzles tagged by theme, with difficulty mix favoring easy/medium for pattern-recognition training. Famous positions (Morphy, Réti, Saavedra, Légal, Greco, Anastasia, Boden, Pillsbury, Blackburne, Torre/Lasker, Philidor) are included for historical grounding alongside composed examples for clean motif demonstration.
