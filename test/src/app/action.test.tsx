import { createClient } from "@sanity/client";
import Event from '@/components/Event';
import { sanityClientConfig } from "@/components/SanityClientConfig";
import { createEvent } from "@/app/actions";
import { htmlToBlocks } from "@sanity/block-tools";
import { JSDOM } from 'jsdom';
import { revalidatePath } from "next/cache";
import { FormDataSchema } from "@/lib/schema";

const jsonMock = jest.fn().mockResolvedValueOnce({});

global.fetch = jest.fn().mockImplementationOnce(() => 
    Promise.resolve({
        json: jsonMock,
    })
)

jest.mock('jsdom', () => {
    return {
        JSDOM: jest.fn()
    }
});

const sanityClientMock = {
    create: jest.fn().mockResolvedValueOnce({}),
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

afterEach(()=>{
    jest.clearAllMocks();
})

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

const formData = new FormData();

const safeParseMock = {
    success: true,
    error: {
        flatten: () => ({
            fieldErrors: {}
        })
    },
}

jest.mock("@/lib/schema", () => ({
    ...jest.requireActual('@/lib/schema'),
    FormDataSchema: {
        safeParse: () => (safeParseMock)
    }
}))

describe('createEvent', () => {
    it('should show View all', async () => {
        await createEvent('12345', event, formData);

        expect(sanityClientMock.create).toHaveBeenCalledTimes(1)
        expect(jsonMock).toHaveBeenCalledTimes(1);
    })
});



describe('createEvent', () => {
    beforeEach(() => {
        safeParseMock.success = false;        
    })

    it('should show View all', async () => {
        await createEvent('12345', event, formData);

        expect(sanityClientMock.create).not.toHaveBeenCalled();
        expect(jsonMock).not.toHaveBeenCalled();
    })
});