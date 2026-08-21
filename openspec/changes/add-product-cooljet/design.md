## Context

A Base gera Instâncias `sales` e `review` via `ProductConfig` + Vite + React. CoolJet não cabe nesses shells: a campanha pede a cópia visual da checkout/PDP salva em `products/cooljet/Get CoolJet Now.html`, no Host `cooljet.thebuylens.shop`, com hop [clickrtrckr](https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx).

`popupGate` (segunda página com overlay sobre réplica desfocada) está **proibido** — Google Ads classificou como malicious injected overlay. Esta change não reativa esse campo. O clone **é** a raiz: HTML estático + cookie popup na mesma página. Operador confirmou o padrão (Allow e Close → hop) e o risco de Ads documentado.

Dump atual inclui scripts vivos do fornecedor (GTM `GTM-PHD5KGH`, Clarity, Everflow, CheckoutSDK, Stripe/Google Pay/hCaptcha). Publicar isso processaria pedido no merchant original. A página publicada é uma cópia sanitizada.

## Goals / Non-Goals

**Goals:**

- Publicar o Produto `cooljet` como Instância `clone` na raiz: visual da PDP/checkout salva, cookie popup visível no load, Allow e Close indo ao hop.
- Estender o schema com `layout: "clone"` sem alterar o cromo sales/review.
- Sanitizar o dump (sem pagamento/tags do fornecedor) e copiar só assets visuais.
- Scripts `dev:cooljet` / `build:cooljet`, compose + imagem `lp-cooljet` no Host `cooljet.thebuylens.shop`.

**Non-Goals:**

- Reativar `popupGate` ou emitir HTML em path aninhado (`/cooljet`, etc.).
- Reconstruir a PDP em React (Hero, Pricing, review).
- Processar pedido, cartão ou hCaptcha nesta Instância.
- IDs de Pixel/Ads (`trackingTags: []`).
- DNS de `thebuylens.shop` (infra; o compose só declara o Host).
- Destinar esta URL a campanha Google Ads nesta change.
- Limpar o dump bruto (`Get CoolJet Now.html` / `_files`) — fica como fonte.

## Decisions

### 1. Terceiro layout `clone`, não sales/review e não `popupGate`

`PageLayout = "sales" | "review" | "clone"`. Clone emite HTML estático na raiz. `validateProductConfig` ganha um ramo `clone` e continua falhando se `popupGate` existir.

Alternativa descartada: Produto `review` com hop nos CTAs — não é a página pedida. Alternativa descartada: reusar `popupGate` num path — viola o ban e duplica o anti-padrão. Alternativa descartada: segundo repo/container sem `ProductConfig` — quebra 1:1 Instância e o `PRODUCT=` do Dockerfile.

### 2. Schema mínimo no `ProductConfig`

```ts
layout: "clone"
clone: {
  htmlFile: "page/index.html"      // publicado, não o dump bruto
  affiliateHref: "https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx"
}
```

Obrigatório em clone: `slug`, `productName`, `domain`, `locale` (inclui Disclaimer de afiliado), `seo`, `tokens` (6 papéis — identidade/themeColor, **não** aplicados no CSS copiado), `trackingTags`, `clone.htmlFile`, `clone.affiliateHref`.

Proibido em clone: `plans`, `popupGate`, `sections` da Base, Spokesperson, lead capture.

Hero / footer / stickyCta da Base **não** são renderizados. Tipos: ramo `clone` não exige esses campos (união discriminada ou validação que os ignora). `outboundCta` não entra — o hop vive em `clone.affiliateHref`.

### 3. Vite emite estático quando `layout === "clone"`

`vite.config.ts`: se clone, plugin `product-clone` (sem `productHtmlPlugin` da SPA, sem `popupGatePlugin`):

- Dev (`dev:cooljet`, porta **5177**): serve `products/cooljet/page/index.html` em `/` e os assets ao lado.
- Build (`build:cooljet` → `dist/cooljet`; Dockerfile `PRODUCT=cooljet` → `dist/`): copia o HTML para `index.html` e os assets visuais. Sem bundle React.

`tsc --noEmit` do `npm run build` do Dockerfile continua; o `product.config.ts` do CoolJet precisa typecheckar.

Alternativa descartada: script `cp` fora do Vite — o Dockerfile já roda `npm run build` + `PRODUCT`. Alternativa descartada: montar o clone como `public/` da SPA — o `index.html` React pintaria por cima.

### 4. Página publicada vs dump bruto

| Caminho | Papel |
|---|---|
| `products/cooljet/Get CoolJet Now.html` + `Get CoolJet Now_files/` | Fonte. Não servir. |
| `products/cooljet/page/index.html` | HTML sanitizado + cookie popup. |
| `products/cooljet/page/assets/` | CSS/imagens/SVG visuais. Paths relativos reescritos. |

Sanitizar: remover GTM/Clarity/Everflow/CheckoutSDK/checkout.js/card-js/Stripe/Google Pay/hCaptcha e qualquer POST ao merchant. Manter DOM visual (pacotes 1×–4×, fotos, FAQ, selos). CTAs do clone (`GET IT NOW`, `Complete Purchase`) apontam ao mesmo hop — cinto se o overlay falhar. Formas de pagamento não submetem.

### 5. Cookie popup: markup pedido, visível no load, toda ação = hop

Markup na raiz (ids/classes do operador). `href` dos dois botões = `clone.affiliateHref`. `onclick="return handleClick(event)"` + classe `ratoeira-trackable`.

CSS base (fornecido) deixa `#cookie-popup-modern` com `opacity: 0` e `pointer-events: none`. Completar:

```css
#cookie-popup-modern.cookie-popup-visible-modern {
  opacity: 1;
  pointer-events: auto;
}
```

O HTML monta com `style="display: flex"` e `class="cookie-popup-visible-modern"`. `handleClick` faz `preventDefault` e `location.href = clone.affiliateHref`. Close **não** esconde o diálogo.

z-index `10000001` cobre a PDP copiada.

### 6. Identidade da Instância

| Campo | Valor |
|---|---|
| slug | `cooljet` |
| productName | `CoolJet` |
| domain | `cooljet.thebuylens.shop` |
| locale | `en-US` / `en_US` / `USD` |
| layout | `"clone"` |
| hop | `https://www.clickrtrckr.com/JF816B6/8WW1FPC/?__efq=1XzZiNTLF3AgCfINH2PTisIlTzd8oVcx` |
| trackingTags | `[]` |
| `dev:cooljet` | porta **5177** |
| `build:cooljet` | `dist/cooljet` |

Tokens (identidade / `seo.themeColor`, não o CSS da PDP): background `#FFFFFF`, surface `#F5F7FA`, textPrimary `#1A1A1A`, textMuted `#5A6570`, accent `#0173AD` (CTA “GET IT NOW” da fonte), accentDark `#015A87`.

SEO: title `Get CoolJet Now`; description a partir do texto da PDP (cooler portátil, 2025 model). `ogImage`: pack shot publicado (`560x650-header-product.png` ou equivalente em `page/assets/`). Disclaimer de afiliado no rodapé do HTML publicado (campo `locale.affiliateDisclosure` no config).

Deploy no repo: serviço `cooljet` no `docker-compose.yml` (`Host(\`cooljet.thebuylens.shop\`)`) e imagem `lp-cooljet` no `deploy.yml` (`PRODUCT=cooljet`).

## Risks / Trade-offs

- [Google Ads classifica overlay inescapável como malicious injected overlay] → Mitigação: não usar esta URL como destino Ads nesta change; documentar em `PRODUCT.md`. Close e Allow vão ao hop de propósito (pedido do operador).
- [Dump com checkout vivo cobra no merchant] → Mitigação: sanitizar scripts/POST; overlay bloqueia interação; CTAs restantes também vão ao hop.
- [CSS `opacity: 0` esconde o popup] → Mitigação: classe `cookie-popup-visible-modern` força `opacity: 1` / `pointer-events: auto`.
- [Assets quebrados após reescrever paths] → Mitigação: QA visual em `dev:cooljet` (hero, logos, pacotes, FAQ).
- [Clone acoplado a um dump que envelhece] → Mitigação: aceito; atualizar `page/` quando a fonte mudar. Não é oferta nossa.
- [União de tipos no `ProductConfig` quebra sales/review] → Mitigação: ramo `clone` só relaxa campos que o clone não renderiza; `validateProductConfig` de sales/review permanece.
- [Regressão das outras Instâncias] → Mitigação: Vite só troca de pipeline quando `layout === "clone"`; smoke Vee / Alpha / Amino / Audifort.

## Migration Plan

1. Estender `PageLayout` + `clone` no schema e validar o ramo (sem `popupGate`, sem `plans`).
2. Plugin Vite `product-clone` (dev `/` + copy no build).
3. Sanitizar HTML → `products/cooljet/page/`; copiar assets visuais; injetar popup + `handleClick` + disclosure.
4. `products/cooljet/product.config.ts`, scripts, `PRODUCT.md` / `CONTEXT.md`.
5. Compose + workflow `lp-cooljet`.
6. QA `dev:cooljet`: popup visível; Allow e Close abrem o hop; sem SDK de pagamento; smoke das outras Instâncias.

Rollback: não publicar o container CoolJet; remover config/scripts/serviço. Sem migração de schema persistido. Sales/review voltam ao pipeline atual se o plugin clone não entrar no ar.

## Open Questions

- IDs de Meta Pixel / Google Ads — fora desta change (`trackingTags: []`).
- DNS/TLS de `cooljet.thebuylens.shop` — infra.
- Se uma campanha Ads for ligada depois: revisar o overlay antes de usar esta URL como destino.
