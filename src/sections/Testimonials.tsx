import { InfiniteMarquee } from "@/components/infinite-marquee";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Testimonial {
  id: string;
  depId: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
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
];

const featured = testimonials.find((t) => t.featured)!;
const marqueeItems = testimonials.filter((t) => !t.featured);

function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-l-2 border-blood-red/80 pl-6 sm:pl-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14 lg:pl-10"
    >
      <div>
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-blood-red/85">
          field_report · primary
        </p>

        <blockquote className="text-balance">
          <p className="font-display text-2xl font-medium uppercase leading-[1.12] tracking-tight text-cyber-titanium sm:text-3xl lg:text-[2.125rem] lg:leading-[1.08]">
            {testimonial.text}
          </p>
        </blockquote>

        <footer className="mt-8 flex items-center gap-4">
          <img
            src={testimonial.avatar}
            alt={`Retrato de ${testimonial.name}`}
            width={56}
            height={56}
            decoding="async"
            className="h-14 w-14 shrink-0 rounded-sm border border-blood-red/30 object-cover"
          />
          <div>
            <cite className="font-display text-lg font-bold not-italic text-cyber-titanium">
              {testimonial.name}
            </cite>
            <p className="mt-0.5 font-display text-sm uppercase tracking-wide text-cyber-muted">
              {testimonial.role}
            </p>
          </div>
        </footer>
      </div>

      <dl
        className="mt-8 hidden gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-muted/55 lg:mt-0 lg:block lg:text-right"
        aria-label="Metadados do depoimento"
      >
        <div>
          <dt className="sr-only">Origem</dt>
          <dd>source · protocol_ep</dd>
        </div>
        <div>
          <dt className="sr-only">Kit</dt>
          <dd>kit · 3_potes</dd>
        </div>
        <div>
          <dt className="sr-only">Status</dt>
          <dd className="text-blood-red/75">status · verified</dd>
        </div>
      </dl>
    </motion.article>
  );
}

function DossierCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group flex h-full w-[min(300px,82vw)] flex-col border border-cyber-graphite/75 bg-cyber-darker/90 px-5 py-4 transition-[border-color,background-color] duration-300 hover:border-blood-red/35 hover:bg-cyber-graphite/40 sm:w-[320px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-blood-red/75">
          {testimonial.depId}
        </span>
        <span className="font-display text-[10px] uppercase tracking-wider text-cyber-muted/80">
          {testimonial.role}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-cyber-muted">
        {testimonial.text}
      </p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-cyber-graphite/65 pt-3">
        <img
          src={testimonial.avatar}
          alt={`Retrato de ${testimonial.name}`}
          width={32}
          height={32}
          decoding="async"
          className="h-8 w-8 shrink-0 rounded-sm border border-blood-red/20 object-cover"
        />
        <p className="font-display text-sm font-semibold text-cyber-titanium">
          {testimonial.name}
        </p>
      </div>
    </article>
  );
}

export function Testimonials() {
  const cards = marqueeItems.map((t) => (
    <DossierCard key={t.id} testimonial={t} />
  ));

  return (
    <section className="section-block--tight overflow-hidden bg-cyber-black">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-eyebrow mb-5">Prova Social</p>
              <h2 className="section-title max-w-lg">Quem não vacilou</h2>
              <p className="section-lead mt-5">
                Relatos de quem entrou no protocolo depois da Vee.
              </p>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber-muted/55 lg:pb-1 lg:text-right"
              aria-hidden
            >
              social_proof · field_reports · batch readout
            </p>
          </div>

          <FeaturedTestimonial testimonial={featured} />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 lg:mt-14">
        <InfiniteMarquee items={cards} duration={52} />
        <InfiniteMarquee
          items={cards}
          reverse
          duration={58}
          className="hidden md:block"
        />
      </div>
    </section>
  );
}
