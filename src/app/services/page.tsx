import Link from "next/link";
import { activeBarbers, serviceRanges, shortName, fromPrice } from "@/data/barbers";
import { asOf, daysSummary } from "@/lib/hours";
import { shop } from "@/data/shop";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Container, Eyebrow, JsonLd } from "@/components/content/Section";
import { BookNowButton, BookBarberButton } from "@/components/booking/BookButtons";
import { TrackView } from "@/components/content/TrackView";
import { Portrait } from "@/components/ui/Placeholder";

export const metadata = pageMeta({
  title: "Services & Prices",
  description:
    "Fades, tapers, beard trims, kids cuts and house calls at Dutch Cuts, Savannah GA. Cuts from $40, cut and beard from $50, kids from $30. Book your barber on Booksy.",
  path: "/services",
});

function cell(service: { priceUsd: number | null; priceFrom?: boolean; durationMin: number | null; note?: string } | undefined) {
  if (!service) return null;
  return {
    price: service.priceUsd === null ? "Ask" : `${service.priceFrom ? "from " : ""}$${service.priceUsd}`,
    minutes: service.durationMin ? `${service.durationMin} min` : "",
    note: service.note,
  };
}

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
          Every barber at Dutch Cuts sets his own menu. Compare the three side by side, then book the one that fits. Exact prices and deposits are on his Booksy page.
        </p>

        {/* Phone: one block per service with the three prices side by side */}
        <div className="mt-block md:hidden">
          {ranges.map((r) => (
            <section key={r.key} className="rule py-5" aria-labelledby={`m-${r.key}`}>
              <h2 id={`m-${r.key}`} className="display text-[26px] leading-none">
                {r.name}
              </h2>
              <p className="mt-2 text-[15px] text-ink-2">{r.blurb}</p>
              <ul className="mt-3 grid grid-cols-3 gap-2">
                {activeBarbers.map((b) => {
                  const row = r.rows.find((x) => x.barber.slug === b.slug);
                  const c = cell(row?.service);
                  return (
                    <li key={b.slug} className="border border-[var(--hairline)] p-2.5">
                      <Link href={`/barbers/${b.slug}`} className="label block text-ink-3">
                        {shortName(b)}
                      </Link>
                      {c ? (
                        <>
                          <span className="price mt-1 block text-[18px]">{c.price}</span>
                          <span className="ui block text-[12px] text-ink-3">{c.minutes}</span>
                          {c.note ? <span className="ui block text-[11px] text-ink-3">{c.note}</span> : null}
                        </>
                      ) : (
                        <span className="ui mt-1 block text-[13px] text-ink-3">—</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* Tablet and up: comparison matrix, one row per service, one column per barber */}
        <div className="mt-block hidden overflow-x-auto md:block">
          <table className="w-full min-w-[40rem] border-collapse">
            <caption className="sr-only">Prices and durations by service and barber, as of {asOf(shop.verifiedAt)}</caption>
            <thead>
              <tr className="rule align-bottom">
                <th scope="col" className="label py-4 pr-4 text-left text-ink-3">
                  Service
                </th>
                {activeBarbers.map((b) => (
                  <th key={b.slug} scope="col" className="py-4 pr-4 text-left font-normal">
                    <Link href={`/barbers/${b.slug}`} className="group flex items-center gap-3">
                      <Portrait barber={b} className="w-12 shrink-0" sizes="48px" />
                      <span className="min-w-0">
                        <span className="display block text-[22px] leading-none group-hover:text-haint-deep">{shortName(b)}</span>
                        <span className="ui mt-1 block text-[12px] text-ink-3">
                          {daysSummary(b.hours)} · from ${fromPrice(b)}
                        </span>
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranges.map((r) => (
                <tr key={r.key} className="rule align-top">
                  <th scope="row" className="py-5 pr-4 text-left font-normal">
                    <span className="display block text-[24px] leading-none md:text-[28px]">{r.name}</span>
                    <span className="mt-2 block max-w-[18rem] text-[15px] text-ink-2">{r.blurb}</span>
                  </th>
                  {activeBarbers.map((b) => {
                    const row = r.rows.find((x) => x.barber.slug === b.slug);
                    const c = cell(row?.service);
                    return (
                      <td key={b.slug} className="py-5 pr-4">
                        {c ? (
                          <>
                            <span className="price block text-[22px]">{c.price}</span>
                            <span className="ui mt-1 block text-[13px] text-ink-3">
                              {c.minutes}
                              {c.note ? ` · ${c.note}` : ""}
                            </span>
                          </>
                        ) : (
                          <span className="ui text-[13px] text-ink-3">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="rule">
                <td className="py-5 pr-4" />
                {activeBarbers.map((b) => (
                  <td key={b.slug} className="py-5 pr-4">
                    <BookBarberButton barber={b} source="services-matrix" size="sm" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rule mt-block max-w-[48rem] pt-6">
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
          <div className="mt-6 pb-section">
            <BookNowButton source="services" />
          </div>
        </div>
      </Container>
    </>
  );
}
