'use client';

import { useState } from 'react';

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-heading text-xl font-medium text-ink">{item.q}</span>
            <span className={`shrink-0 font-body text-xl text-gold transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          <div className={`overflow-hidden transition-max-height duration-500 ease-out-expo ${open === i ? 'max-h-60' : 'max-h-0'}`}>
            <p className="pb-7 font-body text-sm font-light leading-relaxed text-ink/75">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
