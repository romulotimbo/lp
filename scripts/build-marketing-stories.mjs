/**
 * B13 — Marketing stories 1080×1920 (9:16), fora da LP.
 * Safe zone vertical ~250–1670 px (1080×1420 central).
 */
import { spawnSync } from "child_process";
import { exiftool } from "exiftool-vendored";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/marketing");
const tmpDir = path.join(root, "scripts/.tmp-story-build");
const fontBold = path.join(root, "scripts/fonts/BarlowCondensed-Bold.ttf");
const fontReg = path.join(root, "scripts/fonts/Barlow-Regular.ttf");

const assets = {
  portrait: path.join(root, "public/imagens/vee-portrait.jpg"),
  threePotes: path.join(root, "public/imagens/3 POTES.png"),
  vault: path.join(root, "public/imagens/modelo/8.jpg"),
};

for (const f of [fontBold, fontReg, ...Object.values(assets)]) {
  if (!fs.existsSync(f)) {
    console.error("Missing:", f);
    process.exit(1);
  }
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

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

const textBorder =
  "borderw=3:bordercolor=0x050505@0.8:shadowx=0:shadowy=2:shadowcolor=0x000000@0.55";

function coverInput(idx) {
  return `[${idx}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=rgba[fg]`;
}

const T = {
  s01a: writeText("01a", "VEE APRESENTA · ENERGI POWER"),
  s01b: writeText("01b", "LIBIDO NO TALO"),
  s01c: writeText("01c", "O protocolo que separa homem de menino."),
  s01d: writeText("01d", "LINK NA BIO ↑"),
  s02a: writeText("02a", "O ULTIMATO"),
  s02b: writeText("02b", "3 POTES"),
  s02c: writeText("02c", "R$ 237"),
  s02d: writeText("02d", "R$ 79/pote · frete grátis"),
  s02e: writeText("02e", "Kit que a Vee indica. Resultado consistente."),
  s02f: writeText("02f", "LINK NA BIO ↑"),
  s03a: writeText("03a", "ÁREA RESTRITA"),
  s03b: writeText("03b", "TEM UM SEGREDINHO"),
  s03c: writeText("03c", "NO FINAL DA PÁGINA"),
  s03d: writeText("03d", "Deslize até o fim. A Vee deixou um presente."),
  s03e: writeText("03e", "LINK NA BIO ↑"),
};

const stories = [
  {
    file: "story-01.jpg",
    inputs: ["-i", assets.portrait],
    filter: [
      coverInput(0),
      "[fg]eq=brightness=-0.14:contrast=1.06:saturation=0.7,colorbalance=rs=-0.1:gs=0.02:bs=0.05,vignette=angle=PI/4[v0]",
      "color=c=0x050505:s=1080x1920[bg]",
      "[bg][v0]overlay=0:0[v1]",
      "[v1]drawbox=x=0:y=0:w=iw:h=520:color=0x050505@0.55:t=fill[v2]",
      "[v2]drawbox=x=0:y=1200:w=iw:h=720:color=0x050505@0.72:t=fill[v3]",
      "[v3]drawbox=x=0:y=0:w=iw:h=8:color=0xC41E3A@0.9:t=fill[v4]",
      `[v4]drawtext=fontfile='${fr}':textfile='${T.s01a}':fontsize=28:fontcolor=0x52525B:x=(w-text_w)/2:y=300:${textBorder}[t1]`,
      `[t1]drawtext=fontfile='${fb}':textfile='${T.s01b}':fontsize=86:fontcolor=0xD1D5DB:x=(w-text_w)/2:y=880:${textBorder}[t2]`,
      `[t2]drawtext=fontfile='${fr}':textfile='${T.s01c}':fontsize=34:fontcolor=0x52525B:x=(w-text_w)/2:y=990:${textBorder}[t3]`,
      `[t3]drawtext=fontfile='${fb}':textfile='${T.s01d}':fontsize=40:fontcolor=0xC41E3A:x=(w-text_w)/2:y=1580:${textBorder}`,
    ],
  },
  {
    file: "story-02.jpg",
    inputs: ["-i", assets.threePotes],
    filter: [
      "color=c=0x050505:s=1080x1920[bg]",
      "[0:v]scale=820:-1,format=rgba[bot]",
      "[bg][bot]overlay=x=(W-w)/2:y=720[v1]",
      `[v1]drawtext=fontfile='${fr}':textfile='${T.s02a}':fontsize=30:fontcolor=0xC41E3A:x=(w-text_w)/2:y=280:${textBorder}[t1]`,
      `[t1]drawtext=fontfile='${fb}':textfile='${T.s02b}':fontsize=96:fontcolor=0xD1D5DB:x=(w-text_w)/2:y=360:${textBorder}[t2]`,
      `[t2]drawtext=fontfile='${fb}':textfile='${T.s02c}':fontsize=120:fontcolor=0xC41E3A:x=(w-text_w)/2:y=480:${textBorder}[t3]`,
      `[t3]drawtext=fontfile='${fr}':textfile='${T.s02d}':fontsize=36:fontcolor=0x52525B:x=(w-text_w)/2:y=620:${textBorder}[t4]`,
      `[t4]drawtext=fontfile='${fr}':textfile='${T.s02e}':fontsize=30:fontcolor=0x52525B:x=(w-text_w)/2:y=1480:${textBorder}[t5]`,
      `[t5]drawtext=fontfile='${fb}':textfile='${T.s02f}':fontsize=40:fontcolor=0xC41E3A:x=(w-text_w)/2:y=1580:${textBorder}`,
    ],
  },
  {
    file: "story-03.jpg",
    inputs: ["-i", assets.vault],
    filter: [
      coverInput(0),
      "[fg]eq=brightness=-0.22:contrast=1.12:saturation=0.55,format=rgba[v0]",
      "color=c=0x050505:s=1080x1920[bg]",
      "[bg][v0]overlay=0:0[v1]",
      "[v1]drawbox=x=0:y=0:w=iw:h=ih:color=0x050505@0.35:t=fill[v2]",
      "[v2]drawbox=x=40:y=260:w=iw-80:h=4:color=0xC41E3A@0.35:t=fill[v3]",
      "[v3]drawbox=x=40:y=1660:w=iw-80:h=4:color=0xC41E3A@0.35:t=fill[v4]",
      "[v4]drawbox=x=0:y=0:w=iw:h=8:color=0xC41E3A@0.9:t=fill[v5]",
      "[v5]drawbox=x=0:y=ih-8:w=iw:h=8:color=0xC41E3A@0.65:t=fill[v6]",
      `[v6]drawtext=fontfile='${fr}':textfile='${T.s03a}':fontsize=32:fontcolor=0xC41E3A:x=(w-text_w)/2:y=340:${textBorder}[t1]`,
      `[t1]drawtext=fontfile='${fb}':textfile='${T.s03b}':fontsize=68:fontcolor=0xD1D5DB:x=(w-text_w)/2:y=800:${textBorder}[t2]`,
      `[t2]drawtext=fontfile='${fb}':textfile='${T.s03c}':fontsize=68:fontcolor=0xD1D5DB:x=(w-text_w)/2:y=890:${textBorder}[t3]`,
      `[t3]drawtext=fontfile='${fr}':textfile='${T.s03d}':fontsize=30:fontcolor=0x52525B:x=(w-text_w)/2:y=1040:${textBorder}[t4]`,
      `[t4]drawtext=fontfile='${fb}':textfile='${T.s03e}':fontsize=40:fontcolor=0xC41E3A:x=(w-text_w)/2:y=1580:${textBorder}`,
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
  const dest = path.join(outDir, file);
  const graph = filter.join(";");
  console.log("Building", file);
  const enc = spawnSync(
    ffmpegPath,
    [
      "-y",
      ...inputs,
      "-filter_complex",
      graph,
      "-frames:v",
      "1",
      "-update",
      "1",
      "-q:v",
      "5",
      dest,
    ],
    { stdio: "inherit", cwd: root },
  );
  if (enc.status !== 0) process.exit(enc.status ?? 1);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`Wrote ${file} (${kb} KB)`);
  if (kb > 400) console.warn(`⚠ ${file} exceeds 400 KB target (${kb} KB)`);
  return dest;
}

try {
  const written = stories.map(encodeStory);
  await stripAllMetadata(...written);
} finally {
  await exiftool.end();
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
