"use client"
import React, { useState } from 'react';

const initiatives = [
    {
        tag: "On-Campus",
        title: "IIT Patna Green Campus Drives",
        quote: "“Every sapling planted today becomes tomorrow’s shade, oxygen, and hope.”",
        desc: "Student volunteers organize massive plantation drives across the IIT Patna campus, establishing native tree clusters and green belts to support local biodiversity and reduce our institutional carbon footprint.",
        img: "https://i.pinimg.com/736x/ca/13/b7/ca13b79bc384b2d689a0524bf17bf39e.jpg"
    },
    {
        tag: "Off-Campus Outreach",
        title: "Rural Afforestation Movements",
        quote: "“Communities grow stronger when people and nature rise together.”",
        desc: "Extending ecological efforts beyond the boundaries of our college. Volunteers travel to neighboring Bihta blocks to distribute saplings and plant trees alongside rural communities.",
        img: "https://i.pinimg.com/736x/a0/38/5f/a0385f184bdbd647ae3a6e5d287b3c0a.jpg"
    },
    {
        tag: "Waste Management",
        title: "Zero-Plastic & Cleanliness Campaigns",
        quote: "“A cleaner earth begins with the courage to pick up what others leave behind.”",
        desc: "Conducting dynamic clean-up drives and setting up waste segregation units both inside the institute and in nearby public areas to promote an eco-friendly, zero-waste lifestyle.",
        img: "https://i.pinimg.com/1200x/bd/43/70/bd4370cf891aa213d538038a568dbfbe.jpg"
    },
    {
        tag: "Conservation",
        title: "Water Audit & Resource Mapping",
        quote: "“Save water today, so life continues to flourish tomorrow.”",
        desc: "Technical groups map water utilization on campus and design low-cost rainwater harvesting and distribution systems tailored for drought-prone local agricultural patches.",
        img: "https://i.pinimg.com/736x/94/dc/27/94dc271f870e9329b2ccd32ca5e84bd8.jpg"
    },
    {
        tag: "Energy Awareness",
        title: "Renewable Energy Workshops",
        quote: "“The future shines brightest when powered by clean energy.”",
        desc: "Educating nearby school children and residents on the benefits of solar energy installations, smart power usage, and switching to sustainable fuel alternatives.",
        img: "https://i.pinimg.com/736x/09/33/58/0933588a471ac4a899c9acdfdf007618.jpg"
    },
    {
        tag: "Eco-Advocacy",
        title: "Climate Action Street Plays",
        quote: "“When voices unite for the planet, awareness becomes action.”",
        desc: "Utilizing open-air street theater (Nukkad Natak) within campus hubs and local town squares to spread awareness about global warming, deforestation, and individual eco-duties.",
        img: "https://i.pinimg.com/1200x/58/82/f5/5882f5ca83568fec13a7d4ca7bcf6232.jpg"
    }
];

const stats = [
    { num: "2,500+", label: "Saplings Planted" },
    { num: "15+", label: "Clean-up Drives" },
    { num: "400+", label: "Active Eco-Workers" },
    { num: "On & Off", label: "Campus Impact" },
];

export default function EnvironmentalWing() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen text-white font-sans pb-16 bg-gradient-to-tr from-[#050515] via-[#0a0a24] to-[#02020a]">

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center pt-12 px-4 pb-6">
                <span className="text-[#ff9933] text-xs font-semibold uppercase tracking-widest block mb-3">
                    National Service Scheme
                </span>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1 text-white">
                    Environmental <span className="text-[#ff9933]">Wing</span>
                </h1>

                <div className="w-14 h-0.5 bg-[#ff9933] mx-auto mt-3 mb-5" />

                <div className="text-left max-w-2xl mx-auto p-5 border-l-4 border-[#138808] bg-white/5 rounded-r-xl">
                    <p className="text-base italic text-gray-300 leading-relaxed">
                        "Nature does not hurry, yet everything is accomplished.
                        Protecting our environment is not an extra-curricular option;
                        it is our fundamental prerequisite for survival."
                    </p>
                </div>
            </header>

            {/* Stats */}
            <div className="max-w-4xl mx-auto px-4 mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-[#ff9933]/40 transition"
                    >
                        <div className="text-2xl font-bold text-[#ff9933]">
                            {s.num}
                        </div>

                        <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Purpose */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-[#ff9933] uppercase tracking-wide mb-3">
                        Our Purpose & Impact
                    </h2>

                    <p className="text-sm text-gray-300 leading-relaxed">
                        The Environmental Wing of NSS IIT Patna works relentlessly
                        to bring sustainability to the grass-roots level.
                        Through organized drives spanning across the campus premises
                        and surrounding adopted villages, our volunteers drive active
                        tree-planting campaigns, combat micro-plastic contamination,
                        and implement resource-conservation models to turn modern
                        green concepts into practical field realities.
                    </p>
                </div>
            </div>

            {/* Cards */}
            <div className="max-w-5xl mx-auto px-4 mt-8">

                <h2 className="text-sm font-semibold text-white uppercase tracking-widest border-b border-white/10 pb-3 mb-5">
                    Field Initiatives & Ground Reality
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {initiatives.map((item) => (
                        <div
                            key={item.title}
                            onClick={() => setSelected(item)}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9933]/50 flex flex-col"
                        >

                            {/* Image */}
                            <div className="h-44 overflow-hidden bg-black">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">

                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#138808] mb-1">
                                    {item.tag}
                                </span>

                                <h3 className="text-sm font-semibold text-white leading-snug">
                                    {item.title}
                                </h3>

                                {/* Quote */}
                                <p className="text-[11px] italic text-[#ffb347] font-medium mt-2 mb-3 leading-snug border-l-2 border-[#ff9933]/40 pl-2">
                                    {item.quote}
                                </p>

                                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
                                    {item.desc}
                                </p>

                                {/* Footer */}
                                <div className="mt-4 text-[10px] text-[#ff9933]/70 flex items-center gap-1">
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                        />
                                    </svg>

                                    Click to expand
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >

                    <div
                        className="bg-[#12103a] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto relative animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Image */}
                        <img
                            src={selected.img}
                            alt={selected.title}
                            className="w-full max-h-80 object-cover rounded-t-2xl"
                        />

                        {/* Close */}
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-3 right-3 bg-black/60 border border-white/20 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-red-700/70 transition-colors"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Modal Content */}
                        <div className="p-6">

                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#138808]">
                                {selected.tag}
                            </span>

                            <h3 className="text-xl font-bold text-white mt-1">
                                {selected.title}
                            </h3>

                            <p className="text-sm italic text-[#ffb347] border-l-2 border-[#ff9933]/40 pl-3 my-4 leading-relaxed">
                                {selected.quote}
                            </p>

                            <p className="text-sm text-gray-300 leading-relaxed">
                                {selected.desc}
                            </p>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}