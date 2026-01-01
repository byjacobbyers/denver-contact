import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'
import { routeQuery } from '../objects/route-query'
import { videoQuery } from '../objects/video-query'
import { sectionsQuery } from '../components/sections-query'

// Query for all pages with slugs
export const pagesQuery = groq`*[_type == "page" && defined(slug.current)] {
  _id,
  title,
  "slug": slug.current
}`

// Query for sitemap - includes _updatedAt
export const pagesSitemapQuery = groq`*[_type == "page" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`

// Query for a single page by slug
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  backgroundColor,
  seo {
    ...,
    shareGraphic {
      ${imageQuery}
    }
  },
  ${sectionsQuery}
}`
