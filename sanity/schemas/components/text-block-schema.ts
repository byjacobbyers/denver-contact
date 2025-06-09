import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

const textBlock = defineType({
	title: 'Text Block',
	type: 'object',
	icon: BlockContentIcon,
	name: 'textBlock',
	fields: [
		defineField({
			title: 'Active?',
			name: 'active',
			type: 'boolean',
			description:
				'Set to false if you need to remove from page but not delete',
			initialValue: true,
		}),
		defineField({
			title: 'Anchor Tag',
			name: 'anchor',
			type: 'string',
		}),
		defineField({
			title: 'Content Horizontal Alignment',
			name: 'contentAlignment',
			type: 'string',
			initialValue: 'left',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Center', value: 'center' },
					{ title: 'Right', value: 'right' },
				],
			},
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'normalText',
		}),
	],
	preview: {
		select: {
			active: 'active',
			text: 'content',
			alignment: 'contentAlignment',
		},
		prepare(selection) {
			const { text, alignment, active } = selection
			return {
				title: `Text`,
				subtitle: `${active ? 'Active' : 'Not Active'} - ${alignment}`,
			}
		},
	},
})

export default textBlock
