/**
 * Fallback textures for Power Grid (when Magnific unavailable).
 * Stylizes vault thumbs → abstract 960×720 WebP.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/imagens/power");
const modelo = path.join(root, "public/imagens/modelo");

const jobs = [
  {
    out: "forca",
    src: path.join(modelo, "5.jpg"),
    vf: "scale=960:720:force_original_aspect_ratio=increase,crop=960:720,eq=brightness=-0.35:contrast=1.2:saturation=0.45,colorbalance=rs=0.12:gs=-0.04:bs=-0.06,boxblur=6:2,vignette=PI/4",
  },
  {
    out: "vitalidade",
    src: path.join(modelo, "6.jpg"),
    vf: "scale=960:720:force_original_aspect_ratio=increase,crop=960:720,eq=brightness=-0.4:contrast=1.15:saturation=0.35,colorbalance=rs=0.15:gs=-0.02:bs=-0.05,boxblur=8:3,vignette=PI/3",
  },
  {
    out: "energia",
    src: path.join(modelo, "7.jpg"),
    vf: "scale=960:720:force_original_aspect_ratio=increase,crop=960:720,eq=brightness=-0.32:contrast=1.25:saturation=0.5,colorbalance=rs=0.18:gs=-0.03:bs=-0.08,boxblur=5:2,vignette=PI/4",
  },
  {
    out: "desempenho",
    src: path.join(modelo, "8.jpg"),
    vf: "scale=960:720:force_original_aspect_ratio=increase,crop=960:720,eq=brightness=-0.38:contrast=1.18:saturation=0.4,colorbalance=rs=0.1:gs=0:bs=-0.04,boxblur=7:2,vignette=PI/4",
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { out, src, vf } of jobs) {
  if (!fs.existsSync(src)) {
    console.error("Missing:", src);
    process.exit(1);
  }
  const dest = path.join(outDir, `${out}.webp`);
  console.log(out, "←", path.basename(src));
  const enc = spawnSync(
    ffmpegPath,
    ["-y", "-i", src, "-vf", vf, "-c:v", "libwebp", "-quality", "80", dest],
    { stdio: "inherit" },
  );
  if (enc.status !== 0) process.exit(enc.status ?? 1);
  console.log(`  ${Math.round(fs.statSync(dest).size / 1024)} KB`);
}
