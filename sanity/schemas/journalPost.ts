import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Journal posts follow a three-part matrix (stories / what's on / in our
 * neighbourhood). Codero's blog production (codero-ops lib/blog) pushes
 * approved posts here as Studio drafts with `section`, `events`,
 * `expiresAt`, `cta` and the SEO overrides set — a person adds the hero
 * image and presses Publish.
 */

export default defineType({
  name: 'journalPost',
  title: 'Journal',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.en' }, validation: (r) => r.required() }),
    defineField({
      name: 'category', type: 'string',
      options: { list: ['The Glen', 'Garden', 'Provenance', 'Outdoors', 'House news'] },
    }),
    defineField({
      name: 'section',
      title: 'Journal section',
      type: 'string',
      options: {
        list: [
          { title: 'Story', value: 'story' },
          { title: "What's on", value: 'event' },
          { title: 'In our neighbourhood', value: 'neighbourhood' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'story',
    }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'publishedAt', type: 'date' }),
    defineField({ name: 'readingTime', type: 'localeString', description: 'e.g. "6 min read"' }),
    defineField({ name: 'excerpt', type: 'localeText' }),
    defineField({ name: 'body', type: 'localeBlockContent' }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      description: "For What's on posts: each event gets Event structured data on the page.",
      hidden: ({ document }) => document?.section !== 'event',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'journalEvent',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'startDate', type: 'date', validation: (r) => r.required() }),
            defineField({ name: 'endDate', type: 'date' }),
            defineField({ name: 'venue', type: 'string' }),
            defineField({ name: 'url', title: 'Event website', type: 'url' }),
          ],
          preview: { select: { title: 'name', subtitle: 'startDate' } },
        }),
      ],
    }),
    defineField({
      name: 'expiresAt',
      title: 'Hide from journal list after',
      type: 'date',
      description: 'For time-bound posts. The post drops off the journal index after this date; its page stays live.',
    }),
    defineField({
      name: 'cta',
      title: 'Booking call to action',
      type: 'object',
      description: 'Shown under the post. Leave blank for none.',
      fields: [
        defineField({ name: 'label', type: 'localeString' }),
        defineField({ name: 'url', type: 'string', description: 'Path ("/rooms") or full booking-engine URL' }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (optional)',
      type: 'string',
      description: 'Overrides the post title in search results. Max 60 characters.',
      validation: (r) => r.max(60).warning(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description (optional)',
      type: 'text',
      rows: 2,
      description: 'Overrides the excerpt in search results. 120–155 characters.',
      validation: (r) => r.max(160).warning(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required().error('Add a hero image before publishing'),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Hero image alt text',
      type: 'localeString',
      description:
        'Describes the hero image for search engines and screen readers. Leave blank to fall back to the post title.',
    }),
    defineField({ name: 'featured', title: 'Feature at top of Journal', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'section', media: 'heroImage' } },
});
