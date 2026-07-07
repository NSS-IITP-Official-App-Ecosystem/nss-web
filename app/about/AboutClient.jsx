"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  HeartHandshake, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  Target,
  GraduationCap,
  Leaf,
  Globe,
  Palette,
  Compass,
  FileText,
  Clock,
  Award
} from "lucide-react";

export default function AboutClient() {
  const objectives = [
    {
      icon: Target,
      title: "Personality Development",
      description: "Inculcate social responsibility and develop student character through active community service.",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      style: "border-amber-100 hover:border-amber-400 bg-amber-50/20 shadow-amber-100/10"
    },
    {
      icon: HeartHandshake,
      title: "Social Welfare",
      description: "Directly address community needs through volunteer programs, blood donation camps, and literacy drives.",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      style: "border-blue-100 hover:border-blue-400 bg-blue-50/20 shadow-blue-100/10"
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Adopt local villages, understand rural challenges, and execute sustainable development projects.",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      style: "border-emerald-100 hover:border-emerald-400 bg-emerald-50/20 shadow-emerald-100/10"
    },
    {
      icon: Sparkles,
      title: "Empowering Youth",
      description: "Bridge the gap between technology and community service to bring scalable innovations to grass-root levels.",
      color: "bg-purple-500/10 text-purple-650 border-purple-500/20",
      style: "border-purple-100 hover:border-purple-400 bg-purple-50/20 shadow-purple-100/10"
    }
  ];

  const wings = [
    {
      icon: GraduationCap,
      name: "Teaching Wing",
      desc: "Delivering primary education, tutoring, and educational guidance to students in local rural communities.",
      link: "/wings/teaching"
    },
    {
      icon: Compass,
      name: "Prerna (Education Wing)",
      desc: "Providing quality education and digital literacy to underprivileged children in neighboring communities.",
      link: "/wings/prerna"
    },
    {
      icon: Globe,
      name: "Rural Development",
      desc: "Improving rural infrastructure, healthcare facilities, and computer literacy in adopted villages.",
      link: "/wings/rural"
    },
    {
      icon: Leaf,
      name: "Environmental Wing",
      desc: "Promoting sustainability through tree plantation drives, waste management campaigns, and energy conservation.",
      link: "/wings/environmental"
    },
    {
      icon: Palette,
      name: "Designer Creation (DNC)",
      desc: "Bringing creative awareness campaigns, flyers, street art, and visual storytelling to social causes.",
      link: "/wings/dnc"
    }
  ];

  const stats = [
    { value: "500+", label: "Active Volunteers" },
    { value: "80+", label: "Annual Events" },
    { value: "10,000+", label: "Service Hours Logged" },
    { value: "5+", label: "Adopted Villages" }
  ];

  const journeySteps = [
    {
      title: "1. Induction & Orientation",
      desc: "Freshmen join NSS IIT Patna at the start of Semester 1, aligning with the national directive of voluntary youth service.",
      icon: Users,
      badge: "Induction"
    },
    {
      title: "2. Cell & Wing Allotment",
      desc: "Volunteers choose their wings (Teaching, Rural, Environment, DNC) based on their aptitude and interest cells.",
      icon: Compass,
      badge: "Allocation"
    },
    {
      title: "3. Direct Community Service",
      desc: "Volunteers participate in weekend village teaching campaigns, blood camps, plantation drives, and cleanliness weeks.",
      icon: HeartHandshake,
      badge: "Action"
    },
    {
      title: "4. Logging Hours",
      desc: "Volunteers log their weekly hours on the portal, which are reviewed and verified by their respective cell mentors.",
      icon: Clock,
      badge: "Hours Logged"
    },
    {
      title: "5. Graduation & Certificate",
      desc: "Upon completing the mandatory 80 service hours, volunteers graduate from the scheme, receiving their official NSS certificate.",
      icon: Award,
      badge: "Certificate"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-20 relative overflow-hidden font-sans">
      
      {/* Decorative Dot Matrix Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-25 z-0 pointer-events-none" />

      {/* Large Soft Glow Orbs for background blending */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute top-[45%] right-[-10%] w-[550px] h-[550px] rounded-full bg-amber-400/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      {/* Hero Header Section - Collaborate dark theme colors */}
      <section className="relative overflow-hidden bg-[#020b18] py-24 px-6 sm:px-8 text-white z-10 border-b border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"></div>
        </div>
        {/* Tech Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Title & Text */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-400 font-semibold text-xs uppercase tracking-widest font-mono shadow-xs"
            >
              <Sparkles className="animate-pulse w-3.5 h-3.5" />
              Not Me, But You
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white uppercase">
              About <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100 bg-clip-text text-transparent font-sans">NSS IIT Patna</span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg font-light max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              The National Service Scheme at IIT Patna is a voluntary community service initiative that channels student leadership, technology, and energy to drive rural development and empower communities.
            </p>
          </div>

          {/* Right Column: Custom Generative Radial Service Compass with Expanded ViewBox for Label Visibility */}
          <div className="lg:col-span-6 flex justify-center items-center relative min-h-[380px] sm:min-h-[440px]">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Rotating Faint Outer Celestial Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <svg viewBox="-40 -25 280 250" className="w-full h-full text-slate-400/20">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,6" />
                </svg>
              </motion.div>

              {/* Static SVG Radar Graph Visual with custom padded ViewBox to prevent label clipping */}
              <svg viewBox="-40 -25 280 250" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <defs>
                  {/* Glowing gradient for active impact area */}
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Concentric Guide Pentagons representing metrics limits */}
                <polygon points="100,20 176,75 147,165 53,165 24,75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <polygon points="100,45 153,84 133,146 67,146 47,84" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <polygon points="100,70 131,92 119,127 81,127 69,92" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,3" />

                {/* Main Axis Spoke Lines */}
                <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="100" y1="100" x2="176" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="100" y1="100" x2="147" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="100" y1="100" x2="53" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="100" y1="100" x2="24" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* Faint Center Dot */}
                <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.3)" />

                {/* Animated Filled Impact Shape */}
                <motion.polygon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  points="100,35 161,86 138,152 62,130 38,62" // Customized vertices representing scores
                  fill="url(#radarGlow)"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]"
                />

                {/* Outer Spoke Labels (Radar Vertices) - Positioned with proper margins for full visibility */}
                <text x="100" y="10" textAnchor="middle" className="text-[7.5px] font-mono fill-slate-200 font-bold uppercase tracking-wider">Teaching</text>
                <text x="185" y="78" textAnchor="start" className="text-[7.5px] font-mono fill-slate-200 font-bold uppercase tracking-wider">Prerna</text>
                <text x="155" y="174" textAnchor="start" className="text-[7.5px] font-mono fill-slate-200 font-bold uppercase tracking-wider">Rural Dev</text>
                <text x="45" y="174" textAnchor="end" className="text-[7.5px] font-mono fill-slate-200 font-bold uppercase tracking-wider">Environment</text>
                <text x="15" y="78" textAnchor="end" className="text-[7.5px] font-mono fill-slate-200 font-bold uppercase tracking-wider">Creative</text>

                {/* Pulsating corner nodes */}
                <circle cx="100" cy="35" r="3" fill="#f59e0b" className="animate-pulse" />
                <circle cx="161" cy="86" r="3" fill="#f59e0b" className="animate-pulse" />
                <circle cx="138" cy="152" r="3" fill="#f59e0b" className="animate-pulse" />
                <circle cx="62" cy="130" r="3" fill="#f59e0b" className="animate-pulse" />
                <circle cx="38" cy="62" r="3" fill="#f59e0b" className="animate-pulse" />
              </svg>

              {/* Glowing Center Badge */}
              <div className="absolute w-14 h-14 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                NSS
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Motto & Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200/60 rounded-3xl p-8 md:p-12 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center rounded-3xl bg-[#00256d]/5 border border-[#00256d]/10 text-[#00256d]">
            <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" fill="#00256d" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="50" cy="50" r="26" fill="#ef4444" />
              <g stroke="#f59e0b" strokeWidth="3">
                <line x1="50" y1="20" x2="50" y2="80" />
                <line x1="20" y1="50" x2="80" y2="50" />
              </g>
              <circle cx="50" cy="50" r="8" fill="#f59e0b" />
            </svg>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#00256d]">Our Motto: "Not Me, But You"</h2>
            <p className="text-slate-655 font-normal leading-relaxed text-sm sm:text-base md:text-lg">
              The motto of the National Service Scheme (NSS) is <strong className="text-slate-800">"NOT ME BUT YOU"</strong>. This reflects the essence of democratic living and upholds the need for selfless service. It underlines that the welfare of an individual is ultimately dependent on the welfare of society on the whole.
            </p>
            <p className="text-slate-655 font-normal leading-relaxed text-sm sm:text-base md:text-lg">
              At IIT Patna, our volunteers live by this philosophy. We combine our technical knowledge and youthful energy to resolve pressing issues in nearby villages, schools, and cities, cultivating empathy and leadership.
            </p>
          </div>
        </motion.div>
      </section>

      {/* The Official NSS Pledge */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-radial from-amber-500/[0.03] to-transparent border-2 border-amber-500/20 rounded-[36px] p-8 md:p-14 text-center space-y-6 relative overflow-hidden"
        >
          {/* Subtle glow orb behind the certificate layout */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
          
          <div className="inline-flex p-3 bg-amber-500/10 text-amber-600 rounded-2xl border border-amber-500/20">
            <FileText className="w-6 h-6" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">The NSS Pledge</h2>
          
          <p className="text-slate-700 italic font-serif text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            "I solemnly pledge that I will serve my motherland India and her people with dedication, empathy, and respect. I will volunteer my time and energy to uplift the weaker sections of society, bridge community gaps, and dedicate myself to community welfare without any bias of caste, creed, gender, or religion. In every action, I will honor our guiding motto: Not Me, But You."
          </p>

          <div className="pt-4 flex justify-center items-center gap-3 text-slate-500 text-xs font-mono tracking-wider uppercase font-bold">
            <span className="w-8 h-px bg-slate-300" />
            NSS IIT Patna Chapter
            <span className="w-8 h-px bg-slate-300" />
          </div>
        </motion.div>
      </section>

      {/* Core Objectives Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 uppercase">Core Objectives</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm sm:text-base">
            How we translate our vision into actionable, structural efforts to elevate the underprivileged.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {objectives.map((obj, index) => {
            const Icon = obj.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-3xl p-6 md:p-8 flex items-start gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-all duration-300 ${obj.style}`}
              >
                <div className={`p-3 rounded-2xl border shrink-0 ${obj.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">{obj.title}</h3>
                  <p className="text-slate-655 text-sm sm:text-base font-normal leading-relaxed">{obj.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Wings Overview Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 uppercase">Our Functional Wings</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm sm:text-base">
            Our activities are divided into specialized wings to address various social needs systematically.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {wings.map((wing, index) => {
            const Icon = wing.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-slate-800"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-[#00256d]/5 border border-[#00256d]/10 text-[#00256d] rounded-2xl w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">{wing.name}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">{wing.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link 
                    href={wing.link} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00256d] hover:text-amber-500 transition-colors group"
                  >
                    Explore Wing
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Volunteer Journey Timeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 uppercase font-sans">The Volunteer Journey</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm sm:text-base">
            From orientation to certification: the path of active citizenship at IIT Patna.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto pt-8">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200/80 -translate-x-1/2 z-0" />

          <div className="space-y-12">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-6 sm:gap-12`}
                >
                  {/* Timeline Circle Center */}
                  <div className="absolute left-4 sm:left-1/2 top-2 w-9 h-9 rounded-full bg-white border-2 border-[#00256d] flex items-center justify-center -translate-x-1/2 z-10 shadow-xs">
                    <Icon className="w-4 h-4 text-[#00256d]" />
                  </div>

                  {/* Card Panel */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0">
                    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                          {step.badge}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden sm:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats Section (Accent Dark Banner) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 relative z-10">
        <div className="bg-linear-to-br from-[#00256d] to-[#001540] border border-slate-200/10 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-amber-400 blur-3xl"></div>
            <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-blue-500 blur-3xl"></div>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="pt-6 lg:pt-0 first:pt-0">
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 tracking-tight">{stat.value}</h4>
                <p className="text-slate-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 text-center mt-24 space-y-6 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00256d] uppercase">Be the Change You Wish to See</h2>
        <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Whether you are a student volunteer ready to log hours, a community leader looking to partner, or an organization wishing to collaborate, there is a place for you in NSS.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link 
            href="/collaborate" 
            className="inline-flex items-center justify-center gap-2 bg-[#00256d] hover:bg-[#001d54] text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 group text-sm"
          >
            Collaborate With Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link 
            href="/our-team" 
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#00256d] border border-slate-200 font-bold px-6 py-3.5 rounded-2xl shadow-xs transition-all duration-300 hover:scale-105 text-sm"
          >
            Meet the Team
          </Link>
        </div>
      </section>
    </div>
  );
}
