'use client'

// Tools
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { isMobile } from 'react-device-detect'

// Types
import { EventsBlockType } from "@/types/components/events-block-type"

// Components
import EventCarousel from "./carousel"

const EventsBlock: React.FC<EventsBlockType> = ({
  active,
  componentIndex,
  anchor,
  title,
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [])

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'events-block-' + componentIndex}`}
        className="w-full flex flex-col items-center px-5 py-16 lg:py-24 bg-accent"
      >
        <div className="container flex flex-col gap-y-10 2xl:gap-y-16">
          <motion.div
            className="w-full relative flex"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: !isMobileView ? 0 : 0,
              type: 'spring',
              duration: 1.5,
            }}
          >
            <h2 className="text-3xl 2xl:text-4xl 2xl:leading-relaxed">
              {title}
            </h2>
          </motion.div>

          <motion.div
            className="w-full relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: !isMobileView ? 0 : 0,
              type: 'spring',
              duration: 1.5,
            }}
          >
            <EventCarousel />
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}

export default EventsBlock
