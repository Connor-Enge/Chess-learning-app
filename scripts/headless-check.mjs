// Headless smoke test against the live deploy.
// Captures console messages, page errors, failed requests.
import { chromium } from 'playwright-core';

const URL = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/';

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();

const events = [];
page.on('console', m => events.push({ kind: 'console', type: m.type(), text: m.text() }));
page.on('pageerror', e => events.push({ kind: 'pageerror', text: e.message, stack: e.stack }));
page.on('requestfailed', r => events.push({ kind: 'requestfailed', url: r.url(), reason: r.failure()?.errorText }));
page.on('response', r => {
  if (r.status() >= 400) events.push({ kind: 'http', status: r.status(), url: r.url() });
});

await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => events.push({ kind: 'goto-error', text: e.message }));

// Wait a bit for late-binding errors
await page.waitForTimeout(1500);

const visible = await page.evaluate(() => {
  const main = document.getElementById('view');
  return {
    mainHTML: (main?.innerHTML || '').slice(0, 200),
    mainEmpty: !main || main.children.length === 0,
    hasNav: !!document.querySelector('.bottom-nav'),
    navTabs: document.querySelectorAll('.bottom-nav .tab').length,
    appbarTitle: document.getElementById('appbarTitle')?.textContent,
    bodyClasses: document.body.className,
  };
});

console.log('=== EVENTS ===');
for (const e of events) console.log(JSON.stringify(e));
console.log('\n=== VISIBLE STATE ===');
console.log(JSON.stringify(visible, null, 2));

await browser.close();
