/**
 * Comprime 1–8.jpg do carrossel (Área Restrita) → 600×800 JPG, ≤120 KB.
 * Sobrescreve public/imagens/modelo/{n}.jpg in-place.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public/imagens/modelo");
const files = ["1", "2", "3", "4", "5", "6", "7", "8"];
const maxKb = 120;
const scale =
  "scale=600:800:force_original_aspect_ratio=increase,crop=600:800:(iw-600)/2:(ih-800)/2";

for (const n of files) {
  const src = path.join(dir, `${n}.jpg`);
  const tmp = path.join(dir, `${n}.tmp.jpg`);

  if (!fs.existsSync(src)) {
    console.error("Missing:", src);
    process.exit(1);
  }

  const before = Math.round(fs.statSync(src).size / 1024);
  let q = 5;
  let ok = false;

  for (let attempt = 0; attempt < 8; attempt++) {
    console.log(`${n}.jpg (q:v=${q})`);
    const enc = spawnSync(
      ffmpegPath,
      [
        "-y",
        "-i",
        src,
        "-vf",
        scale,
        "-q:v",
        String(q),
        "-frames:v",
        "1",
        "-update",
        "1",
        tmp,
      ],
      { stdio: "inherit" },
    );
    if (enc.status !== 0) process.exit(enc.status ?? 1);

    const kb = Math.round(fs.statSync(tmp).size / 1024);
    if (kb <= maxKb) {
      fs.renameSync(tmp, src);
      console.log(`OK ${n}.jpg — ${before} KB → ${kb} KB`);
      ok = true;
      break;
    }
    q += 1;
  }

  if (!ok) {
    fs.renameSync(tmp, src);
    const after = Math.round(fs.statSync(src).size / 1024);
    console.warn(`⚠ ${n}.jpg — ${after} KB (target ≤${maxKb} KB, melhor esforço)`);
  } else if (fs.existsSync(tmp)) {
    fs.unlinkSync(tmp);
  }
}
