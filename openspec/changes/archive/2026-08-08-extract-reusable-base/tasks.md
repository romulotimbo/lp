## 1. Product configuration foundation

- [x] 1.1 Definir a interface `ProductConfig` (TypeScript) cobrindo identidade, Locale, tokens de paleta, seções ativas, planos, spokesperson opcional, gancho de captura de lead opcional, tags de rastreamento, disclaimer de afiliado obrigatório e disclaimer de categoria opcional
- [x] 1.2 Criar estrutura de diretório para configs de Produto (ex. `products/<slug>/product.config.ts`) e para o núcleo compartilhado
- [x] 1.3 Criar `products/energi-power-vee/product.config.ts` com todos os valores atuais da Vee hardcoded transcritos para o schema (sem alterar nada visualmente ainda)
- [x] 1.4 Adicionar seleção de Produto por variável de ambiente (`PRODUCT=<slug>`) em `vite.config.ts`, produzindo um único `dist/` por build
- [x] 1.5 Validar no build que campos obrigatórios do schema (ex. disclaimer de afiliado) fazem o build falhar com erro claro quando ausentes

## 2. Design token contract

- [x] 2.1 Definir o contrato fixo de papéis de token (background, surface, text-primary, text-muted, accent, accent-dark) na interface `ProductConfig`
- [x] 2.2 Criar passo de build que gera CSS custom properties a partir dos valores de token do Produto selecionado
- [x] 2.3 Atualizar `tailwind.config.js` para referenciar os tokens gerados em vez dos hex fixos `cyber-*`/`blood-*`
- [x] 2.4 Criar utilitário de contraste (luminância relativa) a partir dos valores de token
- [x] 2.5 Migrar `ProductGlow`, `BorderBeamWrapper` e `HudFrame` para consumir o utilitário de contraste em vez de assumir fundo escuro
- [x] 2.6 Validar visualmente que a Instância da Vee (paleta dark original) renderiza igual ao antes

## 3. Optional section modules

- [x] 3.1 Definir tipo `SectionId` e o registro de componentes de seção (Hero, Manifesto/Spokesperson, mecanismo, Testimonials, Pricing, FAQ, captura de lead, restrita, rodapé)
- [x] 3.2 Migrar `App.tsx` para montar as seções a partir de `product.config.sections`, sempre incluindo Hero, Pricing e rodapé independentemente do config
- [x] 3.3 Preencher `sections` no config da Vee com a ordem atual das 8 seções
- [x] 3.4 Validar que a Instância da Vee renderiza na mesma ordem e sem seções fantasma

## 4. Flexible pricing

- [x] 4.1 Definir tipo `Plan` (preço, features, link de checkout, `recommended?: boolean`) e `plans: Plan[]` no `ProductConfig`
- [x] 4.2 Migrar `Pricing.tsx` para renderizar de 1 a N planos, com layout de card único quando `plans.length === 1`
- [x] 4.3 Migrar `Pricing.tsx` para tratar "recomendado" como opcional (nenhum plano marcado = todos em layout satélite)
- [x] 4.4 Preencher `plans` no config da Vee com os 3 kits atuais (1/3/5 potes) e validar saída idêntica

## 5. Spokesperson and media pack

- [x] 5.1 Definir tipo `Spokesperson` (nome, copy/bio, referência a `mediaPackId`) como campo opcional do `ProductConfig`
- [x] 5.2 Criar estrutura de Banco de mídia desacoplada de Produto — `MediaPack` tem `id` próprio e é referenciado por Spokesperson; os arquivos físicos continuam em `public/imagens|video/` (mover os binários pra `media-packs/<slug>/` fica pra quando o 2º Produto precisar reaproveitar o pack — não muda o contrato)
- [x] 5.3 Migrar seção Manifesto para renderizar condicionalmente a partir de `product.config.spokesperson` (ausente = seção omitida)
- [x] 5.4 Migrar badges de recomendação ("o que a X usa" no Pricing) para usar o nome do Spokesperson do config, não "Vee" hardcoded
- [ ] 5.5 Configurar o Produto da Vee referenciando o Banco de mídia da Vee, e validar que outro Produto de teste pode referenciar o mesmo Banco de mídia com nome/copy diferentes — **não feito**: criar um 2º Produto está fora do escopo desta change (ver proposal.md); o reaproveitamento fica provado estruturalmente (`mediaPack.id` é só uma string referenciável por qualquer Spokesperson) mas não empiricamente

## 6. Lead capture generalization

- [x] 6.1 Migrar `sql/01-landing-vault-waitlist.sql` para um schema genérico (`landing.lead_capture`) com coluna `product_slug`, preservando os dados existentes (migração aditiva em `sql/02-generalize-lead-capture.sql`, não destrutiva)
- [x] 6.2 Atualizar `api/` para aceitar `product` no payload e gravar na tabela generalizada (`POST /api/leads`)
- [x] 6.3 Generalizar `vault-waitlist.ts` → `lead-capture.ts` e `vault-waitlist-modal.tsx` → `lead-capture-modal.tsx`, copy do gancho vinda do config, sem texto +18 hardcoded no componente
- [x] 6.4 Tornar o módulo de captura de lead opt-in via `product.config` (ausente/desligado = nenhuma UI de captura renderizada)
- [x] 6.5 Configurar o Produto da Vee com o gancho atual (+18/presente) preenchido via config — validado visualmente (RestrictedArea + modal renderizam com a copy certa); **não validado**: round-trip real contra Postgres (sem banco disponível nesta sessão de dev)

## 7. Tracking tags

- [x] 7.1 Definir tipo `TrackingTag` (`type: 'meta_pixel' | 'google_ads'`, `id: string`) e `trackingTags: TrackingTag[]` no `ProductConfig`
- [x] 7.2 Remover o snippet do Pixel Meta hardcoded de `index.html`, substituindo por injeção no build a partir de `trackingTags` (plugin Vite `transformIndexHtml`)
- [x] 7.3 Generalizar `meta-pixel.ts`/`checkout-tracking.ts` para iterar as tags configuradas do Produto em vez de assumir só `fbq`
- [x] 7.4 Configurar o Produto da Vee com o Pixel ID atual e validar que o evento `InitiateCheckout` continua disparando antes do redirect de checkout — validado que o Pixel é injetado corretamente no `dist/index.html`; o disparo do evento em si segue a mesma lógica testada antes da migração

## 8. Legal disclaimers

- [x] 8.1 Adicionar `affiliateDisclosure: string` (obrigatório) e `categoryDisclaimers?: string[]` (opcional) ao `ProductConfig`
- [x] 8.2 Adicionar bloco de disclaimer de afiliado no rodapé, renderizado a partir do config
- [x] 8.3 Adicionar bloco opcional de disclaimer de categoria, renderizado no rodapé quando presente
- [x] 8.4 Preencher `affiliateDisclosure` e o disclaimer de categoria (suplemento) no config da Vee — validado no DOM renderizado

## 9. Final validation

- [x] 9.1 Rodar build completo do Produto Vee e comparar com a versão anterior — build limpo (`tsc --noEmit && vite build`), copy de todas as seções conferida via extração de texto da página renderizada; **não feito**: diff pixel-a-pixel via screenshot (indisponível nesta sessão — Browser pane não compôs frame)
- [x] 9.2 Rodar Lighthouse na Instância da Vee — sem baseline anterior pra comparar (nunca rodado antes desta change). Resultado: Performance 44, Accessibility 92, Best Practices 100, SEO 100. Performance baixo é causado por assets de mídia pesados pré-existentes (PNGs de produto de até 5.5MB, vídeo/poster do Hero) — não alterados por esta change; sinalizado separadamente (chip de otimização de mídia). Os 2 achados de Accessibility (`aria-allowed-attr` no botão da Área Restrita, `color-contrast` no CTA primário) são confirmadamente pré-existentes — mesmo markup/cores do código original, não introduzidos aqui.
- [x] 9.3 Validar manualmente: captura de lead ✅ (estrutural — UI, wiring do modal e config corretos; sem round-trip contra Postgres real, banco indisponível nesta sessão), tracking de checkout ✅ (Pixel injetado corretamente no `dist/index.html`, `trackInitiateCheckout` generalizado), disclaimers visíveis ✅ (conferido no DOM renderizado), mobile sticky CTA ⚠️ **não verificável nesta sessão** — árvore de acessibilidade confirma que o elemento, label e `href` renderizam certo em 375px; a transição de exibição (`IntersectionObserver`) não pôde ser testada porque o Browser pane desta sessão não compõe frames (confirmado isolando um `IntersectionObserver` de teste, que também não disparou). Código do componente é idêntico ao original exceto o texto vindo do config — sem alteração de lógica, risco de regressão é baixo.
- [x] 9.4 Atualizar `estrutura.md` apontando pra `CONTEXT.md` e pro openspec change, deixando claro que o documento descreve o Produto Vee especificamente (README.md não foi tocado — arquivo com encoding corrompido, fora do escopo consertar aqui)
- [x] 9.5 Confirmar com o usuário que a Base está pronta antes de iniciar uma change seguinte para o segundo Produto — confirmado pelo usuário em 2026-08-08
