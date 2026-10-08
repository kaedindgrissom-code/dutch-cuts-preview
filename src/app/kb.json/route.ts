import { shop } from "@/data/shop";
import { activeBarbers, fromPrice } from "@/data/barbers";
import { weekRows } from "@/lib/hours";

export const dynamic = "force-static";

/**
 * Knowledge-base export for the BookedIQ AI receptionist (phase two).
 * Same source of truth as the site; the Retell knowledge base can refresh from this URL.
 * Contains public information only.
 */
export function GET() {
  const body = {
    generatedAt: shop.verifiedAt,
    shop: {
      name: shop.name,
      address: `${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}`,
      phone: shop.phoneDisplay,
      website: shop.url,
      hoursSummary: shop.generalHoursLine,
      amenities: shop.amenities,
      bookingStructure: "Each barber books separately on Booksy. There is no shop-wide booking link.",
      reviews: shop.reviewStats,
    },
    barbers: activeBarbers.map((b) => ({
      name: b.publicName,
      goesBy: b.professionalName,
      role: b.role,
      knownFor: b.knownFor,
      specialties: b.specialties,
      goodFor: b.tags,
      cutsFrom: fromPrice(b),
      services: b.services.map((s) => ({ name: s.name, price: s.priceUsd, from: !!s.priceFrom, minutes: s.durationMin, note: s.note })),
      hours: weekRows(b.hours).map((r) => `${r.long}: ${r.text}`),
      policies: b.policies,
      bookingLink: b.booking.url,
      pageLink: `${shop.url}/barbers/${b.slug}`,
      instagram: b.socials.instagram,
    })),
    faq: [
      { q: "Do you take walk-ins?", a: "Booking on Booksy is the sure thing; walk-in space depends on the day. The receptionist can text you a booking link." },
      { q: "Who should I book with?", a: "Dutch for precision fades and athletes ($65). Brian for fades, longer hair and kids, never rushed ($40). Rod for fades with a hot-towel finish, first haircuts, and Sunday appointments ($40)." },
      { q: "Do you cut kids' hair?", a: "Yes — Brian takes kids 12 and under ($30), Rod takes ages 2–11 ($30), Dutch takes existing clients' kids only ($50)." },
      { q: "Where do I park?", a: "Parking is on site at 2816 Bee Rd." },
      { q: "Can I see availability?", a: "Live availability is only on each barber's Booksy page. The receptionist never quotes open slots; it sends the barber's link." },
    ],
  };
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=3600" } });
}
