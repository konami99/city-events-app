import { getEvent } from "@/lib/db/event"
import sanityClient from "../../../components/SanityClient";
import imageUrlBuilder from '@sanity/image-url'
import CategoryTag from "@/components/CategoryTag";
import {PortableText} from '@portabletext/react'

interface EventPageProps {
    params: {
        slug: string,
    }
}

export default async function EventPage({
    params: { slug }
}: EventPageProps) {
    const myConfiguredSanityClient = sanityClient();
    const builder = imageUrlBuilder(myConfiguredSanityClient)

    const urlFor = (source) => {
        return builder.image(source)
    }

    const event = await getEvent(slug);

    return (
        <div>
            <div className="header h-[210px] flex justify-center items-center">
                <div className="header-container">
                    <div className="m-[1rem]">
                        {
                            event.categories.map((category, index) => (
                                <CategoryTag name={ category.title } key={index} />
                            ))
                        }
                    </div>
                    <h1 className="text-[2.5rem] font-bold m-[1rem]">{ event.title }</h1>
                </div>
            </div>
            <div className="py-0 lg:px-[8rem] md:px-[1rem] h-[350px]" style={{background: 'linear-gradient(to top, rgb(4, 28, 44) 0%, rgb(4, 28, 44) 5rem, rgba(4, 28, 44, 0) 5.0625rem, rgba(4, 28, 44, 0) 100%)'}}>
                <div className="hero h-[350px]" style={{backgroundImage: `url(${urlFor(event.mainImage.asset._id).width(360).height(350).url()})`}}></div>
            </div>
            <div className="event-content py-[5rem] lg:px-[8rem] px-[1rem]">
                <div className="event-content-container grid grid-cols-1 md:grid-cols-3 m-auto max-w-[65rem]">
                    <div className="event-description col-span-1 md:col-span-2">
                    <PortableText value={ event.descriptionRaw } />
                    </div>
                    <div className="event-sidebar-container">
                        <div className="event-sidebar">
                            sidebar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}