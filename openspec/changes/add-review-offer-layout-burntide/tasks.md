## 1. Schema e validação

- [x] 1.1 Estender `PageLayout` com `"review-offer"` e `SpaProductConfig.layout` em `src/product/types.ts`
- [x] 1.2 Adicionar ids `what-is`, `formula`, `authenticity`, `side-effects`, `pros-cons`, `offer` em `OptionalSectionId` e o mapa `SECTION_DEPENDENCY`
- [x] 1.3 Tipar `FormulaContent`, `ProsConsContent`, `OfferPackage`, `OfferContent` (`asOf` e `sourceLabel` obrigatórios) e os campos correspondentes em `SpaProductConfig`; `authenticity` reusa `EditorialBlock` + `ctaLabel?`
- [x] 1.4 Ramo `review-offer` em `validateProductConfig`: exigir `outboundCta`; rejeitar `plans`, `"pricing"` e `popupGate`; exigir bloco + `offer.asOf`/`sourceLabel` quando listados; no máximo um package `featured`
- [x] 1.5 `review` que liste `"offer"` falha o build; `sales`/`review`/`clone` não mudam de regra

## 2. Shell, helpers e cromo

- [x] 2.1 Em `src/product/active.ts`: manter `isReviewLayout()` estrito (`=== "review"`); adicionar `isReviewOfferLayout()` e `usesOutboundCta()` (review **ou** review-offer)
- [x] 2.2 Hero, footer, sticky e FAQ: CTA outbound + `handleOutboundClick` via `usesOutboundCta()`; `isReviewLayout()` continua só no cromo editorial atual
- [x] 2.3 `App.tsx`: `data-layout="review-offer"`; ignorar `"pricing"` também nesse layout
- [x] 2.4 CSS `[data-layout="review-offer"]`: sentence case, sem HUD/glow neon; still-life/chips do Hero claro reaproveitados

## 3. Seções novas

- [x] 3.1 Implementar `WhatIs`, `Formula`, `Authenticity`, `SideEffects`, `ProsCons`, `Offer` e registrar em `registry.tsx`
- [x] 3.2 `WhatIs` / `SideEffects` / `Authenticity`: bloco editorial + CTA no fim (label de `ctaLabel` ou `outboundCta`)
- [x] 3.3 `Formula`: lista de ingredientes oficiais (nome + papel), sem HUD
- [x] 3.4 `ProsCons`: duas colunas; cons não inventam fato que a oficial não sustenta
- [x] 3.5 `Offer`: tabela 2/3/6 display-only, `asOf` visível, CTA único para `outboundCta.href` (card não é checkout)

## 4. Produto Burntide

- [x] 4.1 Baixar do [v3](https://burntide.us/funnelb3/v3/?aff_id=31010) pote, pack, selo 60 dias e label para `products/burntide/recursos/`; publicar o necessário em `public/imagens/burntide/`
- [x] 4.2 Criar `products/burntide/product.config.ts`: slug `burntide`, `layout: "review-offer"`, domínio `burntide.thebuylens.com`, locale en-US/USD, tokens do design, `outboundCta` → `https://burntide.us/funnelb3/v4/?aff_id=31010`, `trackingTags: []`, sem Spokesperson e sem `plans`
- [x] 4.3 Seções na ordem `what-is` → `formula` → `authenticity` → `side-effects` → `pros-cons` → `offer` → `guarantee` → `faq`
- [x] 4.4 Copy: gummy 525 mg ACV+BHB; kits oficiais datados set/2026 ($79/$69/$49; totais $158+$ship / $207+$ship / $294+frete grátis); garantia 60 dias; papers atribuídos à oficial; sem cápsula, sem Green Tea/L-Carnitine/Chromium, sem “FDA-Compliant”, sem “clinically tested” do SKU, sem kit de 1 frasco, sem depoimentos Henry/Samuel/Harper
- [x] 4.5 Hero: headline de busca do esqueleto + chips 60-day / FDA-registered / GMP-certified + frasco do v3

## 5. Scripts, docs e deploy

- [x] 5.1 Adicionar `dev:burntide` (porta 5180) e `build:burntide` (`dist/burntide`) no `package.json`
- [x] 5.2 Serviço `burntide` no `docker-compose.yml` (`Host(\`burntide.thebuylens.com\`)`) e imagem `lp-burntide` (`PRODUCT=burntide`) no `deploy.yml`
- [x] 5.3 Atualizar `PRODUCT.md` e `CONTEXT.md`: quarto layout `review-offer`; listar `burntide`; `review` continua sem preço; hop v4 não é checkout

## 6. QA

- [x] 6.1 `dev:burntide`: fluxo Hero → fórmula ACV+BHB → authenticity → side effects → prós/contras → oferta datada → guarantee → FAQ → footer; todo CTA abre o v4 com `aff_id=31010`
- [x] 6.2 Confirmar ausência de Pricing/`#pricing`, `plans`, `InitiateCheckout`, depoimentos nomeados da oficial e preço de 1 frasco
- [x] 6.3 Smoke `dev:energi-power-vee`, `dev:alpha-surge`, `dev:advanced-amino-formula`, `dev:audifort`, `dev:cooljet` e `dev:pawlax`: shells sales/review/clone inalterados
