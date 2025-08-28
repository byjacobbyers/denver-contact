'use client'

// Tools
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from 'react-device-detect';
import { format, parseISO } from 'date-fns';
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
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SanityImage from "@/components/sanity-image";

const parseSanityDate = (dateStr: string) => parseISO(dateStr + 'T12:00:00');

const EventCarousel = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(eventsQuery);

        // Filter out past events and sort by start date DESCENDING
        const now = new Date();
        const upcomingEvents = data
          .filter((event: EventType) => {
            // Show event if now is before or equal to the end date (or if no endDate, use startDate)
            const endDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
            // Add 1 day to endDate to include the whole end day
            endDate.setHours(23, 59, 59, 999);
            return endDate >= now;
          })
          .sort((a: EventType, b: EventType) => 
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
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

  // Remove the manual auto-advance useEffect since we're using the autoplay plugin

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
        // plugins={[
        //   Autoplay({
        //     delay: 8000,
        //     //stopOnInteraction: false,
        //   }),
        // ]}
        setApi={setApi}
      >
        <CarouselContent className={`${events.length > 3 ? 'w-full' : 'w-full md:flex md:justify-center'}`}>
          {events.map((event) => (
            <CarouselItem key={event._id} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
              <Link href={`/events/${event.slug.current}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="p-0">
                    {event.image && (
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl">
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
                  <CardContent className="px-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="w-fit">
                          {event.eventType}
                        </Badge>
                        {event.soldOut && (
                          <Badge variant="destructive" className="w-fit">
                            Sold Out
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {format(parseSanityDate(event.startDate), 'MMMM d, yyyy')}
                        {event.endDate && event.startDate !== event.endDate &&
                          ` - ${format(parseSanityDate(event.endDate), 'MMMM d, yyyy')}`
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.timeString}
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
