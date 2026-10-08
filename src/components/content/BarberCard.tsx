import Link from "next/link";
import type { Barber } from "@/data/types";
import { fromPrice, shortName, tagLabels } from "@/data/barbers";
import { daysSummary } from "@/lib/hours";
import { Portrait } from "@/components/ui/Placeholder";
import { BookBarberButton } from "@/components/booking/BookButtons";
import { RatingLine } from "./RatingLine";

export function BarberCard({ barber, source, priority }: { barber: Barber; source: string; priority?: boolean }) {
  return (
    <article className="flex flex-col gap-3" data-testid="barber-card" data-barber={barber.slug}>
      <Link href={`/barbers/${barber.slug}`} className="block" aria-label={`${barber.publicName} — profile`}>
        <Portrait barber={barber} priority={priority} />
      </Link>
      <div>
        <h3 className="display text-[40px] leading-none">
          <Link href={`/barbers/${barber.slug}`} className="hover:text-haint-deep">
            {barber.publicName}
          </Link>
        </h3>
        <p className="label mt-2 text-ink-3">
          {barber.professionalName}
          {barber.role.startsWith("Owner") ? " · Owner" : ""}
        </p>
      </div>
      <p className="text-ink-2">{barber.knownFor}</p>
      <p className="ui text-[13px] leading-relaxed text-ink-3">{barber.tags.map((t) => tagLabels[t]).join(" · ")}</p>
      <div className="flex items-center justify-between gap-3">
        <RatingLine stats={barber.reviewStats[0]} />
        <p className="price text-[15px]">
          from ${fromPrice(barber)} · {daysSummary(barber.hours)}
        </p>
      </div>
      <div className="flex gap-2">
        <BookBarberButton barber={barber} source={source} className="flex-1" />
        <Link href={`/barbers/${barber.slug}`} className="ui inline-flex h-12 items-center rounded-[2px] border border-ink px-4 text-[15px] hover:bg-ink hover:text-paper">
          {shortName(barber)}&rsquo;s page
        </Link>
      </div>
    </article>
  );
}
