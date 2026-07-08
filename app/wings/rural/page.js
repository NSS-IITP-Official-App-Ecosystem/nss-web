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
        <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0b1a10', fontFamily: "'Inter', sans-serif" }}>
            
            {/* Header Section */}
            <div className="flex flex-row items-center justify-center gap-6 px-6 py-8 bg-[#000023] min-h-[220px]">
                <div className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFD700]"> 
                    <img 
                        src="/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41 (1).jpeg" 
                        alt="Rural Wing Logo" 
                        className="h-full w-full object-cover" 
                    />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#FFD700]">
                        RURAL <span className="font-black text-white">Wing</span>
                    </h1>
                    <p className="text-white/80">
                        Driving sustainable rural development through education, mentorship, and essential resource distribution.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div style={{
                backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41 (1).jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.92)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, paddingBottom: '5rem' }}>
                    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1.5rem' }}>
                        {categories.map((cat, ci) => (
                            <div key={ci} style={{ marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#000000' }}>{cat.title}</h2>
                                <p style={{ fontSize: '1rem', color: '#333', marginBottom: '1rem' }}>{cat.description}</p>

                                <div style={{ position: 'relative' }}>
                                    <button onClick={() => scrollByAmount(ci, -1)} aria-label="Scroll left" style={{ position: 'absolute', left: -14, top: '50%', zIndex: 10, width: 32, height: 32, borderRadius: '50%', border: '1px solid #d7dcd3', background: '#fff', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>ᐸ</button>
                                    
                                    <div ref={(el) => (scrollRefs.current[ci] = el)} className="env-img-grid" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: 'calc(33.33% - 11px)', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', scrollBehavior: 'smooth' }}>
                                        {cat.images.map((item, ii) => (
                                            <div 
                                                key={ii} 
                                                onClick={() => setSelected(item)} 
                                                style={{ 
                                                    borderRadius: 10, 
                                                    overflow: 'hidden', 
                                                    aspectRatio: '4/3', 
                                                    cursor: 'pointer', 
                                                    flexShrink: 0, 
                                                    border: '7px solid #000080' // Added 7px dark navy blue border
                                                }}
                                            >
                                                <img src={item.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>

                                    <button onClick={() => scrollByAmount(ci, 1)} aria-label="Scroll right" style={{ position: 'absolute', right: -14, top: '50%', zIndex: 10, width: 32, height: 32, borderRadius: '50%', border: '1px solid #d7dcd3', background: '#fff', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>ᐳ</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selected && (
                <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(5, 20, 10, 0.95)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <img src={selected.img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}