import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

export const normalTextQuery = groq`
  ...,
  markDefs[] {
    ...,
  },
  image {
    ${imageQuery}
  },
`
