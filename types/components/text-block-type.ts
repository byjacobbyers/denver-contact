import { NormalTextType } from '../objects/normal-text-type'

export type TextBlockType = {
	_type: 'textBlock'
	active: boolean
	anchor: string
	componentIndex?: number
	contentAlignment: 'left' | 'center' | 'right'
	content: {
		text: NormalTextType
	}
}
