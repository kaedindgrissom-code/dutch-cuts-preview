import type { DayHours } from "@/data/types";
import { weekRows } from "@/lib/hours";

export function HoursList({ hours, compact }: { hours: DayHours[]; compact?: boolean }) {
  const rows = weekRows(hours);
  return (
    <dl className={`ui grid grid-cols-[auto_1fr] gap-x-6 ${compact ? "gap-y-1 text-[14px]" : "gap-y-2 text-[15px]"}`}>
      {rows.map((r) => (
        <div key={r.day} className="contents">
          <dt>
            <abbr title={r.long} className="no-underline">
              {r.label}
            </abbr>
          </dt>
          <dd className={r.open ? "" : "text-ink-3"}>{r.text}</dd>
        </div>
      ))}
    </dl>
  );
}
