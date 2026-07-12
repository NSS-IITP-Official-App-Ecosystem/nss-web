-- ========================================================
-- NSS IIT Patna Database Migration
-- Incremental updates for mega_events, events, and impacts
-- ========================================================

-- 1. Add collaborators column to events table if it does not exist
alter table public.events 
add column if not exists collaborators uuid[] default array[]::uuid[];

-- 2. Add tags column to impacts table if it does not exist
alter table public.impacts 
add column if not exists tags text[] default array[]::text[];

-- 3. Create mega_events table
create table if not exists public.mega_events (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    events uuid[] default array[]::uuid[], -- Array of event references
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS) for mega_events
alter table public.mega_events enable row level security;

-- 5. Create RLS Policies for mega_events
drop policy if exists "Allow public read access on mega_events" on public.mega_events;
create policy "Allow public read access on mega_events" on public.mega_events
    for select using (true);

drop policy if exists "Allow admins to manage mega_events" on public.mega_events;
create policy "Allow admins to manage mega_events" on public.mega_events
    for all using (public.is_admin(auth.uid()));

-- 6. Register Audit Trigger for mega_events
drop trigger if exists audit_mega_events_trigger on public.mega_events;
create trigger audit_mega_events_trigger
  after insert or update or delete on public.mega_events
  for each row execute procedure public.process_audit_log();
