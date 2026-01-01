import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { pagesSitemapQuery } from '@/sanity/queries/documents/page-query'
import { eventsSitemapQuery } from '@/sanity/queries/documents/event-query'

const URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.denvercontactimprov.com'

async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
	const pageSlugs = await client.fetch(pagesSitemapQuery)
	const eventSlugs = await client.fetch(eventsSitemapQuery)

	const pages = pageSlugs.map((page: { slug: string; _updatedAt: string }) => {
		if (page.slug === 'home') {
			return {
				url: `${URL}/`,
				lastModified: page._updatedAt,
				priority: 1,
				changeFrequency: 'weekly' as const,
			}
		} else {
			return {
				url: `${URL}/${page.slug}`,
				lastModified: page._updatedAt,
				priority: 0.8,
				changeFrequency: 'monthly' as const,
			}
		}
	})

	const events = eventSlugs.map((event: { slug: string; _updatedAt: string }) => ({
		url: `${URL}/events/${event.slug}`,
		lastModified: event._updatedAt,
		priority: 0.7,
		changeFrequency: 'weekly' as const,
	}))

	return [...pages, ...events]
}

export default generateSitemap

