/**
 * Import B10 Vee portrait fallback (1080×1350 JPG).
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "public/imagens/vee-portrait.jpg");
const tmp = path.join(root, "public/imagens/_tmp_portrait.jpg");

const url = process.env.B10_SOURCE_URL;
if (!url) {
  console.error("Set B10_SOURCE_URL to Magnific render URL");
  process.exit(1);
}

console.log("Downloading…");
const res = await fetch(url);
if (!res.ok) {
  console.error(res.status);
  process.exit(1);
}
fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));

console.log("Export 1080×1350 JPG…");
const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    tmp,
    "-vf",
    "scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350",
    "-q:v",
    "4",
    dest,
  ],
  { stdio: "inherit" },
);
fs.unlinkSync(tmp);
if (enc.status !== 0) process.exit(enc.status ?? 1);

const kb = Math.round(fs.statSync(dest).size / 1024);
console.log(`Wrote ${dest} (${kb} KB)`);
