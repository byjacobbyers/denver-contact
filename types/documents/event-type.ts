import { PersonType } from './person-type'
import { PageBuilderType } from '../components/page-builder-type'
import { DefaultImageType } from "../objects/default-img-type";

export interface EventType {
  _id: string
  _type: 'event'
  title: string
  slug: {
    current: string
  }
  image?: DefaultImageType
  startDate: string
  endDate?: string
  timeString?: string
  eventType?: string
  soldOut?: boolean
  location?: string
  sections: any
  guestTeachers?: PersonType[]
  flyer?: {
    asset: {
      _ref: string
      url: string
    }
    originalFilename: string
  }
} 