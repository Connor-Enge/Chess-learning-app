// Redesign audit — iPhone 14 viewport (390x844) on the live URL.
// Captures screenshots of every route + console errors.
// Usage: node scripts/redesign-audit.mjs [URL]

import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const URL_BASE = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/';
// Anchor OUT_DIR to this script's location so cwd doesn't matter.
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const OUT_DIR = process.argv[3] || resolve(__dirname, '..', 'docs', 'design-screenshots');
mkdirSync(OUT_DIR, { recursive: true });
console.log('OUT_DIR =', OUT_DIR);

const ROUTES = [
  { hash: '',                          name: '01-lessons-landing' },  // default route
  { hash: '#dashboard',                name: '02-dashboard' },
  { hash: '#lessons',                  name: '03-lessons-list' },
  { hash: '#lessons/op-001',           name: '04-lesson-detail' },
  { hash: '#openings',                 name: '05-openings' },
  { hash: '#tactics',                  name: '06-tactics' },
  { hash: '#endgames',                 name: '07-endgames' },
  { hash: '#games',                    name: '08-games' },
  { hash: '#play',                     name: '09-play' },
  { hash: '#positional',               name: '10-positional' },
];

const VIEWPORTS = [
  { name: 'iphone14', width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const findings = [];

for (const vp of VIEWPORTS) {
  const errors = [];
  // Cache-bust query string so we always get fresh assets after a deploy
  const bust = `?cache=${Date.now()}`;
  for (const route of ROUTES) {
    // Fresh context per route to ensure fonts/fonts-ready bind to a clean lifecycle.
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push({ kind: 'pageerror', text: e.message }));
    page.on('requestfailed', r => errors.push({ kind: 'reqfailed', url: r.url(), reason: r.failure()?.errorText }));
    page.on('response', r => { if (r.status() >= 400) errors.push({ kind: 'http', status: r.status(), url: r.url() }); });
    page.on('console', m => { if (m.type() === 'error') errors.push({ kind: 'console-error', text: m.text() }); });

    const url = URL_BASE + bust + route.hash;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
      // explicitly request the Phosphor font (load + ready) so its glyphs paint
      await page.evaluate(async () => {
        await document.fonts.load('22px Phosphor');
        await document.fonts.ready;
      });
      // give templates + chessground time to mount
      await page.waitForTimeout(2000);
      // wait for the bottom nav to be present (page rendered)
      await page.waitForSelector('.bottom-nav', { timeout: 5000 }).catch(() => {});
      const file = join(OUT_DIR, `${vp.name}-${route.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log('captured', vp.name, route.name);
    } catch (e) {
      errors.push({ kind: 'goto-error', url, text: e.message });
      console.log('failed', vp.name, route.name, e.message);
    }
    await ctx.close();
  }
  findings.push({ viewport: vp, errors });
}

await browser.close();

writeFileSync(join(OUT_DIR, 'audit-findings.json'), JSON.stringify(findings, null, 2));
console.log('\n=== ERRORS ===');
for (const f of findings) {
  console.log(f.viewport.name, '—', f.errors.length, 'issues');
  for (const e of f.errors.slice(0, 20)) console.log('  ', JSON.stringify(e));
}
