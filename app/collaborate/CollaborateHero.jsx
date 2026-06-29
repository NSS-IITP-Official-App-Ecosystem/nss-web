"use client";

import { motion } from 'framer-motion';
import { FaHandshake, FaLeaf, FaBuilding, FaUsers } from 'react-icons/fa';

export default function CollaborateHero() {
    // Drifting animation configuration
    const floatingTransition = (delay = 0) => ({
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
    });

    return (
        <section className="relative min-h-[580px] lg:min-h-[640px] bg-[#020b18] text-white overflow-hidden py-16 lg:py-20 flex items-center border-b border-white/5">
            {/* Background glowing effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Glowing Orbs */}
                <motion.div 
                    animate={{
                        x: [0, 30, -30, 0],
                        y: [0, -20, 20, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
                />
                <motion.div 
                    animate={{
                        x: [0, -40, 25, 0],
                        y: [0, 35, -25, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-3xl"
                />
                <motion.div 
                    animate={{
                        scale: [1, 1.1, 0.95, 1],
                        opacity: [0.25, 0.45, 0.25, 0.25]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-amber-500/5 blur-2xl"
                />
                {/* Tech grid mesh */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_85%)]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Side: Copy */}
                <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-400 font-semibold text-xs uppercase tracking-widest font-mono shadow-xs"
                    >
                        <FaHandshake className="animate-pulse" />
                        Join Hands With Us
                    </motion.div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white uppercase font-sans">
                        Partner & <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100 bg-clip-text text-transparent font-sans">Collaborate</span>
                    </h1>

                    <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Connect with NSS IIT Patna to sponsor sustainable social projects, co-host awareness camps, or lead impactful community development initiatives.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg">15+</span> Active Partners
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 self-center hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg">100k+</span> Target Impact
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive Connecting Diagram */}
                <div className="lg:col-span-6 flex justify-center items-center relative min-h-[380px] sm:min-h-[420px]">
                    <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
                        
                        {/* Central Hub Node (NSS IITP) */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-brand-blue border-2 border-amber-400/40 shadow-2xl flex flex-col items-center justify-center z-30"
                        >
                            <span className="text-xs font-black text-amber-400 font-mono tracking-wider leading-none">NSS</span>
                            <span className="text-[10px] text-white font-bold leading-none mt-1">IIT Patna</span>
                            {/* Outer pulsing ring */}
                            <div className="absolute inset-[-6px] rounded-full border border-blue-500/20 animate-ping pointer-events-none" />
                        </motion.div>

                        {/* Floating Node 1: Corporates (Top Right) */}
                        <motion.div
                            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                            transition={floatingTransition(0)}
                            className="absolute top-8 right-6 w-32 bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex flex-col items-center text-center z-20"
                        >
                            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-base mb-2">
                                <FaBuilding />
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase font-mono">Corporates</span>
                            <span className="text-[9px] text-slate-400 mt-0.5">CSR & Sponsorship</span>
                        </motion.div>

                        {/* Floating Node 2: NGOs (Bottom Left) */}
                        <motion.div
                            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                            transition={floatingTransition(1.5)}
                            className="absolute bottom-8 left-6 w-32 bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex flex-col items-center text-center z-20"
                        >
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-base mb-2">
                                <FaLeaf />
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase font-mono">NGO Partners</span>
                            <span className="text-[9px] text-slate-400 mt-0.5">Grassroots Action</span>
                        </motion.div>

                        {/* Floating Node 3: Local Communities (Bottom Right) */}
                        <motion.div
                            animate={{ y: [0, 8, 0], x: [0, 8, 0] }}
                            transition={floatingTransition(3)}
                            className="absolute bottom-12 right-4 w-32 bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex flex-col items-center text-center z-20"
                        >
                            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-base mb-2">
                                <FaUsers />
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase font-mono">Communities</span>
                            <span className="text-[9px] text-slate-400 mt-0.5">Social Empowerment</span>
                        </motion.div>

                        {/* Connection SVG lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                            {/* Line to Node 1 (Top Right) */}
                            <line x1="50%" y1="50%" x2="72%" y2="28%" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4,4" />
                            {/* Line to Node 2 (Bottom Left) */}
                            <line x1="50%" y1="50%" x2="28%" y2="72%" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4,4" />
                            {/* Line to Node 3 (Bottom Right) */}
                            <line x1="50%" y1="50%" x2="72%" y2="68%" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4,4" />
                        </svg>

                    </div>
                </div>
            </div>
        </section>
    );
}
