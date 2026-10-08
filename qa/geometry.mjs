// Layout geometry audit: container symmetry, bleed, grid balance, overflow — per route × viewport.
import { chromium, devices } from "@playwright/test";
const routes = ["/", "/barbers", "/barbers/dutch-claybaugh", "/services", "/gallery", "/visit"];
const vps = { m375: { width: 375, height: 740 }, m390: { width: 390, height: 844 }, t768: { width: 768, height: 1024 }, l1024: { width: 1024, height: 768 }, d1440: { width: 1440, height: 900 } };
const base = process.env.BASE_URL || "http://localhost:3000";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const shoot = process.argv.includes("--shoot");
for (const [vn, vp] of Object.entries(vps)) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, hasTouch: vp.width < 800, isMobile: vp.width < 800 });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto(base + r, { waitUntil: "networkidle" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(res => setTimeout(res, 40)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(300);
    const rep = await p.evaluate(() => {
      const W = document.documentElement.clientWidth; const out = [];
      if (document.documentElement.scrollWidth > W + 1) out.push(`PAGE OVERFLOW scrollWidth=${document.documentElement.scrollWidth}`);
      const conts = [...document.querySelectorAll(".max-w-site")].filter(c => !c.closest("dialog"));
      const lefts = new Set();
      conts.forEach((c, i) => { const r = c.getBoundingClientRect(); const cs = getComputedStyle(c); const l = r.left + parseFloat(cs.paddingLeft), rt = W - (r.right - parseFloat(cs.paddingRight)); lefts.add(Math.round(l)); if (Math.abs(l - rt) > 1) out.push(`container#${i} asymmetric L=${l.toFixed(1)} R=${rt.toFixed(1)}`); });
      if (lefts.size > 1) out.push(`container content-left varies: ${[...lefts].join(",")}`);
      const cl = [...lefts][0];
      // elements poking outside the container content box (ignore full-bleed sections, fixed bars, dialogs)
      [...document.querySelectorAll("main h1,main h2,main h3,main p,main img,main table,main ul,main a,main button,main dl")].forEach(e => {
        if (e.closest("dialog,[data-bleed],.sticky-cta")) return; const r = e.getBoundingClientRect(); if (r.width === 0) return;
        if (r.left < cl - 1 || r.right > W - cl + 1) out.push(`bleed ${e.tagName.toLowerCase()}.${[...e.classList].slice(0,2).join(".")} L=${r.left.toFixed(0)} R=${(W - r.right).toFixed(0)} "${(e.textContent||"").trim().slice(0,25)}"`);
      });
      // grid rows: equal heights per row
      document.querySelectorAll("main .grid").forEach((g, gi) => {
        const kids = [...g.children].filter(k => k.getBoundingClientRect().height > 0); if (kids.length < 2) return;
        const rows = {}; kids.forEach(k => { const r = k.getBoundingClientRect(); const key = Math.round(r.top); (rows[key] ||= []).push(Math.round(r.height)); });
        Object.entries(rows).forEach(([top, hs]) => { if (hs.length > 1 && Math.max(...hs) - Math.min(...hs) > 2) out.push(`grid#${gi} row@${top} heights ${hs.join("/")}`); });
        const ws = kids.map(k => Math.round(k.getBoundingClientRect().width)); const byRow = {}; kids.forEach((k, i) => { const key = Math.round(k.getBoundingClientRect().top); (byRow[key] ||= []).push(ws[i]); });
        Object.entries(byRow).forEach(([top, w]) => { if (w.length > 1 && Math.max(...w) - Math.min(...w) > 2) out.push(`grid#${gi} row@${top} widths ${w.join("/")}`); });
      });
      // images: rendered aspect ratios inside .photo boxes
      const ratios = {}; document.querySelectorAll("main .photo").forEach(ph => { const r = ph.getBoundingClientRect(); if (!r.width) return; const k = (r.width / r.height).toFixed(2); ratios[k] = (ratios[k] || 0) + 1; });
      out.push(`photo ratios: ${JSON.stringify(ratios)}`);
      return out;
    });
    console.log(`\n== ${vn} ${r}`); rep.forEach(l => console.log("  " + l));
    if (shoot) await p.screenshot({ path: `qa/review/geo-${vn}${r === "/" ? "-home" : r.replace(/\//g, "-")}.png`, fullPage: true });
  }
  await ctx.close();
}
await b.close();
