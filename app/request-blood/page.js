"use client"
import AnimatedCounter from "@/components/AnimatedCounter";
import { useRef, useState, useEffect } from "react";
import { FaClock, FaHeartbeat, FaHospital } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineWaterDrop } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { BiSolidDonateBlood } from "react-icons/bi";
import { cn } from '@/components/utils'


import Link from 'next/link'
import { motion } from 'framer-motion'
import { DynamicIcon } from "@/components/utils";
import { createBrowserClient } from "@supabase/ssr";
import { createCacheKey } from "next/dist/client/components/segment-cache/cache-key";
import { createClient } from "@/utils/supabase/client";
import { FaDroplet } from "react-icons/fa6";

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

export default function RequestBloodPage() {

  const [activeTab, setActiveTab] = useState("active-request"); // "active-request" | "blood-request" | "become-donor"
  const [activeRequests, setActiveRequests] = useState([]);
  const supabase = createClient();
  
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

  return (
    <div className="bg-[#FAF9F6] text-slate-800 pb-16">
      <section className="border-b border-border">
        <div className="bg-red-800 px-6 pt-16 pb-24 flex flex-col md:flex-row gap-24 md:gap-0 " style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 0% 100%)' }}>
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
          <form className="bg-white py-4 px-8 border border-border rounded-xl  flex flex-wrap justify-between items-center">
                <label className="hidden" htmlFor="search-active-request">Search Patient, Hospital, ....</label>
                <input type="text" className="shadow-xsm border border-border px-5 py-3 bg-slate-100 outline-primary transition-all rounded-xl" id="search-active-request" placeholder="Search Patient, Hospital, ...." />
                <select defaultValue={'Select All'} className="border border-border rounded px-5 py-3 outline-primary bg-slate-50">
                  <option value={'Select All'}>All Blood Group</option> 
                  {BLOOD_GROUPS.map((bg, i)=>{
                    return <option key={i} value={bg}>{bg}</option>
                  })}
                </select>
                
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                  {activeRequests.map((ar, i, ars)=>{
                    return (
                      <div className="rounded-2xl pt-5 px-3 border-t-4 border-rose-500 bg-white shadow-sm">
                        {/* <div className="h-1 bg-rose-500 mb-5"></div> */}
                        <div className="flex flex-nowrap justify-between">
                            <div><h4 className="font-bold text-xl">{ar.patient_name}</h4><p className="text-slate-500 text-sm">Requested on {new Date(ar.created_at).toLocaleDateString()}</p></div>
                        <div className="bg-rose-700/10 rounded-xl p-2 flex flex-col justify-center items-center">
                          <p className="text-sm text-rose-700 font-semibold">Group</p>
                          <h4 className="text-rose-700 text-lg font-bold uppercase">{ar.blood_group}</h4>
                        </div>
                        </div>
                        <ul className="list-none">
                          <li className="text-slate-500 line-clamp-3 text-ellipsis text-sm font-sans flex flex-nowrap items-center w-fit px-2 mb-1"><FaHospital className="inline me-2"/>{ar.hospital}</li>
                          <li className="text-slate-500 line-clamp-3 text-ellipsis text-sm font-sans flex flex-nowrap items-center w-fit px-2 mb-1"><FaDroplet className="inline me-2"/>{ar.units_required} {' Units Required'}</li>
                          <li className="text-slate-500 line-clamp-3 text-ellipsis text-sm font-sans flex flex-nowrap items-center w-fit px-2 mb-1"><FaClock className="inline me-2"/><span className="border border-slate-500 rounded-full px-2">{'Needed by ' + new Date(ar.needed_by).toLocaleDateString()}</span></li>
                        </ul>
                        <div className="bg-slate-500/10 text-slate-500 text-sm my-3 rounded-xl py-2 px-3 italic">
                          "{ar.reason}"
                        </div>

                        <div className="flex flex-nowrap justify-between items-center border-t border-border py-2 px-3">
                          <div className={cn(ar.status == 'open' ? "text-success" : "text-warning")}>{ar.status == 'open' ? 'Active' : 'Closed'}</div>
                          <button className="bg-primary rounded-lg py-2 px-3 font-bold text-sm text-white cursor-pointer transition-all hover:shadow shadow-primary">Help Patient/Donate</button>
                        </div>
                      </div>
                    )
                  })}
          </div>
        </section>
      }
      
      <section></section>
    </div>
  )
}