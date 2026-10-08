import Link from "next/link";
import Image from "next/image";
import { asOf } from "@/lib/hours";
import { shop, directionsUrl } from "@/data/shop";
import { activeBarbers, serviceRanges } from "@/data/barbers";
import { portfolio } from "@/data/portfolio";
import { pageMeta, barberShopJsonLd } from "@/lib/seo";
import { Container, Section, Eyebrow, JsonLd } from "@/components/content/Section";
import { BarberCard } from "@/components/content/BarberCard";
import { ReviewQuote } from "@/components/content/ReviewQuote";
import { WorkTile } from "@/components/ui/Placeholder";
import { BookNowButton } from "@/components/booking/BookButtons";
import { ButtonLink } from "@/components/ui/Button";
import { ExtLink } from "@/components/ui/ExtLink";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata = pageMeta({
  title: "Dutch Cuts · Barbershop in Savannah, GA",
  description:
    "Modern fades and blends on Bee Road, Savannah. Three barbers — Dutch, Brian and Rod — each with his own chair. Fades, beards, kids, house calls. Book on Booksy.",
  path: "/",
});

const homeQuotes = [
  activeBarbers[0].reviewExcerpts[0],
  activeBarbers[1].reviewExcerpts[2],
  activeBarbers[2].reviewExcerpts[2],
];

export default function HomePage() {
  const ranges = serviceRanges();
  return (
    <>
      <JsonLd data={barberShopJsonLd()} />

      {/* HERO */}
      <section className="relative">
        <Container className="grid gap-6 pt-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end md:gap-12 md:pt-8 lg:pt-10">
          <div className="order-2 md:order-1 md:pb-8">
            <Eyebrow>
              {shop.address.city}, {shop.address.region} · {shop.address.street}
            </Eyebrow>
            <h1 className="display display-1 mt-4">
              Dutch
              <br />
              Cuts
            </h1>
            <p className="body-l mt-5 max-w-[30rem] text-ink-2">
              Modern fades and blends on Bee Road. Three barbers, one chair each, never rushed.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <BookNowButton source="hero" className="sm:min-w-44" />
              <ButtonLink href="/barbers" variant="secondary">
                Meet the barbers
              </ButtonLink>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="grain relative overflow-hidden bg-paper-2">
              <div className="relative aspect-[5/6] md:hidden">
                <Image src="/shop/hero-mobile.jpg" alt="Inside Dutch Cuts — the chairs and lights at 2816 Bee Rd" fill priority sizes="100vw" className="object-cover" />
              </div>
              <div className="relative hidden aspect-[16/13] md:block">
                <Image src="/shop/hero-desktop.jpg" alt="A barber at work inside Dutch Cuts" fill priority sizes="58vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WORK */}
      <section className="pt-16 md:pt-24">
        <Container className="mb-4 flex items-end justify-between">
          <Eyebrow>The work</Eyebrow>
          <Link href="/gallery" className="link ui text-[14px]">
            See the gallery
          </Link>
        </Container>
        <ul className="grid grid-cols-2 gap-0.5 md:grid-cols-5">
          {portfolio.slice(0, 5).map((item, i) => (
            <li key={item.id} className={i === 4 ? "hidden md:block" : ""}>
              <WorkTile item={item} sizes="(min-width:768px) 20vw, 50vw" />
            </li>
          ))}
        </ul>
      </section>

      {/* FIND YOUR BARBER */}
      <Section id="barbers">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-end">
          <div>
            <Eyebrow>Find your barber</Eyebrow>
            <h2 className="display display-2 mt-4">
              Three barbers.
              <br />
              Pick yours.
            </h2>
          </div>
          <p className="text-[18px] text-ink-2">
            Each barber runs his own book on Booksy — prices, hours and policies are his. Here is who does what.
          </p>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {activeBarbers.map((b) => (
            <BarberCard key={b.slug} barber={b} source="home" />
          ))}
        </div>
      </Section>

      {/* REVIEWS */}
      <Section>
        <Eyebrow>What people say</Eyebrow>
        <h2 className="display display-3 mt-4 max-w-[48rem] md:text-[3rem]">
          {shop.reviewStats[0].rating} from {shop.reviewStats[0].count} Booksy reviews. {shop.reviewStats[1].rating.toFixed(1)} on Google.
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {homeQuotes.map((q) => (
            <ReviewQuote key={q.quote} r={q} />
          ))}
        </div>
        <p className="ui mt-8 text-[13px] text-ink-3">
          Review scores are read from Booksy and Google as of {asOf(shop.verifiedAt)}. Excerpts quoted with attribution.
        </p>
      </Section>

      {/* SERVICES + VISIT */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 className="display display-2 mt-4">What a cut costs</h2>
            <p className="mt-4 text-ink-2">Prices are set by each barber. Ranges below, as of {asOf(shop.verifiedAt)}.</p>
            <table className="mt-6 w-full">
              <tbody>
                {ranges.map((r) => (
                  <tr key={r.key} className="rule">
                    <th scope="row" className="ui py-3.5 text-left text-[17px] font-normal">
                      {r.name}
                    </th>
                    <td className="price py-3.5 text-right text-[20px]">
                      {r.key === "house-call" ? `from $${r.min}` : r.min === r.max ? `$${r.min}` : `$${r.min}–${r.max}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ButtonLink href="/services" variant="secondary" className="mt-6">
              See all services
            </ButtonLink>
          </div>
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h2 className="display display-2 mt-4">2816 Bee Road</h2>
            <p className="mt-4 text-ink-2">
              {shop.address.city}, {shop.address.region} {shop.address.postalCode} · Just south of Victory Dr near Skidaway Rd. Parking on site.
            </p>
            <p className="mt-2 text-ink-2">{shop.generalHoursLine}</p>
            <Link href="/visit" className="relative mt-6 block aspect-[16/9] w-full overflow-hidden bg-paper-2 md:aspect-[2/1]" aria-label="See the shop, map and directions">
              <Image src="/shop/lounge.jpg" alt="The lounge at Dutch Cuts" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </Link>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <ExtLink href={directionsUrl} event="directions_click" props={{ location: "home" }} plain className="ui inline-flex h-12 items-center justify-center rounded-[2px] border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper">
                Directions
              </ExtLink>
              <PhoneLink location="home" className="ui inline-flex h-12 items-center justify-center rounded-[2px] border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper">
                Call {shop.phoneDisplay}
              </PhoneLink>
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-ink text-paper">
        <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-24">
          <div>
            <h2 className="display display-2">Book your barber.</h2>
            <p className="mt-3 text-[18px] text-brick">Live availability is on Booksy. Pick a barber, pick a time.</p>
          </div>
          <BookNowButton source="final-cta" variant="inverse" className="md:min-w-44" />
        </Container>
      </section>
    </>
  );
}
