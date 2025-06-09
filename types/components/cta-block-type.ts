import { SimpleTextType } from '../objects/simple-text-type'
import { CtaType } from '../objects/cta-type'

export type CtaBlockType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
	content?: SimpleTextType
	cta?: CtaType
}
