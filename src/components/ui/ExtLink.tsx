"use client";

import type { ReactNode } from "react";
import { track, type SiteEvent } from "@/lib/analytics";
import { cx } from "./Button";

export function ExtLink({
  href,
  children,
  event,
  props,
  className,
  plain,
}: {
  href: string;
  children: ReactNode;
  event?: SiteEvent;
  props?: Record<string, string | number | boolean | undefined>;
  className?: string;
  plain?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => event && track(event, props)}
      className={cx(!plain && "link", className)}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
