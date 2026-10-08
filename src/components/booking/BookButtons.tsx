"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { useBooking } from "./BookingContext";
import { track } from "@/lib/analytics";
import { bookingProvider } from "@/lib/booking-provider";
import type { Barber } from "@/data/types";
import { shortName } from "@/data/barbers";

/** Shop-level CTA: opens the barber chooser. */
export function BookNowButton({
  source,
  label = "Book a cut",
  variant = "primary",
  size = "md",
  full,
  className,
}: {
  source: string;
  label?: string;
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "sm";
  full?: boolean;
  className?: string;
}) {
  const { openChooser } = useBooking();
  return (
    <Button variant={variant} size={size} full={full} className={className} onClick={() => openChooser(source)} aria-haspopup="dialog">
      {label}
    </Button>
  );
}

/** Barber-specific CTA: straight to that barber's Booksy page. */
export function BookBarberButton({
  barber,
  source,
  label,
  variant = "primary",
  size = "md",
  full,
  className,
}: {
  barber: Barber;
  source: string;
  label?: string;
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "sm";
  full?: boolean;
  className?: string;
}) {
  const href = bookingProvider.bookingUrl(barber);
  return (
    <ButtonLink
      href={href}
      external
      variant={variant}
      size={size}
      full={full}
      className={className}
      onClick={() => track("barber_book_click", { barber: barber.slug, location: source })}
      aria-label={`${label ?? `Book with ${shortName(barber)}`} on Booksy (opens in a new tab)`}
    >
      {label ?? `Book with ${shortName(barber)}`}
      <span aria-hidden="true" className="text-[11px] opacity-70">↗</span>
    </ButtonLink>
  );
}
