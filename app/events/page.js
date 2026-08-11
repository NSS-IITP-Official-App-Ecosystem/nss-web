import { createClient } from "@/utils/supabase/server";
import { resolveMediaUrls } from "@/components/server-utils";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
  let formattedEvents = [];
  let megaEventsWithEvents = [];

  try {
    const supabase = await createClient();
    console.log("Fetching events dynamically from Supabase on the server...");

    // Fetch all collaborators
    const { data: dbCollaborators } = await supabase
      .from('collaborators')
      .select('id, name, logo_url, url');

    // Fetch events + media folder + wing relationship
    const { data, error } = await supabase
      .from("events")
      .select("*, event_media (*), event_wings (wing_id, wings (*))")
      .order("event_date", { ascending: false });

    if (error) throw error;

    if (data) {
      // Filter to show only 2026-2027 session events (July 1, 2026 to June 30, 2027) or events with no date decided (TBD)
      const filteredData = data.filter((event) => {
        if (!event.event_date) return true;
        const eventDate = new Date(event.event_date);
        return eventDate >= new Date("2026-07-01") && eventDate <= new Date("2027-06-30");
      });

      formattedEvents = await Promise.all(
        filteredData.map(async (event) => {
          const dateOnly = event.event_date ? event.event_date.split("T")[0] : "";

          // 1. Resolve Tag/Wing name dynamically from database
          let tag = "NSS Campaign";
          if (event.event_wings && event.event_wings.length > 0 && event.event_wings[0].wings) {
            tag = event.event_wings[0].wings.name;
          }

          // 2. Resolve Images dynamically from database event_media path
          const mediaUrls = event.event_media ? event.event_media.map((m) => m.media_url) : [];
          const resolvedMedia = await resolveMediaUrls(mediaUrls);
          const images = resolvedMedia.filter((m) => m.type === "image").map((m) => m.url);

          // Fallback if no images found in directory
          if (images.length === 0) {
            images.push(
              "https://images.unsplash.com/photo-1615461066841-6116ecdccd04?auto=format&fit=crop&w=800&q=80"
            );
          }

          // 3. Resolve Social links dynamically
          const social = {
            instagram: (event.event_media && event.event_media[0]?.instagram) || "https://instagram.com",
            facebook: (event.event_media && event.event_media[0]?.facebook) || "https://facebook.com",
            linkedin: (event.event_media && event.event_media[0]?.linkedin) || "https://linkedin.com",
          };

          return {
            id: event.id,
            title: event.title,
            date: dateOnly,
            venue: event.venue || "IIT Patna Campus",
            desc: event.details
              ? event.details.length > 180
                ? event.details.slice(0, 180) + "..."
                : event.details
              : "No details provided.",
            extendedDesc: event.details || "No further details available.",
            category: (event.event_date == null || (event.event_date && new Date(event.event_date) > new Date())) ? "upcoming" : "past",
            tag: tag,
            images: images,
            social: social,
            tags: event.tags || [],
            collaborators: event.collaborators && dbCollaborators 
              ? event.collaborators.map(cid => dbCollaborators.find(c => c.id === cid)).filter(Boolean)
              : []
          };
        })
      );
    }

    // Fetch mega events
    const { data: dbMegaEvents, error: megaError } = await supabase
      .from('mega_events')
      .select('*')
      .order('start_date', { ascending: false });

    if (!megaError && dbMegaEvents && formattedEvents.length > 0) {
      // Show only 2026-2027 session mega events
      const filteredMegaEvents = dbMegaEvents.filter(me => {
        if (!me.start_date) return false;
        const startDate = new Date(me.start_date);
        return startDate >= new Date("2026-07-01") && startDate <= new Date("2027-06-30");
      });

      megaEventsWithEvents = filteredMegaEvents.map(me => {
        const matchedEvents = me.events 
          ? me.events.map(eid => formattedEvents.find(e => e.id === eid)).filter(Boolean)
          : [];
        return {
          id: me.id,
          title: me.title,
          description: me.description,
          start_date: me.start_date,
          end_date: me.end_date,
          events: matchedEvents
        };
      }).filter(me => me.events.length > 0);
    }
  } catch (err) {
    console.error("Error fetching events on server:", err.message);
  }

  return <EventsClient initialEvents={formattedEvents} megaEvents={megaEventsWithEvents} />;
}