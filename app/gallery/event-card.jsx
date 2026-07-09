'use client'

import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { getWingBadgeStyle } from "./wing-utils";
import { resolveImageUrl } from "@/utils/imageUrl";

export function EventCard({ data }) {
    return (
        <Link 
            href={'/gallery/event/' + data.id}
            className="group flex flex-col w-full max-w-sm bg-white/90 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            {/* Image container */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image 
                    src={resolveImageUrl(data.images && data.images[0], '/home_slider/nss_home.jpg')} 
                    alt={data.title || "Event photo"}
                    width={400} 
                    height={225} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content info */}
            <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-4">
                <div className="space-y-3">
                    {/* Wings tags */}
                    {data.wings && data.wings.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {data.wings.map((wing, i) => (
                                <span 
                                    key={i} 
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 ${getWingBadgeStyle(wing)}`}
                                >
                                    <FaTag className="text-[9px] opacity-75" />
                                    {wing.replace(' Wing', '')}
                                </span>
                            ))}
                        </div>
                    )}

                    <h4 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors">
                        {data.title}
                    </h4>
                </div>

                {/* Date stamp */}
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono font-semibold pt-3 border-t border-slate-100">
                    <FaCalendarAlt className="text-slate-400 text-sm" />
                    <span>{new Date(data.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
            </div>
        </Link>
    )
}