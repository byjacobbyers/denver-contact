import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

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