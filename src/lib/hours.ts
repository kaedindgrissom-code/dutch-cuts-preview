import type { DayHours } from "@/data/types";

export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = ((h + 11) % 12) + 1;
  return m ? `${hh}:${String(m).padStart(2, "0")}${suffix}` : `${hh}${suffix}`;
}

/** 7-row list, Monday first, with "Closed" for missing days. */
export function weekRows(hours: DayHours[]) {
  const order = [1, 2, 3, 4, 5, 6, 0] as const;
  return order.map((d) => {
    const h = hours.find((x) => x.day === d);
    return { day: d, label: DAY_SHORT[d], long: DAY_LONG[d], text: h ? `${fmtTime(h.open)}–${fmtTime(h.close)}` : "Closed", open: !!h };
  });
}

/** Compact summary like "Mon–Fri" or "7 days" or "Mon–Sat". */
export function daysSummary(hours: DayHours[]): string {
  const days = new Set(hours.map((h) => h.day));
  if (days.size === 7) return "7 days";
  const order: (0 | 1 | 2 | 3 | 4 | 5 | 6)[] = [1, 2, 3, 4, 5, 6, 0];
  const present = order.filter((d) => days.has(d));
  const first = present[0], last = present[present.length - 1];
  const contiguous = present.length === order.indexOf(last) - order.indexOf(first) + 1;
  if (contiguous) return `${DAY_SHORT[first]}–${DAY_SHORT[last]}`;
  return present.map((d) => DAY_SHORT[d]).join(", ");
}

/** Schema.org OpeningHoursSpecification entries. */
export function openingHoursSpec(hours: DayHours[]) {
  return hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${DAY_LONG[h.day]}`,
    opens: h.open,
    closes: h.close,
  }));
}

/** "Oct 2026" from an ISO date. */
export function asOf(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
