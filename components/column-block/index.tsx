'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { ColumnBlockType } from "@/types/components/column-block-type"
import { ColumnArrayType } from "@/types/arrays/column-array-type"

// Components
import SimpleText from "@/components/simple-text"
import ColumnArray from "@/components/column-array"

const ColumnBlock: React.FC<ColumnBlockType> = ({
  active,
  componentIndex,
  anchor,
  content,
  rows
}) => {


  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'column-block-' + componentIndex}`}
        className={`column-block w-full flex flex-col justify-center px-5`}
      >
        <div className='container'>
          {content && (
            <motion.div 
              className='p'
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
            </motion.div>
          )}
          <div className='flex flex-col gap-28 w-full'>
            {rows && rows.map((row, index) => { 
              return (
                <div key={index} className='w-full '>
                  {row._type === 'columnArray' ? (
                    <ColumnArray row={row as ColumnArrayType} />
                  ) : null}
                </div>
              )
            })}
          </div>
           
        </div>
      </section>
    )
  }

  return null
}

export default ColumnBlock
