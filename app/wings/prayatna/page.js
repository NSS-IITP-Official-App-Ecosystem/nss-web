"use client"
import React, { useState } from 'react';

const initiatives = [
    {
        tag: "Healthcare",
        title: "Mega Blood Donation Camps",
        quote: "“Be the reason for someone's heartbeat; donate blood, save lives.”",
        desc: "Organizing systematic, safe, and large-scale blood donation camps on campus in collaboration with premier medical centers, channeling vital lifelines to local blood banks and emergency units.",
        img: "https://i.pinimg.com/736x/b5/78/e8/b578e8991abe4aa0a8f674009a5633de.jpg"
    },
    {
        tag: "Collection Logistics",
        title: "Campus-Wide Donation Mobilization",
        quote: "“Your unused surplus could fulfill someone else's absolute survival.”",
        desc: "Setting up central inventory collection hubs across IIT Patna student hostels and staff residential sectors to gather clothes, winter blankets, usable electronics, and textbooks.",
        img: "https://i.pinimg.com/1200x/fd/3c/f4/fd3cf4903ac88beee2a173a1207934cc.jpg"
    },
    {
        tag: "Resource Management",
        title: "Sorting & Inventory Quality Control",
        quote: "“Dignity in giving means offering our best, not just our leftovers.”",
        desc: "Student teams spend dedicated hours systematically sorting, washing, packaging, and cataloging collected resources by age and size to ensure items arrive at villages ready for respectful use.",
        img: "https://i.pinimg.com/736x/32/c1/3d/32c13dc873c35b8ac986668f793a62b4.jpg"
    },
    {
        tag: "Emergency Relief",
        title: "Disaster Support & Rapid Deployments",
        quote: "“True empathy manifests as immediate operational action during a crisis.”",
        desc: "Mobilizing swift community relief packages containing non-perishable food items, dry rations, and medical first-aid kits during regional flood emergencies or unexpected natural crises.",
        img: "https://i.pinimg.com/1200x/46/86/9c/46869c71b44fd4fd386280d12f1f3bd7.jpg"
    },
    {
        tag: "Community Health",
        title: "Free Medical Check-up Camps",
        quote: "“Health is the first form of wealth for any developing collective.”",
        desc: "Coordinating with visiting doctors to host completely free health diagnostics, basic eye check-ups, and essential prescription distributions for underprivileged daily-wage workers.",
        img: "https://i.pinimg.com/736x/d3/cc/90/d3cc90b75070501da1f6d9f070a3a75a.jpg"
    },
    {
        tag: "Public Awareness",
        title: "Blood Typing & Health Literacy Drives",
        quote: "“Awareness dispels fear, and understanding builds continuous donors.”",
        desc: "Running extensive interactive health literacy campaigns to dispel common myths surrounding blood donation, encouraging first-time student and local youth volunteers to step forward.",
        img: "https://i.pinimg.com/736x/72/66/22/726622e1f2ae4df69a917513c36de13b.jpg"
    }
];

const stats = [
    { num: "500+", label: "Units of Blood Collected" },
    { num: "3,000+", label: "Donation Items Sorted" },
    { num: "12+", label: "Distribution Drives" },
    { num: "24/7", label: "Emergency Readiness" },
];

export default function PrayatnaWing() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen text-white font-sans pb-16 bg-gradient-to-tr from-[#050515] via-[#0a0a24] to-[#02020a]" >

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center pt-12 px-4 pb-6">
                <span className="text-[#ff9933] text-xs font-semibold uppercase tracking-widest block mb-3">
                    National Service Scheme
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1 text-white">
                    Prayatna <span className="text-[#ff9933]">Wing</span>
                </h1>
                <div className="w-14 h-0.5 bg-[#ff9933] mx-auto mt-3 mb-5" />
                <div className="text-left max-w-2xl mx-auto p-5 border-l-4 border-[#138808] bg-white/5 rounded-r-xl">
                    <p className="text-base italic text-gray-300 leading-relaxed">
                        "Persistent efforts shield humanity. The Prayatna Wing centers its mission around active mobilization—transforming personal surplus into community resource shields and orchestrating critical blood donation lifelines."
                    </p>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="max-w-4xl mx-auto px-4 mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#ff9933]">{s.num}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Purpose Section */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-[#ff9933] uppercase tracking-wide mb-3">
                        Our Purpose &amp; Impact
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        The Prayatna Wing of NSS IIT Patna serves as our principal relief, collection, and healthcare logistics center. Our volunteers direct comprehensive collection campaigns to systematically gather, quality-inspect, and arrange essential supplies for resource-strained families. Simultaneously, the wing takes charge of crucial health preservation actions, organizing vital campus blood donation camps to help meet regional emergency medical requirements.
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="max-w-5xl mx-auto px-4 mt-8">
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest border-b border-white/10 pb-3 mb-5">
                    Field Initiatives &amp; Ground Reality
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {initiatives.map((item) => (
                        <div
                            key={item.title}
                            onClick={() => setSelected(item)}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-200 hover:-translate-y-1 hover:border-[#ff9933]/50 flex flex-col"
                        >
                            <div className="h-44 overflow-hidden bg-black">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#138808] mb-1">
                                    {item.tag}
                                </span>
                                <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>

                                {/* Contextual Quote */}
                                <p className="text-[11px] italic text-[#ff9933] font-medium mt-1 mb-2 leading-snug">
                                    {item.quote}
                                </p>

                                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
                                    {item.desc}
                                </p>
                                <div className="mt-3 text-[10px] text-[#ff9933]/60 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
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
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-[#12103a] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selected.img}
                            alt={selected.title}
                            className="w-full max-h-80 object-cover rounded-t-2xl"
                        />
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-3 right-3 bg-black/60 border border-white/20 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-red-700/70 transition-colors"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <div className="p-6">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#138808]">
                                {selected.tag}
                            </span>
                            <h3 className="text-xl font-bold text-white mt-1">{selected.title}</h3>

                            {/* Modal Quote View */}
                            <p className="text-xs italic text-[#ff9933] font-medium my-2">
                                {selected.quote}
                            </p>

                            <p className="text-sm text-gray-300 leading-relaxed">{selected.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}