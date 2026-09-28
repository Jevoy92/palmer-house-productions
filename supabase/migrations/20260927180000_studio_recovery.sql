-- Studio recovery: workspace-scoped profiles and independently written feed rows.
-- Run through the normal deployment migration process; never in a browser.
begin;
create table public.studio_pal_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  name text not null check (char_length(btrim(name)) between 1 and 60),
  base_pal text not null check (base_pal in ('kareem','kiana','ryder','raquel','cyrus','clara','silas','samira')),
  personality text not null check (char_length(btrim(personality)) between 3 and 1600),
  avatar_path text check (avatar_path is null or (avatar_path like workspace_id::text || '/%' and avatar_path not like '%..%' and char_length(avatar_path) <= 600)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id)
);
alter table public.workspace_settings add column active_pal_profile_id uuid;
alter table public.workspace_settings add constraint workspace_active_pal_fk
  foreign key (workspace_id, active_pal_profile_id) references public.studio_pal_profiles(workspace_id,id);

alter table public.campaign_assets alter column campaign_id drop not null;
alter table public.campaign_assets drop constraint campaign_assets_kind_check;
alter table public.campaign_assets add constraint campaign_assets_kind_check check
 (kind in ('anchor_script','short_script','caption','linkedin','newsletter','faq','carousel','thumbnail','cta','production_note','platform_post','article','image','document'));
alter table public.campaign_assets add constraint campaign_assets_workspace_id_id_key unique (workspace_id,id);

create table public.studio_feed_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  title text not null default '' check (char_length(title) <= 180),
  body text not null check (char_length(btrim(body)) between 1 and 4000),
  lane text not null default 'reel' check (lane in ('spotlight','reel','evergreen','system')),
  author jsonb not null check (jsonb_typeof(author) = 'object' and octet_length(author::text) <= 4000),
  sources jsonb not null default '[]' check (jsonb_typeof(sources) = 'array' and jsonb_array_length(sources) <= 6),
  asset_id uuid,
  generated boolean not null default false,
  created_at timestamptz not null default now(),
  unique (workspace_id,id),
  foreign key (workspace_id,asset_id) references public.campaign_assets(workspace_id,id) on delete cascade
);
create table public.studio_feed_comments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  post_id uuid not null,
  created_by uuid not null references auth.users(id),
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  author jsonb not null check (jsonb_typeof(author) = 'object' and octet_length(author::text) <= 4000),
  created_at timestamptz not null default now(),
  foreign key (workspace_id,post_id) references public.studio_feed_posts(workspace_id,id) on delete cascade
);
create table public.studio_feed_reactions (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  post_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  reaction text not null check (reaction in ('helpful','love','spark')),
  created_at timestamptz not null default now(),
  primary key(post_id,user_id,reaction),
  foreign key (workspace_id,post_id) references public.studio_feed_posts(workspace_id,id) on delete cascade
);
create index studio_feed_posts_recent on public.studio_feed_posts(workspace_id,created_at desc);
create index studio_feed_comments_post on public.studio_feed_comments(workspace_id,post_id,created_at);
create index studio_pal_profiles_workspace on public.studio_pal_profiles(workspace_id);

alter table public.studio_pal_profiles enable row level security;
alter table public.studio_feed_posts enable row level security;
alter table public.studio_feed_comments enable row level security;
alter table public.studio_feed_reactions enable row level security;
create policy pal_read on public.studio_pal_profiles for select to authenticated using (private.is_workspace_member(workspace_id));
create policy pal_insert on public.studio_pal_profiles for insert to authenticated with check (private.is_workspace_member(workspace_id) and created_by = auth.uid());
create policy pal_edit on public.studio_pal_profiles for update to authenticated using (private.is_workspace_member(workspace_id)) with check (private.is_workspace_member(workspace_id));
create policy feed_read on public.studio_feed_posts for select to authenticated using (private.is_workspace_member(workspace_id));
create policy feed_insert on public.studio_feed_posts for insert to authenticated with check (private.is_workspace_member(workspace_id) and created_by = auth.uid());
create policy feed_delete on public.studio_feed_posts for delete to authenticated using (private.is_workspace_member(workspace_id) and created_by = auth.uid());
create policy comments_read on public.studio_feed_comments for select to authenticated using (private.is_workspace_member(workspace_id));
create policy comments_insert on public.studio_feed_comments for insert to authenticated with check (private.is_workspace_member(workspace_id) and created_by = auth.uid());
create policy reactions_read on public.studio_feed_reactions for select to authenticated using (private.is_workspace_member(workspace_id));
create policy reactions_insert on public.studio_feed_reactions for insert to authenticated with check (private.is_workspace_member(workspace_id) and user_id = auth.uid());
create policy reactions_delete on public.studio_feed_reactions for delete to authenticated using (private.is_workspace_member(workspace_id) and user_id = auth.uid());
-- Supabase may grant new public tables broader default privileges. Restrict
-- those grants explicitly so immutable ownership fields cannot be updated.
revoke all on public.studio_pal_profiles, public.studio_feed_posts, public.studio_feed_comments, public.studio_feed_reactions from anon, authenticated;
grant select, insert on public.studio_pal_profiles to authenticated;
grant update (name, base_pal, personality, avatar_path, updated_at) on public.studio_pal_profiles to authenticated;
grant select, insert, delete on public.studio_feed_posts to authenticated;
grant select, insert on public.studio_feed_comments to authenticated;
grant select, insert, delete on public.studio_feed_reactions to authenticated;
-- One transaction stores the generated opener and every reply; no partial
-- discussion survives a failed comment insert. Caller identity always comes
-- from auth.uid(), never the request payload.
create function public.create_studio_feed_discussion(target_workspace_id uuid, post_value jsonb, replies_value jsonb)
returns uuid language plpgsql security invoker set search_path = public as $$
declare new_post_id uuid; reply jsonb;
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then
    raise exception 'Workspace access required';
  end if;
  if jsonb_typeof(post_value) <> 'object' or jsonb_typeof(replies_value) <> 'array' then
    raise exception 'Invalid discussion';
  end if;
  if jsonb_array_length(replies_value) not between 2 and 4 then
    raise exception 'A discussion needs two to four replies';
  end if;
  insert into public.studio_feed_posts(workspace_id,created_by,title,body,lane,author,sources,generated)
    values (target_workspace_id,auth.uid(),post_value->>'title',post_value->>'body',post_value->>'lane',
      post_value->'author',coalesce(post_value->'sources','[]'::jsonb),true) returning id into new_post_id;
  for reply in select value from jsonb_array_elements(replies_value) loop
    insert into public.studio_feed_comments(workspace_id,post_id,created_by,body,author)
      values (target_workspace_id,new_post_id,auth.uid(),reply->>'body',reply->'author');
  end loop;
  return new_post_id;
end;
$$;
revoke all on function public.create_studio_feed_discussion(uuid,jsonb,jsonb) from public;
grant execute on function public.create_studio_feed_discussion(uuid,jsonb,jsonb) to authenticated;

-- Retrying a campaign-link request never creates duplicate restored chat cards.
create unique index assistant_campaign_link_once
  on public.assistant_messages (conversation_id, (metadata->>'campaignId'))
  where role = 'assistant' and metadata->>'studioCampaignLink' = 'true';
commit;
