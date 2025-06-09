import { groq } from 'next-sanity'

// Common video query fragment
export const videoQuery = groq`
  asset-> {
    _id,
    playbackId,
    status,
    data {
      duration,
      aspect_ratio
    }
  }
`
