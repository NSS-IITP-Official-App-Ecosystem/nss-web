-- ========================================================
-- NSS IIT Patna Database Seed
-- Insert new Seva Sankalp events with Collaborators and sync with Seva Sankalp Mega Event
-- ========================================================

do $$
declare
  -- Wing IDs
  dnc_id uuid;
  prerna_id uuid;
  env_id uuid;
  teach_id uuid;
  
  -- Collaborator IDs
  being_helper_id uuid;
  dkms_id uuid;
  babban_id uuid;
  bihta_id uuid;
  prathama_id uuid;
  anwesha_id uuid;

  -- Event IDs
  event1_id uuid;
  event2_id uuid;
  event3_id uuid;
  event4_id uuid;
  event5_id uuid;
  event6_id uuid;
  event7_id uuid;
  event8_id uuid;
  event9_id uuid;
begin
  -- Resolve Wing IDs
  select id into dnc_id from public.wings where slug = 'dnc';
  select id into prerna_id from public.wings where slug = 'prerna';
  select id into env_id from public.wings where slug = 'environment';
  select id into teach_id from public.wings where slug = 'teaching-and-technical';

  -- Resolve Collaborator IDs
  select id into being_helper_id from public.collaborators where name = 'Being Helper Foundation';
  select id into dkms_id from public.collaborators where name = 'DKMS Foundation';
  select id into babban_id from public.collaborators where name = 'Babban Kumar Seva Samiti';
  select id into bihta_id from public.collaborators where name = 'Bihta Primary Health Centre (PHC)';
  select id into prathama_id from public.collaborators where name = 'Prathama Blood Centre';
  select id into anwesha_id from public.collaborators where name = 'Anwesha';

  -- Clear any pre-existing duplicate seeds to avoid duplicate items
  delete from public.events where title in (
    'Opening Ceremony (15th March 2026)',
    'DKMS Session (22 March 2026)',
    'Cleanliness Drive (28th March 2026)',
    'Tree Plantation Drive (28th March 2026)',
    'Glucond Donation Drive',
    'Glucose Distribution Security Guards',
    'Health Check up Camp (5th April 2026)',
    'Sahaj Seva Mental Awareness (7th April 2026)',
    'Talent Hunt 2026'
  );

  -- 1. Insert Opening Ceremony (In-house)
  insert into public.events (title, details, event_date, tags)
  values (
    'Opening Ceremony (15th March 2026)',
    'Opening Ceremony of the month-long Seva Sankalp 2026 festival, marking the beginning of NSS IIT Patna''s largest social outreach and community service initiatives.',
    '2026-03-15 10:00:00+00',
    array['seva sankalp', 'opening ceremony']
  ) returning id into event1_id;

  if dnc_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event1_id, dnc_id);
  end if;

  -- 2. Insert DKMS Session (Collaborator: DKMS Foundation)
  insert into public.events (title, details, event_date, tags, collaborators)
  values (
    'DKMS Session (22 March 2026)',
    'A blood cancer awareness and stem cell registry drive in collaboration with DKMS Foundation. Volunteers collected White Blood Cell (WBC) markers from over 400 potential donors via simple cheek swabs.',
    '2026-03-22 09:30:00+00',
    array['seva sankalp', 'dkms', 'health'],
    case when dkms_id is not null then array[dkms_id] else null end
  ) returning id into event2_id;

  if prerna_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event2_id, prerna_id);
  end if;

  -- 3. Insert Cleanliness Drive (Collaborator: Being Helper Foundation)
  insert into public.events (title, details, event_date, tags, collaborators)
  values (
    'Cleanliness Drive (28th March 2026)',
    'Campus and community cleanliness drive held near Gate No. 1, where volunteers collected and processed over 20 kilograms of waste to promote civic sense and public hygiene.',
    '2026-03-28 07:00:00+00',
    array['seva sankalp', 'cleanliness'],
    case when being_helper_id is not null then array[being_helper_id] else null end
  ) returning id into event3_id;

  if env_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event3_id, env_id);
  end if;

  -- 4. Insert Tree Plantation Drive (Collaborator: Being Helper Foundation)
  insert into public.events (title, details, event_date, tags, collaborators)
  values (
    'Tree Plantation Drive (28th March 2026)',
    'A large-scale environmental initiative in collaboration with Being Helper Foundation. Saplings were planted in local government schools and community spaces, with care systems established for their long-term upkeep.',
    '2026-03-28 11:00:00+00',
    array['seva sankalp', 'plantation'],
    case when being_helper_id is not null then array[being_helper_id] else null end
  ) returning id into event4_id;

  if env_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event4_id, env_id);
  end if;

  -- 5. Insert Glucond Donation Drive (Collaborator: Babban Kumar Seva Samiti)
  insert into public.events (title, details, event_date, tags, collaborators)
  values (
    'Glucond Donation Drive',
    'A summer welfare campaign distributing Glucon-D packets and hydration supplies. Conducted in collaboration with Babban Kumar Seva Samiti to support students and local communities during peak heat.',
    '2026-04-02 10:00:00+00',
    array['seva sankalp', 'glucond', 'donation'],
    case when babban_id is not null then array[babban_id] else null end
  ) returning id into event5_id;

  if prerna_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event5_id, prerna_id);
  end if;

  -- 6. Insert Glucose Distribution Security Guards (Collaborator: Babban Kumar Seva Samiti)
  insert into public.events (title, details, event_date, tags, collaborators)
  values (
    'Glucose Distribution Security Guards',
    'Welfare outreach providing Glucon-D and hydration kits to campus security guards and housekeeping support workers who serve continuously under challenging summer temperatures.',
    '2026-04-04 14:00:00+00',
    array['seva sankalp', 'glucond', 'workers'],
    case when babban_id is not null then array[babban_id] else null end
  ) returning id into event6_id;

  if prerna_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event6_id, prerna_id);
  end if;

  -- 7. Insert Health Check up Camp (Collaborator: Bihta Primary Health Centre (PHC))
  insert into public.events (title, details, event_date, tags, collaborators)
  values (
    'Health Check up Camp (5th April 2026)',
    'A free diagnostic and check-up camp in collaboration with Bihta Primary Health Centre (PHC). Provided free sugar, blood pressure tests, and general consultations to over 300 support staff and local residents.',
    '2026-04-05 09:00:00+00',
    array['seva sankalp', 'health check', 'camp'],
    case when bihta_id is not null then array[bihta_id] else null end
  ) returning id into event7_id;

  if prerna_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event7_id, prerna_id);
  end if;

  -- 8. Insert Sahaj Seva Mental Awareness (In-house)
  insert into public.events (title, details, event_date, tags)
  values (
    'Sahaj Seva Mental Awareness (7th April 2026)',
    'Interactive awareness and mental health session focusing on self-care, stress management, and emotional support, aiming to build a more inclusive and empathetic campus culture.',
    '2026-04-07 16:00:00+00',
    array['seva sankalp', 'mental awareness']
  ) returning id into event8_id;

  if prerna_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event8_id, prerna_id);
  end if;

  -- 9. Insert Talent Hunt 2026 (In-house)
  insert into public.events (title, details, event_date, tags)
  values (
    'Talent Hunt 2026',
    'The 2nd Edition of the Talent Hunt Scholarship Examination. Over 600 meritorious students from six government schools participated in the exam conceived, compiled, and evaluated entirely by NSS volunteers.',
    '2026-04-12 10:00:00+00',
    array['seva sankalp', 'talent hunt', 'scholarship']
  ) returning id into event9_id;

  if teach_id is not null then
    insert into public.event_wings (event_id, wing_id) values (event9_id, teach_id);
  end if;

  -- 10. Automatically sync all events tagged 'seva sankalp' with Seva Sankalp 2026 row
  update public.mega_events
  set events = (
      select coalesce(array_agg(id), array[]::uuid[])
      from public.events
      where tags && array['seva sankalp']
  )
  where title = 'Seva Sankalp 2026';

  -- 11. Sync any other existing events with their collaborators based on tags/titles
  update public.events
  set collaborators = array[being_helper_id]
  where (title ilike '%plantation%' or title ilike '%cleanliness%')
    and event_date >= '2025-07-01' and event_date <= '2026-06-30'
    and being_helper_id is not null;

  update public.events
  set collaborators = array[dkms_id]
  where title ilike '%dkms%'
    and event_date >= '2025-07-01' and event_date <= '2026-06-30'
    and dkms_id is not null;

  update public.events
  set collaborators = array[babban_id]
  where (title ilike '%glucon%' or title ilike '%glucose%')
    and event_date >= '2025-07-01' and event_date <= '2026-06-30'
    and babban_id is not null;

  update public.events
  set collaborators = array[bihta_id]
  where title ilike '%health%camp%'
    and event_date >= '2025-07-01' and event_date <= '2026-06-30'
    and bihta_id is not null;

  update public.events
  set collaborators = array[prathama_id]
  where title ilike '%blood%donation%'
    and event_date >= '2025-07-01' and event_date <= '2026-06-30'
    and prathama_id is not null;

  update public.events
  set collaborators = array[anwesha_id]
  where title ilike '%anwesha%'
    and event_date >= '2025-07-01' and event_date <= '2026-06-30'
    and anwesha_id is not null;

end $$;
