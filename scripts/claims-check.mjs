#!/usr/bin/env node
/**
 * Claims gate. Scans every pre-rendered HTML/JSON file in the production build for
 * strings the owner has not cleared (src/config/claims.ts). Exit 1 on any hit.
 *
 *   pnpm build && node scripts/claims-check.mjs
 *
 * Why the build output and not the source: JSON-LD, OG text and kb.json are assembled at
 * build time; grepping src misses them (bookediq.net had a fabricated figure living only in
 * FAQPage JSON-LD).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const buildDir = join(root, ".next", "server", "app");

// Keep in sync with src/config/claims.ts (plain JS so it runs without a TS toolchain in CI).
const banned = [
  [/savannah bananas/i, "Bananas affiliation unconfirmed"],
  [/official barber(shop)? of/i, "affiliation claim"],
  [/#1 barber|number one|best barber(shop)? in savannah/i, "superlative"],
  [/\b\d{2,3}\s?%\s?(more|increase|faster)/i, "unmeasured percentage"],
  [/guarantee/i, "guarantee"],
  [/award[- ]winning|voted best/i, "award claim"],
  [/lacors/i, "LaCors relationship unconfirmed"],
  [/"aggregateRating"/, "aggregateRating in JSON-LD"],
  [/lovable\.app|localhost:3000|vercel\.app/i, "staging host leaked into output"],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(html|body|json|txt|xml)$/.test(name) && !/\.(meta|rsc)$/.test(name)) out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(buildDir);
} catch {
  console.error(`claims-check: build output not found at ${buildDir}. Run \`pnpm build\` first.`);
  process.exit(2);
}

const hits = [];
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const [re, why] of banned) {
    const m = text.match(re);
    if (m) hits.push({ file: relative(root, f), match: m[0], why });
  }
}

if (hits.length) {
  console.error("claims-check: FAILED — uncleared claims in build output:");
  for (const h of hits) console.error(`  ${h.file}: "${h.match}" (${h.why})`);
  process.exit(1);
}
console.log(`claims-check: OK — ${files.length} files scanned, 0 uncleared claims.`);
