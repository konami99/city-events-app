'use server'

import { json } from "stream/consumers";
import { sanityClientConfig } from "@/components/SanityClientConfig";
import { createClient } from "@sanity/client";

export async function getEvents({ where, limit = 10, page = 1 }: {
    where: any,
    limit?: number,
    page: number,
}) {
    const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL;
    const headers = {
        'content-type': 'application/json',
    }

    const offset = (page - 1) * limit;

    const requestBody = {
        query: `query getAllEvents($where: EventFilter) {
                    allEvent(where: $where, limit: ${limit}, offset: ${offset}) {
                        user {
                            name
                        }
                        title
                        startDate
                        endDate
                        categories {
                            title
                        }
                        slug {
                            current
                        }
                        mainImage {
                            asset {
                                _id
                            }
                        }
                        descriptionRaw
                        eventOrganiser
                    }
                }`,
        variables: {
            where: where
        }
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
    }

    const response = await (await fetch(GRAPHQL_API_URL, options)).json();

    return { events: JSON.parse(JSON.stringify(response?.data?.allEvent)) }
}

export async function getEventsByProgram({ programSlug, limit = 8, lastEventId = "" }: {
    programSlug: any,
    limit?: number,
    lastEventId: string,
}) {
    const sanityClient = createClient(sanityClientConfig);
    
    const events = await sanityClient.fetch(`
        *[_type == "event" && _id > $lastEventId && references(*[_type=="program" && slug.current == '${programSlug}']._id)] | order(_id) [0...${limit}] {
            _id,
            slug,
            title,
            mainImage {
                asset {
                    _ref
                }
            },
            categories[] ->,
            programs[] ->
        }
    `, { lastEventId });

    return events;
}