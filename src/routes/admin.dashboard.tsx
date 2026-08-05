import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Boxes, FolderKanban, Images, MessageSquareQuote } from "lucide-react";

import { AdminHeader, AdminSidebar } from "@/admin/AdminChrome";
import { CrudModule } from "@/admin/CrudModule";
import { RecordForm } from "@/admin/RecordForm";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | SKYARTH uPVC Windows LLP" },
      { name: "description", content: "Manage SKYARTH website content: products, services, projects, gallery, testimonials and settings." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "SKYARTH Admin Dashboard" },
      { property: "og:description", content: "Frontend content management panel for the SKYARTH website." },
    ],
  }),
  component: Dashboard,
});

const modules = [
  { key: "dashboard", label: "Dashboard", group: "Overview" },
  { key: "hero", label: "Hero Banner", group: "Homepage" },
  { key: "stats", label: "Statistics", group: "Homepage" },
  { key: "sections", label: "Homepage Sections", group: "Homepage" },
  { key: "products", label: "Products", group: "Content" },
  { key: "services", label: "Services", group: "Content" },
  { key: "projects", label: "Projects", group: "Content" },
  { key: "gallery", label: "Gallery", group: "Content" },
  { key: "testimonials", label: "Testimonials", group: "Content" },
  { key: "faqs", label: "FAQs", group: "Content" },
  { key: "company", label: "Company Information", group: "Settings" },
  { key: "contact", label: "Contact Details", group: "Settings" },
  { key: "navigation", label: "Navigation", group: "Settings" },
  { key: "footer", label: "Footer", group: "Settings" },
  { key: "theme", label: "Theme Colors", group: "Settings" },
  { key: "website", label: "Website Settings", group: "Settings" },
  { key: "profile", label: "Profile", group: "Account" },
];

function Dashboard() {
  const site = useSite();
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!site.authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-deep">Session required</h1>
          <p className="mt-3 text-sm text-muted-foreground">Please sign in to access the SKYARTH admin dashboard.</p>
          <Link to="/admin" className="mt-8 inline-flex rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-navy-deep">
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  const label = modules.find((m) => m.key === active)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-secondary/40">
      <AdminSidebar
        modules={modules}
        active={active}
        onSelect={(k) => {
          setActive(k);
          setSidebarOpen(false);
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={label}
          user={site.profile.value.name}
          onMenu={() => setSidebarOpen(true)}
          onLogout={() => {
            site.logout();
            void navigate({ to: "/admin" });
          }}
        />
        <main className="flex-1 px-5 py-8 lg:px-8">
          <Module active={active} />
        </main>
      </div>
    </div>
  );
}

function Module({ active }: { active: string }) {
  const s = useSite();

  switch (active) {
    case "dashboard":
      return <Overview />;
    case "hero":
      return (
        <RecordForm
          title="Manage Hero Banner"
          description="Headline, description and call-to-action copy for the homepage hero."
          fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "heading", label: "Heading" },
            { key: "subheading", label: "Subheading", type: "textarea" },
          ]}
          value={s.hero.value}
          onSave={(patch) => s.hero.update(patch as never)}
        />
      );
    case "stats":
      return (
        <CrudModule
          title="Manage Statistics"
          description="Floating statistics displayed under the hero banner."
          fields={[
            { key: "value", label: "Value" },
            { key: "label", label: "Label" },
          ]}
          items={s.stats.items}
          onAdd={(i) => s.stats.add(i as never)}
          onUpdate={(id, p) => s.stats.update(id, p as never)}
          onRemove={s.stats.remove}
        />
      );
    case "sections":
      return (
        <CrudModule
          title="Manage Homepage Sections"
          description="Toggle which sections appear on the homepage."
          fields={[
            { key: "name", label: "Section" },
            { key: "key", label: "Key" },
            { key: "visible", label: "Visible", type: "checkbox" },
          ]}
          items={s.sections.items}
          onAdd={(i) => s.sections.add(i as never)}
          onUpdate={(id, p) => s.sections.update(id, p as never)}
          onRemove={s.sections.remove}
        />
      );
    case "products":
      return (
        <CrudModule
          title="Manage Products"
          description="Product categories shown across the website and product detail pages."
          filterKey="category"
          fields={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "slug", label: "Slug" },
            { key: "short", label: "Short Description", type: "textarea" },
            { key: "description", label: "Full Description", type: "textarea" },
          ]}
          items={s.products.items as never}
          onAdd={(i) => s.products.add({ gallery: [], specifications: [], applications: [], advantages: [], technicalFeatures: [], benefits: [], image: "", ...i } as never)}
          onUpdate={(id, p) => s.products.update(id, p as never)}
          onRemove={s.products.remove}
        />
      );
    case "services":
      return (
        <CrudModule
          title="Manage Services"
          fields={[
            { key: "title", label: "Title" },
            { key: "text", label: "Description", type: "textarea" },
            { key: "icon", label: "Icon" },
          ]}
          items={s.services.items}
          onAdd={(i) => s.services.add(i as never)}
          onUpdate={(id, p) => s.services.update(id, p as never)}
          onRemove={s.services.remove}
        />
      );
    case "projects":
      return (
        <CrudModule
          title="Manage Projects"
          filterKey="category"
          fields={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "location", label: "Location" },
            { key: "completion", label: "Completion" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
          items={s.projects.items as never}
          onAdd={(i) => s.projects.add({ image: "", ...i } as never)}
          onUpdate={(id, p) => s.projects.update(id, p as never)}
          onRemove={s.projects.remove}
        />
      );
    case "gallery":
      return (
        <CrudModule
          title="Manage Gallery"
          filterKey="category"
          fields={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
          ]}
          items={s.gallery.items as never}
          onAdd={(i) => s.gallery.add({ image: "", ...i } as never)}
          onUpdate={(id, p) => s.gallery.update(id, p as never)}
          onRemove={s.gallery.remove}
        />
      );
    case "testimonials":
      return (
        <CrudModule
          title="Manage Testimonials"
          fields={[
            { key: "name", label: "Name" },
            { key: "company", label: "Company" },
            { key: "location", label: "Location" },
            { key: "role", label: "Role" },
            { key: "initials", label: "Initials" },
            { key: "rating", label: "Rating", type: "number" },
            { key: "review", label: "Review", type: "textarea" },
          ]}
          items={s.testimonials.items as never}
          onAdd={(i) => s.testimonials.add({ rating: 5, ...i } as never)}
          onUpdate={(id, p) => s.testimonials.update(id, { ...p, rating: Number(p['rating'] ?? 5) } as never)}
          onRemove={s.testimonials.remove}
        />
      );
    case "faqs":
      return (
        <CrudModule
          title="Manage FAQs"
          filterKey="category"
          fields={[
            { key: "question", label: "Question" },
            { key: "category", label: "Category" },
            { key: "answer", label: "Answer", type: "textarea" },
          ]}
          items={s.faqs.items}
          onAdd={(i) => s.faqs.add(i as never)}
          onUpdate={(id, p) => s.faqs.update(id, p as never)}
          onRemove={s.faqs.remove}
        />
      );
    case "company":
      return (
        <RecordForm
          title="Manage Company Information"
          fields={[
            { key: "name", label: "Brand Name" },
            { key: "legalName", label: "Legal Name" },
            { key: "tagline", label: "Tagline" },
            { key: "description", label: "Business Description", type: "textarea" },
          ]}
          value={s.company.value}
          onSave={(p) => s.company.update(p as never)}
        />
      );
    case "contact":
      return (
        <RecordForm
          title="Manage Contact Details"
          fields={[
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "hours", label: "Working Hours" },
            { key: "mapLabel", label: "Map Label" },
            { key: "address", label: "Address", type: "textarea" },
          ]}
          value={s.company.value}
          onSave={(p) => s.company.update(p as never)}
        />
      );
    case "navigation":
      return (
        <CrudModule
          title="Manage Navigation"
          description="Primary navbar links."
          fields={[
            { key: "label", label: "Label" },
            { key: "to", label: "Path" },
          ]}
          items={s.navigation.items}
          onAdd={(i) => s.navigation.add(i as never)}
          onUpdate={(id, p) => s.navigation.update(id, p as never)}
          onRemove={s.navigation.remove}
        />
      );
    case "footer":
      return (
        <>
          <RecordForm
            title="Manage Footer"
            fields={[
              { key: "about", label: "Footer About Text", type: "textarea" },
              { key: "copyright", label: "Copyright Line" },
            ]}
            value={s.footer.value}
            onSave={(p) => s.footer.update(p as never)}
          />
          <div className="mt-12">
            <CrudModule
              title="Social Links"
              fields={[
                { key: "label", label: "Label" },
                { key: "href", label: "URL" },
              ]}
              items={s.socials.items}
              onAdd={(i) => s.socials.add(i as never)}
              onUpdate={(id, p) => s.socials.update(id, p as never)}
              onRemove={s.socials.remove}
            />
          </div>
        </>
      );
    case "theme":
      return (
        <CrudModule
          title="Manage Theme Colors (Mock)"
          description="Brand palette reference derived from the SKYARTH logo."
          fields={[
            { key: "name", label: "Color Name" },
            { key: "value", label: "Hex Value" },
          ]}
          items={s.theme.items}
          onAdd={(i) => s.theme.add(i as never)}
          onUpdate={(id, p) => s.theme.update(id, p as never)}
          onRemove={s.theme.remove}
        />
      );
    case "website":
      return (
        <RecordForm
          title="Manage Website Settings"
          fields={[
            { key: "siteTitle", label: "Meta Title" },
            { key: "metaDescription", label: "Meta Description", type: "textarea" },
            { key: "maintenanceMode", label: "Maintenance Mode", type: "checkbox" },
            { key: "showTestimonials", label: "Show Testimonials", type: "checkbox" },
            { key: "showGallery", label: "Show Gallery", type: "checkbox" },
          ]}
          value={s.website.value}
          onSave={(p) => s.website.update(p as never)}
        />
      );
    case "profile":
      return (
        <RecordForm
          title="Profile"
          description="Administrator account details (mock)."
          fields={[
            { key: "name", label: "Full Name" },
            { key: "username", label: "Username" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
          ]}
          value={s.profile.value}
          onSave={(p) => s.profile.update(p as never)}
        />
      );
    default:
      return <Overview />;
  }
}

function Overview() {
  const s = useSite();
  const widgets = [
    { label: "Products", value: s.products.items.length, icon: Boxes },
    { label: "Projects", value: s.projects.items.length, icon: FolderKanban },
    { label: "Gallery Items", value: s.gallery.items.length, icon: Images },
    { label: "Testimonials", value: s.testimonials.items.length, icon: MessageSquareQuote },
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold text-navy-deep">Welcome back, {s.profile.value.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Content overview for {s.company.value.legalName} — all changes are held in session state.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {widgets.map((w) => (
          <article key={w.label} className="rounded-3xl border border-border bg-card p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-soft">
              <w.icon className="h-5 w-5 text-navy" />
            </span>
            <p className="mt-6 text-3xl font-bold text-navy-deep">{w.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{w.label}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-navy-deep">Recent Products</h2>
          <ul className="mt-5 divide-y divide-border text-sm">
            {s.products.items.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                <span className="min-w-0 truncate text-charcoal">{p.title}</span>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs text-navy">{p.category}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-navy-deep">Brand Palette</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {s.theme.items.map((t) => (
              <li key={t.id} className="flex items-center gap-4">
                <span className="h-8 w-8 shrink-0 rounded-lg border border-border" style={{ backgroundColor: t.value }} />
                <span className="min-w-0 flex-1 truncate text-charcoal">{t.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{t.value}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
