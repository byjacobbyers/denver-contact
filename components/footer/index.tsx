'use client'

// Tools
import Link from "next/link"
import { useEffect, useState } from "react"
import { client } from '@/sanity/lib/client'
import { BiLogoLinkedin } from "react-icons/bi"

// Types
import { NavigationType } from "@/types/documents/navigation-type"
import { SocialType } from "@/types/components/social-type"

// Queries
import { SiteQuery } from "@/sanity/queries/documents/site-query"
import { footerQuery } from "@/sanity/queries/components/page-nav-query"

// Components
import FooterNav from "../navigation/footer"

export default function Footer() {
  // const [navigation, setNavigation] = useState<NavigationType | null>(null)
  // const [socials, setSocials] = useState<SocialType | null>(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [navData, siteData] = await Promise.all([
  //       client.fetch(footerQuery),
  //       client.fetch(SiteQuery)
  //     ])
  //     setNavigation(navData)
  //     if (siteData && siteData.length > 0) {
  //       setSocials(siteData[0].social)
  //     }
	// 	}

  //   fetchData()
	// }, [])

  // set copyright year
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-4 border-foreground bg-background px-4 py-6">
      <div className="flex items-center justify-between">
        <small className="text-sm w-1/2">
          © {year} Denver Contact Improv. All rights reserved.
        </small>
        {/* <div className="flex items-center gap-8">
          {navigation && <FooterNav data={navigation} />}
        {socials?.linkedin && (
            <Link 
              href={socials.linkedin} 
              target="_blank"
              className="bg-foreground text-background h-10 w-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <BiLogoLinkedin size="1.5rem" />
          </Link>
        )}
        </div> */}
        {/* <div className="flex items-center gap-8">
          {navigation && <FooterNav data={navigation} />}
          {socials?.linkedin && (
            <Link 
              href={socials.linkedin} 
              target="_blank"
              className="bg-foreground text-background h-10 w-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <BiLogoLinkedin size="1.5rem" />
            </Link>
          )}
          
        </div> */}
        <Link 
          href="https://www.jacobbyers.me/" 
          target="_blank"
          className="text-sm hover:opacity-90 transition-opacity"
        >
          Website by Jacob Byers
        </Link>
      </div>
    </footer>
  )
}