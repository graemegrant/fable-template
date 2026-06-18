import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'guestName', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'quote', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'rating', type: 'number', validation: (r) => r.min(1).max(5) }),
    defineField({ name: 'roomStayed', type: 'string' }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'source', type: 'string', options: { list: ['Guest book', 'Direct review', 'Google', 'TripAdvisor'] } }),
    defineField({ name: 'featured', title: 'Show on homepage', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'guestName', subtitle: 'roomStayed' } },
});
