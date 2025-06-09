import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

// Query for site settings
export const SiteQuery = groq`*[_type == "site"][0] {
  _id,
  _createdAt,
  _updatedAt,
  ...,
  seo {
    ...,
    metaIcon {
      ${imageQuery}
    },
    shareGraphic {
      ${imageQuery}
    }
  }
}`

// Query for OpenGraph image data
export const ogImageQuery = groq`*[_id == $id][0] {
  title,
  seo {
    metaTitle,
    metaIcon {
      ${imageQuery}
    },
    shareGraphic {
      ${imageQuery}
    }
  }
}`