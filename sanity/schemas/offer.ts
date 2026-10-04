import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'offer',
  title: 'Special Offers',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.en' }, validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({ name: 'tag', type: 'localeString', description: 'e.g. "Most popular", "Seasonal"' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'inclusions', type: 'array', of: [{ type: 'localeString' }] }),
    defineField({
      name: 'validFrom', type: 'date',
      description: 'When the offer applies from. Display only — the offer is shown before this date so it can be promoted in advance.',
    }),
    defineField({
      name: 'validUntil', type: 'date',
      description: 'Last day of the offer. It disappears from the site automatically after this date (within the hour). Leave empty for an ongoing offer.',
    }),
    defineField({ name: 'type', type: 'string', options: { list: ['Stay', 'Seasonal', 'Occasion', 'Dining'] } }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'tag.en', media: 'image' } },
});
