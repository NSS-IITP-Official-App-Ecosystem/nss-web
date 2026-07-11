"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { EventCard } from "./event-card";

export default function GalleryCarousel({
  events,
  title,
  subtitle,
  startDate,
  endDate,
  badgeBgColor = "bg-emerald-500",
  buttonHoverColor = "hover:border-emerald-500/30",
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Extract all unique collaborators from this mega event's events
  const uniqueCollaborators = React.useMemo(() => {
    if (!events) return [];
    const seenIds = new Set();
    const list = [];
    events.forEach(event => {
      if (event.collaborators) {
        event.collaborators.forEach(c => {
          if (c && c.id && !seenIds.has(c.id)) {
            seenIds.add(c.id);
            list.push(c);
          }
        });
      }
    });
    return list;
  }, [events]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, events]);

  if (!events || events.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 relative">
      {/* Header Info Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/5 via-white/80 to-slate-900/[0.02] p-6 sm:p-8 mb-10 border border-slate-200/70 backdrop-blur-md shadow-xs">
        {/* Colorful Glow */}
        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-8 ${badgeBgColor}`}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-left flex-grow max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${badgeBgColor} animate-pulse shrink-0`}></span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                {title}
              </h3>
              
              {startDate && endDate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200/60 text-slate-500 text-[10px] font-mono font-bold leading-none shrink-0">
                  <Calendar size={10} className="text-slate-400" />
                  {new Date(startDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                  {" — "}
                  {new Date(endDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 font-normal">
              {subtitle}
            </p>

            {/* Campaign Collaborators list directly below description */}
            {uniqueCollaborators.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center mt-4 pt-4 border-t border-slate-200/50 text-left">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mr-2">Campaign Collaborators:</span>
                <div className="flex items-center -space-x-1.5">
                  {uniqueCollaborators.map((collab, i) => (
                    <a
                      key={collab.id || i}
                      href={collab.url || "#"}
                      target={collab.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white border border-slate-100 overflow-hidden bg-white shadow-2xs hover:translate-y-[-2px] hover:z-10 transition-all duration-300"
                      title={collab.name}
                    >
                      <img
                        src={collab.logo_url}
                        alt={collab.name}
                        className="h-full w-full object-contain p-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section: Navigation Controls */}
          {events.length > 1 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => emblaApi && emblaApi.scrollPrev()}
                disabled={!canScrollPrev}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  !canScrollPrev
                    ? "border-slate-100 bg-slate-50/50 text-slate-300 opacity-60 cursor-not-allowed"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs hover:border-slate-300 cursor-pointer hover:shadow-sm"
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => emblaApi && emblaApi.scrollNext()}
                disabled={!canScrollNext}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  !canScrollNext
                    ? "border-slate-100 bg-slate-50/50 text-slate-300 opacity-60 cursor-not-allowed"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs hover:border-slate-300 cursor-pointer hover:shadow-sm"
                }`}
                aria-label="Next slide"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel Viewport Wrapper */}
      <div className="relative">
        {/* Viewport container */}
        <div className="overflow-hidden -mx-4 px-4 py-3" ref={emblaRef}>
          <div className="flex gap-6">
            {events.map((item, index) => (
              <div
                key={item.id || index}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex justify-center py-2 px-1"
              >
                <EventCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
