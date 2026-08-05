import { useState } from "react";
import { Plus } from "lucide-react";

type Faq = { id: string; question: string; answer: string; category: string };

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors duration-300 hover:border-gold/60"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 text-left"
            >
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                  {faq.category}
                </span>
                <span className="mt-1 block font-semibold text-navy-deep">{faq.question}</span>
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-gold-deep transition-transform duration-300 ${open ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
