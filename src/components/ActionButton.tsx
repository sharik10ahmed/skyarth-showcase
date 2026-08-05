import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "gold" | "navy" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "gradient-gold text-navy-deep shadow-gold hover:-translate-y-0.5 hover:brightness-105",
  navy: "gradient-navy text-primary-foreground shadow-luxe hover:-translate-y-0.5",
  outline:
    "border border-gold/70 text-foreground hover:bg-gold/10 hover:border-gold backdrop-blur-sm",
  ghost: "text-foreground hover:text-gold-deep",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  to?: string;
  params?: Record<string, string>;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function ActionButton({ variant = "gold", className, children, to, params, type = "button", onClick }: Props) {
  const classes = cn(base, variants[variant], className);
  if (to) {
    return (
      <Link to={to} params={params as never} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
