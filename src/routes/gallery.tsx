import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { useSite } from "@/store/SiteStore";
import { galleryFilters } from "@/data/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | uPVC Windows, Doors & Installations — SKYARTH" },
      {
        name: "description",
        content: "Photo gallery of SKYARTH uPVC windows, doors, sliding systems, factory production and on-site installations.",
      },
      { property: "og:title", content: "SKYARTH Gallery" },
      { property: "og:description", content: "Windows, doors, sliding systems, factory and installation photography." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { gallery } = useSite();
  const [active, setActive] = useState("All");
  const list = active === "All" ? gallery.items : gallery.items.filter((g) => g.category === active);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Gallery"
        title="Details worth looking at twice"
        subtitle="Product close-ups, completed façades, factory production and installation days."
      />
      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-wrap justify-center gap-3">
          {galleryFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === f
                  ? "gradient-gold text-navy-deep shadow-gold"
                  : "border border-border bg-card text-charcoal hover:border-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {list.map((g, i) => (
            <figure
              key={g.id}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl border border-border/70"
            >
              <img
                src={g.image}
                alt={`${g.title} — ${g.category}`}
                loading="lazy"
                width={1200}
                height={900}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                }`}
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-deep/90 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{g.category}</p>
                  <p className="mt-1 font-semibold text-primary-foreground">{g.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
