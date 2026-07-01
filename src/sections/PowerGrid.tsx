import {
  PowerPillarCard,
  type PowerPillar,
} from "@/components/power-pillar-card";
import { Brain, Dumbbell, HeartPulse, Zap, ChevronRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const pillars: PowerPillar[] = [
  {
    id: "forca",
    hudLabel: "PROTOCOL::FORÇA",
    title: "Força",
    description:
      "Potência física e rigidez quando mais importa. Sem falhar na hora H.",
    stat: "MAX",
    statLabel: "potência física",
    telemetry: 96,
    icon: Dumbbell,
    featured: true,
    image: "/imagens/power/forca.webp",
    className: "md:col-span-4 md:row-span-2",
  },
  {
    id: "vitalidade",
    hudLabel: "PROTOCOL::VITAL",
    title: "Vitalidade",
    description:
      "Stamina de sobra — aguenta até ela pedir arrego. Resistência que ela sente.",
    stat: "24/7",
    statLabel: "disposição contínua",
    telemetry: 88,
    icon: HeartPulse,
    image: "/imagens/power/vitalidade.webp",
    className: "md:col-span-2",
  },
  {
    id: "energia",
    hudLabel: "PROTOCOL::LIBIDO",
    title: "Energia",
    description:
      "Libido acesa, disposição 24h. O fogo que não apaga no meio do jogo.",
    stat: "ON",
    statLabel: "libido ativa",
    telemetry: 92,
    icon: Zap,
    image: "/imagens/power/energia.webp",
    className: "md:col-span-2",
  },
  {
    id: "desempenho",
    hudLabel: "PROTOCOL::FOCUS",
    title: "Desempenho",
    description:
      "Performance sob pressão. Zero vacilo, zero desculpa, zero segunda chance.",
    stat: "<15m",
    statLabel: "janela de absorção",
    telemetry: 94,
    icon: Brain,
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
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196, 30, 58, 0.12), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl lg:mb-20"
        >
          <p className="section-eyebrow mb-5">Os 4 Pilares</p>
          <h2 className="section-title">Protocolo Vital</h2>
          <p className="section-lead mt-5 max-w-xl">
            Quatro sinais que a Vee exige de quem chega perto: potência, fogo,
            resistência e entrega — traduzidos do rótulo pra cama.
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
          transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 lg:mt-14"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-blood-red/25 bg-cyber-graphite/60 p-6 shadow-inner-dark sm:p-8">
            <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-8">
              <p className="flex-1 text-sm leading-relaxed text-cyber-muted sm:text-base">
                Os quatro módulos convergem no mesmo objetivo:{" "}
                <span className="text-cyber-titanium">
                  performar quando ela olha.
                </span>
              </p>
              <a href="#pricing" className="btn-primary shrink-0 gap-2 sm:w-auto">
                Ativar o protocolo
                <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
