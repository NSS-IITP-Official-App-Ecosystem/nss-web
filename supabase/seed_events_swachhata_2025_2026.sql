-- ========================================================
-- Seed Data for Swachhata Hi Seva Events (2025-2026)
-- Execute this script in Supabase SQL Editor
-- ========================================================

-- Seed Events for 2025-2026
INSERT INTO public.events (id, title, details, event_date, resources, tags) VALUES
('e0000000-0000-0000-0000-000000000201', 'Plantation Drive (SHS)', 'Seasonal plantation drive under Swachhata Hi Seva campaign inside and outside campus to improve green cover.', '2025-09-17 10:00:00+00', ARRAY[]::TEXT[], ARRAY['Environment', 'swachhata hi seva']::TEXT[]),
('e0000000-0000-0000-0000-000000000202', 'Painting Competition', 'Art and poster painting competition on the theme of cleanliness and Swachh Bharat for student awareness.', '2025-09-20 14:00:00+00', ARRAY[]::TEXT[], ARRAY['DNC', 'swachhata hi seva']::TEXT[]),
('e0000000-0000-0000-0000-000000000203', 'Quiz - Swachhata Hi Seva', 'Interactive quiz testing awareness of cleanliness protocols, environmental science, and plastic management.', '2025-09-24 15:30:00+00', ARRAY[]::TEXT[], ARRAY['Teaching', 'swachhata hi seva']::TEXT[]);

-- Link 2025-2026 Swachhata events to their respective wings
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000201', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000202', id FROM public.wings WHERE slug = 'dnc';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000203', id FROM public.wings WHERE slug = 'teaching-and-technical';

-- Seed Event Gallery Media for 2025-2026 Swachhata events
INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail) VALUES
('e0000000-0000-0000-0000-000000000201', 'events/2025-2026/Environmental/Plantation drive (SHS)', 'Plantation Drive (SHS) Gallery', true),
('e0000000-0000-0000-0000-000000000202', 'events/2025-2026/Dnc/ Painting competition', 'Painting Competition Gallery', true),
('e0000000-0000-0000-0000-000000000203', 'events/2025-2026/Teaching/Quiz_Swachhata hi Seva', 'Quiz - Swachhata Hi Seva Gallery', true);
