"use client";

import { useEffect, useState } from "react";
import { shop } from "@/data/shop";
import { BookNowButton } from "@/components/booking/BookButtons";
import { useBooking } from "@/components/booking/BookingContext";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/Button";

/** Persistent mobile Book / Call bar. Appears after the first viewport scrolls; hidden when the chooser is open. */
export function BottomBar() {
  const [visible, setVisible] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = visible && !open;

  return (
    <div
      inert={!shown}
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-brick/60 bg-paper px-4 pt-2 safe-bottom transition-transform duration-200 ease-[var(--ease-out)] md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
    >
      <BookNowButton source="bottom-bar" full className="flex-1" />
      <a
        href={`tel:${shop.phone}`}
        onClick={() => track("phone_click", { location: "bottom-bar" })}
        className="ui inline-flex h-12 w-28 items-center justify-center rounded-[2px] border border-ink text-[15px] text-ink"
      >
        Call
      </a>
    </div>
  );
}
