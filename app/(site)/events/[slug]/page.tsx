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
  params: any
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  try {
    const [{ data: event }, { data: global }] = await Promise.all([
      sanityFetch({
        query: eventQuery,
        params: { slug: params.event },
      }),
      sanityFetch({
        query: SiteQuery
      })
    ])

    if (!event) {
      return notFound();
    }

    const globalSeo = global?.[0]?.seo || {}

    const result = {
      title: event?.title || 'Event',
      description: event?.content?.text?.[0]?.children?.[0]?.text || 'Join us for this event at Denver Contact Improv.',
      image: event?.image?.asset?.url
        ? urlFor(event.image.asset.url).width(1200).height(630).url()
        : `/api/og?id=${event._id}`
    }

    return {
      title: `${result.title} :: Denver Contact Improv`,
      description: result.description,
      openGraph: {
        title: result.title,
        description: result.description,
        url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
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
    const { data: event } = await sanityFetch({
      query: eventQuery,
      params: await params,
    })

    if (!event) {
      return notFound()
    }

    return <EventSingle event={event} key={event._id} />
  } catch (error) {
    console.error('Error fetching event data:', error)
    return notFound()
  }
} 