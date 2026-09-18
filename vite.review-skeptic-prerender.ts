import fs from "node:fs";
import path from "node:path";
import { createServer, type Plugin } from "vite";
import type { SpaProductConfig } from "./src/product/types";
import { COMPLIANCE_PAGE_PATHS } from "./src/product/types";

const ROUTES = ["/", ...COMPLIANCE_PAGE_PATHS] as const;

function routeToFile(route: string): string {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
}

/**
 * SSG das rotas review-skeptic: o HTML emitido já contém o artigo (ênfase unset)
 * e o corpo de cada página legal, para o Googlebot não receber shell vazio.
 */
export function reviewSkepticPrerenderPlugin(config: SpaProductConfig): Plugin {
  let outDir = "dist";
  let root = process.cwd();

  return {
    name: "review-skeptic-prerender",
    apply: "build",
    configResolved(resolved) {
      root = resolved.root;
      outDir = path.resolve(resolved.root, resolved.build.outDir);
    },
    async closeBundle() {
      if (config.layout !== "review-skeptic") return;

      const server = await createServer({
        root,
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
        logLevel: "error",
      });

      try {
        const { renderReviewSkeptic } = (await server.ssrLoadModule("/src/ssr/render.tsx")) as {
          renderReviewSkeptic: (url: string) => string;
        };
        const templatePath = path.join(outDir, "index.html");
        const template = fs.readFileSync(templatePath, "utf8");

        for (const route of ROUTES) {
          const appHtml = renderReviewSkeptic(route);
          const html = template.replace(
            /<div id="root"><\/div>/,
            `<div id="root">${appHtml}</div>`,
          );
          const fileName = routeToFile(route);
          const target = path.join(outDir, fileName);
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.writeFileSync(target, html, "utf8");
        }
      } finally {
        await server.close();
      }
    },
  };
}
