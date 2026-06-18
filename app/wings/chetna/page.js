"use client"
import React, { useState } from 'react';

const initiatives = [
    {
        tag: "Grievances & Rights",
        title: "Public Compliance & Grievance Assistance",
        quote: "“Justice thrives when citizens understand their institutional safeguards.”",
        desc: "Volunteers assist local rural residents in drafting and filing formal consumer complaints, understanding basic civic rights, and navigating official portals to resolve community utility issues.",
        img: "https://i.pinimg.com/736x/4e/42/f3/4e42f3626d7e553be48ed2b73da3cd7a.jpg"
    },
    {
        tag: "Social Awakening",
        title: "Anti-Superstition & Taboo Counseling",
        quote: "“Reason and awareness are the ultimate antidotes to age-old dogmas.”",
        desc: "Conducting targeted counseling sessions and open forums in local blocks to dismantle harmful social taboos, combat local superstitions, and champion scientific temper.",
        img: "https://i.pinimg.com/736x/da/24/8c/da248c44d66f6ea7b18a5e85daab6ff2.jpg"
    },
    {
        tag: "Legal Literacy",
        title: "Know-Your-Rights Door Campaigns",
        quote: "“An aware citizen is the strongest pillar of a functional democracy.”",
        desc: "NSS volunteers walk door-to-door in neighboring villages educating families on fundamental legal protection schemes, standard labor codes, and women's safety laws.",
        img: "https://i.pinimg.com/1200x/1e/56/0a/1e560a34529b83c6928dac6cce6e3c1f.jpg"
    },
    {
        tag: "Mental Health",
        title: "Community Psychological Well-being",
        quote: "“Mental health is a fundamental necessity, not a luxury or a secret.”",
        desc: "Organizing stress-management camps, open-circle discussions, and reducing deep-rooted stigmas surrounding mental distress both across the campus and inside local towns.",
        img: "https://i.pinimg.com/1200x/35/fd/da/35fdda39acb667e97ccf514832786b1f.jpg"
    },
    {
        tag: "Welfare Access",
        title: "Government Scheme Enrollment Clinics",
        quote: "“True development ensures public provisions actually reach the last mile.”",
        desc: "Setting up helpdesks to check eligibility and register rural citizens for critical state welfare, pension funds, medical insurances, and subsidized financial utilities.",
        img: "https://i.pinimg.com/736x/32/47/24/324724254c743bbcf634cf8292c68093.jpg"
    },
    {
        tag: "Advocacy",
        title: "Social Justice Street Theater",
        quote: "“Art acts as a mirror that forces society to confront its deep faults.”",
        desc: "Using loud, high-energy street plays (Nukkad Natak) in major public market circles to tackle domestic abuse issues, child labor compliance, and gender inequality.",
        img: "https://i.pinimg.com/1200x/54/1e/94/541e94e80fbe363b58810fc0451700a6.jpg"
    }
];

const stats = [
    { num: "30+", label: "Awareness Rallies" },
    { num: "850+", label: "Families Counseled" },
    { num: "100%", label: "Rights Driven" },
    { num: "45+", label: "Complaints Handled" },
];

export default function ChetnaWing() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen text-slate-800 font-sans pb-24 bg-slate-50">

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
                        Chetna <span className="text-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90">
                        Empowering minds through education and innovation. Building strong foundational skills and creative problem-solving within the community.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-3xl mx-auto px-4 -mt-24 relative z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-slate-400 to-[#138808]" />
                    <p className="text-base md:text-xl italic text-slate-800 leading-relaxed font-semibold">
                        "Awake, arise, and stop not until the goal is reached. The Chetna Wing focuses on building social conscience—driving civil compliance, raising voices against malpractices, and providing legal literacy to the underprivileged."
                    </p>
                    <div className="absolute left-4 top-2 opacity-5 text-slate-900 font-serif text-8xl pointer-events-none select-none">“</div>
                </div>
            </div>

            {/* Metric Statistics Section */}
            <div className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white border border-slate-200/60 shadow-xs rounded-2xl p-5 text-center transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                        <div className="text-3xl font-black text-[#0a1128]">{s.num}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Narrative Context Section */}
            <div className="max-w-4xl mx-auto px-4 mt-10">
                <div className="bg-white border border-slate-200/70 shadow-xs rounded-2xl p-6 md:p-8">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-3.5 bg-[#0a1128] rounded-full inline-block" />
                        Our Purpose &amp; Impact
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                        The Chetna Wing of NSS IIT Patna drives continuous social counseling and civic awakening initiatives. Our volunteers step off-campus into neighboring towns and villages to actively address systemic malpractices and handle public grievances. By running legal compliance drives, mental health circles, and street performance advocacy, we empower marginal populations with absolute systemic awareness.
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

            {/* pop-up Modal */}
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