import type { ReviewStats } from "@/data/types";

export function RatingLine({ stats, className = "", compact }: { stats: ReviewStats; className?: string; compact?: boolean }) {
  const rating = stats.rating.toFixed(stats.rating % 1 === 0 ? 1 : 2);
  if (compact) {
    return (
      <p className={`ui inline-flex items-center gap-1 text-[15px] ${className}`} aria-label={`${rating} from ${stats.count} reviews on ${stats.platform}`}>
        <span aria-hidden="true" className="text-haint-deep">★</span>
        <span className="price">{rating}</span>
        <span className="text-[13px] text-ink-3">({stats.count})</span>
      </p>
    );
  }
  return (
    <p className={`ui inline-flex items-center gap-1.5 text-[13px] text-moss ${className}`}>
      <span aria-hidden="true">★</span>
      <span>
        {rating} · {stats.count} reviews on {stats.platform}
      </span>
    </p>
  );
}
