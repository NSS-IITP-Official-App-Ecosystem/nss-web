-- ========================================================
-- NSS IIT Patna Database Schema
-- Scalable configuration for dynamic web portal & admin panel
-- ========================================================

-- Drop existing objects if they exist
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists audit_events_trigger on public.events;
drop trigger if exists audit_team_members_trigger on public.team_members;
drop trigger if exists audit_hours_logs_trigger on public.hours_logs;
drop trigger if exists audit_testimonials_trigger on public.testimonials;
drop trigger if exists audit_wings_trigger on public.wings;
drop trigger if exists audit_units_trigger on public.units;
drop trigger if exists audit_collaborators_trigger on public.collaborators;
drop trigger if exists audit_collaborate_requests_trigger on public.collaborate_requests;
drop function if exists public.process_audit_log();
drop function if exists public.handle_new_user();
drop function if exists public.is_admin(uuid);
drop table if exists public.audit_logs;
drop table if exists public.collaborate_requests;
drop table if exists public.donations;
drop table if exists public.testimonials;
drop table if exists public.blood_donors;
drop table if exists public.blood_requests;
drop table if exists public.hours_logs;
drop table if exists public.event_media;
drop table if exists public.event_wings;
drop table if exists public.events;
drop table if exists public.team_members;
drop table if exists public.units;
drop table if exists public.wings;
drop table if exists public.profiles;

drop type if exists public.collaboration_status;
drop type if exists public.blood_status;
drop type if exists public.team_category;
drop type if exists public.approval_status;
drop type if exists public.user_role;

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
    role public.user_role default 'volunteer'::public.user_role not null,
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
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Student Volunteer'),
    new.email,
    'volunteer'::public.user_role
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
('Adhyayan', 'adhyayan', 'Academic wings library, education center and core support systems.'),
('Teaching Wing', 'teaching', 'Regular evening classes, homework guidance, and mentorship for rural children.'),
('Technical Skills', 'technical-skills', 'Computer literacy classes, basic programming workshops, and spoken English tutorials.'),
('Rural Development', 'rural-development', 'Vocational training, government welfare schemes awareness, and sanitation improvements.'),
('Environment Wing', 'environment', 'Campus cleanliness campaigns, seasonal tree plantation drives, and environmental sustainability lectures.'),
('Chetna Wing', 'chetna', 'Health checkup camps, yoga training, first-aid campaigns, and blood donation drives.'),
('Prayatna Wing', 'prayatna', 'Underprivileged collections, children safety, winter clothing distribution, and books support campaigns.');

-- Seed Units
insert into public.units (number, motive, thumbnail_url) values
(1, 'one phrase motive', '/units/chetna_final.jpg'),
(2, 'one phrase motive', '/units/chetna_final.jpg'),
(3, 'one phrase motive', '/units/chetna_final.jpg');

-- Seed Testimonials
insert into public.testimonials (name, position, text, img_url, is_published) values
('Anirudh😎', 'Undergraduate at IITP', '<strong>NSS IITP is like a family for me.</strong> It helped me to meet other students from different programs and levels (UG/PG) to work on issues of social importance. I was involved in projects related to education, health, and environment. It gives a lot of satisfaction when NSS team was able to contribute in these sectors. A holistic feeling where we enjoyed and was able to bring some change, living the tag line ''NOT ME BUT ME''.', '/testimonial/person-1.jpg', true),
('Anirudh', 'Undergraduate at IITP', 'NSS IITP is like a family for me. It helped me to meet other students from different programs and levels (UG/PG) to work on issues of social importance. I was involved in projects related to education, health, and environment. It gives a lot of satisfaction when NSS team was able to contribute in these sectors. A holistic feeling where we enjoyed and was able to bring some change, living the tag line ''NOT ME BUT ME''.', '/testimonial/person-2.jpg', true);

-- Seed Collaborators
insert into public.collaborators (name, logo_url) values
('CLP', '/collaborators/CLP.png'),
('LCCWA', '/collaborators/lccwa.png'),
('Udaan', '/collaborators/udaan.png'),
('Vidya', '/collaborators/vidya.png');

-- Seed Impacts
insert into public.impacts (icon, title, description, count, unit) values
('PiShoppingBagFill', 'Nutritious Meals Packed', 'Helped over 15,000 people by packing and distributing nutritious meals.', '15_000', 'meal'),
('PiStudentBold', 'Students Reached', 'Cumulatively we reached out to over 50,000+ students since inception through teaching projects.', '50_000', 'students'),
('PiHeartFill', 'Blood Donation Camps', 'Conducted 4 blood donation camps with BloodConnect Foundation, collecting 10,000+ units in the past 10 years.', '10_000', 'units'),
('PiFileTextFill', 'Urgent Scribe Requests', 'Provided 500+ Scribes for the visually impaired children in collaboration with NAB the past 5 years.', '500', 'units');

-- Seed Events
insert into public.events (id, title, details, event_date, resources) values
('e0000000-0000-0000-0000-000000000001', 'Blood Donation Camp 2026', 'Annual blood donation camp organized by NSS IIT Patna in collaboration with local hospitals. We successfully collected over 200 units of blood to help patients in need.', '2026-04-15 09:00:00+00', array['https://example.com/blood-donation-guidelines.pdf']),
('e0000000-0000-0000-0000-000000000002', 'Village Cleanliness Drive', 'A massive cleanliness drive was organized in the nearby Amhara village under the Swachh Bharat Abhiyan. Over 50 volunteers participated in raising awareness and cleaning the surroundings.', '2026-05-02 08:00:00+00', array[]::text[]),
('e0000000-0000-0000-0000-000000000003', 'Education Outreach Program', 'Weekly education outreach program for the underprivileged children near the campus. Volunteers taught basic science and mathematics concepts through interactive activities.', '2026-05-18 16:00:00+00', array['https://example.com/study-materials.zip']),
('e0000000-0000-0000-0000-000000000004', 'World Environment Day - Tree Plantation', 'Planted 500 saplings across the campus and neighboring areas to promote a greener environment. The event saw participation from students and faculty alike.', '2026-06-05 07:00:00+00', array[]::text[]);

-- Link Events with Wings
-- For Event 1: Blood Donation Camp 2026 -> link to Chetna (e.g. Health)
insert into public.event_wings (event_id, wing_id) 
select 'e0000000-0000-0000-0000-000000000001', id from public.wings where slug = 'chetna';

-- For Event 2: Cleanliness Drive -> Environment and Rural Development
insert into public.event_wings (event_id, wing_id)
select 'e0000000-0000-0000-0000-000000000002', id from public.wings where slug in ('environment', 'rural-development');

-- For Event 3: Education Outreach -> Teaching Wing
insert into public.event_wings (event_id, wing_id)
select 'e0000000-0000-0000-0000-000000000003', id from public.wings where slug = 'teaching';

-- For Event 4: Environment Day -> Environment Wing
insert into public.event_wings (event_id, wing_id)
select 'e0000000-0000-0000-0000-000000000004', id from public.wings where slug = 'environment';

-- Seed Event Gallery Media
insert into public.event_media (event_id, media_url, caption, is_thumbnail) values
('e0000000-0000-0000-0000-000000000001', '/home_slider/SWACHHATA_HI_SEVA.jpeg', 'Swachhata Banner', false),
('e0000000-0000-0000-0000-000000000001', '/home_slider/nss_home.jpg', 'Blood Drive Photo', true),
('e0000000-0000-0000-0000-000000000002', '/home_slider/nss_home.jpg', 'Group picture of cleanliness drive', true),
('e0000000-0000-0000-0000-000000000004', '/home_slider/nss_home.jpg', 'Sapling plantation photo', true);
