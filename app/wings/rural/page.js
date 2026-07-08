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

const stats = [
    { label: "Villages Reached", value: "30+" },
    { label: "Awareness Camps", value: "50+" },
    { label: "Families Supported", value: "500+" },
];

export default function RuralDevelopment() {
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
                    <img src="/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41 (1).jpeg" alt="Rural Wing Logo" className="h-full w-full object-cover" />
                </div>
                <div className="text-left">
                    <h1 className="text-5xl font-black text-[#FFD700]">RURAL <span className="font-black text-white">Wing</span></h1>
                    <p className="text-white/80">Driving sustainable rural development through education and empowerment.</p>
                </div>
            </div>

            <div style={{ backgroundImage: "url('/wings_logo/WhatsApp Image 2026-07-08 at 11.57.41 (1).jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.94)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '3rem 0' }}>
                    {/* Mission Quote */}
                    <div style={{ maxWidth: 800, margin: '0 auto 3rem', textAlign: 'center', padding: '0 2rem' }}>
                        <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#000023', borderLeft: '5px solid #FFD700', paddingLeft: '20px', margin: 0 }}>
                            "Development is not just infrastructure; it is the empowerment of the last person in the village. We work to bridge the urban-rural divide through knowledge, compassion, and consistent action."
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
                <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.5rem', cursor: 'pointer', zIndex: 1000 }}>×</button>
                    <img src={selected.img} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}