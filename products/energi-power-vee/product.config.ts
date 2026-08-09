import type { ProductConfig } from "@/product/types";

/**
 * Produto #1 sobre a Base — Energi Power by Vee, migrado 1:1 do conteúdo
 * hardcoded original (mesmo texto, mesma paleta, mesmos links). Ver
 * openspec/changes/extract-reusable-base/ para o racional da migração.
 *
 * Continua em pt-BR/BRL — é uma Instância já existente com audiência
 * própria; um Produto em outro Locale/mercado é sempre um novo Produto
 * (ver CONTEXT.md), não uma tradução deste.
 */
const energiPowerVee: ProductConfig = {
  slug: "energi-power-vee",
  productName: "Energi Power",
  domain: "lp.romulohub.cloud",

  locale: {
    language: "pt-BR",
    ogLocale: "pt_BR",
    currency: "BRL",
    affiliateDisclosure:
      "Esta página é um material de divulgação de afiliado — o autor pode receber comissão sobre vendas realizadas através dos links de checkout aqui presentes.",
    categoryDisclaimers: [
      "Suplemento alimentar conforme legislação vigente. Não é medicamento. Consulte um médico antes de iniciar o uso, especialmente se houver condição de saúde preexistente ou uso de outros medicamentos.",
    ],
  },

  tokens: {
    background: "#0A0A0A",
    surface: "#16161A",
    textPrimary: "#D1D5DB",
    textMuted: "#52525B",
    accent: "#C41E3A",
    accentDark: "#8B0000",
  },

  seo: {
    title: "Energi Power by Vee",
    description:
      "Vee apresenta Energi Power — cápsulas naturais, entrega discreta. O protocolo que separa homem de menino.",
    ogImage: "https://lp.romulohub.cloud/og-image.jpg",
    url: "https://lp.romulohub.cloud/",
    themeColor: "#050505",
  },

  hero: {
    eyebrowLine1: "Vee apresenta · Energi Power",
    hudTag: "hero · live_feed · batch EP-vee",
    headlinePrefix: "Vee não perde tempo com homem",
    headlineHighlight: "fraco",
    headlineSuffix: ". E você?",
    body: "Cápsulas 100% naturais. Libido no talo, ereção firme, entrega discreta. Absorção rápida; resultado em dias, não meses. Ela nota antes de você abrir a boca.",
    primaryCta: { label: "Quero aguentar o tranco", href: "#pricing" },
    secondaryCta: { label: "Tem um segredinho no final", href: "#restricted-hint" },
    microcopy: "discreet_ship · natural · release <15m",
    productImage: {
      src: "/imagens/1 POTE.png",
      alt: "Energi Power — estimulante sexual natural em cápsulas",
    },
  },

  sections: [
    "manifesto",
    "power-grid",
    "tech-mechanism",
    "testimonials",
    "pricing",
    "faq",
    "restricted",
    "lead-capture",
  ],

  spokesperson: {
    name: "Vee",
    recommendationBadge: "O que a Vee usa",
    mediaPack: {
      id: "vee",
      heroVideo: "/video/vee-hero.mp4",
      heroPoster: "/video/vee-hero-poster.png",
      heroFallbackPortrait: "/imagens/vee-portrait.jpg",
      watermark: "/imagens/vee-manifesto-watermark.webp",
      avatars: [
        "/imagens/avatars/01.webp",
        "/imagens/avatars/02.webp",
        "/imagens/avatars/03.webp",
        "/imagens/avatars/04.webp",
        "/imagens/avatars/05.webp",
        "/imagens/avatars/06.webp",
      ],
      previewGallery: [
        { src: "/imagens/modelo/1.jpg", alt: "Preview exclusivo 01" },
        { src: "/imagens/modelo/2.jpg", alt: "Preview exclusivo 02" },
        { src: "/imagens/modelo/3.jpg", alt: "Preview exclusivo 03" },
        { src: "/imagens/modelo/4.jpg", alt: "Preview exclusivo 04" },
        { src: "/imagens/modelo/5.jpg", alt: "Preview exclusivo 05" },
        { src: "/imagens/modelo/6.jpg", alt: "Preview exclusivo 06" },
        { src: "/imagens/modelo/7.jpg", alt: "Preview exclusivo 07" },
        { src: "/imagens/modelo/8.jpg", alt: "Preview exclusivo 08" },
      ],
    },
    manifesto: {
      eyebrow: "A voz da Vee",
      text: "Eu sou exigente. Corpo, mente e cama. Se você some no meio do jogo, nem chega perto. Energi Power é o protocolo que separa homem de menino. Natural, sem desculpa. Toma. Performa. Ou assiste de longe. Quem chegar até o fim da página descobre o que a Vee guardou além das cápsulas.",
    },
  },

  powerGrid: {
    eyebrow: "Os 4 Pilares",
    title: "Protocolo Vital",
    lead: "Quatro sinais que a Vee exige de quem chega perto: potência, fogo, resistência e entrega — traduzidos do rótulo pra cama.",
    convergenceCopy:
      "Os quatro módulos convergem no mesmo objetivo: performar quando ela olha.",
    ctaLabel: "Ativar o protocolo",
    telemetryTag: "telemetry · batch EP-vee · readout ao vivo",
    nextStepTag: "next_step · pricing",
    pillars: [
      {
        id: "forca",
        hudLabel: "PROTOCOL::FORÇA",
        moduleId: "MOD::01",
        title: "Força",
        description: "Potência física e rigidez quando mais importa. Sem falhar na hora H.",
        stat: "MAX",
        statLabel: "potência física",
        telemetry: 96,
        featured: true,
        image: "/imagens/power/forca.webp",
        className: "md:col-span-4 md:row-span-2",
      },
      {
        id: "vitalidade",
        hudLabel: "PROTOCOL::VITAL",
        moduleId: "MOD::02",
        title: "Vitalidade",
        description: "Stamina de sobra — aguenta até ela pedir arrego. Resistência que ela sente.",
        stat: "24/7",
        statLabel: "disposição contínua",
        telemetry: 88,
        image: "/imagens/power/vitalidade.webp",
        className: "md:col-span-2",
      },
      {
        id: "energia",
        hudLabel: "PROTOCOL::LIBIDO",
        moduleId: "MOD::03",
        title: "Libido",
        description: "Libido acesa, disposição 24h. O fogo que não apaga no meio do jogo.",
        stat: "ON",
        statLabel: "libido ativa",
        telemetry: 92,
        image: "/imagens/power/energia.webp",
        className: "md:col-span-2",
      },
      {
        id: "desempenho",
        hudLabel: "PROTOCOL::FOCUS",
        moduleId: "MOD::04",
        title: "Desempenho",
        description: "Performance sob pressão. Zero vacilo, zero desculpa, zero segunda chance.",
        stat: "<15m",
        statLabel: "janela de absorção",
        telemetry: 94,
        wide: true,
        image: "/imagens/power/desempenho.webp",
        className: "md:col-span-6",
      },
    ],
  },

  techMechanism: {
    eyebrow: "Mecanismo Técnico",
    title: "Tecnologia Americana",
    lead: "O que entra no teu corpo — composição clara, lote controlado, sem mistério.",
    hudTag: "mechanism · hud_scan · batch EP-vee",
    tabs: [
      {
        value: "absorption",
        label: "Absorção Rápida",
        moduleId: "SCAN::DOSE",
        title: "Velocidade de Absorção",
        content: 'Formulação de liberação otimizada — entra rápido no corpo. Ela não vai esperar você "esquentar".',
        spec: "< 15 min",
        specDetail: "tempo médio de absorção",
        hud: {
          src: "/imagens/1 POTE CAPSULA.png",
          alt: "Energi Power — macro de cápsula, dose única",
          label: "HUD::SINGLE_DOSE_SCAN",
          readouts: { left: ["release_time: <15m", "absorption_rate: optimal"], right: "rec ●" },
        },
      },
      {
        value: "capsules",
        label: "100% Natural",
        moduleId: "SCAN::STACK",
        title: "Composição Natural",
        content: "Ingredientes naturais, sem química suspeita no corpo. Cada pote contém 30 cápsulas de composição padronizada.",
        spec: "30",
        specDetail: "cápsulas por pote",
        hud: {
          src: "/imagens/3 POTES CAPSULA.png",
          alt: "Três potes Energi Power — macro de cápsulas",
          label: "HUD::TRIPLE_STACK_SCAN",
          readouts: { left: ["composition: natural", "caps_per_unit: 30"], right: "rec ●" },
        },
      },
      {
        value: "usa",
        label: "Selo USA",
        moduleId: "SCAN::ORIGIN",
        title: "Padrão Americano",
        content: "Padrão americano de qualidade — o mesmo que a Vee confia. Matéria-prima importada e controle rigoroso de lote.",
        spec: "USA",
        specDetail: "origem tecnológica · lote EP-vee",
        hud: {
          src: "/imagens/1 POTE.png",
          alt: "Energi Power — rótulo e selo de origem americana",
          label: "HUD::LABEL_ORIGIN_SCAN",
          readouts: { left: ["origin: united_states", "batch: EP-vee-004"], right: "verified ●" },
        },
      },
    ],
  },

  testimonials: {
    eyebrow: "Prova Social",
    title: "Quem não vacilou",
    lead: "Relatos de quem entrou no protocolo depois da Vee.",
    hudTag: "social_proof · field_reports · batch readout",
    featuredTag: "field_report · primary",
    avatarAltPrefix: "Retrato de",
    metadataAriaLabel: "Metadados do depoimento",
    items: [
      {
        id: "rafael",
        depId: "DEP::01",
        name: "Rafael M.",
        role: "34 anos · SP",
        avatar: "/imagens/avatars/01.webp",
        text: "Minha parceira notou na primeira semana. Discrição total na entrega — ninguém desconfia.",
      },
      {
        id: "carlos",
        depId: "DEP::02",
        name: "Carlos H.",
        role: "41 anos · RJ",
        avatar: "/imagens/avatars/02.webp",
        text: "Voltei a me sentir homem de verdade. Comprei pelo story da Vee e ela não mentiu.",
      },
      {
        id: "diego",
        depId: "DEP::03",
        name: "Diego A.",
        role: "38 anos · MG",
        avatar: "/imagens/avatars/03.webp",
        text: "Libido lá em cima, ereção firme. Resultado antes do pote acabar. Já pedi o kit de 3.",
        featured: true,
      },
      {
        id: "marcos",
        depId: "DEP::04",
        name: "Marcos V.",
        role: "29 anos · PR",
        avatar: "/imagens/avatars/04.webp",
        text: "Testei de tudo antes. Esse é o único que entregou o que prometeu — sem efeito colateral estranho.",
      },
      {
        id: "lucas",
        depId: "DEP::05",
        name: "Lucas P.",
        role: "45 anos · BA",
        avatar: "/imagens/avatars/05.webp",
        text: "A mulher comentou sem eu falar nada. Confiança que ela sentiu na primeira semana.",
      },
      {
        id: "andre",
        depId: "DEP::06",
        name: "André F.",
        role: "36 anos · RS",
        avatar: "/imagens/avatars/06.webp",
        text: "Energia e confiança que transbordam. Virilidade que ela sentiu na primeira noite.",
      },
    ],
  },

  pricing: {
    eyebrow: "O Ultimato",
    title: "Prove que aguenta",
    lead: "Três kits. Uma decisão. O de 3 potes é o que a Vee indica — o resto é teste ou arsenal.",
    tag: "checkout · discreet_ship · batch EP-vee",
  },

  plans: [
    {
      id: "single",
      hudLabel: "KIT::01",
      name: "1 Pote",
      image: "/imagens/1 POTE.png",
      imageAlt: "Kit 1 Pote — Energi Power",
      price: "R$ 97",
      perUnit: "R$ 97/pote",
      description: "Teste o protocolo. Veja se aguenta.",
      features: ["30 cápsulas", "Embalagem discreta", "Garantia 7 dias"],
      recommended: false,
      ctaLabel: "Testar o protocolo",
      href: "https://pay.braip.co/ref?pl=plalx6jk&ck=cherxvrv&af=afi9eg2nj2",
      value: 97,
    },
    {
      id: "triple",
      hudLabel: "KIT::03",
      name: "3 Potes",
      image: "/imagens/3 POTES.png",
      imageAlt: "Kit 3 Potes — Energi Power",
      price: "R$ 237",
      perUnit: "R$ 79/pote",
      description: "O kit que a Vee indica. Pra quem não quer testar na hora H.",
      features: [
        "90 cápsulas",
        "Frete grátis · discreto",
        "Garantia 30 dias",
        "Resultados em dias, não meses",
      ],
      recommended: true,
      ctaLabel: "Garantir agora",
      href: "https://pay.braip.co/ref?pl=plagoemg&ck=cherxvrv&af=afi9eg2nj2",
      value: 237,
    },
    {
      id: "arsenal",
      hudLabel: "KIT::05",
      name: "5 Potes",
      image: "/imagens/5 POTES.png",
      imageAlt: "Kit 5 Potes — Energi Power",
      price: "R$ 347",
      perUnit: "R$ 69/pote",
      description: "Arsenal completo. Máximo desconto, zero desculpa.",
      features: [
        "150 cápsulas",
        "Frete grátis · discreto",
        "Garantia 60 dias",
        "Protocolo longo prazo",
      ],
      recommended: false,
      ctaLabel: "Montar arsenal",
      href: "https://pay.braip.co/ref?pl=plavx2pj&ck=cherxvrv&af=afi9eg2nj2",
      value: 347,
    },
  ],

  faq: {
    eyebrow: "Dúvidas",
    title: "Sem desculpa",
    lead: "Discrição, garantia, como tomar — sem rodeio. Resolveu aqui, o protocolo te espera.",
    ctaLabel: "Ver os planos",
    items: [
      {
        id: "entrega",
        question: "A entrega é discreta?",
        answer: "Embalagem neutra, sem referência ao produto na caixa. Ninguém na portaria ou correio vai saber o que você comprou.",
      },
      {
        id: "composicao",
        question: "É natural? Tem contraindicação?",
        answer: "Ingredientes 100% naturais. Se tiver condição de saúde ou usar medicamentos, consulte seu médico antes de iniciar — o rótulo tem a composição completa.",
      },
      {
        id: "efeito",
        question: "Quanto tempo para sentir efeito?",
        answer: "A maioria relata diferença entre 3 e 7 dias de uso contínuo. A absorção rápida pode trazer disposição já nas primeiras doses.",
      },
      {
        id: "garantia",
        question: "Qual a garantia?",
        answer: "7 dias no kit de 1 pote, 30 dias no de 3 potes e 60 dias no de 5 potes. Se não sentir resultado, devolvemos seu investimento.",
      },
      {
        id: "uso",
        question: "Como devo tomar?",
        answer: '1 cápsula ao dia, com água — de preferência antes do momento em que você quer estar no auge. Não exceda a dose do rótulo.',
      },
      {
        id: "anvisa",
        question: "É registrado na Anvisa?",
        answer: "Suplemento alimentar conforme legislação vigente. Informações nutricionais completas estão no rótulo do produto.",
      },
    ],
  },

  leadCapture: {
    modalHeaderTag: "vault_access · gift_queue · notify_pack",
    modalTitle: "Presente da Vee",
    modalDescription: "Deixa teu e-mail. Presente agora + aviso quando o pack exclusivo da Vee abrir.",
    modalFooterTag: "discreet_list · aes-256 · owner VEE",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    ctaLabel: "Quero meu presente",
    loadingLabel: "Registrando…",
    dismissLabel: "Agora não",
    closeLabel: "Fechar",
    genericErrorMessage: "Não foi possível registrar.",
    networkErrorMessage: "Sem conexão com o servidor. Tente de novo.",
    successMessage: "Presente reservado. Você será avisado quando o pack exclusivo estiver disponível.",
    alreadyRegisteredMessage: "Esse e-mail já está na lista. A Vee avisa quando o pack estiver no ar.",
    source: "vault_modal",
  },

  restrictedArea: {
    eyebrow: "PRIZE::SCROLL_REWARD",
    title: "Área Restrita",
    description: "Você scrollou até aqui. Segura o botão — a Vee liberou um preview que não está no story.",
    hintFromPricing: "Quem chegar até o fim da página descobre o que a Vee guardou além das cápsulas.",
    holdInstructions: "BIO::HOLD · as fotos desbloqueiam enquanto você pressiona",
    holdAriaLabel: "Segure para desbloquear o conteúdo exclusivo",
    galleryAriaLabel: "Galeria de previews censurados",
    ownerLabel: "owner: VEE · aes-256 · restricted",
    unlockedCtaLabel: "Acessar Conteúdo Exclusivo →",
    files: [
      { id: "01", name: "VEE_DIRECT.mp4" },
      { id: "02", name: "STUDIO_SESSION.jpg" },
      { id: "03", name: "PRIVATE_SET.jpg" },
      { id: "04", name: "BACKSTAGE_RAW.jpg" },
    ],
    previewAssets: [
      { src: "/imagens/modelo/1.jpg", alt: "Preview exclusivo 01" },
      { src: "/imagens/modelo/2.jpg", alt: "Preview exclusivo 02" },
      { src: "/imagens/modelo/3.jpg", alt: "Preview exclusivo 03" },
      { src: "/imagens/modelo/4.jpg", alt: "Preview exclusivo 04" },
      { src: "/imagens/modelo/5.jpg", alt: "Preview exclusivo 05" },
      { src: "/imagens/modelo/6.jpg", alt: "Preview exclusivo 06" },
      { src: "/imagens/modelo/7.jpg", alt: "Preview exclusivo 07" },
      { src: "/imagens/modelo/8.jpg", alt: "Preview exclusivo 08" },
    ],
  },

  trackingTags: [{ type: "meta_pixel", id: "1520188115639355" }],

  footer: {
    brandName: "Energi Power",
    tagline: "by VEE · protocol_ep",
    ctaLabel: "Garantir kit →",
    microcopy: "discreet_ship · natural · batch EP-vee",
  },

  stickyCta: {
    label: "Garantir · a partir de R$ 97",
  },
};

export default energiPowerVee;
