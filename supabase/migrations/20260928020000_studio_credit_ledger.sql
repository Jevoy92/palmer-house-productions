-- Workspace credits are prepaid entitlements, not money. Only the trusted server
-- reserves usage or processes verified Stripe events; members have no ledger writes.
alter table public.workspace_subscriptions
  add column if not exists billing_hold boolean not null default false,
  add column if not exists paid_plan text,
  add column if not exists paid_credit_allowance integer,
  add column if not exists paid_event_created bigint not null default 0,
  add column if not exists paid_billing_interval text,
  add column if not exists paid_period_start timestamptz,
  add column if not exists paid_period_end timestamptz,
  add column if not exists billing_event_created bigint not null default 0;

create table public.studio_credit_grants (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  source_key text not null unique,
  kind text not null check(kind in ('included','topup')),
  credits integer not null check(credits>=0),
  remaining integer not null check(remaining>=0),
  expires_at timestamptz,
  payment_intent_id text,
  amount_paid_cents integer,
  reversed_credits integer not null default 0,
  debt_credits integer not null default 0 check(debt_credits>=0),
  created_at timestamptz not null default now()
);
create index studio_credit_grants_workspace on public.studio_credit_grants(workspace_id,expires_at);
create table public.studio_credit_usage (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  operation text not null check(operation in ('chat','directions','analysis','campaign','image','pdf','avatar','feed','automatic_feed')),
  credits integer not null check(credits>=0),
  status text not null default 'reserved' check(status in ('reserved','completed','released')),
  allocations jsonb not null default '[]',
  cost_ceiling_usd numeric(16,6) not null check(cost_ceiling_usd>=0),
  estimated_cost_usd numeric(16,6) not null default 0 check(estimated_cost_usd>=0),
  provider_usage jsonb not null default '[]',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index studio_credit_usage_workspace on public.studio_credit_usage(workspace_id,created_at);
create index studio_credit_usage_budget on public.studio_credit_usage(created_at,status);
create table public.studio_billing_events (
  event_id text primary key,
  event_created bigint not null,
  kind text not null,
  workspace_id uuid references public.workspaces(id) on delete cascade,
  created_at timestamptz not null default now()
);
-- Negative balances are represented as debt, never silently discarded after a refund.
create table public.studio_credit_debts (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  credits integer not null default 0 check(credits>=0)
);

alter table public.studio_credit_grants enable row level security;
alter table public.studio_credit_usage enable row level security;
alter table public.studio_billing_events enable row level security;
alter table public.studio_credit_debts enable row level security;
revoke all on public.studio_credit_grants,public.studio_credit_usage,public.studio_billing_events,public.studio_credit_debts from public,anon,authenticated;
grant all on public.studio_credit_grants,public.studio_credit_usage,public.studio_billing_events,public.studio_credit_debts to service_role;

create table public.studio_trial_claims (
 user_id uuid primary key references auth.users(id),
 workspace_id uuid not null unique references public.workspaces(id),
 created_at timestamptz not null default now()
);
alter table public.studio_trial_claims enable row level security;
revoke all on public.studio_trial_claims from public,anon,authenticated;
grant all on public.studio_trial_claims to service_role;
-- Explicitly retain read-only member access to subscriptions after adding columns.
revoke insert,update,delete,truncate,references,trigger on public.workspace_subscriptions from authenticated,anon;

create function public.refresh_studio_credits(target_workspace_id uuid, allowance integer)
returns jsonb language plpgsql security definer set search_path='' as $$
declare s public.workspace_subscriptions; start_at timestamptz; end_at timestamptz; key text; n integer; active boolean:=false; owner_id uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
  select * into s from public.workspace_subscriptions where workspace_id=target_workspace_id for update;
  if not found then raise exception 'Membership not found'; end if;
  if allowance<0 or allowance>100000 then raise exception 'Invalid allowance'; end if;
  if s.billing_hold then
    return jsonb_build_object('active',false,'status','inactive');
  end if;
  if s.status='trialing' and s.trial_ends_at>now() then
    select created_by into owner_id from public.workspaces where id=target_workspace_id;
    if owner_id is null then return jsonb_build_object('active',false,'status','inactive'); end if;
    insert into public.studio_trial_claims(user_id,workspace_id) values(owner_id,target_workspace_id) on conflict do nothing;
    if not exists(select 1 from public.studio_trial_claims where user_id=owner_id and workspace_id=target_workspace_id) then return jsonb_build_object('active',false,'status','inactive'); end if;
    start_at:=s.current_period_start; end_at:=s.trial_ends_at; key:='trial:'||target_workspace_id::text; active:=true;
  elsif s.status='active' and s.paid_period_end>now() and s.paid_period_start<=now() then
    start_at:=s.paid_period_start; end_at:=s.paid_period_end;
    -- Calculate every window from the original anchor: Jan 31 -> Feb 28 -> Mar 31.
    if coalesce(s.paid_billing_interval,s.billing_interval)='year' then
      n:=greatest(0,(extract(year from age(now(),start_at))*12+extract(month from age(now(),start_at)))::integer);
      while s.paid_period_start+make_interval(months=>n+1)<=now() loop n:=n+1; end loop;
      start_at:=s.paid_period_start+make_interval(months=>n);
      end_at:=least(s.paid_period_end,s.paid_period_start+make_interval(months=>n+1));
    end if;
    key:='included:'||target_workspace_id::text||':'||start_at::text; active:=true;
  end if;
  if active then
    -- Replacing a trial or an earlier paid period never leaves two allowances.
    update public.studio_credit_grants set expires_at=least(expires_at,now()) where workspace_id=target_workspace_id and kind='included' and source_key<>key and expires_at>now();
    insert into public.studio_credit_grants(workspace_id,source_key,kind,credits,remaining,expires_at)
      values(target_workspace_id,key,'included',allowance,allowance,end_at)
      on conflict(source_key) do nothing;
  end if;
  return jsonb_build_object('active',active,'startAt',start_at,'endAt',end_at,'status',case when active then s.status else 'inactive' end);
end $$;

create function public.reserve_studio_credits(target_workspace_id uuid, actor_id uuid, operation_name text, credit_count integer, cost_ceiling numeric, global_monthly_budget numeric, workspace_monthly_budget numeric, automatic_monthly_budget numeric, allowance integer)
returns uuid language plpgsql security definer set search_path='' as $$
declare period_info jsonb; used numeric; available integer; need integer; grant_row record; take integer; allocations jsonb:='[]'; result uuid; automatic boolean:=operation_name='automatic_feed'; debt integer;
begin
  -- Lock budget globally before the workspace; all reserve paths use the same order.
  perform pg_advisory_xact_lock(280200,1);
  perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
  if not exists(select 1 from public.workspace_members where workspace_id=target_workspace_id and user_id=actor_id) then raise exception 'Not authorized'; end if;
  if credit_count<0 or credit_count>10000 or cost_ceiling<=0 or cost_ceiling>10 or global_monthly_budget<=0 or workspace_monthly_budget<=0 then raise exception 'Invalid usage reservation'; end if;
  period_info:=public.refresh_studio_credits(target_workspace_id,allowance);
  if not (period_info->>'active')::boolean then raise exception 'Your membership is not active. Open Usage & billing to renew.'; end if;
  select coalesce(sum(case when status='reserved' then cost_ceiling_usd else estimated_cost_usd end),0) into used
    from public.studio_credit_usage where created_at>=date_trunc('month',now());
  if used+cost_ceiling>global_monthly_budget then raise exception 'Studio is at its provider spending limit. No credits were used. Contact Palmer House.'; end if;
  select coalesce(sum(case when status='reserved' then cost_ceiling_usd else estimated_cost_usd end),0) into used
    from public.studio_credit_usage where workspace_id=target_workspace_id and status in ('reserved','released') and created_at>=date_trunc('month',now());
  if used+cost_ceiling>workspace_monthly_budget then raise exception 'Several generations need attention before more work can start. No credits were used. Contact Palmer House.'; end if;
  if automatic then
    if credit_count<>0 then raise exception 'Automatic discussions cannot debit member credits'; end if;
    select coalesce(sum(case when status='reserved' then cost_ceiling_usd else estimated_cost_usd end),0) into used
      from public.studio_credit_usage where workspace_id=target_workspace_id and operation='automatic_feed' and created_at>=date_trunc('month',now());
    if used+cost_ceiling>automatic_monthly_budget then raise exception 'Automatic discussion budget is resting until next month.'; end if;
  else
    if credit_count=0 then raise exception 'Paid actions require credits'; end if;
    select coalesce(credits,0) into debt from public.studio_credit_debts where workspace_id=target_workspace_id;
    if coalesce(debt,0)>0 then raise exception 'Billing adjustment pending. Contact your workspace owner before generating.'; end if;
    select coalesce(sum(remaining),0) into available from public.studio_credit_grants
      where workspace_id=target_workspace_id and (expires_at is null or expires_at>now());
    if available<credit_count then raise exception 'Not enough Studio credits. Add credits in Usage & billing; your work is saved.'; end if;
    need:=credit_count;
    for grant_row in select * from public.studio_credit_grants where workspace_id=target_workspace_id and remaining>0 and (expires_at is null or expires_at>now()) order by expires_at asc nulls last,created_at for update loop
      take:=least(need,grant_row.remaining);
      update public.studio_credit_grants set remaining=remaining-take where id=grant_row.id;
      allocations:=allocations||jsonb_build_array(jsonb_build_object('grantId',grant_row.id,'credits',take));
      need:=need-take; exit when need=0;
    end loop;
  end if;
  insert into public.studio_credit_usage(workspace_id,user_id,operation,credits,cost_ceiling_usd,allocations)
    values(target_workspace_id,actor_id,operation_name,credit_count,cost_ceiling,allocations) returning id into result;
  return result;
end $$;

create function public.finish_studio_credits(usage_id uuid, outcome text, provider_cost numeric, provider_calls jsonb)
returns void language plpgsql security definer set search_path='' as $$
declare usage_row public.studio_credit_usage; allocation jsonb; grant_row public.studio_credit_grants; debt_released integer;
begin
  select * into usage_row from public.studio_credit_usage where id=usage_id;
  if not found then raise exception 'Usage reservation not found'; end if;
  perform pg_advisory_xact_lock(hashtextextended(usage_row.workspace_id::text,280200));
  select * into usage_row from public.studio_credit_usage where id=usage_id for update;
  if usage_row.status<>'reserved' then return; end if;
  if outcome not in ('completed','released') or provider_cost<0 or provider_cost>100 or jsonb_typeof(provider_calls)<>'array' or jsonb_array_length(provider_calls)>10 then raise exception 'Invalid usage completion'; end if;
  if outcome='released' then
    for allocation in select value from jsonb_array_elements(usage_row.allocations) loop
      select * into grant_row from public.studio_credit_grants where id=(allocation->>'grantId')::uuid for update;
      debt_released:=least(grant_row.debt_credits,(allocation->>'credits')::integer);
      update public.studio_credit_grants set remaining=least(credits-reversed_credits,remaining+(allocation->>'credits')::integer-debt_released),debt_credits=debt_credits-debt_released where id=grant_row.id;
      if debt_released>0 then update public.studio_credit_debts set credits=greatest(0,credits-debt_released) where workspace_id=usage_row.workspace_id; end if;
    end loop;
  end if;
  update public.studio_credit_usage set status=outcome,estimated_cost_usd=provider_cost,provider_usage=provider_calls,completed_at=now() where id=usage_id;
end $$;

-- One transaction records the payment event and entitlement. Retries do not multiply credits.
create function public.grant_studio_topup(event_key text,event_time bigint,target_workspace_id uuid,session_id text,payment_id text,credit_count integer,paid_cents integer)
returns boolean language plpgsql security definer set search_path='' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
  if credit_count<=0 or credit_count>100000 or paid_cents<=0 then raise exception 'Invalid paid credit pack'; end if;
  insert into public.studio_billing_events(event_id,event_created,kind,workspace_id) values(event_key,event_time,'topup',target_workspace_id) on conflict do nothing;
  if not found then return false; end if;
  insert into public.studio_credit_grants(workspace_id,source_key,kind,credits,remaining,payment_intent_id,amount_paid_cents)
    values(target_workspace_id,'checkout:'||session_id,'topup',credit_count,credit_count,payment_id,paid_cents) on conflict(source_key) do nothing;
  return found;
end $$;

create function public.reverse_studio_topup(event_key text,event_time bigint,payment_id text,refunded_cents integer,disputed boolean)
returns boolean language plpgsql security definer set search_path='' as $$
declare g public.studio_credit_grants; reverse_total integer; delta integer; shortfall integer;
begin
  select * into g from public.studio_credit_grants where payment_intent_id=payment_id and kind='topup';
  if not found then return false; end if;
  perform pg_advisory_xact_lock(hashtextextended(g.workspace_id::text,280200));
  select * into g from public.studio_credit_grants where id=g.id for update;
  insert into public.studio_billing_events(event_id,event_created,kind,workspace_id) values(event_key,event_time,'reversal',g.workspace_id) on conflict do nothing;
  if not found then return false; end if;
  reverse_total:=case when disputed then g.credits else least(g.credits,ceil(g.credits::numeric*greatest(refunded_cents,0)/greatest(g.amount_paid_cents,1))::integer) end;
  delta:=greatest(0,reverse_total-g.reversed_credits);
  shortfall:=greatest(0,delta-g.remaining);
  update public.studio_credit_grants set remaining=greatest(0,remaining-delta),reversed_credits=greatest(reversed_credits,reverse_total),debt_credits=debt_credits+shortfall where id=g.id;
  if shortfall>0 then insert into public.studio_credit_debts(workspace_id,credits) values(g.workspace_id,shortfall) on conflict(workspace_id) do update set credits=public.studio_credit_debts.credits+excluded.credits; end if;
  return true;
end $$;

create function public.sync_studio_subscription(event_key text,event_time bigint,target_workspace_id uuid,subscription_data jsonb,paid_invoice boolean)
returns boolean language plpgsql security definer set search_path='' as $$
declare existing public.workspace_subscriptions; start_at timestamptz; end_at timestamptz; period_info jsonb; delta integer; new_allowance integer; changing_subscription boolean; effective_at timestamptz;
begin
  perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
  select * into existing from public.workspace_subscriptions where workspace_id=target_workspace_id for update;
  if not found then raise exception 'Membership not found'; end if;
  insert into public.studio_billing_events(event_id,event_created,kind,workspace_id) values(event_key,event_time,'subscription',target_workspace_id) on conflict do nothing;
  if not found then return false; end if;
  changing_subscription:=existing.stripe_subscription_id is not null and existing.stripe_subscription_id<>subscription_data->>'subscriptionId';
  if changing_subscription then
    -- Late events from a previous subscription cannot replace the current one.
    if event_time<existing.billing_event_created or existing.status in ('active','past_due','trialing') or subscription_data->>'status' in ('canceled','paused','past_due') then return false; end if;
    update public.workspace_subscriptions set paid_period_start=null,paid_period_end=null,paid_plan=null,paid_billing_interval=null,paid_credit_allowance=null where workspace_id=target_workspace_id;
  end if;
  start_at:=(subscription_data->>'periodStart')::timestamptz; end_at:=(subscription_data->>'periodEnd')::timestamptz;
  if paid_invoice and (changing_subscription or end_at>coalesce(existing.paid_period_end,'-infinity')) then
    update public.workspace_subscriptions set paid_period_start=start_at,paid_period_end=end_at,paid_plan=subscription_data->>'paidPlan',paid_billing_interval=subscription_data->>'paidInterval',paid_credit_allowance=(subscription_data->>'paidAllowance')::integer,paid_event_created=event_time where workspace_id=target_workspace_id;
  end if;
  -- A paid mid-cycle upgrade adds only the unused fraction of the monthly
  -- allowance difference. The event ledger makes retries and plan toggles safe.
  if paid_invoice and coalesce((subscription_data->>'paidUpgrade')::boolean,false) and end_at=existing.paid_period_end and event_time>=existing.paid_event_created then
    new_allowance:=(subscription_data->>'paidAllowance')::integer;
    if new_allowance>coalesce(existing.paid_credit_allowance,0) and existing.paid_plan is not null then
      -- The paid invoice may be recovering a previously past-due upgrade.
      if subscription_data->>'status'='active' then update public.workspace_subscriptions set status='active' where workspace_id=target_workspace_id; end if;
      period_info:=public.refresh_studio_credits(target_workspace_id,existing.paid_credit_allowance);
      if (period_info->>'active')::boolean then
        effective_at:=greatest((period_info->>'startAt')::timestamptz,coalesce((subscription_data->>'paidUpgradeAt')::timestamptz,now()));
        delta:=greatest(0,floor((new_allowance-existing.paid_credit_allowance)*extract(epoch from ((period_info->>'endAt')::timestamptz-effective_at))/greatest(1,extract(epoch from ((period_info->>'endAt')::timestamptz-(period_info->>'startAt')::timestamptz))))::integer);
        update public.studio_credit_grants set credits=credits+delta,remaining=remaining+delta where workspace_id=target_workspace_id and kind='included' and expires_at>now();
        update public.workspace_subscriptions set paid_plan=subscription_data->>'paidPlan',paid_credit_allowance=new_allowance,paid_event_created=event_time where workspace_id=target_workspace_id;
      end if;
    end if;
  end if;
  if event_time>=existing.billing_event_created then
    update public.workspace_subscriptions set plan=subscription_data->>'plan',status=subscription_data->>'status',campaign_allowance=(subscription_data->>'campaignAllowance')::integer,
      billing_interval=subscription_data->>'interval',stripe_customer_id=subscription_data->>'customerId',stripe_subscription_id=subscription_data->>'subscriptionId',
      cancel_at_period_end=coalesce((subscription_data->>'cancelAtPeriodEnd')::boolean,false),current_period_start=start_at,current_period_end=end_at,billing_event_created=event_time
      where workspace_id=target_workspace_id;
  end if;
  return true;
end $$;

revoke all on function public.refresh_studio_credits(uuid,integer),public.reserve_studio_credits(uuid,uuid,text,integer,numeric,numeric,numeric,numeric,integer),public.finish_studio_credits(uuid,text,numeric,jsonb),public.grant_studio_topup(text,bigint,uuid,text,text,integer,integer),public.reverse_studio_topup(text,bigint,text,integer,boolean),public.sync_studio_subscription(text,bigint,uuid,jsonb,boolean) from public,anon,authenticated;
grant execute on function public.refresh_studio_credits(uuid,integer),public.reserve_studio_credits(uuid,uuid,text,integer,numeric,numeric,numeric,numeric,integer),public.finish_studio_credits(uuid,text,numeric,jsonb),public.grant_studio_topup(text,bigint,uuid,text,text,integer,integer),public.reverse_studio_topup(text,bigint,text,integer,boolean),public.sync_studio_subscription(text,bigint,uuid,jsonb,boolean) to service_role;

create function public.studio_credit_snapshot(target_workspace_id uuid,period_start timestamptz)
returns jsonb language sql security definer set search_path='' as $$
 select jsonb_build_object(
  'includedAllowance',coalesce((select sum(credits) from public.studio_credit_grants where workspace_id=target_workspace_id and kind='included' and expires_at>now()),0),
  'includedRemaining',coalesce((select sum(remaining) from public.studio_credit_grants where workspace_id=target_workspace_id and kind='included' and expires_at>now()),0),
  'topUpRemaining',coalesce((select sum(remaining) from public.studio_credit_grants where workspace_id=target_workspace_id and kind='topup'),0),
  'usedThisPeriod',coalesce((select sum(credits) from public.studio_credit_usage where workspace_id=target_workspace_id and created_at>=period_start and status='completed'),0),
  'reserved',coalesce((select sum(credits) from public.studio_credit_usage where workspace_id=target_workspace_id and status='reserved'),0),
  'debt',coalesce((select credits from public.studio_credit_debts where workspace_id=target_workspace_id),0)
 )
$$;
create function public.studio_credit_cost_snapshot()
returns jsonb language sql security definer set search_path='' as $$
 select jsonb_build_object('estimatedCostUsd',coalesce(sum(estimated_cost_usd),0),'providerCalls',coalesce(sum(jsonb_array_length(provider_usage)),0),'budgetUsedUsd',coalesce(sum(case when status='reserved' then cost_ceiling_usd else estimated_cost_usd end),0)) from public.studio_credit_usage where created_at>=date_trunc('month',now())
$$;
revoke all on function public.studio_credit_snapshot(uuid,timestamptz),public.studio_credit_cost_snapshot() from public,anon,authenticated;
grant execute on function public.studio_credit_snapshot(uuid,timestamptz),public.studio_credit_cost_snapshot() to service_role;

alter table public.workspace_subscriptions add column if not exists billing_hold boolean not null default false;
create function public.hold_studio_billing(event_key text,event_time bigint,target_workspace_id uuid,subscription_id text)
returns void language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
 insert into public.studio_billing_events(event_id,event_created,kind,workspace_id) values(event_key,event_time,'subscription_reversal',target_workspace_id) on conflict do nothing;
 if not found then return; end if;
 update public.workspace_subscriptions set billing_hold=true where workspace_id=target_workspace_id and stripe_subscription_id=subscription_id;
end $$;
revoke all on function public.hold_studio_billing(text,bigint,uuid,text) from public,anon,authenticated;
grant execute on function public.hold_studio_billing(text,bigint,uuid,text) to service_role;

create table public.studio_membership_checkouts (
 workspace_id uuid primary key references public.workspaces(id) on delete cascade,
 attempt_id uuid not null default gen_random_uuid(),
 plan text not null check(plan in ('creator','business','partner')),
 interval_name text not null check(interval_name in ('month','year')),
 session_id text,
 lease_token uuid,
 lease_until timestamptz,
 created_at timestamptz not null default now()
);
alter table public.studio_membership_checkouts enable row level security;
revoke all on public.studio_membership_checkouts from public,anon,authenticated;
grant all on public.studio_membership_checkouts to service_role;
create function public.claim_studio_membership_checkout(target_workspace_id uuid,plan_key text,interval_key text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare entry public.studio_membership_checkouts; token uuid:=gen_random_uuid();
begin
 perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
 if exists(select 1 from public.workspace_subscriptions where workspace_id=target_workspace_id and stripe_subscription_id is not null and status in ('active','trialing','past_due')) then raise exception 'Use Manage membership to change your existing plan.'; end if;
 insert into public.studio_membership_checkouts(workspace_id,plan,interval_name) values(target_workspace_id,plan_key,interval_key) on conflict do nothing;
 select * into entry from public.studio_membership_checkouts where workspace_id=target_workspace_id for update;
 if entry.lease_until>now() then raise exception 'A checkout is already opening. Please wait a moment.'; end if;
 if entry.session_id is null and entry.created_at<now()-interval '23 hours' then raise exception 'A previous checkout needs reconciliation. Contact Palmer House before starting another.'; end if;
 update public.studio_membership_checkouts set lease_token=token,lease_until=now()+interval '2 minutes' where workspace_id=target_workspace_id;
 return to_jsonb(entry)||jsonb_build_object('lease_token',token);
end $$;
create function public.finish_studio_membership_checkout(target_workspace_id uuid,request_token uuid,stripe_session_id text,clear_attempt boolean)
returns void language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(target_workspace_id::text,280200));
 if clear_attempt then delete from public.studio_membership_checkouts where workspace_id=target_workspace_id and lease_token=request_token;
 else update public.studio_membership_checkouts set session_id=coalesce(stripe_session_id,session_id),lease_until=null,lease_token=null where workspace_id=target_workspace_id and lease_token=request_token; end if;
 if not found then raise exception 'Checkout changed while the request was running'; end if;
end $$;
revoke all on function public.claim_studio_membership_checkout(uuid,text,text),public.finish_studio_membership_checkout(uuid,uuid,text,boolean) from public,anon,authenticated;
grant execute on function public.claim_studio_membership_checkout(uuid,text,text),public.finish_studio_membership_checkout(uuid,uuid,text,boolean) to service_role;
