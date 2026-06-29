"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useGlobalAuth } from './AuthProvider';
import { cn } from './utils';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaUserShield, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function ProfileManager() {
    const { user, profile, loading, refreshProfile } = useGlobalAuth();
    const supabase = createClient();

    const [formData, setFormData] = useState({
        fullName: '',
        rollNumber: '',
        phoneNumber: ''
    });

    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Sync state with global profile when loaded
    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.full_name || '',
                rollNumber: profile.roll_number || '',
                phoneNumber: profile.phone_number || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setUpdating(true);
        setError(null);
        setSuccess(null);

        try {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.fullName.trim(),
                    roll_number: showRollNumber ? (formData.rollNumber.trim() || null) : null,
                    phone_number: formData.phoneNumber.trim() || null,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (updateError) throw updateError;

            await refreshProfile();
            setSuccess('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.message || 'Failed to update profile. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    const hasChanges = () => {
        if (!profile) return false;
        const rollNumberChanged = showRollNumber && (formData.rollNumber.trim() !== (profile.roll_number || ''));
        return (
            formData.fullName.trim() !== (profile.full_name || '') ||
            rollNumberChanged ||
            formData.phoneNumber.trim() !== (profile.phone_number || '')
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 gap-3 min-h-[300px]">
                <FaSpinner className="animate-spin text-rose-600 text-4xl" />
                <p className="text-slate-500 font-semibold">Loading profile details...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto my-8 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-center">
                <FaUserShield className="text-slate-300 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Authentication Required</h3>
                <p className="text-slate-500 text-sm mt-2 mb-6">Please log in to your account to view and manage your profile details.</p>
            </div>
        );
    }

    // Role styling map
    const roleColors = {
        super_admin: 'bg-red-50 text-red-700 border-red-200',
        pic: 'bg-purple-50 text-purple-700 border-purple-200',
        general_secretary: 'bg-blue-50 text-blue-700 border-blue-200',
        cell_secretary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        volunteer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        public: 'bg-slate-100 text-slate-700 border-slate-300'
    };

    const roleLabel = (role) => {
        return role ? role.replace('_', ' ').toUpperCase() : 'PUBLIC';
    };

    const userEmail = profile?.email || user?.email || "";
    const isIITP = userEmail.toLowerCase().endsWith("@iitp.ac.in");
    const showRollNumber = isIITP || (profile?.role && profile.role !== 'public');

    return (
        <section className="max-w-2xl mx-auto my-6">
            <div className="w-full border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col gap-6 text-slate-700 py-8 px-6 sm:px-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-5">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800">My Profile</h3>
                        <p className="text-sm text-slate-500 mt-1">Manage your public information and volunteer role.</p>
                    </div>
                    {profile?.role && (
                        <span className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-bold border",
                            roleColors[profile.role] || roleColors.public
                        )}>
                            {roleLabel(profile.role)}
                        </span>
                    )}
                </div>

                {/* Alerts */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3 text-sm">
                        <FaExclamationCircle className="flex-shrink-0 text-lg text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 text-sm">
                        <FaCheckCircle className="flex-shrink-0 text-lg text-emerald-600" />
                        <span>{success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2" htmlFor="fullName">
                            <FaUser className="text-slate-400" /> Full Name:
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                            required
                            disabled={updating}
                        />
                    </div>

                    {/* Roll Number (Optional) */}
                    {showRollNumber && (
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2" htmlFor="rollNumber">
                                <FaIdCard className="text-slate-400" /> Roll Number (Optional):
                            </label>
                            <input
                                id="rollNumber"
                                name="rollNumber"
                                type="text"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                placeholder="e.g. 2301ME45"
                                className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                                disabled={updating}
                            />
                        </div>
                    )}

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2" htmlFor="phoneNumber">
                            <FaPhone className="text-slate-400" /> Phone Number:
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="e.g. +91 9876543210"
                            className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                            disabled={updating}
                        />
                    </div>

                    {/* Email (Read Only) */}
                    <div className="flex flex-col gap-1 opacity-75">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2" htmlFor="email">
                            <FaEnvelope className="text-slate-400" /> Registered Email (Read-Only):
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={profile?.email || user?.email || ""}
                            className="border border-border py-2.5 px-4 text-slate-500 bg-slate-100 rounded-xl cursor-not-allowed"
                            disabled
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 border-t border-slate-100 pt-5">
                        {hasChanges() && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        fullName: profile.full_name || '',
                                        rollNumber: profile.roll_number || '',
                                        phoneNumber: profile.phone_number || ''
                                    });
                                    setError(null);
                                    setSuccess(null);
                                }}
                                disabled={updating}
                                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
                            >
                                Discard Changes
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={updating || !hasChanges()}
                            className={cn(
                                "px-6 py-2.5 text-white bg-primary rounded-xl font-semibold shadow-md transition-all hover:bg-amber-600 active:scale-98 flex items-center justify-center gap-2 cursor-pointer",
                                (updating || !hasChanges()) && "opacity-60 cursor-not-allowed hover:bg-primary"
                            )}
                        >
                            {updating && <FaSpinner className="animate-spin" />}
                            {updating ? 'Saving Changes...' : 'Save Profile'}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
}
