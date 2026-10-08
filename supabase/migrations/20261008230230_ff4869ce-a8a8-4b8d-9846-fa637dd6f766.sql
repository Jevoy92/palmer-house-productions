create table public.social_publishing_addons (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  status text not null default 'inactive',
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);
create table public.social_teams (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  bundle_team_id text not null unique,
  created_at timestamptz not null default now()
);
create table public.social_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_by uuid not null,
  asset_id uuid references public.campaign_assets(id) on delete set null,
  platforms text[] not null,
  caption text not null,
  media_url text,
  scheduled_at timestamptz not null default now(),
  status text not null default 'reserved',
  destinations integer not null,
  bundle_post_id text,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index social_posts_ws_created on public.social_posts(workspace_id, created_at desc);

grant select on public.social_publishing_addons, public.social_teams, public.social_posts to authenticated;
grant all on public.social_publishing_addons, public.social_teams, public.social_posts to service_role;
alter table public.social_publishing_addons enable row level security;
alter table public.social_teams enable row level security;
alter table public.social_posts enable row level security;
create policy social_addons_read on public.social_publishing_addons for select to authenticated using (private.is_workspace_member(workspace_id));
create policy social_teams_read on public.social_teams for select to authenticated using (private.is_workspace_member(workspace_id));
create policy social_posts_read on public.social_posts for select to authenticated using (private.is_workspace_member(workspace_id));

-- Atomic allowance reservation: 20 free per calendar month (UTC), 100 with an active add-on.
create or replace function public.reserve_social_posts(
  target_workspace_id uuid, actor uuid, asset uuid, platform_list text[],
  post_caption text, post_media text, post_at timestamptz
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  allowance int; used int; need int := coalesce(array_length(platform_list,1),0); new_id uuid;
begin
  if need < 1 then raise exception 'Pick at least one account.'; end if;
  perform pg_advisory_xact_lock(hashtext('social:' || target_workspace_id::text));
  select case when status = 'active' and (current_period_end is null or current_period_end > now()) then 100 else 20 end
    into allowance from social_publishing_addons where workspace_id = target_workspace_id;
  allowance := coalesce(allowance, 20);
  select coalesce(sum(destinations),0) into used from social_posts
    where workspace_id = target_workspace_id and status not in ('failed','canceled')
      and created_at >= date_trunc('month', now() at time zone 'utc') at time zone 'utc';
  if used + need > allowance then
    return jsonb_build_object('ok', false, 'used', used, 'allowance', allowance);
  end if;
  insert into social_posts(workspace_id, created_by, asset_id, platforms, caption, media_url, scheduled_at, destinations)
    values (target_workspace_id, actor, asset, platform_list, post_caption, post_media, coalesce(post_at, now()), need)
    returning id into new_id;
  return jsonb_build_object('ok', true, 'id', new_id, 'used', used + need, 'allowance', allowance);
end $$;
revoke all on function public.reserve_social_posts(uuid,uuid,uuid,text[],text,text,timestamptz) from public, anon, authenticated;
grant execute on function public.reserve_social_posts(uuid,uuid,uuid,text[],text,text,timestamptz) to service_role;