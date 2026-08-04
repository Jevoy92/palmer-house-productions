create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  avatar_url text,
  job_title text not null default '',
  phone text not null default '',
  timezone text not null default 'America/Los_Angeles',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table public.workspace_subscriptions (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  plan text not null default 'trial' check (plan in ('trial', 'creator', 'business', 'partner')),
  status text not null default 'trialing' check (status in ('trialing', 'active', 'past_due', 'canceled', 'paused')),
  campaign_allowance integer not null default 1 check (campaign_allowance >= 0),
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz not null default (now() + interval '1 month'),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.workspace_settings (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  default_depth text not null default 'strategic' check (default_depth in ('quick', 'strategic', 'deep')),
  email_campaign_ready boolean not null default true,
  email_usage_alerts boolean not null default true,
  email_palmer_support boolean not null default true,
  week_starts_on integer not null default 1 check (week_starts_on between 0 and 6),
  updated_at timestamptz not null default now()
);

create table public.brand_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null unique references public.workspaces(id) on delete cascade,
  business_name text not null default '',
  website text not null default '',
  industry text not null default '',
  description text not null default '',
  primary_audience text not null default '',
  offers jsonb not null default '[]'::jsonb,
  voice_traits text[] not null default array[]::text[],
  preferred_language text not null default '',
  avoid_language text[] not null default array[]::text[],
  locations text[] not null default array[]::text[],
  platforms text[] not null default array[]::text[],
  calls_to_action text[] not null default array[]::text[],
  proof_points text[] not null default array[]::text[],
  content_examples text[] not null default array[]::text[],
  colors jsonb not null default '{}'::jsonb,
  fonts jsonb not null default '{}'::jsonb,
  completion integer not null default 0 check (completion between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  title text not null check (char_length(title) between 2 and 180),
  status text not null default 'draft' check (status in ('draft', 'generating', 'ready', 'scheduled', 'archived')),
  goal text not null,
  topic text not null,
  offer text not null default '',
  audience text not null default '',
  anchor_format text not null default 'authority_video',
  depth text not null default 'strategic' check (depth in ('quick', 'strategic', 'deep')),
  primary_lane text not null default 'spotlight' check (primary_lane in ('spotlight', 'reel', 'evergreen', 'system')),
  strategy jsonb not null default '{}'::jsonb,
  production_plan jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaign_assets (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  kind text not null check (kind in ('anchor_script', 'short_script', 'caption', 'linkedin', 'newsletter', 'faq', 'carousel', 'thumbnail', 'cta', 'production_note')),
  title text not null,
  content text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'approved', 'scheduled', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calendar_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  asset_id uuid references public.campaign_assets(id) on delete set null,
  title text not null,
  channel text not null default 'Instagram',
  publish_at timestamptz not null,
  assignee_id uuid references auth.users(id) on delete set null,
  status text not null default 'planned' check (status in ('planned', 'scripted', 'filmed', 'editing', 'approved', 'published')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.usage_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  campaign_id uuid references public.campaigns(id) on delete set null,
  action text not null check (action in ('ideas', 'short_script', 'long_script', 'campaign', 'website_analysis', 'monthly_plan')),
  units integer not null check (units > 0),
  status text not null default 'reserved' check (status in ('reserved', 'completed', 'released', 'failed')),
  provider_cost_cents integer check (provider_cost_cents is null or provider_cost_cents >= 0),
  idempotency_key text not null unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  campaign_id uuid references public.campaigns(id) on delete set null,
  request_type text not null check (request_type in ('strategy_review', 'filming_session', 'editing', 'content_audit', 'full_production')),
  status text not null default 'requested' check (status in ('requested', 'contacted', 'scheduled', 'completed', 'closed')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_invites (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  email text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  token_hash text not null unique,
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  invited_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index campaigns_workspace_created_idx on public.campaigns(workspace_id, created_at desc);
create index campaigns_created_by_idx on public.campaigns(created_by);
create index assets_campaign_sort_idx on public.campaign_assets(campaign_id, sort_order);
create index assets_workspace_idx on public.campaign_assets(workspace_id);
create index calendar_workspace_publish_idx on public.calendar_items(workspace_id, publish_at);
create index calendar_campaign_idx on public.calendar_items(campaign_id);
create index calendar_asset_idx on public.calendar_items(asset_id);
create index calendar_assignee_idx on public.calendar_items(assignee_id);
create index usage_workspace_created_idx on public.usage_events(workspace_id, created_at desc);
create index usage_user_idx on public.usage_events(user_id);
create index usage_campaign_idx on public.usage_events(campaign_id);
create index service_requests_workspace_created_idx on public.service_requests(workspace_id, created_at desc);
create index service_requests_user_idx on public.service_requests(user_id);
create index service_requests_campaign_idx on public.service_requests(campaign_id);
create index workspace_members_user_idx on public.workspace_members(user_id);
create index workspaces_created_by_idx on public.workspaces(created_by);
create index workspace_invites_workspace_idx on public.workspace_invites(workspace_id);
create index workspace_invites_invited_by_idx on public.workspace_invites(invited_by);

create or replace function private.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = target_workspace_id and user_id = (select auth.uid())
  );
$$;

create or replace function private.is_workspace_admin(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = (select auth.uid())
      and role in ('owner', 'admin')
  );
$$;

revoke all on function private.is_workspace_member(uuid) from public;
revoke all on function private.is_workspace_admin(uuid) from public;
grant execute on function private.is_workspace_member(uuid) to authenticated;
grant execute on function private.is_workspace_admin(uuid) to authenticated;

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.handle_new_workspace()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.workspace_members (workspace_id, user_id, role)
  values (new.id, new.created_by, 'owner');
  insert into public.workspace_subscriptions (workspace_id) values (new.id);
  insert into public.workspace_settings (workspace_id) values (new.id);
  insert into public.brand_profiles (workspace_id, business_name) values (new.id, new.name);
  return new;
end;
$$;

create trigger on_workspace_created
after insert on public.workspaces
for each row execute function private.handle_new_workspace();

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'profiles', 'workspaces', 'workspace_members', 'workspace_subscriptions',
    'workspace_settings', 'brand_profiles', 'campaigns', 'campaign_assets',
    'calendar_items', 'usage_events', 'service_requests', 'workspace_invites'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

create policy profiles_select on public.profiles for select to authenticated
using ((select auth.uid()) = id);
create policy profiles_update on public.profiles for update to authenticated
using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy workspaces_select on public.workspaces for select to authenticated
using (private.is_workspace_member(id));
create policy workspaces_insert on public.workspaces for insert to authenticated
with check ((select auth.uid()) = created_by);
create policy workspaces_update on public.workspaces for update to authenticated
using (private.is_workspace_admin(id)) with check (private.is_workspace_admin(id));
create policy workspaces_delete on public.workspaces for delete to authenticated
using (exists (
  select 1 from public.workspace_members
  where workspace_id = id and user_id = (select auth.uid()) and role = 'owner'
));

create policy members_select on public.workspace_members for select to authenticated
using (private.is_workspace_member(workspace_id));
create policy members_insert on public.workspace_members for insert to authenticated
with check (private.is_workspace_admin(workspace_id));
create policy members_update on public.workspace_members for update to authenticated
using (private.is_workspace_admin(workspace_id)) with check (private.is_workspace_admin(workspace_id));
create policy members_delete on public.workspace_members for delete to authenticated
using (private.is_workspace_admin(workspace_id) and role <> 'owner');

create policy subscriptions_select on public.workspace_subscriptions for select to authenticated
using (private.is_workspace_member(workspace_id));

create policy settings_select on public.workspace_settings for select to authenticated
using (private.is_workspace_member(workspace_id));
create policy settings_update on public.workspace_settings for update to authenticated
using (private.is_workspace_admin(workspace_id)) with check (private.is_workspace_admin(workspace_id));

create policy brand_profiles_all on public.brand_profiles for all to authenticated
using (private.is_workspace_member(workspace_id))
with check (private.is_workspace_member(workspace_id));

create policy campaigns_select on public.campaigns for select to authenticated
using (private.is_workspace_member(workspace_id));
create policy campaigns_insert on public.campaigns for insert to authenticated
with check (private.is_workspace_member(workspace_id) and created_by = (select auth.uid()));
create policy campaigns_update on public.campaigns for update to authenticated
using (private.is_workspace_member(workspace_id))
with check (private.is_workspace_member(workspace_id));
create policy campaigns_delete on public.campaigns for delete to authenticated
using (private.is_workspace_member(workspace_id));

create policy campaign_assets_all on public.campaign_assets for all to authenticated
using (private.is_workspace_member(workspace_id))
with check (private.is_workspace_member(workspace_id));

create policy calendar_items_all on public.calendar_items for all to authenticated
using (private.is_workspace_member(workspace_id))
with check (private.is_workspace_member(workspace_id));

create policy usage_events_select on public.usage_events for select to authenticated
using (private.is_workspace_member(workspace_id));

create policy service_requests_select on public.service_requests for select to authenticated
using (private.is_workspace_member(workspace_id));
create policy service_requests_insert on public.service_requests for insert to authenticated
with check (private.is_workspace_member(workspace_id) and user_id = (select auth.uid()));
create policy service_requests_update on public.service_requests for update to authenticated
using (private.is_workspace_admin(workspace_id)) with check (private.is_workspace_admin(workspace_id));

create policy workspace_invites_all on public.workspace_invites for all to authenticated
using (private.is_workspace_admin(workspace_id))
with check (private.is_workspace_admin(workspace_id) and invited_by = (select auth.uid()));

create or replace function public.reserve_campaign_usage(
  target_workspace_id uuid,
  target_campaign_id uuid,
  request_key text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  event_id uuid;
  allowance integer;
  used_count integer;
begin
  if (select auth.uid()) is null or not private.is_workspace_member(target_workspace_id) then
    raise exception 'Not authorized';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text, 0));

  select campaign_allowance into allowance
  from public.workspace_subscriptions
  where workspace_id = target_workspace_id
    and status in ('trialing', 'active');

  if allowance is null then raise exception 'Membership is not active'; end if;

  select count(*) into used_count
  from public.usage_events u
  join public.workspace_subscriptions s on s.workspace_id = u.workspace_id
  where u.workspace_id = target_workspace_id
    and u.action = 'campaign'
    and u.status in ('reserved', 'completed')
    and u.created_at >= s.current_period_start
    and u.created_at < s.current_period_end;

  if used_count >= allowance then raise exception 'Campaign allowance reached'; end if;

  insert into public.usage_events (
    workspace_id, user_id, campaign_id, action, units, idempotency_key
  ) values (
    target_workspace_id, (select auth.uid()), target_campaign_id, 'campaign', 10, request_key
  )
  on conflict (idempotency_key) do update set idempotency_key = excluded.idempotency_key
  returning id into event_id;

  return event_id;
end;
$$;

create or replace function public.finish_campaign_usage(target_event_id uuid, outcome text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if outcome not in ('completed', 'released', 'failed') then raise exception 'Invalid outcome'; end if;
  update public.usage_events
  set status = outcome, completed_at = now()
  where id = target_event_id
    and user_id = (select auth.uid())
    and status = 'reserved';
end;
$$;

revoke all on function public.reserve_campaign_usage(uuid, uuid, text) from public, anon;
revoke all on function public.finish_campaign_usage(uuid, text) from public, anon;
grant execute on function public.reserve_campaign_usage(uuid, uuid, text) to authenticated;
grant execute on function public.finish_campaign_usage(uuid, text) to authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.workspaces to authenticated;
grant select, insert, update, delete on public.workspace_members to authenticated;
grant select on public.workspace_subscriptions to authenticated;
grant select, update on public.workspace_settings to authenticated;
grant select, insert, update, delete on public.brand_profiles to authenticated;
grant select, insert, update, delete on public.campaigns to authenticated;
grant select, insert, update, delete on public.campaign_assets to authenticated;
grant select, insert, update, delete on public.calendar_items to authenticated;
grant select on public.usage_events to authenticated;
grant select, insert, update on public.service_requests to authenticated;
grant select, insert, update, delete on public.workspace_invites to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('brand-assets', 'brand-assets', false, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/plain']),
  ('campaign-assets', 'campaign-assets', false, 52428800, array['image/png', 'image/jpeg', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf', 'text/plain'])
on conflict (id) do nothing;

create policy studio_storage_select on storage.objects for select to authenticated
using (
  bucket_id in ('brand-assets', 'campaign-assets')
  and exists (
    select 1 from public.workspace_members
    where workspace_id::text = (storage.foldername(name))[1]
      and user_id = (select auth.uid())
  )
);

create policy studio_storage_insert on storage.objects for insert to authenticated
with check (
  bucket_id in ('brand-assets', 'campaign-assets')
  and exists (
    select 1 from public.workspace_members
    where workspace_id::text = (storage.foldername(name))[1]
      and user_id = (select auth.uid())
  )
);

create policy studio_storage_update on storage.objects for update to authenticated
using (
  bucket_id in ('brand-assets', 'campaign-assets')
  and exists (
    select 1 from public.workspace_members
    where workspace_id::text = (storage.foldername(name))[1]
      and user_id = (select auth.uid())
  )
)
with check (
  bucket_id in ('brand-assets', 'campaign-assets')
  and exists (
    select 1 from public.workspace_members
    where workspace_id::text = (storage.foldername(name))[1]
      and user_id = (select auth.uid())
  )
);

create policy studio_storage_delete on storage.objects for delete to authenticated
using (
  bucket_id in ('brand-assets', 'campaign-assets')
  and exists (
    select 1 from public.workspace_members
    where workspace_id::text = (storage.foldername(name))[1]
      and user_id = (select auth.uid())
  )
);

create trigger profiles_touch before update on public.profiles
for each row execute function private.touch_updated_at();
create trigger workspaces_touch before update on public.workspaces
for each row execute function private.touch_updated_at();
create trigger subscriptions_touch before update on public.workspace_subscriptions
for each row execute function private.touch_updated_at();
create trigger settings_touch before update on public.workspace_settings
for each row execute function private.touch_updated_at();
create trigger brand_profiles_touch before update on public.brand_profiles
for each row execute function private.touch_updated_at();
create trigger campaigns_touch before update on public.campaigns
for each row execute function private.touch_updated_at();
create trigger campaign_assets_touch before update on public.campaign_assets
for each row execute function private.touch_updated_at();
create trigger calendar_items_touch before update on public.calendar_items
for each row execute function private.touch_updated_at();
create trigger service_requests_touch before update on public.service_requests
for each row execute function private.touch_updated_at();
