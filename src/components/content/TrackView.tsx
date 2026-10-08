"use client";

import { useEffect } from "react";
import { track, type SiteEvent } from "@/lib/analytics";

export function TrackView({ event, props }: { event: SiteEvent; props?: Record<string, string> }) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, JSON.stringify(props)]);
  return null;
}
