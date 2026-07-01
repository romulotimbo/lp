/**
 * Builds Instagram Stories teaser (9:16) from vee-hero.mp4.
 * Dark crop, brand red accents, launch copy — no product.
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const input = path.join(root, "public/video/vee-hero.mp4");
const output = path.join(root, "public/video/teaser-stories.mp4");
const poster = path.join(root, "public/video/teaser-stories-poster.jpg");
const fontBold = path.join(__dirname, "fonts/BarlowCondensed-Bold.ttf");

for (const f of [input, fontBold]) {
  if (!fs.existsSync(f)) {
    console.error("Missing:", f);
    process.exit(1);
  }
}

/** FFmpeg drawtext font path (Windows-safe). */
function escFont(p) {
  return p.replace(/\\/g, "/").replace(/:/g, "\\:");
}

/** Remove EXIF/XMP/QuickTime tags (GPS, dates, software, titles, etc.). */
async function stripAllMetadata(...files) {
  const args = [
    "-all=",
    "-Encoder=",
    "-Software=",
    "-CreatorTool=",
    "-Title=",
    "-Comment=",
    "-Description=",
    "-HandlerDescription=",
    "-CompressorName=",
    "-overwrite_original",
  ];
  for (const file of files) {
    console.log("Stripping metadata:", file);
    await exiftool.write(file, {}, args);
  }
}

const fb = escFont(fontBold);
const cropW = 608;
const cropX = Math.floor((1920 - cropW) / 2);

const textBorder =
  "borderw=3:bordercolor=0x050505@0.75:shadowx=0:shadowy=2:shadowcolor=0x000000@0.5";

const vf = [
  `crop=${cropW}:1080:${cropX}:0`,
  "scale=1080:1920:flags=lanczos",
  "eq=brightness=-0.1:contrast=1.05:saturation=0.58",
  "colorbalance=rs=-0.12:gs=0.02:bs=0.04:rm=-0.06:gm=0:bm=0",
  "vignette=angle=PI/4:mode=forward",
  "drawbox=x=0:y=0:w=iw:h=10:color=0xC41E3A@0.85:t=fill",
  "drawbox=x=0:y=ih-10:w=iw:h=10:color=0xC41E3A@0.7:t=fill",
  "drawbox=x=0:y=0:w=8:h=ih:color=0xC41E3A@0.55:t=fill",
  "drawbox=x=iw-8:y=0:w=8:h=ih:color=0xC41E3A@0.55:t=fill",
  `drawtext=fontfile='${fb}':text='EM BREVE...':fontsize=108:fontcolor=0xE8EAED:x=(w-text_w)/2:y=h*0.44:${textBorder}`,
  `drawtext=fontfile='${fb}':text='BY VEE.':fontsize=56:fontcolor=0xC41E3A:x=(w-text_w)/2:y=h*0.52:${textBorder}`,
].join(",");

const encodeArgs = [
  "-y",
  "-i",
  input,
  "-t",
  "8",
  "-an",
  "-vf",
  vf,
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "23",
  "-preset",
  "slow",
  "-movflags",
  "+faststart",
  "-map_metadata",
  "-1",
  "-map_metadata:s:v",
  "-1",
  output,
];

async function main() {
  console.log("Encoding teaser:", output);
  const enc = spawnSync(ffmpegPath, encodeArgs, { stdio: "inherit", cwd: root });
  if (enc.status !== 0) process.exit(enc.status ?? 1);

  const posterArgs = [
    "-y",
    "-i",
    output,
    "-ss",
    "2",
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "2",
    poster,
  ];
  console.log("Poster frame:", poster);
  const pst = spawnSync(ffmpegPath, posterArgs, { stdio: "inherit", cwd: root });
  if (pst.status !== 0) process.exit(pst.status ?? 1);

  try {
    await stripAllMetadata(output, poster);
  } finally {
    await exiftool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
