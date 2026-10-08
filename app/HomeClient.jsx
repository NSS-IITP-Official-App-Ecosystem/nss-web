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
    FaArrowLeft,
    FaDownload,
    FaBookOpen,
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaMusic,
    FaRedo
} from 'react-icons/fa';
import * as Icons from 'react-icons/pi';
import {
    PiHandsClappingFill,
    PiMusicNotesFill,
    PiSparkleFill
} from 'react-icons/pi';
import AnimatedCounter from '@/components/AnimatedCounter';
import EmblaCarousel from '@/components/EmblaCarousel';
import Testimonial, { TestimonialItem } from '@/components/testimonial';
import { cn } from '@/components/utils';
import DearFlipPdf from '@/components/DearFlip';
import Script from 'next/script';
import BeholdWidget from '@behold/react';

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
    upcomingEventsData = [],
    testimonialsData = [],
    impactsData = [],
    collaboratorsData = []
}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [slideForwarded, setSlideForwarded] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    // Audio player state for NSS Theme Song
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.85);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlayAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => {
                console.error("Audio playback error:", err);
            });
        }
    };

    const handleAudioTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleAudioLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleAudioSeek = (e) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const handleAudioRestart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.play().catch(err => console.error(err));
        }
    };

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
            setIsMuted(val === 0);
        }
    };

    const toggleAudioMute = () => {
        if (!audioRef.current) return;
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        audioRef.current.muted = nextMuted;
    };

    const formatAudioTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds) || timeInSeconds <= 0) return "0:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const equalizerBars = [35, 75, 45, 95, 60, 100, 80, 50, 90, 65, 85, 40, 70, 55];

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

    const handleDownload = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            const response = await fetch('/SAMVEDNA.pdf');
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'SAMVEDNA.pdf';
            a.onclick = (event) => event.stopPropagation();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
        } finally {
            setIsDownloading(false);
        }
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
            <section className="relative w-full overflow-hidden bg-[#020914] h-[380px] xs:h-[450px] sm:h-[540px] lg:h-[620px]">
                <AnimatePresence initial={false} custom={slideForwarded}>
                    {sliderData.items.map((item, i) => {
                        if (activeSlide !== i) return null;

                        const desktopUrl = resolveImageUrl(item.url, "/home_slider/nss_home.jpg");
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
                                    {/* Desktop Image */}
                                    <Image
                                        src={desktopUrl}
                                        alt="Hero slide image"
                                        fill
                                        priority={i === 0}
                                        className={cn("object-cover w-full h-full", item.content ? "brightness-[0.38]" : "brightness-100")}
                                        unoptimized
                                        loading='eager'
                                    />
                                    {/* Mobile Device Specific Image */}
                                    {/* <Image
                                        src={mobileUrl}
                                        alt="Hero slide image mobile"
                                        fill
                                        priority={i === 0}
                                        className={cn("block sm:hidden object-cover w-full h-full", item.content ? "brightness-[0.38]" : "brightness-100")}
                                        unoptimized
                                        loading='eager'
                                    /> */}
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
                                                className="max-w-xl border rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-12 text-left shadow-2xl space-y-3 sm:space-y-4 bg-black/30 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none"
                                            >
                                                {item.content.update_text && (
                                                    <motion.span
                                                        variants={{
                                                            hidden: { opacity: 0, y: 15 },
                                                            show: { opacity: 1, y: 0 }
                                                        }}
                                                        className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-400 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest font-mono shadow-xs"
                                                    >
                                                        {item.content.update_text}
                                                    </motion.span>
                                                )}

                                                <motion.h3
                                                    variants={{
                                                        hidden: { opacity: 0, y: 20 },
                                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
                                                    }}
                                                    className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase font-sans tracking-tight"
                                                >
                                                    {item.content.title}
                                                </motion.h3>

                                                {item.content.action && (
                                                    <motion.div
                                                        variants={{
                                                            hidden: { opacity: 0, y: 15 },
                                                            show: { opacity: 1, y: 0 }
                                                        }}
                                                        className="pt-2 sm:pt-4"
                                                    >
                                                        <Link href={item.content.action.link}>
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl sm:rounded-2xl transition-all shadow-md cursor-pointer text-xs sm:text-sm font-sans flex items-center gap-2 group"
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
                <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-4 z-40">
                    {sliderData.items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setSlideForwarded(i > activeSlide);
                                setActiveSlide(i);
                            }}
                            className="w-10 sm:w-16 h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
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
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-white bg-white/10 sm:bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-400 rounded-full z-40 transition-all cursor-pointer backdrop-blur-md hover:scale-105 text-xs sm:text-base"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={handleNextSlide}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-white bg-white/10 sm:bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-400 rounded-full z-40 transition-all cursor-pointer backdrop-blur-md hover:scale-105 text-xs sm:text-base"
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
                                        <span className="font-extrabold text-slate-800 block text-base leading-none">500+</span>
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

                            {/* Jump to Traditions Link */}
                            <div className="pt-2 flex justify-center lg:justify-start">
                                <a
                                    href="#traditions"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 px-4 py-2 rounded-xl transition-all group shadow-2xs"
                                >
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    <span>Experience NSS Anthem & The Iconic Clap</span>
                                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                                </a>
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
                                    {/* <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/EngW7tLk6R8"
                                        title="NSS IIT Patna Promotional Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    /> */}
                                    <video controls={true} src={'/nss highlights.mp4'} />
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2.2 TRADITIONS & SPIRIT: THE NSS ANTHEM & THE NSS CLAP (LIGHT THEMED) */}
            <section id="traditions" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FBFBFA] via-white to-[#F8F9FA] text-slate-800 border-b border-slate-200/80">
                {/* Subtle ambient glows */}
                <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.03),_transparent_70%)] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50/80 text-amber-700 font-extrabold text-xs uppercase tracking-widest font-mono shadow-2xs mb-4"
                        >
                            <PiMusicNotesFill className="text-sm" />
                            <span>Heritage & Culture</span>
                            <span className="w-1 h-1 rounded-full bg-amber-400" />
                            <PiHandsClappingFill className="text-sm" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight font-sans"
                        >
                            The Pulse of NSS: <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">Anthem & Clap</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mt-3"
                        >
                            The melody that inspires selfless service and the synchronized cadence that unites millions of volunteers across India.
                        </motion.p>
                    </div>

                    {/* Content Grid: Anthem (Left) & Clap (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                        {/* LEFT COLUMN: NSS THEME SONG / ANTHEM */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-7 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-300 transition-all duration-300"
                        >
                            {/* Decorative Accent Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                            <div>
                                {/* Card Header */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                                    <div className="space-y-1.5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold uppercase tracking-wider">
                                            <PiSparkleFill className="text-xs" />
                                            Official NSS Theme Song
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight font-sans">
                                            Uthen Samaj Ke Liye Uthen
                                        </h3>
                                        <p className="text-amber-600 font-semibold text-sm">
                                            राष्ट्रीय सेवा योजना लक्ष्य गीत
                                        </p>
                                        <p className="text-slate-500 text-xs font-light max-w-md pt-1 leading-relaxed">
                                            The official anthem of the National Service Scheme, composed to ignite the flame of social service and nation building among the youth.
                                        </p>
                                    </div>

                                </div>

                                {/* Scrollable Complete Lyrics Box */}
                                <div className="my-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 overflow-hidden shadow-2xs">
                                    {/* Lyrics Header */}
                                    <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200/70 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaQuoteLeft className="text-amber-500 text-xs" />
                                            <span className="text-xs font-bold text-slate-800 font-sans">
                                                Complete Anthem Lyrics (सम्पूर्ण लक्ष्य गीत)
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-slate-200/60">
                                            Scroll to read ↓
                                        </span>
                                    </div>

                                    {/* Scrollable Verses */}
                                    <div className="p-4 max-h-74 overflow-y-auto space-y-3.5 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
                                        {/* Stanza 1: Opening / Chorus */}
                                        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70">
                                            <p className="font-semibold text-amber-950 leading-relaxed">
                                                उठें समाज के लिए उठें उठें,<br />
                                                जगें स्वराष्ट्र के लिए जगें जगें।<br />
                                                स्वयं सजे वसुंधरा संवार दें,<br />
                                                स्वयं सजे वसुंधरा संवार दें॥
                                            </p>
                                            <p className="text-[11px] text-amber-800/80 mt-1.5 italic font-light">
                                                "Let us rise for society, let us rise and adorn Mother Earth."
                                            </p>
                                        </div>

                                        {/* Stanza 2 */}
                                        <div className="pl-3 border-l-2 border-slate-200">
                                            <p className="text-slate-700 leading-relaxed">
                                                हम उठें उठेगा जग हमारे संग साथियों,<br />
                                                हम बढ़ें तो सब बढ़ेंगे अपने आप साथियों।<br />
                                                ज़मीं पे आसमाँ को हम उतार दें,<br />
                                                ज़मीं पे आसमाँ को हम उतार दें।<br />
                                                स्वयं सजे वसुंधरा संवार दें,<br />
                                                स्वयं सजे वसुंधरा संवार दें॥
                                            </p>
                                        </div>

                                        {/* Stanza 3 */}
                                        <div className="pl-3 border-l-2 border-slate-200">
                                            <p className="text-slate-700 leading-relaxed">
                                                उदासियों को दूर कर खुशी को बांटते चलें,<br />
                                                गांव और शहर की दूरियों को पाटते चलें।<br />
                                                ज्ञान को प्रचार दें, प्रसार दें,<br />
                                                विज्ञान को प्रचार दें, प्रसार दें।<br />
                                                स्वयं सजे वसुंधरा संवार दें,<br />
                                                स्वयं सजे वसुंधरा संवार दें॥
                                            </p>
                                        </div>

                                        {/* Stanza 4 */}
                                        <div className="pl-3 border-l-2 border-slate-200">
                                            <p className="text-slate-700 leading-relaxed">
                                                समर्थ बाल, वृद्ध और नारियां रहें,<br />
                                                सदा हरे-भरे वनों की शाल ओढ़ती रहे धरा।<br />
                                                तरक्कियों की एक नई कतार दें,<br />
                                                तरक्कियों की एक नई कतार दें।<br />
                                                स्वयं सजे वसुंधरा संवार दें,<br />
                                                स्वयं सजे वसुंधरा संवार दें॥
                                            </p>
                                        </div>

                                        {/* Stanza 5 */}
                                        <div className="pl-3 border-l-2 border-slate-200">
                                            <p className="text-slate-700 leading-relaxed">
                                                ये जाति-धर्म-बोलियां बनें न शूल राह की,<br />
                                                बढ़ाएं बेल प्रेम की अखंडता की चाह की।<br />
                                                सद्भावना से ये चमन निखार दें,<br />
                                                सद्भावना से ये चमन निखार दें।<br />
                                                स्वयं सजे वसुंधरा संवार दें,<br />
                                                स्वयं सजे वसुंधरा संवार दें॥
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Audio Player Controls Box */}
                            <div className="space-y-4 pt-2">
                                {/* Equalizer & Status Indicator */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-colors",
                                            isPlaying ? "bg-emerald-500 animate-pulse shadow-xs shadow-emerald-400" : "bg-slate-300"
                                        )} />
                                        <span className="text-xs font-mono font-semibold tracking-wider text-slate-500">
                                            {isPlaying ? "NOW PLAYING" : "PAUSED"}
                                        </span>
                                    </div>

                                    {/* Animated Equalizer Waves */}
                                    <div className="flex items-end gap-1 sm:gap-1.5 h-7 px-2">
                                        {equalizerBars.map((height, idx) => (
                                            <motion.span
                                                key={idx}
                                                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-amber-500 via-amber-400 to-amber-300"
                                                animate={isPlaying ? {
                                                    height: [`${Math.max(15, height * 0.25)}%`, `${height}%`, `${Math.max(20, height * 0.45)}%`],
                                                } : {
                                                    height: "18%"
                                                }}
                                                transition={isPlaying ? {
                                                    duration: 0.5 + (idx % 5) * 0.12,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    ease: "easeInOut",
                                                    delay: (idx * 0.06) % 0.35
                                                } : { duration: 0.3 }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Scrubber Progress Bar */}
                                <div className="space-y-1.5">
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration && !isNaN(duration) && isFinite(duration) ? duration : 100}
                                        step="0.1"
                                        value={currentTime}
                                        onChange={handleAudioSeek}
                                        aria-label="Audio scrubber"
                                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none transition-all"
                                    />
                                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                                        <span>{formatAudioTime(currentTime)}</span>
                                        <span>{duration && !isNaN(duration) && isFinite(duration) ? formatAudioTime(duration) : "--:--"}</span>
                                    </div>
                                </div>

                                {/* Main Controls Row */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                                    <div className="flex items-center gap-3">
                                        {/* Play / Pause Main Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.06 }}
                                            whileTap={{ scale: 0.94 }}
                                            onClick={togglePlayAudio}
                                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-amber-500/25 cursor-pointer transition-all border border-amber-300/60"
                                            aria-label={isPlaying ? "Pause NSS Theme Song" : "Play NSS Theme Song"}
                                        >
                                            {isPlaying ? (
                                                <FaPause className="text-white" />
                                            ) : (
                                                <FaPlay className="text-white ml-0.5" />
                                            )}
                                        </motion.button>

                                        {/* Replay Button */}
                                        <button
                                            onClick={handleAudioRestart}
                                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200/80 transition-colors cursor-pointer"
                                            title="Restart audio"
                                            aria-label="Restart audio from beginning"
                                        >
                                            <FaRedo className="text-xs" />
                                        </button>

                                        {/* Volume Controls */}
                                        <div className="flex items-center gap-2 pl-1 sm:pl-2">
                                            <button
                                                onClick={toggleAudioMute}
                                                className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-slate-100"
                                                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                                            >
                                                {isMuted || volume === 0 ? (
                                                    <FaVolumeMute className="text-sm text-rose-500" />
                                                ) : (
                                                    <FaVolumeUp className="text-sm" />
                                                )}
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.05"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                aria-label="Volume slider"
                                                className="w-16 sm:w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Download Song Button */}
                                    <a
                                        href="/nss%20song.mpeg"
                                        download="NSS_Theme_Song.mpeg"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-800 text-xs font-semibold font-sans transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-2xs"
                                    >
                                        <FaDownload className="text-amber-600 text-xs" />
                                        <span>Download Song</span>
                                    </a>
                                </div>
                            </div>

                            {/* Hidden HTML Audio Tag with source fallbacks */}
                            <audio
                                ref={audioRef}
                                preload="metadata"
                                onTimeUpdate={handleAudioTimeUpdate}
                                onLoadedMetadata={handleAudioLoadedMetadata}
                                onEnded={handleAudioEnded}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src="/nss%20song.mpeg" type="audio/mpeg" />
                                <source src="/nss song.mpeg" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </motion.div>

                        {/* RIGHT COLUMN: THE ICONIC NSS CLAP */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-5 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-300 transition-all duration-300"
                        >
                            {/* Decorative Accent Glow */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                            <div>
                                {/* Context Header */}
                                <div className="space-y-1.5">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold uppercase tracking-wider">
                                        <PiHandsClappingFill className="text-sm" />
                                        Signature NSS Tradition
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight font-sans">
                                        The Iconic NSS Clap
                                    </h3>
                                    <p className="text-amber-600 font-semibold text-sm">
                                        राष्ट्रीय सेवा योजना ताली
                                    </p>
                                    <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed pt-1">
                                        The signature synchronized rhythmic salute of the National Service Scheme — two rounds of three rapid claps followed by three slow, resonant claps to honor guests and celebrate unity.
                                    </p>
                                </div>

                                {/* Rhythm Beat Guide with Guaranteed Non-Wrapping Numbers */}
                                <div className="my-5 p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2.5 shadow-2xs">
                                    <div className="flex flex-wrap items-center justify-between gap-1">
                                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold whitespace-nowrap">
                                            Signature Cadence:
                                        </span>
                                        <span className="text-[10px] font-mono text-amber-700 font-semibold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                                            3 Fast • 3 Fast • 3 Slow
                                        </span>
                                    </div>

                                    {/* 3 Step Cards with whitespace-nowrap */}
                                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 text-center font-mono w-full">
                                        {/* Round 1 */}
                                        <div className="bg-white border border-slate-200/80 shadow-2xs rounded-xl py-2 px-1 sm:px-2 flex flex-col items-center justify-between min-w-0">
                                            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase whitespace-nowrap">Round 1</span>
                                            <span className="text-sm sm:text-base font-black text-slate-900 tracking-wider whitespace-nowrap my-1">
                                                1-2-3
                                            </span>
                                            <span className="inline-block text-[9px] text-emerald-700 font-sans font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200/80 rounded-md px-1.5 py-0.5 whitespace-nowrap">
                                                FAST
                                            </span>
                                        </div>

                                        {/* Round 2 */}
                                        <div className="bg-white border border-slate-200/80 shadow-2xs rounded-xl py-2 px-1 sm:px-2 flex flex-col items-center justify-between min-w-0">
                                            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase whitespace-nowrap">Round 2</span>
                                            <span className="text-sm sm:text-base font-black text-slate-900 tracking-wider whitespace-nowrap my-1">
                                                1-2-3
                                            </span>
                                            <span className="inline-block text-[9px] text-emerald-700 font-sans font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200/80 rounded-md px-1.5 py-0.5 whitespace-nowrap">
                                                FAST
                                            </span>
                                        </div>

                                        {/* Finale */}
                                        <div className="bg-amber-50/70 border border-amber-200/80 shadow-2xs rounded-xl py-2 px-1 sm:px-2 flex flex-col items-center justify-between min-w-0">
                                            <span className="text-[10px] text-amber-700 font-mono font-bold uppercase whitespace-nowrap">Finale</span>
                                            <span className="text-sm sm:text-base font-black text-amber-800 tracking-wider whitespace-nowrap my-1">
                                                1&nbsp;2&nbsp;3
                                            </span>
                                            <span className="inline-block text-[9px] text-amber-700 font-sans font-bold uppercase tracking-wider bg-amber-100/80 border border-amber-200 rounded-md px-1.5 py-0.5 whitespace-nowrap">
                                                SLOW
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Mockup Housing YouTube Shorts Embed */}
                            <div className="relative w-full max-w-[280px] sm:max-w-[310px] mx-auto mt-2">
                                {/* Ambient Backlight Glow */}
                                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/15 via-blue-500/10 to-rose-500/15 rounded-[2.8rem] blur-xl pointer-events-none" />

                                {/* Phone Bezel */}
                                <div className="relative rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 shadow-2xl p-2.5 overflow-hidden">
                                    {/* Top Speaker / Camera Notch */}
                                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-900 rounded-full z-20 flex items-center justify-center pointer-events-none">
                                        <div className="w-2 h-2 rounded-full bg-slate-950 mr-2" />
                                        <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                                    </div>

                                    {/* YouTube Shorts Embed Container */}
                                    <div className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-black">
                                        <iframe
                                            src="https://www.youtube.com/embed/yHUc0dKEVT4"
                                            title="Nss clap||#nss #ytshorts #nssunitlakhipurcollege #shorts"
                                            className="w-full h-full border-0 rounded-[2rem]"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div >
            </section >

            {/* 2.5. SAMVEDNA MAGAZINE SECTION WITH LIGHT THEMED INTERACTIVE FLIPBOOK */}
            < section className="py-24 relative overflow-hidden bg-white border-b border-slate-200/60 text-slate-800" >
                {/* Glowing background accent circles (very soft light glow) */}
                < div className="absolute top-1/4 left-[10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* Text and Actions Left Column */}
                        <div className="lg:col-span-5 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50/60 text-amber-700 font-extrabold text-xs uppercase tracking-widest font-mono shadow-xs">
                                <FaBookOpen className="text-sm" /> Annual Publication (2025-26)
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight font-sans">
                                SAMVEDNA <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent font-sans font-black">Magazine</span>
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed font-light max-w-lg">
                                Explore the pages of <strong>Samvedna</strong>, the official annual magazine of NSS IIT Patna, and experience a year of service, impact, and inspiration. Discover the initiatives undertaken by our various units and wings, celebrate their achievements, and read heartfelt testimonials from our student volunteers. Witness how the spirit of selfless service, strengthened by innovation and teamwork, is creating meaningful and lasting social change.
                            </p>

                            {/* Features list */}
                            <div className="space-y-3.5 w-full max-w-sm pt-2 text-left">
                                <div className="flex items-center gap-3">
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                                        ✓
                                    </div>
                                    <span className="text-slate-600 text-sm font-light">Comprehensive coverage of all wings</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                                        ✓
                                    </div>
                                    <span className="text-slate-600 text-sm font-light">Volunteer diaries & stories of change</span>
                                </div>
                            </div>

                            {/* Download Action Button */}
                            <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start w-full">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer disabled:cursor-not-allowed text-xs font-sans"
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <FaDownload className="text-xs" /> Download PDF Magazine
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Interactive Flipbook Right Column */}
                        <div className="lg:col-span-7 w-full flex justify-center">
                            <div className="w-full max-w-2xl border border-slate-200/80 bg-[#FAF9F6] p-2.5 rounded-2xl shadow-lg relative">
                                <DearFlipPdf source={'/SAMVEDNA.pdf'} />
                            </div>
                        </div>

                    </div>
                </div>
            </section >

            {/* instagram posts section */}
            < section className="relative py-24 overflow-hidden" >

                {/* Background gradient */}
                < div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/40 to-fuchsia-50/30 pointer-events-none" />

                {/* Decorative blobs */}
                < div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-fuchsia-300/20 blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-rose-200/15 blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        {/* Instagram badge */}
                        <div className="inline-flex items-center gap-2.5 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/60 shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-br from-pink-500 to-fuchsia-500" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-transparent font-mono">
                                Updates from NSS IITP
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 mt-1 font-sans">
                            Follow Our{' '}
                            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
                                Journey
                            </span>
                        </h2>
                        <p className="mt-3 text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                            Stay connected with our latest activities, events, and community moments — straight from our Instagram feed.
                        </p>

                        {/* Decorative divider */}
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
                            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300" />
                        </div>
                    </motion.div>

                    {/* Widget container */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md border border-white/80 shadow-xl shadow-pink-100/40 p-4 sm:p-6"
                    >
                        {/* Subtle top-edge glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />

                        <BeholdWidget feedId='Dp6V5Qvb1ofrvHmE0mWW' />

                        {/* Subtle bottom-edge glow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
                    </motion.div>

                    {/* Follow CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <a
                            href="https://www.instagram.com/nss.iitp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Follow @nss.iitp
                        </a>
                    </motion.div>
                </div>
            </section >

            {/* 3. "OUR UNITS" SECTION WITH 3D SPRING TILT & DYNAMIC SHADOWS */}
            < section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in" id="units" >
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
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4  group">
                                        <Image
                                            src={resolveImageUrl(item.thumbnail, "/units/chetna_final.jpg")}
                                            alt={item.title}
                                            fill
                                            className="object-contain group-hover:scale-105 transition-transform duration-500"
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
            </section >

            {/* 4. UPCOMING EVENTS SECTION WITH GRADIENT TRACK LINE & SLIDE ENTRIES */}
            < section className="py-24 bg-gray-100/50 border-t border-b border-slate-200/60" id="upcoming-events" >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 max-w-xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue font-mono">NSS Events</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 font-sans tracking-tight">Upcoming Event Timeline</h2>
                        <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                            Trace Upcoming Events By NSS
                        </p>
                    </div>

                    {/* Timeline Path Container */}
                    <div className="relative mt-12 pl-8 sm:pl-0">
                        {/* Gradient Line Path */}
                        {upcomingEventsData.length > 0 && <div className="absolute top-0 bottom-0 left-[26px] sm:left-1/2 w-0.5 bg-gradient-to-b from-amber-400 via-indigo-500 to-rose-500 -translate-x-1/2 pointer-events-none" />
                        }
                        {upcomingEventsData.length > 0 ? upcomingEventsData.map((item, i) => {
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
                        }) :
                            <div className='text-center max-w-xl border border-border rounded-xl bg-white p-6 m-auto'>
                                There is Currently No Upcoming Event
                            </div>
                        }
                    </div>

                    <div className="text-center mt-12 flex flex-row gap-5 justify-center">
                        <Link href="/events">
                            <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer text-sm font-sans flex items-center gap-2 mx-auto group">
                                View Upcoming Events <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section >

            {/* 4. RECENT EVENTS SECTION WITH GRADIENT TRACK LINE & SLIDE ENTRIES */}
            < section className="py-24 bg-slate-100/50 border-t border-b border-slate-200/60" id="events" >
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
                                View Event Gallery <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>

                    </div>
                </div>
            </section >

            {/* 5. TESTIMONIALS SECTION WITH CIRCULAR BORDER GLOW */}
            < section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials" >
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
            </section >

            {/* 6. DYNAMIC STATS CARD GRIDS */}
            < section className="py-24 text-white bg-brand-blue md:w-[92%] mx-auto rounded-[3.2rem] shadow-2xl relative overflow-hidden px-6 sm:px-12" id="impact" >
                {/* Glow layout */}
                < div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.08),_transparent)] pointer-events-none" />

                <div className="text-center mb-20 max-w-xl mx-auto relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">NSS Outcomes</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 font-sans">The Impact We Created</h2>
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                        Statistical facts highlighting our community outreach achievements.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-stretch relative z-10">
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
            </section >

            {/* 7. COLLABORATORS SECTION */}
            < section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="collaborate" >
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
            </section >

            {/* 8. PREMIUM CTA ACTION CARDS */}
            < section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-slate-200/60 pt-20 grid grid-cols-1 md:grid-cols-3 gap-8" >

                {/* CTA Card 1: Blood Request */}
                < motion.div
                    whileHover={{ y: -6, scale: 1.01 }
                    }
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
                </motion.div >

                {/* CTA Card 2: Collaborate */}
                < motion.div
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
                </motion.div >

                {/* CTA Card 3: Think-Thank */}
                < motion.div
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
                </motion.div >

            </section >
        </div >
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

                <h3 className="text-lg font-bold text-slate-800 mt-3 leading-tight font-sans"><Link href={`/gallery/event/${item.id}`}>{item.title}</Link></h3>
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
