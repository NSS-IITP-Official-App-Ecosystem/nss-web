"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBookOpen, FaPalette, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';

export default function Unit1Page() {
  // Animation variants for smooth staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#FAFCFF] min-h-screen font-sans overflow-hidden">
      
      {/* 1. Stunning Animated Hero Section (Clean Background) */}
      <section className="relative bg-gradient-to-br from-[var(--color-brand-blue)] via-[#121B2B] to-[#0A0F18] pt-32 pb-40 px-6 sm:px-12 text-center shadow-2xl">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative max-w-5xl mx-auto z-10"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[var(--color-primary)] font-semibold tracking-wider text-sm uppercase">Welcome to the core</span>
          </motion.div>
          
          <motion.div variants={itemVariants}>
           <h1 
  className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[#FDE68A] to-[var(--color-primary)] mb-8 tracking-tighter"
  style={{ WebkitTransform: 'translateZ(0)' }}
>
  NSS Unit 1
</h1>


          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-xl sm:text-2xl text-[var(--color-neutral-foundation)]/90 max-w-3xl mx-auto leading-relaxed font-light">
              Empowering minds through education and innovation. Building strong foundational skills and creative problem-solving within the community.
            </p>
          </motion.div>
        </motion.div>

        {/* Diagonal Cut out at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FAFCFF]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* 2. Elegant Quote Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative -mt-20 px-6 sm:px-12 z-20"
      >
        <div className="max-w-4xl mx-auto text-center relative bg-white/60 backdrop-blur-xl border border-white/80 p-12 sm:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <FaQuoteLeft className="absolute top-8 left-8 text-6xl text-[var(--color-neutral-foundation)]/50" />
          <blockquote className="relative z-10 text-2xl sm:text-3xl font-medium text-[var(--color-secondary-slate)] leading-snug">
            "Education is the most powerful weapon which you can use to change the world. Design is the silent ambassador of your brand."
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-6">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[var(--color-primary)]"></div>
            <p className="text-[var(--color-brand-blue)] font-bold uppercase tracking-[0.2em] text-sm">Unit 1 Philosophy</p>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[var(--color-primary)]"></div>
          </div>
        </div>
      </motion.section>

      {/* 3. Premium Glassmorphism Wings Section */}
      <section className="py-32 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black text-[var(--color-brand-blue)] tracking-tight">
            Explore Our Wings
          </h2>
          <div className="h-1.5 w-24 bg-[var(--color-primary)] mx-auto mt-6 rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Teaching Wing Card */}
          <motion.div 
            whileHover={{ y: -15 }}
            className="group relative rounded-[2rem] bg-white border border-[var(--color-neutral-foundation)]/50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(35,58,68,0.15)] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-150 group-hover:rotate-12">
              <FaBookOpen className="text-9xl text-[var(--color-brand-blue)]" />
            </div>

            <div className="p-12 relative z-10 h-full flex flex-col">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[#1E303D] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <FaBookOpen className="text-3xl text-white" />
              </div>
              
              <h3 className="text-4xl font-extrabold text-[var(--color-brand-blue)] mb-6 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                Teaching Wing
              </h3>
              
              <p className="text-[var(--color-secondary-slate)] text-lg mb-10 leading-relaxed flex-grow">
                Dedicated to providing quality education to the underprivileged. We conduct regular classes, mentorship programs, and academic workshops to nurture the next generation of thinkers.
              </p>
              
              <Link href="/wings/teaching" className="inline-flex items-center gap-3 font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-brand-blue)] px-8 py-4 rounded-xl transition-all duration-300 w-fit shadow-md hover:shadow-xl group/link">
                Discover More 
                <FaArrowRight className="transform group-hover/link:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Design Wing Card */}
          <motion.div 
            whileHover={{ y: -15 }}
            className="group relative rounded-[2rem] bg-white border border-[var(--color-neutral-foundation)]/50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(35,58,68,0.15)] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-150 group-hover:-rotate-12">
              <FaPalette className="text-9xl text-[var(--color-primary)]" />
            </div>

            <div className="p-12 relative z-10 h-full flex flex-col">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#8A5F3C] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <FaPalette className="text-3xl text-white" />
              </div>
              
              <h3 className="text-4xl font-extrabold text-[var(--color-brand-blue)] mb-6 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                Design Wing
              </h3>
              
              <p className="text-[var(--color-secondary-slate)] text-lg mb-10 leading-relaxed flex-grow">
                The creative powerhouse of Unit 1. From visual communications to UI/UX, we design impactful media that amplifies the voice and mission of NSS initiatives.
              </p>
              
              <Link href="/wings/design" className="inline-flex items-center gap-3 font-bold text-white bg-[var(--color-brand-blue)] hover:bg-[var(--color-primary)] px-8 py-4 rounded-xl transition-all duration-300 w-fit shadow-md hover:shadow-xl group/link">
                Discover More
                <FaArrowRight className="transform group-hover/link:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
