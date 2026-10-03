-- Onboarding submissions for the marketing site's signup wizard and Stripe
-- checkout.
--
-- ADDITIVE ONLY. Creates one new table. Does not touch any table Burn Mat
-- reads (studios, profiles, studio_memberships, bookings, ...).
--
-- Written only by the marketing site's server routes using the service role,
-- so RLS is on with no policies: anon and authenticated clients get nothing.
--
-- Applied to Forma DB (yzcerbbiifususbxczns) on 2026-10-03.

create table if not exists public.onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- in_progress → checkout_started → paid → (cancelled | payment_failed)
  status text not null default 'in_progress'
    check (status in ('in_progress', 'checkout_started', 'paid', 'payment_failed', 'cancelled')),
  current_step smallint,

  -- Step 1: studio basics
  studio_name text not null default 'Untitled',
  location text,
  studio_type text,
  domain text,

  -- Steps 2–4
  classes jsonb,
  packs jsonb,
  team jsonb,
  theme_mood text,
  brand_colour text,
  brand_notes text,

  -- Step 5: plan and owner
  plan_tier text not null default 'studio'
    check (plan_tier in ('launch', 'studio', 'pro', 'partner')),
  billing_interval text not null default 'month'
    check (billing_interval in ('month', 'year')),
  owner_name text,
  owner_email text,
  owner_phone text,
  notes text,
  referral_code text,

  -- Stripe
  stripe_checkout_session_id text unique,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  paid_at timestamptz
);

create index if not exists onboarding_submissions_status_idx
  on public.onboarding_submissions (status, created_at desc);

create index if not exists onboarding_submissions_owner_email_idx
  on public.onboarding_submissions (lower(owner_email));

alter table public.onboarding_submissions enable row level security;

create or replace function public.onboarding_submissions_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists onboarding_submissions_touch_updated_at on public.onboarding_submissions;
create trigger onboarding_submissions_touch_updated_at
  before update on public.onboarding_submissions
  for each row execute function public.onboarding_submissions_touch_updated_at();
