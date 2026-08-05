import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { ActionButton } from "@/components/ActionButton";
import { SectionTitle } from "@/components/SectionTitle";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${title} | SKYARTH uPVC Windows & Doors` },
        {
          name: "description",
          content: `Specifications, applications, advantages and technical features of SKYARTH ${title.toLowerCase()} uPVC systems.`,
        },
        { property: "og:title", content: `${title} — SKYARTH uPVC` },
        { property: "og:description", content: `Premium ${title.toLowerCase()} manufactured and installed by SKYARTH, Pune.` },
      ],
    };
  },
  component: ProductDetail,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <PageHeader title="This product didn't load" subtitle={error.message} />
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHeader breadcrumb="404" title="Product not found" subtitle="The product you are looking for is not in our catalogue." />
    </SiteLayout>
  ),
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { products } = useSite();
  const product = products.items.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) throw notFound();

  const lists = [
    { title: "Applications", items: product.applications },
    { title: "Advantages", items: product.advantages },
    { title: "Technical Features", items: product.technicalFeatures },
    { title: "Benefits", items: product.benefits },
  ];

  return (
    <SiteLayout>
      <PageHeader breadcrumb={product.category} title={product.title} subtitle={product.short} />

      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <img
              src={product.gallery[activeImage] ?? product.image}
              alt={`${product.title} — view ${activeImage + 1}`}
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-luxe"
            />
            <div className="mt-5 grid grid-cols-3 gap-4">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                    i === activeImage ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={g} alt={`${product.title} thumbnail ${i + 1}`} loading="lazy" width={400} height={300} className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle align="left" eyebrow="Overview" title={product.title} subtitle={product.description} />
            <div className="mt-9 overflow-hidden rounded-3xl border border-border/70">
              <h3 className="gradient-navy px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                Specifications
              </h3>
              <dl className="divide-y divide-border">
                {product.specifications.map((s) => (
                  <div key={s.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 bg-card px-6 py-4">
                    <dt className="text-sm font-medium text-navy">{s.label}</dt>
                    <dd className="text-sm text-muted-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ActionButton to="/quote" className="mt-9">
              Request Quote For {product.title}
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {lists.map((l) => (
            <article key={l.title} className="hover-lift rounded-3xl border border-border/70 bg-card p-8">
              <h3 className="text-lg font-semibold text-navy-deep">{l.title}</h3>
              <div className="mt-4 h-px w-12 gradient-gold" aria-hidden="true" />
              <ul className="mt-5 space-y-3">
                {l.items.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
