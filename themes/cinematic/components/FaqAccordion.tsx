'use client';

import { useState } from 'react';

/** Questions as a numbered index between hairlines; the open one is marked
 *  in the accent. */
export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-canvas/15">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-canvas/15">
          <h3 className="m-0">
            <button
              type="button"
              className="flex w-full items-start gap-5 py-6 text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className={`pt-1 font-mono text-xs ${open === i ? 'text-accentondark' : 'text-canvas/60'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 font-heading text-xl font-bold uppercase leading-tight text-canvas">{item.q}</span>
              <span aria-hidden className={`font-mono text-xl text-accentondark transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
          </h3>
          <div className={`overflow-hidden transition-max-height duration-500 ease-out-expo ${open === i ? 'max-h-60' : 'max-h-0'}`}>
            <p className="pb-6 pl-9 font-body text-base leading-relaxed text-canvas/80">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
