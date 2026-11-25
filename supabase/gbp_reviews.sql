-- Ejecutar en Supabase > SQL Editor. Tablas nuevas; no tocan "doctores".
create table if not exists gbp_locations (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid,
  account_id text not null,              -- ej. accounts/123456
  location_id text not null,             -- ej. locations/789012
  doctor_name text,
  specialty text,
  tone text default 'cálido y profesional',
  auto_publish_min_stars int default 4,  -- menos que esto queda en borrador
  active boolean default true,
  created_at timestamptz default now(),
  unique (account_id, location_id)
);

create table if not exists gbp_reviews (
  review_id text primary key,
  location_uuid uuid references gbp_locations(id) on delete cascade,
  stars int,
  reviewer text,
  comment text,
  review_created_at timestamptz,
  reply_draft text,
  status text default 'pending',         -- published | needs_approval | error
  published_at timestamptz,
  created_at timestamptz default now()
);

alter table gbp_locations enable row level security;
alter table gbp_reviews enable row level security;
-- Sin politicas: solo accede el service role (el cron).
