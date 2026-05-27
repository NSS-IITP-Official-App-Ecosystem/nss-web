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
        <div className="min-h-screen text-white font-sans pb-16 bg-gradient-to-tr from-[#050515] via-[#0a0a24] to-[#02020a]" >

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center pt-12 px-4 pb-6">
                <span className="text-[#ff9933] text-xs font-semibold uppercase tracking-widest block mb-3">
                    National Service Scheme
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1 text-white">
                    Teaching <span className="text-[#ff9933]">Wing</span>
                </h1>
                <div className="w-14 h-0.5 bg-[#ff9933] mx-auto mt-3 mb-5" />
                <div className="text-left max-w-2xl mx-auto p-5 border-l-4 border-[#138808] bg-white/5 rounded-r-xl">
                    <p className="text-base italic text-gray-300 leading-relaxed">
                        "Knowledge increases by sharing, not by saving. True education is about taking the brilliance of an institution like IIT Patna and channeling it to light up dark, resource-strained classrooms nearby."
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
                        The Teaching Wing of NSS IIT Patna believes that quality guidance is the greatest equalizer in society. Our volunteers step out of the campus routinely into rural spaces and municipal government schools to teach underprivileged children. By filling resource gaps, creating custom test prep paths, and offering regular, dedicated mentorship, we strive to build a runway for their academic and career aspirations.
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