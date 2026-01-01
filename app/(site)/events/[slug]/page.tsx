// Tools
import * as React from 'react'
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live"
import { notFound } from "next/navigation"

// Queries
import { eventsQuery, eventQuery } from '@/sanity/queries/documents/event-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import EventSingle from "@/components/event-single"
import { urlFor } from "@/components/sanity-image/url"
import Script from 'next/script'
import { generateEventJsonLd, generateFAQJsonLd } from '@/lib/seo'

export async function generateStaticParams() {
  try {
    const { data: events } = await sanityFetch({
      query: eventsQuery
    })

    return events.map((event: SanityDocument) => ({
      event: event?.slug?.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  try {
    const resolvedParams = await params
    const [{ data: event }, { data: global }] = await Promise.all([
      sanityFetch({
        query: eventQuery,
        params: { slug: resolvedParams.slug },
      }),
      sanityFetch({
        query: SiteQuery
      })
    ])

    if (!event) {
      notFound();
    }

    const pageSeo = event?.seo || {}
    const globalSeo = global?.seo || {}

    const result = {
      noIndex: pageSeo?.noIndex ?? false,
      title: pageSeo?.metaTitle || globalSeo?.metaTitle || 'Page',
      description: pageSeo?.metaDesc || globalSeo?.metaDesc || 'Discover Denver Contact Improv — a dynamic movement community exploring connection, spontaneity, and embodied creativity through contact improvisation. Join our weekly jams, classes, and events.',
      image: pageSeo?.shareGraphic?.asset?.url
        ? urlFor(pageSeo.shareGraphic.asset.url).width(1200).height(630).url()
        : urlFor(globalSeo.shareGraphic.asset.url).width(1200).height(630).url()
    }

    return {
      title: `${result.title} :: Denver Contact Improv`,
      description: result.description,
      openGraph: {
        title: result.title,
        description: result.description,
        url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}events/${resolvedParams.slug}`),
        siteName: 'Denver Contact Improv',
        images: [
          {
            url: result.image,
            width: 1200,
            height: 630,
            alt: result.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: result.title,
        description: result.description,
        images: [result.image],
      },
      alternates: {
        canonical: `/events/${resolvedParams.slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Denver Contact Improv',
      description: 'Join us for this event at Denver Contact Improv.',
    }
  }
}

export default async function EventPage({ params }: { params: Promise<QueryParams> }) {
  try {
    const resolvedParams = await params
    const { data: event } = await sanityFetch({
      query: eventQuery,
      params: { slug: resolvedParams.slug },
    })

    if (!event) {
      return notFound()
    }

    // Generate JSON-LD schemas
    const schemas = []
    const eventUrl = `/events/${resolvedParams.slug}`
    
    // Parse dates for Event schema
    const parseSanityDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split('-').map(Number)
      return new Date(year, month - 1, day)
    }

    // Event schema
    if (event.startDate) {
      const startDate = parseSanityDate(event.startDate).toISOString()
      const endDate = event.endDate ? parseSanityDate(event.endDate).toISOString() : undefined
      
      schemas.push(generateEventJsonLd({
        title: event.title,
        description: event.seo?.metaDesc,
        url: eventUrl,
        startDate,
        endDate,
        location: event.location,
        image: event.image,
        _updatedAt: event._updatedAt,
      }))
    }

    // FAQ schema (if event has FAQ blocks in sections)
    const faqBlocks = event.sections?.filter((section: any) => section._type === 'faqBlock' && section.active) || []
    const allFaqs = faqBlocks.flatMap((block: any) => block.faqs || [])
    if (allFaqs.length > 0) {
      const faqSchema = generateFAQJsonLd(allFaqs)
      if (faqSchema) schemas.push(faqSchema)
    }

    return (
      <>
        {schemas.length > 0 && (
          <Script
            id="event-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          />
        )}
        <EventSingle event={event} key={event._id} />
      </>
    )
  } catch (error) {
    console.error('Error fetching event data:', error)
    return notFound()
  }
} 