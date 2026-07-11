"use client"
import React, { useState, useRef } from 'react';
import { ExpandableText } from '@/components/ExpandableText';
import { ChevronLeft, ChevronRight, Play, Film, Image } from 'lucide-react';
import {motion} from 'framer-motion'

const stats = [
    { value: "80", label: "Dedicated Volunteers" },
    { value: "600+", label: "Students Taught" },
    { value: "4+", label: "Adopted Schools" },
    { value: "10k+", label: "Teaching Hours" },
];

const synergyScriptTopics = [
    {
        title: "Excel & Digital Literacy",
        desc: "Essential digital skills including basic spreadsheet operations, formulas, and digital data management.",
        tag: "Digital Skills"
    },
    {
        title: "Generative AI & ChatGPT",
        desc: "Introduction to generative artificial intelligence, smart prompt writing, and responsible online research.",
        tag: "Emerging Tech"
    },
    {
        title: "Canva & Presentations",
        desc: "Practical workshops on building academic slide decks, designing posters, and creating visual templates.",
        tag: "Design"
    },
    {
        title: "Road Safety & Civic Sense",
        desc: "Vital civic education covering traffic rules, community responsibilities, and basic emergency first-aid.",
        tag: "Civic Sense"
    },
    {
        title: "Scholarships & Loans",
        desc: "Empowering students with information on government financial grants, merit scholarships, and education loans.",
        tag: "Guidance"
    },
    {
        title: "Social Media Awareness",
        desc: "Guidance on cyber safety, personal digital footprint, and identifying fake news or online scams.",
        tag: "Cyber Safety"
    }
];

const defaultCategories = [
    {
        title: "Academic Support & Subject Mentorship",
        description: "Student volunteers conducting structured weekend classes at regional government schools, simplifying core Mathematics, Science, and language curricula.",
        images: [
            "/teaching/Screenshot 2026-06-27 at 2.58.28 AM copy.png",
            "/teaching/IMG_1720 (1) copy.JPG",
            "/teaching/IMG20260411102755 copy.jpg",
            "/teaching/IMG_1731 (1) copy.JPG",
            "/teaching/Screenshot 2026-06-27 at 2.57.58 AM.png",
            "/teaching/Screenshot 2026-06-27 at 2.58.43 AM copy.png",
            "/teaching/Screenshot 2026-06-27 at 2.58.53 AM copy.png",
            "/teaching/Screenshot 2026-06-27 at 2.57.44 AM.png",
            "/teaching/IMG_1730 copy.JPG",
            "/teaching/Screenshot 2026-06-27 at 3.09.05 AM copy 2.png",
            "/teaching/Screenshot 2026-06-27 at 3.09.21 AM copy 2.png",
            "/teaching/Screenshot 2026-06-27 at 3.09.33 AM copy 2.png"
        ]
    }
];

const initiatives = [
    {
        id: "outreach",
        title: "Outside-Campus Outreach",
        subtitle: "Regional Schools Outreach",
        description: "Volunteers conduct structured regular teaching classes for Classes VI to XII in nearby government schools in Raghopur and Amhara, recently expanded to Dilawarpur School. We also host Children's Day art celebrations and Makar Sankranti kite-making workshops to blend creativity with academic bonding.",
        highlights: [
            "Regular weekend teaching in Raghopur & Amhara government schools.",
            "Successful expansion to Dilawarpur School in Semester II.",
            "Festive Makar Sankranti kite-building & geometry workshops.",
            "Children's Day art competitions with student creative prize distributions."
        ]
    },
    {
        id: "campus",
        title: "On-Campus Programs & Tech",
        subtitle: "Campus Learning Hub",
        description: "Inviting rural school students to our campus for Tutorial Block teaching programs. NSS volunteers host science exhibitions where children present models to IIT Patna faculty judges, alongside technical awareness camps showcasing Artificial Intelligence, Embedded Systems, and Robotics basics.",
        highlights: [
            "Weekend academic and skill-building Tutorial Block workshops.",
            "Foundation Academy Science Exhibition mentoring and model design.",
            "AI, Robotics, & Microcontrollers live demonstrations and awareness.",
            "Practical introductions to embedded systems, sensors, and microchips."
        ]
    },
    {
        id: "events",
        title: "Flagship Competitions",
        subtitle: "Academic Excellence",
        description: "Executing flagship competitive campaigns like Talent Hunt 2026—a comprehensive scholarship examination designed, printed, and graded entirely by NSS volunteers for over 600 students across six schools. We also organize ideation events like Hack for Humanity to solve urgent community issues.",
        highlights: [
            "Conceiving, compile-testing, and grading exam papers entirely in-house.",
            "Scholarship exam outreach covering 600+ regional students.",
            "Hack for Humanity offline social ideation hackathon.",
            "Management advisory profiling and profile prep (7 Steps to IIMs)."
        ]
    }
];

export default function TeachingWingClient({ events = [], galleryItems = [] }) {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState("All");
    const [visibleCount, setVisibleCount] = useState(12);
    const scrollRefs = useRef([]);

    const displayCategories = events && events.length > 0 ? events : defaultCategories;

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    const schoolsList = ["All", "Amhara", "Dilwarpur", "Foundation Academy", "Raghopur", "TUT Teaching"];

    const filteredGallery = galleryItems.filter(item =>
        selectedSchool === "All" || item.school.toLowerCase() === selectedSchool.toLowerCase()
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans pb-32 relative">
            {/* Fixed Viewport-Wide Background Watermark */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.02] p-4">
                <img src="/wings/teaching.jpeg" alt="" className="w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[1000px] h-auto max-h-[80vh] object-contain" />
            </div>

            {/* Top Border Accent */}
            <div className="w-full h-1.5 bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-500" />

            {/* Premium Deep Hero Section */}
            <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-48 px-4 text-center relative overflow-hidden">
                {/* Glow Ring background shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-12 left-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                    {/* Floating Wing Badge Logo */}
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl mb-6 bg-white shrink-0">
                        <img src="/wings/teaching.jpeg" alt="Teaching Wing Logo" className="h-full w-full object-cover" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
                        <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest leading-none">
                            Bridging Knowledge with Service
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-200 to-amber-400 tracking-tight mb-6">
                        Teaching & Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 font-light">Wing</span>
                    </h1>

                    <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed opacity-95 tracking-wide">
                        Empowering rural government school students through regular weekend curricula, digital literacy, generative AI workshops, science exhibitions, and competitive scholarships.
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
                        "Education is the most powerful weapon which you can use to change the world. By bridging the knowledge gap, we empower the next generation to dream bigger and reach higher."
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
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Core Outreach Focus</span>
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

            {/* "Synergy Script" Highlights Grid */}
            <section className="max-w-6xl mx-auto px-4 mt-24">
                <div className="text-center mb-12">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Local Language Integration</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 tracking-tight">The "Synergy Script" Curriculum</h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal leading-relaxed">
                        To simplify complex topics, volunteers deliver courses compiled in Hindi, specifically designed to help Bihar Board government school students build key modern skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {synergyScriptTopics.map((topic, i) => (
                        <div key={i} className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-3xs hover:-translate-y-1 hover:shadow-xs transition-all duration-300 flex flex-col justify-between text-left">
                            <div>
                                <span className="inline-flex px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-mono font-bold uppercase tracking-wider mb-4 leading-none">
                                    {topic.tag}
                                </span>
                                <h4 className="text-base font-extrabold text-slate-900 mb-2">{topic.title}</h4>
                                <p className="text-slate-600 text-xs leading-relaxed font-normal">{topic.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interactive Dynamic School Gallery (Masonry Layout) */}
            {galleryItems.length > 0 && (
                <section className="max-w-6xl mx-auto px-4 mt-24 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Live Action</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 tracking-tight">On-Ground School Gallery</h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal leading-relaxed">
                            Browse photos and videos of our active sessions across different adopted government schools. Hover to preview videos.
                        </p>

                        {/* Interactive Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                            {schoolsList.map((school) => (
                                <button
                                    key={school}
                                    onClick={() => {
                                        setSelectedSchool(school);
                                        setVisibleCount(12);
                                    }}
                                    className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 border ${selectedSchool === school
                                            ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                                        }`}
                                >
                                    {school}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Masonry Layout Grid using CSS columns */}
                    <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {filteredGallery.slice(0, visibleCount).map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedMedia(item)}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-slate-200/60 bg-white shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer w-full"
                            >
                                {item.type === 'video' ? (
                                    <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-auto">
                                        <video
                                            src={item.url}
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.play().catch(() => { });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.pause();
                                                e.currentTarget.currentTime = 0;
                                            }}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                        <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-xs border border-white/10 text-white rounded-full p-1.5 shadow-sm">
                                            <Film size={12} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={`${item.school} activity`}
                                        loading="lazy"
                                        className="w-full h-auto object-cover rounded-2xl group-hover:scale-102 transition-all duration-500"
                                    />
                                )}

                                {/* Hover details overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                                    <span className="text-[9px] font-black text-amber-400 tracking-widest uppercase mb-1 leading-none">
                                        {item.school}
                                    </span>
                                    <span className="text-white text-xs font-extrabold leading-tight flex items-center gap-1.5">
                                        {item.type === 'video' ? (
                                            <>
                                                <Play size={10} fill="currentColor" /> Play Video Clip
                                            </>
                                        ) : (
                                            <>
                                                <Image size={10} /> View Photo
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Infinite Load More button */}
                    {filteredGallery.length > visibleCount && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 12)}
                                className="px-6 py-3.5 rounded-full text-[10px] font-black bg-slate-950 text-white hover:bg-slate-800 transition-all duration-300 uppercase tracking-widest border border-slate-900 shadow-lg active:scale-95 cursor-pointer"
                            >
                                Load More Media
                            </button>
                        </div>
                    )}
                </section>
            )}

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
                                                onClick={() => setSelectedMedia({ url: imgUrl, type: 'image', school: cat.title })}
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

            {/* Fullscreen Zoom Media Lightbox Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div
                        className="relative max-w-4xl w-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-full border border-white/10 backdrop-blur-xs"
                        >
                            <span>Close</span>
                            <span>✕</span>
                        </button>
                        <div className="w-full bg-slate-900/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[75vh] flex items-center justify-center">
                            {selectedMedia.type === 'video' ? (
                                <video
                                    src={selectedMedia.url}
                                    controls
                                    autoPlay
                                    className="w-full h-full max-h-[75vh] object-contain rounded-2xl"
                                />
                            ) : (
                                <img
                                    src={selectedMedia.url}
                                    alt="Enlarged gallery view"
                                    className="w-full h-full max-h-[75vh] object-contain"
                                />
                            )}
                        </div>
                        {selectedMedia.school && (
                            <p className="text-slate-400 mt-4 text-[10px] font-black uppercase tracking-widest">
                                Location: {selectedMedia.school}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
