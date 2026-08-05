import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { SectionTitle } from "@/components/SectionTitle";
import { ActionButton } from "@/components/ActionButton";
import { useSite } from "@/store/SiteStore";
import commercial from "@/assets/commercial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SKYARTH | uPVC Window & Door Manufacturer in Pune" },
      {
        name: "description",
        content:
          "Learn about SKYARTH uPVC Windows LLP — our mission, vision, core values and in-house manufacturing capability in Kharadi, Pune.",
      },
      { property: "og:title", content: "About SKYARTH uPVC Windows LLP" },
      { property: "og:description", content: "Mission, vision and values behind Pune's premium uPVC fenestration brand." },
    ],
  }),
  component: About,
});

function About() {
  const { about, company, why } = useSite();

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="About Us"
        title="A fenestration company built by engineers, guided by architects"
        subtitle={company.value.description}
      />

      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <SectionTitle align="left" eyebrow="Company Overview" title="Precision is our design language" subtitle={about.value.overview} />
          <img
            src={commercial}
            alt="Modern commercial building with blue glass façade glazing"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full rounded-[2rem] object-cover shadow-luxe"
          />
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 lg:grid-cols-2 lg:px-10">
          {[
            { title: "Our Mission", text: about.value.mission },
            { title: "Our Vision", text: about.value.vision },
          ].map((b) => (
            <article key={b.title} className="hover-lift rounded-3xl border border-border/70 bg-card p-10">
              <h2 className="text-2xl font-semibold text-navy-deep">{b.title}</h2>
              <div className="mt-4 h-px w-16 gradient-gold" aria-hidden="true" />
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionTitle eyebrow="Core Values" title="What we refuse to compromise on" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.value.values.map((v) => (
            <article key={v.id} className="hover-lift rounded-3xl border border-border/70 bg-card p-8">
              <h3 className="text-lg font-semibold text-navy-deep">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad gradient-navy">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionTitle tone="dark" eyebrow="Why Skyarth" title="Nine standards behind every installation" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {why.items.map((w) => (
              <article
                key={w.id}
                className="rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/50"
              >
                <h3 className="text-base font-semibold text-gold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{w.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <ActionButton to="/quote">Request A Quote</ActionButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
