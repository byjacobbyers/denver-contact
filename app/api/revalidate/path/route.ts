import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { apiVersion, dataset, projectId } from '@/sanity/env'

type WebhookPayload = {
	_type: string
	_id?: string
	slug?: { current?: string }
}

/**
 * Determines the path to revalidate based on document type and structure
 */
function getPathForDocument(body: WebhookPayload): string[] {
	const paths: string[] = []
	const { _type, slug } = body

	switch (_type) {
		case 'page': {
			const pageSlug = slug?.current
			if (pageSlug === 'home') {
				paths.push('/')
			} else if (pageSlug) {
				paths.push(`/${pageSlug}`)
			}
			break
		}

		case 'event': {
			const eventSlug = slug?.current
			if (eventSlug) {
				paths.push(`/events/${eventSlug}`)
			}
			// Also revalidate events listing pages if they exist
			paths.push('/')
			break
		}

		case 'review': {
			// Reviews appear on testimonials page
			paths.push('/testimonials')
      paths.push('/')
			break
		}

		case 'announcement': {
			// Announcements might appear on home page or other pages
			paths.push('/')
			break
		}

		case 'person': {
			// Person profiles might appear on various pages
			paths.push('/')
			break
		}

		case 'navigation':
		case 'site': {
			// These affect the entire site, revalidate all pages by targeting the root layout
			// Using 'layout' type revalidates all pages that share the root layout
			paths.push('/')
			break
		}

		default:
			// For unknown types, revalidate home page as fallback
			paths.push('/')
	}

	return paths
}

// GET handler for testing (returns 200 if route is accessible)
export async function GET() {
	return NextResponse.json({
		message: 'Path revalidation endpoint is active. Use POST to revalidate paths.',
		endpoint: '/api/revalidate/path',
		method: 'POST',
	})
}

export async function POST(req: NextRequest) {
	const startTime = Date.now()
	const requestId = Math.random().toString(36).substring(7)
	
	try {
		console.log(`[Revalidate ${requestId}] ===== Webhook Request Started =====`)
		console.log(`[Revalidate ${requestId}] Environment: ${process.env.VERCEL_ENV || 'local'}`)
		console.log(`[Revalidate ${requestId}] Dataset: ${dataset}`)
		console.log(`[Revalidate ${requestId}] Project ID: ${projectId}`)
		
		// Get the secret based on environment (Vercel allows setting different values per environment)
		// In Vercel, you can set SANITY_REVALIDATE_SECRET for Production, Preview, and Development separately
		const secret = process.env.SANITY_REVALIDATE_SECRET
		const hasSecret = !!secret
		
		console.log(`[Revalidate ${requestId}] Secret present: ${hasSecret}`)
		
		if (!secret) {
			console.error(`[Revalidate ${requestId}] ERROR: Missing SANITY_REVALIDATE_SECRET`)
			return new Response(
				'Missing environment variable SANITY_REVALIDATE_SECRET',
				{ status: 500 },
			)
		}

		const { isValidSignature, body } = await parseBody<WebhookPayload>(
			req,
			secret,
		)

		console.log(`[Revalidate ${requestId}] Signature valid: ${isValidSignature}`)
		console.log(`[Revalidate ${requestId}] Document type: ${body?._type}`)
		console.log(`[Revalidate ${requestId}] Document ID: ${body?._id || 'N/A'}`)
		console.log(`[Revalidate ${requestId}] Slug: ${body?.slug?.current || 'N/A'}`)

		if (!isValidSignature) {
			const message = 'Invalid signature'
			console.error(`[Revalidate ${requestId}] ERROR: ${message}`)
			return new Response(JSON.stringify({ message, isValidSignature, body }), {
				status: 401,
			})
		}

		if (!body?._type) {
			const message = 'Bad Request: Missing _type'
			console.error(`[Revalidate ${requestId}] ERROR: ${message}`)
			return new Response(JSON.stringify({ message, body }), { status: 400 })
		}

		// Get paths to revalidate based on document type
		console.log(`[Revalidate ${requestId}] Determining paths to revalidate...`)
		const paths = getPathForDocument(body)
		console.log(`[Revalidate ${requestId}] Found ${paths.length} path(s) to revalidate:`, paths)

		if (paths.length === 0) {
			const message = `No paths to revalidate for document type: ${body._type}`
			console.warn(`[Revalidate ${requestId}] WARNING: ${message}`)
			return NextResponse.json({ body, message })
		}

		// Revalidate all relevant paths
		const revalidationResults: Array<{ path: string; type: string }> = []
		
		paths.forEach(path => {
			let revalidateType = 'default'
			
			// For site-wide changes (navigation, site), use 'layout' type to revalidate all pages
			if (
				body._type === 'navigation' ||
				body._type === 'site'
			) {
				// Revalidate all pages by targeting the root layout
				revalidateType = 'layout'
				console.log(`[Revalidate ${requestId}] Revalidating layout path: ${path} (type: layout)`)
				revalidatePath(path, 'layout')
			} else if (body._type === 'page' && path !== '/') {
				// For specific pages, use 'page' type
				revalidateType = 'page'
				console.log(`[Revalidate ${requestId}] Revalidating page path: ${path} (type: page)`)
				revalidatePath(path, 'page')
			} else if (body._type === 'event') {
				// For events, use 'page' type for specific event pages
				if (path !== '/') {
					revalidateType = 'page'
					console.log(`[Revalidate ${requestId}] Revalidating event path: ${path} (type: page)`)
					revalidatePath(path, 'page')
				} else {
					// For home page revalidation (where events are listed)
					revalidateType = 'default'
					console.log(`[Revalidate ${requestId}] Revalidating path: ${path} (type: default)`)
					revalidatePath(path)
				}
			} else {
				// For home page or other specific paths
				revalidateType = 'default'
				console.log(`[Revalidate ${requestId}] Revalidating path: ${path} (type: default)`)
				revalidatePath(path)
			}
			
			revalidationResults.push({ path, type: revalidateType })
		})

		const duration = Date.now() - startTime
		const message = `Revalidated ${paths.length} path(s): ${paths.join(', ')}`
		
		console.log(`[Revalidate ${requestId}] ===== Revalidation Complete =====`)
		console.log(`[Revalidate ${requestId}] Duration: ${duration}ms`)
		console.log(`[Revalidate ${requestId}] Results:`, JSON.stringify(revalidationResults, null, 2))
		console.log(`[Revalidate ${requestId}] =================================`)
		
		return NextResponse.json({ 
			body, 
			message, 
			paths,
			revalidationResults,
			duration: `${duration}ms`,
			requestId,
		})
	} catch (err) {
		const duration = Date.now() - startTime
		console.error(`[Revalidate ${requestId}] ===== ERROR =====`)
		console.error(`[Revalidate ${requestId}] Duration before error: ${duration}ms`)
		console.error(`[Revalidate ${requestId}] Error:`, err)
		console.error(`[Revalidate ${requestId}] Error message:`, err instanceof Error ? err.message : String(err))
		console.error(`[Revalidate ${requestId}] Error stack:`, err instanceof Error ? err.stack : undefined)
		console.error(`[Revalidate ${requestId}] =================`)
		return new Response((err as Error).message, { status: 500 })
	}
}
