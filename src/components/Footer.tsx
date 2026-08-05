import { Link } from "@tanstack/react-router";
import { Lock, Mail, MapPin, Phone } from "lucide-react";

import logo from "@/assets/skyarth-logo.png.asset.json";
import { useSite } from "@/store/SiteStore";

export function Footer() {
  const { company, footer, socials, products } = useSite();

  const quickLinks = [
    { label: "Products", to: "/products" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Gallery", to: "/gallery" },
    { label: "FAQs", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 lg:grid-cols-4 lg:px-10 lg:py-20">
        <div className="space-y-5">
          <div className="inline-flex rounded-2xl bg-background/95 px-4 py-3">
            <img src={logo.url} alt="SKYARTH uPVC Windows logo" width={200} height={54} loading="lazy" className="h-9 w-auto object-contain" />
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/70">{footer.value.about}</p>
          <div className="flex flex-wrap gap-2">
            {socials.items.map((s) => (
              <a
                key={s.id}
                href={s.href}
                aria-label={s.label}
                className="rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium text-primary-foreground/80 transition-all duration-300 hover:border-gold hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</h3>
          <ul className="mt-6 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-primary-foreground/70 transition-colors duration-300 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product range">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Products</h3>
          <ul className="mt-6 space-y-3">
            {products.items.slice(0, 6).map((p) => (
              <li key={p.id}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-sm text-primary-foreground/70 transition-colors duration-300 hover:text-gold"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Get In Touch</h3>
          <ul className="mt-6 space-y-4 text-sm text-primary-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{company.value.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${company.value.phone}`} className="transition-colors hover:text-gold">
                {company.value.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${company.value.email}`} className="break-all transition-colors hover:text-gold">
                {company.value.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 lg:px-10">
          <p className="min-w-0 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} {footer.value.copyright}
          </p>
          <Link
            to="/admin"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-2 text-xs font-medium text-primary-foreground/75 transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <Lock className="h-3.5 w-3.5" /> Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
