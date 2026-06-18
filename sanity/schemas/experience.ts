import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'category', type: 'string',
      options: { list: ['Food & Drink', 'Outdoors', 'Wellness', 'Heritage'] },
    }),
    defineField({ name: 'description', type: 'text', rows: 5 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'duration', type: 'string', description: 'e.g. "2 hours", "Full day"' }),
    defineField({ name: 'price', type: 'string', description: 'e.g. "From £85 per person"' }),
    defineField({
      name: 'seasons', type: 'array', of: [{ type: 'string' }],
      options: { list: ['Spring', 'Summer', 'Autumn', 'Winter', 'Year round'] },
    }),
    defineField({ name: 'includes', title: "What's included", type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'heroImage' } },
});
