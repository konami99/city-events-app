import { fetchEvents } from "@/app/actions";

interface ProgramPageProps {
    params: {
        slug: string,
    }
}

export default async function EventPage({
    params: { slug }
}: ProgramPageProps) {
    const events = await fetchEvents({
        where: {
            program: {
                eq: slug,
            }
        }
    });
}