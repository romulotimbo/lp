## Why

O layout `review` é um artigo editorial sem preço, kit ou tabela de oferta. A ponte Burntide precisa de outro modo: advertorial de busca (“scam / legit / side effects”) com dobras fixas e hop Direct-to-Cart em cada CTA. Encaixar isso no `review` atual quebraria o contrato de “review nunca mostra preço”; encaixar em `sales` misturaria checkout da Base com um funil externo.

## What Changes

- Introduzir **layout `review-offer`** na Base (default continua `sales`; `review` e `clone` não mudam de cromo nem de regras).
- Novos módulos ordenáveis: `what-is`, `formula`, `authenticity`, `side-effects`, `pros-cons`, `offer`. Hero, guarantee, FAQ, footer e sticky reaproveitam o cromo clínico (sem HUD).
- CTA único `outboundCta` em todas as dobras (Hero, authenticity, offer, guarantee, footer, sticky). Destino Burntide: [funil v4 com `aff_id=31010`](https://burntide.us/funnelb3/v4/?aff_id=31010). Clique **não** dispara `InitiateCheckout`.
- `offer` mostra pacotes datados da loja oficial (display-only). **Não** usa `plans` / `"pricing"` / cards de checkout da Base.
- Novo Produto `burntide`: en-US, sem Spokesperson, paleta amostrada do [funil v3](https://burntide.us/funnelb3/v3/?aff_id=31010), copy alinhada ao esqueleto pedido e **corrigida** pelos fatos oficiais (gummy ACV+BHB, kits 2/3/6, preços de setembro 2026).
- Assets visuais do v3 publicados em `public/imagens/burntide/`. Scripts `dev:burntide` / `build:burntide`.
- `review` continua proibindo preço. `sales` e `clone` inalterados.

## Capabilities

### New Capabilities

- `review-offer-layout`: quarto modo de Instância — advertorial com hop DTC, módulos de fórmula/autenticidade/efeitos/prós-contras e tabela de oferta datada, sem Pricing da Base.
- `burntide-product`: contrato da primeira Instância nesse modo (domínio, paleta, hop v4, copy/compliance, mapeamento de assets).

### Modified Capabilities

- `product-configuration`: `layout` aceita `"review-offer"`; schema ganha blocos dos novos módulos e `offer` (pacotes display-only); `plans` / `"pricing"` / `popupGate` continuam proibidos nesse ramo.
- `optional-sections`: núcleo de `review-offer` = Hero + outbound CTA + rodapé; novos ids ligáveis/ordenáveis; Pricing continua obrigatório só em `sales`.
- `tracking-tags`: clique no `outboundCta` de `review-offer` NÃO dispara evento de checkout (mesma regra do `review`).

## Impact

- **Base:** `src/product/types.ts`, `validateProductConfig`, `active.ts`, `registry.tsx`, `App.tsx`, Hero/footer/sticky (ramo outbound compartilhado com review), novas seções, CSS `[data-layout="review-offer"]`.
- **Produto novo:** `products/burntide/product.config.ts`, assets, scripts no `package.json`, serviço no compose/deploy se o padrão dos outros Produtos exigir.
- **Docs:** `PRODUCT.md` e `CONTEXT.md` passam a listar o quarto layout e o Burntide.
- **Sem regressão:** Vee, Alpha Surge (`sales`); Amino, Audifort, Moérie (`review`); CoolJet, Pawlax (`clone`).
- **Deploy:** Instância isolada (Host placeholder `burntide.thebuylens.com`; DNS/Traefik é infra).
- **Compliance:** disclosure de afiliado + FDA; claims e preços só os da oficial, datados; sem “FDA-compliant”, sem “clinically tested” do SKU, sem kit de 1 frasco que a loja não vende.
