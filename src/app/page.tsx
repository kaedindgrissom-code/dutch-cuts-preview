import Link from "next/link";
import Image from "next/image";
import { asOf } from "@/lib/hours";
import { shop, directionsUrl } from "@/data/shop";
import { activeBarbers, serviceRanges, shortName, tagLabels } from "@/data/barbers";
import { portfolio } from "@/data/portfolio";
import { pageMeta, barberShopJsonLd } from "@/lib/seo";
import { Container, Section, SectionHead, Eyebrow, JsonLd } from "@/components/content/Section";
import { BarberCard } from "@/components/content/BarberCard";
import { ReviewQuote } from "@/components/content/ReviewQuote";
import { WorkTile } from "@/components/ui/Placeholder";
import { BookNowButton } from "@/components/booking/BookButtons";
import { ButtonLink } from "@/components/ui/Button";
import { ExtLink } from "@/components/ui/ExtLink";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Reveal } from "@/components/content/Reveal";
import { Logo } from "@/components/site/Logo";

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
  const booksy = shop.reviewStats[0];
  const google = shop.reviewStats[1];
  return (
    <>
      <JsonLd data={barberShopJsonLd()} />

      {/* HERO — the room, a statement, the facts that earn trust */}
      <section className="relative">
        <Container className="grid gap-8 pt-3 md:pt-6 lg:grid-cols-12 lg:gap-8 lg:pt-8">
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="photo grain relative aspect-[5/6] sm:aspect-[4/3] lg:aspect-[4/3]">
              <Image
                src="/shop/hero-mobile.jpg"
                alt="Inside Dutch Cuts — the chairs under the hexagon lights at 2816 Bee Rd"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover object-[50%_55%]"
              />
              {/* the shop's mark, stamped on the room */}
              <div className="absolute bottom-3 left-3 bg-paper p-2.5 md:bottom-4 md:left-4 md:p-3" aria-hidden="true">
                <Logo variant="mark" height={40} alt="" className="md:hidden" />
                <Logo variant="mark" height={56} alt="" className="hidden md:block" />
              </div>
            </div>
          </div>
          <div className="order-2 mx-auto flex w-full max-w-[40rem] flex-col items-center text-center lg:order-1 lg:col-span-5 lg:mx-0 lg:max-w-none lg:items-start lg:py-2 lg:text-left">
            <Eyebrow>
              {shop.address.street} · {shop.address.city}, {shop.address.region}
            </Eyebrow>
            <h1 className="display mt-5 text-[clamp(3rem,13vw,4.6rem)] sm:text-[clamp(3rem,7vw,4.6rem)] lg:text-[clamp(2.5rem,4.6vw,5.5rem)]">
              Fades &amp; blends
              <br />
              on Bee Road.
            </h1>
            <p className="body-l mt-5 max-w-[26rem] text-ink-2">
              Three barbers, each with his own chair and his own book. Pick the right one below and book straight on Booksy.
            </p>
            <div className="mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <BookNowButton source="hero" className="sm:min-w-40" />
              <ButtonLink href="/barbers" variant="secondary">
                Meet the barbers
              </ButtonLink>
            </div>
            <dl className="rule mt-8 grid w-full grid-cols-3 gap-2 pt-5 text-center sm:gap-3 lg:mt-auto lg:text-left">
              <div>
                <dt className="label text-ink-3">Booksy</dt>
                <dd className="price mt-1 whitespace-nowrap text-[16px] sm:text-[17px]">
                  <span aria-hidden="true" className="text-haint-deep">★</span> {booksy.rating} <span className="ui text-[12px] font-normal text-ink-3 sm:text-[13px]">({booksy.count})</span>
                </dd>
              </div>
              <div>
                <dt className="label text-ink-3">Google</dt>
                <dd className="price mt-1 whitespace-nowrap text-[16px] sm:text-[17px]">
                  <span aria-hidden="true" className="text-haint-deep">★</span> {google.rating.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="label text-ink-3">Open</dt>
                <dd className="ui mt-1 text-[15px] leading-tight">
                  Mon–Sat
                  <span className="block text-[13px] text-ink-3">Sundays: Rod</span>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* FIND YOUR BARBER — the decision the page exists for */}
      <Section id="barbers">
        <SectionHead
          eyebrow="Find your barber"
          title={
            <>
              Three barbers.
              <br />
              Pick yours.
            </>
          }
          lede="Each barber runs his own book on Booksy, so prices, hours and policies are his. Here is who does what."
        />
        <div className="mt-block grid gap-8 lg:grid-cols-3 lg:gap-8">
          {activeBarbers.map((b, i) => (
            <Reveal key={b.slug} delay={i * 60}>
              <BarberCard barber={b} source="home" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* THE WORK */}
      <section className="pt-section">
        <Container className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>The work</Eyebrow>
            <h2 className="display display-3 mt-3">Recent cuts from the chairs</h2>
          </div>
          <Link href="/gallery" className="ui ul-accent shrink-0 whitespace-nowrap text-[15px] sm:pb-1">
            See the gallery
          </Link>
        </Container>
        <Container>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5">
            {portfolio.slice(0, 5).map((item, i) => {
              const by = activeBarbers.find((b) => b.slug === item.barberSlug);
              return (
                <Reveal as="li" key={item.id} delay={i * 50} className={i === 4 ? "hidden lg:block" : ""}>
                  <Link href="/gallery" className="block" aria-label={`${item.alt} — see the gallery`}>
                    <WorkTile item={item} sizes="(min-width:1024px) 20vw, (min-width:768px) 25vw, 50vw" tag={{ label: item.tags.map((t) => tagLabels[t]).join(" · "), by: by ? shortName(by) : "" }} />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* REVIEWS — words on the left, a chair on the right */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow>What people say</Eyebrow>
            <h2 className="display display-2 mt-4">
              {booksy.rating} from {booksy.count} reviews.
            </h2>
            <p className="mt-3 text-[18px] text-ink-2">
              On Booksy, with {google.rating.toFixed(1)} on Google. Read as of {asOf(shop.verifiedAt)}; excerpts quoted with attribution.
            </p>
            <div className="mt-block grid gap-8 sm:grid-cols-3">
              {homeQuotes.map((q) => (
                <ReviewQuote key={q.quote} r={q} />
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:min-h-[28rem]">
            {/* On md+ the photo stretches to the height of the text column so the two columns end together */}
            <div className="lg:absolute lg:inset-0">
              <div className="photo relative aspect-[4/5] sm:aspect-[16/10] lg:h-full lg:aspect-auto">
                <Image src="/shop/hero-desktop.jpg" alt="A barber at work inside Dutch Cuts" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICES + VISIT */}
      <Section>
        <div className="grid gap-block lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.25rem,4.5vw,4rem)]">What a cut costs</h2>
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
              Compare by barber
            </ButtonLink>
          </div>
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h2 className="display mt-4 text-[clamp(2.25rem,4.5vw,4rem)]">2816 Bee Road</h2>
            <p className="mt-4 text-ink-2">
              {shop.address.city}, {shop.address.region} {shop.address.postalCode} · On Bee Rd just south of Victory Dr. Parking on site.
            </p>
            <p className="mt-2 text-ink-2">{shop.generalHoursLine}</p>
            <Link href="/visit" className="photo mt-6 block aspect-[16/10]" aria-label="See the shop, map and directions">
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
      <section className="mt-section bg-ink text-paper">
        <Container className="flex flex-col items-center gap-8 py-14 text-center md:flex-row md:items-center md:justify-between md:py-24 md:text-left">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
            <Logo variant="lockup" tone="paper" height={96} alt="Dutch Cuts" className="md:shrink-0" />
            <div>
              <h2 className="display display-2">Book your barber.</h2>
              <p className="mt-3 text-[18px] text-brick">Live availability is on Booksy. Pick a barber, pick a time.</p>
            </div>
          </div>
          <BookNowButton source="final-cta" variant="inverse" className="md:min-w-44" />
        </Container>
      </section>
    </>
  );
}
