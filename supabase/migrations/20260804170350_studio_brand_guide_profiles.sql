alter table public.brand_profiles
  add column if not exists creator_type text not null default 'Business',
  add column if not exists primary_goal text not null default 'Sell services',
  add column if not exists social_links jsonb not null default '[]'::jsonb,
  add column if not exists brand_details jsonb not null default '{}'::jsonb,
  add column if not exists visual_style text not null default 'Palmer Clay 3D';

create table if not exists public.brand_references (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  kind text not null default 'file'
    check (kind in ('website', 'social', 'youtube', 'logo', 'guide', 'moodboard', 'photo', 'product', 'font', 'file')),
  label text not null,
  source_url text,
  storage_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists brand_references_workspace_created_idx
  on public.brand_references(workspace_id, created_at desc);

alter table public.brand_references enable row level security;

create policy brand_references_all on public.brand_references for all to authenticated
  using (private.is_workspace_member(workspace_id))
  with check (private.is_workspace_member(workspace_id));

grant select, insert, update, delete on public.brand_references to authenticated;

comment on column public.brand_profiles.brand_details is
  'Progressive Brand Guide sections, including mission, values, photography, motion, and AI prompting rules.';

alter table public.service_requests
  drop constraint if exists service_requests_request_type_check;

alter table public.service_requests
  add constraint service_requests_request_type_check
  check (
    request_type in (
      'strategy_review', 'filming_session', 'editing', 'content_audit', 'full_production',
      'member_question', 'project_review', 'strategy_call', 'podcast_guest',
      'private_feedback', 'advisory_application'
    )
  );
