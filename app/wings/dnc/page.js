"use client"
import React from 'react';

export default function MinimalDNCWing() {
    return (
        <div className="min-h-screen text-slate-800 font-sans pb-24 bg-slate-50">

            {/* Premium Deep Navy Hero with Asymmetrical Angled Cut */}
           <div style={{
                background: '#000023', color: '#90EE90', padding: '3rem 1.5rem 4rem',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
                clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: '#FFD700' }}>
                    DNC & Social Media <span style={{ fontWeight: 900, color: '#FFD700' }}>Wing</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto' }}>
                    Driving active grassroots social awareness and digital advocacy initiatives.
                </p>
            </div>

            {/* Overlapping Glassmorphism Quote Container */}
            <div className="max-w-3xl mx-auto px-4 mt-10 relative z-10">
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
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                        The <span className="text-slate-900 font-bold">Designer Creation (DNC) Wing</span> serves as the official creative engine and media spine of NSS IIT Patna. Tasked with complete multimedia and design responsibilities, our students translate raw on-field service actions into visually stunning narratives. From high-fidelity event photography and cinematic impact documentaries to modern graphic architectures and frontend interface designs, DNC captures the soul of every single initiative to amplify social awareness globally.
                    </p>
                </div>
            </div>

            {/* Creative Disciplines Grid (Optional Visual Polish) */}
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
    );
}