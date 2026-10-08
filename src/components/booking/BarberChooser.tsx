"use client";

import { useEffect, useRef } from "react";
import { useBooking } from "./BookingContext";
import { activeBarbers, fromPrice, shortName } from "@/data/barbers";
import { daysSummary } from "@/lib/hours";
import { bookingProvider } from "@/lib/booking-provider";
import { track } from "@/lib/analytics";
import { Portrait } from "@/components/ui/Placeholder";

/**
 * Shop-level "Book a cut" → choose a barber → his Booksy page.
 * Native <dialog>: focus trap, Esc, backdrop click. Bottom sheet on mobile, centred on desktop.
 */
export function BarberChooser() {
  const { open, closeChooser } = useBooking();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => closeChooser();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [closeChooser]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="chooser-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeChooser();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/55 backdrop:anim-fade open:flex open:items-end md:open:items-center md:open:justify-center"
    >
      <div className="anim-sheet md:anim-dialog w-full bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(20,26,23,.12)] md:w-[32rem] md:rounded-[2px] md:px-6 md:pb-6 md:pt-6 md:shadow-[0_16px_48px_rgba(20,26,23,.18)]">
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-brick md:hidden" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="chooser-title" className="display display-3">
              Who&rsquo;s cutting you?
            </h2>
            <p className="mt-2 body-s text-ink-2">Each barber books on his own Booksy page. Pick one to see live times.</p>
          </div>
          <button
            type="button"
            onClick={closeChooser}
            className="ui -mr-2 -mt-1 grid h-11 w-11 shrink-0 place-items-center text-ink-2 hover:text-ink"
            aria-label="Close"
          >
            <span aria-hidden="true" className="text-xl leading-none">×</span>
          </button>
        </div>
        <ul className="mt-4">
          {activeBarbers.map((b) => (
            <li key={b.slug} className="rule">
              <a
                href={bookingProvider.bookingUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("barber_book_click", { barber: b.slug, location: "chooser" })}
                className="group flex items-center gap-3 py-3 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-haint"
              >
                <Portrait barber={b} className="h-[70px] w-14 shrink-0" sizes="56px" />
                <span className="min-w-0 flex-1">
                  <span className="display block text-[22px] leading-none">{b.publicName}</span>
                  <span className="ui mt-1 block text-[13px] text-ink-2">{b.knownFor.split(".")[0]}.</span>
                  <span className="price mt-1 block text-[13px]">
                    from ${fromPrice(b)} · {daysSummary(b.hours)}
                  </span>
                </span>
                <span className="ui inline-flex h-10 items-center rounded-[2px] bg-ink px-4 text-[14px] text-paper transition-colors group-hover:bg-haint-deep">
                  Book {shortName(b)}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="ui mt-3 text-center text-[12px] text-ink-3">Opens Booksy in a new tab. Live availability lives there.</p>
      </div>
    </dialog>
  );
}
