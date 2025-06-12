import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Portrait Image',
      type: 'defaultImage',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'simpleText',
      description: 'One or two sentences about their background or teaching style.',
    }),
    defineField({
			name: 'social',
			title: 'Social Links',
			type: 'social',
		}),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})