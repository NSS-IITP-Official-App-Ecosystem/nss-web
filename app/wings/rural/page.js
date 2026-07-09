import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { resolveMediaUrls } from "@/components/server-utils";
import RuralWingClient from "./RuralWingClient";

export const dynamic = 'force-dynamic';

export default async function RuralDevelopmentPage() {
    let dbEvents = [];
    try {
        const supabase = await createClient();
        const { data: allEvents, error } = await supabase
            .from('events')
            .select(`
                id,
                title,
                details,
                event_date,
                event_media (
                    media_url
                ),
                event_wings (
                    wings (
                        slug
                    )
                )
            `)
            .order('event_date', { ascending: false });

        if (!error && allEvents) {
            // Filter events belonging to 'rural-development' and session '2025-2026'
            const wingEvents = allEvents.filter(e => 
                e.event_wings?.some(ew => ew.wings?.slug === 'rural-development')
            );

            dbEvents = await Promise.all(wingEvents.map(async (e) => {
                const eventDate = new Date(e.event_date);
                const isInSession = eventDate >= new Date('2025-07-01') && eventDate <= new Date('2026-06-30');
                if (!isInSession) return null;

                const mediaUrls = e.event_media ? e.event_media.map(m => m.media_url) : [];
                const resolvedMedia = await resolveMediaUrls(mediaUrls);
                
                // Limit to 6 images, no videos
                const images = resolvedMedia
                    .filter(m => m.type === 'image')
                    .map(m => m.url)
                    .slice(0, 6);

                return {
                    title: e.title,
                    description: e.details,
                    images: images
                };
            }));
            
            // Remove null entries from out-of-session events
            dbEvents = dbEvents.filter(Boolean);
        }
    } catch (err) {
        console.error("Failed to fetch rural wing events from database:", err);
    }

    return <RuralWingClient events={dbEvents} />;
}