create table public.filming_benefit_redemptions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  period_month date not null,
  checkout_session_id text,
  quote_reference text,
  status text not null default 'reserved',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index filming_benefit_one_per_month on public.filming_benefit_redemptions(workspace_id, period_month) where status in ('reserved','redeemed');
grant select on public.filming_benefit_redemptions to authenticated;
grant all on public.filming_benefit_redemptions to service_role;
alter table public.filming_benefit_redemptions enable row level security;
create policy filming_benefit_read on public.filming_benefit_redemptions for select to authenticated using (private.is_workspace_member(workspace_id));