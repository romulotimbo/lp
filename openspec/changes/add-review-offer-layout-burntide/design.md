## Context

A Base tem três modos: `sales` (kits + checkout), `review` (artigo 1ª pessoa, **proíbe** preço/`plans`) e `clone` (HTML estático). Burntide é uma ponte de busca para o funil [v4 Direct-to-Cart](https://burntide.us/funnelb3/v4/?aff_id=31010), com assets e copy de produto no [v3](https://burntide.us/funnelb3/v3/?aff_id=31010). O esqueleto pedido (scam/legit, fórmula, contrafação, side effects, prós/contras, tabela de pacotes) não cabe no `review` atual sem reabrir o contrato “review nunca mostra preço”.

Fonte oficial (v3 + v4, setembro 2026), não o placeholder do esqueleto:

| Tema | Oficial | Esqueleto (não usar) |
|---|---|---|
| Forma | gummy, 1/dia, blend 525 mg | “cada cápsula” |
| Fórmula | ACV + sais de BHB (Ca/Mg/Na) | Green Tea, L-Carnitine, Chromium |
| Kits | 2 / 3 / 6 frascos | 1 / 3 / 6 |
| Preço | $79 / $69 / $49 por frasco → totais $158 / $207 / $294 | $69 / $59 / $49, kit de 1 frasco |
| Garantia | 60 dias | 60 dias (ok) |
| Fábrica | FDA-registered, GMP-certified | “FDA-Compliant Facility” |

O esqueleto define a **ordem e a intenção** das dobras. Fatos, preços e linguagem regulatória vêm da oficial, datados.

## Goals / Non-Goals

**Goals:**

- Quarto `PageLayout`: `"review-offer"`, irmão de `review`, não um tema em cima dele.
- Módulos novos ligáveis/ordenáveis + tabela `offer` display-only com `asOf` + fonte.
- Produto `burntide` completo (config, assets do v3, scripts, hop v4 em toda dobra).
- Helpers de CTA outbound compartilhados com `review` (`handleOutboundClick`, sem `InitiateCheckout`).
- `review` / `sales` / `clone` sem regressão de cromo, validação ou tracking.

**Non-Goals:**

- Relaxar a proibição de `plans` / `"pricing"` no layout `review`.
- Cards de checkout da Base, `InitiateCheckout`, `popupGate`, clone do HTML do funil.
- Spokesperson, lead capture, Área Restrita, Power Grid, Tech Mechanism.
- Republicar depoimentos nomeados da oficial (Henry C., Samuel H., Harper E.) como prova nossa.
- Afirmar que o SKU Burntide é “clinically tested”; os PMIDs da oficial são papers de ACV/BHB, não um trial do produto.
- DNS/TLS de `burntide.thebuylens.com` (infra).
- IDs de Pixel/Ads (`trackingTags: []` até existirem).
- Gerar imagem no Magnific nesta change — assets vêm do v3, com aprovação se for preciso upscale depois.

## Decisions

### 1. Layout novo, não variante de `review`

`PageLayout = "sales" | "review" | "clone" | "review-offer"`.

`review` permanece artigo sem preço. `review-offer` é advertorial com tabela de oferta datada. Alternativa descartada: `reviewVariant: "offer"` — misturaria validação e faria `isReviewLayout()` aplicar cromo editorial do Amino num advertorial. Alternativa descartada: `sales` com hop no lugar de checkout — dispararia `InitiateCheckout` e exigiria `plans`.

`SpaProductConfig.layout` passa a aceitar `"review-offer"`. Clone continua no ramo `CloneProductConfig`.

### 2. Helpers: outbound vs cromo

| Helper | Predicado | Uso |
|---|---|---|
| `isReviewLayout()` | `=== "review"` | cromo editorial Amino/Audifort/Moérie (inalterado) |
| `isReviewOfferLayout()` | `=== "review-offer"` | módulos novos, CSS `[data-layout="review-offer"]` |
| `usesOutboundCta()` | review **ou** review-offer | Hero primary, footer, sticky, `handleOutboundClick` |

Alternativa descartada: alargar `isReviewLayout()` — Amino herdaria tratamento de advertorial no próximo build.

### 3. Novos ids de seção

| Id | Bloco de config | Papel no esqueleto |
|---|---|---|
| `what-is` | `EditorialBlock` | Section 1 — o que é |
| `formula` | `FormulaContent` | Section 2 — ingredientes oficiais |
| `authenticity` | `EditorialBlock` + `ctaLabel?` | Section 3 — “is it a scam” / contrafação |
| `side-effects` | `EditorialBlock` | Section 4 |
| `pros-cons` | `ProsConsContent` | Section 5 |
| `offer` | `OfferContent` | Section 6 — pacotes datados |

Reuso: `guarantee` (dobra final), `faq` (opt-in), `trust` / `mid-cta` (opt-in). Hero e footer continuam fixos.

`offer` **não** é `"pricing"` e **não** usa `Plan`. Pacotes são informativos; o clique vai a `outboundCta.href`.

```ts
interface OfferPackage {
  id: string;
  name: string;
  bottles: number;
  supplyLabel: string;
  pricePerBottle: string;
  compareAtTotal?: string;
  total: string;
  shipping: string;
  badges?: string[];
  featured?: boolean;
}

interface OfferContent {
  eyebrow?: string;
  title: string;
  lead?: string;
  asOf: string;          // obrigatório — preço sem data falha o build
  sourceLabel: string;   // "burntide.us official store"
  packages: OfferPackage[];
  advice?: string;
  ctaLabel?: string;
}
```

Validação `review-offer`: exige `outboundCta`; rejeita `plans`, `"pricing"`, `popupGate`; cada id listado exige o bloco; `offer.asOf` e `offer.sourceLabel` não vazios; no máximo um `featured`.

### 4. Ordem Burntide (esqueleto → módulos)

```
Hero
what-is → formula → authenticity → side-effects → pros-cons → offer → guarantee → faq
Footer + sticky
```

CTAs (mesmo `href`, labels por dobra):

1. Hero / `outboundCta.label` — claim da oferta oficial (sem inventar “60% off”; o v3 anuncia “SAVE 75%”, datar se citar).
2. `authenticity.ctaLabel` — evitar contrafação / loja oficial.
3. `offer.ctaLabel` / `guarantee.ctaLabel` — pedido + garantia 60 dias.

Emojis nos botões ficam de fora (a11y / cromo da Base).

### 5. Hop e tracking

```ts
outboundCta: {
  label: "Claim the official BurnTide offer",
  href: "https://burntide.us/funnelb3/v4/?aff_id=31010",
}
```

`handleOutboundClick` cobre review-offer. Sales continua `handleCheckoutClick`. Sem `popupGate`. Sem path aninhado.

### 6. Copy: advertorial, fatos oficiais

Voz: 2ª pessoa / “this review”, não o artigo clínico em 1ª pessoa do Amino. Headline de busca do esqueleto pode ficar no Hero (`headlinePrefix` / `Highlight` / `Suffix`).

Obrigações de copy no config Burntide:

- Forma e dose: gummy, one a day, ~30 min before a meal, 525 mg blend — palavras deles.
- Ingredientes: Apple Cider Vinegar + BHB Salts (Calcium / Magnesium / Sodium β-hydroxybutyrate). Sem Green Tea / L-Carnitine / Chromium.
- Pacotes v4 (datados setembro 2026): Basic 2× $79 → $158 + shipping; Bundle 3× $69 → $207 + shipping; Best Value 6× $49 → $294 + free shipping + 3 bônus digitais.
- Garantia 60 dias, one-time payment, exclusivo no site oficial (Amazon/eBay = não é o produto deles — claim da oficial, atribuído).
- Papers (Kondo 2009 PMID 19661687, Newman/Verdin 2017, etc.): “a oficial cita”, não “Burntide foi testado neste paper”.
- Side effects: stimulant-free / consultar médico se grávida, amamentando ou medicada — **não** “thousands with no reported major side effects” sem fonte.
- Cons honestos do esqueleto que a oficial sustenta: só online; estoque limitado é copy de urgência deles (atribuir); frete grátis só no pack de 6.
- FDA disclaimer no Locale. Sem “FDA-Compliant”. Sem cura/diagnóstico.

### 7. Cromo e paleta

`[data-layout="review-offer"]`: sentence case, sem HUD/`HUD::`/glow neon, chips + still-life do pote (mesmo caminho visual do review claro). Headline de alerta via copy, não via uppercase de sales.

Tokens iniciais (confirmar contraste no v3; ajustar hex se o accent falhar 4.5:1 no botão):

| Papel | Hex |
|---|---|
| background | `#FFF7F0` |
| surface | `#FFFFFF` |
| textPrimary | `#1C1410` |
| textMuted | `#6A5348` |
| accent | `#C2410C` |
| accentDark | `#9A3412` |

`seo.themeColor` = background. Teal/laranja fotográfico fica na imagem, não em papel extra.

### 8. Assets e produto

- Fonte visual: v3 (pote, pack de 6, selo 60 dias, label/Supplement Facts se existir no dump).
- Publicar o necessário em `public/imagens/burntide/`. Originais em `products/burntide/recursos/`.
- Hero: frasco + chips “60-day money-back” / “FDA-registered facility” / “GMP-certified” (texto oficial).
- `offer` pode mostrar o pack shot de 6 como figura de contexto, não como card de checkout.
- Depoimentos da oficial não entram. FAQ opt-in com respostas originais baseadas no que o v3/v4 afirma.

Slug `burntide`. Domínio placeholder `burntide.thebuylens.com`. Porta `5180`. `trackingTags: []`.

### 9. App e registry

`App.tsx` já itera `sections` e ignora `"pricing"` em review. Estender: `"pricing"` também some em `review-offer`. Registrar os 6 componentes novos em `OPTIONAL_SECTION_COMPONENTS`. `data-layout` já vem de `activeLayout()`.

## Risks / Trade-offs

- [Preço impresso envelhece] → `offer.asOf` + `sourceLabel` obrigatórios; copy manda o visitante confirmar o total no v4. Não inventar kit de 1 frasco.
- [Advertorial de emagrecimento + Google Ads] → FDA disclaimer; claims de metabolismo atribuídos; sem “clinically tested” do SKU; sem overlay. Destino Ads é decisão de campanha, fora desta change.
- [Cromo de `review` vazar] → `isReviewLayout()` permanece estrito; CSS novo só em `[data-layout="review-offer"]`.
- [Confundir `offer` com `plans`] → tipos separados; validação rejeita `plans` em review-offer; clique usa `handleOutboundClick`.
- [Copy do esqueleto vs oficial] → tabela da seção Context é a regra; o esqueleto manda estrutura, não fato.

## Migration Plan

1. Schema + helpers + seções + CSS do layout (Base).
2. Config + assets + scripts do Produto.
3. Smoke sales / review / clone.
4. Archive da change depois do apply.

Rollback: remover o Produto e o ramo `review-offer` do schema; Instâncias antigas não leem esses ids.

## Open Questions

- Hex finais da paleta depois de amostrar o v3 (contraste do CTA).
- Host/DNS definitivo se não for `burntide.thebuylens.com`.
- Conversion label do Ads quando a campanha existir — não entra no outbound.
