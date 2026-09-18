## Context

A Base hoje tem quatro modos: `sales` (kits + checkout), `review` (artigo 1ª pessoa, um hop, **proíbe** preço), `review-offer` (advertorial + tabela datada) e `clone` (HTML estático). O rascunho `moerie-hair-boost` está no cromo genérico `review` (`pain` / `research` / `verdict`) e cobre **só** as cápsulas em `pills.moerie.com`.

Esta change troca esse rascunho por uma Instância dual-SKU em inglês, voz de cético, micro-quiz e páginas de compliance. O Googlebot precisa receber o artigo inteiro no HTML inicial (sem tela branca e sem quiz-as-gate). O cromo visual **não** reaproveita Amino, Audifort nem Burntide: o apply começa com Impeccable no nicho de nutrição/queda capilar.

Fonte de fatos das pílulas: label e checkout de `pills.moerie.com` (setembro 2026), já anotados no config atual. Fonte do spray: a oficial do SKU tópico (URL a confirmar no apply — ver Open Questions). O esqueleto do pedido manda **ordem e intenção**; fatos, hops e linguagem regulatória vêm da oficial, datados.

Público: Estados Unidos. Toda copy visível é `en-US`. “Centenas de reais” vira “hundreds of dollars”. A tag “Independent Review | Real Hair Project 2026” é desejada neste Produto (ao contrário do Amino/Audifort, que cortam a palavra *independent*).

## Goals / Non-Goals

**Goals:**

- Quinto `PageLayout`: `"review-skeptic"`, irmão de `review` / `review-offer`, não um tema em cima deles.
- Shell narrativo fixo: barra editorial → Hero + quiz → Atos 1–7 → rodapé com links legais.
- Catálogo de **dois** hops (pílulas e spray). Quiz só enfatiza e rola; os dois cards e o artigo completo existem no HTML do primeiro paint / prerender.
- Prerender da `/` e das rotas de compliance no `build:` (texto editorial no documento, não só depois do JS).
- Páginas `/terms`, `/privacy`, `/medical-disclaimer`, `/about` no mesmo Host.
- Reescrever `moerie-hair-boost` neste layout; paleta e tipo saem do passo Impeccable e mapeiam nos 6 papéis de token.
- `handleOutboundClick` nos dois hops; nunca `InitiateCheckout`.

**Non-Goals:**

- Relaxar a proibição de `plans` / `"pricing"` em `review` ou neste layout.
- Cards de checkout da Base, `popupGate`, Spokesperson, lead capture, Área Restrita, Power Grid, Tech Mechanism.
- Reusar seções genéricas `pain` / `research` / `official-claims` / `verdict` como esqueleto desta página.
- Before/after de couro cabeludo ou corpo (política Clickbait / claims não confiáveis).
- Inventar depoimento, print, vídeo UGC, hop de afiliado ou preço de kit.
- Afirmar cura, regrowth clínico ou “resultado típico” do diário de 90 dias.
- DNS/TLS do Host (infra). IDs de Pixel/Ads (`trackingTags: []` até existirem).
- Aplicar o cromo novo em Amino, Audifort ou Burntide.

## Decisions

### 1. Layout novo, não variante de `review`

`PageLayout = "sales" | "review" | "clone" | "review-offer" | "review-skeptic"`.

`review` permanece o artigo clínico de um hop. `review-skeptic` é advertorial dual-SKU com quiz híbrido e barra editorial. Alternativa descartada: `reviewVariant: "skeptic"` — `isReviewLayout()` vazararia cromo Amino nesta página e vice-versa. Alternativa descartada: forçar Moérie no `review` atual com copy diferente — o quiz, os dois hops e os atos não existem nesse contrato.

Helpers:

| Helper | Predicado | Uso |
|---|---|---|
| `isReviewLayout()` | `=== "review"` | cromo Amino/Audifort (inalterado) |
| `isReviewOfferLayout()` | `=== "review-offer"` | Burntide (inalterado) |
| `isReviewSkepticLayout()` | `=== "review-skeptic"` | atos, barra, quiz, CSS `[data-layout="review-skeptic"]` |
| `usesOutboundCta()` | review **ou** review-offer **ou** review-skeptic | hops oficiais, `handleOutboundClick`, sem checkout |

### 2. Catálogo dual no lugar de um único `outboundCta`

```ts
type ProtocolId = "pills" | "spray";

interface ProtocolOffer {
  id: ProtocolId;
  productName: string;
  approachLabel: string;
  whyForYou: string;
  outboundCta: OutboundCta;
  image: EditorialFigure;
  ugc?: { kind: "video" | "image"; src: string; caption: string };
}

interface ProtocolCatalog {
  pills: ProtocolOffer;
  spray: ProtocolOffer;
  defaultProtocol: ProtocolId; // ênfase SSR quando o quiz não rodou
}
```

Validação `review-skeptic`: exige `catalog.pills` e `catalog.spray` com hrefs http(s) distintos; rejeita `plans`, `"pricing"`, `popupGate`; **não** exige o campo legado `outboundCta` (se presente, o build falha — evita hop único silencioso). Hero, Ato 4, Ato 5, Ato 7, footer e sticky leem o catálogo.

Pílulas (nome de funil vivo, set/2026): **Moérie Ultimate Hair Boost** / “Ultimate Hair Growth Pills” só como alias se a oficial usar os dois. Spray: **Moérie Mineral Hair Growth Spray** (confirmar string no rótulo oficial no apply).

### 3. Quiz híbrido — filtro de ênfase, nunca gate

Quatro perguntas no Hero. Pesos:

| Q | A → | B → |
|---|---|---|
| 1 Queda no dia a dia | pills (difusa, ralo/escova/casa) | spray (falhas locais: entradas, coroa, risco) |
| 2 Unhas e textura | pills (unhas fracas + fios afinando) | spray (unhas ok, falta preenchimento na raiz) |
| 3 Tentou gomas/tônicos | pills (tentou e sentiu que não absorveu) | spray (nunca tentou além de shampoo) |
| 4 Rotina disciplinado | pills (1–2 cápsulas com água) | spray (borrifar/massagear à noite) |

Vencedor = mais votos. Empate → `catalog.defaultProtocol` (`pills`). Afinidade no banner = votos do vencedor / 4, em porcentagem inteira — **não** hardcodar “92%”.

Comportamento:

1. **SSR / prerender / JS desligado:** `data-protocol-emphasis="unset"`. Atos 1–7, os dois cards do Ato 4, o complemento do Ato 5 e os dois CTAs do Ato 7 estão no DOM, legíveis, sem `hidden` / `display:none` / early-return.
2. **Depois do quiz:** o botão “See my protocol” faz scroll suave até `#act-4`. Banner: “Analyzing your answers: your profile has {n}% affinity with the {Pills|Spray} protocol…”. `data-protocol-emphasis="pills"|"spray"` só muda destaque visual (borda, ordem flexível, `aria-current`). O card não vencedor permanece no HTML com texto completo — pode perder ênfase, não visibilidade.
3. Estado do quiz é client-only (`sessionStorage` ok). Recarregar sem storage = `unset`. Crawler nunca precisa interagir.

Alternativa descartada: renderizar só o SKU vencedor via JS — tela branca / thin content para o bot. Alternativa descartada: quiz em rota `/quiz` que bloqueia o artigo.

### 4. Prerender no `build:` (anti tela branca)

A SPA atual entrega `#root` vazio até o bundle. Para este layout o plugin de build faz `renderToString` (ou equivalente Vite SSG) das rotas:

- `/`
- `/terms`
- `/privacy`
- `/medical-disclaimer`
- `/about`

O HTML emitido já contém o artigo (ênfase `unset`) e o corpo de cada página legal. O cliente hidrata; o quiz é enhancement. `dev:` pode continuar CSR, mas um smoke de `build:` + grep no `index.html` gerado é gate: headline do Hero e títulos dos Atos 1–7 precisam aparecer no arquivo **sem** executar JS.

Router mínimo: `pathname` em `App.tsx` (sem obrigar `react-router`). Cada path legal é um HTML extra no dist (`terms/index.html`, etc.).

### 5. Seções = atos, não o stack genérico de review

Chrome sempre ligado (fora de `sections`): barra editorial, Hero+quiz, footer, sticky dual.

Ids novos (só válidos em `review-skeptic`; listar em `review`/`review-offer` falha o build):

| Id | Ato | Papel |
|---|---|---|
| `skepticism` | 1 | Ceticismo genuíno + falha do mercado (gomas / shampoo “growth”) |
| `investigation` | 2 | Complexo mineral + ácido fúlvico; sistêmico vs tópico — atribuído à linha Moérie, não como paper nosso |
| `test-diary` | 3 | Diário 90 dias (sem. 1–2 / 3–5 / 8–12) |
| `ugc-mosaic` | 3 | 3–4 peças UGC reais (vídeo curto ou still); sem faces inventadas |
| `protocol-verdict` | 4 | Dois cards no HTML; ênfase via quiz |
| `synergy` | 5 | Cross-sell do SKU complementar (“360°”) |
| `honesty-scale` | 6 | Prós / contras honestos |
| `safe-buy` | 7 | Falsificação + garantia + dois CTAs oficiais |

Reuso de tipos, não de cromo: `honesty-scale` pode copiar a forma de `ProsConsContent`; `ugc-mosaic` pode estender o módulo `ugc-proof` já existente **sem** usá-lo no Amino. Componentes novos em `src/sections/`, CSS só em `[data-layout="review-skeptic"]`.

Ordem Moérie:

```
[EditorialBar]
Hero + ProtocolQuiz
skepticism → investigation → test-diary → ugc-mosaic
→ protocol-verdict → synergy → honesty-scale → safe-buy
[Footer + compliance links + sticky]
```

### 6. Barra editorial e disclosure

Faixa no topo (não precisa ser `position: sticky` se competir com o sticky CTA — preferir sticky só na barra **ou** no CTA móvel, não os dois brigando). Conteúdo:

- Tag: `Independent Review | Real Hair Project 2026`
- Aviso: artigo da redação; pode conter links de afiliados; link “Learn more” → âncora do disclosure no footer **e** `/about`
- Data de atualização (`asOf` no config, obrigatório)
- Tempo de leitura (derivado da copy ou `readingMinutes` no config)

Afiliação: o config atual declara **não** haver comissão. O aviso da barra deve ser verdadeiro. Se ainda não houver afiliação, o texto diz que os hops vão à oficial e que não há comissão *hoje* (como o rascunho). Se o hop de afiliado entrar no apply, o texto muda para o padrão FTC (“may earn a commission”). Mentir “may contain affiliate links” sem hop de afiliado é misrepresentation.

### 7. Copy: jornada do cético, fatos oficiais, inglês

Voz: 1ª pessoa da redação, cética, sem milagre. Headline do Hero (en-US):

> I tested the hair brand that took over TikTok for 90 days: mineral miracle, or expensive marketing?

Subhead: gomas que só deram acne, óleos que pesaram na raiz, análise da fórmula Moérie para thinning/shed; quiz para protocolo interno vs estímulo externo.

Regras:

- Sem preço de kit na página (igual `review`). Garantia: “90-day money-back” só como claim da oficial, atribuído.
- Complexo fúlvico / 70+ minerais: linguagem da marca, atribuída (“Moérie describes…”, “their mineral complex…”). Não afirmar trial clínico nosso.
- Diário 90 dias: experiência da mesa editorial, com as três batidas pedidas (dúvida → menos queda na escova → baby hairs). Sempre: resultados individuais variam; não é típico; não substitui dermato. Sem fotos before/after.
- UGC: só mídia real (marca identificada como marca, ou captura com atribuição). Sem avatar inventado.
- Ato 6 contras do pedido (preço acima de vitamina de farmácia, 60–90 dias, estoque esgota, só site oficial) — sem inventar efeito adverso. “Não gera milagre em 7 dias” é obrigatório.
- Ato 7: não comprar marketplace com 70–80% off; hops só oficiais.
- FDA disclaimer no Locale + página médica.

### 8. Páginas de compliance

`compliancePages` no config, obrigatório neste layout:

| Path | Página |
|---|---|
| `/terms` | Terms of Service |
| `/privacy` | Privacy (cookies, GDPR, CCPA; LGPD citado se houver dado de titular brasileiro) |
| `/medical-disclaimer` | Isenção médica detalhada (não diagnostica/trata/cura; consulte médico) |
| `/about` | Quem somos + canal de contato visível (e-mail) |

Mesmo chrome (barra + footer). Sem quiz. Links no rodapé de **todas** as rotas. Não são `clone.extraPages`.

### 9. Impeccable antes do cromo

O apply **não** copia CSS de `review` / `review-offer`. Primeira etapa de implementação: skill Impeccable com contexto de nicho (mulheres US, thinning, advertorial editorial de beleza, voz cética, paleta mineral/papel — não glass-lab Burntide, não HUD sales, não clínica Amino). Saída: direção + tokens mapeados nos 6 papéis + `DESIGN.md` / sidecar desta Instância. Só então seções e CSS `[data-layout="review-skeptic"]`.

Contrato de token permanece 6 papéis. Hex finais saem do Impeccable; placeholders até lá (não usar o âmbar HUD nem o cítrico Burntide como default).

### 10. App, registry e produto

- `App.tsx`: `data-layout="review-skeptic"`; ignore `"pricing"`; switch de pathname para compliance.
- Registrar os 8 componentes de ato + barra + quiz.
- Slug `moerie-hair-boost`, domínio `moerie-hair-boost.thebuylens.com`, porta **5179** (já no `package.json`).
- Reescrever `product.config.ts`; não manter o stack `pain`/`trust`/`research`/`verdict`.
- `trackingTags: []`.
- Compose/deploy no padrão dos outros Produtos se ainda não existir serviço Moérie.

## Risks / Trade-offs

- [Quiz esconder conteúdo] → spec proíbe `hidden`/unmount dos atos; teste de prerender grep; ênfase só via atributo.
- [Tela branca para o bot] → SSG das rotas no `build:`; smoke no HTML gerado.
- [Dois hops vs `outboundCta` único] → campo legado rejeitado neste layout; helpers leem o catálogo.
- [Cromo de `review` vazar] → `isReviewLayout()` estrito; CSS novo só no data-layout.
- [Copy do esqueleto vs oficial] → fúlvico/70 minerais e nomes de SKU só se a oficial sustentar; senão atribuir ou cortar.
- [Diário de 90 dias = claim de resultado] → voz da redação + “individual results vary” + FDA; sem before/after.
- [UGC fabricado] → build pode seguir com mosaic incompleto só se o config listar itens reais; não preencher com stock face.
- [Disclosure de afiliado falso] → texto casa com a relação real no dia do apply.
- [Impeccable atrasar o resto] → paleta é gate do CSS, não do schema/quiz; schema pode avançar em paralelo.

## Migration Plan

1. Schema + helpers + validação `review-skeptic` (Base).
2. Passo Impeccable (direção + tokens).
3. Barra, Hero+quiz, atos, CSS, prerender, rotas legais.
4. Reescrever config + assets do spray + UGC reais.
5. Smoke sales / review / review-offer / clone.
6. Archive da change depois do apply.

Rollback: restaurar o rascunho `layout: "review"` só se ainda estiver no git; senão remover o ramo `review-skeptic` do schema. Instâncias antigas não leem os novos ids.

## Open Questions

- URL oficial e string de rótulo do spray (não está no config atual, só `pills.moerie.com`).
- Hop de afiliado vs link direto: atualizar disclosure no mesmo PR em que o hop existir.
- Arquivos de vídeo UGC reais (quantidade, formato, direitos). Still atribuído da oficial pode preencher o mosaic até o vídeo existir — não inventar depoimento.
- E-mail de contato da página About.
- Host/DNS definitivo se não for `moerie-hair-boost.thebuylens.com`.
- Conversion label do Ads quando a campanha existir — não entra no clique outbound.
