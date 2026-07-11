-- ========================================================
-- NSS IIT Patna Database Update - Event Media 2025-2026
-- Execute this script in Supabase SQL Editor to correct mismatched
-- media paths and insert missing Seva Sankalp event media records.
-- ========================================================

-- 1. Correct mismatched paths for existing 2025-2026 events
-- (Moving paths from 'Prerna' folder to their correct wing folders)

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Dnc/Social Awareness Poster Making/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000029';

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Dnc/Video Screening (2nd November 2025)/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000030';

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Rural/Nukkad Natak (25th Oct 2025)/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000026';

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Teaching/Budget Quiz 10 Feb/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000018';

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Teaching/PPT Presentation (1st Nov 2025)/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000028';

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Teaching/World Mental Health Day Quiz/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000031';

UPDATE public.event_media 
SET media_url = 'events/2025-2026/Teaching/Youth Day Quiz/'
WHERE event_id = 'e0000000-0000-0000-0000-000000000032';


-- 2. Insert missing event_media for Seva Sankalp 2026 events
-- (Resolving event IDs dynamically and avoiding duplicates with NOT EXISTS checks)

DO $$
DECLARE
  e_opening uuid;
  e_dkms uuid;
  e_cleanliness uuid;
  e_plantation uuid;
  e_glucond uuid;
  e_glucose_guards uuid;
  e_health_camp uuid;
  e_mental uuid;
  e_talent uuid;
BEGIN
  -- Resolve Event IDs
  SELECT id INTO e_opening FROM public.events WHERE title = 'Opening Ceremony (15th March 2026)';
  SELECT id INTO e_dkms FROM public.events WHERE title = 'DKMS Session (22 March 2026)';
  SELECT id INTO e_cleanliness FROM public.events WHERE title = 'Cleanliness Drive (28th March 2026)';
  SELECT id INTO e_plantation FROM public.events WHERE title = 'Tree Plantation Drive (28th March 2026)';
  SELECT id INTO e_glucond FROM public.events WHERE title = 'Glucond Donation Drive';
  SELECT id INTO e_glucose_guards FROM public.events WHERE title = 'Glucose Distribution Security Guards';
  SELECT id INTO e_health_camp FROM public.events WHERE title = 'Health Check up Camp (5th April 2026)';
  SELECT id INTO e_mental FROM public.events WHERE title = 'Sahaj Seva Mental Awareness (7th April 2026)';
  SELECT id INTO e_talent FROM public.events WHERE title = 'Talent Hunt 2026';

  -- Insert Opening Ceremony Media
  IF e_opening IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_opening AND media_url = 'events/2025-2026/Dnc/Opening Ceremony (15th March 2026)/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_opening, 'events/2025-2026/Dnc/Opening Ceremony (15th March 2026)/', 'Opening Ceremony Gallery', true);
  END IF;

  -- Insert DKMS Session Media
  IF e_dkms IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_dkms AND media_url = 'events/2025-2026/Prerna/DKMS Session (22 March 2026)/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_dkms, 'events/2025-2026/Prerna/DKMS Session (22 March 2026)/', 'DKMS Session Gallery', true);
  END IF;

  -- Insert Cleanliness Drive Media
  IF e_cleanliness IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_cleanliness AND media_url = 'events/2025-2026/Environmental/Cleanliness Drive (28th March 2026)/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_cleanliness, 'events/2025-2026/Environmental/Cleanliness Drive (28th March 2026)/', 'Cleanliness Drive Gallery', true);
  END IF;

  -- Insert Tree Plantation Drive Media
  IF e_plantation IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_plantation AND media_url = 'events/2025-2026/Environmental/Tree Plantation Drive (28th March 2026)/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_plantation, 'events/2025-2026/Environmental/Tree Plantation Drive (28th March 2026)/', 'Tree Plantation Drive Gallery', true);
  END IF;

  -- Insert Glucond Donation Drive Media
  IF e_glucond IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_glucond AND media_url = 'events/2025-2026/Prerna/Glucond Donation Drive/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_glucond, 'events/2025-2026/Prerna/Glucond Donation Drive/', 'Glucond Donation Drive Gallery', true);
  END IF;

  -- Insert Glucose Distribution Security Guards Media
  IF e_glucose_guards IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_glucose_guards AND media_url = 'events/2025-2026/Prerna/Glucose Distribution Security Guards/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_glucose_guards, 'events/2025-2026/Prerna/Glucose Distribution Security Guards/', 'Glucose Distribution Gallery', true);
  END IF;

  -- Insert Health Check up Camp Media
  IF e_health_camp IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_health_camp AND media_url = 'events/2025-2026/Prerna/Health Check up Camp (5th April 2026)/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_health_camp, 'events/2025-2026/Prerna/Health Check up Camp (5th April 2026)/', 'Health Check up Camp Gallery', true);
  END IF;

  -- Insert Sahaj Seva Mental Awareness Media
  IF e_mental IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_mental AND media_url = 'events/2025-2026/Prerna/Sahaj Seva Mental Awareness (7th April 2026)/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_mental, 'events/2025-2026/Prerna/Sahaj Seva Mental Awareness (7th April 2026)/', 'Sahaj Seva Mental Awareness Gallery', true);
  END IF;

  -- Insert Talent Hunt Media
  IF e_talent IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.event_media WHERE event_id = e_talent AND media_url = 'events/2025-2026/Teaching/Talent Hunt 2026/'
  ) THEN
    INSERT INTO public.event_media (event_id, media_url, caption, is_thumbnail)
    VALUES (e_talent, 'events/2025-2026/Teaching/Talent Hunt 2026/', 'Talent Hunt Gallery', true);
  END IF;

END $$;
