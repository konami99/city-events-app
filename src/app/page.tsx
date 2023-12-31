import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'
import { getEvents } from '@/lib/db/event';
import { useEffect } from 'react';

export default async function Home() {

  const events = await getEvents();

  if (events.length > 0) {
    return (
      <section id="todays-events"style={{background: 'linear-gradient(rgb(44, 157, 206) 0%, rgb(80, 159, 185) 30%, rgb(174, 235, 255) 100%);'}}>
        <div className="relative flex items-center p-4">
          <ChevronLeft />
          <div id="slider" className='my-32 w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {
              events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            }
          </div>
          <ChevronRight />
        </div>
      </section>
    )
  } else {
    return <div className="relative flex items-center">No Events Found</div>
  }
}
