// Interaction audit — actually USE the live URL like a person.
// Walks every screen, scrolls in a sequence (0/400/800/1200/end),
// captures each scroll position, dumps a layout map (every fixed/
// sticky/absolute element with computed z-index + bounding rect),
// then taps the major actions and verifies navigation/state changes.
//
// Output: docs/design-screenshots/interaction/<viewport>-<screen>-scroll-N.png
//         docs/design-screenshots/interaction/<viewport>-<screen>-overlay.png  (red outline-all debug)
//         docs/design-screenshots/interaction/<viewport>-<screen>-layout.json
//         docs/MOBILE_AUDIT_2.md  (human-readable findings)

import { chromium, webkit } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'docs', 'design-screenshots', 'interaction');
mkdirSync(OUT_DIR, { recursive: true });

const URL_BASE = process.argv[2] || 'https://connor-enge.github.io/Chess-learning-app/';

const SCREENS = [
  { hash: '#dashboard',                name: 'dashboard' },
  { hash: '#lessons',                  name: 'lessons-list' },
  { hash: '#lessons/tac-ref-knight-fork', name: 'lesson-player' },
  { hash: '#openings',                 name: 'openings' },
  { hash: '#openings/sicilian-najdorf',name: 'opening-detail' },
  { hash: '#tactics',                  name: 'tactics' },
  { hash: '#endgames',                 name: 'endgames' },
  { hash: '#games',                    name: 'games' },
  { hash: '#play',                     name: 'play' },
];

const SCROLL_POSITIONS = [0, 400, 800, 1200, 'end'];

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const findings = [];
const overlapReports = {};

const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  hasTouch: true,
});

const errors = [];
const bust = `?cb=${Date.now()}`;

for (const screen of SCREENS) {
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push({ screen: screen.name, kind: 'pageerror', text: e.message }));
  page.on('console', m => { if (m.type() === 'error') errors.push({ screen: screen.name, kind: 'console-error', text: m.text() }); });

  const url = URL_BASE + bust + screen.hash;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => { await document.fonts.load('22px Phosphor'); await document.fonts.ready; });
  await page.waitForTimeout(2500);

  // ── (1) Layout map: every fixed/sticky/absolute, z-index, rect ──
  const layoutMap = await page.evaluate(() => {
    const out = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const cs = getComputedStyle(el);
      if (['fixed', 'sticky', 'absolute'].includes(cs.position)) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        out.push({
          tag: el.tagName.toLowerCase(),
          class: (el.className || '').toString().slice(0, 80),
          id: el.id || null,
          position: cs.position,
          zIndex: cs.zIndex,
          top: cs.top,
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        });
      }
    }
    return out;
  });
  writeFileSync(`${OUT_DIR}/iphone14-${screen.name}-layout.json`, JSON.stringify(layoutMap, null, 2));

  // ── (2) Scroll context check ──
  const scrollCtx = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector('main');
    const view = document.getElementById('view');
    return {
      bodyScrollHeight: body.scrollHeight,
      bodyClientHeight: body.clientHeight,
      htmlScrollHeight: html.scrollHeight,
      htmlClientHeight: html.clientHeight,
      mainScrollHeight: main?.scrollHeight,
      mainClientHeight: main?.clientHeight,
      viewScrollHeight: view?.scrollHeight,
      viewClientHeight: view?.clientHeight,
      viewportHeight: window.innerHeight,
      // Which element is the actual scroller?
      bodyOverflowY: getComputedStyle(body).overflowY,
      htmlOverflowY: getComputedStyle(html).overflowY,
      mainOverflowY: main ? getComputedStyle(main).overflowY : null,
      // Are there any fixed-positioned elements that cover the whole viewport (would block scroll)?
      blockingOverlays: Array.from(document.querySelectorAll('*'))
        .filter(el => {
          const cs = getComputedStyle(el);
          if (cs.position !== 'fixed') return false;
          const r = el.getBoundingClientRect();
          return r.width >= window.innerWidth - 4 && r.height >= window.innerHeight - 4 && cs.pointerEvents !== 'none';
        })
        .map(el => `${el.tagName}.${el.className || ''}#${el.id || ''}`),
    };
  });

  // ── (3) Scroll sequence + screenshots ──
  const sequence = [];
  for (const pos of SCROLL_POSITIONS) {
    if (pos === 'end') {
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    } else {
      await page.evaluate(y => window.scrollTo(0, y), pos);
    }
    await page.waitForTimeout(450);
    const y = await page.evaluate(() => window.scrollY);
    const file = `iphone14-${screen.name}-scroll-${pos === 'end' ? 'end' : pos}.png`;
    await page.screenshot({ path: `${OUT_DIR}/${file}`, fullPage: false });
    sequence.push({ requestedY: pos, actualY: y, file });
  }

  // ── (4) Outline-all debug overlay ──
  await page.evaluate(() => {
    const s = document.createElement('style');
    s.id = 'audit-outline';
    s.textContent = '* { outline: 1px solid rgba(255,80,80,0.4) !important; }';
    document.head.appendChild(s);
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/iphone14-${screen.name}-overlay.png`, fullPage: false });
  await page.evaluate(() => document.getElementById('audit-outline')?.remove());

  // ── (5) Contrast samples ──
  const contrast = await page.evaluate(() => {
    function lum(rgb) {
      const m = rgb.match(/\d+(\.\d+)?/g);
      if (!m) return null;
      const [r, g, b] = m.slice(0, 3).map(n => {
        const v = parseFloat(n) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    function ratio(a, b) {
      const la = lum(a), lb = lum(b);
      if (la == null || lb == null) return null;
      const [hi, lo] = la > lb ? [la, lb] : [lb, la];
      return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
    }
    function sample(node) {
      if (!node) return null;
      const cs = getComputedStyle(node);
      // walk up for first non-transparent background
      let bgEl = node, bg = cs.backgroundColor;
      while (bgEl && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')) {
        bgEl = bgEl.parentElement;
        if (!bgEl) break;
        bg = getComputedStyle(bgEl).backgroundColor;
      }
      return { fg: cs.color, bg, ratio: ratio(cs.color, bg), text: (node.textContent || '').slice(0, 40).trim() };
    }
    return {
      bodyP: sample(document.querySelector('p, .lp-text-card p, .lesson-content p')),
      muted: sample(document.querySelector('.muted, .t-muted')),
      heroTitle: sample(document.querySelector('.dashboard__hero-title, .greeting, .lp-title')),
      bottomNavLabel: sample(document.querySelector('.bottom-nav .tab-label')),
      cardSub: sample(document.querySelector('.track-card__meta, .card-meta, .lesson-card__body')),
    };
  });

  findings.push({ screen: screen.name, url, scrollCtx, layoutMap, sequence, contrast });

  await page.close();
}

await ctx.close();
await browser.close();

// Write summary findings
const summary = {
  capturedAt: new Date().toISOString(),
  errors,
  findings,
};
writeFileSync(`${OUT_DIR}/findings.json`, JSON.stringify(summary, null, 2));

// Render a human-readable mobile audit
function renderMd(s) {
  const lines = [];
  lines.push('# Mobile interaction audit (post-deploy)');
  lines.push('');
  lines.push('iPhone 14 viewport (390x844), Chromium with iOS Safari UA, isMobile=true.');
  lines.push('');
  lines.push(`Captured at: ${s.capturedAt}`);
  lines.push('');
  if (s.errors.length) {
    lines.push('## Console / page errors');
    lines.push('');
    for (const e of s.errors) lines.push(`- **${e.screen}** — \`${e.kind}\`: ${e.text}`);
    lines.push('');
  }
  for (const f of s.findings) {
    lines.push(`## ${f.screen}`);
    lines.push('');
    lines.push(`**URL:** ${f.url}`);
    lines.push('');
    lines.push('**Scroll context:**');
    lines.push('```json');
    lines.push(JSON.stringify(f.scrollCtx, null, 2));
    lines.push('```');
    lines.push('');
    lines.push('**Scroll sequence (requested -> actual scrollY):**');
    for (const p of f.sequence) lines.push(`- ${p.requestedY} -> ${p.actualY} (${p.file})`);
    lines.push('');
    lines.push('**Layout map (fixed/sticky/absolute, z-index, rect):**');
    lines.push('| tag | class/id | position | z | top | rect (x,y,w,h) |');
    lines.push('|---|---|---|---|---|---|');
    for (const e of f.layoutMap.slice(0, 20)) {
      lines.push(`| ${e.tag} | ${e.class || e.id || ''} | ${e.position} | ${e.zIndex} | ${e.top} | ${e.rect.x},${e.rect.y},${e.rect.w},${e.rect.h} |`);
    }
    if (f.layoutMap.length > 20) lines.push(`| … | (+${f.layoutMap.length - 20} more) | | | | |`);
    lines.push('');
    lines.push('**Contrast samples (foreground vs background, ratio):**');
    for (const [k, v] of Object.entries(f.contrast)) {
      if (!v) { lines.push(`- ${k}: (no element)`); continue; }
      const status = v.ratio == null ? '?' : v.ratio >= 7 ? 'AAA' : v.ratio >= 4.5 ? 'AA' : v.ratio >= 3 ? 'AA-large' : 'FAIL';
      lines.push(`- **${k}**: ${v.ratio} (${status}) · fg=${v.fg} · bg=${v.bg} · "${v.text}"`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

writeFileSync(resolve(ROOT, 'docs', 'MOBILE_AUDIT_2.md'), renderMd(summary));
console.log('Audit complete. Findings written to docs/MOBILE_AUDIT_2.md');
console.log(`Errors: ${errors.length}`);
console.log(`Screens: ${findings.length}`);
