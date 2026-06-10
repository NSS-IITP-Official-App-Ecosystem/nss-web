"use client"
import AnimatedCounter from "@/components/AnimatedCounter";
import { useRef } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineWaterDrop } from "react-icons/md";
import Link from 'next/link'

import { motion } from 'framer-motion'


export default function RequestBloodPage() {
    return (
        <>
            <section>
                <div className="bg-red-800 px-6 py-16 flex flex-col md:flex-row gap-24 md:gap-0">
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
        </>
    )
}