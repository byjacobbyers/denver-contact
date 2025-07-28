'use client'

// Tools


import { motion, AnimatePresence } from "framer-motion";
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

  // Auto-play through reviews
  // useEffect(() => {
  //   if (!reviews.length || reviews.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setSelected((prev) => (prev + 1) % reviews.length);
  //   }, 3000); // 3 seconds per review

  //   return () => clearInterval(interval);
  // }, [reviews.length]);

  if (!active || !reviews.length) return null

  const selectedReview = reviews[selected]

  return (
    <section
      id={`${anchor ? anchor : 'review-block-' + componentIndex}`}
      className="review-block w-full flex flex-col items-center px-5 bg-accent py-16 lg:py-24"
    >
      <div className="container flex flex-col items-center gap-y-10">
        <motion.div
          className="w-full relative flex"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: !isMobileView ? 0 : 0,
            type: 'spring',
            duration: 1.5,
          }}
        >
          <h2 className="text-3xl 2xl:text-4xl font-bold w-full text-left mb-8">{title || 'TESTIMONIALS'}</h2>
        </motion.div>
        {/* 
          Stacked avatar layout where avatars overlap but remain visible
        */}
        <div className="relative flex justify-center items-center mb-8 w-full max-w-5xl mx-auto h-20">
          {reviews.map((review, idx) => {
            const isSelected = selected === idx;
            const distance = Math.abs(selected - idx);
            const zIndex = reviews.length - distance;
            const translateX = (idx - selected) * 40; // Offset each avatar
            
            return (
              <motion.div
                key={idx}
                className="absolute"
                animate={{
                  scale: isSelected ? 1.1 : 0.9,
                  x: translateX,
                  zIndex: isSelected ? reviews.length + 1 : zIndex,
                  opacity: distance <= 2 ? 1 : 0.6, // Fade out distant avatars
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  zIndex: isSelected ? reviews.length + 1 : zIndex,
                }}
              >
                <Button
                  variant={isSelected ? 'default' : 'ghost'}
                  className={`rounded-full p-1 border-2 transition-all w-18 h-18 ${
                    isSelected ? 'border-primary shadow-lg' : 'border-transparent'
                  }`}
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
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className="w-full px-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold mb-2">{selectedReview.name}</h3>
            {/* If you add a title field to review, show it here */}
            {/* <div className="text-muted-foreground font-semibold mb-4">{selectedReview.title}</div> */}
            <blockquote className="text-lg mb-2 w-full text-balance">
              {selectedReview.content && <SimpleText content={selectedReview.content} />}
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ReviewBlock
