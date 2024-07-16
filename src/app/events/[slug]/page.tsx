import { sanityClientConfig } from "@/components/SanityClientConfig";
import imageUrlBuilder from '@sanity/image-url'
import CategoryTag from "@/components/CategoryTag";
import {PortableText} from '@portabletext/react'
import { fetchEvents } from "@/app/actions";
import { createClient } from '@sanity/client'
import { PageProps } from "@/lib/helpers";
import Event from "@/components/Event";

export default async function EventPage({
    params: { slug }
}: PageProps) {
    const sanityClient = createClient(sanityClientConfig);

    const builder = imageUrlBuilder(sanityClient)

    const urlFor = (source: any) => {
        return builder.image(source)
    }

    const events: Event[] = await fetchEvents({
        where: {
            slug: {
                current: {
                    eq: slug,
                }
            }
        }
    });

    const event: Event = events[0];

    return (
        <div className="bg-white">
            <div className="header h-[210px] flex justify-center items-center">
                <div className="header-container">
                    <div className="m-[1rem]">
                        {
                            event.categories.map((category: any, index: any) => (
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
            <div className="event-content py-[5rem] lg:px-[8rem] md:px-[1rem]">
                <div className="event-content-container grid grid-cols-1 md:grid-cols-3 m-auto max-w-[65rem]">
                    <div className="event-description col-span-1 md:col-span-2 md:pr-[7.25rem] max-md:px-[1rem] max-md:mb-[4rem]">
                        <PortableText value={ event.descriptionRaw } />
                    </div>
                    <div className="event-sidebar-container">
                        <div className="event-sidebar bg-neutral-100 pt-[1.5rem] px-[2rem] pb-[2.5rem]">
                            <div className="event-sidebar-section">
                                <p className="event-heading text-xl mb-[1rem] font-medium">Contact event organiser</p>
                                <p>{ event.eventOrganiser }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}