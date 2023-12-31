import { createClient, type ClientConfig } from '@sanity/client'

export default function sanityClient() {
    const config: ClientConfig = {
        projectId: 'on7y4gyd',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2023-12-31',
    };

    const client = createClient(config);

    return client;
}
