import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { SectionTitle } from "@/components/SectionTitle";
import { ActionButton } from "@/components/ActionButton";
import { useSite } from "@/store/SiteStore";
import installation from "@/assets/installation.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Manufacturing, Fabrication & Installation — SKYARTH" },
      {
        name: "description",
        content:
          "SKYARTH offers uPVC manufacturing, fabrication, installation, site consultation, custom design, maintenance support and AMC services in Pune.",
      },
      { property: "og:title", content: "SKYARTH uPVC Services" },
      { property: "og:description", content: "End-to-end uPVC fenestration services handled entirely in-house." },
    ],
  }),
  component: Services,
});

function Services() {
  const { services, process } = useSite();

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Services"
        title="Everything handled in-house, nothing left to chance"
        subtitle="Consultation, manufacturing, fabrication, installation and lifetime support delivered by one accountable Skyarth team."
      />

      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <article key={s.id} className="hover-lift group rounded-3xl border border-border/70 bg-card p-8">
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-navy-soft text-sm font-bold text-navy transition-colors group-hover:gradient-gold group-hover:text-navy-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-lg font-semibold text-navy-deep">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
          <img
            src={installation}
            alt="SKYARTH installation crew fitting a uPVC window on site"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full rounded-[2rem] object-cover shadow-luxe"
          />
          <div>
            <SectionTitle align="left" eyebrow="Working Process" title="Seven steps, zero surprises" />
            <ol className="mt-10 space-y-6 border-l border-gold/40 pl-8">
              {process.items.map((step) => (
                <li key={step.id} className="relative">
                  <span className="absolute -left-[2.6rem] grid h-8 w-8 place-items-center rounded-full gradient-gold text-[11px] font-bold text-navy-deep">
                    {step.step}
                  </span>
                  <h3 className="font-semibold text-navy-deep">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
            <ActionButton to="/quote" variant="navy" className="mt-10">
              Book A Site Consultation
            </ActionButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
