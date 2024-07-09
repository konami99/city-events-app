export async function getPrograms({ where, limit = 10, page = 1 }: {
    where: any,
    limit?: number,
    page: number,
}) {
    const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL as string;
    const headers = {
        'content-type': 'application/json',
    }

    const offset = (page - 1) * limit;

    const requestBody = {
        query: `query getAllPrograms($where: ProgramFilter) {
                    allProgram(where: $where, limit: ${limit}, offset: ${offset}) {
                        title
                        description
                        slug {
                            current
                        }
                        mainImage {
                            asset {
                                _id
                            }
                        }
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

    return { programs: JSON.parse(JSON.stringify(response?.data?.allProgram)) }
}