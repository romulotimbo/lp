/**
 * B11 — Download and export testimonial avatars as 128×128 WebP.
 * Set AVATAR_URLS as JSON: {"01":"url",...} or edit `sources` below.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/imagens/avatars");

/** Magnific — R,C,D,M,L,A → 01–06 */
const sources = {
  "01":
    "https://pikaso.cdnpk.net/private/production/4465471623/render.jpg?token=exp=1780704000~hmac=f1cdeca66be633421e54e94b437442975d9c5b1fb7eed359931ac737ee033542",
  "02":
    "https://pikaso.cdnpk.net/private/production/4465473130/render.jpg?token=exp=1780704000~hmac=968d96d032fa9b8b33ed6dace548ef09791f2d3898a09bc31185cfb9a0deb1c1",
  "03":
    "https://pikaso.cdnpk.net/private/production/4465471497/render.jpg?token=exp=1780704000~hmac=9ce82a0d695a4d6a98a0a2006416b62eec2398950b8f4c063f0f8e6f2733a547",
  "04":
    "https://pikaso.cdnpk.net/private/production/4465473498/render.jpg?token=exp=1780704000~hmac=85bc05e45a3bef68927d2c5d649bb66bcd2a8d49ceaa35989ff55b55282738aa",
  "05":
    "https://pikaso.cdnpk.net/private/production/4465473579/render.jpg?token=exp=1780704000~hmac=774e0aadb5c6a35b64c0c9face7f6c39fc22a8cc47a1ff73437d067e7cd74c38",
  "06":
    "https://pikaso.cdnpk.net/private/production/4465473405/render.jpg?token=exp=1780704000~hmac=695a97b36aa5909652999d5d0be33f45289840d1cc2ba9bfb222299a3703dca9",
};

if (process.env.AVATAR_URLS) {
  Object.assign(sources, JSON.parse(process.env.AVATAR_URLS));
}

fs.mkdirSync(outDir, { recursive: true });

for (const [id, url] of Object.entries(sources)) {
  if (!url) {
    console.error("Missing URL for", id);
    process.exit(1);
  }
  const tmp = path.join(outDir, `_tmp_${id}.jpg`);
  const dest = path.join(outDir, `${id}.webp`);
  console.log("Import", dest);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(res.status, id);
    process.exit(1);
  }
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  const enc = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      tmp,
      "-vf",
      "scale=128:128:force_original_aspect_ratio=increase,crop=128:128",
      "-c:v",
      "libwebp",
      "-quality",
      "82",
      dest,
    ],
    { stdio: "inherit" },
  );
  fs.unlinkSync(tmp);
  if (enc.status !== 0) process.exit(enc.status ?? 1);
  console.log(`  → ${Math.round(fs.statSync(dest).size / 1024)} KB`);
}
