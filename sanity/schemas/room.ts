import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'room',
  title: 'Rooms',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'type', type: 'string',
      options: { list: ['Classic', 'Deluxe', 'Suite'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 5 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imageAlt',
      title: 'Hero image alt text',
      type: 'string',
      description:
        'Describes the hero image for search engines and screen readers. Leave blank to auto-generate from the room name and view.',
    }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'rate', title: 'Rate from (£/night)', type: 'number' }),
    defineField({ name: 'sqm', title: 'Size (sqm)', type: 'number' }),
    defineField({ name: 'occupancy', title: 'Max occupancy', type: 'number' }),
    defineField({ name: 'floor', type: 'string' }),
    defineField({ name: 'view', type: 'string' }),
    defineField({ name: 'amenities', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', title: 'Feature on homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'active', title: 'Bookable / visible', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'type', media: 'heroImage' } },
});
