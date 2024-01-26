import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'
import { useEffect } from 'react';
import Link from 'next/link';
import { fetchEvents } from './actions';
import { sanityClientConfig } from "@/components/SanityClientConfig";

export default async function Home() {
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
            <h2><span className='text-black'>What&apos;s on</span> this afternoon</h2>
          </div>
        </header>
        <div className="relative flex items-center p-4">
          <ChevronLeft targetId={ 'slider-todays-events' } />
          <div id="slider-todays-events" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {
              today_events.map((event: any, index: any) => (
                <EventCard key={index} event={event} imageSource={event.mainImage.asset._id} sanityClientConfig={sanityClientConfig} />
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
            <div className='title ml-4 w-full text-[1.75rem] text-white flex-column md:flex items-baseline'>
              <h2 className='w-full md:w-[auto] md:mr-[1rem]'>
                <span className='text-black'>School holidays</span>
              </h2>
              <div className='w-full md:w-[auto] clider-cta text-black text-[1rem] mt-0 md:mt-[0.5rem] font-normal'>
                <div className='link-with-arrow text-[#0054a6]'>
                  <Link className='flex items-center' href={ `/programs/school-holidays` }>
                    <span>View all</span>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <div className="relative flex items-center p-4">
            <ChevronLeft targetId={ 'slider-our-picks' } />
            <div id="slider-our-picks" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
              {
                selected_events.map((event: any, index: any) => (
                  <EventCard key={index} event={event} imageSource={event.mainImage.asset._id} sanityClientConfig={sanityClientConfig} />
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
