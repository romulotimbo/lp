## Why

A Instância do Advanced Amino Formula só tem a página de review na raiz. Campanhas pagas precisam da mesma estratégia já no ar no Alpha Surge: uma Página-popup no mesmo domínio, com réplica desfocada do checkout e um único popup cuja qualquer ação leva ao hop com `?src=` para separar o tráfego. Sem isso, o Amino não consegue o mesmo formato de anúncio sem misturar kits na review.

## What Changes

- Ligar `popupGate` no Produto `advanced-amino-formula`: path `/advanced-amino`, hop ClickBank idêntico ao `outboundCta` da review, `sourceParam: "src"`, `defaultSource: "PopUp"` — URL canônica `https://advanced-amino.nothforge.com/advanced-amino/?src=PopUp`.
- Reusar o módulo já existente na Base (HTML estático, Tags de rastreamento do mesmo `ProductConfig`, `noindex`). Não criar Produto, domínio nem pixel novos.
- Estender a réplica de fundo para um Produto `review` (que **não pode** ter `plans`): cards decorativos entram em `popupGate.backdrop`, não no schema de Pricing. A página de review continua sem preço, kit ou evento de checkout.
- Clique no popup (CTA e “Close”) redireciona ao hop com o `src` da URL e dispara o evento de checkout das Tags — o mesmo contrato do Alpha Surge. O hop da review na raiz **não** muda.
- Copy, cores e cards da réplica imitam o checkout/PDP oficial (1 / 3 / 6 frascos), não os tokens clínicos da review.

## Capabilities

### New Capabilities

- `popup-gate`: segunda página estática da mesma Instância, num path próprio; popup único sobre réplica desfocada do checkout; origem `?src=` (ou equivalente) segue para o link de afiliado; Tags de rastreamento e SEO vêm do mesmo `ProductConfig`; `noindex`.

### Modified Capabilities

- `product-configuration`: schema passa a descrever `popupGate` opcional em qualquer layout; Produto `review` continua **proibido** de ter `plans`; a réplica de fundo pode declarar cards decorativos no próprio `popupGate`.
- `tracking-tags`: clique na Página-popup **é** evento de checkout (`InitiateCheckout` / conversion), inclusive quando o Produto é `review`. Clique outbound da página de review continua **não** disparando esse evento.

## Impact

- **Base:** `PopupGateConfig` / `render-html.ts` (cards da réplica independentes de `plans`); validação em `validateProductConfig`; spec nova `popup-gate`.
- **Produto:** `products/advanced-amino-formula/popup/popup.config.ts` + campo `popupGate` no `product.config.ts`. Assets: reuso de `1-Unit.jpg` (já publicado).
- **Review na raiz:** inalterada (copy, hop sem `src=PopUp`, sem preços, sem `InitiateCheckout`).
- **Alpha Surge:** inalterado — continua montando a réplica a partir de `plans`.
- **Deploy:** mesmo Host `advanced-amino.nothforge.com`; o plugin já emite `<path>/index.html`. Sem change de Traefik/DNS.
- **Tracking:** `trackingTags` continua `[]` até existirem IDs; quando existirem, review e popup compartilham a mesma lista (não o mesmo evento).
