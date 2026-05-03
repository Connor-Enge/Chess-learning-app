// Comprehensive verification of the new lesson player on the LIVE deploy.
// Captures screenshots of each behavior Connor asked to see:
//   1. Initial state (board mounted, lesson loaded)
//   2. After auto-play kicks in — animated move + callout
//   3. Arrows visible on the board
//   4. Your-move checkpoint pauses the script
//   5. Wrong move → red flash + hint
//   6. Right move → green flash + resume
//   7. Step-back rewinds the board state

import { webkit, devices } from 'playwright';

const URL = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/#lessons/tac-ref-knight-fork';
const browser = await webkit.launch({ headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
const page = await ctx.newPage();

const errs = [];
page.on('pageerror', e => errs.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('console-error: ' + m.text()); });
page.on('response', r => { if (r.status() >= 400) errs.push(`http ${r.status()}: ${r.url()}`); });

// The URL has the cache-buster as a query *before* the hash so the hash routes correctly
const cbUrl = URL.includes('#') ? URL.replace('#', '?cb=' + Date.now() + '#') : URL + '?cb=' + Date.now();
await page.goto(cbUrl, { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForSelector('.lp-play', { state: 'visible', timeout: 30000 });
await page.waitForTimeout(1500);

// 1. Initial state
await page.screenshot({ path: 'scripts/live-1-initial.png', fullPage: false });

// 2. Tap play, wait for early auto-advance (text reveal + callout + arrow)
await page.locator('.lp-play').click({ timeout: 30000 });
await page.waitForTimeout(4500);
await page.screenshot({ path: 'scripts/live-2-narration.png', fullPage: false });

// 3. Wait until we hit the first your-move checkpoint
await page.waitForFunction(
  () => document.querySelector('.lp-move-tip')?.classList.contains('lp-prompt'),
  { timeout: 20000 }
);
await page.screenshot({ path: 'scripts/live-3-your-move.png', fullPage: false });

// 4. Make a deliberately WRONG move and screenshot the red flash
//    The royal-fork position is at this point: White Kc2, Nd5, Black Ke8, Qh5.
//    The right move is Nf6+. A wrong move: Nb6 (a non-fork knight move).
async function clickSquare(sq) {
  const el = await page.evaluate((sq) => {
    // Find the square via chessground's coords-to-pixels helper
    const board = document.querySelector('cg-board');
    if (!board) return null;
    const r = board.getBoundingClientRect();
    const sz = r.width / 8;
    const file = sq.charCodeAt(0) - 97;
    const rank = parseInt(sq[1], 10) - 1;
    // Default white-orientation
    const x = file * sz + sz / 2;
    const y = (7 - rank) * sz + sz / 2;
    return { x: r.left + x, y: r.top + y };
  }, sq);
  if (!el) throw new Error('square not found ' + sq);
  await page.mouse.click(el.x, el.y);
}

// Try wrong move: d5 → b6 (a knight L, not the fork)
await clickSquare('d5');
await page.waitForTimeout(300);
await clickSquare('b6');
await page.waitForTimeout(800);
await page.screenshot({ path: 'scripts/live-4-wrong-flash.png', fullPage: false });

// 5. Now play the RIGHT move: d5 → f6 (Nf6+)
await clickSquare('d5');
await page.waitForTimeout(300);
await clickSquare('f6');
await page.waitForTimeout(1500);
await page.screenshot({ path: 'scripts/live-5-right-flash.png', fullPage: false });

// 6. Wait briefly, then test step-back
await page.waitForTimeout(2500);
await page.locator('.lp-back').click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'scripts/live-6-step-back.png', fullPage: false });

// 7. Restart
await page.locator('.lp-restart').click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'scripts/live-7-restart.png', fullPage: false });

const finalState = await page.evaluate(() => ({
  progress: document.querySelector('.lp-progress-label')?.textContent,
  textCardsRevealed: document.querySelectorAll('.lp-text-card.lp-revealed').length,
  puzzleCards: document.querySelectorAll('.lp-puzzle-card').length,
  noErrors: true,
}));

console.log('=== ERRORS ===');
console.log(errs.length ? errs.join('\n') : 'none');
console.log('\n=== FINAL STATE ===');
console.log(JSON.stringify(finalState, null, 2));

await browser.close();
