import { Link } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";

import logo from "@/assets/skyarth-logo.png";

export type ModuleKey = string;

export function AdminSidebar({
  modules,
  active,
  onSelect,
  open,
  onClose,
}: {
  modules: { key: string; label: string; group: string }[];
  active: string;
  onSelect: (key: string) => void;
  open: boolean;
  onClose: () => void;
}) {
  const groups = Array.from(new Set(modules.map((m) => m.group)));

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-navy-deep/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-sidebar-border px-6 py-5">
          <Link to="/" className="rounded-xl bg-background px-3 py-2">
            <img src={logo} alt="SKYARTH logo" width={160} height={44} className="h-7 w-auto object-contain" />
          </Link>
          <button type="button" onClick={onClose} aria-label="Close sidebar" className="text-sidebar-foreground lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Admin modules">
          {groups.map((g) => (
            <div key={g} className="mb-6">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sidebar-primary">{g}</p>
              <ul className="space-y-1">
                {modules
                  .filter((m) => m.group === g)
                  .map((m) => (
                    <li key={m.key}>
                      <button
                        type="button"
                        onClick={() => onSelect(m.key)}
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                          active === m.key
                            ? "gradient-gold font-semibold text-navy-deep"
                            : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        {m.label}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export function AdminHeader({
  title,
  user,
  onMenu,
  onLogout,
}: {
  title: string;
  user: string;
  onMenu: () => void;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-background/90 px-5 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open sidebar"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-navy lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-navy">{title}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden text-sm text-muted-foreground sm:block">{user}</span>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-charcoal transition hover:border-gold hover:text-gold-deep"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </header>
  );
}
