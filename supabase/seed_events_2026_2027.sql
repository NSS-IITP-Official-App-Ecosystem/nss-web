-- ========================================================
-- Seed Data for NSS Events (2026-2027 Session)
-- Execute this script in Supabase SQL Editor to populate / update
-- the 2026-2027 events and link them to wings & media galleries.
-- ========================================================

-- Ensure the 'venue' column exists in public.events
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS venue text;

-- ==========================================
-- 1. Collaborators (2026-2027)
-- ==========================================
INSERT INTO public.collaborators (id, name, logo_url, url) VALUES
('c0000000-0000-0000-0000-000000000008', 'Netaji Subhas Chandra Bose Medical College (NSMCH)', '/collaborators/nsmch.png', null),
('c0000000-0000-0000-0000-000000000009', 'TAL Blood Aid', '/collaborators/tal_blood_aid.png', null),
('c0000000-0000-0000-0000-000000000010', 'Bhakti Vedanta Club (BVC)', '/collaborators/bvc.png', null)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    logo_url = EXCLUDED.logo_url;

-- ==========================================
-- 2. Events (2026-2027 Session)
-- ==========================================
INSERT INTO public.events (id, title, venue, details, event_date, resources, tags, collaborators) VALUES

('e0000000-0000-0000-0000-000000000101', 
 'Health Check-up Campaign for Safai Mitras', 
 'Gymkhana', 
 'Part of the Swachhata Hi Seva (Day 4) campaign. A basic health screening and awareness drive focused on personal health, hygiene, and essential health guidance for campus safai mitras and support workers.', 
 '2026-10-01 10:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Health', 'Swachhata Hi Seva', 'Chetna', 'Community Welfare']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000102', 
 'Swachhata Hi Seva Cleanliness Drive 02', 
 'Gate 2, IIT Patna', 
 'The second day of the two-day campus-wide cleanliness campaign (स्वच्छता अभियान) aimed at promoting environmental responsibility.', 
 '2026-10-02 08:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Environment', 'Cleanliness Drive', 'Swachhata Hi Seva', 'Campus']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000103', 
 'Swachhata Hi Seva Cleanliness Drive 01', 
 'Gate 1, IIT Patna', 
 'The initial leg of the campus cleanliness drive organized by volunteers to keep the surroundings clean.', 
 '2026-09-30 10:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Environment', 'Cleanliness Drive', 'Swachhata Hi Seva', 'Campus']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000104', 
 'Swachhata Hi Seva: School Activities & Sessions', 
 'Amhara and Raghopur Schools', 
 'As part of the first two days of the campaign, volunteers visited schools in Amhara and Raghopur. They conducted Swachhata awareness sessions, demonstrated proper hand-cleaning, and organized hands-on activities focusing on wet and dry waste segregation.', 
 '2026-09-28 10:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Education', 'Swachhata Hi Seva', 'School Outreach', 'Hygiene Awareness']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000105', 
 'Swachhta Hi Seva Pledge Ceremony', 
 'Admin Block, IIT Patna', 
 'A formal ceremony for the campus community to take a pledge reaffirming their commitment to cleanliness and a greener environment.', 
 '2026-09-17 15:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Environment', 'Swachhata Hi Seva', 'Pledge', 'Awareness']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000106', 
 'Mental Health Awareness Session', 
 'CLH LT003', 
 'An interactive session led by IIT Patna Counselor, Mr. Aditya Sahu. It focused on emotional well-being, breaking the stigma around seeking help, and building a supportive community.', 
 '2026-09-13 17:30:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Mental Health', 'Wellness', 'Counseling', 'Awareness']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000107', 
 'Scholarship Awareness Session', 
 'CLH, IIT Patna', 
 'A dedicated seminar for the new batch to help them navigate eligibility criteria, documentation, and application processes for various government, private, and institute-based scholarships.', 
 '2026-09-10 16:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Scholarship', 'Education', 'Guidance', 'Student Welfare']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000108', 
 'Comprehensive Rural Survey', 
 'Nearby Village, Bihta', 
 'Volunteers conducted a door-to-door survey in a nearby village to assess the residents'' access to basic facilities and better understand their everyday challenges.', 
 '2026-09-05 09:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Rural Development', 'Survey', 'Community Outreach', 'Social Welfare']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000109', 
 'Blood & Platelet Donation Camp', 
 'Gymkhana', 
 'Organized in collaboration with Netaji Subhas Chandra Bose Medical College (NSMCH) and TAL Blood Aid, this camp mobilized students to donate blood, with chief guest Mr. Veeshwajeet Kashid supporting the initiative.', 
 '2026-08-29 10:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Blood Donation', 'Healthcare', 'TAL Blood Aid', 'NSMCH']::text[], 
 ARRAY['c0000000-0000-0000-0000-000000000008'::uuid, 'c0000000-0000-0000-0000-000000000009'::uuid]),

('e0000000-0000-0000-0000-000000000110', 
 'Blood & Platelet Donation Awareness Session', 
 'CLH', 
 'A prelude to the donation camp, featuring a talk by Mr. Veeshwajeet Kashid that highlighted the life-saving impact of voluntary blood and platelet donations.', 
 '2026-08-26 16:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Blood Donation', 'Awareness', 'Health', 'Seminar']::text[], 
 ARRAY['c0000000-0000-0000-0000-000000000009'::uuid]),

('e0000000-0000-0000-0000-000000000111', 
 'Independence Day Tiranga Rally', 
 'Admin Block (Starting Point)', 
 'Over 300 students participated in an early morning campus rally under the "Har Ghar Tiranga" campaign to celebrate freedom, unity, and the spirit of service.', 
 '2026-08-15 06:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Har Ghar Tiranga', 'Independence Day', 'Patriotism', 'Rally']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000112', 
 'Project Suraksha: Mosquito Prevention Drive', 
 'IIT Patna Campus & Hostels', 
 'Volunteers distributed mosquito repellents, creams, and coils across the campus community while raising awareness about preventing mosquito-borne illnesses.', 
 '2026-08-20 10:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Health', 'Hygiene', 'Project Suraksha', 'Preventive Healthcare']::text[], 
 ARRAY[]::uuid[]),

('e0000000-0000-0000-0000-000000000113', 
 'Spiritual Session: Taming the Turbulent Mind', 
 'IIT Patna Campus', 
 'An interactive session held in collaboration with the Bhakti Vedanta Club (BVC). Dr. Ranjan Kumar Behera discussed mindfulness, spirituality, and mind control drawing from the Bhagavad Gita.', 
 '2026-08-22 17:00:00+05:30', 
 ARRAY[]::text[], 
 ARRAY['Mindfulness', 'Spirituality', 'Mental Wellness', 'BVC']::text[], 
 ARRAY['c0000000-0000-0000-0000-000000000010'::uuid])

ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    venue = EXCLUDED.venue,
    details = EXCLUDED.details,
    event_date = EXCLUDED.event_date,
    resources = EXCLUDED.resources,
    tags = EXCLUDED.tags,
    collaborators = EXCLUDED.collaborators,
    updated_at = timezone('utc'::text, now());

-- ==========================================
-- 3. Event-Wing Links (2026-2027)
-- ==========================================
DELETE FROM public.event_wings 
WHERE event_id IN (
    'e0000000-0000-0000-0000-000000000101',
    'e0000000-0000-0000-0000-000000000102',
    'e0000000-0000-0000-0000-000000000103',
    'e0000000-0000-0000-0000-000000000104',
    'e0000000-0000-0000-0000-000000000105',
    'e0000000-0000-0000-0000-000000000106',
    'e0000000-0000-0000-0000-000000000107',
    'e0000000-0000-0000-0000-000000000108',
    'e0000000-0000-0000-0000-000000000109',
    'e0000000-0000-0000-0000-000000000110',
    'e0000000-0000-0000-0000-000000000111',
    'e0000000-0000-0000-0000-000000000112',
    'e0000000-0000-0000-0000-000000000113'
);

-- Health Check-up Campaign for Safai Mitras -> Prerna & Environment
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000101', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000101', id FROM public.wings WHERE slug = 'environment';

-- Swachhata Hi Seva Cleanliness Drive 02 -> Environment
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000102', id FROM public.wings WHERE slug = 'environment';

-- Swachhata Hi Seva Cleanliness Drive 01 -> Environment
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000103', id FROM public.wings WHERE slug = 'environment';

-- Swachhata Hi Seva: School Activities & Sessions -> Teaching & Technical Wing & Environment
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000104', id FROM public.wings WHERE slug = 'teaching-and-technical';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000104', id FROM public.wings WHERE slug = 'environment';

-- Swachhta Hi Seva Pledge Ceremony -> Environment
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000105', id FROM public.wings WHERE slug = 'environment';

-- Mental Health Awareness Session -> Prerna Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000106', id FROM public.wings WHERE slug = 'prerna';

-- Scholarship Awareness Session -> Teaching & Technical Wing & Prerna Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000107', id FROM public.wings WHERE slug = 'teaching-and-technical';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000107', id FROM public.wings WHERE slug = 'prerna';

-- Comprehensive Rural Survey -> Rural Development Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000108', id FROM public.wings WHERE slug = 'rural-development';

-- Blood & Platelet Donation Camp -> Prerna Wing & DNC Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000109', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000109', id FROM public.wings WHERE slug = 'dnc';

-- Blood & Platelet Donation Awareness Session -> Prerna Wing & DNC Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000110', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000110', id FROM public.wings WHERE slug = 'dnc';

-- Independence Day Tiranga Rally -> Prerna Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000111', id FROM public.wings WHERE slug = 'prerna';

-- Project Suraksha: Mosquito Prevention Drive -> Prerna Wing & Environment
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000112', id FROM public.wings WHERE slug = 'prerna';
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000112', id FROM public.wings WHERE slug = 'environment';

-- Spiritual Session: Taming the Turbulent Mind -> Prerna Wing
INSERT INTO public.event_wings (event_id, wing_id) SELECT 'e0000000-0000-0000-0000-000000000113', id FROM public.wings WHERE slug = 'prerna';

-- ==========================================
-- 4. Event Gallery Media Paths (2026-2027)
-- ==========================================
DELETE FROM public.event_media 
WHERE event_id IN (
    'e0000000-0000-0000-0000-000000000101',
    'e0000000-0000-0000-0000-000000000102',
    'e0000000-0000-0000-0000-000000000103',
    'e0000000-0000-0000-0000-000000000104',
    'e0000000-0000-0000-0000-000000000105',
    'e0000000-0000-0000-0000-000000000106',
    'e0000000-0000-0000-0000-000000000107',
    'e0000000-0000-0000-0000-000000000108',
    'e0000000-0000-0000-0000-000000000109',
    'e0000000-0000-0000-0000-000000000110',
    'e0000000-0000-0000-0000-000000000111',
    'e0000000-0000-0000-0000-000000000112',
    'e0000000-0000-0000-0000-000000000113'
);

INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail) VALUES
('e0000000-0000-0000-0000-000000000101', 'events/2026-2027/Prerna/Health Check-up Campaign for Safai Mitras/', 'Health Check-up Campaign for Safai Mitras Gallery', true),
('e0000000-0000-0000-0000-000000000102', 'events/2026-2027/Environmental/Swachhata Hi Seva Cleanliness Drive 02/', 'Swachhata Hi Seva Cleanliness Drive 02 Gallery', true),
('e0000000-0000-0000-0000-000000000103', 'events/2026-2027/Environmental/Swachhata Hi Seva Cleanliness Drive 01/', 'Swachhata Hi Seva Cleanliness Drive 01 Gallery', true),
('e0000000-0000-0000-0000-000000000104', 'events/2026-2027/Teaching/Swachhata Hi Seva - School Activities & Sessions/', 'Swachhata Hi Seva: School Activities & Sessions Gallery', true),
('e0000000-0000-0000-0000-000000000105', 'events/2026-2027/Environmental/Swachhta Hi Seva Pledge Ceremony/', 'Swachhta Hi Seva Pledge Ceremony Gallery', true),
('e0000000-0000-0000-0000-000000000106', 'events/2026-2027/Prerna/Mental Health Awareness Session/', 'Mental Health Awareness Session Gallery', true),
('e0000000-0000-0000-0000-000000000107', 'events/2026-2027/Teaching/Scholarship Awareness Session/', 'Scholarship Awareness Session Gallery', true),
('e0000000-0000-0000-0000-000000000108', 'events/2026-2027/Rural/Comprehensive Rural Survey/', 'Comprehensive Rural Survey Gallery', true),
('e0000000-0000-0000-0000-000000000109', 'events/2026-2027/Prerna/Blood & Platelet Donation Camp/', 'Blood & Platelet Donation Camp Gallery', true),
('e0000000-0000-0000-0000-000000000110', 'events/2026-2027/Prerna/Blood & Platelet Donation Awareness Session/', 'Blood & Platelet Donation Awareness Session Gallery', true),
('e0000000-0000-0000-0000-000000000111', 'events/2026-2027/Prerna/Independence Day Tiranga Rally/', 'Independence Day Tiranga Rally Gallery', true),
('e0000000-0000-0000-0000-000000000112', 'events/2026-2027/Prerna/Project Suraksha - Mosquito Prevention Drive/', 'Project Suraksha: Mosquito Prevention Drive Gallery', true),
('e0000000-0000-0000-0000-000000000113', 'events/2026-2027/Prerna/Spiritual Session - Taming the Turbulent Mind/', 'Spiritual Session: Taming the Turbulent Mind Gallery', true);
