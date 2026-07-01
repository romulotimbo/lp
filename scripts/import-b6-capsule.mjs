/**
 * Import B6 macro capsule PNG (cut-out) into public/imagens.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const url =
  "https://pikaso.cdnpk.net/private/production/4465275200/render.png?token=exp=1780704000~hmac=b38ffe8e002a93fafbb9934a8ce9e73532c9b34a4d64d7591d1f189e089de6f0";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "public/imagens/1 POTE CAPSULA.png");
const tmp = path.join(root, "public/imagens/_tmp_capsule.png");

console.log("Downloading cut-out…");
const res = await fetch(url);
if (!res.ok) {
  console.error(res.status);
  process.exit(1);
}
fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));

console.log("Resize 800×800 PNG…");
const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    tmp,
    "-vf",
    "scale=800:800:force_original_aspect_ratio=decrease,format=rgba,pad=800:800:(ow-iw)/2:(oh-ih)/2:color=0x00000000",
    "-compression_level",
    "9",
    dest,
  ],
  { stdio: "inherit" },
);
fs.unlinkSync(tmp);
if (enc.status !== 0) process.exit(enc.status ?? 1);

const kb = Math.round(fs.statSync(dest).size / 1024);
console.log(`Wrote ${dest} (${kb} KB)`);
