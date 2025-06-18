import { EventType } from '../documents/event-type'

export type EventsBlockType = {
  active?: boolean
	componentIndex?: number
	anchor?: string
  title?: string
  events?: EventType[]
}