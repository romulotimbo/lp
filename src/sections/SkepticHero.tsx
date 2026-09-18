import { DualOfficialCtas } from "@/components/dual-official-ctas";
import { ProtocolQuiz } from "@/sections/ProtocolQuiz";
import { product } from "@/product/active";

export function SkepticHero() {
  const { hero, catalog } = product;
  const headline = `${hero.headlinePrefix} ${hero.headlineHighlight}${hero.headlineSuffix}`.trim();

  return (
    <section id="hero" className="skeptic-hero">
      <div className="skeptic-hero-copy">
        {hero.eyebrowLine1 ? <p className="skeptic-kicker">{hero.eyebrowLine1}</p> : null}
        <h1 className="skeptic-display">{headline}</h1>
        <p className="skeptic-lede">{hero.body}</p>
        <ProtocolQuiz />
        <p className="skeptic-micro">{hero.microcopy}</p>
        <DualOfficialCtas className="skeptic-hero-ctas" />
      </div>
      <figure className="skeptic-hero-figure">
        <img src={hero.productImage.src} alt={hero.productImage.alt} />
        {catalog ? (
          <figcaption>
            {catalog.pills.productName} and the {catalog.spray.productName} — official photography, not a checkout.
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
