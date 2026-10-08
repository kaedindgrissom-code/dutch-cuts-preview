import Image from "next/image";
import { cx } from "@/components/ui/Button";

/**
 * The owner's logo, derived at fetch time from his Booksy upload (scripts/fetch-photos.py → public/brand/*).
 * - "lockup-h": DC mark beside the DUTCH CUTS wordmark (nav, menu)
 * - "lockup":   DC mark stacked over the wordmark (footer, final CTA)
 * - "mark":     the DC monogram alone (hero stamp, small badges)
 * tone "ink" sits on paper backgrounds, "paper" on ink backgrounds.
 */
const SIZES = {
  "lockup-h": { w: 2019, h: 378 },
  lockup: { w: 1617, h: 919 },
  mark: { w: 401, h: 611 },
  wordmark: { w: 1617, h: 280 },
} as const;

export function Logo({
  variant = "lockup-h",
  tone = "ink",
  height,
  className,
  priority,
  alt = "Dutch Cuts",
}: {
  variant?: keyof typeof SIZES;
  tone?: "ink" | "paper";
  height: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  const s = SIZES[variant];
  const width = Math.round((s.w / s.h) * height);
  return (
    <Image
      src={`/brand/${variant}-${tone}.png`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cx("block select-none", className)}
      style={{ height, width }}
    />
  );
}
