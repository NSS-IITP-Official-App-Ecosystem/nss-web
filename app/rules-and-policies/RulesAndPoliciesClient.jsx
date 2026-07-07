"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  ShieldAlert, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  HeartHandshake
} from "lucide-react";

export default function RulesAndPoliciesClient() {
  const [activeTab, setActiveTab] = useState("general"); // "general" | "adhyayan"

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

      {/* Tab Switcher */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12">
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/50 shadow-xs gap-2">
            <button
              onClick={() => setActiveTab("general")}
              className={`relative px-6 py-3.5 rounded-xl text-sm md:text-base font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "general"
                  ? "text-[#00256d]"
                  : "text-slate-500 hover:text-[#00256d]"
              }`}
            >
              {activeTab === "general" && (
                <motion.div
                  layoutId="active-rules-tab-bg"
                  className="absolute inset-0 bg-white shadow-md rounded-xl border border-slate-200/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <HeartHandshake className="w-4 h-4 z-10" />
              <span className="z-10">General Guidelines</span>
            </button>

            <button
              onClick={() => setActiveTab("adhyayan")}
              className={`relative px-6 py-3.5 rounded-xl text-sm md:text-base font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "adhyayan"
                  ? "text-[#00256d]"
                  : "text-slate-500 hover:text-[#00256d]"
              }`}
            >
              {activeTab === "adhyayan" && (
                <motion.div
                  layoutId="active-rules-tab-bg"
                  className="absolute inset-0 bg-white shadow-md rounded-xl border border-slate-200/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <BookOpen className="w-4 h-4 z-10" />
              <span className="z-10">Adhyayan (Teaching) Guidelines</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === "general" ? (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-extrabold text-[#00256d]">80 Hours</div>
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Mandatory Hours</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-extrabold text-amber-600">30 Hours</div>
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Max Other Activities</div>
                      </div>
                    </div>

                    <ul className="space-y-3.5 text-slate-600 font-normal leading-relaxed text-sm md:text-base">
                      <li className="flex items-start gap-2.5">
                        <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>Every volunteer must complete <strong>80 mandatory hours</strong> in order to pass this course in the first 2 semesters or it will be extended to coming semesters until completed or before first 4 semester which ever is early.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>It is the duty of every volunteer to check the attendance when it is reported to be updated. Any mistake made by the mentors within <strong>3 days</strong> of the update will be resolved in <strong>24 hours</strong>, after which no request will be entertained.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>It is the duty of volunteers to attend the maximum number of events in order to complete his/her hours.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>Volunteers can complete <strong>maximum 30 hours</strong> from other NSS Activities (here it refers to the activities of other cells or common activities like plantation, cleanliness drives etc.) unless prescribed by the Mentor or Secretary to increase the limit for a particular volunteer.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-red-100 bg-red-50/50 rounded-2xl p-4 flex gap-3.5 items-start">
                    <ShieldAlert className="w-5.5 h-5.5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-950 font-bold text-xs uppercase tracking-wider">Default & False Attendance</h4>
                      <p className="text-red-900 text-xs font-normal mt-1">Strict actions will be taken against false attendance. Penalty provision will also be there for defaulters.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Code of Conduct Card */}
                <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-2xl">
                        <ShieldAlert className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">2. Code of Conduct</h2>
                        <p className="text-slate-500 text-sm font-medium mt-0.5">Behavioral expectations and rules</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 bg-slate-50/60 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/40">
                        <span className="w-6 h-6 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">a</span>
                        <p className="text-slate-700 text-sm md:text-base">As an NSS member everyone is expected to have good conduct and humble behaviour.</p>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 bg-slate-50/60 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/40">
                        <span className="w-6 h-6 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">b</span>
                        <p className="text-slate-700 text-sm md:text-base">Especially when you are in any event or in public you have to be humble, kind and respectable towards each other.</p>
                      </div>

                      <div className="flex items-start gap-4 p-3 bg-slate-50/60 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/40">
                        <span className="w-6 h-6 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">c</span>
                        <p className="text-slate-700 text-sm md:text-base">Volunteers should not create/be a part of any dispute or misconduct while you are involved in any activity and if such a situation arises don’t get involved but immediately report to mentors, secretaries.</p>
                      </div>

                      <div className="flex items-start gap-4 p-3 bg-slate-50/60 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/40">
                        <span className="w-6 h-6 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">d</span>
                        <p className="text-slate-700 text-sm md:text-base">Failing to do so will attract strict action as per Institute norms.</p>
                      </div>

                      <div className="flex items-start gap-4 p-3 bg-slate-50/60 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200/40">
                        <span className="w-6 h-6 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">e</span>
                        <p className="text-slate-700 text-sm md:text-base">In each activity, you will be monitored by your mentor and secretaries. Don’t make fake excuses, names of regular defaulters will be sent to Professor-In-Charge.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 3. Complaint or Suggestion / Think Thank Card */}
              <div className="bg-[#00256d] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-md">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-amber-400 blur-3xl"></div>
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Feedback Loop
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">3. Complaint or Suggestion</h3>
                    <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                      If you have any complaints, suggestions regarding anything in NSS please bring it to the notice of mentors or secretaries or submit it on <a href="/think-thank" className="underline hover:text-amber-300 transition-colors">Think Thank </a> section. Ideas are always welcomed. Every proposal will be considered and will be worked upon if it is not considered by the mentor, feel free to contact any secretary.
                    </p>
                  </div>
                  
                  <Link 
                    href="/think-thank" 
                    className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#00256d] font-bold px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 shrink-0 group cursor-pointer text-sm md:text-base"
                  >
                    Go to Think Thank
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* 4. Do's & Don'ts Column Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Do's Card */}
                <div className="bg-white/80 border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="p-2.5 bg-emerald-50 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800">4. Do’s</h3>
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
                      "NSS IIT Patna is a voluntary youth organisation. Whenever you bear the badge of NSS while working inside or outside the campus, One should not favour any Political, Regional or cultural view."
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-slate-600 text-sm md:text-base">
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="adhyayan"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Adhyayan Header Banner */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 md:p-8 text-center max-w-3xl mx-auto space-y-4">
                <span className="text-[#00256d] font-bold text-xs uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full">
                  Our Wing Motto
                </span>
                <p className="text-2xl md:text-3xl font-serif text-[#00256d] font-black italic">
                  "divided by groups, united by NSS"
                </p>
                <p className="text-slate-600 text-sm md:text-base">
                  Social service can be of any kind so we encourage you to work for other NSS cells also and Explore various fields of Social Service.
                </p>
              </div>

              {/* Grid: Hours requirements & commitment policies */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Hours Commitment */}
                <div className="lg:col-span-1 bg-white/80 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 bg-amber-500/10 rounded-2xl">
                        <Clock className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-slate-800">Hours Commitment</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Teaching wing specific split</p>
                      </div>
                    </div>

                    <div className="space-y-4 bg-slate-50 border border-slate-200/50 rounded-2xl p-5 text-center">
                      <div>
                        <div className="text-3xl font-black text-[#00256d]">60 Hours</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Teaching Work (At least)</div>
                      </div>
                      <div className="border-t border-slate-200 pt-3">
                        <div className="text-2xl font-bold text-slate-700">Rest 20 Hours</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Other NSS Events</div>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      Being a sensitive group, volunteers need to complete their 60 hours(at least) from teaching-related work. For the rest 20 hrs, you are welcomed to work in any NSS related events.
                    </p>
                  </div>
                </div>

                {/* Operations & Timelines */}
                <div className="lg:col-span-2 bg-white/80 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 bg-blue-500/10 rounded-2xl">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-slate-800">Teaching Commitments & Operations</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Syllabus planning, Punctuality & Coordination</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3.5">
                        <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Attendance & Timings</h4>
                        <ul className="space-y-3 text-slate-600 text-sm">
                          <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00256d] shrink-0 mt-2"></span>
                            <span>We encourage only those volunteers to join who are really motivated towards teaching.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00256d] shrink-0 mt-2"></span>
                            <span>In NSS meetings all members should be present on time, else mentor and secretary are free to take action against them.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00256d] shrink-0 mt-2"></span>
                            <span>Assigned teaching members should reach class <strong>5 or 10 min</strong> before the scheduled time.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3.5">
                        <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Planning & Collaboration</h4>
                        <ul className="space-y-3 text-slate-600 text-sm">
                          <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                            <span>Volunteers would be required to formulate monthly plans according to the syllabus, which they will stick to.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                            <span>Bi-weekly progress will be checked by the mentors.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                            <span>Volunteers should maintain proper coordination for efficient teaching and daily progress should be reported in the group.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Behavior & Reputation warning bar */}
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start">
                <div className="p-3 bg-rose-500/10 rounded-2xl shrink-0">
                  <ShieldAlert className="w-6 h-6 text-rose-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-rose-950 font-extrabold text-sm uppercase tracking-wider">Professionalism & Behavior</h4>
                  <p className="text-rose-900 text-sm leading-relaxed font-normal">
                    Everyone should take care of his/her behavior towards the students and their parents. You should avoid any and every such thing which degrades the image of NSS or our college.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
