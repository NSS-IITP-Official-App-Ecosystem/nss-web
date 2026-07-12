"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FaAward, FaMedal, FaCertificate, FaImages, FaChevronLeft, FaChevronRight, FaTimes, FaTrophy, FaUserAlt } from 'react-icons/fa';

export default function AwardsPage() {
  // Lightbox Modal State
  const [modalData, setModalData] = useState(null);

  const awardImage = (path) => {
    const cleaned = String(path ?? '').trim();
    if (!cleaned) return '';
    const withoutLeadingSlash = cleaned.replace(/^\/+/, '');
    let resolved = '';
    if (withoutLeadingSlash.startsWith('events/') || withoutLeadingSlash.startsWith('assets/')) {
      resolved = `/${withoutLeadingSlash}`;
    } else if (withoutLeadingSlash.startsWith('awards/')) {
      resolved = `/awards/${withoutLeadingSlash.replace(/^awards\//, '')}`;
    } else {
      resolved = `/awards/${withoutLeadingSlash.replace(/ ([AP]M)(\.[^.]+)$/u, '\u202F$1$2')}`;
    }
    return encodeURI(resolved);
  };

  // --- DATA ---
  const nationalAchievements = [
    {
      title: "Viksit Bharat Young Leaders Dialogue (VBYLD)",
      subtitle: "Qualified as Grand Finalist & Presented to the Prime Minister",
      year: "Jan 2026",
      description: "NSS volunteer Sneha Raj qualified as a grand finalist for the Viksit Bharat Young Leaders Dialogue (VBYLD) at Bharat Mandapam, New Delhi, where she had the honor of presenting her ideas for \"Viksit Bharat 2047\" directly to the Prime Minister.",
      volunteers: [
        { 
          name: "Sneha Raj", 
          roll: "2501ME51", 
          role: "Grand Finalist",
          img: awardImage("sneha vblyd.jpg"),
          caption: "Sneha Raj representing NSS IIT Patna & Team Bihar at Viksit Bharat Young Leaders Dialogue (VBYLD)"
        }
      ]
    },
    {
      title: "Budget Quest — Interacting with the PM on the 2026 Budget",
      subtitle: "Qualified for Grand Finale & Interacted Directly with the PM",
      year: "April 2026",
      description: "Srishti Khargonkar and Anubhav Kumar qualified for the grand finale of Budget Quest (MY Bharat Scheme) and interacted directly online with Prime Minister Narendra Modi, sharing their analysis and recommendations on the 2026 Union Budget.",
      volunteers: [
        { 
          name: "Srishti Khargonkar", 
          roll: "2503ME13", 
          role: "Grand Finalist",
          img: awardImage("shrishti.jpg"),
          caption: "Srishti Khargonkar interacting online with PM Narendra Modi on the 2026 Union Budget during Budget Quest"
        },
        { 
          name: "Anubhav Kumar", 
          roll: "2501AI05", 
          role: "Grand Finalist",
          img: awardImage("anubhav.jpg"),
          caption: "Anubhav Kumar interacting online with PM Narendra Modi on the 2026 Union Budget during Budget Quest"
        }
      ]
    }
  ];

  let globalNationalMediaIndex = 0;
  const structuredNationalAchievements = nationalAchievements.map(item => ({
    ...item,
    volunteers: item.volunteers.map(v => ({
      ...v,
      globalIndex: globalNationalMediaIndex++
    }))
  }));

  const nationalMediaList = structuredNationalAchievements.flatMap(item => item.volunteers.map(v => ({
    img: v.img,
    caption: v.caption
  })));

  const officialPrizePhotos = [
    { img: awardImage("IMG_2017 (1) copy.JPG"), caption: "Core Official receiving Best Leadership Award" },
    { img: awardImage("IMG_2022 (2) copy 2.JPG"), caption: "Sub-Coordinator felicitated" },
    { img: awardImage("IMG_2025.JPG"), caption: "Wing Coordinator receiving the Award of Excellence" },
    { img: awardImage("IMG_2020 copy.JPG"), caption: "Special recognition for impactful community service" },
  ];

  const officials = [
    { name: "Tanishq Raj", role: "Sub-Coordinator", wing: "Teaching Wing", img: awardImage("IMG_2032.JPG") },
    { name: "Parnava Maitra", role: "Sub-Coordinator", wing: "DNC", img: awardImage("IMG_2029.JPG") },
    { name: "Arya Patil", role: "Sub-Coordinator", wing: "chetna", img: awardImage("Screenshot 2026-06-27 at 2.29.36 PM.png") },
    { name: "Priyanshu Purohit", role: "Sub-Coordinator", wing: "chetna", img: awardImage("Screenshot 2026-06-27 at 2.29.27 PM.png") },
    { name: "Shreya Yadav", role: "Sub-Coordinator", wing: "environmental", img: awardImage("Screenshot 2026-06-27 at 2.33.03 PM.png") },
    { name: "Himanshi", role: "Sub-Coordinator", wing: "dnc", img: awardImage("Screenshot 2026-06-27 at 2.33.14 PM.png") },
    { name: "Anish Kumar", role: "Sub-Coordinator", wing: "Teaching wing", img: awardImage("Screenshot 2026-06-27 at 2.32.38 PM.png") },
    { name: "Dikshit Verma", role: "Sub-Coordinator", wing: "Chetna", img: awardImage("Screenshot 2026-06-27 at 2.39.53 PM.png") },
    { name: "Shaurya Singh", role: "Sub-Coordinator", wing: "Chetna", img: awardImage("Screenshot 2026-06-27 at 2.41.39 PM.png") },
    { name: "Jawahar reddy", role: "Sub-Coordinator", wing: "Prayatana", img: awardImage("Screenshot 2026-06-27 at 3.10.32 PM.png") },
    { name: "Anshika Garg", role: "Sub-Coordinator", wing: "Teaching Wing", img: awardImage("Screenshot 2026-06-27 at 2.43.33 PM.png") },
    { name: "Ayantika Halder", role: "Sub-Coordinator", wing: "Rural", img: awardImage("Screenshot 2026-06-27 at 2.45.35 PM.png") },
    { name: "kshitij Singh", role: "Sub-Coordinator", wing: "Rural", img: awardImage("Screenshot 2026-06-27 at 2.59.04 PM.png") },
    { name: "Piyush Kumar", role: "Sub-Coordinator", wing: "Prayatana", img: awardImage("Screenshot 2026-06-27 at 3.01.12 PM.png") },
    { name: "Rijju Mondal", role: "Sub-Coordinator", wing: "Environmental", img: awardImage("Screenshot 2026-06-27 at 3.02.24 PM.png") },
    { name: "Rahul Kumar", role: "Sub-Coordinator", wing: "Rural", img: awardImage("rahul kumar awards.jpeg") },
    { name: "Shankhadeep Das", role: "Sub-Coordinator", wing: "DNC", img: awardImage("WhatsApp Image 2026-06-27 at 15.36.46 copy.jpeg") },
  ];

  const topPerformersByWing = [
    { wing: "Environmental Wing", winners: [{ name: "Kashvi Mehta", roll: "2501PH32", img: awardImage("Screenshot 2026-06-27 at 1.50.34 PM.png"), rank: "1st" }, { name: "Mayank Biswas", roll: "2501CB60", img: awardImage("Screenshot 2026-06-27 at 2.01.29 PM.png"), rank: "2nd" }, { name: "Rupansh Dawer", roll: "2501CE10", img: awardImage("Screenshot 2026-06-27 at 1.52.12 PM.png"), rank: "3rd" }] },
    { wing: "Nukkad Natak", winners: [{ name: "Harshil Jain", roll: "2501EC07", img: awardImage("Screenshot 2026-06-27 at 1.53.48 PM.png"), rank: "1st" }, { name: "Tarush Mohan", roll: "2503ME01", img: awardImage("Screenshot 2026-06-27 at 1.54.44 PM.png"), rank: "2nd" }, { name: "Ujesha Bhavsar", roll: "2502GT06", img: awardImage("Screenshot 2026-06-27 at 1.55.37 PM.png"), rank: "3rd" }] },
    { wing: "TTW (Teaching Wing)", winners: [{ name: "Taniya Kumari Gupta", roll: "2501CB63", img: awardImage("Screenshot 2026-06-27 at 1.56.48 PM.png"), rank: "1st" }, { name: "Ishika Aggarwal", roll: "2502MT01", img: awardImage("Screenshot 2026-06-27 at 1.58.06 PM.png"), rank: "2nd" }, { name: "Mahendra Seervi", roll: "2501EC25", img: awardImage("Screenshot 2026-06-27 at 2.03.49 PM.png"), rank: "3rd" }] },
    { wing: "Rural Development", winners: [{ name: "Riddhima Bharti", roll: "2501EE37", img: awardImage("Screenshot 2026-06-27 at 1.59.09 PM.png"), rank: "1st" }, 
      // { name: "Rachapally Pradeep", roll: "2501ME83", img: awardImage("IMG20260419154802 copy.jpg"), rank: "2nd" },
       { name: "Krish Prakash", roll: "2501CE54", img: awardImage("Screenshot 2026-06-27 at 2.08.44 PM.png"), rank: "3rd" }] },
    { wing: "Chetna Wing", winners: [{ name: "Akshara Karri", roll: "2501PH13", img: awardImage("Screenshot 2026-06-27 at 2.05.19 PM.png"), rank: "1st" }, { name: "Priyanshi Patel", roll: "2501CB02", img: awardImage("Screenshot 2026-06-27 at 2.06.08 PM.png"), rank: "2nd" }] },
    { wing: "Prayatna Wing", winners: [{ name: "Dhruvi Sharma", roll: "2501CE09", img: awardImage("Screenshot 2026-06-27 at 2.07.09 PM.png"), rank: "1st" }, { name: "Kesanapalli Sanjana", roll: "2501CT22", img: awardImage("Screenshot 2026-06-27 at 2.02.44 PM.png"), rank: "2nd" }, { name: "Harshit Kumar", roll: "2501CE31", img: awardImage("Screenshot 2026-06-27 at 2.10.00 PM.png"), rank: "3rd" }] }
  ];

  const awardPhotos = [
    { img: awardImage("IMG20260419154802 copy.jpg"), caption: "1st Prize distribution by Core Committee Members" },
    { img: awardImage("Screenshot 2026-06-27 at 1.33.35 PM.png"), caption: "Certificates" },
    { img: awardImage("Screenshot 2026-06-27 at 2.27.15 PM.png"), caption: "Star Performers with Wing Coordinators" },
    { img: awardImage("IMG20260419155000 copy.jpg"), caption: "Rural fieldwork recognitions" },
    { img: awardImage("IMG_2037 copy.JPG"), caption: "Hours validation ceremony" },
    { img: awardImage("IMG20260419154411 copy.jpg"), caption: "Event Highlights" },
  ];

  // Flatten the winners for the Lightbox global index
  let globalWinnerIndex = 0;
  const structuredWinners = topPerformersByWing.map(wingGroup => ({
    ...wingGroup,
    winners: wingGroup.winners.map(winner => ({
      ...winner,
      wingName: wingGroup.wing,
      globalIndex: globalWinnerIndex++
    }))
  }));
  const flatWinnersList = structuredWinners.flatMap(w => w.winners);

  // Lightbox Navigation Framework
  const openModal = useCallback((type, idx) => {
    setModalData({ type, idx });
  }, []);

  const closeModal = useCallback(() => {
    setModalData(null);
  }, []);

  const navModal = useCallback((dir) => {
    if (!modalData) return;
    const { type, idx } = modalData;
    let listLength = 0;

    if (type === 'gallery') listLength = awardPhotos.length;
    if (type === 'officials') listLength = officials.length;
    if (type === 'winners') listLength = flatWinnersList.length;
    if (type === 'official-prizes') listLength = officialPrizePhotos.length;
    if (type === 'national') listLength = nationalMediaList.length;

    setModalData({
      type,
      idx: (idx + dir + listLength) % listLength
    });
  }, [modalData, flatWinnersList.length, nationalMediaList.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalData) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navModal(-1);
      if (e.key === 'ArrowRight') navModal(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalData, closeModal, navModal]);

  useEffect(() => {
    document.body.style.overflow = modalData !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalData]);

  // Helper to fetch current active image configuration inside lightbox modal
  const getModalImageSource = () => {
    if (!modalData) return null;
    const { type, idx } = modalData;
    if (type === 'gallery') return { src: awardPhotos[idx]?.img, txt: awardPhotos[idx]?.caption, len: awardPhotos.length };
    if (type === 'officials') return { src: officials[idx]?.img, txt: `${officials[idx]?.name} — ${officials[idx]?.role} (${officials[idx]?.wing})`, len: officials.length };
    if (type === 'winners') return { src: flatWinnersList[idx]?.img, txt: `${flatWinnersList[idx]?.name} (${flatWinnersList[idx]?.wingName}) - ${flatWinnersList[idx]?.rank || ''}`, len: flatWinnersList.length };
    if (type === 'official-prizes') return { src: officialPrizePhotos[idx]?.img, txt: officialPrizePhotos[idx]?.caption, len: officialPrizePhotos.length };
    if (type === 'national') return { src: nationalMediaList[idx]?.img, txt: nationalMediaList[idx]?.caption, len: nationalMediaList.length };
    return null;
  };

  const currentActiveImg = getModalImageSource();

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">

      {/* ── 1. Hero Header ── */}
      <div className="relative overflow-hidden bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 shadow-2xl">
        {/* Shimmering Ambient Glow Backgrounds */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Glassmorphic Badge container */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-inner hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
            <FaAward className="text-amber-400 text-lg group-hover:scale-125 transition-transform duration-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">NSS IIT Patna Excellence</span>
          </div>

          {/* Title with Gradient Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm leading-[1.15]">
            Awards & Achievements
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Honoring the outstanding dedication, leadership, and selfless community service of our volunteers at the Annual Closing Ceremony.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-default">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">4</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">National Finalists</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-default">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">17</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Core Officials</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-default">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">15+</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Star Performers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-24">

        {/* ── National Recognition & Achievements ── */}
        <section className="relative">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
            <FaTrophy className="text-3xl text-amber-500 animate-pulse" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">National Recognition & Achievements</h2>
              <p className="text-sm text-slate-500">NSS IIT Patna volunteers representing our unit and state at prestigious national forums.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {structuredNationalAchievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-amber-100 hover:border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider">
                      <FaAward className="text-sm" /> National Honor
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
                      {achievement.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2 leading-tight">
                    {achievement.title}
                  </h3>
                  
                  <h4 className="text-sm font-semibold text-blue-700 mb-4 font-mono uppercase tracking-wide">
                    {achievement.subtitle}
                  </h4>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {achievement.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6 mt-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Honored Volunteers</h5>
                  <div className={`grid gap-6 ${achievement.volunteers.length === 1 ? 'grid-cols-1 max-w-[260px] mx-auto' : 'grid-cols-2'}`}>
                    {achievement.volunteers.map((vol) => (
                      <div
                        key={vol.globalIndex}
                        className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs group hover:shadow-md transition-all duration-300"
                      >
                        {/* Avatar Image Frame (Larger & Clearer Rectangular Card) */}
                        <div
                          onClick={() => openModal('national', vol.globalIndex)}
                          className="w-full aspect-[4/5] mb-4 rounded-2xl bg-slate-200 overflow-hidden relative cursor-zoom-in border border-slate-100 shadow-inner flex items-center justify-center"
                        >
                          <FaUserAlt className="absolute text-slate-400 text-4xl opacity-30" />
                          <img
                            src={vol.img}
                            alt={vol.name}
                            className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-xs font-semibold">
                            View Full Photo
                          </div>
                        </div>

                        <h4 className="font-extrabold text-sm sm:text-base text-slate-800 line-clamp-1">{vol.name}</h4>
                        <p className="text-[10px] font-semibold text-slate-550 font-mono mb-2 bg-slate-200/50 px-2 py-0.5 rounded-md inline-block">{vol.roll}</p>
                        
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                          {vol.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Officials Receiving Prizes Section ── */}
        <section>
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
            <FaTrophy className="text-3xl text-amber-500" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Honoring Our Officials</h2>
              <p className="text-sm text-slate-500">Core committee members and coordinators receiving their well-deserved awards.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officialPrizePhotos.map((photo, index) => (
              <div
                key={index}
                onClick={() => openModal('official-prizes', index)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-slate-200 aspect-[4/3] shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <img
                  src={photo.img}
                  alt={photo.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                  <p className="text-white text-[10px] font-medium tracking-wide mb-1 opacity-70">
                    Click to enlarge view
                  </p>
                  <p className="text-slate-200 text-xs font-semibold line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Closing Ceremony & Officials Section ── */}
        <section>
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
            <FaCertificate className="text-3xl text-blue-800" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Closing Ceremony Recognitions</h2>
              <p className="text-sm text-slate-500">Certificates of Appreciation awarded to our Sub-Coordinator team for flawless execution.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officials.map((official, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => openModal('officials', index)}
                    className="w-full aspect-square mb-4 rounded-lg bg-slate-100 overflow-hidden relative cursor-zoom-in border border-slate-100"
                  >
                    <img
                      src={official.img}
                      alt={official.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-xs font-semibold">
                      View Profile Photo
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                      {official.role}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-800 mb-0.5">{official.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{official.wing}</p>
                </div>

                <p className="text-[11px] text-blue-800 font-semibold mt-4 pt-3 border-t border-slate-50 flex items-center gap-1">
                  Verified Honoree &bull; NSS IITP
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. First-Year Service Hour Winners Section (Categorized by Wing) ── */}
        <section>
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
            <FaMedal className="text-3xl text-amber-500" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">First-Year Star Performers</h2>
              <p className="text-sm text-slate-500">Celebrating the freshmen across all wings who contributed maximum service hours.</p>
            </div>
          </div>

          <div className="space-y-12">
            {structuredWinners.map((wingGroup, wingIndex) => (
              <div key={wingIndex} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

                <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-sm"></span>
                  {wingGroup.wing} Top Performers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wingGroup.winners.map((winner) => (
                    <div
                      key={winner.globalIndex}
                      className="bg-slate-55 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
                    >
                      <div>
                        {/* Winner Portrait Frame */}
                        <div
                          onClick={() => openModal('winners', winner.globalIndex)}
                          className="w-full aspect-[4/3] mb-4 rounded-lg bg-slate-200 overflow-hidden relative group cursor-zoom-in border border-slate-300/50 flex items-center justify-center"
                        >
                          <FaUserAlt className="absolute text-slate-400 text-4xl opacity-50" />
                          <img
                            src={winner.img}
                            alt={winner.name}
                            className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3 text-white text-xs font-medium">
                            Click to expand
                          </div>
                        </div>

                        <h4 className="text-lg font-bold text-slate-800 mb-0.5">{winner.name}</h4>
                        {winner.roll && (
                          <p className="text-xs font-semibold text-slate-500 mb-4 bg-slate-200/60 inline-block px-2 py-0.5 rounded">
                            Roll: {winner.roll}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-slate-200 pt-3 mt-1 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                          Rank: {winner.rank}
                        </span>

                        <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-1 rounded-md uppercase tracking-wider">
                          Star Performer
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Prize Distribution Gallery Section ── */}
        <section>
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
            <FaImages className="text-3xl text-emerald-600" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Ceremony & Prize Distribution Glimpses</h2>
              <p className="text-sm text-slate-500">Captured moments of celebration and honor from the annual event distribution.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {awardPhotos.map((photo, index) => (
              <div
                key={index}
                onClick={() => openModal('gallery', index)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-slate-200 aspect-[4/3] shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <img
                  src={photo.img}
                  alt={photo.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                  <p className="text-white text-[10px] font-medium tracking-wide mb-1 opacity-70">
                    Click to enlarge view
                  </p>
                  <p className="text-slate-200 text-xs font-semibold line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── 6. Global Unified Lightbox Modal ── */}
      {modalData !== null && currentActiveImg && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl w-full flex flex-col items-center"
          >
            {/* Top Bar Indicators */}
            <div className="absolute -top-12 right-0 flex items-center gap-4">
              <span className="text-slate-400 text-sm tracking-wider font-medium">
                {modalData.idx + 1} / {currentActiveImg.len}
              </span>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all text-xs flex items-center gap-1 px-3 cursor-pointer"
              >
                <FaTimes /> Close
              </button>
            </div>

            {/* Left/Right Directional Controls */}
            <button
              onClick={() => navModal(-1)}
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => navModal(1)}
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <FaChevronRight />
            </button>

            {/* Showcase Stage Frame */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden max-h-[70vh] w-full flex items-center justify-center shadow-2xl relative">
              <FaUserAlt className="absolute text-white/10 text-9xl z-0" />
              <img
                src={currentActiveImg.src}
                alt="Enlarged view frame showcase"
                className="max-h-[70vh] w-full object-contain relative z-10"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            {/* Captions Box context */}
            <p className="text-center text-slate-300 text-sm font-medium mt-4 max-w-2xl px-4">
              {currentActiveImg.txt}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
