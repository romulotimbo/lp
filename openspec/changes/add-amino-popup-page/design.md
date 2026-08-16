## Context

A Base já emite uma Página-popup opcional (`PopupGateConfig` + plugin `product-popup-gate` + `src/popup-gate/render-html.ts`). O Alpha Surge publica a sua em `https://alphasurge.nothforge.com/alphasurge`: HTML estático, popup de “stock/shipping”, fundo desfocado montado a partir de `productName` + `plans`, qualquer clique no popup vai ao checkout com `?src=` (default `PopUp`), Tags de rastreamento iguais às da Instância.

O Advanced Amino Formula é `layout: "review"` em `https://advanced-amino.nothforge.com/`. A review **proíbe** `plans` (build falha) e o hop ClickBank **não** dispara `InitiateCheckout`. O renderer da Página-popup já tolera `plans` ausente — a conversão vai com `value: 0` e a réplica fica **sem cards**. Sem cards o fundo não parece checkout, que é o conceito do anúncio.

Hop atual (mesmo da review):

`https://b8b3bhw7yh3p16s8minkl9sv1f.hop.clickbank.net/?&traffic_source=google&traffic_type=search`

URL pedida da campanha: `https://advanced-amino.nothforge.com/advanced-amino/?src=PopUp`.

## Goals / Non-Goals

**Goals:**

- Publicar a Página-popup do Amino em `/advanced-amino` na mesma Instância, mesmo hop, mesmas Tags de rastreamento.
- Qualquer ação no popup (CTA e “Close”) leva ao hop com `src` lido da URL da página (fallback `PopUp`).
- Réplica desfocada com três cards (1 / 3 / 6 frascos) sem colocar `plans` no ProductConfig de review.
- Clique no popup dispara o evento de checkout das Tags, quando existirem; a review na raiz continua sem esse evento.
- Alpha Surge permanece com a réplica vinda de `plans`.

**Non-Goals:**

- Preços, kits ou `InitiateCheckout` na página de review (`/`).
- Novo Produto, domínio, container ou pixel.
- IDs de Meta Pixel / Google Ads (`trackingTags` continua `[]`).
- Cards clicáveis na réplica (o fundo é decorativo; só o popup navega).
- Copiar sales letter da Advanced Bionutritionals.
- Mudar Traefik/DNS (o Host já cobre o path).
- Página-popup para Audifort ou outros reviews nesta change.

## Decisions

### 1. Reusar o módulo, não um layout novo

`popupGate` no `product.config.ts` do Amino, no mesmo padrão do Alpha Surge (`createPopupGate(HOP)` em `products/advanced-amino-formula/popup/popup.config.ts`). O plugin já emite `advanced-amino/index.html` e serve o path em `npm run dev:advanced-amino-formula`.

Alternativa descartada: rota React na SPA — o comentário do renderer já rejeita isso (first paint da review inteira só para um popup). Alternativa descartada: segundo Produto / segundo Host — quebra o 1:1 Instância e duplicaria pixel.

### 2. Cards da réplica vivem no `popupGate`, não em `plans`

Estender `PopupGateConfig.backdrop` com `cards?`: nome, imagem, preço, per-unit, descrição, `featured?`, `id?`, `value?`. O renderer usa `gate.backdrop.cards` quando presente; senão cai em `config.plans` (Alpha Surge).

Validação: `layout: "review"` + `plans` continua falhando. `review` + `popupGate` + `backdrop.cards` é válido.

Alternativa descartada: relaxar a proibição de `plans` em review — misturaria Pricing na review no próximo descuido. Alternativa descartada: réplica sem cards — o anúncio deixa de parecer checkout.

### 3. Hop idêntico + `src` na frente

```ts
checkoutHref: HOP  // o mesmo outboundCta.href
sourceParam: "src"
defaultSource: "PopUp"
path: "advanced-amino"
```

O JS já faz `url.searchParams.set(sourceParam, source)`. Resultado típico:

`...hop.clickbank.net/?traffic_source=google&traffic_type=search&src=PopUp`

`traffic_source` / `traffic_type` ficam como na review (pedido: mesmas configs, só diferenciar campanha via `src`). Criações de anúncio usam `?src=PopUpFB01` etc. sem mudar código.

### 4. Evento de checkout só no popup, não na review

Quando `trackingTags` tiver Pixel/Ads, o script já existente do popup dispara `InitiateCheckout` / conversion **antes** do redirect — inclusive num Produto review. `handleOutboundClick` da raiz não muda.

Conversão sem `plans`: usar o card `featured` (id/nome/`value`); se não houver, `productName` e `value: 0`.

### 5. Copy, cores e pacotes — imitar o PDP oficial, não a review

Cores do popup são independentes dos tokens do Produto (já é o contrato). Alpha Surge usa Bootstrap `#212529` / `#ffc107` porque o checkout do fornecedor é assim. O Amino imita o PDP da Advanced Bionutritionals:

| Papel | Hex proposto | Papel visual |
|---|---|---|
| dark | `#1B3A5C` | barra/header navy do rótulo |
| accent | `#C9A227` | CTA dourado de checkout clínico (não o amarelo do Alpha Surge) |

Copy (en-US, mesmo molde do Alpha Surge, nome do produto trocado):

- title: `Advanced Amino Formula Stock & Shipping Check`
- body: cookies / disponibilidade de envio / desconto antes do estoque acabar
- ctaLabel: `Check Availability`
- closeLabel: `Close`
- headline: `Claim your Discounted Advanced Amino Formula Below While Stock Lasts`
- reassurance: `90-day money-back guarantee · Free US shipping on 3 and 6 bottle packages`
- cardCtaLabel: `Add to cart`

Cards decorativos (preços públicos da [oficial](https://www.advancedbionutritionals.com/Amino-Acid-Supplements/Advanced-Amino/PDP/FS.htm), conferir no apply):

| Card | Preço | per-unit | featured |
|---|---|---|---|
| 1 Bottle | `$44.95` | `$44.95/bottle` | não |
| 3 Bottles | `$119.85` | `$39.95/bottle` | sim |
| 6 Bottles | `$199.50` | `$33.25/bottle` | não |

Imagem: `1-Unit.jpg` nos três (único pack shot publicado; o blur esconde a repetição). Não publicar `PRODx*` de outro Produto nem inventar composição 3/6.

Os preços existem **só** na réplica desfocada (não clicável). A review continua sem dollar amount.

### 6. SEO e rastreamento herdados

O HTML já copia `seo.title` / `description` / OG da review, injeta as mesmas Tags e marca `noindex, nofollow`. Sem campos novos. `trackingTags: []` permanece até existirem IDs — o popup simplesmente não dispara evento até lá.

## Risks / Trade-offs

- [Preços na réplica vs. “review nunca mostra preço”] → Mitigação: cards só no HTML estático do path `/advanced-amino`, `pointer-events: none`, review intocada. Spec deixa explícito.
- [Preço oficial muda e a réplica fica datada] → Mitigação: blur + “conferir no apply”; atualizar só `popup.config.ts`. Não é oferta nossa.
- [Hop ClickBank ignorar `src`] → Mitigação: ClickBank aceita `src` no hop; mesmo padrão do Alpha Surge. Se o relatório não separar, o param ainda diferencia a URL da campanha no nosso lado.
- [CTA dourado × navy ilegível] → Mitigação: texto do botão usa `dark` sobre `accent` (como o Alpha Surge); QA visual.
- [Regressão Alpha Surge] → Mitigação: fallback `cards ?? plans`; smoke `dev:alpha-surge` em `/alphasurge`.
- [Indexação da página rasa] → Mitigação: `noindex` já está no renderer.

## Migration Plan

1. Estender `PopupGateConfig.backdrop.cards` e o renderer (fallback para `plans`).
2. Validação: review + popupGate + cards OK; review + plans continua erro.
3. `products/advanced-amino-formula/popup/popup.config.ts` + `popupGate: createPopupGate(HOP)`.
4. Atualizar `PRODUCT.md` (path `/advanced-amino`; preços só na réplica).
5. QA: `dev:advanced-amino-formula` → `/advanced-amino` e `/advanced-amino?src=PopUpFB01`; smoke da review na raiz e do popup do Alpha Surge.

Rollback: remover `popupGate` do config do Amino e rebuild. O plugin não emite o HTML. Sem migração de schema persistido.

## Open Questions

- Hex final do `accent` — confirmar no PDP oficial no dia do apply (Cloudflare bloqueou o fetch da proposta).
- Pacotes 1/3/6 e valores — revalidar na oficial; se a oferta do hop mostrar outros totais, preferir o que o hop realmente abre.
- IDs de Pixel/Ads — fora desta change.
