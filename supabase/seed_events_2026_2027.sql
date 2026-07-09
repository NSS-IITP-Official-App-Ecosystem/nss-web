-- ========================================================
-- Seed Data for NSS Events (2026-2027)
-- Execute this script in Supabase SQL Editor
-- ========================================================

-- Seed Events for 2026-2027
INSERT INTO public.events (id, title, details, event_date, resources, tags) VALUES
('e0000000-0000-0000-0000-000000000101', 'Tree Plantation Drive', 'NSS volunteers led a massive tree plantation campaign to plant indigenous saplings across the campus and nearby local villages, encouraging community reforestation.', '2026-07-05 10:00:00+00', ARRAY[]::TEXT[], ARRAY['Environment', 'Reforestation']::TEXT[]),
('e0000000-0000-0000-0000-000000000102', 'Mega Blood Donation Camp', 'Organized in collaboration with the local Red Cross and medical teams, this drive gathered blood donations from student and faculty volunteers to support local hospitals.', '2026-09-12 09:00:00+00', ARRAY[]::TEXT[], ARRAY['Health & Welfare', 'Community Support']::TEXT[]),
('e0000000-0000-0000-0000-000000000103', 'Public Waste Management Drive', 'Cleanliness and waste management drive focusing on segregation of dry and wet waste, educating local residents on composting and reducing single-use plastics.', '2026-10-18 09:30:00+00', ARRAY[]::TEXT[], ARRAY['Cleanliness & Sanitation', 'Recycling']::TEXT[]),
('e0000000-0000-0000-0000-000000000104', 'Independence Day Speech & Cultural Program', 'Celebration of national freedom with patriotic speeches, poetry recitation, and cultural awareness plays by NSS volunteers to inspire social responsibility.', '2026-08-15 08:00:00+00', ARRAY[]::TEXT[], ARRAY['Leadership', 'Patriotism']::TEXT[]),
('e0000000-0000-0000-0000-000000000105', 'Teaching Program in Local Schools', 'Regular education campaign where volunteers visit local primary and high schools to teach mathematics, basic science, and computer literacy to underprivileged students.', '2026-11-04 14:00:00+00', ARRAY[]::TEXT[], ARRAY['Education', 'Literacy']::TEXT[]),
('e0000000-0000-0000-0000-000000000106', 'Campus Shramdaan Drive', 'Mass mobilization of volunteers for cleaning common areas, residential blocks, and academic squares on campus.', '2026-09-15 08:30:00+00', ARRAY[]::TEXT[], ARRAY['swachhata hi seva']::TEXT[]),
('e0000000-0000-0000-0000-000000000107', 'Cleanliness Pledge & Rally', 'Raising awareness through marches, interactive banners, and administering the Swachhata Pledge to residents.', '2026-09-18 10:00:00+00', ARRAY[]::TEXT[], ARRAY['swachhata hi seva']::TEXT[]),
('e0000000-0000-0000-0000-000000000108', 'Village Cleanliness Campaign', 'Spreading waste management systems and door-to-door sanitation surveys in adopted local villages like Bihta.', '2026-09-22 09:00:00+00', ARRAY[]::TEXT[], ARRAY['swachhata hi seva']::TEXT[]),
('e0000000-0000-0000-0000-000000000109', 'Nukkad Natak & Art Drives', 'Dramatizing sanitation practices through street plays and organizing poster competitions for local school kids.', '2026-09-25 11:30:00+00', ARRAY[]::TEXT[], ARRAY['swachhata hi seva']::TEXT[]);

-- Link 2026-2027 events to their respective wings
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000101', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000102', id FROM public.wings WHERE slug = 'dnc';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000103', id FROM public.wings WHERE slug = 'rural-development';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000104', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000105', id FROM public.wings WHERE slug = 'teaching-and-technical';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000106', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000107', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000108', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000109', id FROM public.wings WHERE slug = 'environment';

-- Seed Event Gallery Media for 2026-2027
INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail) VALUES
('e0000000-0000-0000-0000-000000000101', 'events/2026-2027/Enviornmental/Tree Plantation', 'Tree Plantation Drive Gallery', true),
('e0000000-0000-0000-0000-000000000102', 'events/2026-2027/Dnc/Blood Donation', 'Blood Donation Drive Gallery', true),
('e0000000-0000-0000-0000-000000000103', 'events/2026-2027/Rural/Waste Management', 'Waste Management Drive Gallery', true),
('e0000000-0000-0000-0000-000000000104', 'events/2026-2027/Prerna/Independence Day Speech', 'Independence Day Speech Gallery', true),
('e0000000-0000-0000-0000-000000000105', 'events/2026-2027/Teaching/Teaching in School', 'Teaching in School Gallery', true),
('e0000000-0000-0000-0000-000000000106', 'events/2026-2027/Enviornmental/Campus Shramdaan Drive', 'Campus Shramdaan Drive Gallery', true),
('e0000000-0000-0000-0000-000000000107', 'events/2026-2027/Enviornmental/Cleanliness Pledge and Rally', 'Cleanliness Pledge and Rally Gallery', true),
('e0000000-0000-0000-0000-000000000108', 'events/2026-2027/Enviornmental/Village Cleanliness Campaign', 'Village Cleanliness Campaign Gallery', true),
('e0000000-0000-0000-0000-000000000109', 'events/2026-2027/Enviornmental/Nukkad Natak and Art Drives', 'Nukkad Natak and Art Drives Gallery', true);
