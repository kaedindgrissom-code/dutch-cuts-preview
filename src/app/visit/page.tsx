import Link from "next/link";
import Image from "next/image";
import { shop, directionsUrl, mapsPlaceUrl } from "@/data/shop";
import { activeBarbers } from "@/data/barbers";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Container, Eyebrow, JsonLd } from "@/components/content/Section";
import { ExtLink } from "@/components/ui/ExtLink";
import { HoursList } from "@/components/content/HoursList";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { TodayHours } from "@/components/content/TodayHours";

export const metadata = pageMeta({
  title: "Visit · 2816 Bee Rd, Savannah",
  description: `Dutch Cuts is at ${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}, just south of Victory Dr near Skidaway Rd. Parking on site. Hours by barber, directions and phone.`,
  path: "/visit",
});

export default function VisitPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Visit", path: "/visit" }])} />
      <div className="photo relative aspect-[13/10] w-full md:hidden">
        <Image src="/shop/lounge.jpg" alt="The lounge at Dutch Cuts" fill priority sizes="100vw" className="object-cover" />
      </div>
      <Container className="pt-6 md:pt-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h1 className="display display-2 mt-4">2816 Bee Road</h1>
            <p className="body-l mt-3 text-ink-2">
              {shop.address.city}, {shop.address.region} {shop.address.postalCode}
            </p>
            <p className="mt-4 text-ink-2">
              Just south of E Victory Dr near Skidaway Rd — a few minutes from Midtown, Ardsley Park and Savannah State, and an easy drive from Thunderbolt, Whitemarsh, Wilmington and Dutch Island. Parking on site.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <ExtLink href={directionsUrl} event="directions_click" props={{ location: "visit" }} plain className="ui inline-flex h-12 items-center justify-center rounded-[2px] bg-ink px-5 text-[15px] text-paper hover:bg-haint-deep">
                Directions
              </ExtLink>
              <PhoneLink location="visit" className="ui inline-flex h-12 items-center justify-center rounded-[2px] border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper">
                Call {shop.phoneDisplay}
              </PhoneLink>
            </div>
            <div className="photo relative mt-6 hidden aspect-[3/2] w-full md:block">
              <Image src="/shop/lounge.jpg" alt="The lounge at Dutch Cuts" fill sizes="50vw" className="object-cover" />
            </div>
            <p className="mt-4">
              <ExtLink href={mapsPlaceUrl} event="directions_click" props={{ location: "visit-map" }} className="ui text-[14px]">
                Open in Google Maps
              </ExtLink>
            </p>
          </div>

          <div>
            <h2 className="label eyebrow text-ink-3">Hours by barber</h2>
            <p className="mt-3 text-ink-2">{shop.generalHoursLine}</p>
            <div className="mt-4">
              {activeBarbers.map((b) => (
                <details key={b.slug} className="rule group py-3" open={b.slug === activeBarbers[0].slug}>
                  <summary className="ui flex cursor-pointer list-none items-center justify-between py-1 text-[16px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>
                      {b.publicName} <span className="font-normal text-ink-3">· {b.professionalName}</span>
                    </span>
                    <span aria-hidden="true" className="text-ink-3 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pb-2 pt-2">
                    <HoursList hours={b.hours} compact />
                    <p className="ui mt-2 text-[13px] text-ink-3">
                      <TodayHours hours={b.hours} />{" "}
                      <Link href={`/barbers/${b.slug}`} className="underline decoration-haint underline-offset-2 hover:text-ink">
                        book {b.publicName.split(" ")[0] === "Eric" ? "Rod" : b.publicName.split(" ")[0]}
                      </Link>
                    </p>
                  </div>
                </details>
              ))}
            </div>
            <p className="ui mt-3 text-[13px] text-ink-3">Holiday closures and same-day changes show on each barber&rsquo;s Booksy page.</p>

            <h2 className="label eyebrow mt-10 text-ink-3">Contact</h2>
            <p className="display mt-3 text-[30px] leading-none">
              <PhoneLink location="visit-contact" className="hover:text-haint-deep">
                {shop.phoneDisplay}
              </PhoneLink>
            </p>
            <ul className="ui mt-3 space-y-1 text-[15px]">
              <li>
                <a href={`mailto:${shop.email}`} className="link">
                  {shop.email}
                </a>
              </li>
              {shop.socials.instagram ? (
                <li>
                  <ExtLink href={shop.socials.instagram} event="social_click" props={{ network: "instagram", location: "visit" }}>
                    Instagram
                  </ExtLink>
                </li>
              ) : null}
              {shop.socials.facebook ? (
                <li>
                  <ExtLink href={shop.socials.facebook} event="social_click" props={{ network: "facebook", location: "visit" }}>
                    Facebook
                  </ExtLink>
                </li>
              ) : null}
            </ul>

            <h2 className="label eyebrow mt-10 text-ink-3">Good to know</h2>
            <ul className="mt-3 space-y-2 text-ink-2">
              <li>Booking is the sure thing — walk-in space depends on the day.</li>
              <li>Each barber has his own cancellation policy; arriving 15 minutes late can mean losing the slot.</li>
              <li>{shop.amenities.join(" · ")}.</li>
            </ul>
          </div>
        </div>
        <div className="pb-section" />
      </Container>
    </>
  );
}

