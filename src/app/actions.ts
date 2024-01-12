'use server'

import { getEvents, getEventsByProgram } from "@/lib/db/event"
import { getPrograms } from "@/lib/db/program";


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

export async function fetchEventsByProgram({
    programSlug,
    lastEventId = ""
}: {
    programSlug: string,
    lastEventId?: string,
}) {
    
    const events = await getEventsByProgram({ programSlug, lastEventId });
    
    return events;
}

export async function fetchPrograms({
    where,
    page = 1
}: {
    where: any,
    page?: number,
}) {
    
    const { programs } = await getPrograms({ where, page });
    
    return programs;
}