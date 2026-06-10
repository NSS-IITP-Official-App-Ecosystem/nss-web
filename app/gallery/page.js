import {Filters} from './filter'
import {EventCard} from './event-card'
import events_data, { events } from '@/data/events/events.json'

export default function GalleryPage() {
    return (
        <>
            <Banner></Banner>
            <Filters></Filters>

            <section className="mt-10 mb-10">
                <div className="flex flex-wrap gap-4 sm:gap-5 justify-center">
                    {events_data.map((item, index, arr)=>{
                        return <EventCard key={index} data={item}/>
                    })}
                </div>
            </section>
        </>
    )
}

function Banner() {
    return (
        <section className="h-[50vh] flex justify-center items-center max-h-125" style={{ background: "linear-gradient(135deg, var(--brand-blue) , var(--foreground))" }}>
            <div className="flex items-center flex-col">
                <p className="text-center uppercase pbs-2 pbe-2 ps-3 pe-3 rounded-full border border-border backdrop-blur-4xl bg-[#ffffff17] text-[0.6rem] text-white font-mono mb-2">Highlights of Our Events</p>
                <h1 className="text-center uppercase text-transparent font-mono text-6xl bg-clip-text" style={{
                    background: 'linear-gradient(135deg, #ff007b, #6b11ff, #00d2ff)', WebkitBackgroundClip: 'text'
                }}>Gallery</h1>
            </div>
        </section>
    )
}

