import Image from "next/image";
import type { Barber, PortfolioItem } from "@/data/types";
import { cx } from "./Button";

/**
 * Image or labelled placeholder. Keeps aspect ratio so there is zero layout
 * shift when originals arrive. Never renders stock imagery.
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
      <div className={cx("relative overflow-hidden bg-paper-2", className)} style={{ aspectRatio: "4 / 5" }}>
        <Image src={barber.image} alt={`${barber.publicName}, barber at Dutch Cuts`} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return <Placeholder label={initials(barber.publicName)} className={className} ratio="4 / 5" />;
}

export function WorkTile({ item, className, sizes = "(min-width:1024px) 25vw, 50vw" }: { item: PortfolioItem; className?: string; sizes?: string }) {
  if (item.src) {
    return (
      <div className={cx("relative overflow-hidden bg-paper-2", className)} style={{ aspectRatio: "1 / 1" }}>
        <Image src={item.src} alt={item.alt} fill sizes={sizes} className="object-cover" loading="lazy" />
      </div>
    );
  }
  return <Placeholder label="work" className={className} ratio="1 / 1" />;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
