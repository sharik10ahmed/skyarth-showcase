import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";

import logo from "@/assets/skyarth-logo.png.asset.json";
import { ActionButton } from "@/components/ActionButton";
import { useSite } from "@/store/SiteStore";

export function Navbar() {
  const { navigation, company } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/70 bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-10">
        <Link to="/" className="flex min-w-0 items-center" aria-label={`${company.value.name} home`}>
          <img
            src={logo.url}
            alt="SKYARTH uPVC Windows logo"
            width={220}
            height={60}
            className="h-9 w-auto object-contain sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {navigation.items.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-charcoal transition-colors duration-300 hover:text-gold-deep"
              activeProps={{ className: "text-gold-deep" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={`tel:${company.value.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold-deep"
          >
            <Phone className="h-4 w-4 text-gold-deep" /> {company.value.phone}
          </a>
          <ActionButton to="/quote" className="px-6 py-2.5">
            Request Quote
          </ActionButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-navy-deep transition-colors hover:border-gold xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`grid overflow-hidden border-t border-border/60 bg-background transition-all duration-400 xl:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-5 py-5" aria-label="Mobile">
            {navigation.items.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="rounded-xl px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-secondary hover:text-gold-deep"
                activeProps={{ className: "bg-secondary text-gold-deep" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <ActionButton to="/quote" className="mt-3 w-full">
              Request Quote
            </ActionButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
