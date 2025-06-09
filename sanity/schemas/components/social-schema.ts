import { defineType, defineField } from 'sanity'

const social = defineType({
	title: 'Social',
	name: 'social',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		defineField({
			title: 'Facebook',
			name: 'facebook',
			type: 'url',
		}),
		defineField({
			title: 'LinkedIn',
			name: 'linkedin',
			type: 'url',
		}),
		defineField({
			title: 'Twitter',
			name: 'twitter',
			type: 'url',
		}),
		defineField({
			title: 'Instagram',
			name: 'instagram',
			type: 'url',
		}),
		defineField({
			title: 'YouTube',
			name: 'youtube',
			type: 'url',
		}),
		defineField({
			title: 'TikTok',
			name: 'tiktok',
			type: 'url',
		}),
	],
})

export default social
