import { groq } from 'next-sanity'

// Common image query fragment
export const imageQuery = groq`
  alt,
  shadow,
  crop {
    ...
  },
  hotspot {
    x,
    y
  },
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        aspectRatio,
        height,
        width
      },
      lqip,
      palette {
        dominant {
          background,
          foreground
        }
      }
    }
  }
`
