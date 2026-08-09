/**
 * Cores lidas de CSS custom properties injetadas em build a partir do
 * ProductConfig ativo (ver vite.config.ts + src/product/tokens.ts). O papel de
 * token é fixo (contrato — ADR-0002); o valor é livre por Produto.
 *
 * `cyber-darker` fica consolidado no mesmo token que `cyber-black` — o
 * contrato de tokens tem só 6 papéis (background/surface/text-primary/
 * text-muted/accent/accent-dark), sem um terceiro nível de "profundidade".
 *
 * @param {string} cssVar
 */
function withOpacity(cssVar) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${cssVar}))`
      : `rgb(var(${cssVar}) / ${opacityValue})`;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: withOpacity("--color-background"),
          darker: withOpacity("--color-background"),
          graphite: withOpacity("--color-surface"),
          titanium: withOpacity("--color-text-primary"),
          muted: withOpacity("--color-text-muted"),
        },
        blood: {
          red: withOpacity("--color-accent"),
          dark: withOpacity("--color-accent-dark"),
        },
      },
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        body: ["Barlow", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      boxShadow: {
        "neon-red": "0 0 20px rgb(var(--color-accent) / 0.4)",
        "neon-red-soft": "0 0 32px rgb(var(--color-accent) / 0.18)",
        "inner-dark": "inset 0 2px 4px rgba(0, 0, 0, 0.9)",
        "lift-sm": "0 12px 40px rgba(0, 0, 0, 0.45)",
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--duration, 40s) linear infinite",
        "border-beam": "border-beam var(--duration, 4s) linear infinite",
        "pulse-slow": "pulse-slow 5s ease-in-out infinite",
        glitch: "glitch 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        "hud-scan": "hud-scan 5s linear infinite",
        "hud-border-pulse": "hud-border-pulse 4s ease-in-out infinite",
        "hud-blink": "hud-blink 1.2s step-end infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap, 1rem)))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - var(--gap, 1rem)))" },
          to: { transform: "translateX(0)" },
        },
        "border-beam": {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
        glitch: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "97%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "hud-scan": {
          "0%": { top: "8%", opacity: "0" },
          "5%": { opacity: "1" },
          "95%": { opacity: "1" },
          "100%": { top: "92%", opacity: "0" },
        },
        "hud-border-pulse": {
          "0%, 100%": {
            borderColor: "rgba(22, 22, 26, 0.8)",
            boxShadow: "inset 0 0 0 0 rgba(196, 30, 58, 0)",
          },
          "50%": {
            borderColor: "rgba(196, 30, 58, 0.35)",
            boxShadow: "inset 0 0 24px 0 rgba(196, 30, 58, 0.06)",
          },
        },
        "hud-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
    },
  },
  plugins: [],
};
