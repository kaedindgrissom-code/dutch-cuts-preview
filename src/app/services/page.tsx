import Link from "next/link";
import { activeBarbers, serviceRanges, shortName } from "@/data/barbers";
import { asOf } from "@/lib/hours";
import { shop } from "@/data/shop";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Container, Eyebrow, JsonLd } from "@/components/content/Section";
import { BookNowButton } from "@/components/booking/BookButtons";
import { TrackView } from "@/components/content/TrackView";

export const metadata = pageMeta({
  title: "Services & Prices",
  description:
    "Fades, tapers, beard trims, kids cuts and house calls at Dutch Cuts, Savannah GA. Cuts from $40, cut and beard from $50, kids from $30. Book your barber on Booksy.",
  path: "/services",
});

export default function ServicesPage() {
  const ranges = serviceRanges();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <TrackView event="service_view" props={{ page: "services" }} />
      <Container className="pt-6 md:pt-12">
        <Eyebrow>Services</Eyebrow>
        <h1 className="display display-2 mt-4">What we do, what it costs</h1>
        <p className="body-l mt-4 max-w-[38rem] text-ink-2">
          Every barber at Dutch Cuts sets his own menu and prices. Here is the shop in plain English, with the range you can expect. Book with the barber and you will see his exact price.
        </p>

        <div className="mt-10 max-w-[48rem]">
          {ranges.map((r) => (
            <section key={r.key} className="rule py-6 md:py-8" aria-labelledby={`svc-${r.key}`}>
              <div className="flex items-start justify-between gap-6">
                <h2 id={`svc-${r.key}`} className="display text-[32px] leading-none md:text-[40px]">
                  {r.name}
                </h2>
                <p className="price shrink-0 text-[22px] md:text-[26px]">
                  {r.key === "house-call" ? `from $${r.min}` : r.min === r.max ? `$${r.min}` : `$${r.min}–${r.max}`}
                </p>
              </div>
              <p className="mt-3 text-ink-2">{r.blurb}</p>
              <ul className="ui mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-3">
                <li>{r.durMin === r.durMax ? `${r.durMin} min` : `${r.durMin}–${r.durMax} min`}</li>
                {r.rows.map(({ barber, service }) => (
                  <li key={service.id}>
                    <Link href={`/barbers/${barber.slug}`} className="hover:text-ink">
                      {shortName(barber)} {service.priceUsd === null ? "ask" : `${service.priceFrom ? "from " : ""}$${service.priceUsd}`}
                      {service.note ? ` (${service.note.toLowerCase()})` : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="rule mt-6 max-w-[48rem] pt-6">
          <p className="ui text-[13px] leading-relaxed text-ink-3">
            Prices as of {asOf(shop.verifiedAt)}. Deposits, cancellation and late policies are set by each barber on Booksy.{" "}
            {activeBarbers.map((b, i) => (
              <span key={b.slug}>
                <Link href={`/barbers/${b.slug}`} className="underline decoration-haint underline-offset-2 hover:text-ink">
                  {shortName(b)}&rsquo;s full menu
                </Link>
                {i < activeBarbers.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <div className="mt-6 pb-16 md:pb-24">
            <BookNowButton source="services" />
          </div>
        </div>
      </Container>
    </>
  );
}
