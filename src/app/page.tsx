import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'
import { getEvents } from '@/lib/db/event';
import { useEffect } from 'react';
import Link from 'next/link';
import { fetchEvents } from './actions';
import sanityClient from '@/components/SanityClientConfig';
import { ClientConfig } from '@sanity/client';

export default async function Home() {
  const config: ClientConfig = {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      useCdn: process.env.SANITY_USE_CDN === 'true',
      apiVersion: process.env.SANITY_API_VERSION,
  };

  const today_events = await fetchEvents({
    where: {
        startDate: {
            lte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
        endDate: {
            gte: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
        status: {
            eq: 'approved'
        }
    }
  });

  const selected_events = await fetchEvents({
    where: {
        startDate: {
            lte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
        endDate: {
            gte: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
        status: {
            eq: 'approved'
        },
        pick: {
          eq: true,
        },
    }
  });

  return (
    <>
      {today_events.length > 0 &&
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
              today_events.map((event, index) => (
                <EventCard key={index} event={event} imageSource={event.mainImage.asset._id} config={config} />
              ))
            }
          </div>
          <ChevronRight targetId={ 'slider-todays-events' } />
        </div>
        </section>
      }
      {selected_events.length > 0 &&
        <section className="our-picks pt-[6rem] pb-[3rem] bg-white">
          <header className="relative flex flex-col items-center py-4 my-0 mx-[calc(2rem+28.21px)]">
            <div className='subtitle ml-4 w-full text-transform: uppercase text-[0.75rem]'>Fun and educational ideas</div>
            <div className='title ml-4 w-full text-[1.75rem] text-white'>
              <h2>
                <Link href={ `/programs/school-holidays` }>
                  <span className='text-black'>School holidays</span>
                </Link>
              </h2>
            </div>
          </header>
          <div className="relative flex items-center p-4">
            <ChevronLeft targetId={ 'slider-our-picks' } />
            <div id="slider-our-picks" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
              {
                selected_events.map((event, index) => (
                  <EventCard key={index} event={event} imageSource={event.mainImage.asset._id} config={config} />
                ))
              }
            </div>
            <ChevronRight targetId={ 'slider-our-picks' } />
          </div>
        </section>
      }
    </>
  )
}
