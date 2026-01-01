import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'
import { videoQuery } from '../objects/video-query'
import { routeQuery } from '../objects/route-query'
import { sectionsQuery } from '../components/sections-query'

// Query for all events
export const eventsQuery = groq`
  *[_type == "event"] {
    _id,
    _type,
    title,
    slug,
    image {
      ${imageQuery}
    },
    startDate,
    endDate,
    timeString,
    eventType,
    soldOut,
    location,
    content,
    "flyer": flyer.asset->{
      url,
      originalFilename
    },
    "guestTeachers": guestTeachers[]-> {
      _id,
      _type,
      name,
      image,
      bio,
      social,
      website
    }
  }
`

// Query for sitemap - includes _updatedAt
export const eventsSitemapQuery = groq`*[_type == "event" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`

// Query for a single event by slug
export const eventQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    image {
      ${imageQuery}
    },
    startDate,
    endDate,
    timeString,
    eventType,
    soldOut,
    location,
    "flyer": flyer.asset->{
      url,
      originalFilename
    },
    "guestTeachers": guestTeachers[]-> {
      _id,
      _type,
      name,
      image,
      bio,
      social,
      website
    },
    seo {
      ...,
      shareGraphic {
        ${imageQuery}
      }
    },
    ${sectionsQuery}
  }
` 