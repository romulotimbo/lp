# Handoff — Model sheet (imagens base da modelo)

Documento de continuidade para a construção do **character model sheet** da Vee em fundo branco neutro, separado da campanha de stories (`public/marketing/qna/`).

**Última atualização:** 2026-06-04  
**Pasta de trabalho:** `public/imagens/modelo/model sheet/`

---

## 1. Objetivo

Criar referências **limpas e reutilizáveis** da personagem para:

- Consistência em novas gerações Magnific (TTI + edição com `references[]`)
- Pipeline de character sheet / library updates
- Contraste com assets de campanha (fundo preto, rim vermelho, vault)

**Não confundir com:**

| Pasta | Uso |
|-------|-----|
| `public/imagens/modelo/referencia/` | Retratos neutros full-face (sessão anterior, 9:16) |
| `public/marketing/qna/*-source.jpg` | Frames 9:16 para Instagram |
| Library Magnific `modelo_canonica_ia_v3_1` | Fonte canônica de identidade (id **1840865**) |

---

## 2. Padrão visual do model sheet

| Parâmetro | Especificação |
|-----------|----------------|
| **Formato** | **1:1** · export **1024×1024** JPG |
| **Fundo** | Branco seamless `#FFFFFF` |
| **Luz** | Estúdio neutra, difusa, **sem** rim vermelho, sem vinheta, sem grade escuro |
| **Expressão** | Neutra · boca fechada · sem smirk |
| **Pose** | Cabeça reta · sem inclinação · sem dutch angle · ombros nivelados |
| **Roupa** | Top preto simples (camisola/camiseta lisa) — mostrar tattoo do colo |
| **Tatuagens** | **Crítico:** padrão v3.1 simétrico colo/pescoço + faixas nos braços se visíveis · só tinta preta/cinza · **sem** pontos vermelhos |

---

## 3. Assets aprovados (manter)

| Arquivo | Enquadramento | Origem Magnific (sessão) |
|---------|---------------|---------------------------|
| **`face-04.jpg`** | Frente · head + upper chest | `po9kNmFehw` (lote 4× frente; única guardada) |
| **`profile-01.jpg`** | Perfil esquerdo 90° | `8vZsGSUIrU` (lote 4× perfil; única guardada) |

**Descartados na curadoria:**

- Frente: `face-01.jpg`, `face-02.jpg`, `face-03.jpg`
- Perfil: `profile-02.jpg`, `profile-03.jpg`, `profile-04.jpg`

---

## 4. Geração Magnific

| Campo | Valor |
|-------|--------|
| **Modelo** | Seedream 4.5 |
| **Character ref** | `{ type: "character", identifier: "1840865" }` |
| **Perfil (2º lote)** | Também `{ type: "image", identifier: "po9kNmFehw" }` (face-04) para alinhar identidade |

**Prompt — frente (resumo):**

- Model sheet headshot 1:1, front-on, zero tilt
- Tattoo colo/pescoço + braços match reference
- `#FFFFFF` background, neutral studio light

**Prompt — perfil (resumo):**

- Strict **left profile** 90°, mesmas regras de tattoo e neutro
- Referência da face aprovada + character v3.1

**Correções já aplicadas em outros fluxos (não neste sheet):**

- Pele sem cast laranja/amarelo (relevante se regerar frente)
- Camisola lisa vs. renda (relevante para stories, não para face-04 original)

---

## 5. Import local

**Script:** `scripts/import-modelo-sheet.mjs`

```powershell
$env:MODELO_SHEET_NAME="face-04"
$env:MODELO_SHEET_SOURCE_URL="https://pikaso.cdnpk.net/.../render.jpg?token=..."
node scripts/import-modelo-sheet.mjs
```

| Etapa | Detalhe |
|-------|---------|
| Download | URL `render.jpg` de `creations_get` |
| Export | `scale=1024:1024` crop center |
| Metadados | Removidos (ExifTool) |
| Saída | `public/imagens/modelo/model sheet/{NAME}.jpg` |

**Nota:** import com URL tokenizada no Windows pode exigir aprovação smart mode no Cursor.

**npm:** não há script dedicado no `package.json` ainda — invocar `node scripts/import-modelo-sheet.mjs` diretamente (ou adicionar `modelo:sheet-import` se quiser paridade com `modelo:ref-import`).

---

## 6. O que conferir ao aprovar novos frames

1. **Tatuagem do colo** — simetria e densidade vs. library `modelo_canonica_ia_v3_1`
2. **Pescoço / perfil** — continuidade do padrão geométrico na silhueta lateral
3. **Braços** — blackwork nas bordas do frame
4. **Pose** — sem rotação de cabeça; expressão realmente neutra
5. **Fundo** — branco puro, sem gradiente quente ou sombra colorida
6. **Pele** — tom neutro/frio (evitar laranja de “golden hour”)

---

## 7. Próximos blocos sugeridos (não feitos nesta sessão)

| Bloco | Enquadramento | Notas |
|-------|---------------|-------|
| **¾ (3/4)** | Rosto 45° | Comum em model sheets; manter tattoos visíveis |
| **Corpo** | Medium/full | Macacão preto da library ou roupa neutra acordada |
| **Costas** | Tattoo dorsal treino-style (library) | Se necessário para campanha futura |
| **Expressões** | Opcional | Só após neutros aprovados |

Gerar em lotes de **4 variações** → usuário escolhe **1** → descartar demais (padrão da sessão).

---

## 8. Relação com campanha Q&A

O model sheet **não substitui** os `*-source.jpg` de marketing (9:16, fundo `#050505`, grades `vault-*`). Serve como âncora de identidade para **novas** gerações.

Story 04 final (`04-source.jpg`) usou direção “selo de acesso” em ambiente escuro — conceito derivado do model sheet de colo, mas com pós `vault-red`.

Handoff dos stories: `public/marketing/HANDOFF-stories-qna.md`.

---

## 9. Arquivos relacionados

| Arquivo | Função |
|---------|--------|
| `scripts/import-modelo-sheet.mjs` | Import 1:1 → model sheet |
| `scripts/import-modelo-referencia.mjs` | Import 9:16 → `referencia/` |
| `MAGNIFIC_MCP_REFERENCIA_PORTAL.md` | Créditos / Unlimited / MCP |
| `bloco-b-assets.md` | Inventário geral de assets Vee |

---

## 10. Transcript

Mesma sessão de chat que os stories Q&A; ver agent transcript `1d77d3c9-e44f-4ab3-8cff-767f2b6f3234` (trechos “model sheet”, `face-04`, `profile-01`).
