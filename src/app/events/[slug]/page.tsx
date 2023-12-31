
interface EventPageProps {
    params: {
        slug: string,
    }
}

export default async function EventPage({
    params: { slug }
}: EventPageProps) {
    return (
        <h1>{ slug }</h1>
    )
}