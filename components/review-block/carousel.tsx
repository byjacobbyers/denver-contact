'use client'

// Tools
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from 'react-device-detect';
import Autoplay from "embla-carousel-autoplay"

// Types
import { ReviewBlockType } from "@/types/components/review-block-type";

// Components
import SimpleText from "@/components/simple-text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const ReviewBlock: React.FC<ReviewBlockType> = ({
  active,
  componentIndex,
  anchor,
  title,
  reviews
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    setIsMobileView(isMobile);
  }, []);

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'review-block-' + componentIndex}`}
        className={`review-block w-full flex flex-col items-center px-5`}
      >
        <div className="container flex flex-col text-center gap-y-10 2xl:gap-y-16">
          {/* Animated Title */}
          <motion.div
            className="w-full relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: !isMobileView ? 0 : 0,
              type: 'spring',
              duration: 1.5,
            }}
          >
            <h2 className="text-3xl 2xl:text-4xl 2xl:leading-relaxed max-w-6xl">
              {title}
            </h2>
          </motion.div>

          {/* Carousel with Animated Reviews */}
          <Carousel 
            className="w-full mx-auto"
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            {reviews && reviews.length > 3 && <CarouselPrevious/>}
            
            <CarouselContent className="">
              {reviews && reviews.map((review, i) => (
                <CarouselItem key={i}  className="w-full lg:basis-1/3 h-full">
                  <motion.div
                    className="review flex text-balance p-5 border-2 border-black h-full "
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: !isMobileView ? 0 + i * 0.5 : 0,
                      type: 'spring',
                      duration: 1.5,
                    }}
                  >
                    <div className="w-full flex flex-col items-center justify-center gap-y-10">
                      <div className="review-title w-full flex flex-col items-center gap-y-5">
                        <div className="space-y-3">
                          {review?.image?.asset.url && (
                            <Avatar>
                              <AvatarImage src={review?.image?.asset.url} alt={review?.name} />
                              <AvatarFallback>{review?.name}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        {review?.content && (
                          <div className="text-lg 2xl:text-xl space-y-2 text-balance">
                            <SimpleText content={review?.content} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col text-center">
                        {review?.name && <h3 className="text-2xl font-bold">{review?.name}</h3>}
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {reviews && reviews.length > 3 && <CarouselNext/>}
          </Carousel>
        </div>
      </section>
    );
  }

  return null;
};

export default ReviewBlock;
