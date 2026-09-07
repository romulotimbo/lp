import { cn } from "@/lib/utils";
import { product } from "@/product/active";
import type { ScreenshotProofItem } from "@/product/types";
import { ReviewHeading } from "@/sections/review-heading";

/**
 * Um item de prova em formato de captura de tela — depoimento/DM/mensagem
 * apresentado como imagem, com atribuição sempre visível (nunca só na alt
 * text). Ver `ScreenshotProofItem` em `src/product/types.ts` — a atribuição é
 * obrigatória por design, não uma escolha de copy.
 */
function ProofCard({ item }: { item: ScreenshotProofItem }) {
  return (
    <li className="flex h-full flex-col border border-cyber-titanium/12 bg-cyber-graphite">
      <div className="overflow-hidden border-b border-cyber-titanium/10 bg-cyber-black">
        <img
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width ?? 640}
          height={item.image.height ?? 800}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        {item.caption ? (
          <p className="flex-1 text-sm leading-relaxed text-cyber-muted">{item.caption}</p>
        ) : null}

        <footer
          className={cn(
            "flex items-baseline justify-between gap-3 text-xs",
            item.caption && "mt-4 border-t border-cyber-titanium/10 pt-3",
          )}
        >
          <cite className="font-review-display text-sm font-semibold not-italic text-cyber-titanium">
            {item.attribution}
          </cite>
          {item.dateOrContext ? (
            <span className="whitespace-nowrap text-cyber-muted">{item.dateOrContext}</span>
          ) : null}
        </footer>
      </div>
    </li>
  );
}

/**
 * Seção opcional — só montada quando `ugcProof` está configurado (ver
 * `product/registry.tsx`). Diferente de `Testimonials` (citação de texto em
 * card), aqui a prova é a própria imagem — pensada pro layout `review-ugc`
 * (ver `docs/research/ugc-review-nutra-google-ads.md`).
 */
export function UgcProof() {
  const config = product.ugcProof;
  if (!config || config.items.length === 0) return null;

  return (
    <>
      <div className="section-divider" aria-hidden />
      <section id="ugc-proof" className="section-block px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ReviewHeading eyebrow={config.eyebrow} title={config.title} lead={config.lead} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {config.items.map((item, index) => (
              <ProofCard key={`${item.attribution}-${index}`} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
