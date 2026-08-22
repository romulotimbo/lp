## 1. Página Pawlax

- [x] 1.1 Criar `products/pawlax/page/assets/` com CSS/imagens/SVG visuais do dump (pack shots, logos, ícones, `app.css`/`main.css`/`bulma.min.css` e demais CSS da PDP); não copiar CheckoutSDK, GTM, Everflow, Stripe, Google Pay, hCaptcha, HumanSecurity
- [x] 1.2 Escrever `products/pawlax/page/index.html`: DOM visual sanitizado a partir de `Get Pawlax Now!.html`, paths reescritos para `page/assets/`, sem scripts de pagamento/tags do fornecedor; manter `toggleFAQ` inline
- [x] 1.3 Injetar `#cookie-popup-modern` (copy Cookie Policy, Allow/Close, `ratoeira-trackable`, `handleClick`) visível no load (`cookie-popup-visible-modern` + CSS que força `opacity: 1` / `pointer-events: auto`); `href` = `__AFFILIATE_HREF__`; Allow com accent `#0D40FF`
- [x] 1.4 CTAs restantes (pacotes 1×–3×, Complete Order, upsell) apontam a `__AFFILIATE_HREF__`; forms não POSTam ao merchant; disclosure `__AFFILIATE_DISCLOSURE__` no rodapé do HTML publicado
- [x] 1.5 Adicionar `products/pawlax/.gitignore` ignorando `Get Pawlax Now!_files/`

## 2. Produto, scripts e deploy

- [x] 2.1 Criar `products/pawlax/product.config.ts`: slug `pawlax`, `layout: "clone"`, domínio `pawlax.thebuylens.shop`, locale en-US/USD, tokens do design (`#0D40FF`), `clone.htmlFile` / `clone.affiliateHref` (hop clickrtrckr `92HCXFN`), `trackingTags: []`
- [x] 2.2 Adicionar `dev:pawlax` (porta 5178) e `build:pawlax` (`dist/pawlax`) no `package.json`
- [x] 2.3 Serviço `pawlax` no `docker-compose.yml` (`Host(\`pawlax.thebuylens.shop\`)`) e imagem `lp-pawlax` (`PRODUCT=pawlax`) no `deploy.yml`
- [x] 2.4 Atualizar `PRODUCT.md` e `CONTEXT.md`: listar o Pawlax ao lado do CoolJet; `popupGate` continua anti-padrão; anotar risco de Google Ads neste overlay

## 3. QA

- [x] 3.1 Subir `dev:pawlax` e validar: PDP copiada visível atrás do popup; Allow e Close abrem o hop clickrtrckr; overlay não fecha sem navegar
- [x] 3.2 Confirmar ausência de CheckoutSDK / GTM `GTM-NTH4LNFK` / POST ao merchant; dump bruto `Get Pawlax Now!.html` não é o documento servido
- [x] 3.3 Smoke `dev:energi-power-vee`, `dev:alpha-surge`, `dev:advanced-amino-formula`, `dev:audifort` e `dev:cooljet`: shells sales/review/clone inalterados
