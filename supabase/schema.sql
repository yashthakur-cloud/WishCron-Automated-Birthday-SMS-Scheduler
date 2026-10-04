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
  created_at timestamptz not null default now()
);

create index if not exists contacts_birthday_idx
  on public.contacts (dob_month, dob_day);
