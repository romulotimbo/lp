/**
 * Build B8 manifesto watermark WebP from Magnific PNG (cut-out via colorkey).
 * Pass SOURCE_URL or uses default creation export.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSource = path.join(
  root,
  "public/imagens/modelo/magnific_xgoxlr1jfW.png",
);
const dest = path.join(root, "public/imagens/vee-manifesto-watermark.webp");
const tmpPng = path.join(root, "public/imagens/_tmp_watermark.png");

const sourceUrl = process.env.B8_SOURCE_URL;

async function loadSource() {
  if (sourceUrl) {
    console.log("Downloading Magnific export…");
    const res = await fetch(sourceUrl);
    if (!res.ok) {
      console.error(res.status);
      process.exit(1);
    }
    return Buffer.from(await res.arrayBuffer());
  }
  if (!fs.existsSync(defaultSource)) {
    console.error("Missing source:", defaultSource);
    process.exit(1);
  }
  console.log("Using local portrait:", defaultSource);
  return fs.readFileSync(defaultSource);
}

const buf = await loadSource();
fs.writeFileSync(tmpPng, buf);

console.log("Export 1200×1600 WebP (desaturated, soft alpha)…");
const vf = [
  "scale=1200:1600:force_original_aspect_ratio=decrease",
  "format=rgba",
  "pad=1200:1600:(ow-iw)/2:(oh-ih)/2:color=0x00000000",
  "eq=saturation=0.2:brightness=-0.05:contrast=0.92",
  "gblur=sigma=0.6",
].join(",");

const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    tmpPng,
    "-vf",
    vf,
    "-c:v",
    "libwebp",
    "-quality",
    "82",
    dest,
  ],
  { stdio: "inherit" },
);

fs.unlinkSync(tmpPng);
if (enc.status !== 0) process.exit(enc.status ?? 1);

const kb = Math.round(fs.statSync(dest).size / 1024);
console.log(`Wrote ${dest} (${kb} KB)`);
