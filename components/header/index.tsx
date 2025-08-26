'use client'

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { headerQuery } from "@/sanity/queries/components/page-nav-query"
import Nav from "@/components/navigation"
import MenuButton from "@/components/header/menu-button"
import MobileNav from "@/components/navigation/mobile"
import type { NavigationType } from "@/types/documents/navigation-type"
import { motion, useCycle } from "framer-motion"
import Announcement from "../announcement"


interface Dimension {
	width: number
	height: number
}

export default function Header() {
  const [navigation, setNavigation] = useState<NavigationType | null>(null)
  const [isOpen, toggleDropdown] = useCycle(false, true)
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

  const closeMenu = () => {
    toggleDropdown();
  };

  return (
    <>
    <Announcement />
    <header ref={targetRef} className="sticky top-0 z-50 w-full border-b-4 border-black bg-background px-5">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-[-0.25rem] leading-none p-0 tracking-0 lg:text-3xl" title="Denver Contact Improv">
              DCI
            </h1>
          </Link>
          <div className="hidden lg:block">
            {navigation && <Nav data={navigation} />}
          </div>
          <div className="lg:hidden">
            <MenuButton
              onClick={toggleDropdown}
              isOpen={isOpen}
              defaultColor='#4a3b33'
            />
          </div>
        </div>
    </header>
    {/* <div
      id='header-placeholder'
      style={{
        height: dimensions.height,
      }}
    /> */}
    <motion.div
        initial={'closed'}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        variants={{
          closed: {
            y: '-100%',
            opacity: 0,
          },
          open: {
            y: 0,
            opacity: 1,
          },
        }}
        style={{
          paddingTop: dimensions.height,
        }}
        className='fixed left-0 top-0 z-30 flex h-screen w-full flex-col items-center overflow-scroll bg-background px-5 text-center xl:hidden'
      >
        <hr className='border-thin w-full border-white' />
        {navigation && <MobileNav data={navigation} closeMenu={closeMenu} />}
      </motion.div>
    </>
  )
}