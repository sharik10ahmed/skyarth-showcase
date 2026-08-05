import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { SiteLayout } from "@/layouts/SiteLayout";
import { SectionTitle } from "@/components/SectionTitle";
import { ActionButton } from "@/components/ActionButton";
import { ProductCard } from "@/components/ProductCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FaqList } from "@/components/FaqList";
import { useSite } from "@/store/SiteStore";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKYARTH uPVC Windows & Doors | Premium Fenestration, Pune" },
      {
        name: "description",
        content:
          "SKYARTH uPVC Windows LLP manufactures, fabricates and installs premium uPVC windows, doors and sliding systems for villas, apartments and commercial projects in Pune.",
      },
      { property: "og:title", content: "SKYARTH uPVC Windows & Doors | Premium Fenestration, Pune" },
      {
        property: "og:description",
        content: "Energy-efficient, weather-resistant uPVC windows, doors and sliding systems engineered in Pune.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { hero, stats, about, products, why, services, projects, process, testimonials, faqs, sections } = useSite();
  const visible = (key: string) => sections.items.find((s) => s.key === key)?.visible !== false;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hero.value.image}
          alt="Luxury modern villa with full-height uPVC glass windows and sliding doors at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy/40" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 15%, color-mix(in oklab, var(--gold) 40%, transparent), transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-40 pt-24 lg:px-10 lg:pb-52 lg:pt-36">
          <p className="inline-flex items-center gap-2 rounded-full glass-panel px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> {hero.value.eyebrow}
          </p>
          <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
            {hero.value.heading.split("for")[0]}
            <span className="text-gradient-gold"> for{hero.value.heading.split("for")[1]}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
            {hero.value.subheading}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ActionButton to={hero.value.primaryCta.to}>{hero.value.primaryCta.label}</ActionButton>
            <ActionButton
              to={hero.value.secondaryCta.to}
              variant="outline"
              className="text-primary-foreground hover:text-primary-foreground"
            >
              {hero.value.secondaryCta.label}
            </ActionButton>
          </div>
        </div>
      </section>

      {/* FLOATING STATS */}
      {visible("stats") ? (
        <section className="relative z-10 mx-auto -mt-28 max-w-[1400px] px-5 lg:-mt-32 lg:px-10">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 shadow-luxe sm:grid-cols-2 lg:grid-cols-4">
            {stats.items.map((s) => (
              <div key={s.id} className="bg-card/95 p-8 text-center backdrop-blur-xl transition-colors hover:bg-secondary">
                <p className="text-4xl font-bold text-gradient-gold">{s.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ABOUT PREVIEW */}
      {visible("about") ? (
        <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative">
              <img
                src={factoryImg}
                alt="SKYARTH uPVC manufacturing facility in Pune"
                loading="lazy"
                width={1200}
                height={900}
                className="w-full rounded-[2rem] object-cover shadow-luxe"
              />
              <div className="absolute -bottom-8 -right-4 hidden rounded-3xl gradient-navy p-8 shadow-luxe sm:block lg:-right-8">
                <p className="text-3xl font-bold text-gradient-gold">ISO</p>
                <p className="mt-1 max-w-[9rem] text-xs uppercase tracking-[0.16em] text-primary-foreground/70">
                  Quality-certified fabrication
                </p>
              </div>
            </div>
            <div>
              <SectionTitle
                align="left"
                eyebrow="About Skyarth"
                title="Engineering the quiet luxury of a perfectly fitted window"
                subtitle={about.value.overview}
              />
              <ul className="mt-8 space-y-3">
                {about.value.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-charcoal">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                    {h}
                  </li>
                ))}
              </ul>
              <ActionButton to="/about" variant="navy" className="mt-9">
                Discover Our Story <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </div>
          </div>
        </section>
      ) : null}

      {/* PRODUCTS */}
      {visible("products") ? (
        <section className="section-pad bg-secondary/60">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <SectionTitle
              eyebrow="Product Categories"
              title="A complete uPVC system for every opening"
              subtitle="Nine engineered categories, each available in custom geometry, glazing and finish."
            />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.items.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <ActionButton to="/products" variant="navy">
                View All Products <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </div>
          </div>
        </section>
      ) : null}

      {/* WHY CHOOSE US */}
      {visible("why") ? (
        <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Performance you feel every single day"
            subtitle="Nine reasons architects and homeowners specify Skyarth systems by name."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {why.items.map((w, i) => (
              <article
                key={w.id}
                className="hover-lift group rounded-3xl border border-border/70 bg-card p-8 transition-colors hover:border-gold/60"
              >
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-navy-soft text-sm font-bold text-navy transition-colors group-hover:gradient-gold group-hover:text-navy-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-navy-deep">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* SERVICES */}
      {visible("services") ? (
        <section className="section-pad gradient-navy">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <SectionTitle
              tone="dark"
              eyebrow="Our Services"
              title="One accountable team, end to end"
              subtitle="From the first site visit to annual maintenance — nothing is outsourced."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.items.map((s) => (
                <article
                  key={s.id}
                  className="rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 p-7 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-primary-foreground/10"
                >
                  <h3 className="text-lg font-semibold text-primary-foreground">{s.title}</h3>
                  <div className="mt-4 h-px w-10 gradient-gold" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* PROJECTS */}
      {visible("projects") ? (
        <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionTitle
            eyebrow="Featured Projects"
            title="Delivered across Pune's finest addresses"
            subtitle="Villas, towers, corporate parks and industrial units — engineered and installed by Skyarth."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.items.slice(0, 6).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <ActionButton to="/projects" variant="navy">
              Explore Portfolio <ArrowRight className="h-4 w-4" />
            </ActionButton>
          </div>
        </section>
      ) : null}

      {/* PROCESS */}
      {visible("process") ? (
        <section className="section-pad bg-secondary/60">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <SectionTitle
              eyebrow="Working Process"
              title="Seven disciplined steps from enquiry to handover"
            />
            <ol className="relative mt-16 space-y-10 border-l border-gold/40 pl-8 lg:mx-auto lg:max-w-4xl">
              {process.items.map((step) => (
                <li key={step.id} className="relative">
                  <span className="absolute -left-[2.6rem] grid h-8 w-8 place-items-center rounded-full gradient-gold text-[11px] font-bold text-navy-deep">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-navy-deep">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* TESTIMONIALS */}
      {visible("testimonials") ? (
        <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionTitle eyebrow="Testimonials" title="Trusted by architects, developers and homeowners" />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.items.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {visible("faq") ? (
        <section className="section-pad bg-secondary/60">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <SectionTitle eyebrow="FAQ" title="Answers before you ask" />
            <div className="mt-14">
              <FaqList faqs={faqs.items.slice(0, 5)} />
            </div>
            <div className="mt-10 text-center">
              <Link to="/faq" className="text-sm font-semibold text-gold-deep hover:underline">
                See all questions
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      {visible("cta") ? (
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-navy px-8 py-16 text-center shadow-luxe lg:px-20">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 120%, color-mix(in oklab, var(--gold) 50%, transparent), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold text-primary-foreground sm:text-4xl">
                Ready to specify windows that outlive the building?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm text-primary-foreground/75">
                Share your drawings or opening sizes and receive an itemised quotation within 48 hours.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <ActionButton to="/quote">Request Quote</ActionButton>
                <ActionButton to="/contact" variant="outline" className="text-primary-foreground">
                  Talk To An Expert
                </ActionButton>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </SiteLayout>
  );
}
