import { type ClientConfig } from '@sanity/client'

export const sanityClientConfig: ClientConfig = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: process.env.SANITY_USE_CDN === 'true',
    apiVersion: process.env.SANITY_API_VERSION,
    token: process.env.SANITY_SECRET_TOKEN,
}