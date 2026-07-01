# Power Grid — Direção criativa (v2)

## Conceito: **Protocolo Vital**

Painel de telemetria masculina — cada pilar é um **módulo HUD** que traduz o benefício do produto em sinal mensurável (conversão: especificidade > adjetivos vagos).

## Por que funciona na LP

| Princípio | Aplicação |
|-----------|-----------|
| Hierarquia | Card **Força** 2× altura + stat hero + glow |
| Prova implícita | Métricas (`< 15 min`, `24/7`, `MAX`) ecoam Tech Mechanism |
| Consistência | Mesma linguagem que `HudFrame`, vault mono, blood-red |
| Escaneabilidade | Label `PROTOCOL::*` + número grande + copy curta |
| Próximo passo | CTA único → `#pricing` após o grid |

## Assets

| Arquivo | Pilar | Direção visual |
|---------|-------|----------------|
| `forca.webp` | Força | Energia física abstrata, vermelho rim, sem rosto |
| `vitalidade.webp` | Vitalidade | Linha EKG / pulso em fundo preto |
| `energia.webp` | Energia | Faísca / plasma blood-red |
| `desempenho.webp` | Desempenho | Rede neural / mira HUD |

Modelo Magnific: `seedream-4-5` · ratio `4:3` · sem personagem de campanha no frame.

## Motion

- Entrada: stagger `opacity` + `y` ao scroll (`prefers-reduced-motion` safe)
- Barras de telemetria: preenchem ao entrar na viewport
- Hover desktop: spotlight na borda (herdado do bento)
