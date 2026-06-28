"use client"
import React, { useState } from 'react';

const initiatives = [
    {
        tag: "Community Aid",
        title: "Essential Supplies Distribution",
        desc: "Student volunteers organize systematic distribution drives to deliver clothes, educational materials, and healthcare essentials directly to village residents — ensuring no family is left unreached.",
        img: "https://i.pinimg.com/736x/32/47/24/324724254c743bbcf634cf8292c68093.jpg"
    },
    {
        tag: "Education",
        title: "Ground-Level Mentorship",
        desc: "IIT students interact directly with village youth to identify systemic resource deficits and create structured mentorship pathways that open doors to higher education and skill development.",
        img: "https://i.pinimg.com/1200x/6b/e1/01/6be101f0c0e3c5d4bd548f0b066e60f6.jpg"
    },
    {
        tag: "Health & Sanitation",
        title: "Hygiene Awareness Camps",
        desc: "Door-to-door campaigns and open-air workshops educating rural families on clean water usage, personal hygiene, and disease prevention — reducing preventable illnesses significantly.",
        img: "https://i.pinimg.com/1200x/da/8f/6b/da8f6b462caa32304e323b1fef89dbb3.jpg"
    },
    {
        tag: "Infrastructure",
        title: "Village Site Surveys",
        desc: "Technical teams conduct structured infrastructure audits of rural villages, documenting road conditions, water access points, and sanitation coverage to help prioritize repair and development needs.",
        img: "https://i.pinimg.com/736x/28/f8/31/28f8315616e58bd2c703bd7d438b268a.jpg"
    },
    {
        tag: "Digital Literacy",
        title: "Technology Outreach Program",
        desc: "Volunteers teach basic digital skills — smartphone navigation, online banking, government portal usage — empowering rural citizens to access state welfare schemes and financial services independently.",
        img: "https://i.pinimg.com/1200x/ca/07/fb/ca07fb7fbeed34c26da11d269934f190.jpg"
    },
    {
        tag: "Women Empowerment",
        title: "Skill Development Workshops",
        desc: "Focused sessions for rural women covering vocational training, financial literacy, and self-help group formation — building economic independence and collective bargaining power within communities.",
        img: "https://i.pinimg.com/736x/3e/94/33/3e94337b4c61fa81fc1dd6cef7ab2f08.jpg"
    }
];

const stats = [
    { num: "24+", label: "Villages Reached" },
    { num: "1,800+", label: "Families Served" },
    { num: "320+", label: "Active Volunteers" },
    { num: "6", label: "Core Initiatives" },
];

export default function RuralDevelopment() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen text-white font-sans pb-16 bg-gradient-to-tr from-[#050515] via-[#0a0a24] to-[#02020a]" >

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center pt-12 px-4 pb-6">
                <span className="text-[#ff9933] text-xs font-semibold uppercase tracking-widest block mb-3">
                    National Service Scheme
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1 text-white">
                    Rural Development <span className="text-[#ff9933]">Wing</span>
                </h1>
                <div className="w-14 h-0.5 bg-[#ff9933] mx-auto mt-3 mb-5" />
                <div className="text-left max-w-2xl mx-auto p-5 border-l-4 border-[#138808] bg-white/5 rounded-r-xl">
                    <p className="text-base italic text-gray-300 leading-relaxed">
                        "The soul of India lives in its villages. Carving out the undefined potential in rural
                        communities is not just an act of charity, but our collective responsibility."
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
                        The Rural Development Wing bridges the gap between premier institutional engineering
                        resources and neighboring rural sectors. Our volunteers make structured site visits to
                        surrounding villages to identify core infrastructural challenges, run awareness campaigns
                        on clean sanitation practices, and systematically distribute educational tools and life
                        essentials directly to families in need.
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
                                <h3 className="text-sm font-semibold text-white leading-snug mb-2">{item.title}</h3>
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
                            <h3 className="text-xl font-bold text-white mt-1 mb-3">{selected.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{selected.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
