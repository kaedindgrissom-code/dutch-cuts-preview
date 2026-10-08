import Link from "next/link";
import { notFound } from "next/navigation";
import { activeBarbers, getBarber, shortName, fromPrice } from "@/data/barbers";
import { portfolioFor } from "@/data/portfolio";
import { shop } from "@/data/shop";
import { pageMeta, personJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { daysSummary, asOf } from "@/lib/hours";
import { Container, JsonLd } from "@/components/content/Section";
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

      <Container className="pt-4 md:pt-10">
        <nav aria-label="Breadcrumb" className="ui text-[13px] text-ink-3">
          <Link href="/barbers" className="hover:text-ink">Barbers</Link> <span aria-hidden="true">/</span> {b.publicName}
        </nav>
        <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 lg:gap-16">
          <div>
            <Portrait barber={b} priority sizes="(min-width:768px) 40vw, 100vw" />
          </div>
          <div className="md:pt-4">
            <h1 className="display display-1 break-words" style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>
              {b.publicName}
            </h1>
            <p className="label mt-3 text-ink-3">
              {b.professionalName} @ Dutch Cuts{b.role.startsWith("Owner") ? " · Owner" : ""}
            </p>
            <RatingLine stats={b.reviewStats[0]} className="mt-3" />
            <p className="body-l mt-6 text-ink-2">{b.intro}</p>
            <p className="mt-4">
              <span className="ui font-semibold">Known for:</span> {b.specialties.join(", ").toLowerCase()}.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <BookBarberButton barber={b} source="barber-page" label={`Book with ${shortName(b)} on Booksy`} />
              {b.socials.instagram ? (
                <ExtLink href={b.socials.instagram} event="social_click" props={{ network: "instagram", barber: b.slug }} plain className="ui inline-flex h-12 items-center justify-center rounded-[2px] border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper">
                  Instagram
                </ExtLink>
              ) : null}
            </div>
            {b.policies.length ? (
              <ul className="ui mt-4 space-y-1 text-[13px] leading-relaxed text-ink-3">
                {b.policies.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>

      <Container className="mt-14 grid gap-14 md:mt-20 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <section aria-labelledby="services-h">
          <h2 id="services-h" className="label text-ink-3">
            Services · as of {asOf(shop.verifiedAt)}
          </h2>
          <div className="mt-4">
            <ServiceTable services={b.services} />
          </div>
          <p className="ui mt-4 text-[13px] text-ink-3">
            Exact prices, deposits and the live calendar are on {shortName(b)}&rsquo;s Booksy page.
          </p>
        </section>
        <section aria-labelledby="hours-h">
          <h2 id="hours-h" className="label text-ink-3">
            Hours
          </h2>
          <div className="mt-4">
            <HoursList hours={b.hours} />
          </div>
          <p className="ui mt-4 text-[13px] text-ink-3">Holiday closures show on Booksy.</p>
          <h2 className="label mt-10 text-ink-3">Where</h2>
          <p className="mt-3 text-ink-2">
            Dutch Cuts, {shop.address.street}, {shop.address.city}, {shop.address.region} {shop.address.postalCode}.{" "}
            <Link href="/visit" className="link">
              Directions and parking
            </Link>
          </p>
        </section>
      </Container>

      <section className="mt-14 md:mt-20" aria-labelledby="work-h">
        <Container className="mb-4">
          <h2 id="work-h" className="label text-ink-3">
            {shortName(b)}&rsquo;s work
          </h2>
        </Container>
        <Container>
          <PortfolioGrid items={work} showFilters={false} columns="2-3" />
        </Container>
      </section>

      <Container className="mt-14 md:mt-20">
        <section aria-labelledby="reviews-h">
          <h2 id="reviews-h" className="label text-ink-3">
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

        <section className="rule mt-14 pt-8 md:mt-20" aria-labelledby="others-h">
          <h2 id="others-h" className="label text-ink-3">
            Also at Dutch Cuts
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="flex items-center gap-4">
                <Link href={`/barbers/${o.slug}`} className="shrink-0" aria-label={`${o.publicName} — profile`}>
                  <Portrait barber={o} className="w-16" sizes="64px" />
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

        <div className="rule mt-14 flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="display display-3">Ready? {shortName(b)} books on Booksy.</p>
          <BookBarberButton barber={b} source="barber-page-bottom" />
        </div>
      </Container>
    </>
  );
}
