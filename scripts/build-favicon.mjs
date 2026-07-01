/**
 * B14 — Export PNG favicons from public/favicon.svg
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = path.join(root, "public/favicon.svg");
const svg = fs.readFileSync(svgPath);

const outputs = [
  { file: "public/favicon-32.png", size: 32 },
  { file: "public/apple-touch-icon.png", size: 180 },
  { file: "public/icon-512.png", size: 512 },
];

for (const { file, size } of outputs) {
  const dest = path.join(root, file);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "#050505",
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(dest, png);
  console.log(`${size}×${size} →`, dest);
}
