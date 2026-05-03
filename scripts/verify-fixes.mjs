// Post-fix verification — focused on the three issues Connor reported.
// Captures lesson-player at scroll 0 / 400 / 800 / 1200 / end, plus the
// dashboard at scroll 0 / end, and samples computed styles to confirm
// the fixes shipped.
import { chromium } from 'playwright-core';
import { mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'docs', 'design-screenshots', 'verify');
mkdirSync(OUT, { recursive: true });
const DOWN = 'C:/Users/conno/Downloads';

const URL_BASE = 'https://connor-enge.github.io/Chess-learning-app/';
const bust = '?cb=' + Date.now();

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  hasTouch: true,
});

async function shot(hash, name, scrollY = 0) {
  const page = await ctx.newPage();
  await page.goto(URL_BASE + bust + hash, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => { await document.fonts.load('22px Phosphor'); await document.fonts.ready; });
  await page.waitForTimeout(2500);
  if (scrollY === 'end') await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  else await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(400);
  const file = `${OUT}/iphone14-${name}.png`;
  await page.screenshot({ path: file });
  // Also drop into Downloads for the user
  copyFileSync(file, `${DOWN}/iphone14-${name}.png`);
  // Probe a few computed values
  const probe = await page.evaluate(() => {
    const ab = document.querySelector('.appbar');
    const lpBoard = document.querySelector('.lp-board-panel');
    const lpText = document.querySelector('.lp-text-card');
    return {
      appbarH: ab ? Math.round(ab.getBoundingClientRect().height) : null,
      lpBoardTop: lpBoard ? getComputedStyle(lpBoard).top : null,
      lpBoardPosition: lpBoard ? getComputedStyle(lpBoard).position : null,
      lpTextOpacity: lpText ? getComputedStyle(lpText).opacity : null,
      lpTextFilter: lpText ? getComputedStyle(lpText).filter : null,
      lessonContentHasLpRoot: !!document.querySelector('.lesson-content .lp-root'),
      lessonContentBg: (() => {
        const lc = document.querySelector('.lesson-content');
        return lc ? getComputedStyle(lc).backgroundColor : null;
      })(),
    };
  });
  await page.close();
  console.log(`${name}: scrollY=${scrollY}`, probe);
  return probe;
}

await shot('#dashboard',                         'dashboard-scroll-0',     0);
await shot('#dashboard',                         'dashboard-scroll-end',   'end');
await shot('#lessons/tac-ref-knight-fork',       'lesson-scroll-0',        0);
await shot('#lessons/tac-ref-knight-fork',       'lesson-scroll-400',      400);
await shot('#lessons/tac-ref-knight-fork',       'lesson-scroll-800',      800);
await shot('#lessons/tac-ref-knight-fork',       'lesson-scroll-1200',     1200);
await shot('#lessons/tac-ref-knight-fork',       'lesson-scroll-end',      'end');
await shot('#tactics',                           'tactics-scroll-0',       0);
await shot('#endgames',                          'endgames-scroll-0',      0);

await ctx.close();
await browser.close();
console.log('done');
