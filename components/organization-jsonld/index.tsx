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
			const data = await client.fetch(SiteQuery)
			if (data && data.length > 0) {
				const siteData = data[0]
				const jsonLd = {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: siteData.title,
					foundingYear: siteData.foundingYear,
					image: Logo.src, 
					url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
					address: {
						'@type': 'PostalAddress',
						addressCountry: siteData.addressCountry,
						addressLocality: siteData.addressLocality,
						streetAddress: siteData.address,
						postalCode: siteData.postalCode,
						addressRegion: siteData.addressRegion,
					},
					sameAs: siteData.sameAs.map((url: string) => url),
					description: siteData.seo.metaDesc,
					'@graph': [
						{
							'@context': 'https://schema.org',
							'@type': 'WebPage',
							name: siteData.title,
							description: siteData.seo.metaDesc,
							url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
							publisher: {
								'@type': 'Organization',
								name: siteData.title,
								logo: {
									'@type': 'ImageObject',
									url: Logo.src
								}
							},
						},
						{
							'@context': 'https://schema.org',
							'@type': 'Person',
							name: siteData.founder,
							jobTitle: 'Founder & CEO',
							sameAs: siteData.social?.linkedin,
						}
					]
				}

				setJsonLdContent(JSON.stringify(jsonLd))
			} else {
				console.log('No data received from fetch')
			}
		}

		fetchData()
	}, [])

	return jsonLdContent ? (
		<Script
			id='app-ld-json'
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: jsonLdContent }}
		/>
	) : null
}

export default OrgJsonLd
