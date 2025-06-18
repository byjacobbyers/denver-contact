'use client'

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { headerQuery } from "@/sanity/queries/components/page-nav-query"
import Nav from "@/components/navigation"
import type { NavigationType } from "@/types/documents/navigation-type"


interface Dimension {
	width: number
	height: number
}

export default function Header() {
  const [navigation, setNavigation] = useState<NavigationType | null>(null)
  const targetRef = useRef<HTMLButtonElement>(null)
  const [dimensions, setDimensions] = useState<Dimension>({
		width: 0,
		height: 0,
	})

  useEffect(() => {
    const fetchNavigation = async () => {
      const data = await client.fetch(headerQuery)
      setNavigation(data)
    }
    fetchNavigation()
  }, [])

  useEffect(() => {
		if (targetRef.current) {
			setDimensions({
				width: targetRef.current.offsetWidth,
				height: targetRef.current.offsetHeight,
			})
		}
	}, [])

  return (
    <>
    <header ref={targetRef} className="sticky top-0 z-50 w-full border-b-4 border-black bg-background px-5">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-[-0.25rem] leading-none p-0 tracking-0 lg:text-3xl" title="Denver Contact Improv">
              DCI
            </h1>
          </Link>
          {navigation && <Nav data={navigation} />}
        </div>
    </header>
    <div
      id='header-placeholder'
      style={{
        height: dimensions.height,
      }}
    />
    </>
  )
}