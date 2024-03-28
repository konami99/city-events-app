import { fetchEvents } from "@/app/actions";
import StepForm from "./step_form";

interface EditPageProps {
    params: {
        slug: string,
    }
}

export default async function EventPage({
    params: { slug }
}: EditPageProps) {

    const events = await fetchEvents({
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
            <StepForm event={ events[0] } />
        </>
    )
}