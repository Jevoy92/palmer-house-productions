alter table public.service_requests
  drop constraint if exists service_requests_request_type_check;

alter table public.service_requests
  add constraint service_requests_request_type_check
  check (
    request_type in (
      'strategy_review',
      'filming_session',
      'editing',
      'content_audit',
      'full_production',
      'member_question',
      'project_review',
      'strategy_call',
      'podcast_guest',
      'private_feedback'
    )
  );

alter table public.workspace_subscriptions
  add column if not exists billing_interval text not null default 'month'
  check (billing_interval in ('month', 'year'));

comment on column public.workspace_subscriptions.billing_interval is
  'The Stripe recurrence interval. Annual plans charge ten months for twelve months of access.';

create index if not exists service_requests_workspace_type_created_idx
  on public.service_requests(workspace_id, request_type, created_at desc);
