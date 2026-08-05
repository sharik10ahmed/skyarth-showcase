import { CalendarDays, MapPin } from "lucide-react";

type Props = {
  project: { title: string; category: string; location: string; completion: string; description: string; image: string };
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="hover-lift group overflow-hidden rounded-3xl border border-border/70 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — ${project.category} project in ${project.location}`}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full gradient-gold px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">
          {project.category}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-lg font-semibold text-primary-foreground">{project.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-primary-foreground/80">
            <MapPin className="h-3.5 w-3.5" /> {project.location}
          </p>
        </div>
      </div>
      <div className="space-y-3 p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-navy">
          <CalendarDays className="h-4 w-4 text-gold-deep" /> Completed {project.completion}
        </p>
      </div>
    </article>
  );
}
