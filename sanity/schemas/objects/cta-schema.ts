import { defineType, defineField } from 'sanity'
import { ShareIcon } from '@sanity/icons'

const cta = defineType({
	title: 'Call To Action',
	type: 'object',
	name: 'cta',
	icon: ShareIcon,
	fields: [
		defineField({
			title: 'Active?',
			name: 'active',
			type: 'boolean',
			description: 'If you want a call to action. Set to tue',
			initialValue: false,
		}),
		defineField({
			title: 'Route',
			name: 'route',
			type: 'route',
		}),
	],
	preview: {
		select: {
			active: 'active',
			title: 'route.title',
		},
		prepare(selection) {
			const { active, title } = selection
			return {
				title: `Call To Action - ${title}`,
				subtitle: `${active ? 'Active' : 'Not Active'}`,
			}
		},
	},
})

export default cta
