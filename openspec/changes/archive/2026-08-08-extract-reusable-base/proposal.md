## Why

O repo hoje é uma única landing page hardcoded ponta a ponta para um produto (Energi Power) e uma persona fictícia (Vee): paleta fixa em dark mode, 3 kits fixos por quantidade, checkout Braip e Pixel Meta hardcoded, captura de lead amarrada à narrativa +18 da Vee. O objetivo é reaproveitar a estrutura, o design e os mecanismos que funcionam (HUD, glow, Border Beam, motion, prova social) como uma Base compartilhada capaz de gerar uma nova landing page — coerente em paleta e copy com o produto em questão — para cada novo produto que entrar no grupo de produtos de afiliado do usuário. Estratégia de vendas passa a ser primariamente EUA/Canadá (expansão futura Europa), o que também exige generalizar idioma, moeda e disclaimers legais (hoje inexistentes).

## What Changes

- Introduzir o conceito de **Produto**: uma configuração (locale, paleta, copy, spokesperson, seções ativas, planos, gancho de captura de lead, tags de rastreamento, disclaimers) aplicada sobre a Base para gerar uma **Instância** publicável.
- **BREAKING**: remover a suposição de dark mode fixo dos componentes visuais compartilhados (`ProductGlow`, `BorderBeamWrapper`, `HudFrame`) — substituir por um contrato fixo de papéis de token (background/surface/text-primary/text-muted/accent/accent-dark) com valores livres por Produto, incluindo esquemas claros.
- **BREAKING**: transformar as 8 seções fixas da página (`App.tsx`) em um menu de seções opcionais — Hero, Pricing e rodapé obrigatórios; Manifesto/Spokesperson, Power Grid, Tech Mechanism, Testimonials, FAQ, Captura de lead e Área Restrita tornam-se módulos que cada Produto liga, desliga e ordena.
- **BREAKING**: generalizar `Pricing.tsx` de 3 kits fixos por quantidade para 1..N Planos configuráveis por Produto, com "recomendado" opcional.
- Extrair o Manifesto/vault-waitlist atuais em dois módulos opcionais independentes: **Spokesperson** (narrador opcional, apoiado por um Banco de mídia reaproveitável entre Produtos) e **Captura de lead** (gancho configurável por Produto, sobre backend compartilhado com coluna de Produto em vez de tabela dedicada ao "Vault").
- Mover Meta Pixel (hoje hardcoded em `index.html`) e futuras tags (ex. Google Ads) para configuração por Produto — zero ou mais Tags de rastreamento por Produto, nunca compartilhadas entre Produtos.
- Introduzir **Disclaimer de afiliado** obrigatório e bloqueante no build de toda Instância (requisito FTC para o mercado EUA/Canadá), e **Disclaimer de categoria** como bloco opcional ativado por Produto quando a categoria exigir (ex. aviso tipo FDA para suplementos).
- Migrar Energi Power by Vee para ser o primeiro Produto rodando sobre essa Base — sem criar um segundo Produto novo nesta change (fica para uma change seguinte).

## Capabilities

### New Capabilities
- `product-configuration`: schema de configuração de um Produto (identidade, locale, paleta, spokesperson, planos, seções ativas, gancho de lead, tags de rastreamento, disclaimers) e o build que seleciona um Produto e gera sua Instância isolada (deploy próprio, container/subdomínio).
- `design-token-contract`: contrato fixo de papéis de token de design (valores livres por Produto) e adaptação dos componentes visuais compartilhados (glow, border beam, HUD) para funcionar a partir do contraste desses tokens em vez de assumir dark mode.
- `optional-sections`: sistema de seções da página como módulos opcionais (Hero/Pricing/rodapé obrigatórios; demais ligadas/desligadas/ordenadas por Produto).
- `flexible-pricing`: seção de Pricing suportando 1 a N Planos por Produto, com card "recomendado" opcional.
- `spokesperson-module`: módulo opcional de narrador/endossante por Produto, apoiado por um Banco de mídia reaproveitável entre Spokespersons de Produtos diferentes.
- `lead-capture-module`: módulo opcional de captura de e-mail com gancho configurável por Produto, sobre backend compartilhado entre todos os Produtos.
- `tracking-tags`: configuração de zero ou mais tags de rastreamento (Meta Pixel, Google Ads, extensível) por Produto, injetadas no build da Instância.
- `legal-disclaimers`: disclaimer de afiliado obrigatório e bloqueante no build de toda Instância, e disclaimer de categoria opcional ativado por Produto.

### Modified Capabilities
(nenhuma — não há specs existentes em `openspec/specs/`; este é o primeiro conjunto de capabilities do projeto)

## Impact

- **Código:** `src/App.tsx` (seções fixas → montagem por config), `src/sections/*` (todas as seções passam a consumir dados de Produto em vez de conteúdo hardcoded), `src/components/product-glow.tsx`, `border-beam.tsx`, `hud-frame.tsx` (dark mode fixo → contraste a partir de tokens), `src/sections/Pricing.tsx` (3 kits fixos → N Planos), `tailwind.config.js` / `src/index.css` (paleta fixa → tokens por Produto), `index.html` (Pixel hardcoded → Tags de rastreamento por Produto), `src/lib/vault-waitlist.ts` + `src/components/vault-waitlist-modal.tsx` + `api/` + `sql/01-landing-vault-waitlist.sql` (Vault → Captura de lead generalizada).
- **Build/deploy:** processo de build passa a exigir seleção de Produto; cada Instância gerada mantém o padrão de deploy atual (container Docker + nginx + Traefik, um Host por Instância).
- **Dados:** schema Postgres da captura de lead ganha coluna de Produto; dados existentes do "Vault" da Vee precisam de migração.
- **Sem novo Produto nesta change** — Energi Power by Vee é migrada para ser o Produto de referência; nenhum segundo Produto é criado aqui.
