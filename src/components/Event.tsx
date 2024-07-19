import { TypedObject } from "@sanity/block-tools";
import Category from "./Category";

export default interface Event {
    _id: string,
    title: string,
    shortDescription: string,
    descriptionRaw: TypedObject,
    description: string,
    startDate: string,
    endDate: string,
    status: string,
    eventOrganiser: string,
    categories: Category[],
    mainImage: {
        asset: {
            url: string,
            _id: string,
            _ref: string,
        }
    },
    slug: {
        current: string,
    },
    _createdAt: string,
    _updatedAt: string,
}