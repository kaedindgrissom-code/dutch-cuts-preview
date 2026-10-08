import Link from "next/link";
import type { Barber } from "@/data/types";
import { fromPrice, tagLabels } from "@/data/barbers";
import { daysSummary } from "@/lib/hours";
import { Portrait } from "@/components/ui/Placeholder";
import { BookBarberButton } from "@/components/booking/BookButtons";
import { RatingLine } from "./RatingLine";

/**
 * One barber, comparable at a glance. Below lg it is a compact row (phones and tablets);
 * from lg it is a 4:5 portrait card with its facts and Book button pinned to the bottom so three line up. The whole
 * portrait and name link to the profile; the only button is Book.
 */
export function BarberCard({ barber, source, priority }: { barber: Barber; source: string; priority?: boolean }) {
  const href = `/barbers/${barber.slug}`;
  return (
    <article className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-3 sm:grid-cols-[9rem_1fr] sm:gap-x-6 lg:flex lg:h-full lg:flex-col lg:gap-0" data-testid="barber-card" data-barber={barber.slug}>
      <Link href={href} className="row-span-2 block lg:row-span-1" aria-label={`${barber.publicName} — profile`}>
        <Portrait barber={barber} priority={priority} sizes="(min-width:1024px) 33vw, (min-width:640px) 144px, 112px" />
      </Link>
      <div className="min-w-0 self-center lg:mt-5">
        <h3 className="display text-[30px] leading-[0.95] sm:text-[36px] lg:text-[40px]">
          <Link href={href} className="hover:text-haint-deep">
            {barber.publicName}
          </Link>
        </h3>
        <p className="label mt-2 text-ink-3">
          {barber.professionalName}
          {barber.role.startsWith("Owner") ? " · Owner" : ""}
        </p>
        <p className="mt-3 hidden text-ink-2 sm:block">{barber.knownFor}</p>
        <p className="ui mt-2 text-[13px] leading-relaxed text-ink-3">{barber.tags.map((t) => tagLabels[t]).join(" · ")}</p>
      </div>
      <dl className="rule col-span-2 grid grid-cols-3 gap-2 pt-3 lg:mt-auto lg:pt-4">
        <div>
          <dt className="label text-ink-3">From</dt>
          <dd className="price mt-1 text-[17px]">${fromPrice(barber)}</dd>
        </div>
        <div>
          <dt className="label text-ink-3">Days</dt>
          <dd className="ui mt-1 text-[15px]">{daysSummary(barber.hours)}</dd>
        </div>
        <div>
          <dt className="label text-ink-3">Rating</dt>
          <dd className="mt-1">
            <RatingLine stats={barber.reviewStats[0]} compact />
          </dd>
        </div>
      </dl>
      <div className="col-span-2 flex items-center gap-4 lg:mt-4">
        <BookBarberButton barber={barber} source={source} className="flex-1" />
        <Link href={href} className="ui shrink-0 text-[14px] ul-accent">
          Profile
        </Link>
      </div>
    </article>
  );
}
