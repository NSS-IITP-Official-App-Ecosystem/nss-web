-- ========================================================
-- Seed Data for NSS Events (2026-2027)
-- Execute this script in Supabase SQL Editor
-- ========================================================

-- Seed Events for 2026-2027
INSERT INTO public.events (id, title, details, event_date, resources) VALUES
('e0000000-0000-0000-0000-000000000101', 'Tree Plantation Drive', 'NSS volunteers led a massive tree plantation campaign to plant indigenous saplings across the campus and nearby local villages, encouraging community reforestation.', '2026-07-05 10:00:00+00', ARRAY[]::TEXT[]),
('e0000000-0000-0000-0000-000000000102', 'Mega Blood Donation Camp', 'Organized in collaboration with the local Red Cross and medical teams, this drive gathered blood donations from student and faculty volunteers to support local hospitals.', '2026-09-12 09:00:00+00', ARRAY[]::TEXT[]),
('e0000000-0000-0000-0000-000000000103', 'Public Waste Management Drive', 'Cleanliness and waste management drive focusing on segregation of dry and wet waste, educating local residents on composting and reducing single-use plastics.', '2026-10-18 09:30:00+00', ARRAY[]::TEXT[]),
('e0000000-0000-0000-0000-000000000104', 'Independence Day Speech & Cultural Program', 'Celebration of national freedom with patriotic speeches, poetry recitation, and cultural awareness plays by NSS volunteers to inspire social responsibility.', '2026-08-15 08:00:00+00', ARRAY[]::TEXT[]),
('e0000000-0000-0000-0000-000000000105', 'Teaching Program in Local Schools', 'Regular education campaign where volunteers visit local primary and high schools to teach mathematics, basic science, and computer literacy to underprivileged students.', '2026-11-04 14:00:00+00', ARRAY[]::TEXT[]);

-- Link 2026-2027 events to their respective wings
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000101', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000102', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000103', id FROM public.wings WHERE slug = 'environment';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000104', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000105', id FROM public.wings WHERE slug = 'teaching-and-technical';

-- Seed Event Gallery Media for 2026-2027
INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail) VALUES
('e0000000-0000-0000-0000-000000000101', 'events/2026-2027/wings/Tree Plantation/', 'Tree Plantation Drive Gallery', true),
('e0000000-0000-0000-0000-000000000102', 'events/2026-2027/wings/Blood Donation/', 'Blood Donation Drive Gallery', true),
('e0000000-0000-0000-0000-000000000103', 'events/2026-2027/wings/Waste Management/', 'Waste Management Drive Gallery', true),
('e0000000-0000-0000-0000-000000000104', 'events/2026-2027/wings/Independence Day Speech/', 'Independence Day Speech Gallery', true),
('e0000000-0000-0000-0000-000000000105', 'events/2026-2027/wings/Teaching in School/', 'Teaching in School Gallery', true);
