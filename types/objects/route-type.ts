import { PageType } from '../documents/page-type'

export type RouteType = {
	navKind: 'route'
	title: string
	_key: string
	_type: string
	pageRoute?: PageType
	route?: string
	anchor?: string
	link?: string
	blank?: boolean
	nofollow?: boolean
}
