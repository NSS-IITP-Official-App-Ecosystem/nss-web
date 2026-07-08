"use client"
import React, { useState, useRef } from 'react';

const categories = [
    {
        title: "Blood Donation & Health Camps",
        description: "Life-saving blood donation drives, clinical checkups, and registry camps organized in collaboration with regional healthcare teams.",
        images: [
            { img: "/events/session/2025-26/prerna/blood donation/IMG20260206144513 (1) copy.jpg" },
            { img: "/events/session/2025-26/prerna/blood donation/IMG20260206105248.jpg" },
            { img: "/events/session/2025-26/prerna/blood donation/IMG20260206140600 copy.jpg" },
            { img: "/events/session/2025-26/prerna/blood donation/IMG20260206112345.jpg" },
            { img: "/events/session/2025-26/prerna/blood donation/IMG20260206131846.jpg" },
            { img: "/events/session/2025-26/prerna/blood donation/IMG20260206110319_01 copy.jpg" },
        ]
    },
    {
        title: "Community Care & Resource Collection",
        description: "Collecting essential resources and donating them to those in need through the selfless efforts of our dedicated volunteers.",
        images: [
            { img: "/events/session/2025-26/prerna/Community care and resource collection/IMG20251103145206.jpg" },
            { img: "/events/session/2025-26/prerna/Community care and resource collection/IMG20251022145659.jpg" },
            { img: "/events/session/2025-26/prerna/Community care and resource collection/2501ce36 (2).jpg" },
            { img: "/events/session/2025-26/prerna/Community care and resource collection/IMG20251022143250 (1) copy.jpg" },
            { img: "/events/session/2025-26/prerna/Community care and resource collection/IMG-20260406-WA0057.jpg" },
            { img: "/events/session/2025-26/prerna/Community care and resource collection/2501ME50 copy.jpg" },
        ]
    },
    {
        title: "Social Awareness Poster Making",
        description: "Transforming ideas into action, our students used the art of poster-making to raise awareness and inspire positive social change.",
        images: [
            { img: "/events/session/2025-26/prerna/social awareness/IMG20260202191744 copy.jpg" },
            { img: "/events/session/2025-26/prerna/social awareness/IMG20260202192231.jpg" },
            { img: "/events/session/2025-26/prerna/social awareness/IMG20260202182806 (1) copy.jpg" },
            { img: "/events/session/2025-26/prerna/social awareness/IMG20260202191814 copy.jpg" },
            { img: "/events/session/2025-26/prerna/social awareness/IMG20260202183604 copy.jpg" },
            { img: "/events/session/2025-26/prerna/social awareness/IMG20260202191952 (1) copy.jpg" },
        ]
    }
];

const allImages = categories.flatMap(cat => cat.images);

export default function ChetnaWing() {
    const [modalIdx, setModalIdx] = useState(null);
    const scrollRefs = useRef([]);

    const getGlobalIdx = (ci, ii) => {
        let idx = 0;
        for (let i = 0; i < ci; i++) idx += categories[i].images.length;
        return idx + ii;
    };

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
                        src="/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41.jpeg" 
                        alt="Prerna Wing Logo" 
                        className="h-full w-full object-cover" 
                    />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#FFD700]">
                        PRERNA <span className="font-black text-white">Wing</span>
                    </h1>
                    <p className="text-white/80">
                        Empowering communities through health, awareness, and social advocacy initiatives.
                    </p>
                </div>
            </div>

            {/* Gallery Section with Background Image */}
            <div style={{
                backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41.jpeg')",
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
                                            <div key={ii} onClick={() => setModalIdx(getGlobalIdx(ci, ii))} style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer', flexShrink: 0, border: '1px solid #e4e8e2' }}>
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
            {modalIdx !== null && (
                <div onClick={() => setModalIdx(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(5, 20, 10, 0.95)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <img src={allImages[modalIdx].img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}