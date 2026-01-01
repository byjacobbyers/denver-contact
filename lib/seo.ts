import { urlFor } from '@/components/sanity-image/url'

// Helper function to normalize base URL (remove trailing slash)
function normalizeBaseUrl(url: string): string {
	return url.endsWith('/') ? url.slice(0, -1) : url
}

// Helper function to construct full URL from base and path
function buildUrl(base: string, path: string): string {
	const normalizedBase = normalizeBaseUrl(base)
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	return `${normalizedBase}${normalizedPath}`
}

const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.denvercontactimprov.com')

export function generateWebPageJsonLd(data: {
	title: string
	description?: string
	url: string
	seo?: {
		shareGraphic?: {
			asset?: {
				url: string
			}
		}
	}
	_updatedAt?: string
}) {
	const pageUrl = data.url.startsWith('http') ? data.url : buildUrl(baseUrl, data.url)
	
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: data.title,
		...(data.description && { description: data.description }),
		url: pageUrl,
		publisher: {
			'@type': 'Organization',
			name: 'Denver Contact Improv',
		},
		...(data._updatedAt && {
			dateModified: new Date(data._updatedAt).toISOString(),
		}),
	}
}

export function generateEventJsonLd(data: {
	title: string
	description?: string
	url: string
	startDate: string
	endDate?: string
	location?: string
	image?: {
		asset?: {
			url: string
		}
	}
	_updatedAt?: string
}) {
	const eventUrl = data.url.startsWith('http') ? data.url : buildUrl(baseUrl, data.url)
	
	return {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: data.title,
		...(data.description && { description: data.description }),
		url: eventUrl,
		startDate: data.startDate,
		...(data.endDate && { endDate: data.endDate }),
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		...(data.location && {
			location: {
				'@type': 'Place',
				name: data.location,
			},
		}),
		...(data.image?.asset?.url && {
			image: urlFor(data.image.asset.url).width(1200).height(630).url(),
		}),
		...(data._updatedAt && {
			dateModified: new Date(data._updatedAt).toISOString(),
		}),
	}
}

// Helper function to extract plain text from PortableText content
function extractTextFromPortableText(content: any): string {
	if (typeof content === 'string') {
		return content
	}
	
	if (!content || !Array.isArray(content)) {
		return ''
	}

	return content
		.map((block: any) => {
			if (block._type === 'block' && block.children) {
				return block.children
					.map((child: any) => child.text || '')
					.join(' ')
			}
			return ''
		})
		.join(' ')
		.trim()
}

export function generateFAQJsonLd(faqs: Array<{ question: string; answer: any }>) {
	if (!faqs || faqs.length === 0) return null

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: extractTextFromPortableText(faq.answer),
			},
		})).filter((item) => item.acceptedAnswer.text), // Filter out empty answers
	}
}

