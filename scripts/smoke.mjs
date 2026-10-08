#!/usr/bin/env node
/**
 * Post-deploy smoke + link check against a LIVE host (lesson: verify the deployed site,
 * not the build — a deploy ships the whole branch, and the live crawl is what caught two
 * stray claims on bookediq.net on 2026-09-07).
 *
 *   node scripts/smoke.mjs https://dutchcuts.com            # full check
 *   node scripts/smoke.mjs https://preview.vercel.app --no-external
 *
 * Checks: every sitemap URL 200 + canonical matches + security headers; robots, llms.txt,
 * kb.json, OG image; claims gate on live HTML; every internal link resolves; every external
 * link (Booksy, Instagram, Maps) answers and each Booksy link still carries its business ID.
 * Exit 1 on any failure. No dependencies beyond Node 20.
 */
const base = (process.argv[2] || "").replace(/\/$/, "");
const noExternal = process.argv.includes("--no-external");
if (!/^https?:\/\//.test(base)) {
  console.error("usage: node scripts/smoke.mjs https://host [--no-external]");
  process.exit(2);
}

const banned = [
  /savannah bananas/i, /official barber(shop)? of/i, /#1 barber|number one|best barber(shop)? in savannah/i,
  /\b\d{2,3}\s?%\s?(more|increase|faster)/i, /guarantee/i, /award[- ]winning|voted best/i, /lacors/i, /"aggregateRating"/,
  /localhost:3000|lovable\.app/i,
];
const UA = "Mozilla/5.0 (compatible; DutchCutsSmoke/1.0; +https://bookediq.net)";
const failures = [];
const fail = (m) => failures.push(m);

async function get(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    return await fetch(url, { redirect: "follow", headers: { "user-agent": UA, accept: "text/html,*/*" }, signal: ctrl.signal, ...opts });
  } catch (e) {
    return { ok: false, status: 0, statusText: String(e), headers: new Headers(), text: async () => "", url };
  } finally {
    clearTimeout(t);
  }
}

// 1. sitemap
const sm = await get(`${base}/sitemap.xml`);
if (sm.status !== 200) fail(`sitemap.xml -> ${sm.status}`);
const smText = await sm.text();
const urls = [...smText.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail("sitemap has no URLs");
const liveHost = new URL(base).host;
const internal = new Set();
const external = new Set();

for (const u of urls) {
  const parsed = new URL(u);
  // On a preview host the sitemap still names the canonical domain; fetch the path on the live host.
  const res = await get(`${base}${parsed.pathname}`);
  if (res.status !== 200) { fail(`${parsed.pathname} -> ${res.status}`); continue; }
  const html = await res.text();
  const h = res.headers;
  if (h.get("x-content-type-options") !== "nosniff") fail(`${parsed.pathname}: missing nosniff`);
  if (!h.get("strict-transport-security")) fail(`${parsed.pathname}: missing HSTS`);
  if (h.get("x-powered-by")) fail(`${parsed.pathname}: x-powered-by leaks`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) fail(`${parsed.pathname}: no canonical`);
  else if (canonical.replace(/\/$/, "") !== u.replace(/\/$/, "")) fail(`${parsed.pathname}: canonical ${canonical} != sitemap ${u}`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail(`${parsed.pathname}: h1 count != 1`);
  if (!/<script type="application\/ld\+json">/.test(html)) fail(`${parsed.pathname}: no JSON-LD`);
  for (const re of banned) { const m = html.match(re); if (m) fail(`${parsed.pathname}: uncleared claim "${m[0]}"`); }
  for (const m of html.matchAll(/<a[^>]+href="([^"#]+)"/g)) {
    const href = m[1];
    if (href.startsWith("tel:") || href.startsWith("mailto:")) continue;
    if (href.startsWith("/")) internal.add(href);
    else if (/^https?:/.test(href)) {
      const hh = new URL(href).host;
      if (hh === liveHost || hh === parsed.host) internal.add(new URL(href).pathname);
      else external.add(href);
    }
  }
}

// 2. required endpoints
for (const p of ["/robots.txt", "/llms.txt", "/kb.json", "/opengraph-image", "/icon.svg"]) {
  const r = await get(`${base}${p}`);
  if (r.status !== 200) fail(`${p} -> ${r.status}`);
}
const robots = await (await get(`${base}/robots.txt`)).text();
if (!/sitemap:/i.test(robots)) fail("robots.txt has no Sitemap line");
if (/disallow:\s*\/\s*$/im.test(robots)) fail("robots.txt disallows the whole site");
try { const kb = await (await get(`${base}/kb.json`)).json(); if (!Array.isArray(kb.barbers) || !kb.barbers.length) fail("kb.json has no barbers"); } catch { fail("kb.json is not JSON"); }

// 3. internal links
for (const p of internal) {
  const r = await get(`${base}${p}`, { method: "HEAD" });
  if (r.status !== 200) fail(`internal link ${p} -> ${r.status}`);
}

// 4. external links
if (!noExternal) {
  for (const href of external) {
    const r = await get(href);
    // Some hosts (Instagram, TikTok) answer bots with 4xx; treat as a warning, not a failure.
    const booksy = /booksy\.com/.test(href);
    if (booksy) {
      if (r.status !== 200) { fail(`Booksy ${href} -> ${r.status}`); continue; }
      const id = href.match(/\/(\d+)_/)?.[1];
      const finalId = (r.url || "").match(/\/(\d+)_/)?.[1];
      if (id && finalId && id !== finalId) fail(`Booksy ${href} redirected to a different business (${finalId})`);
    } else if (r.status === 0 || r.status >= 500 || r.status === 404 || r.status === 410) {
      fail(`external ${href} -> ${r.status} ${r.statusText || ""}`.trim());
    } else if (r.status >= 400) {
      console.warn(`warn: external ${href} -> ${r.status} (bot-blocked host; verify by hand)`);
    }
  }
}

console.log(`smoke: ${urls.length} pages, ${internal.size} internal links, ${noExternal ? "external skipped" : `${external.size} external links`}`);
if (failures.length) {
  console.error(`smoke: FAILED (${failures.length})`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("smoke: OK");
