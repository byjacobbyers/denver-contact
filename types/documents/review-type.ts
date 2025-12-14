import { DefaultImageType } from "../objects/default-img-type"
import { SimpleTextType } from "../objects/simple-text-type"

export type ReviewType = {
	_id: string
	image?: DefaultImageType
  name?: string
  content?: SimpleTextType
}
