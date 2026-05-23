'use client'
import {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import {Children} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import {cn} from '@/components/utils'
import Image from 'next/image';
import { FaQuoteLeft } from "react-icons/fa";

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

export default function Testimonial({children, variants, Defaultactive, className}){

    const [active, setActive] = useState(Defaultactive ||  0);
    const [forwarded, setForwarded] = useState(true);

    const doNext = () =>{
        setActive((active + 1) % Children.count(children));
        setForwarded(true);
    }

    const doPrev = () => {
        if(active == 0) setActive(Children.count(children) - 1)
        else setActive(active  - 1);
        setForwarded(false);
    }

    return (
        <div className="">
            <div className={cn("relative overflow-hidden w-full", className)}>
                <AnimatePresence>
               {Children.map(children, (child, i)=>{
                    if(i != active) return;
                    return (
                        <motion.div
                            key={i}
                            custom={forwarded}
                            variants={variants || sliderVariants}
                            initial="incoming"
                            animate="active"
                            exit="exiting"
                            className='absolute top-0 left-0 w-full h-full overflow-hidden' 
                            style={{ borderRadius: 'inherit' }}
                        >
                            {child}
                        </motion.div>
                    )
               })}  
                </AnimatePresence>
                <motion.button whileHover={{background: 'var(--primary)'}} onClick={doPrev} className="absolute left-5 top-0 bottom-0 m-auto h-fit text-white text-xl font-bold  p-3 cursor-pointer bg-text rounded-full z-50"><IoIosArrowBack/></motion.button>
                <motion.button whileHover={{background: 'var(--primary)'}} onClick={doNext} className="absolute right-5 top-0 bottom-0 m-auto h-fit text-white text-xl  font-bold p-3 cursor-pointer bg-text  rounded-full z-50"><MdNavigateNext/></motion.button>    
                    
            </div>
        </div>
    )
}

export function TestimonialItem({data, className}){
     return (
        <div className = {cn ("h-full w-full flex items-center justify-center",className)}>
            <div className="h-90 max-w-200 flex rounded-xl gap-4 border border-gray-200 shadow-2xl">
                <motion.div className="basis-[30%] rounded-bl-xl rounded-tl-xl">
                    <Image className="rounded-[inherit]" src={data.img} alt='' height={200} width={100} objectFit="cover" style={{height:'100%', width:'100%', objectFit:'cover'}}></Image>
                </motion.div>
                <motion.div className="basis-[70%] flex flex-col gap-4 pe-2 pbs-2">
                <FaQuoteLeft className="text-6xl"/>
                    <p className="text-text" dangerouslySetInnerHTML={{__html : data.text}}></p>
                    <div>
                    <h3>{data.name}</h3>
                    <h4>{data.position}</h4>
                    </div> 
                </motion.div>
            </div>
        </div>
     )
}