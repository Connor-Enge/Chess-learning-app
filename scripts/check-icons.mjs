// Diagnose Phosphor icon rendering on the live URL.
import { chromium } from 'playwright-core';
const URL = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/?cache=' + Date.now();
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('response', r => {
  const u = r.url();
  if (u.includes('phosphor') || u.endsWith('.css') || r.status() >= 400) {
    console.log('NET', r.status(), r.headers()['content-type'] || '', u);
  }
});
await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500); // allow font + script to settle
const info = await page.evaluate(async () => {
  await document.fonts.ready;
  // Pick a guaranteed-visible icon: bottom nav book icon (Lessons tab)
  const iconNode = document.querySelector('.bottom-nav .tab[data-route="lessons"] .icon')
    || document.querySelector('.bottom-nav__tab .icon')
    || document.querySelector('.icon');
  if (!iconNode) return { error: 'no .icon node found' };
  const style = getComputedStyle(iconNode);
  const before = getComputedStyle(iconNode, '::before');
  const rect = iconNode.getBoundingClientRect();
  const fontFaces = [];
  for (const f of document.fonts) fontFaces.push({ family: f.family, status: f.status, src: (f.src || '').slice(0, 80) });
  return {
    nodeClass: iconNode.className,
    parentClass: iconNode.parentElement?.className,
    visible: rect.width > 0 && rect.height > 0,
    rect: { w: rect.width, h: rect.height },
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    width: style.width,
    height: style.height,
    beforeContent: before.content,
    beforeFontFamily: before.fontFamily,
    fontFaces,
    phosphorLoaded: document.fonts.check('20px Phosphor'),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
