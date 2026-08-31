const SCHEMA_SQL = `
create extension if not exists pgcrypto;

create table if not exists riders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists drivers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  photo_url text,
  license_number text,
  status text not null default 'offline' check (status in ('offline','available','busy','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  color text,
  plate_number text not null unique,
  passenger_capacity integer not null default 4 check (passenger_capacity between 1 and 60),
  status text not null default 'available' check (status in ('available','busy','maintenance','inactive')),
  tracker_external_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists rides (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  booking_group_id uuid not null,
  leg integer not null default 1 check (leg in (1,2)),
  rider_id uuid not null references riders(id),
  driver_id uuid references drivers(id),
  vehicle_id uuid references vehicles(id),
  service text not null default 'private-transfer',
  status text not null default 'requested' check (status in ('requested','confirmed','assigned','en_route','arrived','in_progress','completed','cancelled','no_show','emergency')),
  pickup_address text not null,
  pickup_lat double precision,
  pickup_lng double precision,
  destination_address text not null,
  destination_lat double precision,
  destination_lng double precision,
  scheduled_at timestamptz not null,
  passenger_count integer not null default 1 check (passenger_count between 1 and 60),
  flight_number text,
  notes text,
  currency char(3) not null default 'EUR',
  quoted_price numeric(10,2),
  final_price numeric(10,2),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','deposit_paid','paid','refunded','cash_due')),
  tracking_token_hash text not null unique,
  tracking_expires_at timestamptz not null,
  arrived_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  last_lat double precision,
  last_lng double precision,
  last_heading double precision,
  last_speed_kph double precision,
  last_location_at timestamptz,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ride_events (
  id bigserial primary key,
  ride_id uuid not null references rides(id) on delete cascade,
  event_type text not null,
  actor_type text not null check (actor_type in ('system','admin','driver','rider','device')),
  actor_id text,
  from_status text,
  to_status text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists device_credentials (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  kind text not null check (kind in ('driver_app','vehicle_tracker')),
  token_hash text not null unique,
  driver_id uuid references drivers(id),
  vehicle_id uuid references vehicles(id),
  active boolean not null default true,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create table if not exists ride_positions (
  id bigserial primary key,
  ride_id uuid not null references rides(id) on delete cascade,
  device_id uuid references device_credentials(id),
  source text not null check (source in ('driver_app','vehicle_tracker','admin')),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  accuracy_m double precision,
  heading double precision,
  speed_kph double precision,
  battery_percent integer,
  sequence_number bigint,
  recorded_at timestamptz not null,
  received_at timestamptz not null default now(),
  unique(device_id, sequence_number)
);

alter table ride_positions alter column ride_id drop not null;
alter table ride_positions add column if not exists vehicle_id uuid references vehicles(id);
alter table ride_positions add column if not exists driver_id uuid references drivers(id);
create index if not exists ride_positions_vehicle_time_idx on ride_positions(vehicle_id, recorded_at desc);

create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid references rides(id) on delete cascade,
  type text not null,
  severity text not null default 'medium' check (severity in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','acknowledged','resolved','dismissed')),
  title text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists dispatch_offers (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references rides(id) on delete cascade,
  driver_id uuid not null references drivers(id),
  vehicle_id uuid references vehicles(id),
  status text not null default 'offered' check (status in ('offered','accepted','rejected','expired','withdrawn')),
  distance_to_pickup_m double precision,
  offered_at timestamptz not null default now(),
  expires_at timestamptz not null,
  responded_at timestamptz
);

alter table dispatch_offers drop constraint if exists dispatch_offers_ride_id_driver_id_status_key;
create unique index if not exists dispatch_offers_one_active_idx
  on dispatch_offers(ride_id, driver_id) where status='offered';

create table if not exists notification_outbox (
  id bigserial primary key,
  ride_id uuid references rides(id) on delete cascade,
  recipient_type text not null check (recipient_type in ('admin','driver','rider')),
  recipient_id text,
  channel text not null check (channel in ('push','email','sms','in_app')),
  template text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','processing','sent','failed','cancelled')),
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists ride_ratings (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references rides(id) on delete cascade,
  author_type text not null check (author_type in ('rider','driver')),
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique(ride_id, author_type)
);

create table if not exists admin_login_attempts (
  ip_hash text primary key,
  failures integer not null default 0,
  window_started_at timestamptz not null default now(),
  locked_until timestamptz
);

create table if not exists partner_applications (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'received' check (status in ('received','under_review','approved','declined','archived')),
  language text not null default 'en' check (language in ('hr','en','de','fr')),
  applicant_type text not null check (applicant_type in ('independent-driver','transport-company')),
  full_name text not null,
  company_name text,
  email text not null,
  phone text not null,
  country text not null,
  base_city text not null,
  years_experience integer not null check (years_experience between 0 and 60),
  license_number text not null,
  transport_permit text not null,
  insurance_valid_until date not null,
  languages jsonb not null default '[]'::jsonb,
  other_languages text,
  availability jsonb not null default '[]'::jsonb,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year integer not null check (vehicle_year between 1995 and 2035),
  plate_number text not null,
  vehicle_color text not null,
  vehicle_type text not null check (vehicle_type in ('sedan','premium-sedan','suv','minivan','van','minibus')),
  seats integer not null check (seats between 1 and 60),
  luggage_capacity integer not null check (luggage_capacity between 0 and 40),
  amenities jsonb not null default '[]'::jsonb,
  service_base text not null,
  coverage_countries text not null,
  usual_routes text not null,
  notes text,
  photo_manifest jsonb not null default '[]'::jsonb,
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table rides add column if not exists vehicle_class text;
alter table rides add column if not exists addons jsonb not null default '[]'::jsonb;
alter table rides add column if not exists hourly_hours integer check (hourly_hours between 2 and 12);
alter table rides add column if not exists quote_id text;
alter table rides add column if not exists quote_amount numeric(10,2);
alter table rides add column if not exists flight_status jsonb;

create table if not exists flight_watches (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null unique references rides(id) on delete cascade,
  flight_number text not null,
  provider text not null default 'pending',
  last_status jsonb,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists booking_change_requests (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references rides(id) on delete cascade,
  request_type text not null check (request_type in ('change','cancel')),
  message text not null,
  status text not null default 'received' check (status in ('received','in_review','resolved','declined')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists business_inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  language text not null default 'en' check (language in ('hr','en','de','fr')),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  company_type text not null,
  operating_cities text,
  monthly_rides text,
  message text,
  status text not null default 'received' check (status in ('received','contacted','qualified','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tracks only the records created by the local demo-data command. Keeping the
-- manifest separate means cleanup can never rely on broad name or email matches.
create table if not exists demo_data_runs (
  id uuid primary key default gen_random_uuid(),
  run_key text not null unique,
  label text not null,
  created_at timestamptz not null default now()
);

create table if not exists demo_data_records (
  run_id uuid not null references demo_data_runs(id) on delete cascade,
  entity_type text not null,
  entity_id text not null,
  created_at timestamptz not null default now(),
  primary key (run_id, entity_type, entity_id)
);

create index if not exists rides_status_scheduled_idx on rides(status, scheduled_at);
create index if not exists rides_driver_status_idx on rides(driver_id, status);
create index if not exists ride_events_ride_time_idx on ride_events(ride_id, occurred_at desc);
create index if not exists ride_positions_ride_time_idx on ride_positions(ride_id, recorded_at desc);
create index if not exists incidents_status_time_idx on incidents(status, created_at desc);
create index if not exists dispatch_driver_status_idx on dispatch_offers(driver_id,status,expires_at);
create index if not exists notification_pending_idx on notification_outbox(status,available_at);
create index if not exists partner_applications_status_time_idx on partner_applications(status, created_at desc);
create index if not exists flight_watches_checked_idx on flight_watches(last_checked_at asc nulls first);
create index if not exists booking_change_requests_ride_time_idx on booking_change_requests(ride_id, created_at desc);
create index if not exists business_inquiries_status_time_idx on business_inquiries(status, created_at desc);
create index if not exists demo_data_records_run_type_idx on demo_data_records(run_id, entity_type);
`;

module.exports = { SCHEMA_SQL };
