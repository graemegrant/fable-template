import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'room',
  title: 'Rooms',
  type: 'document',
  fields: [
    defineField({
      name: 'roomType',
      title: 'Room type',
      type: 'localeString',
      description:
        'The primary listing name — free text, not a fixed list, since it must fit whatever room categories the client actually sells (e.g. "Garden Suite", "Loch View Suite"). For a client who genuinely wants individually-named rooms instead of categories, just put the room’s proper name here (e.g. "The Wallace Room") and leave Room count blank/1 — no separate mode, it’s the same field either way.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Individual room name (optional)',
      type: 'localeString',
      description:
        'Only needed alongside Room type if this specific physical room also has its own name distinct from its category (e.g. Room type "Garden Suite", name "The Rose Room"). Leave blank for both the typical category-based case and the named-room case above — in the named-room case the proper name already lives in Room type, so this field is redundant.',
    }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'roomType.en' }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imageAlt',
      title: 'Hero image alt text',
      type: 'localeString',
      description:
        'Describes the hero image for search engines and screen readers. Leave blank to auto-generate from the room name and view.',
    }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'rate', title: 'Rate from (£/night)', type: 'number' }),
    defineField({ name: 'sqm', title: 'Size (sqm)', type: 'number' }),
    defineField({ name: 'occupancy', title: 'Max occupancy', type: 'number' }),
    defineField({ name: 'floor', type: 'string' }),
    defineField({ name: 'view', type: 'string' }),
    defineField({ name: 'amenities', type: 'array', of: [{ type: 'localeString' }] }),
    defineField({
      name: 'roomCount',
      title: 'Room count',
      type: 'number',
      description:
        'How many physical rooms exist in this category — display copy only (e.g. "6 Garden Suites available"), shown when greater than 1. Never drives availability or the booking flow; that stays the booking engine’s job. Leave blank or 1 for a genuinely one-of-a-kind named room.',
      validation: (r) => r.integer().min(1),
    }),
    defineField({ name: 'featured', title: 'Feature on homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'active', title: 'Bookable / visible', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'roomType.en', subtitle: 'name.en', media: 'heroImage' } },
});
