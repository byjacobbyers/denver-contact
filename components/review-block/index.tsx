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
import { Button } from '@/components/ui/button'

const fallbackImg = "/images/fallback-avatar.webp" // You can use a real fallback image path

const ReviewBlock: React.FC<ReviewBlockType> = ({
  active,
  componentIndex,
  anchor,
  title,
  reviews = []
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [])

  if (!active || !reviews.length) return null

  const selectedReview = reviews[selected]

  return (
    <section
      id={`${anchor ? anchor : 'review-block-' + componentIndex}`}
      className="review-block w-full flex flex-col items-center px-5 bg-accent py-16 lg:py-24"
    >
      <div className="container flex flex-col items-center gap-y-10">
        <h2 className="text-3xl 2xl:text-4xl font-bold w-full text-left mb-8">{title || 'TESTIMONIALS'}</h2>
        <div className="flex flex-row items-center justify-center gap-4 mb-8">
          {reviews.map((review, idx) => (
            <Button
              key={idx}
              variant={selected === idx ? 'default' : 'ghost'}
              className={`rounded-full p-1 border-2 ${selected === idx ? 'border-primary' : 'border-transparent'} transition-all w-18 h-18`}
              onClick={() => setSelected(idx)}
              aria-label={`Select review by ${review.name}`}
            >
              <Avatar className="w-16 h-16">
                {review?.image?.asset?.url ? (
                  <AvatarImage src={review.image.asset.url} alt={review.name} />
                ) : (
                  <AvatarImage src={fallbackImg} alt={review.name} />
                )}
                <AvatarFallback>{review.name?.[0] || '?'}</AvatarFallback>
              </Avatar>
            </Button>
          ))}
        </div>
        <div className="w-full px-8 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-2">{selectedReview.name}</h3>
          {/* If you add a title field to review, show it here */}
          {/* <div className="text-muted-foreground font-semibold mb-4">{selectedReview.title}</div> */}
          <blockquote className="text-lg mb-2 w-full text-balance">
            {selectedReview.content && <SimpleText content={selectedReview.content} />}
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default ReviewBlock
