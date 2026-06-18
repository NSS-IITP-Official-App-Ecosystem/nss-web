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
                        Rural Development <span className="text-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90">
                        Bridging the gap between institutional engineering resources and surrounding rural sectors to drive absolute systemic empowerment.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-3xl mx-auto px-4 -mt-24 relative z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-slate-400 to-[#138808]" />
                    <p className="text-base md:text-xl italic text-slate-800 leading-relaxed font-semibold">
                        "The soul of India lives in its villages. Carving out the undefined potential in rural communities is not just an act of charity, but our collective responsibility."
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
                        The Rural Development Wing bridges the gap between premier institutional engineering resources and neighboring rural sectors. Our volunteers make structured site visits to surrounding villages to identify core infrastructural challenges, run awareness campaigns on clean sanitation practices, and systematically distribute educational tools and life essentials directly to families in need.
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
                                
                                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-950 transition-colors duration-200 mb-2">
                                    {item.title}
                                </h3>

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
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-4 font-normal">{selected.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}