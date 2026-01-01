'use client'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { SiteQuery } from '@/sanity/queries/documents/site-query'
import Logo from '@/public/logo.png'

const OrgJsonLd = () => {
	const [jsonLdContent, setJsonLdContent] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const siteData = await client.fetch(SiteQuery)
				if (!siteData) return

				// Normalize baseUrl to remove trailing slash
				const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.denvercontactimprov.com').replace(/\/$/, '')
				const logoUrl = `${baseUrl}${Logo.src}`
				
				// Organization schema
				const organization = {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: siteData.title,
					...(siteData.foundingYear && { foundingDate: siteData.foundingYear }),
					logo: {
						'@type': 'ImageObject',
						url: logoUrl,
					},
					image: logoUrl,
					url: baseUrl,
					...(siteData.address && {
						address: {
							'@type': 'PostalAddress',
							...(siteData.addressCountry && { addressCountry: siteData.addressCountry }),
							...(siteData.addressLocality && { addressLocality: siteData.addressLocality }),
							...(siteData.address && { streetAddress: siteData.address }),
							...(siteData.postalCode && { postalCode: siteData.postalCode }),
							...(siteData.addressRegion && { addressRegion: siteData.addressRegion }),
						},
					}),
					...(siteData.sameAs && siteData.sameAs.length > 0 && {
						sameAs: siteData.sameAs.map((url: string) => url),
					}),
					...(siteData.seo?.metaDesc && { description: siteData.seo.metaDesc }),
				}

				// Website schema
				const website = {
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: siteData.title,
					url: baseUrl,
					publisher: {
						'@type': 'Organization',
						name: siteData.title,
						logo: {
							'@type': 'ImageObject',
							url: logoUrl,
						},
					},
				}

				// Person schema (if founder exists)
				const person = siteData.founder ? {
					'@context': 'https://schema.org',
					'@type': 'Person',
					name: siteData.founder,
					...(siteData.social?.linkedin && {
						sameAs: [siteData.social.linkedin].filter(Boolean),
					}),
				} : null

				// Combine all schemas into an array
				const schemas = [organization, website, person].filter(Boolean)

				setJsonLdContent(JSON.stringify(schemas))
			} catch (error) {
				console.error('Error fetching site data for JSON-LD:', error)
			}
		}

		fetchData()
	}, [])

	return jsonLdContent ? (
		<Script
			id='organization-ld-json'
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: jsonLdContent }}
		/>
	) : null
}

export default OrgJsonLd
