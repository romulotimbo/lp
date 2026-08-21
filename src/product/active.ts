// Config do Produto ativo neste build — resolvido pelo alias `@product-config`
// (ver vite.config.ts), que aponta para `products/<slug>/product.config.ts`
// conforme a variável de ambiente PRODUCT usada no build.
//
// Um build = um Produto = uma Instância (ver CONTEXT.md). Não há troca de
// Produto em runtime.
import productConfig from "@product-config";
import {
  isCloneProduct,
  ProductConfigError,
  resolveLayout,
  validateProductConfig,
  type PageLayout,
  type SpaProductConfig,
} from "./types";

validateProductConfig(productConfig);

if (isCloneProduct(productConfig)) {
  throw new ProductConfigError(
    `Produto clone "${productConfig.slug}" não carrega a SPA — use o pipeline product-clone.`,
  );
}

export const product: SpaProductConfig = productConfig;

export function hasSection(id: SpaProductConfig["sections"][number]): boolean {
  return product.sections.includes(id);
}

export function activeLayout(): PageLayout {
  return resolveLayout(product);
}

export function isReviewLayout(): boolean {
  return activeLayout() === "review";
}
