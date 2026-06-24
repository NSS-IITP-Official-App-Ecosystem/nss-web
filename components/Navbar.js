"use client";

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom'
import Link from 'next/link';
import { FaChevronDown, FaCross } from 'react-icons/fa';
import { cn } from './utils';
import { FaBarsStaggered } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, stagger } from 'framer-motion';
import { p } from 'framer-motion/client';
import { RxCross2 } from 'react-icons/rx';

const HIGH_LINKS = [
  {
    "text": "Home",
    "link": "/"
  },
  {
    "text": "Our Team",
    "link": "/our-team"
  },
  {
    "text": "Think-Thank",
    "link": "/think-thank"
  },
  {
    "text": "Wings",
    "link": "#"
  }
];
const LINKS = [
  {
    "text": "Departements",
    "link": "#",
    "sub-items": [
      {
        "text": "Departements 1",
        "link": "/departements-1"
      },
      {
        "text": "Departements 1",
        "link": "/departements-1"
      },
      {
        "text": "Departements 1",
        "link": "/departements-1"
      }
    ]
  },
  {
    "text": "Our Wings",
    "link": "#",
    "sub-items": [
      {
        "text": "wing 1",
        "link": "/wing-1"
      },
      {
        "text": "wing 1",
        "link": "/wing-1"
      },
      {
        "text": "wing 1",
        "link": "/wing-1"
      },
      {
        "text": "wing 1",
        "link": "/wing-1"
      }
    ]
  },
  {
    "text": "Think-Thank",
    "link": "/think-thank"
  },
  {
    "text": "Our Units",
    "link": "/units"
  }
]
export default function Navbar() {

  return (
    <nav className="bg-white shadow-sm border-b border-border top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <NavDrawer />
            <Link href="/" className="shrink-0 flex items-center gap-2">
              <span className="font-bold text-2xl text-brand-blue">NSS IITP</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {HIGH_LINKS.map((nav_item, index) => {
              return (
                <Link key={index} href={nav_item.link} className={cn("text-secondary-slate hover:text-brand-blue font-medium transition-all", "hover:border-b-2 border-brand-blue")}>
                  {nav_item.text}
                </Link>
              );
            })
            }

            {/* Units Dropdown */}
            {/* <div className="relative"
              onMouseEnter={() => setIsUnitsOpen(true)}
              onMouseLeave={() => setIsUnitsOpen(false)}>
              <button
                onClick={() => setIsUnitsOpen(!isUnitsOpen)}
                className="flex items-center gap-1 text-secondary-slate hover:text-brand-blue font-medium transition-colors h-16 cursor-pointer"
                aria-haspopup="true"
              >
                Units <FaChevronDown className={`text-sm transition-transform duration-200 ${isUnitsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUnitsOpen && (
                <div className="absolute top-16 right-0 w-48 bg-white border border-neutral-foundation rounded-md shadow-lg py-1 z-50">
                  <Link href="/units/unit-1" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Unit 1
                  </Link>
                  <Link href="/units/unit-2" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Unit 2
                  </Link>
                  <Link href="/units/unit-3" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Unit 3
                  </Link>
                </div>
              )}
            </div> */}

            {/* Wings Dropdown */}
            {/* <div className="relative"
              onMouseEnter={() => setIsWingsOpen(true)}
              onMouseLeave={() => setIsWingsOpen(false)}>
              <button
                onClick={() => setIsWingsOpen(!isWingsOpen)}
                className="flex items-center gap-1 text-secondary-slate hover:text-brand-blue font-medium transition-colors h-16 cursor-pointer"
                aria-haspopup="true"
              >
                Wings <FaChevronDown className={`text-sm transition-transform duration-200 ${isWingsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isWingsOpen && (
                <div className="absolute top-16 right-0 w-56 bg-white border border-neutral-foundation rounded-md shadow-lg py-1 z-50">
                  <Link href="/wings/prayatna" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Prayatna
                  </Link>
                  <Link href="/wings/chetna" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Chetna
                  </Link>
                  <Link href="/wings/rural" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Rural Development
                  </Link>
                  <Link href="/wings/environmental" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Environmental Wing
                  </Link>
                  <Link href="/wings/dnc" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Designer Creation (DNC)
                  </Link>
                  <Link href="/wings/teaching" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Teaching Wing
                  </Link>
                </div>
              )}
            </div> */}

          </div>
        </div>
      </div>


      {/* {isNavDrawerOpen && <div onClick={(e) => {
        e.stopPropagation();
        if (e.target != e.currentTarget) return;
        setIsNavDrawerOpen(false);
      }}
        className="absolute inset-0 bg-black/10 backdrop-blur-xl z-50"> */}



      {/* </div>} */}


    </nav >
  );
}

function NavDrawer({ }) {

  const navDrawerVariants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      height: '100vh',
      width: '100%'
    }),
    closed: {
      clipPath: `circle(30px at 40px 40px)`,
    },
  }

  const navVariants = {
    open: {
      transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
    },
    closed: {
      transition: { delayChildren: stagger(0.05, { from: "last" }) },
    },
  }

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed:  {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsNavDrawerOpen(false);
    return () => setIsNavDrawerOpen(false);
  }, [pathName]);
 
  return (
    <div>
      <button className="relative z-1 cursor-pointer active:translate-x-1 transition-all" onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}><FaBarsStaggered /></button>
      <motion.div
        initial={false}
        variants={navDrawerVariants}
        animate={isNavDrawerOpen ? 'open' : 'closed'}

        className={cn(`left-0 top-0 absolute overflow-y-auto h-full max-w-2xl bg-white rounded-tr-2xl rounded-br-2xl md:rounded-tr-4xl md:rounded-br-4xl flex flex-col`)}>
        <div className="flex flex-row justify-start">
          <button className="cursor-pointer active:translate-x-1 transition-all" onClick={() => setIsNavDrawerOpen(false)}><RxCross2 /></button>
        </div>
        <div className="flex flex-nowrap gap-4 p-2">
          <motion.div variants={navVariants} className="flex flex-col gap-5 p-5 border-r border-border text-lg font-sans basis-1/2">
            {LINKS.map((nav_item, index) => {
              return (
                <motion.div key={index} variants={navItemVariants}>
                  <Link onClick={() => {
                    if (index != selectedIndex && nav_item.link == "#")
                      setSelectedIndex(index)
                  }}
                    key={index} href={nav_item.link} className={cn("text-secondary-slate hover:text-brand-blue font-medium transition-all py-2 px-3 hover:bg-slate-50", index == selectedIndex && "border-l-4 border-brand-blue")}>
                    {nav_item.text}
                  </Link>
                </motion.div>
              );
            })
            }
          </motion.div>
          <motion.div variants={navVariants} className="flex flex-col gap-5 p-5 text-lg font-sans basis-1/2">
            {LINKS[selectedIndex]["sub-items"]?.map((nav_item, index) => {
              return (
                <motion.div key={index} variants={navItemVariants}>
                <Link key={index} href={nav_item.link} className={cn("text-secondary-slate hover:text-brand-blue font-medium transition-all py-2 px-3 hover:bg-slate-50 ")}>
                  {nav_item.text}
                </Link>
                </motion.div>
              );
            })
            }
          </motion.div>
        </div>
      </motion.div>
    </div>

  )
}

// function useDimension({ref}){
//   const [dim, setDim] = useState({
//     width : null,
//     height : null,
//     x : null,
//     y : null
//   });

//   const r = useRef(ref);

//   useEffect(()=>{
//     if(typeof ref == HTMLElement){
//       const dimensions = ref.getClientBoundRect();
//       setDim({
//         width : dimensions.width,
//         height : dimensions.height,
//         x : dimensions.x,
//         y : dimensions.y
//       })
//     }
//   }, [ref]);

//   return dim;
// }