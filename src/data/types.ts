/**
 * Canonical content model. Public presentation fields only —
 * research provenance lives in /research/TEAM_RESEARCH.md.
 * These types are reusable across BookedIQ barbershop clients.
 */

export type Verification = "VERIFIED" | "INFERRED" | "UNVERIFIED";

export type ServiceTag =
  | "fade"
  | "beard"
  | "kids"
  | "longer-hair"
  | "line-up"
  | "house-call"
  | "sunday";

export interface Service {
  id: string;
  name: string;
  /** Plain-English description, shown on barber pages. */
  description?: string;
  priceUsd: number | null;
  /** True when price is a floor ("from"). */
  priceFrom?: boolean;
  durationMin: number | null;
  tags: ServiceTag[];
  /** Policy caveat e.g. "existing clients only". */
  note?: string;
}

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  open: string; // "10:00"
  close: string; // "18:00"
}

export interface ReviewExcerpt {
  quote: string;
  author: string; // first name or platform-only
  platform: "Booksy" | "Google";
  date: string; // YYYY-MM
}

export interface ReviewStats {
  platform: "Booksy" | "Google";
  rating: number;
  count: number;
  url?: string;
}

export interface PortfolioItem {
  id: string;
  /** Local path under /public or remote URL once owner supplies originals. */
  src: string | null;
  alt: string;
  barberSlug: string;
  tags: ServiceTag[];
  /** Internal attribution — never rendered. */
  source: string;
  width?: number;
  height?: number;
}

export interface Barber {
  id: string;
  slug: string;
  publicName: string;
  /** Stage / business name as shown on Booksy. */
  professionalName: string;
  role: string;
  /** Short, factual, sourced intro. Never invented. */
  intro: string;
  /** One line "known for", used on cards. */
  knownFor: string;
  specialties: string[];
  tags: ServiceTag[];
  services: Service[];
  hours: DayHours[];
  hoursNote?: string;
  policies: string[];
  reviewStats: ReviewStats[];
  reviewThemes: string[];
  reviewExcerpts: ReviewExcerpt[];
  /** Portrait image path, null until owner supplies. */
  image: string | null;
  booking: {
    provider: "booksy";
    businessId: string;
    url: string;
  };
  socials: { instagram?: string; facebook?: string; tiktok?: string };
  active: boolean;
  verifiedAt: string; // YYYY-MM-DD
  verification: Verification;
}

export interface Shop {
  name: string;
  legalName: string;
  slogan: string;
  description: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  phone: string; // E.164
  phoneDisplay: string;
  email: string;
  url: string;
  socials: { instagram?: string; facebook?: string; tiktok?: string };
  booking: {
    provider: "booksy";
    structure: "shared-location";
    umbrellaUrl: string;
  };
  amenities: string[];
  neighborhoods: string[];
  /** Union of barber hours, for schema and the "generally open" line. */
  generalHoursLine: string;
  reviewStats: ReviewStats[];
  verifiedAt: string;
}
