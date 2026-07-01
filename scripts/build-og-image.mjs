/**
 * B12 — Composite OG image 1200×630 (pote + tipografia).
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bottle = path.join(root, "public/imagens/1 POTE.png");
const fontBold = path.join(root, "scripts/fonts/BarlowCondensed-Bold.ttf");
const fontReg = path.join(root, "scripts/fonts/Barlow-Regular.ttf");
const dest = path.join(root, "public/og-image.jpg");

for (const f of [bottle, fontBold, fontReg]) {
  if (!fs.existsSync(f)) {
    console.error("Missing:", f);
    process.exit(1);
  }
}

function escFont(p) {
  return p.replace(/\\/g, "/").replace(/:/g, "\\:");
}

const fb = escFont(fontBold);
const fr = escFont(fontReg);

const filter = [
  "[1:v]scale=480:-1,format=rgba[bot]",
  "[0:v][bot]overlay=x=W-w-100:y=(H-h)/2[v1]",
  `[v1]drawtext=fontfile='${fb}':text='ENERGI POWER':fontsize=68:fontcolor=0xD1D5DB:x=72:y=H/2-100[v2]`,
  `[v2]drawtext=fontfile='${fr}':text='BY VEE':fontsize=34:fontcolor=0xC41E3A:x=72:y=H/2-24[v3]`,
  `[v3]drawtext=fontfile='${fr}':text='Estimulante 100%% natural':fontsize=26:fontcolor=0x52525B:x=72:y=H/2+28[v4]`,
  "[v4]drawbox=x=0:y=0:w=iw:h=6:color=0xC41E3A@0.9:t=fill[v5]",
  "[v5]drawbox=x=0:y=ih-6:w=iw:h=6:color=0xC41E3A@0.5:t=fill",
].join(";");

console.log("Building OG image:", dest);
const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-f",
    "lavfi",
    "-i",
    "color=c=#050505:s=1200x630",
    "-i",
    bottle,
    "-filter_complex",
    filter,
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "3",
    dest,
  ],
  { stdio: "inherit", cwd: root },
);

if (enc.status !== 0) process.exit(enc.status ?? 1);
console.log(`Done (${Math.round(fs.statSync(dest).size / 1024)} KB)`);
