import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { UserIcon } from '@sanity/icons'

export default defineType({
	name: 'review',
	title: 'Review',
	type: 'document',
	icon: UserIcon,
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: 'review' }),
		defineField({
			name: 'image',
			type: 'defaultImage',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'name',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'title',
			image: 'image',
		},
		prepare({ title, subtitle, image }) {
			return {
				title,
				subtitle,
				media: image,
			}
		},
	},
})