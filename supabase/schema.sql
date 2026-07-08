-- ========================================================
-- NSS IIT Patna Database Schema
-- Scalable configuration for dynamic web portal & admin panel
-- ========================================================

-- Drop existing objects if they exist
-- Triggers on auth.users (system table, must be dropped explicitly)
drop trigger if exists on_auth_user_created on auth.users;

-- Tables (dropping tables automatically drops any triggers/constraints on them)
drop table if exists public.thanks cascade;
drop table if exists public.suggestions cascade;
drop table if exists public.collaborators cascade;
drop table if exists public.impacts cascade;
drop table if exists public.audit_logs cascade;
drop table if exists public.collaborate_requests cascade;
drop table if exists public.donations cascade;
drop table if exists public.testimonials cascade;
drop table if exists public.blood_donors cascade;
drop table if exists public.blood_requests cascade;
drop table if exists public.hours_logs cascade;
drop table if exists public.event_media cascade;
drop table if exists public.event_wings cascade;
drop table if exists public.events cascade;
drop table if exists public.team_members cascade;
drop table if exists public.units cascade;
drop table if exists public.wings cascade;
drop table if exists public.profiles cascade;

-- Functions
drop function if exists public.process_audit_log() cascade;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.is_admin(uuid) cascade;

-- Types
drop type if exists public.collaboration_status cascade;
drop type if exists public.blood_status cascade;
drop type if exists public.team_category cascade;
drop type if exists public.approval_status cascade;
drop type if exists public.user_role cascade;

-- Create Enumerated Types
create type public.user_role as enum ('super_admin', 'pic', 'general_secretary', 'cell_secretary', 'volunteer', 'public');
create type public.approval_status as enum ('pending', 'approved', 'rejected');
create type public.team_category as enum ('admin', 'secretary', 'core', 'mentor', 'web', 'pg');
create type public.blood_status as enum ('open', 'fulfilled', 'cancelled');
create type public.collaboration_status as enum ('pending', 'reviewed', 'responded', 'archived');

-- 1. Profiles Table
-- Linked to Supabase Auth.users
create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    full_name text not null,
    roll_number text unique, -- Nullable for external advisors/collaborators
    email text unique not null,
    phone_number text,
    role public.user_role default 'public'::public.user_role not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Helper function to check admin roles (security definer bypasses RLS recursion)
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = user_id and role in ('super_admin', 'pic', 'general_secretary', 'cell_secretary')
  );
end;
$$ language plpgsql security definer;

-- 1.1 Audit Logs Table
create table public.audit_logs (
    id uuid default gen_random_uuid() primary key,
    actor_id uuid references public.profiles(id) on delete set null,
    action text not null, -- 'INSERT', 'UPDATE', 'DELETE'
    table_name text not null,
    record_id uuid,
    old_data jsonb,
    new_data jsonb,
    changed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for audit_logs
alter table public.audit_logs enable row level security;

-- Only admins can read audit logs
create policy "Allow admins to read audit logs" on public.audit_logs
    for select using (public.is_admin(auth.uid()));

-- Trigger function for audit logging (security definer bypasses RLS permissions)
create or replace function public.process_audit_log()
returns trigger as $$
declare
  current_actor_id uuid;
begin
  begin
    current_actor_id := auth.uid();
  exception when others then
    current_actor_id := null;
  end;

  if (TG_OP = 'INSERT') then
    insert into public.audit_logs (actor_id, action, table_name, record_id, new_data)
    values (current_actor_id, 'INSERT', TG_TABLE_NAME, coalesce((new.id)::uuid, null), to_jsonb(new));
    return new;
  elsif (TG_OP = 'UPDATE') then
    insert into public.audit_logs (actor_id, action, table_name, record_id, old_data, new_data)
    values (current_actor_id, 'UPDATE', TG_TABLE_NAME, coalesce((new.id)::uuid, null), to_jsonb(old), to_jsonb(new));
    return new;
  elsif (TG_OP = 'DELETE') then
    insert into public.audit_logs (actor_id, action, table_name, record_id, old_data)
    values (current_actor_id, 'DELETE', TG_TABLE_NAME, coalesce((old.id)::uuid, null), to_jsonb(old));
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer;

-- Profiles Policies
create policy "Allow public read access on profiles" on public.profiles
    for select using (true);

create policy "Allow users to update their own profile" on public.profiles
    for update using (auth.uid() = id);

create policy "Allow admins to manage all profiles" on public.profiles
    for all using (public.is_admin(auth.uid()));


-- 2. Wings Table
create table public.wings (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text unique not null, -- e.g. 'teaching', 'environment', 'chetna'
    description text,
    logo_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for wings
alter table public.wings enable row level security;

create policy "Allow public read access on wings" on public.wings
    for select using (true);

create policy "Allow admins to manage wings" on public.wings
    for all using (public.is_admin(auth.uid()));


-- 3. Units Table
create table public.units (
    id uuid default gen_random_uuid() primary key,
    number integer unique not null, -- Unit 1, Unit 2, Unit 3
    motive text,
    thumbnail_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for units
alter table public.units enable row level security;

create policy "Allow public read access on units" on public.units
    for select using (true);

create policy "Allow admins to manage units" on public.units
    for all using (public.is_admin(auth.uid()));


-- 4. Team Members Directory
create table public.team_members (
    id uuid default gen_random_uuid() primary key,
    profile_id uuid references public.profiles(id) on delete set null,
    academic_year text not null, -- e.g. '2025-26', '2024-25'
    name text not null,
    role text not null, -- e.g. 'General Secretary', 'Cell Secretary'
    category public.team_category not null,
    wing_id uuid references public.wings(id) on delete set null,
    bio text,
    image_url text,
    email text,
    linkedin_url text,
    github_url text,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for team members
alter table public.team_members enable row level security;

create policy "Allow public read access on team_members" on public.team_members
    for select using (true);

create policy "Allow admins to manage team_members" on public.team_members
    for all using (public.is_admin(auth.uid()));


-- 5. Events Table
create table public.events (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    details text not null,
    event_date timestamp with time zone not null,
    resources text[], -- Array of links/downloads
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for events
alter table public.events enable row level security;

create policy "Allow public read access on events" on public.events
    for select using (true);

create policy "Allow admins to manage events" on public.events
    for all using (public.is_admin(auth.uid()));


-- Join table for events and wings (Many-to-Many)
create table public.event_wings (
    event_id uuid references public.events(id) on delete cascade,
    wing_id uuid references public.wings(id) on delete cascade,
    primary key (event_id, wing_id)
);

-- Enable RLS for event_wings
alter table public.event_wings enable row level security;

create policy "Allow public read access on event_wings" on public.event_wings
    for select using (true);

create policy "Allow admins to manage event_wings" on public.event_wings
    for all using (public.is_admin(auth.uid()));


-- Event Media / Gallery Table
create table public.event_media (
    id uuid default gen_random_uuid() primary key,
    event_id uuid references public.events(id) on delete cascade,
    media_url text not null,
    caption text,
    is_thumbnail boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for event_media
alter table public.event_media enable row level security;

create policy "Allow public read access on event_media" on public.event_media
    for select using (true);

create policy "Allow admins to manage event_media" on public.event_media
    for all using (public.is_admin(auth.uid()));


-- 6. Check-Hours & Logs Table 
-- we are skiping for now 
create table public.hours_logs (
    id uuid default gen_random_uuid() primary key,
    volunteer_id uuid references public.profiles(id) on delete cascade not null,
    event_id uuid references public.events(id) on delete set null,
    hours_logged numeric(5,2) not null check (hours_logged > 0),
    description text not null,
    activity_date date not null,
    status public.approval_status default 'pending'::public.approval_status not null,
    approved_by uuid references public.profiles(id) on delete set null,
    rejection_reason text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for hours_logs
alter table public.hours_logs enable row level security;

create policy "Allow volunteers to view their own hours logs" on public.hours_logs
    for select using (auth.uid() = volunteer_id);

create policy "Allow volunteers to submit hours logs" on public.hours_logs
    for insert with check (auth.uid() = volunteer_id);

create policy "Allow admins to view all hours logs" on public.hours_logs
    for select using (public.is_admin(auth.uid()));

create policy "Allow admins to update hours logs (approvals)" on public.hours_logs
    for update using (public.is_admin(auth.uid()));

create policy "Allow admins to delete hours logs" on public.hours_logs
    for delete using (public.is_admin(auth.uid()));


-- 7. Blood Donation System
create table public.blood_requests (
    id uuid default gen_random_uuid() primary key,
    patient_name text not null,
    blood_group text not null,
    units_required integer not null check (units_required > 0),
    hospital text not null,
    contact_number text not null,
    needed_by timestamp with time zone not null,
    status public.blood_status default 'open'::public.blood_status not null,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for blood_requests
alter table public.blood_requests enable row level security;

create policy "Allow public read access on blood requests" on public.blood_requests
    for select using (true);

create policy "Allow authenticated users to create blood requests" on public.blood_requests
    for insert with check (auth.role() = 'authenticated');

create policy "Allow owner to manage their own blood request" on public.blood_requests
    for all using (auth.uid() = created_by);

create policy "Allow admins to manage all blood requests" on public.blood_requests
    for all using (public.is_admin(auth.uid()));


create table public.blood_donors (
    id uuid default gen_random_uuid() primary key,
    profile_id uuid references public.profiles(id) on delete cascade unique,
    blood_group text not null,
    is_available boolean default true not null,
    last_donation_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for blood_donors
alter table public.blood_donors enable row level security;

create policy "Allow profiles/admins to read donors list" on public.blood_donors
    for select using (auth.role() = 'authenticated');

create policy "Allow users to register/update themselves as donors" on public.blood_donors
    for all using (auth.uid() = profile_id);

create policy "Allow admins to manage all donors" on public.blood_donors
    for all using (public.is_admin(auth.uid()));


-- 8. Testimonials Table
-- there should be status (pending, approved, archived)
create table public.testimonials (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    position text not null,
    text text not null,
    img_url text,
    is_published boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for testimonials
alter table public.testimonials enable row level security;

create policy "Allow public read access on published testimonials" on public.testimonials
    for select using (is_published = true);

create policy "Allow anyone to submit a testimonial" on public.testimonials
    for insert with check (true);

create policy "Allow admins to manage all testimonials" on public.testimonials
    for all using (public.is_admin(auth.uid()));


-- 9. Donations Ledger
-- Currently not useful, can be removed later
create table public.donations (
    id uuid default gen_random_uuid() primary key,
    donor_name text not null,
    donor_email text not null,
    amount numeric(10,2) not null check (amount > 0),
    payment_status text not null,
    transaction_id text unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for donations
alter table public.donations enable row level security;

create policy "Allow admins to view all donations" on public.donations
    for select using (public.is_admin(auth.uid()));


-- 10. Impacts Table (for landing page summary statistics)
create table public.impacts (
    id uuid default gen_random_uuid() primary key,
    icon text,
    title text not null,
    description text not null,
    count text not null,
    unit text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for impacts
alter table public.impacts enable row level security;

create policy "Allow public read access on impacts" on public.impacts
    for select using (true);

create policy "Allow admins to manage impacts" on public.impacts
    for all using (public.is_admin(auth.uid()));


-- 11. Collaborators Table
create table public.collaborators (
    id uuid default gen_random_uuid() primary key,
    name text default '',
    logo_url text not null,
    url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for collaborators
alter table public.collaborators enable row level security;

create policy "Allow public read access on collaborators" on public.collaborators
    for select using (true);

create policy "Allow admins to manage collaborators" on public.collaborators
    for all using (public.is_admin(auth.uid()));


-- 12. Collaborate Requests Table (for public organization outreach)
create table public.collaborate_requests (
    id uuid default gen_random_uuid() primary key,
    name text not null, -- contact person name
    email text not null,
    organization text not null,
    subject text,
    message text not null,
    status public.collaboration_status default 'pending'::public.collaboration_status not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- two tables required more
-- for contact us submission
-- for thank form in think-thank page

-- Enable RLS for collaborate_requests
alter table public.collaborate_requests enable row level security;

create policy "Allow anyone to submit collaborate requests" on public.collaborate_requests
    for insert with check (true);

create policy "Allow admins to manage collaborate requests" on public.collaborate_requests
    for all using (public.is_admin(auth.uid()));


-- ==========================================
-- Triggers for User Automation
-- ==========================================

-- Automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
declare
  default_role public.user_role;
  default_name text;
begin
  if new.email like '%@iitp.ac.in' then
    default_role := 'volunteer'::public.user_role;
    default_name := 'Student Volunteer';
  else
    default_role := 'public'::public.user_role;
    default_name := 'User';
  end if;

  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', default_name),
    new.email,
    default_role
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Audit Triggers
create trigger audit_events_trigger
  after insert or update or delete on public.events
  for each row execute procedure public.process_audit_log();

create trigger audit_team_members_trigger
  after insert or update or delete on public.team_members
  for each row execute procedure public.process_audit_log();

create trigger audit_hours_logs_trigger
  after insert or update or delete on public.hours_logs
  for each row execute procedure public.process_audit_log();

create trigger audit_testimonials_trigger
  after insert or update or delete on public.testimonials
  for each row execute procedure public.process_audit_log();

create trigger audit_wings_trigger
  after insert or update or delete on public.wings
  for each row execute procedure public.process_audit_log();

create trigger audit_units_trigger
  after insert or update or delete on public.units
  for each row execute procedure public.process_audit_log();

create trigger audit_collaborators_trigger
  after insert or update or delete on public.collaborators
  for each row execute procedure public.process_audit_log();

create trigger audit_collaborate_requests_trigger
  after insert or update or delete on public.collaborate_requests
  for each row execute procedure public.process_audit_log();


-- ==========================================
-- SEED DATA
-- ==========================================

-- Seed Wings
insert into public.wings (name, slug, description) values
('Teaching and Technical Wing', 'teaching-and-technical', 'Regular evening classes, homework guidance, computer literacy, and digital skill workshops to local school children.'),
('Rural Development', 'rural-development', 'Vocational training, solar installations, self-help groups, and government welfare awareness in neighboring villages.'),
('Environment Wing', 'environment', 'Campus cleanliness campaigns, seasonal tree plantation drives, and environmental sustainability lectures.'),
('DNC Wing', 'dnc', 'Official creative engine managing graphic design, multimedia production, event photography, and visual narratives.'),
('Prerna Wing', 'prerna', 'Empowering local communities through civil compliance, legal literacy, street play awareness, and clothing drives.');

-- Seed Units
insert into public.units (number, motive, thumbnail_url) values
(1, 'Education & Awareness | ज्ञान से परिवर्तन', '/units/unit-1.jpg'),
(2, 'Environment & Sustainability | प्रकृति से प्रगति', '/units/unit-2.jpg'),
(3, 'Community & Social Welfare | सेवा ही शक्ति', '/units/unit-3.jpg');

-- Seed Collaborators
insert into public.collaborators (name, logo_url) values
('Being Helper Foundation', '/collaborators/being_helper.png'),
('DKMS Foundation', '/collaborators/dkms.png'),
('Prathama Blood Centre', '/collaborators/prathama.png'),
('Anwesha', '/collaborators/anwesha.png'),
('Babban Kumar Seva Samiti', '/collaborators/babban_kumar.png'),
('Bihta Primary Health Centre (PHC)', '/collaborators/bihta_phc.png');

-- Seed Impacts
insert into public.impacts (icon, title, description, count, unit) values
('PiUsersBold', 'Total Volunteers', 'Dedicated student volunteers leading social change and community development.', '384', 'volunteers'),
('PiNotebookBold', 'Government Schools Served', 'Operating educational outreach programs in 6 local government schools: Raghopur, Amhara, Urehan, and more.', '6', 'schools'),
('PiExamBold', 'Talent Hunt Examination', 'Underprivileged students from various local schools participated in our competitive Talent Hunt.', '600+', 'students'),
('PiRibbonBold', 'DKMS Stem Cell Registrations', 'Volunteers registered as potential stem cell donors to support blood cancer patients.', '400+', 'donors'),
('PiHeartbeatBold', 'Blood Donors Mobilized', 'Donors mobilized during campus blood donation drives (students, faculty, and staff).', '300+', 'donors'),
('PiFirstAidBold', 'Health Check-up Beneficiaries', 'Free healthcare consultations and checkups held in partnership with Bihta PHC.', '300+', 'beneficiaries'),
('PiDropBold', 'Hydration Packets Distributed', 'Packets of Glucon-D distributed to local community members during summer drives.', '1,000', 'packets'),
('PiTrashBold', 'Campus Waste Collected', 'Cleanliness and sanitation drive conducted at campus Gate No. 1.', '20+', 'kg');

-- Seed Events
insert into public.events (id, title, details, event_date, resources) values

('e0000000-0000-0000-0000-000000000010', 'DNC x TTW Quiz', 'Collaborative quiz competition organized by the DNC and Teaching & Technical Wings to test student knowledge.', '2025-11-01 10:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000011', 'Climate Change Session', 'Interactive session focusing on global warming, ecosystem preservation, and sustainable community living.', '2025-10-19 14:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000012', 'Environmental Video Screening', 'Screening of environmental documentaries and short films to educate volunteers on climate action.', '2025-10-13 16:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000013', 'Environmental Wing Quiz', 'Quiz competition organized by the Environmental Wing to test environmental science awareness.', '2025-10-16 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000014', 'Youth Awareness Session', 'Inspirational seminar and discussion focusing on youth development, social responsibility, and national service.', '2026-01-11 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000015', 'Anwesha Donation Drive', 'Outreach drive supporting Anwesha NGO to distribute clothing and resources to underprivileged households.', '2025-12-15 10:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000016', 'Blood Donation Drive', 'Annual blood donation drive organized in collaboration with regional healthcare partners to mobilize donors.', '2026-02-06 09:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000017', 'Box Collection Drive', 'Resource collection drive gathering clothing, books, and basic essentials for community distribution.', '2025-10-22 10:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000018', 'Budget Quiz', 'Interactive educational quiz focusing on national economics, budget literacy, and citizen roles.', '2026-02-10 14:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000019', 'Closing Ceremony', 'Celebrating the achievements of the academic year, awarding outstanding volunteers and concluding campaigns.', '2026-04-30 16:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000020', 'Social Debate Session', 'Townhall style competitive debate session discussing critical social issues and public policies.', '2025-11-05 15:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000021', 'Debate Competition', 'Debating tournament held to encourage critical thinking on community welfare and civic duties.', '2025-10-19 13:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000022', 'Winter Donation Drive', 'Winter resource donation drive providing support and supplies to local rural communities.', '2025-11-03 10:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000023', 'Holistic Way Of Life', 'Interactive wellness session on physical health, mental hygiene, and balanced lifestyle practices.', '2025-11-08 14:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000024', 'Menstrual Awareness Campaign', 'Educational camp and health counseling session on menstrual health, hygiene, and breaking taboos.', '2025-11-01 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000025', 'Mental Health Awareness Seminar', 'Seminar focusing on psychological wellness, stress management techniques, and supportive counseling.', '2025-01-17 15:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000026', 'Nukkad Natak Street Play', 'Street play performance addressing critical social challenges and encouraging community action.', '2025-10-25 12:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000027', 'Chetna PPT Competition', 'Presentation competition showcasing solutions to healthcare accessibility, hygiene, and social welfare.', '2025-10-15 14:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000028', 'Social PPT Presentations', 'Student presentation forum displaying research findings on rural development and community challenges.', '2025-11-01 14:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000029', 'Social Poster Making', 'Creative painting and poster making competition focused on social advocacy and visual activism.', '2025-10-20 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000030', 'Civic Video Screening', 'Educational video screening on civic rights, sanitation hygiene, and community support networks.', '2025-11-02 16:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000031', 'Mental Health Day Quiz', 'Global wellness quiz competition raising awareness about mental health resources and support systems.', '2025-10-10 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000032', 'Youth Day Quiz', 'National Youth Day commemorative quiz testing knowledge on leadership and civic history.', '2026-01-12 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000033', 'Youth Talk Session', 'Interactive dialogue forum on youth empowerment, student roles in social service, and leadership.', '2026-01-09 15:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000034', 'SnehAI Showcase', 'Introductory project showcase of AI-driven solutions addressing rural community support and digital accessibility.', '2026-01-20 14:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000035', 'Literacy Essay Writing', 'Essay writing competition on education access, digital literacy, and student empowerment.', '2025-10-26 11:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000036', 'Seva Sankalp Launch', 'Central campaign event initiating talent examinations and social support activities in adopted schools.', '2025-10-18 10:00:00+00', array[]::text[]);


-- Links for the 2025-2026 events
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000010', id from public.wings where slug = 'dnc';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000011', id from public.wings where slug = 'environment';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000012', id from public.wings where slug = 'environment';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000013', id from public.wings where slug = 'environment';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000014', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000015', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000016', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000017', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000018', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000019', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000020', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000021', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000022', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000023', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000024', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000025', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000026', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000027', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000028', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000029', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000030', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000031', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000032', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000033', id from public.wings where slug = 'prerna';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000034', id from public.wings where slug = 'rural-development';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000035', id from public.wings where slug = 'teaching-and-technical';
insert into public.event_wings (event_id, wing_id) select 'e0000000-0000-0000-0000-000000000036', id from public.wings where slug = 'teaching-and-technical';

-- Seed Event Gallery Media
insert into public.event_media (event_id, media_url, caption, is_thumbnail) values

('e0000000-0000-0000-0000-000000000010', 'events/2025-2026/Dnc/DNC x TTW Quiz (1st Nov)/', 'DNC x TTW Quiz Gallery', true),
('e0000000-0000-0000-0000-000000000011', 'events/2025-2026/Environmental/Climate Change Session (19th Oct)/', 'Climate Change Session Gallery', true),
('e0000000-0000-0000-0000-000000000012', 'events/2025-2026/Environmental/Environmental video screening(13th October)/', 'Environmental video screening Gallery', true),
('e0000000-0000-0000-0000-000000000013', 'events/2025-2026/Environmental/Environmental Wing Quiz (16th Oct 2025)/', 'Environmental Wing Quiz Gallery', true),
('e0000000-0000-0000-0000-000000000014', 'events/2025-2026/Prerna/(11th Jan 2026)/', 'Youth Awareness Session Gallery', true),
('e0000000-0000-0000-0000-000000000015', 'events/2025-2026/Prerna/Anwesha Donation/', 'Anwesha Donation Gallery', true),
('e0000000-0000-0000-0000-000000000016', 'events/2025-2026/Prerna/Blood Donation (6th Feb 2026)/', 'Blood Donation Gallery', true),
('e0000000-0000-0000-0000-000000000017', 'events/2025-2026/Prerna/Box collection (22th Oct)/', 'Box collection Gallery', true),
('e0000000-0000-0000-0000-000000000018', 'events/2025-2026/Prerna/Budget Quiz 10 Feb/', 'Budget Quiz Gallery', true),
('e0000000-0000-0000-0000-000000000019', 'events/2025-2026/Prerna/Closing Ceremony/', 'Closing Ceremony Gallery', true),
('e0000000-0000-0000-0000-000000000020', 'events/2025-2026/Prerna/Debate (5th nov)/', 'Social Debate Session Gallery', true),
('e0000000-0000-0000-0000-000000000021', 'events/2025-2026/Prerna/Debate competition (19th Oct)/', 'Debate Competition Gallery', true),
('e0000000-0000-0000-0000-000000000022', 'events/2025-2026/Prerna/Donation 3-11-25/', 'Winter Donation Drive Gallery', true),
('e0000000-0000-0000-0000-000000000023', 'events/2025-2026/Prerna/Holistic Way Of Life (8th Nov 2025)/', 'Holistic Way Of Life Gallery', true),
('e0000000-0000-0000-0000-000000000024', 'events/2025-2026/Prerna/Menstrual Awareness (1st Nov 2025)/', 'Menstrual Awareness Gallery', true),
('e0000000-0000-0000-0000-000000000025', 'events/2025-2026/Prerna/Mental Health Awareness  (17th Jan 2025)/', 'Mental Health Awareness Gallery', true),
('e0000000-0000-0000-0000-000000000026', 'events/2025-2026/Prerna/Nukkad Natak (25th Oct 2025)/', 'Nukkad Natak Gallery', true),
('e0000000-0000-0000-0000-000000000027', 'events/2025-2026/Prerna/PPT Competition Chetna Wing (15th Oct 2025)/', 'Chetna PPT Competition Gallery', true),
('e0000000-0000-0000-0000-000000000028', 'events/2025-2026/Prerna/PPT Presentation (1st Nov 2025)/', 'Social PPT Presentations Gallery', true),
('e0000000-0000-0000-0000-000000000029', 'events/2025-2026/Prerna/Social Awareness Poster Making/', 'Social Poster Making Gallery', true),
('e0000000-0000-0000-0000-000000000030', 'events/2025-2026/Prerna/Video Screening (2nd November 2025)/', 'Civic Video Screening Gallery', true),
('e0000000-0000-0000-0000-000000000031', 'events/2025-2026/Prerna/World Mental Health Day Quiz/', 'Mental Health Day Quiz Gallery', true),
('e0000000-0000-0000-0000-000000000032', 'events/2025-2026/Prerna/Youth Day Quiz/', 'Youth Day Quiz Gallery', true),
('e0000000-0000-0000-0000-000000000033', 'events/2025-2026/Prerna/Youth Talk (9th Jan 2026)/', 'Youth Talk Gallery', true),
('e0000000-0000-0000-0000-000000000034', 'events/2025-2026/Rural/SnehAI/', 'SnehAI Showcase Gallery', true),
('e0000000-0000-0000-0000-000000000035', 'events/2025-2026/Teaching/Essay Writing (26th Oct 2025)/', 'Literacy Essay Writing Gallery', true),
('e0000000-0000-0000-0000-000000000036', 'events/2025-2026/Teaching/SEVA SANKALP/', 'Seva Sankalp Launch Gallery', true);
-- ==========================================
-- 13. Thanks Table (for public appreciation of volunteers)
-- ==========================================
create table public.thanks (
    id uuid default gen_random_uuid() primary key,
    sender_name text not null default 'Anonymous',
    sender_relationship text not null default 'Other', -- 'Student', 'Volunteer', 'Faculty Member', 'Beneficiary', 'Other'
    recipient_name text not null, -- Who is being thanked
    message text not null,
    is_approved boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for thanks
alter table public.thanks enable row level security;

create policy "Allow public read access on approved thanks" on public.thanks
    for select using (is_approved = true);

create policy "Allow anyone to submit thanks" on public.thanks
    for insert with check (true);

create policy "Allow admins to manage thanks" on public.thanks
    for all using (public.is_admin(auth.uid()));


-- ==========================================
-- 14. Suggestions Table (for feedback and ideas)
-- ==========================================
create table public.suggestions (
    id uuid default gen_random_uuid() primary key,
    sender_name text default 'Anonymous',
    sender_email text,
    category text not null, -- e.g. 'Teaching', 'Environment', 'Chetna', 'Portal', 'General'
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for suggestions
alter table public.suggestions enable row level security;

create policy "Allow anyone to submit suggestions" on public.suggestions
    for insert with check (true);

create policy "Allow admins to manage suggestions" on public.suggestions
    for all using (public.is_admin(auth.uid()));


-- Audit Triggers for thanks and suggestions
create trigger audit_thanks_trigger
  after insert or update or delete on public.thanks
  for each row execute procedure public.process_audit_log();

create trigger audit_suggestions_trigger
  after insert or update or delete on public.suggestions
  for each row execute procedure public.process_audit_log();

-- Seed Team Members & Leadership Tree (2025-26 & 2024-25)
INSERT INTO public.team_members (academic_year, name, role, category, image_url, email, bio, linkedin_url, github_url, sort_order) VALUES
('2025-26', 'Prof. T. N. Singh', 'Director, IIT Patna', 'admin', '/assets/team1/iit-patna-director.jpg', 'director@iitp.ac.in', 'Patron & Director of IIT Patna. Provides administrative guidance, strategic vision, and structural oversight for all social service activities under the NSS banner.', 'https://linkedin.com', 'https://github.com', 1),
('2025-26', 'Dr. Pramod Tiwari', 'Associate Dean, Student Affairs', 'admin', '/assets/team1/adean_student_affairs.jpeg', 'adean_student_affairs@iitp.ac.in', 'Associate Dean of Student Affairs at IIT Patna. Oversees student activity clubs, manages volunteer allocations, and facilitates administrative support and approvals.', 'https://linkedin.com', 'https://github.com', 2),
('2025-26', 'Dr. Somanath Pradhan', 'Professor in Charge, NSS', 'admin', '/assets/team1/spradhan.jpg', 'pic_nss@iitp.ac.in', 'NSS Professor in Charge. Steers academic integrations, faculty advisory boards, central community service campaigns, and local village developmental camps.', 'https://linkedin.com', 'https://github.com', 3),
('2025-26', 'Mr. Deepak Chaurasia', 'Security Officer & NSS Advisor', 'admin', '/assets/team1/deepakch.jpeg', 'security@iitp.ac.in', 'Security Officer & NSS Advisor. Supervises student outreach safety protocols, transit logistics, campus emergency services, and operational compliance.', 'https://linkedin.com', 'https://github.com', 4),
('2025-26', 'Kiran Ravi', 'Core Committee Advisor', 'admin', '/assets/team1/karan_Ravi.jpg', 'kiran.ravi@iitp.ac.in', 'Core Committee Advisor. Advises on local school tutoring campaigns, literacy syllabi, women empowerment initiatives, and children healthcare camps.', 'https://linkedin.com', 'https://github.com', 5),
('2025-26', 'Subham', 'Core Committee Advisor', 'admin', '/assets/team1/subham_kumar.jpg', 'subham@iitp.ac.in', 'Core Committee Advisor. Advises on ecological plantation setups, rural agricultural support systems, healthcare drives, and medical campaigns.', 'https://linkedin.com', 'https://github.com', 6),
('2024-25', 'Prof. T. N. Singh', 'Director, IIT Patna', 'admin', '/assets/team1/iit-patna-director.jpg', 'director@iitp.ac.in', 'Patron & Director of IIT Patna. Provides administrative guidance, strategic vision, and structural oversight for all social service activities under the NSS banner.', 'https://linkedin.com', 'https://github.com', 1),
('2024-25', 'Dr. Pramod Tiwari', 'Associate Dean, Student Affairs', 'admin', '/assets/team1/adean_student_affairs.jpeg', 'adean_student_affairs@iitp.ac.in', 'Associate Dean of Student Affairs at IIT Patna. Oversees student activity clubs, manages volunteer allocations, and facilitates administrative support and approvals.', 'https://linkedin.com', 'https://github.com', 2),
('2024-25', 'Dr. Shailesh K. Pandey', 'Professor in Charge, NSS', 'admin', '/assets/team1/pic_nss.jpeg', 'pic_former@iitp.ac.in', 'NSS Professor in Charge for 2024-25. Directed faculty committees, local project allocations, and coordinated village medical outreach programs.', 'https://linkedin.com', 'https://github.com', 3),
('2024-25', 'Mr. Deepak Chaurasia', 'Security Officer & NSS Advisor', 'admin', '/assets/team1/deepakch.jpeg', 'security@iitp.ac.in', 'Security Officer & NSS Advisor. Supervises student outreach safety protocols, transit logistics, campus emergency services, and operational compliance.', 'https://linkedin.com', 'https://github.com', 4),
('2024-25', 'Kiran Ravi', 'Core Committee Advisor', 'admin', '/assets/team1/karan_Ravi.jpg', 'kiran.ravi@iitp.ac.in', 'Core Committee Advisor. Advises on local school tutoring campaigns, literacy syllabi, women empowerment initiatives, and children healthcare camps.', 'https://linkedin.com', 'https://github.com', 5),
('2024-25', 'Subham', 'Core Committee Advisor', 'admin', '/assets/team1/subham_kumar.jpg', 'subham@iitp.ac.in', 'Core Committee Advisor. Advises on ecological plantation setups, rural agricultural support systems, healthcare drives, and medical campaigns.', 'https://linkedin.com', 'https://github.com', 6),
('2025-26', 'Ade Balakrishna', 'General Secretary', 'secretary', '/assets/team1/Ade_Balakrishna.jpg', 'ade.balakrishna@iitp.ac.in', 'General Secretary of NSS IIT Patna. Leads overall student volunteer operations, guides cell secretaries, manages structural outreach budgets, and directs campus-wide social events.', 'https://linkedin.com', 'https://github.com', 10),
('2025-26', 'Rabi Kumar Shaw', 'Secretary - Teaching & Tech Skills', 'core', '/assets/team1/Rabi_kumar.jpg', 'rabi.kumar@iitp.ac.in', 'Directs tutoring schedules, rural high school computer classes, and spoken English workshops. Standardizes syllabus content and guides student mentors.', 'https://linkedin.com', 'https://github.com', 11),
('2025-26', 'PR Veronica', 'Secretary - Environmental & Chetna', 'core', '/assets/team1/podili_Ruby_Veronica.jpg', 'pr.veronica@iitp.ac.in', 'Coordinates clean-up campaigns, rural plantation drives, and local health-hygiene education programs. Directs voluntary action plans and manages ecological schedules.', 'https://linkedin.com', 'https://github.com', 12),
('2025-26', 'Sudhanshu Shekhar', 'Secretary - Rural Development', 'core', '/assets/team1/sudhanshu_kumar.jpg', 'sudhanshu.kumar@iitp.ac.in', 'Drives rural outreach, agricultural expansion programs, and self-help group setups. Directs collaboration with local panchayat committees.', 'https://linkedin.com', 'https://github.com', 13),
('2025-26', 'Rishav Shivare', 'Secretary - Nukkad Awareness', 'core', '/assets/team1/Rishabh_shivhare.jpg', 'rishav.shivare@iitp.ac.in', 'Directs scriptwriting and schedules street plays (Nukkad Natak) about vital social issues. Manages event schedules and outreach locations.', 'https://linkedin.com', 'https://github.com', 14),
('2025-26', 'Ayushman Singh', 'Secretary - Logistics Team', 'core', '/assets/team1/ayushman_singh.jpg', 'ayushman.singh@iitp.ac.in', 'Directs transportation logistics, inventory allocation, and support systems during large camps. Coordinates supply distributions across villages.', 'https://linkedin.com', 'https://github.com', 15),
('2025-26', 'Abhishek Kumar Gupta', 'Post-Graduate Student Representative', 'pg', '/assets/team1/abhishek_kumar_gupta.jpeg', 'abhishek.kumar@iitp.ac.in', 'Post-Graduate Student Representative for the NSS Core Team. Helps align PG research scholars and post-grad volunteers with social welfare initiatives.', 'https://linkedin.com', 'https://github.com', 16),
('2025-26', 'Aditya Mishra', 'Post-Graduate Student Representative', 'pg', '/assets/team1/aditya_mishra.jpeg', 'aditya.mishra@iitp.ac.in', 'Post-Graduate Student Representative for the NSS Core Team. Facilitates volunteer operations and post-grad student engagement.', 'https://linkedin.com', 'https://github.com', 17),
('2025-26', 'Muskan Srivastava', 'Post-Graduate Student Representative', 'pg', '/assets/team1/muskan_srivastava.jpeg', 'muskan.srivastava@iitp.ac.in', 'Post-Graduate Student Representative for the NSS Core Team. Directs outreach programs and academic coordination for PG volunteers.', 'https://linkedin.com', 'https://github.com', 18),
('2025-26', 'Aditya Onam', 'Team Lead - Teaching & Technical', 'mentor', '/assets/team1/Aditya_Onam.jpg', 'aditya.onam@iitp.ac.in', 'NSS Teaching & Tech Lead. Designs computer literacy curriculums and manages tutoring sessions.', 'https://linkedin.com', 'https://github.com', 19),
('2025-26', 'Eshan Bhaskar', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Eshan_Bhaskar.png', 'eshan.bhaskar@iitp.ac.in', 'NSS Teaching & Tech Mentor. Teaches coding and basics of computer science to local school kids.', 'https://linkedin.com', 'https://github.com', 20),
('2025-26', 'Lalit Sen', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/LALIT_2301ME67.jpg', 'lalit.sen@iitp.ac.in', 'NSS Teaching & Tech Mentor. Specialized in engineering mathematics and science tutoring.', 'https://linkedin.com', 'https://github.com', 21),
('2025-26', 'Aniket Sinha', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Aniket_Sinha.jpg', 'aniket.sinha@iitp.ac.in', 'NSS Teaching & Tech Mentor. Coordinates tech skill workshops and local school tutoring.', 'https://linkedin.com', 'https://github.com', 22),
('2025-26', 'Vivek Kumar', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Vivek_Kumar.jpg', 'vivek.kumar@iitp.ac.in', 'NSS Teaching & Tech Mentor. Focuses on junior high school computer labs and basic math literacy.', 'https://linkedin.com', 'https://github.com', 23),
('2025-26', 'Tanish R. Chordia', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Tanish_Chordia.PNG', 'tanish.chordia@iitp.ac.in', 'NSS Teaching & Tech Mentor. Designs interactive educational models and guides student volunteers.', 'https://linkedin.com', 'https://github.com', 24),
('2025-26', 'Anil Kumawat', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Anil_Kumawat.jpg', 'anil.kumawat@iitp.ac.in', 'NSS Teaching & Tech Mentor. Organizes science experiments and mathematics workshops in rural centers.', 'https://linkedin.com', 'https://github.com', 25),
('2025-26', 'Ankit Kumar Kero', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Ankit_Kumar_Kero.jpg', 'ankit.kero@iitp.ac.in', 'NSS Teaching & Tech Mentor. Inspires kids with basic mechanical science and tech tutorials.', 'https://linkedin.com', 'https://github.com', 26),
('2025-26', 'Ankesh Kumar', 'Mentor - Teaching & Technical', 'mentor', '/assets/team1/Ankesh_Kumar.jpg', 'ankesh.kumar@iitp.ac.in', 'NSS Teaching & Tech Mentor. Coordinates student attendance logs and standardizes syllabus content.', 'https://linkedin.com', 'https://github.com', 27),
('2025-26', 'Aditi Kashyap', 'Mentor - Environmental Wing', 'mentor', '/assets/team1/Aditi_Kashyap.jpg', 'aditi.kashyap@iitp.ac.in', 'NSS Environmental Wing Mentor. Coordinates tree plantation drives and waste management awareness campaigns.', 'https://linkedin.com', 'https://github.com', 28),
('2025-26', 'Bhanu Sri', 'Mentor - Environmental Wing', 'mentor', '/assets/team1/Bhanu_Sri.jpg', 'bhanu.sri@iitp.ac.in', 'NSS Environmental Wing Mentor. Directs campus cleanliness drives and plastic-free campaigns.', 'https://linkedin.com', 'https://github.com', 29),
('2025-26', 'Dinker Anand', 'Mentor - Environmental Wing', 'mentor', '/assets/team1/dinkar_anand.jpeg', 'dinker.anand@iitp.ac.in', 'NSS Environmental Wing Mentor. Focuses on ecological biodiversity protection and organic farming advocacy.', 'https://linkedin.com', 'https://github.com', 30),
('2025-26', 'Mahipal', 'Mentor - Prayatna Wing', 'mentor', '/assets/team1/Mahipal_2301MC15.jpeg', 'mahipal@iitp.ac.in', 'NSS Prayatna Wing Mentor. Drives local children safety campaigns and anti-child-labor street drives.', 'https://linkedin.com', 'https://github.com', 31),
('2025-26', 'Sai Vardhan', 'Mentor - Prayatna Wing', 'mentor', '/assets/team1/Sai vardhan- 2301cs44.jpg', 'sai.vardhan@iitp.ac.in', 'NSS Prayatna Wing Mentor. Organizes collection drives for underprivileged families and runs local aid campaigns.', 'https://linkedin.com', 'https://github.com', 32),
('2025-26', 'Yoshita Chowdary', 'Mentor - Prayatna Wing', 'mentor', '/assets/team1/Yoshita_Chowdary.jpg', 'yoshita.brown@iitp.ac.in', 'NSS Prayatna Wing Mentor. Focuses on primary school children education support and book distribution drives.', 'https://linkedin.com', 'https://github.com', 33),
('2025-26', 'Gali Uday Aditya', 'Mentor - Prayatna Wing', 'mentor', '/assets/team1/UdayAditya_2301cs71_PrayatnaWing.jpg', 'gali.uday@iitp.ac.in', 'NSS Prayatna Wing Mentor. Coordinates winter clothing collection camps and student volunteer rosters.', 'https://linkedin.com', 'https://github.com', 34),
('2025-26', 'Ravindra Bhati', 'Mentor - Rural Development Wing', 'mentor', '/assets/team1/Ravindra_Bhati.jpg', 'ravindra.bhati@iitp.ac.in', 'NSS Rural Development Wing Mentor. Coordinates village water sanitation programs and agricultural safety seminars.', 'https://linkedin.com', 'https://github.com', 35),
('2025-26', 'Bhoodev', 'Mentor - Rural Development Wing', 'mentor', '/assets/team1/Bhoodev.jpg', 'bhoodev@iitp.ac.in', 'NSS Rural Development Wing Mentor. Directs rural survey projects, solar power installations, and local council coordination.', 'https://linkedin.com', 'https://github.com', 36),
('2025-26', 'Riya Singh', 'Mentor - Rural Development Wing', 'mentor', '/assets/team1/Riya Singh (2301PH25).jpg', 'riya.singh@iitp.ac.in', 'NSS Rural Development Wing Mentor. Leads self-help group workshops and financial literacy drives for women in local villages.', 'https://linkedin.com', 'https://github.com', 37),
('2025-26', 'Neha Reddy Sabbidi', 'Mentor - Chetna Wing', 'mentor', '/assets/team1/Neha Reddy Sabbidi (2301AI42).jpg', 'neha.reddy@iitp.ac.in', 'NSS Chetna Wing Mentor. Coordinates health check-up camps, blood donation rosters, and women hygiene awareness programs.', 'https://linkedin.com', 'https://github.com', 38),
('2025-26', 'Rohit Roy', 'Mentor - Chetna Wing', 'mentor', '/assets/team1/Rohit_Roy.jpg', 'rohit.roy@iitp.ac.in', 'NSS Chetna Wing Mentor. Organizes local yoga camps, mental health seminars, and blood donation campaigns.', 'https://linkedin.com', 'https://github.com', 39),
('2025-26', 'Krishnaveni', 'Mentor - Chetna Wing', 'mentor', '/assets/team1/Krishnaveni.jpg', 'krishnaveni@iitp.ac.in', 'NSS Chetna Wing Mentor. Coordinates medical camp logistics, first-aid training, and local healthcare counseling.', 'https://linkedin.com', 'https://github.com', 40),
('2025-26', 'Meghana Pujari', 'Mentor - Logistics Wing', 'mentor', '/assets/team1/meghana_pujari.jpg', 'meghana.pujari@iitp.ac.in', 'NSS Logistics Wing Mentor. Organizes transport logistics, food distribution rosters, and campsite operations.', 'https://linkedin.com', 'https://github.com', 41),
('2025-26', 'Sameeksha Nagulwad', 'Mentor - Logistics Wing', 'mentor', '/assets/team1/Sameeksha Nagulwad (2301EC23)_.jpg', 'sameeksha.nagulwad@iitp.ac.in', 'NSS Logistics Wing Mentor. Specialized in equipment inventory management and volunteer tracking databases.', 'https://linkedin.com', 'https://github.com', 42),
('2025-26', 'Abhitesh Shukla', 'Mentor - Logistics Wing', 'mentor', '/assets/team1/Abhitesh_Shukla.jpg', 'abhitesh.shukla@iitp.ac.in', 'NSS Logistics Wing Mentor. Drives procurement of medical kits, camp supplies, and schedules transportation vehicles.', 'https://linkedin.com', 'https://github.com', 43),
('2025-26', 'Nisha', 'Mentor - Nukkad Wing', 'mentor', '/assets/team1/Nisha.jpg', 'nisha@iitp.ac.in', 'NSS Nukkad Wing Mentor. Specialized in screenplay scripting, dramatic direction, and street play scheduling.', 'https://linkedin.com', 'https://github.com', 44),
('2025-26', 'Udit Sharma', 'Mentor - Nukkad Wing', 'mentor', '/assets/team1/Udit_Sharma.jpg', 'udit.sharma@iitp.ac.in', 'NSS Nukkad Wing Mentor. Acts as senior character lead, directs street plays about clean water, and coordinates performance logistics.', 'https://linkedin.com', 'https://github.com', 45),
('2025-26', 'Amartya Mondal', 'Coordinator - Web and App Development', 'web', '/assets/team/atm1504.jpg', 'amartya.mondal@iitp.ac.in', 'Leads portal programming, check-hours database integration, and guides junior web engineers. Focuses on full-stack portal operations.', 'https://linkedin.com', 'https://github.com', 46),
('2025-26', 'Sajal Kumar', 'Executive Lead - Creatives and Design', 'web', '/assets/team/jgdcuag - Sajal Kumar.png', 'sajal.kumar@iitp.ac.in', 'Directs visual layouts, social media campaigns, print poster designs, and coordinates styling across web portals.', 'https://linkedin.com', 'https://github.com', 47),
('2025-26', 'Abhay Patil', 'Web Developer', 'web', '/assets/team/Abhay Patil.jpg', 'abhay.patil@iitp.ac.in', 'Focuses on client-side programming, interactive components, responsive stylesheets, and browser optimization updates.', 'https://linkedin.com', 'https://github.com', 48),
('2025-26', 'Omkar Deshpande', 'Web Developer', 'web', '/assets/team/20200606_113444 - Omkar Deshpande.jpg', 'omkar.deshpande@iitp.ac.in', 'Directs database connectors, dynamic table updates, event logs, and guides support integrations.', 'https://linkedin.com', 'https://github.com', 49),
('2024-25', 'Rabi Kumar Shaw', 'General Secretary (2024-25)', 'secretary', '/assets/team1/Rabi_kumar.jpg', 'rabi.kumar@iitp.ac.in', 'General Secretary of NSS IIT Patna for the 2024-25 tenure. Led student outreach projects, community services, and coordinate local school initiatives.', 'https://linkedin.com', 'https://github.com', 10),
('2024-25', 'Ade Balakrishna', 'Secretary - Logistics & Outreach', 'core', '/assets/team1/Ade_Balakrishna.jpg', 'ade.balakrishna@iitp.ac.in', 'Coordinated volunteer transportation, inventory support operations, and directed large-scale village camps logistics.', 'https://linkedin.com', 'https://github.com', 11),
('2024-25', 'PR Veronica', 'Secretary - Environmental & Chetna', 'core', '/assets/team1/podili_Ruby_Veronica.jpg', 'pr.veronica@iitp.ac.in', 'Coordinates clean-up campaigns, rural plantation drives, and local health-hygiene education programs.', 'https://linkedin.com', 'https://github.com', 12),
('2024-25', 'Sudhanshu Shekhar', 'Secretary - Rural Development', 'core', '/assets/team1/Sudhanshu_Kumar.jpg', 'sudhanshu.kumar@iitp.ac.in', 'Drives rural outreach, agricultural expansion programs, and self-help group setups.', 'https://linkedin.com', 'https://github.com', 13),
('2024-25', 'Rishav Shivare', 'Secretary - Nukkad Awareness', 'core', '/assets/team1/Rishabh_shivhare.jpg', 'rishav.shivare@iitp.ac.in', 'Directs scriptwriting and schedules street plays (Nukkad Natak) about vital social issues.', 'https://linkedin.com', 'https://github.com', 14),
('2024-25', 'Ayushman Singh', 'Secretary - Logistics Team', 'core', '/assets/team1/Ayushman_singh.jpg', 'ayushman.singh@iitp.ac.in', 'Directs transportation logistics, inventory allocation, and support systems during large camps.', 'https://linkedin.com', 'https://github.com', 15),
('2024-25', 'Harshvardhan Singh', 'Secretary - Teaching & Tech', 'core', '/assets/team/20191020_144529 - harshvardhan singh.jpg', 'harsh@iitp.ac.in', 'Led rural high school computer classes, spoken English seminars, and designed lesson templates for volunteers.', 'https://linkedin.com', 'https://github.com', 16),
('2024-25', 'Amartya Mondal', 'Coordinator - Web and App Development', 'web', '/assets/team/atm1504.jpg', 'amartya.mondal@iitp.ac.in', 'Leads portal programming, check-hours database integration, and guides junior web engineers.', 'https://linkedin.com', 'https://github.com', 17),
('2024-25', 'Sajal Kumar', 'Executive Lead - Creatives and Design', 'web', '/assets/team/jgdcuag - Sajal Kumar.png', 'sajal.kumar@iitp.ac.in', 'Directs visual layouts, social media campaigns, print poster designs, and coordinates styling across web portals.', 'https://linkedin.com', 'https://github.com', 18),
('2024-25', 'Hrishita Mishra', 'Web Developer (Former)', 'web', '/assets/team/20200606_000422 - Hrishita Mishra.jpg', 'hrishita@iitp.ac.in', 'Contributed client-side portal integrations, interactive user forms, responsive stylesheets, and database connectors.', 'https://linkedin.com', 'https://github.com', 19),
('2024-25', 'Abhay Patil', 'Web Developer', 'web', '/assets/team/Abhay Patil.jpg', 'abhay.patil@iitp.ac.in', 'Focuses on client-side programming, interactive components, responsive stylesheets, and browser optimization updates.', 'https://linkedin.com', 'https://github.com', 20),
('2024-25', 'Omkar Deshpande', 'Web Developer', 'web', '/assets/team/20200606_113444 - Omkar Deshpande.jpg', 'omkar.deshpande@iitp.ac.in', 'Directs database connectors, dynamic table updates, event logs, and guides support integrations.', 'https://linkedin.com', 'https://github.com', 21);

-- Seed Testimonials
insert into public.testimonials (name, position, text, img_url, is_published) values
('Satyam Kumar', 'NSS Volunteer (Roll: 2501CT06)', 'NSS gave me lessons no classroom could. It taught me to embrace hardships, to be there for others, and to lead with compassion. Through every camp, drive, and interaction, I learned that true growth happens when we step up for the society. NSS didn''t just give me experiences, it gave me perspective and purpose.', 'https://drive.google.com/open?id=1aR9WiM5uSUjTsaFF_j61XobrCfZIC2r-', true),
('Shailendra Meena', 'NSS Volunteer (Roll: 2501CE56)', 'NSS has been a wonderful journey of learning, teamwork, and social service. It helped me grow as a responsible and confident person. During my journey in NSS, I truly understood the real meaning of "Not Me But You". Working for society and helping others taught me that selfless service is the greatest way to create a positive impact. Proud to be an NSS volunteer. Learn, Serve, Grow!', 'https://drive.google.com/open?id=1nTz-FenyVh4t_BUFBWJ1e_rm08zSdvL-', true),
('Amoolya Sharan', 'NSS Volunteer (Roll: 2503CB02)', 'My time with NSS has been full of moments I genuinely enjoyed and carried something back from. Teaching in government schools especially taught me that impact isn''t always loud - sometimes it''s just one child understanding a topic a little better because you took the time to explain it differently. Dr. A.P.J. Abdul Kalam once spoke about how educators carry the responsibility of nurturing curiosity and moral character in their students, becoming role models in the process - and standing in front of a classroom made that idea real for me. A child doesn''t just learn a subject from you, they quietly learn a little of how to be, too, and that gave me a quiet sense of responsibility to stay ethically upright and give back to the society that has given me so much. Every event, every small effort, has left me more grounded and more aware of the world beyond my own bubble - and if NSS is about "not me, but you", this is where I felt it the most.', 'https://drive.google.com/open?id=17wqYE6MoySWQpvuXsscN0d1YQzREcgqu', true),
('Kavya Gupta', 'NSS Volunteer (Roll: 2501CB29)', 'My first year in NSS IIT Patna has been a journey of learning, service, and personal growth. From participating in social initiatives to working with dedicated volunteers, every activity helped me become more responsible, confident, and disciplined. NSS gave me opportunities to interact with people, work as a team, and understand the importance of giving back to society. The supportive seniors and coordinators made every event a valuable learning experience. Being a part of NSS has made my first year of college more meaningful, and I look forward to contributing even more in the coming years.', 'https://drive.google.com/open?id=1Rm6cEWP1_F4SRlAhkeosxrhnUIUt8g2L', true);
