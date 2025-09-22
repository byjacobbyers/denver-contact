import { PageType } from '../documents/page-type'
import { EventType } from '../documents/event-type'

export type RouteType = {
	navKind: 'route'
	title: string
	_key: string
	_type: string
	pageRoute?: (PageType | EventType) & { _type: 'page' | 'event' }
	route?: string
	anchor?: string
	link?: string
	blank?: boolean
	nofollow?: boolean
}
