## Context

A Base já gera Instâncias `sales`, `review` e `clone`. CoolJet estreou o layout `clone`: HTML estático na raiz, cookie popup visível no load, Allow e Close → hop, plugin Vite `product-clone` (placeholder `__AFFILIATE_HREF__`). Pawlax cabe no mesmo shell: dump em `products/pawlax/Get Pawlax Now!.html` (checkout [get-pawlax.com](https://get-pawlax.com)), Host `pawlax.thebuylens.shop`, hop [clickrtrckr](https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8).

`popupGate` (segunda página com overlay sobre réplica desfocada) está **proibido**. Esta change não reativa esse campo. O clone **é** a raiz.

Dump atual inclui scripts vivos do fornecedor (GTM `GTM-NTH4LNFK`, Everflow, CheckoutSDK, Stripe/Google Pay/hCaptcha, HumanSecurity). Publicar isso processaria pedido no merchant original. A página publicada é uma cópia sanitizada.

## Goals / Non-Goals

**Goals:**

- Publicar o Produto `pawlax` como Instância `clone` na raiz: visual da PDP/checkout salva, cookie popup visível no load, Allow e Close indo ao hop.
- Sanitizar o dump (sem pagamento/tags do fornecedor) e copiar só assets visuais.
- Scripts `dev:pawlax` / `build:pawlax`, compose + imagem `lp-pawlax` no Host `pawlax.thebuylens.shop`.

**Non-Goals:**

- Alterar `PageLayout`, `CloneConfig`, `validateProductConfig` ou `vite.product-clone.ts` — já cobrem o CoolJet.
- Reativar `popupGate` ou emitir HTML em path aninhado (`/pawlax`, etc.).
- Reconstruir a PDP em React (Hero, Pricing, review).
- Processar pedido, cartão ou hCaptcha nesta Instância.
- IDs de Pixel/Ads (`trackingTags: []`).
- DNS de `thebuylens.shop` (infra; o compose só declara o Host).
- Destinar esta URL a campanha Google Ads nesta change.
- Limpar o dump bruto (`Get Pawlax Now!.html` / `_files`) — fica como fonte.

## Decisions

### 1. Reusar o layout `clone`, não sales/review e não `popupGate`

`layout: "clone"` + `clone.htmlFile` / `clone.affiliateHref`. O plugin Vite já serve o HTML na raiz e substitui `__AFFILIATE_HREF__` e `__AFFILIATE_DISCLOSURE__`.

Alternativa descartada: Produto `review` com hop nos CTAs — não é a página pedida. Alternativa descartada: reusar `popupGate` num path — viola o ban. Alternativa descartada: alterar o plugin clone — Pawlax não pede comportamento novo.

### 2. Schema mínimo no `ProductConfig` (já existente)

```ts
layout: "clone"
clone: {
  htmlFile: "page/index.html"      // publicado, não o dump bruto
  affiliateHref: "https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8"
}
```

Obrigatório em clone: `slug`, `productName`, `domain`, `locale` (inclui Disclaimer de afiliado), `seo`, `tokens` (6 papéis — identidade/themeColor, **não** aplicados no CSS copiado), `trackingTags`, `clone.htmlFile`, `clone.affiliateHref`.

Proibido em clone: `plans`, `popupGate`, `sections` da Base, Spokesperson, lead capture.

### 3. Página publicada vs dump bruto

| Caminho | Papel |
|---|---|
| `products/pawlax/Get Pawlax Now!.html` + `Get Pawlax Now!_files/` | Fonte. Não servir. Ignorar no git (`_files/`). |
| `products/pawlax/page/index.html` | HTML sanitizado + cookie popup. |
| `products/pawlax/page/assets/` | CSS/imagens/SVG visuais. Paths relativos reescritos. |

Sanitizar: remover GTM (`GTM-NTH4LNFK`)/Everflow/CheckoutSDK/checkout.js/card-js/Stripe/Google Pay/hCaptcha/HumanSecurity/`window.config` de checkout e qualquer POST ao merchant. Manter DOM visual (pacotes 1×–3×, fotos, FAQ, selos). Manter o `toggleFAQ` inline. CTAs do clone (pacotes, Complete Order, upsell) apontam a `__AFFILIATE_HREF__` — cinto se o overlay falhar. Formas de pagamento não submetem.

Assets visuais a copiar (não exaustivo): CSS da PDP (`app.css`, `main.css`, `bulma.min.css`, `loading.css`, `all.min.css`, fontes `css`/`css2` se o layout depender), pack shots (`product1-1.png`…`product5-1.png`, `chatgpt-image-*`, `magnific_*`), ícones/SVG (`comfort.svg`, `safe.svg`, `usa-icon.svg`, `5stars.svg`, `ads.png`, `socials.png`, logos). Não copiar CheckoutSDK, GTM, Clarity, Everflow, Stripe, Google Pay, hCaptcha, HumanSecurity, payframes.

### 4. Cookie popup: markup pedido, visível no load, toda ação = hop

Markup na raiz (ids/classes do operador). `href` dos dois botões = `__AFFILIATE_HREF__`. `onclick="return handleClick(event)"` + classe `ratoeira-trackable`. O plugin clone injeta o `handleClick` real (redirect + gtag se houver conversionLabel).

CSS base (fornecido) deixa `#cookie-popup-modern` com `opacity: 0` e `pointer-events: none`. Completar como no CoolJet:

```css
#cookie-popup-modern.cookie-popup-visible-modern {
  opacity: 1;
  pointer-events: auto;
}
```

Mais o card (container branco, botões Allow/Close). Allow usa accent `#0D40FF` da PDP (checks/CTA da fonte). O HTML monta com `style="display: flex"` e `class="cookie-popup-visible-modern"`. Close **não** esconde o diálogo.

z-index `10000001` cobre a PDP copiada.

### 5. Identidade da Instância

| Campo | Valor |
|---|---|
| slug | `pawlax` |
| productName | `Pawlax` |
| domain | `pawlax.thebuylens.shop` |
| locale | `en-US` / `en_US` / `USD` |
| layout | `"clone"` |
| hop | `https://www.clickrtrckr.com/JF816B6/92HCXFN/?__efq=9AHZHiJrzZfjA5wUzYqt9AQ0GOzhEzubez7qKC7Uef8` |
| trackingTags | `[]` |
| `dev:pawlax` | porta **5178** |
| `build:pawlax` | `dist/pawlax` |

Tokens (identidade / `seo.themeColor`, não o CSS da PDP): background `#FFFFFF`, surface `#F5F7FA`, textPrimary `#1A1A1A`, textMuted `#5A6570`, accent `#0D40FF` (azul da fonte), accentDark `#0A32C7`.

SEO: title `Get Pawlax Now`; description a partir do texto da PDP (cooling mat pet-safe, 70×70 cm, Ocean Blue, 30-day guarantee). `ogImage`: pack shot publicado (`product1-1.png` ou equivalente em `page/assets/`). Disclaimer de afiliado no rodapé do HTML publicado (`__AFFILIATE_DISCLOSURE__`).

Deploy no repo: serviço `pawlax` no `docker-compose.yml` (`Host(\`pawlax.thebuylens.shop\`)`) e imagem `lp-pawlax` no `deploy.yml` (`PRODUCT=pawlax`).

## Risks / Trade-offs

- [Google Ads classifica overlay inescapável como malicious injected overlay] → Mitigação: não usar esta URL como destino Ads nesta change; documentar em `PRODUCT.md`. Close e Allow vão ao hop de propósito (pedido do operador).
- [Dump com checkout vivo cobra no merchant] → Mitigação: sanitizar scripts/POST; overlay bloqueia interação; CTAs restantes também vão ao hop.
- [CSS `opacity: 0` esconde o popup] → Mitigação: classe `cookie-popup-visible-modern` força `opacity: 1` / `pointer-events: auto`.
- [Assets quebrados após reescrever paths] → Mitigação: QA visual em `dev:pawlax` (hero, logos, pacotes 1×–3×, FAQ).
- [Clone acoplado a um dump que envelhece] → Mitigação: aceito; atualizar `page/` quando a fonte mudar. Não é oferta nossa.
- [Regressão das outras Instâncias] → Mitigação: Vite só troca de pipeline quando `layout === "clone"`; smoke Vee / Alpha / Amino / Audifort / CoolJet.

## Migration Plan

1. Sanitizar HTML → `products/pawlax/page/`; copiar assets visuais; injetar popup + placeholders `__AFFILIATE_HREF__` / `__AFFILIATE_DISCLOSURE__`.
2. `products/pawlax/product.config.ts`, scripts, `PRODUCT.md` / `CONTEXT.md`.
3. Compose + workflow `lp-pawlax`.
4. QA `dev:pawlax`: popup visível; Allow e Close abrem o hop; sem SDK de pagamento; smoke das outras Instâncias.

Rollback: não publicar o container Pawlax; remover config/scripts/serviço. Sem migração de schema persistido.

## Open Questions

- IDs de Meta Pixel / Google Ads — fora desta change (`trackingTags: []`).
- DNS/TLS de `pawlax.thebuylens.shop` — infra.
- Se uma campanha Ads for ligada depois: revisar o overlay antes de usar esta URL como destino.
