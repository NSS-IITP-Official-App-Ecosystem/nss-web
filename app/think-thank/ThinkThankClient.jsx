'use client'

import { cn } from '@/components/utils'
import { createClient } from '@/utils/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react'
import { 
  FaArrowRight, 
  FaHeart, 
  FaInfo, 
  FaLightbulb, 
  FaPenFancy 
} from "react-icons/fa";
import { FaSpinner } from 'react-icons/fa6';
import { HandleShareIdeaSubmit, HandleThanksSubmit } from '../action';
import { Turnstile } from '@marsidev/react-turnstile'

export function ThinkThankClient() {
    const [activeTab, setActiveTab] = useState('wall-of-gratitude'); // "wall-of-gratitude" | "share-idea" | "thank-us"

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <HeroSection setActiveTab={setActiveTab} />

            <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
                {/* Tabs Switcher */}
                <div className="flex justify-center">
                    <div id="tabs" className="flex flex-nowrap overflow-x-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 shadow-xs gap-2 w-fit mx-auto">
                        <button
                            onClick={() => setActiveTab('wall-of-gratitude')}
                            className={`relative px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                                activeTab === 'wall-of-gratitude'
                                    ? 'text-[#00256d]'
                                    : 'text-slate-500 hover:text-[#00256d]'
                            }`}
                        >
                            {activeTab === 'wall-of-gratitude' && (
                                <motion.div
                                    layoutId="active-tab-bg-pill"
                                    className="absolute inset-0 bg-white shadow-sm rounded-xl border border-slate-200/20"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <FaHeart className="w-4 h-4 z-10 text-rose-500" />
                            <span className="z-10">Wall Of Gratitude</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('share-idea')}
                            className={`relative px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                                activeTab === 'share-idea'
                                    ? 'text-[#00256d]'
                                    : 'text-slate-500 hover:text-[#00256d]'
                            }`}
                        >
                            {activeTab === 'share-idea' && (
                                <motion.div
                                    layoutId="active-tab-bg-pill"
                                    className="absolute inset-0 bg-white shadow-sm rounded-xl border border-slate-200/20"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <FaLightbulb className="w-4 h-4 z-10 text-amber-500" />
                            <span className="z-10">Share Idea</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('thank-us')}
                            className={`relative px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                                activeTab === 'thank-us'
                                    ? 'text-[#00256d]'
                                    : 'text-slate-500 hover:text-[#00256d]'
                            }`}
                        >
                            {activeTab === 'thank-us' && (
                                <motion.div
                                    layoutId="active-tab-bg-pill"
                                    className="absolute inset-0 bg-white shadow-sm rounded-xl border border-slate-200/20"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <FaPenFancy className="w-4 h-4 z-10 text-blue-500" />
                            <span className="z-10">Thank Us</span>
                        </button>
                    </div>
                </div>

                <div className="mt-12">
                    <AnimatePresence mode="wait">
                        {activeTab === 'share-idea' && <ShareIdeaSection key="share-idea" />}
                        {activeTab === 'thank-us' && <ThanksVolunteerSection key="thank-us" />}
                        {activeTab === 'wall-of-gratitude' && <WallOfGratitude key="wall-of-gratitude" />}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    )
}

function HeroSection({ setActiveTab }) {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-[#00256d] to-[#001540] py-20 px-6 sm:px-12 text-white shadow-md">
            {/* Ambient background glows */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-amber-500 blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex flex-col gap-8 basis-1/2 justify-center items-center lg:items-start text-center lg:text-left">
                    <div className="space-y-4">
                        <span className="text-lg md:text-xl font-serif lowercase text-slate-300 italic tracking-wider">
                            We Think, We Thank
                        </span>
                        <h1 className="text-white text-5xl md:text-6xl flex flex-wrap justify-center lg:justify-start gap-x-3 uppercase font-black tracking-tight leading-none">
                            <span className="bg-linear-to-r from-blue-400 to-white bg-clip-text text-transparent">Ideas</span>
                            <span>&</span>
                            <span className="bg-linear-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Appreciation</span>
                        </h1>
                    </div>
                    
                    <p className="text-slate-300 text-base sm:text-lg font-normal max-w-xl leading-relaxed">
                        A dynamic environment designed to turn creative thoughts into actionable community projects, and provide a home to celebrate the inspiring stories of volunteer service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button 
                            onClick={() => {
                                setActiveTab('wall-of-gratitude');
                                document.getElementById('tabs').scrollIntoView();
                            }} 
                            className="cursor-pointer bg-white hover:bg-slate-100 text-[#00256d] font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2"
                        >
                            Explore Wall of Gratitude
                        </button>
                        <button 
                            onClick={() => {
                                setActiveTab('share-idea');
                                document.getElementById('tabs').scrollIntoView();
                            }} 
                            className="cursor-pointer bg-transparent hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-xl border border-white/30 hover:border-white transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2"
                        >
                            Share Ideas
                        </button>
                    </div>
                </div>

                {/* Side interactive cards */}
                <div className="basis-1/2 flex flex-col sm:flex-row justify-center gap-6 items-center w-full">
                    <div 
                        onClick={() => {
                            setActiveTab('share-idea');
                            document.getElementById('tabs').scrollIntoView();
                        }}
                        className="px-6 py-6 flex flex-col gap-4 justify-start group border border-white/10 rounded-2xl hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/10 w-full sm:basis-1/2"
                    >
                        <FaLightbulb className="text-amber-400 bg-amber-400/20 p-3.5 rounded-2xl text-5xl self-start transition-all group-hover:scale-110" />
                        <h3 className="text-lg text-white font-extrabold uppercase tracking-wider">Think</h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                            Share suggestions, wing feedback, and constructive community development strategies.
                        </p>
                        <span className="text-xs text-amber-400 flex items-center justify-start gap-1.5 uppercase font-bold tracking-wider mt-2">
                            <span>Share Idea</span>
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>

                    <div 
                        onClick={() => {
                            setActiveTab('thank-us');
                            document.getElementById('tabs').scrollIntoView();
                        }}
                        className="px-6 py-6 flex flex-col gap-4 justify-start group border border-white/10 rounded-2xl hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 hover:shadow-xl hover:shadow-rose-500/10 w-full sm:basis-1/2"
                    >
                        <FaHeart className="text-rose-400 bg-rose-400/20 p-3.5 rounded-2xl text-5xl self-start transition-all group-hover:scale-110" />
                        <h3 className="text-lg text-white font-extrabold uppercase tracking-wider">Thank</h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                            Acknowledge a volunteer's hard work, specific cells, or coordinators who made a difference.
                        </p>
                        <span className="text-xs text-rose-400 flex items-center justify-start gap-1.5 uppercase font-bold tracking-wider mt-2">
                            <span>Thank Us</span>
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

function WallOfGratitude() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto my-12 bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 text-center shadow-xs space-y-6"
        >
            <motion.div
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto text-rose-500 text-4xl shadow-inner border border-rose-500/10"
            >
                <FaHeart />
            </motion.div>
            
            <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Wall Of Gratitude</h3>
                <p className="text-amber-500 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full w-fit mx-auto">
                    Coming Soon
                </p>
            </div>

            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                This space will display all approved public thank-you letters, testimonials, and notes of appreciation shared by students, beneficiaries, and peers. Expressing gratitude strengthens our community bond.
            </p>
            
            <div className="pt-4 border-t border-slate-100 flex justify-center gap-6 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span> Celebrate Service</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span> Shared Gratitude</span>
            </div>
        </motion.div>
    );
}

function ShareIdeaSection() {
    const supabase = createClient();

    const AREA_OF_SUGGESTIONS = ['General Suggestion', 'Teaching and Technical Wing', 'NSS Web Portal'];

    const [formData, setFormData] = useState({
        areaOfSuggestion: AREA_OF_SUGGESTIONS[0],
        name: '',
        email: '',
        msg: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        let val = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: val
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(!token) {
            setError("Please Complete Human Verification");
            setLoading(false);
            setTimeout(()=>setError(null), 5 * 1000);
            return;
        }

        formData['token'] = token;
        const { error } = await HandleShareIdeaSubmit(formData);

        if (error) {
            setError("Something Went Wrong. Retry After Some Time...");
        } else {
            setFormData({
                areaOfSuggestion: AREA_OF_SUGGESTIONS[0],
                name: '',
                email: '',
                msg: ''
            });

            setSuccess('Thanks for Your Valuable Suggestion. We always try to improve.');
        }

        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 5 * 1000);
        setLoading(false);
    }

    return (
        <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }} 
            className="my-10"
        >
            <div className="max-w-2xl p-6 md:p-8 bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 m-auto rounded-3xl flex flex-col gap-6 justify-center">
                <motion.div
                    animate={{
                        translateY: [5, 0, 5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto text-amber-500 text-3xl border border-amber-500/10"
                >
                    <FaLightbulb />
                </motion.div>
                
                <div className="text-center space-y-1">
                    <p className="text-2xl font-black text-slate-800 tracking-tight">Share Your Idea</p>
                    <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                        Have ideas to improve our programs, wings, or portal? Submit constructive suggestions. These are privately kept with coordinators.
                    </p>
                </div>

                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="py-3 px-4 text-sm border rounded-xl text-emerald-700 bg-emerald-50 border-emerald-200 flex items-center gap-3 overflow-hidden"
                        >
                            <FaInfo className="text-base shrink-0 p-0.5 rounded-full bg-emerald-100 text-emerald-800" />
                            <span className="font-semibold">{success}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="py-3 px-4 text-sm border rounded-xl text-rose-700 bg-rose-50 border-rose-200 flex items-center gap-3 overflow-hidden"
                        >
                            <FaInfo className="text-base shrink-0 p-0.5 rounded-full bg-rose-100 text-rose-800" />
                            <span className="font-semibold">{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="area-of-suggestion" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Area of Suggestion</label>
                        <select 
                            name="areaOfSuggestion" 
                            onChange={handleChange} 
                            value={formData.areaOfSuggestion} 
                            id="area-of-suggestion" 
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-semibold text-slate-700"
                        >
                            {AREA_OF_SUGGESTIONS.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Your Name</label>
                        <input 
                            name="name" 
                            onChange={handleChange} 
                            value={formData.name} 
                            required 
                            type="text" 
                            id="name" 
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-medium text-slate-700" 
                            placeholder="eg: Rohan" 
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Your Email (Optional)</label>
                        <input 
                            name="email" 
                            onChange={handleChange} 
                            value={formData.email} 
                            id="email" 
                            type="email" 
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-medium text-slate-700" 
                            placeholder="eg: example@mail.com" 
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="msg" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Your Idea / Description</label>
                        <textarea 
                            name="msg" 
                            onChange={handleChange} 
                            value={formData.msg} 
                            required
                            id="msg" 
                            rows={5}
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-medium text-slate-700 min-h-[120px]" 
                            placeholder="Describe your idea or suggestion in detail..." 
                        />
                    </div>

                    {/* Turnstile Widget */}
                    <div className="flex justify-center my-2">
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                            onSuccess={(token) => setToken(token)}
                            onExpire={() => setToken(null)}
                            onError={() => setToken(null)}
                        />
                    </div>

                    <button 
                        disabled={loading} 
                        type="submit" 
                        className="w-full py-3.5 px-6 font-bold text-center bg-[#00256d] hover:bg-blue-900 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-white shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-3"
                    >
                        {loading && <FaSpinner className="animate-spin text-xl text-white" />}
                        <span>Submit Suggestion</span>
                    </button>
                </form>
            </div>
        </motion.section>
    )
}

function ThanksVolunteerSection() {
    const supabase = createClient();

    const SENDER_RELATIONSHIP = ['Student', 'Volunteer', 'Faculty Member', 'Beneficiary', 'Other'];

    const [formData, setFormData] = useState({
        receipentName: '',
        senderName: '',
        senderRelationship: SENDER_RELATIONSHIP[0],
        msg: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(!token) {
            setError("Please Complete Human Verification");
            setLoading(false);
            setTimeout(()=>setError(null), 5 * 1000);
            return;
        }

        formData['token'] = token;
        const { error } = await HandleThanksSubmit(formData);

        if (error) {
            setError("Something Went Wrong. Retry After Some Time...");
        } else {
            setFormData({
                receipentName: '',
                senderName: '',
                senderRelationship: SENDER_RELATIONSHIP[0],
                msg: ''
            });

            setSuccess('We have Received Your Appreciation. The NSS Team is happy to hear!');
        }

        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 5 * 1000);
        setLoading(false);
    }

    return (
        <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }} 
            className="my-10"
        >
            <div className="max-w-2xl p-6 md:p-8 bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 m-auto rounded-3xl flex flex-col gap-6 justify-center">
                <motion.div
                    animate={{
                        translateY: [5, 0, 5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto text-rose-500 text-3xl border border-rose-500/10"
                >
                    <FaHeart />
                </motion.div>
                
                <div className="text-center space-y-1">
                    <p className="text-2xl font-black text-slate-800 tracking-tight">Thank a Volunteer</p>
                    <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                        Acknowledge a volunteer's efforts, a specific wing, or coordinators who made a difference in your experience.
                    </p>
                </div>

                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="py-3 px-4 text-sm border rounded-xl text-emerald-700 bg-emerald-50 border-emerald-200 flex items-center gap-3 overflow-hidden"
                        >
                            <FaInfo className="text-base shrink-0 p-0.5 rounded-full bg-emerald-100 text-emerald-800" />
                            <span className="font-semibold">{success}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="py-3 px-4 text-sm border rounded-xl text-rose-700 bg-rose-50 border-rose-200 flex items-center gap-3 overflow-hidden"
                        >
                            <FaInfo className="text-base shrink-0 p-0.5 rounded-full bg-rose-100 text-rose-800" />
                            <span className="font-semibold">{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="sender-relationship" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Your Role</label>
                        <select 
                            name="senderRelationship" 
                            onChange={handleChange} 
                            value={formData.senderRelationship} 
                            id="sender-relationship" 
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-semibold text-slate-700"
                        >
                            {SENDER_RELATIONSHIP.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="sender-name" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Your Name</label>
                        <input 
                            name="senderName" 
                            onChange={handleChange} 
                            value={formData.senderName} 
                            required 
                            type="text" 
                            id="sender-name" 
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-medium text-slate-700" 
                            placeholder="eg: Rohan" 
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="receipent-name" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Whom You are Thanking</label>
                        <input 
                            name="receipentName" 
                            onChange={handleChange} 
                            value={formData.receipentName} 
                            required
                            id="receipent-name" 
                            type="text" 
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-medium text-slate-700" 
                            placeholder="eg: Amit Sharma, Teaching Wing coordinator, Chetna unit..." 
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="msg" className="uppercase font-sans text-slate-600 text-xs font-bold tracking-wider">Message of gratitude</label>
                        <textarea 
                            name="msg" 
                            onChange={handleChange} 
                            value={formData.msg} 
                            required
                            id="msg" 
                            rows={5}
                            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00256d]/15 focus:border-[#00256d] bg-white transition-all text-sm outline-hidden font-medium text-slate-700 min-h-[120px]" 
                            placeholder="Write your note of gratitude..." 
                        />
                    </div>

                    {/* Turnstile Widget */}
                    <div className="flex justify-center my-2">
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                            onSuccess={(token) => setToken(token)}
                            onExpire={() => setToken(null)}
                            onError={() => setToken(null)}
                        />
                    </div>

                    <button 
                        disabled={loading} 
                        type="submit" 
                        className="w-full py-3.5 px-6 font-bold text-center bg-[#00256d] hover:bg-blue-900 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-white shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-3"
                    >
                        {loading && <FaSpinner className="animate-spin text-xl text-white" />}
                        <span>Submit Note of Gratitude</span>
                    </button>
                </form>
            </div>
        </motion.section>
    )
}