'use client'

import Image from "next/image";
import { useState } from "react";
import { MdZoomOutMap, MdClose, MdPlayArrow } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { resolveImageUrl } from "@/utils/imageUrl";

export function ImageCard({ src, type = 'image', title, index }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Gallery Card */}
            {!isOpen && <motion.div layoutId={"imageCard-" + index}
                onClick={() => setIsOpen(true)}
                className="group relative rounded-3xl w-full max-w-sm aspect-video border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-zoom-in"
            >
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
                    className="absolute top-3 right-3 z-10 p-2.5 bg-white/80 hover:bg-white border border-slate-100 hover:border-slate-200 text-slate-600 hover:text-brand-blue rounded-2xl text-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-sm cursor-pointer"
                >
                    <MdZoomOutMap />
                </button>
                {type === 'video' ? (
                    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                        <video 
                            src={src} 
                            className="w-full h-full object-cover opacity-80" 
                            muted
                            playsInline
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="p-4 bg-[#0070f3] text-white rounded-full text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <MdPlayArrow />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Image 
                        src={src} 
                        alt={title || "Event photo"}
                        width={400} 
                        height={225} 
                        className="rounded-[inherit] w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                )}
            </motion.div>}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xs">
                        {/* Backdrop Click to close */}
                        <div 
                            className="absolute inset-0 cursor-zoom-out" 
                            onClick={() => setIsOpen(false)} 
                        />
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-2xl text-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                        >
                            <MdClose />
                        </button>

                        {/* Media Container */}
                        <motion.div layoutId={"imageCard-" + index}
                            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center pointer-events-none"
                        >
                            {type === 'video' ? (
                                <video 
                                    src={src} 
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-full rounded-2xl shadow-2xl pointer-events-auto border border-white/10"
                                />
                            ) : (
                                <img 
                                    src={src} 
                                    alt={title || "Zoomed event photo"}
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl pointer-events-auto border border-white/10"
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}