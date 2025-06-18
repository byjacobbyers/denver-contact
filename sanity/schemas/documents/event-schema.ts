import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {
      title: 'Event Details',
      name: 'event',
      default: true,
    },
    {
      title: 'SEO & Settings',
      name: 'seo',
    },
  ],
  fields: [
    defineField({
      title: "Event Image (Not Flyer)",
      name: "image",
      type: "defaultImage",
      description: "Upload or select an image.",
      group: 'event',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'event',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      group: 'event',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Event Type',
      name: 'eventType',
      type: 'string',
      group: 'event',
      initialValue: 'series',
      options: {
        list: [
          { title: 'Series', value: 'series' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Jam / Practice', value: 'jam' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'Location',
      name: 'location',
      type: 'string',
      group: 'event',
    }),
    defineField({
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      group: 'event',
      validation: Rule => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      title: 'End Date',
      name: 'endDate',
      type: 'date',
      group: 'event',
      initialValue: () => new Date().toISOString(),
    }),
    // defineField({
    //   title: 'Pricing Details',
    //   name: 'pricing',
    //   type: 'simpleText',
    //   group: 'event',
    //   description: 'Describe early bird, regular, sliding scale, etc.',
    // }),
    // defineField({
    //   title: 'Registration Link or Instructions',
    //   name: 'registration',
    //   type: 'string',
    //   group: 'event',
    //   description: 'URL or note (e.g. "Venmo @username with note")',
    // }),
    // defineField({
    //   title: 'Guest Teachers',
    //   name: 'guestTeachers',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'person' }] }],
    //   group: 'event',
    // }),
    defineField({
      title: 'Event Flyer',
      name: 'flyer',
      type: 'file',
      group: 'event',
      options: {
        accept: '.pdf,.jpg,.jpeg,.png'
      }
    }),
    defineField({
      title: 'Page Content',
      name: 'content',
      type: 'simpleText',
      group: 'event',
    }),
    defineField({
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
    },
    prepare({ title, startDate }) {
      return {
        title,
        subtitle: startDate ? new Date(startDate).toLocaleDateString() : 'No date set',
      }
    },
  },
})
