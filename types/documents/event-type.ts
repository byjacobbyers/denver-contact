import { PersonType } from './person-type'
import { NormalTextType } from '../objects/normal-text-type'
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
  eventType?: string
  location?: string
  content?: {
		text: NormalTextType
	}
  guestTeachers?: PersonType[]
  flyer?: {
    asset: {
      _ref: string
      url: string
    }
    originalFilename: string
  }
} 