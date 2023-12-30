import EventCard from '@/components/EventCard'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        <EventCard key={1} />
        <EventCard key={2} />
        <EventCard key={3} />

        <EventCard key={4} />

        <EventCard key={5} />

      </div>
    </div>
  )
}
