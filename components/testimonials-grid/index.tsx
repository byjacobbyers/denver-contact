'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { reviewsQuery } from '@/sanity/queries/documents/review-query'
import { ReviewType } from '@/types/documents/review-type'
import SimpleText from '@/components/simple-text'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const fallbackImg = '/fallback-avatar.webp'

export default function TestimonialsGrid() {
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await client.fetch(reviewsQuery)
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-16 lg:py-24">
        <div className="text-center">Loading testimonials...</div>
      </div>
    )
  }

  if (!reviews.length) {
    return (
      <div className="container py-16 lg:py-24">
        <div className="text-center">No testimonials found.</div>
      </div>
    )
  }

  return (
    <section className="container py-16 lg:py-24 px-5">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {reviews.map((review) => (
          <Card
            key={review._id}
            className="break-inside-avoid mb-6 border-4 border-foreground bg-card"
          >
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 flex-shrink-0">
                  {review?.image?.asset?.url ? (
                    <AvatarImage
                      src={review.image.asset.url}
                      alt={review.name || 'Reviewer'}
                    />
                  ) : (
                    <AvatarImage src={fallbackImg} alt={review.name || 'Reviewer'} />
                  )}
                  <AvatarFallback>
                    {review.name?.[0]?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-semibold truncate">
                    {review.name}
                  </h3>
                </div>
              </div>
              <div className="text-foreground">
                {review.content && <SimpleText content={review.content} />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

