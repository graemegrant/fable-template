import Image from 'next/image';
import { PortableText as PT, type PortableTextComponents } from '@portabletext/react';
import { imgSrc } from '@/lib/sanity';

/** Styled renderer for Sanity portable text — journal posts and editorial bodies. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-body text-base font-light leading-[1.9] text-ink/85">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 font-heading text-3xl font-medium text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 font-heading text-2xl font-medium text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-gold pl-8 font-heading text-2xl font-medium italic leading-relaxed text-forest">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-forest underline decoration-gold underline-offset-4 transition-colors hover:text-gold"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-[3/2]">
          <Image src={imgSrc(value)} alt={value?.caption || ''} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
        {value?.caption && (
          <figcaption className="mt-3 font-body text-xs uppercase tracking-[0.2em] text-ink/50">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default function PortableText({ value }: { value: unknown }) {
  if (!value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PT value={value as any} components={components} />;
}
