# Landing Page Afiliado

Sistema para gerar landing pages de marketing de afiliados a partir de uma base de código e design compartilhada, com uma instância publicada por produto promovido.

## Language

**Base**:
O código, componentes, seções e mecanismos de design (motion, HUD, cards, etc.) compartilhados por toda página gerada. Mudar a Base propaga a melhoria a todo Produto na próxima geração.
_Avoid_: template genérico, boilerplate, core

**Produto**:
Um item de afiliado promovido através de sua própria landing page, definido por uma configuração própria (paleta, copy, links de checkout, tracking) aplicada sobre a Base.
_Avoid_: cliente, site, produto físico (quando ambíguo com o item físico do catálogo do afiliado, especificar "produto promovido")

**Instância**:
O resultado de aplicar a configuração de um Produto sobre a Base — a página final, publicada em seu próprio domínio/subdomínio e container.
_Avoid_: deploy, build (esses são passos técnicos que produzem a Instância, não a Instância em si)

**Spokesperson**:
Narrador/endossante opcional de um Produto (fictício ou real) que empresta voz ao Manifesto e a selos de recomendação ("o que a X usa"). Não é obrigatório — um Produto pode falar direto com o leitor, sem Spokesperson.
_Avoid_: persona (usar Spokesperson para o módulo estrutural; "persona" fica livre para uso coloquial), personagem, influencer

**Locale**:
Conjunto de idioma, moeda e disclaimers legais de um Produto. Nenhum idioma é assumido pela Base — todo texto estrutural (não só o copy de marketing) vem da config do Produto.
_Avoid_: i18n (não há troca de idioma em runtime — cada Instância é fixa em um Locale no build)

**Disclaimer de afiliado**:
Aviso obrigatório em toda Instância informando que o Produto é promovido como afiliado (comissão sobre a venda). Faz parte do Locale; o build de uma Instância não completa sem esse texto preenchido.
_Avoid_: disclaimer (sozinho é ambíguo — usar sempre "de afiliado" ou "de categoria" para diferenciar dos dois tipos)

**Disclaimer de categoria**:
Aviso legal específico do nicho do Produto (ex.: aviso de que declarações de suplemento não foram avaliadas por órgão regulador). Opcional — o Produto ativa se a categoria exigir.
_Avoid_: disclaimer (ver Disclaimer de afiliado)

**Seção**:
Um bloco de conteúdo da página (Hero, Manifesto, Pricing, FAQ, etc.). Hero, Pricing e o rodapé são obrigatórios em toda Instância; as demais são módulos opcionais que cada Produto liga, desliga e ordena conforme a categoria do que está vendendo.
_Avoid_: bloco (usado hoje em `estrutura.md` como "Bloco B" pra assets — evitar confundir com Seção de página)

**Plano**:
Uma opção de compra dentro do Pricing de um Produto (preço, features, link de checkout). Um Produto define de 1 a N Planos; com mais de um, um Plano pode ser marcado como recomendado (card em destaque, Border Beam, CTA magnético). Com um único Plano, o card recomendado é o próprio Pricing.
_Avoid_: kit (kit é o nome de marketing do Plano na Energi Power, não o conceito genérico), tier

**Captura de lead**:
Módulo opcional da Base que coleta e-mail do visitante contra um gancho (bônus, lista VIP, relatório grátis) definido por Produto. Backend compartilhado entre todos os Produtos (mesma tabela, com o Produto como coluna), ligado/desligado por Produto — não é obrigatório em toda Instância.
_Avoid_: Vault, waitlist (esses nomes são o gancho específico da Vee, não o módulo genérico)

**Banco de mídia**:
Conjunto de fotos/vídeos de uma modelo/personagem gerada (via IA, ex. Magnific), independente do nome ou copy atribuídos a ela. Pode ser reaproveitado por várias Spokespersons em Produtos diferentes — o Banco de mídia da Vee, por exemplo, será reciclado sob outros nomes conforme o Produto. Novos perfis de Produto podem receber Bancos de mídia próprios e exclusivos.
_Avoid_: assets da persona, mídia da personagem (usar "Banco de mídia" para o conjunto reaproveitável; a Spokesperson é o nome+voz atribuídos por Produto sobre um Banco de mídia)

**Tag de rastreamento**:
Um pixel/tag de anúncio (Meta Pixel, Google Ads, etc.) configurado por Produto — zero ou mais por Produto, cada um com seu próprio ID, injetado no build da Instância. O mecanismo de evento (ex. `InitiateCheckout` antes do redirect de checkout) é genérico na Base; só a lista de tags e seus IDs vem da config do Produto.
_Avoid_: Pixel (Pixel é um tipo específico de Tag de rastreamento — o do Meta)

**Página-popup** (anti-padrão, proibido):
Segunda página estática com overlay injetado sobre réplica desfocada de checkout, CTA e Close ambos indo à oferta. Google Ads classificou como malicious injected overlay. Spec e `validateProductConfig` rejeitam `popupGate`. Não emitir. Paths antigos (`/alphasurge`, `/advanced-amino`) 404 de propósito.
_Avoid_: reconstruir o overlay em path aninhado, redirect desses paths, chamar de capacidade

**Clone**:
Modo de Instância que publica HTML estático na raiz (cópia sanitizada de uma PDP/checkout), sem o shell React `sales`/`review`. Config: `layout: "clone"`, `clone.htmlFile`, `clone.affiliateHref`. CoolJet e Pawlax usam um cookie popup nessa raiz; isso não é `popupGate`.
_Avoid_: Página-popup, popupGate, segunda página no mesmo Host

## Decisions

- A Base vive neste mesmo repositório (não um repo de template separado) — Energi Power by Vee se torna o primeiro Produto extraído da Base.
- Organização em monorepo: núcleo compartilhado + configuração por Produto; build seleciona o Produto e gera uma Instância isolada, deployada como seu próprio container/subdomínio (mesmo padrão já usado na infra do usuário via Traefik).
- Spokesperson é um módulo opcional da Base, não uma seção obrigatória — cada Produto decide se usa.
- Mercado primário: EUA e Canadá, com expansão eventual para alguns países da Europa. Locale (idioma/moeda/disclaimers) é config por Produto, sem assumir português nem inglês fixo na Base.
- O Banco de mídia da Vee será reaproveitado (com nome/copy diferentes) em vários Produtos. Novos perfis de Produto que não combinem com a Vee ganham Banco de mídia próprio.
- A "regra de ouro" atual (fundo sempre dark, única cor variável é o acento) não é herdada pela Base — cada Produto pode redefinir a paleta inteira, incluindo esquemas claros. A Base vira um esqueleto de layout/motion neutro em relação a cor.
- A liberdade de paleta é sobre valores, não sobre a lista de papéis: todo Produto preenche o mesmo contrato fixo de tokens (background/surface/text/acento/etc.), e os componentes compartilhados (glow, border beam, HUD) se adaptam ao contraste desses tokens em vez de assumir dark mode.
- Captura de lead vira módulo opcional e generalizado da Base (gancho configurável por Produto, backend compartilhado), em vez de sair do sistema ou ficar preso à narrativa da Vee.
- Pricing suporta de 1 a N Planos por Produto, com "recomendado" opcional — não fica travado em 3 tiers de quantidade (isso era específico da Energi Power).
- Cada Produto configura suas próprias Tags de rastreamento (Meta Pixel, Google Ads, possivelmente outras depois) — nunca uma tag compartilhada entre Produtos.
- Seções são um menu opcional (Hero/Pricing/rodapé obrigatórios, resto módulo por Produto), não um esqueleto fixo de 8 blocos — permite categorias de produto além de suplemento físico.
- Produto continua 1:1 com Instância. A mesma oferta de afiliado vendida em dois mercados/idiomas vira dois Produtos (config duplicada e adaptada), não um Produto com múltiplas Instâncias — não existe hierarquia "oferta acima do Produto".
- Uma Instância emite a página da raiz. Overlay injetado / Página-popup (`popupGate`, path aninhado) é proibido (Google Ads: malicious injected overlay). Layout `clone` publica HTML estático na raiz; não é uma segunda página no mesmo Host.
- Disclaimer de afiliado é obrigatório e bloqueante no build de toda Instância. Disclaimers de categoria (ex. saúde/suplemento) são opcionais, ativados por Produto quando aplicável.
