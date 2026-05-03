// Re-capture dashboard alone with full font wait.
import { chromium } from 'playwright-core';
const URL = 'https://connor-enge.github.io/Chess-learning-app/?cb=' + Date.now() + '#dashboard';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.evaluate(async () => {
  await document.fonts.load('22px Phosphor');
  await document.fonts.ready;
});
await page.waitForTimeout(2000);
await page.screenshot({ path: 'docs/design-screenshots/test-dashboard-isMobile.png', fullPage: false });
const dom = await page.evaluate(() => {
  const trackCard = document.querySelector('.track-card .icon');
  if (!trackCard) return { error: 'no track-card icon' };
  const before = getComputedStyle(trackCard, '::before');
  return {
    classes: trackCard.className,
    fontFamily: getComputedStyle(trackCard).fontFamily,
    beforeContent: before.content,
    beforeFontFamily: before.fontFamily,
    beforeWidth: before.width,
  };
});
console.log(JSON.stringify(dom, null, 2));
await browser.close();
console.log('saved');
