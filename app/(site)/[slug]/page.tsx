// Tools
import * as React from 'react'
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live"
import { notFound } from "next/navigation"

// Types

// Queries
import { pagesQuery, pageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
import { urlFor } from "@/components/sanity-image/url"

export async function generateStaticParams() {
  try {
    const { data: posts } = await sanityFetch({
      query: pagesQuery
    })

    // Add this filter
    const excludedSlugs = ['quiz', 'resources']

    return posts
      .filter((post: SanityDocument) => !excludedSlugs.includes(post?.slug?.current))
      .map((post: SanityDocument) => ({
        slug: post?.slug?.current,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  try {
    const [{ data: page }, { data: global }] = await Promise.all([
      sanityFetch({
        query: pageQuery,
        params: params,
      }),
      sanityFetch({
        query: SiteQuery
      })
    ])

    if (!page) {
      return notFound();
    }

    // Add null checks and default values
    const pageSeo = page?.seo || {}
    const globalSeo = global?.[0]?.seo || {}

    const result = {
      noIndex: pageSeo?.noIndex ?? false,
      title: pageSeo?.metaTitle || globalSeo?.metaTitle || 'Unison Crew',
      description: pageSeo?.metaDesc || globalSeo?.metaDesc || 'A collaborative, heart-led festival crew',
      image: pageSeo?.shareGraphic?.asset?.url
        ? urlFor(pageSeo.shareGraphic.asset.url).width(1200).height(630).url()
        : `/api/og?id=${page._id}`
    }

    return {
      generator: 'Next.js',
      applicationName: 'Unison Crew',
      publisher: 'Ohmni LLC',
      robots: {
        index: !result.noIndex,
        follow: true,
        nocache: true,
        googleBot: {
          index: !result.noIndex,
          follow: true,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
      title: `${result.title} :: Unison Crew`,
      description: result.description,
      openGraph: {
        title: result.title,
        description: result.description,
        url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
        siteName: 'Unison Crew',
        authors: ['Jacob Byers'],
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
        creator: '@byersjacob',
        images: [result.image],
      },
      alternates: {
        canonical: '/',
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Unison Crew',
      description: 'A collaborative, heart-led festival crew',
    }
  }
}

export default async function SinglePage({ params }: { params: Promise<QueryParams> }) {
  try {
    const { data: page } = await sanityFetch({
      query: pageQuery,
      params: await params,
    })


    
    if (!page) {
      return notFound()
    }

    return <Page page={page} key={page._id} />
  } catch (error) {
    console.error('Error fetching page data:', error)
    return notFound()
  }
}
