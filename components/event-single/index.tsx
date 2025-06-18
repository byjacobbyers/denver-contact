'use client'

// Tools
import { motion } from "framer-motion"
import { format } from 'date-fns'

// Types
import { EventType } from "@/types/documents/event-type"

// Components
import SanityImage from "@/components/sanity-image"
import NormalText from "@/components/normal-text"

export default function EventSingle({ event }: { event: EventType }) {
  const { title, image, startDate, endDate, location, content } = event

  return (
    <article className="flex min-h-screen flex-col items-center gap-y-24 pb-12 lg:pb-24">
      {/* Hero Image Section */}
      <section className="w-full">
        {image && (
          <div className="w-full">
            <SanityImage
              source={image}
              alt={image?.alt || 'Event image'}
              width={1920}
              height={600}
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
          <h1 className="text-7xl mb-6">{title}</h1>
          <div className="flex flex-col gap-2 text-xl">
            <div>
              {startDate && (
                <p>
                  {format(new Date(startDate), 'MMMM d, yyyy')}
                  {endDate && ` - ${format(new Date(endDate), 'MMMM d, yyyy')}`}
                </p>
              )}
            </div>
            {location && <p>{location}</p>}
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      {content && (
        <section className="container">
          <motion.div
            className="w-full max-w-4xl mx-auto flex flex-col gap-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NormalText content={content} />
          </motion.div>
        </section>
      )}
    </article>
  )
}
