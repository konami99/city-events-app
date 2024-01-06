export async function getEvents({ where }) {
    const GRAPHQL_API_URL = 'https://on7y4gyd.api.sanity.io/v2023-08-01/graphql/production/default';
    const headers = {
        'content-type': 'application/json',
    }

    const requestBody = {
        query: `query getAllEvents($where: EventFilter) {
                    allEvent(where: $where) {
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
    return response?.data?.allEvent;
}
