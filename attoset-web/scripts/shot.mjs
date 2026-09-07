/**
 * Screenshot tool for the Attoset site — the visual-verify step of the
 * `site-edit` skill. Replaces the pile of one-off scripts/verify*.mjs files.
 *
 *   node scripts/shot.mjs                              # all pages, 1440 + 390
 *   node scripts/shot.mjs --page features               # one page
 *   node scripts/shot.mjs --page home,pricing --w 1440  # some pages, one width
 *   node scripts/shot.mjs --page home --sel "#security" # just that element
 *   node scripts/shot.mjs --page home --out screenshots/cta
 *   node scripts/shot.mjs --port 3100 --overflow        # + horizontal-overflow report
 *
 * Page names are route slugs: home features pricing about contact.
 * (Use --page, not a bare "/..." argument — Git Bash on Windows rewrites those.)
 *
 * Needs a running server (`npm run dev`, or `npm run build && npm run start`).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

const ALL = ["/", "/features", "/pricing", "/about", "/contact"];
const toRoute = (name) => {
  const slug = name.trim().replace(/^\/+/, "");
  return !slug || slug === "home" ? "/" : `/${slug}`;
};
const picked = flag("page", null);
const PAGES = picked ? String(picked).split(",").map(toRoute) : ALL;
const WIDTHS = String(flag("w", "1440,390")).split(",").map(Number);
const SEL = flag("sel", null);
const OUT = flag("out", "screenshots/latest");
const PORT = flag("port", "3000");
const BASE = `http://localhost:${PORT}`;
const FULL = !has("no-full") && !SEL;

mkdirSync(OUT, { recursive: true });

try {
  await fetch(BASE, { method: "HEAD" });
} catch {
  console.error(`No server on ${BASE}. Start one: npm run dev  (or --port <n>)`);
  process.exit(1);
}

const browser = await chromium.launch();
const report = [];

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: width < 700 ? 2 : 1,
  });
  const page = await ctx.newPage();

  for (const path of PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

    // Scroll the whole page so IntersectionObserver Reveals have fired,
    // then return to the top before shooting.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.4);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 200));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 500));
    });
    await page.waitForTimeout(600);

    const slug = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
    const file = `${OUT}/${slug}-${width}${SEL ? "-el" : ""}.png`;

    if (SEL) {
      const el = page.locator(SEL).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await el.screenshot({ path: file });
    } else {
      await page.screenshot({ path: file, fullPage: FULL });
    }
    console.log(file);

    if (has("overflow")) {
      const found = await page.evaluate((vw) => {
        const seen = new Map();
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || r.right <= vw + 1.5) continue;
          const cls = String(el.className || "").slice(0, 80);
          const k = el.tagName + "|" + cls;
          if (!seen.has(k) || seen.get(k).right < r.right)
            seen.set(k, { tag: el.tagName.toLowerCase(), cls, right: Math.round(r.right) });
        }
        return {
          docOverflow:
            document.documentElement.scrollWidth - document.documentElement.clientWidth,
          offenders: [...seen.values()].sort((a, b) => b.right - a.right).slice(0, 6),
        };
      }, width);
      report.push({ path, width, ...found });
    }
  }
  await ctx.close();
}

await browser.close();
if (report.length) console.log(JSON.stringify(report, null, 2));
