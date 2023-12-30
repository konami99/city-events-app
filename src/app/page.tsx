import EventCard from '@/components/EventCard'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from '@/components/Chevron'

export default function Home() {
  return (
    <div className="relative flex items-center">
      <ChevronLeft />
      <div id="slider" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
        <EventCard key={1} />
        <EventCard key={2} />
        <EventCard key={3} />
        <EventCard key={4} />
        <EventCard key={5} />
        <EventCard key={6} />
        <EventCard key={7} />
      </div>
      <ChevronRight />
    </div>
  )
}
