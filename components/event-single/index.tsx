'use client'

// Tools
import { motion } from "framer-motion"
import { format, parseISO } from 'date-fns'
import { useState, useEffect } from 'react'

// Types
import { EventType } from "@/types/documents/event-type"

// Components
import SanityImage from "@/components/sanity-image"
import Sections from "@/components/sections"

export default function EventSingle({ event }: { event: EventType }) {
  const { title, image, startDate, endDate, location, sections, timeString } = event
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <article className="flex min-h-screen flex-col items-center gap-y-24 pb-12 lg:pb-24">
      {/* Hero Image Section */}
      <section className="w-full -mt-24">
        {image && (
          <div className="w-full">
            <SanityImage
              source={image}
              alt={image?.alt || 'Event image'}
              width={1920}
              height={isMobile ? 1200 : 600}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </section>

      {/* Title and Details Section */}
      <section className="container flex flex-col items-center text-center">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="lg:text-7xl mb-6">{title}</h1>
          <div className="flex flex-col gap-2 text-xl">
            <div>
              {startDate && (
                <p>
                  {format(parseISO(startDate), 'MMMM d, yyyy')}
                  {endDate && startDate !== endDate && ` - ${format(parseISO(endDate), 'MMMM d, yyyy')}`}
                </p>
              )}
            </div>
            {timeString && <p>{timeString}</p>}
            {location && <p>{location}</p>}
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <Sections body={sections} />
    </article>
  )
}
