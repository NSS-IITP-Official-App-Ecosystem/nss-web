"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';

export default function GalleryHero() {
    return (
        <section className="relative min-h-[550px] lg:min-h-[600px] bg-[#020b18] text-white overflow-hidden py-16 lg:py-20 flex items-center border-b border-white/5">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Glowing Orbs */}
                <motion.div 
                    animate={{
                        x: [0, 40, -20, 0],
                        y: [0, -25, 25, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
                />
                <motion.div 
                    animate={{
                        x: [0, -35, 30, 0],
                        y: [0, 35, -15, 0],
                    }}
                    transition={{
                        duration: 13,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-10 -right-10 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl"
                />
                <motion.div 
                    animate={{
                        scale: [1, 1.15, 0.9, 1],
                        opacity: [0.2, 0.35, 0.2, 0.2]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-2xl"
                />
                {/* Tech Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_85%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-400 font-semibold text-xs uppercase tracking-widest font-mono shadow-xs"
                    >
                        <FaCamera className="animate-pulse" />
                        Visual Records of Impact
                    </motion.div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white uppercase font-sans">
                        Event <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100 bg-clip-text text-transparent">Gallery</span>
                    </h1>

                    <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Step into our journey. A canvas of smiles, service hours, and transformative community campaigns captured through the lens of NSS IIT Patna volunteers.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg">50+</span> Events Captured
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 self-center hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg">10k+</span> Lives Impacted
                        </div>
                    </div>
                </div>

                {/* Right Interactive polaroid stack Column */}
                <div className="lg:col-span-6 flex justify-center items-center relative min-h-[360px] sm:min-h-[400px]">
                    <div className="relative w-full max-w-[420px] h-full flex justify-center items-center">
                        
                        {/* Polaroid 1 (Left, Swachhata) */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -20, x: -60 }}
                            animate={{ opacity: 1, rotate: -12, x: -50, y: 10 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            whileHover={{ 
                                scale: 1.08, 
                                rotate: -5,
                                zIndex: 40,
                                x: -30,
                                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                            }}
                            className="absolute w-[180px] sm:w-[200px] bg-white p-3 pb-6 rounded-2xl shadow-xl border border-slate-200/50 text-slate-800 rotate-[-12deg] z-20 cursor-pointer origin-bottom transition-shadow duration-300"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
                                <Image
                                    src="/home_slider/SWACHHATA_HI_SEVA.jpeg"
                                    alt="Swachhata Drive"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 150px, 180px"
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <span className="font-serif text-xs font-semibold text-slate-600 block leading-tight">Swachhata Campaign</span>
                                <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">Oct 2025</span>
                            </div>
                        </motion.div>

                        {/* Polaroid 2 (Right, Blood Donation) */}
                        <motion.div
                            initial={{ opacity: 0, rotate: 20, x: 60 }}
                            animate={{ opacity: 1, rotate: 10, x: 60, y: 15 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            whileHover={{ 
                                scale: 1.08, 
                                rotate: 3,
                                zIndex: 40,
                                x: 40,
                                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                            }}
                            className="absolute w-[180px] sm:w-[200px] bg-white p-3 pb-6 rounded-2xl shadow-xl border border-slate-200/50 text-slate-800 rotate-[10deg] z-10 cursor-pointer origin-bottom transition-shadow duration-300"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
                                <Image
                                    src="/home_slider/blooddonation2019.jpeg"
                                    alt="Blood Donation"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 150px, 180px"
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <span className="font-serif text-xs font-semibold text-slate-600 block leading-tight">Blood Donation Camp</span>
                                <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">Nov 2019</span>
                            </div>
                        </motion.div>

                        {/* Polaroid 3 (Center, Chetna Health Camp) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: -10, scale: 1, rotate: 2 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ 
                                scale: 1.1, 
                                rotate: 0,
                                zIndex: 40,
                                y: -25,
                                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)"
                            }}
                            className="absolute w-[190px] sm:w-[210px] bg-white p-3 pb-6 rounded-2xl shadow-2xl border border-slate-200 text-slate-800 rotate-[2deg] z-30 cursor-pointer origin-bottom transition-shadow duration-300"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
                                <Image
                                    src="/home_slider/1.png"
                                    alt="Chetna Health Camp"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 160px, 190px"
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <span className="font-serif text-xs font-bold text-slate-700 block leading-tight">Chetna Health Camp</span>
                                <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">Jan 2026</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
