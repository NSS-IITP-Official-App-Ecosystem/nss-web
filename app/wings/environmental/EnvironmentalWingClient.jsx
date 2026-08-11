"use client"
import React, { useState, useRef } from 'react';
import { ExpandableText } from '@/components/ExpandableText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const stats = [
    { value: "65", label: "Dedicated Volunteers" },
    { value: "2,500+", label: "Saplings Planted" },
    { value: "15+", label: "Clean-up Drives" },
    { value: "800+", label: "Students Educated" },
];

const initiatives = [
    {
        id: "plantation",
        title: "Tree Plantation Drives",
        subtitle: "Campus & School Afforestation",
        description: "Organizing mass plantation drives inside IIT Patna campus and surrounding rural schools in collaboration with Being Helper Foundation. Volunteers ensure the long-term upkeep of the saplings by working with school authorities.",
        highlights: [
            "Collaboration with Being Helper Foundation.",
            "Focus on local government schools and community zones.",
            "Sowing native fruit-bearing and shade trees.",
            "Long-term maintenance systems with school caretakers."
        ]
    },
    {
        id: "waste",
        title: "Waste Management & Cleanups",
        subtitle: "Anti-Plastic & Hygiene Swachhata",
        description: "Campus and village cleanliness campaigns, waste segmentation workshops, and shramdaan drives to encourage civic responsibility, eliminate single-use plastic, and improve rural sanitation.",
        highlights: [
            "Campus-wide cleanliness runs and audits.",
            "Safe waste collection and disposal events.",
            "Safai Mitra Suraksha Shivir honors for support staff.",
            "Anti-plastic campaigns in local bi-weekly markets."
        ]
    },
    {
        id: "climate",
        title: "Climate & Energy Awareness",
        subtitle: "Eco-Mentorship & Resource Saving",
        description: "Delivering classroom lessons and quizzes on energy conservation, water resource management, and global warming. We conduct environmental video screenings to educate young minds on eco-sensitivity.",
        highlights: [
            "Regular eco-awareness lectures in adopted schools.",
            "Environmental Quiz competitions (e.g. Oct 16, 2025).",
            "Climate awareness audio-visual screenings (e.g. Oct 13, 2025).",
            "Interactive resource-saving home tips workshops."
        ]
    }
];

const defaultCategories = [
    {
        title: "Plantation & Afforestation Drives",
        description: "Massive plantation movements establishing native tree clusters and biodiversity zones.",
        images: [
            "/Environmental/tree plantation/IMG_1237 (1) copy.JPG",
            "/Environmental/tree plantation/IMG_1257 copy.JPG",
            "/Environmental/tree plantation/IMG_1215.JPG",
            "/Environmental/tree plantation/IMG_1244 copy.JPG",
            "/Environmental/tree plantation/IMG_1281 copy.JPG",
            "/Environmental/tree plantation/IMG_1240 copy.JPG",
        ]
    },
    {
        title: "Waste Management & Clean-up Drives",
        description: "Anti-plastic campaigns and campus sanitization sweeps.",
        images: [
            "/Environmental/cleaniness/IMG-20260328-WA0055 copy.jpg",
            "/Environmental/cleaniness/IMG-20260328-WA0058 copy.jpg",
            "/Environmental/cleaniness/IMG-20260328-WA0079 (1).jpg",
            "/Environmental/cleaniness/IMG-20260328-WA0067 copy.jpg",
            "/Environmental/cleaniness/IMG-20260328-WA0092.jpg",
            "/Environmental/cleaniness/IMG-20260328-WA0065.jpg",
            "/Environmental/cleaniness/IMG_20250927_223545.jpg",
        ]
    },
    {
        title: "Climate Change Awareness and Quiz",
        description: "Spreading smart power usage awareness and sustainability education.",
        images: [
            "/Environmental/climate awareness/IMG20251019174404 (2) copy.jpg",
            "/Environmental/climate awareness/IMG20251016194351 (2) copy.jpg",
            "/Environmental/climate awareness/IMG20251019173630.jpg",
            "/Environmental/climate awareness/IMG20251019172330 (2).jpg",
            "/Environmental/climate awareness/IMG20251016194455.jpg",
            "/Environmental/climate awareness/IMG20251013202918 copy.jpg",
        ]
    }
];

export default function EnvironmentalWingClient({ events = [] }) {
    const [selectedImg, setSelectedImg] = useState(null);
    const scrollRefs = useRef([]);

    const displayCategories = events && events.length > 0 ? events : defaultCategories;

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans pb-32 relative">
            {/* Fixed Viewport-Wide Background Watermark */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.02] p-4">
                <img src="/wings/env.png" alt="" className="w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[1000px] h-auto max-h-[80vh] object-contain" />
            </div>

            {/* Top Border Accent */}
            <div className="w-full h-1.5 bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-500" />

            {/* Premium Deep Hero Section */}
            <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-48 px-4 text-center relative overflow-hidden">
                {/* Glow Ring background shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-12 left-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                    {/* Floating Wing Badge Logo */}
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-emerald-400 shadow-xl mb-6 bg-white shrink-0">
                        <img src="/wings/WhatsApp Image 2026-07-08 at 11.57.40.jpeg" alt="Environmental Wing Logo" className="h-full w-full object-cover" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
                        <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest leading-none">
                            Green Today, Better Tomorrow
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-200 to-amber-400 tracking-tight mb-6">
                        Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 font-light">Wing</span>
                    </h1>

                    <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed opacity-95 tracking-wide">
                        Sowing the seeds for a greener, more sustainable tomorrow through active eco-mentorship, afforestation, and zero-waste initiatives.
                    </p>
                </div>

                {/* Hero Angled Border */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FAF9F6]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
            </header>

            {/* Overlapping Quote Banner */}
            <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-20">
                <div className="bg-white/80 border border-slate-200/80 shadow-xl rounded-3xl p-6 md:p-8 text-center backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-500" />
                    <span className="absolute -top-6 -left-2 text-[120px] text-slate-200/40 font-serif select-none pointer-events-none">“</span>
                    <p className="text-sm sm:text-base md:text-lg italic text-slate-800 leading-relaxed font-medium relative z-10">
                        "The environment is where we all meet; where all have a mutual interest; it is the one thing all of us share. Together, we sow the seeds for a greener, more sustainable tomorrow."
                    </p>
                </div>
            </div>

            {/* Official Magazine Statistics */}
            <section className="max-w-5xl mx-auto px-4 mt-16 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col items-center justify-center text-center">
                            <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
                                {stat.value}
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Initiatives Cards Section */}
            <section className="max-w-6xl mx-auto px-4 mt-24">
                <div className="text-center mb-12">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Core Eco Focus</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 tracking-tight">Key Wing Initiatives</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {initiatives.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-3xs flex flex-col justify-between text-left h-full hover:shadow-2xs transition-all duration-300">
                            <div>
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">{item.subtitle}</span>
                                <h3 className="text-lg font-black text-slate-950 mt-1.5 mb-3 uppercase leading-tight">{item.title}</h3>
                                <p className="text-slate-600 text-xs leading-relaxed mb-6 font-normal">
                                    {item.description}
                                </p>
                            </div>
                            <div className="space-y-2.5 border-t border-slate-100 pt-5">
                                {item.highlights.map((h, index) => (
                                    <div key={index} className="flex items-start gap-2 text-[11px] font-semibold text-slate-700 leading-snug">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                        <span>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Event-Wise Photos Galleries */}
            <section className="max-w-6xl mx-auto px-4 mt-24">
                <div className="text-center mb-12">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Gallery Showcase</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 tracking-tight">On-Ground Action Snaps</h2>
                </div>

                <div className="space-y-16">
                    {displayCategories.map((cat, ci) => {
                        const catImages = cat.images || [];
                        if (catImages.length === 0) return null;

                        return (
                            <div key={ci} className="border-t border-slate-200/60 pt-12 first:border-0 first:pt-0 text-left">
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                            {cat.title}
                                        </h3>
                                        <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#0a1128]/5 text-[#0a1128] rounded-md">
                                            {catImages.length} Photos
                                        </span>
                                    </div>
                                    <ExpandableText text={cat.description} />
                                </div>

                                <div className="relative px-2">
                                    {catImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => scrollByAmount(ci, -1)}
                                                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center cursor-pointer text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <ChevronLeft size={18} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => scrollByAmount(ci, 1)}
                                                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center cursor-pointer text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <ChevronRight size={18} strokeWidth={2.5} />
                                            </button>
                                        </>
                                    )}

                                    <div
                                        ref={(el) => (scrollRefs.current[ci] = el)}
                                        style={{ scrollbarWidth: 'none' }}
                                        className="flex gap-4 overflow-x-auto scroll-smooth pb-3"
                                    >
                                        {catImages.map((imgUrl, ii) => (
                                            <div
                                                key={ii}
                                                onClick={() => setSelectedImg(imgUrl)}
                                                className="group bg-white border border-slate-200/60 shadow-xs rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xs flex-shrink-0 w-[280px] aspect-[4/3] relative"
                                            >
                                                <img
                                                    src={imgUrl}
                                                    alt={`${cat.title} snap ${ii + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-103 transition-all duration-500"
                                                />
                                                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 p-2 rounded-full text-xs font-bold">✕ Zoom</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Immersive Photo Viewer Modal */}
            {selectedImg && (
                <div
                    className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                    onClick={() => setSelectedImg(null)}
                >
                    <div
                        className="relative max-w-4xl w-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImg(null)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-full border border-white/10 backdrop-blur-xs"
                        >
                            <span>Close</span>
                            <span>✕</span>
                        </button>
                        <div className="w-full bg-slate-900/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[75vh] flex items-center justify-center">
                            <img src={selectedImg} alt="Enlarged gallery view" className="w-full h-full max-h-[75vh] object-contain" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
