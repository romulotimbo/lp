/**
 * Refine an existing Q&A story JPG.
 * Usage:
 *   QNA_MODE=rim-frame QNA_INPUT=04-preview-g.jpg QNA_OUTPUT=04-source.jpg node scripts/refine-qna-story.mjs
 *   QNA_MODE=crop-shade QNA_INPUT=04-preview-d.jpg … (legado)
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qnaDir = path.join(root, "public/marketing/qna");
const mode = process.env.QNA_MODE ?? "rim-frame";
const inputName = process.env.QNA_INPUT ?? (mode === "rim-frame" ? "04-preview-g.jpg" : "04-preview-d.jpg");
const outputName = process.env.QNA_OUTPUT ?? "04-source.jpg";
const src = path.join(qnaDir, inputName);
const dest = path.join(qnaDir, outputName);
const framePx = Number(process.env.QNA_FRAME_PX ?? "5");
const accent = process.env.QNA_ACCENT ?? "0xC41E3A";

/** Split shadow (left) + rim + vignette — clima modelo/7.jpg, leve */
const SHADE_SPLIT =
  "format=yuv444p," +
  "geq=lum='if(lt(X,W*0.4),lum(X,Y)*(0.38+0.62*X/(W*0.4)),lum(X,Y))':cb='cb(X,Y)':cr='cr(X,Y)'";

const GRADE_TAIL =
  "eq=brightness=-0.04:contrast=1.12:saturation=0.56:gamma=1.05," +
  "colorbalance=rs=-0.09:gs=0:bs=0.03:rm=-0.05:gm=0:bm=0:rh=0.12:gh=-0.02:bh=-0.04," +
  "vignette=angle=PI/3.8:mode=forward";

/** Story 04: tighter crop — neck/chest tattoo only, sem braço cortado */
const CROP_04 = process.env.QNA_CROP ?? "crop=900:1780:120:70";

/** Menos rim vermelho no pescoço/abaixo do queixo + borda #C41E3A no frame 9:16 */
const VF_RIM_FRAME =
  "scale=1080:1920,format=yuv444p," +
  "split=2[base][tmp];" +
  "[tmp]crop=1080:780:0:620,eq=saturation=0.42,colorbalance=rh=-0.24:rs=-0.16:rm=-0.1:gh=0.04:bh=0.02[chin];" +
  "[base][chin]overlay=0:620[v];" +
  `[v]drawbox=x=0:y=0:w=iw:h=${framePx}:color=${accent}:t=fill,` +
  `drawbox=x=0:y=ih-${framePx}:w=iw:h=${framePx}:color=${accent}:t=fill,` +
  `drawbox=x=0:y=0:w=${framePx}:h=ih:color=${accent}:t=fill,` +
  `drawbox=x=iw-${framePx}:y=0:w=${framePx}:h=ih:color=${accent}:t=fill`;

const vf =
  mode === "crop-shade"
    ? `${CROP_04},scale=1080:1920,${SHADE_SPLIT},${GRADE_TAIL}`
    : VF_RIM_FRAME;

if (!fs.existsSync(src)) {
  console.error(`Missing input: ${src}`);
  process.exit(1);
}

fs.mkdirSync(qnaDir, { recursive: true });

console.log(`Refining ${inputName} → ${outputName}…`);
const enc = spawnSync(
  ffmpegPath,
  ["-y", "-i", src, "-vf", vf, "-frames:v", "1", "-update", "1", "-q:v", "4", "-map_metadata", "-1", dest],
  { stdio: "inherit" },
);
if (enc.status !== 0) process.exit(enc.status ?? 1);

try {
  await exiftool.write(dest, {}, ["-all=", "-overwrite_original"]);
} finally {
  await exiftool.end();
}

const kb = Math.round(fs.statSync(dest).size / 1024);
console.log(`Wrote ${dest} (${kb} KB)`);
