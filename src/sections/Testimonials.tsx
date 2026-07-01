import { InfiniteMarquee } from "@/components/infinite-marquee";

const testimonials = [
  {
    name: "Rafael M.",
    role: "34 anos · SP",
    avatar: "/imagens/avatars/01.webp",
    text: "Minha parceira notou na primeira semana. Discrição total na entrega — ninguém desconfia.",
  },
  {
    name: "Carlos H.",
    role: "41 anos · RJ",
    avatar: "/imagens/avatars/02.webp",
    text: "Voltei a me sentir homem de verdade. Comprei pelo story da Vee e ela não mentiu.",
  },
  {
    name: "Diego A.",
    role: "38 anos · MG",
    avatar: "/imagens/avatars/03.webp",
    text: "Libido lá em cima, ereção firme. Resultado antes do pote acabar. Já pedi o kit de 3.",
  },
  {
    name: "Marcos V.",
    role: "29 anos · PR",
    avatar: "/imagens/avatars/04.webp",
    text: "Testei de tudo antes. Esse é o único que entregou o que prometeu — sem efeito colateral estranho.",
  },
  {
    name: "Lucas P.",
    role: "45 anos · BA",
    avatar: "/imagens/avatars/05.webp",
    text: "A mulher comentou sem eu falar nada. Embalagem neutra, chegou rápido. Discreto.",
  },
  {
    name: "André F.",
    role: "36 anos · RS",
    avatar: "/imagens/avatars/06.webp",
    text: "Energia e confiança que transbordam. Virilidade que ela sentiu na primeira noite.",
  },
];

function TestimonialCard({
  name,
  role,
  avatar,
  text,
}: {
  name: string;
  role: string;
  avatar: string;
  text: string;
}) {
  return (
    <article className="group relative w-[300px] border-l-2 border-blood-red/50 bg-cyber-graphite/50 py-5 pl-5 pr-4 transition-[border-color,background-color] duration-300 hover:border-blood-red hover:bg-cyber-graphite/80 sm:w-[320px]">
      <span
        className="pointer-events-none absolute -left-px top-3 font-display text-4xl leading-none text-blood-red/20 transition-colors duration-300 group-hover:text-blood-red/35"
        aria-hidden
      >
        "
      </span>

      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          width={40}
          height={40}
          decoding="async"
          className="h-10 w-10 shrink-0 rounded-full border border-blood-red/25 object-cover"
        />
        <div>
          <p className="font-display text-sm font-semibold text-cyber-titanium">
            {name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-cyber-muted/80">
            {role}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-cyber-muted">{text}</p>
    </article>
  );
}

export function Testimonials() {
  const cards = testimonials.map((t) => (
    <TestimonialCard key={t.name} {...t} />
  ));

  return (
    <section className="section-block--tight overflow-hidden bg-cyber-black">
      <div className="mb-10 px-6 lg:mb-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-eyebrow mb-5">Prova Social</p>
          <h2 className="section-title max-w-lg">Homens que aguentaram</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <InfiniteMarquee items={cards} duration={48} />
        <InfiniteMarquee items={cards} reverse duration={54} />
      </div>
    </section>
  );
}
