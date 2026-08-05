import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { FaqList } from "@/components/FaqList";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Warranty, Pricing & Installation — SKYARTH uPVC" },
      {
        name: "description",
        content:
          "Answers to common questions about SKYARTH uPVC warranty, pricing, installation timelines, maintenance, customization and delivery.",
      },
      { property: "og:title", content: "SKYARTH uPVC — Frequently Asked Questions" },
      { property: "og:description", content: "Warranty, pricing, installation, maintenance, customization and delivery answers." },
    ],
  }),
  component: Faq,
});

function Faq() {
  const { faqs } = useSite();
  const categories = ["All", ...Array.from(new Set(faqs.items.map((f) => f.category)))];
  const [active, setActive] = useState("All");
  const list = active === "All" ? faqs.items : faqs.items.filter((f) => f.category === active);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="FAQ"
        title="Frequently asked questions"
        subtitle="Everything about warranty, pricing, installation, maintenance, customization and delivery."
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
        <div className="mt-14">
          <FaqList key={active} faqs={list} />
        </div>
      </section>
    </SiteLayout>
  );
}
