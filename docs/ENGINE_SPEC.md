# Chess Academy — Custom Engine Specification

A production-quality chess engine written from scratch in JavaScript, targeting ~1800–2200 Elo on a modern phone, with personality biasing and per-move coaching baked in. Replaces Stockfish as the in-app opponent.

> **Status:** spec only. Build deferred until after the chessground lesson player + 3 reference lessons ship. Realistic build estimate: **5–10 focused agent sessions**.

---

## High-level architecture

```
┌─────────────────── UI thread ────────────────────┐    ┌─── Web Worker ───┐
│                                                  │    │                  │
│  Practice Mode  ─── postMessage ───────────────────────►  Engine core    │
│  Lesson Player  ◄── postMessage ──────────────────────  ┌────────────┐   │
│  Free play view                                  │    │  │ Move-gen   │   │
│                                                  │    │  │ + bitboard │   │
│  engine API (lib/engine-client.js):              │    │  ├────────────┤   │
│   .go({fen, personality, strength, time, depth}) │    │  │ Search     │   │
│   .evaluate({fen, personality})                  │    │  │ (negamax,  │   │
│   .analyzeMove({fenBefore, move, personality})   │    │  │  α-β, TT,  │   │
│   .book({fen, personality})                      │    │  │  qsearch)  │   │
│   .stop()                                        │    │  ├────────────┤   │
│   .setOption(name, value)                        │    │  │ Eval (HCE  │   │
│                                                  │    │  │  + tapered │   │
│                                                  │    │  │  PSQT)     │   │
│                                                  │    │  ├────────────┤   │
│                                                  │    │  │ Personality│   │
│                                                  │    │  │ weights    │   │
│                                                  │    │  ├────────────┤   │
│                                                  │    │  │ Coach      │   │
│                                                  │    │  │ (feature   │   │
│                                                  │    │  │  attrib +  │   │
│                                                  │    │  │  NL gen)   │   │
│                                                  │    │  ├────────────┤   │
│                                                  │    │  │ Opening    │   │
│                                                  │    │  │ book       │   │
│                                                  │    │  └────────────┘   │
└──────────────────────────────────────────────────┘    └──────────────────┘
```

Search runs in a Web Worker; the UI thread never blocks on engine compute. The client speaks a small UCI-inspired command protocol over `postMessage`.

---

## Non-negotiable elements

### 1. Move generator — written from scratch

- **Bitboard board representation.** JS supports 64-bit ops via `BigInt`; for hot paths, also benchmark a packed `{lo, hi}` `Uint32Array` representation with hand-coded ops. **Decision after benchmark, before committing to one.**
- **Magic bitboards** for rook/bishop sliding attacks. Pre-compute the magic numbers once at init; store the attack tables as `Uint64Array`/`BigInt64Array`.
- **Pseudo-legal move gen → in-check legality filter** as the standard pipeline.
- **Full rules:** castling (with through-check check), en passant, promotion (all four piece options), 50-move rule, threefold repetition (Zobrist-hashed history), insufficient-material draw, stalemate detection.
- **Perft verification gate** — must match canonical perft node counts at depth 1–6 from each of:
  - Start position
  - Kiwipete (`r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1`)
  - Position 3 (`8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1`)
  - Position 4 (`r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1`)
  - Position 5 (`rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8`)
  - Position 6 (`r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10`)
- **All five must match exactly. The engine doesn't ship until perft is clean.**

### 2. Search

- **Negamax + alpha-beta.**
- **Iterative deepening** with PV from previous iteration ordered first.
- **Transposition table** — Zobrist hashing, replace-by-depth scheme, ~16MB default size, configurable. Store: best-move, depth, score, score-type (exact / lower / upper bound), age.
- **Quiescence search:** captures + promotions + checks (limit check extensions to ply depth 4).
- **Move ordering:** TT-move → captures by MVV/LVA → killer moves (2 per ply) → history heuristic → quiet moves.
- **Pruning:**
  - Null-move pruning (R=2 or R=3 adaptive)
  - Late-move reductions (LMR with depth-and-move-count formula)
  - Futility pruning at low depths
  - Delta pruning in qsearch
  - Reverse futility pruning
- **Extensions:** check extensions, single-reply extensions.
- **Aspiration windows** on root.
- **Time management:** allocate per-move time from total clock with safety margin; soft and hard limits; abort search cleanly when hard limit fires.
- **Draw scoring:** contempt-aware (configurable; default 0).
- **Web Worker** — communicate via `postMessage` with a small command protocol (think / stop / setoption / position / info / bestmove).

### 3. Evaluation — hand-crafted, tapered

- **Game phase:** tapered between MG and EG by total non-pawn material remaining.
- **Material** with phase-aware values.
- **Piece-square tables**, separate MG/EG, hand-tuned. Start from PeSTO's tables as a known-good baseline (document the source; PeSTO is BSD-licensed).
- **Pawn structure:** doubled, isolated, backward, passed (with rank-based bonus + free-path bonus), pawn islands, candidate passers, connected passers, protected passers.
- **King safety:** pawn shield (ranks 2–3 in front of king), attacker count + weight, attacked squares around king, virtual mobility of the king, open files near king, opposite-side castling penalty when fewer pawn shelter pawns.
- **Mobility:** legal-move count per piece, weighted by piece type.
- **Knight:** outpost bonus (supported by pawn, can't be challenged by enemy pawn), trapped-knight penalty.
- **Bishop:** pair bonus (~30cp MG / ~50cp EG), bad-bishop penalty (proportional to own pawns on bishop's color), fianchetto bonus.
- **Rook:** open file, semi-open file, on 7th rank, connected rooks, trapped behind own pieces.
- **Queen:** early-development penalty (MG only), close-to-king bonus when attacking.
- **Threats:** hanging pieces, attacked-by-lower-piece bonus.
- **Space:** in closed positions, count safe squares behind own pawns up to rank 4.
- **Initiative:** small bonus for the side to move when material is balanced.
- **Tempo bonus.**
- **Specific endgame knowledge:**
  - **KPK bitbase** generated at startup, queried for exact 0/+/− verdict.
  - **KBNK** drive-to-correct-corner heuristic.
  - **K+P endings:** rule of the square, key squares.
  - **Wrong-color bishop + rook-pawn** forced-draw recognition.
  - **Insufficient material** beyond "no pieces": K vs K+B, K vs K+N, K+B vs K+B same color.
- **All eval terms broken out so they can be introspected** (the coach reads which terms changed most across a move to attribute the explanation).

### 4. Personality system

Each personality is a `weights` object that scales individual eval terms and biases move ordering. At search time, the personality's weights apply to the eval function. The principal variation we report is what THAT personality would play.

| Personality | Weight overrides | Behavioral notes |
|---|---|---|
| Aggressor | king-attack ×2.0, mobility ×1.2, material ×0.85 | Prefers sacrifices, sharp lines |
| Squeezer | structure ×1.5, mobility ×1.3, king-attack ×0.7, contempt +20 | Slow positional accumulation |
| Tactician | threat ×2.0, mobility ×1.4, depth +2 in tactical positions | Hunts combinations |
| Defender | king-safety ×1.8, threats-against-self ×2.0, contempt -20 | Solid, counterattack |
| Beginner Buddy | depth limited 3–5, plays 3rd-best 30%, blunder rate 8% | Newbie-friendly |
| Equal-Match | Elo-targeting via depth + blunder injection calibrated to user's running solve rate | Adaptive |

**Strength dial 800–2400 Elo,** mapped to `(depth limit, time per move, blunder injection rate, randomness)` — calibrated by running self-play against a known-rated reference engine.

### 5. Opening book

- Compact JSON book keyed by FEN-prefix or Zobrist hash, ~3–5k positions, 8–12 ply deep.
- Multiple books per personality: Aggressor uses gambit/sharp lines; Squeezer plays London/Catalan/Réti; Tactician plays Sicilian/KID; Defender plays Caro-Kann/Petroff; etc.
- For each book entry, store a few weighted candidate replies and pick stochastically so games vary.
- Out-of-book → engine search.

### 6. Coaching engine — the centerpiece for in-app value

- On every user move, run two analyses:
  - (a) Deepest-affordable-search from the position **before** the move (gives best move + PV + score).
  - (b) Eval at the position **after** the user's move (cheap; main score from search at moderate depth).
- Compute eval-delta (post-user-move eval minus best-line eval, both from user's POV).
- Classify:
  - cp-loss `0` → best
  - `≤ 10` → excellent
  - `≤ 30` → good
  - `≤ 90` → inaccuracy `?!`
  - `≤ 200` → mistake `?`
  - `> 200` → blunder `??`
  - **Brilliant `!!`** reserved for moves that find the only-good line in a sharp position (best-move with cp-loss ≤5 AND second-best is ≥150cp worse).
- **Feature attribution.** Decompose the eval-delta into per-feature contributions. Which terms swung the most? (King safety down 80? Pawn structure down 30? Mobility down 20?) Pick the dominant one(s) — that's the *reason* the move is bad.
- **Tactical pattern detection.** If the engine's PV from the missed best move contains a fork/pin/skewer/discovery within 3–5 plies, label the missed pattern by name. Re-uses the tactic-detection scaffolding the lesson player already needs.
- **NL explanation generator.** Templated by `(eval-category × dominant-feature × personality-voice)`. ~200–400 hand-written templates. Variables filled from analysis output. Example:
  - `(mistake, king-safety-degraded, Aggressor-voice)` → "12.h3? Loosens the kingside without purpose. Aggressor would hammer the king, not weaken his own. {best-move-suggestion} keeps the attack alive — {brief-rationale}."
- **Plan-level coaching (not just move-level).** Detect when the user has played 3+ inaccurate moves with a common theme (king-safety, structure, piece coordination) and surface a higher-order pointer: "You've made three king-safety concessions this game — this is a recurring leak. Lesson recommendation: [Pawn Shield & King Safety]." Adaptive based on aggregate stats.
- **User profile.** Persistent localStorage profile tracking per-track strengths/weaknesses, recurring blunder patterns, average accuracy by phase, opening repertoire fingerprint. Coach references it: "You've struggled with pawn levers in 8 of 10 recent games. Spend a session on Pawn Breaks before the next match."

### 7. Practice Mode UI

Wraps the engine + coach. Per the [Practice Mode spec in FEATURES.md](FEATURES.md#practice-mode--coached-play-vs-bot-planned--not-yet-shipped) — board, coach panel as bottom sheet, "Show me" replay, hint, threat indicator, post-game review. Coach panel content comes from the engine's coaching output.

### 8. API surface

```js
engine.go({ fen, personality, strength, timeMs, depth }) → Promise<{
  bestMove, score, pv, depth, nodes, time
}>

engine.evaluate({ fen, personality }) → Promise<{
  score,
  terms: { material, kingSafety, mobility, structure, threats, ... }
}>

engine.analyzeMove({ fenBefore, move, personality }) → Promise<{
  category,             // 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder' | 'brilliant'
  cpLoss,
  dominantFeatures,     // [{ name, deltaCp }]
  suggestedMove,
  suggestedPv,
  explanationKey,       // template id
  templateVars          // { bestMove, rationale, missedPattern, ... }
}>

engine.book({ fen, personality }) → { move, weight }[] | null

engine.stop()
engine.setOption(name, value)
```

### 9. Testing & quality gates

- **Perft test suite** (5 positions × depths 1–6) — gating.
- **SEE (static exchange evaluation)** unit tests.
- **Eval symmetry test:** `eval(fen) === -eval(flipped fen)` for 100 sampled positions.
- **Mate-in-N test set** (Reinfeld 1001, etc.) — engine must solve all mate-in-2 at depth 4, all mate-in-3 at depth 6, etc.
- **Tactical test set** — Bratko-Kopec or Win at Chess subset; measures tactical strength.
- **Self-play vs reference engine** (e.g. Stockfish at fixed low depth) — calibrate Elo and confirm we're in the 1800–2200 ballpark.
- **No regressions:** a CI-style script runs the perft suite + a 50-move tactical suite before any commit to engine code.

### 10. Performance targets

- ≥ **200k nodes/sec** in a Web Worker on a modern phone.
- **Depth 10–14 in 1–3 seconds** at default settings.
- **First move comes back in < 500ms** even for the deepest analysis (so the UI never feels stuck).

### 11. No NNUE

A neural-network evaluator from scratch requires data, training, and tuning that's months of work. Hand-crafted eval is the ceiling here. **Decision documented in this file, not revisited.**

### 12. No external engine binary at runtime

The custom engine is the in-app default. Stockfish stays loaded only as a verification tool for self-play calibration and dev work — **it's not what the user plays against.**

---

## Milestone breakdown

Each milestone has a verification step. No "we'll come back to that" — feature complete or it doesn't ship. Walk milestones strictly in order.

| # | Milestone | Acceptance gate |
|---|---|---|
| **M1** | Bitboard board + move gen + perft verified | All 5 perft positions match canonical node counts at depths 1–6 |
| **M2** | Search loop + minimal eval + plays a legal game | Plays a self-play game with no illegal moves; basic α-β working |
| **M3** | Full HCE + tapered eval + PSQT + all structural terms | Eval-symmetry test passes; eval terms are introspectable |
| **M4** | TT, NMP, LMR, killers, history, qsearch, time management | Depth 10 in <2s on a modern laptop, depth 8 in <3s on phone |
| **M5** | Opening book + personalities | Personality biases produce visibly different play in self-play |
| **M6** | Coaching engine — feature attribution + NL templates | Coach output for sample moves passes manual review |
| **M7** | Tactical/perft regression suite + Elo calibration | Self-play vs Stockfish-fixed-depth places engine at 1800–2200 |
| **M8** | Practice Mode UI integration | End-to-end: user plays a full game with coaching |
| **M9** | User-profile adaptive coaching | Profile updates persist; coach references aggregate stats |

### Estimated session count

Realistically, **5–10 focused agent sessions** end-to-end, depending on how cleanly the bitboard / magic-bitboard code lands first try. Each milestone produces a milestone-progress report.

### Where to start

After the chessground lesson player + 3 reference lessons are live, the immediate next work is **M1 — bitboard board + move gen + perft**. Until perft is clean, no search code is written.

---

## File layout (anticipated)

```
js/engine/
├── engine-client.js        # API surface, lives on UI thread
├── worker.js               # Web Worker entry point
├── core/
│   ├── bitboard.js         # 64-bit bitboard primitives
│   ├── magic.js            # magic numbers + sliding attack tables
│   ├── board.js            # board state + make/unmake move
│   ├── movegen.js          # pseudo-legal move generation
│   ├── zobrist.js          # hash keys
│   ├── perft.js            # perft + verification suite
│   └── see.js              # static exchange evaluation
├── search/
│   ├── search.js           # negamax + α-β + iterative deepening
│   ├── tt.js               # transposition table
│   ├── ordering.js         # move ordering (MVV/LVA, killers, history)
│   ├── prune.js            # NMP, LMR, futility, delta
│   └── time.js             # time management
├── eval/
│   ├── eval.js             # tapered HCE entry point + term breakdown
│   ├── psqt.js             # piece-square tables (MG/EG)
│   ├── pawns.js            # pawn structure terms
│   ├── king-safety.js      # king safety terms
│   ├── mobility.js         # mobility + threats
│   ├── pieces.js           # piece-specific terms
│   └── endgame.js          # endgame knowledge + bitbases
├── personality/
│   ├── personality.js      # weights → eval scaling + ordering bias
│   └── books/              # one book per personality (JSON)
├── coach/
│   ├── classify.js         # cp-loss → category
│   ├── attribute.js        # feature delta attribution
│   ├── pattern.js          # tactical pattern detection
│   ├── templates.js        # NL templates
│   └── profile.js          # user profile aggregation
└── tests/
    ├── perft.test.mjs
    ├── eval-symmetry.test.mjs
    ├── mate-in-n.test.mjs
    └── tactical.test.mjs
```

---

## Open decisions to resolve at M1 kickoff

- BigInt vs `Uint32Array` `{lo,hi}` — benchmark both before committing.
- Worker module type: `type: 'module'` is widely supported but iOS Safari has historically had issues; plan for a fallback that uses an importScripts-style entrypoint.
- Whether to ship the magic-numbers as pre-computed constants or generate at startup. Pre-computed is faster startup (~50ms saved); generated is smaller bundle.
- Default TT size on phone — start at 8MB, profile.
- Perft test suite location: keep as Node-runnable mjs scripts (so they can run in CI without a browser).

---

## What this spec deliberately leaves out (for now)

- Distributed/cloud opening books beyond the bundled JSON.
- Endgame tablebases beyond KPK bitbase (Syzygy etc. are too large to ship).
- NNUE evaluator (see "No NNUE" above).
- Multi-PV root search (single best line is enough for coaching).
- Pondering on opponent's time.
- Configurable contempt per game (only personality-level contempt).

These can be revisited after the engine reaches 1800+ Elo and stable Practice Mode integration.
