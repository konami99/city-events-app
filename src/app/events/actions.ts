'use server'

import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { sanityClientConfig } from "@/components/SanityClientConfig";
import {Schema} from '@sanity/schema'
import {htmlToBlocks, getBlockContentFeatures} from '@sanity/block-tools'
import { JSDOM } from 'jsdom';

export async function updateEvent() {
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

    const blocks = htmlToBlocks('<html><body><h1>Hello world!</h1><body></html>', blockContentType, {
        parseHtml: (html) => new JSDOM(html).window.document,
    })

    sanityClient
        .patch('ff570c65-1d27-4b77-809c-7aed7bab8c0c')
        .set({ eventOrganiser: 'Ethan Chou', description: blocks })
        .commit()
        .then((updatedEvent) => {
            console.log('Hurray, the event is updated! New document:')
            console.log(updatedEvent)
        })
        .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        });
}