"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem, ServiceTag } from "@/data/types";
import { activeBarbers, tagLabels, shortName } from "@/data/barbers";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/Button";
import { WorkTile } from "@/components/ui/Placeholder";

type Filter = { kind: "all" } | { kind: "barber"; slug: string } | { kind: "tag"; tag: ServiceTag };

const tagFilters: ServiceTag[] = ["fade", "beard", "kids", "longer-hair"];

export function PortfolioGrid({ items, showFilters = true, columns = "2-4" }: { items: PortfolioItem[]; showFilters?: boolean; columns?: "2-4" | "2-3" }) {
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const engaged = useRef(false);

  const visible = useMemo(() => {
    if (filter.kind === "all") return items;
    if (filter.kind === "barber") return items.filter((i) => i.barberSlug === filter.slug);
    return items.filter((i) => i.tags.includes(filter.tag));
  }, [items, filter]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openIdx !== null && !d.open) d.showModal();
    if (openIdx === null && d.open) d.close();
  }, [openIdx]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setOpenIdx(null);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, visible.length]);

  const engage = (what: string) => {
    if (!engaged.current) {
      engaged.current = true;
      track("gallery_engagement", { action: what });
    }
  };

  const current = openIdx !== null ? visible[openIdx] : null;
  const currentBarber = current ? activeBarbers.find((b) => b.slug === current.barberSlug) : null;

  return (
    <div>
      {showFilters ? (
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter the gallery">
          <Chip active={filter.kind === "all"} onClick={() => { setFilter({ kind: "all" }); engage("filter"); }}>
            All
          </Chip>
          {activeBarbers.map((b) => (
            <Chip key={b.slug} active={filter.kind === "barber" && filter.slug === b.slug} onClick={() => { setFilter({ kind: "barber", slug: b.slug }); engage("filter"); }}>
              {shortName(b)}
            </Chip>
          ))}
          {tagFilters.map((t) => (
            <Chip key={t} active={filter.kind === "tag" && filter.tag === t} onClick={() => { setFilter({ kind: "tag", tag: t }); engage("filter"); }}>
              {tagLabels[t]}
            </Chip>
          ))}
        </div>
      ) : null}

      <ul className={cx("grid gap-2 md:gap-3", columns === "2-4" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4")} data-testid="portfolio-grid">
        {visible.map((item, i) => {
          const by = activeBarbers.find((b) => b.slug === item.barberSlug);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => { setOpenIdx(i); engage("open"); }}
                className="block w-full text-left"
                aria-label={`${item.alt} — open larger`}
              >
                <WorkTile item={item} tag={{ label: item.tags.map((t) => tagLabels[t]).join(" · "), by: by ? shortName(by) : "" }} priority={i < 4} sizes={columns === "2-4" ? "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" : "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"} />
              </button>
            </li>
          );
        })}
      </ul>
      {visible.length === 0 ? (
        <div className="rule mt-4 py-10 text-center">
          <p className="display text-[28px]">Nothing tagged that way yet.</p>
          <p className="mt-2 text-ink-2">Try another filter, or see everything.</p>
          <button type="button" onClick={() => setFilter({ kind: "all" })} className="ui mt-4 ul-accent text-[15px]">Show all</button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label="Photo"
        onClick={(e) => { if (e.target === e.currentTarget) setOpenIdx(null); }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/85 open:flex open:items-center open:justify-center"
      >
        {current ? (
          <div className="anim-dialog relative flex max-h-full w-full max-w-3xl flex-col gap-3 p-4">
            <div className="relative mx-auto w-full overflow-hidden bg-ink" style={{ aspectRatio: "4 / 5", maxHeight: "74dvh" }}>
              {current.src ? (
                <Image src={current.src} alt={current.alt} fill sizes="(min-width:768px) 48rem, 100vw" className="object-contain" />
              ) : (
                <span className="label absolute bottom-3 left-3 text-ink-3">work — original pending</span>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 text-paper">
              <p className="ui text-[14px]">
                {current.alt}
                {currentBarber ? (
                  <>
                    {" · "}
                    <Link href={`/barbers/${currentBarber.slug}`} className="underline decoration-haint underline-offset-4">
                      Book {shortName(currentBarber)}
                    </Link>
                  </>
                ) : null}
              </p>
              <div className="flex gap-1">
                <button type="button" className="ui h-11 w-11 rounded-[2px] border border-paper/40" onClick={() => setOpenIdx((i) => (i === null ? i : (i - 1 + visible.length) % visible.length))} aria-label="Previous photo">‹</button>
                <button type="button" className="ui h-11 w-11 rounded-[2px] border border-paper/40" onClick={() => setOpenIdx((i) => (i === null ? i : (i + 1) % visible.length))} aria-label="Next photo">›</button>
                <button type="button" className="ui h-11 w-11 rounded-[2px] border border-paper/40" onClick={() => setOpenIdx(null)} aria-label="Close">×</button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "ui h-10 rounded-[2px] border px-3.5 text-[14px] transition-colors duration-150",
        active ? "border-ink bg-ink text-paper" : "border-brick text-ink hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
