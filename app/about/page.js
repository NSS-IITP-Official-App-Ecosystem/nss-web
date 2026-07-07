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
  Palette
} from "lucide-react";

export const metadata = {
    title: "About Us | NSS IIT Patna",
    description: "Learn about the National Service Scheme (NSS) at IIT Patna, our motto 'Not Me, But You', our wings, core philosophy, and community impact.",
};

export default function AboutPage() {
  const objectives = [
    {
      icon: Target,
      title: "Personality Development",
      description: "Inculcate social responsibility and develop student character through active community service.",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    },
    {
      icon: HeartHandshake,
      title: "Social Welfare",
      description: "Directly address community needs through volunteer programs, blood donation camps, and literacy drives.",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Adopt local villages, understand rural challenges, and execute sustainable development projects.",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      icon: Sparkles,
      title: "Empowering Youth",
      description: "Bridge the gap between technology and community service to bring scalable innovations to grass-root levels.",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    }
  ];

  const wings = [
    {
      icon: GraduationCap,
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

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Ambient background blur elements */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#00256d] to-[#001540] py-20 px-6 sm:px-8 text-white text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-amber-500 blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            National Service Scheme
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            About <span className="bg-linear-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">NSS IIT Patna</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Empowering students to build character, develop social responsibility, and drive community empowerment through volunteer service.
          </p>
        </div>
      </section>

      {/* Motto & Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
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
            <p className="text-slate-600 font-normal leading-relaxed text-sm sm:text-base md:text-lg">
              The motto of the National Service Scheme (NSS) is <strong className="text-slate-800">"NOT ME BUT YOU"</strong>. This reflects the essence of democratic living and upholds the need for selfless service. It underlines that the welfare of an individual is ultimately dependent on the welfare of society on the whole.
            </p>
            <p className="text-slate-600 font-normal leading-relaxed text-sm sm:text-base md:text-lg">
              At IIT Patna, our volunteers live by this philosophy. We combine our technical knowledge and youthful energy to resolve pressing issues in nearby villages, schools, and cities, cultivating empathy and leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Core Objectives Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-20 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Core Objectives</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm sm:text-base">
            How we translate our vision into actionable, structural efforts to elevate the underprivileged.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {objectives.map((obj, index) => {
            const Icon = obj.icon;
            return (
              <div
                key={index}
                className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-6"
              >
                <div className={`p-3 rounded-2xl border shrink-0 ${obj.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">{obj.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">{obj.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Wings Overview Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-20 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Our Functional Wings</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm sm:text-base">
            Our activities are divided into specialized wings to address various social needs systematically.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wings.map((wing, index) => {
            const Icon = wing.icon;
            return (
              <div
                key={index}
                className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
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
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-20">
        <div className="bg-[#00256d] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-amber-400 blur-3xl"></div>
            <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-blue-500 blur-3xl"></div>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100/10">
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
      <section className="max-w-4xl mx-auto px-6 text-center mt-20 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00256d]">Be the Change You Wish to See</h2>
        <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed">
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