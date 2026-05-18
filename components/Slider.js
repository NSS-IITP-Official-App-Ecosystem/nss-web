'use client'

import Image from 'next/image'
import {useState} from 'react'
import {cn} from '../components/utils'
import {motion} from 'framer-motion'
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";



export default function Slider({data}){
    const [active, setActive] = useState(data.active || 0);
    const [forwarded, setForwarded] = useState(true);

    const doNext = () =>{
        setActive(Math.min(active + 1, data.items_count - 1));
        setForwarded(true);
    }

    const doPrev = () => {
        setActive(Math.max(0, active - 1));
        setForwarded(false);
    }
    return (
        <>
        <div className="w-full p-2 relative overflow-auto scrollbar-none">
            <div className="rounded-2xl"> 
                {
                    data.items.map((item, i, arr)=>{
                        if(active != i) return;
                        return (
                            <motion.div 
                            initial={{x:(forwarded ? '100%' : '-100%'), opacity:0}} 
                            animate={{x: '0%', opacity:1}} key={i} className='w-full relative' style={{borderRadius:'inherit'}}
                            transition={{'ease':'easeIn'}}
                            >
                              { item.content && 
                               <motion.div initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{delay: 0.3}} className="absolute w-fit backdrop-blur-xs bg-white/10 left-8 top-0 bottom-0 m-auto rounded-md h-fit p-4 md:p-8">
                                <button className="text-white">{item.content.update_text}</button>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl text-white mt-2 md:mt-4">{item.content.title}</h3>
                                {item.content.action && 
                                    <button className="bg-primary p-2 rounded-sm text-white mt-2 md:mt-4"><Link href={item.content.action.link}>{item.content.action.text}</Link></button>
                                }
                                </motion.div>
                                }
                            <Image style={{borderRadius: 'inherit', objectFit:'cover'}} className='block w-full h-screen' alt='' width={1600} height={900} src={item.url}/>
                            </motion.div>
                        )
                    })
                }
            </div>
                <button disabled={active == 0} onClick={doPrev} className="absolute left-5 top-0 bottom-0 m-auto h-fit text-white p-2 cursor-pointer bg-text hover:bg-primary transition rounded"><IoIosArrowBack/></button>
            <button disabled={active == data.items_count - 1} onClick={doNext} className="absolute right-5 top-0 bottom-0 m-auto h-fit text-white p-2 cursor-pointer bg-text hover:bg-primary transition rounded"><MdNavigateNext/></button>    
        </div>
        </>
    )
}