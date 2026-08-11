import { createClient } from '@/utils/supabase/server';
import HomeClient from './HomeClient';
import { resolveEventThumbnail } from '@/components/server-utils';
import { resolveImageUrl } from '@/utils/imageUrl';

export const dynamic = 'force-dynamic';

// Static JSON Fallbacks for offline resilience
import slider_data from '@/data/slider_data.json';
import units_data from '@/data/units.json';
import events_data from '@/data/events.json';
import testimonial_data from '@/data/testimonial.json';
import impacts_data from '@/data/impacts.json';
import collaborators_data from '@/data/collaborators.json';

export const metadata = {
    title: "NSS IIT Patna | National Service Scheme",
    description: "Welcome to the official portal of the National Service Scheme (NSS) at IIT Patna. Inculcating social responsibility and driving community empowerment through students.",
};

export default async function HomePage() {
    let units = [];
    let events = [];
    let upcomingEvents = [];
    let testimonials = [];
    let impacts = [];
    let collaborators = [];

    // Parallel data fetches from Supabase
    try {
        const supabase = await createClient();

        // 1. Fetch Units
        const { data: dbUnits, error: unitsErr } = await supabase
            .from('units')
            .select('number, motive, thumbnail_url')
            .order('number');

        if (!unitsErr && dbUnits) {
            units = dbUnits.map(u => ({
                title: `Unit ${u.number}`,
                subTitle: u.motive || "Service Unit",
                thumbnail: resolveImageUrl(u.thumbnail_url, "/placeholder.svg"),
                action: {
                    text: "Know More",
                    url: `/units/unit-${u.number}`
                }
            }));
        }
    } catch (err) {
        console.error("Supabase fetch units error:", err);
    }

    try {
        const supabase = await createClient();

        // 2. Fetch Testimonials
        const { data: dbTestimonials, error: testErr } = await supabase
            .from('testimonials')
            .select('name, position, text, img_url')
            .eq('is_published', true);

        if (!testErr && dbTestimonials) {
            testimonials = dbTestimonials.map(t => ({
                name: t.name,
                position: t.position,
                text: t.text,
                img: resolveImageUrl(t.img_url, '/testimonial/person-1.jpg')
            }));
        }
    } catch (err) {
        console.error("Supabase fetch testimonials error:", err);
    }

    try {
        const supabase = await createClient();

        // 3. Fetch Collaborators
        const { data: dbCollaborators, error: collabsErr } = await supabase
            .from('collaborators')
            .select('name, logo_url, url')
            .order('name');

        if (!collabsErr && dbCollaborators) {
            collaborators = dbCollaborators.map(c => ({
                name: c.name,
                logo: resolveImageUrl(c.logo_url, '/placeholder.svg'),
                url: c.url
            }));
        }
    } catch (err) {
        console.error("Supabase fetch collaborators error:", err);
    }

    try {
        const supabase = await createClient();

        // 4. Fetch Impacts
        const { data: dbImpacts, error: impactsErr } = await supabase
            .from('impacts')
            .select('icon, title, description, count, unit')
            .order('created_at');

        if (!impactsErr && dbImpacts) {
            impacts = dbImpacts.map(i => ({
                icon: i.icon || "PiInfoBold",
                title: i.title,
                desc: i.description,
                count: i.count,
                unit: i.unit
            }));
        }
    } catch (err) {
        console.error("Supabase fetch impacts error:", err);
    }

    try {
        const supabase = await createClient();

        // 5. Fetch Events (Limit 4 for Timeline)
        const { data: dbEvents, error: eventsErr } = await supabase
            .from('events')
            .select(`
                id,
                title,
                details,
                event_date,
                event_media (
                    media_url,
                    is_thumbnail
                ),
                event_wings (
                    wings (
                        name
                    )
                )
            `)
            .lte('event_date', new Date().toISOString())
            .order('event_date', { ascending: false })
            .limit(4);

        if (!eventsErr && dbEvents) {
            events = await Promise.all(dbEvents.map(async (e) => {
                const thumbnail = await resolveEventThumbnail(e.event_media || []);
                return {
                    id: e.id,
                    title: e.title,
                    details: e.details,
                    date: e.event_date ? new Date(e.event_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }) : "To be decided",
                    thumbnail,
                    wings: e.event_wings ? e.event_wings.map(ew => ew.wings?.name).filter(Boolean) : []
                };
            }));
        }
    } catch (err) {
        console.error("Supabase fetch events error:", err);
    }

    try {
        const supabase = await createClient();

        // 5. Fetch Events (Limit 4 for Timeline)
        const { data: dbUpcomingEvents, error: upcomingEventsErr } = await supabase
            .from('events')
            .select(`
                id,
                title,
                details,
                event_date,
                event_media (
                    media_url,
                    is_thumbnail
                ),
                event_wings (
                    wings (
                        name
                    )
                )
            `)
            .or(`event_date.gte.${new Date().toISOString()},event_date.is.null`)
            .order('event_date', { ascending: false, nullsFirst: true })
            .limit(4);

        if (!upcomingEventsErr && dbUpcomingEvents) {
            upcomingEvents = await Promise.all(dbUpcomingEvents.map(async (e) => {
                const thumbnail = await resolveEventThumbnail(e.event_media || []);
                return {
                    id: e.id,
                    title: e.title,
                    details: e.details,
                    date: e.event_date ? new Date(e.event_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }) : "To be decided",
                    thumbnail,
                    wings: e.event_wings ? e.event_wings.map(ew => ew.wings?.name).filter(Boolean) : []
                };
            }));
        }
    } catch (err) {
        console.error("Supabase fetch upcoming events error:", err);
    }

    // Resilience mapping to static JSON if database returns empty
    if (units.length === 0) {
        units = units_data.items;
    }
    if (testimonials.length === 0) {
        testimonials = testimonial_data.items;
    }
    if (collaborators.length === 0) {
        collaborators = collaborators_data.items;
    }
    if (impacts.length === 0) {
        impacts = impacts_data.items.map(i => ({
            icon: i.icon || "PiInfoBold",
            title: i.title,
            desc: i.desc,
            count: i.count,
            unit: i.unit
        }));
    }

    return (
        <HomeClient
            sliderData={slider_data}
            unitsData={units}
            eventsData={events}
            upcomingEventsData={upcomingEvents}
            testimonialsData={testimonials}
            impactsData={impacts}
            collaboratorsData={collaborators}
        />
    );
}