// Calculation track — thinking process and calculation technique.
// Eight lessons covering evaluation, candidate moves, CCT, blunder check,
// time management, visualization, forcing-line discipline, and the quiet move.
//
// Source: docs/research/frameworks.md (sections 1-5).
// Tone: practical, slightly opinionated. Concrete advice over abstract principle.
//
// All FENs and interactive solutions verified with chess.js v1.

export const LESSONS_CALCULATION = [

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-001-evaluation",
    title: "How to evaluate a chess position",
    track: "calculation",
    order: 1,
    estimatedMinutes: 12,
    objective: "Use the five-element framework to size up any position in under a minute.",
    tags: ["evaluation", "fundamentals", "calculation"],
    next: "calc-002-candidate-moves",
    content: [
      { type: "text", value: "Every plan, every candidate move, every calculation eventually ends in an **evaluation** — an answer to the question, *if neither side could move, who stands better and why?* Calculate ten moves deep but evaluate the resulting position wrong, and the calculation was wasted. So before you can calculate well, you have to evaluate well." },

      { type: "subheading", value: "The five-question scan" },
      { type: "text", value: "Run these five questions, **in this order**, every time you stop to think:\n\n- **Material** — am I up, down, or even?\n- **King safety** — whose king is safer?\n- **Piece activity** — whose pieces are doing more?\n- **Pawn structure** — whose pawns are healthier (doubled, isolated, backward, passed)?\n- **Space** — who controls more squares, especially in the center?\n\nThe order matters. The list runs from most stable (material) to most fluid (space), so you build the picture from the bedrock up." },

      { type: "text", value: "The output is a sentence, not a number: *\"Material equal, my king slightly weaker because of the open b-file, pieces about equal, my pawns better because Black has doubled c-pawns, space roughly equal.\"* From a sentence like that the verdict falls out: roughly balanced, slight edge, clearly better, winning." },

      { type: "board",
        fen: "r1bqr1k1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP1B1PPP/R2QR1K1 w - - 0 1",
        caption: "Run the five-question scan on this position. Material: equal. King safety: both castled, both safe. Activity: roughly equal — White's pieces eye the kingside, Black's are solidly placed. Pawn structure: Black has an isolated d-pawn (the IQP). Space: roughly equal. Verdict: about equal, with White's long-term play against the d5 pawn balancing Black's piece activity." },

      { type: "subheading", value: "What the +/- numbers actually mean" },
      { type: "text", value: "Engines give you a number. Translating it into human terms:\n\n- **±0.30 or less** — dead equal. No human converts this against equal opposition.\n- **±0.30 to 0.80** — comfortable edge. Often draws below master level.\n- **±0.80 to 1.50** — clear advantage. Should win with accurate play.\n- **±1.50 to 3.00** — winning. Only blunders give it back.\n- **±3.00 and above** — decisive. Material or king safety has cracked.\n- **Mate in N** — there's a forced mate, regardless of material.\n\nA single small edge is rarely enough to win at any level. Steinitz's rule is that small advantages **accumulate** — a space edge becomes a piece on a strong square, becomes a kingside attack, becomes material. Evaluation isn't a snapshot; it's the start of a sequence." },

      { type: "subheading", value: "The 'what side am I on?' check" },
      { type: "text", value: "Players unconsciously favor their own side when evaluating. The fix: pretend a strong friend is playing your position. Would you be jealous, neutral, or relieved? The honest answer is the real evaluation. If your verdict would change when you mentally swap colors, you were biased — start over." },

      { type: "interactive",
        fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5",
        prompt: "Run the five-question scan. Material equal, both developed, structure equal, space equal — the only asymmetry is king safety. Both kings are still in the center. Apply the evaluation to pick a move.",
        solution: "O-O",
        explanation: "King safety was the one element off-balance, so the move that addresses it wins the evaluation contest. Castle. The student who *only* counts material plays Nc3 or some other developing move and lets Black equalize king safety with a tempo." },
    ],
    quiz: [
      {
        question: "In what order should the five evaluation questions be asked?",
        options: [
          "Space, structure, activity, king safety, material",
          "Material, king safety, piece activity, pawn structure, space",
          "Whichever element is most striking in the position",
          "King safety first, then everything else at once",
        ],
        answer: 1,
        explanation: "Material → king safety → activity → pawn structure → space. The order runs from most stable (material is permanent) to most fluid (space changes every move). Building the picture from the bedrock up is what makes the scan reliable.",
      },
      {
        question: "Engine says +0.4. How should you interpret that practically?",
        options: [
          "I'm winning — convert with technique.",
          "Dead equal, basically a draw.",
          "A comfortable edge, but conversion is far from automatic; below master level this often draws.",
          "Resign.",
        ],
        answer: 2,
        explanation: "+0.4 is a small edge. A grandmaster might convert it 10-20% of the time against a peer; below master level it usually draws. Don't confuse a small engine edge with a winning position.",
      },
    ],
    further: [
      "Steinitz's accumulation principle: small advantages compound — convert space into squares into pieces into material.",
      "Silman, *How to Reassess Your Chess* — the modern long-form treatment of evaluation by element.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-002-candidate-moves",
    title: "Candidate moves: think like a grandmaster",
    track: "calculation",
    order: 2,
    estimatedMinutes: 14,
    objective: "Always generate 2-4 candidate moves before calculating any of them.",
    tags: ["candidate-moves", "calculation", "kotov"],
    next: "calc-003-cct",
    content: [
      { type: "text", value: "You cannot calculate every move. The skill of choosing which moves to even consider — **candidate moves** — is what makes calculation practical. Most blunders happen because a player calculated the *wrong* moves, not because they calculated badly." },

      { type: "subheading", value: "Kotov's tree" },
      { type: "text", value: "Alexander Kotov's *Think Like a Grandmaster* (1971) gave us the tree of analysis. The discipline:\n\n- Identify **all** candidate moves before calculating any of them.\n- Calculate each branch **once**, then move on.\n- Don't revisit branches mid-calculation.\n- At the end, compare the evaluations and pick.\n\nNo human follows this perfectly — even Kotov admitted he revisited branches. But the discipline matters. Players who don't enforce a tree drift between branches, recalculate the same line three times, miss obvious candidates, and run out of clock." },

      { type: "subheading", value: "Generate before you calculate" },
      { type: "text", value: "The single most important habit in calculation: **separate generating candidates from calculating them**. When you skip the generation step, you calculate the first plausible move you see, and then either play it or panic. When you generate first, you have alternatives to compare against.\n\nA practical version:\n\n1. Look at the position for 5-15 seconds **without calculating anything**.\n2. Mentally list 2-4 candidate moves.\n3. Only then begin calculating each in turn.\n\nGenerating-without-calculating feels uncomfortable — the brain wants to commit. Push through it." },

      { type: "subheading", value: "How many candidates" },
      { type: "text", value: "For most positions, **2-4 candidates is right**. Fewer than two means you've committed too early. More than four usually means you're listing weak moves to feel thorough.\n\n- **Sharp tactical positions** — the candidate set is often smaller (1-3 forcing moves dominate). Calculation is deeper.\n- **Quiet positional positions** — the set is often larger (3-5 plausible plans). Calculation is shallower; evaluation does the work." },

      { type: "subheading", value: "Filter by position type" },
      { type: "text", value: "Different positions call for different filters:\n\n- **Tactical / sharp** — list every forcing move first (checks, captures, threats). If a forcing line works, play it.\n- **Positional / quiet** — ask, *what is my worst piece, and how do I improve it?* Candidates are moves that activate a passive piece, occupy a key square, or improve structure.\n- **Defensive** — ask, *what is my opponent's threat?* Pick the candidate that stops it.\n- **Endgame** — ask, *what is the plan?* Candidates serve the plan (king activation, passed pawns, fortress).\n\nThe mistake is using the wrong filter. Searching for tactics in a quiet position wastes time. Searching for the best square for a knight when your king is being mated is a disaster." },

      { type: "board",
        fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 8",
        caption: "Quiet middlegame, both sides developed. Generate 2-4 candidates *before* calculating: **Bd3** (develop), **Bg5** (develop, pin), **cxd5** (clarify the center), **a3** (preparing b4). Then calculate each. The wrong habit is to see Bd3 and play it without considering the other three." },

      { type: "interactive",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4",
        prompt: "It's a quiet positional moment in the Italian. Three reasonable candidates: **Nc3** (develop), **O-O** (king safety), **c3** (preparing d4). Pick the candidate that improves the worst piece — the b1 knight has nowhere good to go later, so develop it now.",
        solution: "Nc3",
        explanation: "All three candidates are playable. Nc3 wins the comparison because the b1 knight is the piece that will be hardest to develop later — the c3 square is its best home, and you want to claim it before pawn structure dictates otherwise. The lesson isn't 'Nc3 is forced'; it's 'compare the candidates'." },
    ],
    quiz: [
      {
        question: "How many candidate moves should you generate in a typical position before calculating?",
        options: ["1 — pick the best and calculate deeply", "2-4", "5 or more, to be thorough", "It doesn't matter — calculate as you go"],
        answer: 1,
        explanation: "2-4 is the sweet spot. Fewer means you committed too early; more usually means you're padding the list with weak moves to feel thorough.",
      },
      {
        question: "In a sharp tactical position, what filter should you apply to generate candidates?",
        options: [
          "List every forcing move (check, capture, threat) for both sides first.",
          "Find the move that improves your worst piece.",
          "Look for the move that prevents your opponent's plan.",
          "Play whichever move 'feels right'.",
        ],
        answer: 0,
        explanation: "Sharp positions are decided by tactics. Forcing moves (CCT) come first. Positional questions like 'worst piece' apply to quiet positions, not tactical ones.",
      },
      {
        question: "What's the cost of skipping the 'generate first' step?",
        options: [
          "Nothing — strong players intuit the best move.",
          "You calculate the first plausible move you see, with no alternative to compare against.",
          "You think too much.",
          "You'll be in time trouble.",
        ],
        answer: 1,
        explanation: "Without alternatives you can't compare. The first move that comes to mind is often good, but a slightly better move is frequently one position away. Generating creates the contrast that makes the choice meaningful.",
      },
    ],
    further: [
      "Kotov, *Think Like a Grandmaster* — the original tree of analysis.",
      "Aagaard, *Grandmaster Preparation: Calculation* — modern reframing of Kotov's ideas.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-003-cct",
    title: "CCT: Checks, Captures, Threats",
    track: "calculation",
    order: 3,
    estimatedMinutes: 11,
    objective: "Look at every check, every capture, and every threat — for both sides — before considering anything else.",
    tags: ["cct", "forcing-moves", "tactics", "calculation"],
    next: "calc-004-blunder-check",
    content: [
      { type: "text", value: "If you remember nothing else from this track, remember **CCT**: every move, look at every **C**heck, every **C**apture, and every **T**hreat — for **both sides** — before considering anything else.\n\nIt's the most teachable rule in chess calculation, because it's mechanical. There are usually only a handful of checks, captures, and threats in any position, and you can list them exhaustively in 30 seconds. Done consistently, CCT catches the vast majority of one-move tactics and most short tactics. Applied to your *opponent's* options, it catches most of your blunders." },

      { type: "subheading", value: "Why forcing moves first" },
      { type: "text", value: "Forcing moves are calculable. Quiet moves are estimable. When the opponent has only one legal response (a check, a recapture), the line is deterministic — you can see the end. When the opponent has six plausible responses, calculation grinds to a halt.\n\nSo you start with what's calculable. If a forcing line wins, calculate it carefully and play it. If no forcing line works, you've still proved a useful negative result — there's no immediate tactic, and you can shift to positional thinking with confidence." },

      { type: "subheading", value: "The drill" },
      { type: "text", value: "Stop in any position and force yourself to list — out loud or on paper — every check and every capture for both sides. If you miss any, you need more reps with this single skill. It sounds easy and it's not, especially under clock pressure." },

      { type: "board",
        fen: "r1bq1rk1/ppp2ppp/2n2n2/3p4/1b1P4/2N1PN2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        caption: "Sample position. Run CCT for White: checks (none — no piece can give check); captures (Nxd5, only — bishop and other pieces have no targets); threats (Nxd5 wins a pawn if Black recaptures wrong; a3 threatens to trap the bishop on b4). Most positions have only a handful of forcing moves, and listing them takes seconds." },

      { type: "interactive",
        fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
        prompt: "Run CCT for White. The check on the back rank is mate — Black's king has no escape because the f7/g7/h7 pawns block the second rank.",
        solution: "Rd8#",
        explanation: "The back-rank pattern is the most common tactical motif in chess. Anyone running CCT spots Rd8 instantly because it's the only check available. Players who think positionally first ('I should improve my rook…') waste a clock turn looking at quiet rook moves. CCT first." },

      { type: "subheading", value: "What does my opponent want?" },
      { type: "text", value: "The flip side of CCT is asking, *if it were my opponent's turn right now, what would they play?* List **their** checks, captures, and threats too. This single question — asked consistently — is the biggest lever for moving from intermediate to advanced. Most amateurs play their own plan and notice the opponent's plan only when it lands." },

      { type: "interactive",
        fen: "4r1k1/4q1pp/8/8/8/8/6PP/4R1K1 w - - 0 1",
        prompt: "CCT scan for White. The capture Rxe7 wins the queen for a rook — Black's recapture Rxe1+ trades rooks, leaving White up a queen for two rooks (roughly +1).",
        solution: "Rxe7",
        explanation: "Rxe7 is the only capture available, and it's winning. CCT finds it without any positional reasoning — it's just *which captures exist?* The student who skips CCT and tries to think positionally about rook activation may never look at the e-file capture." },
    ],
    quiz: [
      {
        question: "What does CCT stand for?",
        options: ["Center, Coordination, Tempo", "Checks, Captures, Threats", "Calculate, Compare, Tap (the clock)", "Castle, Connect rooks, Trade"],
        answer: 1,
        explanation: "Checks, Captures, Threats — the three forcing-move categories you scan every move, for both sides.",
      },
      {
        question: "Why look at forcing moves first?",
        options: [
          "They're more aggressive and aggression wins.",
          "They're calculable — the opponent's response is forced or limited, so you can see the end of the line.",
          "Strong players play forcing moves.",
          "It saves time on the clock.",
        ],
        answer: 1,
        explanation: "Forcing moves limit the opponent's choices, which limits the branching of the calculation tree. Quiet moves leave the opponent with many replies, which makes them harder to calculate to a definite end. So you start where calculation is reliable.",
      },
      {
        question: "How does CCT apply to your opponent's moves?",
        options: [
          "It doesn't — only worry about your own moves.",
          "Ask 'if it were their turn now, what's their best check, capture, or threat?' to spot threats against you.",
          "Apply CCT only when defending.",
          "Look only at their captures, never their threats.",
        ],
        answer: 1,
        explanation: "The opponent's-turn version of CCT catches most of your own blunders. A move that looks safe usually fails to a check, capture, or threat you didn't bother to look at.",
      },
    ],
    further: [
      "Heisman, *A Guide to Chess Improvement* — popularized 'real chess' (CCT every move) for amateurs.",
      "John Nunn's 'LPDO' (loose pieces drop off) — the natural companion to CCT for blunder spotting.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-004-blunder-check",
    title: "Blunder check: the move you make before you make a move",
    track: "calculation",
    order: 4,
    estimatedMinutes: 11,
    objective: "Run a 5-second sanity check on every move before you commit to it.",
    tags: ["blunder-check", "calculation", "fundamentals"],
    next: "calc-005-time-management",
    content: [
      { type: "text", value: "A blunder is a move that gives away material or position for nothing. **Most blunders are not calculation failures — they are check-skipping failures.** The player didn't look. The cost of the check is five seconds; the cost of skipping it is usually the game." },

      { type: "subheading", value: "The pre-move sanity check" },
      { type: "text", value: "Before releasing the piece (or before clicking confirm online), run this:\n\n1. **Is my move safe?** Does any opponent piece attack my landing square with no defender of mine?\n2. **Am I leaving anything en prise?** Does my move uncover an attack on one of my own pieces — pinned defender, removed defender, opened diagonal?\n3. **Am I walking into a tactic?** Fork, pin, skewer, discovered attack on my king or queen?\n4. **Did I miss a refutation?** A check, capture, or threat that breaks my plan?\n\nFive to ten seconds, every move." },

      { type: "subheading", value: "The single best question" },
      { type: "text", value: "If you can only ask **one** blunder-check question, ask:\n\n> *After I make this move, does my opponent have a check, capture, or threat that wins?*\n\nIt catches almost every one-move blunder and most two-move tactics. It requires no judgment — it's mechanical." },

      { type: "subheading", value: "The 'sit on your hands' rule" },
      { type: "text", value: "Cecil Purdy's old advice, restated by every modern coach: when you've decided on your move, **don't play it immediately**. Sit on your hands, count to three, look at the position once more. The number of blunders prevented by this single habit is enormous.\n\nOnline, the equivalent is the **pre-move pause** — never click on the first second. The platform makes instant moves easy; the discipline must be deliberate." },

      { type: "subheading", value: "Most blunders are simple" },
      { type: "text", value: "Study your own blundered games and a pattern emerges. They're not deep tactics. They're:\n\n- **Back-rank weaknesses** — king behind three pawns with no luft.\n- **Hanging pieces** — a piece on an attacked square with no defender.\n- **Loose pieces** (John Nunn's *LPDO* — Loose Pieces Drop Off). Even pieces not currently attacked become tactical targets when undefended.\n- **Removed defender** — your move stops defending another piece.\n- **Overworked defender** — one piece defending two things; both then attacked.\n- **Pinned piece** — moving the pin's defender, or treating a pinned piece as a real defender.\n\nMost \"tactics\" you suffer in your own games exploit one of these six. Train recognition until they're automatic." },

      { type: "board",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 0 5",
        caption: "Black to move. Run the blunder check before any move. Black's king is still in the center — castling is the priority. A move like Bg4? Blunder check: does anything attack b5/c4/d3/e2/f1 line? The bishop on c4 can take f7 in some lines. Castling kingside removes the king from these threats." },

      { type: "interactive",
        fen: "6k1/5ppp/8/8/3pp3/5B2/5PPP/6K1 w - - 0 1",
        prompt: "Black just pushed e4 to attack your bishop. The instinctive move is to retreat — but run the blunder check on the captures first. Is Bxe4 safe? What defends e4? Nothing. Capture and win the pawn.",
        solution: "Bxe4",
        explanation: "Many players see a piece attacked and reflexively retreat. The blunder check on Bxe4 — *what attacks e4 after I land there?* — finds nothing. The d4 pawn doesn't defend e4 (pawns capture diagonally forward). So Bxe4 saves the bishop AND wins a pawn. The lesson: the blunder check works in both directions. It catches your own blunders, and it confirms that your tactics are real." },
    ],
    quiz: [
      {
        question: "What's the single best blunder-check question?",
        options: [
          "Did I develop a piece?",
          "After I make this move, does my opponent have a check, capture, or threat that wins?",
          "Is this the engine's first choice?",
          "Did I think about it long enough?",
        ],
        answer: 1,
        explanation: "It catches almost every one-move blunder and most two-move tactics. Mechanical, exhaustive in small positions, requires no judgment.",
      },
      {
        question: "What does 'sit on your hands' mean?",
        options: [
          "Take long thinks on every move.",
          "When you've decided your move, pause briefly before playing it and look at the position one more time.",
          "Don't move pieces until the engine confirms.",
          "Play your moves slowly to use up clock.",
        ],
        answer: 1,
        explanation: "Cecil Purdy's old rule. The pause is a deliberate buffer between deciding and committing. Online, it means not clicking on the first second.",
      },
      {
        question: "Most amateur blunders fall into a small set of categories. Which is NOT one of them?",
        options: [
          "Hanging a piece (no defender).",
          "Back-rank weakness (no luft).",
          "Loose piece dropping off after a tactic.",
          "Misplaying a complicated tablebase endgame.",
        ],
        answer: 3,
        explanation: "Tablebase endgames almost never come up in amateur games. The real categories are simple: hanging pieces, back rank, loose pieces, removed defenders, overworked defenders, pinned pieces. Train pattern recognition for these six.",
      },
    ],
    further: [
      "Heisman's 'Real Chess' essays — the canonical modern formulation of CCT + blunder check.",
      "Nunn's *LPDO* — loose-piece pattern recognition.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-005-time-management",
    title: "Time management at the board",
    track: "calculation",
    order: 5,
    estimatedMinutes: 10,
    objective: "Allocate your clock — fast on routine moves, long on critical ones, never below five minutes by accident.",
    tags: ["time-management", "calculation", "tournament"],
    next: "calc-006-visualization",
    content: [
      { type: "text", value: "Time on the clock is a resource. Most amateur losses in long games come from misallocating it: thinking too long on simple moves, then having no time for the critical decisions. The best calculation in the world doesn't help if the flag falls." },

      { type: "subheading", value: "The 20 / 60 / 20 rule" },
      { type: "text", value: "Rough heuristic for classical chess: spend about **20% of your time on the opening, 60% on the middlegame, 20% on the endgame**. The middlegame is where the game is usually decided and where calculation pays off most.\n\nThis is a guideline, not a law. Some games end in the opening, some in technical endgames. But if you routinely spend 50% of your clock on the opening, you're misallocating — that time should be in the middlegame where it matters." },

      { type: "subheading", value: "When to spend long thinks" },
      { type: "text", value: "Critical moments deserve real time. They're recognizable:\n\n- **Pawn structure changes** — every pawn move is permanent. A pawn break reshapes the position.\n- **Trades that change the character** — exchanging queens, swapping into an endgame, trading off the attacker.\n- **First move out of preparation** — the moment your memory ends and chess begins.\n- **Attack opportunities** — when you sense the attack is on but the move order matters.\n- **Critical defensive moments** — when the opponent's attack is coming.\n- **Forced sequences with multiple branches** — calculation accuracy matters.\n\nRule of thumb: when the position changes character, slow down. When it doesn't, play at normal speed." },

      { type: "subheading", value: "When to play fast" },
      { type: "text", value: "Fast play is correct in many positions:\n\n- **Theoretical opening moves** you've prepared.\n- **Forced recaptures** with only one reasonable square.\n- **Obvious developing moves** in the opening.\n- **Only-moves** with a single sensible response.\n- **Endgame technique moves** following a known plan.\n\nPlaying fast in these positions banks time for the critical moments. Spending five minutes on a forced recapture is wasted." },

      { type: "board",
        fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        caption: "Petrov's Defense after 2…Nf6. Move 3 in known opening theory — White should play one of two prepared moves (Nxe5 or Nc3) within seconds. Spending five minutes here is a misallocation. Bank the time for move 18 when the position is unfamiliar." },

      { type: "interactive",
        fen: "r4rk1/ppp2ppp/3b4/4p3/5B2/8/PPP2PPP/R4RK1 w - - 0 1",
        prompt: "Black's e-pawn is hanging on e5 — no defender. Your bishop on f4 takes for free. This is the kind of obvious capture you should play in 10 seconds, not five minutes. Bank the time for the next critical decision.",
        solution: "Bxe5",
        explanation: "Bxe5 is forced for material — anything else loses tempo. This is exactly the kind of move you should play in 10 seconds. Banking time on obvious moves is what gives you 10+ minutes for the critical choice three moves later." },

      { type: "subheading", value: "The five-minute rule" },
      { type: "text", value: "Practical rule: **if you have less than five minutes left and the game isn't nearly over, you're in time trouble**. Switch into time-trouble mode — quicker decisions, more reliance on intuition, fewer deep calculations.\n\nThe fix is upstream: notice when you're spending long on non-critical moves. Glance at the clock every five moves to stay aware. The first time you realize you're at 7 minutes when you expected to have 25, the misallocation has already happened." },

      { type: "subheading", value: "Increment is your friend" },
      { type: "text", value: "In increment time controls (15+10, 60+30), the increment matters. As long as you can play within the increment, your clock isn't shrinking. In long time scrambles, play any reasonable move within the increment and bank time for the next critical decision. Players new to increment often forget it exists and panic-flag with three minutes still on the clock." },
    ],
    quiz: [
      {
        question: "The 20/60/20 rule allocates time how?",
        options: [
          "20% opening, 60% middlegame, 20% endgame.",
          "60% opening, 20% middlegame, 20% endgame.",
          "Equal across all three phases.",
          "100% on whatever feels critical at the time.",
        ],
        answer: 0,
        explanation: "Most calculation pays off in the middlegame, so the bulk of the clock should live there. Spending half your clock on the opening is a common amateur mistake.",
      },
      {
        question: "When should you spend a long think?",
        options: [
          "On every move, to be careful.",
          "On critical moments — pawn breaks, character-changing trades, first moves out of prep, attack/defense decisions.",
          "Only when you have plenty of time.",
          "Only on the opening.",
        ],
        answer: 1,
        explanation: "Long thinks are reserved for moments where the position changes character or accuracy matters. Spending a long think on a forced recapture is wasted; spending it on a structural decision is an investment.",
      },
      {
        question: "You're at 4 minutes in a 60+30 game on move 22. What should you do?",
        options: [
          "Keep calculating deeply on every move — you're behind in time, you need to catch up.",
          "Recognize you're in time trouble: shift to faster moves, more intuition, fewer deep calculations.",
          "Resign.",
          "Pre-move everything from now on.",
        ],
        answer: 1,
        explanation: "Below five minutes is time-trouble territory. Switch modes: rely on intuition, play any reasonable move, use the increment, save deep calculation for moments where you have no choice.",
      },
    ],
    further: [
      "Heisman's columns on time management — the classic amateur-improvement source.",
      "Tournament-experience-based: keep a clock log of your last 10 long games and look for systematic misallocation.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-006-visualization",
    title: "Visualization: seeing three moves ahead",
    track: "calculation",
    order: 6,
    estimatedMinutes: 13,
    objective: "Build the mental image of a position after a sequence of moves.",
    tags: ["visualization", "calculation", "training"],
    next: "calc-007-forcing-lines",
    content: [
      { type: "text", value: "The hardest part of calculation isn't moving the pieces in your head — it's **seeing the final position clearly enough to evaluate it**. Many players calculate accurately but evaluate wrongly because the final position is fuzzy: they've forgotten which pawn is on which square, where the kings are, which piece defends what.\n\nVisualization is a learnable skill. The bottleneck for most players is technique, not raw imagination." },

      { type: "subheading", value: "The mental image" },
      { type: "text", value: "When you calculate a sequence — say `1.Nf3 e5 2.Nxe5 d6 3.Nf3` — you're building a mental snapshot of the position after move 3. The snapshot has to be sharp enough to answer questions like:\n\n- Whose move is it?\n- Where are both kings?\n- What pieces have left the board?\n- What's defending what?\n- What's the next forcing move available?\n\nFuzzy snapshots produce fuzzy evaluations." },

      { type: "subheading", value: "Drills to build it" },
      { type: "text", value: "Three drills, in order of difficulty:\n\n1. **Setup-and-check.** Calculate a forcing line, then physically set up the final position on a board and compare. Almost everyone misses something on the first try. Repetition closes the gap.\n2. **Verbal description.** Calculate a sequence and *describe out loud* the resulting position before evaluating: \"White king on g1, queen on d1, rook on e1, knight on f3, pawns on a2 b2 c2 d4 e4 f2 g2 h3…\" The description forces sharpness.\n3. **Blindfold puzzles.** Solve simple puzzles (mate in 1, mate in 2) from the FEN alone, without seeing a board. Start tiny — just a king and a queen — and grow.\n\nFifteen minutes a week of any of these compounds fast." },

      { type: "interactive",
        fen: "6k1/8/6K1/8/8/8/8/Q7 w - - 0 1",
        prompt: "Visualization warm-up. White king on g6, queen on a1, Black king on g8. Mate in one. Don't move pieces — see the final position in your head first, then play.",
        solution: "Qa8#",
        explanation: "Queen swings to a8, controls the entire 8th rank. King on g6 covers f7, g7, h7. Black king on g8 has no escape. The visualization drill: before playing, describe the final position to yourself — 'White Qa8 covering 8th rank, Kg6 covering 7th rank, Black Kg8 with no legal move.' If you can describe it, you've seen it." },

      { type: "interactive",
        fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
        prompt: "Same drill, harder pattern. Run CCT, find the check, but before you play it: visualize the resulting position. Where's Black's king? Can it escape? Which squares does the rook control? Then play.",
        solution: "Re8#",
        explanation: "Rook to e8, attacks the entire 8th rank. Black king on g8 — escape squares are f8 (attacked), h8 (attacked), and the second rank g7/f7/h7 (all blocked by Black's own pawns). No piece can block on the 8th rank between e8 and g8 (only f8, no defender available). Mate. The visualization habit: see the king's escape squares one by one, confirm each is unavailable, *then* commit." },

      { type: "subheading", value: "When the image is fuzzy, stop" },
      { type: "text", value: "If three moves into a calculation you're no longer sure where the pieces are, **stop and evaluate**. Pushing past your reliable visualization depth introduces errors that compound — by move five your mental position bears no resemblance to the real one.\n\nA player who can reliably see three moves should usually stop at three and trust their evaluation, rather than guess at moves four and five. The fix isn't to push past the limit; it's to extend the limit through training." },

      { type: "subheading", value: "Connor's training plan" },
      { type: "text", value: "If you want measurable visualization improvement in 8 weeks:\n\n- **Daily** (5 min): three blindfold mate-in-1s. Just FEN, no board.\n- **2x weekly** (10 min): solve a forcing tactic without moving pieces, then set up the final position on a board and check.\n- **Weekly** (15 min): replay one short master game (Morphy miniatures are perfect) without a board, just the move list. See how far you get.\n\nThis is the cheapest improvement in chess. Almost no one does it." },
    ],
    quiz: [
      {
        question: "What's the *hardest* part of calculation for most players?",
        options: [
          "Moving the pieces correctly in your head.",
          "Seeing the final position sharply enough to evaluate it.",
          "Remembering opening theory.",
          "Counting material.",
        ],
        answer: 1,
        explanation: "Players move pieces in their heads accurately but evaluate the resulting position wrongly because the snapshot is fuzzy. Sharper visualization → more reliable evaluation → better moves.",
      },
      {
        question: "You've calculated four moves deep and you're no longer sure where the rook is. What should you do?",
        options: [
          "Push on for two more moves and hope.",
          "Stop and evaluate the position you can still see clearly.",
          "Restart from the beginning of the line.",
          "Switch to a different line.",
        ],
        answer: 1,
        explanation: "Pushing past your reliable visualization depth compounds errors — by move six, your mental position is fiction. Better to evaluate at the depth you can see and trust the evaluation. The fix is to extend your depth through training, not to fake it under clock pressure.",
      },
    ],
    further: [
      "Aagaard, *Grandmaster Preparation: Calculation* — extensive visualization drills.",
      "ChessTempo / Lichess: 'blindfold' puzzle modes for daily practice.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-007-forcing-lines",
    title: "Calculating forcing lines: when to stop",
    track: "calculation",
    order: 7,
    estimatedMinutes: 13,
    objective: "Calculate one line cleanly to a stable position, evaluate, then move to the next candidate.",
    tags: ["calculation", "forcing-lines", "aagaard"],
    next: "calc-008-quiet-move",
    content: [
      { type: "text", value: "Calculation is the process of moving pieces in your head, evaluating the result, and choosing the line with the best outcome. The discipline is in the *technique*, not the raw depth." },

      { type: "subheading", value: "Calculate in lines, not in clouds" },
      { type: "text", value: "The basic rule: pick **one** candidate, calculate the entire line to a stable position, evaluate it, then move on to the next candidate. **Don't jump branches.**\n\nPlayers who jump branches end up with a confused picture: they remember evaluating \"a line where I sacrificed the knight and it was good,\" but can't reconstruct what move order led there. They double-count tempi, forget which side moved last, miscalculate the final position.\n\nA useful image: the diver. Take a breath at the surface (the current position), descend through one line to the seabed (the final position), evaluate, surface. Then take another breath and descend through the next line. **The breath at the surface — coming back to the actual position before starting the next branch — is the discipline that prevents confusion.**" },

      { type: "subheading", value: "When to stop calculating" },
      { type: "text", value: "Stop when one of these is true:\n\n- The position has **stabilized** — no immediate forcing moves remain, you can evaluate.\n- The evaluation is **clear** — clearly winning, clearly losing, clearly equal.\n- A **repetition** has occurred (claim or avoid the draw).\n- You hit a position you've **already evaluated** in a parallel line.\n- You've exceeded your **reliable visualization depth**.\n\n\"Feels good\" is not on this list. Stop when the position is *evaluable*, not when you like the way it looks." },

      { type: "interactive",
        fen: "r5k1/5ppp/8/3q4/8/8/PPP2PPP/3R2K1 w - - 0 1",
        prompt: "Forcing line, one move deep. White rook attacks Black queen on the d-file. The queen has no defender on d5. Calculate one move ahead: capture, evaluate, stop.",
        solution: "Rxd5",
        explanation: "Rxd5 wins the queen for a rook — net gain of about 4 points. The line stops here. Black recaptures with nothing (queen was undefended), so the calculation terminates after one move with a clear evaluation. The discipline: don't keep calculating after the position has stabilized at +4 in your favor. Stop, play, move on." },

      { type: "subheading", value: "Aagaard's four kinds of moves" },
      { type: "text", value: "Jacob Aagaard, in *Grandmaster Preparation: Calculation* (2012), organizes calculation around four kinds of moves players systematically miss:\n\n1. **Candidate moves** — the basic discipline of generating alternatives.\n2. **Branches** — recognizing where the opponent has multiple plausible responses, and calculating each.\n3. **Retreating moves** — players notice forward moves naturally; backward and sideways moves require deliberate search. Many tactics depend on quiet retreats.\n4. **Prophylactic moves** — moves that prevent the opponent's plan rather than execute your own. Often the strongest move in quiet positions.\n\nAagaard's drill: in any position, force yourself to specifically search for **retreats** and **prophylactic moves** before deciding. The improvement is immediate and large." },

      { type: "subheading", value: "Forced sequences vs probabilistic positions" },
      { type: "text", value: "Two different calculation modes:\n\n- **Forced sequences** — every move is a check, capture, or only-defense. The line is deterministic; calculation can be deep and confident.\n- **Probabilistic positions** — the opponent has multiple plausible responses. Calculation must consider several branches at each opponent move; depth shrinks fast.\n\nA common amateur mistake: calculate a probabilistic position like a forced sequence. You go five moves deep down one branch assuming the opponent cooperates. They don't. The correct technique is to calculate to the point where the position becomes evaluable, then trust your evaluation." },

      { type: "subheading", value: "Compare intermediate positions, not just final ones" },
      { type: "text", value: "When comparing two lines that both look good, don't only compare final evaluations. Look at the **intermediate** positions. Often line A reaches +1.0 but the intermediate moves require precision; line B reaches +0.7 via simple, robust moves. **Line B is the better practical choice** — especially under time pressure or below master level, where the \"objectively best\" move often loses because the path is too narrow." },

      { type: "interactive",
        fen: "4r1k1/4q1pp/8/8/8/8/6PP/4R1K1 w - - 0 1",
        prompt: "A short forcing line. White's rook can win the queen — calculate to the point where the position stabilizes, evaluate, then play.",
        solution: "Rxe7",
        explanation: "Rxe7 Rxe1+ Kg2 (or Kf2) and White is up a queen for two rooks (~+1 material, plus White is the only side with major pieces left and an exposed Black king). The line stabilizes after Black's recapture; you don't need to calculate further. The discipline is to recognize 'evaluable' — once material is decided and no immediate threats remain, stop." },
    ],
    quiz: [
      {
        question: "What's the right way to calculate two candidate lines?",
        options: [
          "Switch back and forth between them as ideas occur.",
          "Calculate line A to a stable position, evaluate, return to the starting position, then calculate line B.",
          "Calculate line A to depth 5, then line B to depth 5, picking up where you left off in either direction.",
          "Pick the prettier line and calculate only that.",
        ],
        answer: 1,
        explanation: "The diver image: surface (return to the starting position) between dives. Jumping branches mid-calculation produces confused, double-counted, unreliable evaluations.",
      },
      {
        question: "Aagaard says players systematically miss four kinds of moves. Which is NOT one of them?",
        options: [
          "Retreating moves.",
          "Prophylactic moves.",
          "Pawn promotions.",
          "Branches in the opponent's responses.",
        ],
        answer: 2,
        explanation: "Pawn promotions are a legal-move category, not a search-blind-spot category. The four blind spots are candidate moves (alternatives), branches (opponent options), retreats (backward moves), and prophylaxis (preventing opponent's plans).",
      },
      {
        question: "Line A reaches +1.0 with a narrow only-move sequence. Line B reaches +0.7 with simple natural moves. Which is the better practical choice?",
        options: [
          "A — always play the objectively best move.",
          "B — under most practical conditions, robust evaluations beat marginal accuracy.",
          "It depends on the engine setting.",
          "Always pick the move that gives you more time.",
        ],
        answer: 1,
        explanation: "Below master level and under time pressure, the 'best' move whose path requires precision often loses because you find one of the wrong only-moves. The robust line with the slightly worse evaluation is the practical winner.",
      },
    ],
    further: [
      "Aagaard, *Grandmaster Preparation: Calculation* (2012) — the modern reference.",
      "Dvoretsky, *Secrets of Chess Tactics* — older but still excellent on calculation discipline.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "calc-008-quiet-move",
    title: "The quiet move at the end of a combination",
    track: "calculation",
    order: 8,
    estimatedMinutes: 12,
    objective: "After a forcing sequence, look for the killer non-checking move that completes the combination.",
    tags: ["calculation", "quiet-move", "zwischenzug", "combination"],
    next: null,
    content: [
      { type: "text", value: "Forcing sequences feel safe. Every move is a check or a capture, the opponent's responses are forced, the evaluation is clear. Then the sequence ends, the opponent has a quiet move, and **the position is suddenly losing** because the quiet move attacks two pieces or threatens mate.\n\nThe fix is the **quiet move check**: after every forcing sequence, before stamping the line as won/lost/equal, ask:\n\n> *What is my opponent's best quiet move now?*\n\nOften a simple developing move, a defensive consolidation, or a counter-threat changes the evaluation entirely. This is the single most common refutation of human calculation." },

      { type: "subheading", value: "The 'look one more move' rule" },
      { type: "text", value: "After calculating a line and reaching what looks like a good evaluation, **look one more move deeper**. The opponent's surprising next move is the most common refutation of human calculation. The line that looked winning ends with a quiet zwischenzug or a hidden tactic that flips it.\n\nThe extra move is cheap to compute and catches a large class of errors. It's the highest-ROI calculation upgrade for intermediate players." },

      { type: "subheading", value: "The killer quiet move on YOUR side" },
      { type: "text", value: "The same idea works in reverse — at the end of a forcing combination, the move that finishes it off is often **not a check or a capture**. It's a quiet move that creates an unstoppable threat after all the noise.\n\nThe classic combination shape:\n\n1. A series of checks and captures that drives the opponent into a bad shape.\n2. A quiet move (often a piece improvement or pawn push) that creates a winning threat.\n3. The opponent has no defense.\n\nReti's mate, Anastasia's mate, the smothered mate — almost every named mating pattern includes a non-checking move at a critical step. Beginners look for checks at the end and miss the quiet finisher." },

      { type: "board",
        fen: "r1bqr1k1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP1B1PPP/R2QR1K1 w - - 0 1",
        caption: "An IQP middlegame. White looking for play against the d5 pawn. The killer here isn't a check or a capture — it's the quiet **Nb5**, eyeing c7 and pressuring d6. Quiet moves that create threats are often the strongest moves in positional play, just as they are at the end of combinations." },

      { type: "interactive",
        fen: "7K/8/k1P5/7p/8/8/8/8 w - - 0 1",
        prompt: "Reti's famous study. White is doomed: the h-pawn promotes, you can never catch it. Or are you? Don't look for a check or a capture. Look for the quiet king move that does *two* things at once.",
        solution: "Kg7",
        explanation: "**Kg7**, the most famous quiet move in chess endgame studies. The king walks toward two squares at once — toward h6 to catch the h-pawn, AND toward f6 to support the c-pawn's promotion. It's a draw against any Black response. The point: quiet moves can do impossible work. Always check whether a quiet king/piece move accomplishes more than a check or capture would." },

      { type: "subheading", value: "Connor's checklist for the end of a combination" },
      { type: "text", value: "After the forcing sequence, before declaring the line won, ask:\n\n1. **What's my best quiet move here?** Sometimes the killer move follows the sequence, not within it.\n2. **What's my opponent's best quiet move here?** This is the move that refutes 80% of \"winning\" combinations that don't actually win.\n3. **Is there a zwischenzug?** An in-between check or capture that breaks my line's tempo.\n4. **Did I check captures, not just checks?** Beginners look for checks; the killer often is a capture that uncovers a threat.\n\nFifteen seconds of this check, every long combination. It transforms calculation from \"hopeful\" to \"reliable.\"" },

      { type: "interactive",
        fen: "8/P7/8/8/8/8/8/k1K5 w - - 0 1",
        prompt: "Endgame test. White pawn on a7, one move from queening. Black king on a1, far away. The completing move isn't a check yet — it's the move that promotes. Pick the right promotion piece.",
        solution: "a8=Q#",
        explanation: "a8=Q is mate. The queen on a8 attacks a1 along the a-file; the Black king has no escape (b1 covered by the king on c1, b2 covered by the king on c1 in the diagonal sense — wait, c1 covers b1 and b2, plus a2 is attacked by the new queen). The 'quiet' framing here: at the end of any pawn endgame, the promotion *is* the move that completes the combination. Always choose the promotion piece deliberately — usually queen, but knight when you need a fork, rook to avoid stalemate." },
    ],
    quiz: [
      {
        question: "What is the 'quiet move check' at the end of a forcing sequence?",
        options: [
          "Looking for the loudest, most forcing continuation.",
          "Asking 'what is my opponent's best non-checking, non-capturing reply now?'",
          "Stopping calculation as soon as the position looks good.",
          "Checking the engine's evaluation.",
        ],
        answer: 1,
        explanation: "The quiet move is what most often refutes a 'winning' combination. After the forcing moves end, the opponent's quiet developing move or counter-threat changes the evaluation. Always check it before committing.",
      },
      {
        question: "Why are quiet moves often the killer move in a combination?",
        options: [
          "They surprise the opponent psychologically.",
          "Beginners are trained to look for checks and captures, so quiet finishers are easy to miss in calculation.",
          "Engines prefer quiet moves.",
          "Quiet moves are always strongest.",
        ],
        answer: 1,
        explanation: "Players are conditioned to look for forcing moves first (rightly — that's CCT). The downside: at the END of a combination, when the killer is a non-checking threat or piece improvement, those same players keep looking for checks and miss the actual win.",
      },
      {
        question: "What's the 'look one more move' rule?",
        options: [
          "Never stop calculating until you reach mate.",
          "After reaching a good-looking evaluation, calculate one more move deeper to check for surprising refutations.",
          "Always calculate the opponent's worst move first.",
          "Look at one extra candidate move before committing.",
        ],
        answer: 1,
        explanation: "Cheap to compute, catches a large class of errors. The opponent's surprising next move — a zwischenzug, a quiet move with a counter-threat — is the most common refutation of human calculation. One more move of search closes the gap.",
      },
    ],
    further: [
      "Réti's 1921 study (Kg7 draw) — the canonical quiet move in endgame composition.",
      "Aagaard, *Grandmaster Preparation: Calculation* — extensive treatment of zwischenzugs and quiet finishers.",
    ],
  },

];
