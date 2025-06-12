import { groq } from 'next-sanity'

export const eventQuery = groq`
  *[_type == "event"] {
    _id,
    _type,
    title,
    slug,
    startDate,
    endDate,
    location,
    description,
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