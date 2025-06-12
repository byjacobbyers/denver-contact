import { PersonType } from './person-type'

export interface EventType {
  _id: string
  _type: 'event'
  title: string
  slug: {
    current: string
  }
  startDate: string
  endDate?: string
  location?: string
  description?: string
  guestTeachers?: PersonType[]
  flyer?: {
    asset: {
      _ref: string
      url: string
    }
    originalFilename: string
  }
} 