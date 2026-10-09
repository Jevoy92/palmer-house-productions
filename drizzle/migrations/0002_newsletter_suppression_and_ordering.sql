ALTER TABLE public.newsletter_subscribers
  ADD COLUMN prefs_changed_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN remote_changed_at timestamptz,
  ADD COLUMN resubscribe_requested boolean NOT NULL DEFAULT false,
  ADD COLUMN suppressed boolean NOT NULL DEFAULT false,
  ADD COLUMN suppressed_reason text,
  ADD COLUMN suppressed_at timestamptz;
ALTER TABLE public.newsletter_consent_events DROP CONSTRAINT newsletter_consent_events_action_check;
ALTER TABLE public.newsletter_consent_events ADD CONSTRAINT newsletter_consent_events_action_check
  CHECK (action IN ('opt_in','opt_out','unsubscribe_all','resubscribe_all','suppressed_bounce','suppressed_complaint'));