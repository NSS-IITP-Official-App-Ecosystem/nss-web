"use client"

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FaUser, FaEnvelope, FaBuilding, FaBook, FaCommentAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

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

    return (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg max-w-xl w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Collaboration Inquiry</h3>
            <p className="text-slate-500 text-sm mb-6">Submit your partnership proposal and our coordination cell will reach out to you.</p>

            {error && (
                <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
                    <FaExclamationCircle className="flex-shrink-0 text-lg text-red-500" />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 text-sm">
                    <FaCheckCircle className="flex-shrink-0 text-lg text-emerald-600" />
                    <span>{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-slate-700">
                {/* Contact Name */}
                <div className="flex flex-col gap-1">
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
                        className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1">
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
                        className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Organization Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2" htmlFor="organization">
                        <FaBuilding className="text-slate-400" /> Organization / Institution Name:
                    </label>
                    <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Clean Earth NGO"
                        className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Subject of Collaboration */}
                <div className="flex flex-col gap-1">
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
                        className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50"
                        disabled={loading}
                    />
                </div>

                {/* proposal message */}
                <div className="flex flex-col gap-1">
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
                        className="w-full border border-slate-200 outline-brand-blue py-3 px-4 bg-slate-50/50 rounded-2xl text-slate-800 font-medium transition-all focus:bg-white focus:border-brand-blue/50 resize-y"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-60 font-bold py-3.5 px-8 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                        {loading && <FaSpinner className="animate-spin text-base" />}
                        {loading ? 'Submitting Proposal...' : 'Submit Partnership Inquiry'}
                    </button>
                </div>
            </form>
        </div>
    );
}
