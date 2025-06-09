import { SimpleTextType } from '../objects/simple-text-type'
import { ColumnArrayType } from '../arrays/column-array-type'

export type ColumnBlockType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
	content?: SimpleTextType
  rows?: ColumnArrayType[]
}