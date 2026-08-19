# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário — operador da Base.** Quem publica Instâncias: escolhe um Produto, preenche `product.config.ts`, sobe `dev:`/`build:` e coloca a Instância no ar (domínio/container próprios). O trabalho é lançar um Produto novo sem quebrar os que já existem.

**Visitantes — por Produto, não um único público.** Cada Instância fala com o visitante daquele Produto (hoje: homens via Spokesperson em sales; leitores 40–60 em review editorial). O visitante não opera a Base. Quando sales e review pedirem cromos diferentes no mesmo componente, os dois layouts são de primeira classe — nenhum visitante é o “default” que o outro deve imitar.

## Product Purpose

A Base gera landing pages de afiliado a partir de um núcleo compartilhado. Um `ProductConfig` aplicado sobre a Base produz uma Instância isolada (um build, um domínio, um container).

Sucesso: publicar um Produto novo rápido, sem regressão nas Instâncias já no ar.

## Positioning

Não é um site de um suplemento. É o sistema que faz cada oferta virar a própria página, com Locale, paleta, seções, tracking e CTA próprios — sem template único nem tag compartilhada entre Produtos.

Dois modos de página são contrato, não tema: `sales` (kits + checkout) e `review` (artigo + hop outbound). Um vizinho pode copiar uma LP; não pode afirmar que a Base trata os dois layouts como iguais e ainda assim isola build, domínio e pixel.

## Operating Context

- Um build = um Produto = uma Instância. `PRODUCT=<slug>` no Vite resolve `@product-config`.
- Scripts `dev:<slug>` / `build:<slug>` por Produto. Deploy no padrão Traefik/container, host próprio.
- Mercado declarado da Base: EUA e Canadá primeiro; Locale (idioma, moeda, disclaimers) é sempre config do Produto.
- Sales: CTA de checkout; evento `InitiateCheckout` / conversion só nesses cliques.
- Review: CTA único `outboundCta` (hop / página oficial, inclusive Digistore24); clique **não** é checkout.
- Captura de lead é módulo opcional (backend compartilhado, `source` por Produto).
- Vocabulário canônico: Base, Produto, Instância, Spokesperson, Locale, Disclaimer de afiliado, Disclaimer de categoria, Seção, Plano, Banco de mídia, Tag de rastreamento. Ver `CONTEXT.md`. Página-popup é anti-padrão, não capacidade.

## Capabilities and Constraints

**Capaz hoje**

- Layout `sales` (default) e `layout: "review"`.
- Seções ligáveis/ordenáveis; Pricing obrigatório só em sales; review exige `outboundCta` e rejeita `plans` / `"pricing"`.
- Contrato fixo de 6 papéis de token; valores livres por Produto (incluindo fundo claro).
- Spokesperson, Power Grid, Tech Mechanism, Testimonials, FAQ, lead capture e Área Restrita são opcionais.
- Review acrescenta `pain`, `research`, `official-claims`, `verdict`, e módulos de conversão opt-in: `trust`, `highlights`, `ritual`, `compare`, `guarantee`, `mid-cta`. CTA outbound no fim de cada dobra editorial.
- Tags de rastreamento por Produto, nunca compartilhadas.

**Produtos no ar / em curso**

- `energi-power-vee` — sales, pt-BR, Spokesperson Vee.
- `alpha-surge` — sales, en-US, Spokesperson Nova (Banco de mídia da Vee reaproveitado).
- `advanced-amino-formula` — review completa, en-US, outbound Digistore24 (sem ClickBank), sem Spokesperson. Google Ads `AW-18351905109` (gtag config; sem conversionLabel no outbound).
- `audifort` — review, en-US, hop ClickBank, sem Spokesperson.

**Não fazer**

- Inventar preço, kit ou checkout na **página de review**.
- Disparar evento de checkout no `outboundCta` da review (hop, Digistore24 ou letter oficial).
- Emitir Página-popup / overlay injetado (`popupGate`, diálogo inescapável sobre réplica de checkout). Google Ads classificou esse padrão como malicious injected overlay. `validateProductConfig` falha se o campo existir.
- Reusar foto de fornecedor como avatar de reviewer inventado.
- Fabricar claim de resultado, número de reviews ou garantia que a fonte oficial não afirma.
- Compartilhar Pixel/Ads entre Produtos.
- Assumir pt-BR, dark mode ou Spokesperson na Base.

**Em aberto**

- IDs de Pixel/Ads do Audifort (`trackingTags: []`). Conversion action do Amino (se a campanha precisar de um rótulo próprio, além do gtag de page view).
- Terceiro layout além de sales/review.
- Padrão de acessibilidade obrigatório da Base (nenhum foi fixado).
- Deploy DNS/Traefik de `advanced-amino.thebuylens.com` e `audifort.nothforge.com` (infra, não verdade de produto). Host antigo `advanced-amino.nothforge.com` ainda responde no Traefik.

## Brand Commitments

A Base não tem voz de marca única. Voz, nome e assets são do Produto.

- Disclaimer de afiliado é obrigatório e bloqueante no build.
- Disclaimer de categoria (FDA, ClickBank-as-retailer, etc.) só quando o Produto exige.
- Banco de mídia é reaproveitável entre Spokespersons; o nome/copy da Spokesperson não viaja com as fotos.
- Depoimentos no código podem ser ilustrativos — revisão legal antes de tratar como prova real.
- `.impeccable.md` descreve a identidade da Energi Power / Vee, não a da Base.

## Evidence on Hand

- Configs: `products/*/product.config.ts`.
- Assets Vee/Alpha em `public/imagens/` e vídeo em `public/video/`.
- Assets Amino em `products/advanced-amino-formula/recursos/` (publicados o necessário em `public/imagens/advanced-amino-formula/`).
- Assets Audifort em `products/audifort/recursos/` (publicados o necessário em `public/imagens/audifort/`: `bottle-label.webp`, `person3_up.jpeg`). Kits `PRODx*` e as demais `person*` ficam só em recursos. A dor usa o upscale Magnific de `person3` (1344 px).
- Domínio (`advanced-amino.thebuylens.com`) e URL Digistore24 do Amino estão no config; a letter oficial é a fonte dos claims (perda de massa muscular, 8 EAAs, chart de utilization, garantia 90 dias, reviews datados ago/2026).
- Domínio e hop do Audifort estão no config (`audifort.nothforge.com`; hop ClickBank `pid=pre1`). Claims da oficial (agosto de 2026): gotas 60 ml, lista em destaque, garantia 90 dias. Widget de reviews na oficial datado 14 ago 2026 (4.98/5, 2300+) — atribuído, não republicado como prova nossa. Paleta escura de sala de escuta (`#16131A`).
- Copy de review e depoimentos do Amino e do Audifort são originais, não verbatim do fornecedor.

**Não fabricar:** cases de cliente, benchmarks de conversão, endosso ClickBank, laudo clínico, ou rostos atribuídos a personas inventadas.

## Product Principles

1. **Uma Instância, um Produto.** Locale, pixel, domínio e copy não se misturam.
2. **Sales e review são iguais em prioridade.** Componente compartilhado se adapta; não vira híbrido nem sacrifica um cromo.
3. **Ship sem regressão.** Produto novo não pode quebrar checkout, tracking ou tom das Instâncias já publicadas.
4. **Afiliado visível, claim atribuído.** Disclosure no rodapé; número e promessa só com fonte e data.
5. **A Base não assume paleta, idioma nem narrador.** Isso vive no config.

## Accessibility & Inclusion

Nenhum padrão obrigatório foi fixado para a Base. Mobile-first e `prefers-reduced-motion` já existem no código; WCAG como contrato da Base permanece em aberto.
