"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

interface BookingCtx {
  open: boolean;
  openChooser: (source: string) => void;
  closeChooser: () => void;
}

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openChooser = useCallback((source: string) => {
    track("book_now_click", { location: source });
    track("chooser_open", { location: source });
    setOpen(true);
  }, []);
  const closeChooser = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openChooser, closeChooser }), [open, openChooser, closeChooser]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
