"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { shop } from "@/data/shop";
import { BookNowButton } from "@/components/booking/BookButtons";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/Button";

const links = [
  { href: "/barbers", label: "Barbers" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on route change (render-time adjustment, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 bg-paper transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_0_color-mix(in_srgb,var(--brick)_60%,transparent)]",
      )}
    >
      <nav aria-label="Primary" className={cx("mx-auto flex max-w-site items-center justify-between px-4 transition-[height] duration-200 ease-[var(--ease-out)] md:px-6 lg:px-8", scrolled ? "h-14" : "h-16 md:h-[4.5rem]")}>
        <Link href="/" className="display text-[22px] leading-none md:text-2xl" aria-label="Dutch Cuts home">
          Dutch Cuts
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href || pathname.startsWith(l.href + "/") ? "page" : undefined}
              className="ui ul-accent text-[15px] text-ink"
            >
              {l.label}
            </Link>
          ))}
          <a href={`tel:${shop.phone}`} onClick={() => track("phone_click", { location: "nav" })} className="ui ul-accent text-[15px] text-ink">
            {shop.phoneDisplay}
          </a>
          <BookNowButton source="nav" size="sm" />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <BookNowButton source="nav-mobile" label="Book" size="sm" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="ui grid h-11 w-11 place-items-center text-[15px]"
          >
            Menu
          </button>
        </div>
      </nav>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 backdrop:bg-ink/40 open:anim-fade"
      >
        <div className="flex h-full flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex h-10 items-center justify-between">
            <span className="display text-[22px] leading-none">Dutch Cuts</span>
            <button type="button" onClick={() => setOpen(false)} className="ui grid h-11 w-11 place-items-center" aria-label="Close menu">
              <span aria-hidden="true" className="text-2xl leading-none">×</span>
            </button>
          </div>
          <ul className="mt-8 flex flex-col">
            {[{ href: "/", label: "Home" }, ...links].map((l) => (
              <li key={l.href} className="rule">
                <Link href={l.href} className="display flex items-center justify-between py-4 text-[44px] leading-none aria-[current=page]:text-haint-deep" aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <a href={`tel:${shop.phone}`} onClick={() => track("phone_click", { location: "menu" })} className="ui text-[17px] underline decoration-haint underline-offset-4">
              Call {shop.phoneDisplay}
            </a>
            <p className="ui text-[13px] text-ink-3">
              {shop.address.street}, {shop.address.city}, {shop.address.region} {shop.address.postalCode}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
