// Take a tight zoom screenshot of the bottom nav to inspect icons visually.
import { chromium } from 'playwright-core';
const URL = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/?cache=' + Date.now();
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
await page.waitForTimeout(2500);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
const nav = await page.$('.bottom-nav');
if (nav) await nav.screenshot({ path: 'docs/design-screenshots/zoom-bottom-nav.png' });
const hero = await page.$('.dashboard__hero');
if (hero) {
  await page.goto(URL.replace(/\?.*$/, '#dashboard?cache=' + Date.now()), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const hero2 = await page.$('.dashboard__hero');
  if (hero2) await hero2.screenshot({ path: 'docs/design-screenshots/zoom-hero.png' });
  const trackCard = await page.$('.track-card');
  if (trackCard) await trackCard.screenshot({ path: 'docs/design-screenshots/zoom-track-card.png' });
}
await browser.close();
console.log('zoom screenshots saved');
