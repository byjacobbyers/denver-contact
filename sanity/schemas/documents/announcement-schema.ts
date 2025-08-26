import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  groups: [
    {
      title: 'Announcement Details',
      name: 'announcement',
      default: true,
    },
    {
      title: 'Link Settings',
      name: 'link',
    },
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'announcement',
      hidden: true,
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'simpleText',
      group: 'announcement',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      group: 'announcement',
      validation: Rule => Rule.required(),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      title: 'End Date',
      name: 'endDate',
      type: 'date',
      group: 'announcement',
      validation: Rule => Rule.required(),
      initialValue: () => {
        const date = new Date()
        date.setDate(date.getDate() + 7) // Default to 7 days from now
        return date.toISOString().split('T')[0]
      },
    }),
    defineField({
      title: 'Make Clickable',
      name: 'isClickable',
      type: 'boolean',
      group: 'link',
      description: 'Enable this to make the announcement a clickable link',
      initialValue: false,
    }),
    defineField({
      title: 'Route',
      name: 'route',
      type: 'route',
      group: 'link',
      description: 'Where should the announcement link to?',
      hidden: ({ document }) => !document?.isClickable,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      isClickable: 'isClickable',
    },
    prepare({ title, startDate, endDate, isClickable }) {
      const start = startDate ? new Date(startDate).toLocaleDateString() : 'No start date'
      const end = endDate ? new Date(endDate).toLocaleDateString() : 'No end date'
      const linkStatus = isClickable ? ' (Clickable)' : ''
      
      return {
        title: title || 'Announcement',
        subtitle: `${start} - ${end}${linkStatus}`,
      }
    },
  },
})
