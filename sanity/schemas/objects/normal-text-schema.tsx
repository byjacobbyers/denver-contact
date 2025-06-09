import { defineType } from 'sanity'
import React, { FC } from 'react'

const smallText: FC = (props: any): React.ReactElement => {
	return <span style={{ fontSize: '14px', margin: 0 }}>{props.children}</span>
}

const normalText = defineType({
	name: 'normalText',
	title: 'Text Editor',
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'Small', value: 'small', component: smallText },
				{ title: 'H1', value: 'h1' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'Quote', value: 'blockquote' },
			],
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
					{ title: 'Code', value: 'code' },
				],
			},
		},
    {
      type: 'defaultImage',
    },
	],
})

export default normalText
