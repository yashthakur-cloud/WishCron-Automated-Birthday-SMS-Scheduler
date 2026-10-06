create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  recipient_name text not null,
  recipient_phone text not null,
  dob_month integer not null check (dob_month between 1 and 12),
  dob_day integer not null check (dob_day between 1 and 31),
  custom_message text,
  last_sent_year integer not null default 0,
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade
);

alter table public.contacts
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

create index if not exists contacts_user_id_idx
  on public.contacts (user_id);

create index if not exists contacts_birthday_idx
  on public.contacts (dob_month, dob_day);

alter table public.contacts enable row level security;

drop policy if exists "Users can view their own contacts" on public.contacts;
create policy "Users can view their own contacts"
  on public.contacts for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own contacts" on public.contacts;
create policy "Users can create their own contacts"
  on public.contacts for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own contacts" on public.contacts;
create policy "Users can update their own contacts"
  on public.contacts for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own contacts" on public.contacts;
create policy "Users can delete their own contacts"
  on public.contacts for delete
  using ((select auth.uid()) = user_id);
