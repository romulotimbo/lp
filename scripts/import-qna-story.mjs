/**
 * Import Q&A campaign story source image (Magnific → public/marketing/qna/).
 * Usage: QNA_STORY=01 QNA_SOURCE_URL="https://..." node scripts/import-qna-story.mjs
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storyId = process.env.QNA_STORY ?? "01";
const url = process.env.QNA_SOURCE_URL;
const grade = process.env.QNA_GRADE ?? "";
const outDir = path.join(root, "public/marketing/qna");
const dest = process.env.QNA_OUT
  ? path.join(outDir, process.env.QNA_OUT)
  : path.join(outDir, `${storyId}-source.jpg`);
const tmp = path.join(outDir, `_tmp_${storyId}.jpg`);

/** Clima vault / modelo/7 — escuro + rim vermelho (forte) */
const GRADE_VAULT =
  "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920," +
  "eq=brightness=-0.15:contrast=1.14:saturation=0.55," +
  "colorbalance=rs=-0.1:gs=0:bs=0.04:rm=-0.06:gm=0:bm=0:rh=0.1:gh=-0.02:bh=-0.04," +
  "vignette=angle=PI/3.5:mode=forward";

/** Vault suave — silhueta legível, mantém rim vermelho */
const GRADE_VAULT_SOFT =
  "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920," +
  "eq=brightness=-0.04:contrast=1.08:saturation=0.62:gamma=1.06," +
  "colorbalance=rs=-0.06:gs=0:bs=0.02:rm=-0.03:gm=0:bm=0:rh=0.08:gh=-0.01:bh=-0.03," +
  "vignette=angle=PI/5:mode=forward";

/** Vault + rim vermelho forte — mais escuro que soft, clima blood-red */
const GRADE_VAULT_RED =
  "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920," +
  "eq=brightness=-0.11:contrast=1.12:saturation=0.56:gamma=1.0," +
  "colorbalance=rs=-0.14:gs=-0.02:bs=0.05:rm=-0.08:gm=-0.02:bm=0.02:rh=0.16:gh=-0.04:bh=-0.05," +
  "vignette=angle=PI/4:mode=forward";

const GRADES = {
  vault: GRADE_VAULT,
  "vault-soft": GRADE_VAULT_SOFT,
  "vault-red": GRADE_VAULT_RED,
};

const vf =
  GRADES[grade] ?? "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920";

if (!url) {
  console.error("Set QNA_SOURCE_URL to Magnific render URL");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

console.log(`Downloading Q&A story ${storyId}…`);
const res = await fetch(url);
if (!res.ok) {
  console.error(res.status);
  process.exit(1);
}
fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));

console.log("Export 1080×1920 JPG…");
const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    tmp,
    "-vf",
    vf,
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "4",
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
if (kb > 400) console.warn(`⚠ exceeds 400 KB target (${kb} KB)`);
