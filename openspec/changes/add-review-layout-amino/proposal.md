## Why

A Base hoje só gera LPs de venda (HUD, kits, checkout). Advanced Amino Formula é uma ponte editorial ClickBank — review em 1ª pessoa, paleta clara clínica, CTA para a página oficial via hop, nunca checkout. Encaixar isso nas seções da Vee/Alpha Surge quebraria o tom e o contrato de afiliado. Precisamos de um segundo modo de página e do primeiro Produto que o usa.

## What Changes

- Introduzir **layout `review`** na Base (default continua `sales`). Instância review: artigo clínico, sentence case, sem HUD/glow neon/tilt de venda.
- Novos blocos editoriais opcionais: dor, pesquisa, claims oficiais, veredito. FAQ e Testimonials continuam disponíveis e renderizam sem cromo HUD quando o layout é `review`.
- **Pricing deixa de ser obrigatório** em layout `review`. No lugar: um CTA outbound (hop ClickBank / página oficial). Layout `sales` não muda.
- CTA outbound **não dispara** `InitiateCheckout` / conversion de checkout. Tracking de clique outbound, se existir, é evento distinto.
- Hero review: prosa + pote, sem vídeo de Spokesperson, sem tags HUD, sem `UPPERCASE` de display.
- Rodapé e Sticky CTA apontam para o hop, não para `#pricing`. Disclaimer de afiliado permanece obrigatório e visível no rodapé.
- Novo Produto `advanced-amino-formula`: en-US, `https://advanced-amino.nothforge.com/`, sem Spokesperson, paleta off-white + azul do rótulo, copy de review (sem a palavra *independent*), hop ClickBank, FAQ + depoimentos, assets em `products/advanced-amino-formula/recursos/`.

## Capabilities

### New Capabilities
- `review-layout`: modo de página editorial (shell, cromo clínico, blocos de artigo, CTA outbound no lugar de Pricing).

### Modified Capabilities
- `product-configuration`: schema ganha `layout`, conteúdo editorial e URL de hop/outbound; `plans` deixa de ser obrigatório quando `layout` é `review`.
- `optional-sections`: núcleo obrigatório passa a depender do layout — `review` exige Hero + CTA outbound + rodapé; Pricing só é obrigatório em `sales`. Novos ids de seção editorial.
- `tracking-tags`: clique em CTA outbound (hop / página oficial) NÃO dispara o evento de checkout.

## Impact

- **Código:** `src/product/types.ts` (schema), `src/App.tsx` (escolha de shell), `src/sections/Hero.tsx` e novas seções editoriais, `src/sections/Faq.tsx` + `Testimonials.tsx` (variante sem HUD), `src/components/page-footer.tsx` + `sticky-cta.tsx` (href outbound), `src/lib/checkout-tracking.ts` (não tratar hop como checkout), `src/index.css` (tipografia sentence case no modo review), `src/components/product-glow.tsx` (sem halo neon em fundo claro).
- **Produto novo:** `products/advanced-amino-formula/product.config.ts`, scripts `dev`/`build` no `package.json`, assets de `recursos/` publicados sob `public/imagens/advanced-amino-formula/`.
- **Sem regressão:** Energi Power e Alpha Surge permanecem `layout: "sales"` (default). Nenhuma seção de venda existente é removida.
- **Deploy:** Instância isolada no Host `advanced-amino.nothforge.com`, mesmo padrão Traefik/container das outras.
