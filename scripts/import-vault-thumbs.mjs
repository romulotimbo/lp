/**
 * Download Magnific vault thumbs and export as 600×800 JPG (B7).
 */
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/imagens/modelo");

/** PiHnkAl42C … 9RbWrDvNYZ — Seedream 4.5 · B7 */
const thumbs = [
  {
    file: "5.jpg",
    url: "https://pikaso.cdnpk.net/private/production/4465132227/render.jpg?token=exp=1780704000~hmac=b4eeb0fb1c2faa4a01dc140fd9458dc4ba11b68e051d10496fac6baa4ecd45d1",
  },
  {
    file: "6.jpg",
    url: "https://pikaso.cdnpk.net/private/production/4465133120/render.jpg?token=exp=1780704000~hmac=dde0ef5ab3538137e32cd39039d91f963a12425f9143194f6ec5a0693c9f9d68",
  },
  {
    file: "7.jpg",
    url: "https://pikaso.cdnpk.net/private/production/4465135735/render.jpg?token=exp=1780704000~hmac=15a8cd68903277ec4b7d3c2c5c3dfd9757deec59ef290024306f2cbd47649309",
  },
  {
    file: "8.jpg",
    url: "https://pikaso.cdnpk.net/private/production/4465130392/render.jpg?token=exp=1780704000~hmac=300266f90e4428b4c57dcc1bf61d2d2625e497c5cfe03ec1937db7124ac6a57f",
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { file, url } of thumbs) {
  if (!url) {
    console.error("Missing URL for", file);
    process.exit(1);
  }
  const tmp = path.join(outDir, `_tmp_${file}`);
  const dest = path.join(outDir, file);
  console.log("Downloading", file);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(res.status, file);
    process.exit(1);
  }
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  const enc = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      tmp,
      "-vf",
      "scale=600:800:flags=lanczos",
      "-q:v",
      "4",
      dest,
    ],
    { stdio: "inherit" },
  );
  fs.unlinkSync(tmp);
  if (enc.status !== 0) process.exit(enc.status ?? 1);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`Wrote ${file} (${kb} KB)`);
}
