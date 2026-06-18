import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'headshot', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'department', type: 'string',
      options: { list: ['Management', 'Kitchen', 'Front of House', 'Housekeeping', 'Estate'] },
    }),
    defineField({ name: 'displayOrder', type: 'number' }),
  ],
  orderings: [
    { title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'headshot' } },
});
