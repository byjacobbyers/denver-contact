import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

const route = defineType({
	title: 'Route',
	name: 'route',
	icon: LinkIcon,
	type: 'object',
	options: {
		collapsible: true,
	},
	fieldsets: [
		{
			title: 'Link',
			name: 'link',
			description: 'Only the first value of these will be used',
		},
	],
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
		}),
		defineField({
			title: 'Page',
			name: 'pageRoute',
			fieldset: 'link',
			type: 'reference',
			to: [{ type: 'page' }],
		}),
		defineField({
			title: 'Path',
			name: 'route',
			fieldset: 'link',
			description: 'Example: blog or blog/#section',
			type: 'string',
		}),
		defineField({
			title: 'Anchor',
			name: 'anchor',
			fieldset: 'link',
			description: 'For same page only. If for another page use Path instead. Example: content. Hash symbol is not needed.',
			type: 'string',
		}),
		defineField({
			title: 'External link',
			name: 'link',
			type: 'string',
			description: 'Example: https://www.sanity.io',
			fieldset: 'link',
		}),
		defineField({
			title: 'Open in new tab',
			name: 'blank',
			type: 'boolean',
			fieldset: 'link',
		}),
		defineField({
			title: 'No follow',
			name: 'nofollow',
			type: 'boolean',
			fieldset: 'link',
		}),
	],
	preview: {
		select: {
			title: 'title',
			pageRoute: 'pageRoute.slug.current',
			route: 'route',
			anchor: 'anchor',
			link: 'link.link',
		},
		prepare({ title, pageRoute, route, anchor, link }) {
			let subtitle = 'Not set'
			if (pageRoute) {
				subtitle = `Route: /${pageRoute}`
			}
			if (route) {
				subtitle = `Route: /${route}`
			}
			if (anchor) {
				subtitle = `#${anchor}`
			}
			if (link) {
				subtitle = `External: ${link}`
			}
			return {
				title,
				subtitle,
			}
		},
	},
})

export default route
