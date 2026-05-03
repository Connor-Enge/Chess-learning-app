// Capture the chessground lesson player at iPhone 14 viewport.
import { chromium } from 'playwright-core';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_LOCAL = resolve(__dirname, '..', 'docs', 'design-screenshots', 'iphone14-11-lesson-player.png');
const OUT_DL    = 'C:/Users/conno/Downloads/iphone14-11-lesson-player.png';

const URL = 'https://connor-enge.github.io/Chess-learning-app/?cb=' + Date.now() + '#lessons/tac-ref-knight-fork';

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.evaluate(async () => {
  await document.fonts.load('22px Phosphor');
  await document.fonts.ready;
});
// Give chessground + lesson player + first beat a chance to render
await page.waitForTimeout(2500);
// Confirm board mounted
const ready = await page.evaluate(() => ({
  hasBoard: !!document.querySelector('.cg-wrap, .lp-board, .board'),
  hasLpRoot: !!document.querySelector('.lp-root, .lesson-page, .lesson-content, #lessonContent'),
  bottomNav: !!document.querySelector('.bottom-nav'),
  appbarTitle: document.getElementById('appbarTitle')?.textContent,
}));
console.log('ready =', JSON.stringify(ready));

await page.screenshot({ path: OUT_LOCAL, fullPage: false });
await page.screenshot({ path: OUT_DL,    fullPage: false });
console.log('saved:', OUT_LOCAL);
console.log('saved:', OUT_DL);
if (errors.length) console.log('ERRORS:', errors);
await browser.close();
