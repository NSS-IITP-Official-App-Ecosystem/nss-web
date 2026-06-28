"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Info,
  X,
  Download
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

// 1. Events Database
const eventsData = [
  {
    id: "blood-donation-2026",
    title: "Mega Blood Donation Camp",
    date: "2026-05-15",
    venue: "IIT Patna Main Gymkhana Hall",
    desc: "Organized in collaboration with PMCH Patna. Over 250 units of blood were collected from enthusiastic student and faculty volunteers, potentially saving up to 750 lives.",
    extendedDesc: "The Mega Blood Donation Camp is organized annually by NSS IIT Patna in association with leading state hospitals such as PMCH Patna. Volunteers work round-the-clock to manage registration desks, provide donor assistance, and coordinate the collection logs.\n\nEvery year, we see a massive turnout of students, faculty members, and campus residents eager to make a difference. Aside from donating blood, this drive serves to raise awareness on blood disorders and dispel common myths surrounding blood donation. All donors receive a certificate of appreciation and high-energy refreshments.",
    category: "past",
    tag: "Health & Welfare",
    images: [
      "https://images.unsplash.com/photo-1615461066841-6116ecdccd04?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536856788636-e87514859089?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "tree-plantation-2026",
    title: "Earth Day Tree Plantation Drive",
    date: "2026-04-22",
    venue: "IIT Patna Campus & Surrounding Villages",
    desc: "Celebrating Earth Day by planting over 500 indigenous saplings including Neem, Peepal, and Gulmohar. Our volunteers raised awareness on water conservation and local biodiversity.",
    extendedDesc: "Organized on the occasion of Earth Day, this plantation drive is one of our flagship green initiatives. NSS volunteers target both campus spots and surrounding villages to restore native green cover.\n\nWe focus on planting sturdy, indigenous species like Neem, Peepal, and Gulmohar that support local ecosystems. Beyond planting, our volunteers spend time teaching local villagers and children about watering routines, sapling protection, and the importance of tree conservation in mitigating local climate challenges.",
    category: "past",
    tag: "Environment",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "digital-literacy-2026",
    title: "Rural Digital Literacy Workshop",
    date: "2026-02-10",
    venue: "Amhara Village Primary School, Bihta",
    desc: "Empowering local school children with essential computing skills, online safety knowledge, and introductory coding concepts using interactive learning blocks.",
    extendedDesc: "A part of our wing's commitment to adopted villages, this digital literacy workshop brings computers and tablets to school children in Amhara village.\n\nOver the course of three days, volunteers walk students through operating systems, web browsing safely, and using educational blocks. We aim to spark curiosity in technology and assist teachers in adopting digital toolkits for local classrooms.",
    category: "past",
    tag: "Education",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "cleanliness-drive-2026",
    title: "Independence Day Swachhata Campaign",
    date: "2026-08-20",
    venue: "Bihta Railway Station & Public Park",
    desc: "An upcoming mega cleanliness drive under Swachh Bharat Abhiyan. NSS Volunteers will lead waste segregation awareness, clean public spaces, and paint educational murals.",
    extendedDesc: "This upcoming mega drive under the Swachh Bharat initiative aims to transform public sanitation habits in Bihta. NSS volunteers will coordinate with municipal corporations to conduct cleanups and set up waste-segregation points.\n\nTo make a lasting impact, our creative design teams will paint education-themed wall murals depicting water sanitation, recycling, and plastic-free living routines.",
    category: "upcoming",
    tag: "Cleanliness & Sanitation",
    images: [
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532996127610-b7318658f77b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "youth-convention-2026",
    title: "National Youth Convention & Summit",
    date: "2026-10-15",
    venue: "IIT Patna Senate Hall & Seminar Complex",
    desc: "An inspiring two-day summit featuring panel discussions with social reformers, workshops on sustainable development, and awards for grassroots community service ideas.",
    extendedDesc: "The National Youth Convention serves as a prominent platform bringing social reform leaders and youth innovators together. The convention comprises technical roundtables on rural sustainability, interactive educational workshops, and an exhibition for grassroots community service projects developed by volunteers.\n\nRegistration will be open for all students and young activists in late September.",
    category: "upcoming",
    tag: "Leadership",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "donation-drive-2025",
    title: "Winter Cloth & Toy Donation Drive",
    date: "2025-11-14",
    venue: "Slum settlements near Bihta & Danapur",
    desc: "Distributed warm winter clothes, blankets, shoes, and toys collected from campus residents. Brought smiles to over 150 families during the harsh winter months.",
    extendedDesc: "Conducted during the peak winter transition, this donation drive aimed to bring comfort to homeless families and children in nearby settlements.\n\nThanks to the generosity of IIT Patna residents, volunteers collected, sorted, and distributed over 800 items, including heavy blankets, sweaters, kids' toys, and footwear.",
    category: "past",
    tag: "Social Welfare",
    images: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "gandhi-jayanti-2025",
    title: "Gandhi Jayanti Shramdaan & Cleanliness",
    date: "2025-10-02",
    venue: "IIT Patna Administrative Block Premises",
    desc: "A campus-wide cleanliness and beautification drive honoring Mahatma Gandhi. Includes setting up eco-friendly compost bins and holding a campus clean-up race.",
    extendedDesc: "To celebrate Gandhi Jayanti, volunteers held a campus-wide cleanliness drive focused on solid waste collection and the installation of local organic compost bins.\n\nThe day ended with a 'Plog Run' (jogging while picking up litter) around the academic block, encouraging physical wellness alongside institutional cleanliness.",
    category: "past",
    tag: "Cleanliness & Sanitation",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532996127610-b7318658f77b?auto=format&fit=crop&w=800&q=80"
    ],
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  }
];

// Date formatter helper
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const cleanDateString = dateString ? dateString.replace(/-/g, "/") : "";
  const dateObj = new Date(cleanDateString);
  return isNaN(dateObj.getTime()) ? dateString : dateObj.toLocaleDateString("en-US", options);
};

// Force download helper that avoids browser navigation locks on external urls (Unsplash CORS)
const downloadImage = async (e, imageUrl, filenamePrefix) => {
  if (e) e.stopPropagation();
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filenamePrefix.toLowerCase().replace(/\s+/g, "-")}-nss.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    // If CORS header blocks client-side fetch, open image in a new tab for fallback saving
    window.open(imageUrl, "_blank");
  }
};

export default function EventsPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndices, setCarouselIndices] = useState({});
  
  // State for Modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  // Sorting & Filtering Logic
  const sortedEvents = useMemo(() => {
    return [...eventsData].sort((a, b) => {
      return new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/"));
    });
  }, []);

  const filteredEvents = useMemo(() => {
    return sortedEvents.filter((event) => {
      const matchesCategory = currentFilter === "all" || event.category === currentFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        event.title.toLowerCase().includes(searchLower) ||
        event.desc.toLowerCase().includes(searchLower) ||
        event.venue.toLowerCase().includes(searchLower) ||
        event.tag.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [currentFilter, searchQuery, sortedEvents]);

  // Card Carousel Mechanics
  const handlePrevSlide = (e, eventId, totalSlides) => {
    e.stopPropagation(); 
    const currentIndex = carouselIndices[eventId] || 0;
    const nextIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCarouselIndices({ ...carouselIndices, [eventId]: nextIndex });
  };

  const handleNextSlide = (e, eventId, totalSlides) => {
    e.stopPropagation(); 
    const currentIndex = carouselIndices[eventId] || 0;
    const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCarouselIndices({ ...carouselIndices, [eventId]: nextIndex });
  };

  const handleSetSlide = (e, eventId, slideIndex) => {
    e.stopPropagation(); 
    setCarouselIndices({ ...carouselIndices, [eventId]: slideIndex });
  };

  // Open Details Modal
  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setModalSlideIndex(0); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-900/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Not Me But You
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              Our Impact in Action:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                Service That Shapes Lives
              </span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-normal">
              The National Service Scheme at IIT Patna is a beacon of student-led community development. Through targeted campaigns in health, environment, education, and social empowerment, our volunteers strive to bridge gaps and build a better society.
            </p>
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-800">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-amber-500">1000+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Volunteers Active</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-amber-500">5+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Adopted Villages</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-amber-500">1500+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Saplings Planted</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-amber-500">500+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Blood Units Donated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Main Events Feed */}
      <main id="eventsSection" className="flex-grow py-16 md:py-24 max-w-7xl mx-auto w-full px-6 sm:px-8">
        
        {/* Filter bar & search */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          
          {/* Category Tabs */}
          <div className="flex p-1 bg-slate-200/60 rounded-xl max-w-md w-full md:w-auto">
            <button 
              onClick={() => setCurrentFilter("all")} 
              className={`tab-btn flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentFilter === "all" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Events
            </button>
            <button 
              onClick={() => setCurrentFilter("upcoming")} 
              className={`tab-btn flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentFilter === "upcoming" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setCurrentFilter("past")} 
              className={`tab-btn flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentFilter === "past" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Past
            </button>
          </div>
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by title or location..." 
              className="w-full pl-10 pr-4 py-2.5 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* AnimatePresence Event Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => {
              const activeSlide = carouselIndices[event.id] || 0;
              const isUpcoming = event.category === "upcoming";
              return (
                <motion.article 
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleOpenModal(event)}
                  className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Image Carousel Container */}
                  <div className="relative h-64 md:h-56 lg:h-64 overflow-hidden">
                    <div 
                      className="flex h-full transition-transform duration-500 ease-out" 
                      style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                      {event.images.map((img, idx) => (
                        <div key={idx} className="w-full h-full flex-shrink-0 relative select-none">
                          <img 
                            src={img} 
                            alt={`${event.title} - Slide ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                            loading="lazy" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Badge over image */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      {isUpcoming ? (
                        <span className="pulse-border-class inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm border border-amber-400/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 mr-1.5 animate-pulse"></span>
                          Upcoming
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          Completed
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-white shadow-sm border border-white/10">
                        {event.tag}
                      </span>
                    </div>

                    {/* Card Download Button (Top-Right Overlay) */}
                    <button 
                      onClick={(e) => downloadImage(e, event.images[activeSlide], event.title)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-xs text-white flex items-center justify-center hover:bg-slate-950/80 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      aria-label="Download current image"
                      title="Download image"
                    >
                      <Download size={14} />
                    </button>

                    {/* Controls */}
                    {event.images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => handlePrevSlide(e, event.id, event.images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-slate-900/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 cursor-pointer"
                        >
                          <ChevronLeft size={16} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={(e) => handleNextSlide(e, event.id, event.images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-slate-900/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 cursor-pointer"
                        >
                          <ChevronRight size={16} strokeWidth={3} />
                        </button>
                      </>
                    )}
                    {/* Dots indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/30 backdrop-blur-md">
                      {event.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => handleSetSlide(e, event.id, idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === activeSlide ? "bg-amber-500 w-3" : "bg-white/60"
                          }`}
                        ></button>
                      ))}
                    </div>
                  </div>
                  {/* Card content body */}
                  <div className="flex-grow flex flex-col p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-blue-950 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1.5 mb-4 text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-amber-500" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blue-900" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-3">
                      {event.desc}
                    </p>
                    {/* Footer Row (Media Links) */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                        Event Coverage
                      </span>
                      <div className="flex items-center gap-2.5 text-slate-500">
                        <span onClick={(e) => e.stopPropagation()} className="inline-flex gap-2">
                          <a href={event.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-amber-100 hover:text-amber-600 flex items-center justify-center transition-all border border-slate-100" aria-label="Instagram Coverage">
                            <FaInstagram size={14} />
                          </a>
                          <a href={event.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-amber-100 hover:text-amber-600 flex items-center justify-center transition-all border border-slate-100" aria-label="Facebook Coverage">
                            <FaFacebookF size={12} />
                          </a>
                          <a href={event.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-amber-100 hover:text-amber-600 flex items-center justify-center transition-all border border-slate-100" aria-label="LinkedIn Coverage">
                            <FaLinkedinIn size={14} />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        {/* Empty state alert */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <Info size={40} className="text-slate-300 mx-auto mb-4" />
            <h4 className="text-base font-bold text-slate-800 mb-1">No Events Found</h4>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              We couldn't find any events matching your query. Try adjusting your search keywords.
            </p>
          </div>
        )}
      </main>

      {/* 3. Quote Section */}
      <section className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-amber-500 text-5xl font-serif">“</span>
          <p className="text-white text-lg md:text-xl font-medium italic leading-relaxed mb-6 -mt-4">
            The best way to find yourself is to lose yourself in the service of others.
          </p>
          <p className="text-amber-500 font-extrabold text-xs tracking-widest uppercase">
            — Mahatma Gandhi
          </p>
        </div>
      </section>


      {/* 5. Glassmorphic Event Details Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-xs p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-xs text-white flex items-center justify-center hover:bg-slate-950/80 transition-all cursor-pointer"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Modal Image Carousel Slideshow */}
              <div className="relative h-64 md:h-80 bg-slate-900">
                <div 
                  className="flex h-full transition-transform duration-500 ease-out" 
                  style={{ transform: `translateX(-${modalSlideIndex * 100}%)` }}
                >
                  {selectedEvent.images.map((img, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 relative">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
                    </div>
                  ))}
                </div>
                
                {/* Modal Download Button (Overlay bottom-right of image) */}
                <button 
                  onClick={(e) => downloadImage(e, selectedEvent.images[modalSlideIndex], selectedEvent.title)}
                  className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-slate-950/60 backdrop-blur-xs text-white flex items-center gap-1.5 hover:bg-slate-950/80 transition-all cursor-pointer text-xs font-bold shadow-sm"
                  aria-label="Download image"
                  title="Download image"
                >
                  <Download size={14} />
                  Download Image
                </button>

                {/* Slideshow Arrows */}
                {selectedEvent.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setModalSlideIndex(prev => prev === 0 ? selectedEvent.images.length - 1 : prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 text-white flex items-center justify-center hover:bg-slate-950/80 transition-all z-10 cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={() => setModalSlideIndex(prev => prev === selectedEvent.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 text-white flex items-center justify-center hover:bg-slate-950/80 transition-all z-10 cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Slideshow Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/30 backdrop-blur-xs">
                  {selectedEvent.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setModalSlideIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === modalSlideIndex ? "bg-amber-500 w-3.5" : "bg-white/60"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Modal Description Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEvent.category === "upcoming" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-primary text-white border border-white/20">
                      Upcoming
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      Completed
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/85 backdrop-blur-xs text-white border border-white/10">
                    {selectedEvent.tag}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-brand-blue mb-4">
                  {selectedEvent.title}
                </h3>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-neutral-foundation text-sm font-semibold text-secondary-slate">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Date</p>
                      <p>{formatDate(selectedEvent.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-brand-blue flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Venue</p>
                      <p className="line-clamp-1">{selectedEvent.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Event Highlights & Details</h4>
                <p className="text-secondary-slate text-sm leading-relaxed mb-6 whitespace-pre-line font-normal">
                  {selectedEvent.extendedDesc || selectedEvent.desc}
                </p>

                {/* Coverage Footer inside Modal */}
                <div className="pt-6 border-t border-neutral-foundation flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Coverage links</p>
                    <div className="flex items-center gap-2">
                      <a href={selectedEvent.social.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-50 border border-neutral-foundation text-slate-500 flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary hover:text-primary" aria-label="Instagram Coverage">
                        <FaInstagram size={14} />
                      </a>
                      <a href={selectedEvent.social.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-50 border border-neutral-foundation text-slate-500 flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary hover:text-primary" aria-label="Facebook Coverage">
                        <FaFacebookF size={12} />
                      </a>
                      <a href={selectedEvent.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-50 border border-neutral-foundation text-slate-500 flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary hover:text-primary" aria-label="LinkedIn Coverage">
                        <FaLinkedinIn size={14} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Register link for upcoming events */}
                  {selectedEvent.category === "upcoming" && (
                    <button 
                      onClick={() => alert("Thank you for your interest! Registration links will be sent to your institutional email.")}
                      className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:scale-105 shadow-md transition-all cursor-pointer text-sm"
                    >
                      Register Interest
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}