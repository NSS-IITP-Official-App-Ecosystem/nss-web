import { Filters } from './filter'
import { EventCard } from './event-card'
import events_data from '@/data/events/events.json'
import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'

export default async function GalleryPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const startDateParam = resolvedParams['start-date'];
    const endDateParam = resolvedParams['end-date'];
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
            dbEvents = data.map(e => ({
                id: e.id,
                title: e.title,
                details: e.details,
                date: e.event_date,
                resources: e.resources || [],
                images: e.event_media ? e.event_media.map(m => m.media_url) : [],
                wings: e.event_wings ? e.event_wings.map(ew => ew.wings?.name).filter(Boolean) : []
            }));
        }
    } catch (err) {
        console.error("Failed to fetch events from database, falling back to JSON:", err);
    }

    // Fallback logic
    if (dbEvents.length === 0) {
        dbEvents = events_data;
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
        
        // Date filters
        if (startDateParam) {
            const startDate = new Date(startDateParam);
            if (eventDate < startDate) return false;
        }
        if (endDateParam) {
            const endDate = new Date(endDateParam);
            endDate.setHours(23, 59, 59, 999);
            if (eventDate > endDate) return false;
        }
        
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

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-20">
            <Banner />
            <Suspense fallback={<div className="text-center my-10 text-slate-500 font-semibold">Loading filters...</div>}>
                <Filters wings={wings} />
            </Suspense>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                {filteredEvents.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-sm">
                        <p className="text-slate-400 text-lg font-bold">No events found matching your filters.</p>
                        <p className="text-slate-500 text-sm mt-2">Try adjusting your date range or selecting a different wing.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
                        {filteredEvents.map((item, index) => (
                            <EventCard key={item.id || index} data={item} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

function Banner() {
    return (
        <section className="py-20 flex justify-center items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--brand-blue), #020f26)" }}>
            {/* Subtle glow using theme primary/amber instead of red */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.12),_transparent)] pointer-events-none" />
            <div className="flex items-center flex-col px-4 z-10 text-center max-w-3xl">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                    <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase font-mono">
                        Highlights of Our Social Service Events
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6 uppercase font-sans">
                    Event <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100 bg-clip-text text-transparent">Gallery</span>
                </h1>
                <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
                    Discover the impact, records, and media galleries of past events organized by NSS volunteers at IIT Patna.
                </p>
            </div>
        </section>
    )
}

