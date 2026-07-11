-- ========================================================
-- NSS IIT Patna Database Seed
-- Seed data for mega_events table
-- ========================================================

-- Insert Swachhata Hi Seva Mega Event
insert into public.mega_events (title, description, start_date, end_date, events)
select 
  'Swachhata Hi Seva 2025',
  'Aligned with the national vision of a cleaner and healthier India, NSS IIT Patna conducted a comprehensive Swachhata Hi Seva (SHS) 2025 campaign. Coordinated primarily by the Rural Development Wing and supported by volunteers across all wings, the campaign brought volunteers together in cleanliness drives, Shramdaan, and Safai Mitra Suraksha Shivir worker welfare.',
  '2025-09-17 00:00:00+00'::timestamp with time zone,
  '2025-10-02 23:59:59+00'::timestamp with time zone,
  coalesce(array_agg(id), array[]::uuid[])
from public.events
where tags && array['swachhata hi seva'];

-- Insert Seva Sankalp Mega Event
insert into public.mega_events (title, description, start_date, end_date, events)
select 
  'Seva Sankalp 2026',
  'Culminating the academic year 2025-26, Seva Sankalp 2026 was the flagship closing mega event of NSS IIT Patna. The month-long festival brought together volunteers, partner organizations, and local communities in grassroots outreach, featuring DKMS Stem Cell donor registration, the 2nd Talent Hunt examination, health check camps, and community donation drives.',
  '2026-03-15 00:00:00+00'::timestamp with time zone,
  '2026-04-20 23:59:59+00'::timestamp with time zone,
  coalesce(array_agg(id), array[]::uuid[])
from public.events
where tags && array['seva sankalp'];

