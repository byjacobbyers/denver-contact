'use client'

import { PortableText } from '@portabletext/react'
// import Link from 'next/link'
// import SanityImage from '../sanity-image'
// import { Tweet } from 'react-tweet'
// import YouTube from 'react-youtube'
// import CtaBar from '@/components/cta-bar'
// import QuoteBlock from '@/components/quote-block'
// import PersonelleRef from '@/components/personelle-ref'
// import Podcast from '@/components/podcast'
// import CodeBlock from '@/components/code-block'
// import Hero from '@/components/hero'
// import embedCode from '@/sanity/schemas/objects/embed-code-schema'

// const NormalTextComponents = {
// 	block: {
// 		small: ({ children }) => <p className='!text-xl'>{children}</p>,
// 	},
// 	marks: {
// 		simpleLink: ({ value, children }) => {
// 			const data = value.simpleLink

// 			return (
// 				<a
// 					href={data.href}
// 					target={data.blank ? '_blank' : '_self'}
// 					rel={data.doFollow ? 'external' : 'noopener noreferrer'}
// 				>
// 					{children}
// 				</a>
// 			)
// 		},
// 		emailUrl: ({ value, children }) => {
// 			const data = value.href
// 			return (
// 				<a href={`mailto:${data}`} target='_blank' rel='noopener noreferrer'>
// 					{children}
// 				</a>
// 			)
// 		},
// 		routeLink: ({ value, children }) => {
// 			const data = value

// 			if (data.pageRoute) {
// 				return (
// 					<Link
// 						href={data.pageRoute.slug.current}
// 						target={data.blank ? '_blank' : '_self'}
// 					>
// 						{children}
// 					</Link>
// 				)
// 			} else if (data.route) {
// 				return (
// 					<Link href={data.route} target={data.blank ? '_blank' : '_self'}>
// 						{children}
// 					</Link>
// 				)
// 			} else {
// 				return (
// 					<a
// 						href={data.link.link}
// 						target={data.blank ? '_blank' : '_self'}
// 						rel={data.link.nofollow ? 'noopener noreferrer' : 'external'}
// 					>
// 						{children}
// 					</a>
// 				)
// 			}
// 		},
// 		color: ({ value, children }) => {
// 			const color = value.color.value
// 			return <span style={{ color }}>{children}</span>
// 		},
// 		center: ({ children }) => {
// 			return <div className='text-center'>{children}</div>
// 		},
// 	},
// 	types: {
// 		lineBreak: () => {
// 			return (
// 				<hr className='mx-auto w-48 rounded border-2 border-solid border-tt-purple lg:w-72' />
// 			)
// 		},
// 		defaultImage: ({ value }) => {
// 			const { alt, asset } = value
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<div
// 						className={`flex w-full max-w-3xl justify-center px-5 align-middle`}
// 					>
// 						<div className='w-full'>
// 							<SanityImage
// 								image={asset}
// 								focalPoint={asset.hotspot}
// 								alt={alt}
// 								width={400}
// 								height={900}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			)
// 		},
// 		embedCode: ({ value }) => {
// 			const { codeSnippet } = value
// 			return (
// 				<div className='flex w-full justify-center py-5'>
// 					<div
// 						dangerouslySetInnerHTML={{ __html: codeSnippet }}
// 						style={{ width: '100%', height: '100%' }}
// 					/>
// 				</div>
// 			)
// 		},
// 		twitter: ({ value }) => {
// 			const { id } = value
// 			return (
// 				<div className='flex w-full justify-center py-5'>
// 					<Tweet id={id} />
// 				</div>
// 			)
// 		},
// 		youtube: ({ value }) => {
// 			const { url } = value
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<YouTube videoId={url} />
// 				</div>
// 			)
// 		},
// 		ctaBar: ({ value }) => {
// 			const { active, content, ctaType } = value
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<CtaBar active={active} content={content} ctaType={ctaType} />
// 				</div>
// 			)
// 		},
// 		quoteBlock: ({ value }) => {
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<QuoteBlock {...value} />
// 				</div>
// 			)
// 		},
// 		personelleRef: ({ value }) => {
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<PersonelleRef {...value} />
// 				</div>
// 			)
// 		},
// 		podcastRef: ({ value }) => {
// 			const { podcast } = value

// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<Podcast {...podcast} />
// 				</div>
// 			)
// 		},
// 		code: ({ value }) => {
// 			const { code, language } = value

// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<CodeBlock text={code} language={language} />
// 				</div>
// 			)
// 		},
// 		tableCell: ({ value }) => {
// 			const { rows, headers } = value
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<table className='table-auto'>
// 						<tbody>
// 							{rows.map((row, index) => {
// 								if (index === 0) {
// 									return (
// 										<tr key={index} className='border border-tt-purple p-2'>
// 											{row.cells.map((data, index) => (
// 												<th
// 													key={index}
// 													className='border border-tt-purple p-2 font-bold'
// 												>
// 													{data}
// 												</th>
// 											))}
// 										</tr>
// 									)
// 								}

// 								return (
// 									<tr key={index} className='border border-tt-purple p-2'>
// 										{row.cells.map((data, index) => (
// 											<td key={index} className='border border-tt-purple p-2'>
// 												{data}
// 											</td>
// 										))}
// 									</tr>
// 								)
// 							})}
// 						</tbody>
// 					</table>
// 				</div>
// 			)
// 		},
// 		textHero: ({ value }) => {
// 			const { cta } = value
// 			// put cta into an array
// 			// check if cta is active
// 			// if active, pass cta into hero
// 			// if not, pass hero without cta
// 			let ctaArray = []
// 			if (cta) {
// 				ctaArray.push(cta)
// 			}
// 			return (
// 				<div className='flex w-full justify-center py-10'>
// 					<Hero active={true} ctaBlock={ctaArray} {...value} />
// 				</div>
// 			)
// 		},
// 	},
// }

{/* <PortableText value={content} components={NormalTextComponents} /> */}

const NormalText = ({ content }) => {
	return <PortableText value={content} />
}

export default NormalText
