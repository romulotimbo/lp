## Why

O layout `review` (Amino/Audifort) e o rascunho genérico `moerie-hair-boost` tratam um SKU com dor → pesquisa → veredito. Esta oferta é outra coisa: dois cosméticos capilares (pílulas sistêmicas + spray tópico), público en-US, voz de “jornada do cético” e um micro-quiz que troca ênfase — sem virar barreira JS nem tela branca para o Googlebot. Encaixar isso no cromo genérico quebraria a narrativa e a regra de conteúdo editorial sempre no HTML.

## What Changes

- Introduzir **layout `review-skeptic`** na Base (default continua `sales`; `review`, `review-offer` e `clone` não mudam de cromo nem de regras). Não é tema em cima de `review`.
- Página em **inglês (en-US)** com estrutura fixa: barra editorial → Hero + micro-quiz → Atos 1–7 → rodapé de compliance com páginas legais.
- Dois hops oficiais (pílulas e spray). O quiz **destaca e rola**; o HTML inicial já contém o artigo completo dos dois protocolos. Sem `display:none` / early-return que esconda atos para crawler.
- Prerender/SSG da landing e das páginas legais no build (HTML com o texto editorial no primeiro byte — evita tela branca para o bot).
- Novo contrato de páginas de compliance no mesmo Host: Terms, Privacy (cookies + GDPR/CCPA), Medical Disclaimer, About + contato.
- Reescrever o Produto `moerie-hair-boost` para este layout (o rascunho `layout: "review"` deixa de valer). Assets já em `products/moerie-hair-boost/` e `public/imagens/moerie-hair-boost/` entram na nova narrativa; spray precisa de hop e mídia próprios.
- Etapa de **Impeccable** no apply: direção visual específica do nicho (review editorial de cabelo, não HUD de sales nem cromo clínico genérico de Amino/Audifort).
- Scripts `dev:moerie-hair-boost` / `build:moerie-hair-boost` já existem (porta 5179); ajustar o que o layout novo exigir.

## Capabilities

### New Capabilities

- `review-skeptic-layout`: quinto modo de Instância — advertorial “jornada do cético” para linha dual (interno vs tópico), barra editorial, atos 1–7, micro-quiz híbrido (destaque/rolagem, nunca gate de conteúdo), dois CTAs outbound, sem Pricing da Base.
- `hybrid-protocol-quiz`: contrato do quiz de 4 perguntas (pílulas vs spray): pontuação, default SSR, ênfase visual no Ato 4, scroll suave, sem ocultar texto.
- `compliance-pages`: páginas satélite no mesmo Host (Terms, Privacy, Medical Disclaimer, About/contato) ligadas no rodapé; prerenderadas com a landing.
- `moerie-hair-product`: contrato da Instância Moérie (en-US, dois SKUs, hops oficiais, copy cética, paleta pós-Impeccable, mapeamento de assets).

### Modified Capabilities

- `product-configuration`: `layout` aceita `"review-skeptic"`; schema ganha catálogo dual de ofertas, bloco do quiz, atos, barra editorial e `compliancePages`; `plans` / `"pricing"` / `popupGate` continuam proibidos nesse ramo. `outboundCta` único deixa de ser o único hop — o layout exige os dois SKUs.
- `optional-sections`: núcleo de `review-skeptic` = barra editorial + Hero + quiz + rodapé; novos ids dos atos ligáveis/ordenáveis; Pricing continua obrigatório só em `sales`.
- `tracking-tags`: clique em qualquer hop de SKU (Hero, Ato 4, Ato 5, Ato 7, footer, sticky) NÃO dispara evento de checkout (mesma regra de `review` / `review-offer`).
- `legal-disclaimers`: disclosure de afiliado visível **na barra do topo** (além do rodapé); isenção médica detalhada na página `/medical-disclaimer` e no rodapé.

## Impact

- **Base:** `src/product/types.ts`, `validateProductConfig`, `active.ts`, `registry.tsx`, `App.tsx` (router mínimo + `data-layout="review-skeptic"`), novas seções dos atos, barra editorial, quiz, CSS gated no layout, prerender no build Vite.
- **Produto:** reescrita de `products/moerie-hair-boost/product.config.ts`; assets de pílulas já publicados; spray + UGC reais a publicar; páginas de compliance no config.
- **Docs:** `PRODUCT.md` e `CONTEXT.md` passam a listar o quinto layout e a Instância Moérie como dual-SKU, não review genérico.
- **Sem regressão:** Vee, Alpha Surge (`sales`); Amino, Audifort (`review`); Burntide (`review-offer`); CoolJet, Pawlax (`clone`).
- **Deploy:** Host placeholder `moerie-hair-boost.thebuylens.com` (DNS/Traefik é infra). `trackingTags: []` até existir Pixel/Ads.
- **Compliance:** FTC/Google Ads — disclosure acima da dobra; copy original (anti thin affiliation); sem before/after corporal; claims atribuídos; diário de 90 dias como experiência da redação, não resultado típico; hops oficiais, alerta de falsificação sem preço inventado.
