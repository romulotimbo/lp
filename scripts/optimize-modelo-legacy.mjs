/**
 * Converte modelo/1–4.jpg (~1 MB) → WebP 600×800 para o vault.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public/imagens/modelo");
const files = ["1", "2", "3", "4"];
const maxKb = 150;

for (const n of files) {
  const src = path.join(dir, `${n}.jpg`);
  const dest = path.join(dir, `${n}.webp`);
  if (!fs.existsSync(src)) {
    console.error("Missing:", src);
    process.exit(1);
  }

  let q = 82;
  for (let attempt = 0; attempt < 6; attempt++) {
    console.log(`${n}.webp (q=${q})`);
    const enc = spawnSync(
      ffmpegPath,
      [
        "-y",
        "-i",
        src,
        "-vf",
        "scale=600:800:flags=lanczos",
        "-c:v",
        "libwebp",
        "-quality",
        String(q),
        "-frames:v",
        "1",
        dest,
      ],
      { stdio: "inherit" },
    );
    if (enc.status !== 0) process.exit(enc.status ?? 1);

    const kb = Math.round(fs.statSync(dest).size / 1024);
    if (kb <= maxKb) {
      console.log(`OK ${n}.webp — ${kb} KB`);
      break;
    }
    if (attempt === 5) {
      console.warn(`⚠ ${n}.webp — ${kb} KB (target ≤${maxKb} KB)`);
    } else {
      q -= 8;
    }
  }

  const before = Math.round(fs.statSync(src).size / 1024);
  const after = Math.round(fs.statSync(dest).size / 1024);
  console.log(`  ${before} KB jpg → ${after} KB webp`);
  fs.unlinkSync(src);
}
