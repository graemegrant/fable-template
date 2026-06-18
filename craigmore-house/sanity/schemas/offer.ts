import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'offer',
  title: 'Special Offers',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
    defineField({ name: 'tag', type: 'string', description: 'e.g. "Most popular", "Seasonal"' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'inclusions', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'validFrom', type: 'date' }),
    defineField({ name: 'validUntil', type: 'date' }),
    defineField({ name: 'type', type: 'string', options: { list: ['Stay', 'Seasonal', 'Occasion', 'Dining'] } }),
  ],
  preview: { select: { title: 'title', subtitle: 'tag', media: 'image' } },
});
