"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { 
    FaUser, 
    FaEnvelope, 
    FaBuilding, 
    FaBook, 
    FaCommentAlt, 
    FaSpinner, 
    FaCheckCircle, 
    FaExclamationCircle 
} from 'react-icons/fa';

export default function CollaborateForm() {
    const supabase = createClient();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, email, organization, message } = formData;
        if (!name.trim()) return "Please enter your name.";
        if (!email.trim() || !email.includes('@')) return "Please enter a valid email address.";
        if (!organization.trim()) return "Please enter your organization name.";
        if (!message.trim()) return "Please enter your proposal message.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const { error: insertError } = await supabase
                .from('collaborate_requests')
                .insert({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    organization: formData.organization.trim(),
                    subject: formData.subject.trim() || 'General Partnership',
                    message: formData.message.trim(),
                    status: 'pending'
                });

            if (insertError) throw insertError;

            setSuccess("Your collaboration proposal has been submitted successfully! Our team will review it and get back to you shortly.");
            setFormData({
                name: '',
                email: '',
                organization: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            console.error("Collaboration submit error:", err);
            setError(err.message || "Failed to submit request. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    // Form animation transitions
    const inputContainerVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl max-w-xl w-full hover:border-blue-500/20 transition-all duration-500 backdrop-blur-md"
        >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Collaboration Inquiry</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Submit your partnership proposal and our coordination cell will reach out to you.
            </p>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm"
                >
                    <FaExclamationCircle className="flex-shrink-0 text-lg text-red-500" />
                    <span>{error}</span>
                </motion.div>
            )}

            {success && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 text-sm"
                >
                    <FaCheckCircle className="flex-shrink-0 text-lg text-emerald-600" />
                    <span>{success}</span>
                </motion.div>
            )}

            <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4 text-slate-700"
                initial="hidden"
                animate="show"
                variants={{
                    show: {
                        transition: {
                            staggerChildren: 0.08
                        }
                    }
                }}
            >
                {/* Contact Name */}
                <motion.div variants={inputContainerVariants} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2" htmlFor="name">
                        <FaUser className="text-slate-400" /> Contact Name:
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Amit Sharma"
                        className="w-full border border-slate-200 outline-hidden focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all"
                        disabled={loading}
                        required
                    />
                </motion.div>

                {/* Email Address */}
                <motion.div variants={inputContainerVariants} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2" htmlFor="email">
                        <FaEnvelope className="text-slate-400" /> Email Address:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. amit@ngo-org.in"
                        className="w-full border border-slate-200 outline-hidden focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all"
                        disabled={loading}
                        required
                    />
                </motion.div>

                {/* Organization Name */}
                <motion.div variants={inputContainerVariants} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2" htmlFor="organization">
                        <FaBuilding className="text-slate-400" /> Organization Name:
                    </label>
                    <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Clean Earth NGO"
                        className="w-full border border-slate-200 outline-hidden focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all"
                        disabled={loading}
                        required
                    />
                </motion.div>

                {/* Subject of Collaboration */}
                <motion.div variants={inputContainerVariants} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2" htmlFor="subject">
                        <FaBook className="text-slate-400" /> Subject of Interest:
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Village Tree Plantation Drive"
                        className="w-full border border-slate-200 outline-hidden focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all"
                        disabled={loading}
                    />
                </motion.div>

                {/* proposal message */}
                <motion.div variants={inputContainerVariants} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2" htmlFor="message">
                        <FaCommentAlt className="text-slate-400" /> Collaboration Proposal:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe how your organization would like to partner with NSS IIT Patna (projects, dates, resources, impact target...)"
                        rows={4}
                        className="w-full border border-slate-200 outline-hidden focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all resize-y"
                        disabled={loading}
                        required
                    />
                </motion.div>

                {/* Submit button */}
                <motion.div variants={inputContainerVariants} className="pt-2">
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full text-white bg-brand-blue hover:bg-brand-blue/95 disabled:opacity-60 font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                        {loading && <FaSpinner className="animate-spin text-base" />}
                        {loading ? 'Submitting Proposal...' : 'Submit Partnership Inquiry'}
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}
