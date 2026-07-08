"use client"
import React from 'react';

export default function MinimalDNCWing() {
    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0b1a10', fontFamily: "'Inter', sans-serif" }}>

            {/* Header Section */}
            <div className="flex flex-row items-center justify-center gap-6 px-6 py-8 bg-[#000023] min-h-[220px]">
                <div className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFD700]"> 
                    <img 
                        src="/wings_logo/WhatsApp Image 2026-07-08 at 14.10.50.jpeg" 
                        alt="DNC Wing Logo" 
                        className="h-full w-full object-cover" 
                    />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#FFD700]">
                        DNC <span className="font-black text-white">& Social Media Wing</span>
                    </h1>
                    <p className="text-white/80">
                        Driving active grassroots social awareness and digital advocacy initiatives.
                    </p>
                </div>
            </div>

            {/* Gallery Section with Background Image */}
            <div style={{
                backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 14.10.50.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative',
                paddingTop: '2rem',
                paddingBottom: '5rem'
            }}>
                {/* Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.6)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Overlapping Glassmorphism Quote Container */}
                    <div className="max-w-3xl mx-auto px-4 mt-10">
                        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-slate-400 to-[#138808]" />
                            <p className="text-base md:text-xl italic text-slate-800 leading-relaxed font-semibold">
                                "Creativity is contagious, pass it on. Design is the silent ambassador of our collective impact across every village, screen, and story."
                            </p>
                        </div>
                    </div>

                    {/* Core Description / Mission Section */}
                    <div className="max-w-4xl mx-auto px-4 mt-16">
                        <div className="bg-white border border-slate-200/70 shadow-xs rounded-2xl p-6 md:p-8">
                            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1 h-3.5 bg-[#0a1128] rounded-full inline-block" />
                                Our Creative Mandate
                            </h2>
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                                The <span className="text-slate-900 font-bold">Designer Creation (DNC) Wing</span> serves as the official creative engine and media spine of NSS IIT Patna. Tasked with complete multimedia and design responsibilities, our students translate raw on-field service actions into visually stunning narratives. From high-fidelity event photography and cinematic impact documentaries to modern graphic architectures and frontend interface designs, DNC captures the soul of every single initiative to amplify social awareness globally.
                            </p>
                        </div>
                    </div>

                    {/* Creative Disciplines Grid */}
                    <div className="max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                </div>
            </div>
        </div>
    );
}