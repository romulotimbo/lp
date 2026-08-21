import { fileURLToPath, pathToFileURL, URL } from "node:url";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import type { DesignTokens, ProductConfig, SpaProductConfig, TrackingTag } from "./src/product/types";
import { isCloneProduct, validateProductConfig } from "./src/product/types";
import { hexToRgbChannels, onAccentChannels, TOKEN_CSS_VAR } from "./src/product/tokens";
import { renderPopupGateHtml } from "./src/popup-gate/render-html";
import { cloneProductPlugin } from "./vite.product-clone";

const DEFAULT_PRODUCT = "energi-power-vee";
const PRODUCT = process.env.PRODUCT || DEFAULT_PRODUCT;
const productConfigPath = path.resolve(
  __dirname,
  "products",
  PRODUCT,
  "product.config.ts",
);

// `<noscript><img>` não é um filho válido de `<noscript>` dentro de `<head>`
// (o parser HTML rejeita) — por isso o `<script>` de cada tag vai no `<head>`
// e o fallback `<noscript>` correspondente vai no `<body>`, via placeholders
// separados.
function trackingTagHeadHtml(tag: TrackingTag): string {
  if (tag.type === "meta_pixel") {
    return `
    <!-- Meta Pixel (${tag.id}) -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${tag.id}');
      fbq('track', 'PageView');
    </script>`;
  }

  if (tag.type === "google_ads") {
    return `
    <!-- Google Ads (${tag.id}) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${tag.id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${tag.id}');
    </script>`;
  }

  return "";
}

function trackingTagNoscriptHtml(tag: TrackingTag): string {
  if (tag.type === "meta_pixel") {
    return `
    <noscript>
      <img height="1" width="1" style="display:none" alt=""
        src="https://www.facebook.com/tr?id=${tag.id}&ev=PageView&noscript=1" />
    </noscript>`;
  }
  return "";
}

function tokensStyleTag(tokens: DesignTokens): string {
  const declarations = (Object.keys(TOKEN_CSS_VAR) as (keyof DesignTokens)[])
    .map((role) => `      ${TOKEN_CSS_VAR[role]}: ${hexToRgbChannels(tokens[role])};`)
    .join("\n");
  return `<style id="product-tokens">\n    :root {\n${declarations}\n      --color-on-accent: ${onAccentChannels(tokens)};\n    }\n    </style>`;
}

/**
 * Injeta metadados de SEO/OG e Tags de rastreamento do Produto ativo no `index.html`
 * em build time — nenhum Pixel/tag fica hardcoded no HTML da Base (ver
 * openspec/changes/extract-reusable-base/design.md, "Tags injetadas no build").
 */
function productHtmlPlugin(config: SpaProductConfig): Plugin {
  return {
    name: "product-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const tagsHead = (config.trackingTags ?? []).map(trackingTagHeadHtml).join("\n");
        const tagsBody = (config.trackingTags ?? []).map(trackingTagNoscriptHtml).join("\n");
        return html
          .replace(/lang="[^"]*"/, `lang="${config.locale.language}"`)
          .replace(/<title>.*<\/title>/, `<title>${config.seo.title}</title>`)
          .replace(
            /<meta name="description" content="[^"]*"\s*\/>/,
            `<meta name="description" content="${config.seo.description}" />`,
          )
          .replace(
            /<meta property="og:title" content="[^"]*"\s*\/>/,
            `<meta property="og:title" content="${config.seo.title}" />`,
          )
          .replace(
            /<meta property="og:description" content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${config.seo.description}" />`,
          )
          .replace(
            /<meta property="og:image" content="[^"]*"\s*\/>/,
            `<meta property="og:image" content="${config.seo.ogImage}" />`,
          )
          .replace(
            /<meta property="og:url" content="[^"]*"\s*\/>/,
            `<meta property="og:url" content="${config.seo.url}" />`,
          )
          .replace(
            /<meta property="og:locale" content="[^"]*"\s*\/>/,
            `<meta property="og:locale" content="${config.locale.ogLocale}" />`,
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*"\s*\/>/,
            `<meta name="twitter:title" content="${config.seo.title}" />`,
          )
          .replace(
            /<meta name="twitter:description" content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" content="${config.seo.description}" />`,
          )
          .replace(
            /<meta name="twitter:image" content="[^"]*"\s*\/>/,
            `<meta name="twitter:image" content="${config.seo.ogImage}" />`,
          )
          .replace(
            /<meta name="theme-color" content="[^"]*"\s*\/>/,
            `<meta name="theme-color" content="${config.seo.themeColor ?? config.tokens.background}" />`,
          )
          .replace("<!-- PRODUCT_TOKENS -->", tokensStyleTag(config.tokens))
          .replace("<!-- PRODUCT_TRACKING_TAGS -->", tagsHead)
          .replace("<!-- PRODUCT_TRACKING_NOSCRIPT -->", tagsBody);
      },
    },
  };
}

/**
 * Emite a Página-popup do Produto (quando configurada) como um HTML estático
 * num path próprio da mesma Instância — ver `PopupGateConfig`. Em dev, um
 * middleware serve o mesmo HTML no mesmo path, pra que `/alphasurge` funcione
 * igual em `npm run dev:alpha-surge` e no build.
 */
function popupGatePlugin(config: SpaProductConfig): Plugin {
  const gate = config.popupGate;
  const render = () =>
    renderPopupGateHtml(config, {
      head: (config.trackingTags ?? []).map(trackingTagHeadHtml).join("\n"),
      noscript: (config.trackingTags ?? []).map(trackingTagNoscriptHtml).join("\n"),
    });

  return {
    name: "product-popup-gate",
    configureServer(server) {
      if (!gate) return;
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? "/").split("?")[0].replace(/\/+$/, "");
        if (pathname !== `/${gate.path}`) {
          next();
          return;
        }
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(render());
      });
    },
    generateBundle() {
      if (!gate) return;
      this.emitFile({
        type: "asset",
        fileName: `${gate.path}/index.html`,
        source: render(),
      });
    },
  };
}

export default defineConfig(async () => {
  // Import dinâmico porque o caminho depende de PRODUCT (não dá pra usar `import`
  // estático no topo do arquivo). tsx/esbuild resolvem o .ts em runtime do config.
  const activeProduct = (
    (await import(pathToFileURL(productConfigPath).href)) as { default: ProductConfig }
  ).default;

  validateProductConfig(activeProduct);

  if (isCloneProduct(activeProduct)) {
    const productDir = path.resolve(__dirname, "products", PRODUCT);
    return {
      plugins: [cloneProductPlugin(productDir, activeProduct)],
      publicDir: false,
      build: {
        rollupOptions: {
          input: path.resolve(__dirname, "src/product/clone-noop.ts"),
          output: {
            entryFileNames: "assets/clone-noop.js",
          },
        },
      },
    };
  }

  return {
    plugins: [react(), productHtmlPlugin(activeProduct), popupGatePlugin(activeProduct)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@product-config": productConfigPath,
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  };
});
