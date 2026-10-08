import type { Metadata } from "next";
import { shop } from "@/data/shop";
import { activeBarbers } from "@/data/barbers";
import { openingHoursSpec } from "@/lib/hours";
import type { Barber } from "@/data/types";

export const SITE_NAME = "Dutch Cuts";

export function pageMeta(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = new URL(opts.path, shop.url).toString();
  const title = opts.path === "/" ? `${opts.title}` : `${opts.title} · Dutch Cuts`;
  return {
    // absolute: the layout template would otherwise append the site name a second time
    // ("Barbers · Dutch Cuts · Dutch Cuts" — caught by tests/quality.spec.ts).
    title: { absolute: title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      // Explicit on every page: the root file-convention /opengraph-image does not reach child
      // segments once a page sets openGraph (found by tests/quality.spec.ts — pages shipped with no og:image).
      images: [{ url: opts.image ?? `${shop.url.replace(/\/$/, "")}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: opts.description },
  };
}

const sameAs = [
  shop.socials.instagram,
  shop.socials.facebook,
  shop.socials.tiktok,
  shop.booking.umbrellaUrl,
  ...activeBarbers.map((b) => b.booking.url),
].filter(Boolean);

/** Union of all barber hours — the shop is "open" when any chair is. */
function unionHours() {
  const byDay = new Map<number, { open: string; close: string }>();
  for (const b of activeBarbers) for (const h of b.hours) {
    const cur = byDay.get(h.day);
    byDay.set(h.day, { open: cur && cur.open < h.open ? cur.open : h.open, close: cur && cur.close > h.close ? cur.close : h.close });
  }
  return [...byDay.entries()].sort((a, b) => a[0] - b[0]).map(([day, v]) => ({ day: day as 0 | 1 | 2 | 3 | 4 | 5 | 6, ...v }));
}

export function barberShopJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": `${shop.url}/#shop`,
    name: shop.name,
    legalName: shop.legalName,
    description: shop.description,
    url: shop.url,
    telephone: shop.phone,
    email: shop.email,
    image: `${shop.url}/opengraph-image`,
    priceRange: "$20–$75",
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address.street,
      addressLocality: shop.address.city,
      addressRegion: shop.address.region,
      postalCode: shop.address.postalCode,
      addressCountry: shop.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: shop.geo.lat, longitude: shop.geo.lng },
    openingHoursSpecification: openingHoursSpec(unionHours()),
    sameAs,
    amenityFeature: shop.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
    employee: activeBarbers.map((b) => ({ "@type": "Person", "@id": `${shop.url}/barbers/${b.slug}#person`, name: b.publicName, alternateName: b.professionalName, jobTitle: b.role, url: `${shop.url}/barbers/${b.slug}` })),
    // aggregateRating intentionally omitted: Google requires first-party reviews
    // visible on the page; our excerpts are third-party (Booksy/Google). Revisit when
    // first-party reviews are collected.
  };
}

export function personJsonLd(b: Barber) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${shop.url}/barbers/${b.slug}#person`,
    name: b.publicName,
    alternateName: b.professionalName,
    jobTitle: b.role,
    description: b.intro,
    url: `${shop.url}/barbers/${b.slug}`,
    worksFor: { "@type": "BarberShop", "@id": `${shop.url}/#shop`, name: SITE_NAME },
    workLocation: { "@type": "Place", address: `${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}` },
    sameAs: [b.socials.instagram, b.booking.url].filter(Boolean),
    makesOffer: b.services
      .filter((s) => s.priceUsd !== null)
      .map((s) => ({
        "@type": "Offer",
        name: s.name,
        price: s.priceUsd,
        priceCurrency: "USD",
        url: b.booking.url,
        itemOffered: { "@type": "Service", name: s.name, serviceType: "Barber service" },
      })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: new URL(it.path, shop.url).toString() })),
  };
}
