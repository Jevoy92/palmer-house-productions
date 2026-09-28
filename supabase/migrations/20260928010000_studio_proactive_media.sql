begin;
-- A generated still belongs to one exact output, never every item in a campaign.
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
alter table public.studio_feed_generation_state enable row level security;
revoke all on public.studio_feed_generation_state from public,anon,authenticated;
-- No client-table writes: all rate limits and leases are changed atomically.
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
commit;
