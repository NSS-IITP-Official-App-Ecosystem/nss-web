'use client'

import Image from "next/image";
import Link from "next/link";

export function EventCard({data}){


    return (
        <div className="rounded-2xl shadow-xl flex flex-col gap-2 w-75 sm:w-100">
            <Image src={data.images[0] || '/placeholder.svg'} width = {200} height = {400} objectFit="cover" className="rounded-tr-[inherit] rounded-tl-[inherit] block object-cover w-full aspect-video"/>
            <div className="ps-3 pe-3 pb-5">
               <Link href={'/gallery/event/' + data.id}><h4 className="mb-3 mt-3 line-clamp-2" style={{'WebkitLineClamp' : 2}}>{data.title}</h4></Link> 
                <p className="text-text text-sm font-mono">{new Date(data.date).toDateString()}</p>
            </div>
        </div> 
    )
}