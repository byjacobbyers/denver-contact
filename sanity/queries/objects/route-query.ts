import { groq } from 'next-sanity'

export const routeQuery = groq`
  _type,
  title,
  blank,
  pageRoute->{
    _type,
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
