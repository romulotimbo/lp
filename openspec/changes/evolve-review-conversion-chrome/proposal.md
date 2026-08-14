# Proposal: evolve review conversion chrome

## Why

O layout `review` nasceu clínico e quieto (Amino). No Audifort isso lê como LP simplória: Hero vazio, prosa repetida, um CTA-parágrafo, sticky escuro herdado do sales. A página oficial converte por ritmo (prova, garantia, CTA repetido) — não por cards de preço, que o contrato review proíbe. Precisamos do cromo de persuasão no shell compartilhado, sem virar vitrine e sem regressão em Vee/Alpha.

## What Changes

- Novos ids opcionais de review: `trust`, `highlights`, `ritual`, `compare`, `guarantee`, `mid-cta`.
- Cromo compartilhado sob `[data-layout="review"]`: eyebrows visíveis, Hero denso com chips e CTA curto, produto em escala de objeto, sticky tokenizado.
- Audifort liga a stack completa e pode sair da paleta creme.
- Amino liga `trust` + `mid-cta` (e chips no Hero); paleta e copy clínica permanecem.
- Sales (Vee, Alpha Surge) intocado. Hop continua sem `InitiateCheckout`. Sem preços/kits na Instância.

## Capabilities

### New Capabilities

- Módulos de prova/ritmo/garantia/CTA intermediário opt-in no review, todos apontando o mesmo `outboundCta`.
- Hero review com chips de confiança opcionais e CTA curto.

### Modified Capabilities

- Chrome review deixa de esconder eyebrows e de forçar o produto numa chapa vazia.
- CTA outbound pode aparecer no meio do fluxo (`mid-cta`, `guarantee`) além de Hero, verdict, footer e sticky.

## Impact

- Specs: `review-layout`, `optional-sections`, `product-configuration`.
- Código: `src/product/types.ts`, registry, seções novas, Hero, sticky, CSS review.
- Configs: `products/audifort/product.config.ts`, `products/advanced-amino-formula/product.config.ts`.
- `PRODUCT.md` (capacidades do review).
