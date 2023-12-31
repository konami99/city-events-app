import Link from "next/link";
import CategoryTag from "./CategoryTag";
import Image from "next/image";
import sanityClient from "./SanityClient";
import imageUrlBuilder from '@sanity/image-url'

interface EventCardProps {
    event: Event,
}

export default function EventCard({ event }) {
    const isNew = true;
    const myConfiguredSanityClient = sanityClient();
    const builder = imageUrlBuilder(myConfiguredSanityClient)

    const urlFor = (source) => {
        return builder.image(source)
    }

    return (
        <Link href={ "/events/2" }
            className="card w-[360px] shrink-0 inline-block mx-4 bg-base-100 transition-shadow hover:shadow-xl"
        >
            <figure>
                <img src={urlFor(event.mainImage.asset._id).width(360).url()} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                { isNew && <div className="badge badge-secondary">NEW</div> }
                <p>Event Description</p>
                <CategoryTag name={ `Event Name` } />
            </div>
        </Link>
    )
}