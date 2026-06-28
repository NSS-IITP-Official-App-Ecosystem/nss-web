"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, stagger } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  Home,
  Users,
  Lightbulb,
  Compass,
  LayoutGrid,
  Award,
  ArrowRight,
  Mail
} from 'lucide-react';
import { cn } from './utils';

const HIGH_LINKS = [
  {
    "text": "Home",
    "link": "/",
    "icon": Home
  },
  {
    "text": "Our Team",
    "link": "/our-team",
    "icon": Users
  },
  {
    "text": "Think-Thank",
    "link": "/think-thank",
    "icon": Lightbulb
  },
  {
    "text": "Wings",
    "link": "#",
    "icon": Compass
  },
  {
    "text": "Contact Us",
    "link": "/faq",
    "icon": Mail
  }
];

const LINKS = [
  {
    "text": "Departments",
    "link": "#",
    "icon": LayoutGrid,
    "sub-items": [
      {
        "text": "Department 1",
        "link": "/departments/1"
      },
      {
        "text": "Department 2",
        "link": "/departments/2"
      },
      {
        "text": "Department 3",
        "link": "/departments/3"
      }
    ]
  },
  {
    "text": "Our Wings",
    "link": "#",
    "icon": Compass,
    "sub-items": [
      {
        "text": "Prayatna",
        "link": "/wings/prayatna"
      },
      {
        "text": "Chetna",
        "link": "/wings/chetna"
      },
      {
        "text": "Rural Development",
        "link": "/wings/rural"
      },
      {
        "text": "Environmental Wing",
        "link": "/wings/environmental"
      },
      {
        "text": "Designer Creation (DNC)",
        "link": "/wings/dnc"
      },
      {
        "text": "Teaching Wing",
        "link": "/wings/teaching"
      }
    ]
  },
  {
    "text": "Think-Thank",
    "link": "/think-thank",
    "icon": Lightbulb
  },
  {
    "text": "Our Units",
    "link": "/units",
    "icon": Award,
    "sub-items": [
      {
        "text": "Unit 1",
        "link": "/units/unit-1"
      },
      {
        "text": "Unit 2",
        "link": "/units/unit-2"
      },
      {
        "text": "Unit 3",
        "link": "/units/unit-3"
      }
    ]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn("top-0 z-50 sticky transition-all duration-300 shadow-sm border-b border-slate-100")}>
      {/* Glassmorphism background container - prevents creating containing block for fixed drawer */}
      <div className={cn("absolute inset-0 -z-10 pointer-events-none transition-all duration-300 bg-white/85 backdrop-blur-md opacity-100")} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <NavDrawer />
            <Link href="/" className="shrink-0 flex items-center gap-2 group">
            <Image src='/nss iitp logo.png' width={48} height={48} alt='nss iit patna logo' />
              <span className="font-extrabold text-2xl text-brand-blue tracking-tight transition-colors duration-200 group-hover:text-brand-blue/80">
                NSS IITP
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            {HIGH_LINKS.map((nav_item, index) => {
              const Icon = nav_item.icon;
              return (
                <Link
                  key={index}
                  href={nav_item.link}
                  className={cn(
                    "flex items-center gap-1.5 text-secondary-slate hover:text-brand-blue font-medium transition-all py-1.5 px-3 rounded-lg hover:bg-slate-50 duration-200 active:scale-95"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4 opacity-70" />}
                  <span>{nav_item.text}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}

function NavDrawer() {
  const panelVariants = {
    open: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 220 }
    },
    closed: {
      x: '-100%',
      transition: { type: "spring", damping: 25, stiffness: 220 }
    }
  };

  const navVariants = {
    open: {
      transition: { delayChildren: stagger(0.05, { startDelay: 0.1 }) },
    },
    closed: {
      transition: { delayChildren: stagger(0.03, { from: "last" }) },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
      y: 30,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState(-1);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavDrawerOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathName]);

  useEffect(() => {
    if (isNavDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavDrawerOpen]);

  return (
    <>
      <button
        className="p-2 text-secondary-slate hover:text-brand-blue cursor-pointer rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-90 flex items-center justify-center"
        onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
        aria-label="Toggle menu"
      >
        {isNavDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isNavDrawerOpen && (
          <>
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
              onClick={() => setIsNavDrawerOpen(false)}
            />
            <motion.div
              key="drawer-panel"
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "w-[88vw] z-[100] fixed top-0 left-0 bg-white/90 backdrop-blur-xl shadow-2xl overflow-y-auto overflow-x-hidden h-full max-w-xl rounded-tr-3xl rounded-br-3xl flex flex-col border-r border-slate-100/50"
              )}
            >
              <div className="h-16 flex flex-row justify-end items-center px-4 border-b border-slate-100/50 shrink-0">
                <button
                  className="cursor-pointer p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all duration-200 flex items-center justify-center"
                  onClick={() => setIsNavDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tablet and Desktop Navigation */}
              <div className="hidden sm:flex flex-1 overflow-hidden">
                {/* Categories Left Side */}
                <motion.div
                  variants={navVariants}
                  className="w-1/2 flex flex-col gap-2 p-4 border-r border-slate-100 overflow-y-auto"
                >
                  {LINKS.map((nav_item, index) => {
                    const Icon = nav_item.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <motion.div
                        key={index}
                        variants={navItemVariants}
                        onClick={() => {
                          if (nav_item.link === "#") {
                            setSelectedIndex(index);
                          }
                        }}
                      >
                        <Link
                          href={nav_item.link}
                          className={cn(
                            "flex items-center justify-between py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer border border-transparent",
                            isSelected
                              ? "bg-brand-blue/5 text-brand-blue border-l-4 border-l-brand-blue rounded-l-none"
                              : "text-secondary-slate hover:text-brand-blue hover:bg-slate-50/75"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            {Icon && <Icon className={cn("w-4.5 h-4.5 opacity-70", isSelected && "opacity-100 text-brand-blue")} />}
                            <span>{nav_item.text}</span>
                          </div>
                          {nav_item.link === '#' && (
                            <ChevronRight className={cn("w-4 h-4 opacity-50", isSelected && "opacity-100 text-brand-blue translate-x-0.5")} />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Sub-items Right Side */}

                <div className="w-1/2 p-4 overflow-y-auto flex flex-col gap-2 bg-slate-50/30">
                  {LINKS[selectedIndex]["sub-items"] ? (
                    <>
                      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Explore {LINKS[selectedIndex].text}
                      </h3>
                      <motion.div
                        variants={navVariants}
                        className="flex flex-col gap-1.5"
                      >
                        {LINKS[selectedIndex]["sub-items"].map((sub_item, index) => (
                          <motion.div key={sub_item.text + index} variants={navItemVariants}>
                            <Link
                              href={sub_item.link}
                              className="group flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all duration-200"
                            >
                              <span className="text-secondary-slate group-hover:text-brand-blue font-medium text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                                {sub_item.text}
                              </span>
                              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400/80 gap-2 p-6 text-center select-none">
                      <Compass className="w-8 h-8 opacity-40 animate-pulse" />
                      <span className="text-xs font-medium">Direct Link Page</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex sm:hidden flex-1 overflow-y-auto p-4">
                <motion.div
                  variants={navVariants}
                  className="w-full flex flex-col gap-2.5"
                >
                  <motion.div className="flex flex-row gap-4 justify-start items-center flex-wrap">
                  {HIGH_LINKS.map((nav_item, index) => {
                    const Icon = nav_item.icon;
                    return (
                      <Link
                        key={index}
                        href={nav_item.link}
                        className={cn(
                          "border border-gray-300 rounded-full flex items-center gap-1.5 text-secondary-slate hover:text-brand-blue font-medium transition-all py-1.5 px-3 hover:bg-slate-50 duration-200 active:scale-95"
                        )}
                      >
                        {Icon && <Icon className="w-4 h-4 opacity-70" />}
                        <span className="text-nowrap">{nav_item.text}</span>
                      </Link>
                    );
                  })}

                  </motion.div>
                  {LINKS.map((nav_item, index) => {
                    const Icon = nav_item.icon;
                    const isExpanded = index === mobileSelectedIndex;
                    return (
                      <motion.div key={index} variants={navItemVariants} className="flex flex-col">
                        <Link
                          onClick={() => {
                            if (nav_item.link === "#") {
                              setMobileSelectedIndex(isExpanded ? -1 : index);
                            }
                          }}
                          href={nav_item.link}
                          className={cn(
                            "flex items-center justify-between py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer border border-transparent",
                            isExpanded
                              ? "bg-brand-blue/5 text-brand-blue"
                              : "text-secondary-slate hover:text-brand-blue hover:bg-slate-50/75"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            {Icon && <Icon className={cn("w-4.5 h-4.5 opacity-70", isExpanded && "opacity-100 text-brand-blue")} />}
                            <span>{nav_item.text}</span>
                          </div>
                          {nav_item.link === '#' && (
                            <ChevronDown className={cn("w-4 h-4 opacity-50 transition-transform duration-200", isExpanded && "rotate-180 opacity-100 text-brand-blue")} />
                          )}
                        </Link>

                        <AnimatePresence initial={false}>
                          {isExpanded && nav_item["sub-items"] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-6 mt-1 flex flex-col gap-1 border-l border-slate-100 ml-6"
                            >
                              {nav_item["sub-items"].map((sub_item, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={sub_item.link}
                                  className="flex items-center gap-2 py-2 px-3 text-secondary-slate hover:text-brand-blue hover:bg-slate-50/80 rounded-lg text-sm font-medium transition-all duration-200 active:scale-98"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                                  <span>{sub_item.text}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
