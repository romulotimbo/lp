/**
 * PNG guides 1080×1920 — zonas de overlay Q&A (transparente).
 * Uso: sobrepor no Instagram/Canva para posicionar texto; não publicar o guia.
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qnaDir = path.join(root, "public/marketing/qna");
const fontBold = path.join(root, "scripts/fonts/BarlowCondensed-Bold.ttf");
const fontReg = path.join(root, "scripts/fonts/Barlow-Regular.ttf");

if (!fs.existsSync(fontBold)) {
  console.error("Missing:", fontBold);
  process.exit(1);
}

fs.mkdirSync(qnaDir, { recursive: true });

const C = {
  graphite: "0x16161A",
  blood: "0xC41E3A",
  muted: "0x52525B",
  titanium: "0xD1D5DB",
};

function escFont(p) {
  return p.replace(/\\/g, "/").replace(/:/g, "\\:");
}

const fb = escFont(fontBold);
const fr = escFont(fontReg);

/** fill + border + mono label */
function zone(x, y, w, h, label, inLabel) {
  return [
    `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${C.graphite}@0.28:t=fill`,
    `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${C.blood}@0.9:t=3`,
    `drawtext=fontfile='${fr}':text='${label}':fontsize=18:fontcolor=${C.muted}:x=${x + 12}:y=${y + 10}`,
    `drawtext=fontfile='${fb}':text='${inLabel}':fontsize=20:fontcolor=${C.titanium}@0.55:x=${x + 12}:y=${y + h - 36}`,
  ];
}

const guides = [
  {
    file: "01-guide.png",
    title: "STORY 01",
    zones: [
      ...zone(500, 128, 490, 188, "01 · TEXTO", "Esse / Hujmmmmmm / significa:"),
      ...zone(140, 1330, 800, 132, "01 · ENQUETE", "Sticker poll manual IG"),
    ],
  },
  {
    file: "02-guide.png",
    title: "STORY 02",
    zones: [
      ...zone(518, 142, 462, 78, "02 · PUNCH", "Exatamente."),
      ...zone(90, 1175, 900, 298, "02 · CORPO + CTA", "eu sei... / Cola comigo... ;)"),
    ],
  },
  {
    file: "03-guide.png",
    title: "STORY 03",
    zones: [
      ...zone(90, 1280, 900, 260, "03 · TEXTO", "misteriosa... / Cuidado..."),
      ...zone(90, 1560, 900, 72, "03 · CTA", "Link na bio / area restrita"),
    ],
  },
  {
    file: "04-guide.png",
    title: "STORY 04",
    zones: [
      ...zone(90, 120, 520, 200, "04 · TEXTO", "Somente voce..."),
      ...zone(90, 1380, 900, 88, "04 · CTA", "exclusividade? / urgencia"),
    ],
  },
];

function buildGuide({ file, title, zones }) {
  const dest = path.join(qnaDir, file);
  const vf = [
    "format=rgba",
    ...zones,
    `drawtext=fontfile='${fb}':text='${title}':fontsize=22:fontcolor=${C.blood}:x=48:y=48`,
    `drawtext=fontfile='${fr}':text='Guia — nao publicar':fontsize=16:fontcolor=${C.muted}:x=48:y=78`,
    `drawtext=fontfile='${fr}':text='Safe zone IG ~250-1670px':fontsize=16:fontcolor=${C.muted}:x=48:y=1820`,
  ].join(",");

  console.log("Building", file);
  const enc = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-f",
      "lavfi",
      "-i",
      "color=c=0x00000000:s=1080x1920:r=1",
      "-frames:v",
      "1",
      "-vf",
      vf,
      "-update",
      "1",
      dest,
    ],
    { stdio: "inherit", cwd: root },
  );
  if (enc.status !== 0) process.exit(enc.status ?? 1);
  console.log(`Wrote ${dest} (${Math.round(fs.statSync(dest).size / 1024)} KB)`);
}

for (const g of guides) buildGuide(g);
