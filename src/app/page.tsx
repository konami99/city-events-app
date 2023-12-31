import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'
import { getEvents } from '@/lib/db/event';
import { useEffect } from 'react';

export default async function Home() {

  const events = await getEvents();

  //console.log(events.length);

  if (events.length > 0) {
    return (
      <div className="relative flex items-center">
        <ChevronLeft />
        <div id="slider" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {
            events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          }
        </div>
        <ChevronRight />
      </div>
    )
  } else {
    return <div className="relative flex items-center">No Events Found</div>
  }
}
