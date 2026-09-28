-- Voice requests are server-only and survive network retries. Paid calls cannot
-- be duplicated by resubmitting a recording with the same request identifier.
alter table public.studio_credit_usage drop constraint studio_credit_usage_operation_check;
alter table public.studio_credit_usage add constraint studio_credit_usage_operation_check check(operation in ('chat','directions','analysis','campaign','image','pdf','avatar','feed','automatic_feed','transcription'));
create table public.studio_voice_requests (
 workspace_id uuid not null references public.workspaces(id) on delete cascade,
 actor_id uuid not null references auth.users(id),
 request_key uuid not null,
 content_sha256 text not null check(length(content_sha256)=64),
 -- Keep the requested identity so deletion during transcription cannot silently move a paid result.
 conversation_id uuid,
 status text not null default 'pending' check(status in ('pending','completed','failed')),
 attempt_token uuid not null default gen_random_uuid(),
 usage_id uuid references public.studio_credit_usage(id),
 attachment_id uuid references public.conversation_attachments(id) on delete set null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 primary key(workspace_id,actor_id,request_key)
);
alter table public.studio_voice_requests enable row level security;
revoke all on public.studio_voice_requests from public,anon,authenticated;
grant all on public.studio_voice_requests to service_role;
create function public.claim_studio_voice(target_workspace_id uuid, actor uuid, request_id uuid, content_hash text, conversation uuid default null)
returns jsonb language plpgsql security definer set search_path=public as $$
declare r public.studio_voice_requests%rowtype; inserted boolean;
begin
 if not exists(select 1 from workspace_members where workspace_id=target_workspace_id and user_id=actor) then raise exception 'Workspace access required.'; end if;
 if conversation is not null and not exists(select 1 from conversations where id=conversation and workspace_id=target_workspace_id) then raise exception 'Conversation unavailable in this workspace.'; end if;
 insert into studio_voice_requests(workspace_id,actor_id,request_key,content_sha256,conversation_id) values(target_workspace_id,actor,request_id,content_hash,conversation) on conflict do nothing;
 inserted:=found;
 select * into r from studio_voice_requests where workspace_id=target_workspace_id and actor_id=actor and request_key=request_id for update;
 if r.content_sha256<>content_hash or r.conversation_id is distinct from conversation then raise exception 'This recording request belongs to a different recording or conversation.'; end if;
 if r.status='failed' then
  update studio_voice_requests set status='pending',attempt_token=gen_random_uuid(),usage_id=null,updated_at=now() where workspace_id=target_workspace_id and actor_id=actor and request_key=request_id returning * into r;
  inserted:=true;
 end if;
 return jsonb_build_object('claimed',inserted,'status',r.status,'token',case when inserted then r.attempt_token else null end,'attachmentId',r.attachment_id);
end $$;
create function public.bind_studio_voice_usage(target_workspace_id uuid, actor uuid, request_id uuid, token uuid, usage uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
 if not exists(select 1 from studio_credit_usage where id=usage and workspace_id=target_workspace_id and user_id=actor and operation='transcription' and status='reserved') then raise exception 'A voice usage reservation is required.'; end if;
 update studio_voice_requests set usage_id=usage,updated_at=now() where workspace_id=target_workspace_id and actor_id=actor and request_key=request_id and attempt_token=token and status='pending' and usage_id is null;
 if not found then raise exception 'This voice request is already running.'; end if;
end $$;
create function public.complete_studio_voice(target_workspace_id uuid, actor uuid, request_id uuid, token uuid, saved_path text, file_label text, file_bytes integer, transcript text, details jsonb)
returns uuid language plpgsql security definer set search_path=public as $$
declare r public.studio_voice_requests%rowtype; attached uuid;
begin
 select * into r from studio_voice_requests where workspace_id=target_workspace_id and actor_id=actor and request_key=request_id for update;
 if r.attempt_token is distinct from token then raise exception 'This recording attempt has changed.'; end if;
 if r.status='completed' then return r.attachment_id; end if;
 if r.status<>'pending' or r.usage_id is null then raise exception 'A voice usage reservation is required.'; end if;
 if not exists(select 1 from studio_credit_usage where id=r.usage_id and workspace_id=target_workspace_id and user_id=actor and status='reserved') or not exists(select 1 from workspace_members where workspace_id=target_workspace_id and user_id=actor) then raise exception 'This voice reservation or workspace membership is no longer available.'; end if;
 if saved_path not like target_workspace_id::text||'/conversation/%' or saved_path like '%..%' or length(transcript)>40000 or length(trim(transcript))=0 or file_bytes<32044 or file_bytes>9600044 then raise exception 'Invalid saved voice recording.'; end if;
 if r.conversation_id is not null and not exists(select 1 from conversations where id=r.conversation_id and workspace_id=target_workspace_id) then raise exception 'Conversation unavailable in this workspace.'; end if;
 insert into conversation_attachments(workspace_id,conversation_id,created_by,kind,label,mime_type,byte_size,storage_path,extracted_text,summary,metadata) values(target_workspace_id,r.conversation_id,actor,'voice',left(file_label,200),'audio/wav',file_bytes,saved_path,transcript,'Voice note: '||left(transcript,160),details||jsonb_build_object('usageReservationId',r.usage_id)) returning id into attached;
 update studio_voice_requests set status='completed',attachment_id=attached,updated_at=now() where workspace_id=target_workspace_id and actor_id=actor and request_key=request_id;
 return attached;
end $$;
create function public.fail_studio_voice(target_workspace_id uuid, actor uuid, request_id uuid, token uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
 update studio_voice_requests set status='failed',updated_at=now() where workspace_id=target_workspace_id and actor_id=actor and request_key=request_id and attempt_token=token and status='pending';
end $$;
revoke all on function public.claim_studio_voice(uuid,uuid,uuid,text,uuid),public.bind_studio_voice_usage(uuid,uuid,uuid,uuid,uuid),public.complete_studio_voice(uuid,uuid,uuid,uuid,text,text,integer,text,jsonb),public.fail_studio_voice(uuid,uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.claim_studio_voice(uuid,uuid,uuid,text,uuid),public.bind_studio_voice_usage(uuid,uuid,uuid,uuid,uuid),public.complete_studio_voice(uuid,uuid,uuid,uuid,text,text,integer,text,jsonb),public.fail_studio_voice(uuid,uuid,uuid,uuid) to service_role;
