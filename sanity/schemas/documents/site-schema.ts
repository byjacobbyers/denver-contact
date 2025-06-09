import { defineType, defineField } from 'sanity'

const site = defineType({
	name: 'site',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Site Title',
			type: 'string',
		}),
		defineField({
			name: 'altTitle',
			title: 'Alternative Title',
			type: 'string',
		}),
		defineField({
			name: 'foundingYear',
			title: 'Founding Year',
			type: 'string',
		}),
		defineField({
			name: 'address',
			title: 'Street Address',
			type: 'string',
		}),
		defineField({
			name: 'addressLocality',
			title: 'Address Locality',
			type: 'string',
			description: 'Example: New York',
		}),
		defineField({
			name: 'addressRegion',
			title: 'Address Region',
			type: 'string',
			description: 'Example: NY',
		}),
		defineField({
			name: 'postalCode',
			title: 'Postal Code',
			type: 'string',
		}),
		defineField({
			name: 'addressCountry',
			title: 'Address Country',
			type: 'string',
		}),
		defineField({
			name: 'founder',
			title: 'Founder',
			type: 'string',
		}),
    defineField({
      name: 'sameAs',
      title: 'Same As',
      type: 'array',
      of: [{ type: 'string' }],
    }),
		defineField({
			name: 'social',
			title: 'Default Social',
			type: 'social',
		}),
		defineField({
			title: 'Default Site SEO / Share Settings',
			name: 'seo',
			type: 'seo',
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})

export default site
