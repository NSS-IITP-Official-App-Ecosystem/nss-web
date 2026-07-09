"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImageUrl } from '@/utils/imageUrl';
import {
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
    FaQuoteLeft,
    FaUsers,
    FaAward,
    FaCalendarAlt,
    FaHeartbeat,
    FaHandshake,
    FaInfoCircle,
    FaLeaf,
    FaGraduationCap,
    FaArrowLeft
} from 'react-icons/fa';
import * as Icons from 'react-icons/pi';
import AnimatedCounter from '@/components/AnimatedCounter';
import EmblaCarousel from '@/components/EmblaCarousel';
import Testimonial, { TestimonialItem } from '@/components/testimonial';
import { cn } from '@/components/utils';

const EMBLA_OPTIONS = { loop: true };

// Custom Phosphor Icon renderer matching database values
const DynamicIcon = ({ name, className }) => {
    const Icon = Icons[name];
    return Icon ? <Icon className={className} /> : <Icons.PiInfo className={className} />;
};

export default function HomeClient({
    sliderData = {},
    unitsData = [],
    eventsData = [],
    testimonialsData = [],
    impactsData = [],
    collaboratorsData = []
}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [slideForwarded, setSlideForwarded] = useState(true);

    // Auto-scroll slider interval (matches 6.5s progress line)
    useEffect(() => {
        const timer = setInterval(() => {
            setSlideForwarded(true);
            setActiveSlide(prev => (prev + 1) % sliderData.items.length);
        }, 6500);
        return () => clearInterval(timer);
    }, [sliderData.items.length]);

    const handleNextSlide = () => {
        setSlideForwarded(true);
        setActiveSlide(prev => (prev + 1) % sliderData.items.length);
    };

    const handlePrevSlide = () => {
        setSlideForwarded(false);
        setActiveSlide(prev => (prev === 0 ? sliderData.items.length - 1 : prev - 1));
    };

    // Parallax Slide Animation Variants
    const slideVariants = {
        incoming: (forwarded) => ({
            x: forwarded ? '100%' : '-100%',
            opacity: 0,
            scale: 1.02,
        }),
        active: {
            x: '0%',
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 220, damping: 28 }
        },
        exiting: (forwarded) => ({
            x: forwarded ? '-30%' : '30%',
            opacity: 0,
            scale: 0.98,
            transition: { type: "spring", stiffness: 220, damping: 28 }
        })
    };

    // Floating animation configuration for floating icons in About Section
    const floatTransition = (delay = 0) => ({
        y: [0, -12, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }
    });

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-20 overflow-x-hidden">

            {/* 1. HERO SLIDER SECTION WITH DETAILED PARALLAX & PROGRESS LINES */}
            <section className="relative w-full overflow-hidden bg-[#020914]" style={{ height: '620px' }}>
                <AnimatePresence initial={false} custom={slideForwarded}>
                    {sliderData.items.map((item, i) => {
                        if (activeSlide !== i) return null;

                        return (
                            <motion.div
                                key={i}
                                custom={slideForwarded}
                                variants={slideVariants}
                                initial="incoming"
                                animate="active"
                                exit="exiting"
                                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                            >
                                {/* Zooming Slide Image */}
                                <motion.div
                                    initial={{ scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 6.5, ease: "easeOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        src={resolveImageUrl(item.url, "/home_slider/nss_home.jpg")}
                                        alt="Hero slide image"
                                        fill
                                        priority={i === 0}
                                        className={cn("object-cover block w-full h-full", item.content ? "brightness-[0.38]" : "brightness-100")}
                                    />
                                </motion.div>

                                {/* Staggered Text Caption Box */}
                                {item.content && (
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                            <motion.div
                                                initial="hidden"
                                                animate="show"
                                                variants={{
                                                    show: { transition: { staggerChildren: 0.12 } }
                                                }}
                                                className="max-w-xl border rounded-[2.5rem] p-8 sm:p-12 text-left shadow-2xl space-y-4"
                                            >
                                                {item.content.update_text && (
                                                    <motion.span
                                                        variants={{
                                                            hidden: { opacity: 0, y: 15 },
                                                            show: { opacity: 1, y: 0 }
                                                        }}
                                                        className="inline-block px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-400 font-extrabold text-xs uppercase tracking-widest font-mono shadow-xs"
                                                    >
                                                        {item.content.update_text}
                                                    </motion.span>
                                                )}

                                                <motion.h3
                                                    variants={{
                                                        hidden: { opacity: 0, y: 20 },
                                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
                                                    }}
                                                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase font-sans tracking-tight"
                                                >
                                                    {item.content.title}
                                                </motion.h3>

                                                {item.content.action && (
                                                    <motion.div
                                                        variants={{
                                                            hidden: { opacity: 0, y: 15 },
                                                            show: { opacity: 1, y: 0 }
                                                        }}
                                                        className="pt-4"
                                                    >
                                                        <Link href={item.content.action.link}>
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-md cursor-pointer text-sm font-sans flex items-center gap-2 group"
                                                            >
                                                                {item.content.action.text}
                                                                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                                            </motion.button>
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Bottom Progress Lines Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-40">
                    {sliderData.items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setSlideForwarded(i > activeSlide);
                                setActiveSlide(i);
                            }}
                            className="w-16 h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            {activeSlide === i && (
                                <motion.div
                                    key={activeSlide}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 6.5, ease: "linear" }}
                                    className="h-full bg-amber-400 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Slide Nav Controls with custom glass hover effects */}
                <button
                    onClick={handlePrevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-400 rounded-full z-40 transition-all cursor-pointer backdrop-blur-md hover:scale-105"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={handleNextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-400 rounded-full z-40 transition-all cursor-pointer backdrop-blur-md hover:scale-105"
                    aria-label="Next slide"
                >
                    <FaChevronRight />
                </button>
            </section>

            {/* 2. ABOUT NSS SECTION WITH FLOATING ICONS & DEVICE VIDEO FRAME */}
            <section className="py-24 relative overflow-hidden bg-white border-b border-slate-200/60">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* Text Left Column */}
                        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-100 bg-amber-50/50 text-amber-600 font-extrabold text-xs uppercase tracking-widest font-mono">
                                <FaAward /> Service Above Self
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight font-sans">
                                We Are <span className="text-brand-blue font-sans">NSS</span> <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent font-sans font-black">IIT Patna!</span>
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed font-light">
                                The National Service Scheme at IIT Patna is a vibrant student-run cell dedicated to driving community development and positive societal changes. Led by administrative advisors, core secretary panels, and active student volunteers, we apply technological ingenuity and empathetic outreach to bridge social gaps in our local community.
                            </p>

                            {/* Detailed Pillars Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center text-base flex-shrink-0">
                                        <FaUsers />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-extrabold text-slate-800 block text-base leading-none">120+</span>
                                        <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">Volunteers</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base flex-shrink-0">
                                        <FaAward />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-extrabold text-slate-800 block text-base leading-none">6 Cells</span>
                                        <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">Service Wings</span>
                                    </div>
                                </div>
                            </div>

                            {/* Beautiful Motto Card */}
                            <div className="relative overflow-hidden p-6 rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50/60 to-orange-50/30 shadow-md shadow-amber-500/5 hover:shadow-xl hover:border-amber-200 transition-all duration-300 group hover:-translate-y-1">
                                {/* Decorative Quote Watermark */}
                                <div className="absolute right-4 bottom-0 translate-y-6 opacity-[0.04] text-slate-900 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                                    <FaQuoteLeft className="text-9xl" />
                                </div>
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-lg shadow-amber-500/30 group-hover:rotate-3 transition-transform">
                                        <FaQuoteLeft />
                                    </div>
                                    <div className="text-left space-y-1.5">
                                        <span className="text-[10px] text-amber-600 font-mono font-extrabold uppercase tracking-widest block">
                                            The NSS Motto
                                        </span>
                                        <h4 className="text-xl font-black text-slate-800 leading-tight">
                                            Not Me But You
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed font-light">
                                            This reflects the essence of democratic living and upholds the need for selfless service. It underlines the belief that the welfare of an individual is ultimately dependent on the welfare of the society as a whole.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video Right Column - Mock Tablet with Floating Elements */}
                        <div className="lg:col-span-6 flex justify-center w-full relative">
                            {/* Background glowing gradients */}
                            <div className="absolute inset-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -top-10 -left-10 pointer-events-none" />

                            {/* Floating icons */}
                            <motion.div animate={floatTransition(0)} className="absolute -top-6 -right-4 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-md text-blue-500 flex items-center justify-center text-lg z-20">
                                <FaHandshake />
                            </motion.div>
                            <motion.div animate={floatTransition(1.5)} className="absolute -bottom-6 -left-4 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-md text-emerald-500 flex items-center justify-center text-lg z-20">
                                <FaLeaf />
                            </motion.div>
                            <motion.div animate={floatTransition(3)} className="absolute top-1/2 -left-8 w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm text-indigo-500 flex items-center justify-center text-base z-20">
                                <FaGraduationCap />
                            </motion.div>
                            <motion.div animate={floatTransition(0.7)} className="absolute -bottom-4 right-8 w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-md text-rose-500 flex items-center justify-center text-base z-20">
                                <FaHeartbeat />
                            </motion.div>

                            {/* Main tablet wrapper */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="relative w-full max-w-lg p-3 rounded-[2.2rem] bg-slate-900 shadow-2xl border border-slate-200/10 overflow-hidden"
                            >
                                <div className="relative aspect-video w-full rounded-[1.6rem] overflow-hidden bg-black">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/EngW7tLk6R8"
                                        title="NSS IIT Patna Promotional Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. "OUR UNITS" SECTION WITH 3D SPRING TILT & DYNAMIC SHADOWS */}
            <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in" id="units">
                <div className="text-center mb-16 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">Core Structuring</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 font-sans tracking-tight">NSS Volunteers Units</h2>
                    <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                        Volunteers are organized into three dedicated administrative units, coordinating distinct cells and wings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
                    {unitsData.map((item, i) => {
                        // Color theme mappings
                        const borderColors = [
                            "hover:border-blue-400/40 hover:shadow-blue-500/8",
                            "hover:border-emerald-400/40 hover:shadow-emerald-500/8",
                            "hover:border-amber-400/40 hover:shadow-amber-500/8"
                        ];

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03
                                }}
                                className={cn(
                                    "bg-white border border-slate-200/80 rounded-[2.2rem] overflow-hidden p-3.5 shadow-sm w-full max-w-sm flex flex-col justify-between transition-all duration-300",
                                    borderColors[i % 3]
                                )}
                            >
                                <div>
                                    {/* Thumbnail containing zoom loop */}
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 mb-4 shadow-inner group">
                                        <Image
                                            src={resolveImageUrl(item.thumbnail, "/units/chetna_final.jpg")}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 300px, 350px"
                                        />
                                    </div>
                                    <div className="px-3">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">Administrative Unit</span>
                                        <h3 className="text-xl font-bold text-slate-800 mt-0.5 leading-tight font-sans">{item.title}</h3>
                                        <p className="text-slate-500 text-xs mt-2 italic font-serif leading-relaxed">
                                            "{item.subTitle}"
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 pt-6">
                                    <Link href={item.action.url}>
                                        <button className="w-full text-center bg-slate-50 hover:bg-brand-blue hover:text-white border border-slate-200/60 font-bold py-3 px-4 rounded-xl cursor-pointer text-xs transition-all flex items-center justify-center gap-2 group">
                                            {item.action.text} <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 4. RECENT EVENTS SECTION WITH GRADIENT TRACK LINE & SLIDE ENTRIES */}
            <section className="py-24 bg-slate-100/50 border-t border-b border-slate-200/60" id="events">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 max-w-xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">NSS Chronicles</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 font-sans tracking-tight">Recent Event Timeline</h2>
                        <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                            A historical track of past community outreach events led by our students.
                        </p>
                    </div>

                    {/* Timeline Path Container */}
                    <div className="relative mt-12 pl-8 sm:pl-0">
                        {/* Gradient Line Path */}
                        <div className="absolute top-0 bottom-0 left-[26px] sm:left-1/2 w-0.5 bg-gradient-to-b from-amber-400 via-indigo-500 to-rose-500 -translate-x-1/2 pointer-events-none" />

                        {eventsData.map((item, i) => {
                            const isOdd = i % 2 !== 0;
                            return (
                                <div key={i} className="relative mb-16 flex flex-col sm:flex-row items-center justify-center w-full">

                                    {/* Left Card Element */}
                                    <div className="w-full sm:w-1/2 flex justify-start sm:justify-end pl-12 sm:pl-0 sm:pr-10">
                                        {!isOdd ? (
                                            <EventTimelineCard item={item} slideFromLeft={true} />
                                        ) : (
                                            <div className="hidden sm:block w-full" />
                                        )}
                                    </div>

                                    {/* Pulsing Concentric Node */}
                                    <div className="absolute left-[26px] sm:left-1/2 w-10 h-10 rounded-full border-4 border-[#FAF9F6] bg-white -translate-x-1/2 z-20 flex items-center justify-center shadow-md">
                                        {/* Outer ping pulse */}
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 absolute animate-ping pointer-events-none" />
                                        <div className="w-4 h-4 rounded-full bg-indigo-600" />
                                    </div>

                                    {/* Right Card Element */}
                                    <div className="w-full sm:w-1/2 flex justify-start pl-12 sm:pl-10">
                                        {isOdd ? (
                                            <EventTimelineCard item={item} slideFromLeft={false} />
                                        ) : (
                                            <div className="hidden sm:block w-full" />
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12 flex flex-row gap-5 justify-center">
                        <Link href="/gallery">
                            <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer text-sm font-sans flex items-center gap-2 mx-auto group">
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> View Event Gallery
                            </button>
                        </Link>
                        <Link href="/events">
                            <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer text-sm font-sans flex items-center gap-2 mx-auto group">
                                View Upcoming Events <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. TESTIMONIALS SECTION WITH CIRCULAR BORDER GLOW */}
            <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials">
                <div className="text-center mb-16 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">Volunteer Echoes</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 font-sans tracking-tight">What Volunteers Say</h2>
                    <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                        Read personal stories from students describing their social service experiences.
                    </p>
                </div>

                <div className="mt-8 max-w-4xl mx-auto relative">
                    {/* Double quote background watermark */}
                    <FaQuoteLeft className="absolute -top-12 -left-10 text-slate-200/40 text-7xl select-none pointer-events-none hidden md:block" />

                    <Testimonial>
                        {testimonialsData.map((item, i) => (
                            <TestimonialItem
                                className="testimonial-slide flex-shrink-0 w-full"
                                key={i}
                                data={{
                                    img: item.img || '/testimonial/person-1.jpg',
                                    text: item.text,
                                    name: item.name,
                                    position: item.position
                                }}
                            />
                        ))}
                    </Testimonial>
                </div>
            </section>

            {/* 6. DYNAMIC STATS CARD GRIDS */}
            <section className="py-24 text-white bg-brand-blue md:w-[92%] mx-auto rounded-[3.2rem] shadow-2xl relative overflow-hidden px-6 sm:px-12" id="impact">
                {/* Glow layout */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.08),_transparent)] pointer-events-none" />

                <div className="text-center mb-20 max-w-xl mx-auto relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">NSS Outcomes</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 font-sans">The Impact We Created</h2>
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                        Statistical facts highlighting our community outreach achievements.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center relative z-10">
                    {impactsData.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between w-full max-w-[250px] aspect-square shadow-lg backdrop-blur-md text-left hover:border-amber-400/30 transition-all duration-300"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 border border-white/5 flex items-center justify-center text-xl shadow-xs">
                                    <DynamicIcon name={item.icon} />
                                </div>
                                <h3 className="text-white font-bold text-base mt-5 leading-tight font-sans">{item.title}</h3>
                                <p className="text-slate-300 text-xs mt-2 leading-relaxed font-light line-clamp-3">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="border-t border-white/10 pt-3 mt-4 text-left">
                                <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight font-mono">
                                    <AnimatedCounter value={parseInt(item.count.replace(/_/g, ''), 10) || 500} />+ <span className="text-[10px] uppercase font-bold text-white tracking-widest ml-0.5">{item.unit}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. COLLABORATORS SECTION */}
            <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="collaborate">
                <div className="text-center mb-10 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">Synergy Network</span>
                    <h2 className="text-3xl font-extrabold text-slate-800 mt-2 font-sans tracking-tight">Partners & Collaborations</h2>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                        Working in partnership with leading NGOs and municipal organizations to extend operations.
                    </p>
                </div>

                <div className="my-8">
                    <EmblaCarousel
                        CarouselElement={CollaborateElement}
                        options={EMBLA_OPTIONS}
                        slides={[...collaboratorsData, ...collaboratorsData]}
                    />
                </div>

                <div className="text-center mt-12">
                    <Link href="/collaborate">
                        <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer text-sm font-sans flex items-center gap-2 mx-auto group">
                            Collaborate With Us <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </section>

            {/* 8. PREMIUM CTA ACTION CARDS */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-slate-200/60 pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* CTA Card 1: Blood Request */}
                <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2.2rem] p-8 text-white shadow-lg flex flex-col justify-between"
                >
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center text-lg mb-6">
                            <FaHeartbeat />
                        </div>
                        <h4 className="font-bold text-white text-xl font-sans tracking-tight">Urgent Blood Request?</h4>
                        <p className="text-rose-100 text-xs mt-2.5 leading-relaxed font-light">
                            Submit requests to connect with active student donors registered across the campus.
                        </p>
                    </div>
                    <div className="pt-8">
                        <Link href="/request-blood">
                            <button className="bg-white hover:bg-rose-50 text-rose-600 font-bold py-3 px-4 rounded-xl text-xs transition-all w-full text-center flex items-center justify-center gap-1.5 cursor-pointer">
                                Request Blood <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* CTA Card 2: Collaborate */}
                <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[2.2rem] p-8 text-white shadow-lg flex flex-col justify-between"
                >
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center text-lg mb-6">
                            <FaHandshake />
                        </div>
                        <h4 className="font-bold text-white text-xl font-sans tracking-tight">Partner With Our Cell</h4>
                        <p className="text-indigo-100 text-xs mt-2.5 leading-relaxed font-light">
                            Propose social welfare camps, environmental campaigns, or digital literacy drives.
                        </p>
                    </div>
                    <div className="pt-8">
                        <Link href="/collaborate">
                            <button className="bg-white hover:bg-indigo-50 text-indigo-700 font-bold py-3 px-4 rounded-xl text-xs transition-all w-full text-center flex items-center justify-center gap-1.5 cursor-pointer">
                                Submit Proposal <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* CTA Card 3: Think-Thank */}
                <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-[2.2rem] p-8 text-white shadow-lg flex flex-col justify-between"
                >
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center text-lg mb-6">
                            <FaInfoCircle />
                        </div>
                        <h4 className="font-bold text-white text-xl font-sans tracking-tight">Wall of Gratitude</h4>
                        <p className="text-amber-50 text-xs mt-2.5 leading-relaxed font-light">
                            Thank active student volunteers or coordinators for making a difference.
                        </p>
                    </div>
                    <div className="pt-8">
                        <Link href="/think-thank">
                            <button className="bg-white hover:bg-amber-50 text-amber-600 font-bold py-3 px-4 rounded-xl text-xs transition-all w-full text-center flex items-center justify-center gap-1.5 cursor-pointer">
                                Write Thank Card <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}

// Sub-component for individual Event Cards in Timeline (with scroll fade-slide entrance)
function EventTimelineCard({ item, slideFromLeft }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: slideFromLeft ? -45 : 45,
                scale: 0.97
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                scale: 1
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.06)" }}
            className="bg-white border border-slate-200/80 rounded-[2.2rem] overflow-hidden p-3.5 shadow-sm hover:border-slate-300 w-full max-w-sm transition-all duration-300"
        >
            {/* Hover-zoom frame wrapper */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 mb-4 group">
                <Image
                    src={resolveImageUrl(item.thumbnail, "/units/chetna_final.jpg")}
                    alt={item.title || "Event thumbnail"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 300px, 350px"
                />
            </div>

            <div className="px-2 pb-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-md border border-amber-200 bg-amber-50 text-amber-700 font-mono">
                        {item.date}
                    </span>
                    {item.wings?.map((wing, idx) => (
                        <span key={idx} className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-600">
                            {wing}
                        </span>
                    ))}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mt-3 leading-tight font-sans">{item.title}</h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-3">
                    {item.details}
                </p>
            </div>
        </motion.div>
    );
}

// Sub-component for Embla Slider Collaborator images
function CollaborateElement(props) {
    const { data } = props;
    return (
        <div className="flex flex-col items-center justify-center bg-white border border-slate-200/60 rounded-3xl p-6 aspect-square w-full max-w-[155px] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 select-none group">
            <div className="relative w-full h-14 flex items-center justify-center">
                <Image
                    src={resolveImageUrl(data.logo, "/placeholder.svg")}
                    alt={data.name || "Collaborator Logo"}
                    width={100}
                    height={60}
                    className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
            </div>
        </div>
    );
}
