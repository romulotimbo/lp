import type { DesignTokens } from "./types";

/**
 * Mapeia papel de token -> nome de CSS custom property. Os valores armazenados
 * nessas variáveis são tripletos "R G B" (não hex) para que o Tailwind componha
 * opacidade via `rgb(var(--x) / <alpha-value>)` — é assim que classes como
 * `bg-cyber-black` e `border-blood-red/40` continuam funcionando com qualquer
 * paleta de Produto (ver tailwind.config.js).
 */
export const TOKEN_CSS_VAR: Record<keyof DesignTokens, string> = {
  background: "--color-background",
  surface: "--color-surface",
  textPrimary: "--color-text-primary",
  textMuted: "--color-text-muted",
  accent: "--color-accent",
  accentDark: "--color-accent-dark",
};

function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

/** "#C41E3A" -> "196 30 58" — formato que o Tailwind precisa pra compor opacidade. */
export function hexToRgbChannels(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "0 0 0";
  return rgb.join(" ");
}

/** Luminância relativa (WCAG). */
export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5; // fallback neutro se o valor não for hex reconhecível

  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** `true` quando o token de background é escuro — usado pelos componentes que precisam adaptar contraste (glow, HUD). */
export function isDarkBackground(tokens: DesignTokens): boolean {
  return relativeLuminance(tokens.background) < 0.5;
}

/** Canal RGB (branco ou preto) legível sobre o accent do Produto — para texto/ícone em cima de superfícies coloridas com accent (ex. seleção de texto, badges sólidos). */
export function onAccentChannels(tokens: DesignTokens): string {
  return relativeLuminance(tokens.accent) < 0.5 ? "255 255 255" : "10 10 10";
}
