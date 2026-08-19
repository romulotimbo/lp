## 1. Schema and specs

- [x] 1.1 Estender `OptionalSectionId` e `ProductConfig` com `trust`, `highlights`, `ritual`, `compare`, `guarantee`, `mid-cta` e os tipos de bloco; `hero.chips?` opcional
- [x] 1.2 Registrar dependências em `SECTION_DEPENDENCY` e no `OPTIONAL_SECTION_COMPONENTS`
- [x] 1.3 Garantir que review com esses ids ainda rejeita `plans` / `"pricing"`

## 2. Review chrome

- [x] 2.1 Restaurar eyebrows sentence-case em `[data-layout="review"]`; tipografia Bricolage Grotesque + Atkinson Hyperlegible só no review
- [x] 2.2 Hero review: chips, CTA curto, produto sem chapa vazia (bleed se fundo escuro)
- [x] 2.3 Sticky (e faixas de CTA) usam tokens do Produto, não `cyber-black` hardcoded além do token de background

## 3. Módulos

- [x] 3.1 Componentes `Trust`, `Highlights`, `Ritual`, `Compare`, `Guarantee`, `MidCta` — CTA via `OutboundLink` / `handleOutboundClick`
- [x] 3.2 EditorialArticle mostra eyebrow quando presente

## 4. Produtos

- [x] 4.1 Audifort: stack `pain → trust → research → highlights → ritual → compare → guarantee → testimonials → mid-cta → verdict → faq`; paleta fora do creme; CTA curto; sem preços/kits; widget de reviews só atribuído e datado
- [x] 4.2 Amino: `trust` + `mid-cta` + `hero.chips`; paleta e copy clínica intactas
- [x] 4.3 Atualizar `PRODUCT.md` com os módulos novos

## 5. QA

- [x] 5.1 `dev:audifort` e `dev:advanced-amino-formula`: hop abre a oficial, sem preço, disclosure no footer
- [x] 5.2 Smoke `dev:energi-power-vee` e `dev:alpha-surge`: shell sales inalterado
