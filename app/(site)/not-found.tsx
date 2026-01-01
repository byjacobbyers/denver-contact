import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center space-y-5 px-5 text-center bg-background'>
			<h1 className='text-4xl lg:text-5xl font-bold text-foreground'>404</h1>
			<h2 className='text-2xl lg:text-3xl text-foreground'>Page not found</h2>
			<p className='text-lg text-muted-foreground max-w-md'>
				Looks like you&apos;ve wandered off the path. Let&apos;s get you back on track.
			</p>
			<Button asChild size="lg">
				<Link href='/'>
					Go back home
				</Link>
			</Button>
		</main>
	)
}

