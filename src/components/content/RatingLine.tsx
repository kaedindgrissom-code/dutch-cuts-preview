import type { ReviewStats } from "@/data/types";

export function RatingLine({ stats, className = "" }: { stats: ReviewStats; className?: string }) {
  return (
    <p className={`ui inline-flex items-center gap-1.5 text-[13px] text-moss ${className}`}>
      <span aria-hidden="true">★</span>
      <span>
        {stats.rating.toFixed(stats.rating % 1 === 0 ? 1 : 2)} · {stats.count} reviews on {stats.platform}
      </span>
    </p>
  );
}
