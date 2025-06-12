import { DefaultImageType } from '@/types/objects/default-img-type'
import { SimpleTextType } from '@/types/objects/simple-text-type'
import { SocialType } from '@/types/components/social-type'

export interface PersonType {
  _id: string
  _type: 'person'
  name: string
  image?: DefaultImageType
  bio?: SimpleTextType
  social?: SocialType
  website?: string
} 