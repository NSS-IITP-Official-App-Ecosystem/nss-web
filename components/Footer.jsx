import { LuInstagram, LuLinkedin, LuYoutube } from "react-icons/lu";
import Link from "next/link";

export default function Footer() {

    return (<footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-900">

                {/* About emblem widget */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <svg viewBox="0 0 100 100" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="46" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
                            <circle cx="50" cy="50" r="26" fill="#ef4444" />
                            <g stroke="#f59e0b" strokeWidth="2">
                                <line x1="50" y1="24" x2="50" y2="76" />
                                <line x1="24" y1="50" x2="76" y2="50" />
                            </g>
                            <circle cx="50" cy="50" r="8" fill="#f59e0b" />
                        </svg>
                        <div>
                            <h3 className="text-white font-black text-sm tracking-wider">NSS IIT PATNA</h3>
                            <p className="text-amber-500 text-[10px] font-bold uppercase">National Service Scheme</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs font-normal leading-relaxed max-w-sm">
                        IIT Patna&apos;s NSS Unit coordinates voluntary community services, giving students a chance to connect with local demographics, understand societal challenges, and take action.
                    </p>
                    <div className="flex flex-row flex-nowrap gap-4 justify-start">
                        <a href="https://www.youtube.com/@nssiitpatna3209" target="_blank" className="text-xl border rounded-full border-gray-500/60 bg-gray-500/50 p-3 hover:scale-105"><LuYoutube /></a>
                        <a href="https://www.instagram.com/nss.iitp" target="_blank" className="text-xl border rounded-full border-gray-500/60 bg-gray-500/50 p-3 hover:scale-105"><LuInstagram /></a>
                    </div>
                </div>
                {/* Quick Links column */}
                <div>
                    <h3 className="text-white font-extrabold text-xs uppercase tracking-wider mb-6">Quick Links</h3>
                    <ul className="space-y-3 font-bold uppercase tracking-wider text-slate-400">
                        <li><Link href="/" className="hover:text-amber-500 transition-colors">Home Page</Link></li>
                        <li><Link href="/events" className="hover:text-amber-500 transition-colors">Events Archive</Link></li>
                        <li><Link href="/awards" className="hover:text-amber-500 transition-colors">Awards &amp; Achievements</Link></li>
                        <li><Link href="/rules-and-policies" className="hover:text-amber-500 transition-colors">Volunteering Guidelines</Link></li>
                    </ul>
                </div>
                {/* Contact details */}
                <div>
                    <h3 className="text-white font-extrabold text-xs uppercase tracking-wider mb-6">Get In Touch</h3>
                    <ul className="space-y-3.5 text-slate-400 font-normal">
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-amber-500 uppercase text-[10px] mt-0.5">Email:</span>
                            <span>nss@iitp.ac.in</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-amber-500 uppercase text-[10px] mt-0.5">Address:</span>
                            <span>NSS Office, Block 9, Indian Institute of Technology Patna, Bihta, Patna - 801106</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-500 font-bold uppercase tracking-wider">
                <p>&copy; 2026 NSS IIT Patna. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <Link href="/faq" className="hover:text-slate-400 transition-colors">Contact Us</Link>
                    <Link href="/rules-and-policies" className="hover:text-slate-400 transition-colors">Rules &amp; Policies</Link>
                </div>
            </div>
        </div>
    </footer>)
}