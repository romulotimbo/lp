# Design System Master — Energi Power by Vee

**Project:** Energi Power by Vee  
**Category:** Landing page · libido · cyber/blood dark  
**Stack:** Tailwind 3.4 · motion/react · Vite + React

> Regras de página específica em `design-system/pages/` sobrescrevem este arquivo.

---

## Color Palette

| Role | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Background | `#0A0A0A` | `cyber-black` | Main surface |
| Depth | `#050505` | `cyber-darker` | Hero, vault |
| Surface | `#16161A` | `cyber-graphite` | Cards, HUD, borders |
| Text primary | `#D1D5DB` | `cyber-titanium` | Headlines, body |
| Text muted | `#52525B` | `cyber-muted` | Secondary copy |
| Accent / CTA | `#C41E3A` | `blood-red` | Buttons, rim light, laser |
| Accent dark | `#8B0000` | `blood-dark` | Hover, shadows |

**Proibido em CSS:** branco puro, dourado, laranja/verde genéricos. Exceção intencional: cores do **rótulo PNG do produto**.

```css
/* Shadows */
box-shadow: 0 0 20px rgba(196, 30, 58, 0.4); /* neon-red */
```

---

## Typography

| Role | Font | Tailwind |
|------|------|----------|
| Display / CTAs | Barlow Condensed | `font-display` |
| Body | Barlow | `font-body` |
| Mono / vault | JetBrains Mono | `font-mono` |

Headlines: uppercase, tracking wide. Body: `text-cyber-muted` ou `text-cyber-titanium`.

---

## Spacing & layout

- Seções: `px-6 py-24 lg:px-8`
- Max width conteúdo: `max-w-7xl mx-auto`
- Touch targets mobile: `min-h-[48px]`
- Bordas finas: `border-[0.5px] border-cyber-graphite`

---

## Components (canonical)

| Pattern | Spec |
|---------|------|
| Primary CTA | `bg-blood-red text-cyber-titanium hover:bg-blood-dark` |
| Secondary CTA | `border border-blood-red text-blood-red hover:bg-blood-red/10` |
| Card | `bg-cyber-graphite` + border graphite |
| Hero video | 20% opacity + dark gradient overlay |
| Product | `ProductGlow` — rim red behind bottle |

---

## Motion

- Respeitar `prefers-reduced-motion` (tilt, marquee, vídeo)
- Border Beam: `offset-path` perimetral, não spin cônico
- Magnetic: só CTA principal pricing (desktop)
- Vault: hold 2.5s linear progress

---

## Assets

- Hero video: `/video/vee-hero.mp4`
- Poster: `/video/vee-hero-poster.png`
- Product: `/imagens/1 POTE.png` (hero), kits em Pricing

Ver [`estrutura.md`](../../estrutura.md) e [`bloco-b-assets.md`](../../bloco-b-assets.md).

---

## Anti-patterns

- Não usar Gravity terminal fullscreen no Hero
- Não Fade Blur no Manifesto
- Não magnetic em todos os CTAs
- Não bodysuit neutro do model sheet em assets de campanha (usar boudoir)
