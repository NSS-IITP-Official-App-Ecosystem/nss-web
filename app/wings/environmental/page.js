"use client"
import React, { useState, useEffect, useCallback } from 'react';

const categories = [
    {
        title: "Plantation & Afforestation Drives",
        description: "Massive plantation movements establishing native tree clusters, urban green belts, and biodiversity zones both inside the campus and across rural sectors.",
        images: [
            { img: "/Environmental/tree plantation/IMG_1237 (1) copy.JPG" },
            { img: "/Environmental/tree plantation/IMG_1257 copy.JPG" },
            { img: "/Environmental/tree plantation/IMG_1215.JPG" },
            { img: "/Environmental/tree plantation/IMG_1244 copy.JPG" },
            { img: "/Environmental/tree plantation/IMG_1281 copy.JPG" },
            { img: "/Environmental/tree plantation/IMG_1240 copy.JPG" },
        ]
    },
    {
        title: "Waste Management & Clean-up Drives",
        description: "Anti-plastic campaigns, rigorous campus sanitization sweeps, and ground-level clean-up operations to eliminate micro-plastic trash pockets.",
        images: [
            { img: "/Environmental/cleaniness/IMG-20260328-WA0055 copy.jpg" },
            { img: "/Environmental/cleaniness/IMG-20260328-WA0058 copy.jpg" },
            { img: "/Environmental/cleaniness/IMG-20260328-WA0079 (1).jpg" },
            { img: "/Environmental/cleaniness/IMG-20260328-WA0067 copy.jpg" },
            { img: "/Environmental/cleaniness/IMG-20260328-WA0092.jpg" },
            { img: "/Environmental/cleaniness/IMG-20260328-WA0065.jpg" },
        ]
    },
    {
        title: "Climate Change Awareness and Quiz",
        description: "Spreading smart power usage awareness through community solar educational circles and high-energy open-air street performance theater.",
        images: [
            { img: "/Environmental/climate awareness/IMG20251019174404 (2) copy.jpg" },
            { img: "/Environmental/climate awareness/IMG20251016194351 (2) copy.jpg" },
            { img: "/Environmental/climate awareness/IMG20251019173630.jpg" },
            { img: "/Environmental/climate awareness/IMG20251019172330 (2).jpg" },
            { img: "/Environmental/climate awareness/IMG20251016194455.jpg" },
            { img: "/Environmental/climate awareness/IMG20251013202918 copy.jpg" },
        ]
    }
];

const stats = [
    { num: "2,500+", label: "Saplings Planted" },
    { num: "15+", label: "Clean-up Drives" },
    { num: "400+", label: "Active Eco-Workers" },
    { num: "On & Off", label: "Campus Impact" },
];

// Flatten all images with their category index for modal navigation
const allImages = categories.flatMap((cat, ci) =>
    cat.images.map((img, ii) => ({ ...img, catIndex: ci, imgIndex: ii }))
);

export default function EnvironmentalWing() {
    const [modalIdx, setModalIdx] = useState(null); // index into allImages

    const openModal = useCallback((globalIdx) => setModalIdx(globalIdx), []);
    const closeModal = useCallback(() => setModalIdx(null), []);

    const navModal = useCallback((dir) => {
        setModalIdx(prev =>
            prev === null ? null : (prev + dir + allImages.length) % allImages.length
        );
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (modalIdx === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navModal(-1);
            if (e.key === 'ArrowRight') navModal(1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [modalIdx, closeModal, navModal]);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = modalIdx !== null ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [modalIdx]);

    // Compute the global index for a given category + image index
    let runningIdx = 0;
    const catStartIdx = categories.map(cat => {
        const start = runningIdx;
        runningIdx += cat.images.length;
        return start;
    });

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9f6', color: '#1a1f1a', fontFamily: "'Inter', sans-serif" }}>

            {/* India tricolor top bar */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #ffffff 33.33% 66.66%, #138808 66.66%)' }} />

            {/* ── Hero ── */}
            <div style={{
                background: '#0b1a10',
                color: '#fff',
                padding: '5rem 1.5rem 7.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
            }}>
                {/* Soft green radial glow */}
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 700, height: 320,
                    background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.14) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Pill badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '5px 16px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.11em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                    marginBottom: '1.75rem',
                }}>
                    <span style={{
                        width: 7, height: 7, borderRadius: '50%', background: '#34d399',
                        animation: 'envPulse 2s infinite',
                    }} />
                    Official Wing Portal
                </div>

                <style>{`
                    @keyframes envPulse { 0%,100%{opacity:1} 50%{opacity:.35} }
                    @media (max-width: 768px) {
                        .env-hero-title { font-size: 2.6rem !important; }
                        .env-stat-strip { grid-template-columns: repeat(2,1fr) !important; }
                        .env-img-grid { grid-template-columns: repeat(2,1fr) !important; }
                        .env-modal-nav-prev { left: -10px !important; }
                        .env-modal-nav-next { right: -10px !important; }
                    }
                    @media (max-width: 480px) {
                        .env-img-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>

                <h1 className="env-hero-title" style={{
                    fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
                    fontWeight: 900, letterSpacing: '-0.03em',
                    lineHeight: 1.04, marginBottom: '1.1rem',
                    position: 'relative', zIndex: 1,
                }}>
                    Environmental{' '}
                    <span style={{
                        fontWeight: 300, fontStyle: 'italic',
                        background: 'linear-gradient(90deg, #6ee7b7, #a7f3d0, #6ee7b7)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Wing
                    </span>
                </h1>

                <p style={{
                    color: 'rgba(255,255,255,0.58)', fontSize: 'clamp(0.88rem, 2vw, 1.05rem)',
                    maxWidth: 520, margin: '0 auto', lineHeight: 1.8,
                    position: 'relative', zIndex: 1,
                }}>
                    Driving active grassroots sustainability, ecological transformations,
                    and clean energy modeling within the institution and beyond.
                </p>
            </div>

            {/* ── Stat strip — overlaps hero ── */}
            <div style={{ padding: '0 1.5rem' }}>
                <div className="env-stat-strip" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    maxWidth: 780, margin: '-2.8rem auto 0',
                    background: '#fff',
                    border: '1px solid #e4e8e2',
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
                    position: 'relative', zIndex: 10,
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            padding: '1.4rem 1rem', textAlign: 'center',
                            borderRight: i < stats.length - 1 ? '1px solid #e4e8e2' : 'none',
                        }}>
                            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0b1a10', letterSpacing: '-0.02em' }}>{s.num}</div>
                            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8a9988', marginTop: 5 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── About card ── */}
            <div style={{ maxWidth: 800, margin: '4rem auto 0', padding: '0 1.5rem' }}>
                <div style={{
                    background: '#fff',
                    border: '1px solid #e4e8e2',
                    borderLeft: '4px solid #059669',
                    borderRadius: 12,
                    padding: '1.5rem 1.75rem',
                }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#059669', marginBottom: '0.6rem' }}>
                        Our Purpose & Impact
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#4a5549', lineHeight: 1.8 }}>
                        The Environmental Wing of NSS IIT Patna works relentlessly to bring sustainability to the grassroots level.
                        Through organized drives spanning across the campus premises and surrounding adopted villages, our volunteers
                        drive active tree-planting campaigns, combat micro-plastic contamination, and implement resource-conservation
                        models to turn modern green concepts into practical field realities.
                    </p>
                </div>
            </div>

            {/* ── Quote ── */}
            <div style={{ maxWidth: 720, margin: '2rem auto 0', padding: '0 1.5rem' }}>
                <div style={{
                    background: '#fff',
                    border: '1px solid #e4e8e2',
                    borderRadius: 12,
                    padding: '1.75rem 2.25rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <span style={{
                        position: 'absolute', top: '0.8rem', left: '1.2rem',
                        fontSize: '5.5rem', lineHeight: 1, color: '#e8f0e7',
                        fontFamily: 'Georgia, serif', pointerEvents: 'none', userSelect: 'none',
                    }}>"</span>
                    <p style={{ fontSize: '0.97rem', fontStyle: 'italic', color: '#4a5549', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
                        "Nature does not hurry, yet everything is accomplished. Protecting our environment is not
                        an extra-curricular option — it is our fundamental prerequisite for survival."
                    </p>
                </div>
            </div>

            {/* ── Photo galleries ── */}
            <div style={{ maxWidth: 1200, margin: '4.5rem auto 0', padding: '0 1.5rem 5rem' }}>
                {categories.map((cat, ci) => (
                    <div key={ci}>
                        {ci > 0 && (
                            <hr style={{ border: 'none', borderTop: '1px solid #e4e8e2', margin: '3.5rem 0' }} />
                        )}

                        {/* Section header */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0b1a10', letterSpacing: '-0.01em' }}>
                                    {cat.title}
                                </h2>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: '0.08em', padding: '3px 11px', borderRadius: 99,
                                    background: 'rgba(5,150,105,0.10)', color: '#047857',
                                }}>
                                    {cat.images.length} snaps
                                </span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#8a9988', lineHeight: 1.65, maxWidth: 560 }}>
                                {cat.description}
                            </p>
                        </div>

                        {/* Image grid — Restored to 3 columns grid layout */}
                        <div className="env-img-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 16,
                        }}>
                            {cat.images.map((item, ii) => {
                                const globalIdx = catStartIdx[ci] + ii;
                                return (
                                    <div
                                        key={ii}
                                        onClick={() => openModal(globalIdx)}
                                        style={{
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            background: '#d1d9cf',
                                            aspectRatio: '4/3',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            border: '1px solid #e4e8e2',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.querySelector('.env-overlay').style.opacity = '1';
                                            e.currentTarget.querySelector('img').style.transform = 'scale(1.03)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.querySelector('.env-overlay').style.opacity = '0';
                                            e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                                        }}
                                    >
                                        <img
                                            src={item.img}
                                            alt={`${cat.title} photo ${ii + 1}`}
                                            loading="lazy"
                                            style={{
                                                width: '100%', height: '100%',
                                                objectFit: 'cover', display: 'block',
                                                transition: 'transform 0.5s ease',
                                            }}
                                        />
                                        {/* Hover overlay */}
                                        <div className="env-overlay" style={{
                                            position: 'absolute', inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                                            opacity: 0, transition: 'opacity 0.3s',
                                            display: 'flex', alignItems: 'flex-end', padding: '14px 16px',
                                        }}>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}>
                                                Photo {ii + 1} / {cat.images.length}
                                            </span>
                                            {/* Expand icon */}
                                            <div style={{
                                                marginLeft: 'auto',
                                                width: 32, height: 32, borderRadius: '50%',
                                                background: 'rgba(255,255,255,0.15)',
                                                border: '1px solid rgba(255,255,255,0.25)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth={2.5} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Modal ── */}
            {modalIdx !== null && (
                <div
                    onClick={closeModal}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(5, 20, 10, 0.92)',
                        zIndex: 999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '2rem 3.5rem',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{ position: 'relative', maxWidth: 1140, width: '100%' }}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute', top: '-3rem', right: 0,
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                color: 'rgba(255,255,255,0.82)',
                                fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                                letterSpacing: '0.1em', padding: '6px 16px', borderRadius: 99,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                            }}
                        >
                            Close ✕
                        </button>

                        {/* Prev */}
                        <button
                            className="env-modal-nav-prev"
                            onClick={() => navModal(-1)}
                            style={{
                                position: 'absolute', top: '50%', left: -56,
                                transform: 'translateY(-50%)',
                                width: 44, height: 44, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff', fontSize: 24, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                paddingBottom: 4
                            }}
                        >‹</button>

                        {/* Image Container */}
                        <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            maxHeight: '85vh',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                        }}>
                            <img
                                src={allImages[modalIdx]?.img}
                                alt="Expanded view"
                                style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
                            />
                        </div>

                        {/* Counter */}
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                            {modalIdx + 1} / {allImages.length}
                        </div>

                        {/* Next */}
                        <button
                            className="env-modal-nav-next"
                            onClick={() => navModal(1)}
                            style={{
                                position: 'absolute', top: '50%', right: -56,
                                transform: 'translateY(-50%)',
                                width: 44, height: 44, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff', fontSize: 24, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                paddingBottom: 4
                            }}
                        >›</button>
                    </div>
                </div>
            )}
        </div>
    );
}