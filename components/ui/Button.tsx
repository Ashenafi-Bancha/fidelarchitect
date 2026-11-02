import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "dark" | "light" | "outline-dark" | "outline-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  dark: "bg-obsidian text-bone hover:bg-graphite",
  light: "bg-bone text-obsidian hover:bg-white",
  "outline-dark": "border border-obsidian/25 text-obsidian hover:border-obsidian hover:bg-obsidian hover:text-bone",
  "outline-light": "border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-obsidian",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.8125rem]",
  lg: "h-14 px-7 text-sm",
};

export function buttonClass(variant: Variant = "dark", size: Size = "md", className?: string) {
  return cn(
    "group/btn relative inline-flex items-center justify-between gap-6 whitespace-nowrap font-medium uppercase tracking-[0.14em] transition-[background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)] disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

function Icon({ icon }: { icon?: ReactNode }) {
  if (!icon) return null;
  return (
    <span className="relative inline-flex overflow-hidden" aria-hidden="true">
      <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-[150%]">{icon}</span>
      <span className="absolute inset-0 -translate-x-[150%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0">
        {icon}
      </span>
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "dark",
  size = "md",
  icon,
  className,
  external,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  const cls = buttonClass(variant, size, className);
  const inner = (
    <>
      <span>{children}</span>
      <Icon icon={icon} />
    </>
  );
  if (href) {
    if (external || /^(https?:|tel:|mailto:)/.test(href)) {
      return (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

export function SectionLabel({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", className)}>
      {index && <span className="font-display tabular-nums opacity-50">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function PendingNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-start gap-2 border border-dashed border-current/30 px-3 py-2 text-xs leading-relaxed opacity-80",
        className,
      )}
    >
      <span className="eyebrow !text-[0.68rem] shrink-0 pt-px">Pending</span>
      <span>{children}</span>
    </p>
  );
}
