# Google Ads — fraude de sistema vs. destinos TheBuyLens

Acesso: 8 set 2026. Políticas oficiais em inglês (versão de enforcement).

## O que a reprovação é (e o que não é)

O texto colado pelo anunciante é a política **Circumventing systems / fraude de sistema**, não Healthcare isolada e não um erro editorial de anúncio.

Fonte: [Circumventing systems](https://support.google.com/adspolicy/answer/15938075?hl=en) · [versão pt-BR](https://support.google.com/adspolicy/answer/15938075?hl=pt-BR)

Google classifica isso como infração **grave (egregious)**: suspensão sem aviso prévio. Contas só voltam em “circunstâncias convincentes”.

A política cobre três frentes que o revisor mistura com frequência:

1. **Cloaking** — conteúdo diferente para o Google e para o usuário; interstitial que impede o crawler de ler a página; hop/click-tracker que esconde um destino fora de política.
2. **Variações após reprovação** — novos anúncios, **domínios** ou conteúdo semelhantes aos que já foram reprovados.
3. **Várias contas** — reentrar no sistema depois de suspensão.

Copy sozinho **não prova** cloaking técnico. Mas um advertorial de “alerta scam” com CTA de checkout e disclosure só no rodapé é o padrão que o revisor lê como *esconder a natureza comercial da página* — o exemplo oficial de cloaking inclui “promover um tópico e levar a um site de tema diferente, escondendo a inconsistência dos crawlers”.

## O que a página Burntide fazia que encosta nisso

Instância: `burntide.thebuylens.com` (mesmo registrável que `advanced-amino.thebuylens.com`).

| Sinal | Por que o revisor pode agrupar com fraude de sistema |
| --- | --- |
| Título/H1 “legit fat burner or a cheap scam?” + “2026 alert” | Clickbait + identidade de alerta ao consumidor, enquanto o destino comercial é a loja. [Clickbait ads](https://support.google.com/adspolicy/answer/15936667?hl=en) + exemplo de cloaking “tópico ≠ destino”. |
| “Don’t buy until you read…” e CTA “Claim the official offer” no primeiro viewport | Pressão de oferta no mesmo bloco que finge revisão. |
| Disclosure de afiliado **só no footer**; microcopy: “Affiliate disclosure in the footer” | [Misleading representation](https://support.google.com/adspolicy/answer/15936666?hl=en) pede identidade/afiliação visível. Pesquisa interna já marcou *undisclosed affiliate* como risco estrutural (`docs/research/ugc-review-nutra-google-ads.md` §2.3). |
| Botões abrem `burntide.us` (outro domínio) | Redirect/hop é permitido se não esconde conteúdo fora de política. Precisa estar **declarado no primeiro viewport** (destino + afiliado), senão parece cloaking de destino. |
| “Fat burner”, oxidação de gordura, blood sugar no copy | [Healthcare / unapproved substances](https://support.google.com/adspolicy/answer/176031): suplemento não pode ser promovido como tratamento. Claims de doença/resultado típico também caem em [Unreliable claims](https://support.google.com/adspolicy/answer/6020955?hl=en). |
| Chip “FDA-registered facility” no Hero | Pode ser lido como endosso governamental. A política de Unacceptable business practices proíbe parecer apoiado por entidade governamental. |
| Novo subdomínio no mesmo `thebuylens.com` | A própria política cita “criar novos sites ou contas para anúncios semelhantes aos já reprovados”. Se Amino/outro destino no mesmo registrável já foi reprovado, o domínio inteiro leva a etiqueta. |

Não encontrado neste build: cloaking por user-agent, `robots.txt` bloqueando AdsBot (`Allow: /`), interstitial de página inteira, DNS dinâmico.

Sticky CTA mobile não cobre a maioria da página (não é o interstitial da política). Overlay `popupGate` já é proibido no repo.

## O que a correção desta Instância precisa fazer

1. Identidade no **primeiro viewport**: review independente, não a empresa Burntide; disclosure de afiliado visível (não só footer).
2. Destino explícito: botões abrem `burntide.us` em nova aba.
3. Tirar scam/alert/fat-burner/clickbait do title, H1 e authenticity.
4. Claims de saúde só como citação datada da loja; rótulo “Weight Loss Support” entre aspas; sem blood sugar / fat burner como fato nosso; FDA = factory wording, não aprovação do produto.
5. CTAs descritivos (“Visit the official Burntide website”), não “claim/save/avoid counterfeits”.

## Limite desta correção

Se a reprovação do **domínio** veio de outro Host (`advanced-amino.thebuylens.com`) ou de anúncios anteriores, só o copy do Burntide não restabelece a conta. A contestação precisa dizer: mesmo conteúdo para AdsBot e usuário; sem cloaking; afiliação e destino visíveis; e listar os Hosts do registrável.

Não criar domínio/conta nova “limpo” para o mesmo anúncio — isso é o exemplo nominal da política.
