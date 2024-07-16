import { fetchEvents } from "@/app/actions";
import StepForm from "@/components/StepForm";
import { PageProps } from "@/lib/helpers";
import { updateEvent } from "@/app/actions";
import Event from "@/components/Event";

export default async function EventPage({
    params: { slug }
}: PageProps) {

    const events: Event[] = await fetchEvents({
        where: {
            slug: {
                current: {
                    eq: slug,
                }
            }
        }
    });

    return (
        <>
            <StepForm event={ events[0] } action={ updateEvent } />
        </>
    )
}