## 1. Schema e validação

- [x] 1.1 Estender `ProductConfig` com `layout?: "sales" | "review"`, `outboundCta?: { label, href }`, tipos de bloco editorial e os `OptionalSectionId` `pain` | `research` | `official-claims` | `verdict`
- [x] 1.2 Atualizar `validateProductConfig`: sales (default) mantém plans + `pricing`; review exige `outboundCta`, exige bloco para cada seção editorial listada, rejeita `plans` e `"pricing"`
- [x] 1.3 Confirmar que os configs de `energi-power-vee` e `alpha-surge` (sem `layout`) continuam válidos

## 2. Shell review e seções editoriais

- [x] 2.1 Fazer `App.tsx` ler `layout`, setar `data-layout` no `<main>` e, em review, omitir `Pricing`
- [x] 2.2 Criar seções `Pain`, `Research`, `OfficialClaims` e `Verdict` (artigo: eyebrow/title/body/figure, sentence case, sem HUD)
- [x] 2.3 Registrar as quatro seções em `OPTIONAL_SECTION_COMPONENTS` e validar ordem via `sections[]`
- [x] 2.4 No bloco Verdict, renderizar o `outboundCta` como CTA primário

## 3. Cromo clínico e tracking outbound

- [x] 3.1 Variante review do Hero: sentence case, sem `hudTag` / `HUD::PRODUCT_LOCK` / vídeo / `ProductGlow`; CTA = `outboundCta`
- [x] 3.2 CSS `[data-layout="review"]`: títulos sentence case (Barlow, não Condensed uppercase), esconder HUD tags, botão primário no accent clínico
- [x] 3.3 Footer e Sticky CTA em review apontam para `outboundCta.href` (nunca `#pricing`); disclosure de afiliado permanece visível
- [x] 3.4 FAQ e Testimonials, quando `layout === "review"`, omitem tags HUD e uppercase de display
- [x] 3.5 Adicionar `handleOutboundClick` e usá-lo nos CTAs review; `handleCheckoutClick` permanece só em sales

## 4. Produto Advanced Amino Formula

- [x] 4.1 Publicar assets necessários de `products/advanced-amino-formula/recursos/` em `public/imagens/advanced-amino-formula/` (no mínimo `1-Unit.jpg` e `8-amino-acids.jpg`)
- [x] 4.2 Escrever `products/advanced-amino-formula/product.config.ts`: slug, domínio `advanced-amino.nothforge.com`, locale en-US, paleta confirmada, `layout: "review"`, hop ClickBank, seções na ordem do design, copy sem *independent*, claims só oficiais, reviews datados (3.144 / 4.1 / ago 2026), FAQ + depoimentos originais, disclaimers afiliado + FDA + ClickBank
- [x] 4.3 Adicionar scripts `dev:advanced-amino-formula` e `build:advanced-amino-formula` no `package.json`

## 5. QA

- [x] 5.1 Subir `dev:advanced-amino-formula` e validar fluxo: Hero → 4 blocos → depoimentos → veredito/CTA → FAQ → footer; hop abre a oficial; sem cards de preço; disclosure visível
- [x] 5.2 Confirmar que clicar o hop não dispara `InitiateCheckout` / conversion de checkout
- [x] 5.3 Smoke `dev:energi-power-vee` e `dev:alpha-surge`: shell sales, Pricing e checkout tracking inalterados
