import { useState } from "react";
import { HudFrame } from "@/components/hud-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";

const tabs = [
  {
    value: "absorption",
    label: "Absorção Rápida",
    title: "Velocidade de Absorção",
    content:
      "Formulação de liberação otimizada — age em minutos, não em horas. Ela não vai esperar.",
    spec: "< 15 min",
    specDetail: "tempo médio de absorção",
  },
  {
    value: "capsules",
    label: "100% Natural",
    title: "Composição Natural",
    content:
      "Ingredientes naturais, sem química suspeita no corpo. Cada pote contém 30 cápsulas de composição padronizada.",
    spec: "30 cápsulas",
    specDetail: "por pote · composição padronizada",
  },
  {
    value: "usa",
    label: "Selo USA",
    title: "Tecnologia Americana",
    content:
      "Padrão americano de qualidade — o mesmo que a Vee confia. Matéria-prima importada e controle rigoroso de lote.",
    spec: "USA",
    specDetail: "origem tecnológica · lote EP-vee",
  },
];

const HUD_PRODUCT_IMAGE = "/imagens/3 POTES CAPSULA.png";

const hudVisualByTab: Record<
  string,
  { src: string; alt: string; label: string }
> = {
  absorption: {
    src: HUD_PRODUCT_IMAGE,
    alt: "Três potes Energi Power — macro de cápsulas",
    label: "HUD::TRIPLE_STACK_SCAN",
  },
  capsules: {
    src: HUD_PRODUCT_IMAGE,
    alt: "Três potes Energi Power — macro de cápsulas",
    label: "HUD::TRIPLE_STACK_SCAN",
  },
  usa: {
    src: HUD_PRODUCT_IMAGE,
    alt: "Três potes Energi Power — macro de cápsulas",
    label: "HUD::TRIPLE_STACK_SCAN",
  },
};

export function TechMechanism() {
  const [activeTab, setActiveTab] = useState("absorption");
  const [hudFlash, setHudFlash] = useState(false);
  const hudVisual = hudVisualByTab[activeTab] ?? hudVisualByTab.absorption;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setHudFlash(true);
    window.setTimeout(() => setHudFlash(false), 220);
  };

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section className="section-block bg-cyber-darker px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="section-eyebrow mb-5">Mecanismo Técnico</p>
              <h2 className="section-title">Tecnologia Americana</h2>
              <p className="section-lead mt-5 max-w-md">
                O que entra no teu corpo — sem mistério, sem risco desnecessário.
              </p>

              <Tabs
                defaultValue="absorption"
                className="mt-10"
                onValueChange={handleTabChange}
              >
                <TabsList>
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-xl border border-cyber-graphite/80 bg-cyber-graphite/70 p-6"
                    >
                      <h3 className="font-display text-xl font-bold uppercase text-cyber-titanium">
                        {tab.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-cyber-muted">
                        {tab.content}
                      </p>
                      <p className="mt-5 border-t border-cyber-graphite/80 pt-4 font-mono text-xs uppercase tracking-wider text-cyber-muted">
                        <span className="text-blood-red">{tab.spec}</span>
                        <span className="mx-2 text-cyber-muted/40">·</span>
                        {tab.specDetail}
                      </p>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <HudFrame label={hudVisual.label} flash={hudFlash}>
              <div className="relative flex min-h-[16rem] items-center justify-center p-8 sm:min-h-[20rem]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={hudVisual.src}
                    alt={hudVisual.alt}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="max-h-80 w-full max-w-full object-contain sm:max-h-96"
                  />
                </AnimatePresence>
              </div>
            </HudFrame>
          </div>
        </div>
      </section>
    </>
  );
}
