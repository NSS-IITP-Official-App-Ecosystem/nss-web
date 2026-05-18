'use client'

import Slider from '@/components/Slider';
import Link from 'next/link';
import slider_data from '../data/slider_data.json'
import { motion } from 'framer-motion';
import units_data from '../data/units.json'
import Image from 'next/image';


export default function Home() {
  return (
    <>
    <Slider data={slider_data}></Slider>
    
    {/* What we are section */}
    <section className="bg-olive-50 pt-10 pb-10 mb-8 mt-8">
    <div className=" ps-2 pe-2 max-w-300 ms-auto me-auto flex flex-col items-center" id="home-nss-about">
      <h3 id="home-nss-about-title uppercase" className="mb-5 text-center text-4xl font-bold text-primary">WE ARE NSS IIT PATNA!</h3>
      <p id="home-nss-about-detail" className="text-text text-sm max-w-[75ch] self-center">The National Service Scheme of IIT Patna is an initiative to bring about a change in the Social and Economic forms of the Society. NSS believes that "Service to Mankind is Service to GOD" and with this mindset the members of NSS are ready to carve out humanity out of every social cause. The Scheme runs with a motive to inculcate Social Responsibilties in the youth who will be tomorrow's work force of the Nation at Institute Level is headed by a panel of administrative body, supported by General Secretary and Mentors of Different Cells who give guidance to nearly 120 Enthusiastic and Energetic Volunteers.</p>
      <motion.iframe initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }} className="mt-5 rounded-4xl max-w-full" width="800" height="458" src="https://www.youtube.com/embed/EngW7tLk6R8" title="Sample Videos / Dummy Videos For Demo Use" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></motion.iframe>
    </div>
    </section>

    {/* our units */}
    <section id="home-our-units">
    <div className="flex flex-col items-center">
      <motion.h2  className="text-4xl font-semibold uppercase"
        initial = {{
          opacity : 0,
          scale : 0
        }}
        whileInView={{
          opacity : 1,
          scale : 1
        }}
        transition={{
          duration: 0.8
        }}
        viewport={{
          once : true
        }}
      >Our Units</motion.h2>
      </div>

      <div className="mt-5 mb-5 flex gap-5 justify-center">
        {
          units_data.items.map((item, i, items)=>{
            return (
                <motion.div key={i} className="flex flex-col max-w-80 items-center rounded-2xl border-zinc-100 border-2 shadow-xl bg-orange-200">
                  <Image className="rounded-t-[inherit]" src={item.thumbnail} width={400} height={300}/>
                  <h2 className="text-2xl font-semibold uppercase mt-3 mb-3">{item.title}</h2>
                  <button className="button-primary mt-3 mb-3"><Link href={item.action.url}>{item.action.text}</Link></button>
                </motion.div>
            )
          })
        }
      </div>
    </section>
    </>
  );
}
