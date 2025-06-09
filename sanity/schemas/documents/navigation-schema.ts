import { LinkIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

const navigation = defineType({
	type: 'document',
	name: 'navigation',
	title: 'Navigation',
	icon: LinkIcon,
	fields: [
		defineField({
			type: 'string',
			name: 'title',
      // readOnly: true,
		}),
		defineField({
			type: 'array',
			name: 'items',
			of: [
				{
					type: 'route',
				},
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			const { title } = selection
			return {
				title: title
			}
		},
	},
})

export default navigation
