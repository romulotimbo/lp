## 1. Ban overlay

- [x] 1.1 `validateProductConfig`: se `popupGate` existir, falhar o build com mensagem de overlay injetado / Google Ads; remover a validação permissiva de campos do gate
- [x] 1.2 Tirar `popupGate` e o import de `createPopupGate` de `products/advanced-amino-formula/product.config.ts` e `products/alpha-surge/product.config.ts`
- [x] 1.3 Apagar `products/advanced-amino-formula/popup/` e `products/alpha-surge/popup/`
- [x] 1.4 `PRODUCT.md` e `CONTEXT.md`: Página-popup sai de capacidade e entra em “Não fazer” (malicious injected overlay)

## 2. CTA nas dobras editoriais

- [x] 2.1 `EditorialArticle` renderiza `OutboundLink` com `outboundCta` no fim da prosa quando o layout é review
- [x] 2.2 `Verdict` deixa de duplicar o botão (usa o CTA do `EditorialArticle`)
- [x] 2.3 Confirmar que `OutboundLink` passa o href cru, inclusive hash `#aff=`

## 3. Review completa Amino

- [x] 3.1 `outboundCta.href` = `https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=romulotsilva21c8`; label de oferta oficial / compra; sem hop ClickBank
- [x] 3.2 Reescrever copy (Hero, pain, research, official-claims, mid-cta, verdict, FAQ, footer, sticky) como resenha de opinião: benefícios, 8 EAAs, garantia 90 dias; claims da oficial atribuídos e datados
- [x] 3.3 Ligar `guarantee` (sem bônus digitais) na ordem `pain → trust → research → official-claims → guarantee → testimonials → mid-cta → verdict → faq`
- [x] 3.4 Remover disclaimer ClickBank-as-retailer e microcopy “via ClickBank”; manter disclosure de afiliado + FDA

## 4. QA

- [x] 4.1 Build Amino: raiz serve a review; dist **não** contém `advanced-amino/index.html`; todo CTA abre a URL Digistore24 com `#aff=`
- [x] 4.2 Build Alpha Surge: raiz sales intacta (checkout Heroic Hustle); dist **não** contém `alphasurge/index.html`
- [x] 4.3 Smoke Audifort: dobras editoriais também mostram outbound CTA; hop ClickBank e copy inalterados
- [x] 4.4 Smoke Energi Power: shell sales inalterado
