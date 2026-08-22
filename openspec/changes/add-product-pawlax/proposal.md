## Why

Pawlax é uma tapete de resfriamento para pets (checkout [get-pawlax.com](https://get-pawlax.com), hop [clickrtrckr](https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8)) que precisa entrar no ar como Instância isolada. Sales/review da Base não reproduzem a PDP/checkout salva; a campanha pede a mesma abordagem do CoolJet: cópia visual dessa página na raiz, com um cookie popup cujas ações (Allow e Close) levam ao hop.

## What Changes

- Novo Produto `pawlax`: Instância `clone` — HTML estático na raiz (não SPA React), domínio `pawlax.thebuylens.shop`.
- Página publicada = cópia sanitizada de `products/pawlax/Get Pawlax Now!.html` (visual da checkout/PDP), não um artigo review nem Pricing da Base.
- Overlay de cookie na raiz (`#cookie-popup-modern`): Allow e Close usam `ratoeira-trackable` + `handleClick` e navegam ao hop `https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8`. O overlay não fecha sem navegar.
- Scripts `dev:pawlax` / `build:pawlax`. Serviço Traefik/container no Host `pawlax.thebuylens.shop`. `trackingTags: []` até existir Pixel/Ads.
- **Não** reativa `popupGate` nem emite segunda página em path aninhado. O clone **é** a raiz.
- **Não** altera o schema `clone` nem o plugin Vite — já existem no CoolJet. Esta change só instancia.
- Risco explícito: Google Ads já classificou overlay inescapável sobre réplica de checkout como malicious injected overlay. Esta Instância não deve ser destino de campanha Google Ads até política/revisão.

## Capabilities

### New Capabilities

- `pawlax-product`: contrato da Instância Pawlax (domínio, hop clickrtrckr, fonte HTML, markup/CSS do cookie popup, sanitização do dump). Não altera o shell da Base nem o pipeline clone.

### Modified Capabilities

Nenhuma. `clone-layout` e o ramo `clone` de `product-configuration` já cobrem o mecanismo (change `add-product-cooljet`); esta change só instancia.

## Impact

- **Base:** nenhuma change de schema, validação ou plugin Vite. O pipeline `product-clone` reusa `clone.htmlFile` / `clone.affiliateHref` e o placeholder `__AFFILIATE_HREF__`.
- **Produto novo:** `products/pawlax/` (config + página sanitizada + assets visuais). Dump bruto `Get Pawlax Now!.html` / `_files` permanece como fonte, não como output.
- **Docs:** `PRODUCT.md` / `CONTEXT.md` listam o Pawlax ao lado do CoolJet; overlay `popupGate` continua anti-padrão (segunda página). Cookie popup no clone da raiz é contrato deste Produto, com o risco de Ads acima.
- **Deploy:** imagem `lp-pawlax`, Host `pawlax.thebuylens.shop` no compose + workflow. DNS do `.shop` é infra, fora do código.
- **Sem regressão:** Vee, Alpha Surge, Amino, Audifort e CoolJet intocados.
- **Compliance:** hop visível no config; dump original perde scripts de pagamento/GTM/Everflow/hCaptcha do fornecedor — esta página não processa pedido.
