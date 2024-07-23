import { createClient } from "@sanity/client";
import Event from '@/components/Event';
import { sanityClientConfig } from "@/components/SanityClientConfig";
import { createEvent } from "@/app/actions";
import { htmlToBlocks } from "@sanity/block-tools";
import { JSDOM } from 'jsdom';
import { revalidatePath } from "next/cache";

global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
        json: () => Promise.resolve({}),
    })
})

jest.mock('jsdom', () => {
    return {
        JSDOM: jest.fn()
    }
});

const sanityClientMock = {
    create: jest.fn().mockImplementation(() => {
        return Promise.resolve({})
    }),
}

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}))

jest.mock('@sanity/block-tools', () => ({
    htmlToBlocks: jest.fn(),
}));

jest.mock('@sanity/client', () => ({
    createClient: () => {
        return sanityClientMock;
    },
}));

describe('createEvent', () => {
    it('should show View all', async () => {
        const event: Event = {
            _id: '',
            title: 'title',
            shortDescription: 'desc',
            descriptionRaw: {
                "_type": "",
                "_key": "",
            },
            description: '<p>good book</p>',
            startDate: new Date(),
            endDate: new Date(),
            eventOrganiser: 'name',
            status: '',
            categories: [],
            mainImage: {
                asset: {
                    url: '',
                    _id: '',
                    _ref: '',
                }
            },
            slug: {
                current: '',
            },
            _createdAt: '',
            _updatedAt: '',
        }

        const formData = new FormData()

        await createEvent('12345', event, formData);

        expect(sanityClientMock.create).toHaveBeenCalledTimes(1)
    })
});