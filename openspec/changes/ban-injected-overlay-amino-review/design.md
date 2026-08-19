## Context

Duas Instâncias emitem Página-popup (`popupGate`): Alpha Surge `/alphasurge` (sales) e Amino `/advanced-amino` (review). O HTML estático monta um diálogo inescapável sobre réplica desfocada de checkout — padrão que o Google Ads classificou como malicious injected overlay. A spec `popup-gate` nunca foi arquivada em `openspec/specs/`; o contrato vive em `PRODUCT.md`, `CONTEXT.md`, `PopupGateConfig` e o plugin Vite.

A raiz do Amino já é `layout: "review"`, hop ClickBank, tom clínico (“researched look”), CTA só em Hero / um `mid-cta` / verdict / FAQ / footer / sticky. A campanha aponta para Muscle-Mass-Loss na oficial Digistore24. Audifort já tem a stack de conversão (`guarantee`, etc.) e não tem popup.

## Goals / Non-Goals

**Goals:**

- Nenhum Produto emite overlay injetado. Spec + validação rejeitam `popupGate`. Configs Amino e Alpha Surge perdem o campo e a pasta `popup/`.
- Paths `/advanced-amino` e `/alphasurge` 404. Sem redirect.
- Amino na raiz: resenha completa em 1ª pessoa (benefícios, 8 EAAs, garantia 90 dias), congruente com a letter oficial, CTA outbound em cada dobra editorial.
- Destino único do Amino: URL Digistore24 com `#aff=romulotsilva21c8`. Sem hop ClickBank nesse Produto. Disclaimer ClickBank-as-retailer sai.
- Clique review continua sem `InitiateCheckout`. Hash `#aff=` sobrevive na navegação.

**Non-Goals:**

- Redirect 301/302 dos paths mortos.
- Apagar nesta change `src/popup-gate/render-html.ts`, o plugin Vite ou os tipos `PopupGate*` (ficam inertes; validação impede reativação).
- Pixel/Ads (`trackingTags` Amino continua `[]`).
- Kits, preços ou `#pricing` na review.
- Mudar Audifort copy, Vee, ou o checkout da raiz do Alpha Surge.
- Arquivar `add-amino-popup-page` (change complete, oposta a esta). Não mergear `popup-gate` no spec principal.

## Decisions

### 1. Ban in spec + fail the build, remove configs, leave renderer inert

`validateProductConfig` falha se `popupGate` estiver presente, com mensagem explícita (overlay / Google Ads). Plugin sem config não emite HTML — o 404 é o comportamento do Host estático.

Alternativa rejeitada: só apagar configs sem validar. Agente recria o overlay. Alternativa rejeitada: redirect para `/`. Pedido explícito: 404.

### 2. EditorialArticle owns the fold CTA

`Pain`, `Research`, `OfficialClaims` e `Verdict` passam a renderizar o mesmo `outboundCta` no fim da prosa via `EditorialArticle` (slot que o Verdict já usa). Verdict não duplica botão. `showOutboundCta` default `true` em review; não entra em `trust` / `highlights` / `ritual` / `compare` / depoimentos (não são `EditorialArticle`). FAQ, `mid-cta`, `guarantee`, Hero, footer e sticky seguem como hoje.

Audifort herda o botão nas dobras editoriais que já tem — mesmo href, sem copy nova. Aceitável: contrato de review, não flag Amino-only.

### 3. Digistore24 URL is a string; preserve the hash

`outboundCta.href` é a URL completa, incluindo `#aff=romulotsilva21c8`. `OutboundLink` / âncoras usam o href cru. Nenhum helper que parseie `search` e reconstrua a URL (isso descarta o fragment). Não concatenar `?src=` em cima dessa URL.

### 4. Amino copy is a complete review, still attributed

Reescrever `product.config.ts` do Amino: headline e dor alinhados a perda de massa muscular; corpo cobre benefícios (recuperação, energia, contraste whey/BCAA), lista dos 8 EAAs, garantia “down-to-the-last-pill” 90 dias. Claims da [letter oficial](https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=romulotsilva21c8) datados e atribuídos. Sem fabricar resultado.

Seções alvo:

`pain`, `trust`, `research`, `official-claims`, `guarantee`, `testimonials`, `mid-cta`, `verdict`, `faq`

`guarantee` entra (padrão Audifort, sem bônus digitais — a oficial Amino não anuncia isso). Labels de CTA: compra / oferta oficial (“Check the official offer”), não “See a researched look”. Footer e FAQ deixam de citar ClickBank. `categoryDisclaimers` fica só FDA/suplemento.

### 5. Docs flip Página-popup from capability to ban

`PRODUCT.md` e `CONTEXT.md`: Página-popup sai de “Capaz hoje” / vocabulário ativo e entra em “Não fazer”, com o motivo (malicious injected overlay / Google Ads). Vocabulário pode manter o termo só para nomear o anti-padrão.

### 6. CTA tracking list expands; still not checkout

Todo controle que usa `outboundCta` (dobras editoriais incluídas) navega e **não** dispara evento de checkout. Sales inalterado.

## Risks / Trade-offs

- [Anúncios ainda apontam `/advanced-amino` ou `/alphasurge`] → 404 de propósito. Operador troca o URL do anúncio para a raiz. Sem mitigação de redirect.
- [Audifort ganha botões extras nas dobras editoriais] → Mesmo hop; visual alinhado a “CTA repetido”. Sem mudança de copy Audifort.
- [Código `popup-gate` morto no repo] → Validação bloqueia reativação. Limpeza do renderer numa change seguinte.
- [Hash `#aff=` perdido se alguém “normalizar” URL] → Decisão 3; teste manual do href no HTML.
- [`add-amino-popup-page` complete vs esta change] → Não arquivar a antiga no spec principal. Esta change é a fonte de verdade.

## Migration Plan

1. Specs + validação rejeitando `popupGate`.
2. Remover configs/pastas popup Amino e Alpha Surge.
3. CTA no `EditorialArticle`; docs.
4. Reescrever Amino (Digistore24, guarantee, copy, disclaimers).
5. Build Amino e Alpha Surge: raiz OK, paths de popup ausentes no dist. Smoke Audifort/Vee.

Rollback: reverter o commit; popups voltam ao ar (e ao risco Ads).

## Open Questions

Nenhum bloqueante. Label exato do CTA Amino (“Check the official offer” vs “See current pricing”) fica no apply, desde que não finja checkout nesta Instância.
