// Endgame drills — practice positions vs the engine.
// Each entry is a theoretical endgame the user plays against Stockfish from
// a fixed starting FEN. Categories: pawn | rook | minor | queen | basic-mate | complex.
//
// Source material lives in docs/research/endgames.md. FENs were verified by
// counting squares per rank (must total 8) and checking for exactly one king
// per side.

export const ENDGAMES = [
  // ─── PAWN ENDINGS ───────────────────────────────────────────────────────────
  {
    id: "kp-vs-k-opposition",
    title: "K+P vs K — King in Front of the Pawn",
    category: "pawn",
    fen: "4k3/8/4K3/4P3/8/8/8/8 b - - 0 1",
    userColor: "w",
    goal: "Promote the e-pawn and win.",
    engineDepth: 12,
    explanation: `This is the canonical winning K+P vs K position: the attacker's king is two ranks ahead of its pawn, sitting on or near a **key square**. For a pawn on the 5th rank, the key squares are d7, e7 and f7 — reach any one of those and the pawn promotes by force, regardless of who has the opposition.

The governing concept here is **opposition**. Two kings stand on the same file, rank, or diagonal with one square between them; the player **not** to move "has the opposition" and forces the enemy king to give ground. With Black to move in this diagram, White holds the opposition and Black must step aside.

**Winning plan:**
1. After **1...Kd8**, play **2.Kf7!** seizing f7 (a key square). Now the pawn marches: 2...Kd7 3.e6+ Kd6 4.e7 and queens.
2. After **1...Kf8**, play **2.Kd7!** by symmetry.

The trap to avoid is pushing the pawn too early. **1.e6+? Kd8** (or Kf8) lets Black grab the opposition and draw — the white king ends up *beside* the pawn instead of in front of it, and the defender shuffles between d8/e8/f8 forever. **Kings before pawns** is the rule: get the king to a key square first, push the pawn last.

Note the exception: rook pawns (a- and h-pawns) draw even with the king in front, because the attacking king has no way to step out of the corner without losing the pawn or stalemating. That's a separate drill.`
  },
  {
    id: "kp-vs-k-rook-pawn-draw",
    title: "Rook Pawn Draw — Defender in the Corner",
    category: "pawn",
    fen: "7k/8/6KP/8/8/8/8/8 b - - 0 1",
    userColor: "b",
    goal: "Hold the draw — the engine will try to promote the h-pawn.",
    engineDepth: 12,
    explanation: `The most important drawing exception in K+P vs K: with a **rook pawn** (a- or h-pawn), the defender draws as long as their king can reach the corner — even when the attacking king is already in front of the pawn. The corner saves you because there's literally no room for the attacker's king to step out of the pawn's path without either losing the pawn or stalemating you.

In this position White has King g6, Pawn h6 against your lone king on h8. It looks lost — the white king is in front of the pawn, on the 6th rank, normally a textbook win. But the h-file robs the attacker of half the board.

**Drawing technique (Black to play):**
1. **1...Kg8!** is the only move. Black sticks to the corner side.
2. **2.h7+ Kh8** — forced, but now look at White's king on g6.
3. **3.Kh6** — and Black is **stalemated**. No legal move (Kxh7 illegal; the white king covers it / no other squares).

If instead White avoids 2.h7+ and plays **2.Kh6**, then **2...Kh8** repeats and Black just shuffles Kg8/Kh8. White can never make progress without either pushing into stalemate or abandoning the pawn.

**Practical takeaway:** when defending K+P vs K with a rook pawn, **race for the corner**. Even one tempo too slow and the draw evaporates. And as the attacker — never trade down into K + rook pawn vs K thinking it's an automatic win. It's a draw whenever the defender's king reaches a8 or h8.`
  },
  {
    id: "trebuchet",
    title: "Trébuchet — Mutual Zugzwang",
    category: "pawn",
    fen: "8/8/5k2/5p2/4PK2/8/8/8 w - - 0 1",
    userColor: "b",
    goal: "Win — the side NOT to move wins. Play as Black and accept the gift.",
    engineDepth: 14,
    explanation: `**Trébuchet** (French for "siege engine") is the purest example of **mutual zugzwang** in chess: whichever side has the move loses. Both kings are stuck defending a pawn the enemy king attacks; any king move abandons the pawn and the resulting K+P vs K is winning for the other side.

Look at the position carefully. White's king on f4 attacks Black's pawn on f5; Black's king on f6 attacks White's pawn on e4. Neither king can move without dropping its pawn — but somebody has to move. Whoever it is, loses.

In the diagram White is to move, so White is lost:
- **1.Kxf5?? Kxe4** wins — wait, after Kxf5 Black has no king move that protects e4. Actually 1.Kxf5 Ke7 (or wherever) and White's e-pawn is fine, but then the position is rook-pawn-style trying to convert. The cleaner losing line:
- **1.Ke3 Kxe4+ 2.Kxe4** — wait, that's Black moving twice. Let me restate: any king move loses material. **1.Kf3 Kxe4** and Black has K+P vs K with king well in front — winning.
- **1.Kg4 Kxe4** wins for Black.

Conversely if it were Black to move (same diagram with side-to-move flipped), Black would lose by symmetry.

**Why this matters:** Trébuchet is the conceptual atom of K+P endgame theory. Every pawn ending eventually reduces to a question of "whose move is it in this critical position?" — and the player who can engineer **triangulation** (losing a tempo to pass the move) wins these positions. Play this drill and feel how the side without the move is helpless.

In the engine drill you'll play Black, accept the white blunder, capture the e-pawn, and convert with K+P vs K technique (your king is in front of the pawn → winning).`
  },
  {
    id: "outside-passed-pawn",
    title: "Outside Passed Pawn — Decoy and Win",
    category: "pawn",
    fen: "8/p4k2/8/5K2/3P1P1P/8/8/8 w - - 0 1",
    userColor: "w",
    goal: "Use the outside h-pawn as a decoy, then mop up on the queenside.",
    engineDepth: 14,
    explanation: `An **outside passed pawn** is a passed pawn far from the main pawn group. Its strategic value is enormous: the defender's king must abandon the main battlefield to stop it, and the attacker's king then walks into the rest of the position and devours pawns.

In this position White has pawns on d4, f4, h4 — the h-pawn is the outside passer. Black has only the a7-pawn. White's king on f5 is well centralized.

**Winning plan:**
1. **1.h5** push the outside pawn. Black's king must rush over: **1...Kg7 2.h6+ Kh7 3.Kf6** (or first race the pawn).
2. Once Black's king is committed to stopping the h-pawn, White's king walks back to the queenside.
3. White wins the a7-pawn, then promotes the d-pawn or f-pawn under cover of king and queenside material.

The principle Réti taught: **"The threat is stronger than the execution."** Even if the h-pawn is itself captured, the *time* it cost Black to stop it is decisive — the white king is now miles ahead in the race for the other wing.

**Common mistake:** trying to push the central pawns first. Don't. Push the outside pawn first and force Black's king to react. The center pawns are your reserves; they win the game once Black's king is committed elsewhere.

This is one of the most important practical concepts in pawn endings — when you're trading down with material parity but a better pawn structure, the side with an outside passer almost always wins.`
  },
  {
    id: "pawn-breakthrough",
    title: "Three-on-Three Breakthrough",
    category: "pawn",
    fen: "7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1",
    userColor: "w",
    goal: "Sacrifice to create an unstoppable passed pawn.",
    engineDepth: 14,
    explanation: `The classic Capablanca-style **pawn breakthrough**: three pawns versus three pawns on the same files, far from both kings. It looks like a dead-locked symmetrical structure — but White to move wins by force with a tactical sacrifice.

**The breakthrough:**
1. **1.b6!** — the key move. Both captures lose:
   - **1...axb6 2.c6! bxc6 3.a6** and the a-pawn promotes, because Black's b-pawn (now on b6 from the capture) can't catch it.
   - **1...cxb6 2.a6! bxa6 3.c6** and the c-pawn promotes by the same logic.
2. If Black instead ignores: **1...Kg8 2.bxc7** (or bxa7) wins a pawn cleanly.

**The principle:** when you have pawns on adjacent files and the enemy has the same structure mirrored, **sacrificing the middle pawn** removes one defender and lets the wing pawn run. The enemy can't defend two threats at once because the recaptures are forced into specific squares.

Pattern recognition is everything here. Look for three-vs-three (or three-vs-two) on the same files with no enemy pieces nearby. If the kings can't reach the queening square in time, a breakthrough is almost always lurking.

**A wider lesson:** pawn endings are full of these "pseudo-symmetric" positions where one side is winning by a single tempo. Counting tempi — or finding the breakthrough that creates a tempo — is the skill. Once you see the **1.b6!** idea, you'll see it everywhere.`
  },

  // ─── ROOK ENDINGS ───────────────────────────────────────────────────────────
  {
    id: "lucena",
    title: "Lucena Position — Building the Bridge",
    category: "rook",
    fen: "1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1",
    userColor: "w",
    goal: "Promote the b-pawn using the bridge technique.",
    engineDepth: 14,
    explanation: `The **Lucena Position** is the foundational winning technique for Rook + Pawn vs Rook when the attacker's king is in front of its own pawn on the 7th rank — but cut off from escaping by the enemy rook on the 2nd rank.

White has King b8, Pawn b7 (one square from queening), Rook c1. The pawn is ready to promote, but the king is trapped on the 8th rank: any move (Ka7? Kc7?) is met by checks from the black rook on a2 that drive the king back. Black's rook on a2 is the cutter; Black's king on d7 is sniffing at the pawn.

**The Bridge technique:**
1. **1.Rc1–Rf1+!** Drive the black king away first. Use the rook on the file beside the pawn to give a check.
2. **1...Ke7** (or Ke6 — the king is forced to move).
3. **2.Rf4!** — the bridge-builder. Place your rook on the **4th rank** (one rank "ahead" of the side checks Black will give).
4. Now play **3.Kc7** (or already in some lines), threatening to march the king out: **3...Rc2+ 4.Kb6 Rb2+ 5.Ka6 Ra2+ 6.Kb5 Rb2+**.
5. **7.Rb4!** — the bridge interposes, blocking the check while supporting promotion. Black runs out of checks; the pawn queens.

**Why "the bridge"?** Your rook on the 4th rank acts as a permanent shield — when the black rook checks, you interpose your own rook on the b-file at b4, both blocking the check **and** sitting next to the pawn on b7 to support promotion.

**Key idea to internalize:** the king must escape its own pawn's shadow without taking checks forever. The 4th-rank rook provides that shield. Without the bridge, the king can never come out and Black holds.

This is the single most important winning technique in rook endings. Master it. The mirror-image drawing technique — Philidor — is the next drill.`
  },
  {
    id: "philidor",
    title: "Philidor Position — Drawing R+P vs R",
    category: "rook",
    fen: "8/4k3/4r3/4K3/4P3/8/8/3R4 b - - 0 1",
    userColor: "b",
    goal: "Hold the draw using the third-rank defence.",
    engineDepth: 14,
    explanation: `The **Philidor Position** is the foundational drawing technique in Rook + Pawn vs Rook when the defender's king is in front of the enemy pawn and the attacker's king has not yet reached the 6th rank.

You're playing Black. White has King e5, Pawn e4, Rook d1. You have King e7, Rook e6. The white king wants to advance to the 6th rank to support the pawn — your job is to prevent that.

**Drawing technique:**
1. **1...Ra6!** (or any sixth-rank square — the rook patrols the 6th rank). This **cuts off the white king** from advancing to e6/d6/f6. As long as your rook sits on the 6th, the white king cannot help its pawn forward.
2. White plays a waiting move; you just shuffle along the 6th rank: **2.Rd2 Rb6 3.Re2 Rc6** etc.
3. The moment White advances the pawn — **2.e5** (or whenever) — the white king has to give up the 6th rank to make room. Now you switch plans: **2...Ra1!** — drop the rook to the back rank.
4. Now check from behind: **3.Kf5+ Rf1+ 4.Ke6 Re1+ 5.Kd6 Rd1+** etc. The white king has nowhere to hide because it's already in front of its own pawn — the pawn doesn't shield it from checks from behind. Black draws by perpetual check.

**The principle in one sentence:** "Rook on the 6th rank until the pawn advances, then check from behind."

**Why it works:** the white king needs cover to escape the checks. The pawn would normally provide that cover — but only when the king is *behind* it. Once the pawn passes, the king is naked on an open file and the side checks are unstoppable.

**Critical caveat:** Philidor only works if the defender's king is **in front of the pawn** (on the queening file or adjacent files) before the attacker's king reaches the 6th. If the attacker's king is already on the 6th and yours isn't on the queening file, you may face Lucena and lose. Get your king back fast in R+P endings — this is why "rook endings are drawish": the defender so often reaches Philidor.`
  },
  {
    id: "vancura",
    title: "Vančura Defence — R + a-pawn vs R",
    category: "rook",
    fen: "K7/P7/5k1r/8/8/8/8/1R6 b - - 0 1",
    userColor: "b",
    goal: "Hold the draw by attacking the a-pawn from the side.",
    engineDepth: 14,
    explanation: `The **Vančura Defence** (named for the Czech analyst Josef Vančura) is the only drawing method when the defender is faced with R + rook pawn vs R and the defender's king is **cut off from the corner**. Without the Vančura, you simply lose — the attacker walks the king out and promotes. With it, you draw.

You're Black. White has King a8, Pawn a7 (one square from queening), Rook b1. Your king is on f6 — far from the corner, cut off. Your rook is on h6.

**Drawing idea:** Place your rook on the **6th rank**, attacking the pawn **from the side**. Crucially, the rook also eyes the squares the white king must use to escape (b8, b7 etc.).

**Technique:**
1. Keep the rook patrolling f6/g6/h6 — always with the pawn under attack along the rank.
2. White cannot defend the pawn with the rook, because doing so would either block the king's only escape from a8 or expose the rook to attack.
3. The white king cannot leave a8/b8 corner area: the moment it tries (e.g., **1.Kb7**), Black plays **1...Rb6+!** and after **2.Ka6 Ra6+** wait — actually after **1.Kb7 Rb6+ 2.Ka6 Rxa7+ wins the pawn**, or in cleaner lines Black gives perpetual side checks because the king can never find shelter.
4. White is stuck. The king cannot move; the pawn cannot advance (it's already on a7 — promotion to a8 = loss of pawn since Black rook on 6th watches a8 indirectly via the king).

**Why the 6th rank?** Two reasons:
- **Range** — far enough from the king to deliver side checks without being chased to the edge.
- **Dual function** — attacks the pawn AND covers the white king's escape squares.

**Common mistake:** placing the rook on the a-file in front of the pawn (Ra-something blocking promotion). That works *temporarily* but loses to Rb1-b8 ideas where White trades rooks at a moment that wins. The Vančura's side-attack with king activity from afar is the only reliable draw.

**Practical importance:** rook + a-pawn vs rook is one of the most common "weird" endings in tournament play. Knowing the Vančura turns lost positions into draws.`
  },
  {
    id: "rook-behind-passed-pawn",
    title: "Rook Behind the Passer (Tarrasch's Rule)",
    category: "rook",
    fen: "r7/8/2k5/P7/8/1K6/R7/8 w - - 0 1",
    userColor: "w",
    goal: "Advance the a-pawn — the rook behind supports, the enemy rook is tied down.",
    engineDepth: 14,
    explanation: `**Tarrasch's Rule:** "Rooks belong **behind** passed pawns — your own and your opponent's." It's the single most important placement principle in rook endings.

In this drill White's rook is on a2, **behind** its passed a-pawn on a5. Black's rook is on a8, condemned to passive defence **in front** of the white pawn. As White advances the pawn, three things happen simultaneously:

- **White's rook gains scope.** With each pawn push, the white rook controls more squares along the a-file behind the pawn.
- **Black's rook loses scope.** As the pawn advances, the black rook has fewer squares to occupy on the a-file (it's already at a8, the only refuge).
- **Black's king stays tied down.** Because the black rook can't leave (the pawn would queen), only the king can intervene — but it has to do everything alone.

**Winning plan:**
1. Bring the white king up: **1.Kc4, 2.Kb5** etc. The pawn doesn't have to push immediately.
2. Once the king supports the pawn from b6 or b7, push: **a5–a6–a7**, eventually winning the black rook for the pawn or queening with king cover.

**Worst placement (the anti-Tarrasch):** rook **in front** of an enemy passed pawn. Always passive, always babysitting, no activity. If you find your rook in this position, look for any way out — even sacrificing the rook for the pawn is sometimes correct because activity matters more than material in rook endings.

**Behind your own passer:** the rook is a weapon. **Behind the enemy passer:** the rook is a sniper, picking off pawns the king has to abandon. **In front:** the rook is in jail.

This rule applies to almost every rook endgame. When you have or face a passed pawn, ask first: where is my rook? If it's not behind, work on getting it there before doing anything else.`
  },

  // ─── MINOR-PIECE ENDINGS ────────────────────────────────────────────────────
  {
    id: "wrong-color-rook-pawn",
    title: "Wrong-Color Bishop + Rook Pawn — Draw",
    category: "minor",
    fen: "k7/8/P7/8/8/8/3B1K2/8 b - - 0 1",
    userColor: "b",
    goal: "Hold the draw — park the king in the corner.",
    engineDepth: 14,
    explanation: `The most famous theoretical draw in chess: **King + Bishop + Rook Pawn vs King**, when the bishop does **not** control the queening square. The defender just parks the king in the corner and cannot be dislodged.

In this position White has King f2, Bishop d2 (a **dark-square** bishop), Pawn a6. The promotion square a8 is a **light** square. Since White's bishop is dark-squared, it can never control or attack a8 — and that single fact draws the game even though White has a piece and a pawn ahead.

**Drawing technique (Black to play):**
1. **1...Kb8** (or stay on a8) — just shuffle between a8 and b8. The white king cannot approach the corner without leaving the pawn vulnerable, and the bishop cannot help cover the queening square.
2. If White ever pushes **a7+ Ka8**, Black is in the corner and stalemate threats are everywhere.
3. If White's king tries to come up to support promotion (**Ke3, Kd4, Kc5, Kb6**), eventually Black is stalemated — moving the king to a8/b8 alternately, the moment White's king reaches b6 with pawn on a7, Black has no legal move (both kings adjacent is illegal, Kxa7 illegal due to opposition, etc.).

**Why "wrong color"?** Picture promoting on a8 (light square). To force promotion, the attacker needs the bishop to **control a8** (light) so the defender can't park its king there — and to **kick the king off** the a-file. A dark-squared bishop attacks dark squares; it can never touch a8 or b7. With the wrong bishop, the corner is a permanent fortress.

**Practical implications:**
- **Don't trade into this ending if it's drawn.** If you're up a bishop and pawn but the bishop is wrong-color for your rook pawn, it's a dead draw — find another plan.
- **Trade INTO it when defending.** If you're losing material and can simplify into K + B + wrong-RP vs K, you've saved the game.

The same logic applies to h-pawns (dark queening square h1/h8 from black's promotion or h8 light from white's — careful with parity). The principle: if the bishop can't reach the queening square's color, the rook-pawn ending is drawn.`
  },
  {
    id: "opposite-color-bishops-draw",
    title: "Opposite-Color Bishops — Drawing Tendencies",
    category: "minor",
    fen: "8/6b1/3p1k2/3P4/8/5K2/8/1B6 w - - 0 1",
    userColor: "b",
    goal: "Hold the draw — set up a fortress on your bishop's color.",
    engineDepth: 14,
    explanation: `**Opposite-color bishop endings** — one player's bishop is on light squares, the other's on dark — are famously drawish. Even **two extra pawns** often fail to win, because the defender's bishop can blockade on its own color and the attacker's bishop has no way to dislodge it.

In this drill both sides have a single pawn (d5 vs d6) and a king. White's bishop on b1 is **light-squared**; Black's bishop on g7 is **dark-squared**. They can never trade. They cover different colored squares. This is the textbook drawing structure.

**Drawing technique (you're Black):**
1. The d5/d6 pawn structure is locked. Your bishop on g7 patrols dark squares — you'll use it to blockade any white pawn that tries to advance.
2. Keep your king centralized but ready to oppose any incursion: **1...Kf5** or sit on f6.
3. If White tries to win by king activity, your bishop and king together cover both color complexes (your bishop covers darks, your king covers lights when needed).
4. Trade nothing if avoidable — every piece off the board narrows White's winning chances; ironically here you want the bishop pair to remain because the **opposite** colors are what draws.

**The fortress principle:** the defender places the bishop watching the queening square (or the key blockade square) on its own color. The attacker's pawns can never cross because every advance is met with capture or a fork. Even with material disadvantage, the position is a wall.

**When opposite-color bishop endings DO win:**
- Three or more **connected** passed pawns — the attacker has so many threats that the bishop can't cover them all.
- Pawns on **both wings far apart** with an active king — the defender's bishop and king can't be in two places.
- An attack on the king (not common in pure endings, but in middlegames opposite-color bishops are sharp).

**Practical takeaway:** if you're losing material and can simplify into opposite-color bishops, do it — you'll often save the game. If you're winning, **avoid** simplifying into opposite-color bishops; keep rooks or trade into a same-color bishop ending instead.`
  },

  // ─── QUEEN ENDINGS ──────────────────────────────────────────────────────────
  {
    id: "queen-vs-pawn-7th",
    title: "Q vs P on 7th — Center Pawn (White Wins)",
    category: "queen",
    fen: "7K/8/8/8/8/8/3kp3/Q7 w - - 0 1",
    userColor: "w",
    goal: "Stop the e-pawn from promoting and bring your king up to win.",
    engineDepth: 14,
    explanation: `**Queen vs Pawn on the 7th rank**: the result depends entirely on the file. With a **center pawn** (d- or e-pawn) or a **knight pawn** (b/g), the queen wins. With a **rook pawn** (a/h) or **bishop pawn** (c/f), the position is drawn by stalemate tricks.

This drill is the winning case. Black has King d2, Pawn e2 (one square from promotion). White has Queen a1, King h8 (very far away). White to move.

**Winning technique — approach by checks:**
1. **1.Qd4+** (or Qe5+ or any check). The queen forces the black king to move.
2. The key idea: drive the black king **in front of its own pawn**. If after a check the king must step to e1 (in front of e2), that **frees a tempo** for White's king to advance one square.
3. **2.Qxe2 doesn't apply yet** — keep checking. **1.Qd4+ Kc1 2.Qe3+ Kd1** (forced or similar).
4. **3.Kg7** — when Black is forced to e1 in front of the pawn, White has a free move to bring the king closer.
5. Repeat: check → king to e1 → free king move. Slowly the white king arrives.
6. Once White's king is close enough (say Kf3), White wins by capturing the pawn or delivering mate.

**Why center/knight pawns win:** when the queen forces the defender's king to a square *in front* of the pawn (e.g., e1 for an e-pawn), the king isn't stalemated because there are squares to the side it can use later. The attacker steals tempi to march the king forward.

**Why rook/bishop pawns draw:** with an a- or c-pawn, the key escape squares for the defender's king are exactly the corners — and after a check forcing the king to a1 or c1, **capturing the pawn is stalemate**. The queen literally cannot approach without giving stalemate or losing the pawn.

**Memorize the rule:** "the four bad files are a, c, f, h." Center and knight pawns lose; rook and bishop pawns draw.`
  },
  {
    id: "queen-vs-pawn-stalemate-draw",
    title: "Q vs P on 7th — c-pawn (Stalemate Draw)",
    category: "queen",
    fen: "7K/8/8/3Q4/8/8/2p5/1k6 w - - 0 1",
    userColor: "b",
    goal: "Hold the draw — use the stalemate trick when the queen approaches.",
    engineDepth: 14,
    explanation: `The drawn case of Q vs P on the 7th: with a **bishop pawn** (c- or f-pawn), the defender uses **stalemate** to hold the draw, even against a queen and active king.

In this drill White has Queen d5, King h8 (still far). Black has King b1, Pawn c2 (one square from promotion). You're Black, defending.

**Drawing technique:**
1. The pawn on c2 threatens **...c1=Q** next move. White must address it.
2. White will check to drive your king around: **1.Qd2** (threatening mate and the pawn) **1...Ka1!** — into the corner.
3. Now if **2.Qxc2 — stalemate!** Your king on a1 has no legal moves: a2 attacked by the queen on c2, b1 attacked by the queen on c2, b2 attacked by the queen on c2. No escape, no captures. Stalemate.
4. So White cannot win the pawn directly. Any attempt to bring the white king closer takes many moves, during which you keep oscillating: **...Ka1, ...Kb1, ...Ka1**. Each time the queen forces you toward the corner, the stalemate trick saves you.

**The mechanism:** with a c-pawn, the defending king's natural retreat is into the a1-corner. Once the king sits on a1, *any* queen capture of the c2-pawn covers all three escape squares (a2, b1, b2) and stalemates Black.

**The same trick with rook pawns:** an a-pawn version is even more stalemate-prone — the defending king has even fewer squares.

**The same trick with f-pawns and h-pawns:** mirrors of the above.

**What to look out for as the attacker (and avoid this ending):** if you're up a queen vs lone pawn and notice it's a c/f/a/h-pawn on the 7th, **do not** carelessly approach with the queen. Bring your king up *first* — only then can you afford to capture the pawn without stalemate. If your king is too far away (50-move rule), you may have to settle for a draw.

**Defensive lesson:** if you're the defender, race your pawn to the 7th and your king to the corner. The position you reach may be drawn by force.`
  },

  // ─── BASIC MATES ────────────────────────────────────────────────────────────
  {
    id: "kqk-mate",
    title: "King + Queen vs King — Basic Mate",
    category: "basic-mate",
    fen: "4k3/8/8/8/8/8/8/3QK3 w - - 0 1",
    userColor: "w",
    goal: "Mate the lone king (target: under 10 moves).",
    engineDepth: 10,
    explanation: `The most basic mate. With queen and king vs lone king, you should always mate within 10 moves with correct technique.

**Technique (the "knight's-move" method):**
1. **Restrict the king with the queen.** Place the queen a knight's move away from the lone king (e.g., if the black king is on e5, put your queen on c4, c6, d3, d7, f3, f7, g4, or g6). This restricts the king to a smaller and smaller "box" without giving stalemate.
2. **Drive the king to the edge.** As the lone king moves, follow it with the queen — always maintaining the knight's-move distance. The box shrinks rank by rank or file by file until the lone king is on the edge of the board.
3. **Bring your own king up.** The queen alone cannot mate — your king must walk over to support. Don't push the queen toward mate before your king is in range; you'll just stalemate.
4. **Mate on the edge.** With the lone king on, say, the 8th rank and your king on the 6th rank in opposition, deliver mate with the queen on the 7th or 8th rank cutting off escape.

**Stalemate trap (the only real danger):** approaching the queen too close, especially when the lone king is in the corner. If the lone king is on a8 and your queen goes to b6 with no other piece supporting, the king has no legal moves — stalemate, draw. **Always check for stalemate before any queen move when the enemy king is on the edge.**

**Concrete example (from the diagram):**
- Black king on e8, white queen on d1, white king on e1.
- **1.Qd4** (knight's move from black king's e8 — wait, a knight's move from e8 is d6, c7, d7 etc. Adjust: **1.Qd5** — restricts black king's box to the f-file and 8th rank area.
- Black plays **1...Kf7** or wherever. Follow with **2.Qd6** or similar, always cutting off ranks/files.
- Bring the king: **3.Ke2, 4.Kf3, 5.Kg4** etc.
- Eventually mate on the edge.

**Practice tip:** the worst habit is rushing. Don't try to mate in 5 — let the queen patiently shrink the box, bring the king, mate cleanly. With practice this becomes automatic.`
  },
  {
    id: "krk-mate",
    title: "King + Rook vs King — Basic Mate",
    category: "basic-mate",
    fen: "4k3/8/8/8/8/8/8/3RK3 w - - 0 1",
    userColor: "w",
    goal: "Mate the lone king (target: under 16 moves).",
    engineDepth: 10,
    explanation: `Slightly harder than K+Q vs K, because the rook alone can't restrict the lone king as well as the queen can. With correct technique, mate within 16 moves.

**Technique (the "box" method):**
1. **Cut off the king with the rook.** Place the rook so it cuts the lone king off from a part of the board. The rook makes a "box" — the smaller side of the board the lone king is confined to.
2. **Use opposition with your own king.** The rook can't drive the king alone; your king must close in. When the kings face each other on the same file/rank with one square between them and the lone king must move (you have the opposition), the lone king gives ground.
3. **Shrink the box.** Each time the lone king is forced to a smaller area, move the rook one rank or file closer to keep cutting. Repeat: opposition → enemy king moves → cut off with rook.
4. **Mate on the edge.** Final position: lone king on the back rank, your king in opposition on the 6th rank, your rook delivers mate from the side.

**Concrete sequence (from this diagram):**
- Black king on e8, your king on e1, rook on d1.
- Rook is already cutting off the d-file. Walk the king up: **1.Ke2 Kd7 2.Ke3 Kd6 3.Ke4 Kd7 4.Kd5** (if possible) — but careful, kings can't be adjacent.
- The technique iterates: get to opposition, force the lone king back, slide the rook closer.
- Eventually: white king on e6, black king on e8 (opposition with white to move can be transferred), rook delivers Rd8 mate.

**Common mistake:** giving useless rook checks early. Don't check the king around the board — that just lets it escape. Use the rook to **cut**, not to chase. The king does the chasing.

**Stalemate trap:** much rarer than in K+Q vs K, but possible. When the lone king is in a corner and you have rook and king nearby, double-check before moving the rook — make sure the lone king has at least one legal move (or it's mate, not stalemate).

**Practice tip:** this mate teaches **king activity** more than anything else. Your king does the heavy lifting; the rook just cuts. Once you internalize "king up first, rook cuts, opposition forces back," mate flows naturally.`
  },
  {
    id: "two-bishops-mate",
    title: "King + 2 Bishops vs King — Mate",
    category: "basic-mate",
    fen: "4k3/8/8/8/8/8/8/2B1KB2 w - - 0 1",
    userColor: "w",
    goal: "Drive the king to a corner and mate (target: under 20 moves).",
    engineDepth: 12,
    explanation: `Mating with **two bishops** vs a lone king is doable but requires real technique. Unlike K+Q or K+R, the bishops are long-range but cover only diagonals — together they cover both color complexes, which is the key. Mate within roughly 20 moves with correct play. Importantly, mate can be delivered in **any** corner, not just one specific color.

**Technique:**
1. **Form a wall with the bishops.** Place both bishops on adjacent diagonals to cut off ranks. For example, bishops on a3 and b2 cut off a long diagonal stripe; bishops on d4 and e4 do the same in the center.
2. **Drive the lone king to the edge.** Use king + bishops together to systematically push the enemy king toward an edge.
3. **Then to a corner.** Once on the edge, narrow the bishops' diagonals to force the king into a corner — any corner.
4. **Mate.** Final pattern: lone king in the corner, your king close (say, two squares away in opposition), one bishop delivers check, the other covers the only escape diagonal.

**Concrete plan from the diagram (white Bc1, Ke1, Bf1):**
- First, develop both bishops to active squares: **1.Bd2** and **2.Be2** (or similar) to start building a wall.
- Bring your king up to the center: **3.Kd3, 4.Kc4** etc.
- Use the bishops to cut off escape ranks: with the lone king on (say) e8, place bishops on b2 and c2 — together they cover the long diagonal a1-h8 and a3-f8 region.
- Iterate: king pushes, bishops cut, king pushes harder.

**Mate position (example):**
- Lone king on h8 (or a1).
- Your king on f7 (or c2).
- One bishop checks on, e.g., the a1-h8 diagonal; the other covers the only flight square.

**Common mistakes:**
- **Stalemate** — happens often with two bishops. Always check for legal king moves before committing.
- **Letting the lone king out of the corner** — once you have it cornered, don't give it room to dance back to the center.
- **Using only one bishop** — both must work together.

**Practice tip:** practice driving the king specifically to the **a1 corner** and to the **h1 corner**, etc., on different attempts. The technique looks similar but the bishop coordination differs slightly each time. Once it clicks, this is one of the more satisfying mates to deliver.`
  },

  // ─── COMPLEX ENDINGS ────────────────────────────────────────────────────────
  {
    id: "rb-vs-r",
    title: "Rook + Bishop vs Rook (Drawn in Theory)",
    category: "complex",
    fen: "4k3/8/8/8/8/3BK3/r7/3R4 w - - 0 1",
    userColor: "w",
    goal: "Try to win — but theoretically this should be a draw.",
    engineDepth: 14,
    explanation: `**Rook + Bishop vs Rook** is theoretically a **draw** with correct defence, but practically wins more than half the time at amateur level — defenders rarely know the technique, and the winning side has many tries to set up tactical traps.

This is one of the deepest "drawn" endgames in chess. Karpov and Kasparov played it in the 1991 World Championship; even at that level it caused trouble.

**Two main defensive techniques:**

**1. Cochrane Defence:** the defender's rook attacks the attacker's bishop along a file or rank, pinning it indirectly against the king. As long as the rook can maintain the attack on the bishop, the bishop cannot maneuver freely to support its own king's invasion. This is the most active defence.

**2. Second-Rank Defence (Karpov's preference):** the defending king goes to the **long side** of the board — the side **not** the same color as the attacker's bishop. The defender's rook stays on the second rank (relative to its king), preventing the attacking king from advancing past that rank. The defending king parks on a square the bishop cannot attack, and the rook keeps the attacker's king out.

**Why is this hard for the attacker?**
- The bishop is great at long-range attacks but can only attack squares of one color.
- The defender's king parks on the opposite color (where the bishop can never check).
- To make progress, the attacker needs to **zugzwang** the defender — but the defender's rook has so many waiting moves that zugzwang is hard to engineer.
- The 50-move rule frequently catches attackers who don't know the technique.

**Attacking ideas (your role here):**
- Try to set up a position where the defending rook is overloaded: it must guard the bishop AND prevent king infiltration AND avoid tactics.
- Look for **rook sacrifices** that win the defending rook for the bishop after a forced sequence.
- Position your bishop on the **long diagonal** (a1-h8 or a8-h1) for maximum scope.
- Patience: improve your pieces gradually before forcing matters.

**Practical advice:** if you're the defender and reach this ending, **learn the second-rank defence cold**. If you're the attacker, you have winning chances against most opponents — but expect a fight.

This is a genuinely complex ending. The drill here is illustrative; full mastery requires its own study.`
  },
  {
    id: "knight-bishop-mate",
    title: "B+N Mate — The W-Maneuver",
    category: "complex",
    fen: "4k3/8/8/8/8/8/8/2BNK3 w - - 0 1",
    userColor: "w",
    goal: "Drive the king to the bishop's-color corner and mate (up to 33 moves).",
    engineDepth: 16,
    explanation: `**Bishop + Knight mate** is the only basic mate that requires real technique — many strong players have failed to deliver it under tournament time pressure. The lone king must be driven to a **specific corner**: the corner of the **same color as the bishop**. Wrong corner = no mate, only stalemate threats and the 50-move rule.

In this position the bishop is on c1 (a **dark square**). So mate must be delivered in a dark corner: **a1** or **h8**. If you accidentally drive the king to a1 (light corner) or h1 (dark — wait, h1 is light, a1 is dark, h8 is dark, a8 is light)... let me restate: dark corners are **a1** and **h8**. You must drive the lone king to one of these.

**Three phases:**

**Phase 1: Centralize and approach.** Bring all three pieces (king, bishop, knight) toward the lone king and force it toward an edge. This is the easy part — any edge will do. Use king + bishop + knight to box the king in.

**Phase 2: The W-Maneuver (if needed).** If the lone king ends up in the **wrong-color corner** (e.g., a8 or h1 in our case), you cannot mate there. You must drive it along the edge to the right corner. The technique uses the knight in a **W-shaped path** — think Nf6-e8-d6-b7-c5 type sequences — that gradually pushes the king along the edge without ever giving it room to escape back to the center. The bishop and king must coordinate to plug all the holes the W-maneuver leaves.

**Phase 3: Mate in the correct corner.** With the king finally in (say) a1 and your king on c1 or b3 with the knight controlling the escape: bishop delivers check on a long diagonal, knight covers the last square, king blocks any flight. Mate.

**Mnemonic tools:**
- **Deletang's triangles** — visualize the lone king corralled within shrinking triangles formed by your pieces.
- **The W-maneuver path** — the knight's specific zigzag along the 6th-7th rank area (or 2nd-3rd if mating in the bottom corners).

**Why so hard?**
- The knight has short range — bringing it to the right squares takes many moves.
- The bishop covers only one color — you must use the knight to cover the other color in critical squares.
- Stalemate is everywhere; one careless move and the lone king is stuck with no legal moves but not in check.
- The 50-move rule looms — if you take more than 50 moves without a capture or pawn move, the game is drawn even with the win in hand.

**Optimal play:** up to 33 moves required. Most amateur attempts take longer or fail. **This mate must be studied and practiced** — it's the only "easy material" mate that loses on the 50-move rule against a defender who knows to flee toward the wrong corner.

The engine will play perfect defence (fleeing to a8 or h1). Practice driving it back along the edge and finishing in a1 or h8.`
  }
];
