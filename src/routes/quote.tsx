import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { ActionButton } from "@/components/ActionButton";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote | SKYARTH uPVC Windows & Doors" },
      {
        name: "description",
        content: "Request an itemised quotation for SKYARTH uPVC windows, doors and sliding systems. Response within 48 hours.",
      },
      { property: "og:title", content: "Request a uPVC Quote — SKYARTH" },
      { property: "og:description", content: "Share your requirement and receive an itemised quotation within 48 hours." },
    ],
  }),
  component: Quote,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "product" | "city", string>>;

function Quote() {
  const { products } = useSite();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    product: "",
    projectType: "Residential",
    quantity: "",
    details: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) next.phone = "Please enter a valid 10-digit phone number.";
    if (!form.product) next.product = "Please select a product category.";
    if (form.city.trim().length < 2) next.city = "Please enter your city.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Request Quote"
        title="Get an itemised quotation in 48 hours"
        subtitle="Tell us what you're building. We'll come back with profile options, glazing recommendations and transparent pricing."
      />

      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {sent ? (
            <div className="rounded-[2rem] border border-gold/50 bg-gold-soft p-12 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold-deep" />
              <h2 className="mt-6 text-2xl font-semibold text-navy-deep">Quote request received</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-charcoal">
                Thank you, {form.name}. A Skyarth project consultant will contact you on {form.phone} within one working
                day to schedule your site measurement.
              </p>
              <ActionButton variant="navy" className="mt-8" onClick={() => setSent(false)}>
                Submit Another Request
              </ActionButton>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="rounded-[2rem] border border-border/70 bg-card p-8 shadow-luxe lg:p-10">
              <h2 className="text-2xl font-semibold text-navy-deep">Project details</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" error={errors.name}>
                  <input value={form.name} onChange={set("name")} className={inputClass} placeholder="Your name" />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input value={form.email} onChange={set("email")} className={inputClass} placeholder="you@email.com" />
                </Field>
                <Field label="Phone *" error={errors.phone}>
                  <input value={form.phone} onChange={set("phone")} className={inputClass} placeholder="10-digit number" />
                </Field>
                <Field label="City *" error={errors.city}>
                  <input value={form.city} onChange={set("city")} className={inputClass} placeholder="Pune" />
                </Field>
                <Field label="Product Category *" error={errors.product}>
                  <select value={form.product} onChange={set("product")} className={inputClass}>
                    <option value="">Select a category</option>
                    {products.items.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Project Type">
                  <select value={form.projectType} onChange={set("projectType")} className={inputClass}>
                    {["Residential", "Villa", "Apartment", "Commercial", "Corporate", "Industrial", "Office"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Approx. Number of Openings">
                  <input value={form.quantity} onChange={set("quantity")} className={inputClass} placeholder="e.g. 14" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Additional Details">
                    <textarea
                      value={form.details}
                      onChange={set("details")}
                      rows={5}
                      className={inputClass}
                      placeholder="Sizes, glazing preference, timelines, site address"
                    />
                  </Field>
                </div>
              </div>
              <ActionButton type="submit" className="mt-8 w-full sm:w-auto">
                Submit Quote Request
              </ActionButton>
            </form>
          )}

          <aside className="space-y-6">
            <div className="rounded-[2rem] gradient-navy p-9 text-primary-foreground shadow-luxe">
              <h2 className="text-xl font-semibold">What happens next</h2>
              <ol className="mt-6 space-y-5 text-sm text-primary-foreground/75">
                {[
                  "A consultant reviews your requirement within one working day.",
                  "We schedule a free site measurement at your convenience.",
                  "You receive an itemised quotation with profile and glazing options.",
                  "On approval, manufacturing begins with a confirmed install date.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-gold text-[11px] font-bold text-navy-deep">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[2rem] border border-border/70 bg-card p-9">
              <h3 className="font-semibold text-navy-deep">Prefer to talk?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Call our Pune office on <span className="font-semibold text-navy">9945678901</span> between 9:30 AM and
                7:00 PM, Monday to Saturday.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputClass =
  "w-full rounded-2xl border border-input bg-background px-5 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/25";

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
