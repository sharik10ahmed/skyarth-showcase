import type { ReactNode } from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ title, subtitle, breadcrumb }: { title: string; subtitle?: string; breadcrumb?: string }) {
  return (
    <section className="relative overflow-hidden gradient-navy">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, color-mix(in oklab, var(--gold) 45%, transparent), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        {breadcrumb ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold">{breadcrumb}</p>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/75">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
