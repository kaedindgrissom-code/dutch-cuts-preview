"use client";

import type { ReactNode } from "react";
import { shop } from "@/data/shop";
import { track } from "@/lib/analytics";

export function PhoneLink({ children, location, className }: { children: ReactNode; location: string; className?: string }) {
  return (
    <a href={`tel:${shop.phone}`} onClick={() => track("phone_click", { location })} className={className}>
      {children}
    </a>
  );
}
