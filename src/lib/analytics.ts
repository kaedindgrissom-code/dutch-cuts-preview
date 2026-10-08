"use client";

/**
 * Minimal, privacy-respecting event layer. Plausible (cookieless) when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set; otherwise a no-op that logs in dev.
 * Event names are the contract used by the monthly report.
 */
export type SiteEvent =
  | "book_now_click"
  | "chooser_open"
  | "barber_view"
  | "barber_book_click"
  | "phone_click"
  | "directions_click"
  | "social_click"
  | "gallery_engagement"
  | "service_view";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

export function track(event: SiteEvent, props?: Props) {
  if (typeof window === "undefined") return;
  const clean: Props = {};
  if (props) for (const [k, v] of Object.entries(props)) if (v !== undefined) clean[k] = v;
  if (window.plausible) {
    window.plausible(event, { props: clean });
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, clean);
  }
}
