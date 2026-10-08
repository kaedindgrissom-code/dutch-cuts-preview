import type { ReactNode } from "react";
import { cx } from "@/components/ui/Button";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-site px-4 md:px-6 lg:px-8", className)}>{children}</div>;
}

/** One vertical rhythm for every section: --space-section outside, --space-block inside. */
export function Section({ children, className, id, rule = true }: { children: ReactNode; className?: string; id?: string; rule?: boolean }) {
  return (
    <section id={id} className={cx("pt-section", className)}>
      <Container>
        {rule ? <div className="rule mb-block" /> : null}
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("label eyebrow text-ink-3", className)}>{children}</p>;
}

/** Section header: eyebrow + display heading + optional lede, consistent everywhere. */
export function SectionHead({ eyebrow, title, lede, action, className }: { eyebrow: string; title: ReactNode; lede?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cx("grid gap-4 md:grid-cols-[1fr_auto] md:items-end", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display display-2 mt-4">{title}</h2>
        {lede ? <p className="mt-4 max-w-[36rem] text-[18px] text-ink-2">{lede}</p> : null}
      </div>
      {action ? <div className="md:pb-1">{action}</div> : null}
    </div>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
