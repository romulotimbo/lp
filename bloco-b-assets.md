# Bloco B — Brief de Assets · Energi Power by Vee

Documento de produção para geração (Magnific / nano-banana / fotografia real).  
Cada linha mapeia **arquivo → seção → specs técnicas → direção criativa**.

**Magnific MCP:** [`MAGNIFIC_MCP_REFERENCIA_PORTAL.md`](MAGNIFIC_MCP_REFERENCIA_PORTAL.md) — créditos vs Unlimited, ferramentas, falhas e protocolo.

**Paleta de referência (UI — não aplicar no rótulo do produto):**

| Token | Hex | Uso |
|-------|-----|-----|
| cyber-black | `#0A0A0A` | Fundos |
| cyber-darker | `#050505` | Profundidade |
| cyber-graphite | `#16161A` | Cards / HUD |
| cyber-titanium | `#D1D5DB` | Texto principal |
| blood-red | `#C41E3A` | Acentos, rim light, glow |

**Regra de ouro:** a UI é dark/cyber/vermelho. O **único** dourado/branco “permitido” na tela vem do **rótulo real do pote** — por isso fotos de produto devem integrar via rim light vermelha e fundo escuro, não competir com a interface.

---

## Tabela principal

| # | Prioridade | Asset | Caminho no projeto | Onde entra | Formato | Dimensões | Peso alvo | Status |
|---|------------|-------|-------------------|------------|---------|-----------|-----------|--------|
| B1 | **P0** | Vídeo Hero Vee | `public/video/vee-hero.mp4` | `HeroVideoBackground` — fundo full-screen, `opacity-20`, `object-cover` | MP4 H.264 | **1920×1080** (16:9) | ≤ 8 MB | ✅ 3.28 MB |
| B2 | **P0** | Poster do Hero | `public/video/vee-hero-poster.png` | `poster` do `<video>` + fallback antes do load | PNG | **2688×1536** | — | ✅ |
| B3 | **P0** | Pote Hero (1 un.) | `public/imagens/1 POTE.png` | `Hero.tsx` + `Pricing.tsx` (kit 1) — `TiltCard` + `ProductGlow` | PNG transparente | **1200×1600** px (retrato) | ≤ 500 KB | ✅ Var B · cut-out · `5xp5cPCKxe` → `tfZt6b1mZJ` |
| B4 | **P1** | Kit 3 potes | `public/imagens/3 POTES.png` | `Pricing.tsx` card recomendado + `BorderBeam` | PNG transparente | **1400×1000** px (paisagem) | ≤ 600 KB | ✅ Var B · `EqWECrtuuO` |
| B5 | **P1** | Kit 5 potes | `public/imagens/5 POTES.png` | `Pricing.tsx` kit 5 | PNG transparente | **1600×900** px (paisagem) | ≤ 700 KB | ✅ Var B · `74C7wWQJAL` |
| B6 | **P1** | Macro cápsulas | `public/imagens/1 POTE CAPSULA.png` | `TechMechanism.tsx` dentro do `HudFrame` — `max-h-80` / `sm:max-h-96` | PNG transparente | **800×800** px (quadrado) | ≤ 400 KB | ✅ Var A · `xg84UZljfW` → bg `swm6Oqrl8e` · alt B `gJv3yYPSXO` |
| B7 | **P1** | Thumbs Área Restrita (×8) | `public/imagens/modelo/1–4.webp` · `5–8.jpg` | `RestrictedArea.tsx` carrossel — blur 8px→0 | WebP / JPG | **600×800** (3:4) | ≤ 150 KB cada | ✅ `1–4` WebP · `5–8` Seedream · `npm run modelo:optimize` |
| B8 | **P1** | Watermark Manifesto | `public/imagens/vee-manifesto-watermark.webp` | `Manifesto.tsx` — absoluto direita, opacidade 6–8% | WebP c/ alpha | **1200×1600** | ≤ 200 KB | ✅ `0p7mtuBTfW` → bg `swm6RwTl8e` |
| B9 | **P2** | Macro 3 potes (opcional) | `public/imagens/3 POTES CAPSULA.png` | `TechMechanism.tsx` — aba **100% Natural** · `HUD::TRIPLE_STACK_SCAN` | PNG transparente | **1000×700** | ≤ 500 KB | ✅ Wired na tab `capsules` |
| B10 | **P2** | Retrato fallback Vee | `public/imagens/vee-portrait.jpg` | `HeroVideoBackground` — erro do MP4 ou `prefers-reduced-motion` | JPG | **1080×1350** (4:5) | ≤ 350 KB | ✅ `y6FntQ7PW9` · alt frame `vee-hero.mp4` |
| B11 | **P2** | Avatares depoimentos (×6) | `public/imagens/avatars/01.webp` … `06.webp` | `Testimonials.tsx` — avatar circular 48px | WebP | **128×128** | ≤ 20 KB cada | ✅ Seedream abstrato · `l7hiIfZgv9`…`LUtN8ULswO` |
| B12 | **P2** | OG / Share image | `public/og-image.jpg` | `index.html` og/twitter · WhatsApp/IG bio | JPG | **1200×630** | ≤ 250 KB | ✅ FFmpeg + `1 POTE.png` · `npm run og:build` |
| B13 | **P3** | Stories cortes (×3) | `public/marketing/story-01.jpg` … `03.jpg` | Tráfego pago / stories Instagram — **fora da LP** | JPG 9:16 | **1080×1920** | ≤ 400 KB cada | ✅ FFmpeg · `npm run stories:build` |
| B14 | **P3** | Favicon / app icon | `public/favicon.svg` + PNGs | Aba do browser · iOS home | SVG + PNG | **32×32** / **180×180** / **512×512** | — | ✅ SVG + `favicon-32` · `apple-touch-icon` · `icon-512` · `npm run favicon:build` |
| **M1** | **P0** | Teaser Stories (lançamento portal) | `public/video/teaser-stories.mp4` | Instagram Stories / Reels 9:16 — **fora da LP** | MP4 H.264 mudo | **1080×1920** · **8 s** | ≤ 4 MB | ✅ Derivado do `vee-hero` · `npm run teaser:stories` |

**Legenda status:** ❌ Faltando · ⚠️ Existe mas deve ser refeito ou ampliado · ✅ Pronto

---

## B1 — Reserva e testes de figurino (Magnific)

Character: `modelo_canonica_ia_v2` · gerações de campanha via **`seedream-4-5`**.

### Pipeline lace teddy → frame Hero B1

| Etapa | Descrição | Link direto |
|-------|-----------|-------------|
| Original | Lace teddy Seedream | [Abrir](https://pikaso.cdnpk.net/private/production/4459638709/render.jpg?token=exp=1780444800~hmac=002176a6532094dd2e14d77bae124d88613f1061ad74c315c3f1bd8a6a73d5d7) |
| 1 — Fundo preto | Seedream edit *(Nano Banana bloqueou NSFW)* | [Abrir](https://pikaso.cdnpk.net/private/production/4460083616/render.jpg?token=exp=1780444800~hmac=8b4c3376db45ad949658bd6bfd9c75dda87fb0c3bb454a9457495160381dfa0f) |
| 2 — Pele natural | Skin Enhancer faithful · grain 20 · detail 35 | [Abrir](https://pikaso.cdnpk.net/private/production/4460086565/render.png?token=exp=1780444800~hmac=7b322a501f27bf79158fff61ea82badbae25784f52e938ab07799d326b3b31c1) |
| 3 — Upscale 2× | Magnific Enhance (~5376×3072) | [Abrir](https://pikaso.cdnpk.net/private/production/4460086788/original-upscale.png?token=exp=1780444800~hmac=b0629db44acab17de67b0d85fe662a174055cc028c58656796c1249a04288920) |
| 4 — Realismo pele + fix pontos vermelhos | Seedream 4.5 edit + prompt Flux-inspired | [Var A](https://pikaso.cdnpk.net/private/production/4460125911/render.jpg?token=exp=1780444800~hmac=1f51a0086f29f4cf21849d1677cb06479f92e3458b20e2031c19eee8177829a5) · [Var B](https://pikaso.cdnpk.net/private/production/4460125211/render.jpg?token=exp=1780444800~hmac=a770272fb8394aa871c33ea66006bb6abc0c90e9a50a78e8fe5f9c6521835504) | Flux.2 Pro bloqueou NSFW no Magnific |

#### Prompt — camada de pele (adaptado do Flux; ignorar desc. física alheia)

```
Natural human skin texture with detailed pores, subtle imperfections, realistic minimal makeup, not airbrushed, not waxy plastic AI skin. Soft diffused low-key key light. Professional 85mm beauty portrait, shallow depth of field, high-end photographic realism.
```

#### Prompt — correções de pele (pontos vermelhos)

```
Remove red dot between eyebrows. Remove three red dots on chest in tattoo area. No red beauty marks or moles on skin. Tattoos strictly black and grey geometric tribal only — no red ink in tattoos. Blood-red rim light #C41E3A only on hair/cheek edges, never as skin spots.
```

| Status | Outfit | Modelo | Link direto (full res) | Notas |
|--------|--------|--------|------------------------|-------|
| **✅ Reservada** | Camisole seda + renda | Nano Banana Pro | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459597497/render.png?token=exp=1780444800~hmac=4da5756b764b283ab8699a3a71a6db21f7da2642812a82a6c4230b4bf5b8bb96) | Aprovada; retoques pendentes |
| Teste | Camisole (var. 2) | Nano Banana Pro | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459596292/render.png?token=exp=1780444800~hmac=508e62bb714581e7b7b14658de3fbdac0328ddde1361e9622af48091f26dbf01) | — |
| **✅ Frame B1** | Lace teddy retocado | Retouch + I2V | [Vídeo Magnific](https://www.magnific.com/app/creation/Te7TfbQVNR) | Seedance 2.0 · 15s · local: `public/video/vee-hero.mp4` |
| Teste | Slip dress seda | Seedream 4.5 | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459639349/render.jpg?token=exp=1780444800~hmac=ebfd69e697b7cc96e4e8b6cd20bb8626550cae7043c0230f43bea68f883d96fc) | — |
| Teste | Corset off-shoulder | Seedream 4.5 | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459680050/render.jpg?token=exp=1780444800~hmac=2347c25e536ec83ae83a14cf9a2721dbeb53d0a208b39fc88e5b382373683339) | — |
| Teste | Harness + lace bra | Seedream 4.5 | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459679785/render.jpg?token=exp=1780444800~hmac=3643b0ad8482753c2582017401012b30aad6b069c037a8fedc6d00b217809528) | — |
| Teste | Robe + bralette | Seedream 4.5 | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459679685/render.jpg?token=exp=1780444800~hmac=e31e8be9387adc59a08e2eac7c16b1a3692751865307d18c11d9f8aaefbf3790) | — |
| Arquivo | Bodysuit model sheet (v1) | Nano Banana Pro | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459556641/render.png?token=exp=1780444800~hmac=d8704793e8c8c0e3b143718e7b932c3617f9d758a20c84bd2753f325258b0f5c) | Roupa neutra — descartada |
| Arquivo | Bodysuit model sheet (v2) | Nano Banana Pro | [Abrir imagem](https://pikaso.cdnpk.net/private/production/4459557593/render.png?token=exp=1780444800~hmac=2d1de4553699a5f9556734e16f434ab85bb3f25a44a212750306462c078df109) | Composição referência |

> URLs CDN com token — **baixe** se for guardar no projeto (`public/`). Nas próximas gerações, o assistente envia sempre link direto `url` (full res) no chat.

---

## Orientações por asset (detalhado)

### B1 — Vídeo Hero Vee (`vee-hero.mp4`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Atmosfera imersiva atrás do Hero; Vee presente mas **subordinada** ao pote (produto = luz principal). |
| **Character (library)** | `modelo_canonica_ia_v2` — identifier `l47v7gv9EV`. O bodysuit neutro do model sheet é **só referência corporal**; nos assets de campanha usar **lingerie/boudoir** (abaixo). |
| **Figurino Hero** | **Lace teddy preto** (candidato principal) — alternativa reserva: camisole seda. Pipeline: fundo `#050505` → skin enhancer → upscale 2×. |
| **Duração** | 12–20 s, **loop seamless** (início e fim compatíveis). |
| **Codec** | H.264, sem áudio (ou faixa muda removida), `playsInline` mobile. |
| **Tratamento na LP** | Vídeo a **20% opacidade** + gradiente `from-black/30 via-cyber-black/85 to-cyber-black`. |
| **Enquadramento** | Plano médio/close Vee; movimento lento (respiração, olhar, hair); **exposição baixa**, sombras profundas. |
| **Evitar** | Texto na imagem, cores saturadas, fundo branco/claro, cortes rápidos, logo visível, roupa atlética/neutra do model sheet. |
| **Imagem (Magnific)** | **`seedream-4-5`** (campanha/boudoir) ou `imagen-nano-banana-2` (fallback SFW) · 16:9 · 2k · `references`: character `l47v7gv9EV` + image ref do frame base (`Te7cUe7VNR` ou aprovado). |
| **Vídeo (Magnific)** | `bytedance-seedance-pro-2.0` · 15 s · 16:9 · 1080p · `withSoundEffects: false` · keyframes start+end = frame aprovado · `cameraMotion: static`. |
| **Pós** | Comprimir com HandBrake/FFmpeg: CRF 23–28, preset slow; validar loop visual. |

#### Roteiro de movimento (loop mudo)

| Tempo | Beat | Ação |
|-------|------|------|
| 0:00 | Frame zero | Plano médio, olhar fixo na câmera, postura dominante/sedutora, respiração imperceptível |
| 0:02–0:05 | Respiração | Peito sobe/desce muito devagar; pálpebras pesam levemente |
| 0:05–0:08 | Olhar | Micro-desvio do olhar ~5° para a direita, retorno lento ao centro |
| 0:08–0:12 | Presença | Tensão nos cantos da boca (confiança, não sorriso aberto); 1–2 fios de cabelo se movem |
| 0:12–0:15 | Loop | Expressão volta ao estado inicial; mesma posição de cabeça |

Câmera estática ou push-in ≤ 3%. Sem fala, lip sync ou áudio.

#### Prompt imagem — primeiro quadro (EN)

```
Cinematic hero frame, medium close-up portrait of the same woman from character reference, matching face pixie hair hazel eyes freckles from reference, 3/4 angle facing camera, dominant confident alluring expression, direct intense eye contact, subtle closed-mouth knowing smile, bare shoulders and collarbones visible. Wardrobe: black silk camisole with delicate black lace trim at neckline, thin spaghetti straps, luxury dark evening fashion, seductive elegant dominant influencer styling, fashion editorial boudoir mood, suggestive silhouette not athletic, no fitness jumpsuit no sportswear no neutral bodysuit no gym wear. Symmetrical black grey geometric tribal tattoos on neck and upper arms at frame edges. Pure black void background #050505, low-key lighting, slightly underexposed, single blood-red rim light #C41E3A on hair edge and cheek only, deep shadow falloff, moody cyber-noir atmosphere, film grain, shallow depth of field, subject centered middle third, negative space left and right for UI, photorealistic 16:9, no text no logo no watermark, no bright background, no glasses
```

#### Prompt vídeo — image-to-video (EN)

```
Image-to-video animation of the exact same woman, black silk camisole with lace trim, lighting and framing as the start frame. Ultra-slow subtle living portrait: gentle breathing, minimal chest rise, slow natural blink, tiny eye movement returning to camera, slight hair strand drift, micro expression of dominant alluring confidence without talking or smiling wide. Static locked camera, no zoom, no pan, no orbit, no head turn greater than 3 degrees. Maintain low-key exposure, deep black background, blood-red rim light #C41E3A unchanged. Cinematic, photorealistic, seamless loop ending identical to start pose. Silent scene, no lip sync, no speech, no music cues.
```

---

### M1 — Teaser Stories (`teaser-stories.mp4`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Teaser de lançamento do portal — Stories/Reels, **sem produto**, mesmo clima do Hero |
| **Base** | Crop 9:16 + escurecimento do `vee-hero.mp4` (0 crédito Magnific) |
| **Copy na tela** | `EM BREVE...` · `BY VEE.` |
| **Rebuild** | `npm run teaser:stories` — editar textos em `scripts/build-teaser-stories.mjs` |
| **Metadados** | Removidos no build (FFmpeg `-map_metadata -1` + ExifTool `-all=`) — sem GPS/software/datas do hero |
| **Publicação** | Upload direto no IG; sticker “Em breve” opcional |

---

### B2 — Poster Hero (`vee-hero-poster.jpg`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Frame estático enquanto vídeo carrega; fallback perceptível se MP4 falhar. |
| **Conteúdo** | **Mesmo frame** do segundo 0 ou meio do loop do B1 — mesma grade de cor. |
| **Tratamento** | Leve desaturação; contraste médio-baixo; deve parecer bom mesmo com overlay escuro por cima. |

---

### B3 — Pote Hero (`1 POTE.png`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Protagonista visual do Hero + card pricing 1 pote; única fonte “quente” (dourado do rótulo) da seção. |
| **Fundo** | **Transparente** (PNG alpha). |
| **Luz** | Key light frontal suave + **rim light vermelha** (`#C41E3A`) vinda de trás/lateral; sombra projetada suave. |
| **Ângulo** | 3/4 levemente de baixo — sensação de pedestal / produto premium. |
| **Pós na LP** | `ProductGlow` aplica `brightness 0.93` + `saturate 0.88` + glow radial vermelho — gerar **ligeiramente mais claro/saturado** na fonte para compensar. |
| **Evitar** | Fundo branco recortado, reflexo de estúdio claro, sombra dura quadrada de recorte automático. |
| **Prompt base** | *"Single supplement bottle hero shot, dark studio, transparent background, subtle red rim light #C41E3A, gold label preserved, product photography, soft shadow under bottle, premium masculine aesthetic"* |

---

### B4 / B5 — Kits 3 e 5 potes

| Campo | Especificação |
|-------|----------------|
| **Função** | Cards de pricing; kit 3 tem **Border Beam** — borda do card deve ter respiro (~14px radius) sem cortar produto. |
| **Composição** | 3 potes: triângulo ou linha com profundidade; 5 potes: formação em V ou arco. |
| **Consistência** | **Mesma sessão de luz** que B3 (mesmo rim red, mesma escala relativa entre potes). |
| **Naming** | Manter nomes exatos com espaço: `3 POTES.png`, `5 POTES.png` (código já referencia). |

---

### B6 — Macro cápsulas (`1 POTE CAPSULA.png`)

| Campo | Especificação |
|-------|----------------|
| **Função** | “Scan HUD” no TechMechanism — simula painel técnico americano. |
| **Conteúdo** | Cápsulas brancas/off-white em close; pode incluir parte do pote desfocado ao fundo. |
| **Estilo** | Macro clínico-industrial; fundo escuro ou transparente; leve reflexo vermelho nas bordas das cápsulas. |
| **UI** | Exibido com padding `p-8` dentro do HudFrame — **não encostar nas bordas** da imagem. |
| **Prompt base** | *"Macro white supplement capsules, dark graphite background #16161A, technical product photography, subtle red accent light, shallow depth of field, HUD scan aesthetic"* |
| **Produção** | Seedream 4.5 + ref `5xp5cPCKxe` · cut-out ilimitado · reimport: `node scripts/import-b6-capsule.mjs` |
| **Backup** | `1 POTE CAPSULA.original.png` (~3,9 MB) |

---

### B7 — Thumbs Área Restrita (`modelo/*.jpg`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Carrossel horizontal censurado; blur 8px quando bloqueado → nitidez ao destravar. |
| **Quantidade** | Mínimo **6**, ideal **8** slides (código hoje usa 4). |
| **Aspect ratio** | **3:4 retrato** — slides ~120×144 px com `object-cover` + `scale-105`. |
| **Conteúdo** | Fotos estilo “conteúdo exclusivo” da Vee: lingerie/dark boudoir/silhueta — **SFW o suficiente para gerar**, censura vem do blur + overlay UI. |
| **Variedade** | Mix: close rosto, corpo 3/4, detalhe tecido, pose dominante; paleta sempre escura com accent vermelho. |
| **Evitar** | Fundos brancos, flash de estúdio claro, marcas d'água, texto na imagem. |
| **Integração** | `previewAssets` em `RestrictedArea.tsx` — 8 slides. Reimport: `node scripts/import-vault-thumbs.mjs` |
| **Magnific (5–8)** | Close `PiHnkAl42C` · 3/4 `mCA5W5uhJQ` · detalhe `1sBOm4Nr4r` · silhueta `9RbWrDvNYZ` |
| **Prompt base** | *"Dark moody boudoir portrait, confident woman, deep shadows, red accent lighting #C41E3A, intimate but elegant, 3:4 vertical, cinematic, no text, no watermark"* |

---

### B8 — Watermark Manifesto (`vee-manifesto-watermark.webp`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Silhueta/rosto Vee **atrás** do text reveal — presença sem competir com copy. |
| **Tratamento** | Opacidade alvo na LP: **4–8%**; desaturado; posição lateral ou central-offset. |
| **Formato** | WebP com alpha ou PNG; preferir contorno suave (feathered edges). |
| **Integração** | `Manifesto.tsx` · `opacity 6–8%` · `saturate-0` · reimport: `B8_SOURCE_URL=… node scripts/import-b8-watermark.mjs` |
| **Magnific** | Ghost portrait `0p7mtuBTfW` · cut-out `swm6RwTl8e` |

---

### B9 — Macro 3 potes (`3 POTES CAPSULA.png`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Visual do HUD em **todas as abas** (`3 POTES CAPSULA.png`). B6 (`1 POTE CAPSULA.png`) permanece reserva. |
| **Label HUD** | `HUD::TRIPLE_STACK_SCAN` |
| **Código** | `src/sections/TechMechanism.tsx` · `HUD_PRODUCT_IMAGE` |

---

### B10 — Retrato fallback Vee (`vee-portrait.jpg`)

| Campo | Especificação |
|-------|----------------|
| **Função** | Backup estático se MP4 não carregar; camada no Hero com `prefers-reduced-motion`. |
| **Estilo** | Mesma direção do B1/B2 — retrato 4:5, dark, rim red. |
| **Produção** | Seedream 4.5 `y6FntQ7PW9` · reimport: `B10_SOURCE_URL=… node scripts/import-b10-portrait.mjs` |
| **Alt rápido** | Frame do `vee-hero.mp4` via FFmpeg (mesmo enquadramento do vídeo) |

---

### B11 — Avatares depoimentos

| Campo | Especificação |
|-------|----------------|
| **Função** | Humanizar cards de testimonial (hoje só texto). |
| **Estilo** | **Abstrato/masculino** — silhueta, inicial estilizada, ou rosto genérico dark (não foto real identificável). |
| **Formato** | WebP 128×128, circular crop na UI. |
| **Integração** | Cards com `avatar` + borda `blood-red/30`. Reimport: `node scripts/import-avatars.mjs` |

---

### B12 — OG Image (`og-image.jpg`)

| Campo | Especificação |
|-------|----------------|
| **Conteúdo** | Pote hero + “ENERGI POWER” / “BY VEE” + fundo `#050505`. |
| **Tipografia** | Barlow Condensed / Barrow (FFmpeg `drawtext`). |
| **Rebuild** | `npm run og:build` |
| **Meta** | `index.html` — `og:image`, `twitter:card` large image |
| **Deploy** | Em produção, usar URL absoluta em `og:image` (ex. `https://seu-dominio.com/og-image.jpg`) |

---

### B13 — Stories 9:16 (marketing)

| Campo | Especificação |
|-------|----------------|
| **Função** | Criativos de tráfego (stories/DM) — **não renderizados na LP**. |
| **Variantes** | `story-01` — retrato Vee + libido · `story-02` — 3 potes + R$ 237 · `story-03` — vault + “segredinho no final da página”. |
| **Safe zone** | Texto/CTA entre **y≈280–1580** (faixa central 1080×1420). |
| **CTA** | `LINK NA BIO ↑` em todas. |
| **Assets base** | `vee-portrait.jpg` · `3 POTES.png` · `modelo/8.jpg` |
| **Rebuild** | `npm run stories:build` — copy em `scripts/build-marketing-stories.mjs` (`T.*`) |
| **Tamanhos atuais** | ~40 / ~71 / ~51 KB (q:v 5) |

---

## Estrutura de pastas (alvo)

```plaintext
public/
├── video/
│   ├── vee-hero.mp4
│   ├── vee-hero-poster.png
│   ├── teaser-stories.mp4      # M1 · Stories 9:16
│   └── teaser-stories-poster.jpg
├── imagens/
│   ├── 1 POTE.png
│   ├── 3 POTES.png
│   ├── 5 POTES.png
│   ├── 1 POTE CAPSULA.png
│   ├── 3 POTES CAPSULA.png      # opcional
│   ├── vee-manifesto-watermark.webp
│   ├── vee-portrait.jpg
│   ├── modelo/
│   │   ├── 1.jpg … 8.jpg
│   └── avatars/
│       ├── 01.webp … 06.webp
├── marketing/                   # fora da LP
│   └── story-01.jpg … 03.jpg
└── og-image.jpg
```

---

## Ordem de produção recomendada

1. **B1 + B2** — Hero ganha alma imediata  
2. **B3** — Pote hero integrado ao dark UI  
3. **B7** — Vault deixa de parecer placeholder  
4. **B4 + B5 + B6** — Pricing + HUD fechados  
5. **B8** — Manifesto com presença Vee  
6. **B10–B14** — Polish e marketing externo  

---

## Checklist pós-entrega

- [ ] Arquivos nos caminhos exatos (case-sensitive no deploy Linux)
- [ ] PNGs de produto com alpha limpo (sem halo branco)
- [ ] Vídeo testado em Chrome mobile (`playsInline`, loop)
- [ ] Imagens `modelo/` passam bem com `blur(8px)` — detalhe não some totalmente
- [ ] Peso total `public/` ≤ ~15 MB (meta performance mobile)
- [ ] Atualizar `previewAssets` se expandir carrossel além de 4 itens
- [x] Wire B8 no `Manifesto.tsx`
- [x] Wire B11 no `Testimonials.tsx`
- [x] OG image em `index.html`

---

## Referências no código

| Asset | Arquivo consumidor |
|-------|-------------------|
| `vee-hero.mp4` | `src/components/hero-video-background.tsx` |
| `1 POTE.png` | `src/sections/Hero.tsx`, `src/sections/Pricing.tsx` |
| `3/5 POTES.png` | `src/sections/Pricing.tsx` |
| `1 POTE CAPSULA.png` | Reserva / macro 1 pote (B6) |
| `3 POTES CAPSULA.png` | `src/sections/TechMechanism.tsx` — HUD todas as abas |
| `modelo/*.jpg` | `src/sections/RestrictedArea.tsx` |
| `vee-manifesto-watermark.webp` | `src/sections/Manifesto.tsx` |
| `vee-portrait.jpg` | `src/components/hero-video-background.tsx` |
| `avatars/*.webp` | `src/sections/Testimonials.tsx` |
| `og-image.jpg` | `index.html` (meta OG/Twitter) |
