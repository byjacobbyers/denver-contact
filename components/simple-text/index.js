'use client'

import { PortableText } from '@portabletext/react'
// import Link from 'next/link'
// import { urlFor } from '@/components/sanity-image/url'
// import iconPoint from '@/sanity/schemas/objects/icon-point-schema'
// import iconTitle from '@/sanity/schemas/objects/icon-title-schema'

const simpleTextComponents = {
	block: {
		small: ({ children }) => <p className='small-text'>{children}</p>,
	},
	// marks: {
	// 	simpleLink: ({ value, children }) => {
	// 		const data = value

	// 		return (
	// 			<a
	// 				href={data.href}
	// 				target={data.blank ? '_blank' : '_self'}
	// 				rel={data.doFollow ? 'external' : 'noopener noreferrer'}
	// 			>
	// 				{children}
	// 			</a>
	// 		)
	// 	},
	// 	emailUrl: ({ value, children }) => {
	// 		const data = value.href
	// 		return (
	// 			<a href={`mailto:${data}`} target='_blank' rel='noopener noreferrer'>
	// 				{children}
	// 			</a>
	// 		)
	// 	},
	// 	routeLink: ({ value, children }) => {
	// 		const data = value

	// 		if (data.pageRoute) {
	// 			return (
	// 				<Link
	// 					href={data.pageRoute.slug.current}
	// 					target={data.blank ? '_blank' : '_self'}
	// 				>
	// 					{children}
	// 				</Link>
	// 			)
	// 		} else if (data.route) {
	// 			return (
	// 				<Link href={data.route} target={data.blank ? '_blank' : '_self'}>
	// 					{children}
	// 				</Link>
	// 			)
	// 		} else {
	// 			return (
	// 				<a
	// 					href={data.link.link}
	// 					target={data.blank ? '_blank' : '_self'}
	// 					rel={data.link.nofollow ? 'noopener noreferrer' : 'external'}
	// 				>
	// 					{children}
	// 				</a>
	// 			)
	// 		}
	// 	},
	// 	color: ({ value, children }) => {
	// 		const color = value.color.value
	// 		return <span style={{ color }}>{children}</span>
	// 	},
	// },
	// types: {
	// 	lineBreak: () => {
	// 		return (
	// 			<hr className='mx-auto w-48 rounded border-2 border-solid border-tt-purple lg:w-72' />
	// 		)
	// 	},
	// 	iconSubTitle: ({ value }) => {
	
	// 		const { icon, text } = value
	// 		return (
	// 			<div className='flex items-center'>
					
	// 				<h2 className='text-3xl md:text-5xl font-medium'>{text}</h2>
	// 				{icon && (
	// 					<div className='ml-4 w-6 md:w-8'>
	// 						<img src={urlFor(icon).width(96).url()} alt={text} />
	// 					</div>
	// 				)}
	// 			</div>
	// 		)
	// 	},
	// 	iconPoint: ({ value }) => {
	// 		const { icon, text, title } = value
	// 		return (
	// 			<div className='icon-point flex items-start gap-4'>
	// 				{icon && <img className='w-10' width={48} src={urlFor(icon).url()} alt={text} />}
	// 				<div>
	// 					<p style={{fontWeight: '800', margin: '0 0 0.5rem 0'}}>{title}</p>
	// 					<p style={{margin: '0'}}>{text}</p>
	// 				</div>
					
	// 			</div>
	// 		)
	// 	},
	// 	iconTitle: ({ value }) => {
	// 		const { icon, text } = value
	// 		return (
	// 			<div className='flex flex-col md:flex-row items-center text-center gap-4'>
	// 				{icon && <img className='w-6' width={48} src={urlFor(icon
	// 				).url()} alt={text} />}
	// 				<h2 className='text-3xl md:text-4xl'>{text}</h2>
	// 			</div>
	// 		)
	// 	}
	// },
}

{/* <PortableText value={content} components={simpleTextComponents} /> */}

const SimpleText = ({ content }) => {

	return <PortableText value={content} components={simpleTextComponents} />
}

export default SimpleText
