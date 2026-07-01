# Handoff — Campanha Q&A Instagram (Stories)

Documento de continuidade para quem retomar a produção/publicação dos stories de respostas da caixa de perguntas, após o teaser **Energi Power by Vee**.

**Última atualização:** 2026-06-04  
**Projeto:** `landing-page-cursor` · LP dark/cyber · accent `#C41E3A`

---

## 1. Objetivo da campanha

| Item | Detalhe |
|------|---------|
| **Funil** | Stories no Instagram respondem perguntas do teaser → aquecem e direcionam para a LP |
| **Personagem** | **Vee** — IA canônica de campanha |
| **Formato** | 1080×1920 (9:16) · texto montado **no Instagram** (não no repo) |
| **Tom** | Provocativo, dominante, misterioso (vault), exclusivo — alinhado ao design system |

Referências de produto/copy: `design-system/energi-power-by-vee/MASTER.md`, `docs/copy-pagina.md`, `estrutura.md`, `bloco-b-assets.md`.

---

## 2. Character e geração (Magnific)

| Campo | Valor |
|-------|--------|
| **Library (canônico)** | `modelo_canonica_ia_v3_1` · id **1840865** |
| **Modelo de imagem** | **Seedream 4.5** (`seedream-4-5`) — priorizar Unlimited Premium+ |
| **Regra de créditos** | Ver `MAGNIFIC_MCP_REFERENCIA_PORTAL.md` · metadata `credits: 50` ≠ débito se Unlimited ON na UI |
| **Consistência crítica** | Tatuagem simétrica colo/pescoço (v3.1) · sem pontos vermelhos soltos na pele · pixie castanho · hazel + sardas |

Versões anteriores (v2/v3) foram descartadas na campanha por **deriva da tatuagem do colo**.

---

## 3. Workflow de assets no repo

### 3.1 Estrutura `public/marketing/qna/`

| Padrão | Uso |
|--------|-----|
| `NN-source.jpg` | Base final 1080×1920 para publicar (foto + grade FFmpeg) |
| `NN-guide.png` | Overlay transparente de **zonas de texto** — não publicar |
| `NN-preview-a.jpg` / `NN-preview-b.jpg` | Opcionais — comparação de grades (ex. story 03) |
| `NN.jpg` | Overlay FFmpeg legado — **usuário rejeitou** para story 01; preferir texto nativo IG |

### 3.2 Scripts npm

```bash
npm run qna:import   # scripts/import-qna-story.mjs
npm run qna:refine   # refine-qna-story.mjs — padrão QNA_MODE=rim-frame (story 04)
npm run qna:guide    # scripts/build-qna-guides.mjs
npm run qna:build    # scripts/build-qna-stories.mjs — overlay card; uso opcional
```

**Import (PowerShell):**

```powershell
Remove-Item Env:QNA_OUT -ErrorAction SilentlyContinue
$env:QNA_STORY="04"
$env:QNA_GRADE="vault-red"   # ou vault-soft | vault | (vazio)
$env:QNA_SOURCE_URL="https://pikaso.cdnpk.net/..."
node scripts/import-qna-story.mjs
```

| Variável | Função |
|----------|--------|
| `QNA_STORY` | Id `01`–`04` → `NN-source.jpg` |
| `QNA_SOURCE_URL` | URL `render.jpg` do Magnific (`creations_get`) |
| `QNA_GRADE` | Perfil de cor (tabela abaixo) |
| `QNA_OUT` | Sobrescreve nome de saída (ex. previews) — **limpar** se não for preview |

### 3.3 Grades FFmpeg (`import-qna-story.mjs`)

| `QNA_GRADE` | Uso na campanha |
|-------------|-----------------|
| *(vazio)* | Só crop 1080×1920 |
| `vault-soft` | Story **03** — escuro leve, silhueta legível, rim vermelho sutil |
| `vault-red` | Story **04** final — mais escuro + rim `#C41E3A` forte |
| `vault` | Referência clima `public/imagens/modelo/7.jpg` — vinheta forte (03 previews) |

**Cuidado:** variável `QNA_OUT` residual no shell já sobrescreveu `03-source.jpg` por engano numa sessão — sempre `Remove-Item Env:QNA_OUT` antes do import final.

---

## 4. Publicação no Instagram (padrão acordado)

- **Tipografia:** caixa preta **~85–92%** · texto **Strong + branco** (`#FFFFFF`)
- **Modern / cinza** (`#D1D5DB`) só em eyebrow opcional
- **Emojis:** teclado nativo do IG (FFmpeg não renderiza colorido)
- **Enquete story 01:** sticker manual na zona inferior (~y 1050+) — ver `01-guide.png`
- **Safe zone:** guias marcam ~250–1670 px de altura útil

---

## 5. Stories — status e copy

### Story 01 — Decodificar provocação

| Item | Valor |
|------|--------|
| **Pergunta/resposta** | *"Hujmmmmmm 🔥😈"* → decodificação |
| **Asset** | `01-source.jpg` |
| **Direção visual** | Close extremo olho + boca · smirk assimétrico · rim vermelho |
| **Criação Magnific (aprovada)** | `ONFD9MQynm` (var. 2 do lote inicial) |
| **Overlay repo** | `01.jpg` existiu com card HUD — **preferência: não usar**; texto no IG |

**Copy sugerida (IG):**

```
Esse
"Hujmmmmmm 🔥😈"
significa:
```

**Guia:** `01-guide.png` — texto topo direito · enquete embaixo.

---

### Story 02 — “Mulher que sabe o que quer”

| Item | Valor |
|------|--------|
| **Asset** | `02-source.jpg` |
| **Direção** | Retrato frontal · olhar dominante · poder · tatuagem colo visível |
| **Character** | `modelo_canonica_ia_v3_1` |
| **Criação (referência sessão)** | `rl82HsIxtc` / lote v3_1 aprovado após testes de tatuagem |

**Copy (IG):**

```
Exatamente. Eu sei exatamente o que quero...
e o que eu não quero.
Cola comigo que vc passa de ano ;)
```

**Guia:** `02-guide.png` — punch “Exatamente.” topo direito · bloco longo centro-inferior.

---

### Story 03 — Misteriosa / área restrita

| Item | Valor |
|------|--------|
| **Asset** | `03-source.jpg` |
| **Grade** | **`vault-soft`** (não `vault` forte) |
| **Direção** | Gesto **shhh** + **bico** · choker/renda · split-light · clima `modelo/7.jpg` |
| **Preview escolhida** | B → base `KjX3uxfkqp` antes do grade |

**Copy (IG):**

```
Quanto mais misteriosa eu fico...
mais você quer descobrir.
Cuidado com o que deseja.
```

**CTA opcional (vermelho `#C41E3A`):** *“Tem um segredinho no final da página”* ou *“LINK NA BIO ↑”*

**Guia:** `03-guide.png` — texto inferior · CTA link/área restrita.

---

### Story 04 — “Somente você” (exclusividade)

| Item | Valor |
|------|--------|
| **Asset final** | `04-source.jpg` (= preview **G**) |
| **Grade** | **`vault-soft`** na import · pós **`QNA_MODE=rim-frame`** (`qna:refine`) — menos rim no pescoço + borda `#C41E3A` 5px |
| **Direção atual** | **Convite VIP + clima `modelo/7.jpg`** — pose cortina (`ohR3HaW829`) · luz/renda do vault thumb 7 (`1sBOm4Nr4r`) · character **`1840865`** v3.1 |
| **Criação base** | `43bbv6k9Aa` (lote `KjXXWrYkqp` + `43bbv6k9Aa`) |
| **Previews** | `04-preview-f.jpg` · `04-preview-g.jpg` (**G** escolhida) |
| **Descartado** | Pós FFmpeg refine (`04-preview-e`); preview D sem prompt 7; `vault-red` |

**Prompt vault 7 original (`1sBOm4Nr4r` → `modelo/7.jpg`):**

```
Intimate fashion detail boudoir shot, black lace fabric on shoulder and collarbone,
same woman from character reference skin tone and freckles, moody dark low-key lighting,
subtle blood-red accent #C41E3A, shallow depth of field, face partially out of frame
or softly shadowed, 3:4 vertical, elegant sensual, no text, no watermark, dark background
```

**Refs story 04 (regeneração):** `character:1840865` · `image:1sBOm4Nr4r` (7.jpg) · `image:ohR3HaW829` (pose cortina) · `seedream-4-5` · `9:16`

**Copy (IG):**

```
Somente você 🥰✨
significa exclusividade?
```

**Guia:** `04-guide.png` — texto **canto superior esquerdo** · CTA/urgência embaixo.

**Iterações úteis (histórico):** … → preview D → refine FFmpeg (reprovado) → **regeneração prompt/refs `7.jpg` (preview G)**.

---

## 6. Decisões de produto (não reverter sem alinhamento)

1. **Texto no Instagram**, não overlay FFmpeg pesado cobrindo rosto.
2. **v3_1** como única character sheet da campanha Q&A.
3. **Story 04** = exclusividade quente/privilégio · clima **`modelo/7.jpg`** na geração (não simular só no FFmpeg) · grade **`vault-soft`**.
4. Imports Magnific no Windows podem exigir **aprovação smart mode** (URL com token).
5. `build-qna-stories.mjs` mantido para referência de card HUD; não é o fluxo preferido.

---

## 7. Próximos passos sugeridos

- [ ] Publicar stories 01–04 no IG com copy + guias
- [ ] Atualizar `bloco-b-assets.md` com v3_1 como padrão de campanha (opcional)
- [ ] Stories 05+ se houver novas perguntas na caixa
- [ ] Não commitar URLs com tokens Magnific em docs versionados

---

## 8. Arquivos de código relacionados

| Arquivo | Função |
|---------|--------|
| `scripts/import-qna-story.mjs` | Download + crop 9:16 + grades |
| `scripts/refine-qna-story.mjs` | Crop local + split-shadow (clima `modelo/7.jpg`) |
| `scripts/build-qna-guides.mjs` | PNGs de zona de texto |
| `scripts/build-qna-stories.mjs` | Overlay texto (legado) |
| `.cursor/rules/magnific-mcp-credits.mdc` | Regras MCP créditos |

---

## 9. Contato com sessão anterior

Transcript completo da conversa: agent transcript `1d77d3c9-e44f-4ab3-8cff-767f2b6f3234` (campanha Q&A + model sheet na mesma thread).
