import { defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineField({
	title: 'Image',
	name: 'defaultImage',
	type: 'image',
	icon: ImageIcon,
	description:
		'Be meaningful with your image names. No screenshot_01.png. Keep file sizes small and under 400kb. Rough estimates for image widths are as follows: 2400px wide fullscreen, 1200px wide half screen, 800px wide quarter screen and 400px wide for small images.',
	options: {
		hotspot: true,
		metadata: ['lqip', 'palette', 'exif', 'location'],
	},
	fields: [
		defineField({
			title: 'Alternative Text',
			name: 'alt',
			type: 'string',
			description: 'REQUIRED for Screen readers, keep it short and descriptive. Can one keyword fit in here?',
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'alt',
			media: 'asset',
		},
		prepare({ title, media }) {
			return {
				title: title || 'No Alternative Text Provided',
				media,
			}
		},
	},
})
