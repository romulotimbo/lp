import { product } from "@/product/active";
import { EditorialArticle } from "@/sections/editorial-article";

export function WhatIs() {
  if (!product.whatIs) return null;
  return <EditorialArticle id="what-is" block={product.whatIs} />;
}
