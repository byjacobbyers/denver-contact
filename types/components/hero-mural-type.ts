import { DefaultImageType } from '../objects/default-img-type'

export type HeroMuralType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
	image?: DefaultImageType
	behindText?: string
	frontImage?: DefaultImageType
	frontText?: string
	mobileImage?: DefaultImageType
}
