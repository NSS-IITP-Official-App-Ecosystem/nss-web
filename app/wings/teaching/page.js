"use client"
import React, { useState, useRef } from 'react';

const categories = [
    {
        title: "Academic Support & Subject Mentorship",
        description: "Student volunteers conducting structured weekend classes at regional government schools, simplifying core Mathematics, Science, and language curricula.",
        images:[
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
    { num: "1,200+", label: "Students Taught" },
    { num: "8+", label: "Adopted Schools" },
    { num: "150+", label: "Active Student Mentors" },
    { num: "10k+", label: "Teaching Hours" },
];

export default function TeachingWing() {
    const [selected, setSelected] = useState(null);
    const scrollRefs = useRef([]);

    const scrollByAmount = (ci, dir) => {
        const el = scrollRefs.current[ci];
        if (!el) return;
        const cardWidth = el.clientWidth / 3;
        el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-slate-900 font-sans pb-32 bg-slate-50/50 selection:bg-amber-400/30">
            <div className="w-full h-1.5 bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />
  <div style={{
                background: '#000023', color: '#90EE90', padding: '3rem 1.5rem 4rem',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
                clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: '#FFD700' }}>
                    TEACHING <span style={{ fontWeight: 900, color: '#FFD700' }}>Wing</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto' }}>
                    Driving active grassroots education and mentorship initiatives across regional government schools.
                </p>
            </div>
           

            {/* Gallery Section */}
            <div className="max-w-6xl mx-auto px-4 mt-24">
                {categories.map((cat, ci) => (
                    <div key={ci} style={{ marginBottom: '3rem' }}>
                        <div className="mb-8 max-w-3xl">
                            <h2 className="text-2xl font-black text-slate-900 mb-2">{cat.title}</h2>
                            <p className="text-sm text-slate-500">{cat.description}</p>
                        </div>

                        <div style={{ position: 'relative' }}>
                            {/* Left Button */}
                            <button onClick={() => scrollByAmount(ci, -1)} className="absolute left-[-14px] top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:bg-slate-50 text-slate-900">ᐸ</button>

                            {/* Carousel Grid */}
                            <div 
                                ref={(el) => (scrollRefs.current[ci] = el)}
                                className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
                                style={{ scrollbarWidth: 'none' }}
                            >
                                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                                {cat.images.map((item, ii) => (
                                    <div key={ii} onClick={() => setSelected(item)} className="min-w-[30%] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-slate-200 hover:scale-[1.02] transition-transform">
                                        <img src={item.img} alt={cat.title} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Right Button */}
                            <button onClick={() => scrollByAmount(ci, 1)} className="absolute right-[-14px] top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:bg-slate-50 text-slate-900">ᐳ</button>
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