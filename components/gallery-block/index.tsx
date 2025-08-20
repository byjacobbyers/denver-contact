'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { GalleryBlockType } from "@/types/components/gallery-block-type"

// Components
import SimpleText from "@/components/simple-text"
import SanityImage from "@/components/sanity-image"

const GalleryBlock: React.FC<GalleryBlockType> = ({
  active,
  componentIndex,
  anchor,
  images,
  fullScreen,
  content,
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "gallery-block-" + componentIndex}`}
      className={`gallery-block w-full flex justify-center ${fullScreen ? "relative" : "px-5"}`}
    >
      <div className="container flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images?.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden aspect-[16/9] bg-card">
              <SanityImage
                source={image}
                alt={image?.alt || `Gallery image ${index + 1}`}
                width={2560}
                height={1440}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {content && (
          <div className="text-center w-full max-w-4xl mt-10">
            <SimpleText content={content} />
          </div>
        )}
      </div>
    </section>
  )
}

export default GalleryBlock