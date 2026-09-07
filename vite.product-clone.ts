import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import type { CloneProductConfig } from "./src/product/types";
import { trackingTagHeadHtml, trackingTagNoscriptHtml } from "./vite.tracking-tags";

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

function cloneHandleClickScript(config: CloneProductConfig, affiliateHref: string): string {
  const googleAds = (config.trackingTags ?? []).find((tag) => tag.type === "google_ads");
  const label = googleAds?.conversionLabel ?? null;
  const conversionCurrency =
    googleAds?.conversionCurrency ?? config.locale.currency;
  const conversionValue = googleAds?.conversionValue;
  const valueLine =
    conversionValue === undefined ? "" : `      value: ${JSON.stringify(conversionValue)},\n`;
  return `function handleClick(event) {
  if (event) event.preventDefault();
  var href = window.__cloneHop || ${JSON.stringify(affiliateHref)};
  var label = ${JSON.stringify(label)};
  var go = function () { window.location.href = href; };
  if (label && typeof window.gtag === "function") {
    var redirected = false;
    var once = function () {
      if (redirected) return;
      redirected = true;
      go();
    };
    window.gtag("event", "conversion", {
      send_to: label,
${valueLine}      currency: ${JSON.stringify(conversionCurrency)},
      event_callback: once
    });
    window.setTimeout(once, 800);
    return false;
  }
  go();
  return false;
}`;
}

function injectCloneTracking(
  html: string,
  config: CloneProductConfig,
  affiliateHref: string,
): string {
  const tags = config.trackingTags ?? [];
  const head = tags.map(trackingTagHeadHtml).join("\n");
  const noscript = tags.map(trackingTagNoscriptHtml).join("\n");
  let out = html;
  if (head) {
    out = out.replace("</head>", `${head}\n</head>`);
  }
  if (noscript) {
    out = out.replace(/<body([^>]*)>/i, `<body$1>${noscript}`);
  }
  return out.replace(
    /function handleClick\(event\) \{[\s\S]*?\n\}/,
    cloneHandleClickScript(config, affiliateHref),
  );
}

function materializeCloneHtml(
  html: string,
  config: CloneProductConfig,
  page?: { affiliateHref?: string; affiliateDisclosure?: string },
): string {
  const affiliateHref = page?.affiliateHref ?? config.clone.affiliateHref;
  const affiliateDisclosure =
    page?.affiliateDisclosure ?? config.locale.affiliateDisclosure;
  return injectCloneTracking(
    html
      .replaceAll("__AFFILIATE_HREF__", affiliateHref)
      .replaceAll("__AFFILIATE_DISCLOSURE__", affiliateDisclosure),
    config,
    affiliateHref,
  );
}

function extraPagePrefixes(pagePath: string): string[] {
  return [`/${pagePath}`, `/${pagePath}/`, `/${pagePath}/index.html`];
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
  const extraPages = config.clone.extraPages ?? [];

  const readPage = () =>
    materializeCloneHtml(fs.readFileSync(htmlPath, "utf8"), config);

  const readExtraPage = (page: (typeof extraPages)[number]) =>
    materializeCloneHtml(fs.readFileSync(path.resolve(productDir, page.htmlFile), "utf8"), config, {
      affiliateHref: page.affiliateHref,
      affiliateDisclosure: page.affiliateDisclosure,
    });

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

        const extra = extraPages.find((page) => extraPagePrefixes(page.path).includes(pathname));
        if (extra) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(readExtraPage(extra));
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
      for (const page of extraPages) {
        this.emitFile({
          type: "asset",
          fileName: `${page.path}/index.html`,
          source: readExtraPage(page),
        });
      }
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
