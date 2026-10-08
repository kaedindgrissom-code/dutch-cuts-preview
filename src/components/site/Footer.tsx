import Link from "next/link";
import { shop } from "@/data/shop";
import { activeBarbers } from "@/data/barbers";
import { ExtLink } from "@/components/ui/ExtLink";
import { flags } from "@/config/claims";
import { Logo } from "@/components/site/Logo";

export function Footer() {
  return (
    <footer className="rule bg-paper">
      <div className="mx-auto grid max-w-site gap-10 px-gutter py-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <Logo variant="lockup" height={76} alt="Dutch Cuts" />
          <address className="ui mt-5 not-italic text-[14px] leading-relaxed text-ink-2">
            {shop.address.street}
            <br />
            {shop.address.city}, {shop.address.region} {shop.address.postalCode}
            <br />
            <a href={`tel:${shop.phone}`} className="link">
              {shop.phoneDisplay}
            </a>
          </address>
          <p className="ui mt-3 text-[13px] text-ink-3">{shop.generalHoursLine}</p>
        </div>
        <div>
          <p className="label eyebrow text-ink-3">Barbers</p>
          <ul className="ui mt-3 space-y-2 text-[15px]">
            {activeBarbers.map((b) => (
              <li key={b.slug}>
                <Link href={`/barbers/${b.slug}`} className="ul-accent">
                  {b.publicName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/barbers" className="ul-accent">
                Find your barber
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label eyebrow text-ink-3">Follow</p>
          <ul className="ui mt-3 space-y-2 text-[15px]">
            {shop.socials.instagram && (
              <li>
                <ExtLink href={shop.socials.instagram} event="social_click" props={{ network: "instagram", location: "footer" }}>
                  Instagram
                </ExtLink>
              </li>
            )}
            {shop.socials.facebook && (
              <li>
                <ExtLink href={shop.socials.facebook} event="social_click" props={{ network: "facebook", location: "footer" }}>
                  Facebook
                </ExtLink>
              </li>
            )}
            {shop.socials.tiktok && (
              <li>
                <ExtLink href={shop.socials.tiktok} event="social_click" props={{ network: "tiktok", location: "footer" }}>
                  TikTok
                </ExtLink>
              </li>
            )}
            <li>
              <ExtLink href={shop.booking.umbrellaUrl} event="social_click" props={{ network: "booksy", location: "footer" }}>
                Booksy
              </ExtLink>
            </li>
            {flags.googleReviewUrl && (
              <li>
                <ExtLink href={flags.googleReviewUrl} event="social_click" props={{ network: "google-review", location: "footer" }}>
                  Leave a Google review
                </ExtLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-site px-gutter pb-8">
        <p className="ui text-[12px] text-ink-3">
          © {new Date().getFullYear()} {shop.legalName}. Prices and hours shown as of {monthYear(shop.verifiedAt)} — live details on Booksy.
        </p>
      </div>
    </footer>
  );
}

function monthYear(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
