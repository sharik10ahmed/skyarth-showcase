import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { hero as heroData, statistics as statsData, homeSections as sectionsData } from "@/data/hero";
import { products as productsData, type Product } from "@/data/products";
import { services as servicesData } from "@/data/services";
import { projects as projectsData } from "@/data/projects";
import { gallery as galleryData } from "@/data/gallery";
import { testimonials as testimonialsData } from "@/data/testimonials";
import { faqs as faqsData } from "@/data/faq";
import { about as aboutData, whyChooseUs as whyData, processSteps as processData } from "@/data/about";
import {
  company as companyData,
  navigation as navData,
  socials as socialsData,
  footerSettings as footerData,
  websiteSettings as websiteData,
  themeColors as themeData,
  adminProfile as profileData,
} from "@/data/settings";

type Collection<T> = {
  items: T[];
  add: (item: T) => void;
  update: (id: string, patch: Partial<T>) => void;
  remove: (id: string) => void;
  replace: (items: T[]) => void;
};

function useCollection<T extends { id: string }>(initial: T[]): Collection<T> {
  const [items, setItems] = useState<T[]>(initial);
  return useMemo(
    () => ({
      items,
      add: (item) => setItems((prev) => [{ ...item, id: item.id || `id-${Date.now()}` }, ...prev]),
      update: (id, patch) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i))),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      replace: setItems,
    }),
    [items],
  );
}

function useRecord<T extends object>(initial: T) {
  const [value, setValue] = useState<T>(initial);
  return useMemo(() => ({ value, update: (patch: Partial<T>) => setValue((p) => ({ ...p, ...patch })) }), [value]);
}

function createStore() {
  return null;
}

export type SiteStore = ReturnType<typeof useSiteStoreValue>;

function useSiteStoreValue() {
  const [authed, setAuthed] = useState(false);

  const hero = useRecord(heroData);
  const company = useRecord(companyData);
  const about = useRecord(aboutData);
  const footer = useRecord(footerData);
  const website = useRecord(websiteData);
  const profile = useRecord(profileData);

  const products = useCollection<Product>(productsData);
  const services = useCollection(servicesData);
  const projects = useCollection(projectsData);
  const gallery = useCollection(galleryData);
  const testimonials = useCollection(testimonialsData);
  const faqs = useCollection(faqsData);
  const stats = useCollection(statsData);
  const navigation = useCollection(navData);
  const socials = useCollection(socialsData);
  const sections = useCollection(sectionsData);
  const why = useCollection(whyData);
  const process = useCollection(processData);
  const theme = useCollection(themeData);

  const login = (username: string, password: string) => {
    const ok = username.trim() === "admin" && password === "admin123";
    if (ok) setAuthed(true);
    return ok;
  };

  return {
    authed,
    login,
    logout: () => setAuthed(false),
    hero,
    company,
    about,
    footer,
    website,
    profile,
    products,
    services,
    projects,
    gallery,
    testimonials,
    faqs,
    stats,
    navigation,
    socials,
    sections,
    why,
    process,
    theme,
  };
}

const SiteContext = createContext<SiteStore | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const value = useSiteStoreValue();
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
