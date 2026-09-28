begin;
-- Canonical, provider-independent memory. Existing ai_memory is retained with
-- unknown provenance and is never silently promoted into member-saved facts.
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
alter table public.workspace_memories enable row level security;
create policy memory_read on public.workspace_memories for select to authenticated
  using (private.is_workspace_member(workspace_id));
revoke all on public.workspace_memories from anon, authenticated;
grant select on public.workspace_memories to authenticated;

-- Only these functions mutate memory, under one workspace lock. Independent
-- entries cannot overwrite each other and stale revisions fail explicitly.
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
commit;
