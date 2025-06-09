import { ReviewType } from "../documents/review-type"

export type ReviewBlockType = {
  active?: boolean
	componentIndex?: number
	anchor?: string
  title?: string
  reviews?: ReviewType[]
}