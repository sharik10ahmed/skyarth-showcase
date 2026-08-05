import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PageHeader, SiteLayout } from "@/layouts/SiteLayout";
import { ActionButton } from "@/components/ActionButton";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SKYARTH uPVC Windows LLP | Kharadi, Pune" },
      {
        name: "description",
        content:
          "Contact SKYARTH uPVC Windows LLP at Office No.113, Tower B, City Vista, Kharadi, Pune – 411014. Call 9945678901 or email support@skyarthupvc.com.",
      },
      { property: "og:title", content: "Contact SKYARTH uPVC Windows LLP" },
      { property: "og:description", content: "Visit, call or email our Kharadi, Pune office for uPVC window and door enquiries." },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

function Contact() {
  const { company } = useSite();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) next.phone = "Please enter a valid 10-digit phone number.";
    if (form.message.trim().length < 10) next.message = "Please tell us a little more (min 10 characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const details = [
    { icon: MapPin, label: "Office Address", value: company.value.address },
    { icon: Phone, label: "Phone", value: company.value.phone, href: `tel:${company.value.phone}` },
    { icon: Mail, label: "Email", value: company.value.email, href: `mailto:${company.value.email}` },
    { icon: Clock, label: "Working Hours", value: company.value.hours },
  ];

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb="Contact"
        title="Let's talk about your openings"
        subtitle="Share your drawings, sizes or simply your questions — our team responds within one working day."
      />

      <section className="section-pad mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="space-y-6">
            {details.map((d) => (
              <article key={d.label} className="hover-lift flex gap-5 rounded-3xl border border-border/70 bg-card p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-soft">
                  <d.icon className="h-5 w-5 text-navy" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="mt-2 block break-words text-sm text-charcoal hover:text-gold-deep">
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-charcoal">{d.value}</p>
                  )}
                </div>
              </article>
            ))}

            <div className="grid aspect-[4/3] place-items-center rounded-3xl border border-dashed border-gold/50 bg-navy-soft/60 text-center">
              <div className="px-6">
                <MapPin className="mx-auto h-8 w-8 text-gold-deep" />
                <p className="mt-4 font-semibold text-navy-deep">Google Map Placeholder</p>
                <p className="mt-1 text-sm text-muted-foreground">{company.value.mapLabel}</p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="rounded-[2rem] border border-border/70 bg-card p-8 shadow-luxe lg:p-10">
            <h2 className="text-2xl font-semibold text-navy-deep">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">All fields marked with * are required.</p>

            {sent ? (
              <p className="mt-6 rounded-2xl border border-gold/50 bg-gold-soft px-5 py-4 text-sm text-navy-deep">
                Thank you — your enquiry has been recorded. Our team will call you shortly.
              </p>
            ) : null}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name *" error={errors.name}>
                <input value={form.name} onChange={set("name")} className={inputClass} placeholder="Your name" />
              </Field>
              <Field label="Email Address *" error={errors.email}>
                <input value={form.email} onChange={set("email")} className={inputClass} placeholder="you@email.com" />
              </Field>
              <Field label="Phone Number *" error={errors.phone}>
                <input value={form.phone} onChange={set("phone")} className={inputClass} placeholder="10-digit number" />
              </Field>
              <Field label="Subject">
                <input value={form.subject} onChange={set("subject")} className={inputClass} placeholder="Project enquiry" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message *" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    rows={5}
                    className={inputClass}
                    placeholder="Tell us about your project, sizes or timelines"
                  />
                </Field>
              </div>
            </div>

            <ActionButton type="submit" className="mt-8 w-full sm:w-auto">
              Send Enquiry
            </ActionButton>
          </form>
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
