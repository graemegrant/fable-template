import Image from 'next/image';
import { PortableText as PT, type PortableTextComponents } from '@portabletext/react';
import { imgSrc } from '@/lib/image';

/** Urban renderer for Sanity portable text: journal posts and editorial
 *  bodies. Condensed uppercase subheads, pull quotes ruled in the accent,
 *  square photos with mono captions. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 font-body text-lg leading-body text-canvas/85">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-condensed mb-5 mt-14 font-heading text-4xl font-extrabold uppercase leading-none text-canvas">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mb-4 mt-10 font-heading text-xl font-bold uppercase text-canvas">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-12 border-l-2 border-accentondark pl-6 font-heading text-3xl font-semibold leading-tight text-canvas">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-canvas underline decoration-accentondark decoration-2 underline-offset-4 transition-colors hover:text-accentondark"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        <div className="relative aspect-wide">
          <Image src={imgSrc(value)} alt={value?.caption || ''} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
        {value?.caption && <figcaption className="mt-3 font-mono text-xs uppercase tracking-18 text-canvas/70">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export default function PortableText({ value }: { value: unknown }) {
  if (!value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PT value={value as any} components={components} />;
}
