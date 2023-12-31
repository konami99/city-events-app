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
        <Link href={ `/events/${event.slug.current}` }
            className="card w-[360px] shrink-0 inline-block mx-4 bg-base-100 transition-shadow hover:shadow-xl"
        >
            <figure>
                <img src={urlFor(event.mainImage.asset._id).width(360).height(350).url()} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                { isNew && <div className="badge badge-secondary">NEW</div> }
                <div className="flex">
                    {
                        event.categories.map((category, index) => (
                            <CategoryTag name={ category.title } key={index} />
                        ))
                    }
                </div>
            </div>
        </Link>
    )
}