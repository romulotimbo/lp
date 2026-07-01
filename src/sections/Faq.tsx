import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "entrega",
    index: "01",
    question: "A entrega é discreta?",
    answer:
      "Embalagem neutra, sem referência ao produto na caixa. Ninguém na portaria ou correio vai saber o que você comprou.",
  },
  {
    id: "composicao",
    index: "02",
    question: "É natural? Tem contraindicação?",
    answer:
      "Ingredientes 100% naturais. Se tiver condição de saúde ou usar medicamentos, consulte seu médico antes de iniciar — o rótulo tem a composição completa.",
  },
  {
    id: "efeito",
    index: "03",
    question: "Quanto tempo para sentir efeito?",
    answer:
      "A maioria relata diferença entre 3 e 7 dias de uso contínuo. A absorção rápida pode trazer disposição já nas primeiras doses.",
  },
  {
    id: "garantia",
    index: "04",
    question: "Qual a garantia?",
    answer:
      "7 dias no kit de 1 pote, 30 dias no de 3 potes e 60 dias no de 5 potes. Se não sentir resultado, devolvemos seu investimento.",
  },
  {
    id: "uso",
    index: "05",
    question: "Como devo tomar?",
    answer:
      "1 cápsula ao dia, com água — de preferência antes do momento em que você quer estar no auge. Não exceda a dose do rótulo.",
  },
  {
    id: "anvisa",
    index: "06",
    question: "É registrado na Anvisa?",
    answer:
      "Suplemento alimentar conforme legislação vigente. Informações nutricionais completas estão no rótulo do produto.",
  },
] as const;

export function Faq() {
  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="faq" className="section-block bg-cyber-black px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] xl:gap-x-20">
            <header className="lg:sticky lg:top-8 lg:self-start">
              <p className="section-eyebrow mb-5">Dúvidas</p>
              <h2 className="section-title text-balance">Sem desculpa</h2>
              <p className="mt-5 text-sm leading-relaxed text-cyber-muted">
                Se ainda tem pergunta, a resposta está aqui. Se não tem, o
                protocolo te espera.
              </p>
              <a
                href="#pricing"
                className="group mt-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-blood-red transition-colors duration-300 hover:text-cyber-titanium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black"
              >
                Ver os kits
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </header>

            <Accordion
              type="single"
              collapsible
              defaultValue="entrega"
              className="relative border-t border-cyber-graphite/50"
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>
                    <span className="flex min-w-0 flex-1 items-baseline gap-4 sm:gap-5">
                      <span
                        className="shrink-0 font-display text-sm tabular-nums text-blood-red/55 transition-colors duration-300 group-data-[state=open]:text-blood-red"
                        aria-hidden
                      >
                        {faq.index}
                      </span>
                      <span className="font-display text-base font-semibold uppercase leading-snug tracking-tight text-cyber-titanium transition-colors duration-300 group-data-[state=open]:text-inherit sm:text-lg">
                        {faq.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
