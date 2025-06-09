import { groq } from 'next-sanity'

export const simpleTextQuery = groq`
  ...,
  markDefs[] {
    ...
  },
`
