import { Quote, Star } from "lucide-react";

type Props = {
  testimonial: {
    name: string;
    role: string;
    company: string;
    location: string;
    rating: number;
    review: string;
    initials: string;
  };
};

export function TestimonialCard({ testimonial }: Props) {
  return (
    <article className="hover-lift flex h-full flex-col gap-6 rounded-3xl border border-border/70 bg-card p-8">
      <Quote className="h-8 w-8 text-gold" aria-hidden="true" />
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">“{testimonial.review}”</p>
      <div className="flex gap-1" aria-label={`Rated ${testimonial.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < testimonial.rating ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-border"}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 border-t border-border/70 pt-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-navy text-sm font-semibold text-primary-foreground">
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-navy-deep">{testimonial.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.company} · {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}
