-- Bena Tech Database Schema Setup Script
-- Copy and paste this script into your Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Clean up existing tables (Optional/Safe run)
drop trigger if exists tr_on_booking_created on public.bookings;
drop function if exists public.handle_new_booking;
drop table if exists public.bookings;
drop table if exists public.available_slots;

-- 2. Create 'available_slots' table
create table public.available_slots (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  time_slot text not null,
  is_booked boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Prevent duplicate time slots on the same date
  constraint unique_date_time unique (date, time_slot)
);

-- 3. Create 'bookings' table
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  slot_id uuid references public.available_slots(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  interest text not null,
  meeting_type text not null,
  google_event_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS) on both tables
alter table public.available_slots enable row level security;
alter table public.bookings enable row level security;

-- 5. Define Security Policies for 'available_slots'
-- Allows anyone (public) to view available slots
create policy "Allow public read of slots" 
on public.available_slots for select 
using (true);

-- Allows only authenticated administrators to do everything else
create policy "Allow admin control of slots" 
on public.available_slots for all 
to authenticated 
using (true) 
with check (true);

-- 6. Define Security Policies for 'bookings'
-- Allows anyone to submit (insert) a new booking
create policy "Allow public booking submissions" 
on public.bookings for insert 
with check (true);

-- Allows only authenticated administrators to view and manage bookings
create policy "Allow admin control of bookings" 
on public.bookings for all 
to authenticated 
using (true) 
with check (true);

-- 7. Define Database Trigger for Auto-Marking Booked Slots
-- This functions as a fail-safe. When a row is inserted in 'bookings', 
-- it automatically sets 'is_booked = true' on the corresponding slot.
create or replace function public.handle_new_booking() 
returns trigger as $$
begin
  update public.available_slots 
  set is_booked = true 
  where id = new.slot_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger tr_on_booking_created
  after insert on public.bookings
  for each row execute function public.handle_new_booking();
