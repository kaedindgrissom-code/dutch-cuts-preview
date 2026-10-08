import Link from "next/link";
import { notFound } from "next/navigation";
import { activeBarbers, getBarber, shortName, fromPrice } from "@/data/barbers";
import { portfolioFor } from "@/data/portfolio";
import { shop } from "@/data/shop";
import { pageMeta, personJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { daysSummary, asOf } from "@/lib/hours";
import { Container, JsonLd, Eyebrow } from "@/components/content/Section";
import { Portrait } from "@/components/ui/Placeholder";
import { RatingLine } from "@/components/content/RatingLine";
import { ServiceTable } from "@/components/content/ServiceTable";
import { HoursList } from "@/components/content/HoursList";
import { ReviewQuote } from "@/components/content/ReviewQuote";
import { PortfolioGrid } from "@/components/content/PortfolioGrid";
import { BookBarberButton } from "@/components/booking/BookButtons";
import { ExtLink } from "@/components/ui/ExtLink";
import { TrackView } from "@/components/content/TrackView";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeBarbers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/barbers/[slug]">) {
  const { slug } = await params;
  const b = getBarber(slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.publicName} (${b.professionalName}) · Savannah barber`,
    description: `${b.knownFor} ${b.reviewStats[0].rating} from ${b.reviewStats[0].count} Booksy reviews. From $${fromPrice(b)}, ${daysSummary(b.hours)}. Dutch Cuts, Savannah GA.`,
    path: `/barbers/${b.slug}`,
  });
}

export default async function BarberPage({ params }: PageProps<"/barbers/[slug]">) {
  const { slug } = await params;
  const b = getBarber(slug);
  if (!b) notFound();
  const others = activeBarbers.filter((x) => x.slug !== b.slug);
  const work = portfolioFor(b.slug);

  return (
    <>
      <JsonLd data={[personJsonLd(b), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Barbers", path: "/barbers" }, { name: b.publicName, path: `/barbers/${b.slug}` }])]} />
      <TrackView event="barber_view" props={{ barber: b.slug }} />

      <Container className="pt-4 md:pt-8">
        <nav aria-label="Breadcrumb" className="ui text-[13px] text-ink-3">
          <Link href="/barbers" className="ul-accent hover:text-ink">Barbers</Link> <span aria-hidden="true">/</span> {b.publicName}
        </nav>
        <div className="mt-4 grid gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="md:col-span-5">
            <Portrait barber={b} priority sizes="(min-width:768px) 40vw, 100vw" />
          </div>
          <div className="md:col-span-7 md:pt-2">
            <Eyebrow>
              {b.professionalName}
              {b.role.startsWith("Owner") ? " · Owner" : ""}
            </Eyebrow>
            <h1 className="display mt-4 break-words text-[clamp(3rem,13vw,4.6rem)] md:text-[clamp(3.2rem,6vw,6rem)]">{b.publicName}</h1>
            <p className="body-l mt-5 text-ink-2">{b.intro}</p>
            <p className="mt-4">
              <span className="ui font-semibold">Known for:</span> {b.specialties.join(", ").toLowerCase()}.
            </p>
            <dl className="rule mt-6 grid grid-cols-3 gap-3 pt-5">
              <div>
                <dt className="label text-ink-3">Rating</dt>
                <dd className="mt-1"><RatingLine stats={b.reviewStats[0]} compact /></dd>
              </div>
              <div>
                <dt className="label text-ink-3">Cuts from</dt>
                <dd className="price mt-1 text-[17px]">${fromPrice(b)}</dd>
              </div>
              <div>
                <dt className="label text-ink-3">Days</dt>
                <dd className="ui mt-1 text-[15px]">{daysSummary(b.hours)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <BookBarberButton barber={b} source="barber-page" label={`Book with ${shortName(b)} on Booksy`} />
              {b.socials.instagram ? (
                <ExtLink href={b.socials.instagram} event="social_click" props={{ network: "instagram", barber: b.slug }} plain className="ui inline-flex h-12 items-center justify-center rounded-[2px] border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper">
                  Instagram
                </ExtLink>
              ) : null}
            </div>
            {b.policies.length ? (
              <aside className="mt-6 border border-[var(--hairline)] bg-paper-2 p-4" aria-labelledby="policies-h">
                <h2 id="policies-h" className="label text-ink-3">
                  Before you book
                </h2>
                <ul className="mt-2 space-y-1 text-[15px] leading-relaxed text-ink-2">
                  {b.policies.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>
      </Container>

      <Container className="mt-section grid gap-block md:grid-cols-12 md:gap-10 lg:gap-14">
        <section aria-labelledby="services-h" className="md:col-span-7">
          <h2 id="services-h" className="label eyebrow text-ink-3">
            Services · as of {asOf(shop.verifiedAt)}
          </h2>
          <div className="mt-4">
            <ServiceTable services={b.services} />
          </div>
          <p className="ui mt-4 text-[13px] text-ink-3">
            Exact prices, deposits and the live calendar are on {shortName(b)}&rsquo;s Booksy page.
          </p>
        </section>
        <section aria-labelledby="hours-h" className="md:col-span-5">
          <h2 id="hours-h" className="label eyebrow text-ink-3">
            Hours
          </h2>
          <div className="mt-4">
            <HoursList hours={b.hours} />
          </div>
          <p className="ui mt-4 text-[13px] text-ink-3">Holiday closures show on Booksy.</p>
          <p className="ui mt-4 text-[13px] text-ink-3">
            <Link href="/visit" className="ul-accent">Directions and parking</Link>
          </p>
        </section>
      </Container>

      <section className="mt-section" aria-labelledby="work-h">
        <Container className="mb-5">
          <p className="label eyebrow text-ink-3">The work</p>
          <h2 id="work-h" className="display display-3 mt-3">
            Recent cuts by {shortName(b)}
          </h2>
        </Container>
        <Container>
          <PortfolioGrid items={work} showFilters={false} columns="2-4" />
        </Container>
      </section>

      <Container className="mt-section">
        <section aria-labelledby="reviews-h">
          <h2 id="reviews-h" className="label eyebrow text-ink-3">
            What clients say
          </h2>
          <p className="mt-3 text-ink-2">Themes across reviews: {b.reviewThemes.join(" · ").toLowerCase()}.</p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {b.reviewExcerpts.map((r) => (
              <ReviewQuote key={r.quote} r={r} />
            ))}
          </div>
          {b.reviewStats[0].url ? (
            <p className="mt-6">
              <ExtLink href={b.reviewStats[0].url} event="social_click" props={{ network: "booksy-reviews", barber: b.slug }} className="ui text-[14px]">
                Read all {b.reviewStats[0].count} reviews on Booksy
              </ExtLink>
            </p>
          ) : null}
        </section>

        <section className="rule mt-block pt-8" aria-labelledby="others-h">
          <h2 id="others-h" className="label eyebrow text-ink-3">
            Also at Dutch Cuts
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="flex items-center gap-4">
                <Link href={`/barbers/${o.slug}`} className="shrink-0" aria-label={`${o.publicName} — profile`}>
                  <Portrait barber={o} className="w-20" sizes="80px" />
                </Link>
                <div className="min-w-0">
                  <Link href={`/barbers/${o.slug}`} className="display block text-[26px] leading-none hover:text-haint-deep">
                    {o.publicName}
                  </Link>
                  <p className="ui mt-1 text-[13px] text-ink-2">{o.knownFor.split(".")[0]}.</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="rule mt-block flex flex-col gap-4 py-10 pb-section sm:flex-row sm:items-center sm:justify-between">
          <p className="display display-3">Ready? {shortName(b)} books on Booksy.</p>
          <BookBarberButton barber={b} source="barber-page-bottom" />
        </div>
      </Container>
    </>
  );
}
