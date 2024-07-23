import Event from "@/components/Event";
import StepForm from "@/components/StepForm";
import { createEvent } from "@/app/actions";

export default async function NewPage() {
    const event: Event = {
        _id: '',
        title: '',
        shortDescription: '',
        descriptionRaw: {
            "_type": "",
            "_key": "",
        },
        description: '',
        startDate: new Date(),
        endDate: new Date(),
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

    return (
        <>
            <StepForm event={ event } action={ createEvent } />
        </>
    )
}