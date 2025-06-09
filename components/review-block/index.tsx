'use client'

// Tools


import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from 'react-device-detect';

//Types
import { ReviewBlockType } from "@/types/components/review-block-type"

// Components
import SimpleText from "@/components/simple-text"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const ReviewBlock: React.FC<ReviewBlockType> = ({
  active,
  componentIndex,
  anchor,
  title,
  reviews
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [])

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'review-block-' + componentIndex}`}
        className={`review-block w-full flex flex-col items-center px-5`}
      >
        <div className='container flex flex-col text-center gap-y-10 2xl:gap-y-16'>
          
          <motion.div 
            className='w-full relative flex justify-center'
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
              delay: !isMobileView ? 0 : 0,
              type: 'spring',
              duration: 1.5
            }}  
          >
            <h2 className='text-3xl 2xl:text-4xl 2xl:leading-relaxed max-w-6xl'>{title}</h2>
          </motion.div>
          <div className='flex flex-wrap lg:flex-nowrap gap-5 w-full justify-center items-start'>
            {reviews && reviews.map((review, index) => {
              return (
                <motion.div 
                  key={`review-${index}`} 
                  className='review text-balance w-full p-5 border-2 border-black lg:basis-1/3'
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
                    delay: !isMobileView ? 0+index*0.5 : 0,
                    type: 'spring',
                    duration: 1.5
                  }}  
                >
                  <div className='w-full flex flex-col items-center  justify-center gap-y-10'>
                    <div className='review-title w-full flex flex-col items-center gap-y-5'>
                      <div className='space-y-3'>
                        {review?.image?.asset.url && (
                          <Avatar>
                            <AvatarImage src={review?.image?.asset.url} alt={review?.name} />
                            <AvatarFallback>{review?.name}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      {review?.content && (
                        <div className='text-lg 2xl:text-xl space-y-2'>
                          <SimpleText content={review?.content} />
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col text-center'>
                      {review?.name && (<h3 className='text-2xl font-bold'>{review?.name}</h3>)}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return null
}

export default ReviewBlock
