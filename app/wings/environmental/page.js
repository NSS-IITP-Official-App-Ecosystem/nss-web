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

const stats = [
    { label: "Trees Planted", value: "1,200+" },
    { label: "Clean-up Drives", value: "45+" },
    { label: "Students Educated", value: "800+" },
];

export default function EnvironmentalWing() {
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
            <div className="flex flex-row items-center justify-center gap-6 px-6 py-8 bg-[#0b1a10]">
                <div className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#90EE90]"> 
                    <img src="/wings_logo/WhatsApp Image 2026-07-08 at 11.57.40.jpeg" alt="Environmental Wing Logo" className="h-full w-full object-cover" />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#90EE90]">ENVIRONMENTAL <span className="font-black text-white">Wing</span></h1>
                    <p className="text-white/80">Driving active grassroots sustainability and ecological transformations.</p>
                </div>
            </div>

            <div style={{ backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 11.57.40.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.94)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '3rem 0' }}>
                    {/* Mission Quote */}
                    <div style={{ maxWidth: 800, margin: '0 auto 3rem', textAlign: 'center', padding: '0 2rem' }}>
                        <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#006400', borderLeft: '5px solid #90EE90', paddingLeft: '20px', margin: 0 }}>
                            "The environment is where we all meet; where all have a mutual interest; it is the one thing all of us share. Together, we sow the seeds for a greener, more sustainable tomorrow."
                        </blockquote>
                    </div>

                    {/* Impact Metrics */}
                    <div style={{ maxWidth: 1000, margin: '0 auto 3rem', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        {stats.map((stat, i) => (
                            <div key={i} style={{ background: '#006400', color: '#ffffff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
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
                                            <div key={ii} onClick={() => setModalIdx(allImages.indexOf(item))} style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer', flexShrink: 0, width: '300px', border: '7px solid #006400' }}>
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

            {/* Modal */}
            {modalIdx !== null && (
                <div onClick={() => setModalIdx(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <button onClick={() => setModalIdx(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.5rem', cursor: 'pointer', zIndex: 1000 }}>×</button>
                    <img src={allImages[modalIdx].img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}