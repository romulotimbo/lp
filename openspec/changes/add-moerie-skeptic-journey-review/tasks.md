## 1. Schema e validação

- [x] 1.1 Estender `PageLayout` com `"review-skeptic"` e o ramo correspondente em `SpaProductConfig` (`src/product/types.ts`)
- [x] 1.2 Tipar `ProtocolId`, `ProtocolOffer`, `ProtocolCatalog`, `ProtocolQuiz`, barra editorial (`asOf`, `readingMinutes`, tag, disclosure), atos e `compliancePages`
- [x] 1.3 Adicionar ids `skepticism`, `investigation`, `test-diary`, `ugc-mosaic`, `protocol-verdict`, `synergy`, `honesty-scale`, `safe-buy` em `OptionalSectionId` e `SECTION_DEPENDENCY`
- [x] 1.4 Ramo `review-skeptic` em `validateProductConfig`: exigir catálogo dual com hrefs distintos; exigir quiz de 4 perguntas; exigir `asOf` e as 4 páginas legais; rejeitar `plans`, `"pricing"`, `popupGate` e o `outboundCta` legado
- [x] 1.5 Listar um id de ato skeptic em `review` / `review-offer` falha o build; `sales` / `review` / `review-offer` / `clone` não mudam de regra

## 2. Impeccable — direção visual do nicho (gate do cromo)

- [x] 2.1 Rodar a skill **Impeccable** (`frontend-design`) para esta Instância com contexto explícito: review editorial de nutrição/queda capilar para público feminino US; jornada do cético; dual SKU (cápsula + spray); **não** copiar HUD sales, clínica Amino/Audifort nem glass-lab Burntide
- [x] 2.2 Fechar direção (tom, tipo, ritmo, diferenciação) e mapear a paleta nos **6 papéis** de token da Base (`background`, `surface`, `textPrimary`, `textMuted`, `accent`, `accentDark`) com contraste de CTA ≥ 4.5:1
- [x] 2.3 Registrar o sistema em `DESIGN.md` + sidecar desta Instância (não sobrescrever o mundo Burntide como se fosse o default da Base)
- [x] 2.4 Só depois disto implementar CSS `[data-layout="review-skeptic"]` — seções podem ser estruturadas em paralelo, mas o cromo visual espera 2.1–2.3

## 3. Shell, helpers e prerender

- [x] 3.1 Em `src/product/active.ts`: manter `isReviewLayout()` estrito; adicionar `isReviewSkepticLayout()`; `usesOutboundCta()` inclui review-skeptic
- [x] 3.2 `App.tsx`: `data-layout="review-skeptic"`; ignorar `"pricing"`; switch de `pathname` para `/`, `/terms`, `/privacy`, `/medical-disclaimer`, `/about`
- [x] 3.3 Prerender/SSG no `build:` dessas cinco rotas (`renderToString` ou plugin Vite equivalente) para o HTML inicial já conter o artigo (ênfase `unset`)
- [x] 3.4 Barra editorial (tag Independent Review | Real Hair Project 2026, disclosure verdadeiro, `asOf`, tempo de leitura) no HTML do primeiro paint
- [x] 3.5 Footer + sticky: dois CTAs oficiais (pílulas e spray) via `handleOutboundClick`; links para as quatro rotas legais em todas as páginas

## 4. Quiz híbrido

- [x] 4.1 Implementar o micro-quiz de 4 perguntas no Hero (copy en-US); pontuação pills vs spray; empate → `catalog.defaultProtocol`; afinidade = votos vencedores / 4 (nunca 92% hardcoded)
- [x] 4.2 Default SSR/`unset`: Atos 1–7 e os dois cards do Ato 4 no DOM, sem `hidden` / `display:none` / early-return
- [x] 4.3 Ao concluir: banner de resultado, scroll suave até `#act-4`, `data-protocol-emphasis` só muda destaque visual; card perdedor permanece legível
- [x] 4.4 Estado opcional em `sessionStorage`; crawler sem interação continua vendo o artigo completo

## 5. Atos narrativos

- [x] 5.1 Implementar `Skepticism`, `Investigation`, `TestDiary`, `UgcMosaic`, `ProtocolVerdict`, `Synergy`, `HonestyScale`, `SafeBuy` e registrar em `registry.tsx`
- [x] 5.2 Ato 1: ceticismo + falha de gomas/shampoo (en-US); Ato 2: complexo fúlvico/mineral **atribuído** à Moérie + sistêmico vs tópico
- [x] 5.3 Ato 3: diário 90 dias (sem. 1–2 / 3–5 / 8–12) como experiência da redação + “individual results vary”; mosaic UGC só com mídia real atribuída
- [x] 5.4 Ato 4: dois cards no HTML (pills e spray) + CTA de cada hop; ênfase via quiz
- [x] 5.5 Ato 5: sinergia 360° com o SKU complementar e CTA de acelerador
- [x] 5.6 Ato 6: prós/contras honestos (preço, 60–90 dias, estoque, só site oficial; sem milagre em 7 dias)
- [x] 5.7 Ato 7: alerta de falsificação + garantia da oficial + dois botões oficiais lado a lado

## 6. Páginas de compliance

- [x] 6.1 Renderizar `/terms`, `/privacy`, `/medical-disclaimer` e `/about` a partir de `compliancePages` (prerender no build)
- [x] 6.2 Privacy: cookies + GDPR + CCPA (LGPD se houver titular BR); Medical: FDA + não é conselho médico + consulte um clínico
- [x] 6.3 About: publisher + canal de contato visível; páginas legais sem quiz-as-gate

## 7. Produto Moérie

- [x] 7.1 Reescrever `products/moerie-hair-boost/product.config.ts` para `layout: "review-skeptic"` (descartar o stack genérico `pain`/`research`/`verdict`); locale en-US/USD; tokens do passo Impeccable; `trackingTags: []`; sem Spokesperson e sem `plans`
- [x] 7.2 Catálogo: pílulas → hop oficial verificado (`pills.moerie.com` ou hop de afiliado se existir no apply); spray → URL oficial confirmada no apply; disclosure da barra alinhado à relação comercial real
- [x] 7.3 Copy en-US na ordem da spec: barra → Hero/quiz → atos 1–7; sem preço de kit, sem before/after corporal, sem depoimento inventado, sem trial clínico nosso
- [x] 7.4 Publicar assets do spray e UGC reais em `public/imagens/moerie-hair-boost/`; não usar foto de fornecedor como avatar de reviewer; kit shots não viram checkout
- [x] 7.5 Confirmar no apply a string de rótulo do spray e o hop; se a oficial não sustentar “fulvic / 70+ minerals”, atribuir ou cortar

## 8. Scripts, docs e deploy

- [x] 8.1 Manter `dev:moerie-hair-boost` (porta 5179) e `build:moerie-hair-boost`; ajustar o build para o prerender das rotas legais
- [x] 8.2 Serviço no `docker-compose.yml` / `deploy.yml` se ainda não existir (`Host(moerie-hair-boost.thebuylens.com)`, `PRODUCT=moerie-hair-boost`)
- [x] 8.3 Atualizar `PRODUCT.md` e `CONTEXT.md`: quinto layout `review-skeptic`; Moérie é dual-SKU (não review genérico); hops não são checkout

## 9. QA

- [x] 9.1 `dev:moerie-hair-boost`: fluxo barra → Hero/quiz → atos 1–7 → footer legal; quiz enfatiza pills ou spray e rola ao Ato 4 sem esconder o outro SKU
- [x] 9.2 `build:moerie-hair-boost`: grep no HTML emitido de `/` (sem executar JS) encontra headline do Hero e títulos dos Atos 1–7; `/privacy` e `/medical-disclaimer` têm corpo no arquivo
- [x] 9.3 Confirmar ausência de Pricing/`#pricing`, `plans`, `InitiateCheckout`, HUD, before/after e depoimento fabricado
- [x] 9.4 Smoke `dev:energi-power-vee`, `dev:alpha-surge`, `dev:advanced-amino-formula`, `dev:audifort`, `dev:burntide`, `dev:cooljet` e `dev:pawlax`: shells inalterados
- [x] 9.5 Verificar no browser (desktop e mobile) a jornada completa: quiz, scroll, os dois hops, páginas legais
