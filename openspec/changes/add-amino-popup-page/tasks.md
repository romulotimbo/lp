## 1. Schema da réplica sem plans

- [x] 1.1 Estender `PopupGateConfig.backdrop` com `cards?` (name, image, price, perUnit?, description, featured?, id?, value?)
- [x] 1.2 Em `renderPopupGateHtml`, montar os cards da réplica a partir de `backdrop.cards` quando existir; senão continuar usando `config.plans` (Alpha Surge)
- [x] 1.3 Conversão do script do popup: valor/id/nome vêm do card `featured` (ou plano recommended); fallback `productName` e `value: 0`
- [x] 1.4 `validateProductConfig`: review + `plans` continua erro; review + `popupGate` + cards é válido; `popupGate` ainda exige path (um segmento), `checkoutHref`, `sourceParam`, `defaultSource`; card sem name/image/price falha o build

## 2. Página-popup do Amino

- [x] 2.1 Criar `products/advanced-amino-formula/popup/popup.config.ts` com `createPopupGate(hop)`: path `advanced-amino`, `sourceParam: "src"`, `defaultSource: "PopUp"`, copy/cores/reassurance do design
- [x] 2.2 Cards decorativos 1 / 3 / 6 frascos com preços da oficial (conferir no apply), `3 Bottles` featured, imagem `/imagens/advanced-amino-formula/1-Unit.jpg` nos três
- [x] 2.3 Ligar `popupGate: createPopupGate(HOP)` no `product.config.ts` do Amino, reusando o mesmo hop do `outboundCta`; não adicionar `plans` nem Tags novas

## 3. Docs

- [x] 3.1 Atualizar `PRODUCT.md`: Amino publica Página-popup em `/advanced-amino`; preços da réplica não entram na review; `trackingTags` continua compartilhado e vazio

## 4. QA

- [x] 4.1 `dev:advanced-amino-formula`: `/advanced-amino` mostra popup + fundo desfocado com 3 cards; CTA e Close abrem o hop com `src=PopUp`
- [x] 4.2 `/advanced-amino?src=PopUpFB01` repassa `src=PopUpFB01` no hop; a review em `/` continua sem preços, sem `src=PopUp` e sem `InitiateCheckout`
- [x] 4.3 Smoke `dev:alpha-surge` em `/alphasurge`: réplica ainda vem dos `plans`, `src=PopUp` intacto
- [x] 4.4 `build:advanced-amino-formula` emite `advanced-amino/index.html` com `noindex`
