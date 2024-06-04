'use client'

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EventCard from "@/components/EventCard";
import Spinner from "@/components/Spinner";

export default function InfiniteScrollEvents({
    programSlug,
    initialEvents,
    fetchEventsByProgram,
    sanityClientConfig,
}: {
    programSlug: string,
    initialEvents: any,
    fetchEventsByProgram: any,
    sanityClientConfig: any,
}) {
    const [events, setEvents] = useState(initialEvents);
    const [showLoading, setShowLoading] = useState(false);
    const [ref, inView] = useInView();
    
    async function loadMoreEvents() {
        setShowLoading(true);
        const lastEventId = events[events.length - 1]._id;
        const nextEventsBatch = await fetchEventsByProgram({
            programSlug: programSlug,
            lastEventId: lastEventId,
        });

        if (nextEventsBatch.length > 0) {
            setEvents((prev: any | undefined) => [
                ...(prev?.length ? prev : []),
                ...nextEventsBatch
            ])
        }
        setShowLoading(false);
    };

    useEffect(() => {
        if (inView) {
            loadMoreEvents();
        }
    }, [inView])

    return (
        <>
            {
                events.map((event: any, index: any) => (
                    <EventCard key={index} event={event} imageSource={event.mainImage.asset._ref} sanityClientConfig={sanityClientConfig} />
                ))
            }
            {/* loading spinner */}
            <div ref={ref} className='col-span-4'></div>
            {   
                (showLoading === true) && <Spinner />
            }
        </>
    )
};