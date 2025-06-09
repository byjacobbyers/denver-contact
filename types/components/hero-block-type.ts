import { SimpleTextType } from '../objects/simple-text-type'
import { DefaultImageType } from '../objects/default-img-type'
import { CtaType } from '../objects/cta-type'
import { DefaultVideoType } from '../objects/default-video-type'

export type HeroBlockType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
  formId?: string
  image?: DefaultImageType
	video?: DefaultVideoType
	content?: SimpleTextType
  layout?: string
  cta?: CtaType
}