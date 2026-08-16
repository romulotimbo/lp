import type { PopupGateConfig } from "@/product/types";

/**
 * Página-popup do Advanced Amino Formula — segunda página da mesma Instância,
 * publicada em https://advanced-amino.nothforge.com/advanced-amino. Estratégia
 * diferente da review na raiz: nenhuma copy editorial, só um popup de
 * verificação de estoque/entrega sobre uma réplica desfocada do PDP/checkout
 * da Advanced Bionutritionals.
 *
 * Origem: lê `?src=` da própria URL e repassa ao hop ClickBank (o mesmo
 * `outboundCta` da review). Sem `?src=`, assume `PopUp`.
 *
 * Cores: azul/laranja da sales letter oficial (`#0054A6` / `#F26522`),
 * não o dourado do rótulo nem o amarelo Bootstrap do Alpha Surge.
 * Destino: mesmo hop da review + âncora `#Order` (`row text-order`).
 *
 * Cards da réplica vivem aqui (layout review proíbe `plans`). Preços públicos
 * da oficial (1 / 3 / 6 frascos); o fundo é decorativo, não uma loja.
 */
const IMG = "/imagens/advanced-amino-formula";

export function createPopupGate(checkoutHref: string): PopupGateConfig {
  return {
    path: "advanced-amino",
    sourceParam: "src",
    defaultSource: "PopUp",
    checkoutHref,
    checkoutHash: "Order",

    title: "Advanced Amino Formula Stock & Shipping Check",
    body: "Please allow cookies to verify instant shipping availability to your location and activate your exclusive discount bottles before stock runs out.",
    ctaLabel: "Check Availability",
    closeLabel: "Close",

    colors: {
      dark: "#0054A6",
      accent: "#F26522",
      onAccent: "#FFFFFF",
    },

    backdrop: {
      headline: "Claim your Discounted Advanced Amino Formula Below While Stock Lasts",
      reassurance: "90-day money-back guarantee · Free US shipping on 3 and 6 bottle packages",
      cardCtaLabel: "Add to cart",
      cards: [
        {
          id: "one-bottle",
          name: "1 Bottle",
          image: `${IMG}/1-Unit.jpg`,
          price: "$44.95",
          perUnit: "$44.95/bottle",
          description: "150 tablets · 30-day supply",
          value: 44.95,
        },
        {
          id: "three-bottles",
          name: "3 Bottles",
          image: `${IMG}/1-Unit.jpg`,
          price: "$119.85",
          perUnit: "$39.95/bottle",
          description: "450 tablets · Free US shipping",
          featured: true,
          value: 119.85,
        },
        {
          id: "six-bottles",
          name: "6 Bottles",
          image: `${IMG}/1-Unit.jpg`,
          price: "$199.50",
          perUnit: "$33.25/bottle",
          description: "900 tablets · Free US shipping",
          value: 199.5,
        },
      ],
    },
  };
}
