---
name: Moérie Mineral Folio
description: Cool celadon blotter, pharmacy ink, brass-ochre from the yellow capsules. Editorial skeptic review — not HUD, not clinic, not glass lab.
colors:
  celadon-blotter: "#D7E3DC"
  cool-leaf: "#F4F8F5"
  pharmacy-ink: "#1C2A24"
  mineral-mute: "#5A6D64"
  capsule-ochre: "#C4A035"
  brass-cta: "#5C3E0A"
  paper-on-brass: "#F7F3EA"
typography:
  display:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "clamp(2.15rem, 4.4vw + 1rem, 3.85rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bodoni Moda, serif"
    fontSize: "clamp(1.7rem, 2vw + 1rem, 2.45rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Figtree, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Figtree, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  gutter: "24px"
  section: "clamp(3rem, 7vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.brass-cta}"
    textColor: "{colors.paper-on-brass}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.15rem"
    height: "3rem"
---

# Moérie Mineral Folio

Instance-specific world for `moerie-hair-boost` (`layout: "review-skeptic"`). This does **not** replace the Base's Burntide Glass Lab document at the repo-root `DESIGN.md`.

## Token map (6 roles)

| Role | Hex | Use |
|---|---|---|
| background | `#D7E3DC` | Celadon blotter |
| surface | `#F4F8F5` | Cool leaf paper |
| textPrimary | `#1C2A24` | Pharmacy ink |
| textMuted | `#5A6D64` | Supporting read |
| accent | `#C4A035` | Capsule ochre (hover, washes) |
| accentDark | `#5C3E0A` | CTA fill — paper text on brass, contrast ≥ 4.5:1 |

## Direction

- **Tone:** Skeptical beauty-desk folio. First person, dated, no miracle.
- **Type:** Bodoni Moda masthead; Figtree for the long read and quiz. Sentence case. No HUD uppercase, no Sora, no Bricolage on this layout.
- **Rhythm:** Editorial bar → annotated quiz → numbered acts with hairline rules. Dual official hops, never checkout cards.
- **Differentiation:** Cool mineral paper (not café-cream AI, not Amino clinic white, not Burntide ink lab). Offset paper shadow on the hero still-life. Reserved UGC frames until real clips exist.

## Rules

- CTA fill is brass (`accentDark`), not the yellow pill color.
- Product photography is photography (`mix-blend-mode: normal`). No neon glow.
- Quiz restyles Act 4; it never `display:none`s a SKU.
- The topical protocol is labeled **Moérie Haircare Set** (spray-focused set), not a lone spray SKU.
