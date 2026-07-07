"use client"
import React, { useState } from 'react';

// Organized image assets grouped into meaningful category rows
const categories = [
    {
        title: "Blood Donation & Health Camps",
        description: "Life-saving blood donation drives, clinical checkups, and registry camps organized in collaboration with regional healthcare teams.",
        images: [
            { img: "/prerna/blood donation/IMG20260206144513 (1) copy.jpg" },
                        { img: "/prerna/blood donation/IMG20260206105248.jpg" },
            { img: "/prerna/blood donation/IMG20260206140600 copy.jpg" },
            { img: "/prerna/blood donation/IMG20260206112345.jpg" },
            { img: "/prerna/blood donation/IMG20260206131846.jpg" },
            { img: "/prerna/blood donation/IMG20260206110319_01 copy.jpg" },
          
        ]
    },
      {
        title: "Community Care & Resource Collection",
        description: "Ground operations involving resource allocation drives, unorganized sector registration desks, and legal compliance sessions in neighboring blocks.",
        images: [
            { img:"/prerna/Community care and resource collection/IMG20251103145206.jpg" },
            { img: "/prerna/Community care and resource collection/IMG20251022145659.jpg" },
            {img:"/prerna/Community care and resource collection/2501ce36 (2).jpg"},
            { img: "/prerna/Community care and resource collection/IMG20251022143250 (1) copy.jpg" },
            { img: "/prerna/Community care and resource collection/IMG-20260406-WA0057.jpg" },
                          {img:"/prerna/Community care and resource collection/2501ME50 copy.jpg"},
            { img: "/prerna/Community care and resource collection/IMG_20260406_092502.jpg" },
             {img:"/prerna/Community care and resource collection/2501EE21_2503CE05(5) copy.jpg"},


            { img: "/prerna/Community care and resource collection/IMG20251103145116.jpg" }
        ]
    },
    {
        title: "Social Awareness Poster Making",
        description: "Visual advocacy, creative painting competitions, and intensive public postering designed to challenge traditional dogmas and drive civic change.",
        images: [
             { img: "/prerna/social awareness/IMG20260202183604 copy.jpg" },
            { img: "/prerna/social awareness/IMG20260202191744 copy.jpg" },
            { img: "/prerna/social awareness/IMG20260202192231.jpg" },
            { img: "/prerna/social awareness/IMG20260202182806 (1) copy.jpg" },
            { img: "/prerna/social awareness/IMG20260202191814 copy.jpg" },
            { img: "/prerna/social awareness/IMG20260202191952 (1) copy.jpg" },


        ]
    },
    {
        title: "Debates, Quizzes & Interactive Forums",
        description: "Fostering standard critical thought, youth leadership, and policy literacy through competitive townhalls, interactive budget quizzes, and seminars.",
        images: [
              {img:"/prerna/debates and quiz/IMG20260112192554 copy.jpg"},
            { img: "/prerna/debates and quiz/IMG20260112192612 (1) copy.jpg" },
            
            { img: "/prerna/debates and quiz/IMG_4749 (1).JPG" },
           
            { img: "/prerna/debates and quiz/IMG20251101201737 (1) copy.jpg" },
          
             { img: "/prerna/debates and quiz/IMG_4751 copy.JPG" },
            { img: "/prerna/debates and quiz/IMG20251101201207 copy.jpg" },
          
        ]
    },
  
];

const stats = [
    { num: "30+", label: "Awareness Rallies" },
    { num: "850+", label: "Families Counseled" },
    { num: "100%", label: "Rights Driven" },
    { num: "45+", label: "Complaints Handled" },
];

export default function ChetnaWing() {
    const [selected, setSelected] = useState(null);

    // Calculate total assets dynamically across categories
    const totalImages = categories.reduce((acc, cat) => acc + cat.images.length, 0);

    return (
        <div className="min-h-screen text-slate-900 font-sans pb-32 bg-slate-50/50 selection:bg-amber-400/30">

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
                        Prerna <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 font-light">Wing</span>
                    </h1>
                    
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-normal leading-relaxed opacity-90 tracking-wide">
                        Empowering minds through education and innovation. Building strong foundational skills and creative problem-solving within the community.
                    </p>
                </div>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-20">
                <div className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-3xl p-8 md:p-10 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff9933] via-slate-300 to-[#138808]" />
                    <p className="text-base md:text-xl font-medium italic text-slate-800 leading-relaxed max-w-3xl mx-auto">
                        "Awake, arise, and stop not until the goal is reached. The Chetna Wing focuses on building social conscience—driving civil compliance, raising voices against malpractices, and providing legal literacy to the underprivileged."
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
                        The Chetna Wing of NSS IIT Patna drives continuous social counseling and civic awakening initiatives. Our volunteers step off-campus into neighboring towns and villages to actively address systemic malpractices and handle public grievances. By running legal compliance drives, mental health circles, and street performance advocacy, we empower marginal populations with absolute systemic awareness.
                    </p>
                </div>
            </div>

            {/* Segmented Rows Layout Section */}
            <div className="max-w-6xl mx-auto px-4 mt-24 space-y-20">
                {categories.map((category, catIndex) => (
                    <div key={catIndex} className="border-t border-slate-200/70 pt-10 first:border-0 first:pt-0">
                        
                        {/* Section Topic Heading */}
                        <div className="mb-8 max-w-3xl">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                                    {category.title}
                                </h2>
                                <span className="text-xs font-bold px-2.5 py-0.5 bg-[#0a1128]/5 text-[#0a1128] rounded-full">
                                    {category.images.length} Units
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
                                                    alt={`${category.title} image snapshot ${imgIndex + 1}`} 
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                                                />
                                                <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </>
                                        ) : (
                                            <div className="text-slate-500 transition-colors duration-300">
                                                <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
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