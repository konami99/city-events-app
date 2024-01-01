import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'
import { getEvents } from '@/lib/db/event';
import { useEffect } from 'react';

export default async function Home() {

  const events = await getEvents();

  if (events.length > 0) {
    return (
      <section className="todays-events pt-[6rem] pb-[3rem]" style={{background: 'linear-gradient(rgb(44, 157, 206) 0%, rgb(80, 159, 185) 30%, rgb(174, 235, 255) 100%);'}}>
        <header className="relative flex flex-col items-center py-4">
          <div className='subtitle ml-4 w-full'>Up next</div>
          <div className='title ml-4 w-full'>
            <h2><span>What's on</span> this afternoon</h2>
          </div>
        </header>
        <div className="relative flex items-center p-4">
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
      </section>
    )
  } else {
    return <div className="relative flex items-center">No Events Found</div>
  }
}
