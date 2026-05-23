'use client'

import './home.css';
import Slider from '@/components/Slider';
import Link from 'next/link';
import slider_data from '@/data/slider_data.json'
import { motion } from 'framer-motion';
import units_data from '../data/units.json'
import events_data from '../data/events.json'
import Image from 'next/image';
import { cn } from '@/components/utils';
import Testimonial, { TestimonialItem } from '@/components/testimonial';
import testimonial_data from '@/data/testimonial.json'
import * as Icons from 'react-icons/pi'
import impacts_data from '@/data/impacts.json'


export default function Home() {
  return (
    <>
      <Slider data={slider_data}></Slider>

      {/* What we are section */}
      <section className="bg-olive-50 pt-10 pb-10 mb-8 mt-8">
        <div className=" ps-2 pe-2 max-w-300 ms-auto me-auto flex flex-col items-center" id="home-nss-about">
          <p className="text-primary font-semibold text-md mb-5 "><span className="border w-8 inline-block border-primary align-middle me-2"></span>who we are<span className="border w-8 inline-block border-primary align-middle ms-2"></span></p>
          <h3 id="home-nss-about-title uppercase" className="mb-5 text-center text-4xl font-bold flex flex-col justify-center items-center"><span className="text-brand-blue"> WE ARE NSS </span> <span className="text-primary">IIT PATNA!</span></h3>
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
          <motion.h2 className="text-4xl font-semibold uppercase"
            initial={{
              opacity: 0,
              scale: 0
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.8
            }}
            viewport={{
              once: true
            }}
          >Our Units</motion.h2>
        </div>

        <div className="mt-5 mb-5 flex gap-5 justify-center flex-wrap">
          {
            units_data.items.map((item, i, items) => {
              return (
                <motion.div key={i} className="rounded-2xl max-w-80 relative overflow-hidden p-0.5">
                  <motion.div
                    className="rotating-glow"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity ,
                      duration: 3,     // Adjust this for spin speed
                      ease: "easeInOut",  // Linear ensures a smooth, continuous spin
                    }} />
                  <div className="flex flex-col items-center rounded-2xl border-zinc-100 border-2 relative w-full h-full z-10 bg-amber-200 shadow-2xl">
                    <Image className="rounded-t-[inherit]" src={item.thumbnail} width={400} height={300} />
                    <h2 className="text-2xl font-semibold uppercase mt-3 mb-3">{item.title}</h2>
                    <button className="button-primary rotate-border mt-3 mb-3"><Link href={item.action.url}>{item.action.text}</Link></button>
                  </div>
                </motion.div>
              )
            })
          }
        </div>
      </section>

      {/* recent events section */}
      <section id="home-recent-events mb-5 mt-5 bg-gray-50">
          <h2 className="text-center">Recent Events</h2>
          {events_data.items.map((item, i , items)=>{
             return(
                <div key={i} className={cn("flex", i%2 != 0 && "flex-row-reverse")}>
                  <div className="flex-1 flex justify-around relative">
                  </div>
                  <div className="event-timeline relative flex items-center justify-center"> 
                     <motion.div  initial={{opacity : 0.5, boxShadow: "0px 0px 0px 0px rgba(255, 255, 0, 0.8)"}} animate= {{opacity : 1, boxShadow: "0px 0px 0px 10px rgba(255, 255, 0, 0)"}} transition = {{repeat : Infinity, duration : 1, repeatType : "reverse"}} className=""></motion.div>
                     </div>
                  <div className="flex flex-1 justify-around">
                    <motion.div layout>
                      <EventsCard data={item}/>
                    </motion.div>
                    </div>
                </div>
              )
          })}
      </section>

      {/* testimonials */}
      <section className="home-testimonial mt-20 mb-10">
        <h2 className="text-center mb-10 mt-10">Testinomials</h2>
        <Testimonial className={"h-96"}>
         {testimonial_data.items.map((item, i)=>{
          return <TestimonialItem key={i} data={item} />
         })}
        </Testimonial>
      </section>

      {/* impacts in numbers */}
      <section id="home-impacts-in-number mt-20 mb-10" className="text-white m-auto bg-brand-blue md:w-[90%] rounded-2xl shadow-2xl pb-8 pt-8 pe-5 ps-5">
        <h2 className="text-center mb-10 mt-10 text-white">
          The Impact We Created
        </h2>
        <ImpactsInNumbers/>
      </section>
    </>
  );
}


function EventsCard({data}){
  return (
    <div className="event-cont flex justify-center ps-4 pe-4">
      
    <div className="event rounded-xl border border-gray-200">
      <Image className="event-img rounded-bl rounded-tl" src={data.thumbnail} width={100} height={100} objectFit="cover"/>
   
      <h3 className="event-title text-2xl">{data.title}</h3>
      <p className="event-details text-md text-gray-800">{data.details}</p>
      <p className="event-date text-sm text-gray-600 bg-amber-100 w-full text-center">{data.date}</p>
   
    </div>
    </div>
  )
}


function ImpactsInNumbers(){
  return (
    <>
    <div className="flex flex-row flex-wrap gap-8 justify-center">
        {
          impacts_data.items.map((item, i , items)=>{
            return (
              <div key={i} className="text-black impact-card rounded-xl border-border border shadow-xl max-w-75 p-4 bg-white flex flex-col gap-2">
                  <div className="flex justify-center items-center text-5xl mb-4">
                    <span className="text-green-800 p-4 bg-green-50 rounded-full"><DynamicIcon name={item.icon} /></span>
                    </div>
                  <h3 className="text-xl text-center">{item.title}</h3>
                  <p className="text-text text-sm text-center">{item.desc}</p>
                  <p className="mt-auto text-center text-primary text-ellipsis line-clamp-1 font-bold text-2xl uppercase"><strong>{item.count.replaceAll('_',',') + '+ ' + item.unit}</strong></p>
              </div>
            )
          })
        }
    </div>
    </>
  )
}

const DynamicIcon = ({ name, ...props }) => {
  const Icon = Icons[name];
  return Icon ? <Icon {...props} /> : <Icons.PiInfo {...props} />;
}