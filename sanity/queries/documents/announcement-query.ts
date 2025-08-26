import { groq } from 'next-sanity'
import { routeQuery } from '../objects/route-query'

// Query for all active announcements (within date range)
export const activeAnnouncementsQuery = groq`
  *[_type == "announcement" && startDate <= $today && endDate >= $today][0] {
    _id,
    _type,
    content,
    startDate,
    endDate,
    isClickable,
    route {
      ${routeQuery}
    }
  }
`
