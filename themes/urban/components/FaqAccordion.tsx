'use client';

import { useState } from 'react';

/** Questions as separate rounded cards; the open one turns sea glass. */
export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.q} className={`rounded-card transition-colors duration-300 ${open === i ? 'bg-accentondark/35' : 'bg-canvasalt'}`}>
          <h3 className="m-0">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-heading text-xl font-semibold text-primary">{item.q}</span>
              <span
                aria-hidden
                className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-canvas font-body text-lg text-accent transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </button>
          </h3>
          <div className={`overflow-hidden transition-max-height duration-500 ease-out-expo ${open === i ? 'max-h-60' : 'max-h-0'}`}>
            <p className="px-6 pb-6 font-body text-base leading-relaxed text-ink/85 sm:px-7">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
