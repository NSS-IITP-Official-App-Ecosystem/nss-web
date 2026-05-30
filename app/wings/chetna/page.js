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
        <div className="min-h-screen text-white font-sans pb-16 bg-gradient-to-tr from-[#050515] via-[#0a0a24] to-[#02020a]" >

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center pt-12 px-4 pb-6">
                <span className="text-[#ff9933] text-xs font-semibold uppercase tracking-widest block mb-3">
                    National Service Scheme
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1 text-white">
                    Chetna <span className="text-[#ff9933]">Wing</span>
                </h1>
                <div className="w-14 h-0.5 bg-[#ff9933] mx-auto mt-3 mb-5" />
                <div className="text-left max-w-2xl mx-auto p-5 border-l-4 border-[#138808] bg-white/5 rounded-r-xl">
                    <p className="text-base italic text-gray-300 leading-relaxed">
                        "Awake, arise, and stop not until the goal is reached. The Chetna Wing focuses on building social conscience—driving civil compliance, raising voices against malpractices, and providing legal literacy to the underprivileged."
                    </p>
                </div>
            </header>


            <div className="max-w-4xl mx-auto px-4 mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#ff9933]">{s.num}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{s.label}</div>
                    </div>
                ))}
            </div>


            <div className="max-w-4xl mx-auto px-4 mt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-[#ff9933] uppercase tracking-wide mb-3">
                        Our Purpose &amp; Impact
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        The Chetna Wing of NSS IIT Patna drives continuous social counseling and civic awakening initiatives. Our volunteers step off-campus into neighboring towns and villages to actively address systemic malpractices and handle public grievances. By running legal compliance drives, mental health circles, and street performance advocacy, we empower marginal populations with absolute systemic awareness.
                    </p>
                </div>
            </div>


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