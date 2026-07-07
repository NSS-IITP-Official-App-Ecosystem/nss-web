"use client"
import React, { useState, useRef } from 'react';

const categories = [
    {
        title: "Social Awareness Session",
        description: "Conducting structured awareness sessions to motivate local communities on health, hygiene, and social welfare.",
        images: [
            { img: "/events/session/2025-26/rural/ppt/WhatsApp Image 2025-11-02 at 3.51.08 PM (1) copy.jpeg" },
            { img: "/events/session/2025-26/rural/ppt/20251101_144625.jpg" },
            { img: "/events/session/2025-26/rural/ppt/WhatsApp Image 2025-11-02 at 4.00.06 PM (1).jpeg" },
            { img: "/events/session/2025-26/rural/ppt/IMG20251015193109.jpg" },
            { img: "/events/session/2025-26/rural/ppt/IMG_4646 copy.JPG" },
            { img: "/events/session/2025-26/rural/ppt/IMG_5637 copy.JPG" }
        ]
    },
    {
        title: "Awareness Clinics & Learning Assemblies",
        description: "Organizing health and hygiene clinics, along with interactive learning assemblies to educate and empower rural communities.",
        images: [
            { img: "/events/session/2025-26/rural/clinics/WhatsApp Image 2026-03-24 at 8.45.12 AM (1) copy.jpeg" },
            { img: "/events/session/2025-26/rural/clinics/IMG_0097.JPG" },
            { img: "/events/session/2025-26/rural/clinics/WhatsApp Image 2026-03-24 at 8.45.20 AM (3) copy.jpeg" },
            { img: "/events/session/2025-26/rural/clinics/IMG_0083.JPG" },
            { img: "/events/session/2025-26/rural/clinics/IMG_9968 copy.JPG" },
            { img: "/events/session/2025-26/rural/clinics/WhatsApp Image 2026-03-24 at 8.45.18 AM (2) copy.jpeg" },
        ]
    },
    {
        title: "Essential Resource Distribution Camps",
        description: "Distributing essential resources to underserved rural communities through organized campaigns and partnerships.",
        images: [
            { img: "/events/session/2025-26/rural/donation/20260411_113643 copy.jpg" },
            { img: "/events/session/2025-26/rural/donation/IMG_1258 copy.JPG" },
            { img: "/events/session/2025-26/rural/donation/IMG_20260406_092502 (1) copy.jpg" },
            { img: "/events/session/2025-26/rural/donation/IMG-20260406-WA0042 copy.jpg" },
            { img: "/events/session/2025-26/rural/donation/IMG_20260406_094010.jpg" },
            { img: "/events/session/2025-26/rural/donation/IMG20251103145821.jpg" }
        ]
    },
    {
        title: "Nukkad Natak",
        description: "Street plays and interactive performances to raise awareness on social issues and promote community engagement.",
        images: [
            { img: "/events/session/2025-26/rural/Nukkad Natak/DSC_6489.JPG" },
            { img: "/events/session/2025-26/rural/Nukkad Natak/DSC_6448 copy.JPG" },
            { img: "/events/session/2025-26/rural/Nukkad Natak/DSC_6465 copy.JPG" },
            { img: "/events/session/2025-26/rural/Nukkad Natak/DSC_6399 copy.JPG" },
            { img: "/events/session/2025-26/rural/Nukkad Natak/DSC_6362.JPG" },
            { img: "/events/session/2025-26/rural/Nukkad Natak/DSC_6381.JPG" }
        ]
    }
];

export default function RuralDevelopment() {
    const [selected, setSelected] = useState(null);
    const scrollRefs = useRef([]);

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        const cardWidth = el.clientWidth / 3;
        el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-slate-900 font-sans pb-32 bg-slate-50/50">
            {/* Hero Section */}
            <div style={{
                background: '#000023', color: '#90EE90', padding: '3rem 1.5rem 4rem',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
                clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: '#FFD700' }}>
                    RURAL <span style={{ fontWeight: 900, color: '#FFD700' }}>Wing</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto' }}>
                    Driving sustainable rural development through education, mentorship, and essential resource distribution.
                </p>
            </div>

            {/* Gallery Rows */}
            <div className="max-w-6xl mx-auto px-4 mt-12 space-y-20">
                {categories.map((category, ci) => (
                    <div key={ci} className="border-t border-slate-200/70 pt-10">
                        <div className="mb-8 max-w-2xl">
                            <h2 className="text-2xl font-black text-slate-900">{category.title}</h2>
                            <p className="text-sm text-slate-500 mt-2">{category.description}</p>
                        </div>

                        {/* Carousel Wrapper with Positioning for Buttons */}
                        <div style={{ position: 'relative' }}>
                            {/* Left Button */}
                            <button 
                                onClick={() => scrollByAmount(ci, -1)} 
                                className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:bg-slate-50"
                            >
                                ‹
                            </button>

                            {/* Carousel Container */}
                            <div 
                                ref={(el) => (scrollRefs.current[ci] = el)}
                                className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
                                style={{ scrollbarWidth: 'none' }}
                            >
                                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                                {category.images.map((item, ii) => (
                                    <div key={ii} onClick={() => setSelected(item)} className="min-w-[30%] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-slate-200 hover:scale-[1.02] transition-transform">
                                        <img src={item.img} alt={category.title} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Right Button */}
                            <button 
                                onClick={() => scrollByAmount(ci, 1)} 
                                className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:bg-slate-50"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <img src={selected.img} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
                </div>
            )}
        </div>
    );
}