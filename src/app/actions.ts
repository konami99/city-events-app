'use server'

import { getEvents } from "@/lib/db/event"


export async function fetchEvents({
    where,
    page = 1
}: {
    where: any,
    page?: number,
}) {
    
    const { events } = await getEvents({ where, page });
    
    return events;
}