import { TypedObject } from "@sanity/block-tools";

export interface Event {
    _id: string,
    title: string,
    shortDescription: string,
    descriptionRaw: TypedObject,
    startDate: string,
    endDate: string,
    eventOrganiser: string,
    mainImage: {
        asset: {
            url: string,
        }
    }
}