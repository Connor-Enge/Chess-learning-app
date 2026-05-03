// Core lessons index — currently a stub. The lesson library is now split across:
//   - lessons-tactics-deep.js       (deep basic-tactics, track="tactics")
//   - lessons-tactics-advanced.js   (advanced tactics, track="tactics")
//   - lessons-positional.js         (deep positional, track="positional")
//   - lessons-openings.js           (opening meta-lessons, track="opening")
//   - lessons-endgame.js            (endgame meta-lessons, track="endgame")
//   - lessons-exchanges.js          (Exchanges & Piece Values, track="exchanges")
//   - lessons-calculation.js        (calculation + thinking process, track="calculation")
//
// content-loader.js loads all of the above (gracefully skipping any that fail) and merges them.
// This file remains as the import target so module-resolution doesn't fail; you can also add
// "core" lessons here directly if a future need arises.

export const LESSONS = [];
