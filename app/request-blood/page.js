"use client"
import AnimatedCounter from "@/components/AnimatedCounter";
import { useRef, useState, useEffect } from "react";
import { FaClock, FaHeartbeat, FaHospital, FaChevronDown, FaChevronUp, FaTrash, FaUserCheck, FaSpinner, FaUser } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineWaterDrop } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { BiSolidDonateBlood } from "react-icons/bi";
import { cn } from '@/components/utils'


import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicIcon } from "@/components/utils";
import { createBrowserClient } from "@supabase/ssr";
import { createCacheKey } from "next/dist/client/components/segment-cache/cache-key";
import { createClient, useAuth } from "@/utils/supabase/client";
import { FaDroplet } from "react-icons/fa6";
import { SignInForm, SignUpForm } from "@/components/AuthForm";
import { useGlobalAuth } from "@/components/AuthProvider";
import ProfileManager from "@/components/ProfileManager";

const STATS_DATA = [
  {
    'icon': GoAlertFill,
    'title': 'Total Request Raised',
    'count': 243,
    'themeColor': '#ec003f'
  },
  {
    'icon': BiSolidDonateBlood,
    'title': 'Registered Volunteers',
    'count': 118,
    'themeColor': '#ec003f'
  },
  {
    'icon': FaCheckCircle,
    'title': 'Successful Matches',
    'count': 198,
    'themeColor': '#00a63e'
  },
  {
    'icon': FaHeartbeat,
    'title': 'Units Transfused (Liters)',
    'count': 512,
    'themeColor': '#155dfc'
  }
]

const BLOOD_GROUPS = ['A+', 'A-', 'AB+', 'AB-', 'O+', 'O-'];

const FAQS = [
  {
    'title': 'Who is eligible to donate blood?',
    'details': 'Most healthy adults can donate blood. The primary eligibility criteria are: <ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Age:</strong> Between 18 and 65 years.</li><li><strong>Weight:</strong> At least 45 kg (typically 50 kg for certain donations).</li><li><strong>Hemoglobin:</strong> Minimum 12.5 g/dL.</li><li><strong>Health Status:</strong> Free from active infections, flu, or fever. You should not have had major surgery, tattoos, or piercings in the last 6-12 months.</li></ul>'
  },
  {
    'title': 'How often can I donate blood?',
    'details': 'It depends on the type of donation: <ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Whole Blood:</strong> Once every 90 days (3 months) for men, and once every 120 days (4 months) for women to allow iron stores to recover.</li><li><strong>Platelets/Plasma:</strong> More frequently, typically every 15 days, up to a maximum of 24 times a year.</li></ul>'
  },
  {
    'title': 'Is blood donation safe?',
    'details': 'Yes, blood donation is extremely safe. We use only sterile, single-use disposable needles and equipment for each donor. There is absolutely <strong>zero risk</strong> of contracting any blood-borne infections (such as HIV or Hepatitis) by donating blood.'
  },
  {
    'title': 'What should I do to prepare for donation?',
    'details': 'To ensure a smooth and safe donation experience: <ul class="list-disc pl-5 mt-2 space-y-1"><li>Drink plenty of water or juice (at least 500ml) beforehand to stay hydrated.</li><li>Eat a healthy, light meal. Do not donate on an empty stomach.</li><li>Avoid smoking for at least 2 hours and consuming alcohol for 24 hours prior to donation.</li><li>Get a good night’s sleep of at least 6-8 hours.</li></ul>'
  },
  {
    'title': 'What should I do after donating blood?',
    'details': 'After donating, please follow these guidelines: <ul class="list-disc pl-5 mt-2 space-y-1"><li>Rest in the refreshment area for 10-15 minutes and eat the snacks provided.</li><li>Keep the band-aid on for a few hours and avoid lifting heavy objects with that arm.</li><li>Drink plenty of fluids over the next 24-48 hours.</li><li>Avoid strenuous physical activities or heavy exercise for the rest of the day.</li></ul>'
  },
  {
    'title': 'How does the NSS Blood Buddy system work?',
    'details': 'When a blood request is raised on our portal: <ol class="list-decimal pl-5 mt-2 space-y-1"><li>An alert is created in our active requests database.</li><li>Registered volunteers matching the required blood group and nearby location receive a notification.</li><li>Interested donors can accept the request to contact the patient/requester.</li><li><strong>Important note:</strong> This is a purely non-commercial, voluntary initiative. No charges are ever levied for requests or donations.</li></ol>'
  }
];

export default function RequestBloodPage() {

  const {user, profile, loading, signOut} = useGlobalAuth();

  const [activeTab, setActiveTab] = useState("active-request"); // "active-request" | "blood-request" | "become-donor"
  const [activeRequests, setActiveRequests] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [selectedRequestForDonate, setSelectedRequestForDonate] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Donor states
  const [donorInfo, setDonorInfo] = useState(null);
  const [checkingDonor, setCheckingDonor] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [regBloodGroup, setRegBloodGroup] = useState("A+");
  const [regAvailable, setRegAvailable] = useState(true);
  const [regLastDate, setRegLastDate] = useState("");

  // Request Blood Form states
  const [reqPatientName, setReqPatientName] = useState("");
  const [reqBloodGroupForm, setReqBloodGroupForm] = useState("A+");
  const [reqUnits, setReqUnits] = useState(1);
  const [reqHospital, setReqHospital] = useState("");
  const [reqContact, setReqContact] = useState("");
  const [reqNeededBy, setReqNeededBy] = useState("");
  const [reqReason, setReqReason] = useState("");
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(null);
  const [requestError, setRequestError] = useState(null);
  
  const supabase = createClient();

  useEffect(() => {
    const checkDonorStatus = async () => {
      if (!user) {
        setDonorInfo(null);
        setCheckingDonor(false);
        return;
      }
      setCheckingDonor(true);
      const { data, error } = await supabase
        .from("blood_donors")
        .select("*")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (!error && data) {
        setDonorInfo(data);
        setRegBloodGroup(data.blood_group);
        setRegAvailable(data.is_available);
        setRegLastDate(data.last_donation_date || "");
      } else {
        setDonorInfo(null);
      }
      setCheckingDonor(false);
    };

    checkDonorStatus();
  }, [user]);

  const handleRegisterDonor = async (e) => {
    e.preventDefault();
    if (!user) return;
    setRegistering(true);
    const { data, error } = await supabase
      .from("blood_donors")
      .insert({
        profile_id: user.id,
        blood_group: regBloodGroup,
        is_available: regAvailable,
        last_donation_date: regLastDate || null
      })
      .select()
      .single();

    if (!error) {
      setDonorInfo(data);
    } else {
      console.error(error);
      alert(error.message || "Failed to register. Please try again.");
    }
    setRegistering(false);
  };

  const handleUpdateDonor = async (e) => {
    e.preventDefault();
    if (!user || !donorInfo) return;
    setRegistering(true);
    const { data, error } = await supabase
      .from("blood_donors")
      .update({
        blood_group: regBloodGroup,
        is_available: regAvailable,
        last_donation_date: regLastDate || null
      })
      .eq("profile_id", user.id)
      .select()
      .single();

    if (!error) {
      setDonorInfo(data);
      alert("Donor information updated successfully!");
    } else {
      console.error(error);
      alert(error.message || "Failed to update. Please try again.");
    }
    setRegistering(false);
  };

  const handleUnregisterDonor = async () => {
    if (!user || !donorInfo) return;
    if (!window.confirm("Are you sure you want to unregister as a blood donor? Your availability details will be removed.")) return;
    
    setRegistering(true);
    const { error } = await supabase
      .from("blood_donors")
      .delete()
      .eq("profile_id", user.id);

    if (!error) {
      setDonorInfo(null);
      setRegBloodGroup("A+");
      setRegAvailable(true);
      setRegLastDate("");
      alert("Successfully unregistered as a donor.");
    } else {
      console.error(error);
      alert(error.message || "Failed to unregister. Please try again.");
    }
    setRegistering(false);
  };

  const handleRequestBlood = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmittingRequest(true);
    setRequestError(null);
    setRequestSuccess(null);

    try {
      const { error } = await supabase
        .from("blood_requests")
        .insert({
          patient_name: reqPatientName,
          blood_group: reqBloodGroupForm,
          units_required: reqUnits,
          hospital: reqHospital,
          contact_number: reqContact,
          needed_by: new Date(reqNeededBy).toISOString(),
          reason: reqReason,
          created_by: user.id,
          status: 'open'
        });

      if (error) throw error;

      setRequestSuccess("Blood request raised successfully! Our volunteers have been alerted.");
      
      // Reset form fields
      setReqPatientName("");
      setReqBloodGroupForm("A+");
      setReqUnits(1);
      setReqHospital("");
      setReqContact("");
      setReqNeededBy("");
      setReqReason("");
      
      // Refresh active requests list
      fetchActiveRequests();
    } catch (err) {
      console.error(err);
      setRequestError(err.message || "Failed to submit blood request. Please try again.");
    } finally {
      setSubmittingRequest(false);
    }
  };
  
  const fetchActiveRequests = async ()=>{
    const {error, data} = await supabase.from("blood_requests").select("*").eq("status", 'open');

    if(error){
      console.error("Error during fetching Active Request Data", error);
      return;
    }

    setActiveRequests(data);
  }

  useEffect(()=>{
    fetchActiveRequests();
  }, [])

  const filteredRequests = activeRequests.filter((request) => {
    const matchesSearch = 
      request.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospital?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.reason?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBloodGroup = 
      selectedBloodGroup === "All" || 
      request.blood_group === selectedBloodGroup;
    
    return matchesSearch && matchesBloodGroup;
  });

  return (
    <div className="bg-[#FAF9F6] text-slate-800 pb-16">
      <section className="border-b border-border">
        <div className="bg-red-800 px-6 pt-16 pb-24 flex flex-col md:flex-row gap-24 md:gap-0 relative" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 0% 100%)' }}>
          {/* Profile Button */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 text-sm"
            >
              <FaUser className="text-base" />
              <span>{user ? (profile?.full_name?.split(' ')[0] || "Profile") : "Sign In"}</span>
            </button>
          </div>
          <div className="basis-1/2">
            <p className="uppercase border border-red-500/30 px-3 py-2 w-fit m-auto rounded-full text-sm font-bold text-white flex flex-row gap-3 flex-nowrap items-center justify-center bg-red-500/20">
              <motion.span animate={{
                scale: 0.9,
                transition: {
                  repeat: Infinity,
                  duration: 1,
                  ease: 'linear'
                }

              }}><FaHeartbeat className="text-xl text-red-500" /></motion.span>
              <span>our blood budyy intiative</span></p>

            <div className="my-5">
              <h2 className="text-6xl/20 text-white text-center md:text-start">Give Blood,<br />
                <span className="bg-linear-to-r bg-clip-text text-transparent from-red-500 via-red-200 to-white"> Share Life.</span>
              </h2>
            </div>

            <p className="text-xl text-white text-center md:text-start">Every drop of blood you donate is a breath of life to someone in urgent need. NSS IIT Patna connects patient requirements with immediate volunteer donors seamlessly.</p>
            <div className="flex flex-wrap gap-8 mt-16 justify-center md:justify-start">
              <motion.button className="px-4 py-2 rounded transition-all bg-white text-text text-lg"><Link href={'#active-blood-request'}>View Active Requests</Link></motion.button>
              <motion.button className="px-4 py-2 rounded transition-all bg-rose-700 text-white text-lg hover:shadow-2xl hover:shadow-rose-500 hover:scale-105"><Link href={'#blood-request'}>Request Blood</Link></motion.button>
            </div>
          </div>

          <div className="basis-1/2 flex justify-center items-center">
            <motion.div className="relative m-auto h-60 w-60 shadow-rose-400 -shadow-5xl" initial={{ rotate: '45deg' }} whileInView={{
              rotate: '0deg',
              transition: {
                duration: 0.2,
                ease: 'easeIn'
              }
            }}
              viewport={{ once: true }}
            >
              <RiDropFill className=" text-rose-700 h-60 w-60 -rotate-45" />
              <div className="absolute -top-3 left-4 right-0 bottom-0 m-auto w-fit h-fit rotate-45 z-1 flex flex-col justify-center items-center">
                <MdOutlineWaterDrop className="text-5xl text-white" />
                <h3 className="text-3xl text-white mt-2 mb-1">O- A+ AB-</h3>
                <p className="uppercase text-white font-bold text-sm">be a hero today</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="-mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-3 sm:px-8">
          {STATS_DATA.map((item, index) => {
            return (
              <div key={index} className="rounded-2xl inset-shadow-2xl p-10 bg-white shadow-2xs flex flex-col justify-center items-center">
                <div className="p-4 rounded w-fit aspect-square" style={{ background: `${item.themeColor}10` }}><item.icon className={`text-2xl`} style={{ color: item.themeColor }} /></div>
                <h3 className="text-slate-800 mt-5 text-4xl">{item.count}</h3>
                <p className="text-center text-text font-semibold">{item.title}</p>
              </div>
            )
          })}
        </div>


      </section>


      <section className="my-16">
        <div className="flex flex-nowrap overflow-x-auto bg-slate-100 text-text py-2 px-2 rounded-xl gap-4 w-fit m-auto shadow-sm">
          <div className={cn("text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl", activeTab == 'active-request' && 'bg-white shadow-sm ')} onClick={() => setActiveTab('active-request')}>Active Requests</div>
          <div className={cn("text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl", activeTab == 'blood-request' && 'bg-white shadow-sm ')} onClick={() => setActiveTab('blood-request')}>Request Blood</div>
          <div className={cn("text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl", activeTab == 'become-donor' && 'bg-white shadow-sm ')} onClick={() => setActiveTab('become-donor')}>Become Donor</div>
        </div>
      </section>

      {activeTab == 'active-request' &&
        <section id="active-request" className="mx-1 sm:mx-5">
          <form className="bg-white py-4 px-8 border border-border rounded-xl flex flex-wrap gap-4 justify-between items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full sm:w-auto">
              <label className="hidden" htmlFor="search-active-request">Search Patient, Hospital, ....</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 shadow-xsm border border-border px-5 py-3 bg-slate-100 outline-primary transition-all rounded-xl text-slate-800"
                id="search-active-request"
                placeholder="Search Patient, Hospital, ...."
              />
            </div>
            <div>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="border border-border rounded-xl px-5 py-3 outline-primary bg-slate-50 text-slate-800 font-semibold"
              >
                <option value="All">All Blood Groups</option>
                {BLOOD_GROUPS.map((bg, i) => (
                  <option key={i} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </form>

          {filteredRequests.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center mt-10 shadow-xs max-w-lg mx-auto">
              <p className="text-slate-400 text-lg font-semibold">No active requests found matching your filters.</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria, or click "Become Donor" to register availability.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {filteredRequests.map((ar) => (
                <div key={ar.id} className="rounded-2xl pt-5 px-3 border-t-4 border-rose-500 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex flex-nowrap justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-xl text-slate-800">{ar.patient_name}</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Requested on {new Date(ar.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-rose-700/10 rounded-xl px-3 py-1 flex flex-col justify-center items-center h-fit">
                        <p className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">Group</p>
                        <h4 className="text-rose-700 text-base font-extrabold uppercase leading-none mt-0.5">{ar.blood_group}</h4>
                      </div>
                    </div>
                    
                    <ul className="list-none space-y-2 mb-4">
                      <li className="text-slate-500 text-sm font-sans flex items-center gap-2">
                        <FaHospital className="text-rose-500 flex-shrink-0" />
                        <span className="line-clamp-2">{ar.hospital}</span>
                      </li>
                      <li className="text-slate-500 text-sm font-sans flex items-center gap-2">
                        <FaDroplet className="text-rose-500 flex-shrink-0" />
                        <span>{ar.units_required} Units Required</span>
                      </li>
                      <li className="text-slate-500 text-sm font-sans flex items-center gap-2">
                        <FaClock className="text-rose-500 flex-shrink-0" />
                        <span className="border border-slate-200 bg-slate-50 text-[11px] font-semibold rounded-full px-2.5 py-0.5 text-slate-600">
                          Needed by {new Date(ar.needed_by).toLocaleDateString()}
                        </span>
                      </li>
                    </ul>
                    
                    <div className="bg-slate-50 text-slate-600 text-sm my-3 rounded-xl py-3 px-4 italic border border-slate-100">
                      "{ar.reason}"
                    </div>
                  </div>

                  <div className="flex flex-nowrap justify-between items-center border-t border-slate-100 py-3 mt-4">
                    <div className={cn("text-sm font-semibold", ar.status === 'open' ? "text-success" : "text-warning")}>
                      {ar.status === 'open' ? '• Active' : '• Closed'}
                    </div>
                    <button
                      onClick={() => setSelectedRequestForDonate(ar)}
                      className="bg-primary rounded-xl py-2 px-4 font-bold text-xs text-white cursor-pointer transition-all hover:bg-amber-600 shadow-sm active:scale-98"
                    >
                      Help Patient/Donate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      }

      {/* Request Blood Section */}
      {activeTab == 'blood-request' &&
        <div className="max-w-2xl mx-auto px-4 mt-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <FaSpinner className="animate-spin text-rose-600 text-4xl" />
              <p className="text-slate-500 font-semibold">Checking authentication...</p>
            </div>
          ) : !user ? (
            <div>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-center mb-6 text-sm">
                You must be logged in to raise a blood request. Please sign in or create an account.
              </div>
              {isSignIn ? (
                <>
                  <SignInForm />
                  <div className="text-center mt-4 text-slate-600">
                    <span>Do not have an account? </span>
                    <button className="text-primary hover:text-amber-600 font-bold underline cursor-pointer transition-all" onClick={() => setIsSignIn(false)}>
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <SignUpForm />
                  <div className="text-center mt-4 text-slate-600">
                    <span>Already registered? </span>
                    <button className="text-primary hover:text-amber-600 font-bold underline cursor-pointer transition-all" onClick={() => setIsSignIn(true)}>
                      Sign In
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6 text-slate-700">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="p-3.5 bg-rose-50 rounded-2xl">
                  <FaHeartbeat className="text-rose-600 text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Raise a Blood Request</h3>
                  <p className="text-sm text-slate-500">Submit patient details to find donors in our volunteer network.</p>
                </div>
              </div>

              {requestError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3 text-sm">
                  <GoAlertFill className="flex-shrink-0 text-lg text-red-500" />
                  <span>{requestError}</span>
                </div>
              )}

              {requestSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 text-sm">
                  <FaCheckCircle className="flex-shrink-0 text-lg text-emerald-600" />
                  <span>{requestSuccess}</span>
                </div>
              )}

              <form onSubmit={handleRequestBlood} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-600" htmlFor="req-patient-name">Patient Name:</label>
                  <input
                    id="req-patient-name"
                    type="text"
                    value={reqPatientName}
                    onChange={(e) => setReqPatientName(e.target.value)}
                    placeholder="Enter patient full name"
                    className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                    required
                    disabled={submittingRequest}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="req-blood-group-form">Blood Group Needed:</label>
                    <select
                      id="req-blood-group-form"
                      value={reqBloodGroupForm}
                      onChange={(e) => setReqBloodGroupForm(e.target.value)}
                      className="border border-border outline-primary py-2.5 px-3 bg-slate-50 rounded-xl"
                      disabled={submittingRequest}
                    >
                      {BLOOD_GROUPS.map((bg, idx) => (
                        <option key={idx} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="req-units">Units Required:</label>
                    <input
                      id="req-units"
                      type="number"
                      min="1"
                      value={reqUnits}
                      onChange={(e) => setReqUnits(parseInt(e.target.value) || 1)}
                      className="border border-border outline-primary py-2.5 px-3 bg-slate-50 rounded-xl"
                      required
                      disabled={submittingRequest}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-600" htmlFor="req-hospital">Hospital Name & Location:</label>
                  <input
                    id="req-hospital"
                    type="text"
                    value={reqHospital}
                    onChange={(e) => setReqHospital(e.target.value)}
                    placeholder="e.g. AIIMS, Patna"
                    className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                    required
                    disabled={submittingRequest}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="req-contact">Contact Number:</label>
                    <input
                      id="req-contact"
                      type="tel"
                      value={reqContact}
                      onChange={(e) => setReqContact(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white"
                      required
                      disabled={submittingRequest}
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="req-needed-by">Needed By Date:</label>
                    <input
                      id="req-needed-by"
                      type="date"
                      value={reqNeededBy}
                      onChange={(e) => setReqNeededBy(e.target.value)}
                      className="border border-border outline-primary py-2.5 px-3 bg-slate-50 rounded-xl text-slate-800"
                      required
                      disabled={submittingRequest}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-600" htmlFor="req-reason">Reason / Medical Condition:</label>
                  <textarea
                    id="req-reason"
                    value={reqReason}
                    onChange={(e) => setReqReason(e.target.value)}
                    placeholder="Describe the medical emergency..."
                    rows="3"
                    className="border border-border outline-primary py-2.5 px-4 text-slate-800 bg-slate-50/50 rounded-xl transition-all focus:bg-white resize-none"
                    required
                    disabled={submittingRequest}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingRequest}
                  className="w-full text-white bg-primary py-3 rounded-xl font-semibold shadow-md transition-all hover:bg-amber-600 active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {submittingRequest && <FaSpinner className="animate-spin" />}
                  Submit Request
                </button>
              </form>
            </div>
          )}
        </div>
      }

      {/* Become Donor Section */}
      {activeTab == 'become-donor' &&
        <div className="max-w-2xl mx-auto px-4 mt-10">
          {loading || checkingDonor ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <FaSpinner className="animate-spin text-rose-600 text-4xl" />
              <p className="text-slate-500 font-semibold">Retrieving authentication and donor records...</p>
            </div>
          ) : !user ? (
            <div>
              {isSignIn ? (
                <>
                  <SignInForm />
                  <div className="text-center mt-4 text-slate-600">
                    <span>Do not have an account? </span>
                    <button className="text-primary hover:text-amber-600 font-bold underline cursor-pointer transition-all" onClick={() => setIsSignIn(false)}>
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <SignUpForm />
                  <div className="text-center mt-4 text-slate-600">
                    <span>Already registered? </span>
                    <button className="text-primary hover:text-amber-600 font-bold underline cursor-pointer transition-all" onClick={() => setIsSignIn(true)}>
                      Sign In
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : donorInfo ? (
            /* Logged in AND already registered as a donor */
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6 text-slate-700">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="p-3.5 bg-rose-50 rounded-2xl">
                  <FaUserCheck className="text-rose-600 text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">You are a Registered Donor</h3>
                  <p className="text-sm text-slate-500">Thank you! Your information helps save lives in our community.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase text-slate-400">Blood Group</span>
                  <span className="text-2xl font-extrabold text-rose-600 mt-1">{donorInfo.blood_group}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase text-slate-400">Availability</span>
                  <span className={`text-lg font-bold mt-1 ${donorInfo.is_available ? 'text-success' : 'text-slate-500'}`}>
                    {donorInfo.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase text-slate-400">Last Donation</span>
                  <span className="text-sm font-semibold text-slate-700 mt-1">
                    {donorInfo.last_donation_date ? new Date(donorInfo.last_donation_date).toLocaleDateString() : 'None Logged'}
                  </span>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleUpdateDonor} className="flex flex-col gap-4 border-t border-slate-100 pt-5 mt-2">
                <h4 className="text-lg font-bold text-slate-800">Update Donation Settings</h4>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="edit-blood-group">Blood Group:</label>
                    <select
                      id="edit-blood-group"
                      value={regBloodGroup}
                      onChange={(e) => setRegBloodGroup(e.target.value)}
                      className="border border-border outline-primary py-2 px-3 bg-slate-50 rounded-xl"
                      disabled={registering}
                    >
                      {BLOOD_GROUPS.map((bg, idx) => (
                        <option key={idx} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="edit-last-date">Last Donation Date:</label>
                    <input
                      id="edit-last-date"
                      type="date"
                      value={regLastDate}
                      onChange={(e) => setRegLastDate(e.target.value)}
                      className="border border-border outline-primary py-2 px-3 bg-slate-50 rounded-xl"
                      disabled={registering}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    id="edit-available"
                    type="checkbox"
                    checked={regAvailable}
                    onChange={(e) => setRegAvailable(e.target.checked)}
                    className="w-4 h-4 text-rose-600 border-slate-300 rounded focus:ring-rose-500 accent-rose-600"
                    disabled={registering}
                  />
                  <label htmlFor="edit-available" className="text-sm font-medium text-slate-700 cursor-pointer">
                    I am healthy and available to donate blood immediately
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={registering}
                    className="flex-1 text-white bg-primary py-3 rounded-xl font-semibold shadow-md transition-all hover:bg-amber-600 active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {registering && <FaSpinner className="animate-spin" />}
                    Update Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleUnregisterDonor}
                    disabled={registering}
                    className="sm:w-fit px-5 text-red-600 border border-red-200 hover:bg-red-50 py-3 rounded-xl font-semibold transition-all active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaTrash />
                    Unregister
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Logged in but NOT registered as a donor */
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6 text-slate-700">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="p-3.5 bg-rose-50 rounded-2xl">
                  <BiSolidDonateBlood className="text-rose-600 text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Become a Blood Donor</h3>
                  <p className="text-sm text-slate-500">Sign up to make yourself available for emergency blood requests.</p>
                </div>
              </div>

              <form onSubmit={handleRegisterDonor} className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="reg-blood-group">Select Your Blood Group:</label>
                    <select
                      id="reg-blood-group"
                      value={regBloodGroup}
                      onChange={(e) => setRegBloodGroup(e.target.value)}
                      className="border border-border outline-primary py-2.5 px-3 bg-slate-50 rounded-xl"
                      disabled={registering}
                    >
                      {BLOOD_GROUPS.map((bg, idx) => (
                        <option key={idx} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="reg-last-date">Last Donation Date (if any):</label>
                    <input
                      id="reg-last-date"
                      type="date"
                      value={regLastDate}
                      onChange={(e) => setRegLastDate(e.target.value)}
                      className="border border-border outline-primary py-2.5 px-3 bg-slate-50 rounded-xl"
                      disabled={registering}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    id="reg-available"
                    type="checkbox"
                    checked={regAvailable}
                    onChange={(e) => setRegAvailable(e.target.checked)}
                    className="w-4 h-4 text-rose-600 border-slate-300 rounded focus:ring-rose-500 accent-rose-600"
                    disabled={registering}
                  />
                  <label htmlFor="reg-available" className="text-sm font-medium text-slate-700 cursor-pointer">
                    I am healthy and available to donate blood immediately
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={registering}
                  className="w-full text-white bg-primary py-3 rounded-xl font-semibold shadow-md transition-all hover:bg-amber-600 active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {registering && <FaSpinner className="animate-spin" />}
                  Register as Donor
                </button>
              </form>
            </div>
          )}
        </div>
      }

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 mt-2">Find answers to common questions about blood donation and requesting blood.</p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all duration-200">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-hidden hover:bg-slate-50/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-800 text-lg">{faq.title}</span>
                  {isOpen ? (
                    <FaChevronUp className="text-rose-600 transition-transform duration-200" />
                  ) : (
                    <FaChevronDown className="text-slate-400 transition-transform duration-200" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-6 py-4 text-slate-600 text-base leading-relaxed border-t border-slate-100"
                    dangerouslySetInnerHTML={{ __html: faq.details }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Donation Modal */}
      <AnimatePresence>
        {selectedRequestForDonate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 text-slate-700"
            >
              <button
                onClick={() => setSelectedRequestForDonate(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <FaHeartbeat className="text-rose-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Donate Blood / Help Patient</h3>
                  <p className="text-sm text-slate-500">Coordinate directly with the requester.</p>
                </div>
              </div>

              <div className="space-y-4 my-6">
                <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                  <p className="text-sm"><strong className="text-slate-800">Patient:</strong> {selectedRequestForDonate.patient_name}</p>
                  <p className="text-sm"><strong className="text-slate-800">Blood Group Needed:</strong> <span className="text-rose-600 font-bold">{selectedRequestForDonate.blood_group}</span></p>
                  <p className="text-sm"><strong className="text-slate-800">Hospital:</strong> {selectedRequestForDonate.hospital}</p>
                  <p className="text-sm"><strong className="text-slate-800">Reason:</strong> {selectedRequestForDonate.reason}</p>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-center space-y-1">
                  <span className="text-xs font-bold uppercase text-rose-500">Contact Coordinator / Family</span>
                  <p className="text-2xl font-extrabold text-slate-800 my-1">{selectedRequestForDonate.contact_number}</p>
                  <a
                    href={`tel:${selectedRequestForDonate.contact_number}`}
                    className="inline-block mt-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2 rounded-xl text-sm shadow-md transition-all cursor-pointer"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                NSS IIT Patna is a voluntary mediator and does not guarantee or charge for any blood donation transactions. Please verify credentials independently.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Sidebar Drawer */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setIsProfileOpen(false)} />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-[#FAF9F6] h-full shadow-2xl overflow-y-auto flex flex-col p-6 border-l border-slate-200 z-10 text-slate-700"
            >
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer z-20"
              >
                ✕
              </button>
              
              <div className="mt-8 flex-1">
                {!user ? (
                  <div className="py-6">
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-center mb-6 text-sm">
                      You must be logged in to manage your profile.
                    </div>
                    {isSignIn ? (
                      <>
                        <SignInForm />
                        <div className="text-center mt-4 text-slate-600">
                          <span>Do not have an account? </span>
                          <button className="text-primary hover:text-amber-600 font-bold underline cursor-pointer" onClick={() => setIsSignIn(false)}>
                            Sign Up
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <SignUpForm />
                        <div className="text-center mt-4 text-slate-600">
                          <span>Already registered? </span>
                          <button className="text-primary hover:text-amber-600 font-bold underline cursor-pointer" onClick={() => setIsSignIn(true)}>
                            Sign In
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <ProfileManager />
                    <div className="text-center pb-10">
                      <button
                        onClick={() => {
                          signOut();
                          setIsProfileOpen(false);
                        }}
                        className="w-full max-w-xs px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}