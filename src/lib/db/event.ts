import { json } from "stream/consumers";

export async function getEvents({ where, limit = 10, page = 1 }) {
    const GRAPHQL_API_URL = 'https://on7y4gyd.api.sanity.io/v2023-08-01/graphql/production/default';
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

    console.log('RESPONSE FROM FETCH REQUEST', response?.data?.allEvent);
    return { events: JSON.parse(JSON.stringify(response?.data?.allEvent)) }
}
