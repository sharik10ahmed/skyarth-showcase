import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type Props = {
  product: { slug: string; title: string; category: string; short: string; image: string };
};

export function ProductCard({ product }: Props) {
  return (
    <article className="hover-lift group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.title} by SKYARTH uPVC`}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/5 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-background/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="space-y-3 p-7">
        <h3 className="text-xl font-semibold text-navy-deep">{product.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.short}</p>
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-gold-deep transition-all duration-300 hover:gap-3"
        >
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
