import { Filters } from './filter'
import { EventCard } from './event-card'
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

    // 1. Fetch wings and events from Supabase Server-side
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

        // Fetch events with media and wings
        const { data, error } = await supabase
            .from('events')
            .select(`
                id,
                title,
                details,
                event_date,
                resources,
                tags,
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

        if (error) throw error;
        
        if (data) {
            dbEvents = await Promise.all(data.map(async (e) => {
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
                    wings: e.event_wings ? e.event_wings.map(ew => ew.wings?.name).filter(Boolean) : []
                };
            }));
        }
    } catch (err) {
        console.error("Failed to fetch events from database, falling back to JSON:", err);
    }

    // Fallback logic
    if (dbEvents.length === 0) {
        dbEvents = await Promise.all(events_data.map(async (e) => {
            const resolvedMedia = await resolveMediaUrls(e.images || []);
            return {
                ...e,
                images: resolvedMedia.filter(m => m.type === 'image').map(m => m.url),
                media: resolvedMedia
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
        
        // Date filters
        // if (startDateParam) {
        //     const startDate = new Date(startDateParam);
        //     if (eventDate < startDate) return false;
        // }
        // if (endDateParam) {
        //     const endDate = new Date(endDateParam);
        //     endDate.setHours(23, 59, 59, 999);
        //     if (eventDate > endDate) return false;
        // }
        
        //session filter
        const currentSessionName = session || NSS_SESSION[0]['session'];
        const getSession = NSS_SESSION.find((s)=>s.session == currentSessionName) || NSS_SESSION[0];
        
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

    // Filter Swachhata Hi Seva events for the spotlight section
    const swachhataGalleryEvents = filteredEvents.filter(event => 
        event.tags && event.tags.some(t => t.toLowerCase() === 'swachhata hi seva')
    );
    const mainGalleryEvents = filteredEvents.filter(event => 
        !event.tags || !event.tags.some(t => t.toLowerCase() === 'swachhata hi seva')
    );

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-20">
            <GalleryHero />
            <Suspense fallback={<div className="text-center my-10 text-slate-500 font-semibold">Loading filters...</div>}>
                <Filters wings={wings} />
            </Suspense>

            {/* Swachhata Hi Seva Section */}
            {swachhataGalleryEvents.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
                    <div className="border-b border-slate-200 pb-5 mb-8">
                        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            Swachhata Hi Seva Spotlight
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">Special campaigns and drives under the nation-wide Swachhata Hi Seva cleanliness mission.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
                        {swachhataGalleryEvents.map((item, index) => (
                            <EventCard key={item.id || index} data={item} />
                        ))}
                    </div>
                </section>
            )}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="border-b border-slate-200 pb-5 mb-8">
                    <h3 className="text-2xl font-black text-slate-800">All Gallery Events</h3>
                    <p className="text-slate-500 text-sm mt-1">Browse photos and archives from various central and wing-level events.</p>
                </div>
                {mainGalleryEvents.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-sm">
                        <p className="text-slate-400 text-lg font-bold">No events found matching your filters.</p>
                        <p className="text-slate-500 text-sm mt-2">Try adjusting your date range or selecting a different wing.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
                        {mainGalleryEvents.map((item, index) => (
                            <EventCard key={item.id || index} data={item} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

