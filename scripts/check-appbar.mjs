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
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const info = await page.evaluate(() => {
  const ab = document.querySelector('.appbar');
  const cs = getComputedStyle(ab);
  const r = ab.getBoundingClientRect();
  // Walk all matched stylesheet rules and find which sets height
  const matched = [];
  function walk(rules, source) {
    for (const rule of rules || []) {
      if (rule.cssRules) walk(rule.cssRules, source);   // recurse into media, supports, etc
      if (rule.styleSheet?.cssRules) walk(rule.styleSheet.cssRules, rule.href || source);
      if (rule.selectorText && rule.selectorText.match(/\.appbar(?![-_])/)) {
        if (rule.style?.height || rule.style?.cssText?.includes('height')) {
          matched.push({
            sel: rule.selectorText,
            height: rule.style.height || '?',
            cssText: rule.style.cssText.slice(0, 120),
            source,
          });
        }
      }
    }
  }
  for (const ss of document.styleSheets) {
    try { walk(ss.cssRules, ss.href || 'inline'); } catch (e) {}
  }
  return {
    rect: { w: r.width, h: r.height },
    height: cs.height,
    minHeight: cs.minHeight,
    flexShrink: cs.flexShrink,
    flexGrow: cs.flexGrow,
    flexBasis: cs.flexBasis,
    appbarH: getComputedStyle(document.documentElement).getPropertyValue('--appbar-h'),
    safeTop: getComputedStyle(document.documentElement).getPropertyValue('--safe-top'),
    matchedRules: matched,
    parent: ab.parentElement.tagName,
    parentDisplay: getComputedStyle(ab.parentElement).display,
    parentFlexDir: getComputedStyle(ab.parentElement).flexDirection,
    parentMinHeight: getComputedStyle(ab.parentElement).minHeight,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
