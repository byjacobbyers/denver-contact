'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { CtaBlockType } from '@/types/components/cta-block-type'

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"


const CtaBlock: React.FC<CtaBlockType> = ({
  active,
  componentIndex,
  anchor,
  content,
  cta,
  alignment = 'text-center',
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "cta-block-" + componentIndex}`}
      className="cta-block w-full flex justify-center px-5"
    >
      <div className={`container flex flex-col ${alignment === 'text-left' ? 'items-start' : alignment === 'text-right' ? 'items-end' : 'items-center'} justify-center py-16 lg:py-24`}>
        <motion.div
          className={`w-full max-w-4xl ${alignment}`}
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
              className={`flex ${alignment === 'text-left' ? 'justify-start' : alignment === 'text-right' ? 'justify-end' : 'justify-center'}`}
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
              <Route data={cta.route}>
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
                  className=' mt-5'
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
    </section>
  )
}

export default CtaBlock