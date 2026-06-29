"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Users, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function NotFound() {
  // Animation variants for the floating background blobs
  const blobVariants = {
    animate1: {
      x: [0, 50, -30, 0],
      y: [0, -70, 40, 0],
      scale: [1, 1.15, 0.9, 1],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    animate2: {
      x: [0, -60, 40, 0],
      y: [0, 50, -60, 0],
      scale: [1, 0.85, 1.1, 1],
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    animate3: {
      x: [0, 30, -50, 0],
      y: [0, 40, 30, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  // Compass needle animation variants
  const needleVariants = {
    initial: { rotate: 45 },
    animate: {
      rotate: [45, 50, 40, 85, 30, 190, 160, 375, 405],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    hover: {
      rotate: 540,
      transition: {
        duration: 1.8,
        ease: "backOut",
      }
    }
  };

  // Outer dial animation variants
  const dialVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 35,
        repeat: Infinity,
        ease: "linear",
      }
    }
  };

  // Individual character bounce on hover
  const charVariants = {
    hover: {
      y: -15,
      scale: 1.1,
      color: "#f59e0b", // Primary yellow color
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40 px-6 py-12 md:py-20 select-none">
      
      {/* Dynamic Background Glassmorphic Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          variants={blobVariants}
          animate="animate1"
          className="absolute -top-12 -left-12 w-80 md:w-96 h-80 md:h-96 rounded-full bg-brand-blue/10 blur-3xl"
        />
        <motion.div
          variants={blobVariants}
          animate="animate2"
          className="absolute -bottom-16 -right-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-amber-500/10 blur-3xl"
        />
        <motion.div
          variants={blobVariants}
          animate="animate3"
          className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full text-center relative z-10 flex flex-col items-center"
      >
        
        {/* Animated Compass Pathfinder Art */}
        <motion.div 
          variants={itemVariants}
          className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center mb-6 group cursor-pointer"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute inset-4 rounded-full bg-brand-blue/5 blur-xl group-hover:bg-brand-blue/10 transition-colors duration-300" />
          
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full text-slate-800"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer dotted dial */}
            <motion.circle 
              variants={dialVariants}
              animate="animate"
              cx="100" 
              cy="100" 
              r="85" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeDasharray="4 8" 
              className="text-slate-300"
            />
            
            {/* Main Compass Ring */}
            <circle 
              cx="100" 
              cy="100" 
              r="72" 
              stroke="var(--color-brand-blue)" 
              strokeWidth="3" 
              className="opacity-25"
            />
            
            {/* Inner Ring with cardinal ticks */}
            <circle 
              cx="100" 
              cy="100" 
              r="60" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeDasharray="2 12" 
              className="text-slate-400"
            />

            {/* Grid Coordinates Lines */}
            <line x1="100" y1="28" x2="100" y2="172" stroke="currentColor" strokeWidth="0.5" className="text-slate-200" />
            <line x1="28" y1="100" x2="172" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-slate-200" />
            
            {/* Cardinal Markers */}
            <text x="100" y="48" textAnchor="middle" className="text-[10px] font-bold fill-brand-blue opacity-85">N</text>
            <text x="100" y="162" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">S</text>
            <text x="156" y="103" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">E</text>
            <text x="44" y="103" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">W</text>

            {/* Glowing Center Hub */}
            <circle cx="100" cy="100" r="8" fill="white" stroke="var(--color-brand-blue)" strokeWidth="2" className="shadow-sm" />
            
            {/* Compass Needle */}
            <motion.g
              variants={needleVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              style={{ originX: "100px", originY: "100px" }}
            >
              {/* North Pointer (Orange/Amber Accent) */}
              <path 
                d="M100 100 L95 100 L100 35 Z" 
                fill="var(--color-primary)" 
                stroke="var(--color-primary)" 
                strokeWidth="1" 
                strokeLinejoin="round"
              />
              <path 
                d="M100 100 L105 100 L100 35 Z" 
                fill="#fcd34d" 
                stroke="var(--color-primary)" 
                strokeWidth="1" 
                strokeLinejoin="round" 
                className="opacity-90"
              />
              
              {/* South Pointer (Brand Blue / Dark) */}
              <path 
                d="M100 100 L95 100 L100 165 Z" 
                fill="var(--color-brand-blue)" 
                stroke="var(--color-brand-blue)" 
                strokeWidth="1" 
                strokeLinejoin="round"
              />
              <path 
                d="M100 100 L105 100 L100 165 Z" 
                fill="#1d4ed8" 
                stroke="var(--color-brand-blue)" 
                strokeWidth="1" 
                strokeLinejoin="round"
                className="opacity-80"
              />
            </motion.g>

            {/* Small decorative stars/points around compass */}
            <circle cx="140" cy="60" r="2" fill="var(--color-primary)" className="animate-pulse" />
            <circle cx="60" cy="140" r="1.5" fill="var(--color-brand-blue)" className="animate-pulse" />
          </svg>
        </motion.div>

        {/* 404 Text with letter bounce */}
        <motion.div 
          variants={itemVariants}
          className="flex space-x-1 justify-center items-center mb-4 select-none"
        >
          {['4', '0', '4'].map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              whileHover="hover"
              className="text-7xl md:text-8xl font-black tracking-tight text-brand-blue font-mono cursor-pointer drop-shadow-sm"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Error Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
        >
          Lost Your Course?
        </motion.h1>

        {/* Themed Paragraph Description */}
        <motion.p 
          variants={itemVariants}
          className="text-slate-500 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-medium"
        >
          Even the best pathfinders wander off track sometimes. The page you are looking for doesn't exist, but as part of the NSS community, we're ready to guide you back to safety.
        </motion.p>

        {/* Return Button */}
        <motion.div variants={itemVariants} className="mb-14">
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.04, boxShadow: "0 10px 25px -5px rgba(0, 37, 109, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-brand-blue text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-brand-blue/15 hover:bg-brand-blue/95 transition-all duration-200 cursor-pointer group"
            >
              <Home className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>Return to Safe Harbor</span>
              <ArrowRight className="w-4 h-4 text-slate-300 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Path suggestions */}
        <motion.div 
          variants={itemVariants} 
          className="w-full max-w-2xl border-t border-slate-100 pt-8"
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4 text-slate-300" />
            Try Exploring These Service Paths
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Team link */}
            <Link href="/our-team">
              <motion.div 
                whileHover={{ y: -3, borderColor: "rgba(0,37,109,0.2)", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.06)" }}
                className="bg-white/60 hover:bg-white border border-slate-100/80 p-4 rounded-xl flex items-center gap-3 text-left transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 group-hover:text-brand-blue transition-colors">Our Team</h4>
                  <p className="text-xs text-slate-400 font-medium">Meet our leaders & volunteers</p>
                </div>
              </motion.div>
            </Link>

            {/* Think Thank link */}
            <Link href="/think-thank">
              <motion.div 
                whileHover={{ y: -3, borderColor: "rgba(0,37,109,0.2)", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.06)" }}
                className="bg-white/60 hover:bg-white border border-slate-100/80 p-4 rounded-xl flex items-center gap-3 text-left transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 group-hover:text-brand-blue transition-colors">Think-Thank</h4>
                  <p className="text-xs text-slate-400 font-medium">Share your innovations</p>
                </div>
              </motion.div>
            </Link>

            {/* Blood Request Link */}
            <Link href="/request-blood">
              <motion.div 
                whileHover={{ y: -3, borderColor: "rgba(0,37,109,0.2)", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.06)" }}
                className="bg-white/60 hover:bg-white border border-slate-100/80 p-4 rounded-xl flex items-center gap-3 text-left transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 group-hover:text-brand-blue transition-colors">Blood Request</h4>
                  <p className="text-xs text-slate-400 font-medium">Save lives in emergencies</p>
                </div>
              </motion.div>
            </Link>

          </div>
        </motion.div>

      </motion.div>

      {/* Aesthetic grid overlay for technical theme */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-0" 
        style={{ 
          backgroundImage: "radial-gradient(#00256d 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }} 
      />
    </div>
  );
}
