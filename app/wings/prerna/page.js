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

const stats = [
    { label: "Blood Donations", value: "350+" },
    { label: "Locations Covered", value: "25+" },
    { label: "Active Volunteers", value: "120+" },
];

export default function ChetnaWing() {
    const [modalIdx, setModalIdx] = useState(null);
    const scrollRefs = useRef([]);
    const allImages = categories.flatMap(cat => cat.images);

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0b1a10', fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <div className="flex flex-row items-center justify-center gap-6 px-6 py-8 bg-[#000023]">
                <div className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFD700]"> 
                    <img src="/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41.jpeg" alt="Prerna Wing Logo" className="h-full w-full object-cover" />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#FFD700]">PRERNA <span className="font-black text-white">Wing</span></h1>
                    <p className="text-white/80">Empowering communities through health, awareness, and social advocacy.</p>
                </div>
            </div>

            <div style={{ backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.94)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '3rem 0' }}>
                    {/* Mission Quote Section */}
                    <div style={{ maxWidth: 800, margin: '0 auto 3rem', textAlign: 'center', padding: '0 2rem' }}>
                        <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#000023', borderLeft: '5px solid #FFD700', paddingLeft: '20px', margin: 0 }}>
                            "Small acts of kindness, when multiplied by hundreds of volunteers, can transform the fabric of society. At Prerna, we strive to be the bridge between resources and those who need them most."
                        </blockquote>
                    </div>

                    {/* Impact Metrics */}
                    <div style={{ maxWidth: 1000, margin: '0 auto 3rem', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        {stats.map((stat, i) => (
                            <div key={i} style={{ background: '#000023', color: '#FFD700', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900 }}>{stat.value}</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Gallery Section */}
                    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
                        {categories.map((cat, ci) => (
                            <div key={ci} style={{ marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#000000' }}>{cat.title}</h2>
                                <p style={{ fontSize: '1rem', color: '#333', marginBottom: '1rem' }}>{cat.description}</p>
                                <div style={{ position: 'relative' }}>
                                    <button onClick={() => scrollByAmount(ci, -1)} style={{ position: 'absolute', left: -14, top: '40%', zIndex: 10, width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}>◀</button>
                                    <div ref={(el) => (scrollRefs.current[ci] = el)} style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', scrollBehavior: 'smooth' }}>
                                        {cat.images.map((item, ii) => (
                                            <div key={ii} onClick={() => setModalIdx(allImages.indexOf(item))} style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer', flexShrink: 0, width: '300px', border: '7px solid #000080' }}>
                                                <img src={item.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => scrollByAmount(ci, 1)} style={{ position: 'absolute', right: -14, top: '40%', zIndex: 10, width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}>▶</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal with Close Button */}
            {modalIdx !== null && (
                <div onClick={() => setModalIdx(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <button onClick={() => setModalIdx(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.5rem', cursor: 'pointer', zIndex: 1000 }}>×</button>
                    <img src={allImages[modalIdx].img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}