import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'
import { getEvents } from '@/lib/db/event';
import { useEffect } from 'react';

export default async function Home() {

  const events = await getEvents();

  if (events.length > 0) {
    return (
      <>
        <section className="todays-events pt-[6rem] pb-[3rem]" style={{background: 'linear-gradient(rgb(44, 157, 206) 0%, rgb(80, 159, 185) 30%, rgb(174, 235, 255) 100%)'}}>
          <header className="relative flex flex-col items-center py-4 my-0 mx-[calc(2rem+28.21px)]">
            <div className='subtitle ml-4 w-full text-transform: uppercase text-[0.75rem]'>Up next</div>
            <div className='title ml-4 w-full text-[1.75rem] text-white'>
              <h2><span className='text-black'>What's on</span> this afternoon</h2>
            </div>
          </header>
          <div className="relative flex items-center p-4">
            <ChevronLeft targetId={ 'slider-todays-events' } />
            <div id="slider-todays-events" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
              {
                events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              }
            </div>
            <ChevronRight targetId={ 'slider-todays-events' } />
          </div>
        </section>
        <section className="our-picks pt-[6rem] pb-[3rem] bg-white">
          <header className="relative flex flex-col items-center py-4 my-0 mx-[calc(2rem+28.21px)]">
            <div className='subtitle ml-4 w-full text-transform: uppercase text-[0.75rem]'>Upcoming events</div>
            <div className='title ml-4 w-full text-[1.75rem] text-white'>
              <h2><span className='text-black'>Our picks</span></h2>
            </div>
          </header>
          <div className="relative flex items-center p-4">
            <ChevronLeft targetId={ 'slider-our-picks' } />
            <div id="slider-our-picks" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
              {
                events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              }
            </div>
            <ChevronRight targetId={ 'slider-our-picks' } />
          </div>
        </section>
      </>
    )
  } else {
    return <div className="relative flex items-center">No Events Found</div>
  }
}
