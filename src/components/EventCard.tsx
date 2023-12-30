import Link from "next/link";
import CategoryTag from "./CategoryTag";
import Image from "next/image";

interface EventCardProps {
    event: Event,
}

export default function EventCard() {
    const isNew = true;

    return (
        <Link href={ "/events/2" }
            className="card w-[360px] h-[460px] shrink-0 inline-block mx-4 bg-base-100 transition-shadow hover:shadow-xl"
        >
            <figure>

            </figure>
            <div className="card-body">
                <h2 className="card-title">Event Name</h2>
                { isNew && <div className="badge badge-secondary">NEW</div> }
                <p>Event Description</p>
                <CategoryTag name={ `Event Name` } />
            </div>
        </Link>
    )
}