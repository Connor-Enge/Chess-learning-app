# Chess Thinking Frameworks: A Research Document

**Purpose:** Source material for "calculation" and "study skills" lessons in the Chess Academy app. The goal is to provide explicit, teachable thinking processes that improving players can apply move-by-move, not just abstract advice.

**Audience:** Lesson designers and curriculum writers. Each section translates into one or more lessons, drills, or interactive checklists.

---

## 1. Position Evaluation

Evaluation is the act of asking, "If neither side could move, who stands better and why?" Every plan, every candidate move, every calculation eventually terminates in an evaluation. A player who calculates ten moves deep but evaluates the resulting position incorrectly has wasted the calculation.

### Steinitz's Elements as an Evaluation Checklist

Wilhelm Steinitz, the first World Champion, formalized chess strategy by arguing that every position contains a definite truth that can be derived from a list of static elements. His framework — sometimes called the Steinitz elements or the elements of position — is the ancestor of every modern evaluation system.

A teachable version of the Steinitz checklist:

1. **Material** — count the pieces.
2. **King safety** — pawn shield, open files near the king, defenders nearby, attackers nearby.
3. **Piece activity** — are the minor pieces on good squares, are the rooks on open files, is the queen well-placed?
4. **Pawn structure** — doubled, isolated, backward, passed pawns; pawn chains and their direction.
5. **Space** — who controls more squares, especially in the center?
6. **Development and tempo** — are all pieces developed, who has the initiative?
7. **Weak squares and weak colour complexes** — outposts, holes, light/dark square weaknesses.
8. **The center** — open, closed, fixed, dynamic, or mobile.

Steinitz's deeper principle was that small advantages accumulate, and that the side with the advantage is obliged to attack — otherwise the advantage dissipates. This "obligation" idea is worth teaching directly, because beginners often hold a winning position passively until it slips away.

### The Five-Question Evaluation Framework

A simpler ladder for less experienced players, used by many modern coaches (Heisman, Silman variants):

1. **Material** — am I up, down, or even?
2. **King safety** — whose king is safer?
3. **Piece activity** — whose pieces are doing more?
4. **Pawn structure** — whose pawns are healthier?
5. **Space** — who controls more squares?

The answer is a list, not a number. "Material equal, my king slightly weaker because of the open b-file, pieces roughly equal, my pawns better because Black has doubled c-pawns, space roughly equal." From that list a verdict emerges: roughly balanced, slight edge to one side, clearly better, winning.

For lesson design, drill the five questions in fixed order until they become automatic. The order matters because the questions are roughly stable to dynamic — material is most permanent, space the most fluid.

### Static vs Dynamic Evaluation

Static evaluation looks at the position frozen in time — pawn structure, weak squares, material, long-term king safety. Dynamic evaluation considers what is about to happen — threats, tactics, initiative, tempo, in-progress attacks.

Many positions are static disasters but dynamically fine, or vice versa. A piece sacrifice for a winning attack looks materially terrible (static) but is winning (dynamic). A bishop on a great diagonal looks great (static) until you notice it cannot defend the back rank in two moves (dynamic).

The teachable rule: when there are forcing moves on the board, dynamics dominate. When the position is quiet, statics dominate. A reasonable mental check is, "Is anything forcing? If yes, calculate. If no, evaluate statically and plan."

### Quantifying Advantages: The +/- System

Informant-style evaluation symbols are still useful as a shared vocabulary:

- `=` equal
- `+/=` slight edge for White (a comfortable game, no clear plan to convert)
- `=/+` slight edge for Black
- `+/-` clear advantage (a win is plausible with accurate play)
- `-/+` clear advantage for Black
- `+-` decisive advantage for White (winning with normal technique)
- `-+` decisive advantage for Black
- `unclear` complications neither side can fully evaluate

A single small edge is rarely enough to win at any level. Steinitz's accumulation principle says the better side trades small advantages for larger ones — a space edge becomes a piece on a strong square, becomes a kingside attack, becomes material. Teach this as a sequence, not a state.

### The "What Side Am I On?" Mental Check

A cognitive trap: when evaluating, players unconsciously favor their own side. The fix is to evaluate as if you were a neutral commentator, then ask, "Would my evaluation change if I switched sides on the board?" If yes, you were biased.

A second version: imagine a strong friend is playing your position. Would you be jealous of their position, neutral, or relieved you weren't them? The honest answer is the evaluation.

### Engine Eval Interpretation

Engines output evaluations in pawn units (or centipawns). What the numbers actually mean in human terms:

- **0.00 to +/- 0.30** — dead equal. No human can convert this against equal opposition.
- **+/- 0.30 to 0.80** — a comfortable edge. A grandmaster might convert against a peer perhaps 10-20% of the time; below master level, this often draws.
- **+/- 0.80 to 1.50** — a clear advantage. Conversion expected with accurate play, but mistakes are common.
- **+/- 1.50 to 3.00** — winning advantage. The side ahead should win against equal opposition; only blunders give it back.
- **+/- 3.00 and above** — decisive. Material or king safety has cracked.
- **Mate scores (M-in-N)** — a forced mate exists, regardless of material.

Two important caveats. First, engine evaluations assume best play by both sides for the engine's full search depth. Below that depth the position may be very different. Second, the human practical evaluation is not the same as the engine number — a +0.5 position that requires twenty only-moves is harder to play than a +1.0 position with simple plans.

For students, the lesson is: trust the engine on tactics, treat it as one strong opinion on strategy, and never substitute its number for your own evaluation skill.

---

## 2. Candidate Move Selection

You cannot calculate every move. The skill of choosing which moves to even consider — candidate moves — is what makes calculation practical. Most blunders happen because a player calculated the wrong moves, not because they calculated badly.

### Kotov's Tree of Analysis

Alexander Kotov, in *Think Like a Grandmaster* (1971), gave the most influential treatment of calculation. His core image is the tree: at the current position, identify candidate moves (the trunks), calculate each one to its conclusion, and pick the best.

Kotov's discipline was strict:

- Identify all candidate moves before calculating any of them.
- Calculate each branch once and only once.
- Do not revisit branches mid-calculation.
- At the end, compare evaluations and choose.

In practice, no human follows this perfectly — even Kotov admitted later that he revisited branches. But the discipline is the point. Players who do not enforce a tree drift between branches, recalculate the same line three times, miss obvious candidates, and run out of time.

### The Candidate Moves Method: Generate Before Calculating

The single most important habit: separate generating candidates from calculating them. When you skip the generation step, you calculate the first plausible move you see, and then either play it or panic. When you generate first, you compare alternatives.

A practical version:

1. Look at the position for 5-15 seconds without calculating anything.
2. Write down (or mentally list) 2-4 candidate moves.
3. Only then begin calculating.

Generating without calculating feels uncomfortable — the brain wants to commit. Train through it.

### How Many Candidates

For most positions, 2-4 candidates is right. Fewer than two means you have committed too early. More than four usually means you are listing weak moves to feel thorough.

In sharp tactical positions, the candidate set is often smaller (1-3 forcing moves dominate). In positional positions, the set is often larger (3-5 plausible plans), but the calculation depth is shallower.

### Filtering by Position Type

Different position types call for different candidate filters:

- **Tactical / sharp positions** — list all forcing moves first: checks, captures, threats. If a forcing line works, calculate it carefully and play it.
- **Positional / quiet positions** — ask, "What is my worst piece, and how do I improve it?" The candidate moves are usually moves that activate a passive piece, occupy a key square, or improve pawn structure.
- **Defensive positions** — ask, "What is my opponent's threat? Which of my candidate moves stops it?"
- **Endgames** — ask, "What is the plan?" Candidate moves serve the plan (king activation, passed pawn promotion, fortress construction).

The mistake is using the wrong filter — searching for tactics in a quiet position wastes time, while searching for the best square for the knight when your king is being mated is a disaster.

### Forcing Moves First: CCT

The most teachable single rule in chess calculation: every move, look at every check, every capture, and every threat — for both sides — before considering anything else.

CCT is teachable because it is mechanical. There are usually only a handful of checks, captures, and threats in any position, and the player can list them exhaustively. It catches the vast majority of one-move tactics and most short tactics. When applied to the opponent's options, it catches most blunders.

A good drill: stop a student in any position and ask them to list every check and every capture for both sides. If they miss any, they need more practice with this single skill.

### What Does My Opponent Want?

Aron Nimzowitsch's phrase "the threat is stronger than the execution" and John Watson's modern restatement in *Secrets of Modern Chess Strategy* both point at the same thing: every move you make should account for what your opponent is trying to do. Ignoring the opponent is the most common cause of strategic disaster.

The teachable question, asked before every move: "If it were my opponent's turn right now, what would they play? What is their best move, plan, or threat?" Then choose a candidate move that addresses it (or accepts and out-races it).

This question, asked consistently, is the single biggest lever in moving from intermediate to advanced. Most amateurs play their own plan and notice the opponent's plan only when it lands.

---

## 3. Calculation Technique

Calculation is the process of moving the pieces in your head, evaluating the resulting positions, and choosing the line that gives you the best outcome. It is a learnable skill, but the bottleneck for most players is technique, not raw visualization.

### Calculating in Lines

The basic discipline: pick one candidate, calculate the entire line to a stable position, evaluate it, then move on to the next candidate. Do not jump branches.

Players who jump branches end up with a confused picture: they remember evaluating "a line where I sacrificed the knight and it was good," but cannot reconstruct what move order led there. They double-count tempi, forget which side moved last, and miscalculate the final position.

A useful image is the diver: take a breath at the surface (the current position), descend through one line to the seabed (the final position), evaluate, and surface. Then take another breath and descend through the next line. The breath at the surface — coming back to the actual position before starting the next branch — is the discipline that prevents confusion.

### Visualizing the End of the Line

The hardest part of calculation is not moving the pieces in your head — it is seeing the final position clearly enough to evaluate it. Many players calculate accurately but evaluate wrongly because the final position is fuzzy: they have forgotten which pawn is on which square, where the kings are, which piece defends what.

Drills that build this skill: blindfold puzzles, calculating lines and then setting up the final position on a board to check, and the "last position" exercise — calculate a forcing sequence, then verbally describe the final position before evaluating.

### Avoiding "Blunder Check" Tunnel Vision

A specific failure mode: the player decides on a move, then runs through a "blunder check" so quickly that they miss exactly the threat the move creates. The check becomes a ritual rather than a process.

The fix is to slow down the blunder check and make it specific. Not "is this move safe?" but "after I play Bxf6, my queen is no longer defending d4, and Black plays Nxd4 — does that work?"

### The "Look One More Move" Rule

After calculating a line and reaching what looks like a good evaluation, look one move deeper. The opponent's surprising next move is the most common refutation of human calculation. The line that looked winning ends with a quiet zwischenzug or a hidden tactic that flips the evaluation.

This rule is the single most efficient calculation upgrade for intermediate players. The "extra move" is cheap to compute and catches a large class of errors.

### The Quiet Move Check at the End of Forcing Sequences

Forcing sequences feel safe — every move is a check or a capture, the opponent's responses are forced, the evaluation is clear. Then the sequence ends, the opponent has a quiet move, and the position is suddenly losing because the quiet move attacks two pieces or threatens mate.

After every forcing sequence, before stamping the line as won/lost/equal, ask: "What is my opponent's best quiet move now?" Often a simple developing move, a defensive consolidation, or a counter-threat changes the evaluation entirely.

### Forced Sequences vs Probabilistic Positions

Two different calculation modes:

- **Forced sequences** — every move is a check, capture, or only-defense. The line is deterministic. Calculation can be deep and confident.
- **Probabilistic positions** — the opponent has multiple plausible responses. Calculation must consider several branches at each opponent move, depth shrinks rapidly, and intuition does more of the work.

Players often try to calculate probabilistic positions like forced sequences, calculating one branch deeply and assuming the opponent will cooperate. The correct technique is to calculate to the point where the position becomes evaluable, then trust your evaluation.

### Calculation Depth: When to Stop

Stop calculating when one of the following is true:

- The position has stabilized (no immediate forcing moves remain) and you can evaluate it.
- The evaluation is clear (clearly winning, clearly losing, clearly equal).
- A repetition has occurred (you can claim or avoid the draw).
- You have hit a position you have already evaluated in a parallel line.
- The depth of calculation has exceeded your reliable visualization.

The last point matters: pushing past your reliable depth introduces errors that compound. A player who can reliably visualize five moves should usually stop at five moves and trust their evaluation, rather than guess at moves six and seven.

### Aagaard's Calculation Approach

Jacob Aagaard, in his *Grandmaster Preparation: Calculation* (2012) — arguably the most important modern book on calculation — organizes calculation around four kinds of moves that players systematically miss:

1. **Candidate moves** — the basic discipline of generating alternatives.
2. **Branches** — recognizing where the opponent has multiple plausible responses, and calculating each.
3. **Retreating moves** — players notice forward moves naturally; backward moves and sideways moves require deliberate search. Many tactics depend on quiet retreats.
4. **Prophylactic moves** — moves that prevent the opponent's plan rather than execute your own. Often the strongest move in quiet positions.

Aagaard's drill: in any position, force yourself to specifically search for retreats and prophylactic moves before deciding. The improvement is immediate and large.

### Comparing Variations

A subtle technique: when comparing two lines that both look good, do not just compare the final evaluations. Compare the intermediate positions. Often line A reaches a +1.0 final position but the intermediate moves require precision; line B reaches a +0.7 final position via simple, robust moves. Line B is the better practical choice.

This is especially important under time pressure and at the amateur level, where the "objectively best" move often loses because the path is too narrow.

---

## 4. Blunder Check

A blunder is a move that gives away material or position for nothing in return. Most blunders are not calculation failures — they are check-skipping failures. The player did not look.

### The Pre-Move Sanity Check

Before releasing the piece (or in online play, before clicking confirm), run the sanity check:

1. Is my move safe — does any opponent piece attack the square I am moving to, with no defender?
2. Am I leaving anything en prise — does my move uncover an attack on one of my own pieces?
3. Does my move walk into a tactic — fork, pin, skewer, discovered attack?
4. Is there a tactical refutation I missed — a check, capture, or threat that breaks my plan?

The check is short. Once trained, it takes 5-10 seconds. The cost of skipping it is usually losing the game.

### The Single Best Question

If you can only ask one blunder-check question, ask: **"After I make this move, does my opponent have a check, capture, or threat that wins?"**

This catches almost every one-move blunder and most two-move tactics. The question is mechanical, exhaustive in small positions, and requires no judgment.

### The "Sit on Your Hands" Rule

Attributed to multiple coaches (most famously Cecil Purdy, and frequently restated by Dan Heisman): when you have decided on your move, do not play it immediately. Sit on your hands, count to three, and look at the position once more. The number of blunders prevented by this single habit is enormous.

In online play, the equivalent is the pre-move pause: do not click the move until you have run the sanity check. The pause must be deliberate and trained, because the platform makes instant moves easy.

### Why Most Blunders Are Simple

Studying your own blundered games quickly reveals a pattern: most blunders are not deep tactics. They are:

- **Back-rank weaknesses** — the king behind three pawns with no luft.
- **Hanging pieces** — a piece on a square attacked by the opponent and not defended.
- **Undefended pieces ("loose pieces drop off")** — John Nunn's LPDO. Even pieces not currently attacked can become tactical targets if undefended.
- **Removing a defender** — making a move that stops defending another piece.
- **Overworked defenders** — one piece defending two things, both then attacked.
- **Pinned pieces** — moving the pinned piece's defender, or treating a pinned piece as a real defender.

The teachable lesson: most "tactics" you suffer in your own games are not clever — they exploit one of these six mistakes. Train recognition of all six until they are automatic.

---

## 5. Time Management

Time on the clock is a resource. Most amateur losses in long games come from misallocating it: thinking too long on simple moves, then having no time for the critical decisions.

### Allocating Time Across the Game

A working model:

- **Opening** — fast, ideally 1-2 minutes per move if it is preparation, longer only if you are out of book.
- **Early middlegame** — moderate, building a plan.
- **Critical middlegame moments** — long, careful thinks (3-15 minutes per move depending on time control).
- **Technique-conversion endgame** — quicker, trusting general principles.
- **Critical endgame moments** — long, careful (king-and-pawn, opposition, zugzwang).

The error to avoid: spending opening time deeply, running out of clock by the middlegame.

### The 20% / 60% / 20% Rule

A rough heuristic for classical chess: spend 20% of your time on the opening, 60% on the middlegame, and 20% on the endgame. The middlegame is where the game is usually decided and where calculation pays off most.

This is a guideline, not a law. Some games end in the opening, some in technical endgames, some in time scrambles. But if you are routinely spending 50% of your clock on the opening, you are misallocating.

### When to Spend Long Thinks

Critical moments deserve long thinks. They are recognizable:

- **Pawn structure changes** — every pawn move is permanent, and every pawn break reshapes the position.
- **Trades that change the character of the position** — exchanging queens, swapping into an endgame, trading off attackers or defenders.
- **First moves out of preparation** — the moment when memory ends and chess begins.
- **Opportunities to attack** — when you sense an attack is on, but the move order matters.
- **Critical defensive moments** — when you sense the opponent's attack is coming.
- **Forced sequences with multiple branches** — when calculation accuracy matters.

A useful rule: when the position changes character, slow down. When it does not, play at normal speed.

### When to Play Fast

Fast play is correct in many positions:

- **Theoretical opening moves** you have prepared.
- **Forced recaptures** with only one reasonable square.
- **Obvious developing moves** in the opening.
- **Only-moves** that have a single sensible response.
- **Endgame technique moves** following a known plan.

Playing fast in these positions banks time for the critical moments. Spending five minutes on a forced recapture is a waste; spending five minutes on a positional decision before a pawn break is an investment.

### Avoiding Time Trouble: The 5-Minute Rule

A practical rule of thumb: if you have less than five minutes left and the game is not nearly over, you are in time trouble and should switch into time-trouble mode — quicker decisions, more reliance on intuition, fewer deep calculations, more pre-moves on forced responses.

The fix is upstream: notice when you are spending long on non-critical moves and recalibrate. Check the clock every five moves to stay aware.

### Increment Management

In increment time controls (e.g., 15+10), the increment is your friend. As long as you can play a move in less than the increment, your clock is not shrinking. In long time scrambles, the discipline is to play any reasonable move within the increment, banking time for the next critical decision.

Players new to increment often forget it exists and panic-flag with three minutes still on the clock. Train the awareness: in a 15+10 game, every move adds ten seconds, and ten seconds is enough for many positions.

### Practical Tips for Online Play

- **Never play moves on the first second.** The pre-move-pause rule applies online too.
- **Use pre-moves cautiously.** Pre-moves are fine for forced recaptures; they are catastrophic when the opponent has a zwischenzug.
- **Set a per-game time control you can take seriously.** Bullet and 1+0 are not learning formats.
- **Watch the clock, not the eval.** Your opponent's time matters too — under time pressure they will play worse, and you can rely on it.
- **Disable distractions.** Many online losses are not chess losses but attention losses.

---

## 6. Practical Decision Making

Beyond pure calculation and evaluation, every game requires practical judgment: when to think, when to play, when to take risks, when to consolidate.

### The 80/20 Rule

A "good enough" move played quickly is often better than a "perfect" move played slowly. Twenty percent of the thought generates eighty percent of the move quality. Past that point, marginal improvements in move quality cost time that you will need later.

The rule is not "play fast always." It is "recognize when you have a clearly reasonable move, do not agonize, and bank the time." Spending fifteen minutes finding the move that is 0.1 better than the obvious move usually loses you the game on the clock.

### When to Play for a Win vs a Draw

Tournament situations and rating differences change the right strategy:

- **Higher-rated opponent, must-win game** — seek complications, sharp positions, asymmetric pawn structures, opposite-side castling. The favorite gains by simplification; the underdog gains by chaos.
- **Lower-rated opponent, must-win game** — the opposite. Prefer safe, simple positions where your superior endgame technique shows.
- **Draw is an acceptable result** — prefer balanced positions, avoid unnecessary risk, accept repetitions.
- **Must-win, must-not-lose** — a difficult balance; usually means picking solid openings with mid-game flexibility.

The mistake is taking sharp risks when a draw is fine, or playing for a draw when only a win helps you in the standings.

### Risk Management with the Clock

Time is a form of risk. With twenty minutes versus your opponent's two minutes, you can afford complications they cannot navigate. With two minutes versus their twenty, simplify.

A general principle: the side with more time should keep the position complex; the side with less time should simplify. This applies even when the simplifying side is objectively worse — they are trading position for time.

### Trusting Intuition vs Verifying

Intuition is pattern recognition built from study and experience. For trained players, the first move that comes to mind is often correct or nearly so. The question is when to trust it and when to verify.

A working rule:

- **Quiet positions** — trust intuition, verify only that there is no obvious tactic.
- **Familiar positions** — trust intuition, especially in known structures.
- **Forcing positions** — verify with calculation; intuition is much less reliable in concrete tactics.
- **Critical moments** — verify, even if intuition is loud. The cost of being wrong is high.
- **Time pressure** — trust intuition; you have no choice.

Intuition that is never verified does not improve. Verification that ignores intuition wastes time. The skill is the calibration.

---

## 7. Studying Method

Improvement comes from study, not just play. The studying methods below are arranged from highest leverage (game review and master games) to lower leverage (opening memorization).

### How to Study a Master Game

The classical method, sometimes called the "guess-the-move" method:

1. Set up the game on a board (physical or digital).
2. Play through the opening at normal speed.
3. From the first middlegame move (or wherever the position becomes complex), cover the next move with a card or hand.
4. Look at the position and predict the move.
5. Reveal the actual move. If you matched, continue. If not, try to understand why the master's move is better.
6. Repeat until the end of the game.

The key is to take this seriously — predict honestly, then think about discrepancies. Studying a master game in five minutes by clicking through is entertainment; this method takes 30-60 minutes per game and produces real improvement.

### Solving Puzzles: Pattern Recognition vs Calculation

Two distinct kinds of puzzle work:

- **Pattern recognition** — many puzzles, solved at moderate speed, focused on tactical themes (forks, pins, discovered attacks, back-rank). Builds the library of patterns your intuition will draw on.
- **Calculation training** — fewer puzzles, harder, solved slowly without moving the pieces, written down (or verbalized) before checking. Builds the calculation skill itself.

Both are necessary. Pattern recognition without calculation gives you instinct without verification. Calculation without patterns gives you slow, deep, but unimaginative play.

A reasonable mix for most improving players: 80% pattern recognition (daily, fast, easy-to-medium puzzles) and 20% calculation training (occasional, hard, slow puzzles).

### Building a Repertoire: Depth vs Breadth

A practical opening repertoire should be:

- **One main response to 1.e4 as Black.**
- **One main response to 1.d4 as Black.**
- **Plans against the less common first moves** (1.c4, 1.Nf3, etc.) — usually transposing to your main systems where possible.
- **One main opening as White** (1.e4 or 1.d4 or a flank opening), with answers to all common Black responses.

Depth before breadth. It is far better to know one defense to 1.e4 well than to dabble in three. Players who switch openings frequently never accumulate the pattern library that comes from playing the same structures hundreds of times.

### Memorization vs Understanding in Openings

Memorization without understanding fails the moment the opponent deviates. Understanding without memorization wastes time recalculating known theory.

The right balance: memorize the main lines to the depth where you can play sensibly without help (typically 8-15 moves in main-line openings, less in obscure systems), and understand the resulting middlegame structures, plans, and typical tactics. The structures matter more than the moves.

A test of repertoire understanding: can you explain in words why each opening move is played, what the main pawn structure is, what each side is trying to achieve, and what the typical middlegame plans are? If yes, you understand the opening. If you can only recite moves, you have memorized.

### Endgame Study Priorities

Endgames to know cold:

1. **King and pawn vs king** — opposition, key squares, the rule of the square. Every chess player must know this perfectly.
2. **Lucena and Philidor positions** — the basic rook endgames.
3. **Rook vs pawn** — when the king can stop, when the rook can.
4. **King and queen vs king** — basic mating technique.
5. **King and rook vs king** — basic mating technique.
6. **Two bishops vs king** — useful, occasionally arises.
7. **Knight and bishop vs king** — known to be hard, occasionally arises; many strong players do not know this and lose half points.

Beyond these basics, the priority is understanding common middlegame-to-endgame transitions: minor piece endgames, opposite-coloured bishops (the drawing tendency), same-coloured bishops, knight versus bishop in different structures, and rook endgames generally.

### Game Review: Tactical vs Strategic Errors

Reviewing your own games is the highest-leverage study activity, because the errors are yours. The key distinction is between tactical mistakes (you missed a check, a fork, a hanging piece) and strategic errors (you played the wrong plan, weakened a square, traded the wrong piece).

A useful review process:

1. Replay the game and write your own thoughts move-by-move, before consulting any engine.
2. Identify the moments you are unsure about.
3. Run the engine and note where it disagrees with you.
4. For each disagreement, classify it: tactical mistake, strategic error, or "engine sees deeper, I cannot follow it" (these are less useful for improvement).
5. Pick 1-3 errors per game to learn from. Revisit the resulting positions later.

Most players review games passively — clicking through the engine line. Active review, with your own annotations first, is much more effective.

### The Botvinnik Method

Mikhail Botvinnik, the longtime World Champion, was famous for his self-improvement method. He annotated his own tournament games in detail, analyzed them, and then published the analyses for review and criticism by other strong players.

The takeaways for a modern improver:

1. **Annotate your own games before the engine.** Write what you were thinking, why you played each move, where you were uncertain.
2. **Then check with the engine.** The discrepancies between your annotations and the engine reveal exactly what you are missing.
3. **Make the analysis public** (a coach, a study partner, a review group). The discipline of presenting your analysis for criticism forces depth.

The Botvinnik method is slower than passive engine review, but it builds the analytical muscles that lead to lasting improvement. Engine-only review tells you what was wrong; Botvinnik-style review tells you why your thinking process was wrong.

---

## 8. Psychological Aspects

Chess is a competition between brains under stress. Above the basics, psychological factors decide many games.

### Playing the Position, Not the Opponent (Mostly)

The default mode is to evaluate the position objectively and play the best move. Most of the time, this is correct.

The exceptions are:

- **Time pressure** — your opponent in time trouble plays the position worse than they otherwise would. Complicate.
- **Style mismatches** — a tactical opponent in a quiet position is uncomfortable; a positional opponent in a sharp position is uncomfortable. If you can choose the structure, choose against their preference.
- **Must-win situations** — see "When to Play for a Win vs a Draw" above.

Beware of overcorrecting. Trying to "out-think" your opponent by playing objectively bad moves to confuse them usually backfires. Play good moves, with awareness of how your opponent handles different positions.

### Recovering from a Blunder

After a blunder, two failure modes are common:

- **Tilt** — the player loses emotional control, plays quickly and weakly, loses the rest of the game in a few more moves.
- **Demoralized resignation** — the player gives up internally, even if the position is still defensible.

The recovery technique:

1. Acknowledge the blunder. It happened. Do not pretend otherwise.
2. Re-evaluate the position from scratch, as if you had just sat down. Material is what it is; the question is whether the position is defensible.
3. If the position is lost, set up a defense — make every move difficult for your opponent, force them to find the win.
4. Many "lost" positions are saved by opponent error. Stay alert.

The mental skill is separating the regret about the previous move from the practical task of the current move.

### Pressure of Higher-Rated Opponents

Amateur players often play below their level against stronger opponents and above their level against weaker opponents — the rating field becomes self-fulfilling.

The mental fix is to play the position, not the rating. The pieces do not know the rating. Stronger opponents do make mistakes, and many tournament upsets happen because the underdog played their normal game while the favorite played for an easy win.

A practical version: cover the opponent's name and rating during the game if your platform allows. Many players report measurable improvement from this.

### Premature Simplification

A specific failure mode in winning positions: the better side trades pieces to "simplify the win," but the trade actually gives away the advantage.

The principle: trades favor the side with the simpler task. Trading queens when you are up material usually helps. Trading queens when your advantage is an attack hurts. Trading minor pieces when you have the better structure usually helps. Trading minor pieces when your advantage is piece activity hurts.

Before any trade in a winning position, ask: "What is the basis of my advantage, and does this trade preserve it or trade it away?"

### The "Long Sit"

At critical moments, the right thing to do is take your time — sometimes 10, 20, even 30 minutes on a single move in a long classical game. The "long sit" is uncomfortable; clocks are ticking, the opponent is watching, the urge to move is strong.

The discipline is recognizing the moment as critical and giving it the time it deserves. The few critical moves in a game are worth far more than all the routine moves combined. A long sit on the right move can decide the game.

The opposite mistake — a long sit on a non-critical move — wastes time and produces no better decision. The skill is recognizing which moves are critical.

---

## 9. Common Cognitive Biases

Chess is a domain where general human cognitive biases produce specific, costly errors. Knowing the biases makes them easier to spot in your own play.

### Confirmation Bias in Calculation

The bias: you find a line that wins, you confirm it works, you play it. You do not search hard for the refutation.

In calculation, this manifests as searching only for moves that support your plan, calculating only the variations where the opponent cooperates, and stopping the calculation when you reach a position you wanted to reach.

The fix: explicitly look for the opponent's best response, not just any response. After finding a line that works, deliberately try to refute it. The discipline is uncomfortable but catches many oversights.

### First-Move Syndrome

The bias: you see a move, it looks good, you play it. You did not consider alternatives.

Kotov's tree of analysis is the answer. Generate at least two candidates before committing to any. The first move that comes to mind is often good; sometimes a slightly better move was one position away.

### Loss Aversion

The bias: you are slightly better, you have a sharp option that improves your position significantly, but you avoid it because of the small risk that it backfires.

In chess, loss aversion makes players play passively in winning positions, decline tactical complications they can handle, and trade down too early. The result is that "winning" positions often draw because the better side never tries to convert.

The fix is to evaluate the move on its objective merits, separately from the emotional weight of "what if I lose my advantage." If the move is good, play it.

### Sunk Cost in Plans

The bias: you started a plan ten moves ago. The plan is now bad. You continue because you have invested in it.

In chess, this looks like pushing a kingside attack that has run out of pieces, doubling on a file that the opponent has now defended, or pursuing an exchange sacrifice that no longer works. The position has changed; the plan should change with it.

Re-evaluate every few moves and ask, "If I were just sitting down at this position, would I still pursue this plan?"

### Trusting the Engine Too Much vs Ignoring It

Two opposite biases. Some players defer entirely to the engine — every move is "the engine says X" and they no longer evaluate themselves. Others ignore the engine because its lines are inhuman and they cannot follow them.

The right use: the engine is a fact-checker for tactics and a strong opinion on strategy. Your own evaluation is the lesson; the engine confirms or challenges it. If you are right, you have learned that you can trust your evaluation in this kind of position. If the engine disagrees, you investigate why.

A useful discipline: always make your own evaluation before turning on the engine. The discrepancies are the learning.

### Anchoring on the Last Move

The bias: your evaluation of a position depends heavily on which move was just played, rather than the position itself.

A position reached by a flashy sacrifice "feels" winning, even if the evaluation is balanced. A position reached by a quiet move "feels" boring, even if it is winning. The fix is to evaluate the position from a clean look, not from the move that produced it.

---

## 10. Playing Practice

Improvement requires playing games as well as studying. The right kind of game matters.

### Slow Games for Improvement (15+10 Minimum)

For improvement, the time control needs to be long enough that calculation and evaluation can actually happen. The widely accepted minimum is **15+10** (fifteen minutes plus ten seconds increment), and longer is better. Classical 60+30 or 90+30 games are ideal.

Why: improvement comes from doing the right thinking process, recognizing mistakes after the game, and slowly building habits. None of this is possible in a five-minute game. The thinking process you train is the thinking process you keep.

### Why Blitz Isn't Great for Learning

Blitz is fun, social, and useful for warm-up. It is not a learning format. The reasons:

- **No time to apply the thinking process** — you cannot run the candidate-move method or the blunder check at three minutes per game.
- **Reinforces bad habits** — what works in blitz (move-quickly, trust-your-hand, hope-the-opponent-flags) is exactly what loses in classical chess.
- **Low signal in review** — blitz games are full of mutual mistakes, making it hard to identify systematic errors.
- **Tilt** — the high game-volume of blitz produces emotional volatility that compounds errors.

Blitz is fine for fun, fine for warm-up before a tournament, and fine for testing opening preparation at low stakes. For improvement, use longer time controls.

### Playing Stronger Opponents

The fastest way to improve is to play opponents who are better than you. They will punish your errors, force you to find the harder moves, and show you ideas you did not know existed.

The mental challenge is accepting that you will lose more games. The improvement is invisible in the short term and obvious in the long term. Players who play only opponents at or below their level plateau quickly.

A target rating differential: try to play opponents within 100-300 rating points above you. Much higher and the games are crushing; lower and the challenge is small.

### Annotating Your Games

Every serious game deserves an annotation. The annotation does not need to be long or formal — even three to five comments per game is enough to compound over a year of play.

What to annotate:

- **The opening transition** — where did your preparation end, and what move did you play instead? Was it good?
- **The first significant decision** — usually a structural decision around moves 10-20.
- **Critical moments** — where you took a long think, where you sensed danger, where you made the move you doubted.
- **The losing move** (if you lost) — what should you have played, what did you miss?
- **The winning move** (if you won) — what idea worked, can you reuse it?

Annotated games accumulate into a personal pattern library. Reviewing your own annotations a year later reveals exactly how much you have improved and exactly which kinds of mistakes you keep repeating.

---

## Closing Notes for Lesson Design

Several of these frameworks compose well into single lessons:

- **"How to think about a move"** — combine candidate moves, CCT, and the blunder check into one explicit thinking process.
- **"How to evaluate"** — combine the five-question framework, the "what side am I on?" check, and engine eval interpretation.
- **"How to calculate"** — combine Kotov's tree, the look-one-more-move rule, and the quiet-move check.
- **"How to study a game"** — combine the guess-the-move method and the Botvinnik method.
- **"How to manage time"** — combine the 20/60/20 rule, the critical moment heuristic, and the 5-minute warning.

The teachable thread across all sections is the same: chess thinking is a process, not a talent. Every framework here can be turned into a checklist, a drill, or an interactive exercise. The student's job is to internalize the process until it runs automatically; the lesson designer's job is to make the process explicit, repeatable, and small enough to learn.
