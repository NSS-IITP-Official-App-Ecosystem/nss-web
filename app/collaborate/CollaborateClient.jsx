"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHandshake, FaLeaf, FaGraduationCap, FaHeartbeat } from 'react-icons/fa';
import CollaborateForm from './CollaborateForm';

export default function CollaborateClient({ collaborators = [] }) {
    const pillars = [
        {
            title: "Active Volunteer Network",
            desc: "Deploy the skills and passion of over 100+ active students under supervised NSS coordination cells.",
            icon: <FaHandshake />,
            color: "blue",
            style: "border-blue-100 hover:border-blue-400 bg-blue-50/20 text-blue-600 shadow-blue-100/10"
        },
        {
            title: "Environmental Conservation",
            desc: "Partner with us for tree plantation campaigns, green energy setups, or waste management cycles in surrounding villages.",
            icon: <FaLeaf />,
            color: "emerald",
            style: "border-emerald-100 hover:border-emerald-400 bg-emerald-50/20 text-emerald-600 shadow-emerald-100/10"
        },
        {
            title: "Educational Initiatives",
            desc: "Support regular evening tutoring schools, computer literacy drives, or scholarship programs.",
            icon: <FaGraduationCap />,
            color: "indigo",
            style: "border-indigo-100 hover:border-indigo-400 bg-indigo-50/20 text-indigo-600 shadow-indigo-100/10"
        },
        {
            title: "Health & Blood Outreach",
            desc: "Co-organize large-scale health check-up drives, mental wellness programs, and seasonal blood collection operations.",
            icon: <FaHeartbeat />,
            color: "rose",
            style: "border-rose-100 hover:border-rose-400 bg-rose-50/20 text-rose-600 shadow-rose-100/10"
        }
    ];

    return (
        <div className="bg-[#FAF9F6] text-slate-800 pb-20">
            {/* Split Form & Pillars Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Information Grid Left */}
                    <div className="lg:col-span-6 space-y-8">
                        <div>
                            <span className="text-amber-500 font-extrabold uppercase text-xs tracking-wider font-mono">Why collaborate?</span>
                            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1.5 mb-4 leading-tight">
                                Empower Communities, Drive Sustainable Impact
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed font-light">
                                The National Service Scheme cell at IIT Patna is a vibrant hub of student volunteers, advisors, and mentors dedicated to civic duties. We build meaningful synergies with corporate sponsors, non-governmental organizations (NGOs), and municipal institutions to implement change.
                            </p>
                        </div>

                        {/* Interactive Pillar Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {pillars.map((pillar, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ 
                                        y: -5,
                                        scale: 1.02,
                                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.04)"
                                    }}
                                    className={`p-6 rounded-3xl border bg-white flex flex-col justify-between transition-all duration-300 shadow-xs ${pillar.style}`}
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 bg-current/10">
                                            {pillar.icon}
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-base leading-tight mb-2">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Form Right */}
                    <div className="lg:col-span-6 flex justify-center w-full lg:pl-6">
                        <CollaborateForm />
                    </div>

                </div>
            </section>

            {/* Collaborators showcase bottom */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 border-t border-slate-200/60 pt-16">
                <div className="text-center mb-12 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Our Trust Network</span>
                    <h3 className="text-2xl font-black text-slate-800 mt-2">Partners & Collaborating Entities</h3>
                    <p className="text-slate-500 text-sm mt-1">We extend our heartfelt gratitude to the institutions that make our operations scalable.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center items-center">
                    {collaborators.map((partner) => {
                        const content = (
                            <div className="flex flex-col items-center justify-center bg-white border border-slate-200/60 rounded-3xl p-6 aspect-square w-full max-w-[170px] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                <div className="relative w-full h-16 flex items-center justify-center">
                                    <Image 
                                        src={partner.logo_url}
                                        alt={partner.name || "Collaborator Logo"}
                                        width={120}
                                        height={70}
                                        className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    />
                                </div>
                                <span className="text-[10px] font-extrabold text-slate-400 mt-4 uppercase tracking-wide group-hover:text-brand-blue transition-colors">
                                    {partner.name}
                                </span>
                            </div>
                        );

                        if (partner.url) {
                            return (
                                <a 
                                    key={partner.id}
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-full max-w-[170px]"
                                >
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <div key={partner.id} className="group w-full max-w-[170px]">
                                {content}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
