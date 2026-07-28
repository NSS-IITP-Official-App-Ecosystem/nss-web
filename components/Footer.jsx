"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin } from "lucide-react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Footer() {
    const pathname = usePathname();

    const handleSamePageScroll = (e, href) => {
        if (pathname === href) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className="relative bg-gradient-to-b from-[#021838] to-[#010f24] text-white/90 border-t border-amber-500/20 pt-16 pb-14 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-hidden">
            {/* Subtle ambient light gradient glow at the top center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
                    
                    {/* Column 1: Emblem, Address, Socials & App Download (Span 4) */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start lg:pr-8 lg:border-r border-white/15">
                        <div className="flex flex-col items-center lg:items-center w-full mb-4">
                            <div className="w-16 h-16 relative mb-3 transition-transform duration-300 hover:scale-105">
                                <Image src="/nss iitp logo.png" height={64} width={64} alt="NSS IIT Patna Logo" className="object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.15)]" />
                            </div>
                            <h3 className="text-white font-black text-base sm:text-lg tracking-wide text-center drop-shadow-sm">
                                NATIONAL SERVICE SCHEME, IIT PATNA
                            </h3>
                            <p className="text-white/70 text-xs sm:text-sm font-medium text-center mt-1">
                                Bihta, Patna, Bihar-801106, India
                            </p>
                        </div>

                        {/* Social / Contact Links List */}
                        <div className="w-full my-6 border-t border-white/15 pt-6 text-sm font-medium text-white/85 flex flex-wrap gap-y-3 gap-x-5">
                            <a href="mailto:nss@iitp.ac.in" className="group flex items-center gap-3.5 py-2 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-amber-300 hover:translate-x-1 border border-white/5 hover:border-amber-400/30 transition-all duration-200">
                                <Mail className="w-4 h-4 shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
                                <span>nss@iitp.ac.in</span>
                            </a>
                            <a href="https://www.instagram.com/nss.iitp" target="_blank" rel="noreferrer" className="group flex items-center gap-3.5 py-2 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-amber-300 hover:translate-x-1 border border-white/5 hover:border-amber-400/30 transition-all duration-200">
                                <FaInstagram className="w-4 h-4 shrink-0 text-pink-400 group-hover:scale-110 transition-transform" />
                                <span>@nss.iitp</span>
                            </a>
                            <a href="https://www.youtube.com/@nssiitpatna3209" target="_blank" rel="noreferrer" className="group flex items-center gap-3.5 py-2 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-amber-300 hover:translate-x-1 border border-white/5 hover:border-amber-400/30 transition-all duration-200">
                                <FaYoutube className="w-4 h-4 shrink-0 text-red-500 group-hover:scale-110 transition-transform" />
                                <span>@nssiitpatna3209</span>
                            </a>
                            <a href="https://www.facebook.com/nss.iitp" target="_blank" rel="noreferrer" className="group flex items-center gap-3.5 py-2 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-amber-300 hover:translate-x-1 border border-white/5 hover:border-amber-400/30 transition-all duration-200">
                                <FaFacebook className="w-4 h-4 shrink-0 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span>nss.iitp</span>
                            </a>
                            <a href="https://www.twitter.com/nss_iitp" target="_blank" rel="noreferrer" className="group flex items-center gap-3.5 py-2 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-amber-300 hover:translate-x-1 border border-white/5 hover:border-amber-400/30 transition-all duration-200">
                                <FaTwitter className="w-4 h-4 shrink-0 text-blue-300 group-hover:scale-110 transition-transform" />
                                <span>nss_iitp</span>
                            </a>
                            <a href="https://www.linkedin.com/company/nssiitp" target="_blank" rel="noreferrer" className="group flex items-center gap-3.5 py-2 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-amber-300 hover:translate-x-1 border border-white/5 hover:border-amber-400/30 transition-all duration-200">
                                <FaLinkedin className="w-4 h-4 shrink-0 text-blue-800 group-hover:scale-110 transition-transform" />
                                <span>nssiitp</span>
                            </a>
                        </div>

                        {/* App Download Box */}
                        <div className="w-full mt-2 pt-2 flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-3xl text-amber-400 mb-3 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                                <IoLogoGooglePlaystore />
                            </div>
                            <a 
                                href="https://play.google.com/store/apps/details?id=com.phad.chatapp" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full sm:max-w-[240px] bg-gradient-to-r from-[#204078] to-[#2b559f] hover:from-[#2a539b] hover:to-[#3868be] border border-white/20 hover:border-amber-400/50 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.25)] text-center transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 block mx-auto"
                            >
                                Download NSS App
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick links (Span 3) */}
                    <div className="lg:col-span-3 lg:pl-4">
                        <h3 className="text-white font-bold text-base sm:text-lg tracking-wide mb-4 pb-2.5 border-b border-amber-500/30 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                            <span>Quick links</span>
                        </h3>
                        <ul className="space-y-1 text-sm font-normal text-white/85">
                            <li>
                                <Link href="/" onClick={(e) => handleSamePageScroll(e, "/")} className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Home Page</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" onClick={(e) => handleSamePageScroll(e, "/events")} className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Events Archive</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/awards" onClick={(e) => handleSamePageScroll(e, "/awards")} className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Awards and Achievements</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/rules-and-policies" onClick={(e) => handleSamePageScroll(e, "/rules-and-policies")} className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Hours Policy</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/our-team" onClick={(e) => handleSamePageScroll(e, "/our-team")} className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Our Team</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: IITP Links (Span 3) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-bold text-base sm:text-lg tracking-wide mb-4 pb-2.5 border-b border-amber-500/30 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                            <span>IITP Links</span>
                        </h3>
                        <ul className="space-y-1 text-sm font-normal text-white/85">
                            <li>
                                <a href="https://www.iitp.ac.in" target="_blank" rel="noreferrer" className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">IITP Main Website</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://academics.iitp.ac.in/" target="_blank" rel="noreferrer" className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Academic Affairs</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://acc.iitp.ac.in" target="_blank" rel="noreferrer" className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">ACC IITP Website</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://ais.iitp.ac.in/moodle/" target="_blank" rel="noreferrer" className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-amber-400/30 hover:text-amber-300 transition-all duration-200">
                                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">Moodle Portal</span>
                                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Map, Credits and Action Button (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col justify-between pt-2 lg:pt-0">
                        <div>
                            <a 
                                href="https://maps.app.goo.gl/M4EQVGUsufmFMD2J7" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="group flex items-center gap-2 text-white font-bold text-sm mb-3 hover:text-amber-300 transition-colors"
                            >
                                <MapPin className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <span>NSS Office, IIT Patna</span>
                            </a>
                            <div className="w-full h-[145px] rounded-xl overflow-hidden border border-white/20 hover:border-amber-400/50 shadow-lg mb-3 bg-slate-900 transition-colors duration-300">
                                <iframe
                                    src="https://maps.google.com/maps?q=National+Service+Scheme+IIT+Patna+Bihta+Bihar+801106&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="NSS IIT Patna Office Map"
                                    className="w-full h-full object-cover"
                                ></iframe>
                            </div>
                            <p className="text-white/75 text-xs leading-relaxed font-normal bg-white/[0.03] p-3 rounded-lg border border-white/5">
                                Room No. 306, Administration Building, IIT Patna Campus, Bihta, Patna, Bihar, PIN - 801106
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Copyright & Credit Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-white/60 text-xs font-medium tracking-wide">
                    <p>&copy; {new Date().getFullYear()} National Service Scheme, IIT Patna. All rights reserved.</p>
                    <div className="py-1.5 px-4 rounded-full bg-amber-400/10 border border-amber-400/30 shadow-inner">
                        <p className="text-amber-300 font-bold text-xs sm:text-sm text-center tracking-wide">
                            Designed by Web Dev Wing, NSS IITP
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/faq" onClick={(e) => handleSamePageScroll(e, "/faq")} className="hover:text-amber-300 transition-colors">Contact Us</Link>
                        <Link href="/rules-and-policies" onClick={(e) => handleSamePageScroll(e, "/rules-and-policies")} className="hover:text-amber-300 transition-colors">Rules &amp; Policies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}