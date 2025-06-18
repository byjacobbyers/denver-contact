'use client'

// Tools
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from 'react-device-detect';
import { format } from 'date-fns';
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/queries/documents/event-query";
import Link from "next/link";

// Types
import { EventType } from "@/types/documents/event-type";

// Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SanityImage from "@/components/sanity-image";

const EventCarousel = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(eventsQuery);

        // Filter out past events and sort by start date
        const now = new Date();
        const upcomingEvents = data
          .filter((event: EventType) => new Date(event.startDate) >= now)
          .sort((a: EventType, b: EventType) => 
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );

        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (!events.length) {
    return null;
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event._id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/events/${event.slug.current}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="p-0">
                    {event.image && (
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <SanityImage
                          source={event.image}
                          alt={event.title}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="w-fit">
                        {event.eventType}
                      </Badge>
                      <h3 className="text-xl font-semibold line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(event.startDate), 'MMMM d, yyyy')}
                        {event.endDate && 
                          ` - ${format(new Date(event.endDate), 'MMMM d, yyyy')}`
                        }
                      </div>
                      {event.location && (
                        <p className="text-sm text-muted-foreground">
                          {event.location}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {events.length > 3 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default EventCarousel;
