UPDATE public.workspace_subscriptions
SET campaign_allowance = 999999,
    trial_ends_at = now() + interval '365 days',
    current_period_end = now() + interval '365 days',
    updated_at = now()
WHERE workspace_id IN (
  'd5181d06-94fd-4d3f-abea-9e813a0fb715',
  '9c9fa0dc-655e-4635-83b3-d0c4fc30c21b'
);