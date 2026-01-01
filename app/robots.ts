import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseUrl =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.denvercontactimprov.com'

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/*', '/studio/*'],
		},
		sitemap: `${baseUrl}sitemap.xml`,
	}
}

