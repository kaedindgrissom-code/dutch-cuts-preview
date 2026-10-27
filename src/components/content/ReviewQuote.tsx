import Link from "next/link";
import Image from "next/image";
import type { Barber, ReviewExcerpt } from "@/data/types";
import { shortName } from "@/data/barbers";

function fmt(date: string) {
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * A review excerpt. With `barber`, the quote is shown under the face of the barber
 * whose Booksy or Google page it came from, linking to his profile.
 */
export function ReviewQuote({ r, size = "md", barber }: { r: ReviewExcerpt; size?: "md" | "lg"; barber?: Barber }) {
  return (
    <figure>
      {barber?.image ? (
        <Link href={`/barbers/${barber.slug}`} className="ui group mb-4 inline-flex min-h-11 items-center gap-3 text-[15px]" aria-label={`${shortName(barber)}'s profile`}>
          <span className="photo relative block size-14 shrink-0">
            <Image src={barber.image} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="ul-accent">{shortName(barber)}</span>
        </Link>
      ) : null}
      <blockquote className={size === "lg" ? "text-[22px] leading-[1.4]" : "text-[19px] leading-[1.4]"}>&ldquo;{r.quote}&rdquo;</blockquote>
      <figcaption className="label mt-2 text-ink-3">
        — {r.author}, {r.platform}, {fmt(r.date)}
      </figcaption>
    </figure>
  );
}
