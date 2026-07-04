"use client"
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { cn } from './utils';
import { FaEye, FaEyeSlash, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Turnstile } from '@marsidev/react-turnstile'
import { handleSignUp, handleSignIn } from '@/app/action'

export function SignUpForm() {
    const [formData, setFormData] = useState({
        'signup-fullname': '',
        'signup-email': '',
        'signup-password': '',
        'signup-password-confirm': ''
    });

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const supabase = createClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const checkValidity = () => {
        const email = formData['signup-email'].trim();
        const fullname = formData['signup-fullname'].trim();
        const password = formData['signup-password'];
        const confirmPassword = formData['signup-password-confirm'];

        if (!fullname || !email || !password || !confirmPassword) return false;
        if (password !== confirmPassword) return false;
        if (password.length < 6) return false; // Supabase password minimum length is 6
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkValidity()) return;

        if (!token) {
            setError('Please verify you are a human.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const fullname = formData['signup-fullname'].trim();
            const email = formData['signup-email'].trim();
            const password = formData['signup-password'];

            const result = await handleSignUp({
                fullname,
                email,
                password,
                token
            });

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success);
                
                if (result.session) {
                    await supabase.auth.setSession(result.session);
                    window.location.reload();
                }

                setFormData({
                    'signup-fullname': '',
                    'signup-email': '',
                    'signup-password': '',
                    'signup-password-confirm': ''
                });
                setToken(null);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isValid = checkValidity();

    return (
        <section className="max-w-2xl mx-auto my-5">
            <form onSubmit={handleSubmit} className="w-full border border-border rounded-2xl bg-white shadow flex flex-col gap-6 text-slate-700 py-10 px-8">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Create an Account</h3>
                    <p className="text-sm text-slate-500 mt-1">Join as a volunteer to help save lives.</p>
                </div>

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

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="signup-fullname">Full Name:</label>
                    <input
                        value={formData['signup-fullname']}
                        onChange={handleChange}
                        name="signup-fullname"
                        placeholder="John Doe"
                        className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                        id="signup-fullname"
                        type="text"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="signup-email">Enter Your Email:</label>
                    <input
                        value={formData['signup-email']}
                        onChange={handleChange}
                        name="signup-email"
                        placeholder="email@example.com"
                        className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                        id="signup-email"
                        type="email"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="signup-password">Enter Your Password (min 6 chars):</label>
                    <div className="relative">
                        <input
                            value={formData['signup-password']}
                            onChange={handleChange}
                            name="signup-password"
                            placeholder="••••••••"
                            className="w-full border border-border outline-primary py-2.5 pl-4 pr-10 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="signup-password-confirm">Confirm Your Password:</label>
                    <div className="relative">
                        <input
                            value={formData['signup-password-confirm']}
                            onChange={handleChange}
                            name="signup-password-confirm"
                            placeholder="••••••••"
                            className="w-full border border-border outline-primary py-2.5 pl-4 pr-10 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                            id="signup-password-confirm"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {formData['signup-password'] && formData['signup-password-confirm'] && formData['signup-password'] !== formData['signup-password-confirm'] && (
                        <span className="text-xs text-red-500 mt-1">Passwords do not match.</span>
                    )}
                </div>

                {/* Turnstile Widget */}
                <div className="flex justify-center my-2">
                    <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                        onSuccess={(t) => setToken(t)}
                        onExpire={() => setToken(null)}
                        onError={() => setToken(null)}
                    />
                </div>

                <div className="flex flex-row justify-between items-center mt-2">
                    <button
                        disabled={!isValid || loading}
                        className={cn(
                            "w-full text-white cursor-pointer rounded-xl bg-primary py-3 px-4 font-semibold shadow-md transition-all hover:bg-amber-600 active:scale-98 flex items-center justify-center gap-2",
                            (!isValid || loading) && 'opacity-60 cursor-not-allowed hover:bg-primary'
                        )}
                        type="submit"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : null}
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export function SignInForm() {
    const [formData, setFormData] = useState({
        'signin-email': '',
        'signin-password': ''
    });

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const supabase = createClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const checkValidity = () => {
        const email = formData['signin-email'].trim();
        const password = formData['signin-password'];
        return email !== '' && password !== '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkValidity()) return;

        if (!token) {
            setError('Please verify you are a human.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const email = formData['signin-email'].trim();
            const password = formData['signin-password'];

            const result = await handleSignIn({
                email,
                password,
                token
            });

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success);
                
                if (result.session) {
                    await supabase.auth.setSession(result.session);
                    window.location.reload();
                }

                setFormData({
                    'signin-email': '',
                    'signin-password': ''
                });
                setToken(null);
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    const isValid = checkValidity();

    return (
        <section className="max-w-2xl mx-auto my-5">
            <form onSubmit={handleSubmit} className="w-full border border-border rounded-2xl bg-white shadow flex flex-col gap-6 text-slate-700 py-10 px-8">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Welcome Back</h3>
                    <p className="text-sm text-slate-500 mt-1">Sign in to manage your donations and requests.</p>
                </div>

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

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="signin-email">Enter Your Email:</label>
                    <input
                        value={formData['signin-email']}
                        onChange={handleChange}
                        name="signin-email"
                        placeholder="email@example.com"
                        className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                        id="signin-email"
                        type="email"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="signin-password">Enter Your Password:</label>
                    <div className="relative">
                        <input
                            value={formData['signin-password']}
                            onChange={handleChange}
                            name="signin-password"
                            placeholder="••••••••"
                            className="w-full border border-border outline-primary py-2.5 pl-4 pr-10 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* Turnstile Widget */}
                <div className="flex justify-center my-2">
                    <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                        onSuccess={(t) => setToken(t)}
                        onExpire={() => setToken(null)}
                        onError={() => setToken(null)}
                    />
                </div>

                <div className="flex flex-row justify-between items-center mt-2">
                    <button
                        disabled={!isValid || loading}
                        className={cn(
                            "w-full text-white cursor-pointer rounded-xl bg-primary py-3 px-4 font-semibold shadow-md transition-all hover:bg-amber-600 active:scale-98 flex items-center justify-center gap-2",
                            (!isValid || loading) && 'opacity-60 cursor-not-allowed hover:bg-primary'
                        )}
                        type="submit"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : null}
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </section>
    )
}