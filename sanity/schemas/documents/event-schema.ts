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
      title: "Image",
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
      title: 'Start Date',
      name: 'startDate',
      type: 'datetime',
      group: 'event',
      validation: Rule => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      title: 'End Date',
      name: 'endDate',
      type: 'datetime',
      group: 'event',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
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
