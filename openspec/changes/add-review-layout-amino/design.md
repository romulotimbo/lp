## Context

A Base gera Instâncias a partir de `ProductConfig` (`PRODUCT=<slug>` no Vite). Dois Produtos existem: Energi Power (sales, dark, Spokesperson) e Alpha Surge (sales, dark, Nova). Hero, Pricing e rodapé são obrigatórios; o cromo é HUD/uppercase/glow neon. Os tokens *aceitam* paleta clara (ADR-0002), mas os componentes ainda assumem LP de venda.

Advanced Amino Formula é o terceiro Produto e o primeiro que não é venda: ponte editorial ClickBank, en-US, `https://advanced-amino.nothforge.com/`, sem Spokesperson, paleta clínica off-white + azul do rótulo. CTA é o hop [ClickBank](https://b8b3bhw7yh3p16s8minkl9sv1f.hop.clickbank.net/?&traffic_source=google&traffic_type=search) — página oficial, nunca checkout. Copy em 1ª pessoa (dor → pesquisa → claims oficiais → veredito), FAQ e depoimentos, disclosure de afiliado no rodapé. Assets em `products/advanced-amino-formula/recursos/`.

## Goals / Non-Goals

**Goals:**
- Acrescentar `layout: "sales" | "review"` na Base, default `"sales"`, sem regressão em Vee/Alpha Surge.
- Renderizar Instância review como artigo clínico (sentence case, sem HUD, sem glow neon, sem Pricing).
- Entregar o Produto `advanced-amino-formula` completo (config, copy, assets, scripts de dev/build).
- Separar clique outbound (hop) de clique de checkout no tracking.

**Non-Goals:**
- Embutir checkout ClickBank ou mostrar preços/kits na nossa página.
- Spokesperson, lead capture, Área Restrita, Power Grid ou Tech Mechanism neste Produto.
- IDs de Pixel/Ads (ficam `trackingTags: []` até existirem).
- CMS, i18n runtime, segundo Locale do Amino.
- Gerar Banco de mídia novo (Magnific).
- Refatorar *todos* os componentes de venda para light mode — só o cromo que o layout review realmente monta.
- Copiar depoimentos ou sales letter do fornecedor verbatim.

## Decisions

### 1. Campo `layout` no ProductConfig, não um app separado

`layout?: "sales" | "review"` (omitido = `"sales"`). `App.tsx` escolhe o shell; o alias `@product-config` e o build por `PRODUCT` não mudam.

Alternativa descartada: repo/entry Vite só para review — duplicaria deploy e perderia FAQ/Testimonials/tokens. Alternativa descartada: forçar Amino nas seções HUD — contradiz o tom clínico e o contrato de ponte.

### 2. Seções editoriais nomeadas, não um blob de artigo

Novos `OptionalSectionId`: `"pain" | "research" | "official-claims" | "verdict"`. Cada um exige um bloco `{ eyebrow?, title, body, figure? }` no config. `sections[]` continua mandando a ordem.

Alternativa descartada: um único `article.blocks[]` livre — validação fica frouxa e o registry de componentes some.

Ordem do Amino:

```
Hero
pain → research → official-claims → testimonials → verdict → faq
Footer + Sticky CTA (hop)
```

Veredito fica *antes* do FAQ para o CTA principal aparecer no fluxo de leitura; FAQ é apoio, não o fecho.

### 3. `outboundCta` substitui Pricing no layout review

```ts
outboundCta: { label: string; href: string }
```

Obrigatório quando `layout === "review"`. `plans` e a seção `"pricing"` são proibidos nesse layout (build falha se presentes — evita página híbrida acidental). Em `sales`, `outboundCta` é ignorado.

Hero primary CTA, rodapé, Sticky CTA e o botão do veredito usam o mesmo `outboundCta`.

Hop desta Instância (params inclusos, editáveis no config):

`https://b8b3bhw7yh3p16s8minkl9sv1f.hop.clickbank.net/?&traffic_source=google&traffic_type=search`

### 4. Variante de cromo via `data-layout`, não novos papéis de token

O contrato de tokens permanece os 6 papéis. `<main data-layout={layout}>` + CSS: review usa Barlow (body) em sentence case para títulos; esconde `.hud-tag`; `btn-primary` vira azul clínico. `ProductGlow` não monta em review (pote no branco, sem halo).

FAQ e Testimonials, quando `layout === "review"`, omitem tags mono HUD e `uppercase` de display. Sem fork de componente — a mesma seção lê `product.layout`.

### 5. Hero review reusa `HeroContent`, ignora HUD/vídeo

Sem Spokesperson → sem vídeo (já é o comportamento atual). Review além disso: não renderiza `hudTag`, `HUD::PRODUCT_LOCK`, nem overlay dark de vídeo. Headline em sentence case (`headlinePrefix` / `highlight` / `suffix` continuam). `primaryCta` aponta para `outboundCta.href`.

### 6. Tracking: dois handlers

`handleCheckoutClick` só em CTAs de checkout (`sales`). CTAs outbound usam `handleOutboundClick` (redirect simples; no futuro um evento tipo `ViewContent` / click-out, nunca `InitiateCheckout` nem `gtag conversion` de compra).

### 7. Copy e compliance no config do Amino

- Subhead **sem** a palavra *independent*. Tom: “A researched look at…”.
- Seção claims: só o que a [página oficial](https://b8b3bhw7yh3p16s8minkl9sv1f.hop.clickbank.net/?&traffic_source=google&traffic_type=search) já afirma (8 EAAs, protein utilization vs whey/BCAA, fórmula do Dr. Shallenberger, garantia 90 dias). Nenhuma promessa nossa de resultado.
- Reviews: “As of August 2026, the company’s site listed 3,144 reviews averaging 4.1 out of 5 (81% recommend).” — número datado, fonte = site do fabricante.
- Depoimentos: copy **original**, público 40–60, homens e mulheres. Fotos `man-testimonial.jpg` / `woman-testimonial.jpg` **não** viram avatar de reviewer inventado (risco de atribuição falsa). Usar como figura editorial na dor/pesquisa, ou cards só com iniciais.
- FAQ: fatos da página oficial (vegano, alérgenos, histidina, PKU, garantia) claramente como posição da empresa + perguntas do review (prazo 8–12 semanas, preço vs whey → hop).
- Disclosure de afiliado no rodapé, sempre expandido. Disclaimer FDA. ClickBank-as-retailer entra como disclaimer de categoria (o hop é ClickBank).

### 8. Paleta (confirmada) e assets

| Papel | Hex |
|---|---|
| background | `#F7F9FC` |
| surface | `#FFFFFF` |
| textPrimary | `#1B3A5C` |
| textMuted | `#5A6A7A` |
| accent | `#2E6BA6` |
| accentDark | `#1E4F7A` |

Hero: `1-Unit.jpg`. Claims: `8-amino-acids.jpg` como figura. `supplement-facts.jpg` **não** entra — o CTA manda o rótulo completo para a oficial. Demais arquivos de `recursos/` só se a copy do bloco já afirmar o fato.

Build copia (ou o config aponta para) `public/imagens/advanced-amino-formula/`.

### 9. Validação

`validateProductConfig`:
- `layout` omitido ou `"sales"` → regras atuais (plans ≥ 1, `sections` inclui `"pricing"`).
- `layout === "review"` → exige `outboundCta.href` + `outboundCta.label`; cada id editorial em `sections` exige o bloco correspondente; **rejeita** `"pricing"` e `plans.length > 0`.

## Risks / Trade-offs

- [Classes `cyber-*` trocam de cor via token, mas overlays/uppercase/glow continuam “de venda”] → Mitigação: `data-layout="review"` + não montar glow/HUD; não tentar “consertar” Pricing/PowerGrid nesta change.
- [Claims e contagem de reviews envelhecem] → Mitigação: números com “as of”; seção claims só reproduz a oficial; hop URL inteira no config.
- [Params `traffic_source=google` mentem se o tráfego não for search] → Mitigação: URL completa no config, fácil de trocar por campanha.
- [Foto de “testimonial” do fornecedor + nome fictício = engano] → Mitigação: decisão 7 — figuras editoriais ou iniciais, nunca face alheia com persona inventada.
- [FAQ/Testimonials leves podem vazar cromo HUD se alguém esquecer o branch de layout] → Mitigação: um helper `isReviewLayout()`; QA visual no `dev:advanced-amino-formula`.
- [Paleta clara expõe contraste ruim em `btn-primary` / rings] → Mitigação: `--color-on-accent` já existe; review força texto branco no botão azul.

## Migration Plan

1. Estender `ProductConfig` + `validateProductConfig` (`layout`, `outboundCta`, blocos editoriais). Vee e Alpha Surge não setam `layout` → continuam sales.
2. Shell review em `App.tsx` + seções `Pain` / `Research` / `OfficialClaims` / `Verdict` + registry.
3. Variantes Hero / Footer / Sticky / FAQ / Testimonials + `handleOutboundClick` + CSS `data-layout`.
4. Config + assets + scripts do Amino.
5. QA: Amino (fluxo hop, disclosure, sem checkout event) e smoke Vee + Alpha Surge (inalterados).

Rollback: não publicar o container Amino; revert do campo `layout` é aditivo (configs antigos seguem válidos).

## Open Questions

- IDs de Meta Pixel / Google Ads do Amino — fora desta change (`trackingTags: []`).
- Texto final do disclaimer ClickBank (além do de afiliado + FDA) — usar o bloco padrão ClickBank no `categoryDisclaimers` até o jurídico do programa dizer o contrário.
- Deploy Traefik/DNS de `advanced-amino.nothforge.com` — infra, não código desta change; o config já declara o domínio.
