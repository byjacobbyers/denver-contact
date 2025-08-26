import { SimpleTextType } from '../objects/simple-text-type'
import { RouteType } from '../objects/route-type'

export interface AnnouncementType {
  _id: string
  _type: 'announcement'
  title?: string
  content: SimpleTextType
  startDate: string
  endDate: string
  isClickable: boolean
  route?: RouteType
}
