/**
 * Upscale Reels source to 1080×1920 and strip metadata for Instagram publish.
 * Usage: node scripts/prepare-reels-publish.mjs
 * Env: REELS_IN, REELS_OUT (optional)
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const videoDir = path.join(root, "public/video");
const input = process.env.REELS_IN
  ? path.resolve(root, process.env.REELS_IN)
  : path.join(videoDir, "reels_20260608.mp4");
const output = process.env.REELS_OUT
  ? path.resolve(root, process.env.REELS_OUT)
  : path.join(videoDir, "reels_20260608-publish.mp4");
const tmp = path.join(videoDir, "_tmp_reels_publish.mp4");

if (!fs.existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}

fs.mkdirSync(videoDir, { recursive: true });

const crop = process.env.REELS_CROP !== "0";
const vf = crop
  ? "scale=1080:1920:flags=lanczos,crop=1030:1870:(iw-1030)/2:0,scale=1080:1920:flags=lanczos"
  : "scale=1080:1920:flags=lanczos";

console.log(
  `Upscaling ${path.basename(input)} → 1080×1920${crop ? " (crop Veo)" : ""}…`,
);
const enc = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    input,
    "-vf",
    vf,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-map_metadata",
    "-1",
    "-map",
    "0:v:0",
    "-map",
    "0:a?",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-shortest",
    tmp,
  ],
  { stdio: "inherit" },
);

if (enc.status !== 0) process.exit(enc.status ?? 1);

if (fs.existsSync(output)) fs.unlinkSync(output);
fs.renameSync(tmp, output);

try {
  await exiftool.write(output, {}, ["-all=", "-overwrite_original"]);
} finally {
  await exiftool.end();
}

const probe = spawnSync(
  ffmpegPath,
  ["-hide_banner", "-i", output],
  { encoding: "utf8" },
);
const dim = probe.stderr?.match(/,\s*(\d{3,4}x\d{3,4})/)?.[1] ?? "unknown";
const mb = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
console.log(`Wrote ${output}`);
console.log(`Size: ${dim} · ${mb} MB · metadata stripped`);
