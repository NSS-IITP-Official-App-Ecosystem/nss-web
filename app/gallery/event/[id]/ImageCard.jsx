'use client'
import Image from "next/image";
import { MdZoomOutMap } from "react-icons/md";

export function ImageCard({src}){
    return (
        <>
            <div className="relative rounded-2xl w-75 h-50 border border-border">
                <button className="absolute top-1 right-1 z-1 bg-white opacity-90 backdrop-blur-3xl text-text rounded text-xl"><MdZoomOutMap className="" /></button>
                <Image src={src} width={200} height={200} objectFit="cover" className="rounded-[inherit] w-full h-full object-cover" />
            </div>
        </>
    )
}