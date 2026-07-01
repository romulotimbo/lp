/**
 * Q&A campaign stories 1080×1920 (9:16).
 * Compact HUD card overlay — tokens: design-system/energi-power-by-vee/MASTER.md
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qnaDir = path.join(root, "public/marketing/qna");
const tmpDir = path.join(root, "scripts/.tmp-qna-build");
const fontBold = path.join(root, "scripts/fonts/BarlowCondensed-Bold.ttf");
const fontReg = path.join(root, "scripts/fonts/Barlow-Regular.ttf");
const emojiFont = path.join(process.env.WINDIR ?? "C:/Windows", "Fonts/seguiemj.ttf");

for (const f of [fontBold, fontReg, path.join(qnaDir, "01-source.jpg")]) {
  if (!fs.existsSync(f)) {
    console.error("Missing:", f);
    process.exit(1);
  }
}

fs.mkdirSync(qnaDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

/** MASTER.md */
const C = {
  graphite: "0x16161A",
  titanium: "0xD1D5DB",
  muted: "0x52525B",
  blood: "0xC41E3A",
};

const CARD = { x: 90, y: 108, w: 900, h: 196 };

function escFont(p) {
  return p.replace(/\\/g, "/").replace(/:/g, "\\:");
}

function escPath(p) {
  return p.replace(/\\/g, "/").replace(/:/g, "\\:");
}

function writeText(id, text) {
  const p = path.join(tmpDir, `${id}.txt`);
  fs.writeFileSync(p, text, "utf8");
  return escPath(p);
}

const fb = escFont(fontBold);
const fr = escFont(fontReg);
const fe = fs.existsSync(emojiFont) ? escFont(emojiFont) : null;

const { x, y, w, h } = CARD;
const bottom = y + h;

const T = {
  q01a: writeText("q01a", "Esse"),
  q01b: writeText("q01b", '"Hujmmmmmm'),
  q01c: writeText("q01c", "significa:"),
};

const emojiInline = fe
  ? `[t2]drawtext=fontfile='${fe}':text='🔥😈"':fontsize=30:fontcolor=${C.titanium}:x=(w-560)/2+360:y=${y + 72}[t2e]`
  : `[t2]drawtext=fontfile='${fb}':text='\\"':fontsize=34:fontcolor=${C.titanium}:x=(w-560)/2+360:y=${y + 68}[t2e]`;

const stories = [
  {
    file: "01.jpg",
    inputs: ["-i", path.join(qnaDir, "01-source.jpg")],
    filter: [
      "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[base]",
      `[base]drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${C.graphite}@0.93:t=fill[c1]`,
      `[c1]drawbox=x=${x}:y=${y}:w=${w}:h=2:color=${C.blood}@0.9:t=fill[c2]`,
      `[c2]drawbox=x=${x}:y=${bottom - 1}:w=${w}:h=1:color=${C.blood}@0.25:t=fill[c3]`,
      `[c3]drawbox=x=${x}:y=${y}:w=1:h=${h}:color=${C.blood}@0.25:t=fill[c4]`,
      `[c4]drawbox=x=${x + w - 1}:y=${y}:w=1:h=${h}:color=${C.blood}@0.25:t=fill[card]`,
      `[card]drawtext=fontfile='${fr}':textfile='${T.q01a}':fontsize=24:fontcolor=${C.muted}:x=(w-text_w)/2:y=${y + 28}[t1]`,
      `[t1]drawtext=fontfile='${fb}':textfile='${T.q01b}':fontsize=34:fontcolor=${C.titanium}:x=(w-560)/2:y=${y + 68}[t2]`,
      emojiInline,
      `[t2e]drawtext=fontfile='${fb}':textfile='${T.q01c}':fontsize=28:fontcolor=${C.titanium}:x=(w-text_w)/2:y=${y + 118}`,
    ],
  },
];

async function stripAllMetadata(...files) {
  const args = ["-all=", "-Encoder=", "-Software=", "-overwrite_original"];
  for (const file of files) {
    console.log("Stripping metadata:", file);
    await exiftool.write(file, {}, args);
  }
}

function encodeStory({ file, inputs, filter }) {
  const dest = path.join(qnaDir, file);
  console.log("Building", file);
  const enc = spawnSync(
    ffmpegPath,
    ["-y", ...inputs, "-filter_complex", filter.join(";"), "-frames:v", "1", "-update", "1", "-q:v", "4", dest],
    { stdio: "inherit", cwd: root },
  );
  if (enc.status !== 0) process.exit(enc.status ?? 1);
  console.log(`Wrote ${dest} (${Math.round(fs.statSync(dest).size / 1024)} KB)`);
  return dest;
}

try {
  const written = stories.map(encodeStory);
  await stripAllMetadata(...written);
} finally {
  await exiftool.end();
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
