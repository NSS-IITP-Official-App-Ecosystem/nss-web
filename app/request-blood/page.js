"use client"
import AnimatedCounter from "@/components/AnimatedCounter";
import { useRef, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineWaterDrop } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { BiSolidDonateBlood } from "react-icons/bi";
import {cn} from '@/components/utils'


import Link from 'next/link'
import { motion } from 'framer-motion'
import { DynamicIcon } from "@/components/utils";

const STATS_DATA = [
    {
        'icon' : GoAlertFill,
        'title' : 'Total Request Raised',
        'count' : 243,
        'themeColor': '#ec003f'
    },
    {
        'icon' : BiSolidDonateBlood,
        'title' : 'Registered Volunteers',
        'count' : 118,
        'themeColor': '#ec003f'
    },
    {
        'icon' : FaCheckCircle,
        'title' : 'Successful Matches',
        'count' : 198,
        'themeColor': '#00a63e'
    },
    {
        'icon' : FaHeartbeat,
        'title' : 'Units Transfused (Liters)',
        'count' : 512,
        'themeColor': '#155dfc'
    }
]

export default function RequestBloodPage() {

    const [activeTab, setActiveTab] = useState("active-request"); // "active-request" | "blood-request" | "become-donor"
    return (
        <div className="bg-[#FAF9F6] text-slate-800 pb-16">
            <section className="border-b border-border">
                <div className="bg-red-800 px-6 pt-16 pb-24 flex flex-col md:flex-row gap-24 md:gap-0 " style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 0% 100%)'}}>
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
                        <motion.div className="relative m-auto h-60 w-60 shadow-rose-400 -shadow-5xl" initial={{rotate : '45deg'}} whileInView={{
                            rotate : '0deg',
                            transition : {
                                duration : 0.2,
                                ease : 'easeIn'
                            }
                        }}
                        viewport={{once: true}}
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
                    {STATS_DATA.map((item, index)=>{
                        return (
                            <div key={index} className="rounded-2xl inset-shadow-2xl p-10 bg-white shadow-2xs flex flex-col justify-center items-center">
                                <div className="p-4 rounded w-fit aspect-square" style={{ background: `${item.themeColor}10`}}><item.icon className={`text-2xl`} style={{color : item.themeColor}}/></div>
                                <h3 className="text-slate-800 mt-5 text-4xl">{item.count}</h3>
                                <p className="text-center text-text font-semibold">{item.title}</p>
                            </div>
                        )
                    })}
                </div>


            </section>
            
            
            <section className="my-16">
                    <div className="flex flex-nowrap overflow-x-auto bg-slate-100 text-text py-2 px-2 rounded-xl gap-4 w-fit m-auto shadow-sm">
                        <div className={cn("text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl", activeTab == 'active-request' && 'bg-white shadow-sm ')} onClick={()=>setActiveTab('active-request')}>Active Requests</div>
                        <div className={cn("text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl", activeTab == 'blood-request' && 'bg-white shadow-sm ')} onClick={()=>setActiveTab('blood-request')}>Request Blood</div>
                        <div className={cn("text-lg font-sans text-text py-3 px-5 cursor-pointer rounded-xl", activeTab == 'become-donor' && 'bg-white shadow-sm ')} onClick={()=>setActiveTab('become-donor')}>Become Donor</div>
                    </div>
            </section>

            <section id="active-request">
                    
            </section>
        </div>
    )
}