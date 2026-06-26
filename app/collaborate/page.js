import { createClient } from '@/utils/supabase/server';
import CollaborateForm from './CollaborateForm';
import Image from 'next/image';
import { FaHandshake, FaGraduationCap, FaLeaf, FaHeartbeat } from 'react-icons/fa';

export default async function CollaboratePage() {
    let collaborators = [];

    // Fetch partners from database
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('collaborators')
            .select('id, name, logo_url, url')
            .order('name');

        if (!error && data) {
            collaborators = data;
        }
    } catch (err) {
        console.error("Failed to fetch collaborators, falling back to static list:", err);
    }

    // Resilient fallback seed data
    if (collaborators.length === 0) {
        collaborators = [
            { id: 'c1', name: 'CLP', logo_url: '/collaborators/CLP.png' },
            { id: 'c2', name: 'LCCWA', logo_url: '/collaborators/lccwa.png' },
            { id: 'c3', name: 'Udaan', logo_url: '/collaborators/udaan.png' },
            { id: 'c4', name: 'Vidya', logo_url: '/collaborators/vidya.png' }
        ];
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-20">
            {/* Banner Section */}
            <section className="py-20 flex justify-center items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--brand-blue), #020f26)" }}>
                {/* Gold radial glow highlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.12),_transparent)] pointer-events-none" />
                <div className="flex items-center flex-col px-4 z-10 text-center max-w-3xl">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                        <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase font-mono">
                            Join Hands with Us
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6 uppercase font-sans">
                        Partner & <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100 bg-clip-text text-transparent">Collaborate</span>
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
                        Connect with NSS IIT Patna to sponsor projects, host social awareness camps, or lead impactful community development programs.
                    </p>
                </div>
            </section>

            {/* Split Form & Information Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Information Grid Left */}
                    <div className="lg:col-span-6 space-y-8 lg:pr-6">
                        <div>
                            <span className="text-amber-500 font-extrabold uppercase text-xs tracking-wider font-mono">Why collaborate?</span>
                            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1.5 mb-4 leading-tight">
                                Empower Communities, Drive Sustainable Impact
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed">
                                The National Service Scheme cell at IIT Patna is a vibrant hub of student volunteers, advisors, and mentors dedicated to civic duties. We build meaningful synergies with corporate sponsors, non-governmental organizations (NGOs), and municipal institutions to implement change.
                            </p>
                        </div>

                        {/* Pillar items */}
                        <div className="space-y-6">
                            
                            {/* Pillar 1 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-amber-50 border border-amber-100 text-amber-500 rounded-2xl flex items-center justify-center text-xl shadow-xs">
                                    <FaHandshake />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">Active Volunteer Network</h4>
                                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                                        Deploy the skills and passion of over 100+ active students under supervised NSS coordination cells.
                                    </p>
                                </div>
                            </div>

                            {/* Pillar 2 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center text-xl shadow-xs">
                                    <FaLeaf />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">Environmental Conservation</h4>
                                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                                        Partner with us for tree plantation campaigns, green energy setups, or waste management cycles in surrounding villages.
                                    </p>
                                </div>
                            </div>

                            {/* Pillar 3 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-500 rounded-2xl flex items-center justify-center text-xl shadow-xs">
                                    <FaGraduationCap />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">Educational Initiatives</h4>
                                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                                        Support regular evening tutoring schools, computer literacy drives, or scholarship programs.
                                    </p>
                                </div>
                            </div>

                            {/* Pillar 4 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl flex items-center justify-center text-xl shadow-xs">
                                    <FaHeartbeat />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">Health & Blood Outreach</h4>
                                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                                        Co-organize large-scale health check-up drives, mental wellness programs, and seasonal blood collection operations.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Submit Form Right */}
                    <div className="lg:col-span-6 flex justify-center w-full">
                        <CollaborateForm />
                    </div>

                </div>
            </section>

            {/* Collaborators showcase bottom */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24 border-t border-slate-200/60 pt-16">
                <div className="text-center mb-10 max-w-xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Our Trust Network</span>
                    <h3 className="text-2xl font-black text-slate-800 mt-2">Partners & Collaborating Entities</h3>
                    <p className="text-slate-500 text-sm mt-1">We extend our heartfelt gratitude to the institutions that make our operations scalable.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center items-center">
                    {collaborators.map((partner) => {
                        const content = (
                            <div className="flex flex-col items-center justify-center bg-white/70 border border-slate-200/60 rounded-3xl p-6 sm:p-8 aspect-square w-full max-w-[180px] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                                    <Image 
                                        src={partner.logo_url}
                                        alt={partner.name || "Collaborator Logo"}
                                        width={140}
                                        height={80}
                                        className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    />
                                </div>
                                <span className="text-xs font-extrabold text-slate-400 mt-4 uppercase tracking-wide group-hover:text-brand-blue transition-colors">
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
                                    className="group w-full max-w-[180px]"
                                >
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <div key={partner.id} className="group w-full max-w-[180px]">
                                {content}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
