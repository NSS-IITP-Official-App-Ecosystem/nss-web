'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Children } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { cn } from '@/components/utils'
import Image from 'next/image';
import { FaQuoteLeft } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons, PrevButton, NextButton } from '@/components/EmblaNextPrev'
import { DotButton, useDotButton } from '@/components/EmblaDotButtons'
import '@/assets/css/embla.css'
import { GoDot } from "react-icons/go";

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

// export default function Testimonial({children, variants, Defaultactive, className}){

//     const [active, setActive] = useState(Defaultactive ||  0);
//     const [forwarded, setForwarded] = useState(true);

//     const doNext = () =>{
//         setActive((active + 1) % Children.count(children));
//         setForwarded(true);
//     }

//     const doPrev = () => {
//         if(active == 0) setActive(Children.count(children) - 1)
//         else setActive(active  - 1);
//         setForwarded(false);
//     }

//     return (
//         <div className="">
//             <div className={cn("relative overflow-hidden w-full", className)}>
//                 <AnimatePresence>
//                {Children.map(children, (child, i)=>{
//                     if(i != active) return;
//                     return (
//                         <motion.div
//                             key={i}
//                             custom={forwarded}
//                             variants={variants || sliderVariants}
//                             initial="incoming"
//                             animate="active"
//                             exit="exiting"
//                             className='absolute top-0 left-0 w-full h-full overflow-hidden' 
//                             style={{ borderRadius: 'inherit' }}
//                         >
//                             {child}
//                         </motion.div>
//                     )
//                })}  
//                 </AnimatePresence>
//                 <motion.button whileHover={{background: 'var(--primary)'}} onClick={doPrev} className="absolute left-5 top-0 bottom-0 m-auto h-fit text-white text-xl font-bold  p-3 cursor-pointer bg-text rounded-full z-50"><IoIosArrowBack/></motion.button>
//                 <motion.button whileHover={{background: 'var(--primary)'}} onClick={doNext} className="absolute right-5 top-0 bottom-0 m-auto h-fit text-white text-xl  font-bold p-3 cursor-pointer bg-text  rounded-full z-50"><MdNavigateNext/></motion.button>    

//             </div>
//         </div>
//     )
// }

export default function Testimonial({ children }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    });
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    return (
        <div className="testimonial-item-cont relative px-2 md:px-14">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {Children.map(children, (child, index) => {
                        return child;
                    })}
                </div>
            </div>
            <div className="hidden md:block">
                <div className="embla__buttons">
                    <PrevButton className="absolute top-1/2 -translate-y-1/2 left-0 z-20 shadow-md hover:scale-105 active:scale-95 transition-all"
                        onClick={() => onPrevButtonClick()}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton className="absolute top-1/2 -translate-y-1/2 right-0 z-20 shadow-md hover:scale-105 active:scale-95 transition-all"
                        onClick={() => onNextButtonClick()}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
            {/* Dot Navigation Buttons */}
            <div className="flex justify-center items-center gap-1.5 mt-6">
                {scrollSnaps.map((_, index) => (
                    <DotButton 
                        key={index} 
                        onClick={() => onDotButtonClick(index)}
                        className="p-1 cursor-pointer transition-all hover:scale-110"
                    >
                        <GoDot className={cn("text-lg text-slate-300 transition-colors duration-200", index === selectedIndex && "text-amber-500 scale-125")} />
                    </DotButton>
                ))}
            </div>
        </div>
    )
}

export function TestimonialItem({ data, className }) {
    return (
        <div className={cn("h-full w-full flex items-center justify-center p-3 sm:p-5", className)}>
            <div className="w-full max-w-3xl flex flex-col md:flex-row items-center md:items-start rounded-[2.2rem] gap-6 md:gap-8 border border-slate-100 bg-white shadow-xl shadow-slate-200/35 p-6 md:p-10 relative">
                
                {/* Large decorative quotation mark */}
                <FaQuoteLeft className="absolute top-6 right-8 text-slate-100/60 text-5xl md:text-7xl select-none pointer-events-none" />

                {/* Left Side: Avatar image */}
                <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full md:rounded-[1.8rem] overflow-hidden shrink-0 border-4 border-slate-50 shadow-md relative"
                >
                    <Image 
                        className="object-cover" 
                        src={data.img} 
                        alt={data.name || 'Volunteer avatar'} 
                        fill
                        sizes="(max-width: 768px) 96px, 144px"
                    />
                </motion.div>

                {/* Right Side: Quote message & Author bio */}
                <div className="flex-1 flex flex-col gap-3 text-center md:text-left min-w-0 z-10">
                    <p 
                        className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-light italic" 
                        dangerouslySetInnerHTML={{ __html: data.text }}
                    />
                    
                    <div className="mt-3 border-t border-slate-100 pt-4">
                        <h3 className="font-extrabold text-slate-800 text-base md:text-lg tracking-tight">
                            {data.name}
                        </h3>
                        <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono mt-1">
                            {data.position}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}