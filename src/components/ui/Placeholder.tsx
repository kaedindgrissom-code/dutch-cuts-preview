import Image from "next/image";
import type { Barber, PortfolioItem } from "@/data/types";
import { cx } from "./Button";

/**
 * Photo system. Every photo is 4:5 with a hairline mat and a light grade so the
 * barbers' own phone photos read as one set. Zero layout shift: the box is sized
 * before the image loads. Never renders stock imagery.
 */
export function Placeholder({ label, className, ratio }: { label: string; className?: string; ratio?: string }) {
  return (
    <div className={cx("ph", className)} style={ratio ? { aspectRatio: ratio } : undefined} role="img" aria-label={label}>
      <span className="label">{label}</span>
    </div>
  );
}

export function Portrait({ barber, className, sizes = "(min-width:1024px) 33vw, 100vw", priority }: { barber: Barber; className?: string; sizes?: string; priority?: boolean }) {
  if (barber.image) {
    return (
      <div className={cx("photo", className)} style={{ aspectRatio: "4 / 5" }}>
        <Image src={barber.image} alt={`${barber.publicName}, barber at Dutch Cuts`} fill sizes={sizes} priority={priority} fetchPriority={priority ? "high" : undefined} className="object-cover" />
      </div>
    );
  }
  return <Placeholder label={initials(barber.publicName)} className={className} ratio="4 / 5" />;
}

export function WorkTile({ item, className, sizes = "(min-width:1024px) 25vw, 50vw", tag, priority }: { item: PortfolioItem; className?: string; sizes?: string; tag?: { label: string; by: string }; priority?: boolean }) {
  if (item.src) {
    return (
      <div className={className}>
        <div className={cx("photo", tag && "photo-hover")} style={{ aspectRatio: "4 / 5" }}>
          <Image src={item.src} alt={item.alt} fill sizes={sizes} className="object-cover" loading={priority ? "eager" : "lazy"} priority={priority} />
          {tag ? (
            // pointer devices: slides up over the photo on hover
            <div className="photo-tag ui text-[12px]" aria-hidden="true">
              <span className="truncate">{tag.label}</span>
              <span className="label text-ink-3">{tag.by}</span>
            </div>
          ) : null}
        </div>
        {tag ? (
          // touch devices: a caption row under the photo, so nothing covers the cut
          <div className="photo-caption ui text-[12px]" aria-hidden="true">
            <span className="truncate">{tag.label}</span>
            <span className="label text-ink-3">{tag.by}</span>
          </div>
        ) : null}
      </div>
    );
  }
  return <Placeholder label="work" className={className} ratio="4 / 5" />;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
