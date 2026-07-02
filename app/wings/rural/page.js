"use client"
import React, { useState } from 'react';

// Structured rural development image assets grouped into distinct field operation rows
const categories = [
    {
        title: "PPT Presentation for social Awareness",
        description: "Technical survey groups conducting deep infrastructural mappings of rural clusters to catalog local road metrics, sanitation layout gaps, and clean water access nodes.",
        images: [
            { img: "/rural/ppt /20251101_144625 copy.jpg" },
            { img: "/rural/ppt /IMG20251015193038 copy.jpg" },
            { img: "/rural/ppt /WhatsApp Image 2025-11-02 at 4.00.06 PM (1) copy.jpeg" },
            { img: "/rural/ppt /IMG_4646 copy.JPG" },
            { img: "/rural/ppt /WhatsApp Image 2025-11-02 at 3.51.08 PM (1).jpeg" },
            { img: "/rural/ppt /IMG_5637 copy.JPG" }
        ]
    },
    {
        title: "Education & Youth Mentorship Clinics",
        description: "Bridging the resource access deficit for village children by holding personalized learning assemblies, career path modeling, and secondary school motivation camps.",
        images: [
            { img: "/rural/clinics/WhatsApp Image 2026-03-24 at 8.45.12 AM (1) copy.jpeg" },
            { img: "/rural/clinics/IMG_0097.JPG" },
             { img: "/rural/clinics/WhatsApp Image 2026-03-24 at 8.45.20 AM (3) copy.jpeg" },
           
          
            { img: "/rural/clinics/IMG_0083.JPG" },
            { img: "/rural/clinics/IMG_9968 copy.JPG" },
            
             { img: "/rural/clinics/WhatsApp Image 2026-03-24 at 8.45.18 AM (2) copy.jpeg" },
        ]
    },
    {
        title: "Essential Resource Distribution Camps",
        description: "Organizing robust systematic sorting and logistics frameworks to safely deliver seasonal utilities, primary hygiene kits, and textbooks directly to remote doorsteps.",
        images: [
            { img: "/rural/donation/20260411_113643 copy.jpg" },
            { img: "/rural/donation/IMG_1258 copy.JPG" },
            { img: "/rural/donation/IMG_20260406_092502 (1) copy.jpg" },
            { img: "/rural/donation/IMG-20260406-WA0042 copy.jpg" },
            { img: "/rural/donation/IMG_20260406_094010.jpg" },
            { img: "/rural/donation/IMG20251103145821.jpg" }
        ]
    },
    {
        title: "Nukkad Natak",
        description: "Empowering rural spaces via basic smartphone utility workshops, digital banking defense instruction, and navigating centralized e-governance welfare channels.",
        images: [
            { img: "/rural/Nukkad Natak/DSC_6489.JPG" },
            
         
            { img: "/rural/Nukkad Natak/DSC_6448 copy.JPG" },
            { img: "/rural/Nukkad Natak/DSC_6465 copy.JPG" },
             { img: "/rural/Nukkad Natak/DSC_6399 copy.JPG" },
              { img: "/rural/Nukkad Natak/DSC_6362.JPG" },
                { img: "/rural/Nukkad Natak/DSC_6381.JPG" },
                { img: "/rural/Nukkad Natak/DSC_6466.JPG" },
            { img: "/rural/Nukkad Natak/DSC_6447.JPG" },
            { img: "/rural/Nukkad Natak/DSC_6277.JPG" }
        ]
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
        <div className="min-h-screen text-slate-900 font-sans pb-32 bg-slate-50/50 selection:bg-amber-400/30">

            {/* Official Premium Top Border Bar */}
            <div className="w-full h-1.5 bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />

            {/* Premium Deep Navy Hero with Asymmetrical Angled Cut */}
            <div 
                className="bg-gradient-to-br from-[#060b18] via-[#0f1b3a] to-[#040712] text-white pt-28 pb-44 px-4 text-center relative overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0% 100%)' }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-70 pointer-events-none" />
                
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xs">
                        <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-pulse" />
                        <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                            Official Wing Portal
                        </span>
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-xs">
                        Rural Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90 tracking-wide">
                        Bridging the gap between institutional engineering resources and surrounding rural sectors to drive absolute systemic empowerment.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-20">
                <div className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-3xl p-8 md:p-10 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff9933] via-slate-300 to-[#138808]" />
                    <p className="text-base md:text-xl font-medium italic text-slate-800 leading-relaxed max-w-3xl mx-auto">
                        "The soul of India lives in its villages. Carving out the undefined potential in rural communities is not just an act of charity, but our collective responsibility."
                    </p>
                    <div className="absolute left-6 top-3 opacity-[0.03] text-slate-900 font-serif text-9xl pointer-events-none select-none">“</div>
                </div>
            </div>

            {/* Metric Statistics Section */}
            <div className="max-w-5xl mx-auto px-4 mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 text-center transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5">
                        <div className="text-4xl font-black tracking-tight text-[#0a1128] bg-gradient-to-r from-[#0a1128] to-[#1a2e5c] bg-clip-text text-transparent">{s.num}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Narrative Context Section */}
            <div className="max-w-5xl mx-auto px-4 mt-12">
                <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#0a1128]" />
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Our Purpose &amp; Impact
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                        The Rural Development Wing bridges the gap between premier institutional engineering resources and neighboring rural sectors. Our volunteers make structured site visits to surrounding villages to identify core infrastructural challenges, run awareness campaigns on clean sanitation practices, and systematically distribute educational tools and life essentials directly to families in need.
                    </p>
                </div>
            </div>

            {/* Segmented Fields Rows Layout Section */}
            <div className="max-w-6xl mx-auto px-4 mt-24 space-y-20">
                {categories.map((category, catIndex) => (
                    <div key={catIndex} className="border-t border-slate-200/70 pt-10 first:border-0 first:pt-0">
                        
                        {/* Section Field Header */}
                        <div className="mb-8 max-w-3xl">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                                    {category.title}
                                </h2>
                                <span className="text-xs font-bold px-2.5 py-0.5 bg-[#0a1128]/5 text-[#0a1128] rounded-full">
                                    {category.images.length} Snaps
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">
                                {category.description}
                            </p>
                        </div>

                        {/* Interactive Responsive Images Grid Block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.images.map((item, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    onClick={() => setSelected(item)}
                                    className="group bg-white border border-slate-200/60 shadow-xs rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,27,58,0.08)] hover:border-slate-300 flex flex-col relative"
                                >
                                    <div className="h-64 sm:h-72 md:h-80 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                                        {item.img ? (
                                            <>
                                                <img 
                                                    src={item.img} 
                                                    alt={`${category.title} operation view ${imgIndex + 1}`} 
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                                                />
                                                <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </>
                                        ) : (
                                            <div className="text-slate-500 transition-colors duration-300">
                                                <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 00-1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Zoom expansion icon on hover */}
                                        <div className="absolute bottom-4 right-4 w-7 h-7 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Immersive True-Center Big Image Modal Framework */}
            {selected && (
                <div
                    className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-md transition-opacity duration-300"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-transparent flex flex-col items-center justify-center transition-all transform scale-100 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Controller */}
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute -top-12 right-0 md:right-2 text-white/70 hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 group bg-white/5 py-1.5 px-3 rounded-full border border-white/10 backdrop-blur-xs shadow-md"
                            aria-label="Close Modal"
                        >
                            <span>Close</span>
                            <span className="text-sm font-normal">✕</span>
                        </button>
                        
                        {/* Big Centered High-Resolution Container View */}
                        <div className="w-full bg-slate-900/40 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-h-[75vh] flex items-center justify-center">
                            {selected.img ? (
                                <img 
                                    src={selected.img} 
                                    alt="Selected expansion view" 
                                    className="w-full h-full max-h-[75vh] object-contain block select-none"
                                />
                            ) : (
                                <div className="p-20 text-slate-500">
                                    <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}