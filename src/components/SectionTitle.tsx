import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionTitle({ eyebrow, title, subtitle, align = "center", tone = "light", className }: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold-deep">{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-primary-foreground" : "text-navy-deep",
        )}
      >
        {title}
      </h2>
      <div
        className={cn("mt-5 h-px w-24 gradient-gold", align === "center" && "mx-auto")}
        aria-hidden="true"
      />
      {subtitle ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed",
            tone === "dark" ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
