'use client'
import { cn } from '@/components/utils'
import { createClient } from '@/utils/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react'


import { FaArrowRight, FaHeart, FaIdeal, FaInfo, FaLightbulb, FaPen, FaPenAlt, FaPenFancy } from "react-icons/fa";
import { FaSpinner } from 'react-icons/fa6';
import { FcIdea } from "react-icons/fc";

export function ThinkThankClient() {

    const [activeTab, setActiveTab] = useState('wall-of-gratitude'); // "wall-of-gratitude" | "share-idea" | "thank-us"

    return (
        <div>
            <HeroSection />


            <section className="my-16">
                <div className="flex flex-nowrap overflow-x-auto bg-slate-100 text-text py-2 px-2 rounded-xl gap-4 w-fit m-auto shadow-sm">
                    <motion.div className={cn("relative text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl flex flex-nowrap justify-center items-center gap-2 bg-transparent")} onClick={() => setActiveTab('wall-of-gratitude')}>
                        {activeTab == 'wall-of-gratitude' &&
                            <motion.div layoutId="active-tab-bg-pill" className="absolute bg-white shadow-sm rounded-xl inset-0"></motion.div>}
                        <FaHeart className='z-1' /><span className='z-1'>Wall Of Gratitude</span>
                    </motion.div>
                    <motion.div className={cn("relative text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl flex flex-nowrap justify-center items-center gap-2 bg-transparent")} onClick={() => setActiveTab('share-idea')}>
                        {activeTab == 'share-idea' &&
                            <motion.div layoutId="active-tab-bg-pill" className="absolute bg-white shadow-sm rounded-xl inset-0"></motion.div>}
                        <FaLightbulb className='z-1' /><span className='z-1'>Share Idea</span></motion.div>
                    <motion.div className={cn("relative text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl flex flex-nowrap justify-center items-center gap-2 bg-transparent")} onClick={() => setActiveTab('thank-us')}>
                        {activeTab == 'thank-us' &&
                            <motion.div layoutId="active-tab-bg-pill" className="absolute bg-white shadow-sm rounded-xl inset-0"></motion.div>}
                        <FaPenFancy className='z-1' /><span className='z-1'>Thank Us</span></motion.div>
                </div>

                <AnimatePresence>
                    {activeTab == 'share-idea' && <ShareIdeaSection />}
                    {activeTab == 'thank-us' && <ThanksVolunteerSection />}
                    {activeTab == 'wall-of-gratitude' && <WallOfGratitude />}
                </AnimatePresence>
            </section>
        </div>
    )
}

function HeroSection() {
    return (
        <section className="p-10 bg-linear-to-br from-brand-blue to-blue-950">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-10 basis-1/2 justify-center items-center lg:items-start">
                    <div>
                        <span className="text-xl md:text-2xl font-serif lowercase text-slate-400 italic">We Think, We Thank</span>
                        <div className="text-white text-6xl md:text-7xl flex flex-wrap uppercase font-bold font-sans"><span className="bg-linear-to-br from-blue-700 to-white bg-clip-text text-transparent">Ideas</span> <span>{' '} &  {' '} </span><span className="bg-linear-to-br from-orange-800 to-orange-300 bg-clip-text text-transparent">aprreciation</span></div>
                    </div>
                    <p className="text-slate-300 text-lg font-sans">A dynamic environment designed to turn creative thoughts into actionable community projects, and provide a home to celebrate the inspiring stories of volunteer service.</p>
                    <div className="flex flex-row flex-nowrap justify-start gap-5">
                        <button className="transition-all cursor-pointer bg-white rounded-xl hover:scale-105 py-3 px-4 text-lg font-semibold text-text">
                            Explore Wall of Gratitude
                        </button>
                        <button className="transition-all cursor-pointer bg-slate-400/20 rounded-xl hover:scale-105 py-3 px-4 text-lg font-semibold text-white border-2 border-slate-400">
                            Share Ideas
                        </button>
                    </div>
                </div>
                <div className="basis-1/2 flex flex-row justify-center gap-5 items-center">

                    <div className="px-4 py-4 flex flex-col gap-5 justify-start group border border-white/10 rounded-xl hover:scale-110 transition-all bg-white/10 backdrop-blur-2xl cursor-pointer hover:shadow-2xl hover:shadow-blue-500">
                        <FaLightbulb className="text-brand-blue bg-brand-blue/20 p-3 rounded-xl text-5xl self-start transition-all group-hover:text-blue-600" />
                        <h3 className="text-xl text-white/90 font-sans uppercase">Think</h3>
                        <p className="text-sm text-white/90 font-sans">Share Suggestion, Wing Feedback, and constructive community developement startegies.</p>
                        <button className="text-xs text-blue-500 flex flex-row flex-nowrap justify-start items-center cursor-pointer uppercase font-sans transition-all"><span>Share Idea</span><FaArrowRight className="ms-2 text-sm group-hover:translate-x-0.5" /></button>
                    </div>

                    <div className="px-4 py-4 flex flex-col gap-5 justify-start group border border-white/10 rounded-xl hover:scale-110 transition-all bg-rose-500/10 backdrop-blur-2xl cursor-pointer hover:shadow-2xl hover:shadow-rose-500">
                        <FaHeart className="text-rose-300 bg-rose-300/20 p-3 rounded-xl text-5xl self-start transition-all group-hover:text-rose-600" />
                        <h3 className="text-xl text-white/90 font-sans uppercase">Thank</h3>
                        <p className="text-sm text-white/90 font-sans">Share Suggestion, Wing Feedback, and constructive community developement startegies.</p>
                        <button className="text-xs text-rose-500 flex flex-row flex-nowrap justify-start items-center cursor-pointer uppercase font-sans transition-all"><span>Share Idea</span><FaArrowRight className="ms-2 text-sm group-hover:translate-x-0.5" /></button>
                    </div>


                </div>
            </div>
        </section>
    )
}

function WallOfGratitude({ approvedThanks }) {
    return (
        <motion.div
            initial={{
                opacity: 0, y: 15
            }}
            animate={{
                opacity: 1, y: 0
            }}
            exit={{
                opacity: 0, y: -15
            }}
            transition={{
                duration: 0.2
            }} className="rounded-2xl m-auto my-10 flex flex-col gap-5 items-center justify-center p-10 border border-border shadow-sm max-w-4xl">
            <motion.div
                animate={{
                    translateY: [5, 0, 5],
                    animationDirection: "reverse",
                    transition: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                }}
            >
                <FaHeart className="text-5xl text-rose-500 bg-rose-500/20 p-4 rounded-2xl m-auto" />
            </motion.div>
            <h2>Comming soon...</h2>
        </motion.div>
    )
}

function ShareIdeaSection() {
    const supabase = createClient();

    const AREA_OF_SUGGESTIONS = ['General Suggestion', 'Teaching and Teachnical Wing', 'NSS Web Portal'];

    const [formData, setFormData] = useState({
        areaOfSuggestion: AREA_OF_SUGGESTIONS[0],
        name: '',
        email: '',
        msg: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        let val = e.target.value;

        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: val
            }
        });
    }

    /**
     *  id uuid default gen_random_uuid() primary key,
    sender_name text default 'Anonymous',
    sender_email text,
    category text not null, -- e.g. 'Teaching', 'Environment', 'Chetna', 'Portal', 'General'
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('suggestions').insert({
            'sender_name': formData.name,
            'category': formData.areaOfSuggestion,
            'sender_email': formData.email,
            'message': formData.msg
        });

        if (error) {
            setError("Something Went Wrong. Retry After Some Time...");
        } else {
            setFormData((prev) => ({
                areaOfSuggestion: AREA_OF_SUGGESTIONS[0],
                name: '',
                email: '',
                msg: ''
            }));

            setSuccess('Thanks for Your Valuable Suggestion. We always try to improve us.');
        }

        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 5 * 1000);
        setLoading(false);
    }

    return (
        <motion.section initial={{
            opacity: 0, y: 15
        }}
            animate={{
                opacity: 1, y: 0
            }}
            exit={{
                opacity: 0, y: -15
            }}
            transition={{
                duration: 0.2
            }} className="my-10">
            <div className="max-w-2xl p-8 bg-white shadow-sm m-auto rounded-2xl flex flex-col gap-5 justify-center">
                <motion.div
                    animate={{
                        translateY: [5, 0, 5],
                        animationDirection: "reverse",
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }
                    }}
                >
                    <FaLightbulb className="text-5xl text-primary bg-primary/20 p-4 rounded-2xl m-auto" />
                </motion.div>
                <p className="text-2xl font-sans font-bold text-center">Share Your Idea</p>
                <p className="text-slate-500 text-sm text-center max-w-xl -mt-3 mb-6">Have ideas to improve our programs, wings, or portal? Submit constructive suggestions. These are privately kept with coordinators.</p>

                <div className={cn("py-3 text-sm px-3 border rounded-xl hidden text-green-600 bg-green-600/20 border-green-700 flex-row flex-nowrap", success && 'flex')}>
                    <FaInfo className="text-lg me-3 p-1 rounded-full bg-green-600/30" />
                    <span>{success}</span>
                </div>

                <div className={cn("py-3 text-sm px-3 border rounded-xl hidden text-red-600 bg-red-600/20 border-red-700 flex-row flex-nowrap", error && 'flex')}>
                    <FaInfo className="text-lg me-3 p-1 rounded-full bg-red-600/30" />
                    <span>{error}</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center">
                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="area-of-suggestion" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Area of Suggestion</label>
                        <select name="areaOfSuggestion" onChange={handleChange} value={formData.areaOfSuggestion} id="area-of-suggestion" className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary">
                            {AREA_OF_SUGGESTIONS.map((item, index) => {
                                return <option value={item} key={index}>{item}</option>
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="name" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Your Name</label>
                        <input name="name" onChange={handleChange} value={formData.name} required type="text" id="name" className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary" placeholder="eg: Rohan" />
                    </div>

                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="area-of-suggestion" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Your Email (Optional)</label>
                        <input name="email" onChange={handleChange} value={formData.email} id="email" type="email" className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary" placeholder="eg: example@mail.com" />
                    </div>

                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="msg" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Your Idea/ Description</label>
                        <textarea name="msg" onChange={handleChange} value={formData.msg} id="msg" cols={8} className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary" placeholder="eg: example@mail.com" />
                    </div>

                    <button disabled={loading} type="submit" className="flex-1 py-2 px-3 text-center bg-blue-700 hover:bg-blue-800 transition-all rounded text-white cursor-pointer flex flex-row flex-nowrap gap-3 justify-center">
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

    const handleChange = (e) => {
        let { name, value } = e.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    /**
     *  id uuid default gen_random_uuid() primary key,
    sender_name text not null default 'Anonymous',
    sender_relationship text not null default 'Other', -- 'Student', 'Volunteer', 'Faculty Member', 'Beneficiary', 'Other'
    recipient_name text not null, -- Who is being thanked
    message text not null,
    is_approved boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('thanks').insert({
            'sender_name': formData.senderName.trim(),
            'recipient_name': formData.receipentName.trim(),
            'sender_relationship': formData.senderRelationship,
            'message': formData.msg.trim()
        });

        if (error) {
            setError("Something Went Wrong. Retry After Some Time...");
        } else {
            setFormData((prev) => ({
                receipentName: '',
                senderName: '',
                senderRelationship: SENDER_RELATIONSHIP[0],
                msg: ''
            }));

            setSuccess('We have Received Your Aprreceation. We NSS Team are happy to hear.');
        }

        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 5 * 1000);
        setLoading(false);
    }

    return (
        <motion.section initial={{
            opacity: 0, y: 15
        }}
            animate={{
                opacity: 1, y: 0
            }}
            exit={{
                opacity: 0, y: -15
            }}
            transition={{
                duration: 0.2
            }} className="my-10">
            <div className="max-w-2xl p-8 bg-white shadow-sm m-auto rounded-2xl flex flex-col gap-5 justify-center">
                <motion.div
                    animate={{
                        translateY: [5, 0, 5],
                        animationDirection: "reverse",
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }
                    }}
                >
                    <FaHeart className="text-5xl text-rose-500 bg-rose-500/20 p-4 rounded-2xl m-auto" />
                </motion.div>
                <p className="text-2xl font-sans font-bold text-center">Thank a Volunteer</p>
                <p className="text-slate-500 text-sm text-center max-w-xl -mt-3 mb-6">Acknowledge a volunteer's efforts, a specific wing, or coordinators who made a difference in your experience.</p>

                <div className={cn("py-3 text-sm px-3 border rounded-xl hidden text-green-600 bg-green-600/20 border-green-700 flex-row flex-nowrap", success && 'flex')}>
                    <FaInfo className="text-lg me-3 p-1 rounded-full bg-green-600/30" />
                    <span>{success}</span>
                </div>

                <div className={cn("py-3 text-sm px-3 border rounded-xl hidden text-red-600 bg-red-600/20 border-red-700 flex-row flex-nowrap", error && 'flex')}>
                    <FaInfo className="text-lg me-3 p-1 rounded-full bg-red-600/30" />
                    <span>{error}</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center">
                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="sender-relationship" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Your's Role</label>
                        <select name="senderRelationship" onChange={handleChange} value={formData.senderRelationship} id="sender-relationship" className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary">
                            {SENDER_RELATIONSHIP.map((item, index) => {
                                return <option value={item} key={index}>{item}</option>
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="sender-name" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Your Name</label>
                        <input name="senderName" onChange={handleChange} value={formData.senderName} required type="text" id="sender-name" className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary" placeholder="eg: Rohan" />
                    </div>

                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="receipent-name" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Whom You are Sending</label>
                        <input name="receipentName" onChange={handleChange} value={formData.receipentName} id="receipent-name" type="text" className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary" placeholder="eg: Amit Sharma, Teaching and Teachnical Wing, NSS Team, Dash Dash" />
                    </div>

                    <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="msg" className="uppercase font-sans flex-1 text-text text-xs font-semibold">Message of gratitude</label>
                        <textarea name="msg" onChange={handleChange} value={formData.msg} id="msg" cols={8} className="flex-1 py-2 px-3 focus-within:outline-2 rounded border border-slate-200 shadow-xs bg-slate-50 outline-primary" placeholder="eg: example@mail.com" />
                    </div>

                    <button disabled={loading} type="submit" className="flex-1 py-2 px-3 text-center bg-blue-700 hover:bg-blue-800 transition-all rounded text-white cursor-pointer flex flex-row flex-nowrap gap-3 justify-center">
                        {loading && <FaSpinner className="animate-spin text-xl text-white" />}
                        <span>Submit Note of Gratitude</span>
                    </button>
                </form>
            </div>
        </motion.section>
    )
}