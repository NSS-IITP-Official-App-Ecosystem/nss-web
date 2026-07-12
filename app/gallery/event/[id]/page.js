import events_data from '@/data/events/events.json'
import { redirect } from 'next/navigation';
import { ImageCard } from './ImageCard';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaFileAlt, FaTag } from 'react-icons/fa';
import { getWingBadgeStyle } from '@/app/gallery/wing-utils';
import { resolveMediaUrls } from '@/components/server-utils';

export default async function EventPage({ params }) {
    const { id } = await params;
    let event = null;

    // Fetch dynamic event data from Supabase Server-side
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('events')
            .select(`
                id,
                title,
                details,
                event_date,
                resources,
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
            .eq('id', id)
            .maybeSingle();

        if (!error && data) {
            const mediaUrls = data.event_media ? data.event_media.map(m => m.media_url) : [];
            const resolvedMedia = await resolveMediaUrls(mediaUrls);

            // Resolve collaborators details if present
            let resolvedCollaborators = [];
            if (data.collaborators && data.collaborators.length > 0) {
                const { data: collabData } = await supabase
                    .from('collaborators')
                    .select('id, name, logo_url, url')
                    .in('id', data.collaborators);
                if (collabData) {
                    resolvedCollaborators = collabData;
                }
            }

            event = {
                id: data.id,
                title: data.title,
                details: data.details,
                date: data.event_date,
                resources: data.resources || [],
                collaborators: resolvedCollaborators,
                images: resolvedMedia.filter(m => m.type === 'image').map(m => m.url),
                media: resolvedMedia,
                wings: data.event_wings ? data.event_wings.map(ew => ew.wings?.name).filter(Boolean) : []
            };
        }
    } catch (err) {
        console.error("Failed to fetch event from database, falling back to JSON:", err);
    }

    // Fallback logic
    if (!event) {
        const rawEvent = events_data.find(item => item.id.toString() === id.toString());
        if (rawEvent) {
            const resolvedMedia = await resolveMediaUrls(rawEvent.images || []);
            event = {
                ...rawEvent,
                images: resolvedMedia.filter(m => m.type === 'image').map(m => m.url),
                media: resolvedMedia
            };
        }
    }

    if (!event) {
        redirect('/gallery');
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-20">
            {/* Header / Back navigation */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

            </div>

            {/* Event Details Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col items-start gap-4">

                    {/* Tags */}
                    {event.wings && event.wings.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {event.wings.map((wing, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 border rounded-full text-xs font-extrabold flex items-center gap-1.5 ${getWingBadgeStyle(wing)}`}
                                >
                                    <FaTag className="text-[10px]" />
                                    {wing}
                                </span>
                            ))}
                        </div>
                    )}

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
                        {event.title}
                    </h2>

                    {/* Date stamp */}
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-mono font-semibold pb-4 border-b border-slate-100 w-full">
                        <FaCalendarAlt />
                        <span>{event.date ? new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "To be decided"}</span>
                    </div>

                    <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line mt-4">
                        {event.details}
                    </p>

                    {/* Collaborators row just below description */}
                    {event.collaborators && event.collaborators.length > 0 && (
                        <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-5 mt-4 w-full text-left">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Collaborator / Partner</span>
                            <div className="flex flex-wrap gap-4 items-center mt-1">
                                {event.collaborators.map((collab, i) => (
                                    <a
                                        key={collab.id || i}
                                        href={collab.url || "#"}
                                        target={collab.url ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl transition-all cursor-pointer shadow-2xs"
                                        title={collab.name}
                                    >
                                        <img src={collab.logo_url} alt={collab.name} className="h-6 w-6 object-contain" />
                                        <span className="text-xs font-bold text-slate-700">{collab.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resources */}
                    {event.resources && event.resources.length > 0 && (
                        <div className="mt-8 border-t border-slate-100 pt-6 w-full">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Event Resources</h4>
                            <div className="flex flex-wrap gap-3">
                                {event.resources.map((res, i) => (
                                    <a
                                        key={i}
                                        href={res}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all cursor-pointer"
                                    >
                                        <FaFileAlt className="text-brand-blue text-base" />
                                        <span>Download Resource #{i + 1}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Event Media Gallery */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-800">Event Gallery</h3>
                    <p className="text-slate-400 text-sm mt-1">Click on any image or video to view or play.</p>
                </div>

                {event.media && event.media.length > 0 ? (
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 sm:gap-8 [column-fill:_balance] box-border">
                        {event.media.map((item, i) => (
                            <div key={i} className="break-inside-avoid mb-6 sm:mb-8">
                                <ImageCard src={item.url} type={item.type} title={event.title} index={i} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm text-slate-400 font-semibold">
                        No media available for this event.
                    </div>
                )}
            </section>
        </div>
    )
}
