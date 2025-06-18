'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { ImageBlockType } from "@/types/components/image-block-type"

// Components
import SimpleText from "@/components/simple-text"
import SanityImage from "@/components/sanity-image"
import { useHeaderHeight } from '@/contexts/header-context'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"

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

  // Determine height for fullscreen
  let sectionHeight = `calc(100vh - ${headerHeight}px)`
  if (fullScreen && halfHeight) {
    sectionHeight = `calc(50vh - ${headerHeight}px)`
  }

  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "image-block-" + componentIndex}`}
      className={`image-block w-full flex justify-center ${fullScreen ? "relative px-5 lg:px-0" : "px-5"} `}
    >
      {fullScreen ? (
        // Full-Screen Layout
        <div 
          className="relative w-full overflow-hidden last:-mt-24"
          style={{ height: sectionHeight }}
        >
          {/* Desktop Overlay */}
          <div className="hidden lg:flex absolute inset-0 bg-black/50 z-10 items-center justify-center">
            <motion.div
              className="text-white text-center w-full max-w-4xl px-5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: "spring",
                duration: 1.5,
              }}
            >
              {content && <SimpleText content={content} />}
              {cta && cta.active && (
                <motion.div 
                  className='flex justify-center mt-8'
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: componentIndex !== 0 ? 0.5 : 0, type: 'spring', duration: 1.5 }}
                >
                  <Route data={cta.route} className='flex'>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className='flex w-full'
                    >
                      <Button>
                        {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                      </Button>
                    </motion.div>
                  </Route>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Image with responsive height */}
          {image && (
            <div className="w-full aspect-[16/9] lg:absolute lg:inset-0 lg:h-full">
              <SanityImage
                source={image}
                alt={image?.alt || 'Fallback image'}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Mobile Text (below image) */}
          <div className="block lg:hidden  text-center py-6 px-4 prose prose-h1:text-9xl">
            {content && <SimpleText content={content} />}
            {cta && cta.active && (
              <div className='flex justify-center mt-8'>
                <Route data={cta.route} className='flex w-full'>
                  <Button>
                    {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                  </Button>
                </Route>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Regular Layout
        <div className="container flex flex-col items-center justify-center">
          <motion.div
            className="w-full aspect-video w-full max-w-4xl"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: "spring",
              duration: 1.5,
            }}
          >
            {image && (
              <SanityImage
                source={image}
                alt={image?.alt || 'Fallback image'}
                width={1920}
                height={1080}
                componentIndex={componentIndex}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          {content && (
            <motion.div
              className="text-center w-full max-w-4xl mt-10 prose prose-h1:text-9xl"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: "spring",
                duration: 1.5,
              }}
            >
              <SimpleText content={content} />
            </motion.div>
          )}
          {cta && cta.active && (
            <motion.div
              className='flex justify-center mt-8'
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: componentIndex !== 0 ? 0.5 : 0, type: 'spring', duration: 1.5 }}
            >
              <Route data={cta.route} className='flex w-full'>
                <Button>
                  {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                </Button>
              </Route>
            </motion.div>
          )}
        </div>
      )}
    </section>
  )
}

export default ImageBlock