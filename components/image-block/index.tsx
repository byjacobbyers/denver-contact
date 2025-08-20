'use client'

// Tools
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Types
import { ImageBlockType } from '@/types/components/image-block-type'

// Components
import SimpleText from '@/components/simple-text'
import SanityImage from '@/components/sanity-image'
import { useHeaderHeight } from '@/contexts/header-context'
import Route from '@/components/route'
import { Button } from '@/components/ui/button'

const ImageBlock: React.FC<ImageBlockType> = ({
  active,
  componentIndex,
  anchor,
  image,
  fullScreen,
  halfHeight,
  content,
  cta,
}) => {
  const { headerHeight } = useHeaderHeight()

  // Lock in height after mount to avoid mobile resize jank
  const [lockedHeight, setLockedHeight] = useState<string | null>(null)

  useEffect(() => {
    const vh = window.innerHeight
    const height = halfHeight ? vh * 0.5 : vh
    setLockedHeight(`${height - headerHeight}px`)
  }, [headerHeight, halfHeight])

  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : 'image-block-' + componentIndex}`}
      className={`image-block w-full flex justify-center ${fullScreen ? 'relative' : 'px-5'} `}
    >
      {fullScreen ? (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: lockedHeight ?? `calc(${halfHeight ? '50vh' : '100vh'} - ${headerHeight}px)` }}
        >
          <div className="flex absolute inset-0 bg-black/50 z-10 items-center justify-center">
            <motion.div
              className="text-white text-center w-full max-w-4xl px-5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: 'spring',
                duration: 1.5,
              }}
            >
              {content && <SimpleText content={content} />}
              {cta?.active && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: componentIndex !== 0 ? 0.5 : 0,
                    type: 'spring',
                    duration: 1.5,
                  }}
                >
                  <Route data={cta.route} className="flex">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="flex w-full"
                    >
                      <Button>
                        {cta?.route?.title ? cta.route.title : 'Learn More'}
                      </Button>
                    </motion.div>
                  </Route>
                </motion.div>
              )}
            </motion.div>
          </div>

          {image && (
            <div className="w-full lg:aspect-[16/9] lg:absolute lg:inset-0 h-full">
              <SanityImage
                source={image}
                alt={image?.alt || 'Fallback image'}
                width={2560}
                height={1440}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="container flex flex-col items-center justify-center">
          <motion.div
            className="w-full aspect-video max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: componentIndex !== 0 ? 0.5 : 0, type: 'spring', duration: 1.5 }}
          >
            {image && (
                          <SanityImage
              source={image}
              alt={image?.alt || 'Fallback image'}
              width={2560}
              height={1440}
              componentIndex={componentIndex}
              className="w-full h-full object-cover"
            />
            )}
          </motion.div>
          {content && (
            <motion.div
              className="text-center w-full max-w-4xl mt-10 prose prose-h1:text-9xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: componentIndex !== 0 ? 0.5 : 0, type: 'spring', duration: 1.5 }}
            >
              <SimpleText content={content} />
            </motion.div>
          )}
          {cta?.active && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: componentIndex !== 0 ? 0.5 : 0, type: 'spring', duration: 1.5 }}
            >
              <Route data={cta.route} className="flex w-full">
                <Button>{cta.route?.title || 'Learn More'}</Button>
              </Route>
            </motion.div>
          )}
        </div>
      )}
    </section>
  )
}

export default ImageBlock