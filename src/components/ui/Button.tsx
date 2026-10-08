import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "sm";

const base =
  "ui inline-flex items-center justify-center gap-2 rounded-[2px] font-medium leading-none whitespace-nowrap transition-colors duration-150 ease-[var(--ease-out)] select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haint";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-haint-deep active:bg-haint-deep",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-haint",
};
const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-[15px]",
  sm: "h-10 px-4 text-[14px]",
};

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

interface BaseProps {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & Omit<ComponentProps<"button">, keyof BaseProps>;
type LinkProps = BaseProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, keyof BaseProps | "href">;

export function Button({ variant = "primary", size = "md", full, className, children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={cx(base, variants[variant], sizes[size], full && "w-full", className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", size = "md", full, className, children, href, external, ...rest }: LinkProps) {
  const cls = cx(base, variants[variant], sizes[size], full && "w-full", className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
