import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'
import { routeQuery } from '../objects/route-query'
import { videoQuery } from '../objects/video-query'

// Query for all pages with slugs
export const pagesQuery = groq`*[_type == "page" && defined(slug.current)] {
  _id,
  title,
  "slug": slug.current
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
  sections[] {
    ...,
    _type == 'heroBlock' => {
      ...,
      image {
        ${imageQuery}
      },
      video {
        ${videoQuery}
      },
      cta {
        ...,
        route {
          ${routeQuery}
        }
      }
    },
    _type == 'ctaBlock' => {
      ...,
      cta {
        ...,
        route {
          ${routeQuery}
        }
      },
      image {
        ${imageQuery}
      }
    },
    _type == 'columnBlock' => {
      ...,
      rows[] {
        ...,
        columns[] {
          ...,
          image {
            ${imageQuery}
          },
          video {
            ${videoQuery}
          },
          content[] {
            ...
          }
        }
      }
    },
    _type == 'reviewBlock' => {
      ...,
      reviews[]-> {
        ...,
        image {
          ${imageQuery}
        }
      }
    },
    _type == 'textBlock' => {
      ...
    },
    _type == 'imageBlock' => {
      ...,
      image {
        ${imageQuery}
      },
      cta {
        ...,
        route {
          ${routeQuery}
        }
      },
    },
    _type == 'galleryBlock' => {
      ...,
      images[] {
        ${imageQuery}
      }
    }
  }
}`
