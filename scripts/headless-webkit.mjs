// Smoke test against the live deploy using WebKit (Safari engine).
// Mimics iPhone 14 viewport.
import { webkit, devices } from 'playwright';

const URL = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/';
const browser = await webkit.launch({ headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
const page = await ctx.newPage();

const events = [];
page.on('console', m => events.push({ kind: 'console', type: m.type(), text: m.text() }));
page.on('pageerror', e => events.push({ kind: 'pageerror', text: e.message, stack: (e.stack || '').slice(0, 600) }));
page.on('requestfailed', r => events.push({ kind: 'requestfailed', url: r.url(), reason: r.failure()?.errorText }));
page.on('response', r => {
  if (r.status() >= 400) events.push({ kind: 'http', status: r.status(), url: r.url() });
});

try {
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
} catch (e) {
  events.push({ kind: 'goto-error', text: e.message });
}
await page.waitForTimeout(2000);

const visible = await page.evaluate(() => {
  const main = document.getElementById('view');
  return {
    mainHTML_first200: (main?.innerHTML || '').slice(0, 200),
    mainEmpty: !main || main.children.length === 0,
    hasNav: !!document.querySelector('.bottom-nav'),
    navTabs: document.querySelectorAll('.bottom-nav .tab').length,
    appbarTitle: document.getElementById('appbarTitle')?.textContent,
    docCharCount: document.documentElement.outerHTML.length,
  };
});

console.log('=== EVENTS (WebKit / iPhone 14 viewport) ===');
for (const e of events) console.log(JSON.stringify(e));
console.log('\n=== VISIBLE STATE ===');
console.log(JSON.stringify(visible, null, 2));

await browser.close();
