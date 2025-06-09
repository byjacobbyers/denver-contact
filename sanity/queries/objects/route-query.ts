import { groq } from 'next-sanity'

export const routeQuery = groq`
  _type,
  title,
  blank,
  pageRoute->{
    slug {
      current
    }
  },
  route,
  anchor,
  link,
  nofollow,
  blank
`
