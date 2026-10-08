"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/components/ui/Button";

/**
 * Reveals children once when they enter the viewport (opacity + 12px).
 * Server-rendered visible; the class only hides when JS has attached, so there is
 * never a blank page without JS, and prefers-reduced-motion disables it in CSS.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0 }: { children: ReactNode; className?: string; as?: "div" | "li" | "section" | "article"; delay?: number }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it visible, no blink.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag ref={ref as any} className={cx(className)}>{children}</Tag>;
}
