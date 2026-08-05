import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { useSite } from "@/store/SiteStore";
import { projectCategories } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects Portfolio | SKYARTH uPVC Windows & Doors, Pune" },
      {
        name: "description",
        content:
          "Browse SKYARTH's completed residential, commercial, industrial, villa, apartment and office uPVC fenestration projects across Pune.",
      },
      { property: "og:title", content: "SKYARTH Projects Portfolio" },
      { property: "og:description", content: "Villas, towers, corporate parks and industrial units delivered by SKYARTH." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const { projects } = useSite();
  const [active, setActive] = useState("All");
  const list = active === "All" ? projects.items : projects.items.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Projects"
        title="A portfolio measured in silence, light and longevity"
        subtitle="Every project below was measured, manufactured and installed by Skyarth's own teams."
      />
      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-wrap justify-center gap-3">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === c
                  ? "gradient-gold text-navy-deep shadow-gold"
                  : "border border-border bg-card text-charcoal hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">No projects in this category yet.</p>
        ) : null}
      </section>
    </SiteLayout>
  );
}
