# Magnific MCP — Referência operacional (portal e outros projetos)

Guia único para usar o servidor MCP **`user-magnific`** no Cursor (e fluxos equivalentes), com foco em **eficiência**, **créditos vs Unlimited**, **encadeamento de ferramentas** e **lições de campo** do projeto Energi Power by Vee.

**Documento canônico.** Versões curtas em [`docs/magnific-mcp-credits.md`](docs/magnific-mcp-credits.md) e [`.cursor/rules/magnific-mcp-credits.mdc`](.cursor/rules/magnific-mcp-credits.mdc) apontam para este arquivo.

**Fontes oficiais Magnific (validar periodicamente):**

- [Unlimited models](https://www.magnific.com/ai/docs/unlimited-models)
- [Unlimited image generations and editing](https://www.magnific.com/ai/docs/unlimited-image-generations-and-editing)
- [AI credits and limits](https://www.magnific.com/ai/docs/ai-credits-and-limits)
- [What's changing in Unlimited](https://www.magnific.com/ai/unlimited)

**Última consolidação:** 2026-06-01 · Conta de referência no projeto: **Premium+**, `isUnlimitedMode: true`, pool ~45k créditos/ciclo.

---

## 1. Conceitos que não podem ser confundidos

| Conceito | Comportamento real |
|----------|-------------------|
| **Modelo na lista Unlimited (Premium+)** | Com toggle **Unlimited ON** na UI Magnific → geração/edição elegível **não debita créditos** (Fair Use). |
| **Toggle Unlimited OFF** | **Debita créditos** mesmo em modelo que poderia ser ilimitado. |
| **Priority usage** | Cota de velocidade prioritária no ciclo; **esgotar ≠ virar pago** — continua ilimitado, só mais lento. |
| **“Gasta créditos até zerar, depois Unlimited”** | **Não** é a regra documentada por modelo. |
| **Plano Premium+ no MCP** | `account_balance` → `plan.isUnlimitedMode` indica elegibilidade; **o toggle na UI ainda precisa estar ON**. |
| **Catálogo MCP** | `images_models_list` / `video_models_list` **não marcam** Unlimited — usar tabelas deste doc + docs oficiais. |

---

## 2. Protocolo obrigatório para agentes

Aplicar em **todo** pedido que use Magnific:

1. **Priorizar** slugs e ferramentas **ilimitados no Premium+** (seções 4–6).
2. **Antes de gastar créditos**, apresentar ao usuário:
   - slug/modelo proposto;
   - custo estimado (metadata de gerações anteriores, `flows_get.totalCost`, ou UI);
   - por que o ilimitado não atende (qualidade, NSFW, resolução de vídeo, upscale, etc.);
   - alternativa ilimitada e trade-off.
3. **Aguardar confirmação explícita** antes de `images_generate`, `video_generate`, `images_upscale`, `video_upscale` ou fluxo pago equivalente.
4. **Sempre comparar** opção ilimitada **e** opção com crédito na recomendação (custo × benefício).
5. **Lotes grandes:** `account_balance` no início + lembrar **Unlimited ON** na UI.
6. **Exceção:** aprovação explícita na **mesma tarefa** (ex.: “pode usar Seedance Pro”) dispensa nova pergunta para o mesmo modelo.

### Regra de comunicação (MCP)

- Para o **usuário:** nomes de modelo, títulos, `webUrl`, descrições em linguagem natural.
- **Não** expor sqids/UUIDs de criação na conversa, salvo pedido explícito — usar só em chamadas de ferramenta.
- Após gerar: seguir campo `instruction` da resposta da ferramenta.

---

## 3. Mapa rápido de ferramentas MCP

### 3.1 Saldo e planejamento

| Ferramenta | Quando usar |
|------------|-------------|
| `account_balance` | Início de sessão/lote — créditos, plano, `isUnlimitedMode` |
| `images_models_list` / `video_models_list` | Escolher slug; conferir resoluções/qualidades suportadas |
| `video_plan` | **Antes de todo** `video_generate` (exceto se usuário disser “gera direto” / one-shot) |

### 3.2 Geração

| Ferramenta | Uso |
|------------|-----|
| `images_generate` | TTI e edição com `references[]` (character, product, style, locations, image) |
| `images_variations` | Variações a partir de criação existente |
| `video_generate` | I2V/T2V; keyframes; `references` |
| `video_concatenate` | Juntar clipes (vídeos longos) |
| `video_speak` | Lip-sync / fala |

Parâmetros comuns em `images_generate`:

- `mode`: slug do modelo (ou `auto`)
- `aspectRatio`: `1:1`, `16:9`, `9:16`, `4:3`, etc.
- `resolution` / `quality`: conforme `images_models_list`
- `references[]`: até 12; primeiro image/style costuma ser primário
- `count`: 1–8

### 3.3 Pós-processamento

| Ferramenta | Unlimited Premium+ (geral) |
|------------|----------------------------|
| `images_remove_background` | ✅ |
| `images_relight` | ✅ (confirmar toggle UI) |
| `images_change_camera` | ✅ |
| `images_skin_enhancer` | ✅ |
| `images_resize` / `images_crop` | ✅ (resize sem IA) |
| `images_upscale` | ❌ **sempre créditos** |
| `video_upscale` | ❌ créditos |

### 3.4 Library (personagem, produto, estilo, locação)

| Ferramenta | Uso |
|------------|-----|
| `library_list` | Catálogo headless (`identifier` sqid, `type`, `source`) |
| `library_show` | Picker visual para o usuário escolher |
| `library_create` | Novo asset só-imagem (1–6 fotos), sem treino LoRA |

**Referências em geração:**

```json
{ "type": "character", "identifier": "l47v7gv9EV" }
{ "type": "product", "identifier": "<sqid da library>" }
```

- Passar `identifier` da **library** como está — **nunca** converter creation sqid em character.
- Spaces usam `id` numérico como `modifierId` (fluxo Spaces, não confundir com library).

### 3.5 Criações (pipeline e UI)

| Ferramenta | Uso |
|------------|-----|
| `creations_show` | Preview inline no Cursor após gerar (obrigatório em cliente com UI) |
| `creations_wait` | Esperar asset pronto quando for encadear (URL final) |
| `creations_get` | Metadados + URL |
| `creations_search` | Busca no histórico — **não** usar para library |

**Encadeamento imagem → vídeo:**

- Usar `creation:<SQID>` ou `url` de `creations_wait` / `creations_get` em `video_generate` keyframes/references.
- **Não** usar `webUrl` para encadear ferramentas.

### 3.6 Stock, Flows, Spaces (resumo)

| Área | Ferramenta | Nota |
|------|------------|------|
| Stock Freepik | `stock_show` → `stock_to_creation` → `creations_show` | Limite ~10/h free em `stock_to_creation` |
| Flows | `flows_show` / `flows_list` → `flows_get` → `flows_run` | `totalCost` no catálogo |
| Spaces | `spaces_list`, `spaces_run`, `spaces_edit` + poll `spaces_edit_status` | Boards multipágina; não misturar com `creations_search` |

---

## 4. Imagem — Unlimited Premium+ (slugs MCP)

| Slug MCP | Nome UI | Unlimited Premium+ |
|----------|---------|---------------------|
| `seedream-4-5` | Seedream 4.5 | ✅ geração + edição |
| `seedream-4` | Seedream 4 | ✅ |
| `seedream-4-4k` | Seedream 4 4K | ✅ |
| `seedream-5-lite` | Seedream 5 Lite | ✅ |
| `imagen-nano-banana-2-flash` | Google Nano Banana 2 | ✅ (1K na doc oficial; 2K só no Pro) |
| `imagen-nano-banana` | Google Nano Banana | ✅ |
| `imagen-nano-banana-2` | Google Nano Banana **Pro** | ❌ — **sempre créditos** no Premium+ |
| `flux-2`, `flux-2-klein`, `flux-dev`, `flux`, etc. | Família Flux | ✅ (exc. Flex/Max) |
| `flux-2-flex`, `flux-2-max` | Flux.2 Flex / Max | ❌ Premium+ |
| `gpt-medium`, `gpt-1-5-medium` | GPT / GPT 1.5 | ✅ / ❌ HQ conforme doc |
| `classic`, `fast` | Classic / Classic Fast | ✅ |
| `mystic`, `mystic-2-5*` | Mystic | ✅ |
| `auto` | Auto | ✅ (servidor escolhe) |

### Quando usar qual (heurística)

| Objetivo | Preferir (Unlimited ON) | Se precisar pagar |
|--------|-------------------------|------------------|
| Personagem / boudoir / volume | `seedream-4-5` + library `character` | — |
| Produto com rótulo fiel | `imagen-nano-banana-2-flash` (1K) | `imagen-nano-banana-2` (Pro) |
| Rápido / genérico | `classic`, `fast`, `auto` | — |
| Edição forte em foto existente | `seedream-4-5` com `references[].type: image` | — |

---

## 5. Vídeo — Unlimited Premium+ (resolução limitada)

| Modelo | Slug MCP (exemplo) | Unlimited Premium+ |
|--------|-------------------|---------------------|
| Kling 2.5 | `kling-25` | ✅ **720p** |
| MiniMax Hailuo 2.3 | `minimax-video-2_3` | ✅ **768p** |
| MiniMax Hailuo 2.3 Fast | `minimax-video-2_3-fast` | ✅ **768p**, ~6s |
| Wan 2.2 | `wan-2-2` | ✅ **480p**, ~5s |

### Vídeo que **não** é Unlimited no Premium+ (exemplos do projeto)

| Modelo | Slug | Uso típico | Ação |
|--------|------|------------|------|
| Seedance 2.0 Pro | `bytedance-seedance-pro-2.0` | Hero 1080p 15s | **Aprovar créditos** antes |
| Seedance 2.0 Fast | `bytedance-seedance-fast-2.0` | Rascunho mais barato | Ainda pago |

**Fluxo recomendado para vídeo hero:**

1. `video_plan` → validar modelo e prompts.
2. Frame estático aprovado (`images_generate` + character).
3. `video_generate` com keyframes + `cameraMotion: static` se loop for necessário.
4. Pós local: FFmpeg (crop, CRF, metadados) — **0 crédito Magnific**.

---

## 6. Nunca ilimitado (sempre créditos ou regra própria)

- Upscalers Magnific (Creative, Precision) e Topaz via `images_upscale` / `video_upscale`
- Vídeos fora da tabela Unlimited (Seedance, Veo, Runway em resoluções não listadas, etc.)
- Áudio: TTS, música, efeitos, clone (`audio_tts`, etc.)
- Treino: Custom Characters / Objects / Styles (LoRA)
- Modelos em early access (conforme anúncio)
- Stock: limite de downloads/hora, não é “crédito de geração” mas tem teto

---

## 7. Melhores práticas (qualidade e custo)

### 7.1 Prompts

- **Inglês** costuma performar melhor nos modelos de imagem/vídeo; UI da LP pode ser PT-BR.
- Para **hero em LP escura:** pedir exposição baixa, fundo `#050505`, rim light `#C41E3A` só nas bordas — o site ainda escurece o vídeo (~20% opacidade + gradiente).
- **Loop de vídeo:** câmera quase estática, movimento mínimo (respiração, blink), início = fim; `withSoundEffects: false` quando mudo.
- **NSFW / boudoir:** Seedream 4.5 costuma passar; Nano Banana (não Pro) pode bloquear; Flux.2 Pro **bloqueou** em teste do projeto — ter plano B.
- **Produto:** fundo escuro + rim vermelha na composição; rótulo dourado/branco do PNG é do produto real, não do CSS.

### 7.2 Referências

- **Character:** `library_list` → `identifier` sqid (ex. campanha `l47v7gv9EV` = `modelo_canonica_ia_v2`).
- **Produto:** library `product` ou `references[].type: image` com creation aprovada.
- **Não** usar bodysuit neutro de model sheet em assets de campanha se o brief pede lingerie/boudoir.

### 7.3 Aprovação humana

- Gerar **2 variações** em frames críticos (hero, capa de vídeo).
- Só depois encadear vídeo ou lotes grandes.
- Registrar no chat: modelo, unlimited sim/não, créditos observados.

### 7.4 Pós-processamento local (economia)

| Necessidade | Preferir | Evitar |
|-------------|----------|--------|
| Fundo transparente | `images_remove_background` (ilimitado) + FFmpeg resize | Upscale Magnific |
| Teaser 9:16 a partir de hero 16:9 | `scripts/build-teaser-stories.mjs` (FFmpeg) | Novo vídeo pago |
| OG / stories estáticos | FFmpeg + fontes locais | Nova geração se não precisar |
| Metadados limpos | ExifTool / `-map_metadata -1` | Vazar EXIF do hero no teaser |

---

## 8. Falhas, bloqueios e mitigações

| Problema | Sintoma | Mitigação |
|----------|---------|-----------|
| **WAF / Penalty Box** | MCP: `Penalty Box for WAF` ao chamar API | Retry mais tarde; gerar na UI Magnific; IP/rede instável; não insistir em loop |
| **NSFW block** | Modelo recusa prompt | Trocar para `seedream-4-5`; suavizar termos; não insistir no mesmo slug |
| **Flux.2 Pro + NSFW** | Bloqueio em edição sensível | Usar Seedream 4.5 edit (registrado no projeto) |
| **Confundir IDs** | Vídeo não segue personagem | `character` = library sqid; encadeamento = `creation:` ou `url` de wait/get |
| **webUrl em chain** | Falha ou asset errado | Usar `url` técnica ou `creation:SQID` |
| **URLs CDN expiram** | `pikaso.cdnpk.net/...?token=exp=...` inválidas | Baixar logo após aprovação; scripts `import-*.mjs` |
| **Toggle Unlimited OFF** | Créditos somem rápido | Confirmar UI + `account_balance` |
| **Upscale “de graça”** | Esperava ilimitado | `images_upscale` **sempre** pago |
| **Catálogo sem flag Unlimited** | Agente assume errado | Consultar seção 4–6 deste doc |
| **MCP indisponível** | Sem geração | Pipeline FFmpeg/assets existentes; retomar quando voltar |

---

## 9. Integrar assets no repositório

Padrão usado no projeto Energi Power:

1. Magnific gera → `creations_show` / link `url` full res.
2. Script `scripts/import-<asset>.mjs` faz `fetch(url)` → salva em `public/`.
3. Pós com **FFmpeg** (resize, WebP, JPG q, PNG alpha).
4. Commit no path **exato** do brief ([`bloco-b-assets.md`](bloco-b-assets.md)).

Exemplos de scripts:

| Script | Função |
|--------|--------|
| `import-vault-thumbs.mjs` | Thumbs vault 600×800 JPG |
| `import-b6-capsule.mjs` | PNG produto com alpha |
| `import-b8-watermark.mjs` | WebP watermark |
| `import-b10-portrait.mjs` | Retrato fallback |
| `import-avatars.mjs` | Avatares WebP |
| `import-power-grid.mjs` | Texturas Power Grid (URLs env) |
| `build-power-grid-textures.mjs` | Fallback FFmpeg sem Magnific |
| `teaser:stories` / `og:build` / `stories:build` / `favicon:build` | Derivados locais sem crédito Magnific |

**Variáveis de ambiente** (padrão): `POWER_FORCA_URL`, `B10_SOURCE_URL`, etc.

**PowerShell (Windows):** encadear com `;` em vez de `&&` se o shell não suportar.

---

## 10. Estudo de caso — Energi Power by Vee (lições reais)

### 10.1 Estimativa de créditos (ordem de grandeza)

Rastreamento na conversa do projeto: **~14.876 créditos** no total, dominado por:

| Item | Modelo / ação | Lição |
|------|----------------|-------|
| Vídeo Hero B1 | `bytedance-seedance-pro-2.0` · ~15s 1080p | **~10.621 créditos** — maior custo; aprovar sempre |
| Pot B3–B5 (histórico) | Nano Banana Pro | ~75/img — **não** unlimited no Premium+ |
| Campanha Vee / vault | `seedream-4-5` | Ilimitado com Unlimited ON |
| Cut-out produto | `images_remove_background` | Ilimitado; resize local |
| Teaser M1 | FFmpeg do `vee-hero.mp4` | **0** crédito Magnific |

### 10.2 Character e produto de referência

| Nome library | Identifier | Uso no projeto |
|--------------|------------|----------------|
| `modelo_canonica_ia_v2` | `l47v7gv9EV` | **Padrão campanha** — Hero, vault Seedream, consistência Vee |
| `veecomroupa` | `T8p4SVNR8T` | Alternativa mais SFW; testada no início do B1 |
| `veesemfiltropeladona` | `fKQcbCDYBw` | Vault / +18 — **não** usar no Hero público |

Produto: referências em gerações de pote (ex. creation `5xp5cPCKxe` em notas B3).

**Erro comum:** usar model sheet com bodysuit neutro quando o brief pede lingerie/boudoir — o character define rosto/corpo, mas o **prompt + figurino** definem o tom da peça.

### 10.3 Pipeline Hero B1 (resumo)

1. Figurino lace teddy — Seedream 4.5 (Nano Banana bloqueou NSFW em etapa).
2. Fundo preto — Seedream edit.
3. Pele — `images_skin_enhancer`.
4. Upscale 2× — **créditos** (Magnific Enhance).
5. Retoque pontos vermelhos — Seedream edit (Flux.2 Pro bloqueou NSFW).
6. Vídeo — Seedance 2.0 Pro → `public/video/vee-hero.mp4`.
7. Poster — frame do vídeo ou export.

### 10.4 O que funcionou bem

- **Seedream 4.5 + character** para volume e boudoir.
- **remove background** + Pillow/FFmpeg para produto.
- **Derivados sem Magnific:** teaser stories, OG, marketing stories (FFmpeg), texturas power fallback.
- **Aprovação explícita** antes de Seedance e Nano Banana Pro.

### 10.5 O que evitar repetir

- Lote grande em **Nano Banana Pro** sem aprovar.
- **Upscale Magnific** quando resize local basta.
- Gerar vídeo 1080p pago sem validar Kling/MiniMax/Wan em 720p/768p para rascunho.
- Depender de MCP com rede bloqueada (WAF) sem plano B local — no Power Grid v2, texturas abstratas via Magnific falharam com **Penalty Box for WAF**; solução foi `npm run power:textures` (FFmpeg a partir de `modelo/5–8.jpg`).
- Colocar imagem de **produto** (ex. `3 POTES CAPSULA.png`) em cards que pedem **textura abstrata** — validar brief vs componente (`PowerPillarCard` `imageFit`: `product` vs `texture`).
- Confundir seções da LP (ex. Power Grid vs Tech Mechanism) ao wirear paths de `public/imagens/`.

---

## 11. Checklists

### 11.1 Antes de cada sessão Magnific

- [ ] `account_balance` — créditos restantes, plano, `isUnlimitedMode`
- [ ] Confirmar com usuário: **Unlimited ON** na UI
- [ ] Escolher slugs das tabelas ✅ (seções 4–5)
- [ ] Se slug ❌: custo, trade-off, **aguardar OK**
- [ ] Para vídeo: `video_plan` antes de `video_generate`

### 11.2 Antes de encadear

- [ ] Frame estático aprovado pelo usuário
- [ ] `creations_wait` se precisar de URL para vídeo
- [ ] Keyframes/references com `creation:` ou `url` correta
- [ ] `creations_show` para o usuário ver progresso

### 11.3 Antes de commitar no repo

- [ ] Download de URLs CDN (tokens expiram)
- [ ] Dimensões/peso do brief
- [ ] Metadados removidos se for marketing (teaser)
- [ ] Path em `public/` igual ao consumido no código

---

## 12. Slugs rápidos (cola Premium+)

| Intenção | Slug | Créditos? |
|----------|------|-----------|
| Campanha / personagem / volume | `seedream-4-5` | Não (Unlimited ON) |
| Produto rascunho 1K | `imagen-nano-banana-2-flash` | Não |
| Produto fidelidade máxima | `imagen-nano-banana-2` (Pro) | **Sim** |
| Vídeo rascunho ilimitado | `kling-25`, `minimax-video-2_3`, `wan-2-2` | Não (resolução capada) |
| Vídeo hero qualidade | `bytedance-seedance-pro-2.0` | **Sim** |
| Remover fundo | `images_remove_background` | Não |
| Upscale | `images_upscale` | **Sim** |

---

## 13. Documentos relacionados no repositório

| Arquivo | Conteúdo |
|---------|----------|
| [`bloco-b-assets.md`](bloco-b-assets.md) | Brief B1–B14, prompts longos, links CDN |
| [`docs/copy-pagina.md`](docs/copy-pagina.md) | Copy da LP (não Magnific) |
| [`estrutura.md`](estrutura.md) | Arquitetura da página |
| [`design-system/pages/power-grid.md`](design-system/pages/power-grid.md) | Direção visual Power Grid |

---

## 14. Manutenção deste documento

Ao descobrir novo slug, bloqueio ou custo real:

1. Atualizar tabelas das seções 4–6 e 8.
2. Registrar em **10. Estudo de caso** se for projeto Energi, ou adicionar subseção “Outros projetos”.
3. Manter `docs/magnific-mcp-credits.md` como **redirect** de uma linha para este arquivo.
4. Revalidar links oficiais Magnific a cada mudança de plano Unlimited.

---

*Este documento consolida `docs/magnific-mcp-credits.md`, regras `.cursor/rules/magnific-mcp-credits.mdc`, instruções do MCP `user-magnific` e o histórico de produção do portal Energi Power by Vee.*
