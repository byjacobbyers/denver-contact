'use client'

// Tools
import { motion } from "framer-motion"
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from "react";

// Types
import { ColumnArrayType } from "@/types/arrays/column-array-type"
import { ColumnType } from "@/types/objects/column-type"

// Components
import SimpleText from "../simple-text"
import SanityImage from "../sanity-image"

interface ColumnArrayProps {
  row: ColumnArrayType 
}

const ColumnArray: React.FC<ColumnArrayProps> = ({
  row
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [])

  const columnLength = row.columns.length

  if (row.columns && row.columns.length > 0) {
    return (
      <div className={`column-array w-full flex flex-wrap xl:flex-nowrap ${columnLength <= 2 ? 'justify-around' : 'justify-center xl:justify-between gap-x-14'}  gap-y-16`}>
        {row.columns.map((column: ColumnType, index) => {

          return (
            <motion.div 
              key={`column-${index}`} 
              className='mt-10 lg:mt-0 w-full lg:max-w-xl 2xl:max-w-2xl flex flex-col gap-y-10 content items-center '
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
              {column.image && (
                <div className={`${columnLength > 2 ? 'w-28' : 'w-56'}`}>
                  <SanityImage
                    source={column.image}
                    alt={column.image.alt}
                    width={400}
                    height={400}
                    componentIndex={1}
                    className='object-cover object-center'
                  />
                </div>
              )}
              {column.content && (
                <div className='prose 2xl:prose-h2:text-4xl 2xl:prose-h2:leading-relaxed 2xl:prose-h3:leading-relaxed max-w-none text-balance'>
                  <SimpleText content={column.content} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    )
  }

  return null
}

export default ColumnArray
