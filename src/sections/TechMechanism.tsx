import { useState } from "react";
import { HudFrame } from "@/components/hud-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";

const tabs = [
  {
    value: "absorption",
    label: "Absorção Rápida",
    moduleId: "SCAN::DOSE",
    title: "Velocidade de Absorção",
    content:
      "Formulação de liberação otimizada — entra rápido no corpo. Ela não vai esperar você \"esquentar\".",
    spec: "< 15 min",
    specDetail: "tempo médio de absorção",
    hud: {
      src: "/imagens/1 POTE CAPSULA.png",
      alt: "Energi Power — macro de cápsula, dose única",
      label: "HUD::SINGLE_DOSE_SCAN",
      readouts: {
        left: ["release_time: <15m", "absorption_rate: optimal"],
        right: "rec ●",
      },
    },
  },
  {
    value: "capsules",
    label: "100% Natural",
    moduleId: "SCAN::STACK",
    title: "Composição Natural",
    content:
      "Ingredientes naturais, sem química suspeita no corpo. Cada pote contém 30 cápsulas de composição padronizada.",
    spec: "30",
    specDetail: "cápsulas por pote",
    hud: {
      src: "/imagens/3 POTES CAPSULA.png",
      alt: "Três potes Energi Power — macro de cápsulas",
      label: "HUD::TRIPLE_STACK_SCAN",
      readouts: {
        left: ["composition: natural", "caps_per_unit: 30"],
        right: "rec ●",
      },
    },
  },
  {
    value: "usa",
    label: "Selo USA",
    moduleId: "SCAN::ORIGIN",
    title: "Padrão Americano",
    content:
      "Padrão americano de qualidade — o mesmo que a Vee confia. Matéria-prima importada e controle rigoroso de lote.",
    spec: "USA",
    specDetail: "origem tecnológica · lote EP-vee",
    hud: {
      src: "/imagens/1 POTE.png",
      alt: "Energi Power — rótulo e selo de origem americana",
      label: "HUD::LABEL_ORIGIN_SCAN",
      readouts: {
        left: ["origin: united_states", "batch: EP-vee-004"],
        right: "verified ●",
      },
    },
  },
] as const;

export function TechMechanism() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const [activeTab, setActiveTab] = useState("absorption");
  const [hudFlash, setHudFlash] = useState(false);

  const active = tabs.find((tab) => tab.value === activeTab) ?? tabs[0];

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
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-xl">
              <p className="section-eyebrow mb-5">Mecanismo Técnico</p>
              <h2 className="section-title">Tecnologia Americana</h2>
              <p className="section-lead mt-5 max-w-md">
                O que entra no teu corpo — composição clara, lote controlado, sem
                mistério.
              </p>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
              aria-hidden
            >
              mechanism · hud_scan · batch EP-vee
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-16">
            <Tabs
              defaultValue="absorption"
              className="order-2 lg:order-1"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="border-l-2 border-blood-red/45 pl-5 sm:pl-6"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/80">
                      {tab.moduleId}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-cyber-titanium sm:text-2xl">
                      {tab.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cyber-muted sm:text-base">
                      {tab.content}
                    </p>
                    <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
                      <span className="font-display text-4xl font-bold leading-none text-blood-red sm:text-5xl">
                        {tab.spec}
                      </span>
                      <span className="pb-1 font-mono text-[10px] uppercase tracking-wider text-cyber-muted sm:text-xs">
                        {tab.specDetail}
                      </span>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="order-1 lg:order-2 lg:sticky lg:top-8">
              <HudFrame
                label={active.hud.label}
                flash={hudFlash}
                readouts={active.hud.readouts}
              >
                <div className="relative flex min-h-[14rem] items-center justify-center px-6 py-10 sm:min-h-[18rem] sm:px-8 sm:py-12">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active.hud.src}
                      src={active.hud.src}
                      alt={active.hud.alt}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-72 w-full max-w-full object-contain sm:max-h-80"
                    />
                  </AnimatePresence>
                </div>
              </HudFrame>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
