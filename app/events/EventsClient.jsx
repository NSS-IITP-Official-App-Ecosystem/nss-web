"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
  X
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import GalleryCarousel from "../gallery/GalleryCarousel";

// Date formatter helper
const formatDate = (dateString) => {
  if (!dateString) return "To be decided";
  const options = { day: "numeric", month: "short", year: "numeric" };
  const cleanDateString = dateString.replace(/-/g, "/");
  const dateObj = new Date(cleanDateString);
  return isNaN(dateObj.getTime()) ? dateString : dateObj.toLocaleDateString("en-US", options);
};

export default function EventsClient({ initialEvents, megaEvents = [] }) {
  const router = useRouter();
  const [currentFilter, setCurrentFilter] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndices, setCarouselIndices] = useState({});

  // State for Modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  // Sorting & Filtering Logic
  const sortedEvents = useMemo(() => {
    return [...initialEvents].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/"));
    });
  }, [initialEvents]);

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
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-900/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Not Me But You
            </span>
            <h2 className="text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
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
                <p className="text-2xl md:text-3xl font-extrabold text-amber-500">500+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Volunteers Active</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-amber-500">4+</p>
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
            {/* <button 
              onClick={() => setCurrentFilter("all")} 
              className={`tab-btn flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentFilter === "all" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Events
            </button> */}
            <button
              onClick={() => setCurrentFilter("upcoming")}
              className={`tab-btn flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${currentFilter === "upcoming" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setCurrentFilter("past")}
              className={`tab-btn flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${currentFilter === "past" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              Past
            </button>
          </div>

          {/* Mega Campaign Link */}
          <button
            onClick={() => {
              const element = document.getElementById("megaCampaigns");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-800 text-xs font-bold transition-all border border-amber-200/60 cursor-pointer shadow-sm md:ml-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Explore Mega Campaigns
          </button>

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
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <Info size={40} className="text-slate-300 mx-auto mb-4" />
                <h4 className="text-base font-bold text-slate-800 mb-1">No Events Found</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  We couldn't find any events matching your query. Try adjusting your search keywords.
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => {
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
                    onClick={() => {
                      if (event.category === "past") {
                        router.push(`/gallery/event/${event.id}`);
                      } else {
                        handleOpenModal(event);
                      }
                    }}
                    className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Image Carousel Container */}

                    <div
                      className="flex h-full transition-transform duration-500 ease-out relative h-64 md:h-56 lg:h-64 overflow-hidden block group/img cursor-pointer"
                      style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                      {event.images.map((img, idx) => (
                        <div key={idx} className="w-full h-full flex-shrink-0 relative select-none">
                          <img
                            src={img}
                            alt={`${event.title} - Slide ${idx + 1}`}
                            onError={(e) => { e.target.src = '/placeholder.svg'; }}
                            className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-transform duration-700"
                            loading="lazy"
                          />
                          {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div> */}
                        </div>
                      ))}

                      {/* Badge over image */}
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                        {/* {isUpcoming ? (
                          <span className="pulse-border-class inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm border border-amber-400/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 mr-1.5 animate-pulse"></span>
                            Upcoming
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            Completed
                          </span>
                        )} */}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-white shadow-sm border border-white/10">
                          {event.tag}
                        </span>
                      </div>
                    </div>

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
                    {event.images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/30 backdrop-blur-md">
                      {event.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => handleSetSlide(e, event.id, idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeSlide ? "bg-amber-500 w-3" : "bg-white/60"
                            }`}
                        ></button>
                      ))}
                    </div>}

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
                      {/* <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
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
                      </div> */}
                    </div>
                  </motion.article>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Mega Campaigns Section */}
      {megaEvents.length === 0 ? (
        <section id="megaCampaigns" className="bg-white border-t border-slate-200 py-16 text-center">
          <div className="max-w-md mx-auto px-4">
            <Info className="text-slate-300 mx-auto mb-4" size={40} />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Mega Campaigns</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              There are no mega campaigns scheduled for the current 2026-2027 academic session yet. Check back soon for updates on upcoming large-scale initiatives!
            </p>
          </div>
        </section>
      ) : (
        megaEvents.map((me) => {
          const isSwachhata = me.title.toLowerCase().includes("swachhata");
          const badgeColor = isSwachhata ? "bg-emerald-500" : "bg-indigo-500";
          const buttonHover = isSwachhata ? "hover:border-emerald-500/30" : "hover:border-indigo-500/30";

          // Map events to structure expected by GalleryCarousel
          const resolvedEvents = me.events.map(event => ({
            id: event.id,
            title: event.title,
            details: event.extendedDesc || event.desc,
            event_date: event.date,
            images: event.images,
            wings: [event.tag],
            collaborators: event.collaborators || []
          }));

          return (
            <div key={me.id} className="border-t border-slate-200/60 bg-white">
              <GalleryCarousel
                events={resolvedEvents}
                title={me.title}
                subtitle={me.description}
                startDate={me.start_date}
                endDate={me.end_date}
                badgeBgColor={badgeColor}
                buttonHoverColor={buttonHover}
              />
            </div>
          );
        })
      )}

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
                    <Link
                      key={idx}
                      href={`/gallery/event/${selectedEvent.id}`}
                      className="w-full h-full flex-shrink-0 relative block cursor-pointer group/modalimg"
                    >
                      <img src={img} alt="" onError={(e) => { e.target.src = '/home_slider/nss_home.jpg'; }} className="w-full h-full object-cover group-hover/modalimg:scale-[1.01] transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
                    </Link>
                  ))}
                </div>

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
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === modalSlideIndex ? "bg-amber-500 w-3.5" : "bg-white/60"
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

                {/* Collaborators row just below description */}
                {selectedEvent.collaborators && selectedEvent.collaborators.length > 0 && (
                  <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-5 mt-4 text-left mb-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Collaborator / Partner</span>
                    <div className="flex flex-wrap gap-4 items-center mt-1">
                      {selectedEvent.collaborators.map((collab, i) => (
                        <a
                          key={collab.id || i}
                          href={collab.url || "#"}
                          target={collab.url ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/85 border border-slate-200/60 rounded-xl transition-all cursor-pointer shadow-2xs"
                          title={collab.name}
                        >
                          <img src={collab.logo_url} alt={collab.name} className="h-6 w-6 object-contain" />
                          <span className="text-xs font-bold text-slate-700">{collab.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coverage Footer inside Modal */}
                {/* <div className="pt-6 border-t border-neutral-foundation flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

                  {selectedEvent.category === "upcoming" && (
                    <button
                      onClick={() => alert("Thank you for your interest! Registration links will be sent to your institutional email.")}
                      className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:scale-105 shadow-md transition-all cursor-pointer text-sm"
                    >
                      Register Interest
                    </button>
                  )}
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
