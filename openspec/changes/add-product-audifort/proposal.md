## Why

A Base já gera Instâncias `review` (Amino). Audifort é a próxima oferta ClickBank — gotas de suporte auditivo, ponte editorial em 1ª pessoa, hop para a página oficial — e precisa da própria Instância isolada (domínio, paleta, copy, assets). Sem um Produto novo, a oferta não entra no ar; reabrir o shell de review seria retrabalho.

## What Changes

- Novo Produto `audifort`: `layout: "review"`, en-US, domínio `audifort.nothforge.com`, sem Spokesperson, CTA único = hop ClickBank `https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1` (página oficial / pitch `pre1`, nunca checkout isolado).
- Paleta clara + âmbar nos 6 papéis de token (creme/off-white, texto carvão, accent âmbar do vidro). Teal do ícone fica na fotografia, não no contrato de tokens.
- Copy de review em 1ª pessoa (dor → pesquisa → claims oficiais → veredito), **sem** a palavra *independent*. Claims só os que a [página oficial](https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1) já afirma; sem preços, kits, cura, restauração de audição ou eliminação de tinnitus.
- Disclosure de afiliado no rodapé (padrão Amino). Disclaimers de categoria: FDA + ClickBank-as-retailer.
- Seções: Hero (`bottle-label.webp`) + `pain` (figura `person*` sem nome) + `research` + `official-claims` + `testimonials` (iniciais, copy original, avatar vazio) + `verdict` + `faq`.
- Assets de `products/audifort/recursos/` publicados o necessário em `public/imagens/audifort/`. `PRODx2` / `PRODx3` / `PRODx6` não entram na página (kits = Pricing, proibido em review).
- Scripts `dev:audifort` / `build:audifort`. `trackingTags: []` até existir Pixel/Ads.
- Sem change na Base: nem faixa de disclosure no topo, nem cromo de review escuro.

## Capabilities

### New Capabilities

- `audifort-product`: contrato da Instância Audifort (layout review, hop ClickBank, paleta clara+âmbar, copy/compliance, mapeamento de assets). Não altera o shell da Base.

### Modified Capabilities

Nenhuma. `review-layout`, `product-configuration`, `optional-sections`, `tracking-tags`, `legal-disclaimers` e `design-token-contract` já cobrem o mecanismo; esta change só instancia.

## Impact

- **Código da Base:** nenhum, salvo scripts no `package.json` (`dev:audifort` porta 5176, `build:audifort` → `dist/audifort`).
- **Produto novo:** `products/audifort/product.config.ts`; cópia seletiva de assets para `public/imagens/audifort/`.
- **Docs de produto:** `PRODUCT.md` passa a listar `audifort` ao lado do Amino.
- **Sem regressão:** Vee, Alpha Surge e Amino não mudam de config nem de layout.
- **Deploy:** Instância isolada no Host `audifort.nothforge.com` (Traefik/container; DNS é infra, fora desta change).
- **Compliance:** hop visível no config; clique outbound não dispara evento de checkout; fotos `person1`–`person5` nunca viram avatar de reviewer inventado.
