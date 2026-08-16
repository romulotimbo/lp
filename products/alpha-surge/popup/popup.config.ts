import type { PopupGateConfig } from "@/product/types";

/**
 * Página-popup do Alpha Surge — segunda página da mesma Instância, publicada em
 * https://alphasurge.nothforge.com/alphasurge, com estratégia diferente da
 * página de review que ocupa a raiz do domínio: nenhuma copy de venda, só um
 * popup de verificação de estoque/entrega sobre uma réplica desfocada do
 * checkout do fornecedor.
 *
 * Origem do tráfego: a página lê `?src=` da própria URL e repassa o valor pro
 * link de afiliado (`.../order-now.php?aff_id=23898&src=PopUp`). Sem `?src=` na
 * URL, assume `PopUp` — assim `/alphasurge` sozinho já chega rastreado, e cada
 * criação de anúncio pode usar um valor próprio (`?src=PopUpFB01`, etc.) sem
 * mudar o código.
 *
 * Cores: #212529 / #ffc107, fornecidas pelo usuário pra imitar o checkout do
 * fornecedor (https://heroichustle.com/b/order-now.php) — deliberadamente
 * diferentes dos tokens preto/dourado do Produto, porque o objetivo aqui é
 * parecer a página de destino, não a página de review.
 *
 * O fundo desfocado é montado a partir de `productName` e `plans` do próprio
 * ProductConfig (mesmas fotos, nomes e preços reais dos 3 tiers) — só a copy
 * que não existe em nenhum outro lugar do config está declarada aqui.
 */
export function createPopupGate(checkoutHref: string): PopupGateConfig {
  return {
    path: "alphasurge",
    sourceParam: "src",
    defaultSource: "PopUp",
    checkoutHref,

    title: "AlphaSurge Stock & Shipping Check",
    body: "Please allow cookies to verify instant shipping availability to your location and activate your exclusive discount bottles before stock runs out.",
    ctaLabel: "Check Availability",
    closeLabel: "Close",

    colors: {
      dark: "#212529",
      accent: "#ffc107",
    },

    backdrop: {
      headline: "Claim your Discounted Alpha Surge Below While Stock Lasts",
      reassurance: "90-day money-back guarantee · Free US shipping on 3 and 6 bottle packages",
      cardCtaLabel: "Add to cart",
    },
  };
}
