'use client'

// Tools
import { motion } from "framer-motion"
import MuxPlayer from '@mux/mux-player-react'


// Types
import { HeroBlockType } from "@/types/components/hero-block-type"

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"
import SanityImage from "@/components/sanity-image"


const HeroBlock: React.FC<HeroBlockType> = ({
  active,
  componentIndex,
  content,
  layout,
  anchor,
  video,
  image,
  cta
}) => {
  let layoutClass = 'md:flex-row-reverse'

  if (layout == 'image-right') {
		layoutClass = 'md:flex-row'
	}

  if (active) {
    return (
      <section 
        id={`${anchor ? anchor : 'hero-block-' + componentIndex}`}
        className='hero-block w-full flex justify-center px-5 py-16 lg:py-24'
      >
        <div className={`container flex flex-wrap md:flex-nowrap ${layoutClass} flex-col-reverse  items-center w-full gap-y-5 gap-x-24`}>
          <motion.div 
            className="w-full md:w-2/3"
            initial={{ 
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{ 
              opacity: 1,
              scale: 1
            }}
            viewport={{ once: true }} 
            transition={{ 
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: 'spring',
              duration: 1.5
            }}
          >
            <SimpleText content={content} />
            {cta && cta.active && (
              <motion.div 
                className='flex justify-center md:justify-start'
                initial={{ 
                  opacity: 0,
                  scale: 0.95
                }}
                whileInView={{ 
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: true }} 
                transition={{ 
                  delay: componentIndex !== 0 ? 0.5 : 0,
                  type: 'spring',
                  duration: 1.5
                }}
              >
                <Route data={cta.route} className='flex'>
                  <motion.div
                    initial={{ 
                      scale: 1
                    }}
                    whileHover={{ 
                      scale: 1.05
                    }}
                    whileTap={{ 
                      scale: 0.95
                    }}
                    transition={{ 
                      type: 'spring',
                      duration: 0.5
                    }}
                    className='flex w-full mt-5'
                  >
                    <Button>
                      {cta?.route?.title ? cta?.route?.title : 'Learn More'}
                    </Button>
                  </motion.div>
                </Route>
              </motion.div>
            )}
          </motion.div>
          <motion.div 
            className="w-full aspect-lottie md:w-1/3"
            initial={{ 
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{ 
              opacity: 1,
              scale: 1
            }}
            viewport={{ once: true }} 
            transition={{ 
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: 'spring',
              duration: 1.5
            }}
          >
            {video?.asset.playbackId ? (
              <MuxPlayer
                key={video.asset.playbackId}
                streamType='on-demand'
                playbackId={video.asset.playbackId}
                autoPlay={true}
                muted
                loop={false}
                className={`h-auto w-full hide-controls`}
                onError={() => {
                  // Optional: could set a state to trigger fallback
                }}
              />
            ) : (
              image && (
                <SanityImage
                  source={image}
                  alt={image?.alt || 'Fallback image'}
                  width={700}
                  height={440}
                  componentIndex={componentIndex}
                  className='object-cover object-center w-full h-auto'
                />
              )
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}

export default HeroBlock