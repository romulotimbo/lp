## 1. Schema clone

- [x] 1.1 Estender `PageLayout` com `"clone"` e adicionar `CloneConfig` (`htmlFile`, `affiliateHref`) em `src/product/types.ts`
- [x] 1.2 Ramo `clone` em `validateProductConfig`: exigir `clone.htmlFile` + `clone.affiliateHref` + disclosure; rejeitar `plans` e `popupGate`; não exigir plans/outboundCta/sections da Base
- [x] 1.3 Ajustar tipos para o ramo clone não exigir `hero` / `sections` / `footer` / `stickyCta` da SPA (sales/review continuam exigindo)

## 2. Pipeline estático

- [x] 2.1 Plugin Vite `product-clone`: em `layout === "clone"`, servir `clone.htmlFile` em `/` no dev e copiar HTML + assets visuais no build; não montar `productHtmlPlugin` da SPA nem `popupGatePlugin`
- [x] 2.2 `vite.config.ts`: escolher o pipeline clone vs React conforme `resolveLayout`; sales/review inalterados

## 3. Página CoolJet

- [x] 3.1 Criar `products/cooljet/page/assets/` com CSS/imagens/SVG visuais do dump (`style.css`, logos, pack shot, ícones); não copiar CheckoutSDK, GTM, Clarity, Everflow, Stripe, Google Pay, hCaptcha
- [x] 3.2 Escrever `products/cooljet/page/index.html`: DOM visual sanitizado a partir de `Get CoolJet Now.html`, paths reescritos para `page/assets/`, sem scripts de pagamento/tags do fornecedor
- [x] 3.3 Injetar `#cookie-popup-modern` (copy Cookie Policy, Allow/Close, `ratoeira-trackable`, `handleClick`) visível no load (`cookie-popup-visible-modern` + CSS que força `opacity: 1` / `pointer-events: auto`); `href` e redirect = hop clickrtrckr
- [x] 3.4 CTAs restantes (`GET IT NOW`, `Complete Purchase`) apontam ao mesmo hop; forms não POSTam ao merchant; disclosure de afiliado no rodapé do HTML publicado

## 4. Produto, scripts e deploy

- [x] 4.1 Criar `products/cooljet/product.config.ts`: slug `cooljet`, `layout: "clone"`, domínio `cooljet.thebuylens.shop`, locale en-US/USD, tokens do design (`#0173AD`), `clone.htmlFile` / `clone.affiliateHref`, `trackingTags: []`
- [x] 4.2 Adicionar `dev:cooljet` (porta 5177) e `build:cooljet` (`dist/cooljet`) no `package.json`
- [x] 4.3 Serviço `cooljet` no `docker-compose.yml` (`Host(\`cooljet.thebuylens.shop\`)`) e imagem `lp-cooljet` (`PRODUCT=cooljet`) no `deploy.yml`
- [x] 4.4 Atualizar `PRODUCT.md` e `CONTEXT.md`: listar `clone` e o CoolJet; `popupGate` continua anti-padrão; anotar risco de Google Ads neste overlay

## 5. QA

- [x] 5.1 Subir `dev:cooljet` e validar: PDP copiada visível atrás do popup; Allow e Close abrem o hop clickrtrckr; overlay não fecha sem navegar
- [x] 5.2 Confirmar ausência de CheckoutSDK / GTM do dump / POST ao merchant; dump bruto `Get CoolJet Now.html` não é o documento servido
- [x] 5.3 Smoke `dev:energi-power-vee`, `dev:alpha-surge`, `dev:advanced-amino-formula` e `dev:audifort`: shells sales/review inalterados
