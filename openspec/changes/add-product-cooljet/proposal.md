## Why

CoolJet é uma oferta de cooler portátil (checkout [get-cooljet.com](https://get-cooljet.com), hop [clickrtrckr](https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx)) que precisa entrar no ar como Instância isolada. Sales/review da Base não reproduzem a PDP/checkout salva; a campanha pede a cópia visual dessa página na raiz, com um cookie popup cujas ações (Allow e Close) levam ao hop.

## What Changes

- Novo Produto `cooljet`: terceiro layout `clone` — HTML estático na raiz (não SPA React), domínio `cooljet.thebuylens.shop`.
- Página publicada = cópia sanitizada de `products/cooljet/Get CoolJet Now.html` (visual da checkout/PDP), não um artigo review nem Pricing da Base.
- Overlay de cookie na raiz (`#cookie-popup-modern`): Allow e Close usam `ratoeira-trackable` + `handleClick` e navegam ao hop `https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx`. O overlay não fecha sem navegar.
- Scripts `dev:cooljet` / `build:cooljet`. Serviço Traefik/container no Host `cooljet.thebuylens.shop`. `trackingTags: []` até existir Pixel/Ads.
- **Não** reativa `popupGate` nem emite segunda página em path aninhado. O clone **é** a raiz.
- Risco explícito: Google Ads já classificou overlay inescapável sobre réplica de checkout como malicious injected overlay. Esta Instância não deve ser destino de campanha Google Ads até política/revisão.

## Capabilities

### New Capabilities

- `clone-layout`: terceiro modo de Instância — HTML estático na raiz, copiado de um dump sanitizado; overlay de cookie na mesma página; hop de afiliado em toda ação do popup; sem shell sales/review.
- `cooljet-product`: contrato da Instância CoolJet (domínio, hop clickrtrckr, fonte HTML, markup/CSS do cookie popup, sanitização do dump).

### Modified Capabilities

- `product-configuration`: `layout` passa a aceitar `"clone"` além de `"sales"` / `"review"`. Clone exige hop + fonte HTML; rejeita `plans`, seções editoriais da Base e `popupGate`. Sales/review inalterados.

## Impact

- **Base:** `PageLayout` + `validateProductConfig` (ramo `clone`); plugin Vite que, nesse layout, emite o HTML/assets estáticos em vez do bundle React. Sales/review não mudam de cromo.
- **Produto novo:** `products/cooljet/` (config + página sanitizada + assets visuais). Dump bruto `Get CoolJet Now.html` / `_files` permanece como fonte, não como output.
- **Docs:** `PRODUCT.md` / `CONTEXT.md` listam `clone` e o CoolJet; overlay `popupGate` continua anti-padrão (segunda página). Cookie popup no clone da raiz é contrato deste Produto, com o risco de Ads acima.
- **Deploy:** imagem `lp-cooljet`, Host `cooljet.thebuylens.shop` no compose + workflow. DNS do `.shop` é infra, fora do código.
- **Sem regressão:** Vee, Alpha Surge, Amino e Audifort intocados.
- **Compliance:** hop visível no config; dump original perde scripts de pagamento/GTM/Clarity/Everflow do fornecedor — esta página não processa pedido.
