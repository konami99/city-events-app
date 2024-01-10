import { fetchPrograms } from "@/app/actions";
import { ChevronLeft, ChevronRight } from "@/components/Chevron";
import EventCard from "@/components/EventCard";
import sanityClient from "@/components/SanityClient";
import imageUrlBuilder from '@sanity/image-url'

interface ProgramPageProps {
    params: {
        slug: string,
    }
}

export default async function ProgramPage({
    params: { slug }
}: ProgramPageProps) {
    const myConfiguredSanityClient = sanityClient();
    const builder = imageUrlBuilder(myConfiguredSanityClient)

    const urlFor = (source) => {
        return builder.image(source)
    }

    const programs = await fetchPrograms({
        where: {
            slug: {
                current: {
                    eq: slug,
                },
            }
        }
    });

    const program = programs[0];

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
                        <div className="content-container w-[100vw] my-0 mx-[-0.625rem] xl:mx-[calc(-50vw_+_35.625rem)]">
                            <div className="relative flex items-center p-4">
                            <ChevronLeft targetId={ 'slider-upcoming-events' } />
                            <div id="slider-upcoming-events" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                            {
                                program.events.map((event, index) => (
                                    <EventCard key={index} event={event} />
                                ))
                            }
                            </div>
                            <ChevronRight targetId={ 'slider-upcoming-events' } />
                        </div>
                    </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
