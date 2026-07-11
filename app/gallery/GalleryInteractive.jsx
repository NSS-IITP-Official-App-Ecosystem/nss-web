"use client";

import React, { useState, useMemo } from "react";
import { Filters } from "./filter";
import GalleryCarousel from "./GalleryCarousel";
import { EventCard } from "./event-card";
import Link from "next/link";

export default function GalleryInteractive({
  wings,
  megaEvents = [],
  mainEvents,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Client-side search filtering
  const filterBySearch = (list) => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (event) =>
        event.title?.toLowerCase().includes(query) ||
        event.details?.toLowerCase().includes(query) ||
        event.wings?.some((w) => w.toLowerCase().includes(query))
    );
  };

  const filteredMain = useMemo(() => filterBySearch(mainEvents), [mainEvents, searchQuery]);

  const filteredMegaEvents = useMemo(() => {
    if (!searchQuery) return megaEvents;
    const query = searchQuery.toLowerCase();
    return megaEvents.map(me => {
      const filtered = me.events.filter(
        (event) =>
          event.title?.toLowerCase().includes(query) ||
          event.details?.toLowerCase().includes(query) ||
          event.wings?.some((w) => w.toLowerCase().includes(query))
      );
      return { ...me, events: filtered };
    }).filter(me => me.events.length > 0);
  }, [megaEvents, searchQuery]);

  return (
    <>
      <Filters
        wings={wings}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Banner: Redirect to Current Session Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 to-slate-50/50 p-6 md:p-8 text-slate-800 shadow-md border border-slate-200/80 backdrop-blur-md">
          {/* Subtle Glows */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Current Session Live
              </span>
              <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2 uppercase text-slate-900">
                Looking for 2026-2027 Session Events?
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                The gallery section primarily archives completed events from past sessions. Explore live updates, upcoming volunteer camps, and ongoing community action items on our dedicated Events directory.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Explore Current Events
            </Link>
          </div>
        </div>
      </div>

      {/* All Gallery Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="border-b border-slate-200 pb-5 mb-8">
          <h3 className="text-2xl font-black text-slate-800">All Gallery Events</h3>
          <p className="text-slate-500 text-sm mt-1">Browse photos and archives from various central and wing-level events.</p>
        </div>
        {filteredMain.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-sm mb-12">
            <p className="text-slate-400 text-lg font-bold">No events found matching your search or filters.</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your query or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
            {filteredMain.map((item, index) => (
              <EventCard key={item.id || index} data={item} />
            ))}
          </div>
        )}
      </section>

      {/* Mega Events Spotlight Carousels */}
      {filteredMegaEvents.map((me) => {
        const isSwachhata = me.title.toLowerCase().includes("swachhata");
        const badgeColor = isSwachhata ? "bg-emerald-500" : "bg-indigo-500";
        const buttonHover = isSwachhata ? "hover:border-emerald-500/30" : "hover:border-indigo-500/30";
        
        return (
          <GalleryCarousel
            key={me.id}
            events={me.events}
            title={me.title}
            subtitle={me.description}
            startDate={me.start_date}
            endDate={me.end_date}
            badgeBgColor={badgeColor}
            buttonHoverColor={buttonHover}
          />
        );
      })}
    </>
  );
}
