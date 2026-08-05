import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox";
  options?: string[];
};

type Item = Record<string, unknown> & { id: string };

type Props = {
  title: string;
  description?: string;
  fields: Field[];
  items: Item[];
  filterKey?: string;
  onAdd: (item: Item) => void;
  onUpdate: (id: string, patch: Record<string, unknown>) => void;
  onRemove: (id: string) => void;
};

const input =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

export function CrudModule({ title, description, fields, items, filterKey, onAdd, onUpdate, onRemove }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Item | null>(null);
  const perPage = 6;

  const filterOptions = useMemo(
    () => (filterKey ? ["All", ...Array.from(new Set(items.map((i) => String(i[filterKey] ?? ""))))] : []),
    [items, filterKey],
  );

  const filtered = items.filter((i) => {
    const matchesQuery = fields.some((f) => String(i[f.key] ?? "").toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = !filterKey || filter === "All" || String(i[filterKey] ?? "") === filter;
    return matchesQuery && matchesFilter;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * perPage, current * perPage);

  const blank = () =>
    ({ id: `new-${Date.now()}`, ...Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? true : ""])) }) as Item;

  const save = (item: Item, isNew: boolean) => {
    if (isNew) onAdd(item);
    else onUpdate(item.id, item);
    setEditing(null);
  };

  return (
    <section>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-navy-deep">{title}</h1>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => setEditing(blank())}
          className="inline-flex shrink-0 items-center gap-2 rounded-full gradient-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search…"
            className={`${input} pl-11`}
          />
        </div>
        {filterKey ? (
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className={`${input} max-w-[220px]`}
          >
            {filterOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : null}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-secondary/70 text-xs uppercase tracking-[0.14em] text-navy">
            <tr>
              {fields.slice(0, 3).map((f) => (
                <th key={f.key} className="px-5 py-4 font-semibold">
                  {f.label}
                </th>
              ))}
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visible.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-secondary/40">
                {fields.slice(0, 3).map((f) => (
                  <td key={f.key} className="max-w-[280px] truncate px-5 py-4 text-charcoal">
                    {typeof item[f.key] === "boolean" ? (item[f.key] ? "Yes" : "No") : String(item[f.key] ?? "—")}
                  </td>
                ))}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(item)}
                      aria-label="Edit"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-navy transition hover:border-gold hover:text-gold-deep"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label="Delete"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-destructive transition hover:border-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                  No records found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Showing {visible.length} of {filtered.length} records
        </p>
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                current === i + 1 ? "gradient-navy text-primary-foreground" : "border border-border text-charcoal hover:border-gold"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {editing ? (
        <EditDialog
          item={editing}
          fields={fields}
          isNew={editing.id.startsWith("new-")}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      ) : null}
    </section>
  );
}

function EditDialog({
  item,
  fields,
  isNew,
  onClose,
  onSave,
}: {
  item: Item;
  fields: Field[];
  isNew: boolean;
  onClose: () => void;
  onSave: (item: Item, isNew: boolean) => void;
}) {
  const [draft, setDraft] = useState<Item>({ ...item });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/60 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-luxe">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <h2 className="truncate text-xl font-semibold text-navy-deep">{isNew ? "Add record" : "Edit record"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-navy">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy">{f.label}</span>
              {f.type === "textarea" ? (
                <textarea
                  rows={4}
                  className={input}
                  value={String(draft[f.key] ?? "")}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                />
              ) : f.type === "select" ? (
                <select
                  className={input}
                  value={String(draft[f.key] ?? "")}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                >
                  {(f.options ?? []).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : f.type === "checkbox" ? (
                <input
                  type="checkbox"
                  className="mt-2 h-5 w-5 accent-[oklch(0.79_0.129_85)]"
                  checked={Boolean(draft[f.key])}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.checked }))}
                />
              ) : (
                <input
                  className={input}
                  type={f.type === "number" ? "number" : "text"}
                  value={String(draft[f.key] ?? "")}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onSave(draft, isNew)}
            className="rounded-full gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-charcoal hover:border-gold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
