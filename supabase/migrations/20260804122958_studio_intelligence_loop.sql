alter table public.workspace_settings
  add column if not exists preferred_pal text not null default 'kiana'
    check (preferred_pal in ('kareem', 'kiana', 'ryder', 'raquel', 'cyrus', 'clara', 'silas', 'samira')),
  add column if not exists ai_memory jsonb not null default '{}'::jsonb,
  add column if not exists last_briefing_at timestamptz;

create table if not exists public.content_ideas (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  body text not null check (char_length(body) between 3 and 3000),
  source_type text not null default 'text'
    check (source_type in ('text', 'link', 'image', 'chat', 'recommended')),
  source_url text,
  source_media_path text,
  source_metadata jsonb not null default '{}'::jsonb,
  primary_lane text not null default 'evergreen'
    check (primary_lane in ('spotlight', 'reel', 'evergreen', 'system')),
  business_problem text not null default '',
  status text not null default 'saved'
    check (status in ('saved', 'building', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assistant_messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  pal text not null check (pal in ('kareem', 'kiana', 'ryder', 'raquel', 'cyrus', 'clara', 'silas', 'samira')),
  body text not null check (char_length(body) between 1 and 12000),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_video_items (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  item_key text not null,
  status text not null default 'recommended'
    check (status in ('not_needed', 'recommended', 'planned', 'scripted', 'ready_to_film', 'filmed', 'editing', 'complete', 'refresh')),
  campaign_id uuid references public.campaigns(id) on delete set null,
  notes text not null default '',
  updated_at timestamptz not null default now(),
  primary key (workspace_id, item_key)
);

create index if not exists content_ideas_workspace_created_idx
  on public.content_ideas (workspace_id, created_at desc);
create index if not exists assistant_messages_workspace_created_idx
  on public.assistant_messages (workspace_id, created_at desc);
create index if not exists workspace_video_items_workspace_status_idx
  on public.workspace_video_items (workspace_id, status);

alter table public.content_ideas enable row level security;
alter table public.assistant_messages enable row level security;
alter table public.workspace_video_items enable row level security;

create policy content_ideas_all on public.content_ideas for all to authenticated
  using (private.is_workspace_member(workspace_id))
  with check (private.is_workspace_member(workspace_id));

create policy assistant_messages_all on public.assistant_messages for all to authenticated
  using (private.is_workspace_member(workspace_id))
  with check (private.is_workspace_member(workspace_id));

create policy workspace_video_items_all on public.workspace_video_items for all to authenticated
  using (private.is_workspace_member(workspace_id))
  with check (private.is_workspace_member(workspace_id));

grant select, insert, update, delete on public.content_ideas to authenticated;
grant select, insert, update, delete on public.assistant_messages to authenticated;
grant select, insert, update, delete on public.workspace_video_items to authenticated;

create trigger content_ideas_touch before update on public.content_ideas
  for each row execute function private.touch_updated_at();
create trigger workspace_video_items_touch before update on public.workspace_video_items
  for each row execute function private.touch_updated_at();
