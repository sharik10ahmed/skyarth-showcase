import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ActionButton } from "@/components/ActionButton";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials | SKYARTH uPVC Windows LLP" },
      {
        name: "description",
        content: "Reviews from architects, developers and homeowners who chose SKYARTH uPVC windows and doors in Pune.",
      },
      { property: "og:title", content: "SKYARTH Client Testimonials" },
      { property: "og:description", content: "What architects, developers and homeowners say about working with SKYARTH." },
    ],
  }),
  component: Testimonials,
});

function Testimonials() {
  const { testimonials } = useSite();

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Testimonials"
        title="The verdict from the people who live with our work"
        subtitle="Architects, developers, facility managers and homeowners across Pune."
      />
      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <ActionButton to="/quote">Start Your Project</ActionButton>
        </div>
      </section>
    </SiteLayout>
  );
}
