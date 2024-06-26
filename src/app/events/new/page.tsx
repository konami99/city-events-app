import { Event } from "@/components/Event";
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
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        eventOrganiser: '',
        mainImage: {
            asset: {
                url: '',
            }
        }
    }

    return (
        <>
            <StepForm event={ event } action={ createEvent } />
        </>
    )
}