export async function getEvents() {
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
                        mainImage {
                            asset {
                                _id
                            }
                        }
                    }
                }`,
        variables: {
            where: {
                startDate: {
                    gte: '2023-12-25T02:00:00.000Z',
                    lte: '2023-12-31T02:00:00.000Z'
                }
            }
        }
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
    }

    const response = await (await fetch(GRAPHQL_API_URL, options)).json();

    //console.log('RESPONSE FROM FETCH REQUEST', response?.data?.allEvent);
    return response?.data?.allEvent;
}

