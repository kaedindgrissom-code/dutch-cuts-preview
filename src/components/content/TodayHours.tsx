"use client";

import { useSyncExternalStore } from "react";
import type { DayHours } from "@/data/types";
import { weekRows } from "@/lib/hours";

const subscribe = () => () => {};

/** Computed in the browser so a statically built page never shows a stale "today". */
export function TodayHours({ hours }: { hours: DayHours[] }) {
  const day = useSyncExternalStore(subscribe, () => new Date().getDay(), () => -1);
  if (day < 0) return null;
  const r = weekRows(hours).find((x) => x.day === day);
  if (!r) return null;
  return <span>{`${r.long}: ${r.text.toLowerCase()}`} · </span>;
}
