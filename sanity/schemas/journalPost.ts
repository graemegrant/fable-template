import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'journalPost',
  title: 'Journal',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'category', type: 'string',
      options: { list: ['The Glen', 'Garden', 'Provenance', 'Outdoors', 'House news'] },
    }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'publishedAt', type: 'date' }),
    defineField({ name: 'readingTime', type: 'string', description: 'e.g. "6 min read"' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({
      name: 'body', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', type: 'string' }] },
      ],
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imageAlt',
      title: 'Hero image alt text',
      type: 'string',
      description:
        'Describes the hero image for search engines and screen readers. Leave blank to fall back to the post title.',
    }),
    defineField({ name: 'featured', title: 'Feature at top of Journal', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'heroImage' } },
});
