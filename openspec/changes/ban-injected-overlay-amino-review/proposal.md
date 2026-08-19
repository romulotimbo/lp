## Why

Google Ads bloqueou as Páginas-popup (Amino `/advanced-amino` e Alpha Surge `/alphasurge`) como malicious injected overlay: diálogo inescapável sobre réplica desfocada de checkout, CTA e Close ambos indo à oferta. A campanha do Amino precisa de destino Ads na raiz — resenha completa, congruente com Muscle-Mass-Loss — e o hop ClickBank desse Produto sai de cena em favor do link Digistore24 da página oficial.

## What Changes

- **BREAKING:** `popupGate` deixa de ser válido. Spec e `validateProductConfig` rejeitam overlay injetado (popup sobre réplica de checkout, interstitial que não fecha sem navegar à oferta). Nenhum Produto emite segunda página-popup.
- Tirar `popupGate` e os arquivos `products/*/popup/` do Amino e do Alpha Surge. Paths `/advanced-amino` e `/alphasurge` **não** ganham redirect — 404 de propósito.
- Amino vira Página de Review Completa na raiz: artigo de opinião (benefícios, ingredientes, garantia de reembolso), CTA outbound nas dobras editoriais e nos módulos de conversão já existentes, mesmo `outboundCta` em todos.
- `outboundCta` do Amino passa a ser o link Digistore24 oficial `https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=romulotsilva21c8`. Sem hop ClickBank nesse Produto. Disclaimer ClickBank-as-retailer sai do Amino.
- Alpha Surge sales na raiz, Audifort e Energi Power: intocados além da remoção do popup do Alpha.

## Capabilities

### New Capabilities

- (nenhuma)

### Modified Capabilities

- `product-configuration`: schema **proíbe** `popupGate` e qualquer Página-popup / overlay injetado; build falha se o campo estiver presente. Review `outboundCta` continua label + URL oficial/hop — Amino usa Digistore24, não ClickBank.
- `review-layout`: review completa do Amino — prosa de opinião cobrindo benefícios, ingredientes e garantia; CTA outbound no fim de cada bloco editorial (`pain`, `research`, `official-claims`, `verdict`) além de Hero, `guarantee`/`mid-cta`, FAQ, footer e sticky. Sem preços, kits ou `#pricing`.
- `optional-sections`: Amino liga `guarantee` na ordem da resenha; ids novos não entram.
- `tracking-tags`: sem evento de checkout na Página-popup (página some). Clique outbound da review na raiz continua **não** disparando `InitiateCheckout`.

## Impact

- **Specs / docs:** deltas acima; `PRODUCT.md` e `CONTEXT.md` deixam de tratar Página-popup como capacidade e passam a listá-la em “Não fazer” (motivo: overlay malicioso / Google Ads).
- **Base:** `validateProductConfig` falha com `popupGate`. Plugin `product-popup-gate` fica inerte (nenhum config emite HTML). Renderer/types podem permanecer nesta change; limpeza do código morto não é bloqueante.
- **Amino:** `product.config.ts` — copy da resenha, `guarantee`, URL Digistore24, sem ClickBank, sem `popupGate`. CTA compartilhado em todas as dobras editoriais.
- **Alpha Surge:** só remove `popupGate` + `popup/popup.config.ts`. Checkout da raiz inalterado.
- **Deploy:** mesmos Hosts. URLs antigas de anúncio nos paths de popup passam a 404. Sem change de Traefik/DNS.
- **Fora de escopo:** IDs de Pixel/Ads (`trackingTags` continua `[]` no Amino); Audifort; redirect dos paths mortos.
