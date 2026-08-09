// Config do Produto ativo neste build — resolvido pelo alias `@product-config`
// (ver vite.config.ts), que aponta para `products/<slug>/product.config.ts`
// conforme a variável de ambiente PRODUCT usada no build.
//
// Um build = um Produto = uma Instância (ver CONTEXT.md). Não há troca de
// Produto em runtime.
import productConfig from "@product-config";
import { validateProductConfig, type ProductConfig } from "./types";

validateProductConfig(productConfig);

export const product: ProductConfig = productConfig;

export function hasSection(id: ProductConfig["sections"][number]): boolean {
  return product.sections.includes(id);
}
