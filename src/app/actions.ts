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
import Event from "@/components/Event";
import blogPostSchema from "@/schemas/blogPost";

export async function createEvent(_: string, data: Event, formData: FormData) {
    const result = FormDataSchema.safeParse(data);

    console.log(`result: `, result)

    if (result.success) {
        const description = `<html><body>${data.description}</body></html>`;

        const sanityClient = createClient(sanityClientConfig);

        const builder = imageUrlBuilder(sanityClient);

        const defaultSchema = Schema.compile(blogPostSchema);

        const blockContentType = defaultSchema
            .get('blogPost')
            .fields.find((field: any) => field.name === 'body').type

        const blocks = htmlToBlocks(description, blockContentType, {
            parseHtml: (html) => new JSDOM(html).window.document,
        })

        await sanityClient
            .create({
                _type: 'event',
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
            .then((createdEvent) => {
                fetch(`${process.env.NEXTAUTH_URL}/api?` + new URLSearchParams({
                    event_id: createdEvent._id,
                 }), {
                     method: "POST",
                     body: formData,
                   })
                     .then(response => response.json())
                     .then(data => console.log(data))
                     .catch(error => console.error(error));
            })
            .catch((err) => {
                console.error('Oh no, the create failed: ', err.message)
            });

        revalidatePath("/events/[slug]", "page");
        revalidatePath("/events/[slug]/edit", "page");
    } else {
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

export async function updateEvent(eventId: string, data: Event, formData: FormData) {
    const result = FormDataSchema.safeParse(data);

    if (result.success) {
        await fetch(`${process.env.NEXTAUTH_URL}/api?` + new URLSearchParams({
           event_id: eventId ,
        }), {
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

        await sanityClient
            .patch(eventId)
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
                console.log(updatedEvent)
            })
            .catch((err) => {
                console.error('Oh no, the update failed: ', err.message)
            });

        revalidatePath("/events/[slug]", "page");
        revalidatePath("/events/[slug]/edit", "page");
    } else {
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