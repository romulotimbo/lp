import { useState } from "react";
import { HudFrame } from "@/components/hud-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";
import { product } from "@/product/active";

/** Seção opcional "mecanismo" — só montada quando `techMechanism` está configurado (ver product/registry.tsx). */
export function TechMechanism() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const config = product.techMechanism;
  const [activeTab, setActiveTab] = useState(config?.tabs[0]?.value ?? "");
  const [hudFlash, setHudFlash] = useState(false);

  if (!config || config.tabs.length === 0) return null;

  const active = config.tabs.find((tab) => tab.value === activeTab) ?? config.tabs[0];

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
              <p className="section-eyebrow mb-5">{config.eyebrow}</p>
              <h2 className="section-title">{config.title}</h2>
              <p className="section-lead mt-5 max-w-md">{config.lead}</p>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
              aria-hidden
            >
              {config.hudTag}
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-16">
            <Tabs
              defaultValue={config.tabs[0].value}
              className="order-2 lg:order-1"
              onValueChange={handleTabChange}
            >
              <TabsList>
                {config.tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {config.tabs.map((tab) => (
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
