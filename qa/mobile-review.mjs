import { chromium, devices } from "@playwright/test";
const routes = ["/", "/barbers", "/barbers/dutch-claybaugh", "/services", "/gallery", "/visit"];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const [name, opts] of [["se", { ...devices["iPhone SE"], deviceScaleFactor: 1 }], ["m390", { ...devices["iPhone 14"], deviceScaleFactor: 1 }]]) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto("http://localhost:3000" + r, { waitUntil: "networkidle" });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await page.waitForLoadState("networkidle"); await page.waitForTimeout(400);
    const over = await page.evaluate(() => { const w = document.documentElement.clientWidth; return [...document.querySelectorAll("*")].filter(e => e.getBoundingClientRect().right > w + 1 && getComputedStyle(e).position !== "fixed").slice(0,5).map(e => e.tagName + "." + [...e.classList].slice(0,3).join(".")); });
    if (over.length) console.log(name, r, "OVERFLOW:", over);
    await page.screenshot({ path: `qa/review/${name}${r === "/" ? "-home" : r.replace(/\//g, "-")}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
