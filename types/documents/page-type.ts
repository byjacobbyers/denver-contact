import { SeoType } from '../components/seo-type'
import { PageBuilderType } from '../components/page-builder-type'

export type PageType = {
	_id: string
	_createdAt: Date
	_updatedAt: Date
	title: string
  shortKey: string
	slug: {
		current: string
	}
	backgroundColor?: 'primary' | 'secondary'
	sections: PageBuilderType
	seo: SeoType
}
