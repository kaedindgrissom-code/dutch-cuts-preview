import type { ReviewExcerpt } from "@/data/types";

function fmt(date: string) {
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ReviewQuote({ r, size = "md" }: { r: ReviewExcerpt; size?: "md" | "lg" }) {
  return (
    <figure>
      <blockquote className={size === "lg" ? "text-[22px] leading-[1.4]" : "text-[19px] leading-[1.4]"}>&ldquo;{r.quote}&rdquo;</blockquote>
      <figcaption className="label mt-2 text-ink-3">
        — {r.author}, {r.platform}, {fmt(r.date)}
      </figcaption>
    </figure>
  );
}
