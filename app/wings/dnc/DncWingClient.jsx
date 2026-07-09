"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef } from 'react';

const ExpandableDescription = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = text && text.length > 140;

    if (!isLongText) {
        return <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">{text}</p>;
    }

    return (
        <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">
            {isExpanded ? text : `${text.slice(0, 140)}...`}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} 
                className="text-[#0a1128] font-bold bg-none border-none cursor-pointer p-0 ml-1.5 text-xs underline inline"
            >
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>
        </p>
    );
};

const stats = [
    { value: "80+", label: "Design Projects" },
    { value: "25+", label: "Videos Produced" },
    { value: "45+", label: "Active Creatives" },
    { value: "3", label: "Creative Subunits" },
];

export default function DncWingClient({ events }) {
    const [selected, setSelected] = useState(null);
    const scrollRefs = useRef([]);

    // Determine the categories of events to display (empty list fallback if no db events)
    const displayCategories = events && events.length > 0 ? events : [];

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-slate-900 font-sans pb-32 bg-slate-50/50 selection:bg-amber-400/30">

            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.05] p-4">
                <img src="/wings/dnc.png" alt="" className="w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[1000px] h-auto max-h-[80vh] object-contain" />
            </div>
            {/* Official Premium Top Border Bar */}
            <div className="w-full h-1.5 bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />

            {/* Premium Deep Navy Hero with Asymmetrical Angled Cut */}
            <div 
                className="bg-gradient-to-br from-[#060b18] via-[#0f1b3a] to-[#040712] text-white pt-20 pb-44 px-4 text-center relative overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0% 100%)' }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-70 pointer-events-none" />
                
                <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                    {/* Circular Logo in Hero Section */}
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg mb-6 flex-shrink-0 bg-white">
                        <img src="/wings/WhatsApp Image 2026-07-08 at 14.10.36.jpeg" alt="DNC Logo" className="h-full w-full object-cover" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xs">
                        <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-pulse" />
                        <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                            Official Wing Portal
                        </span>
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-xs">
                        DNC & Social Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90 tracking-wide">
                        The creative engine and media backbone of NSS IIT Patna, translating raw on-field service actions into visually stunning digital narratives.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-slate-400 to-[#138808]" />
                    <span className="absolute -top-6 -left-2 text-[120px] text-slate-200/50 font-serif select-none pointer-events-none group-hover:scale-105 transition-transform duration-500 inline-block">“</span>
                    <p className="text-base md:text-xl italic text-slate-800 leading-relaxed font-semibold relative z-10">
                        {"\"Creativity is contagious, pass it on. Design is the silent ambassador of our collective impact across every village, screen, and story.\""}
                    </p>
                </div>
            </div>

            {/* Impact Metrics */}
            <div className="max-w-5xl mx-auto px-4 mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col items-center justify-center text-center">
                        <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
                            {stat.value}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Core Description / Mission Section */}
            <div className="max-w-4xl mx-auto px-4 mt-16 relative z-10">
                <div className="bg-white border border-slate-200/60 shadow-xs rounded-2xl p-6 md:p-8">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1 h-3.5 bg-[#0a1128] rounded-full inline-block" />
                        Our Creative Mandate
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                        The <span className="text-slate-900 font-bold">Designer Creation (DNC) Wing</span> serves as the official creative engine and media spine of NSS IIT Patna. Tasked with complete multimedia and design responsibilities, our students translate raw on-field service actions into visually stunning narratives. From high-fidelity event photography and cinematic impact documentaries to modern graphic architectures and frontend interface designs, DNC captures the soul of every single initiative to amplify social awareness globally.
                    </p>
                </div>
            </div>

            {/* Event Galleries from Database */}
            {displayCategories.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 mt-24 relative">
                  

                    <div className="relative z-10 space-y-20">
                        <h2 className="text-2xl font-black text-slate-900 border-b-2 border-amber-400 pb-2 mb-10">Wing Showcases</h2>
                        {displayCategories.map((cat, ci) => {
                            const catImages = cat.images || [];
                            if (catImages.length === 0) return null;

                            return (
                                <div key={ci} className="border-t border-slate-200/70 pt-10 first:border-0 first:pt-0">
                                    {/* Section Header */}
                                    <div className="mb-8 max-w-3xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                                                {cat.title}
                                            </h3>
                                            <span className="text-xs font-bold px-2.5 py-0.5 bg-[#0a1128]/5 text-[#0a1128] rounded-full">
                                                {catImages.length} Snaps
                                            </span>
                                        </div>
                                        <ExpandableDescription text={cat.description} />
                                    </div>

                                    {/* Horizontal Slider Layout */}
                                    <div className="relative px-4">
                                        <button 
                                            onClick={() => scrollByAmount(ci, -1)} 
                                            className="absolute -left-2 top-[40%] z-10 w-9 h-9 rounded-full bg-white/50 border border-slate-200 shadow-md flex items-center justify-center cursor-pointer text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <ChevronLeft/>
                                        </button>
                                        
                                        <div 
                                            ref={(el) => (scrollRefs.current[ci] = el)} 
                                            style={{ scrollbarWidth: 'none' }}
                                            className="flex gap-4 overflow-x-auto scroll-smooth pb-3"
                                        >
                                            {catImages.map((imgUrl, ii) => (
                                                <div
                                                    key={ii}
                                                    onClick={() => setSelected(imgUrl)}
                                                    className="group bg-white border border-slate-200/60 shadow-xs rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 flex-shrink-0 w-[290px] aspect-[4/3] relative"
                                                >
                                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                                                        <img 
                                                            src={imgUrl} 
                                                            alt={`${cat.title} snap ${ii + 1}`} 
                                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                                                        />
                                                        <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <div className="absolute bottom-4 right-4 w-7 h-7 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
                                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <button 
                                            onClick={() => scrollByAmount(ci, 1)} 
                                            className="absolute -right-2 top-[40%] z-10 w-9 h-9 rounded-full bg-white/50 border border-slate-200 shadow-md flex items-center justify-center cursor-pointer text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <ChevronRight/>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Creative Disciplines Grid */}
            <div className="max-w-4xl mx-auto px-4 mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs">
                    <div className="text-slate-900 font-bold text-sm mb-1">Visual Architecture</div>
                    <div className="text-xs text-slate-500">Graphic design layouts, identity branding, and UI assets.</div>
                </div>
                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs">
                    <div className="text-slate-900 font-bold text-sm mb-1">Cinematic Media</div>
                    <div className="text-xs text-slate-500">Documenting direct human impact via high-fidelity video production.</div>
                </div>
                <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs">
                    <div className="text-slate-900 font-bold text-sm mb-1">Digital Awareness</div>
                    <div className="text-xs text-slate-500">Publishing, scaling narratives, and public digital management.</div>
                </div>
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
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute -top-12 right-0 md:right-2 text-white/70 hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 group bg-white/5 py-1.5 px-3 rounded-full border border-white/10 backdrop-blur-xs shadow-md"
                            aria-label="Close Modal"
                        >
                            <span>Close</span>
                            <span className="text-sm font-normal">✕</span>
                        </button>
                        
                        <div className="w-full bg-slate-900/40 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-h-[75vh] flex items-center justify-center">
                            <img 
                                src={selected} 
                                alt="Selected expansion view" 
                                className="w-full h-full max-h-[75vh] object-contain block select-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
