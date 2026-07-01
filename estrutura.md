# Energi Power by Vee — Blueprint Estrutural

**Identidade:** Pure Dark · Graphite · Blood Red (isolamento cromático)  
**Stack:** Vite 6 · React 19 · TypeScript · Tailwind 3.4 · `motion/react`  
**Público:** Homens via stories/DM/perfil da influencer Vee · produto físico primeiro · Área Restrita como easter egg (+18) no fim da página.

---

## 1. Design System (Tailwind)

```js
// tailwind.config.js — cores canônicas
cyber: {
  black: '#0A0A0A',
  darker: '#050505',
  graphite: '#16161A',
  titanium: '#D1D5DB',
  muted: '#52525B',
},
blood: {
  red: '#C41E3A',
  dark: '#8B0000',
}
```

**Regra de ouro:** UI sempre dark/cyber/vermelho. Dourado/branco na tela vêm **só do rótulo real do pote** (PNG do produto).

| Token | Hex | Uso |
|-------|-----|-----|
| cyber-black | `#0A0A0A` | Fundo `<main>` |
| cyber-darker | `#050505` | Hero, vault, profundidade |
| cyber-graphite | `#16161A` | Cards, HUD, bordas |
| cyber-titanium | `#D1D5DB` | Texto principal |
| blood-red | `#C41E3A` | CTAs, rim light, acentos |

**Fontes:** Barlow Condensed (display) · Barlow (body) · JetBrains Mono (mono / vault)

---

## 2. Arquitetura da página (8 blocos)

Ordem em `App.tsx`:

| # | Seção | Arquivo | Objetivo UX |
|---|--------|---------|-------------|
| 01 | Hero | `Hero.tsx` | Impacto imersivo: vídeo Vee + pote protagonista (tilt + glow) |
| 02 | Manifesto | `Manifesto.tsx` | Voz da Vee — text reveal scroll (opacity, sem blur) |
| 03 | Power Grid | `PowerGrid.tsx` | Protocolo Vital — HUD telemetria + CTA `#pricing` |
| 04 | Tech Mechanism | `TechMechanism.tsx` | HUD + tabs — tecnologia / cápsulas (B6 + B9) |
| 05 | Testimonials | `Testimonials.tsx` | Marquee duplo — prova social |
| 06 | Pricing | `Pricing.tsx` | 3 kits · Border Beam + Magnetic no card 3 potes |
| 07 | FAQ | `Faq.tsx` | Accordion — discrição, garantia, uso |
| 08 | Área Restrita | `RestrictedArea.tsx` | Vault compacto · hold biométrico · carrossel 8 slides |

**Mobile:** `StickyCta` fixo após sair do `#hero` (`md:hidden`).

---

## 3. Componentes (`src/components/`)

| Componente | Função |
|------------|--------|
| `hero-video-background.tsx` | `/video/vee-hero.mp4` · poster · opacity · fallback B10 |
| `tilt-card.tsx` | Tilt 3D · touch · `prefers-reduced-motion` |
| `product-glow.tsx` | Glow blood-red + desaturate leve no pote |
| `border-beam.tsx` | Laser perimetral no card recomendado |
| `magnetic-button.tsx` | CTA magnético — só kit 3 potes |
| `hud-frame.tsx` | Scan line + flash ao trocar aba |
| `bento-grid.tsx` | Grid assimétrico + spotlight |
| `infinite-marquee.tsx` | Depoimentos em loop |
| `sticky-cta.tsx` | Barra mobile → `#pricing` |
| `ui/` | tabs, accordion, etc. |

---

## 4. Assets (`public/`)

```
public/
├── video/
│   ├── vee-hero.mp4              ✅ B1
│   ├── vee-hero-poster.png       ✅ B2
│   └── teaser-stories.mp4        ✅ M1 (marketing)
├── imagens/
│   ├── 1 POTE.png … 5 POTES.png  ✅ B3–B5
│   ├── 1 POTE CAPSULA.png        ✅ B6 — HUD (absorção / USA)
│   ├── 3 POTES CAPSULA.png       ✅ B9 — HUD aba 100% Natural
│   ├── vee-manifesto-watermark.webp  ✅ B8
│   ├── vee-portrait.jpg          ✅ B10
│   ├── avatars/01–06.webp        ✅ B11
│   ├── power/forca…desempenho.webp  ✅ Power Grid (texturas)
│   └── modelo/
│       ├── 1–4.webp              ✅ vault (legado otimizado)
│       └── 5–8.jpg               ✅ vault (Seedream B7)
├── marketing/story-01–03.jpg     ✅ B13
├── og-image.jpg                  ✅ B12
├── favicon.svg + PNGs            ✅ B14
```

Brief completo: [`bloco-b-assets.md`](bloco-b-assets.md)  
Magnific MCP: [`MAGNIFIC_MCP_REFERENCIA_PORTAL.md`](MAGNIFIC_MCP_REFERENCIA_PORTAL.md)  
**Character:** `modelo_canonica_ia_v2` · library `l47v7gv9EV`

---

## 5. Specs por seção (implementado)

### Hero
- Vídeo: `autoPlay` · `muted` · `loop` · `playsInline` · opacity ajustada · `object-position` para rosto visível
- Fallback B10: `/imagens/vee-portrait.jpg` se vídeo falhar ou `prefers-reduced-motion`
- Scrim **só atrás do copy** (não full-screen)
- Pote: `TiltCard` + `ProductGlow` · `/imagens/1 POTE.png`
- CTAs: `#pricing` · `#restricted-hint`

### Manifesto
- Scroll reveal `#52525B` → `#D1D5DB`
- Watermark B8: `vee-manifesto-watermark.webp` · 6–8% opacidade

### Tech Mechanism
- Abas: Absorção · **100% Natural** · Selo USA
- HUD: `3 POTES CAPSULA.png` (B9) em todas as abas
- Flash no `HudFrame` ao trocar tab

### Power Grid
- Título **Protocolo Vital** — 4 módulos `PROTOCOL::*` com stat grande + barra telemetria
- Card **Força** em destaque (2× altura desktop) · texturas `public/imagens/power/*.webp`
- CTA **Ativar o protocolo** → `#pricing`
- Direção: [`design-system/pages/power-grid.md`](design-system/pages/power-grid.md)

### Pricing
- Border Beam no card **3 Potes** · `MagneticButton` no CTA recomendado
- `#restricted-hint` no rodapé

### Área Restrita
- 8 slides: `modelo/1–4.webp` + `5–8.jpg`
- Blur 8px → 0 no unlock · glitch sutil na barra VAULT

---

## 6. Pendências conhecidas

| Item | Status |
|------|--------|
| Copy — revisão final tom Vee | Usuário |
| URLs checkout / área restrita | Placeholder `#` em `Pricing.tsx` |
| OG em produção | URL **absoluta** do domínio em `index.html` |
| Deploy + checklist pós-entrega | Ver `bloco-b-assets.md` § Checklist |

**Concluído (Bloco B):** B1–B14 + M1 · favicon · OG · stories marketing · otimização `modelo/1–4.webp`.

---

## 7. Comandos

```bash
npm run dev              # preview local
npm run build            # produção
npm run og:build           # regenerar OG
npm run favicon:build      # favicon PNGs
npm run stories:build      # marketing 9:16
npm run modelo:optimize    # reconverter 1–4 → WebP (se restaurar JPGs)
npm run power:textures     # texturas Power Grid (fallback FFmpeg)
```

Validar Hero em mobile: sticky CTA, vídeo de fundo, tilt touch.
