## Context

O repo é hoje uma SPA Vite + React + TypeScript + Tailwind + `motion/react`, com 8 seções fixas montadas em `src/App.tsx`, paleta cyber-black/blood-red fixa em `tailwind.config.js`, checkout via links Braip hardcoded em `Pricing.tsx`, Pixel Meta hardcoded em `index.html`, e captura de lead ("Vault") acoplada à narrativa +18 da Vee, com API própria (`api/`) e Postgres (`sql/01-landing-vault-waitlist.sql`). Deploy é um container Docker + nginx por site, roteado por `Host()` no Traefik — esse padrão já existe na infra do usuário para outros serviços e é reaproveitado tal qual (ADR-0001).

Modelo de domínio e decisões arquiteturais de alto nível já fechados em `CONTEXT.md`, `docs/adr/0001-base-monorepo-per-product-instance.md` e `docs/adr/0002-fixed-token-contract-free-values.md`.

## Goals / Non-Goals

**Goals:**
- Extrair um schema de configuração de Produto e um build que seleciona um Produto e gera uma Instância isolada.
- Remover a suposição de dark mode fixo dos componentes visuais compartilhados, substituindo por um contrato de tokens com valores livres.
- Tornar as seções da página, o Pricing, o Spokesperson, a captura de lead e as tags de rastreamento configuráveis por Produto.
- Migrar Energi Power by Vee para rodar como o primeiro Produto sobre essa Base, sem regressão visual/funcional perceptível.
- Tornar o disclaimer de afiliado obrigatório e bloqueante no build.

**Non-Goals:**
- Criar um segundo Produto novo (fica para uma change seguinte).
- Construir uma UI/CMS de administração para não-técnicos editarem Produtos — a configuração continua sendo arquivo de código neste momento.
- i18n em runtime (troca de idioma dinâmica) — Locale continua fixo por build, uma Instância = um idioma.
- Suportar múltiplas Instâncias por Produto (hierarquia Produto → N Instâncias) — fora do modelo fechado.

## Decisions

- **Formato de configuração: módulo TypeScript por Produto**, tipado contra uma interface `ProductConfig` compartilhada, em vez de JSON/YAML. Ganha checagem de tipos em build (falha cedo se um campo obrigatório, como o disclaimer de afiliado, estiver ausente) sem precisar de um parser/validador de schema à parte, e mantém tudo na mesma linguagem do resto do projeto.
- **Seleção de Produto no build via variável de ambiente** (ex. `PRODUCT=<slug> npm run build`), lida pelo `vite.config.ts` para escolher qual config importar. Cada build produz um único `dist/` para aquele Produto — consistente com "um container por Instância" (ADR-0001). Alternativa descartada: um app único decidindo o Produto por hostname em runtime (adicionaria complexidade de runtime sem necessidade, e fugiria do padrão de infra existente).
- **Tokens de design como CSS custom properties geradas em build** a partir dos valores de paleta do Produto, consumidas pelo Tailwind via `theme.extend.colors` referenciando `var(--color-*)`. Os componentes que hoje assumem dark mode (`ProductGlow`, `BorderBeamWrapper`, `HudFrame`) passam a calcular contraste (luminância relativa) a partir desses valores em vez de hardcodar tratamento para fundo escuro.
- **Seções como lista ordenada de módulos no config do Produto** (`sections: SectionId[]`), com Hero/Pricing/rodapé sempre incluídos independentemente do config. `App.tsx` passa a iterar essa lista contra um registro de componentes de seção, em vez de importar e montar 8 seções fixas.
- **Planos como array de tamanho livre** (`plans: Plan[]`, 1..N) no config do Produto; `Pricing.tsx` decide o layout (card único vs. recomendado + satélites) a partir do tamanho do array e de qual plano (se algum) está marcado como recomendado.
- **Spokesperson e Banco de mídia como conceitos separados**: o config do Produto referencia um Spokesperson (nome, copy, bio) que por sua vez referencia um Banco de mídia por identificador (pasta de assets), permitindo que o mesmo Banco de mídia seja referenciado por Spokespersons de nome/copy diferentes em Produtos diferentes.
- **Captura de lead generalizada**: tabela `landing.vault_waitlist` migra para algo como `landing.lead_capture` com coluna `product_slug`; a API existente (`api/`) permanece como serviço único compartilhado entre todos os Produtos/Instâncias (cada Instância aponta pra mesma URL de API via config), evitando duplicar backend por Produto.
- **Tags de rastreamento injetadas no build**: `index.html` deixa de ter o Pixel Meta hardcoded; um passo de build injeta a lista de tags do Produto (Meta Pixel, Google Ads, etc.) no HTML final. O mecanismo de evento de checkout (`trackInitiateCheckout`) permanece genérico, iterando as tags configuradas em vez de assumir só `fbq`.
- **Disclaimer de afiliado como campo obrigatório do schema `ProductConfig`**, validado no build (falha se vazio/ausente) — a obrigatoriedade é estrutural (erro de build), não apenas uma convenção de preenchimento.

## Risks / Trade-offs

- [Geração de tokens ficar fora de sincronia com o Tailwind config] → Mitigação: passo de geração de tokens roda automaticamente como pre-build (`predev`/`prebuild`), nunca editado manualmente.
- [Componentes adaptativos a contraste aumentam a superfície de teste visual] → Mitigação: util de luminância isolado e testado; aplicado só nos 3 componentes que hoje assumem dark mode, não espalhado pelo design system inteiro.
- [Backend de captura de lead compartilhado vira ponto único de falha entre Instâncias independentes] → Mitigação: mantém como serviço próprio já existente (`api/`), sem acoplar ao build/deploy de cada Instância; indisponibilidade da API não deve derrubar a página estática, só desabilitar o formulário.
- [Migração dos dados existentes do Vault perder continuidade] → Mitigação: migração aditiva (rename + novo default de `product_slug` para os registros existentes), nunca destrutiva.
- [Mudanças BREAKING simultâneas em vários componentes compartilhados dificultam validar que a Vee não regrediu] → Mitigação: sequência de migração incremental (ver Migration Plan) com checagem visual da Instância da Vee a cada etapa, antes de considerar a Base validada para um segundo Produto.

## Migration Plan

1. Definir a interface `ProductConfig` e criar o config da Vee com os valores atuais hardcoded (sem mudança visual ainda).
2. Introduzir geração de tokens CSS a partir do config; migrar `ProductGlow`, `BorderBeamWrapper`, `HudFrame` para consumir tokens/contraste; validar que a Instância da Vee renderiza igual.
3. Migrar `App.tsx` para montar seções a partir do config; validar ordem/saída idêntica às 8 seções atuais.
4. Migrar `Pricing.tsx` para consumir `plans: Plan[]`; validar que os 3 kits da Vee continuam corretos.
5. Extrair Spokesperson + Banco de mídia (Manifesto) e Captura de lead (Vault generalizado); migrar dados existentes da tabela.
6. Extrair Tags de rastreamento do `index.html` para o config; validar que o Pixel da Vee continua disparando.
7. Adicionar disclaimer de afiliado obrigatório e disclaimer de categoria opcional; preencher no config da Vee.
8. Regressão completa na Instância da Vee (visual + Lighthouse + QA manual) antes de considerar a Base pronta para um segundo Produto.

## Open Questions

- Nome do diretório de configs de Produto (`products/` vs. `configs/`) e do diretório de núcleo compartilhado (`core/` vs. manter `src/` como está).
- A API de captura de lead precisa de autenticação/rate limiting adicional agora que passa a ser multi-produto (hoje é pública, protegida só por honeypot `website`)?
- Os disclaimers de categoria precisam de uma pequena biblioteca de textos pré-escritos por categoria (ex. suplemento), ou ficam sempre freeform por Produto?
