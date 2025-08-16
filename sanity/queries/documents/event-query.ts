import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'
import { videoQuery } from '../objects/video-query'
import { routeQuery } from '../objects/route-query'

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
  }
` 