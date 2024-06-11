'use server'

import { getEvents, getEventsByProgram } from "@/lib/db/event"
import { getPrograms } from "@/lib/db/program";
import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { sanityClientConfig } from "@/components/SanityClientConfig";
import { Schema } from '@sanity/schema'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom';
import { ulid } from "ulidx";
import { revalidatePath } from "next/cache";
import { FormDataSchema } from "@/lib/schema";

export async function updateEvent(id: string, data: any, formData: FormData) {
    const result = FormDataSchema.safeParse(data);

    if (result.success) {
        fetch(`${process.env.NEXTAUTH_URL}/api`, {
            method: "POST",
            body: formData,
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        const description = `<html><body>${data.description}</body></html>`;

        const sanityClient = createClient(sanityClientConfig);

        const builder = imageUrlBuilder(sanityClient);

        const defaultSchema = Schema.compile({
        name: 'myBlog',
            types: [
                {
                type: 'object',
                name: 'blogPost',
                fields: [
                    {
                    title: 'Title',
                    type: 'string',
                    name: 'title',
                    },
                    {
                    title: 'Body',
                    name: 'body',
                    type: 'array',
                    of: [{type: 'block'}],
                    },
                ],
                },
            ],
        })

        const blockContentType = defaultSchema
            .get('blogPost')
            .fields.find((field: any) => field.name === 'body').type

        const blocks = htmlToBlocks(description, blockContentType, {
            parseHtml: (html) => new JSDOM(html).window.document,
        })

        sanityClient
            .patch(id)
            .set({
                eventOrganiser: data.eventOrganiser,
                description: blocks,
                categories: [
                    {
                        _ref: '9a2f7a54-5357-47a5-812a-d33300d7560d',
                        _type: 'reference',
                        _key: ulid(),
                    }
                ],
                title: data.title,
                shortDescription: data.shortDescription,
                endDate: data.endDate,
                startDate: data.startDate,
            })
            .commit()
            .then((updatedEvent) => {
                console.log('Hurray, the event is updated! New document:')
                console.log(updatedEvent)
            })
            .catch((err) => {
                console.error('Oh no, the update failed: ', err.message)
            });

        revalidatePath("/events/[slug]", "page");
        revalidatePath("/events/[slug]/edit", "page");
    } else {
        console.log('here')
        console.log(result.error.flatten().fieldErrors)
        /*
        {
            title: [ 'Required' ],
            shortDescription: [ 'Required' ],
            description: [ 'Required' ],
            startDate: [ 'Required' ],
            endDate: [ 'Required' ],
            eventOrganiser: [ 'Required' ]
        }
        */
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }
}

export async function fetchEvents({
    where,
    page = 1,
    limit = 10
}: {
    where: any,
    page?: number,
    limit?: number,
}) {
    
    const { events } = await getEvents({ where, page, limit });
    
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