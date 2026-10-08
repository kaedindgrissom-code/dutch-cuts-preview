#!/usr/bin/env node
/**
 * Lighthouse budget gate. Runs mobile Lighthouse against a running server for the key
 * routes and fails if any score drops under the PRODUCT.md targets.
 *
 *   pnpm build && pnpm start -p 3000 &   then   node scripts/lighthouse-ci.mjs [baseUrl]
 *
 * Thresholds: performance >= 90, accessibility = 100, best-practices >= 95, SEO = 100, CLS <= 0.05.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const routes = ["/", "/barbers/brian-meyer", "/services"];
const min = { performance: 0.9, accessibility: 1, "best-practices": 0.95, seo: 1 };
const outDir = "qa/lighthouse/ci";
mkdirSync(outDir, { recursive: true });

let failed = false;
for (const route of routes) {
  const name = route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_/, "");
  const out = `${outDir}/${name}.json`;
  const args = [
    `${base}${route}`, "--quiet", "--output=json", `--output-path=${out}`,
    "--only-categories=performance,accessibility,best-practices,seo",
    "--form-factor=mobile", "--screenEmulation.mobile", "--throttling-method=simulate",
    `--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage`,
  ];
  const r = spawnSync("pnpm", ["exec", "lighthouse", ...args], { stdio: "inherit", env: process.env });
  if (r.status !== 0) { console.error(`lighthouse failed on ${route}`); failed = true; continue; }
  const lhr = JSON.parse(readFileSync(out, "utf8"));
  const scores = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, v.score]));
  const cls = lhr.audits["cumulative-layout-shift"]?.numericValue ?? 0;
  const lcp = lhr.audits["largest-contentful-paint"]?.numericValue ?? 0;
  const line = Object.entries(scores).map(([k, v]) => `${k}=${Math.round(v * 100)}`).join(" ");
  console.log(`${route}: ${line} CLS=${cls.toFixed(3)} LCP=${Math.round(lcp)}ms`);
  for (const [k, m] of Object.entries(min)) if ((scores[k] ?? 0) < m) { console.error(`  FAIL ${k} ${Math.round((scores[k] ?? 0) * 100)} < ${m * 100}`); failed = true; }
  if (cls > 0.05) { console.error(`  FAIL CLS ${cls} > 0.05`); failed = true; }
}
process.exit(failed ? 1 : 0);
