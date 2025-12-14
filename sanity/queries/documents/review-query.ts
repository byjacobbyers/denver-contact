import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

// Query for all reviews
export const reviewsQuery = groq`*[_type == "review"] | order(orderRank asc) {
  _id,
  name,
  content,
  image {
    ${imageQuery}
  }
}`

