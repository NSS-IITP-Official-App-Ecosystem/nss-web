'use client'

import Image from 'next/image'
import {useState} from 'react'
import {cn} from '../components/utils'
import {AnimatePresence, motion} from 'framer-motion'
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

           // 1. Define your animation states outside your component (or inside)
const sliderVariants = {
    incoming: (forwarded) => ({
        // New image starts off-screen
        x: forwarded ? '100%' : '-100%',
        opacity: 0,
        scale: 0.9, // Slight zoom-out for depth
    }),
    active: {
        // Center stage
        x: '0%',
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 50 }
    },
    exiting: (forwarded) => ({
        // Exiting image moves slower (-20% or 20%) creating a parallax effect
        x: forwarded ? '-20%' : '20%',
        opacity: 0,
        scale: 0.9,
        transition: { type: "spring", stiffness: 300, damping: 50 }
    })
};

export default function Slider({data}){
    const [active, setActive] = useState(data.active || 0);
    const [forwarded, setForwarded] = useState(true);

    const doNext = () =>{
        setActive((active + 1) % data.items.length);
        setForwarded(true);
    }

    const doPrev = () => {
        if(active == 0) setActive(data.items.length - 1)
        else setActive(active  - 1);
        setForwarded(false);
    }
    return (
        <>
         

<div className="relative w-full overflow-hidden bg-black" style={{ borderRadius: 'inherit', height: '500px' }}>
    {/* custom prop passes the direction to the variants */}
    <AnimatePresence initial={false} custom={forwarded}>
        {data.items.map((item, i) => {
            if (active !== i) return null;
            
            return (
                <motion.div
                    key={i}
                    custom={forwarded}
                    variants={sliderVariants}
                    initial="incoming"
                    animate="active"
                    exit="exiting"
                    className='absolute top-0 left-0 w-full h-full overflow-hidden' 
                    style={{ borderRadius: 'inherit' }}
                >
                    {item.content && (
                        <motion.div 
                            // Add a subtle upward slide to the text content
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }} 
                            className="absolute w-fit backdrop-blur-xs bg-white/10 left-8 top-0 bottom-0 m-auto rounded-md h-fit p-4 md:p-8 z-10"
                        >
                            <button className="text-white">{item.content.update_text}</button>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl text-white mt-2 md:mt-4">
                                {item.content.title}
                            </h3>
                            {item.content.action && (
                                <button className="bg-primary p-2 rounded-sm text-white mt-2 md:mt-4">
                                    <Link href={item.content.action.link}>{item.content.action.text}</Link>
                                </button>
                            )}
                        </motion.div>
                    )}
                    
                    <Image 
                        style={{ borderRadius: 'inherit', objectFit: 'cover' }} 
                        className='block w-full h-full' 
                        alt='' 
                        width={1600} 
                        height={900} 
                        src={item.url}
                    />
                </motion.div>
            );
        })}
    </AnimatePresence>

           
                <motion.button whileHover={{background: 'var(--primary)'}} onClick={doPrev} className="absolute left-5 top-0 bottom-0 m-auto h-fit text-white text-xl font-bold  p-3 cursor-pointer bg-text rounded-full z-50"><IoIosArrowBack/></motion.button>
            <motion.button whileHover={{background: 'var(--primary)'}} onClick={doNext} className="absolute right-5 top-0 bottom-0 m-auto h-fit text-white text-xl  font-bold p-3 cursor-pointer bg-text  rounded-full z-50"><MdNavigateNext/></motion.button>    
        </div>
        </>
    )
}