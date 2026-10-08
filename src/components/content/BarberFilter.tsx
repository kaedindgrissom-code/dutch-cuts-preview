"use client";

import { useMemo, useState } from "react";
import type { ServiceTag } from "@/data/types";
import { activeBarbers, tagLabels } from "@/data/barbers";
import { BarberCard } from "./BarberCard";
import { cx } from "@/components/ui/Button";

/** Only tags with real differentiation across the roster are exposed. */
const filters: ServiceTag[] = ["fade", "beard", "kids", "longer-hair", "house-call", "sunday"];

export function BarberFilter() {
  const [tag, setTag] = useState<ServiceTag | null>(null);
  const list = useMemo(() => (tag ? activeBarbers.filter((b) => b.tags.includes(tag)) : activeBarbers), [tag]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter barbers by what you need">
        <Chip active={tag === null} onClick={() => setTag(null)}>All</Chip>
        {filters.map((t) => (
          <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
            {tagLabels[t]}
          </Chip>
        ))}
      </div>
      <p className="ui mt-3 text-[13px] text-ink-3" aria-live="polite">
        {tag ? `${list.length} of ${activeBarbers.length} barbers offer ${tagLabels[tag].toLowerCase()}.` : `All ${activeBarbers.length} barbers.`}
      </p>
      <div className="mt-8 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {list.map((b, i) => (
          <BarberCard key={b.slug} barber={b} source="barbers" priority={i === 0} />
        ))}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx("ui h-10 rounded-[2px] border px-3.5 text-[14px] transition-colors duration-150", active ? "border-ink bg-ink text-paper" : "border-brick text-ink hover:border-ink")}
    >
      {children}
    </button>
  );
}
