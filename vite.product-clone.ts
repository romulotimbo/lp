import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import type { CloneProductConfig } from "./src/product/types";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function isInside(root: string, candidate: string): boolean {
  const rel = path.relative(root, candidate);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function materializeCloneHtml(html: string, config: CloneProductConfig): string {
  return html
    .replaceAll("__AFFILIATE_HREF__", config.clone.affiliateHref)
    .replaceAll(
      "__AFFILIATE_DISCLOSURE__",
      config.locale.affiliateDisclosure,
    );
}

function walkFiles(dir: string, prefix: string, files: { fileName: string; source: Buffer }[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const fileName = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      walkFiles(full, `${fileName}/`, files);
    } else {
      files.push({ fileName, source: fs.readFileSync(full) });
    }
  }
}

/**
 * Pipeline estático de um Produto `layout: "clone"`: serve o HTML publicado
 * na raiz em dev e copia HTML + assets visuais no build, sem a SPA React.
 */
export function cloneProductPlugin(
  productDir: string,
  config: CloneProductConfig,
): Plugin {
  const htmlPath = path.resolve(productDir, config.clone.htmlFile);
  const pageDir = path.dirname(htmlPath);

  const readPage = () =>
    materializeCloneHtml(fs.readFileSync(htmlPath, "utf8"), config);

  return {
    name: "product-clone",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent((req.url ?? "/").split("?")[0]);
        if (pathname === "/" || pathname === "/index.html") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(readPage());
          return;
        }

        const candidate = path.resolve(pageDir, pathname.replace(/^\//, ""));
        if (
          isInside(pageDir, candidate) &&
          fs.existsSync(candidate) &&
          fs.statSync(candidate).isFile()
        ) {
          const ext = path.extname(candidate).toLowerCase();
          res.statusCode = 200;
          res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
          res.end(fs.readFileSync(candidate));
          return;
        }

        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "index.html",
        source: readPage(),
      });
      const emitted: { fileName: string; source: Buffer }[] = [];
      walkFiles(path.join(pageDir, "assets"), "assets/", emitted);
      for (const file of emitted) {
        this.emitFile({
          type: "asset",
          fileName: file.fileName,
          source: file.source,
        });
      }
    },
  };
}
