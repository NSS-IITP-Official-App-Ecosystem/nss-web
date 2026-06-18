"use client"
import React, { useState } from 'react';

const initiatives = [
    {
        tag: "Government Schools",
        title: "Academic Support & Subject Mentorship",
        quote: "“Education is the most powerful weapon which you can use to change the world.”",
        desc: "Student volunteers conduct structured weekend classes at local government schools, breaking down complex concepts in Mathematics, Science, and English to help rural students excel in their school curriculums.",
        img: "https://i.pinimg.com/1200x/ff/21/28/ff212816c9b929d194ab7deb1d8a6f9c.jpg"
    },
    {
        tag: "Rural Literacy",
        title: "Evening Remedial Classes",
        quote: "“Every child deserves a champion—an adult who will never give up on them.”",
        desc: "Stepping outside the campus to set up open-air community classrooms. Volunteers provide daily homework help, foundational reading skills, and basic arithmetic training directly within adopted village blocks.",
        img: "https://i.pinimg.com/1200x/b3/97/75/b397759715d8c565bf54af0afab9f8de.jpg"
    },
    {
        tag: "Competitive Edge",
        title: "Navodaya & NTSE Preparation",
        desc: "Identifying and training bright minds from underprivileged backgrounds for competitive scholarship exams like Jawahar Navodaya Vidyalaya (JNVST) and NTSE, paving their way toward premier institutions.",
        quote: "“Democratizing elite guidance for those who need it the most.”",
        img: "https://i.pinimg.com/1200x/68/76/eb/6876ebf8466c6feea5193bbb93d2a2e3.jpg"
    },
    {
        tag: "Digital Education",
        title: "Basic Computing Outreach",
        quote: "“Bridging the modern digital divide, one keystroke at a time.”",
        desc: "Introducing children in local municipal schools to basic computer literacy, including computer operations, typing skills, internet safety, and interactive visual coding fundamentals.",
        img: "https://i.pinimg.com/1200x/a7/50/f7/a750f7bf291ea72776e04a7a66593d38.jpg"
    },
    {
        tag: "Empowerment",
        title: "Girl Child Education Campaigns",
        quote: "“Educate a girl, and you empower an entire generation.”",
        desc: "Conducting targeted door-to-door community sensitization campaigns to counsel parents in rural sectors about the vital importance of secondary and higher education for young girls.",
        img: "https://i.pinimg.com/736x/25/b6/18/25b61835e7f62ed37bb231b29a996226.jpg"
    },
    {
        tag: "Holistic Growth",
        title: "Creative Arts & Talent Showcases",
        quote: "“Do not restrict a child to your learning, for he was born in another time.”",
        desc: "Organizing vibrant extracurricular workshops involving public speaking, drawing, interactive science experiments, and sports to nurture creative expression and build strong confidence.",
        img: "https://i.pinimg.com/736x/a5/9d/ff/a59dff0514d98da452b7ce0097dc5a0e.jpg"
    }
];

const stats = [
    { num: "1,200+", label: "Students Taught" },
    { num: "8+", label: "Adopted Schools" },
    { num: "150+", label: "Active Student Mentors" },
    { num: "10k+", label: "Teaching Hours" },
];

export default function TeachingWing() {
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
                        Teaching <span className="text-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90">
                        Democratizing knowledge, cultivating resource-strained classrooms, and building stable academic runways for local rural youth.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-3xl mx-auto px-4 -mt-24 relative z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-slate-400 to-[#138808]" />
                    <p className="text-base md:text-xl italic text-slate-800 leading-relaxed font-semibold">
                        "Knowledge increases by sharing, not by saving. True education is about taking the brilliance of an institution like IIT Patna and channeling it to light up dark, resource-strained classrooms nearby."
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
                        The Teaching Wing of NSS IIT Patna believes that quality guidance is the greatest equalizer in society. Our volunteers step out of the campus routinely into rural spaces and municipal government schools to teach underprivileged children. By filling resource gaps, creating custom test prep paths, and offering regular, dedicated mentorship, we strive to build a runway for their academic and career aspirations.
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