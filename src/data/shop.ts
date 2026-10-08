import type { Shop } from "./types";

/**
 * Shop-level facts. Source: research/TEAM_RESEARCH.md §1 (checked 2026-10-07).
 * Owner-confirmation pending: phone line ownership, canonical IG handle, hours of record.
 */
export const shop: Shop = {
  name: "Dutch Cuts",
  legalName: "Dutch Cuts LLC",
  slogan: "Modern fades and blends on Bee Road.",
  description:
    "Dutch Cuts is a modern barbering studio in Savannah, Georgia. Three barbers, one chair each, never rushed — fades, tapers, beards, kids and house calls, booked on Booksy.",
  address: {
    street: "2816 Bee Rd",
    city: "Savannah",
    region: "GA",
    postalCode: "31404",
    country: "US",
  },
  geo: { lat: 32.0447, lng: -81.077 },
  phone: "+19125086202",
  phoneDisplay: "912-508-6202",
  email: "dutchcutsofficial@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dutchcuts.com",
  socials: {
    instagram: "https://www.instagram.com/dutchcuts/",
    facebook: "https://www.facebook.com/dutchcuts/",
    tiktok: "https://www.tiktok.com/@dutchcuts",
  },
  booking: {
    provider: "booksy",
    structure: "shared-location",
    umbrellaUrl:
      "https://booksy.com/en-us/1356030_dutch-cuts-barbershop_barber-shop_16218_savannah",
  },
  amenities: ["Parking on site", "Wheelchair accessible", "Kids welcome", "Cards accepted", "Wi-Fi"],
  neighborhoods: [
    "Midtown",
    "Ardsley Park",
    "Thunderbolt",
    "Savannah State",
    "Dutch Island",
    "Whitemarsh Island",
    "Isle of Hope",
  ],
  generalHoursLine: "Open Monday–Saturday, Sundays with Rod. Each barber keeps his own hours.",
  reviewStats: [
    { platform: "Booksy", rating: 4.99, count: 564 },
    { platform: "Google", rating: 5.0, count: 50 },
  ],
  verifiedAt: "2026-10-07",
};

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}`,
)}`;

export const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Dutch Cuts ${shop.address.street} ${shop.address.city} ${shop.address.region}`,
)}`;
