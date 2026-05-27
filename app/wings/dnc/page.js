"use client"
import React from 'react';

export default function MinimalDNCWing() {
    return (
        <div className="min-h-screen text-white font-sans flex items-center justify-center bg-gradient-to-tr from-[#050515] via-[#0a0a24] to-[#02020a] px-4">

            {/* Core Content Container */}
            <div className="max-w-3xl mx-auto text-center py-20">

                {/* Small Sub-Badge */}
                <span className="text-[#ff9933] text-xs font-bold uppercase tracking-widest block mb-4">
                    National Service Scheme • IIT Patna
                </span>

                {/* Stunning Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-[#ff9933] bg-clip-text text-transparent leading-tight">
                    Designer Creation &amp; Media Wing
                </h1>

                {/* Aesthetic Theme Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-[#ff9933] to-[#138808] mx-auto my-6 rounded-full" />

                {/* Contextual Accent Quote */}
                <p className="text-base md:text-lg italic text-gray-300 font-medium mb-6 max-w-xl mx-auto leading-relaxed">
                    "Creativity is contagious, pass it on."
                </p>

                {/* Core Elegant Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto border-t border-white/5 pt-6">
                    The <span className="text-white font-medium">Designer Creation (DNC) Wing</span> serves as the official creative engine and media spine of NSS. Tasked with complete multimedia and design responsibilities, our students translate raw on-field service actions into visually stunning narratives. From high-fidelity event photography and cinematic impact documentaries to modern graphic architectures and frontend interface designs, DNC captures the soul of every single initiative to amplify social awareness globally.
                </p>

            </div>
        </div>
    );
}