## Context

A Base já isola `sales` e `review`. Review hoje é artigo em 1ª pessoa + hop, sem Pricing. Audifort e Amino compartilham o shell. Esta change evolui o cromo review para Persuade (clique no hop) sem criar terceiro layout e sem inventar preço.

## Goals / Non-Goals

**Goals:**

- Visitante de review entende a oferta, vê prova atribuída e encontra o hop várias vezes no fluxo.
- Novos módulos opt-in; Produto que não os lista não renderiza placeholder.
- CSS e comportamento novos gated em `data-layout="review"` / `isReviewLayout()`.
- Audifort: stack completa. Amino: `trust` + `mid-cta` + chips no Hero.

**Non-Goals:**

- Cards de kit, `$49/$69/$79`, checkout ClickBank, evento `InitiateCheckout` no hop.
- Copiar depoimentos/agregado da oficial Audifort; usar `person*` como avatar; publicar `PRODx*`.
- Alterar Vee / Alpha Surge.
- Pixel/Ads (`trackingTags: []`).
- Faixa de disclosure no topo.

## Decisions

### 1. Opt-in modules, same outbound CTA

Cada id novo exige um bloco no config (validação igual às seções editoriais). `mid-cta` e `guarantee` usam `product.outboundCta.href`; o label pode ser override curto no bloco, senão cai no `outboundCta.label`.

### 2. Hero chips are Hero content, not a section

Chips no primeiro viewport vivem em `hero.chips?` para o Hero não depender de `trust` estar listado. A seção `trust` é a faixa completa mais abaixo.

### 3. Highlights is a section, not a field on official-claims

Audifort troca `official-claims` (prosa) por `highlights` (grid). Amino mantém `official-claims`. `EditorialArticle` ganha slot de children já existente; não precisa de highlights embutido no bloco editorial.

### 4. Token-driven light and dark

Amino permanece papel frio. Audifort sai do creme para um fundo escuro de sala de escuta (ember no accent). O cromo review usa só os 6 papéis; `isDarkBackground` ajusta o recorte do produto (chapa no claro, bleed no escuro).

### 5. Review typefaces scoped

Barlow Condensed do sales não muda. Review carrega Bricolage Grotesque (display) + Atkinson Hyperlegible (corpo), aplicadas só em `[data-layout="review"]`.

## Risks / Trade-offs

- [Amino herda Hero mais denso] → Mitigação: chips e `trust`/`mid-cta` são opt-in; copy clínica permanece.
- [Fundo escuro no Audifort vs. “Base não assume dark”] → Mitigação: dark é valor de token do Produto, não default da Base.
- [Eyebrows vs. craft-floor] → Mitigação: o brief desta change restaura rótulos editoriais sentence-case; não são HUD.
- [CTA repetido parece spam] → Mitigação: no máximo um `mid-cta` + guarantee + verdict; mesmo href.

## Migration Plan

1. Schema + validação + specs.
2. Componentes e CSS review.
3. Config Audifort, depois Amino.
4. QA hop nas duas reviews; smoke sales.

Rollback: reverter a change; configs voltam a listar só as seções antigas.
