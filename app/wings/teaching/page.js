"use client"
import React, { useState, useRef } from 'react';

const categories = [
    {
        title: "Academic Support & Subject Mentorship",
        description: "Student volunteers conducting structured weekend classes at regional government schools, simplifying core Mathematics, Science, and language curricula.",
        images: [
            { img: "/events/session/2025-26/teaching/Screenshot 2026-06-27 at 2.58.28 AM copy.png" },
            { img: "/events/session/2025-26/teaching/IMG_1720 (1) copy.JPG" },
            { img: "/events/session/2025-26/teaching/IMG20260411102755 copy.jpg" },
                 {img:"/events/session/2025-26/teaching/IMG_1731 (1) copy.JPG"},
            { img: "/events/session/2025-26/teaching/Screenshot 2026-06-27 at 2.57.58 AM.png" },
            { img: "/events/session/2025-26/teaching/Screenshot 2026-06-27 at 2.58.43 AM copy.png" },
            { img: "/events/session/2025-26/teaching/Screenshot 2026-06-27 at 2.58.53 AM copy.png" },
            {img:"/events/session/2025-26/teaching/Screenshot 2026-06-27 at 2.57.44 AM.png"},
            {img:"/events/session/2025-26/teaching/IMG_1730 copy.JPG"},
            {img:"/events/session/2025-26/teaching/Screenshot 2026-06-27 at 3.09.05 AM copy 2.png"},
            {img:"/events/session/2025-26/teaching/Screenshot 2026-06-27 at 3.09.21 AM copy 2.png"},
            {img:"/events/session/2025-26/teaching/Screenshot 2026-06-27 at 3.09.33 AM copy 2.png"},
        ]
    }
];

const stats = [
    { label: "Students Mentored", value: "400+" },
    { label: "Schools Covered", value: "15+" },
    { label: "Volunteer Hours", value: "1,500+" },
];

export default function TeachingWing() {
    const [selected, setSelected] = useState(null);
    const scrollRefs = useRef([]);
    const allImages = categories.flatMap(cat => cat.images);

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0b1a10', fontFamily: "'Inter', sans-serif" }}>
            
            {/* Header Section */}
            <div className="flex flex-row items-center justify-center gap-6 px-6 py-8 bg-[#000023]">
                <div className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFD700]"> 
                    <img src="/wings_logo/WhatsApp Image 2026-07-08 at 14.10.36.jpeg" alt="Teaching Wing Logo" className="h-full w-full object-cover" />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#FFD700]">TEACHING <span className="font-black text-white">Wing</span></h1>
                    <p className="text-white/80">Driving active grassroots education and mentorship initiatives.</p>
                </div>
            </div>

            <div style={{ backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 14.10.36.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.94)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '3rem 0' }}>
                    {/* Mission Quote */}
                    <div style={{ maxWidth: 800, margin: '0 auto 3rem', textAlign: 'center', padding: '0 2rem' }}>
                        <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#000023', borderLeft: '5px solid #FFD700', paddingLeft: '20px', margin: 0 }}>
                            "Education is the most powerful weapon which you can use to change the world. By bridging the knowledge gap, we empower the next generation to dream bigger and reach higher."
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
                                            <div key={ii} onClick={() => setSelected(item)} style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer', flexShrink: 0, width: '300px', border: '7px solid #000080' }}>
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
            {selected && (
                <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.5rem', cursor: 'pointer', zIndex: 1000 }}>×</button>
                    <img src={selected.img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}