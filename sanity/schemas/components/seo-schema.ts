import { defineType, defineField } from 'sanity'

const seo = defineType({
	title: 'SEO / Share Settings',
	name: 'seo',
	type: 'object',
  description: 'Customize SEO and share settings for this page. Share graphics are auto generated for each page, but you can override them here. If you want to use a custom share graphic, upload it to the media library and select it here.',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		defineField({
			title: 'No Index?',
			name: 'noIndex',
			type: 'boolean',
			hidden: ({ document }) => document?._type !== 'page',
		}),
		defineField(
			{
				title: 'Meta Title',
				name: 'metaTitle',
				type: 'string',
				description: 'Title used for search engines and browsers.',
				validation: Rule =>
					Rule.max(50).warning(
						'Longer titles may be truncated by search engines',
					),
			}
		),
		defineField(
			{
				title: 'Meta Description',
				name: 'metaDesc',
				type: 'text',
				rows: 3,
				description: 'Description for search engines.',
				validation: Rule =>
					Rule.max(150).warning(
						'Longer descriptions may be truncated by search engines',
					),
			}
		),
    defineField(
      {
        title: 'Meta Icon',
        name: 'metaIcon',
        type: 'image',
        description: 'This will override the default logo on the generated share graphic for the page.',
      },
    ),
		defineField(
      {
        title: 'Share Graphic',
        name: 'shareGraphic',
        type: 'image',
        description: 'Overrides auto generated Share Graphic with a custom one. Share graphics will be cropped to 1200x630 and will override the default share graphic.',
      },
    ),
	],
})

export default seo
