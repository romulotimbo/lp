## Context

A Base já gera Instâncias `sales` (Vee, Alpha Surge) e `review` (Amino). Audifort é o quarto Produto: gotas ClickBank de suporte auditivo, ponte editorial em 1ª pessoa, sem Spokesperson. O shell (`layout: "review"`, `outboundCta`, seções `pain` / `research` / `official-claims` / `verdict`, FAQ e Testimonials sem HUD, hop que não dispara checkout) já está no código. Esta change só aplica um `ProductConfig` novo + assets + scripts.

Fonte dos claims: [página oficial via hop](https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1) (`pid=pre1` = pitch, não checkout isolado). Assets em `products/audifort/recursos/`.

Decisões fechadas na exploração:

1. Paleta clara + âmbar
2. Disclosure no footer (não faixa no topo)
3. Cortar *independent*, como o Amino
4. Módulo Testimonials com iniciais originais
5. Hero = `bottle-label.webp`
6. Domínio `audifort.nothforge.com`
7. `person*` como figura da dor, sem nome

## Goals / Non-Goals

**Goals:**

- Entregar o Produto `audifort` completo (config, copy, assets publicados, scripts `dev`/`build`).
- Paleta nos 6 papéis: creme quente + accent âmbar/bronze do vidro, com contraste de botão legível (`onAccentChannels` já escolhe branco ou preto).
- Copy de review em 1ª pessoa, claims só atribuídos à oficial, sem preços/kits na página.
- Hero com `bottle-label.webp`; dor com uma foto `person*` sem nome no alt; depoimentos com iniciais e avatar vazio.

**Non-Goals:**

- Mudar o shell `review` (sem faixa de disclosure no topo, sem cromo escuro).
- Spokesperson, lead capture, Área Restrita, Power Grid, Tech Mechanism, Pricing.
- IDs de Pixel/Ads (`trackingTags: []`).
- Embutir checkout ClickBank ou mostrar `$79` / `$69` / `$49`.
- Copiar depoimentos da oficial (Sabine G., Jonathan S.) ou usar `person1`–`person5` como avatar.
- Inventar contagem/nota de reviews — a oficial não publica agregado.
- Recortar o frasco de fundo preto (tratar a arte como chapa).
- DNS/Traefik de `audifort.nothforge.com` (infra).
- Params `traffic_source` no hop.

## Decisions

### 1. Só config + assets + scripts, zero change na Base

`products/audifort/product.config.ts` no schema atual. `App.tsx`, seções editoriais, `handleOutboundClick` e CSS `[data-layout="review"]` não mudam.

Alternativa descartada: review escuro ou disclosure no topo — as duas exigiriam cromo novo e o Amino herdaria no próximo build. Fechado: footer como o Amino.

### 2. Paleta clara + âmbar (contraste no botão)

Âmbar claro tipo mel (`#E8B86A`) em cima do creme lava o CTA (botão ≈ fundo). Accent precisa ser bronze do mesmo family, escuro o bastante para texto branco (`relativeLuminance(accent) < 0.5` → `--color-on-accent` branco) e ≥ 4.5:1.

| Papel | Hex | Papel visual |
|---|---|---|
| background | `#F7F3EA` | creme quente (não o `#F7F9FC` frio do Amino) |
| surface | `#FFFCF7` | cartão |
| textPrimary | `#2A2218` | carvão quente |
| textMuted | `#6E6256` | muted quente |
| accent | `#9A5A16` | âmbar/bronze do vidro, CTA |
| accentDark | `#734210` | hover / pressed |

O teal da orelha e o âmbar claro do vidro ficam **na fotografia**, não no token. Alternativa descartada: accent teal (era a opção 1 da exploração). Alternativa descartada: accent mel claro (contraste insuficiente no botão).

`seo.themeColor` = background `#F7F3EA`.

### 3. Hop e CTA

```ts
outboundCta: {
  label: "See current pricing and full details on the official Audifort page",
  href: "https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1",
}
```

Hero, verdict, footer e sticky usam o mesmo objeto. Sem `traffic_source=google` — a URL mentiria se o tráfego não for search.

### 4. Ordem das seções

Igual ao Amino: veredito antes do FAQ, para o CTA principal aparecer no fluxo de leitura.

```
Hero
pain → research → official-claims → testimonials → verdict → faq
Footer + Sticky CTA (hop)
```

### 5. Copy e compliance

Tom: 1ª pessoa, “A researched look…”. **Proibido** *independent* no subhead, SEO e tagline.

**Headline (Hero):** `Struggling with ringing in your ears or muffled hearing? Here's what I found researching` + highlight `Audifort`.

**Subhead:** `A researched look at Audifort's ear-health drops — what the formula claims, what the official page reports, and whether it holds up.` (não “real buyers report” como se houvesse painel nosso.)

**Seção pain:** conversas mais difíceis / zumbido persistente → aparelho caro → busca por alternativa. Figura: `person1.jpg`. Alt **sem nome**: “Adult holding an Audifort dropper bottle.” Não atribuir depoimento à pessoa da foto.

**Seção research:** o que a oficial afirma, com data (August 2026). Sem nota média, sem N de reviews, sem “período de uso mais citado” — a página não publica agregado. Foco: gotas vs aparelho (não amplifica som), fórmula líquida 60 ml / 2 fl oz, lista de ingredientes em destaque, garantia de 90 dias. Não transformar ginkgo/limão da arte do Hero em claim de fórmula (a lista oficial não cita ginkgo).

**Seção official-claims:** só posição da empresa, claramente atribuída:

- “Healthy hearing supplement”; “Support your hearing naturally”
- Natural formula, easy to swallow, non-habit forming
- Criador nomeado: Andrew Ross
- “Over 20 ingredients”, lista em destaque: Maca Root, Grape Seed, Green Tea, Capsicum annuum, Gymnema sylvestre, GABA
- Uso sugerido: um conta-gotas de manhã antes do café, outro antes do almoço; sublingual / água / suco; ~15 gotas por conta-gotas
- Assembled in the USA
- Garantia de 90 dias (reembolso; o texto deles exclui shipping/handling)
- Bônus digitais nos kits 3 e 6 (*Deep Sleep Activation Protocol*, *Brainwire Regeneration Blueprint*) — mencionar como oferta da oficial, sem montar os kits na nossa página
- Disclaimer FDA da oficial

Não reproduzir: preços, cards Try Two / Most Popular / Best Value, “96% order 6 bottles” sem data e atribuição (melhor omitir), lista de “scientific references” (mistura NIDCD com *A Course in Miracles*), “not a single complaint”, cura / restauração / eliminação de tinnitus. Palavras *fraud* / *scam* em qualquer direção: proibidas.

**Veredito:** suporte auditivo conforme a oficial, não tratamento médico. Sem afirmar que “funciona”. CTA = hop. Lembrar comissão.

**FAQ (empresa + review):** o que tem / como tomar / garantia 90 dias / envio 5–10 dias doméstico (posição da empresa) / “one-time payment” (posição da empresa) / “quanto custa?” → hop, sem preço aqui / “em quanto tempo?” → atribuir o “primeira semana / 4 meses” à oficial, não como nossa timeline.

**Testimonials:** 5 notas originais, público ~40–70, homens e mulheres, iniciais + estado. `avatar: ""`. Não copiar Sabine G. / Jonathan S. Não usar `person*` como face. Temas: consistência das gotas, ceticismo vs aparelho, ler o rótulo, não prometer silêncio total.

**Disclaimers (Locale):**

- Afiliado (obrigatório), visível no footer. Texto alinhado ao Amino, sem prometer “sempre no topo”.
- Categoria 1: FDA (suplemento).
- Categoria 2: ClickBank-as-retailer (bloco padrão já usado no Amino).

Microcopy do Hero: `Affiliate disclosure in the footer · the button opens the official site`.

### 6. Assets publicados

Copiar para `public/imagens/audifort/`:

| Origem | Uso |
|---|---|
| `bottle-label.webp` | Hero (`productImage`) e `seo.ogImage` |
| `person1.jpg` | `pain.figure` |

Deixar em `recursos/` (não publicar, não referenciar no config): `PRODx2` / `PRODx3` / `PRODx6` (kits), `label.webp` (Hero fechado em `bottle-label`), `person2`–`person5`.

`bottle-label.webp` tem fundo preto + botanicals. No review, a classe `review-product-shot` já emplaca a foto num cartão de `surface` — não recortar.

### 7. Identidade da Instância

| Campo | Valor |
|---|---|
| slug | `audifort` |
| domain | `audifort.nothforge.com` |
| locale | `en-US` / `en_US` / `USD` |
| layout | `"review"` |
| spokesperson | omitido |
| trackingTags | `[]` |
| `dev:audifort` | porta **5176** |
| `build:audifort` | `dist/audifort` |

Atualizar `PRODUCT.md`: incluir `audifort` na lista de Produtos; evidência de assets em `products/audifort/recursos/`.

## Risks / Trade-offs

- [Accent bronze pode parecer “marrom genérico” ao lado do teal da orelha] → Mitigação: o Hero carrega o teal na foto; tokens ficam na família do vidro. QA visual em `dev:audifort`.
- [Arte de Hero preta estoura no creme] → Mitigação: aceito — `review-product-shot` emplaca; não é bug.
- [person1 + copy de dor = leitor assume que a mulher endossa] → Mitigação: alt sem nome; nenhum depoimento aponta para a figura; cards de testimonials só com iniciais.
- [Claims e FAQ da oficial envelhecem] → Mitigação: números/prazos com “as of August 2026” e atribuição; hop URL inteira no config.
- [Ginkgo na arte vs. fórmula] → Mitigação: research afirma a lista oficial; não nomear ginkgo como ingrediente.
- [Contraste âmbar × branco no botão] → Mitigação: hex `#9A5A16` escolhido para `onAccentChannels` branco e ≥ 4.5:1; conferir no browser.
- [Smoke das outras Instâncias] → Mitigação: só `package.json` + pasta nova + `PRODUCT.md`; configs Vee/Alpha/Amino intocados.

## Migration Plan

1. Copiar `bottle-label.webp` e `person1.jpg` para `public/imagens/audifort/`.
2. Escrever `products/audifort/product.config.ts` (schema atual, paleta, copy, hop).
3. Scripts `dev:audifort` / `build:audifort` no `package.json`.
4. Atualizar `PRODUCT.md`.
5. QA: `dev:audifort` (fluxo hop, sem preços, disclosure no footer, person1 sem nome) + smoke Vee / Alpha / Amino.

Rollback: não publicar o container Audifort; apagar config/scripts/assets publicados. Nenhuma migração de schema.

## Open Questions

- IDs de Meta Pixel / Google Ads — fora desta change (`trackingTags: []`).
- Deploy DNS/Traefik de `audifort.nothforge.com` — infra, não código.
- Recheck da oficial no dia do apply: se um widget de reviews tiver aparecido, datar o número; se não, continuar sem agregado.
