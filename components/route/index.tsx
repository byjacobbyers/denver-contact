'use client'

// Tools
import Link from 'next/link'
import { cn } from "@/lib/utils"

// Types
import { RouteType } from '@/types/objects/route-type'

interface RouteProps {
	data: RouteType
	className?: string
	children?: React.ReactNode
}

const Route: React.FC<RouteProps> = ({ data, className, children }) => {
	const commonProps = {
		className: cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			className
		),
		target: data?.blank ? '_blank' : undefined,
		rel: data?.blank ? 'noopener noreferrer' : undefined,
	}

	if (data?.pageRoute) {
		const href = data.pageRoute._type === 'event' 
			? `/events/${data.pageRoute.slug.current}`
			: `/${data.pageRoute.slug.current}`
		
		return (
			<Link href={href} {...commonProps}>
				{children}
			</Link>
		)
	} else if (data?.route) {
		return (
			<Link href={`/${data.route}`} {...commonProps}>
				{children}
			</Link>
		)
	} else if (data?.anchor) {
		return (
			<Link href={`#${data.anchor}`} {...commonProps}>
				{children}
			</Link>
		)
	} else if (data?.link) {
		return (
			<a href={data.link} {...commonProps}>
				{children}
			</a>
		)
	} else {
		return null
	}
}

export default Route
