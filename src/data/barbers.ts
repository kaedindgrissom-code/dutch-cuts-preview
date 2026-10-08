import type { Barber, ServiceTag } from "./types";

/**
 * Canonical barber data. Every field traces to research/TEAM_RESEARCH.md §2,
 * pulled from each barber's Booksy business page on 2026-10-07.
 * Portraits are the barbers' own Booksy photos, use approved by Dutch Cuts 2026-10-08.
 */
export const barbers: Barber[] = [
  {
    id: "435085",
    slug: "dutch-claybaugh",
    publicName: "Dutch Claybaugh",
    professionalName: "Dutch Francisco",
    role: "Owner & barber",
    intro:
      "Dutch opened Dutch Cuts after cutting in Minneapolis and Hawaii, and has been in Savannah since 2022. Precision fades and blends, straight-razor finish, any type of hair welcome.",
    knownFor: "Modern fades and blends, precision work, athletes. Straight-razor finish on every cut.",
    specialties: ["Modern fades & blends", "Precision cutting", "Athletes", "Straight-razor edge finish", "Designs"],
    tags: ["fade", "beard", "kids", "house-call"],
    services: [
      { id: "d-cut", name: "Adult haircut", description: "Haircut, fade or taper with a straight-edge finish. Enhancements if desired.", priceUsd: 65, durationMin: 60, tags: ["fade"] },
      { id: "d-cut-beard", name: "Haircut and beard", priceUsd: 75, durationMin: 60, tags: ["fade", "beard"] },
      { id: "d-design", name: "Haircut with design", description: "Freestyle or recommendations.", priceUsd: 60, priceFrom: true, durationMin: 60, tags: ["fade"] },
      { id: "d-beard", name: "Beard only", priceUsd: 40, durationMin: 30, tags: ["beard"] },
      { id: "d-kids", name: "Kids cut (12 & under)", priceUsd: 50, durationMin: 30, tags: ["kids"], note: "Existing clients only" },
      { id: "d-house", name: "House call", description: "VIP service — Dutch comes to you, within 15 miles.", priceUsd: 250, priceFrom: true, durationMin: 180, tags: ["house-call"] },
    ],
    hours: [
      { day: 1, open: "10:00", close: "18:00" },
      { day: 2, open: "10:00", close: "19:00" },
      { day: 3, open: "10:00", close: "19:00" },
      { day: 4, open: "08:00", close: "18:00" },
      { day: 5, open: "08:00", close: "18:00" },
    ],
    policies: [
      "Last-minute cancellations are charged full price.",
      "Arriving 15 minutes late means the cut can't happen — text to reschedule.",
      "No-shows are blocked from rebooking.",
    ],
    reviewStats: [
      { platform: "Booksy", rating: 4.99, count: 382, url: "https://booksy.com/en-us/435085_dutch-francisco-dutch-cuts_barber-shop_16218_savannah" },
    ],
    reviewThemes: ["Long-term loyalty", "Consistent every time", "Professional, chill environment", "Good with kids and teens"],
    reviewExcerpts: [
      { quote: "High quality cut, professional, chill environment.", author: "Tommy", platform: "Booksy", date: "2026-08" },
      { quote: "Great cut as always. Only barber I'll use in Savannah!", author: "Tony", platform: "Booksy", date: "2026-08" },
      { quote: "I've been going to Dutch for well over a year now and the haircuts are always the best.", author: "Ruairi", platform: "Booksy", date: "2026-09" },
    ],
    image: "/barbers/dutch-claybaugh.jpg",
    booking: {
      provider: "booksy",
      businessId: "435085",
      url: "https://booksy.com/en-us/435085_dutch-francisco-dutch-cuts_barber-shop_16218_savannah",
    },
    socials: { instagram: "https://www.instagram.com/dutchcuts/" },
    active: true,
    verifiedAt: "2026-10-07",
    verification: "VERIFIED",
  },
  {
    id: "1525088",
    slug: "brian-meyer",
    publicName: "Brian Meyer",
    professionalName: "Brian Blends",
    role: "Barber",
    intro:
      "Clean fades, precise cuts and consistent quality every time. New clients are always welcome. Every appointment is one-on-one and never rushed.",
    knownFor: "Clean fades and longer-hair cuts. Great with kids and toddlers. One-on-one, never rushed.",
    specialties: ["Clean fades", "Longer hair & flow cuts", "Beard sculpting", "Kids & toddlers", "Eyebrows"],
    tags: ["fade", "beard", "kids", "longer-hair", "line-up", "house-call"],
    services: [
      { id: "b-cut", name: "The Go-To adult cut", priceUsd: 40, durationMin: 45, tags: ["fade", "longer-hair"] },
      { id: "b-full", name: "The Full Package (cut + beard)", priceUsd: 50, durationMin: 60, tags: ["fade", "beard"] },
      { id: "b-kids", name: "Kid's cut (12 & under)", priceUsd: 30, durationMin: 30, tags: ["kids"] },
      { id: "b-lineup", name: "Sharp line-up", priceUsd: 20, durationMin: 15, tags: ["line-up"] },
      { id: "b-beard", name: "Beard sculpting", priceUsd: 20, durationMin: 15, tags: ["beard"] },
      { id: "b-brow", name: "Eyebrow shape / slit", priceUsd: 5, durationMin: 5, tags: [] },
      { id: "b-shampoo", name: "Shampoo rinse", priceUsd: 10, durationMin: 10, tags: [] },
      { id: "b-house", name: "House call cut", description: "Brian comes to you.", priceUsd: 200, durationMin: 120, tags: ["house-call"] },
    ],
    hours: [
      { day: 1, open: "10:00", close: "18:00" },
      { day: 2, open: "11:00", close: "20:00" },
      { day: 3, open: "10:00", close: "18:00" },
      { day: 4, open: "11:00", close: "20:00" },
      { day: 5, open: "10:00", close: "18:00" },
      { day: 6, open: "10:00", close: "15:00" },
    ],
    policies: [
      "A valid card is required to reserve. Pay now or at the chair; cash and card accepted.",
      "Standard Booksy cancellation fee applies to late cancellations.",
    ],
    reviewStats: [
      { platform: "Booksy", rating: 4.99, count: 144, url: "https://booksy.com/en-us/1525088_brian-blends-dutch-cuts_barber-shop_16218_savannah" },
    ],
    reviewThemes: ["Matches the reference photo", "Easy to talk to", "Options without pressure", "Great with young kids"],
    reviewExcerpts: [
      { quote: "Brian gave a great cut, exactly what I wanted and easy to talk to.", author: "Booksy client", platform: "Booksy", date: "2026-08" },
      { quote: "Brian is phenomenal. Always gives a good cut and is a pleasure to talk to.", author: "Booksy client", platform: "Booksy", date: "2026-08" },
      { quote: "Savannah's greatest barbershop experience! Liam (age 3) enjoyed a fantastic haircut from Brian.", author: "Google reviewer", platform: "Google", date: "2025-10" },
    ],
    image: "/barbers/brian-meyer.jpg",
    booking: {
      provider: "booksy",
      businessId: "1525088",
      url: "https://booksy.com/en-us/1525088_brian-blends-dutch-cuts_barber-shop_16218_savannah",
    },
    socials: { instagram: "https://www.instagram.com/brian.meyer4/" },
    active: true,
    verifiedAt: "2026-10-07",
    verification: "VERIFIED",
  },
  {
    id: "1356027",
    slug: "eric-rodriguez",
    publicName: "Eric Rodriguez",
    professionalName: "Rod Fayde",
    role: "Barber",
    intro:
      "Fades and blends with premier quality — shear work, straight-edge finish and a hot towel on every cut. Patient with first haircuts and nervous teens. The only chair open on Sundays.",
    knownFor: "Fades and blends with a hot-towel finish. Patient with first haircuts. Open Sundays.",
    specialties: ["Fades & blends", "Hot-towel finish", "Razor finish", "Kids 2–11 & first haircuts", "Sunday appointments"],
    tags: ["fade", "beard", "kids", "line-up", "house-call", "sunday"],
    services: [
      { id: "r-cut", name: "Haircut", description: "Haircut, fade or taper of choice, shear work with a straight-edge finish. Hot towel included.", priceUsd: 40, durationMin: 40, tags: ["fade"] },
      { id: "r-full", name: "Haircut & beard", description: "Full head and face.", priceUsd: 50, durationMin: 55, tags: ["fade", "beard"] },
      { id: "r-beard", name: "Beard only", priceUsd: 25, durationMin: 25, tags: ["beard"] },
      { id: "r-lineup", name: "Line-up only", priceUsd: 25, durationMin: 30, tags: ["line-up"] },
      { id: "r-kids", name: "Kids haircut (ages 2–11)", priceUsd: 30, durationMin: 30, tags: ["kids"] },
      { id: "r-house", name: "House call", description: "Within 15 miles; price depends on number of people.", priceUsd: 125, priceFrom: true, durationMin: 90, tags: ["house-call"] },
    ],
    hours: [
      { day: 0, open: "09:00", close: "16:00" },
      { day: 1, open: "09:00", close: "16:30" },
      { day: 2, open: "09:00", close: "16:30" },
      { day: 3, open: "09:00", close: "16:30" },
      { day: 4, open: "09:00", close: "16:30" },
      { day: 5, open: "09:00", close: "17:30" },
      { day: 6, open: "09:00", close: "17:30" },
    ],
    policies: ["Late cancellations incur the fee set out in Rod's Booksy booking policy."],
    reviewStats: [
      { platform: "Booksy", rating: 5.0, count: 38, url: "https://booksy.com/en-us/1356027_rod-fayde-dutch-cuts_barber-shop_16218_savannah" },
    ],
    reviewThemes: ["Eye for detail", "Patient with kids and first haircuts", "Great conversation", "Newcomers find their barber"],
    reviewExcerpts: [
      { quote: "Eric is superb! He has a wonderful eye for detail.", author: "Booksy client", platform: "Booksy", date: "2026-08" },
      { quote: "Highly recommend Rod! He did my son's first haircut ever. Dutch was also very welcoming.", author: "Booksy client", platform: "Booksy", date: "2026-08" },
      { quote: "Rod takes his time and makes sure his clients are happy. Shout out to Dutch for creating a no-pressure environment.", author: "Google reviewer", platform: "Google", date: "2025-10" },
    ],
    image: "/barbers/eric-rodriguez.jpg",
    booking: {
      provider: "booksy",
      businessId: "1356027",
      url: "https://booksy.com/en-us/1356027_rod-fayde-dutch-cuts_barber-shop_16218_savannah",
    },
    socials: { instagram: "https://www.instagram.com/rodfayde/" },
    active: true,
    verifiedAt: "2026-10-07",
    verification: "VERIFIED",
  },
];

export const activeBarbers = barbers.filter((b) => b.active);

export function getBarber(slug: string): Barber | undefined {
  return activeBarbers.find((b) => b.slug === slug);
}

export function shortName(b: Barber): string {
  return b.publicName.split(" ")[0] === "Eric" ? "Rod" : b.publicName.split(" ")[0];
}

export function fromPrice(b: Barber): number {
  // The plain adult cut: tagged "fade", no beard, not a "from" price, not a design add-on.
  const cuts = b.services.filter((s) => s.tags.includes("fade") && !s.tags.includes("beard") && !s.priceFrom && s.priceUsd !== null);
  return Math.min(...cuts.map((s) => s.priceUsd as number));
}

export const tagLabels: Record<ServiceTag, string> = {
  fade: "Fades & tapers",
  beard: "Beard",
  kids: "Kids",
  "longer-hair": "Longer hair",
  "line-up": "Line-up",
  "house-call": "House call",
  sunday: "Sundays",
};

/** Service categories shown on /services, with the price range across barbers. */
export function serviceRanges() {
  const groups: { key: string; name: string; blurb: string; match: (s: { name: string; tags: ServiceTag[] }) => boolean }[] = [
    { key: "cut", name: "Haircut", blurb: "Fade, taper or scissor cut with a straight-edge finish. Rod adds a hot towel on every cut.", match: (s) => s.tags.includes("fade") && !s.tags.includes("beard") && !/design/i.test(s.name) },
    { key: "cut-beard", name: "Haircut + beard", blurb: "The full reset — cut plus beard shape, line and finish.", match: (s) => s.tags.includes("fade") && s.tags.includes("beard") },
    { key: "beard", name: "Beard only", blurb: "Shape, line and detail. No cut.", match: (s) => s.tags.includes("beard") && !s.tags.includes("fade") },
    { key: "kids", name: "Kids", blurb: "12 and under. Policies differ by barber — Dutch takes existing clients only; Rod cuts ages 2–11.", match: (s) => s.tags.includes("kids") },
    { key: "line-up", name: "Line-up", blurb: "Edges and neckline cleaned up between cuts.", match: (s) => s.tags.includes("line-up") },
    { key: "house-call", name: "House call", blurb: "The barber comes to you. Radius and group pricing vary by barber.", match: (s) => s.tags.includes("house-call") },
  ];
  return groups.map((g) => {
    const rows = activeBarbers.flatMap((b) =>
      b.services.filter(g.match).map((s) => ({ barber: b, service: s })),
    );
    const prices = rows.map((r) => r.service.priceUsd).filter((p): p is number => p !== null);
    const durations = rows.map((r) => r.service.durationMin).filter((d): d is number => d !== null);
    return {
      ...g,
      rows,
      min: Math.min(...prices),
      max: Math.max(...prices),
      anyFrom: rows.some((r) => r.service.priceFrom),
      durMin: Math.min(...durations),
      durMax: Math.max(...durations),
    };
  });
}
