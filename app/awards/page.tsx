"use client";

import React, { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function AwardsPage() {
  const [modalData, setModalData] = useState(null);
  const scrollRefs = useRef({});

  const scrollByAmount = (key, dir) => {
    const el = scrollRefs.current[key];
    if (!el) return;
    const cardWidth = el.clientWidth / 3;
    el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
  };

  const awardImage = (path) => {
    const cleaned = String(path ?? '').trim();
    if (!cleaned) return '';
    const withoutLeadingSlash = cleaned.replace(/^\/+/, '');
    if (withoutLeadingSlash.startsWith('events/')) return `/${withoutLeadingSlash}`;
    if (withoutLeadingSlash.startsWith('awards/')) return `/events/session/2025-26/awards/${withoutLeadingSlash.replace(/^awards\//, '')}`;
    return `/events/session/2025-26/awards/${withoutLeadingSlash.replace(/ ([AP]M)(\.[^.]+)$/u, '\u202F$1$2')}`;
  };

  // --- DATA ---
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
    { name: "Rahul Kumar", role: "Sub-Coordinator", wing: "Rural", img: awardImage("Screenshot 2026-07-07 at 3.40.24 PM.png") },
    { name: "Shankhadeep Das", role: "Sub-Coordinator", wing: "DNC", img: awardImage("WhatsApp Image 2026-06-27 at 15.36.46 copy.jpeg") },
  ];

  const topPerformersByWing = [
    { wing: "Environmental Wing", winners: [{ name: "Kashvi Mehta", roll: "2501PH32", img: awardImage("Screenshot 2026-06-27 at 1.50.34 PM.png"),rank:"1st" }, { name: "Mayank Biswas", roll: "2501CB60", img: awardImage("Screenshot 2026-06-27 at 2.01.29 PM.png"),rank:"2nd" }, { name: "Rupansh Dawer", roll: "2501CE10", img: awardImage("Screenshot 2026-06-27 at 1.52.12 PM.png"),rank:"3rd" }] },
    { wing: "Nukkad Natak", winners: [{ name: "Harshil Jain", roll: "2501EC07", img: awardImage("Screenshot 2026-06-27 at 1.53.48 PM.png"),rank:"1st" }, { name: "Tarush Mohan", roll: "2503ME01", img: awardImage("Screenshot 2026-06-27 at 1.54.44 PM.png"),rank:"2nd" }, { name: "Ujesha Bhavsar", roll: "2502GT06", img: awardImage("Screenshot 2026-06-27 at 1.55.37 PM.png"),rank:"3rd" }] },
    { wing: "TTW (Teaching Wing)", winners: [{ name: "Taniya Kumari Gupta", roll: "2501CB63", img: awardImage("Screenshot 2026-06-27 at 1.56.48 PM.png"),rank:"1st" }, { name: "Ishika Aggarwal", roll: "2502MT01", img: awardImage("Screenshot 2026-06-27 at 1.58.06 PM.png"),rank:"2nd" }, { name: "Mahendra Seervi", roll: "2501EC25", img: awardImage("Screenshot 2026-06-27 at 2.03.49 PM.png"),rank:"3rd" }] },
    { wing: "Rural Development", winners: [{ name: "Riddhima Bharti", roll: "2501EE37", img: awardImage("Screenshot 2026-06-27 at 1.59.09 PM.png"),rank:"1st" }, { name: "Rachapally Pradeep", roll: "2501ME83", img: awardImage("IMG20260419154802 copy.jpg"),rank:"2nd" }, { name: "Krish Prakash", roll: "2501CE54", img: awardImage("Screenshot 2026-06-27 at 2.08.44 PM.png"),rank:"3rd" }] },
    { wing: "Chetna Wing", winners: [{ name: "Akshara Karri", roll:"2501PH13", img: awardImage("Screenshot 2026-06-27 at 2.05.19 PM.png"),rank:"1st" }, { name: "Priyanshi Patel", roll: "2501CB02", img: awardImage("Screenshot 2026-06-27 at 2.06.08 PM.png"),rank:"2nd" }] },
    { wing: "Prayatna Wing", winners: [{ name:"Dhruvi Sharma", roll:"2501CE09", img:awardImage("Screenshot 2026-06-27 at 2.07.09 PM.png"),rank:"1st" }, { name:"Kesanapalli Sanjana", roll:"2501CT22", img:awardImage("Screenshot 2026-06-27 at 2.02.44 PM.png"),rank:"2nd" }, { name:"Harshit Kumar", roll:"2501CE31", img:awardImage("Screenshot 2026-06-27 at 2.10.00 PM.png"),rank:"3rd" }] }
  ];

  const awardPhotos = [
    { img: awardImage("IMG20260419154802 copy.jpg"), caption: "1st Prize distribution" },
    { img: awardImage("Screenshot 2026-06-27 at 1.33.35 PM.png"), caption: "Certificates" },
    { img: awardImage("Screenshot 2026-06-27 at 2.27.15 PM.png"), caption: "Star Performers" },
    { img: awardImage("IMG20260419155000 copy.jpg"), caption: "Rural fieldwork" },
    { img: awardImage("IMG_2037 copy.JPG"), caption: "Hours validation ceremony" },
    { img: awardImage("IMG20260419154411 copy.jpg"), caption: "Event Highlights" },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white py-16 text-center mb-10">
        <h1 className="text-4xl font-extrabold text-yellow-500">Awards & Achievements</h1>
        <p className="text-lg text-slate-300">"Honouring the unwavering dedication and tireless efforts of our most hardworking NSS members."</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-20">
        
        {/* ROW 1: Scrollable Prizes */}
        <section className="relative">
          <h2 className="text-2xl font-bold mb-8">Honoring Our Officials</h2>
          <button onClick={() => scrollByAmount('prizes', -1)} className="absolute -left-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐸ</button>
          <div ref={(el) => (scrollRefs.current['prizes'] = el)} className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'none' }}>
            {officialPrizePhotos.map((p, i) => (
              <div key={i} onClick={() => setModalData({ list: officialPrizePhotos, idx: i })} className="min-w-[400px] aspect-[3/3] bg-white border p-3 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition">
                <img src={p.img} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
          <button onClick={() => scrollByAmount('prizes', 1)} className="absolute -right-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐳ</button>
        </section>

        {/* ROW 2: Scrollable Officials */}
        <section className="relative">
          <h2 className="text-2xl font-bold mb-8">Closing Ceremony Recognitions</h2>
          <button onClick={() => scrollByAmount('officials', -1)} className="absolute -left-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐸ</button>
          <div ref={(el) => (scrollRefs.current['officials'] = el)} className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'none' }}>
            {officials.map((o, i) => (
              <div key={i} onClick={() => setModalData({ list: officials, idx: i })} className="min-w-[400px] flex flex-col items-center cursor-pointer">
                <div className="w-full aspect-[3/3] bg-white border p-3 rounded-2xl overflow-hidden mb-3 shadow-sm">
                  <img src={o.img} className="w-full h-full object-cover rounded-lg" />
                </div>
                <p className="font-bold text-md text-center">{o.name}</p>
                <p className="text-sm text-slate-500">{o.wing}</p>
              </div>
            ))}
          </div>
          <button onClick={() => scrollByAmount('officials', 1)} className="absolute -right-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐳ</button>
        </section>

        {/* ROW 3: Winners (Static Grid) */}
        <section>
          <h2 className="text-2xl font-bold mb-8">First-Year Star Performers</h2>
          {topPerformersByWing.map((g, i) => (
            <div key={i} className="mb-8">
              <h3 className="font-bold mb-4 text-xl">{g.wing}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {g.winners.map((w, ii) => (
                  <div key={ii} onClick={() => setModalData({ list: g.winners, idx: ii })} className="p-4 bg-white border rounded-2xl flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition">
                    <img src={w.img} className="w-full aspect-[4/3] object-cover rounded-xl mb-3" />
                    <p className="font-bold text-center">{w.name}</p>
                    <p className="text-sm font-bold text-black">{w.roll}</p>
                      <p className="text-sm font-bold text-black">{w.rank}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ROW 4: Scrollable Glimpses */}
        <section className="relative">
          <h2 className="text-2xl font-bold mb-8">Ceremony & Prize Distribution Glimpses</h2>
          <button onClick={() => scrollByAmount('officials', -1)} className="absolute -left-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐸ</button>
          <button onClick={() => scrollByAmount('glimpses', -1)} className="absolute -left-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐸ</button>
          <div ref={(el) => (scrollRefs.current['glimpses'] = el)} className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'none' }}>
            {awardPhotos.map((p, i) => (
              <div key={i} onClick={() => setModalData({ list: awardPhotos, idx: i })} className="min-w-[400px] border p-3 bg-white aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                <img src={p.img} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
          <button onClick={() => scrollByAmount('glimpses', 1)} className="absolute -right-5 top-[50%] z-10 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">ᐳ</button>
        </section>
      </div>

      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setModalData(null)}>
          <button onClick={() => setModalData(null)} className="absolute top-5 right-5 text-white text-3xl"><FaTimes /></button>
          <img src={modalData.list[modalData.idx].img} className="max-h-[80vh] rounded-xl" />
        </div>
      )}
    </div>
  );
}