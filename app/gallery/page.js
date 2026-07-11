import GalleryInteractive from './GalleryInteractive'
import events_data from '@/data/events/events.json'
import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import NSS_SESSION from '@/data/nss_session.json'
import GalleryHero from './GalleryHero'
import { resolveMediaUrls } from '@/components/server-utils'

export default async function GalleryPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const startDateParam = resolvedParams['start-date'];
    const endDateParam = resolvedParams['end-date'];

    // overriding with session option date range
    const session = resolvedParams['session'];

    const wingParam = resolvedParams['wing'];

    let dbEvents = [];
    let wings = [];
    let dbMegaEvents = [];
    let megaEventsWithEvents = [];
    let isDbFallback = false;

    // 1. Fetch wings, collaborators, mega_events and events from Supabase Server-side
    try {
        const supabase = await createClient();
        
        // Fetch wings for filter dropdown
        const { data: dbWings, error: wingsError } = await supabase
            .from('wings')
            .select('id, name, slug')
            .order('name');
        
        if (!wingsError && dbWings) {
            wings = dbWings;
        }

        // Fetch all collaborators
        const { data: dbCollaborators } = await supabase
            .from('collaborators')
            .select('id, name, logo_url, url');

        // Fetch events with media, wings, and collaborators
        const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select(`
                id,
                title,
                details,
                event_date,
                resources,
                tags,
                collaborators,
                event_media (
                    media_url,
                    caption,
                    is_thumbnail
                ),
                event_wings (
                    wings (
                        id,
                        name,
                        slug
                    )
                )
            `)
            .order('event_date', { ascending: false });

        if (eventsError) throw eventsError;
        
        if (eventsData) {
            dbEvents = await Promise.all(eventsData.map(async (e) => {
                const mediaUrls = e.event_media ? e.event_media.map(m => m.media_url) : [];
                const resolvedMedia = await resolveMediaUrls(mediaUrls);
                return {
                    id: e.id,
                    title: e.title,
                    details: e.details,
                    date: e.event_date,
                    resources: e.resources || [],
                    tags: e.tags || [],
                    images: resolvedMedia.filter(m => m.type === 'image').map(m => m.url),
                    media: resolvedMedia,
                    wings: e.event_wings ? e.event_wings.map(ew => ew.wings?.name).filter(Boolean) : [],
                    collaborators: e.collaborators && dbCollaborators 
                        ? e.collaborators.map(cid => dbCollaborators.find(c => c.id === cid)).filter(Boolean)
                        : []
                };
            }));
        }

        // Fetch mega events
        const { data: megaEventsData, error: megaError } = await supabase
            .from('mega_events')
            .select('*')
            .order('start_date', { ascending: false });

        if (!megaError && megaEventsData) {
            dbMegaEvents = megaEventsData;
        }
    } catch (err) {
        console.error("Failed to fetch events from database, falling back to JSON:", err);
    }

    // Fallback logic
    if (dbEvents.length === 0) {
        isDbFallback = true;
        dbEvents = await Promise.all(events_data.map(async (e) => {
            const resolvedMedia = await resolveMediaUrls(e.images || []);
            return {
                ...e,
                images: resolvedMedia.filter(m => m.type === 'image').map(m => m.url),
                media: resolvedMedia,
                collaborators: []
            };
        }));
    }
    if (wings.length === 0) {
        wings = [
            { id: '1', name: 'Chetna Wing', slug: 'chetna' },
            { id: '2', name: 'Teaching Wing', slug: 'teaching' },
            { id: '3', name: 'Environmental Wing', slug: 'environment' },
            { id: '4', name: 'Rural Development', slug: 'rural-development' },
            { id: '5', name: 'Technical Skills', slug: 'technical-skills' },
            { id: '6', name: 'Adhyayan', slug: 'adhyayan' },
            { id: '7', name: 'Prayatna Wing', slug: 'prayatna' }
        ];
    }

    // 2. Filter events
    const filteredEvents = dbEvents.filter(event => {
        const eventDate = new Date(event.date);
        
        // Strictly show past events only
        if (eventDate > new Date()) return false;
        
        //session filter
        const currentSessionName = session || '2025-2026';
        const getSession = NSS_SESSION.find((s)=>s.session == currentSessionName) || NSS_SESSION.find((s)=>s.session == '2025-2026');
        
        const startDate = new Date(getSession.start_date);
        if(eventDate < startDate) return false; // if before start date of session return false
        
        const endDate = new Date(getSession.end_date);
        endDate.setHours(23, 59, 59, 999);
        if(eventDate > endDate) return false; // if after end date of session return false

        // Wing filter
        if (wingParam && wingParam !== 'All') {
            const hasWing = event.wings?.some(w => 
                w.toLowerCase() === wingParam.toLowerCase() || 
                w.toLowerCase().replace(' wing', '') === wingParam.toLowerCase() ||
                w.toLowerCase().replace(' environmental', 'environment') === wingParam.toLowerCase()
            );
            if (!hasWing) return false;
        }
        
        return true;
    });

    // Map mega events from database using filteredEvents to respect all filters
    if (dbMegaEvents && dbMegaEvents.length > 0 && filteredEvents.length > 0) {
        megaEventsWithEvents = dbMegaEvents.map(me => {
            const matchedEvents = me.events 
                ? me.events.map(eid => filteredEvents.find(e => e.id === eid)).filter(Boolean)
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

    // Group mega events if no data fetched from DB table AND we are using JSON fallback
    if (megaEventsWithEvents.length === 0 && isDbFallback) {
        const swachhataGalleryEvents = filteredEvents.filter(event => 
            event.tags && event.tags.some(t => t.toLowerCase() === 'swachhata hi seva')
        );
        const sevaSankalpGalleryEvents = filteredEvents.filter(event => 
            event.tags && event.tags.some(t => t.toLowerCase() === 'seva sankalp')
        );
        
        if (swachhataGalleryEvents.length > 0) {
            megaEventsWithEvents.push({
                id: 'swachhata-fallback',
                title: 'Swachhata Hi Seva Spotlight',
                description: 'Special campaigns and drives under the nation-wide Swachhata Hi Seva cleanliness mission.',
                start_date: '2025-09-17',
                end_date: '2025-10-02',
                events: swachhataGalleryEvents
            });
        }
        if (sevaSankalpGalleryEvents.length > 0) {
            megaEventsWithEvents.push({
                id: 'seva-sankalp-fallback',
                title: 'Seva Sankalp Spotlight',
                description: 'Fostering empathy and social responsibility through grassroots actions and educational outreach.',
                start_date: '2026-03-15',
                end_date: '2026-04-20',
                events: sevaSankalpGalleryEvents
            });
        }
    }

    // Filter main events (do not exclude mega_events events from all events)
    const mainGalleryEvents = filteredEvents;

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-20">
            <GalleryHero />
            <Suspense fallback={<div className="text-center my-10 text-slate-500 font-semibold">Loading gallery...</div>}>
                <GalleryInteractive 
                    wings={wings}
                    megaEvents={megaEventsWithEvents}
                    mainEvents={mainGalleryEvents}
                />
            </Suspense>
        </div>
    )
}

