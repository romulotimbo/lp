## 1. Assets

- [x] 1.1 Criar `public/imagens/audifort/` e copiar `products/audifort/recursos/bottle-label.webp` (Hero + ogImage) e `person1.jpg` (figura da dor)
- [x] 1.2 Não publicar `PRODx2` / `PRODx3` / `PRODx6`, `label.webp` nem `person2`–`person5`

## 2. Produto config

- [x] 2.1 Criar `products/audifort/product.config.ts`: slug `audifort`, `layout: "review"`, domínio `audifort.nothforge.com`, locale en-US/USD, paleta do design (`#F7F3EA` / `#FFFCF7` / `#2A2218` / `#6E6256` / `#9A5A16` / `#734210`), `outboundCta` com o hop `https://hop.clickbank.net/?affiliate=romulotsil&vendor=audifort&pid=pre1`, `trackingTags: []`, sem Spokesperson e sem `plans`
- [x] 2.2 Hero: `bottle-label.webp`, headline/subhead do design (sem *independent*), CTA = `outboundCta`, microcopy apontando o disclosure no footer
- [x] 2.3 Seções na ordem `pain` → `research` → `official-claims` → `testimonials` → `verdict` → `faq`; pain com `person1.jpg` e alt sem nome; research e claims só com fatos da oficial (sem N/nota de reviews inventados; sem cura/tinnitus; sem preços)
- [x] 2.4 Testimonials: 5 notas originais, iniciais + estado, `avatar: ""`; FAQ com fatos da empresa + pergunta de preço mandando ao hop; verdict + footer + sticky no mesmo `outboundCta`; disclaimers afiliado + FDA + ClickBank-as-retailer

## 3. Scripts e catálogo

- [x] 3.1 Adicionar `dev:audifort` (porta 5176) e `build:audifort` (`dist/audifort`) no `package.json`
- [x] 3.2 Atualizar `PRODUCT.md`: listar `audifort` (review, en-US, hop ClickBank, sem Spokesperson) e os assets em `products/audifort/recursos/`

## 4. QA

- [x] 4.1 Subir `dev:audifort` e validar: Hero com `bottle-label.webp` → dor com person1 sem nome → pesquisa/claims → iniciais → veredito/CTA → FAQ → footer com disclosure; hop abre a oficial; sem cards de preço; sem *independent*
- [x] 4.2 Confirmar que clicar o hop não dispara `InitiateCheckout` / conversion de checkout
- [x] 4.3 Smoke `dev:energi-power-vee`, `dev:alpha-surge` e `dev:advanced-amino-formula`: configs e shells inalterados
