import type { Barber } from "@/data/types";

/**
 * Booking provider adapter. Booksy today (Shared Location → per-barber links).
 * A future partner-API adapter implements the same interface so pages and the
 * BookedIQ receptionist never depend on Booksy specifics directly.
 */
export interface BookingProvider {
  name: "booksy";
  /** Public booking URL for a barber. Never returns availability. */
  bookingUrl(barber: Barber): string;
  /** Whether a shop-level (all barbers) booking endpoint exists. */
  hasUnifiedBooking: boolean;
  /** Optional embeddable widget code supplied by the owner (Booksy Biz → Online Booking → Your Website). */
  widgetSrc?: string;
}

export const booksyProvider: BookingProvider = {
  name: "booksy",
  hasUnifiedBooking: false, // Shared Location: umbrella page has no services/staff.
  bookingUrl: (barber) => barber.booking.url,
  widgetSrc: process.env.NEXT_PUBLIC_BOOKSY_WIDGET_SRC || undefined,
};

export const bookingProvider = booksyProvider;
