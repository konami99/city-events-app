import { fetchEvents } from "@/app/actions";
import StepForm from "@/components/StepForm";
import { PageProps } from "@/lib/helpers";

export default async function EventPage({
    params: { slug }
}: PageProps) {

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