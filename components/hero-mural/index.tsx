'use client'

// Tools
import { useEffect, useState } from 'react'
import { motion } from "framer-motion"

// Types
import { HeroMuralType } from "@/types/components/hero-mural-type"

// Components
import SanityImage from "@/components/sanity-image"
import { useHeaderHeight } from '@/contexts/header-context'

const HeroMural: React.FC<HeroMuralType> = ({
  active,
  componentIndex,
  anchor,
  image,
  behindText,
  frontImage,
  frontText,
}) => {
  const { headerHeight } = useHeaderHeight()

  // Lock in height after mount to avoid mobile resize jank
  const [lockedHeight, setLockedHeight] = useState<string | null>(null)

  useEffect(() => {
    const vh = window.innerHeight
    const height = vh
    setLockedHeight(`${height - headerHeight}px`)
  }, [headerHeight])

  if (!active) return null

    return (
    <section
      id={`${anchor ? anchor : "hero-mural-" + componentIndex}`}
      className="hero-mural w-full flex justify-center relative"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: lockedHeight ?? `calc(100vh - ${headerHeight}px)` }}
      >
        <motion.div
          className="w-full relative h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: componentIndex !== 0 ? 0.5 : 0,
            type: "spring",
            duration: 1.5,
          }}
        >
          {/* Background Image */}
          {image && (
            <div className="w-full h-full absolute inset-0 z-0">
              <SanityImage
                source={image}
                alt={image?.alt || 'Hero mural background'}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Behind Text - Centered and positioned 25% from top */}
          {behindText && (
            <motion.h1
              className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center !font-extrablack text-foreground select-none pointer-events-none w-screen max-w-none"
              style={{
                fontSize: 'clamp(4rem, 20vw, 40rem)',
                textShadow: `
                  -1px -1px 0 #fff,
                  1px -1px 0 #fff,
                  -1px 1px 0 #fff,
                  1px 1px 0 #fff,
                  0 0 1px #fff
                `
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: componentIndex !== 0 ? 0.7 : 0.2,
                type: 'spring',
                duration: 1.5,
              }}
            >
              {behindText}
            </motion.h1>
          )}
          
          {/* Front Image - Stacked on top at same dimensions as background */}
          {frontImage && (
            <div className="w-full h-full absolute inset-0 z-20">
              <SanityImage
                source={frontImage}
                alt={frontImage?.alt || 'Hero mural front image'}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Front Text - Centered and positioned 10rem from bottom */}
          {frontText && (
            <motion.h2
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-full text-center font-bold text-white text-5xl md:text-6xl lg:text-8xl xl:text-9xl drop-shadow-md"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: componentIndex !== 0 ? 0.9 : 0.4,
                type: 'spring',
                duration: 1.5,
              }}
            >
              {frontText}
            </motion.h2>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroMural
