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
alter table public.campaign_assets drop constraint if exists campaign_assets_kind_check;
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
revoke all on public.studio_pal_profiles, public.studio_feed_posts, public.studio_feed_comments, public.studio_feed_reactions from anon, authenticated;
grant select, insert on public.studio_pal_profiles to authenticated;
grant update (name, base_pal, personality, avatar_path, updated_at) on public.studio_pal_profiles to authenticated;
grant select, insert, delete on public.studio_feed_posts to authenticated;
grant select, insert on public.studio_feed_comments to authenticated;
grant select, insert, delete on public.studio_feed_reactions to authenticated;
grant all on public.studio_pal_profiles, public.studio_feed_posts, public.studio_feed_comments, public.studio_feed_reactions to service_role;
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
create function public.create_studio_feed_discussion(target_workspace_id uuid, post_value jsonb, replies_value jsonb)
returns uuid language plpgsql security invoker set search_path = public as $$
declare new_post_id uuid; reply jsonb;
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  if jsonb_typeof(post_value) <> 'object' or jsonb_typeof(replies_value) <> 'array' then raise exception 'Invalid discussion'; end if;
  if jsonb_array_length(replies_value) not between 2 and 4 then raise exception 'A discussion needs two to four replies'; end if;
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
create unique index assistant_campaign_link_once
  on public.assistant_messages (conversation_id, (metadata->>'campaignId'))
  where role = 'assistant' and metadata->>'studioCampaignLink' = 'true';

create table public.workspace_memories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 100),
  content text not null check (char_length(btrim(content)) between 1 and 2000),
  revision integer not null default 1 check (revision > 0),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index workspace_memories_context on public.workspace_memories(workspace_id, created_at, id);
revoke all on public.workspace_memories from anon, authenticated;
grant select on public.workspace_memories to authenticated;
grant all on public.workspace_memories to service_role;
alter table public.workspace_memories enable row level security;
create policy memory_read on public.workspace_memories for select to authenticated using (private.is_workspace_member(workspace_id));
create function public.save_workspace_memory(target_workspace_id uuid, memory_id uuid, memory_title text, memory_content text, expected_revision integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare saved public.workspace_memories; entry_count integer; content_count integer;
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  perform pg_advisory_xact_lock(hashtextextended('studio-memory:' || target_workspace_id::text, 0));
  if memory_id is not null and not exists (select 1 from public.workspace_memories where id=memory_id and workspace_id=target_workspace_id and revision=expected_revision) then
    raise exception 'Memory changed or was forgotten. Reload before saving.';
  end if;
  select count(*), coalesce(sum(char_length(content)),0) into entry_count, content_count
    from public.workspace_memories where workspace_id=target_workspace_id and (memory_id is null or id<>memory_id);
  if entry_count >= 50 then raise exception 'Memory limit reached. Keep up to 50 entries.'; end if;
  if content_count + char_length(btrim(memory_content)) > 30000 then raise exception 'Memory content limit reached. Shorten or forget an entry.'; end if;
  if memory_id is null then
    insert into public.workspace_memories(workspace_id,title,content,created_by)
      values(target_workspace_id,btrim(memory_title),btrim(memory_content),auth.uid()) returning * into saved;
  else
    update public.workspace_memories set title=btrim(memory_title),content=btrim(memory_content),revision=revision+1,updated_at=now()
      where id=memory_id and workspace_id=target_workspace_id and revision=expected_revision returning * into saved;
  end if;
  return to_jsonb(saved);
end;
$$;
create function public.forget_workspace_memory(target_workspace_id uuid, memory_id uuid, expected_revision integer)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  perform pg_advisory_xact_lock(hashtextextended('studio-memory:' || target_workspace_id::text, 0));
  delete from public.workspace_memories where workspace_id=target_workspace_id and id=memory_id and revision=expected_revision;
  if not found then raise exception 'Memory changed or was forgotten. Reload before forgetting.'; end if;
end;
$$;
create function public.forget_workspace_legacy_memory(target_workspace_id uuid, expected_value jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  update public.workspace_settings set ai_memory='{}'::jsonb where workspace_id=target_workspace_id and ai_memory=expected_value;
  if not found then raise exception 'Legacy notes changed. Reload before forgetting.'; end if;
end;
$$;
revoke all on function public.save_workspace_memory(uuid,uuid,text,text,integer), public.forget_workspace_memory(uuid,uuid,integer), public.forget_workspace_legacy_memory(uuid,jsonb) from public, anon;
grant execute on function public.save_workspace_memory(uuid,uuid,text,text,integer), public.forget_workspace_memory(uuid,uuid,integer), public.forget_workspace_legacy_memory(uuid,jsonb) to authenticated;

create function public.associate_studio_asset_image(target_workspace_id uuid, source_asset_id uuid, image_asset_id uuid, expected_source_updated_at timestamptz)
returns void language plpgsql security invoker set search_path=public as $$
declare source_row public.campaign_assets; image_row public.campaign_assets;
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  if source_asset_id=image_asset_id then raise exception 'An image cannot be its own cover'; end if;
  select * into source_row from public.campaign_assets where id=source_asset_id and workspace_id=target_workspace_id for update;
  if not found or source_row.updated_at is distinct from expected_source_updated_at then raise exception 'Source output changed'; end if;
  select * into image_row from public.campaign_assets where id=image_asset_id and workspace_id=target_workspace_id;
  if not found or image_row.kind<>'image' or image_row.metadata->>'targetAssetId' is distinct from source_asset_id::text or image_row.campaign_id is distinct from source_row.campaign_id then raise exception 'Image does not belong to this output'; end if;
  if coalesce(image_row.metadata->>'mimeType','') not in ('image/png','image/jpeg','image/webp') or coalesce(image_row.metadata->>'storagePath','') not like target_workspace_id::text || '/%' then raise exception 'Invalid private image'; end if;
  update public.campaign_assets set metadata=(coalesce(metadata,'{}') - array['imageUrl','image_url','coverImageUrl','thumbnailUrl','posterUrl','mediaUrl']) || jsonb_build_object('mediaAssetId',image_asset_id,'imageBrief',image_row.metadata->'imageBrief','imageAlt',coalesce(image_row.metadata->>'imageAlt','Image for ' || source_row.title)), updated_at=now() where id=source_asset_id and workspace_id=target_workspace_id;
end;
$$;
revoke all on function public.associate_studio_asset_image(uuid,uuid,uuid,timestamptz) from public,anon;
grant execute on function public.associate_studio_asset_image(uuid,uuid,uuid,timestamptz) to authenticated;
create table public.studio_feed_generation_state (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  request_token uuid, requested_by uuid references auth.users(id), lease_until timestamptz,
  pending_fingerprint text, last_fingerprint text, last_output_fingerprint text,
  last_generated_at timestamptz, retry_after timestamptz,
  updated_at timestamptz not null default now()
);
revoke all on public.studio_feed_generation_state from public,anon,authenticated;
grant all on public.studio_feed_generation_state to service_role;
alter table public.studio_feed_generation_state enable row level security;
create function public.reserve_studio_feed_generation(target_workspace_id uuid, context_fingerprint text, request_mode text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare current_row public.studio_feed_generation_state; token uuid; next_time timestamptz;
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  if coalesce(request_mode,'') not in ('automatic','manual') or coalesce(context_fingerprint,'') !~ '^[a-f0-9]{64}$' then raise exception 'Invalid generation request'; end if;
  insert into public.studio_feed_generation_state(workspace_id) values(target_workspace_id) on conflict do nothing;
  select * into current_row from public.studio_feed_generation_state where workspace_id=target_workspace_id for update;
  if current_row.lease_until>now() then return jsonb_build_object('status','deferred','reason','Your Pals are already preparing a discussion.','nextAttemptAt',current_row.lease_until); end if;
  next_time=current_row.retry_after;
  if current_row.last_generated_at is not null then
    next_time=greatest(next_time,current_row.last_generated_at + case when request_mode='manual' then interval '5 minutes' when current_row.last_fingerprint=context_fingerprint then interval '24 hours' else interval '6 hours' end);
  end if;
  if next_time>now() then return jsonb_build_object('status','deferred','reason','Your Pals have recently checked this workspace.','nextAttemptAt',next_time); end if;
  token=gen_random_uuid();
  update public.studio_feed_generation_state set request_token=token,requested_by=auth.uid(),lease_until=now()+interval '5 minutes',pending_fingerprint=context_fingerprint,retry_after=now()+interval '5 minutes',updated_at=now() where workspace_id=target_workspace_id;
  return jsonb_build_object('status','claimed','token',token);
end;
$$;
create function public.complete_studio_feed_generation(target_workspace_id uuid, request_token uuid, post_value jsonb, replies_value jsonb, output_fingerprint text)
returns uuid language plpgsql security definer set search_path='' as $$
declare current_row public.studio_feed_generation_state; post_id uuid;
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  select * into current_row from public.studio_feed_generation_state where workspace_id=target_workspace_id for update;
  if not found or current_row.request_token is distinct from request_token or current_row.requested_by is distinct from auth.uid() or current_row.lease_until<now() then raise exception 'Generation lease expired'; end if;
  if coalesce(output_fingerprint,'') !~ '^[a-f0-9]{64}$' or current_row.last_output_fingerprint=output_fingerprint then raise exception 'Duplicate discussion'; end if;
  post_id=public.create_studio_feed_discussion(target_workspace_id,post_value,replies_value);
  update public.studio_feed_generation_state set last_fingerprint=pending_fingerprint,last_output_fingerprint=output_fingerprint,last_generated_at=now(),request_token=null,requested_by=null,lease_until=null,retry_after=now()+interval '5 minutes',updated_at=now() where workspace_id=target_workspace_id;
  return post_id;
end;
$$;
create function public.release_studio_feed_generation(target_workspace_id uuid, request_token uuid)
returns void language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is null or not private.is_workspace_member(target_workspace_id) then raise exception 'Workspace access required'; end if;
  update public.studio_feed_generation_state as s set request_token=null,requested_by=null,lease_until=null,retry_after=now()+interval '10 minutes',updated_at=now() where s.workspace_id=target_workspace_id and s.request_token=release_studio_feed_generation.request_token and s.requested_by=auth.uid();
end;
$$;
revoke all on function public.reserve_studio_feed_generation(uuid,text,text),public.complete_studio_feed_generation(uuid,uuid,jsonb,jsonb,text),public.release_studio_feed_generation(uuid,uuid) from public,anon;
grant execute on function public.reserve_studio_feed_generation(uuid,text,text),public.complete_studio_feed_generation(uuid,uuid,jsonb,jsonb,text),public.release_studio_feed_generation(uuid,uuid) to authenticated;