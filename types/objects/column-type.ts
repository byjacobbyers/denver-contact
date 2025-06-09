import { DefaultImageType } from './default-img-type'
import { SimpleTextType } from './simple-text-type'

export type ColumnType = {
	_key: string
	_type: string
	image: DefaultImageType
	content: SimpleTextType
}
