import { defineField } from 'sanity'
import PageBuilderInput from './page-builder-input'

const pageBuilder = defineField({
	title: 'Page sections',
	name: 'sections',
	type: 'array',
	group: 'pagebuilder',
	of: [
		{ type: 'heroBlock'},
		{ type: 'ctaBlock' },
		{ type: 'columnBlock' },
		{ type: 'reviewBlock' },
		{ type: 'textBlock' },
    { type: 'faqBlock' },
    { type: 'imageBlock' },
    { type: 'galleryBlock' },
    { type: 'spacerBlock' },
    { type: 'dividerBlock' },
	],
	components: {
		input: PageBuilderInput,
	},
})

export default pageBuilder
