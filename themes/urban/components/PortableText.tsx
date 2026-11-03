import Image from 'next/image';
import { PortableText as PT, type PortableTextComponents } from '@portabletext/react';
import { imgSrc } from '@/lib/image';

/** Coastal renderer for Sanity portable text: journal posts and editorial
 *  bodies. Pull quotes sit on a sea-glass card; photos are rounded. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 font-body text-lg leading-body text-ink/85">{children}</p>,
    h2: ({ children }) => <h2 className="mb-5 mt-12 font-heading text-3xl font-semibold text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-10 font-heading text-2xl font-semibold text-primary">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 rounded-card bg-accentondark/35 px-8 py-7 font-heading text-2xl italic leading-relaxed text-primary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-medium text-accent underline decoration-accentondark decoration-2 underline-offset-4 transition-colors hover:text-primary"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-wide overflow-hidden rounded-card">
          <Image src={imgSrc(value)} alt={value?.caption || ''} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
        {value?.caption && <figcaption className="mt-3 px-2 font-body text-sm italic text-ink/75">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export default function PortableText({ value }: { value: unknown }) {
  if (!value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PT value={value as any} components={components} />;
}
