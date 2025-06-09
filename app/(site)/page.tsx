// Tools
import { sanityFetch } from "@/sanity/lib/live"
import { Metadata } from 'next'
import { notFound } from "next/navigation"

// Queries
import { pageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
import { urlFor } from "@/components/sanity-image/url"
import OrgJsonLd from "@/components/organization-jsonld"

export const generateMetadata = async (): Promise<Metadata> => {
	try {
		const { data: global } = await sanityFetch({
			query: SiteQuery
		})

		if (!global?.[0]?.seo) {
			return {
				title: 'Unison Crew',
				description: 'A collaborative, heart-led festival crew',
			}
		}

		const seoImage = global[0].seo?.shareGraphic?.asset?.url
	const result = {
		title: global[0].seo.metaTitle,
		description: global[0].seo?.metaDesc,
		keywords: global[0].seo?.metaKeys,
			image: seoImage ? urlFor(seoImage).width(1200).height(630).url() : undefined,
	}

	return {
		generator: 'Next.js',
		applicationName: 'Unison Crew',
		publisher: 'Ohmni LLC',
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
		metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
			title: result.title,
		description: result.description,
		openGraph: {
				title: result.title,
			description: result.description,
      url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
      siteName: 'Unison Crew',
      authors: ['Jacob Byers'],
				images: result.image ? [
				{
					url: result.image,
					width: 1200,
					height: 630,
					alt: result.title,
				},
				] : undefined,
		},
    twitter: {
      card: 'summary_large_image',
				title: result.title,
      description: result.description,
      creator: '@byersjacob',
				images: result.image ? [result.image] : undefined,
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

export default async function Home() {
	try {
  const { data: page } = await sanityFetch({
    query: pageQuery,
    params: { slug: "home" },
		})

		if (!page) {
			return notFound()
		}

  return (
    <>
			<OrgJsonLd />
      <Page page={page} key={page._id} /> 
		</>
		)
	} catch (error) {
		console.error('Error fetching page data:', error)
		return notFound()
	}
}