/**
 * Import model sheet image (Magnific → public/imagens/modelo/model sheet/).
 * Usage:
 *   MODELO_SHEET_NAME=face-01 MODELO_SHEET_SOURCE_URL="https://..." node scripts/import-modelo-sheet.mjs
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = process.env.MODELO_SHEET_NAME;
const url = process.env.MODELO_SHEET_SOURCE_URL;
const outDir = path.join(root, "public/imagens/modelo/model sheet");
const dest = path.join(outDir, `${name}.jpg`);
const tmp = path.join(outDir, `_tmp_${name}.jpg`);

if (!name || !url) {
  console.error("Set MODELO_SHEET_NAME and MODELO_SHEET_SOURCE_URL");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

console.log(`Downloading model sheet: ${name}…`);
const res = await fetch(url);
if (!res.ok) {
  console.error(res.status);
  process.exit(1);
}
fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));

console.log("Export 1024×1024 JPG…");
const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    tmp,
    "-vf",
    "scale=1024:1024:force_original_aspect_ratio=increase,crop=1024:1024",
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "3",
    "-map_metadata",
    "-1",
    dest,
  ],
  { stdio: "inherit" },
);
fs.unlinkSync(tmp);
if (enc.status !== 0) process.exit(enc.status ?? 1);

try {
  await exiftool.write(dest, {}, ["-all=", "-overwrite_original"]);
} finally {
  await exiftool.end();
}

const kb = Math.round(fs.statSync(dest).size / 1024);
console.log(`Wrote ${dest} (${kb} KB)`);
