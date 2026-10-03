#!/usr/bin/env node
/*
 * Technical SEO check — dependency-free (Node 18+ fetch), so it runs in CI
 * and against any host. Crawls every URL in /sitemap.xml and checks what a
 * build or deploy can break: status, <html lang>, title/description,
 * canonical, hreflang, Open Graph, one <h1>, image alt, JSON-LD validity and
 * required fields, duplicate titles/descriptions, broken internal links,
 * robots.txt / sitemap / llms.txt, accidental noindex, and that every
 * legacy URL in redirects.json permanently redirects to its new page.
 *
 * It does not judge content quality — that's `/seo audit` (SEO-PROCESS.md).
 *
 *   node scripts/seo-check.mjs --base http://localhost:3000            # local build
 *   node scripts/seo-check.mjs --base https://www.example.com          # live site
 *   node scripts/seo-check.mjs --base <url> --site <canonical-origin> --out report.md
 *
 * --site defaults to NEXT_PUBLIC_SITE_URL, else to --base. Against a local
 * build it must be the origin the build canonicalises to (hotel.config.ts
 * siteUrl). Exits 1 on any Critical or High finding.
 */
import fs from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const BASE = (args.base || 'http://localhost:3000').replace(/\/$/, '');

const findings = []; // [severity, where, message]
const add = (sev, where, msg) => findings.push([sev, where, msg]);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
const metaContent = (html, key, val) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) if (attr(tag, key) === val) return decode(attr(tag, 'content') ?? '');
  return null;
};

async function get(url, init) {
  try {
    return await fetch(url, { redirect: 'follow', ...init });
  } catch (e) {
    return { ok: false, status: 0, text: async () => '', headers: new Headers(), error: e };
  }
}

// Canonical origin: --site, else NEXT_PUBLIC_SITE_URL, else whatever the
// homepage canonicalises to (a CI build with no env set uses the
// hotel.config.ts fallback) — every other URL must then agree with it.
async function detectSite() {
  const html = await (await get(`${BASE}/`)).text();
  const tag = (html.match(/<link\b[^>]*>/gi) ?? []).find((l) => attr(l, 'rel') === 'canonical');
  return tag ? new URL(attr(tag, 'href')).origin : BASE;
}
const SITE = (args.site || process.env.NEXT_PUBLIC_SITE_URL || (await detectSite())).replace(/\/$/, '');
const LIVE = BASE === SITE; // checking the real host: noindex there is Critical

// ——— robots.txt / sitemap.xml / llms.txt
const robotsRes = await get(`${BASE}/robots.txt`);
const robots = robotsRes.ok ? await robotsRes.text() : '';
if (!robotsRes.ok) add('High', 'robots.txt', `returned ${robotsRes.status}`);
else {
  if (!/^Sitemap:\s*\S+/im.test(robots)) add('High', 'robots.txt', 'no Sitemap line');
  if (/User-agent:\s*\*\s*[\r\n]+(?:(?:Allow|Crawl-delay):[^\n]*[\r\n]+)*Disallow:\s*\/\s*$/im.test(robots))
    add('Critical', 'robots.txt', 'disallows everything for User-agent: *');
}
const smRes = await get(`${BASE}/sitemap.xml`);
const sitemap = smRes.ok ? await smRes.text() : '';
if (!smRes.ok) add('Critical', 'sitemap.xml', `returned ${smRes.status}`);
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
const offHost = locs.filter((u) => !u.startsWith(SITE));
if (offHost.length) add('High', 'sitemap.xml', `${offHost.length}/${locs.length} URLs not on ${SITE} (e.g. ${offHost[0]}) — check NEXT_PUBLIC_SITE_URL`);
if (smRes.ok && !locs.length) add('Critical', 'sitemap.xml', 'no <loc> entries');
const llms = await get(`${BASE}/llms.txt`);
if (!llms.ok) add('Medium', 'llms.txt', `returned ${llms.status}`);

// ——— every sitemap page
const paths = [...new Set(locs.map((u) => new URL(u).pathname.replace(/\/$/, '') || '/'))];
const titles = new Map();
const descs = new Map();
const internal = new Set();
const rows = [];

for (const path of paths) {
  const res = await get(BASE + path);
  if (!res.ok) {
    add('Critical', path, `returned ${res.status}`);
    continue;
  }
  const html = await res.text();
  const xRobots = res.headers.get('x-robots-tag');
  const head = html.slice(0, html.indexOf('</head>') + 7 || undefined);
  const title = decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const desc = metaContent(head, 'name', 'description');
  const robotsMeta = metaContent(head, 'name', 'robots');
  const links = head.match(/<link\b[^>]*>/gi) ?? [];
  const canonical = links.map((l) => (attr(l, 'rel') === 'canonical' ? attr(l, 'href') : null)).find(Boolean);
  const hreflangs = links.filter((l) => attr(l, 'rel') === 'alternate').map((l) => attr(l, 'hreflang') ?? attr(l, 'hrefLang')).filter(Boolean);
  const lang = html.match(/<html\b[^>]*\slang="([^"]+)"/i)?.[1];
  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const noAlt = imgs.filter((t) => !/\salt=/i.test(t)).length;
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      return { '@type': 'INVALID' };
    }
  });
  for (const m of html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/gi)) if (!m[1].startsWith('//')) internal.add(m[1]);

  if (LIVE && ((robotsMeta && /noindex/i.test(robotsMeta)) || (xRobots && /noindex/i.test(xRobots))))
    add('Critical', path, `noindex on the live host (${robotsMeta ?? xRobots})`);
  else if (robotsMeta && /noindex/i.test(robotsMeta)) add('High', path, `robots meta: ${robotsMeta}`);
  if (!lang) add('High', path, 'no <html lang>');
  if (!/<meta\b[^>]*name="viewport"/i.test(head)) add('High', path, 'no viewport meta');
  if (!title) add('High', path, 'no <title>');
  else if (title.length < 20 || title.length > 65) add('Medium', path, `title ${title.length} chars: "${title}"`);
  if (!desc) add('High', path, 'no meta description');
  else if (desc.length < 70 || desc.length > 165) add('Low', path, `meta description ${desc.length} chars`);
  const expected = SITE + (path === '/' ? '' : path);
  if (!canonical) add('High', path, 'no canonical');
  else if (canonical.replace(/\/$/, '') !== expected) add('High', path, `canonical ${canonical} ≠ ${expected}`);
  if (hreflangs.length && !hreflangs.includes('x-default')) add('Low', path, 'hreflang set without x-default');
  for (const k of ['title', 'description', 'image', 'url']) if (!metaContent(head, 'property', `og:${k}`)) add('Medium', path, `no og:${k}`);
  if (!metaContent(head, 'name', 'twitter:card')) add('Low', path, 'no twitter:card');
  if (h1 !== 1) add('High', path, `${h1} <h1> elements (want exactly 1)`);
  if (noAlt) add('Medium', path, `${noAlt}/${imgs.length} <img> without an alt attribute`);
  const types = [];
  for (const j of ld.flatMap((x) => (Array.isArray(x) ? x : x['@graph'] ?? [x]))) {
    const t = j['@type'];
    types.push(t);
    if (t === 'INVALID') add('High', path, 'JSON-LD does not parse');
    if (t === 'Hotel') for (const k of ['name', 'address', 'telephone', 'image', 'url']) if (!j[k]) add('High', path, `Hotel schema missing ${k}`);
    if (t === 'Hotel' && j.checkinTime && !/^\d{2}:\d{2}(:\d{2})?$/.test(j.checkinTime)) add('Medium', path, `checkinTime not ISO: ${j.checkinTime}`);
    if (t === 'HotelRoom' && !j.name) add('Medium', path, 'HotelRoom missing name');
    if (t === 'BlogPosting') for (const k of ['headline', 'datePublished', 'author', 'image']) if (!j[k]) add('Medium', path, `BlogPosting missing ${k}`);
    if (t === 'FAQPage') add('Medium', path, 'FAQPage schema present — retired by Google, remove (AGENTS.md §5)');
    if (j.aggregateRating && !j.review) add('Low', path, 'aggregateRating present — confirm it reflects genuine, verifiable reviews');
  }
  // Duplicates only count within a locale — an untranslated page falling
  // back to the default locale's copy is intended (AGENTS.md §9).
  const loc = `${lang}|`;
  if (titles.has(loc + title)) add('Medium', path, `duplicate title with ${titles.get(loc + title)}`);
  else titles.set(loc + title, path);
  if (desc) {
    if (descs.has(loc + desc)) add('Medium', path, `duplicate description with ${descs.get(loc + desc)}`);
    else descs.set(loc + desc, path);
  }
  rows.push({ path, title: title.length, desc: (desc ?? '').length, ld: types.join(',') });
}

// ——— OG image + internal links
const ogRes = await get(`${BASE}${paths.find((p) => p !== '/') ?? ''}/opengraph-image`);
if (!ogRes.ok) add('Medium', 'opengraph-image', `returned ${ogRes.status}`);
for (const href of internal) {
  const r = await get(BASE + href, { redirect: 'manual' });
  if (r.status >= 400 || r.status === 0) add('High', 'links', `broken internal link ${href} → ${r.status}`);
}

// ——— legacy redirects (redirects.json): each old URL must 301/308 to its new page
const mapFile = new URL('../redirects.json', import.meta.url);
const legacy = fs.existsSync(mapFile) ? JSON.parse(fs.readFileSync(mapFile, 'utf8')).redirects ?? [] : [];
for (const { source, destination } of legacy) {
  const r = await get(BASE + source, { redirect: 'manual' });
  const to = r.headers.get('location') ?? '';
  if (![301, 308].includes(r.status)) add('High', 'redirects', `${source} → ${r.status}, expected a permanent redirect to ${destination}`);
  else if (new URL(to, BASE).pathname !== new URL(destination, BASE).pathname) add('High', 'redirects', `${source} redirects to ${to}, expected ${destination}`);
}

// ——— report
const order = ['Critical', 'High', 'Medium', 'Low'];
findings.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
const count = (s) => findings.filter((f) => f[0] === s).length;
const report = [
  `# SEO check — ${BASE}`,
  '',
  `Canonical origin: ${SITE} · pages: ${paths.length} · internal links: ${internal.size} · legacy redirects: ${legacy.length} · ${new Date().toISOString().slice(0, 10)}`,
  '',
  `**Critical ${count('Critical')} · High ${count('High')} · Medium ${count('Medium')} · Low ${count('Low')}**`,
  '',
  ...(findings.length ? findings.map(([s, w, m]) => `- [${s}] \`${w}\` — ${m}`) : ['No findings.']),
  '',
  '| Page | Title | Desc | JSON-LD |',
  '|---|---|---|---|',
  ...rows.map((r) => `| ${r.path} | ${r.title} | ${r.desc} | ${r.ld} |`),
  '',
].join('\n');

if (args.out) fs.writeFileSync(args.out, report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
console.log(report);
process.exit(count('Critical') + count('High') > 0 ? 1 : 0);
