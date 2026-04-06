#!/usr/bin/env node
/**
 * Writes public/og-image.png (1200×630) from public/og-export.html via Chrome headless.
 * Falls back to rasterizing scripts/og-image.svg with sharp if Chrome is unavailable.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "public", "og-export.html");
const svgPath = join(root, "scripts", "og-image.svg");
const outPath = join(root, "public", "og-image.png");

function findChrome() {
  const env = process.env.CHROME_PATH;
  if (env && existsSync(env)) return env;

  if (process.platform === "darwin") {
    const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    if (existsSync(mac)) return mac;
    const chromium = "/Applications/Chromium.app/Contents/MacOS/Chromium";
    if (existsSync(chromium)) return chromium;
  }

  for (const name of [
    "google-chrome-stable",
    "google-chrome",
    "chromium",
    "chromium-browser",
  ]) {
    try {
      const p = execFileSync("which", [name], { encoding: "utf8" }).trim();
      if (p && existsSync(p)) return p;
    } catch {
      /* continue */
    }
  }

  if (process.platform === "win32") {
    const win = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    if (existsSync(win)) return win;
  }

  return null;
}

function exportWithChrome() {
  const chrome = findChrome();
  if (!chrome) return false;
  const url = pathToFileURL(htmlPath).href;
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    `--screenshot=${outPath}`,
    url,
  ];
  try {
    execFileSync(chrome, args, { stdio: "inherit" });
  } catch {
    try {
      execFileSync(chrome, [
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        `--screenshot=${outPath}`,
        url,
      ], { stdio: "inherit" });
    } catch {
      return false;
    }
  }
  return existsSync(outPath);
}

async function exportWithSharp() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    return false;
  }
  if (!existsSync(svgPath)) return false;
  const svg = readFileSync(svgPath);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  return existsSync(outPath);
}

async function main() {
  if (!existsSync(htmlPath)) {
    console.error("Missing", htmlPath);
    process.exit(1);
  }

  if (exportWithChrome()) {
    console.log("Wrote", outPath, "(Chrome headless)");
    return;
  }
  if (await exportWithSharp()) {
    console.log("Wrote", outPath, "(sharp + scripts/og-image.svg)");
    return;
  }

  console.error(
    "Could not export og-image.png. Install Chrome or set CHROME_PATH, or: npm install sharp",
  );
  process.exit(1);
}

await main();
