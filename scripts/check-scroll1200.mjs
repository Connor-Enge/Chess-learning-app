import { chromium } from 'playwright-core';
const URL = 'https://connor-enge.github.io/Chess-learning-app/?cb=' + Date.now() + '#lessons/tac-ref-knight-fork';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1', isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(async () => { await document.fonts.load('22px Phosphor'); await document.fonts.ready; });
await page.waitForTimeout(2500);
const bodyDiag = await page.evaluate(() => {
  const b = document.body;
  const h = document.documentElement;
  return {
    bodyHeight: getComputedStyle(b).height,
    bodyMinHeight: getComputedStyle(b).minHeight,
    bodyDisplay: getComputedStyle(b).display,
    bodyOverflow: getComputedStyle(b).overflow,
    bodyOverflowY: getComputedStyle(b).overflowY,
    bodyClientHeight: b.clientHeight,
    bodyScrollHeight: b.scrollHeight,
    htmlHeight: getComputedStyle(h).height,
    htmlOverflow: getComputedStyle(h).overflow,
    htmlOverflowY: getComputedStyle(h).overflowY,
    htmlClientHeight: h.clientHeight,
    htmlScrollHeight: h.scrollHeight,
  };
});
console.log('BODY/HTML', JSON.stringify(bodyDiag));
for (const y of [0, 400, 800, 1200, 'end']) {
  if (y === 'end') await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  else await page.evaluate(yy => window.scrollTo(0, yy), y);
  await page.waitForTimeout(450);
  const probe = await page.evaluate(() => {
    const ab = document.querySelector('.appbar');
    const lp = document.querySelector('.lp-board-panel');
    const r = ab.getBoundingClientRect();
    const lr = lp ? lp.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      maxScroll: document.documentElement.scrollHeight - window.innerHeight,
      appbarTop: r.top,
      appbarH: r.height,
      lpTop: lr?.top,
      lpH: lr?.height,
    };
  });
  console.log(y, '->', JSON.stringify(probe));
}
await browser.close();
