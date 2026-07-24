"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ShieldAlert,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  PlayIcon
} from "lucide-react";

export default function RulesAndPoliciesClient() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#00256d] to-[#001540] py-20 px-6 sm:px-8 text-white text-center">
        {/* Decorative background vectors */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-amber-500 blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-300 text-xs font-semibold tracking-wider uppercase"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            NSS IIT Patna Portal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            Rules & <span className="bg-linear-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Guidelines</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Understand your roles, commitments, and code of conduct to ensure a highly impactful and disciplined volunteer experience.
          </motion.p>
        </div>
      </section>

      {/* Guidelines Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <div className="space-y-12">
          {/* Grid 1: Hour Policy & Code of Conduct */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* 1. Hour Policy Card */}
            <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">1. Hour Policy</h2>
                    <p className="text-slate-500 text-sm font-medium mt-0.5">Mandatory attendance & hour criteria</p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-center max-w-md mx-auto">
                  <div className="text-2xl font-extrabold text-[#00256d]">120 Hours</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Mandatory Hours</div>
                </div>
                {/* <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-amber-600">40 Hours</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Max Other Activities</div>
                  </div> */}


                <ul className="space-y-3.5 text-slate-600 font-normal leading-relaxed text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Every volunteer must complete <strong>120 mandatory hours</strong> in order to pass this course in the first 2 semesters.</span>
                  </li>
                  {/* <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>A maximum of <strong>40 hours</strong> from other activities (such as blood donation, cloth donation, orientation, special events, guest lectures, etc.) will be counted toward your total hours.</span>
                  </li> */}
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>In case any volunteer fails to complete the criteria, he/she will receive an 'F' or unsatisfactory grade in the course and will have to repeat/register next year.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Code of Conduct Card */}
            <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-500/10 rounded-2xl">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">2. Code of Conduct</h2>
                    <p className="text-slate-500 text-sm font-medium mt-0.5">Discipline and volunteer behavior guidelines</p>
                  </div>
                </div>

                <ul className="space-y-3.5 text-slate-600 font-normal leading-relaxed text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>Strict actions will be taken against volunteers who are found violating institutional discipline, using inappropriate language, or misbehaving with coordinators or sub-coordinators.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>Punctuality is critical. Volunteers are required to arrive at their designated locations at least 5 minutes prior to scheduled campaign activities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>Volunteers must coordinate strictly with their group mentors and secretaries and keep regular progress logs up to date.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChevronRight className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>Cleanliness campaigns, teaching drives, and local village visits demand professional behaviour and cultural sensitivity toward local communities.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* 3. Communication Channel Bar */}
          <div className="bg-blue-50/50 border border-blue-100/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-xs transition-all duration-300">
            <div className="p-3 bg-blue-500/10 rounded-2xl shrink-0">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-[#00256d]">3. Communication Channel</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
Our official NSS app serves as the primary platform for daily coordination. We expect all volunteers to check the app regularly and respond to notifications in a timely manner. Additionally, we can utilize WhatsApp groups as a secondary channel for connecting with our team.</p>
<a href="https://play.google.com/store/apps/details?id=com.phad.chatapp" target="_blank"  referrerPolicy="no-referrer" className="flex flex-row gap-3 py-3 px-6 bg-brand-blue/80 text-white border-brand-blue border rounded-2xl max-w-fit text-sm items-center hover:shadow hover:scale-105 hover:bg-brand-blue shadow-brand-blue/50 transition-all mt-5"><PlayIcon/> Download NSS App</a>
            </div>
          </div>

          {/* Do's & Don'ts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Do's Card */}
            <div className="bg-white/80 border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">4. Do</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Explore different areas in which you can do community service.",
                  "Suggest ideas to mentors so that they can make necessary arrangements for that event.",
                  "Effectively utilise your time and try to get good results which will surely give you satisfaction and experience.",
                  "Always come up with implementing possible solutions to a problem rather than only thinking about the problems.",
                  "Respect everyone especially when you are outside the campus."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-slate-600 text-sm md:text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts Card */}
            <div className="bg-white/80 border border-rose-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <XCircle className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">5. Don’t</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Engage in activities which harm the reputation of NSS or Institute.",
                  "Hurt anyone Physically or Emotionally.",
                  "favour any Political, Regional or cultural view whenever you bear the badge of NSS while working inside or outside the campus."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-slate-600 text-sm md:text-base">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Think-Thank Redirection Card */}
          <div className="bg-gradient-to-r from-amber-500/10 via-[#00256d]/5 to-transparent border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all duration-300">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-extrabold text-[#00256d] flex items-center gap-2 justify-center md:justify-start">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Have a Suggestion or want to express gratitude?
              </h3>
              <p className="text-slate-600 text-sm max-w-2xl font-normal leading-relaxed">
                Visit our <strong>Think-Thank</strong> portal to submit your anonymous feedback, suggest new ideas, or thank fellow volunteers.
              </p>
            </div>
            <Link
              href="/think-thank"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00256d] hover:bg-[#001c54] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 shrink-0 cursor-pointer"
            >
              Go to Think-Thank
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
