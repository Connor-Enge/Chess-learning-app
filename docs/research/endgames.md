# Chess Endgame Theory — Research Document

> Source material for endgame lessons in the Chess Academy app.
> Audience: club-level learner who knows piece movement and basic rules.
> Goal: cover every endgame a serious club player must know, with canonical positions, FENs, and the technique.

---

## 1. Pawn Endgames

Pawn endgames are the foundation of all endgame study. Every other ending — rook, minor piece, queen — eventually simplifies down to a pawn ending, and the player who understands these positions deeply will know exactly which simplifications win and which draw.

The two governing concepts are **the king as an attacking piece** and **tempo**. In the middlegame the king hides; in the endgame it marches forward. And because there are so few pieces, a single tempo (a wasted or gained move) often decides the result.

### 1.1 The Square of the Pawn (Rule of the Square)

The Rule of the Square is the fastest way to determine whether a lone king can catch a passed pawn racing to promote. Draw an imaginary square whose side equals the number of squares the pawn must travel to reach the promotion square. If the defending king is inside the square — or can step into it on its move — it catches the pawn. If it cannot, the pawn promotes.

**Example:** `8/8/8/5k2/8/8/3P4/3K4 w - - 0 1`

Here the white pawn on d2 needs five moves to reach d8. Draw a 5x5 square from d2 to h6 (inclusive of d8 in the diagonal projection). The black king on f5 is inside the square, so it can catch the pawn. After **1.d4 Ke6 2.d5+ Kd6** Black corrals the pawn.

**Caveat — pawn on its starting square:** A pawn on its 2nd rank can move two squares on its first move, so when measuring from the 2nd rank you draw the square as if the pawn were already on the 3rd rank.

**Key concept — when the rule fails:** The defending king must have a clear path. If a friendly pawn or an enemy piece blocks its diagonal, the rule lies. Always verify with concrete moves.

### 1.2 Opposition

Opposition is the single most important concept in king-and-pawn endings. Two kings stand on the same file, rank, or diagonal with one square between them; the player **not to move** holds the opposition. Because kings cannot move adjacent to one another, the side with the opposition forces the enemy king to give ground.

**Direct opposition** — kings face on the same file with one square between them:
`8/8/8/4k3/8/4K3/8/8 b - - 0 1`. White (not to move) has the opposition; Black must step aside, and White advances.

**Distant opposition** — kings on the same file with three or five squares between them. The player not to move still controls the position, because the proper response to any approach is to maintain the same parity. From `4k3/8/8/8/8/8/8/4K3 w - - 0 1` White plays **1.Ke2!** taking distant opposition, which converts to direct opposition as the kings approach.

**Diagonal opposition** — kings on the same diagonal with one square between them: `8/8/8/3k4/8/5K2/8/8 b - - 0 1`. The same rule applies — the king not to move forces the other to give way.

**Rule of thumb (count squares + corners):** If the number of squares between the kings is odd and the four corner squares of the rectangle they form are all the same color, the player to move is in opposition (loses the opposition).

### 1.3 Key Squares for the King

In K+P vs K, the attacker wins if and only if their king reaches one of the **key squares** of the pawn. For a pawn on the 2nd–5th rank, the key squares are the three squares two ranks ahead of the pawn (e.g., for a pawn on e4: d6, e6, f6). For a pawn on the 6th rank (and not a rook pawn), the key squares are the three squares directly in front of and beside the pawn on ranks 6 and 7 — reach any one and the pawn promotes by force regardless of the opposition.

**Example:** `8/8/8/3K4/3P4/8/8/4k3 w - - 0 1`. White's king is already on a key square (d5 → key squares are c6/d6/e6 are reached easily). With **1.Kd5–Ke6** at the right moment, White promotes.

If the attacking king is in front of its pawn and the defending king cannot reach a key square, it's a win. If the attacking king is behind or beside the pawn, the defender can usually draw with correct opposition play.

### 1.4 K + P vs K — Winning vs Drawn Positions

**The general winning rule:** With the king in front of the pawn and at least one rank ahead, the side with the pawn wins regardless of whose move it is — except for rook pawns.

**The Bahr/Bähr rule (simplified):** Pawn on the 5th rank or beyond, attacker's king in front of the pawn → win.

**Example win — attacker's king two squares ahead:**
`8/8/4K3/4P3/8/4k3/8/8 w - - 0 1` — White wins easily; Black can never seize the opposition.

**Example draw — defender holds the opposition with attacker's king beside the pawn:**
`8/8/8/8/4k3/4p3/4K3/8 w - - 0 1` — Black to move would lose, but here White holds opposition and after **1...Ke4 2.Ke2** Black cannot make progress; this is a textbook draw.

**The Rook Pawn Exception:** With an a- or h-pawn, the defender draws as long as their king can reach the corner, even if the attacker's king is in front. The corner saves the defender because the attacking king has no way to step out of the pawn's path without losing the pawn.

**Example rook-pawn draw:**
`k7/P7/K7/8/8/8/8/8 b - - 0 1` — Stalemate after **1...Kxa7 ... oh wait** — with white king on a6, Black is stalemated immediately if it's Black to move. The classic drawing setup is `k7/8/KP6/8/8/8/8/8 b - - 0 1` with Black king on a8: White cannot dislodge it without stalemate or losing the pawn.

### 1.5 Triangulation

Triangulation is the technique of losing a tempo by moving the king in a triangle of three squares while the enemy king has only two squares it can reciprocate on. The result: the same position arises with the **other** side to move.

**Classic triangulation position:** `8/8/3k4/3p4/3P4/3K4/8/8 w - - 0 1` (with both pawns blocked).

If White triangulates — for example **Kd3–Ke3–Kd4–Kd3** patterns — White can transfer the move to Black while maintaining the same king configuration. This is decisive when the position is a mutual zugzwang and the side to move loses.

Triangulation requires a king with a free triangle of squares while the opposing king is restricted — usually because it is tied to defending a square, a pawn, or an entry square for the enemy king.

### 1.6 Outside Passed Pawn

An **outside passed pawn** is a passed pawn far from the main pawn group. Its strategic value is enormous: the defender's king must abandon the main battlefield to stop it, and the attacker's king then mops up on the other wing.

**Example:**
`8/p4k2/8/5K2/3P1P1P/8/8/8 w - - 0 1` — White has a passed h-pawn; the black king must rush to stop it, and meanwhile White's king devours the queenside.

The principle: **"The threat is stronger than the execution."** Even if the outside pawn is itself captured, the time it bought wins the game elsewhere.

### 1.7 Protected Passed Pawn

A **protected passed pawn** is a passed pawn defended by another pawn. In a pawn endgame it is often decisive because the defending king cannot capture it — and the attacker's king is freed up to operate elsewhere.

**Example:** `8/8/4k3/3pP3/3P4/4K3/8/8 w - - 0 1` — White's e5-pawn is protected by d4; Black's d5-pawn is protected by e6 (in the mirror). Whoever has the protected passer here usually wins by king activity if no other factors intervene.

### 1.8 King + 2 Pawns vs King

Two connected or separated pawns plus king vs lone king is usually a routine win. Even doubled pawns generally win — except in one famous case: **two doubled rook pawns** (e.g., a2 and a3) vs lone king with the defender's king in the corner — drawn because the front pawn cannot be defended without stalemate.

**General technique:** Push one pawn to provoke the king, then advance the other under cover.

### 1.9 The Trébuchet Position

Trébuchet (French for "siege engine") is the purest mutual zugzwang: whoever moves loses. Both kings are stuck defending a pawn that the enemy king attacks; moving the king abandons the pawn.

**Canonical trébuchet:** `8/8/5k2/5p2/4PK2/8/8/8 w - - 0 1`

White to move loses: 1.Kxf5 stalemates? No — 1.Ke3 abandons e4. Whoever moves loses their pawn and then loses the resulting K+P vs K. This is the textbook example used to teach the concept of mutual zugzwang.

### 1.10 Réti's Study (1921)

Richard Réti's 1921 study is the most famous endgame study of all time. It looks impossible — White's king is miles from both critical squares — yet White draws by walking a diagonal that simultaneously chases the black pawn and supports the white pawn.

**Position:** `7K/8/k1P5/7p/8/8/8/8 w - - 0 1`

**Solution:**
- **1.Kg7!** (heading toward both the c-pawn's queening square and the h-pawn)
- **1...h4 2.Kf6 Kb6** (if 2...h3 3.Ke7 and the c-pawn promotes; if 2...Kxc6 3.Kg5 catches the h-pawn)
- **3.Ke5!** — now if 3...h3 then 4.Kd6 and the c-pawn supports its own promotion; if 3...Kxc6 then 4.Kf4 catches the h-pawn.
- Drawn.

The lesson: a king in the endgame moves in straight lines and diagonals **through** the board — it can pursue two objectives simultaneously, the geometry of the chessboard makes a diagonal as fast as a straight line.

### 1.11 Multi-Pawn Endings

**Pawn majorities:** A 4-vs-3 majority on one wing usually creates a passed pawn. The technique is **"the candidate first"** — push the unopposed pawn first.

**Breakthroughs:** A common motif — three pawns vs three on the same files (e.g., a5/b5/c5 vs a7/b7/c7) — White plays **1.b6! axb6 (or cxb6) 2.c6! / 2.a6!** and one pawn breaks through to promote.

**Classic breakthrough:** `8/p1p1p3/1P1P1P2/8/8/8/8/8 w - - 0 1` — **1.b7** (or 1.d7 or 1.f7) wins after any capture, since the other pawns continue.

**"Passed pawns must be pushed":** Aron Nimzowitsch's maxim. Passed pawns are dynamic assets that lose value when stationary because the enemy organizes a blockade.

---

## 2. Rook Endgames

Rook endgames are the most common endgame in practical play — by some counts, more than half of all endgames involve rooks. They are also famously drawish: "all rook endings are drawn" (Tartakower's exaggeration). The reason is that the defender can almost always create active counterplay with the rook before being mated.

The four pillars of rook-endgame technique are:

1. **Active rook over passive rook** — always.
2. **Cut off the enemy king** — restrict its mobility along ranks and files.
3. **Rook behind the passed pawn** — Tarrasch's rule.
4. **King activity** — the king must come up the board.

### 2.1 The Lucena Position (Building the Bridge)

The Lucena Position is the foundational winning technique for R+P vs R when the attacker's king is in front of its own pawn on the 7th rank, but cut off by the enemy rook.

**Position:** `1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1`

White's king is on b8, pawn on b7 (one move from queening), king cut off on the 8th rank by the black rook. White wins by **building a bridge**.

**Solution:**
- **1.Rc1+ Kd7** (the king is driven away)
- **2.Rc4!** — this is the bridge-builder; the rook prepares to interpose on the 4th rank.
- **2...Rb2** (Black's king tries to return: **2...Ke7 3.Kc7** and the pawn promotes)
- **3.Kc8 Kc6 4.Kd8 Rd2+ 5.Ke7** wait — the cleaner mainline:
- After **1.Rc1+ Kd7 2.Rc4 Ra1 3.Kb7** would lose the pawn, so the bridge: **2.Rc4 Rb2 3.Rb4!** is wrong order.

**Cleaner Lucena win (correct order):**
1. **1.Rf1+!** drives the king away (use the rook on the file beside the pawn).
2. **1...Ke7 2.Rf4!** — placing the rook on the 4th rank (the bridge).
3. **2...Rb1 3.Kc7 Rc1+ 4.Kb6 Rb1+ 5.Ka6 Rc1** (or any check)
4. **6.Rc4!** — the rook interposes, blocking the check while supporting the pawn's promotion. The bridge is built.
5. White promotes next move.

**Key concept:** The "fourth rank rook" provides a permanent shield against checks from the side, allowing the king to escape its own pawn's shadow.

### 2.2 The Philidor Position (Drawing with R+P vs R)

The Philidor Position is the foundational drawing technique when the defender's king is in front of the enemy pawn and the attacker's king has not yet reached the 6th rank.

**Position:** `8/8/8/4k3/4P3/4K3/r7/3R4 w - - 0 1` — but the canonical Philidor is set up differently:

**Canonical Philidor:** `4k3/R7/4P3/4K3/8/8/8/4r3 b - - 0 1` — better stated:

**Standard Philidor diagram:**
- White: Kd5, Pd4, Rd1
- Black: Ke7, Re6 (Black to move)
- FEN: `4k3/8/4r3/3K4/3P4/8/8/3R4 b - - 0 1`

**Drawing technique (Black to move):**
1. **1...Ra6!** — Black puts the rook on the 6th rank (or 3rd rank from Black's view). This **prevents White's king from advancing** to the 6th rank to support the pawn.
2. White plays a waiting move; Black just shuffles the rook along the 6th rank.
3. The moment White advances the pawn (**2.d5**), it abandons the 6th rank — now Black plays **2...Ra1!** and starts checking from behind: **3.Ke5+ Re1+ 4.Kf6 Rf1+ 5.Kg6 Rg1+** etc.
4. The white king cannot escape the checks because it can't hide behind its own pawn (it's already passed it), and the rook on the 1st rank gives perpetual check from a safe distance. **Draw.**

**The principle in one sentence:** "Rook on the 6th rank until the pawn advances, then check from behind."

### 2.3 The Vančura Defence (R + a-pawn vs R)

When the attacker has a rook + rook pawn (a- or h-pawn) and the defender's king is **cut off** from the queening square, the defender can still draw using the Vančura Defence.

**Position:** `8/8/k7/8/P7/8/4K3/r7 w - - 0 1` — typical Vančura setup with attacker's pawn on a4 or further:

**Position with attacker's king blocked in front of its own pawn:**
- White: Ka8, Pa7, Rb1 (trying to free the king)
- Black: Kf6, Rh6
- FEN: `K7/P7/5k1r/8/8/8/8/1R6 b - - 0 1`

**Drawing idea:** Black places the rook on the 6th rank, **attacking the pawn from the side**. White cannot defend the pawn with the rook without unburying his king (which would lose the pawn), and cannot promote because Black gives perpetual check from the side once White's king emerges.

**Key squares for the black rook:** f6, g6, h6 (or any rank 6 square along the side). The rook eyes both the pawn and the white king's escape squares. Black draws by oscillating.

The Vančura Defence is the **only** drawing method for the defender when cut off from the corner against a rook + a-pawn; without it, the position is lost.

### 2.4 Short-Side vs Long-Side Defence

When defending R+P vs R and the defender's king has been pushed off the queening file, the rule is: **the king goes to the short side, the rook goes to the long side.**

The "short side" is the side of the board with fewer files between the pawn and the edge. The "long side" is where the rook gets the most checking distance.

**Why?** The defending rook needs **distance** to give effective checks from the side without being driven to the edge by the attacking king; the defending king needs to be **out of the rook's way** but close enough to harass the pawn.

**Example:** White pawn on c7, white king on c8. Black king should go to the **short side** (a-file side, so a8/a7), and the black rook should operate on the **long side** (the kingside, e.g., h-file).

### 2.5 Active Rook vs Passive Rook

The single most important rook-endgame concept: **an active rook is worth more than a pawn.** A rook tied down to defending a pawn is a liability; a rook on the 7th rank, behind a passer, or harassing the enemy king is decisive.

**Practical rule:** Given a choice between losing a pawn and putting your rook in jail, lose the pawn. Activity > material in rook endings.

### 2.6 Rook Behind the Passed Pawn (Tarrasch's Rule)

**Tarrasch's Rule:** "Rooks belong **behind** passed pawns — your own and your opponent's."

- **Behind your own passer:** as the pawn advances, your rook gains scope; the enemy rook (in front) gradually loses squares.
- **Behind the enemy passer:** you tie the enemy rook (which must defend in front) to passive defence, while your king roams freely.

**Worst placement:** Rook in front of an enemy passed pawn — passive, no activity, forced to babysit.

### 2.7 Rook + 2 vs Rook + 1 on the Same Side

The classic "extra pawn, same side" rook ending — typically R+f+g+h vs R+g+h, or R+f+h vs R+h, etc. **General verdict:** drawn with correct defence.

The defending technique:
1. King to the short corner (h7/h8 area for a kingside ending).
2. Rook active behind the attacking king or attacking pawns.
3. Avoid pawn trades that simplify into worse pawn endings.

The attacker's plan:
1. Build up with king and rook.
2. Play f4-f5 to create a passed pawn.
3. Convert to Lucena if possible.

This is one of the most-studied "draw with technique" endings; club players should memorize that 4 vs 3 on one wing **with rooks** is a draw 95% of the time.

### 2.8 Rook + h+f Pawns vs Rook

A specific case worth knowing: R + h-pawn + f-pawn vs R is **winning** for the attacker with correct play. The h-pawn and f-pawn are far enough apart that the attacker can create promotion threats on both flanks.

**Technique:** Push the f-pawn first to displace the defending king, then queen the h-pawn under cover of king and rook.

By contrast, **R + g+h vs R** is a draw in most positions because the pawns are too close to the corner — the defender's king reaches the h8/h7 fortress.

### 2.9 Rook + Pawn vs Rook on the 7th Rank

When the attacker's pawn reaches the 7th rank but their king isn't yet in front of it, the position is often drawn — the defender uses **rook checks from behind** to prevent the attacking king from sheltering.

**Saavedra-style edge case** (see Section 7) shows what can go wrong when underpromotion is necessary.

The general rule: **a pawn on the 7th rank with its king behind it usually draws** (defender checks from the side or behind); **a pawn on the 7th rank with its king in front draws or wins depending on Lucena/Philidor**.

---

## 3. Minor-Piece Endgames

Minor-piece endings reward strategic understanding more than memorization. The fundamental question is always: **what kind of pawn structure favors which piece?**

### 3.1 Bishop vs Knight Basics

**Bishop is better when:**
- Pawns on both wings (the bishop's long range matters).
- The position is open with few pawn obstructions.
- There is a passed pawn on the wing (the bishop attacks/defends from afar).
- The opponent's pawns are fixed on the bishop's color.

**Knight is better when:**
- Pawns are on one wing only (no need for long range).
- The position is closed or blocked.
- There are outpost squares the knight can occupy.
- The bishop is "bad" — its own pawns block its scope.

**Rule of thumb:** "Two weaknesses on opposite sides of the board favor the bishop." "A blockaded center and one weak square favor the knight."

### 3.2 Wrong-Coloured Rook Pawn with Bishop

The most famous theoretical draw in chess: **K+B+a-pawn vs K, where the bishop does NOT control the queening square (a8 for a white a-pawn = light square, so a dark-square bishop is "wrong").** The defender draws by parking the king on the queening square (a8 or h8) — they cannot be dislodged.

**Position:** `k7/8/KP6/B7/8/8/8/8 b - - 0 1` — here the bishop is on a5 (dark square) and the queening square a8 is a light square. Wrong color → draw. Black just shuffles Kb8/Ka8 forever; any attempt to dislodge results in stalemate or the pawn is lost.

This is the most important minor-piece draw to know because it influences when to **trade down** into bishop endings.

### 3.3 Same-Coloured Bishop Endings

Same-color bishop endings (both bishops on, e.g., light squares) are roughly **as decisive as rook endings** — extra pawns usually win. The key concepts:

- **Good bishop vs bad bishop** — pawns on the opposite color of your own bishop are good (the bishop is mobile, the pawns aren't on its diagonals).
- **Outflanking** — the king and bishop can outmaneuver the defender on either wing.
- **Zugzwang** — far more common than in opposite-color bishop endings.

### 3.4 Opposite-Coloured Bishop Endings (Drawing Tendencies)

Opposite-color bishop endings (one player has a light-squared bishop, the other a dark-squared bishop) are **famously drawish**. Even **two extra pawns** often fail to win because the defender's bishop can blockade on its color and the attacker's bishop has no way to dislodge it.

**The drawing fortress:** The defender's bishop watches the queening square or a key blockade square that is on its own color; the attacker's pawns can never cross because every advance is met with capture or fork.

**When opposite-color bishop endings DO win:**
- Three or more connected passed pawns.
- Pawns on both wings far apart with active king.
- An attack on the king (in middlegames especially — opposite-color bishops are sharp with queens on).

### 3.5 Knight vs Bishop with Pawns on Both Sides

Pawns on both wings are a death sentence for the knight in many positions — the bishop reaches both wings in a single move, the knight needs 3-4 moves to redeploy.

**Fischer's famous example:** Botvinnik–Fischer 1962 (Olympiad), where Fischer demonstrated bishop superiority despite material parity.

Practical rule: **with pawns on both wings and a passed pawn, give me the bishop.**

### 3.6 Two Bishops vs Bishop + Knight

The "two bishops" advantage (sometimes called "the minor exchange") is real and persistent. Two bishops cover both color complexes; a B+N pair has a knight that can't cover both colors quickly.

In endings with pawns on both wings, the two-bishops side wins many positions a pawn down. Steinitz first formalized this advantage.

### 3.7 Bishop + Pawn vs Bishop

**Same color bishops:** usually drawn unless the attacker has significant king and bishop activity. Defender blockades on the opposite color of the bishops.

**Opposite color bishops:** almost always drawn. The defender's bishop watches the queening square — the attacker has no way to dislodge it.

**Exception (same color):** If the defender's king is cut off from the queening square AND the attacker's bishop controls key squares, it can win.

### 3.8 Knight + Pawn vs Knight

Generally winning for the attacker if the king is in front of the pawn — but harder than B+P vs B because knights are clumsy at stopping passed pawns. The defender's drawing chances rise sharply with rook pawns or if the defender's king reaches the queening square first.

**Key technique:** The attacker uses the knight to control the queening square long enough to bring the king up.

---

## 4. Queen Endgames

Queen endings are about **king safety and perpetual check**. The queen is so mobile that the side without an exposed king almost always wins; the side with the exposed king almost always finds a perpetual.

### 4.1 Queen vs Pawn on the 7th Rank

A pawn on the 7th rank, supported by its king, can sometimes draw against a queen — depending on the file:

**Center pawn (d- or e-pawn) or knight pawn (b/g):** Queen wins. Standard technique: the queen approaches by checking, forcing the defending king onto the queening square, freeing a tempo for the attacker's king to advance. Repeat until the attacker's king is close enough to support mate or capture.

**Position (queen wins):** `8/8/8/8/8/4k3/4p3/4K2Q w - - 0 1` is wrong setup; the canonical "queen wins vs e-pawn" is:
- White: Qa1, Kh8 (far away)
- Black: Ke2, Pe2 (one move from queening), with Black to move
- FEN: `7K/8/8/8/8/8/4kp2/Q7 w - - 0 1`
- Technique: queen checks, drives king in front of pawn, brings own king closer, repeats.

**Rook pawn (a/h) or bishop pawn (c/f):** **Drawn** with correct defence. The trick: when the queen forces the king to the queening square, the defender uses **stalemate**.

**Example draw with c-pawn:** `8/8/8/8/8/2k5/2p5/2K5 b - - 0 1` — wait, this has both kings on the c-file. The standard drawn position:
- White: Qh1, Kh8
- Black: Kc1, Pc2
- FEN: `7K/8/8/8/8/8/2p5/2k4Q w - - 0 1`
- After **1.Qxc2+? Kxc2 — stalemate** isn't quite it. The right idea: when White checks and tries to drive the king forward, Black plays **...Kb1!** and after **Qxc2 — stalemate** because the king has nowhere to go.

**The pattern:** With a c- or f-pawn, the king goes to the corner (a1/h1), and after a queen capture of the pawn it's stalemate. With a/h-pawns, similar stalemate trick.

### 4.2 Queen + Pawn vs Queen

Generally drawn — perpetual check is too easy. Wins are rare and require:
- A passed pawn already on the 7th rank.
- The defender's king exposed to checks AND blockading the pawn.
- Concrete tactical sequences (often involving a queen exchange via a skewer).

This ending is more theory than practice; club players should know it's "usually drawn" and play for perpetual.

### 4.3 Queen vs Rook (General Winning Technique)

K+Q vs K+R is winning for the queen — but requires the **Philidor technique** (Philidor's queen-vs-rook position). The defender places the rook beside its king (the "third-rank defence"), and the attacker must use **zugzwang** to break the fortress.

**Canonical Philidor Q vs R position:** `8/8/1k6/8/8/1K6/1R6/3Q4 w - - 0 1` — this is approximate. The exact setup:
- Defender: Black king on b7, rook on b6 (or similar adjacent square).
- Attacker: White king two squares away, queen on a key square.

The technique requires **mutual zugzwang** — the queen triangulates to pass the move to Black, who must then break the king-rook contact and lose the rook to a fork.

This is hard. Even strong players blunder it; the 50-move rule catches most attackers who don't know the technique. Rated as one of the trickiest "theoretically winning" endings.

---

## 5. Other Theoretical Endings

### 5.1 King + Queen vs King (Mate)

The most basic mate. Technique:
1. Use the queen to **restrict** the enemy king to a smaller and smaller box.
2. The "knight's move" rule — keep the queen a knight's move away from the lone king. This avoids stalemate.
3. Drive the king to the edge.
4. Bring the attacker's king up.
5. Mate on the edge.

**Stalemate trap:** A common error — the queen approaches too close, leaving the king with no legal moves. Always check for stalemate before any queen move when the enemy king is on the edge.

Should always be mated within 10 moves.

### 5.2 King + Rook vs King (Mate)

Slightly harder because the rook alone can't restrict the king as well as the queen. Technique:
1. Drive the enemy king to the edge using the rook to cut it off.
2. Use the **opposition** with your own king to force the enemy king back.
3. **Box method** — the rook makes a box that shrinks one rank/file at a time.
4. Mate on the edge with the king in opposition.

Should always mate within 16 moves.

### 5.3 King + 2 Bishops vs King (Mate)

Doable, requires technique. The two bishops cover diagonals; the king herds the enemy king to a corner (any corner — not specific to bishop color).

**Technique:**
1. Use both bishops to form a "wall" cutting off ranks.
2. Drive the enemy king to the edge, then to a corner.
3. Mate with one bishop delivering check, the other covering the escape squares.

Mate within ~20 moves with correct play.

### 5.4 King + Bishop + Knight vs King (B+N Mate)

Notoriously difficult — the only basic mate that requires real technique. The lone king must be driven to the **corner of the bishop's color** (this is critical — wrong corner = no mate, only stalemate threats).

**Technique (dark-squared bishop → drive king to a1 or h8):**
1. **Phase 1:** Drive the king to any corner (easier — use B+N+K to box it in).
2. **Phase 2:** If it's the wrong-color corner, use the **W-maneuver** (knight makes a W-shaped path) to drive it along the edge to the right corner.
3. **Phase 3:** Mate in the correct corner.

Standard memorization tools:
- "Deletang's triangles" — the king is corralled within shrinking triangles.
- The W-maneuver (knight does Nf6-e8-d6-b7-c5 type sequences) is the heart of the technique.

Up to 33 moves required with optimal play. Should be **studied and practiced** — the only "easy material" mate that loses on the 50-move rule against a defender who knows to flee the wrong corner.

### 5.5 Rook + Bishop vs Rook

Theoretically a draw with correct defence, but practically wins in 50%+ of games — defenders rarely know the technique.

**Cochrane Defence:** The defender's rook attacks the attacker's bishop along a file/rank, pinning it against the king. As long as the rook can maintain the attack, the bishop cannot maneuver freely.

**Second-Rank Defence:** The defending king goes to the long side (not the bishop's color); the rook stays on the second rank to prevent the attacking king from advancing. Famous and well-analyzed; Karpov vs Kasparov 1991 World Championship featured this ending.

**FEN of Cochrane setup:** `8/8/4k3/8/8/3BK3/r7/3R4 w - - 0 1` — defender's rook attacks the bishop from the side.

### 5.6 Rook + Knight vs Rook

**Drawn** in nearly all cases with simple defence. The knight is too clumsy to coordinate with the king and rook to force mate in a corner. Some specific positions win (knight + rook + king coordinate to create back-rank threats), but for practical purposes: **draw**.

---

## 6. Strategic Endgame Concepts

### 6.1 The Principle of Two Weaknesses

Mark Dvoretsky's most-quoted principle: **one weakness in the enemy camp is rarely enough to win.** The defender can hold a single weakness by parking pieces around it. To win, the attacker creates a **second weakness** on a different part of the board, then alternates pressure between the two.

**Why it works:** The defender's pieces become overloaded. They cannot defend both weaknesses simultaneously. Eventually one falls.

**Practical example:** In a rook endgame with a queenside pawn weakness, the attacker plays to also weaken the kingside (creating a second target), then maneuvers between both wings.

### 6.2 The "Do Not Hurry" Principle (Shereshevsky)

Mark Shereshevsky's rule from *Endgame Strategy*: **in winning endgames, do not rush.** Improve every piece's placement to its maximum before committing to a concrete plan. Repeat moves to gain time on the clock and to provoke the defender into errors.

This contradicts beginner instinct ("I'm winning, I should attack!") — but in the endgame, accumulating small advantages is more reliable than forcing matters.

### 6.3 King Activity in Endings

The king is a **strong piece** in the endgame — roughly equivalent to a knight or slightly stronger. Centralize it. A king on e4 or d4 controls eight squares; a king on e1 controls four (and three may be blocked).

**Capablanca's advice:** "The first thing to do in an endgame is to bring out your king."

### 6.4 Schematic Thinking

**Schematic thinking** (Dvoretsky's term) is endgame planning by **target position** rather than by move-by-move calculation. The player visualizes the **ideal piece placement** — where each piece needs to go for maximum effectiveness — and then works out the move order to achieve it.

Example schema for R+P endings: rook behind passer, king in front of own king, pawn on the 6th rank, defender's pieces tied down. Once the schema is clear, the moves often play themselves.

### 6.5 Pawn Breakthrough

Already covered (1.11). The breakthrough is a tactical sacrifice in a quiet position to create a passed pawn the enemy cannot stop. Recognize the pattern: 3 vs 3 or 3 vs 2 with the right structure → look for a sacrifice that promotes one pawn.

### 6.6 Trading Down — When to Head for Which Ending

**Up material:** Trade pieces, keep pawns (simplifies the win).
**Down material:** Trade pawns, keep pieces (more drawing chances).
**Up a pawn in a rook ending:** Often a draw — consider not trading queens if you have other advantages.
**Up a pawn in a queen ending:** Almost always drawn — avoid the trade unless you have a clear path.
**Up a pawn in a pawn ending:** Usually winning — go for it.
**Same-color bishop endings:** Up a pawn is usually winning.
**Opposite-color bishop endings:** Up a pawn (or even two) is usually drawn — avoid the trade.

### 6.7 Fortresses

A **fortress** is a defensive setup the attacker cannot break with normal means — the defender has set up a wall that the attacker's pieces cannot penetrate, and only zugzwang or tactics can break it (often impossible).

**Common fortresses:**
- Bishop blockade on opposite-color bishop endings.
- Knight + pawns blocking a passed pawn.
- King in the corner against B + wrong rook pawn.
- The "Karstedt fortress" in queen vs rook positions.

Recognizing when to **set up** a fortress (defender) and when to **avoid** the opponent setting one up (attacker) is master-level endgame skill.

### 6.8 Zugzwang (Mutual Zugzwang)

**Zugzwang:** the side to move would prefer to pass — every legal move worsens their position. Zugzwang is mostly an endgame phenomenon (in middlegames there are usually too many neutral moves).

**Mutual zugzwang (reciprocal zugzwang):** both sides would lose if forced to move. Whichever side actually has the move loses. Triangulation (1.5) is the technique to **transfer** the move from one side to the other.

The trébuchet position (1.9) is the canonical mutual zugzwang.

In rook endings, zugzwang is rare (rooks have so many moves). In K+P endings, zugzwang is **everywhere** — often the deciding factor.

---

## 7. Famous Endgame Studies

Endgame studies are composed positions that demonstrate a single instructive idea with maximum economy. Three studies every player should know:

### 7.1 Réti's Study (1921)

Already covered in 1.10 — the diagonal king march that catches both objectives.

**Position:** `7K/8/k1P5/7p/8/8/8/8 w - - 0 1`

**Lesson:** A king's diagonal travels two missions at once.

### 7.2 The Saavedra Position (1895)

One of the most famous chess studies ever composed. White appears to be only able to draw or stalemate; the actual answer requires **underpromotion to a rook** plus a discovered mating threat.

**Position:** `8/8/1KP5/3r4/8/8/8/k7 w - - 0 1`

**Solution:**
- **1.c7 Rd6+ 2.Kb5 Rd5+ 3.Kb4 Rd4+ 4.Kb3 Rd3+ 5.Kc2** (the king walks forward, dodging checks)
- **5...Rd4!** (the trick — Black sets up the stalemate trap: if 6.c8=Q, then 6...Rc4+! 7.Qxc4 stalemate!)
- **6.c8=R!!** (underpromotion! White avoids the stalemate by promoting to a rook, threatening Ra8 mate)
- **6...Ra4** (the only defence to mate)
- **7.Kb3!** — double attack: king attacks the rook AND threatens Rc1 mate. Black can't defend both. **White wins.**

**Lesson:** Underpromotion is real. Stalemate is the defender's best friend. Always check for **all four** promotion options.

### 7.3 Troitsky Positions

Alexei Troitsky composed hundreds of studies. The most famous body of his work is the analysis of **two knights vs pawn** — the "Troitsky line" — which proves that K + N + N vs K + P is a win if the defender's pawn has not crossed the Troitsky line (which runs across specific squares: a4-b6-c5-d4-e4-f5-g6-h4 approximately).

**Position (illustrative):** `8/8/8/8/8/4N3/3p4/4K1Nk w - - 0 1` — White has two knights vs Black's king and a pawn that hasn't crossed the line. White can win by allowing the pawn to advance just enough to remove stalemate, then mating with the two knights.

**The two knights paradox:** Two knights alone cannot mate a lone king (it's stalemate territory). But with a defender's pawn on the board, the pawn provides Black a tempo move that breaks the stalemate, and White can mate. Troitsky worked out exactly which pawn positions allow the win.

This is one of the deepest theoretical endings in chess and rarely comes up in practice — but it's a beautiful example of how a "weakness" (the defender's pawn) becomes the key to losing.

### 7.4 Honorable Mentions

**Lasker's pawn study (1890):** demonstrates the breakthrough motif (covered in 1.11).

**The Kling and Horwitz position:** R+B vs R defensive technique fortress.

**Centurini's bishop endings:** technique for B+P vs B with same-color bishops.

---

## Summary Cheat Sheet

| Ending | Result | Key technique |
|---|---|---|
| K+P vs K, attacker's king in front | Win | Key squares + opposition |
| K + rook pawn vs K, defender in corner | Draw | Stalemate trap |
| Lucena (R+P vs R, king in front) | Win | Build the bridge |
| Philidor (R+P vs R, defender's king in front) | Draw | Rook on 6th rank, then check from behind |
| Vančura (R + a-pawn vs R) | Draw | Rook on 6th rank attacking pawn from side |
| R + 4 vs R + 3 same wing | Draw | Active rook + short side defence |
| R + h+f vs R | Win | Push f-pawn first |
| R + g+h vs R | Draw | Defender's king to h7/h8 |
| Q vs P on 7th (a/c/f/h) | Draw | Stalemate trap |
| Q vs P on 7th (b/d/e/g) | Win | Approach by checks |
| K+R vs K | Win (≤16 moves) | Box + opposition |
| K+B+N vs K | Win (≤33 moves) | Drive to bishop's-color corner; W-maneuver |
| K+2B vs K | Win (~20 moves) | Drive to any corner |
| Wrong-color bishop + RP | Draw | Defender's king to corner |
| Opposite-color bishops + 1 pawn | Draw | Bishop blockade |
| R+B vs R | Draw (theoretically) | Cochrane / 2nd-rank defence |
| R+N vs R | Draw | Easy defence |

---

## Recommended Lesson Sequence for the App

1. **Foundations:** opposition, the square, key squares.
2. **K+P vs K:** all winning positions and the rook-pawn draw.
3. **Triangulation and zugzwang.**
4. **Lucena and Philidor** — the two pillars of rook endings.
5. **Vančura, short side / long side** — drawing techniques.
6. **Tarrasch's rule** — rook behind the passer.
7. **Bishop vs knight strategic principles.**
8. **Wrong-color rook pawn draw.**
9. **Opposite-color bishops drawing tendencies.**
10. **Basic mates:** Q, R, 2B, B+N.
11. **Q vs P:** the four pawn types.
12. **Strategic concepts:** two weaknesses, do-not-hurry, schematic thinking, fortresses.
13. **Studies:** Réti, Saavedra — pure inspiration.

This sequence builds from concrete (must-know positions) to strategic (general principles), matching how strong players actually develop endgame skill.
