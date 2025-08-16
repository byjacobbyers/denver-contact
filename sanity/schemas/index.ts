import { type SchemaTypeDefinition } from 'sanity'

// arrays
import columnArray from './arrays/column-array-schema'

// documents
import page from './documents/page-schema'
import site from './documents/site-schema'
import navigation from './documents/navigation-schema'
import review from './documents/review-schema'
import person from './documents/person-schema'
import event from './documents/event-schema'

// components
import sections from './components/page-builder-schema'
import seo from './components/seo-schema'
import social from './components/social-schema'
import columnBlock from './components/column-block-schema'
import reviewBlock from './components/review-block-schema'
import ctaBlock from './components/cta-block-schema'
import textBlock from './components/text-block-schema'
import heroBlock from './components/hero-block-schema'
import faqBlock from './components/faq-block-schema'
import imageBlock from './components/image-block-schema'
import galleryBlock from './components/gallery-block-schema'
import spacerBlock from './components/spacer-block-schema'
import dividerBlock from './components/divider-block-schema'
import eventsBlock from './components/event-block-schema'
import formBlock from './components/form-block-schema'
import heroMural from './components/hero-mural-schema'

// objects
import defaultImage from './objects/default-img-schema'
import cta from './objects/cta-schema'
import route from './objects/route-schema'
import column from './objects/column-schema'
import simpleText from './objects/simple-text-schema'
import normalText from './objects/normal-text-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
   //arrays
    columnArray,

    // documents
    page,
    site,
    navigation,
    review,
    person,
    event,

    // components
    sections,
    seo,
    social,
    columnBlock,
    reviewBlock,
    ctaBlock,
    textBlock,
    heroBlock,
    faqBlock,
    imageBlock,
    galleryBlock,
    spacerBlock,
    dividerBlock,
    eventsBlock,
    formBlock,
    heroMural,
    
    // objects
    defaultImage,
    cta,
    route,
    column,
    simpleText,
    normalText,
  ],
}
