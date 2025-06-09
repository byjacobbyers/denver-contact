'use client'

import {
	ArrayOfObjectsInputProps,
	BooleanSchemaType,
	FileSchemaType,
	NumberSchemaType,
	ObjectSchemaType,
	ReferenceSchemaType,
	StringSchemaType,
} from 'sanity'
import { Grid, Stack, Button, Dialog, Box, Card, Heading } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { AddIcon } from '@sanity/icons'
import { randomKey } from '@sanity/util/content'
import React from 'react'
import Image from 'next/image'

type Schema =
	| BooleanSchemaType
	| FileSchemaType
	| NumberSchemaType
	| ObjectSchemaType
	| StringSchemaType
	| ReferenceSchemaType

const PageBuilderInput = (props: ArrayOfObjectsInputProps) => {
	const { onInsert } = props
	const [open, setOpen] = useState(false)
	const onClose = useCallback(() => setOpen(false), [])
	const onOpen = useCallback(() => setOpen(true), [])

	const onSelectItem = useCallback(
		(schema: Schema) => {
			const key = randomKey(12)
			onInsert({
				items: [
					{
						_type: schema.name,
						_key: key,
					} as any,
				],
				position: 'after',
				referenceItem: -1,
				open: true,
			})
			onClose()
		},
		[onClose, onInsert],
	)

	return (
		<>
			<Stack space={3}>
				{props.renderDefault({
					...props,
					arrayFunctions: () => {
						return (
							<Button
								onClick={onOpen}
								icon={AddIcon}
								mode='ghost'
								text='Add item'
							/>
						)
					},
				})}
			</Stack>

			{open && (
				<Dialog
					header='Select a section'
					id='dialog-example'
					width={4}
					onClose={onClose}
					zOffset={1000}
				>
					<Box padding={1}>
						<Grid
							autoCols={'auto'}
							columns={[1, 2, 2, 3, 4]}
							autoFlow={'row dense'}
							gap={[3]}
							padding={4}
						>
							{props.schemaType.of.map((schema, index) => {
								return (
									<PreviewCard
										key={index}
										schema={schema}
										onClick={() => onSelectItem(schema)}
									/>
								)
							})}
						</Grid>
					</Box>
				</Dialog>
			)}
		</>
	)
}

type PreviewProps = {
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined
	schema: Schema
}

function PreviewCard(props: PreviewProps) {
	const { onClick, schema } = props
	return (
		<Card
			role='button'
			shadow={1}
			padding={3}
			onClick={onClick}
			style={{ cursor: 'pointer' }}
		>
			<Stack padding={2} space={[3]}>
				<Heading as='h5' size={1}>
					{schema.title}
				</Heading>
				<div
					style={{
						height: '150px',
					}}
				>
					<Image
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'contain',
						}}
						width={335}
						height={150}
						src={`/page-builder/${schema.name}.png`}
						alt={`${schema.title}`}
						onError={(i: any) => (i.target.style.display = 'none')}
					/>
				</div>
			</Stack>
		</Card>
	)
}

export default PageBuilderInput
