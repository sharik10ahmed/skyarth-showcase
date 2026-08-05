import { useState, type ReactNode } from "react";

const input =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

export type RecordField = { key: string; label: string; type?: "text" | "textarea" | "checkbox" };

export function RecordForm({
  title,
  description,
  fields,
  value,
  onSave,
  extra,
}: {
  title: string;
  description?: string;
  fields: RecordField[];
  value: Record<string, unknown>;
  onSave: (patch: Record<string, unknown>) => void;
  extra?: ReactNode;
}) {
  const [draft, setDraft] = useState<Record<string, unknown>>({ ...value });
  const [saved, setSaved] = useState(false);

  return (
    <section>
      <h1 className="text-2xl font-bold text-navy-deep">{title}</h1>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(draft);
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2500);
        }}
        className="mt-6 rounded-3xl border border-border bg-card p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
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
                  value={String(draft[f.key] ?? "")}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                />
              )}
            </label>
          ))}
        </div>
        {extra}
        <div className="mt-8 flex items-center gap-4">
          <button type="submit" className="rounded-full gradient-gold px-6 py-2.5 text-sm font-semibold text-navy-deep">
            Save Changes
          </button>
          {saved ? <span className="text-sm font-medium text-gold-deep">Saved to session state.</span> : null}
        </div>
      </form>
    </section>
  );
}
