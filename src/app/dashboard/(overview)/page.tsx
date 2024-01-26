import { fetchEvents } from "@/app/actions"
import { getServerSession } from "next-auth"

export default async function Page() {
    const session = await getServerSession()

    const draftEventsPromise = fetchEvents({
        where: {
            user: {
                email: {
                    eq: session?.user?.email
                }
            },
            status: {
                eq: 'draft'
            }
        }
    })
    const pendingEventsPromise = fetchEvents({
        where: {
            user: {
                email: {
                    eq: session?.user?.email
                }
            },
            status: {
                eq: 'pending'
            }
        }
    })
    const approvedEventsPromise = fetchEvents({
        where: {
            user: {
                email: {
                    eq: session?.user?.email
                }
            },
            status: {
                eq: 'approved'
            }
        }
    })
    
    const data = await Promise.all([
        draftEventsPromise,
        pendingEventsPromise,
        approvedEventsPromise,
    ])

    console.log('draft events')
    console.log(data[0])

    return (
        <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 1</div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" defaultChecked={true} />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
        </div>
    )
}