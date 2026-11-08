#!/usr/bin/env node
// Renders scripts/og-home.html to public/og/og-home-v4.png at 1200x630.
// Needs Google Chrome and a network connection (Google Fonts).
// Uses puppeteer-core if resolvable, else plain Chrome headless.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = pathToFileURL(join(root, "scripts", "og-home.html")).href;
const out = process.argv[2] ?? join(root, "public", "og", "og-home-v4.png");
const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let puppeteer = null;
for (const from of [
  join(root, "package.json"),
  "/Users/kiranpingali/Coding/atlas-tools/scripts/package.json",
]) {
  try {
    puppeteer = createRequire(from)("puppeteer-core");
    break;
  } catch {
    /* try next */
  }
}

if (puppeteer) {
  const b = await puppeteer.launch({ executablePath: chrome, headless: true });
  const p = await b.newPage();
  await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await p.goto(html, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await b.close();
} else {
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=5000",
    `--screenshot=${out}`,
    html,
  ]);
}
console.log(existsSync(out) ? `Wrote ${out}` : "FAILED");
