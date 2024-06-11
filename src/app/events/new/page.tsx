import { Event } from "@/components/Event";
import StepForm from "@/components/StepForm";
import { updateEvent } from "@/app/actions";

export default async function NewPage() {
    const event: Event = {
        _id: '',
        title: '',
        shortDescription: '',
        descriptionRaw: {
            "_type": "",
            "_key": "",
        },
        startDate: '',
        endDate: '',
        eventOrganiser: '',
        mainImage: {
            asset: {
                url: '',
            }
        }
    }

    return (
        <>
            <StepForm event={ event } action={ updateEvent } />
        </>
    )
}