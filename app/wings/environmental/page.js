"use client"
import React, { useState, useRef } from 'react';

const categories = [
    {
        title: "Plantation & Afforestation Drives",
        description: "Massive plantation movements establishing native tree clusters and biodiversity zones.",
        images: [
            { img: "/events/session/2025-26/Environmental/tree plantation/IMG_1237 (1) copy.JPG" },
            { img: "/events/session/2025-26/Environmental/tree plantation/IMG_1257 copy.JPG" },
            { img: "/events/session/2025-26/Environmental/tree plantation/IMG_1215.JPG" },
            { img: "/events/session/2025-26/Environmental/tree plantation/IMG_1244 copy.JPG" },
            { img: "/events/session/2025-26/Environmental/tree plantation/IMG_1281 copy.JPG" },
            { img: "/events/session/2025-26/Environmental/tree plantation/IMG_1240 copy.JPG" },
        ]
    },
    {
        title: "Waste Management & Clean-up Drives",
        description: "Anti-plastic campaigns and campus sanitization sweeps.",
        images: [
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG-20260328-WA0055 copy.jpg" },
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG-20260328-WA0058 copy.jpg" },
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG-20260328-WA0079 (1).jpg" },
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG-20260328-WA0067 copy.jpg" },
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG-20260328-WA0092.jpg" },
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG-20260328-WA0065.jpg" },
            { img: "/events/session/2025-26/Environmental/cleaniness/IMG_20250927_223545.jpg" },
        ]
    },
    {
        title: "Climate Change Awareness and Quiz",
        description: "Spreading smart power usage awareness and sustainability education.",
        images: [
            { img: "/events/session/2025-26/Environmental/climate awareness/IMG20251019174404 (2) copy.jpg" },
            { img: "/events/session/2025-26/Environmental/climate awareness/IMG20251016194351 (2) copy.jpg" },
            { img: "/events/session/2025-26/Environmental/climate awareness/IMG20251019173630.jpg" },
            { img: "/events/session/2025-26/Environmental/climate awareness/IMG20251019172330 (2).jpg" },
            { img: "/events/session/2025-26/Environmental/climate awareness/IMG20251016194455.jpg" },
            { img: "/events/session/2025-26/Environmental/climate awareness/IMG20251013202918 copy.jpg" },
        ]
    }
];

const allImages = categories.flatMap(cat => cat.images);

export default function EnvironmentalWing() {
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
            {/* Header */}
            <div className="flex flex-row items-center justify-center gap-4 px-6 py-4 bg-[#0b1a10] min-h-[220px]">
                <div className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden flex-shrink-0"> 
                    <img 
                        src="/wings_logo/WhatsApp Image 2026-07-08 at 11.57.40.jpeg" 
                        alt="Environmental Wing Logo" 
                        className="h-full w-full object-cover" 
                    />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#90EE90]">
                        Environmental <span className="font-black">Wing</span>
                    </h1>
                    <p className="text-white/80">
                        Driving active grassroots sustainability and ecological transformations.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div style={{
                backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 11.57.40.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.7)', zIndex: 0 }} />

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
                                                onClick={() => setModalIdx(getGlobalIdx(ci, ii))} 
                                                style={{ 
                                                    borderRadius: 10, 
                                                    overflow: 'hidden', 
                                                    aspectRatio: '4/3', 
                                                    cursor: 'pointer', 
                                                    flexShrink: 0, 
                                                    border: '5px solid #006400' 
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
            {modalIdx !== null && (
                <div onClick={() => setModalIdx(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(5, 20, 10, 0.95)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <img src={allImages[modalIdx].img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}