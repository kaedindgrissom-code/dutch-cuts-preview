import type { ReactNode } from "react";
import { cx } from "@/components/ui/Button";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-site px-4 md:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({ children, className, id, rule = true }: { children: ReactNode; className?: string; id?: string; rule?: boolean }) {
  return (
    <section id={id} className={cx("py-16 md:py-24 lg:py-28", className)}>
      <Container>
        {rule ? <div className="rule mb-8 md:mb-12" /> : null}
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label text-ink-3">{children}</p>;
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
