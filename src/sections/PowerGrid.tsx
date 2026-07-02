import {
  PowerPillarCard,
  type PowerPillar,
} from "@/components/power-pillar-card";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const pillars: PowerPillar[] = [
  {
    id: "forca",
    hudLabel: "PROTOCOL::FORÇA",
    moduleId: "MOD::01",
    title: "Força",
    description:
      "Potência física e rigidez quando mais importa. Sem falhar na hora H.",
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
    description:
      "Stamina de sobra — aguenta até ela pedir arrego. Resistência que ela sente.",
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
    description:
      "Libido acesa, disposição 24h. O fogo que não apaga no meio do jogo.",
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
    description:
      "Performance sob pressão. Zero vacilo, zero desculpa, zero segunda chance.",
    stat: "<15m",
    statLabel: "janela de absorção",
    telemetry: 94,
    wide: true,
    image: "/imagens/power/desempenho.webp",
    className: "md:col-span-6",
  },
];

export function PowerGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="power" className="section-block relative overflow-hidden bg-cyber-black px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196, 30, 58, 0.1), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-5">Os 4 Pilares</p>
            <h2 className="section-title">Protocolo Vital</h2>
            <p className="section-lead mt-5 max-w-xl">
              Quatro sinais que a Vee exige de quem chega perto: potência, fogo,
              resistência e entrega — traduzidos do rótulo pra cama.
            </p>
          </div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
            aria-hidden
          >
            telemetry · batch EP-vee · readout ao vivo
          </p>
        </motion.div>

        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-3 md:grid-cols-6 md:auto-rows-[minmax(180px,auto)] md:gap-4">
          {pillars.map((pillar, index) => (
            <PowerPillarCard key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 border-t border-blood-red/15 pt-8 lg:mt-14 lg:pt-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/70">
                next_step · pricing
              </p>
              <p className="mt-3 text-base leading-relaxed text-cyber-muted sm:text-lg">
                Os quatro módulos convergem no mesmo objetivo:{" "}
                <span className="text-cyber-titanium">
                  performar quando ela olha.
                </span>
              </p>
            </div>
            <a href="#pricing" className="btn-primary shrink-0 sm:min-w-[220px]">
              Ativar o protocolo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
