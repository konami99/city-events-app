import { render, screen } from '@testing-library/react'
import Home from '@/app/page';
import Event from '@/components/Event';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

jest.mock('@sanity/image-url', () => ({
    __esModule: true,
    default: () => {
        return {
            image: jest.fn().mockReturnThis(),
            width: jest.fn().mockReturnThis(),
            height: jest.fn().mockReturnThis(),
            url: jest.fn().mockReturnValue('https://test.com'),
        }
    }
}));

jest.mock('@sanity/client');
jest.mock('@/components/SanityClientConfig');
jest.mock('@/app/actions', () => ({
    createEvent: () => {},
    updateEvent: () => {},
    fetchEventsByProgram: () => {},
    fetchPrograms: () => {},
    fetchEvents: () => {
        return [
            {
                _id: '',
                title: '',
                shortDescription: '',
                descriptionRaw: {
                    "_type": "",
                    "_key": "",
                },
                description: '',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                eventOrganiser: '',
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
        ];
    }
}))

describe('Home', () => {
    it('should show View all', async () => {
        render(await Home())
        const myElem = screen.queryByText('View all')
        expect(myElem).toBeInTheDocument()
    })
});