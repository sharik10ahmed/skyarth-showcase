import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "uPVC Products | Windows, Doors & Sliding Systems — SKYARTH" },
      {
        name: "description",
        content:
          "Explore SKYARTH uPVC product categories: casement, sliding, French, fixed and tilt & turn windows plus sliding, openable and lift & slide doors.",
      },
      { property: "og:title", content: "uPVC Products by SKYARTH" },
      { property: "og:description", content: "Nine engineered uPVC window and door categories with custom geometry and finishes." },
    ],
  }),
  component: Products,
});

function Products() {
  const { products } = useSite();
  const categories = ["All", ...Array.from(new Set(products.items.map((p) => p.category)))];
  const [active, setActive] = useState("All");

  const list = active === "All" ? products.items : products.items.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Products"
        title="Engineered uPVC systems for every opening"
        subtitle="Each category is manufactured in-house with certified profiles, galvanised reinforcement and premium multi-point hardware."
      />
      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
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
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
