import { fetchEvents } from "@/app/actions"
import { getServerSession } from "next-auth"
import imageUrlBuilder from '@sanity/image-url'
import { sanityClientConfig } from "@/components/SanityClientConfig";
import { createClient } from '@sanity/client'
import Event from '@/components/Event';

export default async function Page() {
    const session = await getServerSession()

    const events: Event[] = await fetchEvents({
        where: {
            user: {
                email: {
                    eq: session?.user?.email
                }
            },
            status: {
                in: [ 'draft', 'pending', 'approved' ]
            }
        },
        limit: 100,
    })

    const drafts = events.filter((event: Event) => event.status === 'draft');
    const pending = events.filter((event: Event) => event.status === 'pending');
    const approved = events.filter((event: Event) => event.status === 'approved');

    const sanityClient = createClient(sanityClientConfig);

    const builder = imageUrlBuilder(sanityClient)

    const urlFor = (source: string) => {
        return builder.image(source)
    }

    return (
        <div role="tablist" className="tabs tabs-lifted w-full">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Draft" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                {
                    drafts.length > 0
                    &&
                    <div className="dashboard-events-list px-[1rem] py-[2.5rem] bg-neutral-100">
                        <div className="dashboard-events-list-container max-w-[65rem]">
                            {
                                drafts.map((event: Event) => {
                                    return (
                                        <div key={event._id} className="dashboard-event-tile grid grid-rows-[1fr_auto] grid-cols-[7.5rem_1fr_35%] gap-1 mt-[1rem] bg-white">
                                            <div className="dashboard-event-tile-image row-start-1 row-span-1 col-start-1 col-span-1">
                                                <div style={{width: '120px', height: '120px', backgroundImage: `url(${urlFor(event.mainImage.asset._id).width(120).height(120).url()})`}}></div>
                                            </div>
                                            <div className="dashboard-event-tile-content row-start-1 row-span-1 col-start-2 col-span-1">
                                                <p>Draft</p>
                                                <h3>{ event.title }</h3>
                                            </div>
                                            <div className="dashboard-event-tile-meta row-start-1 row-span-1 col-start-3 col-span-1 flex">
                                                <div className="inner flex flex-wrap px-[1.25rem] py-[1.5rem]">
                                                    <div className="date flex flex-[1_1_100%] max-w-[100%] mb-[1.75rem] inline-flex text-right">
                                                        <p className="w-full">
                                                            Last modified: { event._updatedAt }
                                                        </p>
                                                    </div>
                                                    <div className="buttons flex flex-[1_1_100%] max-w-[100%]">
                                                        <div className="buttons-inner flex flex-wrap w-full justify-end">
                                                            <span className="button">
                                                                <a className="button button--link button--text" title="Edit" href={ `/events/${event.slug.current}/edit` }>
                                                                    <div className="jsx-2060750500 button_content">
                                                                        <div className="jsx-2060750500 button_content-wrapper">
                                                                            <div className="jsx-2060750500 button_content-label">
                                                                                Edit
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Pending" defaultChecked={true} />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                {
                    pending.length > 0
                    &&
                    <div className="dashboard-events-list px-[1rem] py-[2.5rem] bg-neutral-100">
                        <div className="dashboard-events-list-container max-w-[65rem]">
                            {
                                pending.map((event: Event) => {
                                    return (
                                        <div key={event._id} className="dashboard-event-tile grid grid-rows-[1fr_auto] grid-cols-[7.5rem_1fr_35%] gap-1 mt-[1rem] bg-white">
                                            <div className="dashboard-event-tile-image row-start-1 row-span-1 col-start-1 col-span-1">
                                                <div style={{width: '120px', height: '120px', backgroundImage: `url(${urlFor(event.mainImage.asset._id).width(120).height(120).url()})`}}></div>
                                            </div>
                                            <div className="dashboard-event-tile-content row-start-1 row-span-1 col-start-2 col-span-1">
                                                <p>Pending</p>
                                                <h3>{ event.title }</h3>
                                            </div>
                                            <div className="dashboard-event-tile-meta row-start-1 row-span-1 col-start-3 col-span-1 flex">
                                                <div className="inner flex flex-wrap px-[1.25rem] py-[1.5rem]">
                                                    <div className="date flex flex-[1_1_100%] max-w-[100%] mb-[1.75rem] inline-flex text-right">
                                                        <p className="w-full">
                                                            Last modified: { event._updatedAt }
                                                        </p>
                                                    </div>
                                                    <div className="buttons flex flex-[1_1_100%] max-w-[100%]">
                                                        <div className="buttons-inner flex flex-wrap w-full justify-end">
                                                            <span className="button">
                                                                <a className="button button--link button--text" title="Edit" href={ `/events/${event.slug.current}/edit` }>
                                                                    <div className="jsx-2060750500 button_content">
                                                                        <div className="jsx-2060750500 button_content-wrapper">
                                                                            <div className="jsx-2060750500 button_content-label">
                                                                                Edit
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Approved" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                {
                    approved.length > 0
                    &&
                    <div className="dashboard-events-list px-[1rem] py-[2.5rem] bg-neutral-100">
                        <div className="dashboard-events-list-container max-w-[65rem]">
                            {
                                approved.map((event: Event) => {
                                    return (
                                        <div key={event._id} className="dashboard-event-tile grid grid-rows-[1fr_auto] grid-cols-[7.5rem_1fr_35%] gap-1 mt-[1rem] bg-white">
                                            <div className="dashboard-event-tile-image row-start-1 row-span-1 col-start-1 col-span-1">
                                                <div style={{width: '120px', height: '120px', backgroundImage: `url(${urlFor(event.mainImage.asset._id).width(120).height(120).url()})`}}></div>
                                            </div>
                                            <div className="dashboard-event-tile-content row-start-1 row-span-1 col-start-2 col-span-1">
                                                <p>Approved</p>
                                                <h3>{ event.title }</h3>
                                            </div>
                                            <div className="dashboard-event-tile-meta row-start-1 row-span-1 col-start-3 col-span-1 flex">
                                                <div className="inner flex flex-wrap px-[1.25rem] py-[1.5rem]">
                                                    <div className="date flex flex-[1_1_100%] max-w-[100%] mb-[1.75rem] inline-flex text-right">
                                                        <p className="w-full">
                                                            Last modified: { event._updatedAt }
                                                        </p>
                                                    </div>
                                                    <div className="buttons flex flex-[1_1_100%] max-w-[100%]">
                                                        <div className="buttons-inner flex flex-wrap w-full justify-end">
                                                            <span className="button">
                                                                <a className="button button--link button--text" title="Edit" href={ `/events/${event.slug.current}/edit` }>
                                                                    <div className="jsx-2060750500 button_content">
                                                                        <div className="jsx-2060750500 button_content-wrapper">
                                                                            <div className="jsx-2060750500 button_content-label">
                                                                                Edit
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}