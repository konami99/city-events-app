import { fetchEventsByProgram, fetchPrograms } from "@/app/actions";
import InfiniteScrollEvents from "@/app/events/infinite-scroll-events";
import { ChevronLeft, ChevronRight } from "@/components/Chevron";
import { sanityClientConfig } from "@/components/SanityClientConfig";
import { createClient, type ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';
import { v4 as uuid } from 'uuid';
import { PageProps } from "@/lib/helpers";
import Program from "@/components/Program";
import Event from "@/components/Event";

export default async function ProgramPage({
    params: { slug }
}: PageProps) {
    const sanityClient = createClient(sanityClientConfig);

    const builder = imageUrlBuilder(sanityClient)

    const urlFor = (source: string) => {
        return builder.image(source)
    }

    const programs: Program[] = await fetchPrograms({
        where: {
            slug: {
                current: {
                    eq: slug,
                },
            }
        }
    });

    const program: Program = programs[0];

    const events: Event[] = await fetchEventsByProgram({ programSlug: slug });

    return (
        <div className="program">
            <section>
                <div className="relative z-2 hero h-[350px]" style={{backgroundImage: `url(${urlFor(program.mainImage.asset._id).width(360).height(350).url()})`}}></div>
                <div className="program-content"  style={{backgroundImage: `linear-gradient(0deg, #ffffff 0%, #e7e7e7 100%)`}}>
                    <div className="relative z-3 program-content-inner mt-[-5rem] px-[1rem]">
                        <div className="bg-white program-container max-w-[70rem] mx-[auto]">
                            <div className="program-columns flex flex-wrap pt-[2.625rem] px-[5rem] pb-[3.375rem]">
                                <div className="program-column-left w-full max-w-full flex-[1_1_100%] md:w-2/4 md:max-w-[50%] md:flex-[1_1_50%]">
                                    <div className="program-column-inner">
                                        <h1 className="text-center md:text-left text-[2.5rem] font-bold mb-[1rem] md:mb-[1.25rem]">{ program.title }</h1>
                                    </div>
                                </div>
                                <div className="program-column-right w-full max-w-full flex-[1_1_100%] md:w-2/4 md:max-w-[50%] md:flex-[1_1_50%]">
                                    <div className="program-column-inner">
                                        <p className="text-center md:text-left text-[1.125rem] font-normal">{ program.description }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white">
                <section className="events py-[5rem] px-[1rem]">
                    <div className="content-wrapper w-full md:max-w-[70rem] md:m-auto">
                        <div className="content-header">
                            <div className='title ml-4 w-full text-[1.75rem] text-white'>
                                <h2 className='text-black'>Upcoming events</h2>
                            </div>
                        </div>
                        <div className="content-container my-0 mx-[-0.625rem] xl:mx-[calc(-50vw_+_35.625rem)]">
                            <ul key={uuid()} role='list' className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'>
                                <InfiniteScrollEvents programSlug={slug} initialEvents={events} fetchEventsByProgram={fetchEventsByProgram} sanityClientConfig={sanityClientConfig} />
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
