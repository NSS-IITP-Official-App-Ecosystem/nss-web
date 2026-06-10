
import events_data from '@/data/events/events.json'
import { redirect } from 'next/navigation';
import { ImageCard } from './ImageCard';

export default async function EventPage({params}){
   
    const {id} = await params;
    const eventId = id;
    const event = events_data.find(item => item.id == eventId);

    if(!event){
        redirect('/gallery')
    }

    return (<>
        <section className="mt-10 mb-10 flex justify-center">
            <div className="flex flex-col items-center shadow pt-3 pb-3 border border-border max-w-300 ps-5 pe-5">
            <h2>{event.title}</h2>
            <p className="font-mono">{new Date(event.date).toDateString()}</p>
            <p className="mt-5 mb-5 max-w-[70ch]">{event.details}</p>
            </div>
        </section>
        <section className="bg-background mb-10 mt-10">
            <div className="flex flex-wrap gap-5 justify-center">
                {event.images.map((src, i)=>{
                    return <ImageCard key={i} src={src}/>
                })}
            </div>
        </section>
    </>)
}
