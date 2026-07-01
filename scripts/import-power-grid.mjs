/**
 * Import Magnific power-grid textures → public/imagens/power/*.webp
 *
 * Usage:
 *   node scripts/import-power-grid.mjs
 * Or with env map:
 *   POWER_URLS=forca:URL,vitalidade:URL,... node scripts/import-power-grid.mjs
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/imagens/power");

/** Paste URLs from Magnific after generation */
const defaults = {
  forca: process.env.POWER_FORCA_URL ?? "",
  vitalidade: process.env.POWER_VITALIDADE_URL ?? "",
  energia: process.env.POWER_ENERGIA_URL ?? "",
  desempenho: process.env.POWER_DESEMPENHO_URL ?? "",
};

fs.mkdirSync(outDir, { recursive: true });

async function download(name, url) {
  if (!url) {
    console.warn(`Skip ${name}: no URL`);
    return false;
  }
  const tmp = path.join(outDir, `_tmp_${name}`);
  const dest = path.join(outDir, `${name}.webp`);
  console.log("Downloading", name);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(res.status, name);
    return false;
  }
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  const enc = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      tmp,
      "-vf",
      "scale=960:720:force_original_aspect_ratio=increase,crop=960:720",
      "-c:v",
      "libwebp",
      "-quality",
      "82",
      dest,
    ],
    { stdio: "inherit" },
  );
  fs.unlinkSync(tmp);
  if (enc.status !== 0) return false;
  console.log(`  → ${dest} (${Math.round(fs.statSync(dest).size / 1024)} KB)`);
  return true;
}

let ok = 0;
for (const [name, url] of Object.entries(defaults)) {
  if (await download(name, url)) ok += 1;
}

if (ok === 0) {
  console.error(
    "No images imported. Set POWER_FORCA_URL, POWER_VITALIDADE_URL, POWER_ENERGIA_URL, POWER_DESEMPENHO_URL",
  );
  process.exit(1);
}

console.log(`Done: ${ok}/4 textures`);
