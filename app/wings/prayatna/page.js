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
        <div className="min-h-screen text-slate-800 font-sans pb-24 bg-slate-50">

            {/* Official Premium Top Border Bar */}
            <div className="w-full h-1.5 bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />

            {/* Premium Deep Navy Hero with Asymmetrical Angled Cut */}
            <div 
                className="bg-gradient-to-br from-[#0a1128] via-[#101f42] to-[#070c1e] text-white pt-24 pb-40 px-4 text-center relative"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-xs mb-4">
                        <span className="text-[#ff9933] text-[10px] font-bold uppercase tracking-widest">
                            Welcome to the Core
                        </span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 text-white">
                        Prayatna <span className="text-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90">
                        Transforming personal surplus into vital community resource shields and orchestrating urgent healthcare lifelines.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-3xl mx-auto px-4 -mt-24 relative z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-slate-400 to-[#138808]" />
                    <p className="text-base md:text-xl italic text-slate-800 leading-relaxed font-semibold">
                        "Persistent efforts shield humanity. The Prayatna Wing centers its mission around active mobilization—transforming personal surplus into community resource shields and orchestrating critical blood donation lifelines."
                    </p>
                    <div className="absolute left-4 top-2 opacity-5 text-slate-900 font-serif text-8xl pointer-events-none select-none">“</div>
                </div>
            </div>

            {/* Metric Statistics Section */}
            <div className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white border border-slate-200/60 shadow-xs rounded-2xl p-5 text-center transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                        <div className="text-3xl font-black text-slate-900">{s.num}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Narrative Context Section */}
            <div className="max-w-4xl mx-auto px-4 mt-10">
                <div className="bg-white border border-slate-200/70 shadow-xs rounded-2xl p-6 md:p-8">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-3.5 bg-slate-900 rounded-full inline-block" />
                        Our Purpose &amp; Impact
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                        The Prayatna Wing of NSS IIT Patna serves as our principal relief, collection, and healthcare logistics center. Our volunteers direct comprehensive collection campaigns to systematically gather, quality-inspect, and arrange essential supplies for resource-strained families. Simultaneously, the wing takes charge of crucial health preservation actions, organizing vital campus blood donation camps to help meet regional emergency medical requirements.
                    </p>
                </div>
            </div>

            {/* Main Interactive Grid Elements */}
            <div className="max-w-5xl mx-auto px-4 mt-16">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Field Initiatives &amp; Ground Reality
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initiatives.map((item) => (
                        <div
                            key={item.title}
                            onClick={() => setSelected(item)}
                            className="bg-white border border-slate-200 shadow-2xs rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 flex flex-col"
                        >
                            <div className="h-48 overflow-hidden bg-slate-100 relative">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                />
                            </div>
                            
                            <div className="p-6 flex flex-col flex-1">
                                <div className="inline-block self-start px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 rounded-sm mb-3">
                                    {item.tag}
                                </div>
                                
                                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-950 transition-colors duration-200">
                                    {item.title}
                                </h3>

                                <p className="text-xs italic text-slate-400 font-medium my-3 border-l-2 border-slate-200 pl-2 line-clamp-2 leading-snug">
                                    {item.quote}
                                </p>

                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">
                                    {item.desc}
                                </p>
                                
                                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-900 flex items-center justify-between transition-colors">
                                    <span className="flex items-center gap-1.5">
                                        View details
                                    </span>
                                    <svg className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-slate-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Native Application Styled Pop-up Modal */}
            {selected && (
                <div
                    className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto relative shadow-2xl transition-all scale-100 transform"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="max-h-80 overflow-hidden relative bg-slate-900">
                            <img
                                src={selected.img}
                                alt={selected.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-4 right-4 bg-white border border-slate-200 rounded-full w-9 h-9 flex items-center justify-center text-slate-700 shadow-md hover:bg-slate-900 hover:text-white transition-all font-semibold z-10"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        
                        <div className="p-6 md:p-8">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">
                                {selected.tag}
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 mt-4 mb-3">{selected.title}</h3>

                            <p className="text-sm italic text-slate-700 font-semibold my-4 bg-slate-50 p-4 rounded-xl border-l-4 border-slate-900 leading-relaxed">
                                {selected.quote}
                            </p>

                            <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-4 font-normal">{selected.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}